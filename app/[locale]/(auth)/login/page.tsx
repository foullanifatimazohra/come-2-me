"use client";
import React, { useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { Loader2, ChevronRight } from "lucide-react";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const RESEND_TIMEOUT = 60; // seconds

const AUTH_FLOW_STEPS = {
  INITIAL: "initial",
  PHONE_INPUT: "phone_input",
  PHONE_OTP: "phone_otp",
  SUCCESS: "success",
};

export default function AuthFlowManager() {
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [step, setStep] = useState(AUTH_FLOW_STEPS.INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);

  const auth = getAuth(app);
  const router = useRouter();

  // --- Recaptcha Setup ---
  useEffect(() => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => console.log("Recaptcha resolved."),
          }
        );
        window.recaptchaVerifier.render();
        setIsAuthReady(true);
      } catch (e) {
        setError("Security check failed. Please refresh.");
      }
    }
  }, [auth]);

  // --- Timer restore ---
  useEffect(() => {
    const storedTimestamp = localStorage.getItem("resendTimer");
    if (storedTimestamp) {
      const elapsed = Math.floor(
        (Date.now() - parseInt(storedTimestamp, 10)) / 1000
      );
      const remaining = RESEND_TIMEOUT - elapsed;
      if (remaining > 0) setTimeLeft(remaining);
    }
  }, []);

  // --- Timer countdown ---
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const startTimer = () => {
    const timestamp = Date.now();
    localStorage.setItem("resendTimer", timestamp.toString());
    setTimeLeft(RESEND_TIMEOUT);
  };

  // --- Handle Form Submit ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length > 0) {
      setOpenDialog(true);
      return;
    }

    alert("Veuillez entrer un numéro de téléphone ou un email");
  };

  // --- Choice: SMS / WhatsApp ---
  const handleChoice = async (method: "sms" | "whatsapp") => {
    setOpenDialog(false);
    setFormData((prev) => ({ ...prev, phone })); // save phone
    setStep(AUTH_FLOW_STEPS.PHONE_INPUT);
    await handleAuthPrimaryInput();
  };

  // --- Send OTP ---
  const handleAuthPrimaryInput = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!window.recaptchaVerifier) {
        setError("Recaptcha missing");
        setLoading(false);
        return;
      }
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setStep(AUTH_FLOW_STEPS.PHONE_OTP);
      startTimer();
    } catch (e: any) {
      setError(`Auth failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Verify OTP ---
  const handleOTPVerification = async () => {
    setLoading(true);
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(formData.otp);
        setStep(AUTH_FLOW_STEPS.SUCCESS);
      }
    } catch {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // --- Resend OTP ---
  const handleResend = async () => {
    if (timeLeft > 0) return;
    await handleAuthPrimaryInput();
  };

  // --- Social Logins (placeholders) ---
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setStep(AUTH_FLOW_STEPS.SUCCESS);
    } catch (err) {
      setError("Google login failed");
    }
  };

  // --- UI Renderer ---
  const renderContent = () => {
    if (!isAuthReady) {
      return <p>Loading auth...</p>;
    }

    switch (step) {
      case AUTH_FLOW_STEPS.INITIAL:
        return (
          <section>
            <main className="flex min-h-screen w-screen mt-25 mb-10">
              <section className="section-container flex items-center flex-col relative">
                <div className="relative w-full flex lg:flex-row flex-col justify-center">
                  <Link href="/" className="lg:absolute left-0 top-0">
                    <Image
                      src="/go-back.svg"
                      alt="Go back"
                      width={81}
                      height={81}
                      priority
                    />
                  </Link>
                  <h1 className="text-center heading-1 text-3xl max-w-[45ch] leading-[48px]">
                    Connectez-vous ou inscrivez-vous pour recevoir les
                    notifications en temps réel
                  </h1>
                </div>

                {/* Formulaire principal */}
                <div className="text-center mt-25 space-y-1 flex items-center flex-col relative">
                  <h2 className="heading-1">Connexion ou inscription</h2>
                  <p className="lg:max-w-[50ch] paragraph">
                    Saisissez votre numéro de téléphone ou votre adresse e-mail.
                    Vous recevrez un code pour confirmer votre identité.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="lg:w-[600px] p-8 space-y-4"
                  >
                    <PhoneInput
                      placeholder="Numéro de téléphone"
                      defaultCountry="DZ"
                      value={phone}
                      onChange={(value) => {
                        setPhone(value);
                        setEmail("");
                      }}
                    />
                    {/* Separator */}
                    <div className="inline-flex items-center justify-center w-full relative">
                      <hr className="w-64 h-px my-8 bg-[#BDC1CA] border-0" />
                      <span className="absolute px-3 font-medium text-[#9095A1] -translate-x-1/2 bg-white left-1/2">
                        Or
                      </span>
                    </div>
                    <Input
                      placeholder="Se connecter avec une adresse e-mail"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setPhone("");
                      }}
                      className="placeholder:text-[#4E4E4E] placeholder:!font-medium"
                      startIcon={
                        <Image
                          src="/email.svg"
                          alt="email"
                          width={18}
                          height={14}
                        />
                      }
                    />

                    {/* Social logins */}
                    <div className="inline-flex items-center justify-center w-full relative">
                      <hr className="w-64 h-px my-8 bg-[#BDC1CA] border-0" />
                      <span className="absolute px-3 font-medium text-[#9095A1] -translate-x-1/2 bg-white left-1/2">
                        Or
                      </span>
                    </div>

                    <Input
                      placeholder="Se connecter avec Google"
                      className="placeholder:text-[#4E4E4E] placeholder:!font-medium cursor-pointer"
                      onClick={handleGoogleLogin}
                      startIcon={
                        <Image
                          src="/google.svg"
                          alt="Google"
                          width={33}
                          height={33}
                        />
                      }
                    />
                    <Input
                      placeholder="Se connecter avec Apple"
                      className="placeholder:text-[#4E4E4E] placeholder:!font-medium mb-25 cursor-pointer"
                      startIcon={
                        <Image
                          src="/apple.svg"
                          alt="Apple"
                          width={33}
                          height={33}
                        />
                      }
                    />

                    {/* Conditions */}
                    <p className="text-base leading-relaxed text-[#6B6B6B] mb-10">
                      En cliquant sur le bouton suivant, vous reconnaissez avoir
                      lu et accepté les{" "}
                      <Link href="/" className="text-[#3A74C9]">
                        termes & conditions
                      </Link>{" "}
                      ainsi que{" "}
                      <Link href="/" className="text-[#3A74C9]">
                        la politique de confidentialité
                      </Link>
                      .
                    </p>
                    <Button
                      type="submit"
                      className="absolute bottom-0 right-0 font-semibold px-10 text-white text-xl"
                    >
                      Suivant
                    </Button>
                  </form>
                </div>
              </section>

              {/* ✅ Dialog choix OTP */}
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[800px] bg-white p-0 border-none pb-10">
                  <DialogHeader>
                    <DialogTitle className="heading-1 text-3xl text-center px-15 pt-20">
                      Comment voulez-vous recevoir votre code ?
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 mt-4 text-[#242524]">
                    <div
                      className="flex items-center gap-6 flex-wrap justify-between cursor-pointer px-15 text-2xl font-medium"
                      onClick={() => handleChoice("whatsapp")}
                    >
                      <div className="flex items-center">
                        <Image
                          src="/whatsapp.svg"
                          alt="WhatsApp"
                          width={60}
                          height={60}
                          className="mr-8"
                        />
                        WhatsApp
                      </div>
                      <div className="flex items-center gap-10">
                        <span className="bg-[#28642B] font-semibold px-2 rounded-md text-base text-white">
                          Recommandé
                        </span>
                        <ChevronRight size={20} />
                      </div>
                    </div>
                    <hr className="border-[#BDC1CA] my-5" />
                    <div
                      className="flex items-center flex-wrap justify-between cursor-pointer px-15 text-2xl font-medium"
                      onClick={() => handleChoice("sms")}
                    >
                      <div className="flex items-center">
                        <Image
                          src="/sms.svg"
                          alt="SMS"
                          width={60}
                          height={60}
                          className="mr-8"
                        />
                        SMS
                      </div>
                      <div className="flex items-center gap-10">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </main>
          </section>
        );

      case AUTH_FLOW_STEPS.PHONE_OTP:
        return (
          <main className="flex min-h-screen w-screen mt-25">
            <section className="section-container flex items-center flex-col relative">
              {/* Header */}
              <div className="relative w-full flex lg:flex-row flex-col justify-center items-center">
                <Link href="/login" className="lg:absolute left-0 top-0">
                  <Image
                    src="/go-back.svg"
                    alt="Go back"
                    width={81}
                    height={81}
                    priority
                  />
                </Link>
                <h1 className="text-center heading-1 text-3xl max-w-[45ch] leading-[48px]">
                  Vérifiez votre{" "}
                  {phone ? "numéro de téléphone" : "adresse e-mail"}
                </h1>
              </div>

              {/* Instructions */}
              <div className="text-center mt-25 space-y-1 flex items-center flex-col relative">
                <h2 className="heading-1">Code de vérification</h2>
                <p className="paragraph text-[#565D6D] text-[20px]">
                  Nous avons envoyé un code au ({phone || email}). Saisissez le
                  code à usage unique envoyé :
                </p>
              </div>

              <p
                className="flex cursor-pointer items-center mt-10 text-[#3A74C9] gap-3 font-semibold text-base"
                onClick={() => router.back()}
              >
                <Image
                  height={23}
                  width={23}
                  src="/phone-icon.svg"
                  alt="phone-icon"
                  priority
                />
                Modifier votre{" "}
                {phone ? "numéro de téléphone" : "adresse e-mail"}
              </p>

              {/* OTP Input */}
              <div className="mt-8">
                <InputOTP
                  maxLength={6}
                  value={formData.otp}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, otp: val }))
                  }
                >
                  <InputOTPGroup className="space-x-10">
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="lg:w-[140px] lg:h-[100px] shadow-none"
                        aria-invalid={timeLeft <= 0} // 🔴 mark invalid if time expired
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Error or Resend */}

              <div className="flex flex-col items-center gap-2">
                {timeLeft <= 0 && (
                  <p className="text-red-500 font-medium text-base mt-10">
                    Code non reçu ? Cliquez sur Renvoyer le code
                  </p>
                )}
                <Button
                  variant="outline"
                  onClick={handleResend}
                  className="bg-[#DDEEFB] border-none text-[#171A1F] font-semibold mt-10"
                >
                  Renvoyer le code{timeLeft > 0 && ` dans ${timeLeft}s`}
                </Button>
              </div>
              <Button
                onClick={handleOTPVerification}
                disabled={formData.otp.length !== 6 || loading}
                className="absolute bottom-0 right-0 font-semibold px-10 my-10 text-white text-xl"
              >
                Suivant
              </Button>
            </section>
          </main>
        );

      case AUTH_FLOW_STEPS.SUCCESS:
        return (
          <main className="flex items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-green-600">
              ✅ Connexion réussie !
            </h1>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div
        id="recaptcha-container"
        className="fixed top-0 left-0 w-0 h-0"
      ></div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {renderContent()}
    </div>
  );
}

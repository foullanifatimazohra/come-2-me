"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const RESEND_TIMEOUT = 60; // seconds

export default function PhoneLogin() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  // Initialize resendTimer on first visit
  useEffect(() => {
    let storedTimestamp = localStorage.getItem("resendTimer");

    if (!storedTimestamp) {
      storedTimestamp = Date.now().toString();
      localStorage.setItem("resendTimer", storedTimestamp);
    }

    // Function to recompute time left
    const tick = () => {
      const ts = localStorage.getItem("resendTimer");
      if (!ts) return;

      const elapsed = Math.floor((Date.now() - parseInt(ts, 10)) / 1000);
      const remaining = RESEND_TIMEOUT - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    tick(); // run immediately
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle resend
  const handleResend = () => {
    console.log("Resend OTP to", phone);

    localStorage.setItem("resendTimer", Date.now().toString());
    setTimeLeft(RESEND_TIMEOUT);
  };

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
            Vérifiez votre numéro de téléphone
          </h1>
        </div>

        {/* Instructions */}
        <div className="text-center mt-25 space-y-1 flex items-center flex-col relative">
          <h2 className="heading-1">Code de vérification</h2>
          <p className="paragraph text-[#565D6D] text-[20px]">
            Nous avons envoyé un code au ({phone}). Saisissez le code à usage
            unique envoyé :
          </p>
        </div>

        <p className="flex items-center mt-10 text-[#3A74C9] gap-3 font-semibold text-base">
          <Image
            height={23}
            width={23}
            src="/phone-icon.svg"
            alt="phone-icon"
            priority
          />
          Modifier votre numéro de téléphone
        </p>

        {/* OTP Input */}
        <div className="mt-8">
          <InputOTP maxLength={4} value={otp} onChange={setOtp}>
            <InputOTPGroup className="space-x-10">
              {[...Array(4)].map((_, i) => (
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
      </section>
    </main>
  );
}

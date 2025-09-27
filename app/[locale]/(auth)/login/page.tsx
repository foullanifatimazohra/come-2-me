"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

export default function PhoneLogin() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.trim().length > 0) {
      // Instead of redirecting directly, open the dialog
      setOpenDialog(true);
    }
  };

  const handleChoice = (method: "sms" | "whatsapp") => {
    setOpenDialog(false);
    // ✅ Redirect with query param to know the chosen method
    router.push(
      `/login/verify?phone=${encodeURIComponent(phone)}&method=${method}`
    );
  };

  return (
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
            Connectez-vous ou inscrivez-vous pour recevoir les notifications en
            temps réel
          </h1>
        </div>

        <div className="text-center mt-25 space-y-1 flex items-center flex-col relative">
          <h2 className="heading-1">Connexion ou inscription</h2>
          <p className="lg:max-w-[50ch] paragraph">
            Saisissez votre numéro de téléphone ou votre adresse e-mail. Vous
            recevrez un code pour confirmer votre identité.
          </p>

          <form onSubmit={handleSubmit} className="lg:w-[600px] p-8 space-y-4">
            <PhoneInput
              placeholder="Numéro de téléphone"
              defaultCountry="DZ"
              value={phone}
              onChange={(value) => setPhone(value)}
            />

            <div>
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-[#BDC1CA] border-0" />
                <span className="absolute px-3 font-medium text-[#9095A1] -translate-x-1/2 bg-white left-1/2">
                  Or
                </span>
              </div>
            </div>

            <Input
              placeholder="Se connecter avec une adresse e-mail"
              className="placeholder:text-[#4E4E4E] placeholder:!font-medium"
              startIcon={
                <Image src="/email.svg" alt="email" width={18} height={14} />
              }
            />

            <div>
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-[#BDC1CA] border-0" />
                <span className="absolute px-3 font-medium text-[#9095A1] -translate-x-1/2 bg-white left-1/2">
                  Or
                </span>
              </div>
            </div>

            <Input
              placeholder="Se connecter avec Google"
              className="placeholder:text-[#4E4E4E] placeholder:!font-medium"
              startIcon={
                <Image src="/google.svg" alt="Google" width={33} height={33} />
              }
            />
            <Input
              placeholder="Se connecter avec Apple"
              className="placeholder:text-[#4E4E4E] placeholder:!font-medium mb-25"
              startIcon={
                <Image src="/apple.svg" alt="Apple" width={33} height={33} />
              }
            />

            <p className="text-base leading-relaxed text-[#6B6B6B] mb-10">
              En cliquant sur le bouton suivant, vous reconnaissez avoir lu et
              accepté les{" "}
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

      {/* ✅ Dialog for choice (WhatsApp or SMS) */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[800px] bg-white p-0 border-none pb-10">
          <DialogHeader>
            <DialogTitle className="heading-1 text-3xl text-center px-15 pt-20">
              Comment voulez-vous recevoir votre code ?
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col  gap-4 mt-4 text-[#242524]">
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
  );
}

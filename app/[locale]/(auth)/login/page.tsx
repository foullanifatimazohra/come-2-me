"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function PhoneLogin() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Here you can also call your API to send OTP before redirecting
    if (phone.trim().length > 0) {
      router.push(`/login/verify?phone=${encodeURIComponent(phone)}`);
    }
  };

  return (
    <main className="flex h-screen w-screen mt-40">
      <section className="section-container">
        <div className="relative flex justify-center">
          <Link href="/" className="absolute left-0 top-0">
            <Image
              src="/go-back.svg"
              alt="Go back"
              width={81}
              height={81}
              priority
            />
          </Link>
          <h1 className="text-center heading-1 text-3xl max-w-[45ch] leading-[48px]">
            Connectez vous ou inscrivez-vous pour recevoir les notifications en
            temps réel
          </h1>
        </div>

        <div className="text-center mt-25 space-y-1 flex items-center flex-col">
          <h2 className="heading-1">Connexion ou inscription</h2>
          <p className="max-w-[50ch] paragraph">
            Saisissez votre numéro de téléphone ou votre adresse e-mail. Vous
            recevrez un code pour confirmer votre identité.{" "}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full p-8 space-y-6">
          <Input
            placeholder="Numéro de téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Button type="submit" className="w-full">
            Continuer
          </Button>
        </form>
      </section>
    </main>
  );
}

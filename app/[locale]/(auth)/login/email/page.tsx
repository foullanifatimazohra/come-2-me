"use client";

import { useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PhoneLogin() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      // Instead of redirecting directly, open the dialog
      router.push(`/login/verify?email=${encodeURIComponent(email)}`);
    }
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
            Vérifiez votre adresse e-mail
          </h1>
        </div>

        {/* Instructions */}
        <div className="text-center mt-25 space-y-4 flex items-center flex-col relative">
          <h2 className="heading-1">Adresse e-mail</h2>

          <p className="paragraph text-[#565D6D] text-[20px] max-w-[1000px] leading-relaxed">
            En cas de perte ou changement de numéro de téléphone vous pourrez
            récupérer votre compte via l’adresse e-mail et le mot de passe sur
            le site Come2me.dz
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="flex justify-center lg:w-[600px] w-full mx-auto mt-10">
            <Input
              type="email"
              placeholder="Adresse e-mail"
              startIcon={
                <Image src="/email.svg" alt="email" width={18} height={14} />
              }
              value={email}
              className=""
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <p className="text-base leading-relaxed text-[#6B6B6B] mt-20">
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
            disabled={!email}
            className="absolute bottom-0 right-0 font-semibold px-10 mb-10 text-white text-xl"
          >
            Suivant
          </Button>
        </form>
      </section>
    </main>
  );
}

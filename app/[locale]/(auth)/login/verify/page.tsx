"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyCode() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow rounded-xl space-y-6">
        <h1 className="text-center text-xl font-bold">Vérifiez votre code</h1>
        <p className="text-sm text-gray-500 text-center">
          Nous avons envoyé un code à votre numéro/e-mail
        </p>
        <div className="flex gap-2 justify-center">
          {[...Array(4)].map((_, i) => (
            <Input key={i} className="w-12 text-center" maxLength={1} />
          ))}
        </div>
        <Button className="w-full">Vérifier</Button>
        <Button variant="ghost" onClick={() => router.back()}>
          Retour
        </Button>
      </div>
    </div>
  );
}

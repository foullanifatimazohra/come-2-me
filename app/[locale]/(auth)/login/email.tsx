"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmailLogin() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow rounded-xl space-y-6">
        <h1 className="text-center text-xl font-bold">Connexion avec e-mail</h1>
        <Input placeholder="Adresse e-mail" />
        <Button className="w-full" onClick={() => router.push("/login/verify")}>
          Continuer
        </Button>
      </div>
    </div>
  );
}

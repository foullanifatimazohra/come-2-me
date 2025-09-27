import { Button } from "@/components/ui/button";

export default function PhoneExists() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow rounded-xl space-y-6 text-center">
        <h1 className="text-xl font-bold">Compte existe déjà</h1>
        <p>Un compte avec ce numéro de téléphone existe déjà.</p>
        <Button className="w-full">Se connecter</Button>
        <Button variant="outline" className="w-full">
          Réinitialiser le mot de passe
        </Button>
      </div>
    </div>
  );
}

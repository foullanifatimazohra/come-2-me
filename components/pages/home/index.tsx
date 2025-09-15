"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react"; // spinner icon

const serviceOptions = [
  { id: "cleaning", label: "Ménage" },
  { id: "repair", label: "Travaux & réparation" },
  { id: "electricity", label: "Électricité" },
  { id: "carwash", label: "Lavage auto" },
  { id: "moving", label: "Déménagement" },
];

export default function HomeServices() {
  const t = useTranslations("homeServices");
  const [address, setAddress] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // 📍 Use current geolocation
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n’est pas supportée par votre navigateur.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            {
              headers: {
                "User-Agent": "ur-docto/1.0 (contact@yourapp.com)",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Erreur API Nominatim");
          }

          const data = await response.json();
          console.log("Nominatim response:", data);

          if (data?.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress("Adresse introuvable");
          }
        } catch (err) {
          console.error("Erreur:", err);
          setAddress("Erreur lors de la récupération de l’adresse");
        } finally {
          setLoadingLocation(false);
          setShowDropdown(false);
        }
      },
      (error) => {
        console.error("Erreur géolocalisation:", error);
        alert("Impossible de récupérer votre position.");
        setLoadingLocation(false);
        setShowDropdown(false);
      }
    );
  };

  return (
    <section className="max-w-4xl mt-40 mx-auto p-6">
      <Tabs defaultValue="home" className="w-full">
        {/* ---- Tabs ---- */}
        <TabsList className="flex gap-6 justify-center mb-6">
          <TabsTrigger
            value="home"
            className="data-[state=inactive]:text-gray-400"
          >
            🏠 {t("tabs.home")}
          </TabsTrigger>
          <TabsTrigger
            value="driver"
            className="data-[state=inactive]:text-gray-400"
          >
            🚖 {t("tabs.driver")}
          </TabsTrigger>
          <TabsTrigger
            value="market"
            className="data-[state=inactive]:text-gray-400"
          >
            🛒 {t("tabs.market")}
          </TabsTrigger>
          <TabsTrigger
            value="food"
            className="data-[state=inactive]:text-gray-400"
          >
            🍔 {t("tabs.food")}
          </TabsTrigger>
        </TabsList>

        {/* ---- Content ---- */}
        <TabsContent value="home">
          <Card className="border-none shadow-none text-start">
            <CardContent className="flex flex-col gap-4">
              <h2 className="heading-2">{t("title")}</h2>
              <p className="sub-heading">Home Services</p>

              {/* Adresse input with dropdown */}
              <div className="relative flex flex-col gap-2">
                <Input
                  placeholder={t("addressPlaceholder")}
                  value={address}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  onChange={(e) => setAddress(e.target.value)}
                />

                {showDropdown && (
                  <ul className="absolute z-10 top-full left-0 w-full bg-white border rounded shadow-md">
                    <li
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                      onClick={handleUseMyLocation}
                    >
                      {loadingLocation ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                          <span>Recherche...</span>
                        </>
                      ) : (
                        <>📍 {t("myPosition")}</>
                      )}
                    </li>
                  </ul>
                )}
              </div>

              {/* Service dropdown */}
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("servicePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

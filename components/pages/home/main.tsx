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
import Image from "next/image";
import { Loader2 } from "lucide-react"; // spinner icon

const serviceOptions = [
  { id: "cleaning", label: "Ménage" },
  { id: "repair", label: "Travaux & réparation" },
  { id: "electricity", label: "Électricité" },
  { id: "carwash", label: "Lavage auto" },
  { id: "moving", label: "Déménagement" },
];

export default function Main() {
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
    <main className="relative h-fit lg:h-screen">
      <div className="container px-6 lg:mx-auto z-10 lg:pt-50 pt-30">
        <Tabs
          defaultValue="home"
          className="max-w-[680px] px-9 py-4 main-card bg-white"
        >
          {/* ---- Tabs ---- */}
          <TabsList className="flex flex-wrap gap-6 p-0 justify-center mb-6 h-full w-full rounded-none border-b-1 border-[#BDC1CA]">
            <TabsTrigger
              value="home"
              className="data-[state=inactive]:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-b-[#1E2128] rounded-none !shadow-none h-fit"
            >
              <div className="flex flex-col  justify-between items-center">
                <Image
                  src="/images/home.png"
                  alt="Home"
                  width={80}
                  height={80}
                  className="h-20 w-20"
                />
                <p>{t("tabs.home")}</p>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="driver"
              disabled
              className="data-[state=inactive]:opacity-50 h-full data-[state=active]:border-b-2 data-[state=active]:border-b-[#1E2128] rounded-none !shadow-none"
            >
              <div className="flex flex-col justify-between items-center">
                <Image
                  src="/images/driver.png"
                  alt="Driver"
                  width={80}
                  height={80}
                  className="h-20 w-20 "
                />
                <p>{t("tabs.driver")}</p>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="market"
              disabled
              className="data-[state=inactive]:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-b-[#1E2128] rounded-none !shadow-none h-fit"
            >
              <div className="flex flex-col justify-between items-center">
                <Image
                  src="/images/market.png"
                  alt="Market"
                  width={80}
                  height={80}
                  className="h-20 w-20 "
                />
                <p>{t("tabs.market")}</p>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="food"
              disabled
              className="data-[state=inactive]:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-b-[#1E2128] rounded-none !shadow-none h-fit"
            >
              <div className="flex flex-col justify-between items-center">
                <Image
                  src="/images/food.png"
                  alt="Food"
                  width={80}
                  height={80}
                  className="h-20 w-20"
                />
                <p>{t("tabs.food")}</p>
              </div>
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
      </div>
      <Image
        alt="background"
        src="/images/home-bg.png"
        width={1440}
        height={700}
        className="absolute top-0 left-0 w-full h-full object-cover object-top-right z-[-1]"
      />
    </main>
  );
}

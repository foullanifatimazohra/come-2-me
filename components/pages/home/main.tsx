/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
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
import { Loader2 } from "lucide-react";
import useGeolocationAddress from "@/hooks/useGeolocationAddress";
import { useRouter } from "@/i18n/navigation";

export default function Main() {
  const t = useTranslations("homeServices");
  const [categories, setCategories] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // ✅ Use custom hook
  const { address, error, loading, getMyLocation, latlng } =
    useGeolocationAddress();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories/");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();

        // Transform API response into {id, label}
        const formatted = data.map((cat: any) => ({
          id: String(cat.id),
          label: cat.name,
          subcategories: cat.subcategories ?? [],
        }));

        setCategories(formatted);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  // ✅ goToAuth with all params
  const goToAuth = (selectedCategory: string) => {
    const params = new URLSearchParams();
    params.set("category", selectedCategory);
    if (latlng) {
      params.set("lat", String(latlng.lat));
      params.set("lng", String(latlng.lng));
    }

    router.push(`/login?${params.toString()}`);
  };

  return (
    <main className="relative h-fit lg:h-screen">
      <div className="section-container z-10 lg:pt-40 pt-30">
        <Tabs
          defaultValue="home"
          className="max-w-[680px] px-9 py-4 main-card bg-white"
        >
          {/* ---- Tabs ---- */}
          <TabsList className="flex rtl:flex-row-reverse flex-wrap gap-6 p-0 justify-center h-full w-full rounded-none border-b-1 border-[#BDC1CA]">
            <TabsTrigger
              value="home"
              className="data-[state=inactive]:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-b-[#1E2128] rounded-none !shadow-none h-fit"
            >
              <div className="flex flex-col justify-between items-center">
                <Image
                  src="/images/home.png"
                  alt="Home"
                  width={90}
                  height={90}
                  className="h-22 w-22"
                />
                <p className="text-sm font-semibold">
                  {t("tabs.home").toUpperCase()}
                </p>
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
                  width={88}
                  height={65}
                  className="w-22 h-16"
                />
                <p className="text-sm font-semibold pt-4">{t("tabs.driver")}</p>
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
                  width={75}
                  height={75}
                  className="h-19 w-19"
                />
                <p className="text-sm font-semibold pt-1">{t("tabs.market")}</p>
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
                  width={88}
                  height={88}
                  className="h-22 w-22"
                />
                <p className="text-sm font-semibold">{t("tabs.food")}</p>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* ---- Content ---- */}
          <TabsContent value="home">
            <Card className="border-none shadow-none text-start">
              <CardContent className="flex flex-col rtl:items-end">
                <h2 className="heading-2 ltr:max-w-[25ch]">{t("title")}</h2>
                <p className="sub-heading mb-4">{t("tabs.home")}</p>

                <div className="space-y-3 w-full">
                  {/* Adresse input with dropdown */}
                  <div className="relative flex flex-col gap-2">
                    <Input
                      placeholder={t("addressPlaceholder")}
                      value={address ?? ""}
                      onFocus={() => setShowDropdown(true)}
                      readOnly
                    />

                    {showDropdown && !address && (
                      <ul className="absolute z-10 top-full left-0 w-full bg-white border rounded shadow-md">
                        <li
                          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            getMyLocation();
                            setShowDropdown(false);
                          }}
                        >
                          {loading ? (
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

                    {error && (
                      <p className="mt-2 text-sm text-red-500">{error}</p>
                    )}
                  </div>

                  {/* Service dropdown with categories + subcategories */}
                  <Select
                    disabled={!address}
                    onValueChange={(val) => goToAuth(val)} // ✅ trigger redirect
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("servicePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length > 0 &&
                        categories.map((cat: any) => (
                          <div key={cat.id}>
                            {cat.subcategories?.length > 0 ? (
                              cat.subcategories.map((sub: any) => (
                                <SelectItem key={sub.id} value={sub.id}>
                                  {sub.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.label}
                              </SelectItem>
                            )}
                          </div>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
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

import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Advantages() {
  const t = await getTranslations("advantages");
  const cards = t.raw("items") || [];

  return (
    <section className="bg-[#171A1F] text-white py-12">
      <div className="container mx-auto max-lg:px-6 space-y-6 px-4">
        <div className="flex max-lg:flex-col justify-between items-center ">
          <div className="w-full text-center relative mb-10">
            <h2 className="heading-1 font-bold">{t("title")}</h2>
            <p className="text-lg font-semibold">{t("subtitle")}</p>
          </div>
          <Button
            variant="outline"
            className="lg:absolute right-20 rtl:left-20 rtl:right-auto"
          >
            {t("button")} <ArrowRight className="rtl:rotate-180" />
          </Button>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {cards.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cards.map((adv: any, i: number) => (
              <div key={i} className="space-y-2">
                <h3 className="font-semibold text-2xl">{adv.title}</h3>
                <p className="text-lg text-white whitespace-pre-line">
                  {adv.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

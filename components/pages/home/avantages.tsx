import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Advantages() {
  const t = await getTranslations("advantages");
  const cards = t.raw("items") || [];

  return (
    <section className="bg-[#171A1F] text-white py-12">
      <div className="section-container space-y-6 px-4">
        <div className="flex max-lg:flex-col justify-between items-center">
          <div className="w-full text-center relative mb-10">
            <h2 className="heading-1 font-semibold">{t("title")}</h2>
            <p className="text-base font-semibold">{t("subtitle")}</p>
          </div>
          <Button
            variant="outline"
            className="lg:absolute right-20 rtl:left-20 rtl:right-auto"
          >
            {t("button")} <ArrowRight className="rtl:rotate-180" />
          </Button>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
          {cards.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cards.map((adv: any, i: number) => (
              <div key={i} className="space-y-2 w-full">
                <h3 className="font-semibold text-xl">{adv.title}</h3>
                <p className="text-lg font-medium text-white whitespace-pre-line max-w-[30ch]">
                  {adv.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

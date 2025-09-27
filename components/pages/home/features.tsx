import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function Features() {
  const t = await getTranslations("features");
  const cards = t.raw("cards") || [];
  return (
    <section className="section-container py-[56px] space-y-10">
      <h2 className="heading-1 text-[#171A1F] text-center">{t("title")}</h2>
      <div className="grid lg:grid-cols-2 gap-6 section-container">
        {cards.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cards.map((item: any, index: number) => (
            <Card
              key={index}
              className={`flex flex-row lg:max-h-[200px] max-md:flex-col p-0 items-start justify-between ${
                item?.image ? "rounded-2xl" : "rounded-l-2xl"
              }  border-none  ${item.bg}`}
            >
              <CardContent className="py-6 pl-8">
                <h3
                  className={`font-semibold text-2xl ${
                    !item?.image ? "max-w-[32ch]" : " max-w-[30ch]"
                  }`}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-base font-normal text-muted-foreground mt-2">
                    {item.description}
                  </p>
                )}
                <Button variant="outline" className="mt-4 border-none">
                  {item.button} <ArrowRight className="rtl:rotate-180" />
                </Button>
              </CardContent>

              {item?.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={205}
                  height={205}
                  className="object-cover w-50 max-md:w-full h-full "
                />
              )}
            </Card>
          ))}
      </div>
    </section>
  );
}

export async function Partner() {
  const t = await getTranslations("partner");
  const cards = t.raw("cards") || [];

  return (
    <section className="py-24 section-container">
      <h2 className="text-center text-[32px] text-[#171A1F] font-bold mb-15">
        {t("title")}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-16">
        {cards.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cards.map((card: any) => (
            <div
              key={card.id}
              className={`text-[#171A1F] p-8 flex max-md:flex-col lg:max-h-[220px] max-w-[550px] items-start justify-between gap-8 rounded-2xl custom-shadow-lg ${
                card?.bg || "bg-white"
              }`}
            >
              <Image
                src={card.image}
                alt={card.title}
                width={160}
                height={160}
                className="rounded-md object-contain"
              />
              <div className="space-y-10 flex-1">
                <h3 className="font-semibold text-xl leading-[36px]">
                  {card.title}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-base font-semibold">{card.subtitle}</p>
                  <ArrowRight className="w-6 h-6 rtl:rotate-180" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

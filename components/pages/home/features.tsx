import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function Features() {
  const t = await getTranslations("features");
  const cards = t.raw("cards") || [];
  return (
    <section className="py-12 space-y-10">
      <h2 className="heading-1 text-center">{t("title")}</h2>
      <div className="grid lg:grid-cols-2 gap-6 container mx-auto max-lg:px-6">
        {cards.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cards.map((item: any, index: number) => (
            <Card
              key={index}
              className={`flex flex-row max-md:flex-col p-0 items-start justify-between rounded-none border-none  ${item.bg}`}
            >
              <CardContent className="py-6 pl-8">
                <h3 className="font-semibold text-2xl max-w-[30ch]">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-2">
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
                  className="object-cover w-50 max-md:w-full h-50"
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
    <section className="py-16 container mx-auto max-lg:px-6">
      <h2 className="text-center heading-1 mb-10">{t("title")}</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        {cards.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cards.map((card: any) => (
            <div
              key={card.id}
              className={`text-[#171A1F] p-8 flex max-md:flex-col items-start justify-between gap-8 rounded-none shadow-md ${
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
              <div className="space-y-5 flex-1">
                <h3 className="font-semibold text-2xl leading-[36px]">
                  {card.title}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">{card.subtitle}</p>
                  <ArrowRight className="w-6 h-6 rtl:rotate-180" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function DownloadApp() {
  const t = await getTranslations("download-app");

  const cards = t.raw("cards") || [];
  return (
    <section className="w-full bg-black py-12">
      <h2 className="heading-1 text-white leading-relaxed text-center mb-15">
        {t("title")}
      </h2>

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center text-white">
        {cards.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cards.map((card: any) =>
            card.type === "static" ? (
              // 🔹 Static QR card
              <div
                key={card.id}
                className="bg-white text-[#171A1F] p-8 flex items-start justify-between gap-8"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={160}
                  height={160}
                />
                <div className="space-y-5">
                  <h3 className="font-semibold text-2xl leading-[36px]">
                    {card.title}
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">{card.subtitle}</p>
                    <ArrowRight />
                  </div>
                </div>
              </div>
            ) : (
              // 🔹 Hover QR card
              <HoverCard key={card.id}>
                <HoverCardTrigger asChild>
                  <div className="bg-white text-[#171A1F] p-8 flex items-start justify-between gap-8 h-full cursor-pointer">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={170}
                      height={170}
                    />
                    <div className="space-y-5">
                      <h3 className="font-semibold text-2xl leading-[36px]">
                        {card.title}
                      </h3>
                      <div className="flex justify-between">
                        <p className="text-lg font-semibold">{card.subtitle}</p>
                        <ArrowRight />
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto bg-white p-4 rounded-xl shadow-lg flex justify-center">
                  <Image
                    src={card.hoverImage!}
                    alt="QR Code Hover"
                    width={160}
                    height={160}
                  />
                </HoverCardContent>
              </HoverCard>
            )
          )}
      </div>
    </section>
  );
}

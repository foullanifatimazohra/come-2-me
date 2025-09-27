import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function DownloadApp() {
  const t = await getTranslations("download-app");
  const cards = t.raw("cards") || [];

  return (
    <section className="w-full bg-black py-5">
      <div className="section-container">
        <h2 className="heading-1  text-white leading-relaxed text-center mb-[40px]">
          {t("title")}
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center text-white">
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cards.map((card: any) =>
              card.type === "static" ? (
                <div
                  key={card.id}
                  className="bg-white max-w-[540px] lg:max-h-[215px] text-[#171A1F] p-10 flex max-md:flex-col rounded-none items-center gap-8"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={160}
                    height={160}
                  />
                  <div className="space-y-5">
                    <h3 className="font-semibold text-xl leading-[36px]">
                      {card.title}
                    </h3>
                    <div className="flex justify-between">
                      <p className="text-base font-semibold">{card.subtitle}</p>
                      <ArrowRight className="rtl:rotate-180" />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={card.id}
                  className="group bg-white lg:max-w-[540px] w-full lg:max-h-[215px] text-[#171A1F] rounded-none p-10 flex max-md:flex-col items-center gap-8 h-full"
                >
                  {/* image-only flip */}
                  <div className="w-[170px] h-[170px] perspective">
                    <div className="flip-inner">
                      <div className="flip-front">
                        <div className="relative w-full h-full">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="flip-back">
                        <div className="relative w-full h-full">
                          <Image
                            src="/images/qr-code.svg"
                            alt="QR Code"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <h3 className="font-semibold text-xl leading-[36px]">
                      {card.title}
                    </h3>
                    <div className="flex justify-between">
                      <p className="text-base font-semibold">{card.subtitle}</p>
                      <ArrowRight className="rtl:rotate-180" />
                    </div>
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
    </section>
  );
}

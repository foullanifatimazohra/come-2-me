"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const t = useTranslations("how-it-works");
  const cards = t.raw("cards") || [];

  return (
    <section className="w-full bg-white py-22">
      <h2 className="heading-1 text-center font-bold mb-12">{t("title")}</h2>
      <div className="section-container flex flex-col lg:flex-row gap-20 items-center justify-center">
        {/* Left side - steps */}
        <div className="flex flex-col gap-4 justify-center">
          {cards.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cards.map((step: any, index: number) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer max-w-[700px] min-h-[112px] flex flex-col justify-center rounded-2xl custom-shadow py-4 px-6 transition-all ${
                  activeStep === index
                    ? "bg-[#171A1F] text-white"
                    : "bg-[#F3F4F6] text-[#171A1F]"
                }`}
              >
                <h3 className="font-semibold text-[19px]">{step.title}</h3>
                <p className="text-base leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
        </div>

        {/* Right side - dynamic image */}
        <div className="flex justify-center">
          <Image
            key={cards[activeStep].id} // ensures fade when changing
            src={cards[activeStep].image}
            alt={cards[activeStep].title}
            width={300}
            height={600}
            className="transition-opacity duration-500"
          />
        </div>
      </div>
    </section>
  );
}

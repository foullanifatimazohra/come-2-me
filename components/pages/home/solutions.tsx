"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Solutions() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("solutions");
  const solutions = t.raw("cards") || [];

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#171A1F] text-white py-12 relative space-y-15">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 md:px-12">
        <h2 className="heading-1 font-bold text-center w-full">{t("title")}</h2>
        <button onClick={handleScroll} className="transition">
          <ArrowRight className="rtl:rotate-180" />
        </button>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="mt-8 flex gap-20 overflow-x-auto px-6 md:px-12 no-scrollbar scroll-smooth"
      >
        {solutions.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          solutions.map((item: any, index: number) => (
            <div key={index} className="min-w-[256px] overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                width={256}
                height={276}
                className="object-cover w-64 h-69"
              />

              <div className="py-4 w-full flex gap-1 justify-between items-center">
                <p className="text-base leading-[28px] mt-2 font-semibold md:max-w-[20ch]">
                  {item.desc}
                </p>
                <ArrowRight className="rtl:rotate-180" />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function FaqSection() {
  const t = await getTranslations("faq");
  const items = t.raw("items") || [];

  return (
    <section className="section-container">
      <h2 className="text-center heading-1 mb-10">{t("title")}</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {items.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items.map((faq: any, i: number) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-[#DEE1E6] rounded-none px-4"
            >
              <AccordionTrigger className="text-2xl text-[#323743] font-normal text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#323743] text-base whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </section>
  );
}

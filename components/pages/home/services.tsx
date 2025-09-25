/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const Services = async () => {
  const t = await getTranslations("services");
  const data = await fetch("http://74.50.97.6:8080/api/categories", {
    method: "GET",
  });
  const categories = await data.json();

  return (
    <section className="section-container my-22 text-center">
      <p className="text-2xl font-semibold">Nos Catégories de Services</p>
      <h2 className="heading-1">{t("title")}</h2>
      <p className="sub-heading italic">{t("description")}</p>

      <div className="mt-14 flex flex-wrap gap-6 justify-center">
        {categories.length > 0 &&
          categories.map((category: any) => (
            <ServiceCard key={category.id} category={category} />
          ))}
      </div>
    </section>
  );
};

const ServiceCard = ({ category }: { category: any }) => {
  return (
    <div className="py-2 px-1 w-[144px] h-[112px] card-shadow border border-[#F4F4F5] rounded-lg relative flex flex-col items-center justify-center gap-1">
      <Image
        src={category?.icon}
        alt={category?.name}
        width={70}
        height={70}
        className="w-18 h-18 object-contain"
      />
      <p className="font-medium text-sm">{category?.name}</p>
    </div>
  );
};

export default Services;

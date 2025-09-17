/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Services = async () => {
  const data = await fetch("http://74.50.97.6:8080/api/categories/");
  const categories = await data.json();
  console.log(categories);

  return (
    <section className="container mx-auto my-10 p-6 text-center">
      <h2 className="heading-1">Simplifiez vous la vie avec Come2me</h2>
      <p className="sub-heading italic">
        Cliquez, planifiez et décrivez votre demande !
      </p>

      <div className="my-20 flex flex-wrap gap-6 justify-center">
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
    <Card className="px-3 py-4 w-[150px] card-shadow border-[#DEE1E6] rounded-lg relative">
      <CardContent className="flex flex-col items-center gap-1">
        <Image
          src={category?.icon}
          alt={category?.name}
          width={80}
          height={80}
          className="w-20 h-20"
        />
        <p className="font-medium ">{category?.name}</p>
      </CardContent>
    </Card>
  );
};

export default Services;

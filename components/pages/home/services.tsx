import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
const services = [
  { id: "cleaning", icon: "🧹", key: "cleaning" },
  { id: "repair", icon: "🛠️", key: "repair" },
  { id: "electricity", icon: "💡", key: "electricity" },
  { id: "carwash", icon: "🚗", key: "carwash" },
  { id: "moving", icon: "📦", key: "moving" },
  { id: "it", icon: "💻", key: "it" },
  { id: "mechanic", icon: "🔧", key: "mechanic" },
  { id: "school", icon: "📘", key: "school" },
  { id: "gardening", icon: "🌱", key: "gardening" },
  { id: "painting", icon: "🎨", key: "painting" },
  { id: "babysitting", icon: "👶", key: "babysitting" },
  { id: "beauty", icon: "💇", key: "beauty" },
  { id: "plumbing", icon: "🚰", key: "plumbing" },
  { id: "gas", icon: "🔥", key: "gas" },
  { id: "coach", icon: "🏋️", key: "coach" },
  { id: "heating", icon: "🔥", key: "heating" },
  { id: "furniture", icon: "🪑", key: "furniture" },
];
const Services = () => {
  return (
    <section className="container mx-auto p-6 text-center">
      <h2 className="heading-1">Simplifiez vous la vie avec Come2me</h2>
      <p className="sub-heading italic">
        Cliquez , planifiez et décrivez votre demande !
      </p>
      <div>
        <ServiceCard />
      </div>
    </section>
  );
};

const ServiceCard = () => {
  return (
    <Card className="p-6 w-fit card-shadow border-[#DEE1E6] rounded-lg relative">
      <CardContent className="flex flex-col gap-1">
        <Image src="/images/menage.svg" alt="Cleaning" width={80} height={77} />
        <p className="font-medium ">Ménage</p>
      </CardContent>
    </Card>
  );
};

export default Services;

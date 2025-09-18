import { Main } from "@/components/pages/home";
import DownloadApp from "@/components/pages/home/download-app";
import Features from "@/components/pages/home/features";
import HowItWorks from "@/components/pages/home/how-it-works";
import Services from "@/components/pages/home/services";
import Solutions from "@/components/pages/home/solutions";
import { Partner } from "@/components/pages/home/features";
import FaqSection from "@/components/pages/home/faq";

export default function Home() {
  return (
    <>
      <Main />
      <Services />
      <Solutions />
      <HowItWorks />
      <DownloadApp />
      <Features />
      <Partner />
      <FaqSection />
    </>
  );
}

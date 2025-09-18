import { Main } from "@/components/pages/home";
import DownloadApp from "@/components/pages/home/download-app";
import HowItWorks from "@/components/pages/home/how-it-works";
import Services from "@/components/pages/home/services";
import Solutions from "@/components/pages/home/solutions";

export default function Home() {
  return (
    <>
      <Main />
      <Services />
      <Solutions />
      <HowItWorks />
      <DownloadApp />
    </>
  );
}

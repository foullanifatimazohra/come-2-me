import Partner, {
  Main,
  Services,
  Solutions,
  HowItWorks,
  DownloadApp,
  Features,
  FaqSection,
} from "@/components/pages/home";

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

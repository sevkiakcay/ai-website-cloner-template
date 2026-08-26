import { Header } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/Header";
import { Hero } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/Hero";
import { HeroTransition } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/HeroTransition";
import { FeatureGrid } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/FeatureGrid";
import { ProcessShowcase } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/ProcessShowcase";
import { WhyUs } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/WhyUs";
import { FinalCta } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/FinalCta";
import { Footer } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/Footer";

export default function Home() {
  return (
    <main id="top" className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <HeroTransition />
      <FeatureGrid />
      <ProcessShowcase />
      <WhyUs />
      <FinalCta />
      <Footer />
    </main>
  );
}

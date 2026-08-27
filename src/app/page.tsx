import { Header } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/Header";
import { Hero } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/Hero";
import { HeroTransition } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/HeroTransition";
import { ProductSpecs } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/ProductSpecs";
import { CustomManufacturing } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/CustomManufacturing";
import { ProcessShowcase } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/ProcessShowcase";
import { WhyUs } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/WhyUs";
import { FinalCta } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/FinalCta";
import { Footer } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/Footer";
import { StickyQuoteBar } from "@/components/sites/apple-com-79a1c2f0/root-e3b0c442/StickyQuoteBar";

export default function Home() {
  return (
    <main id="top" className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <HeroTransition />
      <ProductSpecs />
      <CustomManufacturing />
      <ProcessShowcase />
      <WhyUs />
      <FinalCta />
      <Footer />
      <StickyQuoteBar />
    </main>
  );
}

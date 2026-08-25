import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ProductGrid } from "@/components/site/ProductGrid";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-black">
        <Hero
          eyebrow="Akçay Palet"
          title="Yeni Nesil Yaşam."
          subtitle="Zarafet ve gücü bir araya getiren tasarım felsefesi."
          primaryCta="Satın Al"
          secondaryCta="Daha Fazla Bilgi"
        />
        <ProductGrid />
        <Hero
          eyebrow="Akçay Palet Studio"
          title="Yarat. Sınırsızca."
          subtitle="Her fikir için tasarlandı."
          primaryCta="Keşfet"
          secondaryCta="Karşılaştır"
          className="min-h-[520px] bg-gradient-to-b from-black to-neutral-950 py-20"
        />
      </main>
      <Footer />
    </>
  );
}

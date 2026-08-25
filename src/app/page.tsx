import { Navigation } from "@/components/layout/navigation";
import { PalletFilm } from "@/components/cinematic/pallet-film";
import { DimensionVisualizer } from "@/components/products/dimension-visualizer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <PalletFilm />

        <DimensionVisualizer />

        <section id="kurumsal" className="border-t border-border bg-background px-6 py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
              Akçay Orman Ürünleri İnşaat Sanayi ve Ticaret A.Ş.
            </span>
            <p className="mt-6 text-balance text-2xl leading-snug text-paper sm:text-3xl">
              Salihli, Manisa merkezli üretim tesisimizde ısıl işlemli ve işlem görmemiş
              ahşap palet üretiyoruz.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Isıl İşlem · Üretim · Ürün Evreni · Lojistik bölümleri yakında yayında.
            </p>
          </div>
        </section>

        <footer id="iletisim" className="border-t border-border px-6 py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
            <span className="font-mono text-xs tracking-[0.3em] text-paper uppercase">Akçay Palet</span>
            <p className="text-xs text-muted-foreground">Salihli, Manisa, Türkiye</p>
            <p className="text-[11px] tracking-[0.08em] text-muted-foreground/70 uppercase">
              [İletişim bilgisi — doğrulanmış veri eklenecek]
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

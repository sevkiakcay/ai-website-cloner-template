import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  CratePalletIllustration,
  RecycleLoopIllustration,
} from "../shared/illustrations";
import { ArrowRightIcon } from "../shared/icons";

interface Tile {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  dark?: boolean;
  visual: ReactNode;
  span: "half" | "quarter";
}

const TILES: Tile[] = [
  {
    id: "ahsap-buyuk",
    title: "Ahşap Palet",
    subtitle: "Her yük için doğru ölçü ve sınıf.",
    ctaLabel: "İncele",
    ctaHref: "#ahsap-palet",
    secondaryLabel: "Fiyat Al",
    span: "half",
    visual: (
      <div className="flex h-full items-end justify-center pt-8">
        <div className="h-24 w-full rounded-t-2xl bg-gradient-to-t from-[#C88A4A]/25 to-transparent" />
      </div>
    ),
  },
  {
    id: "sepet-palet",
    title: "Kasa & Sepet Palet",
    subtitle: "Katlanabilir, dayanıklı, alan kazandırır.",
    ctaLabel: "İncele",
    ctaHref: "#kasa-sepet",
    secondaryLabel: "Fiyat Al",
    dark: true,
    span: "half",
    visual: (
      <div className="flex h-full items-center justify-center px-10 pb-4">
        <CratePalletIllustration className="h-auto w-full max-w-[280px]" />
      </div>
    ),
  },
  {
    id: "geri-donusum",
    title: "Geri Dönüşüm",
    subtitle: "Kullanılmış paletini değerlendir.",
    ctaLabel: "Detaylar",
    ctaHref: "#iletisim",
    span: "quarter",
    visual: (
      <div className="flex h-full items-center justify-center pb-4 text-primary">
        <RecycleLoopIllustration className="h-24 w-24" />
      </div>
    ),
  },
  {
    id: "kiralama",
    title: "Palet Kiralama",
    subtitle: "Sermayeni sabit yatırıma bağlama.",
    ctaLabel: "İncele",
    ctaHref: "#kiralama",
    span: "quarter",
    visual: (
      <div className="flex h-full items-end justify-center pb-4">
        <div className="grid w-40 grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-10 rounded-md bg-primary/15" style={{ marginTop: i * 6 }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "ozel-uretim",
    title: "Özel Ölçü Üretim",
    subtitle: "Projenize özel palet tasarımı.",
    ctaLabel: "Teklif Al",
    ctaHref: "#iletisim",
    span: "quarter",
    visual: (
      <div className="flex h-full items-end justify-center pb-4">
        <div className="flex gap-1.5">
          {[10, 16, 22, 16, 10].map((h, i) => (
            <div key={i} className="w-4 rounded-t bg-foreground/10" style={{ height: h * 4 }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "kurumsal",
    title: "Kurumsal Anlaşma",
    subtitle: "Yıllık sözleşmede özel fiyatlandırma.",
    ctaLabel: "Görüşelim",
    ctaHref: "#iletisim",
    span: "quarter",
    visual: (
      <div className="flex h-full items-center justify-center pb-4">
        <span className="text-[13px] font-medium text-muted-foreground">%100</span>
      </div>
    ),
  },
];

function TileCard({ tile }: { tile: Tile }) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-[18px] px-8 pt-10 pb-0 text-center",
        tile.span === "half" ? "min-h-[420px]" : "min-h-[320px]",
        tile.dark
          ? "bg-surface-dark text-surface-dark-foreground"
          : "bg-surface-alt text-foreground",
      )}
    >
      <h3 className="text-[22px] font-semibold tracking-tight md:text-[26px]">{tile.title}</h3>
      <p
        className={cn(
          "mt-1.5 text-[14px] md:text-[15px]",
          tile.dark ? "text-surface-dark-foreground/70" : "text-muted-foreground",
        )}
      >
        {tile.subtitle}
      </p>
      <div className="mt-3 flex items-center justify-center gap-3 text-[13px] font-medium">
        <a
          href={tile.ctaHref}
          className={cn(
            "inline-flex items-center gap-1 hover:underline",
            tile.dark ? "text-primary-foreground" : "text-primary",
          )}
        >
          {tile.ctaLabel}
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </a>
        {tile.secondaryLabel && (
          <a href={tile.ctaHref} className="hover:underline">
            {tile.secondaryLabel}
          </a>
        )}
      </div>
      <div className="flex-1">{tile.visual}</div>
    </div>
  );
}

export function FeatureGrid() {
  const halves = TILES.filter((t) => t.span === "half");
  const quarters = TILES.filter((t) => t.span === "quarter");
  return (
    <section id="kasa-sepet" className="bg-background px-4 py-4 md:px-6">
      <div className="mx-auto grid max-w-[1024px] gap-4 md:grid-cols-2">
        {halves.map((tile) => (
          <TileCard key={tile.id} tile={tile} />
        ))}
      </div>
      <div className="mx-auto mt-4 grid max-w-[1024px] gap-4 sm:grid-cols-2 md:grid-cols-4">
        {quarters.map((tile) => (
          <TileCard key={tile.id} tile={tile} />
        ))}
      </div>
    </section>
  );
}

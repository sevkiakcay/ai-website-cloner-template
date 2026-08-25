import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  WoodPalletTopViewIllustration,
  QualitySealIllustration,
  TruckIllustration,
  RulerIllustration,
  DirectLinkIllustration,
  StackIllustration,
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
    id: "ahsap-palet-olcu",
    title: "Ahşap Palet",
    subtitle: "80x120, 80x100, 100x120 standart ölçüler.",
    ctaLabel: "İncele",
    ctaHref: "#ahsap-palet",
    secondaryLabel: "Teklif Al",
    span: "half",
    visual: (
      <div className="flex h-full items-end justify-center pt-4 pb-2">
        <WoodPalletTopViewIllustration className="h-auto w-full max-w-[260px]" />
      </div>
    ),
  },
  {
    id: "ihracat-detay",
    title: "İhracat Paleti",
    subtitle: "ISPM-15 uyumlu ısıl işlem süreciyle üretim.",
    ctaLabel: "İncele",
    ctaHref: "#ihracat-paleti",
    secondaryLabel: "Teklif Al",
    dark: true,
    span: "half",
    visual: (
      <div className="flex h-full items-center justify-center pb-4 text-primary">
        <QualitySealIllustration className="h-28 w-28" />
      </div>
    ),
  },
  {
    id: "ic-piyasa",
    title: "İç Piyasa Paleti",
    subtitle: "Yurt içi lojistik ve depolama için ekonomik seçenek.",
    ctaLabel: "İncele",
    ctaHref: "#ahsap-palet",
    span: "quarter",
    visual: (
      <div className="flex h-full items-center justify-center pb-4 text-foreground/50">
        <StackIllustration className="h-auto w-full max-w-[150px]" />
      </div>
    ),
  },
  {
    id: "ozel-olcu-tile",
    title: "Özel Ölçü Üretim",
    subtitle: "Ürününüze göre tasarlanan palet ölçüsü.",
    ctaLabel: "Teklif Al",
    ctaHref: "#iletisim",
    span: "quarter",
    visual: (
      <div className="flex h-full items-center justify-center pb-4 text-foreground/70">
        <RulerIllustration className="h-auto w-full max-w-[160px]" />
      </div>
    ),
  },
  {
    id: "hizli-sevkiyat",
    title: "Hızlı Sevkiyat",
    subtitle: "Sipariş planlamasına uygun düzenli teslimat.",
    ctaLabel: "Detaylar",
    ctaHref: "#iletisim",
    span: "quarter",
    visual: (
      <div className="flex h-full items-center justify-center pb-4 text-foreground/70">
        <TruckIllustration className="h-auto w-full max-w-[160px]" />
      </div>
    ),
  },
  {
    id: "b2b-hizmet",
    title: "Kurumsal B2B Hizmet",
    subtitle: "Üretici ile doğrudan görüşme, aracısız teklif.",
    ctaLabel: "Görüşelim",
    ctaHref: "#iletisim",
    span: "quarter",
    visual: (
      <div className="flex h-full items-center justify-center pb-4 text-foreground/50">
        <DirectLinkIllustration className="h-auto w-full max-w-[160px]" />
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
    <section id="ozel-olcu" className="bg-background px-4 py-4 md:px-6">
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

const SPEC_ROWS = [
  { product: "Ahşap Palet", size: "80 × 120 cm", heat: "Opsiyonel", use: "EUR/EPAL ölçü standardı, genel amaçlı taşıma" },
  { product: "Ahşap Palet", size: "80 × 100 cm", heat: "Opsiyonel", use: "Genel amaçlı taşıma ve depolama" },
  { product: "Ahşap Palet", size: "100 × 120 cm", heat: "Opsiyonel", use: "Ağır yük taşıma" },
  { product: "İhracat Paleti", size: "Siparişe göre", heat: "ISPM-15 uyumlu", use: "Yurt dışı sevkiyat" },
  { product: "İç Piyasa Paleti", size: "Siparişe göre", heat: "İşlemsiz", use: "Yurt içi lojistik ve depolama" },
  { product: "Özel Ölçü", size: "Sizin belirlediğiniz", heat: "İhtiyaca göre", use: "Ürününüze özel tasarım — bkz. Özel Üretim" },
];

/**
 * Post-hero "can they make what I need?" answer — a technical specification
 * table instead of six identical cards, so it reads as an industrial
 * capability sheet rather than a generic feature-grid.
 */
export function ProductSpecs() {
  return (
    <section id="urunler" className="bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1024px]">
        <div className="grid gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Ürün Çözümlerimiz
            </p>
            <h2 className="mt-3 text-[28px] leading-[1.1] font-semibold tracking-tight text-foreground md:text-[36px]">
              Standarttan özel üretime, tek üretici.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              EUR/EPAL ölçü standardından özel ölçü üretime, ısıl işlemli ihracat paletinden yurt içi
              lojistik çözümüne — tüm palet ihtiyacınızı tek noktadan karşılıyoruz.
            </p>
            <a
              href="#iletisim"
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:underline"
            >
              Teklif Al
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Desktop: full spec table. Mobile: stacked rows — a horizontally-scrolled
              table with no scroll affordance is a poor fit for a phone screen. */}
          <table className="hidden w-full border-collapse text-left text-[14px] md:table">
            <thead>
              <tr className="border-b border-border text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                <th className="py-3 pr-4 font-medium">Ürün</th>
                <th className="py-3 pr-4 font-medium">Ölçü</th>
                <th className="py-3 pr-4 font-medium">Isıl İşlem</th>
                <th className="py-3 font-medium">Kullanım</th>
              </tr>
            </thead>
            <tbody>
              {SPEC_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-border/60 text-foreground">
                  <td className="py-3.5 pr-4 font-medium whitespace-nowrap">{row.product}</td>
                  <td className="py-3.5 pr-4 font-mono text-[13px] whitespace-nowrap [font-variant-numeric:tabular-nums]">
                    {row.size}
                  </td>
                  <td className="py-3.5 pr-4 whitespace-nowrap text-muted-foreground">{row.heat}</td>
                  <td className="py-3.5 text-muted-foreground">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="divide-y divide-border md:hidden">
            {SPEC_ROWS.map((row, i) => (
              <div key={i} className="py-4 first:pt-0">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-medium text-foreground">{row.product}</p>
                  <p className="font-mono text-[13px] text-muted-foreground [font-variant-numeric:tabular-nums]">
                    {row.size}
                  </p>
                </div>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {row.heat} — {row.use}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

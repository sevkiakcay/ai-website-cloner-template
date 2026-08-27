const REQUIREMENTS = [
  { n: "01", label: "Ölçü", desc: "Uzunluk, genişlik ve yükseklik." },
  { n: "02", label: "Yük gereksinimi", desc: "Taşınacak ürünün ağırlığı ve dağılımı." },
  { n: "03", label: "Adet", desc: "Tek seferlik veya düzenli sipariş miktarı." },
  { n: "04", label: "Isıl işlem ihtiyacı", desc: "İhracat için ISPM-15 gerekip gerekmediği." },
  { n: "05", label: "Fotoğraf / çizim / şartname", desc: "Elinizdeki teknik doküman varsa paylaşın." },
];

/**
 * Custom manufacturing gets its own dedicated, confident section instead of
 * being one tile among six — it's the highest-leverage business message on
 * the page (standard sizes are commoditized; custom capability is not).
 */
export function CustomManufacturing() {
  return (
    <section id="ozel-uretim" className="bg-surface-alt px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-[1024px] gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">Özel Üretim</p>
          <h2 className="font-heading mt-3 text-[33px] leading-[1.06] font-semibold tracking-[-0.015em] text-foreground md:text-[46px]">
            Ölçünüze Göre Üretiyoruz.
          </h2>
          <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-muted-foreground">
            Standart ölçüler her ihtiyaca uymaz. Bize aşağıdaki bilgileri iletin, size özel üretim
            planını ve teklifini hazırlayalım — geleneksel bir üreticiyle görüşmekten çok daha hızlı.
          </p>
          <a
            href="#iletisim"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Özel Üretim Teklifi İste
            <span aria-hidden>→</span>
          </a>
        </div>

        <ol className="flex flex-col divide-y divide-border">
          {REQUIREMENTS.map((req) => (
            <li key={req.n} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <span className="font-mono text-[13px] text-primary/70 tabular-nums">{req.n}</span>
              <div>
                <p className="text-[15px] font-medium text-foreground">{req.label}</p>
                <p className="mt-0.5 text-[13px] text-muted-foreground">{req.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

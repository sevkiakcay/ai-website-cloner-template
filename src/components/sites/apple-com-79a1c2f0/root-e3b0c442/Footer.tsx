import { LogoMark } from "../shared/icons";

// Each link routes to the section that actually answers it — not a blanket
// "#iletisim" for everything (that dead-ended the whole footer at one anchor).
const COLUMNS = [
  {
    heading: "Ürünler",
    links: [
      { label: "Ahşap Palet (80x120)", href: "#ahsap-palet" },
      { label: "Ahşap Palet (80x100)", href: "#ahsap-palet" },
      { label: "Ahşap Palet (100x120)", href: "#ahsap-palet" },
      { label: "Özel Ölçü Üretim", href: "#ozel-olcu" },
    ],
  },
  {
    heading: "İhracat",
    links: [
      { label: "İhracat Paleti", href: "#ozel-olcu" },
      { label: "Isıl İşlemli Palet", href: "#uretim-sureci" },
      { label: "ISPM-15 Uyumlu Üretim", href: "#uretim-sureci" },
      { label: "İç Piyasa Paleti", href: "#ozel-olcu" },
    ],
  },
  {
    heading: "Kurumsal",
    links: [
      { label: "Üretim Sürecimiz", href: "#uretim-sureci" },
      { label: "Neden Akçay Palet", href: "#neden-akcay" },
      { label: "Kalite Kontrol Noktalarımız", href: "#uretim-sureci" },
    ],
  },
  {
    heading: "Destek",
    links: [
      { label: "Teklif Al", href: "#iletisim" },
      { label: "Sipariş & Sevkiyat", href: "#iletisim" },
      { label: "İletişim", href: "#iletisim" },
    ],
  },
];

// No privacy/terms/cookie pages exist yet — plain text rather than links to nowhere.
const LEGAL_LABELS = ["Gizlilik", "Kullanım Şartları", "Çerezler"];

export function Footer() {
  return (
    <footer className="border-t border-surface-dark-foreground/10 bg-surface-dark text-surface-dark-foreground">
      <div className="mx-auto max-w-[1024px] px-6 py-14">
        <div className="flex items-center gap-2 text-[13px] font-semibold tracking-tight">
          <LogoMark className="h-4 w-4 text-primary" />
          Akçay Palet
        </div>
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-semibold tracking-[0.1em] text-surface-dark-foreground/45 uppercase">
                {col.heading}
              </h4>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-surface-dark-foreground/75 transition-colors hover:text-surface-dark-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-surface-dark-foreground/10 px-6 py-6">
        <p className="mx-auto max-w-[1024px] text-[11px] leading-relaxed text-surface-dark-foreground/40">
          Fiyatlar sipariş miktarı, ölçü ve teslimat bölgesine göre değişebilir. Isıl işlemli
          paletlerimiz ISPM-15 standardına uygun süreçle üretilir. Görseller temsilidir.
        </p>
        <div className="mx-auto mt-4 flex max-w-[1024px] flex-col items-start justify-between gap-3 text-[11px] text-surface-dark-foreground/40 sm:flex-row sm:items-center">
          <span>&copy; 2026 Akçay Palet. Tüm hakları saklıdır.</span>
          <div className="flex gap-5">
            {LEGAL_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

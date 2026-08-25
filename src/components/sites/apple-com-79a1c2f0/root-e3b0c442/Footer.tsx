import { LogoMark } from "../shared/icons";

const COLUMNS = [
  {
    heading: "Ürünler",
    links: ["Ahşap Palet (80x120)", "Ahşap Palet (80x100)", "Ahşap Palet (100x120)", "Özel Ölçü Üretim"],
  },
  {
    heading: "İhracat",
    links: ["İhracat Paleti", "Isıl İşlemli Palet", "ISPM-15 Uyumlu Üretim", "İç Piyasa Paleti"],
  },
  {
    heading: "Kurumsal",
    links: ["Üretim Sürecimiz", "Neden Akçay Palet", "Kalite Kontrol Noktalarımız"],
  },
  {
    heading: "Destek",
    links: ["Teklif Al", "Sipariş & Sevkiyat", "İletişim"],
  },
];

export function Footer() {
  return (
    <footer id="iletisim" className="border-t border-surface-dark-foreground/10 bg-surface-dark text-surface-dark-foreground">
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
                  <li key={link}>
                    <a
                      href="#iletisim"
                      className="text-[13px] text-surface-dark-foreground/75 transition-colors hover:text-surface-dark-foreground"
                    >
                      {link}
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
            <a href="#iletisim" className="hover:text-surface-dark-foreground/70">
              Gizlilik
            </a>
            <a href="#iletisim" className="hover:text-surface-dark-foreground/70">
              Kullanım Şartları
            </a>
            <a href="#iletisim" className="hover:text-surface-dark-foreground/70">
              Çerezler
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

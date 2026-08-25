import { LogoMark } from "../shared/icons";

const COLUMNS = [
  {
    heading: "Ürünler",
    links: ["Ahşap Palet", "Plastik Palet", "Kasa & Sepet Palet", "Özel Ölçü Üretim"],
  },
  {
    heading: "Hizmetler",
    links: ["Palet Kiralama", "Geri Dönüşüm", "Lojistik & Sevkiyat", "Depolama"],
  },
  {
    heading: "Kurumsal",
    links: ["Hakkımızda", "Sürdürülebilirlik", "Kariyer", "Sertifikalar"],
  },
  {
    heading: "Destek",
    links: ["Sıkça Sorulan Sorular", "Teklif Al", "Sevkiyat Takibi", "İletişim"],
  },
];

export function Footer() {
  return (
    <footer id="iletisim" className="bg-background">
      <div className="border-t border-border px-6 py-10 text-center text-[12px] text-muted-foreground">
        Fiyatlar sipariş miktarı ve teslimat bölgesine göre değişebilir. EPAL ve ISPM-15 damgalı
        ürünlerimiz ilgili standartlara uygun üretilmiştir. Görseller temsilidir.
      </div>
      <div className="mx-auto max-w-[1024px] border-t border-border px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[12px] font-semibold text-foreground">{col.heading}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#iletisim" className="text-[12px] text-muted-foreground hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1024px] flex-col items-center justify-between gap-3 border-t border-border px-6 py-6 text-[12px] text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-1.5">
          <LogoMark className="h-3.5 w-3.5" />
          <span>&copy; 2026 Akçay Palet. Tüm hakları saklıdır.</span>
        </div>
        <div className="flex gap-5">
          <a href="#iletisim" className="hover:underline">
            Gizlilik
          </a>
          <a href="#iletisim" className="hover:underline">
            Kullanım Şartları
          </a>
          <a href="#iletisim" className="hover:underline">
            Çerezler
          </a>
        </div>
      </div>
    </footer>
  );
}

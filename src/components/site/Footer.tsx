const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Mağaza ve Öğren",
    links: ["Palet Air", "Palet Pro", "Palet Mini", "Palet Studio", "Aksesuarlar"],
  },
  {
    title: "Hizmetler",
    links: ["Akçay One", "Destek", "Kargo Takibi", "Onarım"],
  },
  {
    title: "Şirket",
    links: ["Hakkımızda", "Kariyer", "Yatırımcı İlişkileri", "Sürdürülebilirlik"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-10 text-[12px] text-white/60">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 border-b border-white/10 pb-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 font-medium text-white/80">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:underline hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="pt-6">
          Copyright © {new Date().getFullYear()} Akçay Palet. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}

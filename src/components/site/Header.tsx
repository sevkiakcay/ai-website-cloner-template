import Link from "next/link";

const NAV_LINKS = [
  "Mağaza",
  "Ürünler",
  "Koleksiyonlar",
  "Destek",
  "Hakkımızda",
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-11 max-w-6xl items-center justify-between px-4 text-[13px] text-white/90">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-white">
          Akçay Palet
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((label) => (
            <li key={label}>
              <Link
                href="#"
                className="text-white/80 transition-colors hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          <Link href="#" className="text-white/80 hover:text-white" aria-label="Ara">
            ⌕
          </Link>
          <Link href="#" className="text-white/80 hover:text-white" aria-label="Sepet">
            ⌸
          </Link>
        </div>
      </nav>
    </header>
  );
}

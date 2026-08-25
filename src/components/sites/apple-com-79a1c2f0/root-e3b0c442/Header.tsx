import Link from "next/link";
import { LogoMark, MenuIcon, SearchIcon } from "../shared/icons";

const NAV_LINKS = [
  { label: "Ahşap Palet", href: "#ahsap-palet" },
  { label: "İhracat Paleti", href: "#ozel-olcu" },
  { label: "Özel Ölçü", href: "#ozel-olcu" },
  { label: "Üretim Süreci", href: "#uretim-sureci" },
  { label: "Neden Akçay", href: "#neden-akcay" },
  { label: "İletişim", href: "#iletisim" },
];

export function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="bg-surface-dark text-surface-dark-foreground text-center text-[12px] leading-[38px]">
        Ahşap palet ihtiyaçlarınızda doğrudan üreticiyle çalışın.{" "}
        <a href="#iletisim" className="underline underline-offset-2 hover:no-underline">
          Teklif al
        </a>
        .
      </div>
      <header className="h-11 border-b border-border/60 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
        <nav className="mx-auto flex h-11 max-w-[1024px] items-center justify-between px-4 text-[12px] font-medium">
          <Link
            href="#top"
            className="flex items-center gap-1.5 text-foreground"
            aria-label="Akçay Palet anasayfa"
          >
            <LogoMark className="h-4 w-4 text-primary" />
            <span className="text-[13px] font-semibold tracking-tight">Akçay Palet</span>
          </Link>
          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-foreground/80 transition-colors hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <SearchIcon className="hidden h-4 w-4 text-foreground/80 md:block" />
            <button
              type="button"
              aria-label="Menüyü aç"
              className="text-foreground/80 md:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}

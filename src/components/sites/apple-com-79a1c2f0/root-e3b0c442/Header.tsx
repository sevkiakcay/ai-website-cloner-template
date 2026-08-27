"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoMark, MenuIcon, SearchIcon } from "../shared/icons";

const NAV_LINKS = [
  { label: "Ürünler", href: "#urunler" },
  { label: "Özel Üretim", href: "#ozel-uretim" },
  { label: "Üretim Süreci", href: "#uretim-sureci" },
  { label: "Neden Akçay", href: "#neden-akcay" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="bg-surface-dark text-surface-dark-foreground text-center text-[12px] leading-[38px]">
        Ahşap palet ihtiyaçlarınızda doğrudan üreticiyle çalışın.{" "}
        <a href="#iletisim" className="underline underline-offset-2 hover:no-underline">
          Teklif al
        </a>
        .
      </div>
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
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
            <a
              href="#iletisim"
              className="hidden rounded-full bg-primary px-4 py-1.5 text-[12px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:inline-block"
            >
              Teklif Al
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="text-foreground/80 md:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-border/60 bg-background px-4 py-3 md:hidden">
            <ul className="flex flex-col divide-y divide-border/60">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-[14px] font-medium text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#iletisim"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground"
            >
              Teklif Al
            </a>
          </div>
        )}
      </header>
    </div>
  );
}

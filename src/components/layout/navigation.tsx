"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#urunler", label: "Ürünler" },
  { href: "#uretim", label: "Üretim" },
  { href: "#kurumsal", label: "Kurumsal" },
  { href: "#iletisim", label: "İletişim" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="font-mono text-sm tracking-[0.3em] text-paper uppercase">
          Akçay Palet
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs tracking-[0.08em] text-muted-foreground uppercase transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#iletisim"
          className="rounded-[3px] border border-border px-4 py-2 text-[11px] font-medium tracking-[0.14em] text-paper uppercase transition-colors hover:bg-white/5"
        >
          Teklif Al
        </a>
      </nav>
    </header>
  );
}

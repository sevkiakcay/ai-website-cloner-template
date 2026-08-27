import type { SVGProps } from "react";

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      <rect x="3" y="13" width="26" height="4" rx="1" fill="currentColor" />
      <rect x="6" y="7" width="4" height="18" rx="1" fill="currentColor" />
      <rect x="14" y="7" width="4" height="18" rx="1" fill="currentColor" />
      <rect x="22" y="7" width="4" height="18" rx="1" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function QuoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 7.5C4 6.12 5.12 5 6.5 5H8v6H6v3a2 2 0 0 0 2 2v2H6.5A2.5 2.5 0 0 1 4 15.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M13 7.5c0-1.38 1.12-2.5 2.5-2.5H17v6h-2v3a2 2 0 0 0 2 2v2h-1.5a2.5 2.5 0 0 1-2.5-2.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckBadgeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 3l2.3 1.2 2.6-.3 1.2 2.3 2.3 1.2-.3 2.6 1.2 2.3-1.9 1.9.3 2.6-2.6.3-1.2 2.3-2.3-1.2-2.6.3-1.2-2.3-2.3-1.2.3-2.6L3 12.3l1.9-1.9-.3-2.6 2.6-.3L8.4 5.2 12 3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.5l2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

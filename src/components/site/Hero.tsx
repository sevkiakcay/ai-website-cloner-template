import Link from "next/link";

interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  className?: string;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
}: HeroProps) {
  return (
    <section
      className={`flex min-h-[640px] flex-col items-center justify-center gap-3 bg-gradient-to-b from-neutral-950 to-black px-6 py-24 text-center text-white ${className ?? ""}`}
    >
      <p className="text-sm font-medium text-white/60">{eyebrow}</p>
      <h1 className="max-w-3xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-7xl">
        {title}
      </h1>
      <p className="max-w-xl text-xl text-white/70 sm:text-2xl">{subtitle}</p>
      <div className="mt-4 flex items-center gap-6 text-lg">
        <Link
          href="#"
          className="rounded-full bg-blue-600 px-5 py-2 text-base font-medium text-white transition-colors hover:bg-blue-500"
        >
          {primaryCta}
        </Link>
        <Link
          href="#"
          className="text-blue-500 underline-offset-4 transition-colors hover:text-blue-400 hover:underline"
        >
          {secondaryCta} &gt;
        </Link>
      </div>
    </section>
  );
}

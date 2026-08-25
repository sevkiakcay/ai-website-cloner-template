import { WoodPalletIllustration } from "../shared/illustrations";

export function Hero() {
  return (
    <section
      id="ahsap-palet"
      className="bg-surface-alt pt-24 pb-16 text-center md:pt-32 md:pb-24"
    >
      <h1 className="mx-auto text-[40px] leading-[1.05] font-semibold tracking-tight text-foreground md:text-[64px]">
        Euro Palet
      </h1>
      <p className="mt-2 text-[19px] text-foreground md:text-[24px]">
        EPAL standardında, ISPM-15 sertifikalı ahşap palet.
      </p>
      <p className="mt-2 text-[15px] text-muted-foreground md:text-[19px]">
        Fabrikadan sevkiyat 24 saat içinde.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4 text-[15px] font-medium md:mt-7">
        <a
          href="#iletisim"
          className="rounded-full bg-primary px-5 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Teklif Al
        </a>
        <a
          href="#uretim-sureci"
          className="rounded-full border border-border px-5 py-2 text-foreground transition-colors hover:bg-accent"
        >
          Kataloğu İncele
        </a>
      </div>
      <div className="mx-auto mt-10 max-w-[720px] px-6 md:mt-16">
        <WoodPalletIllustration className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]" />
      </div>
    </section>
  );
}

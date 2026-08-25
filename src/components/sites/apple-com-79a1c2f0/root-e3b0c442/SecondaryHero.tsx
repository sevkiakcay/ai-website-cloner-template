import { PlasticPalletIllustration } from "../shared/illustrations";

export function SecondaryHero() {
  return (
    <section id="plastik-palet" className="bg-background pt-16 pb-16 text-center md:pt-24 md:pb-24">
      <h2 className="mx-auto text-[32px] leading-[1.1] font-semibold tracking-tight text-foreground md:text-[48px]">
        Plastik Palet
      </h2>
      <p className="mt-2 text-[17px] text-foreground md:text-[21px]">
        Artık %100 geri dönüştürülmüş HDPE ile.
      </p>
      <p className="mt-2 text-[14px] text-muted-foreground md:text-[17px]">Stoktan hemen teslim</p>
      <div className="mt-6 flex items-center justify-center gap-4 text-[15px] font-medium">
        <a
          href="#iletisim"
          className="rounded-full bg-primary px-5 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Teklif Al
        </a>
      </div>
      <div className="mx-auto mt-10 max-w-[640px] px-6 md:mt-14">
        <PlasticPalletIllustration className="h-auto w-full" />
      </div>
    </section>
  );
}

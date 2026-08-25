import { WoodPalletIllustration, QualitySealIllustration } from "../shared/illustrations";

export function SecondaryHero() {
  return (
    <section id="ihracat-paleti" className="bg-background pt-16 pb-16 text-center md:pt-24 md:pb-24">
      <h2 className="mx-auto text-[32px] leading-[1.1] font-semibold tracking-tight text-foreground md:text-[48px]">
        İhracat Paleti
      </h2>
      <p className="mt-2 text-[17px] text-foreground md:text-[21px]">
        ISPM-15 standardına uygun ısıl işlemli üretim.
      </p>
      <p className="mt-2 text-[14px] text-muted-foreground md:text-[17px]">
        Gümrükte sorun yaşamadan yurt dışına sevkiyat.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4 text-[15px] font-medium">
        <a
          href="#iletisim"
          className="rounded-full bg-primary px-5 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Teklif Al
        </a>
      </div>
      <div className="relative mx-auto mt-10 max-w-[640px] px-6 md:mt-14">
        <WoodPalletIllustration className="h-auto w-full" />
        <QualitySealIllustration className="absolute right-10 top-0 h-16 w-16 text-primary md:h-20 md:w-20" />
      </div>
    </section>
  );
}

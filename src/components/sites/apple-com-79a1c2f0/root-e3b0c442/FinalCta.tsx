export function FinalCta() {
  return (
    <section className="bg-surface-dark py-24 text-center text-surface-dark-foreground md:py-32">
      <h2 className="mx-auto px-6 text-[40px] leading-[1.05] font-semibold tracking-tight uppercase md:text-[72px]">
        Ölçü.
        <br />
        Üretim.
        <br />
        Sevkiyat.
      </h2>
      <p className="mx-auto mt-6 max-w-[480px] px-6 text-[15px] text-surface-dark-foreground/60 md:text-[17px]">
        Standart ölçülerden özel üretime. İhtiyacınızı üretime dönüştürelim.
      </p>
      <div className="mt-8">
        <a
          href="#iletisim"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Teklif Al
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

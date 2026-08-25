export function CtaBanner() {
  return (
    <section className="bg-surface-alt py-20 text-center md:py-28">
      <h2 className="mx-auto max-w-[640px] px-6 text-[28px] leading-[1.15] font-semibold tracking-tight text-foreground md:text-[40px]">
        Standart dışı bir ölçüye mi ihtiyacınız var?
      </h2>
      <p className="mx-auto mt-3 max-w-[520px] px-6 text-[15px] text-muted-foreground md:text-[19px]">
        Ürününüzün ölçüsüne göre teknik destekle özel palet tasarımı ve üretimi yapıyoruz.
      </p>
      <div className="mt-6">
        <a
          href="#iletisim"
          className="rounded-full bg-primary px-5 py-2 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Şimdi Başla
        </a>
      </div>
    </section>
  );
}

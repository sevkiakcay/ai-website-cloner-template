const PILLARS = [
  {
    title: "Teknik Ölçü Desteği",
    desc: "Ürününüzün taşıma ihtiyacına göre doğru palet ölçüsünü birlikte belirliyoruz.",
  },
  {
    title: "Esnek Üretim",
    desc: "Standart 80x120, 80x100, 100x120 ölçülerin yanı sıra özel ölçüde üretim planlıyoruz.",
  },
  {
    title: "Doğrudan İletişim",
    desc: "Teklif ve üretim sürecinde doğrudan üretici ekibiyle görüşürsünüz.",
  },
];

export function WhyUs() {
  return (
    <section id="neden-akcay" className="bg-surface-alt py-20 md:py-28">
      <h2 className="px-6 text-center text-[28px] font-semibold tracking-tight text-foreground md:text-[40px]">
        Neden Akçay Palet.
      </h2>
      <div className="mx-auto mt-12 grid max-w-[1024px] gap-10 px-6 sm:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div key={pillar.title} className="text-center">
            <h3 className="text-[17px] font-semibold text-foreground">{pillar.title}</h3>
            <p className="mt-2 text-[14px] text-muted-foreground">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

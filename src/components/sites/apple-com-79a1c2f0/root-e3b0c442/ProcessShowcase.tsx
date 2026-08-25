import { WarehouseRackIllustration } from "../shared/illustrations";

const PROCESS_STEPS = [
  {
    title: "Kesim & Şekillendirme",
    desc: "Keresteyi siparişe uygun ölçüde kesip şekillendiriyoruz.",
  },
  {
    title: "Montaj & Çivileme",
    desc: "Tahtaları taşıma yüküne uygun toleranslarla birleştiriyoruz.",
  },
  {
    title: "Isıl İşlem & Kontrol",
    desc: "İhracat paletlerinde ISPM-15 uyumlu ısıl işlem ve ölçü kontrolü uyguluyoruz.",
  },
];

// Kontrol noktaları üretim sürecimizin bir parçasıdır; bunlar bağımsız bir
// sertifikasyon iddiası değildir. Doğrulanmış sertifika/belge bilgisi
// eklendiğinde bu bölüm ayrı bir "Belgelerimiz" bileşeniyle genişletilebilir.
// TODO: Onaylı sertifika/belge bilgisi netleşince ayrı bölüm eklenecek.
const QUALITY_CHECKPOINTS = [
  "Ölçü ve tolerans kontrolü",
  "Nem oranı kontrolü",
  "Çivi ve bağlantı sağlamlığı",
  "Isıl işlem sıcaklık takibi",
];

export function ProcessShowcase() {
  return (
    <section id="uretim-sureci" className="bg-surface-dark py-20 text-surface-dark-foreground md:py-28">
      <h2 className="px-6 text-center text-[32px] font-semibold tracking-tight md:text-[48px]">
        Üretim sürecimiz.
      </h2>
      <div className="mx-auto mt-6 max-w-[1024px] px-4">
        <WarehouseRackIllustration className="h-auto w-full text-primary" />
      </div>
      <div className="mx-auto mt-14 grid max-w-[1024px] gap-6 px-6 sm:grid-cols-3">
        {PROCESS_STEPS.map((step) => (
          <div key={step.title} className="text-center">
            <h3 className="text-[17px] font-semibold">{step.title}</h3>
            <p className="mt-2 text-[14px] text-surface-dark-foreground/65">{step.desc}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-16 max-w-[1024px] px-6">
        <p className="text-center text-[12px] font-medium tracking-wide text-surface-dark-foreground/50 uppercase">
          Kontrol noktalarımız
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {QUALITY_CHECKPOINTS.map((point) => (
            <span key={point} className="text-[13px] text-surface-dark-foreground/80">
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

import { WarehouseRackIllustration, QualitySealIllustration } from "../shared/illustrations";

const PROCESS_STEPS = [
  {
    title: "Kesim & Şekillendirme",
    desc: "Sertifikalı ormanlardan gelen keresteyi CNC hatlarında ölçüsüne kesiyoruz.",
  },
  {
    title: "Montaj & Çivileme",
    desc: "Otomatik çivileme hatlarında EPAL toleranslarına uygun montaj.",
  },
  {
    title: "Kalite Kontrol",
    desc: "Her parti nem oranı, taşıma kapasitesi ve ISPM-15 damgası için test edilir.",
  },
];

const CERTIFICATIONS = ["ISO 9001", "ISPM-15", "TSE", "FSC"];

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
      <div className="mx-auto mt-16 flex max-w-[1024px] flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6">
        {CERTIFICATIONS.map((cert) => (
          <div key={cert} className="flex items-center gap-2 text-[13px] font-medium text-surface-dark-foreground/80">
            <QualitySealIllustration className="h-8 w-8 text-primary" />
            {cert}
          </div>
        ))}
      </div>
    </section>
  );
}

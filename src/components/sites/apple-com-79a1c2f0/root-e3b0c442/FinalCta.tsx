import { CONTACT, whatsappUrl } from "@/lib/contact";

const CONTACT_CHANNELS = [
  { label: "WhatsApp", value: whatsappUrl("Merhaba, palet üretimi hakkında teklif almak istiyorum.") },
  { label: CONTACT.phone, value: CONTACT.phone ? `tel:${CONTACT.phone.replace(/\s/g, "")}` : null },
  { label: CONTACT.email, value: CONTACT.email ? `mailto:${CONTACT.email}` : null },
].filter((c): c is { label: string; value: string } => Boolean(c.label && c.value));

/** The site's actual quote-request destination — every "Teklif Al" CTA site-wide points here (#iletisim). */
export function FinalCta() {
  return (
    <section id="iletisim" className="bg-surface-dark py-24 text-center text-surface-dark-foreground md:py-32">
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

      {CONTACT_CHANNELS.length > 0 ? (
        <div className="mt-8 flex flex-col items-center gap-4 px-6">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[15px] font-medium">
            {CONTACT_CHANNELS.map((channel) => (
              <a
                key={channel.label}
                href={channel.value}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {channel.label}
                <span aria-hidden>→</span>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 px-6">
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Teklif Al
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </section>
  );
}

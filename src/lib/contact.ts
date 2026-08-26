/**
 * Single source of truth for Akçay Palet's real contact channels. These are
 * intentionally `null` — no phone/WhatsApp/email has been verified yet, and
 * publishing a fabricated one would actively mislead real customers. Fill
 * in the verified values here; every channel row in the UI reads from this
 * file and only renders once its value is set, so nothing broken or fake
 * ever reaches a visitor.
 */
export const CONTACT = {
  /** Digits only, country code first, no "+", no spaces — e.g. "905XXXXXXXXX". */
  whatsappNumber: null as string | null,
  /** Display + tel: href format — e.g. "+90 5XX XXX XX XX". */
  phone: null as string | null,
  email: null as string | null,
};

export function whatsappUrl(prefilledMessage?: string): string | null {
  if (!CONTACT.whatsappNumber) return null;
  const text = prefilledMessage ? `?text=${encodeURIComponent(prefilledMessage)}` : "";
  return `https://wa.me/${CONTACT.whatsappNumber}${text}`;
}

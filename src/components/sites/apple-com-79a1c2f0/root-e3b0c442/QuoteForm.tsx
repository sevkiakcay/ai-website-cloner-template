"use client";

import { useState, type FormEvent } from "react";
import { CONTACT, whatsappUrl } from "@/lib/contact";

const PALLET_TYPES = ["Ahşap Palet", "İhracat Paleti", "İç Piyasa Paleti", "Özel Ölçü Üretim"];
const DIMENSIONS = ["80×120 cm", "80×100 cm", "100×120 cm", "Özel ölçü"];
const HEAT_TREATMENT = ["Isıl işlemli (ISPM-15)", "Isıl işlemsiz", "Emin değilim"];

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[14px] text-foreground outline-none transition-colors focus:border-primary";
const labelClass = "text-[12px] font-medium text-muted-foreground";

function buildMessage(fields: Record<string, string>): string {
  const lines = [
    "Merhaba, palet üretimi hakkında teklif almak istiyorum.",
    "",
    `Palet tipi: ${fields.palletType}`,
    `Ölçü: ${fields.dimension}${fields.dimension === "Özel ölçü" && fields.customDimension ? ` (${fields.customDimension})` : ""}`,
    `Adet: ${fields.quantity || "belirtilmedi"}`,
    `Isıl işlem: ${fields.heatTreatment}`,
  ];
  if (fields.notes) lines.push(`Not: ${fields.notes}`);
  return lines.join("\n");
}

/**
 * The actual "premium quote-request experience": pallet type, dimensions,
 * quantity, heat-treatment requirement and free-form notes, composed into
 * one message. No backend exists, so submission hands that message to
 * whichever real channel is configured in `src/lib/contact.ts` (WhatsApp
 * first, then email) — never a fabricated one. With no channel configured
 * yet, the form stays fully usable but says so plainly instead of pretending
 * to submit somewhere.
 */
export function QuoteForm() {
  const [palletType, setPalletType] = useState(PALLET_TYPES[0]);
  const [dimension, setDimension] = useState(DIMENSIONS[0]);
  const [customDimension, setCustomDimension] = useState("");
  const [quantity, setQuantity] = useState("");
  const [heatTreatment, setHeatTreatment] = useState(HEAT_TREATMENT[0]);
  const [notes, setNotes] = useState("");

  const hasChannel = Boolean(CONTACT.whatsappNumber || CONTACT.email);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const message = buildMessage({ palletType, dimension, customDimension, quantity, heatTreatment, notes });
    const wa = whatsappUrl(message);
    if (wa) {
      window.open(wa, "_blank", "noopener,noreferrer");
      return;
    }
    if (CONTACT.email) {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Palet Teklif Talebi")}&body=${encodeURIComponent(message)}`;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 w-full max-w-[520px] rounded-2xl border border-surface-dark-foreground/10 bg-surface-dark-foreground/[0.03] p-6 text-left md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Palet tipi</span>
          <select
            value={palletType}
            onChange={(e) => setPalletType(e.target.value)}
            className={inputClass}
          >
            {PALLET_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Ölçü</span>
          <select value={dimension} onChange={(e) => setDimension(e.target.value)} className={inputClass}>
            {DIMENSIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>

        {dimension === "Özel ölçü" && (
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className={labelClass}>Özel ölçü (cm)</span>
            <input
              type="text"
              value={customDimension}
              onChange={(e) => setCustomDimension(e.target.value)}
              placeholder="örn. 90×110"
              className={inputClass}
            />
          </label>
        )}

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Adet</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="örn. 500"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Isıl işlem</span>
          <select
            value={heatTreatment}
            onChange={(e) => setHeatTreatment(e.target.value)}
            className={inputClass}
          >
            {HEAT_TREATMENT.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={labelClass}>Ek not (opsiyonel)</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Teslimat bölgesi, özel gereksinimler..."
            className={inputClass}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={!hasChannel}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Teklif Talebini Gönder
        <span aria-hidden>→</span>
      </button>

      {!hasChannel && (
        <p className="mt-3 text-center text-[12px] text-surface-dark-foreground/50">
          İletişim kanalı yakında eklenecek — form hazır, gönderim aktif edildiğinde çalışacak.
        </p>
      )}
    </form>
  );
}

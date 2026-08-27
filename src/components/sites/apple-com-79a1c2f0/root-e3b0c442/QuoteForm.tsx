"use client";

import { useState } from "react";
import { CONTACT, whatsappUrl } from "@/lib/contact";

const PALLET_TYPES = ["Ahşap Palet", "İhracat Paleti", "İç Piyasa Paleti", "Özel Ölçü Üretim"];
const DIMENSIONS = ["80×120 cm", "80×100 cm", "100×120 cm", "Özel ölçü"];
const HEAT_TREATMENT = ["Isıl işlemli (ISPM-15)", "Isıl işlemsiz", "Emin değilim"];

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[14px] text-foreground outline-none transition-colors focus:border-primary";
const labelClass = "text-[12px] font-medium text-muted-foreground";

function buildMessage(fields: {
  palletType: string;
  dimension: string;
  customDimension: string;
  quantity: string;
  heatTreatment: string;
  notes: string;
}): string {
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

const STEP_LABELS = ["Ürün", "Detaylar", "Gönder"];

/**
 * The actual quote-request experience, as progressive disclosure rather than
 * one long form: pick what you need first (low commitment), then specify it,
 * then send. No backend exists, so sending hands the composed message to
 * whichever real channel is configured in `src/lib/contact.ts` — never a
 * fabricated one.
 */
export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [palletType, setPalletType] = useState<string | null>(null);
  const [dimension, setDimension] = useState(DIMENSIONS[0]);
  const [customDimension, setCustomDimension] = useState("");
  const [quantity, setQuantity] = useState("");
  const [heatTreatment, setHeatTreatment] = useState(HEAT_TREATMENT[0]);
  const [notes, setNotes] = useState("");

  const hasChannel = Boolean(CONTACT.whatsappNumber || CONTACT.email);

  function handleSend() {
    const message = buildMessage({
      palletType: palletType ?? PALLET_TYPES[0],
      dimension,
      customDimension,
      quantity,
      heatTreatment,
      notes,
    });
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
    <div className="mx-auto mt-10 w-full max-w-[520px] rounded-2xl border border-surface-dark-foreground/10 bg-surface-dark-foreground/[0.03] p-6 text-left md:p-8">
      {/* Step indicator */}
      <div className="mb-6 flex items-center gap-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`text-[11px] font-medium tracking-wide uppercase ${i === step ? "text-primary" : "text-surface-dark-foreground/35"}`}
            >
              {i + 1}. {label}
            </span>
            {i < STEP_LABELS.length - 1 && <span className="h-px flex-1 bg-surface-dark-foreground/10" aria-hidden />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <p className="text-[16px] font-semibold text-surface-dark-foreground">Ne üretmemizi istiyorsunuz?</p>
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {PALLET_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setPalletType(type);
                  setStep(1);
                }}
                className="rounded-lg border border-surface-dark-foreground/15 bg-transparent px-4 py-3.5 text-left text-[14px] font-medium text-surface-dark-foreground transition-colors hover:border-primary hover:bg-primary/5"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="text-[16px] font-semibold text-surface-dark-foreground">{palletType} — detaylar</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Ölçü</span>
              <select value={dimension} onChange={(e) => setDimension(e.target.value)} className={inputClass}>
                {DIMENSIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>

            {dimension === "Özel ölçü" && (
              <label className="flex flex-col gap-1.5">
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
                rows={2}
                placeholder="Teslimat bölgesi, özel gereksinimler..."
                className={inputClass}
              />
            </label>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="text-[13px] font-medium text-surface-dark-foreground/60 hover:text-surface-dark-foreground"
            >
              ← Geri
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="ml-auto rounded-full bg-primary px-6 py-2.5 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Devam Et
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-[16px] font-semibold text-surface-dark-foreground">Talebinizi gözden geçirin</p>
          <dl className="mt-4 space-y-2 text-[14px]">
            <div className="flex justify-between border-b border-surface-dark-foreground/10 py-2">
              <dt className="text-surface-dark-foreground/50">Palet tipi</dt>
              <dd className="font-medium text-surface-dark-foreground">{palletType}</dd>
            </div>
            <div className="flex justify-between border-b border-surface-dark-foreground/10 py-2">
              <dt className="text-surface-dark-foreground/50">Ölçü</dt>
              <dd className="font-medium text-surface-dark-foreground">
                {dimension === "Özel ölçü" && customDimension ? customDimension : dimension}
              </dd>
            </div>
            <div className="flex justify-between border-b border-surface-dark-foreground/10 py-2">
              <dt className="text-surface-dark-foreground/50">Adet</dt>
              <dd className="font-medium text-surface-dark-foreground">{quantity || "belirtilmedi"}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-surface-dark-foreground/50">Isıl işlem</dt>
              <dd className="font-medium text-surface-dark-foreground">{heatTreatment}</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[13px] font-medium text-surface-dark-foreground/60 hover:text-surface-dark-foreground"
            >
              ← Geri
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={!hasChannel}
              className="ml-auto flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Teklif Talebini Gönder
              <span aria-hidden>→</span>
            </button>
          </div>

          {!hasChannel && (
            <p className="mt-3 text-[12px] text-surface-dark-foreground/50">
              İletişim kanalı yakında eklenecek — form hazır, gönderim aktif edildiğinde çalışacak.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

# Referans Analizi — Akçay Palet Homepage v2

Headless Chromium + Playwright ile canlı inceleme (masaüstü 1440px + mobil 390px, `docs/design-references/competitors/`).

## Sınıflandırma Tablosu

| Site | Sınıf | Gerekçe |
|---|---|---|
| **apple.com** | **KEEP** (yalnızca tasarım sistemi) | Sabit blur nav, section rhythm, whitespace disiplini, tipografi ölçeği, premium/minimal his — içerik/metin/görsel değil, yalnızca yapı referansı. |
| **palletbiz.com** | **REJECT** | Cloudflare bot-koruması nedeniyle içerik hiç yüklenmedi ("Checking your browser..."). Kullanılabilir hiçbir veri yok — referans havuzundan tamamen çıkarıldı. |
| **soncag.net** | **PARTIAL** | Güçlü yön: gerçek fabrika/depo fotoğrafı, temiz üst bar + WhatsApp CTA, zengin ürün taksonomisi (EPAL, UIC, TURPAL, Smart Palet, CP Kimyasal, 2.El, talaş/tomruk geri dönüşüm) ve "Market Paleti" gibi sektörel dil. Zayıf yön: sayfanın büyük bölümü headless taramada boş/lazy-load kırık geldi, tam görsel kaliteyi doğrulamak mümkün olmadı → sadece **içerik ve terminoloji** için kullanıldı, görsel olarak kopyalanmadı. |
| **dadaslarpalet.com** | **PARTIAL** | Güçlü yön: cesur başlık tipografisi, üst bilgi çubuğu (telefon/çalışma saati), net "Fiyat Teklifi Al" CTA'sı, ürün kategorileri (Sıfır Palet, Euro/Epal, Katlanır Kasa, Talaş-Yonga, Kiralama, ISPM-15). Zayıf yön: kırık/boş bölümler (video alanı, lisans logoları yüklenmemiş), kart görselleri kalite/stil olarak tutarsız, genel görsel dil "modern B2B üretici" seviyesinin altında → içerik/terminoloji **PARTIAL**, görsel dil kopyalanmadı. |
| **altinokpalet.com** | **REJECT** (görsel) / içerik kısmen faydalı | Hero bölümü headless taramada tamamen boş geldi (yalnızca küçük bir logo), "Değerlerimiz" bölümü 2012-tarzı yeşil desenli ikon grid'i kullanıyor, sertifika görselleri açılı/amatör belge fotoğrafları. Bu, "eski/amatör tasarım" ve "modern B2B üretici markasına uygun olmayan görsel dil" kriterlerine birebir uyuyor → **REJECT**. Yine de EPAL 80x120/100x120 DIN EN 13698-1 ölçü standardı ifadesi ve "Belgelerimiz" bölüm kurgusu (yalnızca yapı fikri, içerik değil) not alındı. |

## Seçilen Referanslardan Çıkarılan Fikirler (kopyalanmadan, kavram olarak)

1. **Ürün kategorileri ve sunum** — Sonçağ + Dadaşlar: palet ürün ailesini tek tek isimlendirilmiş kartlarla ayır (Ahşap Palet, İhracat Paleti, İç Piyasa Paleti, Özel Ölçü, Kasa/Sepet, Geri Dönüşüm). Apple'ın 2+2x2 grid mantığıyla birleştirildi.
2. **Üretim kapasitesi anlatımı** — Rakamsal iddia (adet/gün, m² alan) hiçbirinde doğrulanabilir/genellenebilir değildi ve marka için doğrulanmamış; Akçay Palet tarafında **hiçbir sayı uydurulmadı**, bunun yerine süreç adımları (kesim → montaj → ısıl işlem/kalite kontrol) anlatılarak kapasite hissi "üretim disiplini" üzerinden veriliyor.
3. **ISPM-15 / ısıl işlem anlatımı** — Dadaşlar ("ISPM-15" footer notu) ve Altınok (ısıl işlemli/işlemsiz ayrımı) referans alınarak, Akçay Palet için ısıl işlem SÜRECİ bir yetkinlik olarak anlatıldı ("ihracat paletlerimiz ISPM-15 standardına uygun ısıl işlemden geçer") — spesifik sertifika numarası/kurum adı **iddia edilmedi**.
4. **Özel ölçü ve özel üretim** — Sonçağ'ın "İhtiyacınıza özel tasarım ve üretim" ve Altınok'un "Özel Üretim Paletler" kavramı; Akçay Palet'te 80x120, 80x100, 100x120 standart ölçüler + özel ölçü teklif akışı olarak ayrı bir kart yapıldı.
5. **Kalite ve teknik standartlar** — Altınok'un DIN EN 13698-1 / EPAL ölçü referansı yapı fikri olarak alındı; Akçay Palet'e ait doğrulanmamış sertifika adı/numarası **eklenmedi** (önceki taslakta hatalı biçimde eklenmiş olan "ISO 9001 / TSE / FSC" rozetleri bu iterasyonda kaldırıldı).
6. **Üretim tesisi ve makine parkı** — Sonçağ'ın havadan fabrika fotoğrafı hissi, Akçay Palet için orijinal SVG şema (CNC kesim + çivileme hattı + ısıl işlem odası) ile —gerçek fabrika fotoğrafı verilmediği için— temsili/şema olarak yeniden üretildi, fotoğraf kopyalanmadı.
7. **Lojistik / sevkiyat** — Sonçağ/Dadaşlar'daki "hızlı sevkiyat" vurgusu genel ifadeyle korundu; "24 saat", "60 ülke" gibi rakip sitelerde bile görülmeyen, önceki taslakta yanlışlıkla eklenmiş uydurma rakamlar bu sürümde **kaldırıldı**.
8. **Sürdürülebilirlik** — Sonçağ'ın talaş/yonga/atık geri dönüşüm hattı ve Altınok'un orman kaynağı vurgusu kavram olarak alındı; Akçay Palet için "üretim artıklarının değerlendirilmesi" genel ifadesiyle, sertifika iddiası olmadan anlatıldı.
9. **Teklif alma / CTA yapısı** — Dadaşlar'ın sabit "Fiyat Teklifi Al" CTA'sı + Sonçağ'ın WhatsApp hattı kavramı; Akçay Palet'te Apple'ın çift-pill buton düzeniyle "Teklif Al" birincil, "Ürünleri İncele" ikincil CTA olarak birleştirildi.
10. **Kurumsal güven unsurları** — Rakiplerin çoğu (Sonçağ hariç) güven unsurlarını eski ikon-grid / açılı belge fotoğrafıyla veriyor (zayıf). Akçay Palet'te bunun yerine Apple-tarzı sade tipografik "Neden Akçay Palet" bölümü kullanıldı (Teknik ölçü desteği, Esnek üretim, Doğrudan iletişim) — sayısal/sertifika iddiası yok.

## Doğrulanmadığı için EKLENMEYEN / kaldırılan bilgiler
- Kuruluş yılı, fabrika alanı (m²), günlük/aylık üretim adedi, çalışan sayısı, ihracat yapılan ülke sayısı, "ISO 9001 / TSE / FSC" gibi spesifik sertifika adları, "500 adet üzeri ücretsiz kargo" gibi ticari politika rakamı.
- Bu alanlar ileride doğrulanmış veriyle doldurulabilir; kod içinde ilgili bileşenlerde `TODO` yorumu olarak işaretlendi (bkz. `ProcessShowcase.tsx`, `WhyUs.tsx`).

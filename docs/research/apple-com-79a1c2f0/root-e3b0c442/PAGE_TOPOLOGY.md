# Apple.com Homepage — Design-System Topology (reference only, not content clone)

Extracted via headless Chromium+Playwright at 1440x900 (desktop) and 390x844 (mobile).
Purpose: reuse structural/typographic/interaction patterns for the Akçay Palet homepage. No Apple text, logo, or images are reused.

## Global
- Body font: SF Pro Text / SF Pro Display stack, 17px/25px base, color `rgb(29,29,31)` on white.
- Announcement ribbon: thin bar above nav, small text + link, height ~52px, subtle gray bg.
- Nav: `position: fixed; top:0; height:44px; z-index:9999; background: rgba(245,245,247,.8); backdrop-filter: saturate(1.8) blur(20px);` — no shadow, hairline border only. Centered small wordmark + inline text links, search + bag icons at the right.
- Section rhythm: alternates white / light-gray (`#f5f5f7`) full-bleed bands, generous vertical padding (80–120px desktop), no visible container border.

## Sections (top → bottom)
1. **Announcement ribbon** — static, height 52
2. **Hero (product intro)** — centered stack: eyebrow-less large heading (~48–80px, weight 600, tight tracking), one-line subheading, price/availability caption in gray, two pill CTAs (solid blue + outline), large centered product image below with generous negative space. height ~2100 desktop.
3. **Secondary hero (promo)** — same centered pattern, smaller heading (~40px), one CTA pill, product image. Light gray band.
4. **CTA banner** — headline + subcopy + single pill CTA, no image, lots of whitespace (education/financing style banner).
5. **Feature grid** — 2 large tiles (50/50) then a 2x2 tile grid below; each tile: rounded corners (~18px), padding ~40-56px, headline (28-32px) + short line + 1-2 pill buttons top-aligned, image/visual fills lower two-thirds. One tile uses inverted (black bg / white text) treatment for contrast.
6. **Gallery / carousel band** — dark full-bleed section, large center headline, horizontal-scroll row of 3 large rounded video/image tiles, below it a second row of small "app" chip cards with dot pagination indicator.
7. **Legal/sosumi band** — tiny gray footnote paragraphs, light gray bg.
8. **Footer** — multi-column link nav (5–6 columns), hairline top border, copyright + legal links bar at very bottom, smaller font (12px).

## Responsive behavior
- **Desktop (1440px):** feature grid is 2-col / 2x2; gallery tiles show 3 across with peek of 4th; footer 6 columns.
- **Mobile (390px):** every section becomes a single centered column; feature grid stacks 1-per-row; gallery becomes a horizontally swipeable single-tile-width strip; nav collapses wordmark + hamburger + icons only; footer collapses to stacked accordion-style single column list.
- Breakpoint observed around 734–1068px (Apple's own breakpoints); we will use Tailwind `md`/`lg` (768/1024) as the practical equivalent.

## Interaction model
- Nav: **scroll-driven** translucency is already present at rest (blur always on); no additional shrink observed on this page (static height).
- Feature-grid CTAs: static links, simple color hover (darken ~10%) — **hover-driven**, not click-state.
- Gallery row: **scroll-driven horizontal carousel** (native momentum scroll + snap), not click-tab driven — confirmed by scrolling before clicking.
- Buttons: pill shape, hover darken + slight opacity transition (~150ms ease).

## Akçay Palet remap decisions
- Ribbon → thin "Fabrika çıkışı hızlı teklif" bar.
- Hero → flagship product (Euro Palet) hero with two CTAs (Teklif Al / Kataloğu İncele).
- Secondary hero → Plastik Palet.
- CTA banner → "İhracat Paketi" sanayi bölgesi teslimat kampanyası.
- Feature grid → Ahşap Palet, Plastik Palet, Kasa & Sepet Palet (inverted dark tile), Geri Dönüşüm/Palet Toplama, Kiralama, Kurumsal Anlaşma.
- Gallery band → "Üretim Sürecimiz" dark showcase with 3 process tiles (Kesim, Montaj, Kalite Kontrol) + certification chip row (ISO, ISPM-15, TSE, FSC).
- Footer → Ürünler / Hizmetler / Kurumsal / Destek / İletişim columns.

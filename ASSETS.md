# Assets Index — Eduardo Castro Portfolio

> Reference guide for all visual assets in `/public/assets/`.
> Use this file to make informed decisions about which asset to use in each context.
> Last updated: June 2026

-----

## Profile Photo

|File           |Description                                                                           |Tone                            |Use                               |
|---------------|--------------------------------------------------------------------------------------|--------------------------------|----------------------------------|
|`IMG_3827.jpeg`|Professional headshot. Gray suit, white shirt, natural smile. City skyline background.|Warm, approachable, professional|✅ **Hero section** — primary photo|

-----

## Project Images — Highlights / Defining Work

Each of the four evidence-pillar projects (Doritos Rainbow, ERG Leadership & Inclusion, Neutrogena Sun Care Launch, Brand Built from Zero) now displays a multi-photo carousel rather than a single static image. Photos live in per-project folders under `/public/assets/` and are wired into `src/lib/data.ts` as `EvidencePhoto[]` arrays (`doritosEvidence`, `ergEvidence`, `suncareEvidence`, `fromZeroEvidence`). The Doritos Rainbow hero section uses its own rotated/stacked `EvidenceCarousel`; the three Defining Work grid cards use the shared `ProjectGallery` component (full-bleed image with bottom gradient scrim, caption + counter overlay, ‹/› nav).

### `/public/assets/Doritos/` — Doritos Rainbow (11 photos)

|File                                |Caption               |
|-------------------------------------|-----------------------|
|`20160523_102105.jpeg`               |Packaging · 2016       |
|`IMG-20160523-WA0017.jpeg`           |Production line · 2016 |
|`IMG-20160523-WA0020.jpeg`           |Warehouse · 2016       |
|`IMG-20160606-WA0015.jpeg`           |Retail shelf · 2016    |
|`IMG-20160608-WA0033.jpeg`           |Store display · 2016   |
|`IMG-20160611-WA0023.jpeg`           |Supermarket display · 2016|
|`IMG-20160613-WA0002.jpeg`           |Print feature · 2016   |
|`IMG-20160606-WA0006.jpeg`           |Social reaction · 2016 |
|`IMG-20160606-WA0011.jpeg`           |Desk display · 2016    |
|`IMG_Eduardo Castro _1.jpeg`         |Ally Day · 2016        |
|`20160812_102324-1.jpeg`             |Evidence · 2016 — bag + handwritten note from PepsiCo's President|

### `/public/assets/ERG/` — ERG Leadership & Inclusion (10 photos)

|File                                       |Caption              |
|--------------------------------------------|----------------------|
|`IMG-20160608-WA0062.jpeg`                  |EQUAL ERG · 2016      |
|`IMG-20160608-WA0027.jpeg`                  |Ally event · 2016     |
|`20160608_123058.jpeg`                      |Conference · 2016     |
|`IMG-20160623-WA0017.jpeg`                  |Pride Connection · 2016|
|`IMG_3646.jpeg`                             |AIDS Day awareness    |
|`IMG-20170505-WA0011.jpeg`                  |EQUAL branding · 2017 |
|`IMG_0188.jpeg`                             |J&J D&I session       |
|`71d2b581-2ee3-4b04-8980-308d5a7f5211.jpeg` |HRC recognition       |
|`IMG_2562.jpeg`                             |EQUAL · social post   |
|`IMG_3665.png`                              |HRC equity · 2020     |

### `/public/assets/Suncare/` — Neutrogena Sun Care Launch (3 photos)

|File                       |Caption          |
|----------------------------|-------------------|
|`IMG-20170411-WA0014.jpeg`  |Warehouse · 2017  |
|`IMG_0644.jpeg`             |Product shot      |
|`IMG_0643.jpeg`             |Campaign creative |

### `/public/assets/FromZero/` — Brand Built from Zero (11 photos)

Carousel spanning the full Grupo Mariposa product-development story, including the Ocho, Mattson, San Marcos, and Mulby sub-brands/partners.

|File                                          |Caption                  |
|------------------------------------------------|----------------------------|
|`IMG_7923.jpeg`                                 |Ocho · formulation samples  |
|`IMG_2723.jpeg`                                 |Mattson · formulation tasting|
|`IMG_2737.jpeg`                                 |Consumer panel             |
|`IMG_2761.jpeg`                                 |Taste-test panel           |
|`IMG_1323.jpeg`                                 |Bía Foods · Grupo Mariposa |
|`46D003A1-7DB2-47E8-8798-1C1BF5E7447B.jpeg`     |San Marcos · factory visit (EXIF-rotated source; renders upright via browser auto-orientation)|
|`5B94F4B9-F06D-4475-B421-A8F0FC52ED86.jpeg`     |Bottling line (EXIF-rotated source; renders upright via browser auto-orientation)|
|`3be2b90c-e917-486b-8e18-ca6ffb19b5a3.jpeg`     |Mulby launch · Grupo Mariposa|
|`IMG_3727.jpeg`                                 |Mulby team · Grupo Mariposa |
|`IMG_7887.jpeg`                                 |Warehouse visit             |
|`IMG_5016.jpeg`                                 |Team recognition            |

`IMG_0576.png` (Grupo Mariposa wordmark + icon, light background) continues to serve the Experience timeline, unrelated to the FromZero carousel above.

### Superseded single-image files

`IMG_3381.jpeg`, `IMG_0583.jpeg`, and `IMG_0584.jpeg` (the original single photo per Highlights card) are no longer referenced in code — replaced by the galleries above. Left in place in `/public/assets/` rather than deleted.

-----

## Brand Logos — "Brands I've helped grow"

|File                    |Type              |Description                                                |Background |Recommendation                            |
|------------------------|------------------|-----------------------------------------------------------|-----------|------------------------------------------|
|`Doritos-logo.png`      |Wordmark + icon   |Classic Doritos triangle with flame and wordmark           |Transparent|✅ **Use**                                 |
|`CHEETOS-logo.png`      |Wordmark          |"Cheetos" in signature yellow with outline                 |Transparent|✅ **Use**                                 |
|`CHEETOS-SQ.jpeg`       |Illustration      |Chester Cheetah holding Cheetos                            |White      |❌ Skip — illustration, not a logo         |
|`Tostitos-Logo.svg`     |Wordmark          |"Tostitos" with hidden people/chip easter egg, multicolor  |Transparent|✅ **Use**                                 |
|`Tostitos-SQ.jpeg`      |Wordmark on color |Same wordmark on bright blue background                    |Blue       |❌ Skip — background clashes               |
|`Quaker-Logo.png`       |Wordmark + icon   |"QUAKER" with Quaker man icon in navy                      |Transparent|✅ **Use**                                 |
|`Quaker-SQ.jpeg`        |Icon only         |Quaker man face in circle, no text                         |Gray       |❌ Skip — no brand name visible            |
|`Neutrogena-Logo.svg`   |Wordmark          |"Neutrogena" in dark gray, elegant                         |Transparent|✅ **Use**                                 |
|`Neutrogena-SQ.jpeg`    |Wordmark on dark  |"Neutrogena®" in white on black                            |Black      |❌ Skip — clashes on light page            |
|`JohnsonBaby-Logo.svg`  |Wordmark          |Full Johnson's Baby wordmark in blue cursive               |Transparent|✅ **Use**                                 |
|`JohnsonBaby-SQ.jpeg`   |Icon              |Blue teardrop with "J" cursive, no text                    |Blue       |⚠️ Mobile fallback only                    |
|`Listerine-logo.png`    |Wordmark          |"LISTERINE" bold condensed black                           |Transparent|✅ **Use**                                 |
|`Listerine-SQ.jpeg`     |Product photo     |Two Listerine Cool Mint bottles                            |Teal       |❌ Skip — product shot, not a logo         |
|`Aveeno-logo.svg`       |Wordmark          |"Aveeno." in dark brown, clean modern type                 |Transparent|✅ **Use**                                 |
|`Aveeno-SQ.jpeg`        |Wordmark on bg    |Same wordmark on warm cream background                     |Cream      |⚠️ Use only if SVG renders poorly          |
|`LUBRIDERM-Logo.png`    |Wordmark + tagline|"Lubriderm®" in navy with Spanish tagline                  |Transparent| ✅ **Use**                                 |
|`LURBIDERM-SQ.jpeg`     |Wordmark only     |"Lubriderm®" in navy, no tagline                           |Light gray |✅ **Use**                                 |
|`IMG_0576.png`          |Wordmark + icon   |"GRUPO MARIPOSA" in dark gray with multicolor circular icon|White      |✅ **Use** for light backgrounds           |
|`GrupoMariposa-Logo.svg`|Wordmark + icon   |Same as above but text is WHITE                            |Transparent|❌ Skip for light sections — text invisible|
|`Beliv-Logo.png`        |Icon only         |Stylized "B" in lavender, no text                          |Transparent|⚠️ Low recognition without brand name      |
|`Beliv-SQ.jpeg`         |Icon on gradient  |Same "B" with blue-purple gradient                         |Blue/purple|✅ **Use** if including Beliv              |
|`Bia-Foods-Logo.svg`    |Wordmark + icon   |"bía" wordmark in navy + geometric icon in blue gradient   |Transparent|✅ **Use**                                 |
|`Bia-Foods-SQ.jpeg`     |Wordmark only     |"bia" in bold navy                                         |White      |⚠️ Use if SVG has rendering issues         |
|`CBC-logo.png`          |Wordmark + icon   |"cbc." with multicolor wheel icon                          |Transparent|✅ **Use**                                 |


> **Note on Lubriderm:** `LUBRIDERM-Logo.png` includes the tagline "Recomendada por generaciones de dermatólogos" in Spanish.
> 
> **Note on Grupo Mariposa:** `GrupoMariposa-Logo.svg` has white text — only use on dark/colored backgrounds. For the Brands grid on a light background, always use `IMG_0576.png`.
> 
> **Note on CBC and Bía Foods:** Both brands link to `grupomariposa.com` — they are part of the Grupo Mariposa portfolio.

-----

## Academic & Certification Logos — Credentials section

|File                     |Type      |Description                                |Link                                        |Use                                            |
|-------------------------|----------|-------------------------------------------|--------------------------------------------|-----------------------------------------------|
|`ITESMSchool-Logo.svg`   |Wordmark  |Tecnológico de Monterrey official logo     |https://tec.mx                              |✅ BSc entry                                    |
|`KelloggSchool-Logo.svg` |Wordmark  |Kellogg School of Management logo          |https://kellogg.northwestern.edu            |✅ Strategic Marketing entry                    |
|`WhartonSchool-logo.jpeg`|Wordmark  |Wharton Executive Education logo           |https://executiveeducation.wharton.upenn.edu|✅ Data Analysis entry                          |
|`PMI-SQ.jpeg`            |Icon/badge|Project Management Institute square badge  |https://pmi.org                             |✅ PMP® entry — preferred over wide wordmark    |
|`PMI-Logo.png`           |Wordmark  |Full PMI wordmark — horizontal, wide format|https://pmi.org                             |⚠️ Too wide for credential list — use SQ instead|
|`SCRUM-logo.jpeg`        |Wordmark  |Scrum Inc. logo                            |https://scruminc.com                        |✅ CSPO℠ entry                                  |

-----

## Experience Timeline — Company Logos

|Company          |File                     |Type                 |Notes                                                       |
|-----------------|-------------------------|---------------------|------------------------------------------------------------|
|apex Consulting  |Text placeholder         |—                    |"aC / &Co." styled in `text-accent`, two lines right-aligned|
|Grupo Mariposa   |`IMG_0576.png`           |Wordmark + icon      |Light background version with dark text                     |
|Johnson & Johnson|`JohnsonJohnson-Logo.svg`|Wordmark             |Official J&J script wordmark, red on transparent            |
|PepsiCo          |`PepsiCo-Logo.png`       |Wordmark + globe icon|Official PepsiCo logo, dark text on transparent             |

-----

## Contact & Communication

|Address                |Label on site        |Context                                               |
|-----------------------|---------------------|------------------------------------------------------|
|`eduardo@casjor.com`   |Direct               |Primary contact — hero, contact section, footer       |
|`keynote@casjor.com`   |Consulting & Speaking|Speaking and panel inquiries — contact section, footer|
|`consulting@casjor.com`|(not published)      |apex Consulting internal business use only            |

-----

## Downloadable Files

|File                   |Location            |Label on site                        |
|-----------------------|--------------------|-------------------------------------|
|`CV Eduardo Castro.pdf`|`/public/downloads/`|"Download Resume" — nav CTA, hero CTA|

-----

## Usage Guidelines

### Logo grid ("Brands I've helped grow")

- Display as infinite swipeable carousel
- Order randomized on each page load
- `max-height: 40px`, `object-fit: contain`
- On hover: semi-transparent overlay with brand name in white
- No click behavior — hover name only
- CBC and Bía Foods link context: both belong to Grupo Mariposa

### Experience timeline (company logos)

- All logos: `max-height: 48px`, `max-width: 80px`, `object-fit: contain`
- apex Consulting: text placeholder only — no logo file
- All others: use files listed in the table above

### Credentials section

- Each credential logo and institution name links to official website
- Open in new tab: `target="_blank" rel="noopener noreferrer"`
- Hover: `opacity-70 hover:opacity-100 transition-opacity`

### Color considerations

Page palette: light (`#f9f9f7` background, `#d4622a` accent, `#1a1c1b` dark sections).
Dark mode inverts ink ↔ paper, accent stays the same.
Logos with dark or colored text on transparent backgrounds work best for light sections.

### Section-specific image assignments

|Section        |Card                      |Image source                          |
|---------------|--------------------------|---------------------------------------|
|Highlights     |Doritos Rainbow           |`doritosEvidence` gallery — `/assets/Doritos/` (11 photos)|
|Highlights     |ERG Leadership & Inclusion|`ergEvidence` gallery — `/assets/ERG/` (10 photos)|
|Highlights     |Neutrogena Sun Care Launch|`suncareEvidence` gallery — `/assets/Suncare/` (3 photos)|
|Highlights     |Brand Built from Zero     |`fromZeroEvidence` gallery — `/assets/FromZero/` (11 photos)|
|Hero           |Profile photo             |`IMG_3827.jpeg`          |
|Career timeline|Grupo Mariposa logo       |`IMG_0576.png`           |
|Career timeline|Johnson & Johnson logo    |`JohnsonJohnson-Logo.svg`|
|Career timeline|PepsiCo logo              |`PepsiCo-Logo.png`       |

-----

*Last updated: June 2026*

# Assets Index — Eduardo Castro Portfolio

> Reference guide for all visual assets in `/public/assets/`.
> Use this file to make informed decisions about which asset to use in each context.

-----

## Profile Photo

|File           |Description                                                                           |Tone                            |Use                               |
|---------------|--------------------------------------------------------------------------------------|--------------------------------|----------------------------------|
|`IMG_3827.jpeg`|Professional headshot. Gray suit, white shirt, natural smile. City skyline background.|Warm, approachable, professional|✅ **Hero section** — primary photo|

-----

## Brand Logos — Recommended for "Brands I've helped grow"

|File                    |Type              |Description                                                |Background       |Recommendation                                     |
|------------------------|------------------|-----------------------------------------------------------|-----------------|---------------------------------------------------|
|`Doritos-logo.png`      |Wordmark + icon   |Classic Doritos triangle with flame and wordmark           |Transparent      |✅ **Use**                                          |
|`CHEETOS-logo.png`      |Wordmark          |"Cheetos" in signature yellow with outline                 |Transparent      |✅ **Use** — wordmark is clearest                   |
|`CHEETOS-SQ.jpeg`       |Illustration      |Chester Cheetah holding Cheetos — mascot illustration      |White            |❌ Skip — illustration, not a logo                  |
|`Tostitos-Logo.svg`     |Wordmark          |"Tostitos" with hidden people/chip easter egg, multicolor  |Transparent      |✅ **Use**                                          |
|`Tostitos-SQ.jpeg`      |Wordmark on color |Same wordmark on bright blue background                    |Blue             |❌ Skip — background clashes with page palette      |
|`Quaker-Logo.png`       |Wordmark + icon   |"QUAKER" with Quaker man icon in navy                      |Transparent      |✅ **Use**                                          |
|`Quaker-SQ.jpeg`        |Icon only         |Quaker man face in circle, no text                         |Gray             |❌ Skip for logo grid — no brand name               |
|`Neutrogena-Logo.svg`   |Wordmark          |"Neutrogena" in dark gray, elegant serif-adjacent          |Transparent      |✅ **Use**                                          |
|`Neutrogena-SQ.jpeg`    |Wordmark on dark  |"Neutrogena®" in white on black                            |Black            |❌ Skip — background clashes on light page          |
|`JohnsonBaby-Logo.svg`  |Wordmark          |Full Johnson's Baby wordmark in blue cursive               |Transparent      |✅ **Use**                                          |
|`JohnsonBaby-SQ.jpeg`   |Icon              |Blue teardrop with "J" cursive, no text                    |Blue             |⚠️ Mobile fallback if wordmark too wide             |
|`Listerine-logo.png`    |Wordmark          |"LISTERINE" bold condensed black                           |Transparent      |✅ **Use**                                          |
|`Listerine-SQ.jpeg`     |Product photo     |Two Listerine Cool Mint bottles — product shot             |Teal             |❌ Skip — product shot, not a logo                  |
|`Aveeno-logo.svg`       |Wordmark          |"Aveeno." in dark brown, clean modern type                 |Transparent      |✅ **Use**                                          |
|`Aveeno-SQ.jpeg`        |Wordmark on bg    |Same wordmark on warm cream background                     |Cream            |⚠️ Use only if SVG renders poorly                   |
|`Lubriderm-Logo.png`    |Wordmark + tagline|"Lubriderm®" in navy with Spanish tagline                  |Transparent      |⚠️ Has Spanish tagline — see note below             |
|`LURBIDERM-SQ.jpeg`     |Wordmark only     |"Lubriderm®" in navy, no tagline, on light gray bg         |Light gray       |✅ **Use** — cleaner, no Spanish text               |
|`IMG_0576.png`          |Wordmark + icon   |"GRUPO MARIPOSA" in dark gray with multicolor circular icon|White/transparent|✅ **Use** — this is the light-background version   |
|`GrupoMariposa-Logo.svg`|Wordmark + icon   |Same as above but text is WHITE                            |Transparent      |❌ Skip for light sections — text invisible on white|
|`Beliv-Logo.png`        |Icon only         |Stylized "B" in lavender, no text                         |Transparent      |⚠️ Low recognition without name                     |
|`Beliv-SQ.jpeg`         |Icon on gradient  |Same "B" with blue-purple gradient on square bg            |Blue/purple      |✅ **Use** if including Beliv — more presence       |
|`Bia-Foods-Logo.svg`    |Wordmark + icon   |"bía" wordmark in navy + geometric icon in blue gradient   |Transparent      |✅ **Use**                                          |
|`Bia-Foods-SQ.jpeg`     |Wordmark only     |"bia" in bold navy                                         |White            |⚠️ Use if SVG has rendering issues                  |
|`CBC-logo.png`          |Wordmark + icon   |"cbc." with multicolor wheel icon                          |Transparent      |✅ **Use**                                          |


> **Note on Lubriderm:** `LUBRIDERM-Logo.png` includes the tagline "Recomendada por generaciones de dermatólogos" in Spanish. Since the page is in English, use `LURBIDERM-SQ.jpeg` instead, which shows only the wordmark.

> **Note on Grupo Mariposa:** `GrupoMariposa-Logo.svg` has white text — only use this on dark/colored backgrounds (e.g., the Experience timeline section if it has a dark variant). For the Brands grid on a light background, always use `IMG_0576.png`.

-----

## Academic & Certification Logos — Recommended for Credentials section

|File                     |Type           |Description                           |Use                         |
|-------------------------|---------------|--------------------------------------|----------------------------|
|`ITESMSchool-Logo.svg`   |Wordmark       |Tecnológico de Monterrey official logo|✅ Education section         |
|`KelloggSchool-Logo.svg` |Wordmark       |Kellogg School of Management logo     |✅ Executive education       |
|`WhartonSchool-logo.jpeg`|Wordmark       |Wharton Executive Education logo      |✅ Executive education       |
|`PMI-Logo.png`           |Wordmark + icon|Project Management Institute logo     |✅ Certifications            |
|`PMI-SQ.jpeg`            |Icon           |PMI icon/badge                        |⚠️ Use only if space is tight|
|`SCRUM-logo.jpeg`        |Wordmark       |Scrum Inc. logo                       |✅ Certifications            |

-----

## Usage Guidelines

### Logo grid ("Brands I've helped grow")

Display logos at consistent `max-height: 40px` with `object-fit: contain`. This preserves each logo's natural proportions while maintaining visual rhythm across the grid. Use SVG format where available for crisp rendering at any size.

### Experience section (company logos)

For the timeline, use company-level logos only (not brand logos):

- PepsiCo — source externally or use a clean PNG
- Johnson & Johnson — source externally
- Grupo Mariposa — `IMG_0576.png`
- apex Consulting — text placeholder or custom

### Color considerations

The page palette is light (`#f9f9f7` background, `#d4622a` accent). Logos with dark or colored text on transparent backgrounds work best. Avoid logos with built-in dark/colored backgrounds unless they complement the section they're placed in.

-----

*Last updated: April 2026*

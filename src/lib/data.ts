// Career start = PepsiCo start date, the oldest entry in `experience` (Nov 2012).
// Recomputed on every real page load from the visitor's own clock — see STRATEGY.md
// §3.1 for why this needs no SSR/CSR reconciliation (useCountUp always SSRs a "0").
const CAREER_START_DATE = new Date(2012, 10, 1); // month is 0-indexed: 10 = November

function yearsSince(start: Date): number {
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (beforeAnniversary) years -= 1;
  return years;
}

const heroYears = yearsSince(CAREER_START_DATE);

export const hero = {
  name: "Eduardo Castro",
  role: "Brand Strategy",
  location: "Mexico City",
  taglines: [
    `Engineer-turned-marketer with <strong>${heroYears}+ years</strong> in international FMCG — PepsiCo®, J&J, Grupo Mariposa — managing P&Ls, launching products, and leading teams across the US and LATAM.`,
    "The project that defines my career is <strong>Doritos® Rainbow</strong>. PepsiCo's first purpose-driven product. Sold out in one week instead of eight.<br />It's been a Pride flagship ever since.",
    "I build brands that move both culture and market share.",
  ],
  portrait: "/assets/IMG_3827.jpeg",
  stats: [
    { value: String(heroYears), suffix: "+", label: "Years FMCG" },
    { value: "12", suffix: "+", label: "Brands" },
    { value: "200", suffix: "M", label: "Organic Impressions" },
  ],
  cv: "/downloads/CV Eduardo Castro.pdf",
  linkedin: "https://www.linkedin.com/in/eduardocaj",
};

export type EvidencePhoto = { image: string; alt: string; caption: string };

export const doritosEvidence: EvidencePhoto[] = [
  {
    image: "/assets/Doritos/20160523_102105.jpeg",
    alt: "Doritos Rainbow retail cartons laid out in a tiled display",
    caption: "Packaging · 2016",
  },
  {
    image: "/assets/Doritos/IMG-20160523-WA0017.jpeg",
    alt: "Production floor worker holding a Doritos Rainbow bag",
    caption: "Production line · 2016",
  },
  {
    image: "/assets/Doritos/IMG-20160523-WA0020.jpeg",
    alt: "Pallets of Doritos Rainbow shipping boxes in a warehouse",
    caption: "Warehouse · 2016",
  },
  {
    image: "/assets/Doritos/IMG-20160606-WA0015.jpeg",
    alt: "Doritos Rainbow bags stocked on a retail shelf",
    caption: "Retail shelf · 2016",
  },
  {
    image: "/assets/Doritos/IMG-20160608-WA0033.jpeg",
    alt: "Doritos Rainbow store display at Walmart",
    caption: "Store display · 2016",
  },
  {
    image: "/assets/Doritos/IMG-20160611-WA0023.jpeg",
    alt: "Doritos Rainbow promotional display in a supermarket",
    caption: "Supermarket display · 2016",
  },
  {
    image: "/assets/Doritos/IMG-20160613-WA0002.jpeg",
    alt: "Doritos Rainbow print advertisement in a travel magazine",
    caption: "Print feature · 2016",
  },
  {
    image: "/assets/Doritos/IMG-20160606-WA0006.jpeg",
    alt: "Social media post mentioning Doritos Rainbow",
    caption: "Social reaction · 2016",
  },
  {
    image: "/assets/Doritos/IMG-20160606-WA0011.jpeg",
    alt: "Doritos Rainbow bag displayed next to a Facebook post quote",
    caption: "Desk display · 2016",
  },
  {
    image: "/assets/Doritos/IMG_Eduardo Castro _1.jpeg",
    alt: "PepsiCo internal slide for Global Ally Day 2016 featuring Doritos Rainbow",
    caption: "Ally Day · 2016",
  },
  {
    image: "/assets/Doritos/20160812_102324-1.jpeg",
    alt: "Doritos Rainbow bag with handwritten note from PepsiCo's President",
    caption: "Evidence · 2016",
  },
];

export const ergEvidence: EvidencePhoto[] = [
  {
    image: "/assets/ERG/IMG-20160608-WA0062.jpeg",
    alt: "Presenting the EQUAL @ PepsiCo employee resource group vision",
    caption: "EQUAL ERG · 2016",
  },
  {
    image: "/assets/ERG/IMG-20160608-WA0027.jpeg",
    alt: "Group photo at a PepsiCo Ally program event",
    caption: "Ally event · 2016",
  },
  {
    image: "/assets/ERG/20160608_123058.jpeg",
    alt: "Eduardo Castro presenting to a full conference room",
    caption: "Conference · 2016",
  },
  {
    image: "/assets/ERG/IMG-20160623-WA0017.jpeg",
    alt: "Rainbow layer cake with a Pride Connection Mexico topper",
    caption: "Pride Connection · 2016",
  },
  {
    image: "/assets/ERG/IMG_3646.jpeg",
    alt: "Group photo for World AIDS Day awareness",
    caption: "AIDS Day awareness",
  },
  {
    image: "/assets/ERG/IMG-20170505-WA0011.jpeg",
    alt: "PepsiCo EQUAL branding approval slide for 2017",
    caption: "EQUAL branding · 2017",
  },
  {
    image: "/assets/ERG/IMG_0188.jpeg",
    alt: "Presenting on Diversity & Inclusion at Johnson & Johnson",
    caption: "J&J D&I session",
  },
  {
    image: "/assets/ERG/71d2b581-2ee3-4b04-8980-308d5a7f5211.jpeg",
    alt: "Group photo in front of the HRC Equidad MX best-places-to-work banner",
    caption: "HRC recognition",
  },
  {
    image: "/assets/ERG/IMG_2562.jpeg",
    alt: "PepsiCo México social post on the EQUAL employee resource group",
    caption: "EQUAL · social post",
  },
  {
    image: "/assets/ERG/IMG_3665.png",
    alt: "Johnson & Johnson social post on HRC LGBT+ equity recognition",
    caption: "HRC equity · 2020",
  },
];

export const suncareEvidence: EvidencePhoto[] = [
  {
    image: "/assets/Suncare/IMG-20170411-WA0014.jpeg",
    alt: "Pallets of Neutrogena Sun Care product in a distribution warehouse",
    caption: "Warehouse · 2017",
  },
  {
    image: "/assets/Suncare/IMG_0644.jpeg",
    alt: "Neutrogena Sun Fresh product shot",
    caption: "Product shot",
  },
  {
    image: "/assets/Suncare/IMG_0643.jpeg",
    alt: "Neutrogena Sun Fresh SPF 50+ campaign creative",
    caption: "Campaign creative",
  },
];

export const fromZeroEvidence: EvidencePhoto[] = [
  {
    image: "/assets/FromZero/IMG_7923.jpeg",
    alt: "Ocho beverage formulation samples labeled for testing",
    caption: "Ocho · formulation samples",
  },
  {
    image: "/assets/FromZero/IMG_2723.jpeg",
    alt: "Mattson beverage formulation tasting samples from product development",
    caption: "Mattson · formulation tasting",
  },
  {
    image: "/assets/FromZero/IMG_2737.jpeg",
    alt: "Consumer research panel session",
    caption: "Consumer panel",
  },
  {
    image: "/assets/FromZero/IMG_2761.jpeg",
    alt: "Consumer taste-test panel session",
    caption: "Taste-test panel",
  },
  {
    image: "/assets/FromZero/IMG_1323.jpeg",
    alt: "Bía Foods brand presentation on stage at a CBC conference",
    caption: "Bía Foods · Grupo Mariposa",
  },
  {
    image: "/assets/FromZero/46D003A1-7DB2-47E8-8798-1C1BF5E7447B.jpeg",
    alt: "Factory visit during a San Marcos production run",
    caption: "San Marcos · factory visit",
  },
  {
    image: "/assets/FromZero/5B94F4B9-F06D-4475-B421-A8F0FC52ED86.jpeg",
    alt: "Holding a Mulby can on the bottling line floor",
    caption: "Bottling line",
  },
  {
    image: "/assets/FromZero/3be2b90c-e917-486b-8e18-ca6ffb19b5a3.jpeg",
    alt: "Trade-show booth for the Mulby beverage brand",
    caption: "Mulby launch · Grupo Mariposa",
  },
  {
    image: "/assets/FromZero/IMG_3727.jpeg",
    alt: "Celebrating the Mulby beverage launch",
    caption: "Mulby team · Grupo Mariposa",
  },
  {
    image: "/assets/FromZero/IMG_7887.jpeg",
    alt: "Warehouse visit in safety gear",
    caption: "Warehouse visit",
  },
  {
    image: "/assets/FromZero/IMG_5016.jpeg",
    alt: "Team recognition moment for the Mulby brand",
    caption: "Team recognition",
  },
];

export type Project = {
  index: string;
  company: string;
  title: string;
  challenge: string;
  action: string;
  metrics: string;
  photos: EvidencePhoto[];
};

export const projects: Project[] = [
  {
    index: "01",
    company: "J&J / PepsiCo®",
    title: "ERG Leadership & Inclusion",
    challenge:
      "Neither PepsiCo nor J&J had an LGBTQ+ employee resource group when Eduardo joined — no internal advocacy structure, no visible allyship program.",
    action:
      "Founded EQUAL ERG at PepsiCo® and Open & Out at J&J, building both advocacy and allyship programs from the ground up.",
    metrics: "HRC Best Place to Work · James E. Burke Award · LATAM Forum recognition",
    photos: ergEvidence,
  },
  {
    index: "02",
    company: "Johnson & Johnson",
    title: "Neutrogena® Sun Care Launch",
    challenge:
      "Neutrogena's Sun Care line had been stalled at the Mexican border for four years — SPF 55+ is classified as a drug in Mexico, requiring a COFEPRIS pathway nobody had mapped.",
    action:
      "Mapped the regulatory pathway, coordinated regional production in Brazil, and launched the category from zero within two years.",
    metrics: "New category from zero · +10% incremental B2B revenue · New market share",
    photos: suncareEvidence,
  },
  {
    index: "03",
    company: "Grupo Mariposa",
    title: "Brand Built from Zero",
    challenge:
      "No brand, no innovation pipeline, and no system for deciding which of dozens of raw ideas were worth funding under a US$750K P&L.",
    action:
      "Built the validation system from scratch — concept testing, sensory panels, pricing ladders — and ran 165 ideas through it before committing budget to production.",
    metrics: "+35% revenue growth · Digital-first export brand · Full P&L ownership",
    photos: fromZeroEvidence,
  },
];

export type ImpactMetric = {
  company: string;
  stat: string;
  label: string;
  description: string;
};

export const impactMetrics: ImpactMetric[] = [
  {
    company: "apex Consulting",
    stat: "+15%",
    label: "YoY Sales Growth",
    description: "Disruptive GTM strategy and portfolio repositioning for a drinks FMCG client in Mexico.",
  },
  {
    company: "apex Consulting",
    stat: "-35%",
    label: "Drop-off Reduction",
    description: "Consumer research driving UX improvements for a US telecom client's support funnel.",
  },
  {
    company: "apex Consulting",
    stat: "-20%",
    label: "CPC Reduction",
    description: "A/B testing across paid social channels for a FinTech client's acquisition campaigns.",
  },
  {
    company: "Grupo Mariposa",
    stat: "+35%",
    label: "Revenue Growth",
    description: "Built and scaled a digital-first export brand from zero with full P&L ownership.",
  },
  {
    company: "Johnson & Johnson",
    stat: "+11%",
    label: "YoY B2B Revenue",
    description: "Innovation launches and shopper marketing programs across Mexico, Central America, and the Andean region.",
  },
  {
    company: "PepsiCo®",
    stat: "+2.3%",
    label: "Brand SOM Growth",
    description: "Doritos® Rainbow generated 200M+ impressions and sold out in record time.",
  },
];

export type Role = {
  logo: string | null;
  logoExternal?: string;
  logoText?: string;
  dates: string;
  company: string;
  industry: string;
  title: string;
  description: string;
  bullets: { bold: string; rest: string }[];
  tags: string[];
};

export const experience: Role[] = [
  {
    logo: null,
    logoText: "aC\n&Co.",
    dates: "Mar 2024 — Present",
    company: "apex Consulting",
    industry: "Advertisement Services",
    title: "Head of Marketing",
    description:
      "Leading end-to-end marketing strategy and execution for FMCG and consumer-facing brands across Mexico and the US, managing a team of 6.",
    bullets: [
      { bold: "+15% YoY sales", rest: " through a disruptive GTM strategy for a drinks FMCG client" },
      { bold: "35% drop-off reduction", rest: " via consumer research for a US telecom client" },
      { bold: "20% CPC reduction", rest: " through A/B testing for a FinTech client" },
    ],
    tags: ["Brand Strategy", "Performance Marketing", "CRM", "A/B Testing"],
  },
  {
    logo: "/assets/IMG_0576.png",
    dates: "Apr 2020 — Feb 2024",
    company: "Grupo Mariposa",
    industry: "Food & Beverage FMCG",
    title: "Marketing Lead",
    description:
      "Built a brand and a full innovation pipeline from scratch, leading a matrixed team of up to 10. Managed US$750K per-project budgets with full P&L ownership and led 360° campaigns across Google, Meta, and TikTok.",
    bullets: [
      { bold: "+35% revenue growth", rest: " in a lean, digital-first export operation" },
      { bold: "3% CTR", rest: " through omni-channel campaign management" },
      { bold: "165 ideas filtered to 1", rest: " launched product through rigorous consumer validation" },
      { bold: "Monitored competitor sell-out", rest: ", promotions, and communication campaigns — commercially and culturally — while building the brand" },
    ],
    tags: ["P&L Management", "NPD", "Go-to-Market"],
  },
  {
    logo: "/assets/JohnsonJohnson-Logo.svg",
    dates: "Mar 2017 — Apr 2020",
    company: "Johnson & Johnson",
    industry: "Health & Beauty CPG",
    title: "Senior Regional Marketing Manager, LATAM",
    description:
      "Managed brand growth for Neutrogena®, Listerine®, Johnson's® Baby, Lubriderm®, and Tylenol across Mexico, Central America, the Caribbean, and Andean region, coaching a regional team of 4 direct reports across Mexico, Colombia, and Panama.",
    bullets: [
      { bold: "James E. Burke Award", rest: " — J&J's global recognition for creative leadership" },
      { bold: "+11% YoY revenue", rest: " through innovation launches and shopper marketing" },
      { bold: "Founded the LGBTQ+ ERG", rest: " earning HRC 'Best Place to Work' ranking" },
      { bold: "Drove two promotions", rest: " within the team and built the business case to create a new role, expanding the team's capacity to support regional growth" },
    ],
    tags: ["Multichannel Strategy", "LATAM", "Shopper Marketing"],
  },
  {
    logo: "/assets/PepsiCo-Logo.png",
    dates: "Nov 2012 — Mar 2017",
    company: "PepsiCo",
    industry: "Food & Beverage FMCG",
    title: "Marketing Innovation Manager → PMO & Ideation Leader → IT Project Manager",
    description:
      "Owned the full pipeline for Doritos®, Cheetos®, Tostitos®, and Quaker® — 60+ products annually. Led the defining Doritos® Rainbow project.",
    bullets: [
      { bold: "200M+ organic media impressions", rest: " — sold out in record time" },
      { bold: "Circle of Champions & President's Outliers Award", rest: " for innovation leadership" },
      { bold: "Awarded a Swiss Army knife", rest: " for being 'multi-tool' — still accurate description" },
    ],
    tags: ["Brand Innovation", "Purpose Marketing", "Pipeline Management"],
  },
];

export type Brand = { name: string; logo: string };

export const brands: Brand[] = [
  { name: "Doritos",        logo: "/assets/Doritos-logo.png" },
  { name: "Neutrogena",     logo: "/assets/Neutrogena-Logo.svg" },
  { name: "Johnson's Baby", logo: "/assets/JohnsonBaby-Logo.svg" },
  { name: "Beliv",          logo: "/assets/Beliv-SQ.jpeg" },
  { name: "Quaker",         logo: "/assets/Quaker-Logo.png" },
  { name: "Listerine",      logo: "/assets/Listerine-logo.png" },
  { name: "Cheetos",        logo: "/assets/CHEETOS-logo.png" },
  { name: "Bía Foods",      logo: "/assets/Bia-Foods-Logo.svg" },
  { name: "Tostitos",       logo: "/assets/Tostitos-Logo.svg" },
  { name: "Lubriderm",      logo: "/assets/LUBRIDERM-Logo.png" },
  { name: "Aveeno",         logo: "/assets/Aveeno-logo.svg" },
  { name: "CBC",            logo: "/assets/CBC-logo.png" },
];

export type Story = { title: string; body: string; aphorism: string };

export const stories: Story[] = [
  {
    title: "The brief nobody asked for",
    body: "At PepsiCo®, I noticed limited-edition launches underperformed because of sequencing. I mapped data from 6 launches and proposed a trade activation adjustment that became standard practice. Nobody asked for it. That's when the useful ones happen.",
    aphorism: "Not afraid to point out and bridge opportunities",
  },
  {
    title: "The regulatory detour",
    body: "Neutrogena®'s Sun Care had been sitting at the border for 4 years. I diagnosed that SPF 55+ is a drug in Mexico, requiring COFEPRIS pathways. I coordinated regional production in Brazil and launched the category in 2 years. Strategy without diagnosis is just confidence.",
    aphorism: "Process mapping and escalation",
  },
  {
    title: "The 165 ideas",
    body: "At Grupo Mariposa, I built the system to decide what was worth building. Filtered 165 ideas through rigorous validation: concept testing, sensory panels, and pricing ladders. Only one made it to market. That's how you avoid launching products nobody wants.",
    aphorism: "Methodology and evidence-based decisions",
  },
  {
    title: "The packaging line crossover",
    body: "My move to marketing was engineered. As PMO, I was running automation on packaging lines. Innovation team saw how I handled ambiguity and meetings. Technical credentials got me in the room; performance in the room got me the role.",
    aphorism: "Natural orchestrator and big-picture guardian",
  },
];

export const credentials = {
  education: [
    { degree: "Bachelor of Engineering in Information and Communications Technology", institution: "Tecnológico de Monterrey", year: "", logo: "/assets/ITESMSchool-Logo.svg", url: "https://tec.mx" },
    { degree: "Leadership Diploma", institution: "Tecnológico de Monterrey", year: "", logo: "/assets/ITESMSchool-Logo.svg", url: "https://tec.mx" },
    { degree: "Project Management Professional® (PMP®)", institution: "Project Management Institute", year: "Oct 2016", logo: "/assets/PMI-SQ.jpeg", url: "https://pmi.org" },
    { degree: "Certified Scrum Product Owner℠ (CSPO)", institution: "Scrum Alliance", year: "Oct 2022", logo: "/assets/SCRUM-logo.jpeg", url: "https://scruminc.com" },
    { degree: "Strategic Marketing", institution: "Kellogg School of Management", year: "Aug 2023", logo: "/assets/KelloggSchool-Logo.svg", url: "https://kellogg.northwestern.edu" },
    { degree: "Marketing Data Analysis", institution: "Wharton Executive Education", year: "Aug 2022", logo: "/assets/WhartonSchool-logo.jpeg", url: "https://executiveeducation.wharton.upenn.edu" },
  ],
  awards: [
    { icon: "stars", name: "President's Outliers Award", org: "PepsiCo · Doritos® Rainbow initiative" },
    { icon: "workspace_premium", name: "Circle of Champions", org: "PepsiCo · Top 0.1% worldwide" },
    { icon: "verified", name: "James E. Burke Award", org: "Johnson & Johnson · Creative Leadership" },
  ],
  languages: [
    { lang: "English", level: "Native / Fluent" },
    { lang: "Spanish", level: "Native / Fluent" },
    { lang: "Portuguese", level: "Professional Working" },
  ],
  tools: [
    "Nielsen", "Euromonitor", "Google Analytics", "Google Ads", "Meta Business Suite",
    "SEMrush", "HubSpot", "Tableau", "Shopify", "Kantar", "Power BI", "Microsoft Office Suite",
  ],
};

export const contact = {
  emailDirect: "eduardo@casjor.com",
  emailConsulting: "keynote@casjor.com",
  linkedin: "/in/eduardocaj",
  linkedinUrl: "https://www.linkedin.com/in/eduardocaj",
};

// ——— Section copy ———
// All visitor-facing strings live here, not in components (STRATEGY.md §2.6).
// Editing a claim below? Check whether the matching data/knowledge/*.md file
// needs the same change.

export const loaderCopy = {
  kicker: "Eduardo Castro — System Boot",
  status: "> decrypting portfolio",
  headlineLines: ["100% VIBE-CODED", "USING AI"],
};

export const orientationCopy = {
  kicker: "Prologue — 00",
  kickerSuffix: " / Eduardo Castro",
  eyebrow: "Before we begin",
  headlineHtml:
    'I built this with AI.<br />Then I built <span style="color:#ff4d00">a brain</span> inside it.',
  body: "That icon in the corner — it knows my work, my background, what I’ve shipped. Ask it anything.",
  pointerLines: ["that icon,", "bottom-right"],
  pointerCta: "ask it anything ↘",
  pointerCtaMobile: "ask it ↘",
  enterCta: "Enter Site",
};

export const doritosRainbowCopy = {
  year: "2016",
  eyebrow: "The decade started here",
  heading: "PepsiCo’s first purpose-driven product.",
  subheading: "Sold out in one week instead of eight.",
  metricsLine: "200M+ organic impressions · +2.3% brand SOM · President’s Outliers Award",
  closing: "This is what becomes possible when a brand decides to mean something.",
  bottomBarTitle: "Defining Work",
  bottomBarHintMobile: "walk through",
  bottomBarHintDesktop: "the decade that walked through the door",
};

export const howIWorkCopy = {
  eyebrow: "03 / Method",
  heading: "How I Work",
  closingQuote:
    "The methodology itself became an asset the company didn’t have before I arrived.",
  closingSecondary:
    "The measure of the work isn’t just the brand — it’s the team left behind it: two promotions built into the business case at J&J, a team of six at Apex today.",
};

export const impactCopy = {
  eyebrow: "05 / Impact",
  headingLine1: "Results that",
  headingAccent: "hold up.",
  intro:
    "Numbers from real engagements, not projections. Each one traces back to a strategic decision, a team, and a market.",
};

export type ContactLink = {
  icon: string;
  label: string;
  value: string;
  href: string;
  external: boolean;
  gtmEvent: string;
  download?: boolean;
  variant?: "accent";
};

export const contactCopy = {
  headingLine1: "Let’s",
  headingAccent: "Connect.",
  pitchLines: [
    "If you’re building a brand that needs to move both culture and market share,",
    "I’d like to hear about it.",
  ],
  links: [
    {
      icon: "mail",
      label: "Direct",
      value: contact.emailDirect,
      href: `mailto:${contact.emailDirect}?subject=Let%27s%20talk`,
      external: false,
      gtmEvent: "email_click",
    },
    {
      icon: "mail_outline",
      label: "Consulting & Speaking",
      value: contact.emailConsulting,
      href: `mailto:${contact.emailConsulting}?subject=Keynote%20%26%20Speaking`,
      external: false,
      gtmEvent: "email_click",
    },
    {
      icon: "group",
      label: "LinkedIn Profile",
      value: contact.linkedin,
      href: contact.linkedinUrl,
      external: true,
      gtmEvent: "linkedin_click",
    },
    {
      icon: "download",
      label: "Résumé",
      value: "Download the PDF",
      href: hero.cv,
      external: false,
      download: true,
      gtmEvent: "resume_download",
      variant: "accent",
    },
  ] satisfies ContactLink[],
};

export const footerCopy = {
  trademarkNote:
    "All trademarks, brand names, and logos referenced on this site are the property of their respective owners. Eduardo Castro’s association with these brands was in a professional capacity.",
  privacyNote:
    "This site uses Google Analytics to understand how visitors engage. Conversations with the chat assistant — including any contact details you choose to share in them — are stored and summarized so Eduardo can read them and follow up. Nothing is sold or shared beyond that.",
};

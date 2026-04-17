export const hero = {
  name: "Eduardo Castro",
  role: "Brand Strategy",
  location: "Mexico City",
  taglines: [
    "Engineer-turned-marketer with <strong>13+ years</strong> in international FMCG — PepsiCo®, J&J, Grupo Mariposa — managing P&Ls, launching products, and leading teams across the US and LATAM.",
    "The project that defines my career is <strong>Doritos® Rainbow</strong> — PepsiCo®'s first purpose-driven product. Launched the week of the Pulse massacre in Orlando. Sold out in one week instead of eight. 200M+ organic impressions. It's been a Pride flagship ever since.",
    "I build brands that move both culture and market share.",
  ],
  portrait: "/assets/IMG_3827.jpeg",
  stats: [
    { value: "13", suffix: "+", label: "Years FMCG" },
    { value: "200", suffix: "M", label: "Impressions" },
    { value: "35", suffix: "%", label: "Revenue Growth" },
  ],
  cv: "/downloads/CV Eduardo Castro.pdf",
  linkedin: "https://www.linkedin.com/in/eduardocaj",
  email: "mailto:eduardo@casjor.com?subject=Let's connect",
};

export type Project = {
  index: string;
  company: string;
  title: string;
  description: string;
  metrics: string;
  image: string;
  altText?: string;
  imagePlaceholder?: { bg: string; label: string };
};

export const projects: Project[] = [
  {
    index: "01",
    company: "PepsiCo®",
    title: "Doritos® Rainbow",
    description:
      "PepsiCo®'s first purpose-driven product. Launched the week of the Pulse massacre in Orlando. 100% of profits donated to LGBT+ ally NGOs. Sold out in one week instead of eight.",
    metrics: "200M+ organic impressions · +2.3% brand SOM · President's Outliers Award",
    image: "/assets/20160812_102324-1.jpeg",
    altText: "Doritos Rainbow — PepsiCo's first purpose-driven product, launched 2016",
  },
  {
    index: "02",
    company: "J&J / PepsiCo®",
    title: "ERG Leadership & Inclusion",
    description:
      "Founded EQUAL ERG at PepsiCo® and led Open & Out at J&J. Contributed to J&J earning HRC 'Best Place to Work for LGBT+ Equity' and LATAM Forum recognition.",
    metrics: "HRC Best Place to Work · James E. Burke Award · LATAM Forum recognition",
    image: "/assets/IMG_0576.png",
    altText: "Pride Connection National Congress — Eduardo Castro speaking on LGBTQ+ inclusion in the workplace",
  },
  {
    index: "03",
    company: "Johnson & Johnson",
    title: "Neutrogena® Sun Care Launch",
    description:
      "Unlocked a four-year regulatory stall by mapping the SPF 55+ COFEPRIS pathway. Coordinated regional production in Brazil and launched the category from zero.",
    metrics: "New category from zero · +10% incremental B2B revenue · New market share",
    image: "/assets/IMG_0583.jpeg",
    altText: "Neutrogena Sun Care product portfolio — J&J Mexico market launch",
  },
  {
    index: "04",
    company: "Grupo Mariposa",
    title: "Brand Built from Zero",
    description:
      "Built a brand and innovation system from scratch. Filtered 165 ideas down to one market-ready product through rigorous consumer validation gates.",
    metrics: "+35% revenue growth · Digital-first export brand · Full P&L ownership",
    image: "/assets/IMG_0584.jpeg",
    altText: "Grupo Mariposa brand launch — product portfolio built from zero",
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
    description: "A/B testing and SEO strategy for a FinTech client's social media acquisition campaigns.",
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
    description: "Launched Neutrogena®'s Sun Care category in Mexico after mapping a regulatory stall.",
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
    logoText: "aC\n&Co",
    dates: "Mar 2024 — Present",
    company: "apex Consulting",
    industry: "Marketing Consulting",
    title: "Marketing Consultant",
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
    title: "Marketing Director — Head of Marketing & Product Development",
    description:
      "Built a brand and a full innovation pipeline from scratch. Managed a US$750K P&L and led 360° campaigns across Google, Meta, and TikTok.",
    bullets: [
      { bold: "+35% revenue growth", rest: " in a lean, digital-first export operation" },
      { bold: "3% CTR", rest: " through omni-channel campaign management" },
      { bold: "165 ideas filtered to 1", rest: " launched product through rigorous consumer validation" },
      { bold: "Drove two promotions", rest: " within the team and built the business case to create a new role, expanding the team's capacity to support regional growth" },
    ],
    tags: ["P&L Management", "NPD", "Go-to-Market"],
  },
  {
    logo: null,
    logoText: "J&J",
    dates: "Mar 2017 — Apr 2020",
    company: "Johnson & Johnson",
    industry: "Health & Beauty CPG",
    title: "Senior Regional Marketing Manager, LATAM",
    description:
      "Managed brand growth for Neutrogena®, Listerine®, Johnson's® Baby, and Tylenol across Mexico, Central America, the Caribbean, and Andean region.",
    bullets: [
      { bold: "James E. Burke Award", rest: " — J&J's global recognition for creative leadership" },
      { bold: "+11% YoY revenue", rest: " through innovation launches and shopper marketing" },
      { bold: "Founded the LGBTQ+ ERG", rest: " earning HRC 'Best Place to Work' ranking" },
      { bold: "Drove two promotions", rest: " within the team and built the business case to create a new role, expanding the team's capacity to support regional growth" },
    ],
    tags: ["Multichannel Strategy", "LATAM", "Shopper Marketing"],
  },
  {
    logo: null,
    logoText: "PepsiCo",
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
  { name: "Lubriderm",      logo: "/assets/LURBIDERM-SQ.jpeg" },
  { name: "Aveeno",         logo: "/assets/Aveeno-logo.svg" },
  { name: "CBC",            logo: "/assets/CBC-logo.png" },
];

export type Story = { title: string; body: string };

export const stories: Story[] = [
  {
    title: "The brief nobody asked for",
    body: "At PepsiCo®, I noticed limited-edition launches underperformed because of sequencing. I mapped data from 6 launches and proposed a trade activation adjustment that became standard practice. Nobody asked for it. That's when the useful ones happen.",
  },
  {
    title: "The regulatory detour",
    body: "Neutrogena®'s Sun Care had been sitting at the border for 4 years. I diagnosed that SPF 55+ is a drug in Mexico, requiring COFEPRIS pathways. I coordinated regional production in Brazil and launched the category in 2 years. Strategy without diagnosis is just confidence.",
  },
  {
    title: "The 165 ideas",
    body: "At Grupo Mariposa, I built the system to decide what was worth building. Filtered 165 ideas through rigorous validation: concept testing, sensory panels, and pricing ladders. Only one made it to market. That's how you avoid launching products nobody wants.",
  },
  {
    title: "The packaging line crossover",
    body: "My move to marketing was engineered. As PMO, I was running automation on packaging lines. Innovation team saw how I handled ambiguity and meetings. Technical credentials got me in the room; performance in the room got me the role.",
  },
];

export const credentials = {
  education: [
    { degree: "BSc — Computer Engineering & IT Project Management", institution: "Tecnológico de Monterrey", year: "", logo: "/assets/ITESMSchool-Logo.svg" },
    { degree: "Project Management Professional® (PMP®)", institution: "Project Management Institute", year: "Oct 2016", logo: "/assets/PMI-SQ.jpeg" },
    { degree: "Certified Scrum Product Owner℠ (CSPO)", institution: "Scrum Inc.", year: "Oct 2022", logo: "/assets/SCRUM-logo.jpeg" },
    { degree: "Strategic Marketing", institution: "Kellogg School of Management", year: "Aug 2023", logo: "/assets/KelloggSchool-Logo.svg" },
    { degree: "Data Analysis", institution: "Wharton Executive Education", year: "Aug 2022", logo: "/assets/WhartonSchool-logo.jpeg" },
  ],
  awards: [
    { icon: "stars", name: "President's Outliers Award", org: "PepsiCo · Doritos® Rainbow initiative" },
    { icon: "workspace_premium", name: "Circle of Champions", org: "PepsiCo · Top 0.1% worldwide" },
    { icon: "verified", name: "James E. Burke Award", org: "Johnson & Johnson · Creative Leadership" },
    { icon: "emoji_events", name: "HRC Best Place to Work", org: "J&J Mexico · LGBTQ+ Equity" },
  ],
  languages: [
    { lang: "English", level: "Native / Bilingual" },
    { lang: "Spanish", level: "Native / Bilingual" },
    { lang: "Portuguese", level: "Professional Working" },
  ],
  tools: [
    "Nielsen", "Euromonitor", "Google Analytics", "Meta Business Suite",
    "SEMrush", "Tableau", "HubSpot", "Shopify", "Kantar",
  ],
};

export const contact = {
  emailDirect: "eduardo@casjor.com",
  emailConsulting: "consulting@casjor.com",
  linkedin: "/in/eduardocaj",
  linkedinUrl: "https://www.linkedin.com/in/eduardocaj",
  cvUrl: "/downloads/CV Eduardo Castro.pdf",
};

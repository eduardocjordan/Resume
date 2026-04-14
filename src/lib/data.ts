export const hero = {
  name: "Eduardo Castro",
  role: "Marketing Director",
  location: "Mexico City",
  tagline:
    "Engineer-turned-marketer with <strong>13+ years</strong> in international FMCG — PepsiCo, J&J, Grupo Mariposa — managing P&Ls, launching products, and leading teams across the US and LATAM.",
  portrait:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB6-FRZm4QBzwKYeTvn7EPr8lgLzEKBOknwxBnQNYfwvOnBD8udCNvW_L-3YY2dU3GSwJ4OEDFchnH_mm5MvOnYdA-6zfruSng9EReWQsaNLQukyYBEF545S6vdU3FbUQULdHL49tMGwnr4GyGs9G2fPYktXfJasSIHDAPpI_gBewrVhAHG7I_wDVkpcBkw9L4gzE4xcHk27Y0flHT_nEO4ltaW1tx0ljasIAj7BtOu4Iv2szUOoPQ2DVuGIJDf4PcshW9e9TF0OVM",
  stats: [
    { value: "13", suffix: "+", label: "Years FMCG" },
    { value: "200", suffix: "M", label: "Impressions" },
    { value: "35", suffix: "%", label: "Revenue Growth" },
  ],
  cv: "#",
  linkedin: "https://linkedin.com/in/eduardocaj",
  email: "mailto:eduardocjordan@icloud.com",
};

export type Project = {
  index: string;
  company: string;
  title: string;
  description: string;
  metrics: string;
  image: string;
};

export const projects: Project[] = [
  {
    index: "01",
    company: "PepsiCo",
    title: "Doritos Rainbow",
    description:
      "PepsiCo's first purpose-driven product. Launched the week of the Pulse massacre in Orlando. 100% of profits donated to LGBT+ ally NGOs. Sold out in one week instead of eight.",
    metrics: "200M+ organic impressions · +2.3% brand SOM · President's Outliers Award",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwEjYELq9UL1kRBsPdKFIU5RPFx8gW1oqFQwECCpcovPa_ZBD0KqOrrpSuPah58CfgMAE_8dr-vpdO3vJDnvKZn_r1y_B2NLm0-M8glGPbUaZ-kaTbJJXk6gaeRAHGVXGYYfF58yNDrIcopqLzgklr-GhofWXKbH6bG_4cyKOVJe0rhBsLyRna57NKF5N_KZRmXLoQKhKA76IkKUtIkoiMKFhBb-ZYpSPXk1zrvlBMYCxeDj39-I9bSB2rtVkMjQpYC--Jhhu37ik",
  },
  {
    index: "02",
    company: "J&J / PepsiCo",
    title: "ERG Leadership & Inclusion",
    description:
      "Founded EQUAL ERG at PepsiCo and led Open & Out at J&J. Contributed to J&J earning HRC 'Best Place to Work for LGBT+ Equity' and LATAM Forum recognition.",
    metrics: "HRC Best Place to Work · James E. Burke Award · LATAM Forum recognition",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsJDfbJZFlreQoHPQkWzhm6hU8-U_UQlvCC0gTqanf599YYDvV7AY8tv14-OdoImQwjNn34jXX5oAxaYmHQbUk_id6W2JeAYthktmXxyeBVOxKaTOHy4o7g2a3ugyhZIDE-cPWaHaGdYgjudnj6C6kEs2vkbB9KrpqTsLzo267t0maRAymbLDNMvGqHfNbGfsDYGt2FNpFPd_9sJkQGC25taCUKJLSiBM2kIMZ9dEsnk539QhLafeR48r3gvWU10pNW5DzIrNVrjk",
  },
  {
    index: "03",
    company: "Johnson & Johnson",
    title: "Neutrogena Sun Care Launch",
    description:
      "Unlocked a four-year regulatory stall by mapping the SPF 55+ COFEPRIS pathway. Coordinated regional production in Brazil and launched the category from zero.",
    metrics: "New category from zero · +10% incremental B2B revenue · New market share",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeBLjkxBtLaNAxKMWh11uCBrNVnnoOfcq6u2DNjyFIqtEjqIXelvXko-ftrnSgXntTfgU5D2Mtf9PFnK7kYMWjMX-FjrnnWEwgd5X773ZKm6q4kDokIn9Ceopa3jlbt1K3pMOorbDzO9lZvEPuFeTMVvSli8hjNryAzZ3icRECfep26KfT51qVkKkPmwH7P3e7PMvDt3XWWHgSxWEmwMcVP6ywsLY8HDX0hm1sguS0goEvfmMTk7kRtzJ7zC0LFDb5BlqNQ3a9zi4",
  },
  {
    index: "04",
    company: "Grupo Mariposa",
    title: "Brand Built from Zero",
    description:
      "Built a brand and innovation system from scratch. Filtered 165 ideas down to one market-ready product through rigorous consumer validation gates.",
    metrics: "+35% revenue growth · Digital-first export brand · Full P&L ownership",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA21Fgo4TH-AdMXqDalP8rIDugq90_uPkivj6n5EdwjG86XSJDnXLHdIPTxTfF0rwtkfrv9saujza2o2eMohJdT0qSRi_Op1_ByvScCFWyhrJstN2rVkBLJyqgILStZltm7by3rcAIKAH1vTmXRM3w_aIGp1tcdR28wKcmT8ajdPPJrny_7D-PY3NnQkaC30mwAyf5cfsyVriOaPDWoK3b8cOLFM-ylE3hSzqHAp808Mg6FHg2quUeUeRkqcBY51tKoXbZtye-hA6Q",
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
    description:
      "Disruptive GTM strategy and portfolio repositioning for a drinks FMCG client in Mexico.",
  },
  {
    company: "apex Consulting",
    stat: "-35%",
    label: "Drop-off Reduction",
    description:
      "Consumer research driving UX improvements for a US telecom client's support funnel.",
  },
  {
    company: "apex Consulting",
    stat: "-20%",
    label: "CPC Reduction",
    description:
      "A/B testing and SEO strategy for a FinTech client's social media acquisition campaigns.",
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
    description:
      "Launched Neutrogena's Sun Care category in Mexico after mapping a regulatory stall.",
  },
  {
    company: "PepsiCo",
    stat: "+2.3%",
    label: "Brand SOM Growth",
    description: "Doritos Rainbow generated 200M+ impressions and sold out in record time.",
  },
];

export type Role = {
  monogram: string;
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
    monogram: "aC",
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
    monogram: "GM",
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
    ],
    tags: ["P&L Management", "NPD", "Go-to-Market"],
  },
  {
    monogram: "J&J",
    dates: "Mar 2017 — Apr 2020",
    company: "Johnson & Johnson",
    industry: "Health & Beauty CPG",
    title: "Senior Regional Marketing Manager, LATAM",
    description:
      "Managed brand growth for Neutrogena, Listerine, Johnson's Baby, and Tylenol across Mexico, Central America, the Caribbean, and Andean region.",
    bullets: [
      { bold: "James E. Burke Award", rest: " — J&J's global recognition for creative leadership" },
      { bold: "+11% YoY revenue", rest: " through innovation launches and shopper marketing" },
      { bold: "Founded the LGBTQ+ ERG", rest: " earning HRC 'Best Place to Work' ranking" },
    ],
    tags: ["Multichannel Strategy", "LATAM", "Shopper Marketing"],
  },
  {
    monogram: "Pepsi",
    dates: "Nov 2012 — Mar 2017",
    company: "PepsiCo",
    industry: "Food & Beverage FMCG",
    title: "Marketing Innovation Manager",
    description:
      "Owned the full pipeline for Doritos, Cheetos, Tostitos, and Quaker — 60+ products annually. Led the defining Doritos Rainbow project.",
    bullets: [
      { bold: "200M+ organic media impressions", rest: " — sold out in record time" },
      { bold: "Circle of Champions & President's Outliers Award", rest: " for innovation leadership" },
      { bold: "Awarded a Swiss Army knife", rest: " for being 'multi-tool' — still accurate description" },
    ],
    tags: ["Brand Innovation", "Purpose Marketing", "Pipeline Management"],
  },
];

export const brands = [
  "Pepsi",
  "Doritos",
  "Neutrogena",
  "Listerine",
  "Johnson's Baby",
  "Tylenol",
  "Cheetos",
  "Tostitos",
  "Quaker",
  "+More",
];

export type Story = { title: string; body: string };

export const stories: Story[] = [
  {
    title: "The brief nobody asked for",
    body: "At PepsiCo, I noticed limited-edition launches underperformed because of sequencing. I mapped data from 6 launches and proposed a trade activation adjustment that became standard practice. Nobody asked for it. That's when the useful ones happen.",
  },
  {
    title: "The regulatory detour",
    body: "Neutrogena's Sun Care had been sitting at the border for 4 years. I diagnosed that SPF 55+ is a drug in Mexico, requiring COFEPRIS pathways. I coordinated regional production in Brazil and launched the category in 2 years. Strategy without diagnosis is just confidence.",
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
    { degree: "MBA — Business Administration", institution: "Tecnológico de Monterrey", year: "2027" },
    { degree: "BSc — Computer Engineering", institution: "Tecnológico de Monterrey", year: "" },
    { degree: "Project Management Professional (PMP)", institution: "PMI", year: "Oct 2016" },
    { degree: "Strategic Marketing", institution: "Kellogg School of Management", year: "" },
  ],
  awards: [
    { icon: "stars", name: "President's Outliers Award", org: "PepsiCo · Doritos Rainbow initiative" },
    { icon: "workspace_premium", name: "Circle of Champions", org: "PepsiCo · Top 0.1% worldwide" },
    { icon: "verified", name: "James E. Burke Award", org: "Johnson & Johnson · Creative Leadership" },
  ],
  languages: [
    { lang: "English", level: "Native / Bilingual" },
    { lang: "Spanish", level: "Native / Bilingual" },
    { lang: "Portuguese", level: "Professional Working" },
  ],
  tools: ["Nielsen", "Tableau", "Meta Business", "HubSpot"],
};

export const contact = {
  email: "eduardocjordan@icloud.com",
  linkedin: "/in/eduardocaj",
  linkedinUrl: "https://linkedin.com/in/eduardocaj",
  cvUrl: "#",
};

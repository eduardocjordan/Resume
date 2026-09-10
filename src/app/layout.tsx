import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const siteUrl = "https://eduardo.casjor.com";

export const metadata: Metadata = {
  title: "Eduardo Castro | Brand strategist",
  description:
    "Engineer-turned-marketer with 13+ years in international FMCG — PepsiCo, J&J, Grupo Mariposa — managing P&Ls, launching products, and leading teams across the US and LATAM.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Eduardo Castro | Brand strategist",
    description:
      "Engineer-turned-marketer with 13+ years in international FMCG — PepsiCo, J&J, Grupo Mariposa — managing P&Ls, launching products, and leading teams across the US and LATAM.",
    url: siteUrl,
    siteName: "Eduardo Castro",
    images: [
      {
        url: `${siteUrl}/assets/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Eduardo Castro — Head of Marketing",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Castro | Brand strategist",
    description:
      "Engineer-turned-marketer with 13+ years in international FMCG — PepsiCo, J&J, Grupo Mariposa.",
    images: [`${siteUrl}/assets/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eduardo Castro",
  jobTitle: "Head of Marketing",
  description:
    "Engineer-turned-marketer with 13+ years in international FMCG across the US and LATAM.",
  url: siteUrl,
  image: `${siteUrl}/assets/IMG_3827.jpeg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mexico City",
    addressCountry: "MX",
  },
  sameAs: ["https://www.linkedin.com/in/eduardocaj"],
  worksFor: [
    { "@type": "Organization", name: "PepsiCo" },
    { "@type": "Organization", name: "Johnson & Johnson" },
    { "@type": "Organization", name: "Grupo Mariposa" },
  ],
  knowsAbout: [
    "Market research and competitive intelligence",
    "Brand management",
    "Product management",
    "Trade management",
    "Marketing and sales campaigns and promotions",
    "Pricing strategy",
    "Sales planning, forecasting, and quota-setting",
    "Go-to-market strategy",
    "New product development",
    "Marketing KPI development and performance reporting",
    "Distribution channel and trade partner management",
    "Team leadership and performance management",
    "P&L management",
    "FMCG and CPG marketing",
    "Multi-market brand management across LATAM and the US",
    "Regional marketing across Mexico, Central America, the Caribbean, and the Andean region",
    "Working in matrixed organizational structures and leading matrixed teams",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Head of Marketing",
    responsibilities: [
      "Manages and coordinates the marketing function across subfunctions, including market research, brand and product management, trade management, and marketing and sales campaigns and promotions.",
      "Designs, proposes, and implements marketing and product strategies, guidelines, and procedures to meet short- and long-term business needs.",
      "Oversees market research and monitors competitor activity, including competitor sell-out, promotions, and communication campaigns.",
      "Oversees the development of marketing plans for the company's products and brands, including pricing strategies and sales plans.",
      "Develops and attains key performance indicators for implemented marketing strategies, and assesses and communicates the results.",
      "Connects the marketing and sales functions by leading their joint work with distributors, retailers, and trade partners through annual brand plan, forecasting, and pricing routines.",
      "Contributes to the development of new products, coordinating with sales, engineering, manufacturing, and regulatory functions on design and launch.",
      "Supports the professional development of subordinate staff and assesses their performance, including building the business case for new roles and promotions, across matrixed and multi-country teams.",
    ],
    skills:
      "Market research, brand and product management, trade management, campaign and promotion management, pricing strategy, sales planning and forecasting, go-to-market strategy, new product development, marketing KPI development, distribution channel management, team leadership and performance management.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Dark mode init — runs before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.add(t);})();`,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TGGFXCRN');`,
          }}
        />
        {/* End Google Tag Manager */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TGGFXCRN" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}

        {/* Accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:font-label focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

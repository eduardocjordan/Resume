import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://eduardocjordan.github.io/Resume";

export const metadata: Metadata = {
  title: "Eduardo Castro — Marketing Director | FMCG & CPG",
  description:
    "Engineer-turned-marketer with 13+ years in international FMCG — PepsiCo, J&J, Grupo Mariposa — managing P&Ls, launching products, and leading teams across the US and LATAM.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Eduardo Castro — Marketing Director | FMCG & CPG",
    description:
      "Engineer-turned-marketer with 13+ years in international FMCG — PepsiCo, J&J, Grupo Mariposa — managing P&Ls, launching products, and leading teams across the US and LATAM.",
    url: siteUrl,
    siteName: "Eduardo Castro",
    images: [
      {
        url: `${siteUrl}/assets/IMG_3827.jpeg`,
        width: 1200,
        height: 630,
        alt: "Eduardo Castro — Marketing Director",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Castro — Marketing Director | FMCG & CPG",
    description:
      "Engineer-turned-marketer with 13+ years in international FMCG — PepsiCo, J&J, Grupo Mariposa.",
    images: [`${siteUrl}/assets/IMG_3827.jpeg`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eduardo Castro",
  jobTitle: "Marketing Director",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-54MDSK5D');`,
          }}
        />
        {/* End Google Tag Manager */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
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
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-54MDSK5D" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
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
      </body>
    </html>
  );
}

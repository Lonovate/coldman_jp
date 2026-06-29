import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coldmanjp.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Coldman JP | Servicios Profesionales de HVAC en Puerto Rico | Professional HVAC Services",
    template: "%s | Coldman JP",
  },
  description:
    "Coldman JP LLC — Instalación, reparación, mantenimiento y limpieza de aires acondicionados en Puerto Rico. Mini Split, VRF, aire central, refrigeración comercial. Registrados en SAM.gov. | Professional AC installation, repair & maintenance in Puerto Rico.",
  keywords: [
    "HVAC Puerto Rico",
    "air conditioning Puerto Rico",
    "AC installation Puerto Rico",
    "AC repair Puerto Rico",
    "mini split installation",
    "aire acondicionado Puerto Rico",
    "instalación de aire acondicionado",
    "reparación de aire acondicionado",
    "mantenimiento aire acondicionado",
    "limpieza profunda AC",
    "VRF Puerto Rico",
    "refrigeración comercial Puerto Rico",
    "Coldman JP",
    "HVAC contractor Puerto Rico",
    "tratamiento anticorrosivo AC",
    "anti-corrosion treatment AC",
    "trabajo eléctrico HVAC",
    "fan coil installation",
    "aire central Puerto Rico",
    "commercial refrigeration Puerto Rico",
    "SAM.gov registered contractor",
    "federal construction HVAC",
  ],
  authors: [{ name: "Coldman JP LLC" }],
  creator: "Coldman JP LLC",
  publisher: "Coldman JP LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-PR": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_PR",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Coldman JP",
    title:
      "Coldman JP | Servicios Profesionales de HVAC en Puerto Rico",
    description:
      "Instalación, reparación, mantenimiento y limpieza de aires acondicionados. Mini Split, VRF, aire central, refrigeración comercial. 5+ años de experiencia en Puerto Rico.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Coldman JP - Professional HVAC Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coldman JP | Professional HVAC Services in Puerto Rico",
    description:
      "AC installation, repair, maintenance & deep cleaning. Mini Split, VRF, central air, commercial refrigeration. 5+ years in Puerto Rico.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  category: "HVAC Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": `${siteUrl}/#business`,
                  name: "Coldman JP LLC",
                  description:
                    "Servicios profesionales de HVAC en Puerto Rico. Instalación, reparación, mantenimiento y limpieza de aires acondicionados. Professional HVAC services in Puerto Rico.",
                  url: siteUrl,
                  logo: `${siteUrl}/logo.png`,
                  image: `${siteUrl}/logo.png`,
                  telephone: "+1-787-525-6934",
                  email: "coldmanjp.llc@gmail.com",
                  address: {
                    "@type": "PostalAddress",
                    addressRegion: "PR",
                    addressCountry: "US",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 18.2208,
                    longitude: -66.5901,
                  },
                  areaServed: {
                    "@type": "Place",
                    name: "Puerto Rico",
                  },
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ],
                      opens: "08:00",
                      closes: "18:00",
                    },
                  ],
                  sameAs: [
                    "https://www.facebook.com/profile.php?id=100090963060487",
                    "https://www.instagram.com/coldmanjp",
                  ],
                  priceRange: "$$",
                  paymentAccepted:
                    "Cash, Credit Card, Debit Card, ATH Móvil, Check",
                  currenciesAccepted: "USD",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "HVAC Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "AC Installation / Instalación de AC",
                          description:
                            "Mini Split, Multi Split, Central Air, VRF, Fan Coil, Air Handlers, Commercial Systems",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Anti-Corrosion Treatment / Tratamiento Anticorrosivo",
                          description:
                            "Specialized protection against corrosion for coastal properties",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Diagnostics & Repair / Diagnóstico y Reparación",
                          description:
                            "Compressors, Fan Motors, Electronic Boards, Sensors, Leak Detection",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Deep Cleaning / Limpieza Profunda",
                          description:
                            "Thorough deep cleaning for all AC unit types",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Commercial Refrigeration / Refrigeración Comercial",
                          description:
                            "Commercial fridges, walk-in coolers, cold rooms, preventive maintenance",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "HVAC Electrical Work / Trabajo Eléctrico HVAC",
                          description:
                            "120V/220V power supply, subpanels, breakers, dedicated circuits, HVAC wiring",
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Coldman JP",
                  publisher: { "@id": `${siteUrl}/#business` },
                  inLanguage: ["es-PR", "en-US"],
                },
                {
                  "@type": "WebPage",
                  "@id": `${siteUrl}/#webpage`,
                  url: siteUrl,
                  name: "Coldman JP | Servicios Profesionales de HVAC en Puerto Rico",
                  isPartOf: { "@id": `${siteUrl}/#website` },
                  about: { "@id": `${siteUrl}/#business` },
                  inLanguage: ["es-PR", "en-US"],
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { company, images } from "@/lib/cms-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: `${company.name} | ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description: "Luxury interior design, custom furniture, premium décor, eCommerce, consultations, and enterprise CMS by Home Style Interior & Decore in Sialkot, Pakistan.",
  keywords: ["Luxury Interior Design", "Furniture Sialkot", "Custom Furniture Pakistan", "Home Style Interior", "Interior Design CMS", "Luxury Furniture"],
  authors: [{ name: company.managingDirector }],
  creator: company.name,
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: company.website,
    siteName: company.name,
    title: `${company.name} | ${company.tagline}`,
    description: "Designing Your Dream Space with luxury furniture, custom interiors, and premium CMS-managed commerce.",
    images: [{ url: images.hero, width: 1200, height: 627, alt: company.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: company.name,
    description: company.tagline,
    images: [images.hero],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: company.name,
    slogan: company.tagline,
    url: company.website,
    telephone: company.phone,
    email: company.email,
    founder: company.managingDirector,
    image: images.hero,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Block C, Near Main Fountain, Citi Housing Society",
      addressLocality: "Sialkot",
      addressCountry: "PK",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "11:00", closes: "21:00" },
    ],
    sameAs: [company.website],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#FAF8F5] font-sans text-[#3E3933] antialiased selection:bg-[#ECDDCC] selection:text-[#3E3933] dark:bg-[#171410] dark:text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {children}
      </body>
    </html>
  );
}

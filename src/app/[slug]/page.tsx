import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { company, images } from "@/lib/cms-data";
import { pageTitles, renderSinglePage, type SearchParams } from "@/lib/page-renderers";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = pageTitles[slug] ?? "Home Style CMS";
  const description = "Luxury interior design, custom furniture, eCommerce, and CMS platform by Home Style Interior & Decore in Sialkot, Pakistan.";
  return {
    title: `${title} | ${company.name}`,
    description,
    alternates: { canonical: `${company.website}/${slug}` },
    openGraph: { title, description, url: `${company.website}/${slug}`, siteName: company.name, images: [images.hero] },
    twitter: { card: "summary_large_image", title, description, images: [images.hero] },
  };
}

export default async function SinglePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;
  return <SiteShell>{renderSinglePage(slug, query)}</SiteShell>;
}

import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { company } from "@/lib/cms-data";
import { renderSubCategory } from "@/lib/page-renderers";

type Props = { params: Promise<{ slug: string }> };

function label(slug: string) {
  return slug.split("-").map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`).join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${label(slug)} | ${company.name}`,
    description: `Premium ${label(slug)} for luxury interiors by Home Style Interior & Decore.`,
    alternates: { canonical: `${company.website}/sub-category/${slug}` },
  };
}

export default async function SubCategoryPage({ params }: Props) {
  const { slug } = await params;
  return <SiteShell>{renderSubCategory(slug)}</SiteShell>;
}

import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { categories, company } from "@/lib/cms-data";
import { renderCategory } from "@/lib/page-renderers";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((entry) => entry.slug === slug);
  return {
    title: `${category?.name ?? "Category"} | ${company.name}`,
    description: category?.description ?? "Luxury furniture category by Home Style Interior & Decore.",
    alternates: { canonical: `${company.website}/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  return <SiteShell>{renderCategory(slug)}</SiteShell>;
}

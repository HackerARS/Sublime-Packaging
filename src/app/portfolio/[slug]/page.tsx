import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { company, portfolio } from "@/lib/cms-data";
import { renderPortfolioDetail } from "@/lib/page-renderers";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.find((entry) => entry.slug === slug);
  return {
    title: `${project?.title ?? "Portfolio Project"} | ${company.name}`,
    description: project?.description ?? "Luxury interior design portfolio by Home Style Interior & Decore.",
    alternates: { canonical: `${company.website}/portfolio/${slug}` },
    openGraph: { title: project?.title, description: project?.description, images: [project?.image ?? ""] },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  return <SiteShell>{renderPortfolioDetail(slug)}</SiteShell>;
}

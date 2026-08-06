import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { adminModules, company } from "@/lib/cms-data";
import { renderAdmin } from "@/lib/page-renderers";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const module = adminModules.find((entry) => entry.slug === slug);
  return {
    title: `${module?.name ?? "Admin CMS"} | ${company.name}`,
    description: module?.description ?? "Premium CMS admin panel for Home Style Interior & Decore.",
    robots: { index: false, follow: false },
  };
}

export default async function AdminModulePage({ params }: Props) {
  const { slug } = await params;
  return <SiteShell>{renderAdmin(slug)}</SiteShell>;
}

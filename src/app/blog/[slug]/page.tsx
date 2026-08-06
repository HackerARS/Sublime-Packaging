import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { blogPosts, company } from "@/lib/cms-data";
import { renderBlogDetail } from "@/lib/page-renderers";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  return {
    title: `${post?.title ?? "Blog"} | ${company.name}`,
    description: post?.excerpt ?? "Interior design blog by Home Style Interior & Decore.",
    alternates: { canonical: `${company.website}/blog/${slug}` },
    openGraph: { title: post?.title, description: post?.excerpt, images: [post?.image ?? ""] },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  return <SiteShell>{renderBlogDetail(slug)}</SiteShell>;
}

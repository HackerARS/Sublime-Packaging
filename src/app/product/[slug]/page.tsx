import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { company, products } from "@/lib/cms-data";
import { renderProduct } from "@/lib/page-renderers";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  return {
    title: `${product?.seo.title ?? "Product Details"} | ${company.name}`,
    description: product?.seo.description ?? "Luxury furniture product details by Home Style Interior & Decore.",
    alternates: { canonical: `${company.website}/product/${slug}` },
    openGraph: { title: product?.name ?? "Product", description: product?.seo.description, images: [product?.image ?? ""] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  return <SiteShell>{renderProduct(slug)}</SiteShell>;
}

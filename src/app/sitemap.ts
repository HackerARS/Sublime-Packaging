import type { MetadataRoute } from "next";
import { blogPosts, categories, company, portfolio, products } from "@/lib/cms-data";
import { pageTitles } from "@/lib/page-renderers";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = Object.keys(pageTitles).filter((route) => route !== "admin").map((route) => ({ url: `${company.website}/${route}`, lastModified: now, changeFrequency: "weekly" as const, priority: route === "shop" ? 0.9 : 0.7 }));
  return [
    { url: company.website, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...staticRoutes,
    ...categories.map((category) => ({ url: `${company.website}/category/${category.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((product) => ({ url: `${company.website}/product/${product.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 })),
    ...portfolio.map((project) => ({ url: `${company.website}/portfolio/${project.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...blogPosts.map((post) => ({ url: `${company.website}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}

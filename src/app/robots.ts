import type { MetadataRoute } from "next";
import { company } from "@/lib/cms-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/auth"] },
    ],
    sitemap: `${company.website}/sitemap.xml`,
    host: company.website,
  };
}

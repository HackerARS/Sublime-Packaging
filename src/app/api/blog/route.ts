import { blogPosts } from "@/lib/cms-data";
import { jsonOk } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  return jsonOk({ data: blogPosts, meta: { total: blogPosts.length, endpoint: "/api/blog" } });
}

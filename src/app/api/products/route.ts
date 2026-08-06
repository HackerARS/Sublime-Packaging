import { categories, collections, products } from "@/lib/cms-data";
import { jsonOk } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  return jsonOk({
    data: products,
    included: { categories, collections },
    meta: { total: products.length, endpoint: "/api/products", authentication: "Public read, Sanctum-style token ready for writes" },
  });
}

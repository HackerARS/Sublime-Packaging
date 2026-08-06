import { portfolio } from "@/lib/cms-data";
import { jsonOk } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  return jsonOk({ data: portfolio, meta: { total: portfolio.length, endpoint: "/api/portfolio" } });
}

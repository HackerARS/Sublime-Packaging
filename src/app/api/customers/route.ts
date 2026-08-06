import { db } from "@/db";
import { customers } from "@/db/schema";
import { isEmail, jsonError, jsonOk, requireText, sanitizeText } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = requireText(sanitizeText(form.get("name")), "Name");
    const email = requireText(sanitizeText(form.get("email")), "Email");
    const phone = sanitizeText(form.get("phone"));
    if (!isEmail(email)) return jsonError("A valid email is required", 422);
    const [customer] = await db.insert(customers).values({ name, email, phone }).returning({ id: customers.id });
    return jsonOk({ customerId: customer.id }, 201);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to create customer", 500);
  }
}

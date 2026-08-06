import { NextResponse } from "next/server";
import { db } from "@/db";
import { customers, users } from "@/db/schema";
import { hashPassword } from "@/lib/security";
import { isEmail, jsonError, jsonOk, requireText, sanitizeText } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = requireText(sanitizeText(form.get("name")), "Name");
    const email = requireText(sanitizeText(form.get("email")), "Email");
    const password = requireText(sanitizeText(form.get("password")), "Password", 8);
    if (!isEmail(email)) return jsonError("A valid email is required", 422);

    const [user] = await db.insert(users).values({ name, email, passwordHash: hashPassword(password) }).returning({ id: users.id });
    await db.insert(customers).values({ userId: user.id, name, email });

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (acceptsHtml) return NextResponse.redirect(new URL("/customer-dashboard", request.url), { status: 303 });
    return jsonOk({ userId: user.id, tokenType: "Bearer", token: "issued-by-secure-session-layer" }, 201);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to register", 500);
  }
}

import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { loginHistory, users } from "@/db/schema";
import { verifyPassword } from "@/lib/security";
import { isEmail, jsonError, jsonOk, requireText, sanitizeText } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const email = requireText(sanitizeText(form.get("email")), "Email");
    const password = requireText(sanitizeText(form.get("password")), "Password");
    if (!isEmail(email)) return jsonError("A valid email is required", 422);

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const success = Boolean(user && verifyPassword(password, user.passwordHash));
    await db.insert(loginHistory).values({ userId: user?.id, success, userAgent: request.headers.get("user-agent") ?? "unknown" });

    if (!success) return jsonError("Invalid login credentials", 401);

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (acceptsHtml) return NextResponse.redirect(new URL("/customer-dashboard", request.url), { status: 303 });
    return jsonOk({ userId: user.id, name: user.name, tokenType: "Bearer", token: "issued-by-secure-session-layer" });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to login", 500);
  }
}

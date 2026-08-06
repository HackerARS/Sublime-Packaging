import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletters } from "@/db/schema";
import { isEmail, jsonError, jsonOk, sanitizeText } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const email = sanitizeText(form.get("email"));
    const name = sanitizeText(form.get("name"));
    if (!isEmail(email)) return jsonError("A valid email is required", 422);

    await db
      .insert(newsletters)
      .values({ email, name })
      .onConflictDoUpdate({ target: newsletters.email, set: { name, isSubscribed: true } });

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (acceptsHtml) return NextResponse.redirect(new URL("/?newsletter=success", request.url), { status: 303 });
    return jsonOk({ subscribed: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to subscribe", 500);
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { activityLogs } from "@/db/schema";
import { isEmail, jsonError, jsonOk, requireText, sanitizeText } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const email = requireText(sanitizeText(form.get("email")), "Email");
    if (!isEmail(email)) return jsonError("A valid email is required", 422);

    await db.insert(activityLogs).values({ module: "auth", action: "forgot_password_requested", metadata: { email, queuedEmail: true } });

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (acceptsHtml) return NextResponse.redirect(new URL("/login?reset=requested", request.url), { status: 303 });
    return jsonOk({ resetQueued: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to request password reset", 500);
  }
}

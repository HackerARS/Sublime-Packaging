import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { contactWhatsappMessage, isEmail, jsonError, jsonOk, requireText, sanitizeText, whatsappUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const payload = {
      name: requireText(sanitizeText(form.get("name")), "Name"),
      email: requireText(sanitizeText(form.get("email")), "Email"),
      phone: sanitizeText(form.get("phone")),
      subject: requireText(sanitizeText(form.get("subject")), "Subject"),
      message: requireText(sanitizeText(form.get("message")), "Message", 8),
    };

    if (!isEmail(payload.email)) return jsonError("A valid email address is required", 422);

    const formatted = contactWhatsappMessage(payload);
    const [message] = await db
      .insert(contactMessages)
      .values({ ...payload, whatsappMessage: formatted })
      .returning({ id: contactMessages.id });

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (acceptsHtml) {
      return NextResponse.redirect(new URL("/contact?success=1", request.url), { status: 303 });
    }

    return jsonOk({
      messageId: message.id,
      emailQueued: true,
      whatsappMessage: formatted,
      whatsappUrl: whatsappUrl(formatted),
    }, 201);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to submit contact message", 500);
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { consultations } from "@/db/schema";
import { contactWhatsappMessage, isEmail, jsonError, jsonOk, requireText, sanitizeText, whatsappUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  return jsonOk({ modules: ["Residential", "Commercial", "Office", "Bedroom", "Kitchen", "Living Room", "Custom Furniture"], statuses: ["new", "scheduled", "assigned", "in_progress", "quoted", "approved", "completed"] });
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const payload = {
      name: requireText(sanitizeText(form.get("name")), "Name"),
      email: requireText(sanitizeText(form.get("email")), "Email"),
      phone: requireText(sanitizeText(form.get("phone")), "Phone"),
      city: sanitizeText(form.get("city")),
      serviceType: requireText(sanitizeText(form.get("serviceType")), "Service type"),
      roomType: sanitizeText(form.get("roomType")),
      budgetRange: sanitizeText(form.get("budgetRange")),
      preferredDate: sanitizeText(form.get("preferredDate")) || null,
      preferredTime: sanitizeText(form.get("preferredTime")),
      message: requireText(sanitizeText(form.get("message")), "Message", 8),
    };

    if (!isEmail(payload.email)) return jsonError("A valid email address is required", 422);

    const formatted = contactWhatsappMessage({ ...payload, subject: payload.serviceType, preferredDate: payload.preferredDate ?? "" });
    const [consultation] = await db
      .insert(consultations)
      .values({ ...payload, whatsappMessage: formatted })
      .returning({ id: consultations.id });

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (acceptsHtml) {
      return NextResponse.redirect(new URL("/consultation-booking?success=1", request.url), { status: 303 });
    }

    return jsonOk({ consultationId: consultation.id, emailQueued: true, whatsappUrl: whatsappUrl(formatted), whatsappMessage: formatted }, 201);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to book consultation", 500);
  }
}

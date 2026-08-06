export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function sanitizeText(value: FormDataEntryValue | null, fallback = "") {
  return String(value ?? fallback)
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function requireText(value: string, field: string, min = 2) {
  if (value.trim().length < min) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function whatsappUrl(message: string) {
  const number = "923303111222";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function contactWhatsappMessage(payload: Record<string, string>) {
  return [
    "New Home Style website enquiry",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject || payload.serviceType || "Consultation"}`,
    `Message: ${payload.message}`,
  ].join("\n");
}

export function jsonOk(data: Record<string, unknown>, status = 200) {
  return Response.json({ ok: true, ...data }, { status });
}

export function jsonError(message: string, status = 400) {
  return Response.json({ ok: false, message }, { status });
}

export function nowOrderNumber() {
  const date = new Date();
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `HS-${ymd}-${suffix}`;
}

export function readingTime(paragraphs: string[]) {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 180))} min read`;
}

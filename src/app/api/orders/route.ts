import { NextResponse } from "next/server";
import { db } from "@/db";
import { customers, orderItems, orders } from "@/db/schema";
import { products } from "@/lib/cms-data";
import { isEmail, jsonError, jsonOk, nowOrderNumber, requireText, sanitizeText } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = requireText(sanitizeText(form.get("name")), "Name");
    const email = requireText(sanitizeText(form.get("email")), "Email");
    const phone = requireText(sanitizeText(form.get("phone")), "Phone");
    const city = requireText(sanitizeText(form.get("city")), "City");
    const address = requireText(sanitizeText(form.get("address")), "Address", 8);
    const paymentMethod = sanitizeText(form.get("paymentMethod"), "Cash on Delivery");
    const notes = sanitizeText(form.get("notes"));
    if (!isEmail(email)) return jsonError("A valid email is required", 422);

    const cartProducts = products.slice(0, 3);
    const subtotal = cartProducts.reduce((sum, product, index) => sum + product.price * (index === 0 ? 1 : 2), 0);
    const tax = Math.round(subtotal * 0.16);
    const shipping = subtotal > 500000 ? 0 : 12000;
    const grandTotal = subtotal + tax + shipping;

    const [customer] = await db.insert(customers).values({ name, email, phone }).returning({ id: customers.id });
    const [order] = await db
      .insert(orders)
      .values({
        orderNumber: nowOrderNumber(),
        customerId: customer.id,
        paymentMethod,
        subtotal: String(subtotal),
        taxTotal: String(tax),
        shippingTotal: String(shipping),
        grandTotal: String(grandTotal),
        shippingAddress: { name, phone, email, city, address },
        billingAddress: { name, phone, email, city, address },
        notes,
      })
      .returning({ id: orders.id, orderNumber: orders.orderNumber });

    await db.insert(orderItems).values(
      cartProducts.map((product, index) => {
        const quantity = index === 0 ? 1 : 2;
        return {
          orderId: order.id,
          productId: null,
          productName: product.name,
          sku: product.sku,
          quantity,
          unitPrice: String(product.price),
          total: String(product.price * quantity),
        };
      })
    );

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (acceptsHtml) return NextResponse.redirect(new URL(`/track-order?order=${order.orderNumber}`, request.url), { status: 303 });
    return jsonOk({ orderId: order.id, orderNumber: order.orderNumber, grandTotal }, 201);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to place order", 500);
  }
}

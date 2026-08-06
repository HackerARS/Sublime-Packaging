"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/cms-data";
import { formatCurrency } from "@/lib/utils";

export function QuantityStepper({ initial = 1 }: { initial?: number }) {
  const [quantity, setQuantity] = useState(initial);
  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border border-[#3E3933]/15 bg-white shadow-sm dark:border-white/10 dark:bg-white/10">
      <button type="button" className="px-4 py-2 text-lg" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
      <span className="min-w-10 text-center font-semibold">{quantity}</span>
      <button type="button" className="px-4 py-2 text-lg" onClick={() => setQuantity(quantity + 1)}>+</button>
    </div>
  );
}

export function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [value, setValue] = useState(50);
  return (
    <div className="rounded-[2rem] border border-white/60 bg-white/60 p-3 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-white/10">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-[#3E3933]">
        <img src={after} alt="Finished luxury interior" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
          <img src={before} alt="Interior before redesign" className="h-full w-[calc(100vw-2rem)] max-w-none object-cover opacity-95 md:w-[900px]" />
        </div>
        <div className="absolute inset-y-0 w-1 bg-white shadow-2xl" style={{ left: `${value}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#3E3933] shadow-xl">↔</span>
        </div>
        <span className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">Before</span>
        <span className="absolute right-5 top-5 rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3E3933]">After</span>
      </div>
      <input
        aria-label="Before after comparison"
        type="range"
        min="15"
        max="85"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="mt-4 w-full accent-[#3E3933]"
      />
    </div>
  );
}

export function CartEstimator() {
  const cartItems = products.slice(0, 3);
  const [coupon, setCoupon] = useState("STYLE10");
  const subtotal = cartItems.reduce((sum, product, index) => sum + product.price * (index === 0 ? 1 : 2), 0);
  const discount = coupon.trim().toUpperCase() === "STYLE10" ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.16;
  const shipping = subtotal > 500000 ? 0 : 12000;
  const total = subtotal - discount + tax + shipping;

  return (
    <div className="rounded-[2rem] border border-[#3E3933]/10 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-white/10">
      <h3 className="text-2xl font-semibold">Order Summary</h3>
      <div className="mt-5 space-y-4">
        {cartItems.map((product, index) => (
          <div key={product.slug} className="flex gap-4 rounded-2xl bg-[#FAF8F5] p-3 dark:bg-black/20">
            <img src={product.image} alt={product.name} className="h-20 w-20 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm opacity-70">Qty {index === 0 ? 1 : 2} · {product.sku}</p>
              <p className="mt-1 text-sm font-bold">{formatCurrency(product.price)}</p>
            </div>
          </div>
        ))}
      </div>
      <label className="mt-5 block text-sm font-semibold">Coupon</label>
      <input value={coupon} onChange={(event) => setCoupon(event.target.value)} className="mt-2 w-full rounded-2xl border border-[#3E3933]/15 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#ECDDCC] dark:border-white/10 dark:bg-white/10" />
      <div className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
        <div className="flex justify-between text-emerald-700 dark:text-emerald-300"><span>Discount</span><strong>-{formatCurrency(discount)}</strong></div>
        <div className="flex justify-between"><span>Tax</span><strong>{formatCurrency(tax)}</strong></div>
        <div className="flex justify-between"><span>Shipping</span><strong>{shipping === 0 ? "Free" : formatCurrency(shipping)}</strong></div>
        <div className="flex justify-between border-t border-[#3E3933]/10 pt-3 text-lg"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
      </div>
    </div>
  );
}

export function CompareMatrix() {
  const selected = products.slice(0, 3);
  const rows = ["price", "rating", "materials", "dimensions", "inventory"] as const;
  const values = useMemo(
    () => ({
      price: (product: (typeof products)[number]) => formatCurrency(product.price),
      rating: (product: (typeof products)[number]) => `${product.rating}/5 from ${product.reviews} reviews`,
      materials: (product: (typeof products)[number]) => product.materials.slice(0, 2).join(", "),
      dimensions: (product: (typeof products)[number]) => `${product.dimensions.width} × ${product.dimensions.depth} × ${product.dimensions.height}`,
      inventory: (product: (typeof products)[number]) => `${product.inventory} available`,
    }),
    []
  );

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#3E3933]/10 bg-white shadow-xl dark:border-white/10 dark:bg-white/10">
      <div className="grid grid-cols-4 bg-[#3E3933] text-white">
        <div className="p-4 font-bold">Feature</div>
        {selected.map((product) => <div key={product.slug} className="p-4 font-bold">{product.name}</div>)}
      </div>
      {rows.map((row) => (
        <div key={row} className="grid grid-cols-4 border-t border-[#3E3933]/10 text-sm dark:border-white/10">
          <div className="p-4 font-semibold capitalize">{row}</div>
          {selected.map((product) => <div key={`${product.slug}-${row}`} className="p-4 opacity-80">{values[row](product)}</div>)}
        </div>
      ))}
    </div>
  );
}

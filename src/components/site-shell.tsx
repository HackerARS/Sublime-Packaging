import Link from "next/link";
import type { ReactNode } from "react";
import { categories, collections, company, products, services } from "@/lib/cms-data";
import { ThemeToggle } from "@/components/theme-toggle";
import { whatsappUrl } from "@/lib/utils";

const mainNav = [
  { label: "Shop", href: "/shop" },
  { label: "Interior Design", href: "/interior-design-services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="bg-[#3E3933] px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#ECDDCC]">
        {company.tagline} · {company.phone} · {company.hours[0]}
      </div>
      <header className="sticky top-0 z-50 border-b border-[#3E3933]/10 bg-[#FAF8F5]/85 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-[#171410]/85">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#3E3933] text-lg font-black text-[#ECDDCC] shadow-lg transition group-hover:-rotate-3 dark:bg-[#ECDDCC] dark:text-[#3E3933]">HS</span>
            <span>
              <span className="block text-base font-black leading-tight tracking-tight text-[#3E3933] dark:text-white">Home Style</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7b6c] dark:text-[#ECDDCC]">Interior & Decore</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <div className="group relative">
              <Link href="/shop" className="rounded-full px-4 py-3 text-sm font-bold text-[#3E3933] transition hover:bg-white dark:text-white dark:hover:bg-white/10">Shop</Link>
              <div className="pointer-events-none absolute left-1/2 top-full w-[860px] -translate-x-1/2 translate-y-3 rounded-[2rem] border border-white/60 bg-white/95 p-6 opacity-0 shadow-2xl backdrop-blur-xl transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10 dark:bg-[#211d18]/95">
                <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-6">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8a7b6c]">Featured categories</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`} className="rounded-2xl border border-[#3E3933]/10 p-3 transition hover:-translate-y-1 hover:bg-[#FAF8F5] dark:border-white/10 dark:hover:bg-white/10">
                          <span className="font-bold text-[#3E3933] dark:text-white">{category.name}</span>
                          <span className="mt-1 block text-xs opacity-70">{category.subcategories.slice(0, 3).join(" · ")}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8a7b6c]">Collections</p>
                    <div className="mt-4 space-y-3">
                      {collections.map((collection) => (
                        <Link key={collection.slug} href={`/shop?collection=${collection.slug}`} className="block rounded-2xl bg-[#FAF8F5] p-3 font-semibold transition hover:translate-x-1 dark:bg-white/10">{collection.name}</Link>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-3xl bg-[#3E3933] text-white">
                    <img src={products[0].image} alt={products[0].name} className="h-32 w-full object-cover opacity-80" />
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-widest text-[#ECDDCC]">Designer Pick</p>
                      <p className="mt-1 font-bold">{products[0].name}</p>
                      <Link href={`/product/${products[0].slug}`} className="mt-3 inline-flex text-sm font-bold text-[#ECDDCC]">View product →</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {mainNav.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-3 text-sm font-bold text-[#3E3933] transition hover:bg-white dark:text-white dark:hover:bg-white/10">{item.label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 xl:flex">
              <Link href="/wishlist" className="nav-icon">♡</Link>
              <Link href="/compare" className="nav-icon">⇄</Link>
              <Link href="/cart" className="nav-icon">🛒</Link>
            </div>
            <ThemeToggle />
            <Link href={whatsappUrl("Hello Home Style, I would like to book a luxury interior consultation.")} className="hidden rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl md:inline-flex">WhatsApp</Link>
          </div>
        </nav>
        <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
          {mainNav.map((item) => <Link key={item.href} href={item.href} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold dark:bg-white/10">{item.label}</Link>)}
          <Link href="/admin" className="shrink-0 rounded-full bg-[#3E3933] px-4 py-2 text-sm font-bold text-white">Admin</Link>
        </div>
      </header>
      {children}
      <Footer />
      <Link
        href={whatsappUrl("Hello Home Style, I found your website and want design assistance.")}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-2xl text-white shadow-2xl transition hover:-translate-y-1"
        aria-label="Chat on WhatsApp"
      >
        ☎
      </Link>
    </>
  );
}

function Footer() {
  const footerGroups = [
    { title: "Shop", links: ["Living Room", "Bedroom", "Dining", "Office", "Décor & Lighting", "Custom Furniture"] },
    { title: "Services", links: services.map((service) => service.title) },
    { title: "Company", links: ["About", "Portfolio", "Blog", "FAQ", "Privacy Policy", "Terms"] },
    { title: "Customer", links: ["Login", "Register", "Customer Dashboard", "Track Order", "Wishlist", "Compare"] },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#3E3933] text-white">
      <div className="absolute inset-0 opacity-15 luxury-grid" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ECDDCC]">{company.tagline}</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight md:text-6xl">Luxury interiors, custom furniture, and CMS-powered commerce for modern homes.</h2>
            <p className="mt-6 max-w-xl text-white/70">Visit our Sialkot showroom or book a guided consultation with our design team led by {company.managingDirector}.</p>
          </div>
          <form action="/api/newsletter" method="post" className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="text-2xl font-bold">Join the design letter</h3>
            <p className="mt-2 text-sm text-white/70">Receive curated room ideas, new collections, and private showroom events.</p>
            <input name="name" placeholder="Your name" className="mt-5 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/50" />
            <input name="email" type="email" required placeholder="Email address" className="mt-3 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/50" />
            <button className="mt-4 w-full rounded-2xl bg-[#ECDDCC] px-5 py-3 font-black text-[#3E3933] transition hover:-translate-y-0.5">Subscribe</button>
          </form>
        </div>
        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-black text-[#ECDDCC]">{group.title}</h4>
              <div className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <Link key={link} href={`/${link.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-")}`} className="block text-sm text-white/70 transition hover:text-white">{link}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 rounded-[2rem] border border-white/10 bg-black/10 p-6 md:grid-cols-3">
          <div><p className="text-xs uppercase tracking-widest text-[#ECDDCC]">Visit</p><p className="mt-2 text-sm text-white/75">{company.addressLines.join(" ")}</p></div>
          <div><p className="text-xs uppercase tracking-widest text-[#ECDDCC]">Contact</p><p className="mt-2 text-sm text-white/75">{company.phone} · {company.email}</p></div>
          <div><p className="text-xs uppercase tracking-widest text-[#ECDDCC]">Hours</p><p className="mt-2 text-sm text-white/75">{company.hours.join(" · ")}</p></div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 text-sm text-white/55 md:flex-row">
          <p>© 2026 {company.name}. All rights reserved.</p>
          <div className="flex gap-4"><Link href="/admin">Admin CMS</Link><Link href="/api/products">REST API</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}

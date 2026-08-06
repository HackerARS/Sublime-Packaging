import Link from "next/link";
import { notFound } from "next/navigation";
import { CartEstimator, CompareMatrix, QuantityStepper } from "@/components/commerce-widgets";
import { adminModules, blogPosts, categories, cmsHomeSections, collections, company, faqs, images, orderTrackingSteps, policies, portfolio, products, services, stats } from "@/lib/cms-data";
import { formatCurrency, readingTime, whatsappUrl } from "@/lib/utils";

export type SearchParams = Record<string, string | string[] | undefined>;

export const pageTitles: Record<string, string> = {
  shop: "Shop Luxury Furniture",
  "interior-design-services": "Interior Design Services",
  portfolio: "Portfolio",
  about: "About Home Style",
  blog: "Interior Design Blog",
  contact: "Contact",
  "consultation-booking": "Book Consultation",
  faq: "FAQ",
  "privacy-policy": "Privacy Policy",
  terms: "Terms & Conditions",
  wishlist: "Wishlist",
  compare: "Compare Products",
  cart: "Cart",
  checkout: "Checkout",
  "track-order": "Track Order",
  login: "Login",
  register: "Register",
  "forgot-password": "Forgot Password",
  "customer-dashboard": "Customer Dashboard",
  admin: "Admin CMS",
};

export function renderSinglePage(section: string, query: SearchParams = {}) {
  if (section === "shop") return renderShop(query);
  if (section === "interior-design-services") return renderServices();
  if (section === "portfolio") return renderPortfolio();
  if (section === "about") return renderAbout();
  if (section === "blog") return renderBlog();
  if (section === "contact") return renderContact(query);
  if (section === "consultation-booking") return renderConsultation(query);
  if (section === "faq") return renderFaq();
  if (section === "privacy-policy") return renderPolicy("Privacy Policy", policies.privacy);
  if (section === "terms") return renderPolicy("Terms & Conditions", policies.terms);
  if (section === "wishlist") return renderWishlist();
  if (section === "compare") return renderCompare();
  if (section === "cart") return renderCart();
  if (section === "checkout") return renderCheckout();
  if (section === "track-order") return renderTrackOrder(query);
  if (section === "login") return renderAuth("login");
  if (section === "register") return renderAuth("register");
  if (section === "forgot-password") return renderAuth("forgot-password");
  if (section === "customer-dashboard") return renderCustomerDashboard();
  if (section === "admin") return renderAdmin("dashboard");
  return renderUnknown(section);
}

export function Hero({ eyebrow, title, text, image = images.hero }: { eyebrow: string; title: string; text: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#3E3933] text-white">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#3E3933] via-[#3E3933]/80 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-[#ECDDCC]">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{text}</p>
      </div>
    </section>
  );
}

function renderShop(query: SearchParams) {
  const collectionSlug = typeof query.collection === "string" ? query.collection : undefined;
  const activeCollection = collections.find((collection) => collection.slug === collectionSlug);
  const shownProducts = activeCollection ? products.filter((product) => product.collection === activeCollection.name) : products;
  return (
    <>
      <Hero eyebrow="Luxury eCommerce" title="Shop furniture, décor, lighting, and custom pieces" text="Browse a complete catalog with SKUs, barcodes, inventory, variants, galleries, videos, PDFs, reviews, SEO, related products, wishlist, and compare workflows." image={activeCollection?.image ?? images.showroom} />
      <section className="section-wrap">
        <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
          <aside className="h-fit rounded-[2rem] border border-[#3E3933]/10 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-white/10">
            <h2 className="text-xl font-black">Filters</h2>
            <div className="mt-5 space-y-5">
              <FilterGroup title="Categories" items={categories.map((category) => category.name)} />
              <FilterGroup title="Collections" items={collections.map((collection) => collection.name)} />
              <FilterGroup title="Materials" items={["Bouclé", "Travertine", "Walnut", "Oak", "Brass", "Velvet"]} />
              <FilterGroup title="Availability" items={["Ready Stock", "Made to Order", "Custom Sizes"]} />
            </div>
          </aside>
          <div>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div><p className="font-bold uppercase tracking-widest text-[#8a7b6c]">{shownProducts.length} products</p><h2 className="text-4xl font-black tracking-tight text-[#3E3933] dark:text-white">{activeCollection?.name ?? "Complete Collection"}</h2></div>
              <div className="rounded-full border border-[#3E3933]/10 bg-white px-5 py-3 text-sm font-bold shadow-sm dark:border-white/10 dark:bg-white/10">Sort: Featured merchandising</div>
            </div>
            <ProductGrid productList={shownProducts} />
          </div>
        </div>
      </section>
    </>
  );
}

function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return <div><p className="font-black text-[#3E3933] dark:text-white">{title}</p><div className="mt-3 space-y-2">{items.map((item) => <label key={item} className="flex items-center gap-2 text-sm opacity-75"><input type="checkbox" className="accent-[#3E3933]" /> {item}</label>)}</div></div>;
}

function ProductGrid({ productList }: { productList: typeof products }) {
  return <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{productList.map((product) => <ProductCard key={product.slug} product={product} />)}</div>;
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <Link href={`/product/${product.slug}`} className="group rounded-[2rem] bg-white p-3 shadow-xl transition hover:-translate-y-2 dark:bg-white/10">
      <div className="relative overflow-hidden rounded-[1.5rem]"><img src={product.image} alt={product.name} className="h-72 w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute left-3 top-3 flex gap-2">{product.labels.slice(0, 2).map((label) => <span key={label} className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#3E3933]">{label}</span>)}</div></div>
      <div className="p-4"><p className="text-xs font-bold uppercase tracking-widest text-[#8a7b6c]">{product.category} · {product.sku}</p><h3 className="mt-2 text-xl font-black leading-tight">{product.name}</h3><p className="mt-2 text-sm opacity-65">{product.materials.slice(0, 2).join(" · ")}</p><div className="mt-4 flex items-center justify-between"><span className="text-lg font-black">{formatCurrency(product.price)}</span><span className="text-sm text-[#d4a64a]">★ {product.rating}</span></div></div>
    </Link>
  );
}

export function renderCategory(slug: string) {
  const category = categories.find((entry) => entry.slug === slug);
  if (!category) notFound();
  const categoryProducts = products.filter((product) => product.category === category.name);
  return <><Hero eyebrow="Category" title={category.name} text={category.description} image={category.image} /><section className="section-wrap"><div className="flex flex-wrap gap-3">{category.subcategories.map((sub) => <Link key={sub} href={`/sub-category/${sub.toLowerCase().replace(/\s+/g, "-")}`} className="rounded-full bg-white px-5 py-3 text-sm font-black shadow dark:bg-white/10">{sub}</Link>)}</div><ProductGrid productList={categoryProducts.length ? categoryProducts : products.slice(0, 4)} /></section></>;
}

export function renderSubCategory(slug: string) {
  const label = slug.split("-").map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`).join(" ");
  const subProducts = products.filter((product) => product.subcategory.toLowerCase().replace(/\s+/g, "-") === slug);
  return <><Hero eyebrow="Sub category" title={label} text={`Premium ${label.toLowerCase()} selected for luxury spaces, with inventory, SEO, media, wishlist, compare, and review workflows.`} image={subProducts[0]?.image ?? images.living} /><section className="section-wrap"><ProductGrid productList={subProducts.length ? subProducts : products.slice(0, 6)} /></section></>;
}

export function renderProduct(slug: string) {
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();
  const related = products.filter((entry) => entry.slug !== product.slug && entry.category === product.category).slice(0, 3);
  return (
    <section className="section-wrap">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="overflow-hidden rounded-[3rem] bg-white p-3 shadow-2xl dark:bg-white/10"><img src={product.image} alt={product.name} className="aspect-[4/3] w-full rounded-[2.4rem] object-cover" /></div>
          <div className="mt-4 grid grid-cols-3 gap-3">{product.gallery.map((image) => <img key={image} src={image} alt={`${product.name} gallery`} className="h-36 rounded-2xl object-cover shadow" />)}</div>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#8a7b6c]">{product.brand} · {product.sku}</p>
          <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.04em] text-[#3E3933] dark:text-white">{product.name}</h1>
          <p className="mt-4 text-lg leading-8 opacity-75">{product.description}</p>
          <div className="mt-6 flex flex-wrap items-end gap-4"><span className="text-4xl font-black">{formatCurrency(product.price)}</span>{product.compareAtPrice && <span className="text-xl font-bold opacity-40 line-through">{formatCurrency(product.compareAtPrice)}</span>}<span className="rounded-full bg-[#ECDDCC] px-3 py-1 text-sm font-black text-[#3E3933]">★ {product.rating} · {product.reviews} reviews</span></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2"><InfoBox label="Inventory" value={`${product.inventory} available`} /><InfoBox label="Barcode" value={product.barcode} /><InfoBox label="Dimensions" value={`${product.dimensions.width} × ${product.dimensions.depth} × ${product.dimensions.height}`} /><InfoBox label="Warranty" value={product.specifications.Warranty ?? "Standard product warranty"} /></div>
          <div className="mt-6"><p className="font-black">Colors</p><div className="mt-2 flex flex-wrap gap-2">{product.colors.map((color) => <span key={color} className="rounded-full border border-[#3E3933]/10 px-3 py-1 text-sm dark:border-white/10">{color}</span>)}</div></div>
          <div className="mt-6"><p className="font-black">Materials</p><div className="mt-2 flex flex-wrap gap-2">{product.materials.map((material) => <span key={material} className="rounded-full bg-white px-3 py-1 text-sm shadow dark:bg-white/10">{material}</span>)}</div></div>
          <div className="mt-8 flex flex-wrap items-center gap-3"><QuantityStepper /><Link href="/cart" className="btn-primary">Add to Cart</Link><Link href="/wishlist" className="btn-secondary">Wishlist</Link><Link href="/compare" className="btn-secondary">Compare</Link></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2"><Link href={product.pdf} className="rounded-2xl bg-white p-4 font-bold shadow dark:bg-white/10">Download Product PDF</Link><Link href={product.video} className="rounded-2xl bg-white p-4 font-bold shadow dark:bg-white/10">Watch Product Video</Link></div>
        </div>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        <DetailPanel title="Features" items={product.features} />
        <div className="rounded-[2rem] bg-white p-6 shadow-xl dark:bg-white/10"><h2 className="text-2xl font-black">Specifications</h2><dl className="mt-4 space-y-3">{Object.entries(product.specifications).map(([key, value]) => <div key={key} className="flex justify-between gap-4 border-b border-[#3E3933]/10 pb-2 text-sm dark:border-white/10"><dt className="font-bold">{key}</dt><dd className="text-right opacity-70">{value}</dd></div>)}</dl></div>
        <div className="rounded-[2rem] bg-white p-6 shadow-xl dark:bg-white/10"><h2 className="text-2xl font-black">Reviews & Questions</h2><p className="mt-3 opacity-70">{product.reviews} verified reviews, rating {product.rating}/5. Product Q&A supports customer questions, admin answers, moderation, and email notifications.</p><form className="mt-5 space-y-3"><input placeholder="Ask a product question" className="field" /><button className="btn-primary w-full">Submit Question</button></form></div>
      </div>
      <section className="mt-14"><h2 className="text-4xl font-black tracking-tight">Related Products</h2><ProductGrid productList={related.length ? related : products.slice(0, 3)} /></section>
    </section>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-[#3E3933]/10 bg-white p-4 shadow dark:border-white/10 dark:bg-white/10"><p className="text-xs font-black uppercase tracking-widest text-[#8a7b6c]">{label}</p><p className="mt-1 font-bold">{value}</p></div>; }
function DetailPanel({ title, items }: { title: string; items: string[] }) { return <div className="rounded-[2rem] bg-white p-6 shadow-xl dark:bg-white/10"><h2 className="text-2xl font-black">{title}</h2><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="flex gap-3"><span className="text-[#8a7b6c]">✦</span><span>{item}</span></li>)}</ul></div>; }

function renderServices() {
  return <><Hero eyebrow="Interior Design Module" title="Residential, commercial, office, and custom furniture services" text="Book appointments, capture requirements, assign designers, manage timelines, progress galleries, invoices, and private client notes." image={images.kitchen} /><section className="section-wrap"><div className="grid gap-6 md:grid-cols-2">{services.map((service) => <div key={service.slug} className="rounded-[2rem] bg-white p-8 shadow-xl dark:bg-white/10"><p className="text-sm font-black uppercase tracking-widest text-[#8a7b6c]">Service</p><h2 className="mt-2 text-3xl font-black">{service.title}</h2><p className="mt-4 leading-7 opacity-70">{service.description}</p><DetailPanel title="Included" items={service.inclusions} /><Link href="/consultation-booking" className="btn-primary mt-6">Book this service</Link></div>)}</div><ProcessTimeline /></section></>;
}

function ProcessTimeline() { const steps = ["Discovery", "Site Measurement", "Mood Board", "3D Design", "Quotation", "Production", "Installation", "Handover"]; return <div className="mt-12 rounded-[3rem] bg-[#3E3933] p-8 text-white shadow-2xl"><h2 className="text-4xl font-black">Project Timeline</h2><div className="mt-8 grid gap-3 md:grid-cols-4">{steps.map((step, index) => <div key={step} className="rounded-2xl border border-white/10 bg-white/10 p-4"><p className="text-[#ECDDCC]">Step {index + 1}</p><p className="font-black">{step}</p></div>)}</div></div>; }

function renderPortfolio() { return <><Hero eyebrow="Portfolio" title="Unlimited projects with gallery, video, before/after, budget, and location" text="Explore residential, commercial, office, bedroom, kitchen, living room, and custom furniture transformations." image={images.villa} /><section className="section-wrap"><div className="grid gap-6 md:grid-cols-2">{portfolio.map((project) => <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group overflow-hidden rounded-[2rem] bg-white shadow-xl dark:bg-white/10"><img src={project.image} alt={project.title} className="h-80 w-full object-cover transition duration-700 group-hover:scale-105" /><div className="p-7"><p className="text-xs font-black uppercase tracking-widest text-[#8a7b6c]">{project.category} · {project.completionDate} · {project.budget}</p><h2 className="mt-2 text-3xl font-black">{project.title}</h2><p className="mt-3 opacity-70">{project.description}</p></div></Link>)}</div></section></>; }

export function renderPortfolioDetail(slug: string) { const project = portfolio.find((entry) => entry.slug === slug); if (!project) notFound(); return <><Hero eyebrow={project.category} title={project.title} text={project.description} image={project.image} /><section className="section-wrap"><div className="grid gap-8 lg:grid-cols-[1fr_360px]"><div><img src={project.after} alt={`${project.title} after`} className="rounded-[3rem] shadow-2xl" /><div className="mt-5 grid grid-cols-2 gap-5"><img src={project.before} alt={`${project.title} before`} className="rounded-[2rem]" /><img src={project.image} alt={`${project.title} gallery`} className="rounded-[2rem]" /></div></div><aside className="h-fit rounded-[2rem] bg-white p-6 shadow-xl dark:bg-white/10"><InfoBox label="Location" value={project.location} /><div className="mt-4"><InfoBox label="Completion" value={project.completionDate} /></div><div className="mt-4"><InfoBox label="Budget" value={project.budget} /></div><DetailPanel title="Scope" items={project.scope} /><Link href="/consultation-booking" className="btn-primary mt-6 w-full justify-center">Start similar project</Link></aside></div></section></>; }

function renderAbout() { return <><Hero eyebrow="About" title="Home Style Interior & Decore, Sialkot" text={`Led by Managing Director ${company.managingDirector}, our studio combines furniture craftsmanship, interior design, and technology-backed project management.`} image={images.showroom} /><section className="section-wrap grid gap-10 lg:grid-cols-2"><div><h2 className="text-4xl font-black tracking-tight">A premium design house for complete spaces</h2><p className="mt-5 text-lg leading-8 opacity-75">We help clients move from inspiration to installed interiors with a single accountable team. The CMS supports catalog management, project tracking, customer dashboards, orders, invoices, media, SEO, settings, permissions, logs, and REST APIs.</p><div className="mt-8 grid grid-cols-2 gap-4">{stats.map((stat) => <InfoBox key={stat.label} label={stat.label} value={stat.value} />)}</div></div><div className="rounded-[3rem] bg-white p-3 shadow-2xl dark:bg-white/10"><img src={images.hero} alt="Home Style showroom" className="rounded-[2.4rem]" /></div></section></>; }

function renderBlog() { return <><Hero eyebrow="Blog" title="Design journal and buying guides" text="Unlimited posts, categories, tags, comments, featured images, SEO metadata, Open Graph, and schema-ready content." image={images.luxuryRoom} /><section className="section-wrap"><div className="grid gap-6 lg:grid-cols-3">{blogPosts.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="overflow-hidden rounded-[2rem] bg-white shadow-xl transition hover:-translate-y-2 dark:bg-white/10"><img src={post.image} alt={post.title} className="h-64 w-full object-cover" /><div className="p-6"><p className="text-xs font-black uppercase tracking-widest text-[#8a7b6c]">{post.category} · {readingTime(post.content)}</p><h2 className="mt-2 text-2xl font-black">{post.title}</h2><p className="mt-3 opacity-70">{post.excerpt}</p></div></Link>)}</div></section></>; }

export function renderBlogDetail(slug: string) { const post = blogPosts.find((entry) => entry.slug === slug); if (!post) notFound(); return <><Hero eyebrow={`${post.category} · ${readingTime(post.content)}`} title={post.title} text={post.excerpt} image={post.image} /><article className="section-wrap max-w-4xl"><div className="rounded-[2rem] bg-white p-8 shadow-xl dark:bg-white/10"><p className="font-bold text-[#8a7b6c]">Published {post.date} by Home Style Editorial Team</p>{post.content.map((paragraph) => <p key={paragraph} className="mt-6 text-lg leading-9 opacity-80">{paragraph}</p>)}<div className="mt-10 rounded-[2rem] bg-[#FAF8F5] p-6 dark:bg-black/20"><h2 className="text-2xl font-black">Comments</h2><p className="mt-2 opacity-70">Comments are moderated through the admin CMS before publication.</p><form className="mt-4 grid gap-3"><input className="field" placeholder="Name" /><input className="field" placeholder="Email" /><textarea className="field" placeholder="Comment" rows={4} /><button className="btn-primary">Submit Comment</button></form></div></div></article></>; }

function renderContact(query: SearchParams) {
  const success = query.success === "1";
  return <><Hero eyebrow="Contact" title="Visit the showroom or send an enquiry" text="Your message is saved in the database, converted to a WhatsApp-ready message, and queued for team follow-up." image={images.hero} /><section className="section-wrap grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div className="space-y-5"><InfoBox label="Phone" value={company.phone} /><InfoBox label="WhatsApp" value={company.whatsapp} /><InfoBox label="Email" value={company.email} /><InfoBox label="Address" value={company.addressLines.join(" ")} /><InfoBox label="Hours" value={company.hours.join(" · ")} /><iframe title="Home Style location map" src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`} className="h-80 w-full rounded-[2rem] border-0 shadow-xl" loading="lazy" /></div><ContactForm success={success} /></section><section className="section-wrap pt-0">{renderFaqContent()}</section></>;
}

function ContactForm({ success }: { success: boolean }) { return <form action="/api/contact" method="post" className="rounded-[3rem] border border-[#3E3933]/10 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-white/10">{success && <div className="mb-5 rounded-2xl bg-emerald-50 p-4 font-bold text-emerald-700 success-pulse">✓ Thank you. Your enquiry has been saved and our team will contact you shortly.</div>}<h2 className="text-4xl font-black tracking-tight">Animated Contact Form</h2><p className="mt-3 opacity-70">Strict validation, sanitization, database storage, email/WhatsApp formatting, and activity logging support.</p><div className="mt-6 grid gap-4 md:grid-cols-2"><input name="name" required className="field" placeholder="Full name" /><input name="phone" className="field" placeholder="Phone / WhatsApp" /><input name="email" type="email" required className="field" placeholder="Email" /><input name="subject" required className="field" placeholder="Subject" /></div><textarea name="message" required className="field mt-4" rows={6} placeholder="Tell us about your space" /><button className="btn-primary mt-5">Send Message</button></form>; }

function renderConsultation(query: SearchParams) { const success = query.success === "1"; return <><Hero eyebrow="Consultation Booking" title="Book a guided design appointment" text="Residential, commercial, office, bedroom, kitchen, living room, and custom furniture appointments are routed to the consultations module." image={images.kitchen} /><section className="section-wrap grid gap-8 lg:grid-cols-[1fr_0.8fr]"><form action="/api/consultations" method="post" className="rounded-[3rem] bg-white p-8 shadow-2xl dark:bg-white/10">{success && <div className="mb-5 rounded-2xl bg-emerald-50 p-4 font-bold text-emerald-700 success-pulse">✓ Consultation booked. A designer will confirm your appointment.</div>}<h2 className="text-4xl font-black">Consultation Form</h2><div className="mt-6 grid gap-4 md:grid-cols-2"><input name="name" required className="field" placeholder="Full name" /><input name="phone" required className="field" placeholder="Phone" /><input name="email" type="email" required className="field" placeholder="Email" /><input name="city" className="field" placeholder="City" /><select name="serviceType" required className="field"><option>Residential Interior Design</option><option>Commercial Interior Design</option><option>Office Design</option><option>Bedroom Styling</option><option>Kitchen Design</option><option>Living Room Design</option><option>Custom Furniture</option></select><select name="roomType" className="field"><option>Complete Home</option><option>Living Room</option><option>Bedroom</option><option>Kitchen</option><option>Office</option><option>Commercial Space</option></select><select name="budgetRange" className="field"><option>PKR 500k – 1M</option><option>PKR 1M – 3M</option><option>PKR 3M – 8M</option><option>PKR 8M+</option></select><input name="preferredDate" type="date" className="field" /><input name="preferredTime" className="field" placeholder="Preferred time" /></div><textarea name="message" required className="field mt-4" rows={5} placeholder="Project brief, measurements, preferred style, timeline" /><button className="btn-primary mt-5">Book Appointment</button></form><div className="space-y-5"><ProcessTimeline /><Link href={whatsappUrl("Hello Home Style, I want to book an appointment.")} className="btn-whatsapp w-full justify-center">Confirm on WhatsApp</Link></div></section></>; }

function renderFaq() { return <><Hero eyebrow="FAQ" title="Answers before you begin" text="Detailed FAQ supports rich snippets and is fully manageable through the admin panel." image={images.modernBlue} /><section className="section-wrap">{renderFaqContent()}</section></>; }
function renderFaqContent() { return <div className="grid gap-4">{faqs.map((faq) => <details key={faq.question} className="group rounded-[2rem] bg-white p-6 shadow-lg dark:bg-white/10"><summary className="cursor-pointer text-xl font-black text-[#3E3933] marker:text-[#8a7b6c] dark:text-white">{faq.question}</summary><p className="mt-4 leading-7 opacity-75">{faq.answer}</p></details>)}</div>; }

function renderPolicy(title: string, paragraphs: string[]) { return <><Hero eyebrow="Legal" title={title} text="Clear policies for customers, orders, custom furniture, privacy, returns, invoices, and service expectations." image={images.showroom} /><section className="section-wrap max-w-4xl"><div className="rounded-[2rem] bg-white p-8 shadow-xl dark:bg-white/10">{paragraphs.map((paragraph) => <p key={paragraph} className="mb-6 text-lg leading-9 opacity-80">{paragraph}</p>)}</div></section></>; }

function renderWishlist() { return <><Hero eyebrow="Wishlist" title="Saved luxury pieces" text="Customer dashboards store wishlist items, recently viewed products, and compare selections for quick checkout." image={images.living} /><section className="section-wrap"><ProductGrid productList={products.slice(0, 4)} /></section></>; }
function renderCompare() { return <><Hero eyebrow="Compare" title="Compare finishes, dimensions, prices, and availability" text="Comparison data is structured from normalized product, variant, specification, inventory, and review tables." image={images.chandelier} /><section className="section-wrap"><CompareMatrix /></section></>; }
function renderCart() { return <><Hero eyebrow="Cart" title="Shopping cart with coupon, taxes, and shipping" text="Cart workflows support coupons, inventory validation, taxes, shipping zones, COD, bank transfer, Stripe-ready payment, and invoices." image={images.hero} /><section className="section-wrap max-w-3xl"><CartEstimator /><div className="mt-6 text-right"><Link href="/checkout" className="btn-primary">Proceed to Checkout</Link></div></section></>; }
function renderCheckout() { return <><Hero eyebrow="Checkout" title="Secure checkout for furniture and design orders" text="Collect billing, shipping, payment method, order notes, taxes, shipping, and invoice details." image={images.showroom} /><section className="section-wrap grid gap-8 lg:grid-cols-[1fr_420px]"><form action="/api/orders" method="post" className="rounded-[3rem] bg-white p-8 shadow-2xl dark:bg-white/10"><h2 className="text-3xl font-black">Checkout Details</h2><div className="mt-6 grid gap-4 md:grid-cols-2"><input name="name" required className="field" placeholder="Full name" /><input name="phone" required className="field" placeholder="Phone" /><input name="email" required type="email" className="field" placeholder="Email" /><input name="city" required className="field" placeholder="City" /></div><input name="address" required className="field mt-4" placeholder="Complete delivery address" /><select name="paymentMethod" className="field mt-4"><option>Cash on Delivery</option><option>Bank Transfer</option><option>Stripe Card Payment</option></select><textarea name="notes" className="field mt-4" rows={4} placeholder="Delivery notes, floor, installation needs" /><button className="btn-primary mt-5">Place Order</button></form><CartEstimator /></section></>; }
function renderTrackOrder(query: SearchParams) { const tracking = typeof query.order === "string" ? query.order : "HS-20260218-A7K92Q"; return <><Hero eyebrow="Track Order" title="Track furniture, delivery, and installation" text="Order status, invoice, returns, refunds, shipments, and notifications are available in the customer dashboard." image={images.mediaWall} /><section className="section-wrap"><div className="rounded-[3rem] bg-white p-8 shadow-2xl dark:bg-white/10"><form className="flex flex-col gap-3 md:flex-row"><input className="field flex-1" defaultValue={tracking} name="order" /><button className="btn-primary">Track</button></form><div className="mt-8 grid gap-4 md:grid-cols-6">{orderTrackingSteps.map((step, index) => <div key={step} className={`rounded-2xl p-4 ${index < 4 ? "bg-[#3E3933] text-white" : "bg-[#F7F1EA] dark:bg-white/10"}`}><p className="text-sm opacity-70">Step {index + 1}</p><p className="font-black">{step}</p></div>)}</div></div></section></>; }

function renderAuth(kind: "login" | "register" | "forgot-password") { const config = { login: ["Login", "/api/auth/login", "Access your orders, wishlist, consultations, addresses, downloads, reviews, and notifications."], register: ["Register", "/api/auth/register", "Create a customer account for orders, appointments, wishlists, reviews, and dashboard access."], "forgot-password": ["Forgot Password", "/api/auth/forgot-password", "Request a secure reset workflow notification for your account."] }[kind]; return <><Hero eyebrow="Customer Account" title={config[0]} text={config[2]} image={images.hero} /><section className="section-wrap max-w-xl"><form action={config[1]} method="post" className="rounded-[3rem] bg-white p-8 shadow-2xl dark:bg-white/10"><h2 className="text-3xl font-black">{config[0]}</h2>{kind !== "forgot-password" && <input name="name" className={`field mt-5 ${kind === "login" ? "hidden" : ""}`} placeholder="Full name" />}<input name="email" type="email" required className="field mt-4" placeholder="Email address" />{kind !== "forgot-password" && <input name="password" type="password" required className="field mt-4" placeholder="Password" />}<button className="btn-primary mt-5 w-full justify-center">Continue</button><div className="mt-5 flex justify-between text-sm font-bold"><Link href="/login">Login</Link><Link href="/register">Register</Link><Link href="/forgot-password">Forgot?</Link></div></form></section></>; }

function renderCustomerDashboard() { const cards = ["Profile", "Orders", "Wishlist", "Addresses", "Reviews", "Notifications", "Downloads"]; return <><Hero eyebrow="Customer Dashboard" title="Your design and order command center" text="Customers can manage profiles, orders, wishlist, addresses, reviews, notifications, downloads, and consultation progress." image={images.living} /><section className="section-wrap"><div className="grid gap-5 md:grid-cols-3">{cards.map((card, index) => <div key={card} className="rounded-[2rem] bg-white p-6 shadow-xl dark:bg-white/10"><p className="text-4xl font-black text-[#ECDDCC]">0{index + 1}</p><h2 className="mt-3 text-2xl font-black">{card}</h2><p className="mt-2 opacity-70">Manage {card.toLowerCase()} records with secure account workflows and notification history.</p></div>)}</div></section></>; }

export function renderAdmin(activeSlug: string) {
  const active = adminModules.find((module) => module.slug === activeSlug) ?? adminModules[0];
  return (
    <main className="min-h-screen bg-[#F7F1EA] dark:bg-[#171410]">
      <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-8 lg:grid-cols-[300px_1fr] lg:px-8">
        <aside className="h-fit rounded-[2rem] border border-[#3E3933]/10 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-white/10 lg:sticky lg:top-28">
          <div className="rounded-[1.5rem] bg-[#3E3933] p-5 text-white"><p className="text-xs uppercase tracking-widest text-[#ECDDCC]">Premium Admin</p><h1 className="mt-2 text-2xl font-black">Home Style CMS</h1><p className="mt-2 text-sm text-white/65">Shopify, Nova, Filament, WordPress, and Notion inspired.</p></div>
          <nav className="mt-4 max-h-[70vh] space-y-1 overflow-auto pr-1">
            {adminModules.map((module) => <Link key={module.slug} href={`/admin/${module.slug}`} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition ${module.slug === active.slug ? "bg-[#3E3933] text-white" : "hover:bg-[#FAF8F5] dark:hover:bg-white/10"}`}><span>{module.name}</span><span className="text-xs opacity-60">{module.metric}</span></Link>)}
          </nav>
        </aside>
        <section>
          <div className="rounded-[3rem] bg-[#3E3933] p-8 text-white shadow-2xl"><p className="text-sm font-black uppercase tracking-[0.25em] text-[#ECDDCC]">{active.name}</p><h2 className="mt-2 text-5xl font-black tracking-[-0.04em]">{active.metric}</h2><p className="mt-4 max-w-3xl text-white/70">{active.description}</p><div className="mt-6 flex flex-wrap gap-3"><button className="admin-button">Create</button><button className="admin-button">Import</button><button className="admin-button">Export</button><button className="admin-button">Activity</button></div></div>
          <AdminDashboard activeSlug={active.slug} />
        </section>
      </div>
    </main>
  );
}

function AdminDashboard({ activeSlug }: { activeSlug: string }) {
  if (activeSlug === "pages") return <PageBuilder />;
  if (activeSlug === "media-library") return <MediaManager />;
  if (activeSlug === "products") return <AdminProducts />;
  if (activeSlug === "dashboard") return <AdminOverview />;
  return <GenericAdminModule slug={activeSlug} />;
}

function AdminOverview() { const widgets = ["Revenue", "Orders", "Consultations", "Stock Alerts", "SEO Score", "Project Pipeline", "Newsletter", "Activity Logs"]; return <div className="mt-6 grid gap-5 md:grid-cols-4">{widgets.map((widget, index) => <div key={widget} className="rounded-[2rem] bg-white p-6 shadow-xl dark:bg-white/10"><p className="text-sm font-black uppercase tracking-widest text-[#8a7b6c]">{widget}</p><p className="mt-3 text-3xl font-black">{index % 2 === 0 ? stats[index % stats.length].value : adminModules[index].metric}</p><p className="mt-2 text-sm opacity-65">Live analytics card with chart-ready data and date range controls.</p></div>)}</div>; }

function PageBuilder() { return <div className="mt-6 rounded-[3rem] bg-white p-6 shadow-xl dark:bg-white/10"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h2 className="text-3xl font-black">Homepage Section Builder</h2><p className="mt-2 opacity-70">Hide, show, drag, drop, duplicate, delete, sort, schedule, and edit every homepage block.</p></div><button className="btn-primary">Save Layout</button></div><div className="mt-6 grid gap-3">{cmsHomeSections.map((section, index) => <div key={section} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#3E3933]/10 bg-[#FAF8F5] p-4 dark:border-white/10 dark:bg-black/20"><div className="flex items-center gap-4"><span className="cursor-grab rounded-xl bg-white px-3 py-2 shadow dark:bg-white/10">⋮⋮</span><div><p className="font-black">{section}</p><p className="text-sm opacity-60">Sort #{index + 1} · visible · editable JSON content</p></div></div><div className="flex gap-2"><button className="mini-button">Hide</button><button className="mini-button">Duplicate</button><button className="mini-button">Edit</button><button className="mini-button danger">Delete</button></div></div>)}</div></div>; }

function MediaManager() { const folderNames = ["Hero", "Products", "Portfolio", "Blogs", "Banners", "Documents"]; return <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]"><aside className="rounded-[2rem] bg-white p-5 shadow-xl dark:bg-white/10"><h2 className="text-2xl font-black">Folders</h2><div className="mt-4 space-y-2">{folderNames.map((folder) => <button key={folder} className="w-full rounded-2xl bg-[#FAF8F5] px-4 py-3 text-left font-bold dark:bg-white/10">📁 {folder}</button>)}</div></aside><div className="rounded-[2rem] bg-white p-5 shadow-xl dark:bg-white/10"><div className="rounded-[2rem] border-2 border-dashed border-[#3E3933]/20 p-8 text-center"><p className="text-3xl">☁</p><h3 className="mt-2 text-2xl font-black">Drag & Drop Multiple Upload</h3><p className="mt-2 opacity-70">Search, rename, crop metadata, compress, convert to WebP, and organize assets in folders.</p></div><div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{[images.hero, images.living, images.showroom, images.kitchen, images.villa, images.mediaWall, images.chandelier, images.modernBlue].map((image) => <div key={image} className="rounded-2xl bg-[#FAF8F5] p-2 dark:bg-black/20"><img src={image} alt="Media asset" className="aspect-square rounded-xl object-cover" /><p className="mt-2 truncate text-xs font-bold">{image.split("/").slice(-1)[0]}</p></div>)}</div></div></div>; }

function AdminProducts() { return <div className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-xl dark:bg-white/10"><div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.6fr] bg-[#3E3933] p-4 text-sm font-black uppercase tracking-widest text-white"><span>Product</span><span>SKU</span><span>Price</span><span>Stock</span></div>{products.map((product) => <div key={product.slug} className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.6fr] items-center border-t border-[#3E3933]/10 p-4 text-sm dark:border-white/10"><div className="flex items-center gap-3"><img src={product.image} alt={product.name} className="h-12 w-12 rounded-xl object-cover" /><div><p className="font-black">{product.name}</p><p className="opacity-60">{product.category} · {product.brand}</p></div></div><span>{product.sku}</span><span>{formatCurrency(product.price)}</span><span>{product.inventory}</span></div>)}</div>; }

function GenericAdminModule({ slug }: { slug: string }) { const module = adminModules.find((entry) => entry.slug === slug) ?? adminModules[0]; const records = ["Create workflow", "Bulk actions", "Advanced filters", "Saved views", "Validation rules", "Role permissions", "Audit log", "API endpoint"]; return <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{records.map((record, index) => <div key={record} className="rounded-[2rem] bg-white p-6 shadow-xl dark:bg-white/10"><p className="text-3xl font-black text-[#ECDDCC]">0{index + 1}</p><h3 className="mt-3 text-xl font-black">{record}</h3><p className="mt-2 text-sm leading-6 opacity-70">{module.name} supports {record.toLowerCase()} with repository-style services, form validation, policies, indexes, soft deletes, and activity logging.</p></div>)}</div>; }

function renderUnknown(section: string) { return <><Hero eyebrow="Navigation" title="Luxury CMS route" text={`The route “${section}” is not configured as a primary CMS page. Use the navigation below to continue.`} image={images.hero} /><section className="section-wrap"><div className="flex flex-wrap gap-3">{Object.entries(pageTitles).map(([slug, title]) => <Link key={slug} href={`/${slug}`} className="rounded-full bg-white px-5 py-3 font-bold shadow dark:bg-white/10">{title}</Link>)}</div></section></>; }

import Link from "next/link";
import { BeforeAfterSlider } from "@/components/commerce-widgets";
import { SiteShell } from "@/components/site-shell";
import { blogPosts, brands, categories, cmsHomeSections, collections, company, images, portfolio, products, services, stats, testimonials, whyChooseUs } from "@/lib/cms-data";
import { formatCurrency, whatsappUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const bestSellers = products.filter((product) => product.labels.includes("Best Seller"));
  const newArrivals = products.filter((product) => product.labels.includes("New Arrival"));

  return (
    <SiteShell>
      <main>
        <section className="relative isolate overflow-hidden bg-[#FAF8F5] dark:bg-[#171410]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ECDDCC_0,transparent_32%),radial-gradient(circle_at_80%_0%,rgba(62,57,51,.18)_0,transparent_28%)]" />
          <div className="relative mx-auto grid min-h-[82vh] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div className="pt-10">
              <span className="inline-flex rounded-full border border-[#3E3933]/10 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#8a7b6c] shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-[#ECDDCC]">Luxury Interior Design & Furniture CMS</span>
              <h1 className="mt-6 text-5xl font-black leading-[0.94] tracking-[-0.06em] text-[#3E3933] dark:text-white md:text-7xl lg:text-8xl">Designing Your Dream Space.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#6f6256] dark:text-white/70">{company.name} blends custom furniture, premium materials, interior architecture, and an enterprise-ready CMS experience for homes, offices, and commercial spaces.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/consultation-booking" className="btn-primary">Book Consultation</Link>
                <Link href="/shop" className="btn-secondary">Shop Collection</Link>
                <Link href={whatsappUrl("Hello Home Style, I want to discuss my interior project.")} className="btn-whatsapp">WhatsApp Now</Link>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/70 bg-white/65 p-4 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                    <p className="text-2xl font-black text-[#3E3933] dark:text-white">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold text-[#8a7b6c] dark:text-white/55">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-8 -top-8 h-48 w-48 rounded-full bg-[#ECDDCC] blur-3xl" />
              <div className="relative overflow-hidden rounded-[3rem] border border-white/70 bg-white/50 p-3 shadow-[0_40px_120px_rgba(62,57,51,.25)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] md:aspect-[5/4]">
                  <img src={images.hero} alt="Luxury furniture showroom" className="h-full w-full object-cover animate-slow-zoom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 rounded-[2rem] border border-white/20 bg-white/15 p-5 text-white shadow-2xl backdrop-blur-xl">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ECDDCC]">Featured Collection</p>
                    <h2 className="mt-2 text-3xl font-black">Citi Luxe Collection</h2>
                    <p className="mt-2 max-w-md text-sm text-white/75">Soft neutrals, curved silhouettes, fluted timber, brass accents, and custom furniture for elevated Pakistani homes.</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 top-12 hidden rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#211d18]/80 md:block">
                <p className="text-xs font-black uppercase tracking-widest text-[#8a7b6c]">Managed by</p>
                <p className="mt-1 font-black text-[#3E3933] dark:text-white">{company.managingDirector}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap">
          <SectionHeading eyebrow="Shop by room" title="Featured Categories" text="Curated room categories with subcategories, stock control, SEO metadata, and CMS-managed visibility." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.slug} className="card-lift group overflow-hidden rounded-[2rem] bg-white shadow-xl dark:bg-white/10">
                <div className="aspect-[4/3] overflow-hidden"><img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /></div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-[#3E3933] dark:text-white">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 opacity-70">{category.description}</p>
                  <p className="mt-4 text-xs font-black uppercase tracking-widest text-[#8a7b6c]">{category.subcategories.slice(0, 4).join(" · ")}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#3E3933] py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <SectionHeading dark eyebrow="Featured collections" title="International styling, locally delivered" text="Collection landing pages connect banners, products, campaigns, analytics, and merchandising in the CMS." />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {collections.map((collection) => (
                <Link key={collection.slug} href={`/shop?collection=${collection.slug}`} className="group rounded-[2rem] border border-white/10 bg-white/10 p-4 backdrop-blur transition hover:-translate-y-2">
                  <img src={collection.image} alt={collection.name} className="h-72 w-full rounded-[1.5rem] object-cover opacity-90" />
                  <div className="p-3">
                    <h3 className="text-2xl font-black">{collection.name}</h3>
                    <p className="mt-2 text-sm text-white/70">{collection.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ProductRail title="Best Sellers" eyebrow="Customer favourites" products={bestSellers} />
        <ProductRail title="New Arrivals" eyebrow="Fresh in showroom" products={newArrivals} />

        <section className="section-wrap grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Bespoke furniture" title="Made-to-measure for your lifestyle" text="From wardrobes and media walls to sofas, beds, kitchens, and vanities, our workflow handles consultation, 3D approval, production, delivery, and invoices." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {products.filter((product) => product.labels.includes("Custom Furniture") || product.labels.includes("Made to Order")).map((product) => (
                <Link href={`/product/${product.slug}`} key={product.slug} className="rounded-[1.5rem] border border-[#3E3933]/10 bg-white p-5 shadow-lg transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10">
                  <p className="text-xs font-black uppercase tracking-widest text-[#8a7b6c]">{product.sku}</p>
                  <h3 className="mt-2 text-xl font-black">{product.name}</h3>
                  <p className="mt-2 text-sm opacity-70">{product.features.slice(0, 2).join(" · ")}</p>
                </Link>
              ))}
            </div>
          </div>
          <img src={images.mediaWall} alt="Custom media wall" className="rounded-[3rem] shadow-2xl" />
        </section>

        <section className="section-wrap">
          <SectionHeading eyebrow="Interior services" title="Design, execution, and procurement" text="Residential, commercial, office, room styling, and custom furniture workflows are tracked from appointment to handover." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.slug} href="/interior-design-services" className="rounded-[2rem] border border-[#3E3933]/10 bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-white/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ECDDCC] text-xl">✦</span>
                <h3 className="mt-5 text-xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 opacity-70">{service.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-wrap">
          <SectionHeading eyebrow="Portfolio preview" title="Designed and delivered in Sialkot" text="Each project includes category, budget, location, completion date, before/after media, video, and gallery management." />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {portfolio.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="card-lift overflow-hidden rounded-[2rem] bg-white shadow-xl dark:bg-white/10">
                <img src={project.image} alt={project.title} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-[#8a7b6c]">{project.category} · {project.budget}</p>
                  <h3 className="mt-2 text-xl font-black">{project.title}</h3>
                  <p className="mt-2 text-sm opacity-65">{project.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-wrap grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Transformation" title="Before / after project clarity" text="Clients can review progress galleries, timelines, notes, milestones, and invoices from consultation through final styling." />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[2rem] bg-white p-6 shadow-xl dark:bg-white/10">
                  <p className="text-4xl font-black text-[#3E3933] dark:text-white">{stat.value}</p>
                  <p className="mt-2 text-sm font-semibold opacity-70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <BeforeAfterSlider before={portfolio[0].before} after={portfolio[0].after} />
        </section>

        <section className="bg-[#F7F1EA] py-20 dark:bg-black/20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <SectionHeading eyebrow="Why choose us" title="Premium process, precise execution" text="Built for customers and administrators: sales, design, inventory, orders, projects, media, SEO, and settings work together." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {whyChooseUs.map((item, index) => (
                <div key={item} className="rounded-[2rem] bg-white p-6 shadow-lg dark:bg-white/10">
                  <span className="text-4xl font-black text-[#ECDDCC]">0{index + 1}</span>
                  <p className="mt-4 font-semibold leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap">
          <SectionHeading eyebrow="Client stories" title="Trusted by homeowners and businesses" text="Testimonials are managed by the CMS with ratings, featured status, publication controls, and homepage sorting." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="rounded-[2rem] border border-[#3E3933]/10 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-white/10">
                <div className="text-[#d4a64a]">{"★".repeat(testimonial.rating)}</div>
                <blockquote className="mt-4 text-lg font-semibold leading-8">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-6"><strong>{testimonial.name}</strong><span className="block text-sm opacity-60">{testimonial.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section-wrap">
          <div className="rounded-[3rem] bg-[#3E3933] p-8 text-white shadow-2xl lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ECDDCC]">CMS page builder</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight">Every homepage section is editable.</h2>
                <p className="mt-4 text-white/70">Hide, show, drag, drop, duplicate, delete, sort, schedule, and edit content from the admin panel.</p>
                <Link href="/admin/pages" className="mt-6 inline-flex rounded-full bg-[#ECDDCC] px-6 py-3 font-black text-[#3E3933]">Open Admin Builder</Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cmsHomeSections.map((section, index) => (
                  <div key={section} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs text-[#ECDDCC]">#{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-1 font-bold">{section}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap">
          <SectionHeading eyebrow="Brands & Instagram" title="A curated visual world" text="Brand logos and social feeds are CMS-managed to support campaigns, launches, and customer trust." />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {brands.map((brand) => <span key={brand} className="rounded-full border border-[#3E3933]/10 bg-white px-6 py-3 text-sm font-black shadow-sm dark:border-white/10 dark:bg-white/10">{brand}</span>)}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[images.hero, images.living, images.showroom, images.kitchen, images.modernBlue].map((image, index) => <img key={image} src={image} alt={`Instagram interior post ${index + 1}`} className="aspect-square rounded-[2rem] object-cover shadow-lg" />)}
          </div>
        </section>

        <section className="section-wrap">
          <SectionHeading eyebrow="Latest blogs" title="Expert interior advice" text="Blog posts include categories, tags, comments, featured images, SEO metadata, and schema controls." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card-lift overflow-hidden rounded-[2rem] bg-white shadow-xl dark:bg-white/10">
                <img src={post.image} alt={post.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-[#8a7b6c]">{post.category} · {post.date}</p>
                  <h3 className="mt-3 text-2xl font-black leading-tight">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 opacity-70">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

function ProductRail({ title, eyebrow, products: railProducts }: { title: string; eyebrow: string; products: typeof products }) {
  return (
    <section className="section-wrap">
      <SectionHeading eyebrow={eyebrow} title={title} text="Full product records include SKU, barcode, stock, gallery, PDFs, videos, reviews, related products, questions, SEO, and schema." />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {railProducts.map((product) => (
          <Link key={product.slug} href={`/product/${product.slug}`} className="group rounded-[2rem] bg-white p-3 shadow-xl transition hover:-translate-y-2 dark:bg-white/10">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img src={product.image} alt={product.name} className="h-64 w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute left-3 top-3 flex flex-wrap gap-2">{product.labels.slice(0, 2).map((label) => <span key={label} className="rounded-full bg-white/85 px-3 py-1 text-xs font-black text-[#3E3933]">{label}</span>)}</div>
            </div>
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#8a7b6c]">{product.brand}</p>
              <h3 className="mt-2 text-lg font-black leading-tight">{product.name}</h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-black text-[#3E3933] dark:text-white">{formatCurrency(product.price)}</span>
                <span className="text-sm text-[#d4a64a]">★ {product.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text, dark = false }: { eyebrow: string; title: string; text: string; dark?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-black uppercase tracking-[0.25em] ${dark ? "text-[#ECDDCC]" : "text-[#8a7b6c]"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-4xl font-black tracking-[-0.04em] md:text-6xl ${dark ? "text-white" : "text-[#3E3933] dark:text-white"}`}>{title}</h2>
      <p className={`mt-4 text-lg leading-8 ${dark ? "text-white/70" : "text-[#6f6256] dark:text-white/70"}`}>{text}</p>
    </div>
  );
}

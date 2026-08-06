import { db } from "@/db";
import { brands as brandRows, categories as categoryRows, cmsSections, collections as collectionRows, companySettings, faqs as faqRows, products as productRows, testimonials as testimonialRows } from "@/db/schema";
import { brands, categories, cmsHomeSections, collections, company, faqs, products, testimonials } from "@/lib/cms-data";
import { slugify } from "@/lib/utils";

export async function seedHomeStyleDatabase() {
  await db.insert(companySettings).values([
    { key: "company_name", value: company.name },
    { key: "tagline", value: company.tagline },
    { key: "managing_director", value: company.managingDirector },
    { key: "phone", value: company.phone },
    { key: "whatsapp", value: company.whatsapp },
    { key: "email", value: company.email },
    { key: "website", value: company.website },
    { key: "address", value: company.addressLines.join(" ") },
  ]).onConflictDoNothing();

  await db.insert(categoryRows).values(categories.map((category, index) => ({
    name: category.name,
    slug: category.slug,
    description: category.description,
    imageUrl: category.image,
    sortOrder: index + 1,
    isFeatured: true,
    metaTitle: `${category.name} Furniture | ${company.name}`,
    metaDescription: category.description,
  }))).onConflictDoNothing();

  await db.insert(brandRows).values(brands.map((brand) => ({
    name: brand,
    slug: slugify(brand),
    description: `${brand} curated by ${company.name}`,
  }))).onConflictDoNothing();

  await db.insert(collectionRows).values(collections.map((collection) => ({
    name: collection.name,
    slug: collection.slug,
    description: collection.description,
    heroImageUrl: collection.image,
    isFeatured: true,
  }))).onConflictDoNothing();

  await db.insert(cmsSections).values(cmsHomeSections.map((section, index) => ({
    page: "home",
    sectionKey: slugify(section),
    title: section,
    sortOrder: index + 1,
    isVisible: true,
    content: { editable: true, duplicate: true, delete: true, dragDrop: true },
  }))).onConflictDoNothing();

  await db.insert(faqRows).values(faqs.map((faq, index) => ({
    question: faq.question,
    answer: faq.answer,
    category: "General",
    sortOrder: index + 1,
  }))).onConflictDoNothing();

  await db.insert(testimonialRows).values(testimonials.map((testimonial) => ({
    name: testimonial.name,
    role: testimonial.role,
    quote: testimonial.quote,
    rating: testimonial.rating,
    isFeatured: true,
  }))).onConflictDoNothing();

  await db.insert(productRows).values(products.map((product) => ({
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    barcode: product.barcode,
    shortDescription: product.description.slice(0, 220),
    description: product.description,
    price: String(product.price),
    compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : null,
    inventoryQuantity: product.inventory,
    colors: product.colors,
    materials: product.materials,
    dimensions: product.dimensions,
    warranty: product.specifications.Warranty ?? "Standard warranty",
    isFeatured: product.labels.includes("Designer Pick") || product.labels.includes("Best Seller"),
    isNewArrival: product.labels.includes("New Arrival"),
    isBestSeller: product.labels.includes("Best Seller"),
    metaTitle: product.seo.title,
    metaDescription: product.seo.description,
    ogImageUrl: product.image,
    schemaJson: { sku: product.sku, brand: product.brand, category: product.category, aggregateRating: product.rating },
  }))).onConflictDoNothing();
}

if (require.main === module) {
  seedHomeStyleDatabase()
    .then(() => {
      console.log("Home Style database seeded successfully.");
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

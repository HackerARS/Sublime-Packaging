import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
};

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "unpaid",
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export const consultationStatusEnum = pgEnum("consultation_status", [
  "new",
  "scheduled",
  "assigned",
  "in_progress",
  "quoted",
  "approved",
  "completed",
  "cancelled",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "planning",
  "designing",
  "procurement",
  "execution",
  "handover",
  "completed",
]);

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    email: varchar("email", { length: 190 }).notNull(),
    phone: varchar("phone", { length: 60 }),
    passwordHash: text("password_hash").notNull(),
    avatarUrl: text("avatar_url"),
    isActive: boolean("is_active").default(true).notNull(),
    twoFactorEnabled: boolean("two_factor_enabled").default(false).notNull(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)]
);

export const roles = pgTable(
  "roles",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    description: text("description"),
    ...timestamps,
  },
  (table) => [uniqueIndex("roles_slug_unique").on(table.slug)]
);

export const permissions = pgTable(
  "permissions",
  {
    id: serial("id").primaryKey(),
    module: varchar("module", { length: 100 }).notNull(),
    action: varchar("action", { length: 80 }).notNull(),
    description: text("description"),
    ...timestamps,
  },
  (table) => [uniqueIndex("permissions_module_action_unique").on(table.module, table.action)]
);

export const userRoles = pgTable(
  "user_roles",
  {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    roleId: integer("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  },
  (table) => [uniqueIndex("user_roles_unique").on(table.userId, table.roleId)]
);

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: integer("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
    permissionId: integer("permission_id").notNull().references(() => permissions.id, { onDelete: "cascade" }),
  },
  (table) => [uniqueIndex("role_permissions_unique").on(table.roleId, table.permissionId)]
);

export const customers = pgTable(
  "customers",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
    name: varchar("name", { length: 160 }).notNull(),
    email: varchar("email", { length: 190 }).notNull(),
    phone: varchar("phone", { length: 60 }),
    lifetimeValue: numeric("lifetime_value", { precision: 12, scale: 2 }).default("0").notNull(),
    notes: text("notes"),
    ...timestamps,
  },
  (table) => [index("customers_email_idx").on(table.email)]
);

export const loginHistory = pgTable("login_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  ipAddress: varchar("ip_address", { length: 80 }),
  userAgent: text("user_agent"),
  success: boolean("success").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  module: varchar("module", { length: 100 }).notNull(),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entity_type", { length: 120 }),
  entityId: integer("entity_id"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  ipAddress: varchar("ip_address", { length: 80 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    parentId: integer("parent_id"),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull(),
    description: text("description"),
    imageUrl: text("image_url"),
    sortOrder: integer("sort_order").default(0).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    metaTitle: varchar("meta_title", { length: 190 }),
    metaDescription: text("meta_description"),
    ...timestamps,
  },
  (table) => [uniqueIndex("categories_slug_unique").on(table.slug), index("categories_parent_idx").on(table.parentId)]
);

export const brands = pgTable(
  "brands",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull(),
    logoUrl: text("logo_url"),
    websiteUrl: text("website_url"),
    description: text("description"),
    isActive: boolean("is_active").default(true).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("brands_slug_unique").on(table.slug)]
);

export const collections = pgTable(
  "collections",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull(),
    description: text("description"),
    heroImageUrl: text("hero_image_url"),
    isFeatured: boolean("is_featured").default(false).notNull(),
    startsAt: timestamp("starts_at", { withTimezone: true }),
    endsAt: timestamp("ends_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [uniqueIndex("collections_slug_unique").on(table.slug)]
);

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").references(() => categories.id, { onDelete: "set null" }),
    brandId: integer("brand_id").references(() => brands.id, { onDelete: "set null" }),
    collectionId: integer("collection_id").references(() => collections.id, { onDelete: "set null" }),
    name: varchar("name", { length: 220 }).notNull(),
    slug: varchar("slug", { length: 240 }).notNull(),
    sku: varchar("sku", { length: 80 }).notNull(),
    barcode: varchar("barcode", { length: 120 }),
    shortDescription: text("short_description"),
    description: text("description"),
    price: numeric("price", { precision: 12, scale: 2 }).notNull(),
    compareAtPrice: numeric("compare_at_price", { precision: 12, scale: 2 }),
    costPrice: numeric("cost_price", { precision: 12, scale: 2 }),
    inventoryQuantity: integer("inventory_quantity").default(0).notNull(),
    lowStockThreshold: integer("low_stock_threshold").default(5).notNull(),
    colors: jsonb("colors").$type<string[]>().default([]),
    materials: jsonb("materials").$type<string[]>().default([]),
    dimensions: jsonb("dimensions").$type<{ width: string; depth: string; height: string; weight?: string }>(),
    careInstructions: text("care_instructions"),
    warranty: varchar("warranty", { length: 120 }),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isNewArrival: boolean("is_new_arrival").default(false).notNull(),
    isBestSeller: boolean("is_best_seller").default(false).notNull(),
    status: varchar("status", { length: 40 }).default("published").notNull(),
    metaTitle: varchar("meta_title", { length: 190 }),
    metaDescription: text("meta_description"),
    ogImageUrl: text("og_image_url"),
    schemaJson: jsonb("schema_json").$type<Record<string, unknown>>().default({}),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("products_slug_unique").on(table.slug),
    uniqueIndex("products_sku_unique").on(table.sku),
    index("products_category_idx").on(table.categoryId),
    index("products_brand_idx").on(table.brandId),
    index("products_collection_idx").on(table.collectionId),
  ]
);

export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  sku: varchar("sku", { length: 100 }).notNull(),
  color: varchar("color", { length: 80 }),
  material: varchar("material", { length: 120 }),
  size: varchar("size", { length: 120 }),
  priceAdjustment: numeric("price_adjustment", { precision: 12, scale: 2 }).default("0").notNull(),
  inventoryQuantity: integer("inventory_quantity").default(0).notNull(),
  imageUrl: text("image_url"),
  ...timestamps,
});

export const productMedia = pgTable("product_media", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 40 }).notNull(),
  url: text("url").notNull(),
  altText: varchar("alt_text", { length: 220 }),
  sortOrder: integer("sort_order").default(0).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  ...timestamps,
});

export const productSpecifications = pgTable("product_specifications", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 140 }).notNull(),
  value: text("value").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const productReviews = pgTable("product_reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  customerId: integer("customer_id").references(() => customers.id, { onDelete: "set null" }),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 190 }).notNull(),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 180 }),
  body: text("body").notNull(),
  isApproved: boolean("is_approved").default(false).notNull(),
  ...timestamps,
});

export const productQuestions = pgTable("product_questions", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  customerId: integer("customer_id").references(() => customers.id, { onDelete: "set null" }),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 190 }).notNull(),
  question: text("question").notNull(),
  answer: text("answer"),
  answeredAt: timestamp("answered_at", { withTimezone: true }),
  ...timestamps,
});

export const relatedProducts = pgTable(
  "related_products",
  {
    productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    relatedProductId: integer("related_product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  },
  (table) => [uniqueIndex("related_products_unique").on(table.productId, table.relatedProductId)]
);

export const customerAddresses = pgTable("customer_addresses", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
  label: varchar("label", { length: 80 }).default("Home").notNull(),
  recipientName: varchar("recipient_name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull(),
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2"),
  city: varchar("city", { length: 100 }).notNull(),
  province: varchar("province", { length: 100 }),
  postalCode: varchar("postal_code", { length: 40 }),
  country: varchar("country", { length: 80 }).default("Pakistan").notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  ...timestamps,
});

export const wishlists = pgTable(
  "wishlists",
  {
    customerId: integer("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
    productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("wishlists_unique").on(table.customerId, table.productId)]
);

export const compareItems = pgTable(
  "compare_items",
  {
    customerId: integer("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
    productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("compare_items_unique").on(table.customerId, table.productId)]
);

export const recentlyViewed = pgTable("recently_viewed", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => customers.id, { onDelete: "cascade" }),
  sessionId: varchar("session_id", { length: 160 }),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  viewedAt: timestamp("viewed_at", { withTimezone: true }).defaultNow().notNull(),
});

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => customers.id, { onDelete: "set null" }),
  sessionId: varchar("session_id", { length: 160 }),
  couponCode: varchar("coupon_code", { length: 80 }),
  ...timestamps,
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id").notNull().references(() => carts.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  variantId: integer("variant_id").references(() => productVariants.id, { onDelete: "set null" }),
  quantity: integer("quantity").default(1).notNull(),
  unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
});

export const coupons = pgTable(
  "coupons",
  {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 80 }).notNull(),
    description: text("description"),
    type: varchar("type", { length: 40 }).notNull(),
    value: numeric("value", { precision: 12, scale: 2 }).notNull(),
    minOrderAmount: numeric("min_order_amount", { precision: 12, scale: 2 }),
    usageLimit: integer("usage_limit"),
    usedCount: integer("used_count").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    startsAt: timestamp("starts_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [uniqueIndex("coupons_code_unique").on(table.code)]
);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderNumber: varchar("order_number", { length: 80 }).notNull(),
    customerId: integer("customer_id").references(() => customers.id, { onDelete: "set null" }),
    status: orderStatusEnum("status").default("pending").notNull(),
    paymentStatus: paymentStatusEnum("payment_status").default("unpaid").notNull(),
    paymentMethod: varchar("payment_method", { length: 80 }).default("Cash on Delivery").notNull(),
    subtotal: numeric("subtotal", { precision: 12, scale: 2 }).notNull(),
    discountTotal: numeric("discount_total", { precision: 12, scale: 2 }).default("0").notNull(),
    taxTotal: numeric("tax_total", { precision: 12, scale: 2 }).default("0").notNull(),
    shippingTotal: numeric("shipping_total", { precision: 12, scale: 2 }).default("0").notNull(),
    grandTotal: numeric("grand_total", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).default("PKR").notNull(),
    shippingAddress: jsonb("shipping_address").$type<Record<string, unknown>>().notNull(),
    billingAddress: jsonb("billing_address").$type<Record<string, unknown>>(),
    notes: text("notes"),
    trackingNumber: varchar("tracking_number", { length: 120 }),
    invoiceUrl: text("invoice_url"),
    ...timestamps,
  },
  (table) => [uniqueIndex("orders_number_unique").on(table.orderNumber), index("orders_customer_idx").on(table.customerId)]
);

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").references(() => products.id, { onDelete: "set null" }),
  productName: varchar("product_name", { length: 220 }).notNull(),
  sku: varchar("sku", { length: 100 }).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
  total: numeric("total", { precision: 12, scale: 2 }).notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  gateway: varchar("gateway", { length: 80 }).notNull(),
  transactionId: varchar("transaction_id", { length: 160 }),
  status: paymentStatusEnum("status").default("pending").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const shipments = pgTable("shipments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  carrier: varchar("carrier", { length: 120 }),
  trackingNumber: varchar("tracking_number", { length: 120 }),
  status: varchar("status", { length: 80 }).default("label_created").notNull(),
  shippedAt: timestamp("shipped_at", { withTimezone: true }),
  deliveredAt: timestamp("delivered_at", { withTimezone: true }),
  ...timestamps,
});

export const returns = pgTable("returns", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  reason: text("reason").notNull(),
  status: varchar("status", { length: 80 }).default("requested").notNull(),
  refundAmount: numeric("refund_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  ...timestamps,
});

export const taxRates = pgTable("tax_rates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  region: varchar("region", { length: 120 }).notNull(),
  percentage: numeric("percentage", { precision: 5, scale: 2 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});

export const shippingZones = pgTable("shipping_zones", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  cities: jsonb("cities").$type<string[]>().default([]),
  baseRate: numeric("base_rate", { precision: 12, scale: 2 }).notNull(),
  freeShippingThreshold: numeric("free_shipping_threshold", { precision: 12, scale: 2 }),
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => customers.id, { onDelete: "set null" }),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 190 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull(),
  city: varchar("city", { length: 120 }),
  serviceType: varchar("service_type", { length: 120 }).notNull(),
  roomType: varchar("room_type", { length: 120 }),
  budgetRange: varchar("budget_range", { length: 120 }),
  preferredDate: date("preferred_date"),
  preferredTime: varchar("preferred_time", { length: 80 }),
  message: text("message").notNull(),
  status: consultationStatusEnum("status").default("new").notNull(),
  assignedDesignerId: integer("assigned_designer_id").references(() => users.id, { onDelete: "set null" }),
  source: varchar("source", { length: 120 }).default("website").notNull(),
  whatsappMessage: text("whatsapp_message"),
  ...timestamps,
});

export const designProjects = pgTable("design_projects", {
  id: serial("id").primaryKey(),
  consultationId: integer("consultation_id").references(() => consultations.id, { onDelete: "set null" }),
  customerId: integer("customer_id").references(() => customers.id, { onDelete: "set null" }),
  designerId: integer("designer_id").references(() => users.id, { onDelete: "set null" }),
  title: varchar("title", { length: 220 }).notNull(),
  slug: varchar("slug", { length: 240 }).notNull(),
  category: varchar("category", { length: 120 }).notNull(),
  location: varchar("location", { length: 180 }),
  budget: numeric("budget", { precision: 14, scale: 2 }),
  status: projectStatusEnum("status").default("planning").notNull(),
  startDate: date("start_date"),
  dueDate: date("due_date"),
  completionDate: date("completion_date"),
  description: text("description"),
  ...timestamps,
}, (table) => [uniqueIndex("design_projects_slug_unique").on(table.slug)]);

export const projectTimeline = pgTable("project_timeline", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => designProjects.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 180 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 80 }).default("pending").notNull(),
  dueDate: date("due_date"),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const projectGallery = pgTable("project_gallery", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => designProjects.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  type: varchar("type", { length: 40 }).default("image").notNull(),
  caption: varchar("caption", { length: 220 }),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const clientNotes = pgTable("client_notes", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => designProjects.id, { onDelete: "cascade" }),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  note: text("note").notNull(),
  isPrivate: boolean("is_private").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => designProjects.id, { onDelete: "set null" }),
  orderId: integer("order_id").references(() => orders.id, { onDelete: "set null" }),
  invoiceNumber: varchar("invoice_number", { length: 80 }).notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  status: paymentStatusEnum("status").default("unpaid").notNull(),
  dueDate: date("due_date"),
  pdfUrl: text("pdf_url"),
  ...timestamps,
}, (table) => [uniqueIndex("invoices_number_unique").on(table.invoiceNumber)]);

export const portfolioProjects = pgTable(
  "portfolio_projects",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 220 }).notNull(),
    slug: varchar("slug", { length: 240 }).notNull(),
    category: varchar("category", { length: 120 }).notNull(),
    location: varchar("location", { length: 180 }).notNull(),
    budget: numeric("budget", { precision: 14, scale: 2 }),
    completionDate: date("completion_date"),
    coverImageUrl: text("cover_image_url").notNull(),
    beforeImageUrl: text("before_image_url"),
    afterImageUrl: text("after_image_url"),
    videoUrl: text("video_url"),
    description: text("description").notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    metaTitle: varchar("meta_title", { length: 190 }),
    metaDescription: text("meta_description"),
    ...timestamps,
  },
  (table) => [uniqueIndex("portfolio_slug_unique").on(table.slug), index("portfolio_category_idx").on(table.category)]
);

export const portfolioMedia = pgTable("portfolio_media", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").notNull().references(() => portfolioProjects.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  type: varchar("type", { length: 40 }).default("image").notNull(),
  caption: varchar("caption", { length: 220 }),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const blogCategories = pgTable(
  "blog_categories",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 140 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull(),
    description: text("description"),
    ...timestamps,
  },
  (table) => [uniqueIndex("blog_categories_slug_unique").on(table.slug)]
);

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").references(() => blogCategories.id, { onDelete: "set null" }),
    authorId: integer("author_id").references(() => users.id, { onDelete: "set null" }),
    title: varchar("title", { length: 220 }).notNull(),
    slug: varchar("slug", { length: 240 }).notNull(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    featuredImageUrl: text("featured_image_url").notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    metaTitle: varchar("meta_title", { length: 190 }),
    metaDescription: text("meta_description"),
    ogImageUrl: text("og_image_url"),
    ...timestamps,
  },
  (table) => [uniqueIndex("blog_posts_slug_unique").on(table.slug), index("blog_posts_category_idx").on(table.categoryId)]
);

export const blogTags = pgTable(
  "blog_tags",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("blog_tags_slug_unique").on(table.slug)]
);

export const blogPostTags = pgTable(
  "blog_post_tags",
  {
    postId: integer("post_id").notNull().references(() => blogPosts.id, { onDelete: "cascade" }),
    tagId: integer("tag_id").notNull().references(() => blogTags.id, { onDelete: "cascade" }),
  },
  (table) => [uniqueIndex("blog_post_tags_unique").on(table.postId, table.tagId)]
);

export const blogComments = pgTable("blog_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => blogPosts.id, { onDelete: "cascade" }),
  parentId: integer("parent_id"),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 190 }).notNull(),
  comment: text("comment").notNull(),
  isApproved: boolean("is_approved").default(false).notNull(),
  ...timestamps,
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  role: varchar("role", { length: 160 }),
  rating: integer("rating").default(5).notNull(),
  quote: text("quote").notNull(),
  imageUrl: text("image_url"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  ...timestamps,
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 120 }).default("General").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});

export const pages = pgTable(
  "pages",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 220 }).notNull(),
    slug: varchar("slug", { length: 240 }).notNull(),
    content: text("content").notNull(),
    template: varchar("template", { length: 120 }).default("default").notNull(),
    isPublished: boolean("is_published").default(true).notNull(),
    metaTitle: varchar("meta_title", { length: 190 }),
    metaDescription: text("meta_description"),
    ...timestamps,
  },
  (table) => [uniqueIndex("pages_slug_unique").on(table.slug)]
);

export const menus = pgTable("menus", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  location: varchar("location", { length: 80 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  menuId: integer("menu_id").notNull().references(() => menus.id, { onDelete: "cascade" }),
  parentId: integer("parent_id"),
  label: varchar("label", { length: 140 }).notNull(),
  url: text("url").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const mediaFolders = pgTable("media_folders", {
  id: serial("id").primaryKey(),
  parentId: integer("parent_id"),
  name: varchar("name", { length: 160 }).notNull(),
  path: text("path").notNull(),
  ...timestamps,
});

export const mediaAssets = pgTable("media_assets", {
  id: serial("id").primaryKey(),
  folderId: integer("folder_id").references(() => mediaFolders.id, { onDelete: "set null" }),
  filename: varchar("filename", { length: 240 }).notNull(),
  originalName: varchar("original_name", { length: 240 }).notNull(),
  mimeType: varchar("mime_type", { length: 120 }).notNull(),
  disk: varchar("disk", { length: 80 }).default("public").notNull(),
  url: text("url").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  width: integer("width"),
  height: integer("height"),
  altText: varchar("alt_text", { length: 220 }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  ...timestamps,
});

export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  subtitle: text("subtitle"),
  imageUrl: text("image_url").notNull(),
  ctaLabel: varchar("cta_label", { length: 100 }),
  ctaUrl: text("cta_url"),
  placement: varchar("placement", { length: 100 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});

export const sliders = pgTable("sliders", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  subtitle: text("subtitle"),
  imageUrl: text("image_url").notNull(),
  ctaLabel: varchar("cta_label", { length: 100 }),
  ctaUrl: text("cta_url"),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 190 }).notNull(),
  name: varchar("name", { length: 160 }),
  source: varchar("source", { length: 120 }).default("website").notNull(),
  isSubscribed: boolean("is_subscribed").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("newsletters_email_unique").on(table.email)]);

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 190 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  subject: varchar("subject", { length: 180 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 80 }).default("new").notNull(),
  whatsappMessage: text("whatsapp_message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const cmsSections = pgTable("cms_sections", {
  id: serial("id").primaryKey(),
  page: varchar("page", { length: 120 }).notNull(),
  sectionKey: varchar("section_key", { length: 120 }).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  content: jsonb("content").$type<Record<string, unknown>>().default({}),
  sortOrder: integer("sort_order").default(0).notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
  settings: jsonb("settings").$type<Record<string, unknown>>().default({}),
  ...timestamps,
}, (table) => [uniqueIndex("cms_sections_page_key_unique").on(table.page, table.sectionKey)]);

export const seoRecords = pgTable("seo_records", {
  id: serial("id").primaryKey(),
  entityType: varchar("entity_type", { length: 120 }).notNull(),
  entityId: integer("entity_id"),
  path: text("path").notNull(),
  metaTitle: varchar("meta_title", { length: 190 }).notNull(),
  metaDescription: text("meta_description").notNull(),
  canonicalUrl: text("canonical_url"),
  ogTitle: varchar("og_title", { length: 190 }),
  ogDescription: text("og_description"),
  ogImageUrl: text("og_image_url"),
  twitterCard: varchar("twitter_card", { length: 80 }).default("summary_large_image").notNull(),
  schemaJson: jsonb("schema_json").$type<Record<string, unknown>>().default({}),
  seoScore: integer("seo_score").default(90).notNull(),
  ...timestamps,
});

export const themeSettings = pgTable("theme_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 120 }).notNull(),
  value: jsonb("value").$type<Record<string, unknown>>().notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("theme_settings_key_unique").on(table.key)]);

export const companySettings = pgTable("company_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 120 }).notNull(),
  value: text("value").notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("company_settings_key_unique").on(table.key)]);

export const smtpSettings = pgTable("smtp_settings", {
  id: serial("id").primaryKey(),
  host: varchar("host", { length: 180 }).notNull(),
  port: integer("port").notNull(),
  username: varchar("username", { length: 180 }),
  encryption: varchar("encryption", { length: 40 }).default("tls").notNull(),
  fromEmail: varchar("from_email", { length: 190 }).notNull(),
  fromName: varchar("from_name", { length: 160 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});

export const paymentGateways = pgTable("payment_gateways", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  provider: varchar("provider", { length: 120 }).notNull(),
  isEnabled: boolean("is_enabled").default(false).notNull(),
  mode: varchar("mode", { length: 40 }).default("test").notNull(),
  credentials: jsonb("credentials").$type<Record<string, unknown>>().default({}),
  sortOrder: integer("sort_order").default(0).notNull(),
  ...timestamps,
});

export const backups = pgTable("backups", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 240 }).notNull(),
  disk: varchar("disk", { length: 80 }).default("local").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  status: varchar("status", { length: 80 }).default("completed").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

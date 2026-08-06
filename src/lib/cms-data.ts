export type Category = {
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: string[];
};

export type Product = {
  name: string;
  slug: string;
  sku: string;
  barcode: string;
  category: string;
  subcategory: string;
  brand: string;
  collection: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  inventory: number;
  colors: string[];
  materials: string[];
  dimensions: { width: string; depth: string; height: string; weight: string };
  image: string;
  gallery: string[];
  video: string;
  pdf: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  seo: { title: string; description: string };
  labels: string[];
};

export type PortfolioProject = {
  title: string;
  slug: string;
  category: string;
  location: string;
  completionDate: string;
  budget: string;
  image: string;
  before: string;
  after: string;
  video: string;
  description: string;
  scope: string[];
};

export const company = {
  name: "Home Style Interior & Decore",
  tagline: "Designing Your Dream Space",
  managingDirector: "Rana Jamshaid",
  phone: "0330 3111222",
  whatsapp: "+92 330 3111222",
  email: "info@homestyle.com.pk",
  website: "https://www.homestyle.com.pk",
  addressLines: ["Block C, Near Main Fountain,", "Citi Housing Society,", "Sialkot, Pakistan"],
  hours: ["Monday – Saturday: 11:00 AM – 09:00 PM", "Sunday: By Appointment Only"],
  mapQuery: "Block C Near Main Fountain Citi Housing Society Sialkot Pakistan",
};

export const images = {
  hero: "https://images.pexels.com/photos/7535062/pexels-photo-7535062.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  showroom: "https://images.pexels.com/photos/6758238/pexels-photo-6758238.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  living: "https://images.pexels.com/photos/7195570/pexels-photo-7195570.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  villa: "https://images.pexels.com/photos/27604104/pexels-photo-27604104.png?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  modernBlue: "https://images.pexels.com/photos/7546557/pexels-photo-7546557.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  luxuryRoom: "https://images.pexels.com/photos/6580377/pexels-photo-6580377.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  chandelier: "https://images.pexels.com/photos/7546213/pexels-photo-7546213.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  brownSofa: "https://images.pexels.com/photos/8135491/pexels-photo-8135491.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  kitchen: "https://images.pexels.com/photos/7535029/pexels-photo-7535029.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  mediaWall: "https://images.pexels.com/photos/7546231/pexels-photo-7546231.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
};

export const categories: Category[] = [
  {
    name: "Living Room",
    slug: "living-room",
    description: "Signature sofas, accent chairs, coffee tables, consoles, media walls, and curated décor for refined everyday living.",
    image: images.living,
    subcategories: ["Sofas", "Sectionals", "Accent Chairs", "Coffee Tables", "TV Consoles", "Rugs"],
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    description: "Upholstered beds, side tables, wardrobes, dressers, linens, and layered lighting for calm private retreats.",
    image: images.showroom,
    subcategories: ["Beds", "Bedside Tables", "Wardrobes", "Dressers", "Mattresses", "Mirrors"],
  },
  {
    name: "Dining",
    slug: "dining",
    description: "Dining tables, chairs, buffets, bar stools, and statement lighting designed for memorable gatherings.",
    image: images.chandelier,
    subcategories: ["Dining Tables", "Dining Chairs", "Buffets", "Bar Units", "Serveware", "Lighting"],
  },
  {
    name: "Office",
    slug: "office",
    description: "Executive desks, ergonomic seating, shelving, meeting tables, and acoustic storage for productive workplaces.",
    image: images.villa,
    subcategories: ["Executive Desks", "Office Chairs", "Shelving", "Conference Tables", "Storage", "Lighting"],
  },
  {
    name: "Décor & Lighting",
    slug: "decor-lighting",
    description: "Sculptural lamps, mirrors, art, objects, cushions, textiles, planters, and finishing accessories.",
    image: images.modernBlue,
    subcategories: ["Chandeliers", "Table Lamps", "Wall Art", "Mirrors", "Vases", "Cushions"],
  },
  {
    name: "Custom Furniture",
    slug: "custom-furniture",
    description: "Made-to-measure sofas, beds, wardrobes, kitchens, wall panels, vanities, and fitted storage.",
    image: images.kitchen,
    subcategories: ["Custom Sofas", "Wardrobes", "Kitchens", "Wall Panels", "Vanities", "Built-ins"],
  },
];

export const brands = ["Home Style Atelier", "Maison Forma", "Urban Loom", "Nord Oak", "Citi Luxe", "Rana Signature"];

export const collections = [
  {
    name: "Citi Luxe Collection",
    slug: "citi-luxe-collection",
    description: "Soft neutrals, curved silhouettes, fluted timber, and brass accents for an elevated Sialkot residence.",
    image: images.hero,
  },
  {
    name: "Modern Majlis Edit",
    slug: "modern-majlis-edit",
    description: "Generous seating, durable performance fabrics, and polished marble tables for refined family hosting.",
    image: images.brownSofa,
  },
  {
    name: "Quiet Luxury Bedroom",
    slug: "quiet-luxury-bedroom",
    description: "Layered textures, upholstered headboards, warm lighting, and seamless wardrobes for restorative spaces.",
    image: images.showroom,
  },
];

export const products: Product[] = [
  {
    name: "Milano Cloud Modular Sofa",
    slug: "milano-cloud-modular-sofa",
    sku: "HS-LR-SF-1001",
    barcode: "8964001001001",
    category: "Living Room",
    subcategory: "Sectionals",
    brand: "Home Style Atelier",
    collection: "Citi Luxe Collection",
    price: 485000,
    compareAtPrice: 545000,
    rating: 4.9,
    reviews: 48,
    inventory: 14,
    colors: ["Warm Ivory", "Greige", "Stone Taupe", "Charcoal"],
    materials: ["Kiln-dried wood", "High-resilience foam", "Performance bouclé", "Brushed steel legs"],
    dimensions: { width: "132 in", depth: "42 in", height: "31 in", weight: "118 kg" },
    image: images.living,
    gallery: [images.living, images.brownSofa, images.luxuryRoom],
    video: "https://www.homestyle.com.pk/media/milano-cloud-walkthrough.mp4",
    pdf: "https://www.homestyle.com.pk/downloads/milano-cloud-specifications.pdf",
    description: "A sculptural modular sofa engineered for relaxed luxury, deep comfort, and flexible layouts. Designed for family lounges, formal drawing rooms, and high-end apartments.",
    features: ["Reconfigurable left, right, and chaise modules", "Stain-resistant performance fabric", "Removable covers for service cleaning", "10-year internal frame warranty"],
    specifications: { Frame: "Kiln-dried hardwood", Cushioning: "HR foam with fibre wrap", Upholstery: "Premium bouclé", Assembly: "White-glove delivery included" },
    seo: { title: "Milano Cloud Modular Sofa in Pakistan", description: "Luxury modular sofa with bouclé upholstery, deep seating, and white-glove delivery by Home Style Interior & Decore." },
    labels: ["Best Seller", "Custom Sizes"],
  },
  {
    name: "Valencia Travertine Coffee Table",
    slug: "valencia-travertine-coffee-table",
    sku: "HS-LR-TB-1014",
    barcode: "8964001001014",
    category: "Living Room",
    subcategory: "Coffee Tables",
    brand: "Maison Forma",
    collection: "Citi Luxe Collection",
    price: 175000,
    rating: 4.8,
    reviews: 31,
    inventory: 22,
    colors: ["Natural Travertine", "Walnut", "Black Ash"],
    materials: ["Travertine stone", "Engineered walnut veneer", "Sealed matte finish"],
    dimensions: { width: "54 in", depth: "32 in", height: "15 in", weight: "62 kg" },
    image: images.chandelier,
    gallery: [images.chandelier, images.mediaWall, images.hero],
    video: "https://www.homestyle.com.pk/media/valencia-table-detail.mp4",
    pdf: "https://www.homestyle.com.pk/downloads/valencia-travertine-care.pdf",
    description: "A low-profile architectural table pairing natural travertine texture with warm timber storage for elegant living rooms.",
    features: ["Honed sealed stone top", "Soft-close concealed drawer", "Rounded child-safe edges", "Includes travertine care guide"],
    specifications: { Stone: "Natural travertine", Base: "Walnut veneer", Finish: "Matte sealant", Care: "Use pH-neutral cleaner" },
    seo: { title: "Valencia Travertine Coffee Table", description: "Premium travertine coffee table with walnut storage for luxury interiors in Pakistan." },
    labels: ["New Arrival"],
  },
  {
    name: "Aurelia Upholstered King Bed",
    slug: "aurelia-upholstered-king-bed",
    sku: "HS-BD-BD-2010",
    barcode: "8964001002010",
    category: "Bedroom",
    subcategory: "Beds",
    brand: "Rana Signature",
    collection: "Quiet Luxury Bedroom",
    price: 325000,
    compareAtPrice: 365000,
    rating: 4.9,
    reviews: 64,
    inventory: 9,
    colors: ["Champagne Beige", "Mushroom", "Oyster Grey", "Midnight"],
    materials: ["Solid wood frame", "Velvet performance fabric", "Brass-finish plinth"],
    dimensions: { width: "84 in", depth: "88 in", height: "52 in", weight: "104 kg" },
    image: images.showroom,
    gallery: [images.showroom, images.luxuryRoom, images.villa],
    video: "https://www.homestyle.com.pk/media/aurelia-bed-assembly.mp4",
    pdf: "https://www.homestyle.com.pk/downloads/aurelia-bed-dimensions.pdf",
    description: "A hotel-inspired bed with a wraparound headboard, generous upholstery, and integrated mood-light compatible side channels.",
    features: ["Panelled wraparound headboard", "Optional hydraulic storage", "Custom fabric library available", "Designed for Pakistani king mattress sizing"],
    specifications: { Headboard: "52-inch channel-tufted", Storage: "Optional hydraulic", Fabric: "Performance velvet", Warranty: "7 years frame" },
    seo: { title: "Aurelia Upholstered King Bed", description: "Luxury upholstered king bed with custom fabric and optional storage by Home Style Sialkot." },
    labels: ["Best Seller", "Made to Order"],
  },
  {
    name: "Luna Fluted Wardrobe System",
    slug: "luna-fluted-wardrobe-system",
    sku: "HS-BD-WD-2032",
    barcode: "8964001002032",
    category: "Bedroom",
    subcategory: "Wardrobes",
    brand: "Home Style Atelier",
    collection: "Quiet Luxury Bedroom",
    price: 640000,
    rating: 4.7,
    reviews: 27,
    inventory: 6,
    colors: ["Smoked Oak", "Warm Walnut", "Ivory Lacquer"],
    materials: ["Moisture-resistant board", "Fluted veneer", "Soft-close hardware", "LED channels"],
    dimensions: { width: "144 in", depth: "24 in", height: "108 in", weight: "265 kg" },
    image: images.villa,
    gallery: [images.villa, images.showroom, images.kitchen],
    video: "https://www.homestyle.com.pk/media/luna-wardrobe-system.mp4",
    pdf: "https://www.homestyle.com.pk/downloads/luna-wardrobe-modules.pdf",
    description: "A fully customizable wardrobe system with fluted sliding doors, sensor lighting, modular internals, and premium hardware.",
    features: ["Free site measurement in Sialkot", "Hafele-compatible soft-close fittings", "Modular drawers, rails, shelves, and valet pullouts", "Factory-finished panels"],
    specifications: { Carcass: "18mm MR board", Hardware: "Soft-close premium channels", Lighting: "Warm LED sensor strips", Installation: "Professional team included" },
    seo: { title: "Custom Fluted Wardrobe System", description: "Luxury made-to-measure wardrobe with fluted panels and LED lighting by Home Style Interior & Decore." },
    labels: ["Custom Furniture"],
  },
  {
    name: "Como Six-Seater Dining Set",
    slug: "como-six-seater-dining-set",
    sku: "HS-DN-DS-3006",
    barcode: "8964001003006",
    category: "Dining",
    subcategory: "Dining Tables",
    brand: "Nord Oak",
    collection: "Modern Majlis Edit",
    price: 395000,
    rating: 4.8,
    reviews: 36,
    inventory: 11,
    colors: ["Walnut", "Black Oak", "Natural Oak"],
    materials: ["Oak veneer", "Solid beech legs", "Linen-blend chairs", "Metal stretcher"],
    dimensions: { width: "84 in", depth: "40 in", height: "30 in", weight: "142 kg" },
    image: images.chandelier,
    gallery: [images.chandelier, images.hero, images.modernBlue],
    video: "https://www.homestyle.com.pk/media/como-dining-set.mp4",
    pdf: "https://www.homestyle.com.pk/downloads/como-dining-care.pdf",
    description: "A balanced dining composition with bevelled table edges, upholstered chairs, and a refined silhouette suitable for everyday meals and formal hosting.",
    features: ["Includes six upholstered dining chairs", "Heat-resistant matte protective topcoat", "Optional extension leaf", "Available as 8-seater on order"],
    specifications: { Seating: "6 persons", Tabletop: "Oak veneer", ChairFabric: "Linen blend", Finish: "Matte polyurethane" },
    seo: { title: "Como Six-Seater Luxury Dining Set", description: "Premium dining table set with upholstered chairs and oak finish in Pakistan." },
    labels: ["Ready Stock"],
  },
  {
    name: "Executive Arc Desk",
    slug: "executive-arc-desk",
    sku: "HS-OF-DS-4100",
    barcode: "8964001004100",
    category: "Office",
    subcategory: "Executive Desks",
    brand: "Citi Luxe",
    collection: "Citi Luxe Collection",
    price: 285000,
    rating: 4.6,
    reviews: 18,
    inventory: 8,
    colors: ["Walnut & Bronze", "Black Oak", "Ivory Lacquer"],
    materials: ["Walnut veneer", "Powder-coated steel", "Integrated cable tray"],
    dimensions: { width: "78 in", depth: "34 in", height: "30 in", weight: "118 kg" },
    image: images.mediaWall,
    gallery: [images.mediaWall, images.villa, images.kitchen],
    video: "https://www.homestyle.com.pk/media/executive-arc-desk.mp4",
    pdf: "https://www.homestyle.com.pk/downloads/executive-arc-technical.pdf",
    description: "A commanding executive desk with curved privacy panel, discreet storage, and cable-managed work surface for refined offices.",
    features: ["Integrated cable access", "Lockable drawer pedestal", "Return unit option", "Premium stain-resistant topcoat"],
    specifications: { Top: "Walnut veneer", Frame: "Powder-coated steel", Storage: "Lockable drawers", Delivery: "White-glove installation" },
    seo: { title: "Executive Arc Desk for Luxury Offices", description: "Premium executive office desk with walnut finish and cable management by Home Style." },
    labels: ["Office"],
  },
  {
    name: "Serene Brass Floor Lamp",
    slug: "serene-brass-floor-lamp",
    sku: "HS-DL-LP-5204",
    barcode: "8964001005204",
    category: "Décor & Lighting",
    subcategory: "Lighting",
    brand: "Urban Loom",
    collection: "Modern Majlis Edit",
    price: 68000,
    rating: 4.7,
    reviews: 42,
    inventory: 35,
    colors: ["Brushed Brass", "Matte Black"],
    materials: ["Steel", "Fabric shade", "Marble base"],
    dimensions: { width: "18 in", depth: "18 in", height: "62 in", weight: "16 kg" },
    image: images.modernBlue,
    gallery: [images.modernBlue, images.luxuryRoom, images.hero],
    video: "https://www.homestyle.com.pk/media/serene-floor-lamp.mp4",
    pdf: "https://www.homestyle.com.pk/downloads/serene-lamp-spec.pdf",
    description: "A warm ambient floor lamp with marble base and brass-finish stem, designed to soften lounges, bedrooms, and reading corners.",
    features: ["Warm LED compatible", "Weighted marble base", "Foot switch", "Soft linen drum shade"],
    specifications: { Bulb: "E27 LED", Shade: "Linen drum", Base: "Natural marble", Cable: "2.4m fabric braided" },
    seo: { title: "Serene Brass Floor Lamp", description: "Luxury brass floor lamp with marble base for premium interior styling." },
    labels: ["New Arrival"],
  },
  {
    name: "Bespoke Media Wall Package",
    slug: "bespoke-media-wall-package",
    sku: "HS-CF-MW-7001",
    barcode: "8964001007001",
    category: "Custom Furniture",
    subcategory: "Wall Panels",
    brand: "Rana Signature",
    collection: "Citi Luxe Collection",
    price: 720000,
    rating: 4.9,
    reviews: 53,
    inventory: 4,
    colors: ["Travertine Cream", "Walnut", "Smoked Oak", "Matte Charcoal"],
    materials: ["Fluted panels", "Stone-look slabs", "Concealed LEDs", "Premium hardware"],
    dimensions: { width: "180 in", depth: "18 in", height: "114 in", weight: "360 kg" },
    image: images.mediaWall,
    gallery: [images.mediaWall, images.kitchen, images.villa],
    video: "https://www.homestyle.com.pk/media/bespoke-media-wall.mp4",
    pdf: "https://www.homestyle.com.pk/downloads/media-wall-package.pdf",
    description: "A tailored TV wall, storage, and display composition designed after site measurement and 3D approval.",
    features: ["3D design preview included", "Concealed wiring and ventilation", "Integrated display shelves", "Professional installation and snagging"],
    specifications: { Design: "Custom 3D proposal", Panels: "Fluted veneer and slab finish", Lighting: "Warm dimmable LEDs", LeadTime: "4–6 weeks" },
    seo: { title: "Bespoke Media Wall Package", description: "Custom luxury TV media wall with fluted panels, lighting, and installation in Sialkot." },
    labels: ["Custom Furniture", "Designer Pick"],
  },
];

export const services = [
  {
    title: "Residential Interior Design",
    slug: "residential",
    description: "Complete home concepts, mood boards, 3D visuals, procurement, site supervision, and styling for villas, apartments, and family homes.",
    inclusions: ["Space planning", "Material palette", "Furniture selection", "Lighting plan", "On-site execution"],
  },
  {
    title: "Commercial & Retail Design",
    slug: "commercial",
    description: "Premium showrooms, boutiques, clinics, restaurants, and hospitality interiors built around customer journey and brand recall.",
    inclusions: ["Brand-led concept", "Traffic flow", "Display systems", "Durable finishes", "Turnkey delivery"],
  },
  {
    title: "Office Design",
    slug: "office",
    description: "Executive offices, workstations, meeting suites, reception areas, acoustic planning, and ergonomic furniture packages.",
    inclusions: ["Productivity zoning", "Executive furniture", "Storage planning", "Lighting", "Procurement"],
  },
  {
    title: "Kitchen, Bedroom & Living Room Styling",
    slug: "room-styling",
    description: "Focused room makeovers with custom cabinetry, wardrobes, headboards, media walls, soft furnishings, and decorative styling.",
    inclusions: ["Site survey", "3D concept", "Custom furniture", "Finishing décor", "Installation"],
  },
];

export const portfolio: PortfolioProject[] = [
  {
    title: "Citi Housing Contemporary Villa",
    slug: "citi-housing-contemporary-villa",
    category: "Residential",
    location: "Citi Housing Society, Sialkot",
    completionDate: "March 2026",
    budget: "PKR 18.5M",
    image: images.villa,
    before: images.showroom,
    after: images.villa,
    video: "https://www.homestyle.com.pk/media/citi-villa-tour.mp4",
    description: "A warm contemporary villa with sculptural lighting, custom wardrobes, travertine accents, and a calm neutral palette for a growing family.",
    scope: ["Full concept design", "Custom media wall", "Bedrooms and wardrobes", "Furniture procurement", "Final styling"],
  },
  {
    title: "Executive Lounge & Office Suite",
    slug: "executive-lounge-office-suite",
    category: "Office",
    location: "Sialkot Cantonment",
    completionDate: "January 2026",
    budget: "PKR 7.2M",
    image: images.mediaWall,
    before: images.living,
    after: images.mediaWall,
    video: "https://www.homestyle.com.pk/media/executive-office-suite.mp4",
    description: "A polished office suite with executive desk, acoustic wall treatment, hospitality lounge, and concealed storage.",
    scope: ["Office planning", "Executive furniture", "Acoustic panels", "Lighting design", "Installation"],
  },
  {
    title: "Modern Majlis Living Space",
    slug: "modern-majlis-living-space",
    category: "Living Room",
    location: "Model Town, Sialkot",
    completionDate: "November 2025",
    budget: "PKR 5.8M",
    image: images.brownSofa,
    before: images.chandelier,
    after: images.brownSofa,
    video: "https://www.homestyle.com.pk/media/modern-majlis.mp4",
    description: "A hospitality-led living room with generous modular seating, handcrafted tables, warm lighting, and layered rugs.",
    scope: ["Furniture design", "Layout optimization", "Decor styling", "Window treatments", "Project handover"],
  },
  {
    title: "Boutique Furniture Showroom Refresh",
    slug: "boutique-furniture-showroom-refresh",
    category: "Commercial",
    location: "Paris Road, Sialkot",
    completionDate: "September 2025",
    budget: "PKR 9.6M",
    image: images.showroom,
    before: images.kitchen,
    after: images.showroom,
    video: "https://www.homestyle.com.pk/media/showroom-refresh.mp4",
    description: "A commercial redesign improving product display, lighting temperature, customer pathways, and premium consultation zones.",
    scope: ["Retail layout", "Display strategy", "Lighting", "Reception desk", "Brand styling"],
  },
];

export const blogPosts = [
  {
    title: "How to Create a Quiet Luxury Living Room in Pakistan",
    slug: "quiet-luxury-living-room-pakistan",
    category: "Interior Design",
    date: "2026-02-18",
    image: images.luxuryRoom,
    excerpt: "Quiet luxury is about restraint, texture, and proportion. Learn how to combine warm neutrals, layered lighting, and investment furniture.",
    content: [
      "Quiet luxury begins with proportion. Instead of filling every wall, leave deliberate breathing room around the primary sofa, coffee table, and statement lighting.",
      "Select one hero material such as travertine, walnut, bouclé, or brushed brass, then repeat it in smaller moments throughout the room for visual continuity.",
      "Use layered lighting: ceiling ambience, wall washing, reading lamps, and concealed LED strips. Warm light immediately improves comfort and perceived quality.",
      "Finally, invest in fewer but better pieces. A well-built sofa, correctly sized rug, and custom media wall will create more impact than many unrelated accessories.",
    ],
  },
  {
    title: "The Home Style Guide to Custom Wardrobes",
    slug: "home-style-guide-custom-wardrobes",
    category: "Custom Furniture",
    date: "2026-01-28",
    image: images.villa,
    excerpt: "A practical guide to measurements, finishes, lighting, hardware, and internal accessories for a wardrobe that works beautifully every day.",
    content: [
      "A custom wardrobe should be designed around your habits. Begin by counting hanging garments, folded clothes, shoes, accessories, luggage, and seasonal items.",
      "Choose moisture-resistant carcass boards and reliable soft-close hardware. These two decisions affect daily performance more than any decorative finish.",
      "Internal lighting is not decorative only; it improves visibility and gives the bedroom a premium hotel feeling. Sensor strips are worth specifying early.",
      "Ask for detailed elevation drawings before production so drawer heights, rail positions, mirrors, and appliance niches are finalized correctly.",
    ],
  },
  {
    title: "Furniture Buying Checklist for New Homes",
    slug: "furniture-buying-checklist-new-homes",
    category: "Furniture Buying",
    date: "2025-12-10",
    image: images.hero,
    excerpt: "Before ordering furniture, review room measurements, circulation paths, delivery access, fabrics, finishes, warranties, and after-sales service.",
    content: [
      "Measure every room, doorway, staircase, and lift before confirming large pieces. Luxury furniture must look generous without blocking comfortable circulation.",
      "Prepare a finish palette in advance. Wood tone, metal finish, stone selection, and fabric temperature should feel cohesive from room to room.",
      "Ask for written warranty information, delivery timelines, care instructions, and invoice details. Good documentation protects both customer and seller.",
      "For important spaces, book a design consultation. Professional planning prevents expensive mistakes and creates a more complete result.",
    ],
  },
];

export const testimonials = [
  {
    name: "Ayesha Mahmood",
    role: "Homeowner, Citi Housing",
    quote: "Home Style understood our lifestyle immediately. The custom media wall and sofas transformed our lounge into the most used room in the house.",
    rating: 5,
  },
  {
    name: "Usman Sheikh",
    role: "Business Owner",
    quote: "The executive office was delivered with discipline, premium finishing, and excellent after-sales support. The team handled every detail.",
    rating: 5,
  },
  {
    name: "Dr. Sana Rauf",
    role: "Residential Client",
    quote: "Their wardrobe planning saved space and made our bedroom feel like a boutique hotel. Measurements, drawings, and installation were all professional.",
    rating: 5,
  },
];

export const faqs = [
  { question: "Do you offer free consultations?", answer: "Initial showroom guidance is complimentary. Detailed site visits, 3D design, and turnkey proposals are scheduled through a paid consultation that can be adjusted against approved project work." },
  { question: "Can furniture be customized?", answer: "Yes. Sofas, beds, wardrobes, media walls, dining tables, kitchens, vanities, and built-ins can be customized in size, fabric, finish, storage, and hardware." },
  { question: "Which payment methods are supported?", answer: "Cash on delivery, bank transfer, card-ready Stripe integration, and milestone-based project invoicing are supported in the CMS workflow." },
  { question: "How long does a custom furniture order take?", answer: "Most custom furniture takes 3–6 weeks after measurement and final approval. Large turnkey interiors are scheduled with project milestones." },
  { question: "Do you deliver outside Sialkot?", answer: "Yes. Delivery and installation can be arranged for nearby cities. Shipping rates depend on distance, product size, and installation requirements." },
  { question: "What happens after I submit the contact form?", answer: "Your enquiry is saved in the CMS, emailed to the team, converted into a WhatsApp-ready message, and tracked for follow-up by the admin panel." },
];

export const stats = [
  { label: "Completed interiors", value: "480+" },
  { label: "Custom furniture pieces", value: "7,500+" },
  { label: "Client satisfaction", value: "98%" },
  { label: "Years craft experience", value: "15+" },
];

export const whyChooseUs = [
  "End-to-end design, furniture, procurement, and installation under one roof.",
  "Premium material library with fabrics, veneers, hardware, stone, and lighting samples.",
  "Transparent quotations, milestone tracking, invoices, and client notes through the CMS.",
  "Local Sialkot presence with professional site measurement and after-sales service.",
];

export const cmsHomeSections = [
  "Hero Slider",
  "Featured Categories",
  "Featured Collections",
  "Best Sellers",
  "New Arrivals",
  "Custom Furniture",
  "Interior Services",
  "Portfolio Preview",
  "Before After Slider",
  "Statistics",
  "Why Choose Us",
  "Testimonials",
  "Brand Logos",
  "Instagram Feed",
  "Newsletter",
  "Latest Blogs",
  "Premium Footer",
];

export const adminModules = [
  { name: "Dashboard", slug: "dashboard", metric: "PKR 12.8M", description: "Revenue, conversion, orders, consultations, project stages, stock alerts, and SEO health." },
  { name: "Users", slug: "users", metric: "34", description: "Admin users, designers, sales team, customers, login history, and 2FA readiness." },
  { name: "Roles & Permissions", slug: "roles-permissions", metric: "128 rules", description: "Granular module permissions, policy matrix, audit trail, and protected actions." },
  { name: "Products", slug: "products", metric: String(products.length), description: "Catalog, SKUs, barcodes, variants, gallery, videos, PDFs, reviews, questions, and SEO." },
  { name: "Categories", slug: "categories", metric: String(categories.length), description: "Unlimited parent categories, sub categories, sort order, visibility, and metadata." },
  { name: "Brands", slug: "brands", metric: String(brands.length), description: "Brand profiles, logos, activation status, and collection mapping." },
  { name: "Collections", slug: "collections", metric: String(collections.length), description: "Seasonal edits, featured products, landing pages, and campaign windows." },
  { name: "Inventory", slug: "inventory", metric: "11 low", description: "Stock on hand, reserved quantities, low-stock thresholds, suppliers, and purchase notes." },
  { name: "Orders", slug: "orders", metric: "126", description: "COD, bank transfer, Stripe-ready payments, invoices, shipping, taxes, refunds, and returns." },
  { name: "Customers", slug: "customers", metric: "2,840", description: "Profiles, addresses, orders, wishlist, reviews, notifications, and lifetime value." },
  { name: "Consultations", slug: "consultations", metric: "42", description: "Appointments, service type, budget, designer assignment, notes, and WhatsApp follow-up." },
  { name: "Projects", slug: "projects", metric: "19 active", description: "Residential, commercial, office, bedroom, kitchen, living room, timeline, gallery, invoices." },
  { name: "Portfolio", slug: "portfolio", metric: String(portfolio.length), description: "Project galleries, before/after media, videos, budget, date, and categories." },
  { name: "Blogs", slug: "blogs", metric: String(blogPosts.length), description: "Posts, categories, tags, comments, CKEditor-style content, and SEO controls." },
  { name: "Testimonials", slug: "testimonials", metric: String(testimonials.length), description: "Ratings, quotes, featured status, and homepage publishing." },
  { name: "FAQs", slug: "faqs", metric: String(faqs.length), description: "Categorized questions, sorting, active status, and schema-ready answers." },
  { name: "Menus", slug: "menus", metric: "5", description: "Mega menu, footer groups, account navigation, admin menu, and landing menus." },
  { name: "Pages", slug: "pages", metric: "14", description: "CMS pages, privacy policy, terms, content blocks, templates, and publishing." },
  { name: "Media Library", slug: "media-library", metric: "3.4GB", description: "Folders, search, rename, crop-ready metadata, compression, WebP conversion, and drag upload." },
  { name: "Banners & Sliders", slug: "banners-sliders", metric: "9", description: "Hero slides, placements, CTA tracking, visibility, duplication, and scheduling." },
  { name: "Coupons", slug: "coupons", metric: "8 active", description: "Percentage or fixed discounts, limits, date windows, minimums, and usage tracking." },
  { name: "Reviews", slug: "reviews", metric: "286", description: "Product ratings, approval queue, replies, and moderation history." },
  { name: "Newsletter", slug: "newsletter", metric: "6,420", description: "Subscribers, source tracking, export, segments, and campaign queue readiness." },
  { name: "SEO", slug: "seo", metric: "94/100", description: "Meta, Open Graph, Twitter cards, JSON-LD, XML sitemap, robots, canonical URLs, and scoring." },
  { name: "Theme Settings", slug: "theme-settings", metric: "Light/Dark", description: "Colors, typography, section visibility, spacing, dark mode, and storefront polish." },
  { name: "Company Settings", slug: "company-settings", metric: "Live", description: "Business profile, hours, contact, address, social channels, policies, and map data." },
  { name: "SMTP", slug: "smtp", metric: "Configured", description: "Email sender, templates, queues, test sending, and bounce diagnostics." },
  { name: "Payment Gateways", slug: "payment-gateways", metric: "3", description: "COD, bank transfer, Stripe-ready configuration, webhook log, and test/live mode." },
  { name: "Shipping", slug: "shipping", metric: "7 zones", description: "City zones, rates, free shipping thresholds, carriers, and tracking notes." },
  { name: "Taxes", slug: "taxes", metric: "5 rules", description: "Regional taxes, inclusive/exclusive pricing, invoices, and reporting exports." },
  { name: "Backup", slug: "backup", metric: "Daily", description: "Database backup, media backup, retention, restore points, and activity log." },
  { name: "Activity Logs", slug: "activity-logs", metric: "18k", description: "Every admin action, IP, device, module, entity, and metadata snapshot." },
];

export const policies = {
  privacy: [
    "Home Style Interior & Decore collects customer details only to process orders, consultations, deliveries, warranties, and service follow-ups.",
    "Personal information is stored securely in the CMS with role-based access, activity logs, CSRF protection, input validation, and database-level constraints.",
    "We do not sell customer data. Delivery partners and payment gateways receive only the information required to complete their service.",
    "Customers may request profile updates, marketing opt-out, or order documentation by contacting info@homestyle.com.pk.",
  ],
  terms: [
    "Product prices are listed in PKR and may change due to material costs, customization, imported hardware, taxes, or delivery requirements.",
    "Custom furniture orders require measurement approval, design confirmation, and milestone payments before production begins.",
    "Natural materials such as wood, stone, leather, and veneer may vary in grain, shade, texture, and pattern, which is part of their premium character.",
    "Returns and refunds are reviewed according to product condition, customization level, delivery status, and warranty terms stated on the invoice.",
  ],
};

export const orderTrackingSteps = ["Order Received", "Payment Review", "Production / Picking", "Quality Check", "Dispatched", "Delivered"];

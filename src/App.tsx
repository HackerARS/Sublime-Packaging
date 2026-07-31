import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import AOS from 'aos';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// TYPES
// ============================================
interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
}

interface WhyCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

// ============================================
// DATA
// ============================================
const services: ServiceCardProps[] = [
  { icon: 'fa-solid fa-box', title: 'Custom Boxes', description: 'Tailor-made packaging boxes designed to your exact specifications with premium materials.' },
  { icon: 'fa-solid fa-cube', title: 'Rigid Boxes', description: 'Luxury rigid setup boxes with magnetic closure for premium unboxing experiences.' },
  { icon: 'fa-solid fa-envelope-open-text', title: 'Mailer Boxes', description: 'Durable custom mailer boxes perfect for e-commerce and subscription businesses.' },
  { icon: 'fa-solid fa-boxes-stacked', title: 'Corrugated Boxes', description: 'Strong, protective corrugated packaging for shipping and heavy-duty applications.' },
  { icon: 'fa-solid fa-pizza-slice', title: 'Food Packaging', description: 'Food-safe custom packaging for restaurants, fast food chains, and food businesses.' },
  { icon: 'fa-solid fa-cake-candles', title: 'Bakery Boxes', description: 'Beautiful bakery boxes with windows and inserts for cakes, pastries, and confections.' },
  { icon: 'fa-solid fa-spray-can-sparkles', title: 'Cosmetic Boxes', description: 'Elegant packaging for beauty, skincare, and cosmetic products with luxury finishes.' },
  { icon: 'fa-solid fa-gift', title: 'Gift Boxes', description: 'Premium gift packaging with ribbons, inserts, and decorative finishes for every occasion.' },
  { icon: 'fa-solid fa-gem', title: 'Jewelry Boxes', description: 'Luxurious jewelry packaging with velvet inserts and premium exterior finishes.' },
  { icon: 'fa-solid fa-capsules', title: 'Pharmaceutical Boxes', description: 'Compliant pharmaceutical packaging with tamper-evident and child-resistant features.' },
  { icon: 'fa-solid fa-mobile-screen', title: 'Electronics Packaging', description: 'Protective custom packaging for electronics with anti-static and foam inserts.' },
  { icon: 'fa-solid fa-tag', title: 'Labels & Stickers', description: 'High-quality custom labels, stickers, and decals with various finishes and materials.' },
  { icon: 'fa-solid fa-bag-shopping', title: 'Shopping Bags', description: 'Premium paper shopping bags with custom branding for retail stores and boutiques.' },
  { icon: 'fa-solid fa-book-open', title: 'Catalog Printing', description: 'Professional catalog and brochure printing with premium paper and binding options.' },
  { icon: 'fa-solid fa-file-lines', title: 'Business Cards', description: 'Premium business cards with foil stamping, embossing, and luxury paper stocks.' },
  { icon: 'fa-solid fa-leaf', title: 'Eco-Friendly Packaging', description: 'Sustainable packaging solutions using recycled and biodegradable materials.' },
];

const products: ProductCardProps[] = [
  { image: '📦', title: 'Luxury Rigid Box', category: 'Premium' },
  { image: '🎁', title: 'Magnetic Gift Box', category: 'Gift' },
  { image: '📬', title: 'Custom Mailer Box', category: 'E-Commerce' },
  { image: '🍕', title: 'Pizza Box', category: 'Food' },
  { image: '💄', title: 'Cosmetic Box', category: 'Beauty' },
  { image: '💍', title: 'Jewelry Box', category: 'Luxury' },
  { image: '🛍️', title: 'Shopping Bag', category: 'Retail' },
  { image: '📱', title: 'Electronics Box', category: 'Tech' },
];

const whyChooseUs: WhyCardProps[] = [
  { icon: 'fa-solid fa-pen-ruler', title: 'Free Design Support', description: 'Professional design assistance at no extra cost to bring your vision to life.' },
  { icon: 'fa-solid fa-medal', title: 'Premium Materials', description: 'We use only the highest quality papers, boards, and printing materials available.' },
  { icon: 'fa-solid fa-tags', title: 'Affordable Prices', description: 'Competitive pricing without compromising on quality — best value guaranteed.' },
  { icon: 'fa-solid fa-truck-fast', title: 'Fast Turnaround', description: 'Quick production and delivery to meet your deadlines without delays.' },
  { icon: 'fa-solid fa-shipping-fast', title: 'Free Shipping', description: 'Complimentary delivery across all major cities in Pakistan on all orders.' },
  { icon: 'fa-solid fa-layer-group', title: 'Low MOQ', description: 'Start with as few as 50 boxes — perfect for startups and small businesses.' },
  { icon: 'fa-solid fa-print', title: 'Latest Technology', description: 'State-of-the-art printing technology for flawless, vibrant results every time.' },
  { icon: 'fa-solid fa-star', title: 'High Quality', description: 'Rigorous quality control ensures every box meets our premium standards.' },
  { icon: 'fa-solid fa-headset', title: 'Dedicated Support', description: 'Personal account manager to guide you through the entire process.' },
];

const industries: string[] = [
  'Restaurants', 'Fast Food', 'Cosmetics', 'Fashion', 'Electronics',
  'Medical', 'Retail', 'Jewelry', 'Bakery', 'Real Estate', 'Corporate',
  'E-Commerce', 'Pharmaceuticals', 'Gifts & Events'
];

const processSteps: ProcessStepProps[] = [
  { number: '01', title: 'Consultation', description: 'Share your requirements with our team. We discuss your vision, budget, and timeline to create the perfect packaging strategy.' },
  { number: '02', title: 'Design', description: 'Our expert designers create custom packaging designs with 3D mockups for your approval. Unlimited revisions until you love it.' },
  { number: '03', title: 'Prototype', description: 'We create a physical sample of your packaging so you can see, touch, and feel the quality before full production.' },
  { number: '04', title: 'Printing', description: 'Using the latest offset, digital, and UV printing technology, we produce your packaging with precision and care.' },
  { number: '05', title: 'Quality Check', description: 'Every single piece undergoes rigorous quality inspection to ensure it meets our premium standards.' },
  { number: '06', title: 'Delivery', description: 'Your finished packaging is carefully packed and delivered to your doorstep — on time, every time.' },
];

const materials: string[] = [
  'Kraft', 'Cardboard', 'Rigid', 'Corrugated', 'Duplex', 'Art Card', 'Recycled Paper', 'SBS Board', 'Greyboard'
];

const printingOptions: { icon: string; name: string }[] = [
  { icon: 'fa-solid fa-print', name: 'Offset Printing' },
  { icon: 'fa-solid fa-desktop', name: 'Digital Printing' },
  { icon: 'fa-solid fa-sun', name: 'UV Printing' },
  { icon: 'fa-solid fa-paint-roller', name: 'Screen Printing' },
  { icon: 'fa-solid fa-wand-magic-sparkles', name: 'Foil Stamping' },
  { icon: 'fa-solid fa-arrow-up-wide-short', name: 'Embossing' },
  { icon: 'fa-solid fa-arrow-down-wide-short', name: 'Debossing' },
  { icon: 'fa-solid fa-droplet', name: 'Spot UV' },
  { icon: 'fa-solid fa-hand', name: 'Soft Touch' },
  { icon: 'fa-solid fa-circle', name: 'Matte Finish' },
  { icon: 'fa-solid fa-circle-dot', name: 'Gloss Finish' },
];

const testimonials: TestimonialProps[] = [
  { name: 'Ahmed Khan', role: 'CEO', company: 'Luxe Cosmetics', text: 'Sublime Packaging transformed our brand image completely. The rigid boxes they created for our perfume line are absolutely stunning. Our customers love the unboxing experience!', rating: 5 },
  { name: 'Fatima Rizvi', role: 'Founder', company: 'Sweet Delights Bakery', text: 'We switched to Sublime Packaging for our cake boxes and it was the best decision. Beautiful designs, food-safe materials, and the window boxes showcase our cakes perfectly.', rating: 5 },
  { name: 'Usman Ali', role: 'Director', company: 'TechZone Electronics', text: 'Professional team, fast turnaround, and exceptional quality. The corrugated boxes with custom foam inserts have reduced our product damage during shipping to nearly zero.', rating: 5 },
  { name: 'Zara Hassan', role: 'Brand Manager', company: 'Glamour Jewelry', text: 'The jewelry boxes Sublime Packaging created for our brand are nothing short of luxurious. Velvet inserts, magnetic closures, foil-stamped logo — absolute perfection!', rating: 5 },
  { name: 'Bilal Mahmood', role: 'Owner', company: 'Urban Eats Restaurant', text: 'Our restaurant packaging now looks as good as our food tastes. The custom burger and pizza boxes have become a talking point among our customers. Highly recommended!', rating: 5 },
  { name: 'Sana Tariq', role: 'E-Commerce Seller', company: 'Organic Bliss', text: 'As a small business, the low MOQ was a game-changer. The mailer boxes are sturdy, beautiful, and my customers appreciate the eco-friendly packaging. Will reorder forever!', rating: 5 },
];

const faqItems: FAQItemProps[] = [
  { question: 'What types of packaging boxes do you offer?', answer: 'We offer a comprehensive range of packaging solutions including custom boxes, rigid boxes, mailer boxes, corrugated boxes, food packaging, cosmetic boxes, gift boxes, pharmaceutical boxes, electronics packaging, labels & stickers, shopping bags, and much more. Whatever your packaging need, we can create it.' },
  { question: 'Do you provide free design support?', answer: 'Absolutely! We provide completely free professional design support for all our packaging and printing orders. Our team of experienced designers will work with you to create the perfect design, and we offer unlimited revisions until you are 100% satisfied.' },
  { question: 'What is the minimum order quantity (MOQ)?', answer: 'We offer very low minimum order quantities starting from just 50 boxes, depending on the product type. This makes us the perfect choice for startups, small businesses, and e-commerce sellers who want premium packaging without committing to large volumes.' },
  { question: 'How long does production take?', answer: 'Standard production takes 5-10 business days depending on the complexity and quantity. Rush orders can be completed in as little as 3-4 business days. We always strive to meet your deadlines.' },
  { question: 'Do you deliver across Pakistan?', answer: 'Yes! We provide free delivery to all major cities across Pakistan including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Gujranwala, Peshawar, Quetta, and many more. We partner with reliable courier services for safe and timely delivery.' },
  { question: 'What printing and finishing options do you offer?', answer: 'We offer a complete range of printing and finishing options including offset printing, digital printing, UV printing, foil stamping, embossing, debossing, spot UV, soft touch coating, matte lamination, gloss lamination, and more to give your packaging a premium look and feel.' },
  { question: 'Can I see a sample before placing a bulk order?', answer: 'Yes! We create physical prototypes and samples so you can see and feel the quality of your packaging before proceeding with the full production run. Sample production typically takes 2-4 business days.' },
  { question: 'What materials do you use for packaging?', answer: 'We use a wide variety of premium materials including Kraft paper, cardboard, rigid board, corrugated cardboard, duplex board, art card, SBS board, greyboard, and recycled paper. All our materials are sourced from trusted suppliers to ensure consistent quality.' },
];

// ============================================
// COMPONENTS
// ============================================

/* ---- Counter Component ---- */
const Counter: React.FC<CounterProps> = ({ end, suffix = '+', label, duration = 2.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="counter-item">
      <div className="counter-number">
        {count}{suffix}
      </div>
      <div className="counter-label">{label}</div>
    </div>
  );
};

/* ---- Service Card ---- */
const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay = 0 }) => (
  <div className="col-lg-3 col-md-4 col-sm-6 mb-4" data-aos="fade-up" data-aos-delay={delay}>
    <div className="service-card">
      <div className="service-icon">
        <i className={icon}></i>
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

/* ---- Product Card ---- */
const ProductCard: React.FC<ProductCardProps> = ({ image, title, category }) => (
  <div className="col-lg-3 col-md-4 col-6 mb-4" data-aos="fade-up">
    <div className="product-card">
      <div className="product-card-img d-flex align-items-center justify-content-center" style={{ fontSize: '5rem' }}>
        {image}
      </div>
      <div className="product-card-overlay">
        <span className="text-white fw-semibold">Quick View</span>
      </div>
      <div className="product-card-info">
        <h5>{title}</h5>
        <small className="text-muted">{category}</small>
      </div>
    </div>
  </div>
);

/* ---- Why Choose Card ---- */
const WhyCard: React.FC<WhyCardProps> = ({ icon, title, description, delay = 0 }) => (
  <div className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay={delay}>
    <div className="why-card">
      <div className="why-icon">
        <i className={icon}></i>
      </div>
      <h5 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: '1rem', marginBottom: '8px' }}>{title}</h5>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>{description}</p>
    </div>
  </div>
);

/* ---- Testimonial Card ---- */
const TestimonialCard: React.FC<TestimonialProps> = ({ name, role, company, text, rating }) => (
  <div className="testimonial-card h-100">
    <div className="testimonial-stars mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
    <p className="testimonial-text">"{text}"</p>
    <div className="mt-3">
      <p className="testimonial-author mb-0">{name}</p>
      <p className="testimonial-role mb-0">{role}, {company}</p>
    </div>
  </div>
);

/* ---- Process Step ---- */
const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => (
  <div className="process-step" data-aos="fade-right">
    <div className="process-number">{number}</div>
    <div className="process-content">
      <h4>{title}</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', lineHeight: 1.7, margin: 0 }}>{description}</p>
    </div>
  </div>
);

/* ---- FAQ Item ---- */
const FAQItem: React.FC<FAQItemProps & { index: number }> = ({ question, answer, index }) => (
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button
        className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#faq-${index}`}
        aria-expanded={index === 0}
      >
        {question}
      </button>
    </h2>
    <div id={`faq-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#faqAccordion">
      <div className="accordion-body">{answer}</div>
    </div>
  </div>
);

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const topBtnRef = useRef<HTMLButtonElement>(null);
  const testimonialSwiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<any>(null);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadingRef.current) {
        loadingRef.current.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }, 2200);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
      requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = () => cursor.classList.add('hover');
    const onMouseLeaveInteractive = () => cursor.classList.remove('hover');
    const onMouseDown = () => cursor.classList.add('click');
    const onMouseUp = () => cursor.classList.remove('click');

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    requestAnimationFrame(animate);

    const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .product-card, .industry-tag, .material-tag, .print-option, .gallery-item, .why-card, .magnetic');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  // Navbar scroll effect + active link
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        navbarRef.current.classList.toggle('scrolled', window.scrollY > 50);
      }
      if (topBtnRef.current) {
        topBtnRef.current.classList.toggle('visible', window.scrollY > 500);
      }
      
      // Scroll spy for active nav link
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 120;
      sections.forEach(section => {
        const el = section as HTMLElement;
        const id = el.getAttribute('id') || '';
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
          if (el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-nav'));
            link.classList.add('active-nav');
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: 'mobile',
    });
  }, []);

  // Initialize Swiper
  useEffect(() => {
    if (testimonialSwiperRef.current && !swiperInstance.current) {
      swiperInstance.current = new Swiper(testimonialSwiperRef.current, {
        modules: [Autoplay, Pagination],
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.testimonial-pagination', clickable: true },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        },
      });
    }
    return () => {
      swiperInstance.current?.destroy();
      swiperInstance.current = null;
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero floating boxes
      gsap.to('.hero-floating-box', {
        y: -30,
        rotation: 5,
        duration: 4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.8,
      });

      // Parallax on hero bg circles
      gsap.to('.hero-bg-circle', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 150,
        scale: 0.8,
        opacity: 0.02,
      });

      // Section title reveal
      gsap.utils.toArray<HTMLElement>('.section-title-animated').forEach(el => {
        gsap.fromTo(el, 
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

    });
    return () => ctx.revert();
  }, []);

  // Magnetic effect
  useEffect(() => {
    const handleMagneticMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      target.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };
    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = 'translate(0, 0)';
    };

    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(el => {
      el.addEventListener('mousemove', handleMagneticMove as EventListener);
      el.addEventListener('mouseleave', handleMagneticLeave as EventListener);
    });

    return () => {
      magnets.forEach(el => {
        el.removeEventListener('mousemove', handleMagneticMove as EventListener);
        el.removeEventListener('mouseleave', handleMagneticLeave as EventListener);
      });
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const whatsappLink = 'https://wa.me/923274337810?text=Hi%20Sublime%20Packaging,%20I%20need%20a%20quote%20for%20custom%20packaging.';
  const callLink = 'tel:+923274337810';

  return (
    <>
      {/* ============ LOADING SCREEN ============ */}
      <div id="loading-screen" ref={loadingRef}>
        <div className="loader-logo">SUBLIME</div>
        <div className="loader-subtitle">Packaging Excellence</div>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>

      {/* ============ CUSTOM CURSOR ============ */}
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      {/* ============ TOP ANNOUNCEMENT BAR ============ */}
      <div style={{
        background: 'var(--burgundy)',
        color: 'white',
        textAlign: 'center',
        padding: '8px 16px',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-manrope)',
        fontWeight: 500,
        letterSpacing: '0.5px',
        position: 'relative',
        zIndex: 1030
      }}>
        🚀 Free Design Support & Free Shipping Across Pakistan | Low MOQ Starting from 50 Boxes | Call: 0327-4337810
      </div>

      {/* ============ NAVBAR ============ */}
      <nav className="navbar navbar-expand-lg fixed-top" ref={navbarRef} style={{ top: '36px' }}>
        <div className="container">
          <a className="navbar-brand magnetic" href="#home">
            SUBLIME<span className="brand-dot"></span>
          </a>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" style={{ backgroundImage: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa-solid fa-bars" style={{ color: 'var(--burgundy)', fontSize: '1.3rem' }}></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {['Home', 'Products', 'Industries', 'Why Us', 'Process', 'Gallery', 'FAQ', 'Contact'].map(item => (
                <li className="nav-item" key={item}>
                  <a className="nav-link" href={`#${item.toLowerCase().replace(/\s/g, '-')}`}>{item}</a>
                </li>
              ))}
            </ul>
            <a href="#quote" className="btn btn-quote magnetic">
              Get Quote <i className="fa-solid fa-arrow-right ms-2" style={{ fontSize: '0.75rem' }}></i>
            </a>
          </div>
        </div>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section className="hero-section" id="home">
        {/* Background circles */}
        <div className="hero-bg-circle" style={{ width: '600px', height: '600px', top: '-200px', right: '-150px' }}></div>
        <div className="hero-bg-circle" style={{ width: '400px', height: '400px', bottom: '-100px', left: '-100px' }}></div>
        <div className="hero-bg-circle" style={{ width: '200px', height: '200px', top: '40%', left: '60%' }}></div>

        {/* Floating boxes */}
        <div className="hero-floating-box d-none d-lg-block" style={{ top: '15%', right: '8%', fontSize: '5rem', opacity: 0.5 }}>📦</div>
        <div className="hero-floating-box d-none d-lg-block" style={{ top: '55%', right: '15%', fontSize: '3.5rem', opacity: 0.4 }}>🎁</div>
        <div className="hero-floating-box d-none d-lg-block" style={{ top: '35%', right: '25%', fontSize: '2.5rem', opacity: 0.35 }}>📬</div>

        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6" data-aos="fade-up" data-aos-duration="1000">
              <div className="section-badge">Premium Packaging Lahore</div>
              <h1 className="hero-headline mb-4">
                Premium Custom<br />
                <span className="highlight">Packaging</span> That<br />
                Builds Your Brand
              </h1>
              <p className="hero-subtitle mb-4">
                Professional packaging solutions for every industry. From luxury rigid boxes to eco-friendly mailers — we craft packaging that elevates your brand experience.
              </p>
              <div className="hero-cta-group mb-5">
                <a href="#quote" className="btn btn-primary magnetic">
                  Get Free Quote <i className="fa-solid fa-arrow-right ms-2"></i>
                </a>
                <a href="#products" className="btn btn-outline magnetic">
                  Explore Products <i className="fa-solid fa-box ms-2"></i>
                </a>
              </div>

              {/* Counters */}
              <div className="row g-0">
                <div className="col-3"><Counter end={1250} label="Satisfied Clients" /></div>
                <div className="col-3"><Counter end={8500} label="Projects Done" /></div>
                <div className="col-3"><Counter end={45} label="Cities Served" /></div>
                <div className="col-3"><Counter end={12} suffix="+" label="Years Exp" /></div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center" data-aos="fade-left" data-aos-duration="1200">
              <div style={{ 
                width: '420px', 
                height: '420px', 
                background: 'linear-gradient(135deg, rgba(128,0,32,0.04), rgba(128,0,32,0.08))', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  width: '280px',
                  height: '280px',
                  background: 'white',
                  borderRadius: '50%',
                  boxShadow: '0 30px 80px rgba(128,0,32,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '8rem'
                }}>
                  📦
                </div>
                {/* Orbit rings */}
                <div style={{
                  position: 'absolute', inset: '-20px', borderRadius: '50%',
                  border: '1.5px dashed rgba(128,0,32,0.12)',
                  animation: 'floatBox 8s linear infinite'
                }}></div>
                <div style={{
                  position: 'absolute', inset: '-50px', borderRadius: '50%',
                  border: '1px dashed rgba(128,0,32,0.06)',
                  animation: 'floatBox 12s linear infinite reverse'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section className="section-padding" id="products" style={{ background: '#FAFAFA' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge">Our Expertise</div>
            <h2 className="section-title section-title-animated">Comprehensive Packaging<br />& Printing Solutions</h2>
            <p className="section-subtitle mx-auto mt-3">From concept to creation, we deliver premium packaging that makes your brand stand out on the shelf and in the unboxing experience.</p>
            <div className="premium-divider mx-auto mt-4"></div>
          </div>
          <div className="row">
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} delay={i * 50} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRODUCT SHOWCASE WITH FILTER ============ */}
      <section className="section-padding" id="gallery">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge">Product Showcase</div>
            <h2 className="section-title section-title-animated">Our Premium Work</h2>
            <p className="section-subtitle mx-auto mt-3">Explore our portfolio of beautifully crafted packaging solutions that have helped brands elevate their presence.</p>
            <div className="premium-divider mx-auto mt-4"></div>
          </div>
          {/* Gallery Filter */}
          <div className="text-center mb-4" data-aos="fade-up">
            {['All', 'Premium', 'Food', 'Beauty', 'Luxury', 'Retail', 'E-Commerce', 'Tech'].map(cat => (
              <span key={cat} className="industry-tag" style={{ cursor: 'pointer' }}>{cat}</span>
            ))}
          </div>
          <div className="row">
            {products.map((product, i) => (
              <ProductCard key={i} {...product} />
            ))}
          </div>
          <div className="text-center mt-4" data-aos="fade-up">
            <a href="#quote" className="btn btn-primary magnetic">
              Request Custom Samples <i className="fa-solid fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ============ LUXURY GALLERY MASONRY ============ */}
      <section className="section-padding" style={{ background: '#0A0A0A', color: 'white' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge" style={{ background: 'rgba(255,255,255,0.08)', color: '#F0E68C' }}>Our Gallery</div>
            <h2 className="section-title section-title-animated text-white">Craftsmanship<br />In Every Detail</h2>
            <p className="section-subtitle mx-auto mt-3" style={{ color: 'rgba(255,255,255,0.55)' }}>Every box we create is a masterpiece of design, precision, and quality craftsmanship.</p>
            <div className="premium-divider mx-auto mt-4" style={{ background: '#F0E68C' }}></div>
          </div>
          <div className="row g-3">
            {[
              { cols: 'col-lg-5', height: '400px', icon: '📦', label: 'Luxury Rigid Boxes', sub: 'Premium Magnetic Closure' },
              { cols: 'col-lg-3', height: '400px', icon: '🎁', label: 'Gift Packaging', sub: 'Ribbon & Velvet Finish' },
              { cols: 'col-lg-4', height: '400px', icon: '💄', label: 'Cosmetic Boxes', sub: 'Foil Stamped Logos' },
              { cols: 'col-lg-4', height: '350px', icon: '🍰', label: 'Bakery Boxes', sub: 'Window Cutouts' },
              { cols: 'col-lg-4', height: '350px', icon: '📬', label: 'Mailer Boxes', sub: 'E-Commerce Ready' },
              { cols: 'col-lg-4', height: '350px', icon: '💍', label: 'Jewelry Boxes', sub: 'Velvet Inserts' },
            ].map((item, i) => (
              <div key={i} className={`${item.cols} col-md-6 mb-3`} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="gallery-item" style={{ height: item.height, borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ 
                    width: '100%', height: '100%', 
                    background: `linear-gradient(135deg, rgba(128,0,32,${0.15 + i * 0.03}), rgba(128,0,32,${0.25 + i * 0.02}))`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', fontSize: '4rem'
                  }}>
                    <span>{item.icon}</span>
                  </div>
                  <div className="gallery-overlay" style={{ flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: '1.1rem', color: 'white' }}>{item.label}</span>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)' }}>{item.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="section-padding" id="why-us" style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge">Why Choose Us</div>
            <h2 className="section-title section-title-animated">What Makes Us Different</h2>
            <p className="section-subtitle mx-auto mt-3">We combine premium materials, cutting-edge technology, and passionate craftsmanship to deliver packaging that exceeds expectations.</p>
            <div className="premium-divider mx-auto mt-4"></div>
          </div>
          <div className="row">
            {whyChooseUs.map((item, i) => (
              <WhyCard key={i} {...item} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUSTED BY ============ */}
      <section className="py-5" style={{ background: 'white', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <p className="text-center mb-4" style={{ fontFamily: 'var(--font-manrope)', fontWeight: 500, fontSize: '0.85rem', color: 'var(--text-light)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Trusted by Brands Across Pakistan
          </p>
          <div className="row align-items-center justify-content-center g-4">
            {['LUXE COSMETICS', 'SWEET DELIGHTS', 'TECHZONE', 'GLAMOUR', 'URBAN EATS', 'ORGANIC BLISS', 'PURE PHARMA', 'ELITE FASHION'].map((brand, i) => (
              <div key={i} className="col-lg-auto col-md-3 col-4 text-center" data-aos="fade-up" data-aos-delay={i * 50}>
                <span style={{ 
                  fontFamily: 'var(--font-poppins)', 
                  fontWeight: 700, 
                  fontSize: '0.9rem', 
                  color: 'var(--text-light)',
                  letterSpacing: '1px',
                  opacity: 0.6,
                  filter: 'grayscale(100%)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}>
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="cta-section py-5">
        <div className="container text-center position-relative" style={{ zIndex: 2 }} data-aos="zoom-in">
          <h3 className="text-white mb-3" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700 }}>
            Ready to Elevate Your Packaging?
          </h3>
          <p className="text-white text-opacity-75 mb-4" style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-manrope)' }}>
            Get a free consultation and quote today. Let's create something extraordinary together.
          </p>
          <a href="#quote" className="btn bg-white text-burgundy fw-semibold px-4 py-3 rounded-pill magnetic" 
             style={{ '--bs-text-opacity': 1, color: 'var(--burgundy)', fontFamily: 'var(--font-manrope)' } as React.CSSProperties}>
            Get Your Free Quote <i className="fa-solid fa-arrow-right ms-2"></i>
          </a>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="section-padding" id="industries">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge">Industries Served</div>
            <h2 className="section-title section-title-animated">We Serve Every Industry</h2>
            <p className="section-subtitle mx-auto mt-3">No matter your industry, we have the expertise and materials to create packaging that perfectly fits your needs.</p>
            <div className="premium-divider mx-auto mt-4"></div>
          </div>
          <div className="text-center" data-aos="fade-up">
            {industries.map((industry, i) => (
              <span key={i} className="industry-tag">{industry}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR PROCESS ============ */}
      <section className="section-padding" id="process" style={{ background: '#FAFAFA' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge">How We Work</div>
            <h2 className="section-title section-title-animated">Our Proven Process</h2>
            <p className="section-subtitle mx-auto mt-3">A streamlined six-step process that ensures quality, consistency, and on-time delivery for every order.</p>
            <div className="premium-divider mx-auto mt-4"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="process-timeline">
                {processSteps.map((step, i) => (
                  <ProcessStep key={i} {...step} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MATERIALS ============ */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge">Premium Materials</div>
            <h2 className="section-title section-title-animated">Quality Materials<br />For Every Project</h2>
            <p className="section-subtitle mx-auto mt-3">We source only the finest materials to ensure your packaging looks and feels premium.</p>
            <div className="premium-divider mx-auto mt-4"></div>
          </div>
          <div className="text-center" data-aos="fade-up">
            {materials.map((mat, i) => (
              <span key={i} className="material-tag">{mat}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRINTING OPTIONS ============ */}
      <section className="section-padding" style={{ background: '#FAFAFA' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge">Printing & Finishing</div>
            <h2 className="section-title section-title-animated">Premium Printing<br />& Finishing Options</h2>
            <p className="section-subtitle mx-auto mt-3">Advanced printing technologies and luxurious finishing options to make your packaging truly exceptional.</p>
            <div className="premium-divider mx-auto mt-4"></div>
          </div>
          <div className="row">
            {printingOptions.map((opt, i) => (
              <div key={i} className="col-lg-2 col-md-3 col-4 mb-3" data-aos="fade-up" data-aos-delay={i * 40}>
                <div className="print-option">
                  <i className={opt.icon}></i>
                  <h6>{opt.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBEB 100%)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge">Testimonials</div>
            <h2 className="section-title section-title-animated">What Our Clients Say</h2>
            <p className="section-subtitle mx-auto mt-3">Join hundreds of satisfied clients who trust Sublime Packaging for their branding needs.</p>
            <div className="premium-divider mx-auto mt-4"></div>
          </div>
          <div className="swiper testimonial-swiper" ref={testimonialSwiperRef} data-aos="fade-up">
            <div className="swiper-wrapper pb-5">
              {testimonials.map((t, i) => (
                <div className="swiper-slide h-auto" key={i}>
                  <TestimonialCard {...t} />
                </div>
              ))}
            </div>
            <div className="testimonial-pagination swiper-pagination position-relative"></div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section-padding" id="faq">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge">FAQ</div>
            <h2 className="section-title section-title-animated">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto mt-3">Everything you need to know about our packaging solutions and services.</p>
            <div className="premium-divider mx-auto mt-4"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion faq-accordion" id="faqAccordion" data-aos="fade-up">
                {faqItems.map((faq, i) => (
                  <FAQItem key={i} {...faq} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUOTE / CONTACT ============ */}
      <section className="section-padding" id="quote" style={{ background: '#FAFAFA' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge">Get In Touch</div>
            <h2 className="section-title section-title-animated">Request Your Free Quote</h2>
            <p className="section-subtitle mx-auto mt-3">Fill out the form below and our team will get back to you within 24 hours with a custom quote.</p>
            <div className="premium-divider mx-auto mt-4"></div>
          </div>
          <div className="row g-4">
            <div className="col-lg-7" data-aos="fade-right">
              <div className="glass-card">
                <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Our team will contact you within 24 hours.'); }}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>Full Name *</label>
                      <input type="text" className="form-control-custom" placeholder="Your full name" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>Company Name</label>
                      <input type="text" className="form-control-custom" placeholder="Your company name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>Phone Number *</label>
                      <input type="tel" className="form-control-custom" placeholder="+92 300 1234567" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>Email Address *</label>
                      <input type="email" className="form-control-custom" placeholder="email@example.com" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>Product Type</label>
                      <select className="form-control-custom">
                        <option value="">Select product type</option>
                        <option>Custom Boxes</option>
                        <option>Rigid Boxes</option>
                        <option>Mailer Boxes</option>
                        <option>Corrugated Boxes</option>
                        <option>Food Packaging</option>
                        <option>Cosmetic Boxes</option>
                        <option>Gift Boxes</option>
                        <option>Labels & Stickers</option>
                        <option>Shopping Bags</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>Quantity</label>
                      <input type="number" className="form-control-custom" placeholder="e.g. 500" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>Size (inches)</label>
                      <input type="text" className="form-control-custom" placeholder='e.g. 10x8x4' />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>Material</label>
                      <select className="form-control-custom">
                        <option value="">Select material</option>
                        {materials.map((m, i) => <option key={i}>{m}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>Printing / Finishing</label>
                      <select className="form-control-custom">
                        <option value="">Select finishing</option>
                        {printingOptions.map((p, i) => <option key={i}>{p.name}</option>)}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>Additional Message</label>
                      <textarea className="form-control-custom" placeholder="Tell us more about your requirements..."></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary magnetic w-100">
                        Submit Quote Request <i className="fa-solid fa-paper-plane ms-2"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <div className="glass-card h-100 d-flex flex-column justify-content-center">
                <h4 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '24px' }}>Contact Information</h4>
                
                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="fa-solid fa-location-dot"></i></div>
                  <div>
                    <h6 className="fw-semibold mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>Our Location</h6>
                    <p className="mb-0" style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Lahore, Pakistan</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="fa-solid fa-phone"></i></div>
                  <div>
                    <h6 className="fw-semibold mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>Phone / WhatsApp</h6>
                    <a href={callLink} style={{ color: 'var(--burgundy)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>0327-4337810</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="fa-solid fa-clock"></i></div>
                  <div>
                    <h6 className="fw-semibold mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>Business Hours</h6>
                    <p className="mb-0" style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Mon - Sat: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="mt-3">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success rounded-pill px-4 py-2 me-2 magnetic" style={{ fontFamily: 'var(--font-manrope)', fontWeight: 600, fontSize: '0.9rem' }}>
                    <i className="fa-brands fa-whatsapp me-2"></i> WhatsApp
                  </a>
                  <a href={callLink} className="btn btn-outline rounded-pill px-4 py-2 magnetic" style={{ borderColor: 'var(--burgundy)', color: 'var(--burgundy)', fontFamily: 'var(--font-manrope)', fontWeight: 600, fontSize: '0.9rem' }}>
                    <i className="fa-solid fa-phone me-2"></i> Call Now
                  </a>
                </div>

                {/* Map placeholder */}
                <div className="mt-4 rounded-4 overflow-hidden" style={{ height: '200px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <i className="fa-solid fa-map-location-dot mb-2" style={{ fontSize: '2rem', color: 'var(--burgundy)' }}></i>
                  <span style={{ color: 'var(--text-gray)', fontFamily: 'var(--font-manrope)', fontSize: '0.9rem' }}>Lahore, Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer pt-5 pb-0" id="contact">
        <div className="container pt-4">
          <div className="row g-4">
            <div className="col-lg-4 mb-4">
              <div className="footer-brand mb-3">SUBLIME<span style={{ color: 'var(--premium-yellow)' }}>.</span></div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '300px' }}>
                Premium custom packaging and printing solutions based in Lahore, Pakistan. We help brands create unforgettable unboxing experiences.
              </p>
              <div className="footer-social mt-3">
                <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href={whatsappLink} aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-6 mb-4">
              <h5>Quick Links</h5>
              <ul className="footer-links">
                {['Home', 'Products', 'Industries', 'Why Us', 'Process', 'Gallery', 'FAQ'].map(link => (
                  <li key={link}><a href={`#${link.toLowerCase().replace(/\s/g, '-')}`}>{link}</a></li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 col-6 mb-4">
              <h5>Services</h5>
              <ul className="footer-links">
                {['Custom Boxes', 'Rigid Boxes', 'Food Packaging', 'Cosmetic Boxes', 'Gift Boxes', 'Labels & Stickers', 'Shopping Bags', 'Catalog Printing'].map(s => (
                  <li key={s}><a href="#products">{s}</a></li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 col-md-5 mb-4">
              <h5>Contact</h5>
              <ul className="footer-links">
                <li><i className="fa-solid fa-location-dot me-2" style={{ fontSize: '0.8rem' }}></i> Lahore, Pakistan</li>
                <li><i className="fa-solid fa-phone me-2" style={{ fontSize: '0.8rem' }}></i> <a href={callLink}>0327-4337810</a></li>
                <li><i className="fa-brands fa-whatsapp me-2" style={{ fontSize: '0.8rem' }}></i> <a href={whatsappLink}>WhatsApp Chat</a></li>
                <li><i className="fa-solid fa-clock me-2" style={{ fontSize: '0.8rem' }}></i> Mon-Sat: 9AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom text-center">
            <p className="mb-0" style={{ color: 'rgba(255,255,255,0.4)' }}>
              &copy; {new Date().getFullYear()} Sublime Packaging. All rights reserved. | Premium Packaging Solutions Lahore, Pakistan
            </p>
          </div>
        </div>
      </footer>

      {/* ============ FLOATING BUTTONS ============ */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="floating-btn floating-whatsapp" aria-label="WhatsApp Chat" title="Chat on WhatsApp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
      <a href={callLink} className="floating-btn floating-call" aria-label="Call Now" title="Call Now">
        <i className="fa-solid fa-phone"></i>
      </a>
      <button ref={topBtnRef} className="floating-btn floating-top" onClick={scrollToTop} aria-label="Back to top" title="Back to top">
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
}

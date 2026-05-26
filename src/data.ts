import { Product, SlideData, BrandTheme, ThemeName } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-01",
    name: "Gadwal Silk Saree – Burnt Orange Body with Subtle Checks & Zari Border",
    price: 24000,
    category: "Saree",
    fabricCraft: "Silk, handloom, zari border",
    description: "A refined Gadwal silk saree with a burnt orange body, subtle checks, and a classic zari border. Ideal for weddings, festive occasions, and elegant cultural gatherings.",
    visualTag: "Burnt Orange / Gold",
    colorHex: "#D35400"
  },
  {
    id: "prod-02",
    name: "Gadwal Silk Saree – Dual Tone Lavender & Royal Purple with Zari Border",
    price: 24000,
    category: "Saree",
    fabricCraft: "Silk, handloom, zari border",
    description: "A graceful dual-tone Gadwal silk saree in lavender and royal purple, finished with a zari border for a rich festive and occasion-wear statement.",
    visualTag: "Lavender / Purple",
    colorHex: "#7D3C98"
  },
  {
    id: "prod-03",
    name: "Charcoal Kalamkari Silk Cotton Kurta – Size 40 Ready Measurement",
    price: 8000,
    category: "Kurta",
    fabricCraft: "Silk cotton, Kalamkari-inspired detailing",
    description: "A sophisticated charcoal silk cotton kurta with artisanal Kalamkari character and ready-measurement convenience, designed for refined everyday and occasion dressing.",
    visualTag: "Charcoal / Tan",
    colorHex: "#2C3E50"
  },
  {
    id: "prod-04",
    name: "Deep Olive Floral Silk Cotton Kurta – Size 40 Ready Measurement",
    price: 8000,
    category: "Kurta",
    fabricCraft: "Silk cotton, floral textile expression",
    description: "A deep olive silk cotton kurta with floral detailing, balancing natural fabric comfort with boutique-led ethnic elegance.",
    visualTag: "Deep Olive / Ivy",
    colorHex: "#4C5B5C"
  },
  {
    id: "prod-05",
    name: "Black Kalamkari Sleeve Cotton Blouse",
    price: 5000,
    category: "Blouse",
    fabricCraft: "Cotton, Kalamkari sleeve detail",
    description: "A versatile black cotton blouse with Kalamkari sleeve detailing, designed to pair beautifully with sarees and elevate traditional styling.",
    visualTag: "Black / Earth",
    colorHex: "#111111"
  },
  {
    id: "prod-06",
    name: "Cotton Designer Blouse — Charcoal Floral Motif with Contrast Sleeve Borders",
    price: 4000,
    category: "Designer Blouse",
    fabricCraft: "Cotton, floral motif, contrast sleeve border",
    description: "A refined cotton designer blouse with a deep charcoal base, bold floral motifs, and contrast sleeve borders for a handcrafted boutique finish.",
    visualTag: "Charcoal / Crimson",
    colorHex: "#343A40"
  },
  {
    id: "prod-07",
    name: "Chanderi Mall Dupatta – Classic Border Edit",
    price: 3500,
    category: "Dupatta",
    fabricCraft: "Chanderi, classic border edit",
    description: "A lightweight Chanderi dupatta with a classic border, perfect for styling with kurtas, festive sets, and understated handloom looks.",
    visualTag: "Ivory / Gold",
    colorHex: "#EAECEE"
  },
  {
    id: "prod-08",
    name: "Cotton Ikat Dupatta – Classic Heritage Edit",
    price: 4000,
    category: "Dupatta",
    fabricCraft: "Cotton, Ikat-inspired heritage edit",
    description: "A classic cotton Ikat dupatta designed for versatile styling, adding craft-led character to everyday and semi-formal Indian wear.",
    visualTag: "Crimson / Black",
    colorHex: "#A04000"
  },
  {
    id: "prod-09",
    name: "Gadwal Silk Dupatta – Classic Zari Edit",
    price: 15000,
    category: "Dupatta",
    fabricCraft: "Gadwal silk, zari edit",
    description: "A premium Gadwal silk dupatta with a classic zari finish, ideal for customers seeking rich festive layering and timeless textile value.",
    visualTag: "Maroon / Gold",
    colorHex: "#78281F"
  },
  {
    id: "prod-10",
    name: "Handpainted Kalamkari Dupatta – Black Floral Vine Edit",
    price: 10000,
    category: "Dupatta",
    fabricCraft: "Handpainted Kalamkari, floral vine artwork",
    description: "A statement handpainted Kalamkari dupatta with black floral vine detailing, created for customers who value artisanal expression and textile storytelling.",
    visualTag: "Black / Floral Vine",
    colorHex: "#1C2833"
  },
  {
    id: "prod-11",
    name: "Chhaya Vana Silk Cotton Kaftan – Free Size",
    price: 8000,
    category: "Kaftan",
    fabricCraft: "Silk cotton, relaxed boutique silhouette",
    description: "A free-size silk cotton kaftan with an easy luxury silhouette, combining comfort, movement, and handcrafted ethnic styling.",
    visualTag: "Forest Green / Gold",
    colorHex: "#1E8449"
  },
  {
    id: "prod-12",
    name: "Gajji Silk Dupatta – Bandhani Ajrakh Heritage Edit",
    price: 15000,
    category: "Dupatta",
    fabricCraft: "Gajji silk, Bandhani-Ajrakh heritage expression",
    description: "A premium silk dupatta inspired by Bandhani and Ajrakh traditions, created as a distinctive statement piece for festive and cultural occasions.",
    visualTag: "Indigo / Saffron",
    colorHex: "#2E4053"
  }
];

export const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "STUDIO RAMA",
    subtitle: "Where Heritage Meets Modern Elegance",
    category: "Cover",
    speakerNotes: [
      "Welcome, collaborators, retail partners, and curators. Today we take you through Studio Rama.",
      "Established in Banjara Hills, Hyderabad, Studio Rama is a refined destination for handloom luxury.",
      "We believe ethnic wear should hold an audacious grace—bridging our ancient craft with contemporary confidence."
    ],
    visualMetric: { value: "30+", label: "Years of Design Heritage" }
  },
  {
    id: 2,
    title: "Brand Essence",
    subtitle: "Refining the Luxury Handloom Landscape",
    category: "Brand Essence",
    speakerNotes: [
      "Our core philosophy relies on authentic curation. We do not mass-produce; we celebrate.",
      "Studio Rama curates sarees, kurtas, ready and designer blouses, anarkalis, and dupattas crafted from India's finest handlooms.",
      "Each garment is a testimony to organic natural fabrics, exquisite silk, and meticulous styling tailored for the modern Indian woman."
    ],
    visualMetric: { value: "100%", label: "Handcrafted & Artisanal" }
  },
  {
    id: 3,
    title: "The Market Gap",
    subtitle: "Mass Production vs. Rigid Luxury",
    category: "Market Problem",
    speakerNotes: [
      "Indian ethnic fashion is split between two extremes that alienate discerning consumers.",
      "On one side find mass-produced store designs lacking exclusivity and premium fit.",
      "On the other, rigid, overpriced luxury labels devoid of localized personal designer involvement or custom adjustments.",
      "Discerning women desire exclusive heritage pieces with boutique-level fit-first precision and active personalization."
    ],
    visualMetric: { value: "₹50B+", label: "Unserved Luxury Market Gap" }
  },
  {
    id: 4,
    title: "Our Core Philosophy",
    subtitle: "Crafted with Grace, Worn with Audacity",
    category: "Brand Values",
    speakerNotes: [
      "We build on five central pillars that distinguish our product journey.",
      "Artisanal Heritage: Direct collaboration with master weavers from Kalamkari, Gadwal, Jamdani, and Maheshwari centers.",
      "Premium Quality: Rigid scrutiny on fabric fall, custom measurements, and luxury finishes.",
      "Mindful Making: Progressing towards zero-waste through limited runs and upcycled materials."
    ],
    visualMetric: { value: "5", label: "Core Philosophical Pillars" }
  },
  {
    id: 5,
    title: "The Visionary Eye",
    subtitle: "Rama Rrebbapragada — Founder & Creative Director",
    category: "Founder Profile",
    speakerNotes: [
      "Founder Rama Rrebbapragada represents nearly three decades (30 years) of authoritative design experience.",
      "Rama guides every fabric curation, styling layout, and client custom consultation directly.",
      "Her personal design signature ensures that every piece stays structurally flawless, colorfully bold, and exceptionally comfortable."
    ],
    visualMetric: { value: "30 Yrs", label: "Designer Expertise" }
  },
  {
    id: 6,
    title: "Tastemakers & Patrons",
    subtitle: "Our Highly Affluent & Discerning Audience Segments",
    category: "Target Audience",
    speakerNotes: [
      "Our clientele is comprised of Hyderabad's cultural leaders, high-profile professionals, and tastemakers.",
      "From medical professionals and corporate directors seeking structural comfort and dignity...",
      "To politicians looking for culturally rooted power dressing, and celebrities seeking camera-ready limited editions."
    ],
    visualMetric: { value: "5", label: "Discerning Patron Segments" }
  },
  {
    id: 7,
    title: "The Product Universe",
    subtitle: "Artisanal Curation Across High-Value Realms",
    category: "Product Overview",
    speakerNotes: [
      "Our collections highlight eight fundamental structural categories designed to elevate formal and occasion dressing.",
      "From sarees rooted in Gadwal and Jamdani, to ready-to-wear blouses, structured Chanderi dupattas, and luxurious free-size Kaftans.",
      "Our pricing is structured carefully from ₹3,500 to ₹55,000, aligning premium access with pure textile luxury."
    ],
    visualMetric: { value: "₹3.5k - 55k", label: "Symmetric Price Structure" }
  },
  {
    id: 8,
    title: "Sample Collection Showroom",
    subtitle: "Explore Studio Rama’s Curated Masterpieces",
    category: "Interactive Lookbook",
    speakerNotes: [
      "This slide showcases the exact sample line available in our boutique.",
      "Highlighting our flagship Gadwal Silk sarees in Burnt Orange and Lavender Purple.",
      "Our Kalamkari shirts and blouses highlight traditional print placements, and our dupattas in Gajji silk feature Ajrakh and Bandhani handwork.",
      "Every piece is cataloged with custom tags, pricing, and specific weaver-details."
    ],
    visualMetric: { value: "12", label: "Featured Signature Products" }
  },
  {
    id: 9,
    title: "What Sets Us Apart",
    subtitle: "The Six Structural Points of Differentiation",
    category: "Differentiation",
    speakerNotes: [
      "Studio Rama stands out distinctly. We do not follow typical commercial retail trends.",
      "Heritage Textiles: Curated weaves directly from original handloom centers.",
      "Fit-First Precision: Custom ready measurements that eliminate modern blouse-fitting anxiety.",
      "Understated Edge: High-impact design balancing heritage motifs with modern sleek silhouettes."
    ],
    visualMetric: { value: "6", label: "Unique Brand Pillars" }
  },
  {
    id: 10,
    title: "The Boutique Journey",
    subtitle: "Bespoke Curation with Private Concierge Service",
    category: "Customer Experience",
    speakerNotes: [
      "We respect our clients' privacy and time. Shopping at Studio Rama is an exclusive ceremony.",
      "Step 1: Private Appointment in Banjara Hills, giving unparalleled personal focus.",
      "Step 2 & 3: Curation and Personal Styling directly with Rama Rrebbapragada's design team.",
      "Step 4: Seamless fulfillment with custom tailoring refinements and pristine handovers."
    ],
    visualMetric: { value: "1:1", label: "Personalized Care Model" }
  },
  {
    id: 11,
    title: "Why Studio Rama Wins",
    subtitle: "Creating Social Signaling & Wardrobe Investment Value",
    category: "The Winning Formula",
    speakerNotes: [
      "Studio Rama is built for the long term. Our sarees and kurtas represent timeless family investments.",
      "Through restricted, limited-edition numbers, we guarantee absolute individuality for social appearances.",
      "Our breathable natural fibers ensure long-wearing comfort from daytime state events to grand night celebrations."
    ],
    visualMetric: { value: "98%", label: "Client Return Rate" }
  },
  {
    id: 12,
    title: "Proven Credibility",
    subtitle: "Rooted in Banjara Hills — Connecting Locally and Globally",
    category: "Presence & Proof",
    speakerNotes: [
      "Our physical sanctuary is a premium bespoke studio located in Aditya Residency, Banjara Hills, Road No 3.",
      "Coupled with our high-end digital window at StudioRamaOnline.com, we serve regional connoisseurs and the global diaspora.",
      "This solid foundation positions us perfectly for future high-ticket events and expanding boutique alliances."
    ],
    visualMetric: { value: "Road 3", label: "Premium Banjara Hills Address" }
  },
  {
    id: 13,
    title: "Growth Projections",
    subtitle: "Strategic Avenues to Amplify Brand Horizons",
    category: "Future Strategy",
    speakerNotes: [
      "We project outstanding business scalability via four strategic channels.",
      "Expansion of virtual styling consultations for international luxury shoppers.",
      "Limited Capsule Cohorts showcasing localized capsule drops (e.g. upcycled Ikat lines or Indigo Chanderi sets).",
      "Strategic partnerships with high-tier Indian heritage travel catalogs, premium clubs, and wedding directories."
    ],
    visualMetric: { value: "4x", label: "Target Growth Channels" }
  },
  {
    id: 14,
    title: "Curate with Us",
    subtitle: "Book an Appointment / Secure Partnership",
    category: "Call To Action",
    speakerNotes: [
      "Let us join together to support handloom conservation while dressing the modern Indian woman with unrivaled polish.",
      "We invite you to reach out for private appointments, lookbook queries, or strategic investor discussions.",
      "Connect with Founder Rama Rrebbapragada and step into Hyderabad’s premier experience."
    ],
    visualMetric: { value: "+91 6300", label: "Bespoke Styling Concierge" }
  }
];

export const TIMELINE_EVENTS = [
  { year: "1997-2005", title: "Curation & Textile Research", text: "Rama Rrebbapragada begins researching original weavers across Andhra Pradesh and Telangana, studying weaving tension and natural dying processes." },
  { year: "2006-2015", title: "Private Designing & Tailoring", text: "Providing luxury custom tailoring to Hyderabad's elite, building standard ready dimensions to tackle systemic saree-blouse fit challenges." },
  { year: "2016-2022", title: "Artisanal Collaborations", text: "Solidifying partnerships with master craftspeople of Kalamkari, Gadwal, and Jamdani, focusing on high-contrast contemporary layouts." },
  { year: "2023-Present", title: "Banjara Hills Boutique Launch", text: "Consolidating heritage under Studio Rama and launching the premium brick-and-mortar space alongside StudioRamaOnline.com." }
];

export const THEMES: Record<ThemeName, BrandTheme> = {
  crimsonGold: {
    name: "Crimson & Gold (Heritage Warm)",
    bgClass: "bg-radial from-[#32060A] via-[#1F0305] to-[#100102]",
    cardBg: "bg-[#250508]/85 border-[#421A1F]/70 text-[#FFA07A]",
    textPrimary: "text-[#FCF3CF]",
    textSecondary: "text-[#E59866]",
    accent: "text-[#F1C40F] border-[#D4AF37] hover:bg-[#D4AF37]/10",
    borderClass: "border-[#D4AF37]/45",
    badgeBg: "bg-[#4D0F14] text-[#D4AF37] border-[#D4AF37]/20",
    glowColor: "rgba(212, 175, 55, 0.15)"
  },
  ivoryCharcoal: {
    name: "Sand & Charcoal (Modern Quiet)",
    bgClass: "bg-gradient-to-tr from-[#FAF9F6] via-[#FAF9F6] to-[#F2EFE9]",
    cardBg: "bg-white/90 border-[#D5D0C5] text-[#4A4A4A]",
    textPrimary: "text-[#1A1A1A]",
    textSecondary: "text-[#555555]",
    accent: "text-[#8E704F] border-[#8E704F] hover:bg-[#8E704F]/10",
    borderClass: "border-[#8E704F]/40",
    badgeBg: "bg-[#EAE5D9] text-[#5C4D3C] border-[#B5A992]/30",
    glowColor: "rgba(142, 112, 79, 0.08)"
  },
  forestSand: {
    name: "Forest & Saffron (Artisanal Earth)",
    bgClass: "bg-radial from-[#0C1510] via-[#050D0A] to-[#010403]",
    cardBg: "bg-[#0E1B15]/85 border-[#1B3226]/80 text-[#EAE5D9]",
    textPrimary: "text-[#F4D03F]",
    textSecondary: "text-[#85929E]",
    accent: "text-[#E67E22] border-[#E67E22] hover:bg-[#E67E22]/10",
    borderClass: "border-[#E67E22]/40",
    badgeBg: "bg-[#11241C] text-[#E67E22] border-[#E67E22]/30",
    glowColor: "rgba(230, 126, 34, 0.12)"
  },
  indigoAmethyst: {
    name: "Indigo Jamdani (Royal Mystique)",
    bgClass: "bg-radial from-[#15112B] via-[#0B081A] to-[#04030B]",
    cardBg: "bg-[#1B1636]/80 border-[#322A5E] text-[#D5DBDB]",
    textPrimary: "text-[#EBDEF0]",
    textSecondary: "text-[#BB8FCE]",
    accent: "text-[#AF7AC5] border-[#AF7AC5] hover:bg-[#AF7AC5]/10",
    borderClass: "border-[#AF7AC5]/40",
    badgeBg: "bg-[#251A46] text-[#BB8FCE] border-[#AF7AC5]/30",
    glowColor: "rgba(175, 122, 197, 0.15)"
  }
};

import africanFounderImg from '../assets/images/african_founder.png';
import nfcMatteBlackImg from '../assets/images/nfc_wristband_showcase.png';
import africanWomanImg from '../assets/images/african_woman_executive.png';

export const mockProfileData = {
  name: "Precious Onuigbo",
  username: "precious",
  title: "Product Designer & Creator",
  company: "Enlazer Labs",
  bio: "Designing digital experiences & building next-gen physical NFC networking tools across Africa. Tap to connect or book a call!",
  avatar: africanFounderImg,
  email: "precious@enlazerlabs.africa",
  phone: "+234 803 123 4567",
  website: "https://precious.design",
  location: "Lagos & Abuja, Nigeria",
  theme: "dark-luxe", // 'dark-luxe' | 'neon-cyber' | 'sunset-amber' | 'emerald-green'
  layout: "stack", // 'stack' | 'grid' | 'linktree'
  socials: {
    instagram: "precious.design",
    tiktok: "@precious_creator",
    twitter: "preciousonuigbo",
    whatsapp: "+2348031234567",
    calendly: "https://calendly.com/precious-onuigbo/30min",
    portfolio: "https://precious.design",
    linkedin: "preciousonuigbo",
    youtube: "@precious_builds"
  },
  stats: {
    totalTaps: 1422,
    monthlyTaps: 482,
    uniqueVisitors: 1104,
    leadsCaptured: 348,
    conversionRate: 84
  }
};

export const mockProfileThemes = [
  { id: "dark-luxe", name: "Midnight Obsidian", bg: "bg-slate-950 text-white", border: "border-[#00BCFF]/30", badge: "Most Popular" },
  { id: "neon-cyber", name: "Cyberpunk Glow", bg: "bg-black text-cyan-400", border: "border-cyan-500", badge: "Creator Favorite" },
  { id: "sunset-amber", name: "Sahara Sunset", bg: "bg-amber-950 text-amber-100", border: "border-amber-500/40", badge: "Warm" },
  { id: "emerald-green", name: "Lagos Emerald", bg: "bg-emerald-950 text-emerald-100", border: "border-emerald-500/40", badge: "Fresh" }
];

export const mockProfileLayouts = [
  { id: "stack", name: "Modern Stack", desc: "Balanced bio, quick vCard save & prominent social stack" },
  { id: "grid", name: "Portfolio Grid", desc: "Visual grid tailored for designers, photographers & creators" },
  { id: "linktree", name: "Bio Link First", desc: "High-conversion link buttons prioritizing booking & social channels" }
];

export const mockPricingTiers = {
  cardPrice: 35000,
  currency: "₦",
  proTierMonthly: 3500,
  proTierAnnual: 35000,
  proFeatures: [
    "Custom @username handle (enlazer.app/@yourname)",
    "Real-time tap analytics & location insights",
    "Custom profile themes & layout switching",
    "Unlimited social & booking links (Calendly, WhatsApp, TikTok)",
    "Priority 24/7 card replacement support"
  ]
};

export const mockCardFinishes = [
  {
    id: "finish-1",
    name: "Stealth Matte Black",
    category: "card",
    material: "Deep Matte PVC + Micro NFC Chip",
    tagline: "Sleek, minimalist & ultra durable",
    price: 35000,
    color: "bg-slate-950 text-white",
    cardGradient: "bg-slate-950",
    chipColor: "border-cyan-400/40 text-cyan-400",
    image: nfcMatteBlackImg,
    popular: true
  },
  {
    id: "finish-2",
    name: "Stainless Steel Edition",
    category: "card",
    material: "Laser-Engraved Anodized Steel",
    tagline: "Weighty executive premium finish",
    price: 65000,
    color: "bg-slate-800 text-white",
    cardGradient: "bg-slate-900",
    chipColor: "border-amber-400/60 text-amber-300",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=400",
    popular: false
  },
  {
    id: "finish-3",
    name: "Rose Gold Metallic",
    category: "card",
    material: "Brushed Metallic Alloy",
    tagline: "Unforgettable luxury sheen",
    price: 55000,
    color: "bg-rose-950 text-white",
    cardGradient: "bg-rose-950",
    chipColor: "border-rose-400/60 text-rose-300",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400",
    popular: false
  },
  {
    id: "finish-4",
    name: "Eco Bamboo Wood",
    category: "card",
    material: "Sustainably Sourced Natural Wood",
    tagline: "Organic texture & eco-friendly",
    price: 40000,
    color: "bg-amber-950 text-amber-100",
    cardGradient: "bg-amber-950",
    chipColor: "border-amber-500/50 text-amber-400",
    image: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&q=80&w=400",
    popular: false
  },
  {
    id: "wristband-1",
    name: "Midnight Obsidian Black",
    category: "wristband",
    material: "IP68 Waterproof Eco-Silicone",
    tagline: "Sleek, stealthy & indestructible",
    price: 28000,
    color: "bg-slate-950 text-white",
    cardGradient: "bg-slate-950",
    chipColor: "border-cyan-400/60 text-cyan-300",
    image: nfcMatteBlackImg,
    popular: true
  },
  {
    id: "wristband-2",
    name: "Cyber Cyan Blue",
    category: "wristband",
    material: "IP68 Waterproof Eco-Silicone",
    tagline: "Vibrant high-visibility tech finish",
    price: 28000,
    color: "bg-cyan-700 text-white",
    cardGradient: "bg-cyan-950",
    chipColor: "border-cyan-400/60 text-cyan-300",
    image: nfcMatteBlackImg,
    popular: false
  },
  {
    id: "wristband-3",
    name: "Sahara Sunset Orange",
    category: "wristband",
    material: "IP68 Waterproof Eco-Silicone",
    tagline: "Bold, energetic statement style",
    price: 28000,
    color: "bg-amber-600 text-white",
    cardGradient: "bg-amber-950",
    chipColor: "border-amber-400/60 text-amber-300",
    image: nfcMatteBlackImg,
    popular: false
  },
  {
    id: "wristband-4",
    name: "Neon Emerald Green",
    category: "wristband",
    material: "IP68 Waterproof Eco-Silicone",
    tagline: "Fresh, premium matte finish",
    price: 28000,
    color: "bg-emerald-600 text-white",
    cardGradient: "bg-emerald-950",
    chipColor: "border-emerald-400/60 text-emerald-300",
    image: nfcMatteBlackImg,
    popular: false
  }
];

export const mockNfcFaqs = [
  {
    id: "faq-1",
    question: "Do people need an app to read my Enlazer Card?",
    answer: "No app required! Enlazer Card works natively with 100% of modern iPhones and Android smartphones. Just tap your physical card against the back of their phone, and your custom digital profile opens instantly in their web browser."
  },
  {
    id: "faq-2",
    question: "Can I update my links & handle after purchasing?",
    answer: "Yes! Your physical Enlazer Card links to your dynamic personal profile. You can update your phone, Instagram, TikTok, Calendly, or portfolio anytime from your Enlazer dashboard, and your card reflects changes live."
  },
  {
    id: "faq-3",
    question: "What if someone's phone doesn't support NFC tap?",
    answer: "Every physical Enlazer Card includes a crisp dynamic QR code on the back. People can scan it with their standard camera app."
  },
  {
    id: "faq-4",
    question: "Who is Enlazer built for?",
    answer: "Enlazer is designed for high-networking individuals: Content Creators, Freelancers, Consultants (photographers, real estate agents, designers), and event-goers in Lagos & Abuja who want an unforgettable personal impression."
  },
  {
    id: "faq-5",
    question: "How does pricing work?",
    answer: "Simple! Pay once for your custom physical NFC card (₦35,000). You get a free digital profile forever. Upgrade to Enlazer Pro (₦3,500/mo) for a custom @username handle, deep analytics, and premium profile customization."
  }
];

export const mockRecentLeads = [
  {
    id: "lead-1",
    name: "Amaka Adebayo",
    role: "VP of Growth @ Paystack",
    time: "2 mins ago",
    method: "NFC Tap",
    email: "amaka@paystack.com"
  },
  {
    id: "lead-2",
    name: "Tunde Bakare",
    role: "Managing Partner @ Kuda Capital",
    time: "1 hour ago",
    method: "NFC Tap",
    email: "tbakare@kudacapital.com"
  },
  {
    id: "lead-3",
    name: "Zainab Bello",
    role: "Head of Product @ Flutterwave",
    time: "3 hours ago",
    method: "QR Scan",
    email: "zainab.bello@flutterwave.com"
  }
];

export const mockTeamCards = [
  {
    id: "team-1",
    name: "Precious Onuigbo",
    email: "precious@enlazerlabs.africa",
    title: "Founder & CPO",
    department: "Executive",
    cardUid: "ENL-9921-NFC",
    finish: "Stealth Matte Black",
    status: "Active",
    taps: 1422
  },
  {
    id: "team-2",
    name: "Amina Bello",
    email: "amina@enlazerlabs.africa",
    title: "Chief Operating Officer",
    department: "Operations",
    cardUid: "ENL-8842-NFC",
    finish: "Stainless Steel Edition",
    status: "Active",
    taps: 984
  },
  {
    id: "team-3",
    name: "Chidi Okafor",
    email: "chidi@enlazerlabs.africa",
    title: "Head of Enterprise Sales",
    department: "Sales",
    cardUid: "ENL-7714-NFC",
    finish: "Stealth Matte Black",
    status: "Active",
    taps: 712
  },
  {
    id: "team-4",
    name: "Tariq Danjuma",
    email: "tariq@enlazerlabs.africa",
    title: "Lead Frontend Engineer",
    department: "Engineering",
    cardUid: "ENL-6630-NFC",
    finish: "Eco Bamboo Wood",
    status: "Deactivated",
    taps: 320
  }
];

export const mockAnalyticsHourly = [
  { hour: "08:00 AM", taps: 24, unique: 18 },
  { hour: "10:00 AM", taps: 68, unique: 52 },
  { hour: "12:00 PM", taps: 142, unique: 110 },
  { hour: "02:00 PM", taps: 198, unique: 154 },
  { hour: "04:00 PM", taps: 165, unique: 128 },
  { hour: "06:00 PM", taps: 94, unique: 76 },
  { hour: "08:00 PM", taps: 45, unique: 34 }
];

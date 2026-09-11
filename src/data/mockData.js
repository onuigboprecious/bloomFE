import africanFounderImg from '../assets/images/african_founder.png';
import nfcMatteBlackImg from '../assets/images/nfc_wristband_showcase.png';
import africanWomanImg from '../assets/images/african_woman_executive.png';
import africanMaleCorporateImg from '../assets/images/african_male_corporate.png';
import africanFemaleRealtorImg from '../assets/images/african_female_realtor.png';
import africanMaleDeveloperImg from '../assets/images/african_male_developer.png';

export const mockProfileData = {
  name: "Alex Morgan",
  username: "alexmorgan",
  title: "Product Designer & Creator",
  company: "Enlazer Studio",
  bio: "Designing digital experiences & building next-gen physical NFC profile cards across Nigeria. Tap to connect or download my vCard!",
  avatar: africanFounderImg,
  email: "alex.morgan@enlazer.com.ng",
  phone: "+234 803 123 4567",
  website: "https://alexmorgan.design",
  location: "buja, Nigeria",
  theme: "dark-luxe", // 'dark-luxe' | 'neon-cyber' | 'sunset-amber' | 'emerald-green'
  layout: "stack", // 'stack' | 'grid' | 'linktree'
  is_published: false, // Core state: Draft by default until published
  cardShippingStatus: "pending_publish", // "pending_publish" | "processing" | "shipped" | "delivered"
  customDomain: null, // Custom domain add-on (e.g. "alexmorgan.ng")
  socials: {
    instagram: "alexmorgan.design",
    tiktok: "@alexmorgan_creator",
    twitter: "alexmorgandesign",
    whatsapp: "+2348031234567",
    calendly: "https://calendly.com/alex-morgan/30min",
    portfolio: "https://alexmorgan.design",
    linkedin: "alexmorgandesign",
    youtube: "@alexmorgan_builds"
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
  currency: "₦",
  publishPrice: 19999,
  customDomainPrice: 15000,
  freeFeatures: [
    "100% Free to build & customize your profile",
    "Pick your @username handle (enlazer.cloud/@yourname)",
    "Unlimited social, WhatsApp, email & portfolio links",
    "Instant live private preview draft as you edit",
    "Select from curated themes & card layouts"
  ],
  publishFeatures: [
    "Everything in Free to Build",
    "Page goes public & live instantly at your handle",
    "FREE custom NFC Smart Card or Wristband included",
    "Free nationwide doorstep delivery across Nigeria",
    "Instant vCard contact auto-save for tap recipients",
    "Real-time tap analytics & location insights",
    "Edit links, bio & design anytime (no re-payment needed)"
  ],
  customDomainFeatures: [
    "Connect your own custom domain (e.g. yourname.ng)",
    "SSL certificate & automatic DNS management",
    "Remove Enlazer branding from your profile page footer"
  ]
};

export const mockCardFinishes = [
  {
    id: "finish-1",
    name: "Stealth Matte Black",
    category: "card",
    material: "Deep Matte PVC + Micro NFC Chip",
    tagline: "Sleek, minimalist & ultra durable",
    price: 19999,
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
    price: 19999,
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
    price: 19999,
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
    price: 19999,
    color: "bg-amber-950 text-amber-100",
    cardGradient: "bg-amber-950",
    chipColor: "border-amber-500/50 text-amber-400",
    image: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&q=80&w=400",
    popular: false
  },
  {
    id: "wristband-1",
    name: "Midnight Obsidian Wristband",
    category: "wristband",
    material: "IP68 Waterproof Eco-Silicone",
    tagline: "Sleek, stealthy & indestructible",
    price: 19999,
    color: "bg-slate-950 text-white",
    cardGradient: "bg-slate-950",
    chipColor: "border-cyan-400/60 text-cyan-300",
    image: nfcMatteBlackImg,
    popular: true
  },
  {
    id: "wristband-2",
    name: "Cyber Cyan Wristband",
    category: "wristband",
    material: "IP68 Waterproof Eco-Silicone",
    tagline: "Vibrant high-visibility tech finish",
    price: 19999,
    color: "bg-cyan-700 text-white",
    cardGradient: "bg-cyan-950",
    chipColor: "border-cyan-400/60 text-cyan-300",
    image: nfcMatteBlackImg,
    popular: false
  }
];

export const mockNfcFaqs = [
  {
    id: "faq-1",
    question: "Is it really free to start? When do I pay?",
    answer: "Yes, 100% free! You can sign up, claim your handle, build your complete digital profile, upload your avatar, add unlimited links, and preview your live page draft without entering any credit card or payment info. You only pay (₦19,999) when you are ready to publish your page live — and your payment includes a free custom NFC card or wristband shipped straight to your door!"
  },
  {
    id: "faq-2",
    question: "What happens if I build my page but don't publish immediately?",
    answer: "Your draft profile is safely saved in your private Enlazer builder. You can log back in anytime, edit your links, try different design themes, and publish whenever you're ready. Your handle remains reserved for you."
  },
  {
    id: "faq-3",
    question: "How does the free NFC card work?",
    answer: "When you click 'Publish Page' and complete checkout (via Paystack or Flutterwave), we prompt you to select your preferred physical card finish (Stealth Black, Rose Gold, Stainless Steel, Eco Bamboo, or Silicone Wristband) and enter your Nigerian delivery address. We encode your unique handle into the NFC chip and ship it free to your doorstep."
  },
  {
    id: "faq-4",
    question: "Can I update my links, bio, or handle after publishing?",
    answer: "Yes! Your physical NFC card points dynamically to your live hosted profile URL (`enlazer.cloud/@yourname`). Any edits you make in your dashboard — changing phone numbers, adding new social channels, updating your portfolio — reflect live instantly without needing a new card or any extra payment."
  },
  {
    id: "faq-5",
    question: "Does NFC tap work on all smartphones across Nigeria?",
    answer: "Yes! NFC tap works natively on 100% of modern iPhones and Android smartphones (no app download needed). For older phones without active NFC support, every Enlazer physical card includes a dynamic QR code on the back that opens your profile when scanned."
  },
  {
    id: "faq-6",
    question: "How long does doorstep delivery take in Nigeria?",
    answer: "Orders in Lagos and Abuja arrive within 24 to 48 hours. Orders across all other Nigerian states (Port Harcourt, Ibadan, Enugu, Kano, etc.) arrive within 2 to 4 business days with live SMS tracking."
  }
];

export const mockTestimonialsList = [
  {
    id: 1,
    title: "Freelance Photography Portfolio",
    desc: "I used to lose leads because clients forgot to type out my Instagram or phone number after event shoots. With Enlazer, I built my free page, published, and tapped my free card at a Lagos wedding. Booked three clients the same week!",
    name: "Tomi Adebayo",
    role: "Freelance Photographer • Lagos",
    avatar: africanFounderImg,
    badge: "Verified Professional",
    bannerBg: "bg-slate-900"
  },
  {
    id: 2,
    title: "Beauty Studio & Creator Branding",
    desc: "Building my profile page was totally free and took 3 minutes. When I published, getting the Rose Gold NFC card delivered free to my studio in Ikeja was the ultimate bonus. My clients love tapping it!",
    name: "Chidinma Okonkwo",
    role: "Founder, Chidinma Beauty Studio",
    avatar: africanWomanImg,
    badge: "Verified Creator",
    bannerBg: "bg-[#051B2C]"
  },
  {
    id: 3,
    title: "Corporate Real Estate Lead Capture",
    desc: "I meet dozens of high-net-worth buyers at property inspections in Abuja. Paper cards get thrown away. My Enlazer profile lets buyers save my vCard and view property links directly on their phone in half a second.",
    name: "Amaka Nwachukwu",
    role: "Real Estate Consultant • Abuja",
    avatar: africanFemaleRealtorImg,
    badge: "Verified Consultant",
    bannerBg: "bg-emerald-950"
  },
  {
    id: 4,
    title: "Software Engineering & Startup Founder",
    desc: "Enlazer got the flow completely right — free builder, private preview, and paying on publish. The NFC card tap works effortlessly with every phone I've tested. It's the ultimate tech flex.",
    name: "Dayo Kalu",
    role: "Software Engineer & Startup Founder • Lagos",
    avatar: africanMaleDeveloperImg,
    badge: "Verified Founder",
    bannerBg: "bg-slate-900"
  },
  {
    id: 5,
    title: "Management & Energy Consultant",
    desc: "In corporate consulting, a modern digital presence is non-negotiable. Enlazer replaced my paper stacks with a clean hosted page. Being able to update my WhatsApp and Calendly links anytime without reprinting is a game-changer.",
    name: "Engr. Bassey Udoh",
    role: "Energy Consultant • Port Harcourt",
    avatar: africanMaleCorporateImg,
    badge: "Verified Executive",
    bannerBg: "bg-slate-900"
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
    name: "Alex Morgan",
    email: "alex.morgan@enlazer.com.ng",
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


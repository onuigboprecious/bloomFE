import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Watch, Droplet, Zap, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Rss, Activity, Award, UserCheck, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import OrderModal from '../order-modal/OrderModal';
import InteractiveWristband3D from '../features/InteractiveWristband3D';
import WristbandShowcaseSection from '../features/WristbandShowcaseSection';

export const NfcWristbandsPage = () => {
  const { cardFinishes, setSelectedFinish, setIsOrderModalOpen, setCurrentPage } = useApp();

  const wristbandProduct = cardFinishes.find((f) => f.category === 'wristband') || {
    id: "finish-5",
    name: "Bloom Active NFC Wristband",
    category: "wristband",
    material: "IP68 Waterproof Eco-Silicone",
    tagline: "Hands-free smart wearable for active networking",
    price: 28000
  };

  const wristbandFeatures = [
    {
      icon: Droplet,
      title: "IP68 Waterproof & Sweatproof",
      desc: "Engineered with sealed eco-silicone. Wear it in the gym, pool, beach, or rain without losing NFC signal."
    },
    {
      icon: Zap,
      title: "Hands-Free Instant Tap",
      desc: "Tap your wrist against any modern iPhone or Android to instantly launch your dynamic web handle."
    },
    {
      icon: ShieldCheck,
      title: "Dual-Hardware Sync",
      desc: "Pair your Bloom Card for formal meetings & your NFC Wristband for workout or VIP event networking."
    },
    {
      icon: Activity,
      title: "Laser Precision Custom Branding",
      desc: "Personalized laser etching with your name, company logo, or unique handle for high-impact presence."
    }
  ];

  const useCases = [
    {
      title: "Fitness Pros & Athletes",
      desc: "Share your coaching calendar, Instagram, and booking link directly from your wrist while at the gym or trail.",
      tag: "Active Fitness"
    },
    {
      title: "VIP Event & Festival Networking",
      desc: "No wallet or phone searching required. Tap wrists with attendees to exchange contact details in half a second.",
      tag: "Nightlife & VIP"
    },
    {
      title: "Founders & Creators on the Move",
      desc: "Casual, effortless icebreaker during coffee runs, sports games, or outdoors when carrying cards isn't practical.",
      tag: "Everyday Wear"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <Navbar />

      {/* NFC Wristband Showcase Section */}
      <WristbandShowcaseSection />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default NfcWristbandsPage;

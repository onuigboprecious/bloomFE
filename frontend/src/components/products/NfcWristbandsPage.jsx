import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Watch, Droplet, Zap, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Rss, Activity, Award, UserCheck, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import OrderModal from '../order-modal/OrderModal';
import InteractiveWristband3D from '../features/InteractiveWristband3D';

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

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-[#00BCFF] dark:text-cyan-400 text-xs font-extrabold tracking-wide uppercase">
            <Watch className="w-3.5 h-3.5" />
            <span>NFC Wearable Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Wear Your Network. <br className="hidden sm:inline" />
            <span className="text-[#00BCFF]">
              Tap Hands-Free Anywhere.
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            Meet the Bloom NFC Wristband—crafted with IP68 waterproof eco-silicone for active creators, founders, fitness pros, and VIP event-goers who demand instant connections on the go.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => {
                setSelectedFinish(wristbandProduct);
                setIsOrderModalOpen(true);
              }}
              className="px-8 py-3.5 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-400/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Order NFC Wristband</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#interactive-3d"
              className="px-7 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white text-slate-900 dark:text-white font-extrabold text-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
            >
              <span>View 3D Interactive Model</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3D Interactive Wristband Container */}
      <section id="interactive-3d" className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive 3D Wristband Viewer
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Rotate, inspect, and experience high-density eco-silicone with integrated micro-NFC architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: 3D Interactive Wristband Component */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-slate-50 dark:bg-slate-950 p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl min-h-[420px] flex items-center justify-center">
                <InteractiveWristband3D />
              </div>
            </div>

            {/* Right: Product Spec & Instant Purchase Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#00BCFF]/20 border border-[#00BCFF]/40 text-[#00BCFF] text-xs font-extrabold uppercase tracking-wider">
                    ★ Active Wearable
                  </span>
                  <span className="text-2xl font-black text-[#00BCFF]">₦{wristbandProduct.price.toLocaleString()}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-white">{wristbandProduct.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{wristbandProduct.material}</p>
                </div>

                <div className="space-y-2 text-xs font-semibold text-slate-300 border-t border-slate-800/80 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0" />
                    <span>IP68 Sealed Waterproof (Swim & Gym Ready)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0" />
                    <span>Laser Engraved Name / Social Handle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0" />
                    <span>Syncs with your Bloom Card & Digital Profile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0" />
                    <span>100% Native iPhone & Android Tap Support</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedFinish(wristbandProduct);
                    setIsOrderModalOpen(true);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#00BCFF] hover:bg-cyan-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-400/30 transition-all cursor-pointer"
                >
                  Order Wristband Now
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Hardware Technical Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00BCFF]">Built for Extreme Durability</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for Active Life & Extreme Conditions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Designed to withstand water, sweat, impact, and outdoor heat while keeping your digital connections active.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wristbandFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-[#00BCFF] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">{feat.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00BCFF]">Tailored For You</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Where People Wear Bloom Wristbands</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <div key={i} className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
                <span className="px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-[#00BCFF] dark:text-cyan-400 text-[10px] font-extrabold uppercase tracking-wider">
                  {uc.tag}
                </span>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-xl">{uc.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Order CTA */}
      <section className="py-20 bg-[#00BCFF] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">Get Your Bloom Active NFC Wristband Today</h2>
          <p className="text-cyan-50 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            Stay connected wherever you go. Order now and pair your wristband with your Bloom digital handle.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setSelectedFinish(wristbandProduct);
                setIsOrderModalOpen(true);
              }}
              className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              Order Wristband (₦28,000)
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <OrderModal />
    </div>
  );
};

export default NfcWristbandsPage;

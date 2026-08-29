import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, RefreshCw, Layers, CreditCard, Rss, Sliders, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CardShowcaseSection = () => {
  const { setSelectedFinish, cardFinishes, setIsOrderModalOpen, setCurrentPage } = useApp();

  const cardProducts = cardFinishes.filter((f) => f.category !== 'wristband');
  const [activeCard, setActiveCard] = useState(cardProducts[0] || cardFinishes[0]);

  const features = [
    {
      icon: Zap,
      title: "NXP NTAG216 Microchip",
      desc: "Ultra-fast 13.56 MHz NFC frequency with 888 bytes memory & 100,000+ tap lifetime."
    },
    {
      icon: ShieldCheck,
      title: "Universal 100% Compatibility",
      desc: "Native instant tap with 100% modern iPhones & Android devices. Zero app required."
    },
    {
      icon: RefreshCw,
      title: "Dynamic Cloud Syncing",
      desc: "Update your contact info, social links & portfolio anytime from your dashboard."
    },
    {
      icon: Layers,
      title: "Dual Hardware (NFC + QR)",
      desc: "High-precision laser-etched dynamic QR code on back for maximum versatility."
    }
  ];

  return (
    <section id="nfc-cards" className="relative -mt-20 pt-24 sm:pt-28 md:pt-32 pb-16 bg-[#F8FAFC] dark:bg-slate-950 transition-colors overflow-hidden">
      {/* Ambient Backdrop Glow for Seamless Navbar Blend */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-400/15 via-cyan-400/5 to-transparent pointer-events-none z-0 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            The Last Business Card <br className="hidden sm:inline" />
            <span className="text-[#00BCFF]">You'll Ever Need.</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            Make unforgettable connections in 0.5 seconds. Tap your custom Enlazer Card on any smartphone to share your dynamic contact info, social handles, and portfolio instantly.
          </p>
        </div>

        {/* Main Grid: Visual Product Showcase + Detail Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Active Card Preview + Finishes Switcher + Blue Action Button */}
          <div className="lg:col-span-6 flex flex-col items-center space-y-6">
            <motion.div
              key={activeCard.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className={`relative aspect-[1.586/1] rounded-3xl p-7 shadow-2xl ${activeCard.color} border border-white/20 text-white flex flex-col justify-between overflow-hidden group transition-all`}>

                {/* Card Header */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight font-['Plus_Jakarta_Sans']">enlazer</span>
                    <span className="w-2 h-2 rounded-full bg-[#00BCFF] animate-pulse" />
                  </div>
                  {/* Micro NFC Icon Badge */}
                  <div className={`px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 ${activeCard.chipColor}`}>
                    <Rss className="w-3 h-3" />
                    <span>NFC 13.56 MHz</span>
                  </div>
                </div>

                {/* Chip Graphic & Finish Badge */}
                <div className="z-10 my-4 flex items-center justify-between">
                  <div className="w-12 h-9 rounded-md bg-amber-300/30 border border-amber-300/60 flex items-center justify-center">
                    <div className="w-8 h-5 border border-amber-400/80 rounded flex items-center justify-center">
                      <div className="w-4 h-3 bg-amber-400/40 rounded-xs" />
                    </div>
                  </div>
                  {activeCard.popular && (
                    <span className="px-3 py-1 rounded-full bg-[#00BCFF] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Card Footer Info */}
                <div className="z-10 space-y-1">
                  <span className="text-xs text-white/70 font-semibold tracking-wider block uppercase">{activeCard.material}</span>
                  <h3 className="text-xl font-black text-white tracking-wide">{activeCard.name}</h3>
                </div>

              </div>
            </motion.div>

            {/* Quick Card Finishes Switcher List (Moved to Left Side under Preview) */}
            <div className="w-full max-w-md space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block text-center">
                Select Premium Hardware Finish
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cardProducts.map((finish) => {
                  const isSelected = activeCard.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      onClick={() => setActiveCard(finish)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between shadow-xs ${isSelected
                        ? 'border-[#00BCFF] bg-cyan-50/50 dark:bg-cyan-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                    >
                      <div className="space-y-0.5 truncate pr-1">
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white block truncate">
                          {finish.name}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">{finish.material}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 shrink-0">
                        ₦{finish.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blue Action Button */}
            <button
              onClick={() => {
                setSelectedFinish(activeCard);
                setIsOrderModalOpen(true);
              }}
              className="w-full max-w-md px-7 py-3.5 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Order {activeCard.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: 4 Feature Cards Grid */}
          <div className="lg:col-span-6 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-[#00BCFF] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CardShowcaseSection;

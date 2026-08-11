import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Zap, Sparkles, Sliders, CheckCircle2, ArrowRight, Rss, Layers, Smartphone, RefreshCw, Award, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import OrderModal from '../order-modal/OrderModal';
import CardCustomizer from '../features/CardCustomizer';

export const NfcCardsPage = () => {
  const { cardFinishes, setSelectedFinish, setIsOrderModalOpen, setCurrentPage } = useApp();
  
  const cardProducts = cardFinishes.filter((f) => f.category !== 'wristband');
  const [activeCard, setActiveCard] = useState(cardProducts[0] || cardFinishes[0]);

  const hardwareSpecs = [
    {
      icon: Zap,
      title: "NXP NTAG216 Microchip",
      desc: "Ultra-fast 13.56 MHz NFC frequency with 888 bytes memory, 100,000+ tap lifetime & 10-year data retention."
    },
    {
      icon: ShieldCheck,
      title: "Universal 100% Compatibility",
      desc: "Native instant tap with 100% modern iPhones & Android devices. Zero app download required for receiver."
    },
    {
      icon: RefreshCw,
      title: "Dynamic Cloud Syncing",
      desc: "Update your contact info, social links, portfolio & payment details anytime from your Bloom dashboard."
    },
    {
      icon: Layers,
      title: "Dual Hardware (NFC + Dynamic QR)",
      desc: "Includes high-precision laser-etched dynamic QR code on back for maximum compatibility anywhere."
    }
  ];

  const finishFeatures = [
    "Durable & Scratch Resistant Coating",
    "Embedded High-Range NFC Antenna",
    "Free Dynamic Profile Link (bloom.app/@username)",
    "Lifetime Account & Analytics Included",
    "Express Delivery Across Nigeria"
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-[#00BCFF] dark:text-cyan-400 text-xs font-extrabold tracking-wide uppercase">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Bloom Smart NFC Cards</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            The Last Business Card <br className="hidden sm:inline" />
            <span className="text-[#00BCFF]">
              You'll Ever Need.
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            Make unforgettable connections in 0.5 seconds. Tap your custom Bloom Card on any smartphone to share your dynamic contact info, social handles, and portfolio instantly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => setCurrentPage('customizer')}
              className="px-7 py-3.5 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-400/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Launch Card Builder</span>
            </button>
            <button
              onClick={() => {
                setSelectedFinish(activeCard);
                setIsOrderModalOpen(true);
              }}
              className="px-7 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white text-slate-900 dark:text-white font-extrabold text-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
            >
              <span>Order Pre-made Finish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Card Finish Gallery */}
      <section className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Select Your Premium Finish
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Engineered with high-density materials, laser precision, and micro-NFC chip architecture.
            </p>
          </div>

          {/* Cards Switcher Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Active Card Showcase Card */}
            <div className="lg:col-span-6 flex justify-center">
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
                      <span className="text-2xl font-black tracking-tight font-['Plus_Jakarta_Sans']">bloom</span>
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
                        ★ Most Popular
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
            </div>

            {/* Right: Finishes Selection List */}
            <div className="lg:col-span-6 space-y-3">
              {cardProducts.map((finish) => {
                const isSelected = activeCard.id === finish.id;
                return (
                  <div
                    key={finish.id}
                    onClick={() => setActiveCard(finish)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#00BCFF] bg-cyan-50/50 dark:bg-cyan-950/40 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">{finish.name}</h4>
                        {finish.popular && (
                          <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-[#00BCFF] text-[10px] font-bold">Popular</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{finish.material}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-slate-900 dark:text-white block">₦{finish.price.toLocaleString()}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFinish(finish);
                          setIsOrderModalOpen(true);
                        }}
                        className={`mt-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#00BCFF] text-white hover:bg-cyan-500'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* Hardware Technical Specifications */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00BCFF]">Engineered for Reliability</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            High Performance Micro-NFC Architecture
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Every Bloom Card is quality-tested to guarantee zero-lag response time on all iOS and Android devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hardwareSpecs.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-[#00BCFF] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">{spec.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed">{spec.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Feature Checkmarks list */}
        <div className="mt-14 p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold">Included With Every Bloom Card Order</h3>
            <p className="text-xs text-slate-400 max-w-xl font-medium">
              No hidden fees, app store subscriptions, or setup costs. Pay once for your physical card and keep your dynamic profile forever.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-200">
            {finishFeatures.map((feat, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Card Builder Section */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00BCFF]">Live Customizer Teaser</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Design & Personalize Your Card Live</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Add your photo, custom handle, links, and select your card finish right now.</p>
          </div>

          <CardCustomizer />
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-[#00BCFF] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">Ready to Upgrade Your First Impression?</h2>
          <p className="text-cyan-50 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            Join thousands of creators, founders, executives, and active networkers across Lagos & Abuja using Bloom.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentPage('customizer')}
              className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              Start Building Your Card
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <OrderModal />
    </div>
  );
};

export default NfcCardsPage;

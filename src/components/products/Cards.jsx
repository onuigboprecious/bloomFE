import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  ShieldCheck,
  RefreshCw,
  Layers,
  Rss,
  ArrowRight,
  Star,
  Smartphone,
  Infinity as InfinityIcon,
  Minus,
  Plus,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Cards = () => {
  const { setSelectedFinish, cardFinishes, setIsOrderModalOpen } = useApp();

  const cardProducts = cardFinishes.filter((f) => f.category !== 'wristband');
  const [activeCard, setActiveCard] = useState(cardProducts[0] || cardFinishes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleOrderClick = () => {
    setIsLoading(true);
    setSelectedFinish({ ...activeCard, quantity });
    setTimeout(() => {
      setIsOrderModalOpen(true);
      setIsLoading(false);
    }, 250);
  };

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
    <section id="nfc-cards" className="relative pt-10 sm:pt-16 md:pt-20 pb-12 sm:pb-16 bg-[#F8FAFC] dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Grid: Visual Product Showcase + Detail Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

          {/* Left Column: Active Card Preview + Finishes Switcher */}
          <div className="lg:col-span-6 flex flex-col items-center space-y-5">
            <motion.div
              key={activeCard.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className={`relative aspect-[1.586/1] rounded-3xl p-5 sm:p-7 ${activeCard.color} border border-white/20 text-white flex flex-col justify-between overflow-hidden group transition-all`}>
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black tracking-tight font-['Plus_Jakarta_Sans']">enlazer</span>
                    <span className="w-2 h-2 rounded-full bg-[#00BCFF] animate-pulse" />
                  </div>
                  <div className={`px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 ${activeCard.chipColor}`}>
                    <Rss className="w-3 h-3" />
                    <span>NFC 13.56 MHz</span>
                  </div>
                </div>
                <div className="z-10 my-3 sm:my-4 flex items-center justify-between">
                  <div className="w-11 h-8 sm:w-12 sm:h-9 rounded-md bg-amber-300/30 border border-amber-300/60 flex items-center justify-center">
                    <div className="w-7 h-4 sm:w-8 sm:h-5 border border-amber-400/80 rounded flex items-center justify-center">
                      <div className="w-3.5 h-2.5 sm:w-4 sm:h-3 bg-amber-400/40 rounded-xs" />
                    </div>
                  </div>
                  {activeCard.popular && (
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#00BCFF] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="z-10 space-y-0.5 sm:space-y-1">
                  <span className="text-[10px] sm:text-xs text-white/70 font-semibold tracking-wider block uppercase">{activeCard.material}</span>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">{activeCard.name}</h3>
                </div>
              </div>
            </motion.div>

            {/* Quick Card Finishes Switcher List (Compact 2-col on mobile) */}
            <div className="w-full max-w-md space-y-2.5 pt-1">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block text-center">
                Select Hardware Finish
              </span>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {cardProducts.map((finish) => {
                  const isSelected = activeCard.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      onClick={() => setActiveCard(finish)}
                      className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between shadow-xs ${isSelected
                        ? 'border-[#00BCFF] bg-cyan-50/50 dark:bg-cyan-950/40 shadow-sm ring-1 ring-[#00BCFF]'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                    >
                      <div className="space-y-0.5 truncate pr-1">
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white block truncate">{finish.name}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">{finish.material}</span>
                      </div>
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 shrink-0">
                        ₦{finish.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Product Details Card */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm">
              
              {/* ============================================================ */}
              {/* MOBILE-FIRST CONDENSED VIEW (Visible on mobile: block sm:hidden) */}
              {/* ============================================================ */}
              <div className="block sm:hidden space-y-4">
                {/* Title & Rating / Stock Line */}
                <div className="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    {activeCard.name}
                  </h2>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4.8</span>
                      <span className="text-slate-500 font-normal dark:text-slate-400">(576)</span>
                    </div>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Ships today</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <span className="text-2xl font-black text-cyan-600 dark:text-[#00BCFF]">
                    ₦{(activeCard.price * quantity).toLocaleString()}
                  </span>
                </div>

                {/* Subtitle Pitch */}
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                  Tap your card, share everything — no app needed.
                </p>

                {/* Quantity + Add to Cart Row */}
                <div className="flex items-center gap-3 pt-1">
                  {/* Quantity [- 1 +] */}
                  <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center font-bold active:scale-95 shadow-xs"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-black text-slate-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center font-bold active:scale-95 shadow-xs"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleOrderClick}
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-400/20 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-80"
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Add to Cart</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Bullet Points */}
                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Unlimited taps, forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Works on iPhone & Android</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Update your info anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Tap or scan — your choice</span>
                  </div>
                </div>

                {/* Delivery Note */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 text-center font-medium">
                  Free delivery calculated at checkout
                </p>
              </div>

              {/* ============================================================ */}
              {/* DESKTOP VIEW (Visible on tablet/desktop: hidden sm:block)    */}
              {/* ============================================================ */}
              <div className="hidden sm:block space-y-6">
                {/* Product Title, Rating & Stock Header */}
                <div className="space-y-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                      {activeCard.name}
                    </h2>
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs shrink-0 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>In stock, ready to ship</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-extrabold text-slate-900 dark:text-white">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>4.8</span>
                    <span className="text-slate-500 font-normal dark:text-slate-400">(576 reviews)</span>
                  </div>
                </div>

                {/* Pricing & Free Delivery */}
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-3xl font-black text-cyan-600 dark:text-[#00BCFF]">
                      ₦{(activeCard.price * quantity).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Free delivery calculated at checkout
                  </p>
                </div>

                {/* Value Pitch Subtitle */}
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Share your contact info, socials, and portfolio with just a tap — no app, no printing, no running out of cards.
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between py-2.5 px-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Quantity
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white flex items-center justify-center shadow-xs hover:bg-slate-100 dark:hover:bg-slate-600 transition-all cursor-pointer active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-black text-slate-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white flex items-center justify-center shadow-xs hover:bg-slate-100 dark:hover:bg-slate-600 transition-all cursor-pointer active:scale-95"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleOrderClick}
                  disabled={isLoading}
                  className="w-full px-6 py-4 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-extrabold text-base shadow-lg shadow-cyan-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-80"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Loading Checkout...</span>
                    </span>
                  ) : (
                    <>
                      <span>Order {activeCard.name} ({quantity})</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Why people love it */}
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Why people love it
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-[#00BCFF] flex items-center justify-center shrink-0 mt-0.5">
                        <InfinityIcon className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                        <strong className="font-bold text-slate-900 dark:text-white">Never run out</strong> — one card, unlimited taps, forever
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-[#00BCFF] flex items-center justify-center shrink-0 mt-0.5">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                        <strong className="font-bold text-slate-900 dark:text-white">Works with any phone</strong> — iPhone or Android, no app needed
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-[#00BCFF] flex items-center justify-center shrink-0 mt-0.5">
                        <Truck className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                        <strong className="font-bold text-slate-900 dark:text-white">Delivered anywhere</strong> — nationwide shipping
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-[#00BCFF] flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                        <strong className="font-bold text-slate-900 dark:text-white">Your info, your control</strong> — secure and always private
                      </p>
                    </div>
                  </div>
                </div>

                {/* What makes it smart */}
                <div className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    What makes it smart
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#00BCFF]" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Instant tap, every time
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal pl-6">
                        A high-speed chip built to last 100,000+ taps — share your details in under a second, for years.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#00BCFF]" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Works on every modern phone
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal pl-6">
                        No app to download. No compatibility issues. Just tap and your profile opens instantly.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-[#00BCFF]" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Update anytime, from anywhere
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal pl-6">
                        Changed your number or added a new link? Update your card's info from your dashboard — no need to reprint or reorder.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#00BCFF]" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Two ways to connect
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal pl-6">
                        Tap it, or scan the QR code on the back — whichever works best for the person you're meeting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cards;

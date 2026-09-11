import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockPricingTiers } from '../../data/mockData';

export const PricingSection = () => {
  const { setCurrentPage, isAuthenticated } = useApp();

  const handleStartBuilding = () => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('signup');
    }
  };

  return (
    <section id="pricing" className="py-20 bg-slate-50 dark:bg-[#070F1E] text-slate-900 dark:text-white transition-colors relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <span className="text-[#00BCFF] text-xs sm:text-sm font-extrabold tracking-wider uppercase shrink-0">
              SIMPLE, TRANSPARENT PRICING
            </span>
            <span className="hidden sm:inline-block text-[#00BCFF] text-2xl sm:text-3xl font-extrabold select-none opacity-90">
              |
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Build it free. Pay only when you're ready to go live.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            No credit card needed to design your profile. Every publish plan includes a free custom NFC card or wristband delivered anywhere in Nigeria.
          </p>
        </motion.div>

        {/* 2 Main Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">

          {/* TIER 1: FREE TO BUILD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all relative"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Step 1: Draft & Design
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Free to Build
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Build, customize & preview your page in real-time.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono">
                  ₦0
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  / forever free draft
                </span>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800" />

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {mockPricingTiers.freeFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={handleStartBuilding}
                className="w-full py-3.5 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white text-slate-900 dark:text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Build Your Free Page
              </button>
            </div>
          </motion.div>

          {/* TIER 2: PUBLISH & LAUNCH (FEATURED) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 text-white border-2 border-[#00BCFF] rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#00BCFF] text-slate-950 text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-md">
              Includes Free NFC Card
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block">
                  Step 2: Go Live & Connect
                </span>
                <h3 className="text-2xl font-black text-white">
                  Publish & Get Your Free Card
                </h3>
                <p className="text-xs text-slate-300">
                  Makes your profile live + ships your free NFC card.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  ₦19,000
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / one-time payment
                </span>
              </div>

              <div className="h-px bg-slate-800" />

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                {mockPricingTiers.publishFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#00BCFF]/20 text-[#00BCFF] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className={idx === 2 ? "font-bold text-[#00BCFF]" : ""}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={handleStartBuilding}
                className="w-full py-3.5 rounded-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Start Free, Pay at Publish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default PricingSection;

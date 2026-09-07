import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Globe from './Globe';
import sampleImg from '../../assets/images/sample.png';

export const HeroSection = () => {
  const { setCurrentPage, isAuthenticated } = useApp();
  const [handleInput, setHandleInput] = useState('');

  const handleStartBuilding = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('signup');
    }
  };

  return (
    <section id="hero" className="relative -mt-20 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 transition-colors min-h-[580px] sm:min-h-[640px] md:min-h-[700px] flex items-center justify-center">

      {/* 3D Globe Background Layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] sm:w-[1400px] md:w-[1600px] h-[780px] pointer-events-none opacity-80 z-0 flex items-center justify-center">
        <div className="w-full h-full">
          <Globe />
        </div>
      </div>

      {/* Main Foreground Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-4 pt-1 sm:pt-2 md:pt-4 my-auto"
        >

          {/* Central Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-[1.15]">
            <span>Meet once. </span>
            <span className="block sm:inline-block text-[#0066FF] dark:text-[#00BCFF]">
              Stay connected forever.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed pt-1 px-2">
            Build your free hosted profile page in under 2 minutes. Share your bio, WhatsApp, socials, and portfolio — and get a free custom NFC card shipped when you go live.
          </p>

          {/* Handle Reservation / Quick Start Form */}
          <form onSubmit={handleStartBuilding} className="pt-3 max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-2.5 px-2">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold text-slate-400 select-none">
                enlazer.app/@
              </span>
              <input
                type="text"
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="yourname"
                className="w-full pl-28 pr-4 py-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-[#00BCFF]"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <span>Build your free page</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Guarantee Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Instant private live preview</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Free NFC Card on publish</span>
            </div>
          </div>

          {/* Interactive Showcase Mockup Image */}
          <div className="pt-6 sm:pt-8 max-w-4xl mx-auto px-0 sm:px-2">
            <div className="relative bg-transparent transition-all flex items-center justify-center">
              <img
                src={sampleImg}
                alt="Enlazer Hosted Digital Profile Page & Free NFC Card Preview"
                className="w-full h-auto object-contain max-h-[460px] sm:max-h-[540px] md:max-h-[620px] scale-105 sm:scale-100 mx-auto drop-shadow-2xl"
              />
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;


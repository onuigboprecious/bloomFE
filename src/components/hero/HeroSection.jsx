import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Globe from './Globe';
import sampleImg from '../../assets/images/sample.png';

export const HeroSection = () => {
  const { setCurrentPage } = useApp();

  return (
    <section id="hero" className="relative -mt-20 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 transition-colors min-h-[560px] sm:min-h-[620px] md:min-h-[680px] flex items-center justify-center">

      {/* 4x Scaled 3D Globe Network Arcs Layered Directly Behind Main Headline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] sm:w-[1400px] md:w-[1600px] h-[780px] pointer-events-none opacity-85 z-0 flex items-center justify-center">
        <div className="w-full h-full">
          <Globe />
        </div>
      </div>

      {/* Main Foreground Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">

        {/* Main Central Headline Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-3 sm:space-y-4 pt-1 sm:pt-2 md:pt-4 my-auto"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-[1.15]">
            <span>Meet once. </span>
            <span className="block sm:inline-block whitespace-nowrap text-[#0F172A] dark:text-white">
              Stay connected forever.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed pt-1 px-2">
            Share your contact details, social profiles, and business portfolio in under half a second with modern NFC smart cards & wristbands.
          </p>

          {/* CTA Button linked to products */}
          <div className="pt-2 sm:pt-3 flex justify-center items-center">
            <button
              onClick={() => setCurrentPage('cards')}
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
              <span>Explore Products & Order Now</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Sample Product Showcase Image */}
          <div className="pt-4 sm:pt-6 max-w-4xl mx-auto px-2">
            <div className="relative bg-transparent transition-all flex items-center justify-center">
              <img
                src={sampleImg}
                alt="Enlazer NFC Smart Cards & Wristbands Product Showcase"
                className="w-full h-auto object-contain max-h-[380px] sm:max-h-[480px] md:max-h-[580px] mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;

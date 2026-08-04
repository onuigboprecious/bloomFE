import React from 'react';
import { motion } from 'framer-motion';
import HeroShowcase from './HeroShowcase';
import Globe from './Globe';
import { useApp } from '../../context/AppContext';

export const HeroSection = () => {
  const { setIsOrderModalOpen } = useApp();

  return (
    <section id="hero" className="relative pt-8 md:pt-12 pb-12 overflow-hidden bg-white dark:bg-slate-950 transition-colors min-h-[760px]">

      {/* 4x Scaled 3D Globe Network Arcs Layered Directly Behind Main Headline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] sm:w-[1600px] h-[800px] pointer-events-none opacity-85 z-0 flex items-center justify-center">
        <div className="w-full h-full">
          <Globe />
        </div>
      </div>

      {/* Main Foreground Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Main Headline Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto space-y-2.5 sm:space-y-4 pt-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-[1.12]">
            <span>Meet once. </span>
            <span className="block sm:inline-block whitespace-nowrap">Stay connected forever.</span>
          </h1>
        </motion.div>

        {/* Hero CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 mb-10 flex justify-center"
        >
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="px-8 py-3.5 text-base font-bold bg-[#00BCFF] hover:bg-cyan-500 text-white rounded-full shadow-lg shadow-cyan-400/35 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            get cards by bloom.
          </button>
        </motion.div>

        {/* Hero Visual Mockups Showcase */}
        <HeroShowcase />
      </div>
    </section>
  );
};

export default HeroSection;

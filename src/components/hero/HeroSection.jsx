import React from 'react';
import { motion } from 'framer-motion';
import Globe from './Globe';
import { Sparkles, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="hero" className="relative pt-6 sm:pt-10 md:pt-16 pb-8 sm:pb-12 md:pb-16 overflow-hidden bg-white dark:bg-slate-950 transition-colors min-h-[560px] sm:min-h-[620px] md:min-h-[680px] flex items-center justify-center">

      {/* 4x Scaled 3D Globe Network Arcs Layered Directly Behind Main Headline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] sm:w-[1400px] md:w-[1600px] h-[780px] pointer-events-none opacity-85 z-0 flex items-center justify-center">
        <div className="w-full h-full">
          <Globe />
        </div>
      </div>

      {/* Main Foreground Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">

        {/* Mobile & Tablet Staggered Top Cards (visible on screens < lg) */}
        <div className="flex lg:hidden justify-between items-center max-w-sm sm:max-w-md mx-auto mb-4 sm:mb-6 px-1">
          {/* Mobile Card 1 */}
          <div className="w-[48%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-xl p-3 text-left shadow-md -rotate-5 pointer-events-none">
            <div className="flex items-center space-x-1 mb-1 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">
              <Zap className="w-3 h-3 text-cyan-500" />
              <span>NFC TAP SPEED</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mb-0.5">&lt; 0.5s</div>
            <div className="text-[10px] text-slate-600 dark:text-slate-300 mb-1.5 leading-tight">Instant Contact Share</div>
            <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase bg-cyan-50 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-slate-700">
              ⚡ ZERO APP
            </div>
          </div>

          {/* Mobile Card 2 */}
          <div className="w-[48%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-xl p-3 text-left shadow-md rotate-4 -mt-3 pointer-events-none">
            <div className="flex items-center space-x-1 mb-1 text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">
              <Sparkles className="w-3 h-3 text-purple-500" />
              <span>NETWORKING</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mb-0.5">+340%</div>
            <div className="text-[10px] text-slate-600 dark:text-slate-300 mb-1.5 leading-tight">Saved Connections</div>
            <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-slate-700">
              ✨ HIGH ROI
            </div>
          </div>
        </div>

        {/* Desktop Floating Cards (visible on screens >= lg) */}
        
        {/* Desktop Card 1: Top Left - Slanted -5 deg */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:block absolute left-6 xl:left-12 -top-3 xl:-top-6 w-60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 text-left shadow-lg -rotate-5 pointer-events-none"
        >
          <div className="flex items-center space-x-1.5 mb-2 text-xs font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
            <Zap className="w-3.5 h-3.5 text-cyan-500" />
            <span>NFC TAP SPEED</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
            &lt; 0.5s
          </div>
          <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-3">
            Instant Contact & Social Sharing
          </div>
          <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-cyan-50 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-slate-700">
            ⚡ ZERO APP REQUIRED
          </div>
        </motion.div>

        {/* Desktop Card 2: Top Right - Slanted +4 deg */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block absolute right-2 xl:right-6 -top-10 xl:-top-14 w-60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 text-left shadow-lg rotate-4 pointer-events-none"
        >
          <div className="flex items-center space-x-1.5 mb-2 text-xs font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>SMART NETWORKING</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
            +340%
          </div>
          <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-3">
            More Saved Connections
          </div>
          <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-slate-700">
            ✨ HIGH ROI NETWORKING
          </div>
        </motion.div>

        {/* Desktop Card 3: Bottom Left - Slanted +3 deg */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:block absolute left-0 xl:left-2 -bottom-10 xl:-bottom-14 w-60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 text-left shadow-lg rotate-3 pointer-events-none"
        >
          <div className="flex items-center space-x-1.5 mb-2 text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>ENTERPRISE TECH</span>
          </div>
          <div className="flex items-center text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
            99.99%
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ml-2" />
          </div>
          <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-3">
            Real-time Contact Sync
          </div>
          <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-slate-700">
            🛡️ AES-256 ENCRYPTED
          </div>
        </motion.div>

        {/* Desktop Card 4: Bottom Right - Slanted -3 deg */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:block absolute right-6 xl:right-12 -bottom-4 xl:-bottom-6 w-60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 text-left shadow-lg -rotate-3 pointer-events-none"
        >
          <div className="flex items-center space-x-1.5 mb-2 text-xs font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />
            <span>LEAD CAPTURE</span>
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">#1 Rank</span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-emerald-200/80 dark:border-slate-700">+240%</span>
          </div>
          <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
            Automated CRM & Lead Sync
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#00BCFF] h-full w-[85%] rounded-full" />
          </div>
        </motion.div>

        {/* Main Central Headline Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-2.5 sm:space-y-4 pt-1 sm:pt-2 md:pt-4 my-auto"
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
        </motion.div>

        {/* Mobile & Tablet Staggered Bottom Cards (visible on screens < lg) */}
        <div className="flex lg:hidden justify-between items-center max-w-sm sm:max-w-md mx-auto mt-4 sm:mt-6 px-1">
          {/* Mobile Card 3 */}
          <div className="w-[48%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-xl p-3 text-left shadow-md rotate-3 pointer-events-none">
            <div className="flex items-center space-x-1 mb-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>ENTERPRISE</span>
            </div>
            <div className="flex items-center text-xl font-extrabold text-slate-900 dark:text-white mb-0.5">
              99.99%
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1.5" />
            </div>
            <div className="text-[10px] text-slate-600 dark:text-slate-300 mb-1.5 leading-tight">Real-time Sync</div>
            <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-slate-700">
              🛡️ ENCRYPTED
            </div>
          </div>

          {/* Mobile Card 4 */}
          <div className="w-[48%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-xl p-3 text-left shadow-md -rotate-3 -mt-2 pointer-events-none">
            <div className="flex items-center space-x-1 mb-1 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">
              <TrendingUp className="w-3 h-3 text-cyan-500" />
              <span>LEAD CAPTURE</span>
            </div>
            <div className="flex items-baseline space-x-1 mb-0.5">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">#1 Rank</span>
              <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-800 px-1 py-0.5 rounded border border-emerald-200/80 dark:border-slate-700">+240%</span>
            </div>
            <div className="text-[10px] text-slate-600 dark:text-slate-300 mb-1.5 leading-tight">Automated CRM Sync</div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1 overflow-hidden">
              <div className="bg-[#00BCFF] h-full w-[85%] rounded-full" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

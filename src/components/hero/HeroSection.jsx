import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Globe from './Globe';

export const HeroSection = () => {
  const { openWaitlistModal, setCurrentPage } = useApp() || {};

  const handleCtaClick = () => {
    if (openWaitlistModal) {
      openWaitlistModal();
    } else if (setCurrentPage) {
      setCurrentPage('signup');
    }
  };

  return (
    <section id="hero" className="relative -mt-20 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 overflow-hidden bg-[#F8FAFC] dark:bg-[#030712] text-slate-900 dark:text-white transition-colors duration-300 min-h-[85vh] flex items-center justify-center">

      {/* 3D Globe Background Layer */}
      <div className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 w-[1200px] sm:w-[1400px] md:w-[1600px] h-[780px] pointer-events-none opacity-25 dark:opacity-30 z-0 flex items-center justify-center">
        <div className="w-full h-full">
          <Globe />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full pt-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.06] max-w-4xl mx-auto">
            <span>Your whole self,</span>
            <span className="block text-[#00BCFF] mt-1 sm:mt-2">one tap away.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed px-2">
            Create your profile, add your WhatsApp, socials and portfolio, then share it all with one simple tap.
          </p>

          {/* Trust Badges with Green Checkmarks */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Instant private live preview</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Free NFC Card on publish</span>
            </div>
          </div>

          {/* Real-Life Physical CR80 Dimensions NFC Smart Card Preview */}
          <div className="pt-8 sm:pt-12 max-w-[420px] sm:max-w-[460px] mx-auto">
            <div className="relative w-full aspect-[1.586/1] bg-slate-900 border border-slate-800/90 rounded-2xl p-6 sm:p-7 shadow-2xl text-white backdrop-blur-2xl text-left overflow-hidden flex flex-col justify-between">
              
              {/* Card Header: Brand Logo + NFC Icon */}
              <div className="flex items-center justify-between relative z-10">
                <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white select-none">
                  enlazer<span className="text-[#00BCFF]">.</span>
                </span>

                {/* NFC Contactless Wave Symbol with Glowing Ripple Effect */}
                <div className="relative flex items-center justify-center">
                  {/* Outer Ripple Ring 1 */}
                  <motion.span
                    animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                    className="absolute w-10 h-10 rounded-full border border-[#00BCFF] bg-[#00BCFF]/20 pointer-events-none"
                  />
                  {/* Outer Ripple Ring 2 */}
                  <motion.span
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: 0.7, ease: "easeOut" }}
                    className="absolute w-10 h-10 rounded-full border border-[#00BCFF]/40 bg-[#00BCFF]/10 pointer-events-none"
                  />

                  {/* Core NFC Icon Container */}
                  <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800/70 border border-[#00BCFF]/50 flex items-center justify-center text-[#00BCFF] shadow-lg shadow-[#00BCFF]/30 backdrop-blur-md">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BCFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8.5 14.5A4 4 0 0 1 8.5 9.5" />
                      <path d="M12 17.5A8 8 0 0 0 12 6.5" />
                      <path d="M15.5 20.5A12 12 0 0 0 15.5 3.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Footer: Metadata */}
              <div className="flex items-end justify-between relative z-10 pt-2 border-t border-slate-800/40">
                <div>
                  <span className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                    PERSONAL NFC
                  </span>
                  <span className="block text-base sm:text-lg font-bold text-white tracking-wide mt-0.5">
                    Mara Osel
                  </span>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                    TAP TO CONNECT
                  </span>
                  <span className="block text-xs sm:text-sm font-medium text-slate-200 tracking-wide mt-0.5">
                    enlazer.cloud/mara
                  </span>
                </div>
              </div>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;

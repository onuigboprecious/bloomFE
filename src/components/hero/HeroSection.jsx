import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Globe from './Globe';

// 1. Facebook Icon (Blue Circle)
const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#1877F2" />
    <path
      d="M66.7 54.4l2.4-15.6H53.9V28.7c0-4.3 2.1-8.5 8.9-8.5h6.9V6.9S63.4 5.8 57.4 5.8c-12.7 0-21 7.7-21 21.6v11.4H22.7v15.6h13.7V94.2c2.8.4 5.6.7 8.5.7 2.9 0 5.7-.3 8.5-.7V54.4h13.3z"
      fill="white"
    />
  </svg>
);

// 2. Instagram Splatter Icon
const InstagramSplatterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="ig-splatter-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path
      d="M50 4 C66 1, 86 10, 93 26 C100 42, 94 67, 86 82 C78 96, 56 99, 41 95 C26 91, 5 83, 3 63 C1 43, 12 23, 26 9 C36 1, 41 5, 50 4 Z"
      fill="url(#ig-splatter-grad)"
    />
    <rect x="27" y="27" width="46" height="46" rx="13" stroke="white" strokeWidth="5.5" fill="none" />
    <circle cx="50" cy="50" r="11" stroke="white" strokeWidth="5.5" fill="none" />
    <circle cx="62.5" cy="37.5" r="3.5" fill="white" />
  </svg>
);

// 3. WhatsApp Splatter Icon
const WhatsAppSplatterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="wa-splatter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#25D366" />
        <stop offset="100%" stopColor="#128C7E" />
      </linearGradient>
    </defs>
    <path
      d="M50 4 C68 2, 88 12, 94 28 C100 44, 93 68, 85 82 C76 96, 54 99, 38 95 C22 91, 5 80, 3 60 C1 40, 15 20, 28 8 C38 0, 42 5, 50 4 Z"
      fill="url(#wa-splatter-grad)"
    />
    <path
      d="M50 21 C34.5 21 22 33.5 22 49 C22 54.5 23.5 59.5 26.1 63.8 L23 75 L34.7 72 C39 74.3 44.3 75.6 50 75.6 C65.5 75.6 78 63.1 78 47.6 C78 32.1 65.5 21 50 21 Z"
      fill="white"
    />
    <path
      d="M62 55 C61.1 54.5 56.5 52.2 55.6 51.9 C54.7 51.5 54 51.3 53.3 52.3 C52.6 53.3 50.8 55.4 50.2 56.1 C49.6 56.8 49 56.9 48.1 56.4 C44.7 54.7 42.4 53.2 40.1 49.2 C39.4 48.1 40.5 48.2 41.5 46.3 C41.7 45.9 41.5 45.3 41.2 44.7 C40.9 44.1 39 39.9 38.2 38 C37.4 36.1 36.6 36.4 36 36.4 C35.4 36.4 34.8 36.4 34.1 36.4 C33.4 36.4 32.4 36.7 31.5 37.6 C30.6 38.6 28 40.9 28 45.8 C28 50.7 31.6 55.4 32.1 56.1 C32.6 56.8 39 66.8 48.8 71 C53.6 73 56.4 72.8 58.7 72 C61.3 71.2 64.9 69.1 65.7 66.9 C66.5 64.7 66.5 62.8 66.2 62.3 C65.9 61.8 65.2 61.5 64.3 61 L62 55 Z"
      fill="#128C7E"
    />
  </svg>
);

// 4. Gmail Colored Icon
const GmailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <path fill="#4285F4" d="M14 30v40c0 4.4 3.6 8 8 8h10V48L14 30z" />
    <path fill="#34A853" d="M68 78h10c4.4 0 8-3.6 8-8V30L68 48v30z" />
    <path fill="#FBBC04" d="M68 22v26L86 30c0-5.5-4.8-9.3-10-6.5L68 22z" />
    <path fill="#EA4335" d="M22 22l28 21 28-21c-1.7-1.3-3.8-2-6-2H28c-2.2 0-4.3.7-6 2z" />
    <path fill="#C5221F" d="M14 30l18 18V22l-9 1.5C18.5 24.5 14 24.2 14 30z" />
  </svg>
);

// 5. Contacts / Profile Icon (Blue Circle)
const ContactsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#1A73E8" />
    <filter id="contact-shadow" x="0" y="0" width="100%" height="100%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.2" />
    </filter>
    <circle cx="50" cy="35" r="14" fill="white" filter="url(#contact-shadow)" />
    <path
      d="M29.5 68.5 C29.5 57 38.5 48.5 50 48.5 C61.5 48.5 70.5 57 70.5 68.5 C70.5 70 69.5 71 68 71 H32 C30.5 71 29.5 70 29.5 68.5 Z"
      fill="white"
      filter="url(#contact-shadow)"
    />
  </svg>
);

export const HeroSection = () => {
  const { openWaitlistModal, setCurrentPage } = useApp() || {};

  // Generate randomized entry delays for the 6 background icons on mount
  const iconDelays = React.useMemo(() => {
    const defaultDelays = [0.1, 0.35, 0.6, 0.2, 0.45, 0.75];
    return defaultDelays.sort(() => Math.random() - 0.5);
  }, []);

  const handleCtaClick = () => {
    if (openWaitlistModal) {
      openWaitlistModal();
    } else if (setCurrentPage) {
      setCurrentPage('signup');
    }
  };

  return (
    <section id="hero" className="relative -mt-20 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 overflow-hidden bg-white dark:bg-[#070F1E] text-slate-900 dark:text-white transition-colors duration-300 min-h-[85vh] flex items-center justify-center">

      {/* 3D Globe Background Layer */}
      <div className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 w-[1200px] sm:w-[1400px] md:w-[1600px] h-[780px] pointer-events-none opacity-25 dark:opacity-30 z-0 flex items-center justify-center">
        <div className="w-full h-full">
          <Globe />
        </div>
      </div>

      {/* DECORATIVE SLANTED BRAND ICONS (RANDOM ENTRY SEQUENCE) */}

      {/* Position 1: Top-Left (Facebook Icon - Slanted Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: iconDelays[0], ease: "backOut" }}
        className="absolute top-24 left-5 sm:left-10 md:left-16 z-20 pointer-events-none -rotate-12 drop-shadow-xl"
      >
        <FacebookIcon className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform" />
      </motion.div>

      {/* Position 2: Mid-Left (Instagram Splatter - Slanted Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: iconDelays[1], ease: "backOut" }}
        className="absolute top-[44%] left-3 sm:left-8 md:left-14 z-20 pointer-events-none rotate-12 drop-shadow-xl"
      >
        <InstagramSplatterIcon className="w-9 h-9 sm:w-11 sm:h-11 hover:scale-110 transition-transform" />
      </motion.div>

      {/* Position 3: Bottom-Left (WhatsApp Splatter - Slanted Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: iconDelays[2], ease: "backOut" }}
        className="absolute bottom-28 left-5 sm:left-12 md:left-20 z-20 pointer-events-none -rotate-15 drop-shadow-xl"
      >
        <WhatsAppSplatterIcon className="w-9 h-9 sm:w-11 sm:h-11 hover:scale-110 transition-transform" />
      </motion.div>

      {/* Position 4: Top-Right (Gmail Icon - Slanted Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: iconDelays[3], ease: "backOut" }}
        className="absolute top-20 right-5 sm:right-10 md:right-16 z-20 pointer-events-none rotate-12 drop-shadow-xl"
      >
        <GmailIcon className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform" />
      </motion.div>

      {/* Position 5: Mid-Right (Google Contacts / Profile Icon - Slanted Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: iconDelays[4], ease: "backOut" }}
        className="absolute top-[42%] right-3 sm:right-8 md:right-14 z-20 pointer-events-none -rotate-12 drop-shadow-xl"
      >
        <ContactsIcon className="w-9 h-9 sm:w-11 sm:h-11 hover:scale-110 transition-transform" />
      </motion.div>

      {/* Position 6: Bottom-Right (Instagram Splatter - Slanted Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: iconDelays[5], ease: "backOut" }}
        className="absolute bottom-24 right-5 sm:right-12 md:right-20 z-20 pointer-events-none rotate-15 drop-shadow-xl"
      >
        <InstagramSplatterIcon className="w-9 h-9 sm:w-11 sm:h-11 hover:scale-110 transition-transform" />
      </motion.div>


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

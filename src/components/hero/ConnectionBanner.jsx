import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import handshakeImg from '../../assets/images/handshake.png';

export const ConnectionBanner = () => {
  const { setCurrentPage } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#070F1E] text-slate-900 dark:text-white relative overflow-hidden transition-colors">
      {/* Background Ambient Radial Glow - Dark mode ambient highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hidden dark:block bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-4xl mx-auto mb-10 sm:mb-14">
          {/* Tag + Heading with Vertical Divider */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <span className="text-[#0066FF] dark:text-[#00BCFF] text-xs sm:text-sm font-extrabold tracking-wider uppercase shrink-0">
              YOUR NEXT CONNECTION
            </span>
            <span className="hidden sm:inline-block text-[#0066FF] dark:text-[#00BCFF] text-2xl sm:text-3xl font-extrabold select-none opacity-90">
              |
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Make every handshake stick.
            </h2>
          </div>

          {/* Subtitle Description */}
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed pt-1">
            Choose your card, wristband, or both—personalised and delivered across Nigeria.
          </p>

          {/* CTA Button */}
          <div className="pt-3 flex justify-center">
            <button
              onClick={() => setCurrentPage('cards')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0066FF] hover:bg-blue-700 text-white dark:bg-[#00BCFF] dark:hover:bg-cyan-400 dark:text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-blue-500/20 dark:shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <span>Order from Enlazer</span>
              <ArrowRight className="w-4 h-4 text-white dark:text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Full-Width Image Container - Stretches to Left & Right Screen Edges */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full relative flex justify-center items-center px-0 overflow-hidden z-10"
      >
        <img
          src={handshakeImg}
          alt="Enlazer NFC Wristband and Smart Phone Tap Connection Handshake Showcase"
          className="w-full min-w-full h-auto object-cover block mix-blend-multiply dark:mix-blend-normal [mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)]"
        />
      </motion.div>
    </section>
  );
};

export default ConnectionBanner;

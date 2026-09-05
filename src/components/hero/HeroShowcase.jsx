import React from 'react';
import { motion } from 'framer-motion';
import phoneHandImg from '../../assets/images/phone-hand-new.png';

export const HeroShowcase = () => {
  return (
    <section id="how-it-works" className="pt-16 sm:pt-24 pb-0 bg-[#070F1E] text-white relative overflow-hidden transition-colors">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-5xl mx-auto mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <span className="text-[#00BCFF] text-xs font-extrabold tracking-wider uppercase shrink-0">
              Seamless NFC Experience
            </span>
            <span className="hidden sm:inline-block text-[#00BCFF] text-2xl sm:text-3xl font-extrabold select-none opacity-90">
              |
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Tap to Share. Collect Leads. Sync Instantly.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Experience how easy it is to share your contact details and build valuable professional connections in under half a second.
          </p>
        </div>

        {/* Center Phone Hand Image Only - Flush with Bottom */}
        <div className="w-full flex justify-center items-end z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl relative flex justify-center items-end px-2"
          >
            <img
              src={phoneHandImg}
              alt="Enlazer Contact Details Phone Showcase"
              className="w-full h-auto object-contain max-h-[1250px] md:max-h-[1250px] block align-bottom"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroShowcase;

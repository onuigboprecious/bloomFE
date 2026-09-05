import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import phoneHandImg from '../../assets/images/phone-hand-new.jpg';

export const HeroShowcase = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#070F1E] text-white relative overflow-hidden transition-colors">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#00BCFF] text-xs font-extrabold tracking-wider uppercase shrink-0">
              <Zap className="w-3.5 h-3.5" />
              <span>Seamless NFC Experience</span>
            </div>
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

        {/* Center Phone Hand Image Only */}
        <div className="flex justify-center items-center z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[420px] sm:max-w-[480px] relative flex justify-center items-center"
          >
            <img
              src={phoneHandImg}
              alt="Enlazer Contact Details Phone Showcase"
              className="w-full h-auto object-contain max-h-[600px] rounded-[36px] border-4 border-slate-800 shadow-2xl shadow-cyan-500/20"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroShowcase;

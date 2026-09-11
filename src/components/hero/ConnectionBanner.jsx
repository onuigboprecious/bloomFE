import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import handshakeImg from '../../assets/images/handshake.png';

export const ConnectionBanner = () => {
  const { setCurrentPage, isAuthenticated } = useApp();

  const handleCtaClick = () => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('signup');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#070F1E] text-slate-900 dark:text-white relative overflow-hidden transition-colors">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00BCFF]/10 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-4xl mx-auto mb-10 sm:mb-14"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <span className="text-[#00BCFF] text-xs sm:text-sm font-extrabold tracking-wider uppercase shrink-0">
              HOSTED DIGITAL PROFILE
            </span>
            <span className="hidden sm:inline-block text-[#00BCFF] text-2xl sm:text-3xl font-extrabold select-none opacity-90">
              |
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Make every connection stick.
            </h2>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed pt-1">
            Build your page free with your unique handle. Pay ₦19,000 only when you're ready to publish — and your custom NFC card or wristband is delivered free across Nigeria.
          </p>
        </motion.div>

      </div>

      {/* Full-Width Showcase Image */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full relative flex justify-center items-center px-0 overflow-hidden z-10"
      >
        <img
          src={handshakeImg}
          alt="Enlazer Hosted Digital Profile Connection Handshake Showcase"
          className="w-full min-w-full h-auto object-cover block shadow-2xl"
        />
      </motion.div>
    </section>
  );
};

export default ConnectionBanner;

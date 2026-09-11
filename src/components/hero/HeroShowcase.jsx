import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Palette, CreditCard, CheckCircle2 } from 'lucide-react';
import phoneHandImg from '../../assets/images/phone-hand-new.png';
import mobilePhoneHandImg from '../../assets/images/mobile-phone-hand-new.png';

export const HeroShowcase = () => {
  const steps = [
    {
      num: "01",
      icon: UserPlus,
      title: "Sign up free",
      desc: "Reserve your custom @handle (enlazer.cloud/@yourname) and set up your account. No credit card or payment info needed."
    },
    {
      num: "02",
      icon: Palette,
      title: "Build your page",
      desc: "Add your bio, WhatsApp, Instagram, LinkedIn, Calendly & portfolio. Customize your theme and preview your live private draft in real-time."
    },
    {
      num: "03",
      icon: CreditCard,
      title: "Publish & get your free card",
      desc: "Pay ₦19,999 only when ready to go live. Your profile goes public instantly and your custom NFC smart card or wristband is shipped free to your door."
    }
  ];

  return (
    <section id="how-it-works" className="pt-16 sm:pt-24 pb-12 bg-slate-50 dark:bg-[#070F1E] text-slate-900 dark:text-white relative overflow-hidden transition-colors">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <span className="text-[#00BCFF] text-xs font-extrabold tracking-wider uppercase shrink-0">
              HOW IT WORKS
            </span>
            <span className="hidden sm:inline-block text-[#00BCFF] text-2xl sm:text-3xl font-extrabold select-none opacity-90">
              |
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              3 simple steps from zero to published.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Everything is free to test and build. You only pay when you decide to go live.
          </p>
        </motion.div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mb-16">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-cyan-500/30 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-[#00BCFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 dark:text-slate-800 font-mono group-hover:text-[#00BCFF]/40 transition-colors">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{s.num === '03' ? 'Includes Free NFC Card Shipping' : '100% Free Step'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Phone Hand Image Footer */}
      <div className="w-full flex justify-center items-end z-20 overflow-visible px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="w-full relative flex justify-center items-end px-0"
        >
          <picture className="w-full flex justify-center items-end">
            <source media="(min-width: 640px)" srcSet={phoneHandImg} />
            <img
              src={mobilePhoneHandImg}
              alt="Enlazer Hosted Profile Mobile Showcase"
              className="w-full min-w-full h-auto object-cover sm:object-contain block align-bottom origin-bottom"
            />
          </picture>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroShowcase;

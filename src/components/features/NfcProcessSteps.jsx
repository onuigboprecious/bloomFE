import React from 'react';
import { motion } from 'framer-motion';
import { Rss, Smartphone, UserPlus, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NfcProcessSteps = () => {
  const { setIsOrderModalOpen } = useApp();

  const steps = [
    {
      num: "01",
      title: "Tap your Card or Wristband",
      desc: "Hover your physical Bloom Card or NFC Wristband against the top back of any iPhone or Android smartphone.",
      icon: Rss,
      badge: "Built-in NTAG216 High-Speed NFC Chip"
    },
    {
      num: "02",
      title: "Instant browser profile",
      desc: "Your interactive digital business card opens instantly in their mobile browser. Zero apps required.",
      icon: Smartphone,
      badge: "Works on 100% of modern phones"
    },
    {
      num: "03",
      title: "Exchange contacts & leads",
      desc: "They tap 'Save Contact' to download your .vcf card directly into their address book or CRM.",
      icon: UserPlus,
      badge: "Real-time analytics & lead capture"
    }
  ];

  return (
    <section id="features" className="pt-12 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00BCFF]">
            Simple & Effortless
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How networking with Bloom works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Ditch paper business cards forever. Make unforgettable connections in seconds with NFC Cards & Wristbands.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative flex flex-col justify-between hover:-translate-y-1 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-slate-800 text-[#00BCFF] border border-cyan-100 dark:border-slate-700 flex items-center justify-center group-hover:bg-[#00BCFF] group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-cyan-200 transition-colors font-mono">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>{step.badge}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="inline-flex items-center gap-2 text-[#00BCFF] font-bold hover:text-cyan-600 text-sm group cursor-pointer"
          >
            <span>get cards by bloom.</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default NfcProcessSteps;

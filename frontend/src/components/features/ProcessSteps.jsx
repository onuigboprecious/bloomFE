import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Send, Gift, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProcessSteps = () => {
  const { setIsPayModalOpen } = useApp();

  const steps = [
    {
      num: "01",
      title: "Select your card",
      desc: "Link any Visa, Mastercard, or American Express credit or debit card to your Payr account.",
      icon: CreditCard,
      badge: "Supports all UK & International cards"
    },
    {
      num: "02",
      title: "Payr transfers to landlord",
      desc: "We send direct bank transfers (FPS) to your landlord with your exact rent reference line.",
      icon: Send,
      badge: "Landlord needs zero setup"
    },
    {
      num: "03",
      title: "Earn miles & rewards",
      desc: "Watch your credit card points, airline miles, and cash back accumulate every single month.",
      icon: Gift,
      badge: "Instant payment receipts"
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How paying rent with Payr works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            No complex setup for your landlord. They get paid by direct bank transfer like normal.
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
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 relative flex flex-col justify-between hover:-translate-y-1 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center group-hover:bg-[#00bbf9] group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-cyan-200 transition-colors font-mono">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{step.badge}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setIsPayModalOpen(true)}
            className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:text-cyan-700 text-sm group"
          >
            <span>Try paying rent with card today</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProcessSteps;

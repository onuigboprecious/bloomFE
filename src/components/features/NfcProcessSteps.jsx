import React from 'react';
import { motion } from 'framer-motion';
import { Rss } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NfcProcessSteps = () => {
  const { setIsOrderModalOpen } = useApp();

  return (
    <section id="features" className="py-20 bg-[#070A12] text-white relative overflow-hidden select-none">

      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-18">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How networking with <span className="text-[#00BCFF]">Bloom works?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            Ditch paper business cards forever. Make unforgettable connections in seconds with NFC Cards & Wristbands.
          </p>
        </div>

        {/* Main Visual Stage: Phone in Center + 3 Step Callouts + Connecting Lines */}
        <div className="relative max-w-5xl mx-auto min-h-[540px] flex flex-col lg:flex-row items-center justify-center gap-8 py-4">

          {/* SVG Connecting Lines (Precision viewBox paths matching STEP 1 -> Phone -> STEP 2 -> STEP 3) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
            viewBox="0 0 1024 540"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Line 1: STEP 1 (Top Right) -> Center Phone */}
            <path
              d="M 720 120 C 630 120, 580 160, 512 200"
              stroke="#00BCFF"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
              opacity="0.7"
            />
            <circle cx="720" cy="120" r="4" fill="#00BCFF" />

            {/* Line 2: Center Phone -> STEP 2 (Middle Left) */}
            <path
              d="M 512 270 C 440 270, 390 270, 310 270"
              stroke="#00BCFF"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
              opacity="0.7"
            />
            <circle cx="310" cy="270" r="4" fill="#00BCFF" />

            {/* Line 3: Center Phone -> STEP 3 (Bottom Right) */}
            <path
              d="M 512 340 C 580 380, 630 420, 720 420"
              stroke="#00BCFF"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
              opacity="0.7"
            />
            <circle cx="720" cy="420" r="4" fill="#00BCFF" />
          </svg>

          {/* STEP 2 CALLOUT (Middle Left on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-72 lg:absolute lg:left-6 lg:top-1/2 lg:-translate-y-1/2 z-20"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 p-5 rounded-2xl shadow-2xl space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00BCFF] uppercase block">
                STEP 2
              </span>
              <h3 className="text-sm font-bold text-white leading-snug">
                Instant Web Profile Launch
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your dynamic profile opens instantly in their native mobile browser. 100% app-free for the recipient.
              </p>
            </div>
          </motion.div>

          {/* HYPER-REALISTIC IPHONE 16 PRO TITANIUM FRAME */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-[275px] sm:max-w-[295px] mx-auto select-none"
          >
            <div className="absolute inset-0 rounded-[3.4rem] bg-cyan-400/20 blur-2xl pointer-events-none" />

            <div className="relative p-[3.5px] rounded-[3.4rem] bg-gradient-to-b from-[#F4F4F5] via-[#A1A1AA] to-[#3F3F46] shadow-[0_25px_65px_-12px_rgba(0,0,0,0.65)]">

              {/* Physical Side Buttons */}
              <div className="absolute -right-[7px] top-32 w-[4px] h-14 bg-gradient-to-b from-[#E4E4E7] via-[#94A3B8] to-[#64748B] rounded-r-sm border-l border-slate-900 shadow-md" />
              <div className="absolute -left-[7px] top-24 w-[4px] h-7 bg-gradient-to-b from-[#E4E4E7] via-[#94A3B8] to-[#64748B] rounded-l-sm border-r border-slate-900 shadow-md" />
              <div className="absolute -left-[7px] top-36 w-[4px] h-11 bg-gradient-to-b from-[#E4E4E7] via-[#94A3B8] to-[#64748B] rounded-l-sm border-r border-slate-900 shadow-md" />
              <div className="absolute -left-[7px] top-50 w-[4px] h-11 bg-gradient-to-b from-[#E4E4E7] via-[#94A3B8] to-[#64748B] rounded-l-sm border-r border-slate-900 shadow-md" />

              <div className="relative rounded-[3.2rem] overflow-hidden bg-black p-[2.5px]">

                <div className="relative rounded-[3rem] overflow-hidden bg-white text-slate-900 flex flex-col justify-between min-h-[570px] sm:min-h-[600px] shadow-inner font-sans">

                  {/* Top Status Bar & Dynamic Island */}
                  <div className="pt-3.5 pb-2 px-6 flex items-center justify-between relative bg-white z-20">
                    <span className="text-[11px] font-bold text-slate-900">9:41</span>
                    <div className="absolute left-1/2 -translate-x-1/2 top-3 w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-900">
                      <Rss className="w-3.5 h-3.5 text-[#00BCFF]" />
                      <span className="text-[10px] font-mono font-bold">5G</span>
                    </div>
                  </div>

                  <div className="px-5 pt-3 pb-3 border-b border-slate-100 flex items-center gap-3">
                    <span className="text-slate-500 font-bold text-sm cursor-pointer">‹</span>
                    <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">
                      Recipient Contact Details
                    </h4>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-center text-left">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                        Account Name
                      </label>
                      <div className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-800 shadow-2xs">
                        Precious Onuigbo
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-1 px-1">
                      <label className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600">
                        <span className="w-3 h-3 rounded-full border border-slate-300" />
                        <span>vCard Direct</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-[10px] font-bold text-[#00BCFF]">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-[#00BCFF] bg-[#00BCFF]" />
                        <span>NFC Tap Sync</span>
                      </label>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                        Mobile Number
                      </label>
                      <div className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-800 shadow-2xs">
                        +234 803 123 4567
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                        Dynamic Handle
                      </label>
                      <div className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-800 shadow-2xs">
                        bloom.app/@precious
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                        Company / Role
                      </label>
                      <div className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-800 shadow-2xs">
                        Founder & Designer • Bloom Labs
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0">
                    <button className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#00BCFF] hover:text-white transition-colors">
                      <span>Save Contact & Continue</span>
                    </button>
                  </div>

                  <div className="pb-2.5 flex justify-center">
                    <div className="w-32 h-1 bg-slate-900 rounded-full" />
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN CALLOUTS (STEP 1 & STEP 3 on Desktop) */}
          <div className="w-full lg:w-72 flex flex-col gap-6 lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2 z-20">

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl shadow-2xl space-y-2"
            >
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00BCFF] uppercase block">
                STEP 1
              </span>
              <h3 className="text-sm font-bold text-white leading-snug">
                Tap Card or NFC Wristband
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hover your physical Bloom Card or NFC Wristband against the back of any iPhone or Android phone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl shadow-2xl space-y-2"
            >
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00BCFF] uppercase block">
                STEP 3
              </span>
              <h3 className="text-sm font-bold text-white leading-snug">
                Save Contact & Sync Leads
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                They tap 'Save Contact' to download your .vcf card directly into their address book or exchange details.
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default NfcProcessSteps;

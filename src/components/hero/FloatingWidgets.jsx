import React from 'react';
import { motion } from 'framer-motion';
import { Rss, Check, ShieldCheck, UserCheck, TrendingUp, Smartphone } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import nfcTapDemoImg from '../../assets/images/nfc_tap_demo.png';
import nfcMatteBlackImg from '../../assets/images/nfc_matte_black_card.png';

export const FloatingWidgets = () => {
  const { profile, selectedFinish, setSelectedFinish, cardFinishes, triggerNfcTap } = useApp();

  return (
    <>
      {/* 1. TOP LEFT: Physical NFC Card Photo & Signal Badge */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute -top-6 -left-6 sm:-left-12 lg:-left-28 z-20 hidden sm:block animate-float-slow"
      >
        <div className="relative group cursor-pointer" onClick={() => setSelectedFinish(cardFinishes[0])}>
          <div className="w-44 lg:w-52 h-28 lg:h-32 rounded-2xl overflow-hidden shadow-xl shadow-slate-900/10 border-4 border-white bg-slate-900">
            <img
              src={nfcMatteBlackImg}
              alt="Stealth Black NFC Card"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Overlapping 3D Cyan NFC Signal Badge */}
          <div className="absolute -top-3 -right-3 w-10 h-10 lg:w-11 lg:h-11 rounded-2xl bg-[#00BCFF] shadow-lg shadow-cyan-500/40 border-2 border-white flex items-center justify-center text-white">
            <Rss className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
        </div>
      </motion.div>

      {/* 2. BOTTOM LEFT: Live Contact Saved Notification Popup */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-12 -left-4 sm:-left-10 lg:-left-24 z-20 hidden sm:block animate-float-reverse"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-slate-100/80 w-64 lg:w-72 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">New Lead Captured</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Just now</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-slate-900 block leading-tight">Amaka Adebayo</span>
              <span className="text-[10px] text-slate-500 font-medium">VP Growth @ Paystack</span>
            </div>
            <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              Saved
            </span>
          </div>
        </div>
      </motion.div>

      {/* 3. TOP RIGHT: Photo of Executive Tapping NFC Card */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-4 -right-4 sm:-right-8 lg:-right-24 z-20 hidden sm:block animate-float-reverse"
      >
        <div className="w-40 lg:w-48 h-28 lg:h-32 rounded-2xl overflow-hidden shadow-xl shadow-slate-900/10 border-4 border-white bg-slate-100">
          <img
            src={nfcTapDemoImg}
            alt="Tapping NFC Card on phone"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* 4. MIDDLE RIGHT: Live NFC Tap Analytics Card */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute top-36 -right-6 sm:-right-12 lg:-right-28 z-20 hidden sm:block animate-float-slow"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-100 w-56 lg:w-60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Total NFC Taps</span>
            <span className="font-extrabold text-slate-900 font-mono text-sm">
              {profile.stats.totalTaps.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Lead Conversion</span>
            <span className="bg-cyan-100 text-cyan-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-cyan-600" />
              {profile.stats.conversionRate}%
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Status</span>
            <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Active
            </span>
          </div>
        </div>
      </motion.div>

      {/* 5. BOTTOM RIGHT: Compatibility Badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-2 -right-4 sm:-right-8 lg:-right-20 z-20 hidden sm:block"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3.5 shadow-lg border border-slate-100 text-right space-y-1.5">
          <span className="text-xs font-bold text-slate-900 block tracking-tight">
            Universal Compatibility
          </span>
          <div className="flex items-center justify-end gap-1.5 text-[10px] font-extrabold text-slate-700">
            <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
               iOS iPhone
            </span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
              🤖 Android
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block font-medium">No App Installation Required</span>
        </div>
      </motion.div>
    </>
  );
};

export default FloatingWidgets;

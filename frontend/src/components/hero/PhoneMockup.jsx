import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, Globe, Mail, Phone, MapPin, CheckCircle2, QrCode, MessageSquare, Link2, Radio, Rss } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PhoneMockup = () => {
  const { profile, selectedFinish, exportVCard, triggerNfcTap, isTapSimulating } = useApp();
  const [activeScreenTab, setActiveScreenTab] = useState('digital'); // 'digital' | 'physical'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto w-[310px] sm:w-[340px] md:w-[360px] h-[640px] sm:h-[680px] bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800/60 shadow-slate-900/40 select-none z-10"
    >
      {/* Phone Dynamic Island Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-950 rounded-b-2xl z-30 flex items-center justify-center">
        <div className="w-24 h-4 bg-black rounded-full flex items-center justify-end px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/50" />
        </div>
      </div>

      {/* Internal Display Container */}
      <div className="w-full h-full bg-white rounded-[40px] overflow-hidden pt-8 pb-4 px-4 flex flex-col justify-between relative border border-slate-100">
        
        {/* NFC Tap Wave Simulation Ripple Overlay */}
        <AnimatePresence>
          {isTapSimulating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 2.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-cyan-500/30 border-4 border-cyan-400 z-40 pointer-events-none flex items-center justify-center"
            >
              <Rss className="w-10 h-10 text-cyan-400 animate-bounce" />
            </motion.div>
          )}
        </AnimatePresence>

        {activeScreenTab === 'digital' ? (
          /* DIGITAL PROFILE VIEW */
          <div className="space-y-4 pt-1 overflow-y-auto max-h-[560px] pr-0.5 no-scrollbar">
            
            {/* Header Cover Banner & Avatar */}
            <div className="relative pt-2">
              <div className="h-20 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 p-3 relative overflow-hidden">
                <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] text-white font-bold flex items-center gap-1">
                  <Rss className="w-3 h-3 text-white" />
                  <span>Bloom NFC</span>
                </div>
              </div>

              {/* Avatar Image */}
              <div className="absolute -bottom-8 left-4">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-7 px-1 space-y-1">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                {profile.name}
              </h3>
              <p className="text-xs font-semibold text-cyan-600">
                {profile.title}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {profile.company} • {profile.location}
              </p>
            </div>

            {/* Bio */}
            <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
              {profile.bio}
            </p>

            {/* Primary Action Button: Save Contact */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={exportVCard}
                className="w-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-md shadow-cyan-400/20 flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Contact</span>
              </button>

              <button
                onClick={triggerNfcTap}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <Rss className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tap NFC</span>
              </button>
            </div>

            {/* Quick Contact Links Grid */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                Connect Directly
              </span>
              <div className="grid grid-cols-4 gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center hover:bg-cyan-50 hover:border-cyan-200 transition-all text-slate-700"
                >
                  <Mail className="w-4 h-4 text-cyan-600" />
                  <span className="text-[9px] font-medium mt-1">Email</span>
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center hover:bg-cyan-50 hover:border-cyan-200 transition-all text-slate-700"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="text-[9px] font-medium mt-1">Call</span>
                </a>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center hover:bg-cyan-50 hover:border-cyan-200 transition-all text-slate-700"
                >
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span className="text-[9px] font-medium mt-1">Website</span>
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center hover:bg-cyan-50 hover:border-cyan-200 transition-all text-slate-700"
                >
                  <Link2 className="w-4 h-4 text-blue-600" />
                  <span className="text-[9px] font-medium mt-1">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Live NFC Analytics Counter Bar */}
            <div className="bg-slate-900 text-white rounded-xl p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-medium">Monthly NFC Taps</span>
              </div>
              <span className="font-extrabold text-cyan-400 font-mono text-sm">
                {profile.stats.monthlyTaps}
              </span>
            </div>

          </div>
        ) : (
          /* PHYSICAL CARD PREVIEW */
          <div className="space-y-4 pt-4 flex flex-col items-center justify-center h-full text-center">
            <div className={`w-full h-48 rounded-2xl ${selectedFinish.color} p-4 shadow-xl border border-white/20 flex flex-col justify-between text-left relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="font-black text-lg tracking-tight font-['Plus_Jakarta_Sans']">bloom</span>
                  <span className="font-black text-lg text-cyan-400">.</span>
                </div>
                <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                  <Rss className="w-3.5 h-3.5 text-cyan-300" />
                </div>
              </div>

              <div className="space-y-1 z-10">
                <span className="text-sm font-extrabold block tracking-tight">{profile.name}</span>
                <span className="text-[10px] text-slate-300 block">{profile.title}</span>
              </div>

              <div className="flex items-center justify-between text-[9px] text-slate-400 z-10 pt-2 border-t border-white/10">
                <span>NFC TAP ENABLED</span>
                <QrCode className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-900">{selectedFinish.name}</h4>
              <p className="text-[11px] text-slate-500">{selectedFinish.material}</p>
            </div>
          </div>
        )}

        {/* Tab Switcher at bottom of phone */}
        <div className="flex items-center justify-center gap-2 pt-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
          <button
            onClick={() => setActiveScreenTab('digital')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
              activeScreenTab === 'digital'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Digital Profile
          </button>
          <button
            onClick={() => setActiveScreenTab('physical')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
              activeScreenTab === 'physical'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Physical NFC Card
          </button>
        </div>

        {/* Phone Bottom Home Bar */}
        <div className="w-28 h-1 bg-slate-900 rounded-full mx-auto mt-1" />
      </div>
    </motion.div>
  );
};

export default PhoneMockup;

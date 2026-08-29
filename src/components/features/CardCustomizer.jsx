import React from 'react';
import { motion } from 'framer-motion';
import { Check, Eye, Sliders, Smartphone, Rss } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';

export const CardCustomizer = () => {
  const { profile, updateProfileField, updateSocialLink, cardFinishes, selectedFinish, setSelectedFinish, setIsOrderModalOpen } = useApp();

  return (
    <section id="customizer" className="py-20 bg-slate-900 text-white relative overflow-hidden my-16 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <span>Interactive Card Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Build your custom Enlazer NFC profile
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Test how your digital business card and physical NFC card look in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-950/60 p-6 sm:p-8 rounded-3xl border border-slate-800 backdrop-blur-xl">
          
          {/* Controls Editor Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Choose NFC Physical Finish */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                1. Select Physical NFC Finish
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cardFinishes.slice(0, 4).map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedFinish(finish)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                      selectedFinish.id === finish.id
                        ? 'border-cyan-400 bg-cyan-950/50 shadow-md shadow-cyan-500/20'
                        : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    {selectedFinish.id === finish.id && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    <span className="text-xs font-bold text-white block truncate">{finish.name}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">₦{finish.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Profile Information Controls */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                2. Customize Profile Information
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => updateProfileField('name', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => updateProfileField('title', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => updateProfileField('company', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfileField('email', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                  Bio / Tagline
                </label>
                <textarea
                  rows={2}
                  value={profile.bio}
                  onChange={(e) => updateProfileField('bio', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>
            </div>

            <Button
              className="w-full bg-[#00BCFF] hover:bg-cyan-400 text-white font-bold py-3.5 cursor-pointer"
              onClick={() => setIsOrderModalOpen(true)}
            >
              Order Custom Enlazer Card (₦{selectedFinish.price.toLocaleString()})
            </Button>

          </div>

          {/* Real-time Visual Card Live Preview Column */}
          <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center space-y-4 w-full">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block flex items-center justify-center gap-1">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              Live Physical NFC Card Preview
            </span>

            {/* Render Physical Card Mockup */}
            <motion.div
              key={selectedFinish.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`w-full h-56 rounded-2xl ${selectedFinish.color} p-5 shadow-2xl border border-white/20 flex flex-col justify-between text-left relative overflow-hidden group cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="font-black text-2xl tracking-tight font-['Plus_Jakarta_Sans']">enlazer</span>
                  <span className="font-black text-2xl text-cyan-400">.</span>
                </div>
                <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-xs">
                  <Rss className="w-4 h-4 text-cyan-300" />
                </div>
              </div>

              <div className="space-y-1 z-10">
                <span className="text-lg font-black block tracking-tight">{profile.name || "Your Name"}</span>
                <span className="text-xs text-slate-300 font-medium block">{profile.title || "Your Title"} • {profile.company || "Company"}</span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 z-10 pt-3 border-t border-white/10">
                <span>NFC TAP READY</span>
                <span className="font-mono text-cyan-400">enlazer.app/{profile.name.toLowerCase().replace(/\s+/g, '')}</span>
              </div>
            </motion.div>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-white">Material: {selectedFinish.material}</p>
              <p className="text-[11px]">Laser-engraved with your custom branding & high-speed NFC chip.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CardCustomizer;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Eye, Sliders, Smartphone, Rss } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import OrderModal from '../order-modal/OrderModal';
import { useApp } from '../../context/AppContext';

export const CardBuilderPage = () => {
  const {
    profile,
    updateProfileField,
    updateSocialLink,
    cardFinishes,
    selectedFinish,
    setSelectedFinish,
    setIsOrderModalOpen,
    setCurrentPage
  } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors pb-20">

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 px-4 py-2 rounded-full shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <a href="#" onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 group">
            <span className="text-2xl font-black tracking-tight text-slate-950 dark:text-white font-['Plus_Jakarta_Sans']">bloom</span>
            <span className="text-2xl font-black text-[#00BCFF] group-hover:scale-125 transition-transform">.</span>
            <span className="ml-2 text-xs font-bold uppercase tracking-wider text-slate-400">Card Studio</span>
          </a>
        </div>
      </header>

      {/* Main Card Builder Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="py-10 bg-slate-900 text-white relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">

          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
                <span>Interactive Card Studio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Customize Your Bloom NFC Card
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                Test physical card finishes and live digital profile formatting in real time.
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
                    {cardFinishes.map((finish) => {
                      const isSelected = selectedFinish.id === finish.id;
                      return (
                        <div
                          key={finish.id}
                          onClick={() => setSelectedFinish(finish)}
                          className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${isSelected
                              ? 'border-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-400/50 shadow-md'
                              : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                            }`}
                        >
                          <div className="h-10 w-full rounded-lg bg-slate-800 mb-2 overflow-hidden relative">
                            <img src={finish.image} alt={finish.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-bold text-white block leading-tight truncate">
                            {finish.name}
                          </span>
                          <span className="text-[10px] font-bold text-cyan-400 block mt-0.5 font-mono">
                            ₦{finish.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Profile Input Controls */}
                <div className="space-y-4 pt-2 border-t border-slate-800">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    2. Customize Contact Details
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
                        placeholder="e.g. Precious Onuigbo"
                        className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-500/60 placeholder:italic placeholder:font-normal"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                        Job Title / Craft
                      </label>
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => updateProfileField('title', e.target.value)}
                        placeholder="e.g. Product Designer & Creator"
                        className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-500/60 placeholder:italic placeholder:font-normal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) => updateProfileField('company', e.target.value)}
                        placeholder="e.g. Bloom Labs"
                        className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-500/60 placeholder:italic placeholder:font-normal"
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
                        placeholder="e.g. precious@bloomlabs.africa"
                        className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-500/60 placeholder:italic placeholder:font-normal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                      Bio / Tagline
                    </label>
                    <input
                      type="text"
                      value={profile.bio}
                      onChange={(e) => updateProfileField('bio', e.target.value)}
                      placeholder="e.g. Tap to connect or book a call!"
                      className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-500/60 placeholder:italic placeholder:font-normal"
                    />
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-[#00BCFF] hover:bg-cyan-400 text-white font-bold py-3.5 cursor-pointer"
                  onClick={() => setIsOrderModalOpen(true)}
                >
                  Order Custom Bloom Card (₦{selectedFinish.price.toLocaleString()})
                </Button>

              </div>

              {/* Real-time Visual Card Live Preview Column */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4 w-full">
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
                      <span className="font-black text-2xl tracking-tight font-['Plus_Jakarta_Sans']">bloom</span>
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
                    <span className="font-mono text-cyan-400 font-bold">bloom.app/@{profile.username || 'precious'}</span>
                  </div>
                </motion.div>

                <div className="pt-2 text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-white">Material: {selectedFinish.material}</p>
                  <p className="text-[11px]">Laser-engraved with your custom branding & high-speed NFC chip.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <OrderModal />
    </div>
  );
};

export default CardBuilderPage;

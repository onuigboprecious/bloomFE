import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rss, Droplet, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import wristbandShowcaseImg from '../../assets/images/nfc_wristband_showcase.png';

// 5 Color Variations generated directly using the official nfc_wristband_showcase.png image
export const wristbandColorPresets = [
  {
    id: 'cyan-white',
    name: 'Ocean Cyan & Alpine White',
    badge: 'Popular Original',
    filter: 'none',
    bgGlow: 'rgba(0, 188, 255, 0.15)',
    swatchTop: '#00BCFF',
    swatchBottom: '#FFFFFF'
  },
  {
    id: 'violet-white',
    name: 'Electric Violet & Alpine White',
    badge: 'VIP Limited',
    filter: 'hue-rotate(65deg) saturate(1.25) brightness(0.98)',
    bgGlow: 'rgba(139, 92, 246, 0.15)',
    swatchTop: '#8B5CF6',
    swatchBottom: '#FFFFFF'
  },
  {
    id: 'magenta-white',
    name: 'Neon Pink & Alpine White',
    badge: 'Bold Creator',
    filter: 'hue-rotate(125deg) saturate(1.3) brightness(1.02)',
    bgGlow: 'rgba(236, 72, 153, 0.15)',
    swatchTop: '#EC4899',
    swatchBottom: '#FFFFFF'
  },
  {
    id: 'orange-white',
    name: 'Sunset Orange & Alpine White',
    badge: 'Solar Edition',
    filter: 'hue-rotate(170deg) saturate(1.35) brightness(1.05)',
    bgGlow: 'rgba(249, 115, 22, 0.15)',
    swatchTop: '#F97316',
    swatchBottom: '#FFFFFF'
  },
  {
    id: 'emerald-white',
    name: 'Bio Emerald & Alpine White',
    badge: 'Eco Edition',
    filter: 'hue-rotate(280deg) saturate(1.3) brightness(0.98)',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
    swatchTop: '#10B981',
    swatchBottom: '#FFFFFF'
  }
];

export const WristbandSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setSelectedFinish, cardFinishes, setCurrentPage, setIsOrderModalOpen } = useApp();

  const currentPreset = wristbandColorPresets[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % wristbandColorPresets.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + wristbandColorPresets.length) % wristbandColorPresets.length);
  };

  return (
    <div className="w-full flex flex-col items-center select-none space-y-4">
      
      {/* Main Stage Container (Seamlessly matching webapp background, compact height) */}
      <div
        className="relative w-full rounded-3xl py-4 px-2 sm:px-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
      >
        {/* Subtle Ambient Color Glow behind wristband */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-20 blur-3xl rounded-3xl bg-cyan-500"
        />

        {/* Slanted Floating Badge 1: IP68 Waterproof (Top Left) */}
        <div
          className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 p-2 sm:p-2.5 rounded-xl shadow-xs flex items-center gap-2 transform -rotate-3"
        >
          <div className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 text-[#00BCFF] flex items-center justify-center shrink-0">
            <Droplet className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[11px] font-black text-slate-900 dark:text-white block leading-tight">IP68 Waterproof</span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold block">Sweat, Pool & Ocean Safe</span>
          </div>
        </div>

        {/* Slanted Floating Badge 2: Instant NFC Tap (Top Right) */}
        <div
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 p-2 sm:p-2.5 rounded-xl shadow-xs flex items-center gap-2 transform rotate-3"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Rss className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[11px] font-black text-slate-900 dark:text-white block leading-tight">Instant NFC Tap</span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold block">100% App-Free Access</span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Color"
          className="absolute left-1 sm:left-2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Color"
          className="absolute right-1 sm:right-2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Image Visualizer Stage (Tightly padded, centered) */}
        <div className="w-full flex items-center justify-center pt-10 sm:pt-12 pb-2">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPreset.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full flex justify-center relative"
              >
                {/* Official nfc_wristband_showcase.png Image */}
                <img
                  src={wristbandShowcaseImg}
                  alt={`Enlazer NFC Wristbands - ${currentPreset.name}`}
                  style={{ filter: currentPreset.filter }}
                  className="w-full h-auto object-contain pointer-events-none drop-shadow-md transition-all duration-300"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Swatches Bar (5 Color Options - Compact Single Row) */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2 pt-1">
        {wristbandColorPresets.map((preset, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={preset.id}
              onClick={() => setCurrentIndex(index)}
              className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-slate-900 border-[#00BCFF] shadow-xs scale-105'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {/* Color Swatch Circle */}
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0 flex">
                <div className="w-1/2 h-full" style={{ backgroundColor: preset.swatchTop }} />
                <div className="w-1/2 h-full" style={{ backgroundColor: preset.swatchBottom }} />
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Check className="w-3 h-3 text-white drop-shadow-xs" />
                  </div>
                )}
              </div>

              {/* Color Label */}
              <span className={`text-[11px] font-bold transition-colors ${
                isActive
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                {preset.name.split('&')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default WristbandSlider;

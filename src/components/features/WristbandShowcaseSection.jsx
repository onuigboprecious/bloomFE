import React from 'react';
import { motion } from 'framer-motion';
import { Rss, Droplet, ShieldCheck, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import WristbandSlider from './WristbandSlider';

export const WristbandShowcaseSection = () => {
  const { setSelectedFinish, cardFinishes, setIsOrderModalOpen, setCurrentPage } = useApp();

  const wristbandProducts = cardFinishes.filter((f) => f.category === 'wristband');

  const features = [
    {
      icon: Droplet,
      title: "IP68 Waterproof & Sweatproof",
      desc: "Engineered with sealed eco-silicone. Wear it in the gym, pool, beach, or rain without losing signal."
    },
    {
      icon: Zap,
      title: "Hands-Free Instant Tap",
      desc: "Tap your wrist against any modern iPhone or Android to instantly launch your dynamic web handle."
    },
    {
      icon: ShieldCheck,
      title: "Dual-Hardware Account Sync",
      desc: "Pair your Bloom Card for formal meetings & your NFC Wristband for workout or VIP event networking."
    },
    {
      icon: Sparkles,
      title: "Laser Precision Branding",
      desc: "Personalized laser etching with your name, company logo, or unique handle for high-impact presence."
    }
  ];

  return (
    <section id="wristbands" className="pt-20 pb-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00BCFF]">
            NFC Wearable Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Wear Your Network. Tap Hands-Free Anywhere.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Not just cards! Meet the Bloom NFC Wristband—crafted for active creators, founders, fitness pros, and VIP event-goers who demand instant connections on the go.
          </p>
        </div>

        {/* Main Grid: Visual Product Showcase + Detail Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Wristband Color Slider */}
          <div className="lg:col-span-6">
            <WristbandSlider />
          </div>

          {/* Right Column: Features & Models List */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-[#00BCFF] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">{feat.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Wristband Selection List & Action Button on Same Line */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Available NFC Wristband Models
              </span>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex-1">
                  {wristbandProducts.slice(0, 1).map((wb) => (
                    <button
                      key={wb.id}
                      onClick={() => {
                        setSelectedFinish(wb);
                        setCurrentPage('customizer');
                      }}
                      className="w-full p-3.5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-left cursor-pointer flex items-center justify-between shadow-xs hover:border-[#00BCFF] transition-all"
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                          {wb.name}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">{wb.material}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">₦{wb.price.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-[#00BCFF]">Customize →</span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedFinish(wristbandProducts[0] || cardFinishes[4]);
                    setIsOrderModalOpen(true);
                  }}
                  className="shrink-0 px-6 py-3.5 rounded-full bg-[#00BCFF] text-white font-bold text-sm shadow-md shadow-cyan-400/20 cursor-pointer text-center whitespace-nowrap hover:bg-[#0090C7] transition-all"
                >
                  Order NFC Wristband
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WristbandShowcaseSection;

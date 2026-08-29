import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Zap, ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import WristbandSlider from './WristbandSlider';

export const WristbandShowcaseSection = () => {
  const { setSelectedFinish, cardFinishes, setIsOrderModalOpen } = useApp();

  const wristbandProduct = cardFinishes.find((f) => f.category === 'wristband') || cardFinishes[0];

  const features = [
    {
      icon: Droplet,
      title: "IP68 Waterproof & Sweatproof",
      desc: "Engineered with sealed eco-silicone. Wear it in the gym, pool, beach, or rain without losing NFC signal."
    },
    {
      icon: Zap,
      title: "Hands-Free Instant Tap",
      desc: "Tap your wrist against any modern iPhone or Android to instantly launch your dynamic web handle."
    },
    {
      icon: ShieldCheck,
      title: "Dual-Hardware Sync",
      desc: "Pair your Enlazer Card for formal meetings & your NFC Wristband for workout or VIP event networking."
    },
    {
      icon: Activity,
      title: "Laser Precision Custom Branding",
      desc: "Personalized laser etching with your name, company logo, or unique handle for high-impact presence."
    }
  ];

  return (
    <section id="nfc-wristbands" className="relative -mt-20 pt-24 sm:pt-28 md:pt-32 pb-16 bg-[#F8FAFC] dark:bg-slate-950 transition-colors overflow-hidden">
      {/* Ambient Backdrop Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-400/15 via-cyan-400/5 to-transparent pointer-events-none z-0 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#00BCFF] text-xs font-extrabold uppercase tracking-widest">
            <span>Enlazer Active NFC Wristbands</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Your Hustle Deserves <br className="hidden sm:inline" />
            <span className="text-[#00BCFF]">a Better Handshake.</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            <strong className="text-slate-900 dark:text-white block mb-1 text-base font-bold">Meet the Enlazer NFC Wristband</strong>
            Built for the mover, the founder, the creative building something real. One tap and they've got everything: your business, your brand, your next connection.
          </p>
        </div>

        {/* Main Grid: Visual Product Showcase + Detail Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Interactive Wristband Color Slider */}
          <div className="lg:col-span-6 flex flex-col items-center space-y-6">
            <WristbandSlider />

            {/* Blue Action Button */}
            <button
              onClick={() => {
                setSelectedFinish(wristbandProduct);
                setIsOrderModalOpen(true);
              }}
              className="w-full max-w-md px-7 py-3.5 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Order Enlazer NFC Wristband</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: 4 Feature Cards Grid */}
          <div className="lg:col-span-6 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-[#00BCFF] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WristbandShowcaseSection;

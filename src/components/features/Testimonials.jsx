import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Rss, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import africanFounderImg from '../../assets/images/african_founder.png';
import africanWomanImg from '../../assets/images/african_woman_executive.png';

export const Testimonials = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      title: "Stealth Black NFC Card",
      desc: "My Stealth Black Enlazer Card is an absolute magnet at client pitch meetings. One tap instantly transfers my profile & vCard into their address book!",
      name: "Chidi Okafor",
      role: "VP Sales • Lagos",
      avatar: africanFounderImg,
      badge: "Stealth Edition",
      bannerBg: "bg-slate-900"
    },
    {
      id: 2,
      title: "IP68 NFC Wristband",
      desc: "I wear my Enlazer NFC Wristband to marathon events & gym sessions. I network hands-free without carrying a wallet or phone case!",
      name: "Amina Bello",
      role: "Founder & Fitness Lead • Abuja",
      avatar: africanWomanImg,
      badge: "Waterproof Wristband",
      bannerBg: "bg-cyan-950"
    },
    {
      id: 3,
      title: "Stainless Steel Edition",
      desc: "The laser-engraved Stainless Steel Enlazer Card gets an instant 'Woah, how did you do that?' reaction every time I tap it at VIP summits.",
      name: "Kofi Mensah",
      role: "Creative Director • Accra",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      badge: "Steel Card",
      bannerBg: "bg-slate-900"
    },
    {
      id: 4,
      title: "Cyber Cyan NFC Wristband",
      desc: "The Enlazer NFC Wristband is a game-changer for high-volume summit check-ins. Swap handles and social contacts in 2 seconds flat.",
      name: "Fatima Zahra",
      role: "Event Director • Casablanca",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
      badge: "Event Wristband",
      bannerBg: "bg-cyan-950"
    },
    {
      id: 5,
      title: "Rose Gold Metal Card",
      desc: "Equipped our entire international executive team with Enlazer Cards & Wristbands. Real-time CRM lead capture with zero paper waste!",
      name: "Dr. Sarah Jenkins",
      role: "Executive • London & Lagos",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
      badge: "Rose Gold Metal",
      bannerBg: "bg-rose-950"
    },
    {
      id: 6,
      title: "Eco Bamboo Wood Card",
      desc: "Love the organic texture of the Bamboo Enlazer Card. Perfect blend of eco-friendly sustainability and high-speed NTAG216 chip technology.",
      name: "Tobi Adebayo",
      role: "Eco-Tech Founder • Ibadan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      badge: "Eco Bamboo",
      bannerBg: "bg-amber-950"
    }
  ];

  // Auto-scroll loop effect (pauses on hover or manual touch swipe)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;

    const autoScroll = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += 0.8;
        // Loop back to start smoothly when reaching end
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-slate-950 transition-colors overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-800 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00BCFF]" />
              <span>Verified Enlazer NFC Experience</span>
            </div>
            <span className="hidden sm:inline-block text-[#00BCFF] text-2xl sm:text-3xl font-extrabold select-none opacity-90">
              |
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Loved by founders & leaders using Enlazer Cards & Wristbands
            </h2>
          </div>

        </div>

        {/* Auto Buttonless Swipeable Slider Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="relative w-full"
        >
          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-6 overflow-x-auto scrollbar-none py-4 px-2 cursor-grab active:cursor-grabbing snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((card) => (
              <div
                key={card.id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-align-start bg-slate-50/80 dark:bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                {/* Top Visual Banner: Testifier Avatar Image Prominently Displayed */}
                <div className={`h-48 w-full relative ${card.bannerBg} flex items-center justify-center p-4 overflow-hidden border-b border-slate-800/80`}>

                  {/* Subtle Background Radial Glow */}
                  <div className="absolute inset-0 bg-cyan-500/10 blur-xl pointer-events-none" />

                  {/* Badge Tag at Top-Right */}
                  <span className="absolute top-3 right-3 z-10 bg-slate-900/90 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {card.badge}
                  </span>

                  {/* Prominent Testifier Headshot Image */}
                  <div className="relative z-10">
                    <img
                      src={card.avatar}
                      alt={card.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white/90 dark:border-slate-800 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Verified Checkmark Badge on Photo */}
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#00BCFF] text-white flex items-center justify-center shadow-md border-2 border-slate-950">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal italic">
                      "{card.desc}"
                    </p>
                  </div>

                  {/* Testifier Name & Role Footer */}
                  <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                      {card.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                      {card.role}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;

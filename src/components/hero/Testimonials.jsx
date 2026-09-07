import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { mockTestimonialsList } from '../../data/mockData';

export const Testimonials = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const testimonials = mockTestimonialsList;

  // Auto-scroll loop effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;

    const autoScroll = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += 0.8;
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
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-2 text-[#00BCFF] text-xs font-extrabold tracking-wider uppercase shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00BCFF]" />
              <span>Verified Professionals</span>
            </div>
            <span className="hidden sm:inline-block text-[#00BCFF] text-2xl sm:text-3xl font-extrabold select-none opacity-90">
              |
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Loved by creators, consultants & professionals
            </h2>
          </div>
        </div>

        {/* Auto-scrollable Testimonial Cards Slider */}
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
                className="w-[290px] sm:w-[340px] shrink-0 snap-align-start bg-slate-50/80 dark:bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                {/* Top Visual Banner */}
                <div className={`h-40 w-full relative ${card.bannerBg} flex items-center justify-center p-4 overflow-hidden border-b border-slate-800/80`}>
                  <div className="absolute inset-0 bg-cyan-500/10 blur-xl pointer-events-none" />

                  <span className="absolute top-3 right-3 z-10 bg-slate-900/90 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {card.badge}
                  </span>

                  <div className="relative z-10">
                    <img
                      src={card.avatar}
                      alt={card.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/90 dark:border-slate-800 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#00BCFF] text-white flex items-center justify-center shadow-md border-2 border-slate-950">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Body Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal italic">
                      "{card.desc}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                      {card.name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate font-medium">
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


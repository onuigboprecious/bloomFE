import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Rss, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import africanFounderImg from '../../assets/images/african_founder.png';
import africanWomanImg from '../../assets/images/african_woman_executive.png';
import africanMaleCorporateImg from '../../assets/images/african_male_corporate.png';
import africanFemaleRealtorImg from '../../assets/images/african_female_realtor.png';
import africanMaleDeveloperImg from '../../assets/images/african_male_developer.png';
import africanFunmiImg from '../../assets/images/african_funmi.png';
import africanNgoziImg from '../../assets/images/african_ngozi.png';

export const Testimonials = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const testimonials = [
    // CARDS
    {
      id: 1,
      category: "cards",
      title: "Freelance Photography Portfolio",
      desc: "I used to lose leads because people forgot to save my number after events. Now I just tap my Enlazer card and my portfolio, WhatsApp, and Instagram pop up instantly. Booked two shoots off it in the first week.",
      name: "Tomi Adebayo",
      role: "Freelance Photographer • Lagos",
      avatar: africanFounderImg,
      badge: "NFC Card",
      bannerBg: "bg-slate-900"
    },
    {
      id: 2,
      category: "cards",
      title: "Beauty Studio Branding",
      desc: "As a small business owner, I couldn't justify a big marketing budget. My Enlazer card feels premium without the premium price — clients think I spent way more on my brand than I actually did.",
      name: "Chidinma Okonkwo",
      role: "Founder, Chidinma Beauty Studio",
      avatar: africanWomanImg,
      badge: "NFC Card",
      bannerBg: "bg-[#051B2C]"
    },
    {
      id: 3,
      category: "cards",
      title: "Corporate Oil & Gas Networking",
      desc: "In oil and gas, first impressions matter. Handing someone a paper card feels dated now. My Enlazer card makes conversations at conferences smoother — no fumbling for a card that's run out.",
      name: "Engr. Bassey Udoh",
      role: "Business Development Manager, Quail Global Group",
      avatar: africanMaleCorporateImg,
      badge: "NFC Card",
      bannerBg: "bg-slate-900"
    },
    {
      id: 4,
      category: "cards",
      title: "Real Estate Client Lead Capture",
      desc: "I meet 10-15 new people a day at property viewings. Enlazer means I never run out of cards mid-showing, and I can see exactly who tapped my profile afterward — helps me follow up smarter.",
      name: "Amaka Nwachukwu",
      role: "Real Estate Agent • Abuja",
      avatar: africanFemaleRealtorImg,
      badge: "NFC Card",
      bannerBg: "bg-emerald-950"
    },
    {
      id: 5,
      category: "cards",
      title: "Startup & Engineering Networking",
      desc: "I was skeptical about NFC cards being a gimmick, but the setup was dead simple and it actually works with every phone I've tested it on, iPhone or Android. It's the small tech flex that gets conversations started.",
      name: "Dayo Kalu",
      role: "Software Engineer & Startup Founder",
      avatar: africanMaleDeveloperImg,
      badge: "NFC Card",
      bannerBg: "bg-slate-900"
    },

    // WRISTBANDS
    {
      id: 6,
      category: "wristbands",
      title: "Wedding & VIP Guest Check-In",
      desc: "We used Enlazer wristbands for a 300-guest wedding and it cut our check-in time in half. Guests loved tapping to see the schedule and gift registry instead of hunting for a printed program.",
      name: "Funmi Taiwo",
      role: "Event Planner, F&T Events",
      avatar: africanFunmiImg,
      badge: "NFC Wristband",
      bannerBg: "bg-cyan-950"
    },
    {
      id: 7,
      category: "wristbands",
      title: "Tech Summit Access Management",
      desc: "Managing attendee access used to be chaos — lost badges, long queues. With Enlazer wristbands, entry was instant and we could track engagement at each booth. Exhibitors were impressed too.",
      name: "Michael Eze",
      role: "Conference Organizer, TechHive Summit",
      avatar: africanMaleCorporateImg,
      badge: "NFC Wristband",
      bannerBg: "bg-indigo-950"
    },
    {
      id: 8,
      category: "wristbands",
      title: "Outdoor Music Festival & Cashless Taps",
      desc: "Durability was my biggest worry with an outdoor festival — dust, sweat, dancing all day. The bands held up fine and made cashless drink purchases at our vendor stalls seamless.",
      name: "Ngozi Peters",
      role: "Festival Director, Naija Sound Fest",
      avatar: africanNgoziImg,
      badge: "NFC Wristband",
      bannerBg: "bg-cyan-950"
    },
    {
      id: 9,
      category: "wristbands",
      title: "Corporate Retreat Attendance Tracking",
      desc: "We ran a 2-day training retreat and used Enlazer wristbands for session check-ins instead of paper sign-sheets. Saved us hours of manual attendance tracking and looked way more professional.",
      name: "Kelechi Johnson",
      role: "Corporate Trainer, HR Solutions Ltd",
      avatar: africanMaleDeveloperImg,
      badge: "NFC Wristband",
      bannerBg: "bg-[#062033]"
    }
  ];

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-800 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00BCFF]" />
              <span>Verified Enlazer Customers</span>
            </div>
            <span className="hidden sm:inline-block text-[#00BCFF] text-2xl sm:text-3xl font-extrabold select-none opacity-90">
              |
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Loved by professionals using Cards & Wristbands
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
                className="w-[290px] sm:w-[340px] shrink-0 snap-align-start bg-slate-50/80 dark:bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                {/* Top Visual Banner: Testifier Avatar Image */}
                <div className={`h-40 w-full relative ${card.bannerBg} flex items-center justify-center p-4 overflow-hidden border-b border-slate-800/80`}>
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
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/90 dark:border-slate-800 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Verified Checkmark Badge */}
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

                  {/* Testifier Name & Role Footer */}
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

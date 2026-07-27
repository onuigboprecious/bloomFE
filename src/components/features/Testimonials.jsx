import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import africanFounderImg from '../../assets/images/african_founder.png';
import africanWomanImg from '../../assets/images/african_woman_executive.png';

export const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Chidi Okafor",
      role: "VP of Enterprise Sales, Lagos",
      tag: "1,420+ Taps",
      avatar: africanFounderImg,
      quote: "Handing out paper business cards at tech summits in Lagos & Nairobi is officially obsolete. Tapping my Stealth Black Bloom Card on client phones instantly saves my contact info & WhatsApp!"
    },
    {
      id: 2,
      name: "Amina Bello",
      role: "Chief Product Officer, Abuja",
      tag: "Steel Edition",
      avatar: africanWomanImg,
      quote: "The weight and precision laser engraving of the Stainless Steel Bloom Card always gets an instant 'Woah, this is amazing!' reaction at every meeting. Best networking investment ever."
    },
    {
      id: 3,
      name: "Kofi Mensah",
      role: "Founder & CEO, Accra Tech Hub",
      tag: "Enterprise Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      quote: "We deployed Bloom Cards for our entire executive team across West Africa. Centralized lead management, instant CRM contact sync, and zero paper card waste!"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00BCFF]">
            Verified Executive Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by leaders across Africa & globally
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            See how founders, executives, and innovators are elevating their networking with Bloom Card.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-xl hover:bg-white dark:hover:bg-slate-850 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-200/50 dark:border-cyan-800/50">
                    {rev.tag}
                  </span>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 mt-6 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white">
                    <span>{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00BCFF] fill-cyan-50 dark:fill-cyan-950" />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

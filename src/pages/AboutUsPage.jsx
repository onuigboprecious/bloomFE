import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ShieldCheck, Zap, Globe2, Award, Users } from 'lucide-react';

export const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-50 dark:bg-slate-900 text-[#00BCFF] border border-cyan-200 dark:border-slate-800">
            <Globe2 className="w-3.5 h-3.5 mr-2" />
            REDEFINING AFRICAN NETWORKING
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Connecting professionals with a single tap.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Bloom Card is building Africa's premier smart NFC business card and digital identity platform, replacing paper waste with instant, high-converting digital connections.
          </p>
        </div>

        {/* Core Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-[#00BCFF] mb-1">50K+</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Taps</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-purple-500 mb-1">100%</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">No App Needed</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-emerald-500 mb-1">&lt; 0.5s</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sharing Speed</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-amber-500 mb-1">15+</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">African Cities</div>
          </div>
        </div>

        {/* Mission Details */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              Over 10 billion paper business cards are printed globally every year, with 88% thrown away within a week. Bloom was created to give creators, founders, executives, and freelancers in Lagos, Abuja, Nairobi, and Johannesburg a sustainable, high-impact alternative.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              Our hardware cards are laser-engraved from aerospace-grade steel, stealth matte black PVC, and eco bamboo, embedded with NTAG216 high-speed NFC microchips.
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-slate-900 p-8 rounded-3xl border border-cyan-500/20 space-y-4">
            <div className="flex items-center gap-3 text-cyan-400 font-bold">
              <Zap className="w-5 h-5" />
              <span>Instant Contact & Social Sharing</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-400 font-bold">
              <ShieldCheck className="w-5 h-5" />
              <span>AES-256 Encrypted Profile Data</span>
            </div>
            <div className="flex items-center gap-3 text-purple-400 font-bold">
              <Users className="w-5 h-5" />
              <span>Automated Dashboard Lead Capture</span>
            </div>
            <div className="flex items-center gap-3 text-amber-400 font-bold">
              <Award className="w-5 h-5" />
              <span>Lifetime Hardware Replacement Guarantee</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;

import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useApp } from '../context/AppContext';
import {
  Globe2,
  Zap,
  ShieldCheck,
  Users,
  Award,
  Target,
  Compass,
  Rss,
  Smartphone,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Cpu
} from 'lucide-react';

export const AboutUsPage = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28 space-y-24">
        
        {/* SECTION 1: HERO HEADER WITH FLOATING STAT BADGES */}
        <div className="relative pt-6 pb-12 overflow-hidden rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-12 shadow-sm">
          
          {/* Subtle Background Pattern & Ambient Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#00BCFF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Floating Stat Card 1 (Left) */}
          <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col p-4 rounded-2xl bg-white/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md z-10 animate-in fade-in slide-in-from-left-4 duration-500">
            <span className="text-2xl font-black text-[#00BCFF]">50K+</span>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Active Digital Taps</span>
          </div>

          {/* Floating Stat Card 2 (Right) */}
          <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col p-4 rounded-2xl bg-white/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md z-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <span className="text-2xl font-black text-cyan-400">100%</span>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">No App Required</span>
          </div>

          {/* Floating Nodes Icons */}
          <div className="hidden sm:flex absolute top-6 left-1/4 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 items-center justify-center text-[#00BCFF]">
            <Rss className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex absolute bottom-6 right-1/4 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 items-center justify-center text-[#00BCFF]">
            <Lock className="w-4 h-4" />
          </div>

          {/* Center Header Content */}
          <div className="text-center space-y-4 max-w-2xl mx-auto relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold bg-cyan-50 dark:bg-cyan-950/60 text-[#00BCFF] border border-cyan-200 dark:border-cyan-800/60 shadow-xs">
              <Globe2 className="w-3.5 h-3.5 mr-2" />
              <span>About Bloom Card</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Connecting professionals with a single tap.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
              Bloom Card is building Africa's premier smart NFC business card and digital identity platform, replacing paper waste with instant, high-converting digital connections.
            </p>

            <div className="pt-4">
              <button
                onClick={() => setCurrentPage('cards')}
                className="px-7 py-3.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 mx-auto cursor-pointer hover:scale-105"
              >
                <span>Get Your NFC Card</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>


        {/* SECTION 2: 3-CARD VALUE PROPOSITION GRID (MISSION, VISION, OUR VALUES) */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00BCFF] bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Core Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Mission */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-slate-800 text-[#00BCFF] border border-cyan-100 dark:border-slate-700 flex items-center justify-center">
                <Target className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Mission</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Over 10 billion paper business cards are printed globally every year, with 88% thrown away within a week. Bloom was created to give creators, founders, executives, and freelancers a sustainable, high-impact alternative.
              </p>
            </div>

            {/* Card 2: Vision (Highlighted Cyan Accent Card) */}
            <div className="bg-gradient-to-br from-[#00BCFF] via-cyan-500 to-cyan-600 text-slate-950 p-7 rounded-3xl shadow-xl shadow-cyan-500/20 border border-cyan-400 space-y-4 relative overflow-hidden transform hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-slate-950/20 text-slate-950 border border-slate-950/20 flex items-center justify-center">
                <Compass className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black text-slate-950">Vision</h3>
              <p className="text-xs font-semibold text-slate-950/90 leading-relaxed">
                To be Africa's leading smart networking ecosystem, empowering millions of professionals with seamless digital identity, automated vCard saving, and instant contact sharing without requiring any app.
              </p>
            </div>

            {/* Card 3: Our Values */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-slate-800 text-[#00BCFF] border border-cyan-100 dark:border-slate-700 flex items-center justify-center">
                <Award className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Our Values</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Hardware craftsmanship, 100% universal smartphone compatibility, AES-256 encrypted profile security, and sustainable eco-friendly innovation.
              </p>
            </div>

          </div>
        </div>


        {/* SECTION 3: FEATURE HUB FLOW DIAGRAM ("WHY THOUSANDS TRUST BLOOM CARD") */}
        <div className="space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00BCFF] bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Why Thousands Trust Bloom Card
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Combining aerospace-grade NFC hardware with instant profile sharing, modern analytics, and zero app requirements.
            </p>
          </div>

          {/* Central Hub Flow Graphic Diagram */}
          <div className="relative max-w-4xl mx-auto p-4 sm:p-8">
            
            {/* SVG Connecting Curves */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" xmlns="http://www.w3.org/2000/svg">
              <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#00BCFF" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />
              <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="#00BCFF" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />
              <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="#00BCFF" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />
              <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="#00BCFF" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />
            </svg>

            {/* Central Node Badge */}
            <div className="flex justify-center my-8 md:my-0 relative z-20">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00BCFF] via-cyan-400 to-cyan-300 text-slate-950 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,188,255,0.4)] border-4 border-white dark:border-slate-900 transition-transform hover:scale-110">
                <Rss className="w-9 h-9 stroke-[2.5]" />
                <span className="text-[9px] font-black tracking-widest uppercase mt-0.5">Bloom NFC</span>
              </div>
            </div>

            {/* 4 Feature Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 relative z-10 -mt-16 md:-mt-20">
              
              {/* Feature 1: Top Left */}
              <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-md hover:border-cyan-500/40 transition-colors md:max-w-xs">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-slate-800 text-[#00BCFF] flex items-center justify-center font-bold text-xs">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">NFC Hardware & Tech</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Our hardware NFC cards and active wristbands are embedded with NTAG216 high-speed NFC microchips.
                </p>
              </div>

              {/* Feature 2: Top Right */}
              <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-md hover:border-cyan-500/40 transition-colors md:max-w-xs md:ml-auto">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-slate-800 text-[#00BCFF] flex items-center justify-center font-bold text-xs">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Universal Compatibility</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Works natively with 100% of modern iOS & Android smartphones without requiring any app.
                </p>
              </div>

              {/* Feature 3: Bottom Left */}
              <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-md hover:border-cyan-500/40 transition-colors md:max-w-xs md:mt-12">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-slate-800 text-[#00BCFF] flex items-center justify-center font-bold text-xs">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Automated Lead Capture</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Recipients can save your .vcf vCard to phonebook and send contact details straight back to your dashboard.
                </p>
              </div>

              {/* Feature 4: Bottom Right */}
              <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-md hover:border-cyan-500/40 transition-colors md:max-w-xs md:ml-auto md:mt-12">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-slate-800 text-[#00BCFF] flex items-center justify-center font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Lifetime Guarantee & Security</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  AES-256 profile data encryption with lifetime hardware replacement assurance.
                </p>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;

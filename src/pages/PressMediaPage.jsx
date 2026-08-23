import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Newspaper, Download, Mail, ExternalLink } from 'lucide-react';

export const PressMediaPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-purple-50 dark:bg-slate-900 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-slate-800">
            <Newspaper className="w-3.5 h-3.5 mr-2" />
            PRESS & MEDIA KIT
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Bloom in the News
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Media resources, press releases, brand assets, and press contact information.
          </p>
        </div>

        {/* Brand Kit Download Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Official Brand Kit & Logos</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Download official high-resolution vector logos, product photography of Stealth Black, Stainless Steel, and Bamboo NFC finishes, and brand guideline PDFs.
            </p>
            <button className="inline-flex items-center gap-2 text-xs font-bold bg-[#00BCFF] hover:bg-cyan-500 text-white px-5 py-3 rounded-full cursor-pointer transition-colors shadow-md">
              <Download className="w-4 h-4" />
              <span>Download Brand Pack (.ZIP, 42MB)</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Media Inquiries & Interviews</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              For press inquiries, founder interview requests, podcast appearances, or product review samples, reach out directly to our communications team.
            </p>
            <a href="mailto:press@bloomlabs.africa" className="inline-flex items-center gap-2 text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white px-5 py-3 rounded-full hover:bg-slate-800 transition-colors">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>press@bloomlabs.africa</span>
            </a>
          </div>
        </div>

        {/* Featured Coverage */}
        <div className="space-y-6">
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Featured Press</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold text-[#00BCFF] uppercase">Techpoint Africa</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">"How Bloom is Replacing Paper Cards Across African Tech Summits"</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Coverage on the surge of NFC smart cards among Lagos and Abuja tech founders.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold text-purple-500 uppercase">Disrupt Africa</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">"The Rise of Contactless Hardware Networking Tools"</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Deep dive into contactless NTAG216 chip technology and vCard auto-syncing.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold text-emerald-500 uppercase">TechCabal</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">"Bloom Card Launches Laser-Engraved Stainless Steel NFC Edition"</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Product showcase highlighting metallic hardware networking accessories.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PressMediaPage;

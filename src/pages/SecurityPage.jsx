import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ShieldCheck, Lock, Cpu, Server, Key } from 'lucide-react';

export const SecurityPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 mr-2" />
            ENTERPRISE-GRADE PROTECTION
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Security & Encryption
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            How we protect your hardware cards, digital profiles, session credentials, and captured lead data.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-slate-800 text-[#00BCFF] flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">NTAG216 Chip Lock</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every physical Bloom Card embeds a high-frequency NTAG216 chip locked with write-protection keys to prevent unauthorized tampering or rewriting.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 text-emerald-500 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">AES-256 Data Encryption</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Sensitive user profiles, session tokens, and contact cards are stored and transmitted using AES-256 encryption standards with TLS 1.3 in transit.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-slate-800 text-purple-500 flex items-center justify-center">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">HTTP-Only Session Cookies</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Authentication tokens are stored inside strict HTTP-only, SameSite cookies, isolating credentials from client-side XSS attacks.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-slate-800 text-amber-500 flex items-center justify-center">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Remote Card Disabling</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Lost your card at an event? Instantly toggle "Deactivate Card" from your dashboard to freeze profile taps until found or replaced.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecurityPage;

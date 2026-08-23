import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FileText, CheckCircle2 } from 'lucide-react';

export const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <div className="space-y-4 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-slate-900 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-slate-800">
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            TERMS & CONDITIONS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 font-mono">Last updated: August 2026</p>
        </div>

        <div className="space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Agreement to Terms</h2>
            <p>
              By accessing the Bloom website, purchasing a physical Bloom NFC Smart Card or Wristband, or creating a digital handle (`bloom.app/@username`), you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Card Hardware & Ownership</h2>
            <p>
              Purchased Bloom NFC Cards are single-time hardware transactions (₦35,000 for standard finishes). You retain full lifetime ownership of your physical card. Your digital profile remains free forever, with optional pro tier handle & analytics upgrades available.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Acceptable Use Policy</h2>
            <p>
              Users may not host illegal content, malicious links, phishing material, or impersonate other individuals on their public Bloom handles (`bloom.app/@username`). Bloom reserves the right to suspend handles violating community guidelines.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Subscription Billing</h2>
            <p>
              Optional Bloom Pro features (₦3,500/mo or ₦35,000/yr) can be canceled at any time from your Billing tab without losing basic contact card functionality.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;

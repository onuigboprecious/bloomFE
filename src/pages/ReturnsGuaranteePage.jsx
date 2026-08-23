import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Award, RefreshCw, ShieldCheck, Truck } from 'lucide-react';

export const ReturnsGuaranteePage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-slate-900 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-slate-800">
            <Award className="w-3.5 h-3.5 mr-2" />
            100% SATISFACTION GUARANTEE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Returns & 1-Year Guarantee
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Every physical Bloom Card is backed by our quality promise and replacement warranty.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-slate-800 text-[#00BCFF] flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">30-Day Money Back</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              If your Bloom Card does not meet your expectations within 30 days, return it for a full refund (minus shipping).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 text-emerald-500 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">1-Year Hardware Warranty</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              If the embedded NFC chip fails or loses responsiveness within 12 months, we replace your card completely free.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-slate-800 text-purple-500 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fast Nationwide Delivery</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Deliveries within Lagos & Abuja arrive in 24-48 hours. Regional deliveries take 2-4 business days.
            </p>
          </div>
        </div>

        {/* Claim Warranty Box */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 rounded-3xl text-white text-center space-y-4 border border-slate-700 shadow-xl">
          <h3 className="text-2xl font-bold">Need a Card Replacement?</h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Contact support with your Order ID or registered email, and our fulfillment team will assist you immediately.
          </p>
          <a
            href="mailto:support@bloomlabs.africa?subject=Hardware%20Warranty%20Claim"
            className="inline-block bg-[#00BCFF] hover:bg-cyan-400 text-white font-bold px-6 py-3 rounded-full text-xs transition-colors shadow-lg"
          >
            Claim Warranty Replacement
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnsGuaranteePage;

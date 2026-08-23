import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FileText, ShieldCheck, Lock, RefreshCw, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LegalPage = () => {
  const { setCurrentPage } = useApp();

  const legalSections = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      desc: 'Understand how we protect your personal information, handle handles, and secure captured lead data.',
      icon: Lock,
      color: 'text-cyan-500 bg-cyan-50 dark:bg-slate-800'
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      desc: 'Read the terms governing physical card purchases, subscription billing, and acceptable platform handle use.',
      icon: FileText,
      color: 'text-purple-500 bg-purple-50 dark:bg-slate-800'
    },
    {
      id: 'security',
      title: 'Security & Encryption',
      desc: 'Technical details regarding NTAG216 NFC write-protection, AES-256 encryption, and SSL protocols.',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-slate-800'
    },
    {
      id: 'returns',
      title: 'Returns & Guarantee',
      desc: 'Learn about our 30-day money-back guarantee and 1-year hardware replacement warranty.',
      icon: RefreshCw,
      color: 'text-amber-500 bg-amber-50 dark:bg-slate-800'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            LEGAL HUB & COMPLIANCE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Legal & Trust Center
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Everything you need to know about our legal policies, security standards, and terms of service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {legalSections.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm hover:border-[#00BCFF]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#00BCFF] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;

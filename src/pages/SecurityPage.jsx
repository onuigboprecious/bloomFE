import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/common/SEO';
import { useApp } from '../context/AppContext';
import { getAppDomainUrl } from '../config/domainConfig';

export const SecurityPage = () => {
  const { setCurrentPage } = useApp();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleGoToDashboard = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname.toLowerCase();
      if (hostname === 'enlazer.com.ng' || hostname === 'www.enlazer.com.ng') {
        window.location.href = getAppDomainUrl('/dashboard');
        return;
      }
    }
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <SEO
        title="Security & Encryption — Enlazer"
        description="Every card is locked at the factory, everything you save is encrypted, and you can shut a card off yourself in one tap."
        url="https://enlazer.cloud/security"
      />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Header - Styled to match marketing page header layout */}
        <div className="text-center space-y-3 max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <span className="text-[#00BCFF] text-xs font-extrabold tracking-wider uppercase shrink-0">
              ENTERPRISE-GRADE PROTECTION
            </span>
            <span className="hidden sm:inline-block text-[#00BCFF] text-2xl sm:text-3xl font-extrabold select-none opacity-90">
              |
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Security & Encryption
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Every card is locked at the factory, everything you save is encrypted, and you can shut a card off yourself in one tap. Here's exactly what that means.
          </p>
        </div>

        {/* Plain Content Sections */}
        <div className="space-y-10 text-left">
          
          {/* Section 1: Your card can't be cloned */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Your card can't be cloned
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Every physical card is locked before it ever ships. Nobody can copy it, reprogram it, or make a duplicate — not another company, and not us.
            </p>

            <div>
              <button
                onClick={() => toggleSection('cloned')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00BCFF] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer group mt-1"
              >
                <span>How it works</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSections.cloned ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {openSections.cloned && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                      Each card uses a genuine NTAG216 NFC chip. Before dispatch we permanently lock its memory with write-protection keys, so it can't be overwritten or reprogrammed. Every chip also carries a 7-byte serial ID burned in at manufacture, giving it a hardware identity nothing else can match.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Section 2: Your profile is always encrypted */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Your profile is always encrypted
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether it's sitting in our database or traveling between your phone and our servers, your contact info and saved leads are scrambled so only you can read them.
            </p>

            <div>
              <button
                onClick={() => toggleSection('encrypted')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00BCFF] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer group mt-1"
              >
                <span>How it works</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSections.encrypted ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {openSections.encrypted && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="pt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                      <li className="flex items-start gap-2">
                        <span className="text-[#00BCFF] font-bold">•</span>
                        <span>
                          <strong className="text-slate-800 dark:text-slate-200">AES-256 at rest</strong> — every stored record, contact card, and token in our database is encrypted with the same standard banks use.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00BCFF] font-bold">•</span>
                        <span>
                          <strong className="text-slate-800 dark:text-slate-200">TLS 1.3 in transit</strong> — every profile tap, web request, and API call travels over an encrypted HTTPS connection.
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Section 3: Your login can't be hijacked */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Your login can't be hijacked
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Your session — the thing that keeps you signed in — is kept out of reach of scripts and other websites, so it can't be stolen or reused without your permission.
            </p>

            <div>
              <button
                onClick={() => toggleSection('hijacked')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00BCFF] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer group mt-1"
              >
                <span>How it works</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSections.hijacked ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {openSections.hijacked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="pt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                      <li className="flex items-start gap-2">
                        <span className="text-[#00BCFF] font-bold">•</span>
                        <span>
                          <strong className="text-slate-800 dark:text-slate-200">HTTP-only cookies</strong> — your session token is invisible to JavaScript running in the browser, so a malicious script can't read it.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00BCFF] font-bold">•</span>
                        <span>
                          <strong className="text-slate-800 dark:text-slate-200">SameSite: Strict</strong> — your session cookie only gets sent to Enlazer, never to another site trying to trick your browser into a request on your behalf.
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Section 4: Lost your card? Freeze it in one tap. */}
          <section className="space-y-4 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Lost your card? Freeze it in one tap.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Misplaced a card or wristband at an event? Deactivate it from your dashboard and every tap stops redirecting immediately — until you find it or order a replacement.
            </p>

            <div className="pt-2">
              <a
                href="/dashboard"
                onClick={handleGoToDashboard}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-[#00BCFF] hover:bg-[#00a6e0] text-white transition-all shadow-sm"
              >
                Go to dashboard
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecurityPage;


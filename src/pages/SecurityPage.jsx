import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const SecurityPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Header */}
        <div className="space-y-3 mb-10 sm:mb-12 border-b border-slate-200 dark:border-slate-800 pb-8 text-left">
          <span className="text-[#00BCFF] text-xs font-extrabold tracking-wider uppercase block">
            ENTERPRISE-GRADE PROTECTION
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Security & Encryption
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            How we protect your hardware cards, digital profiles, session credentials, and captured lead data.
          </p>
        </div>

        {/* Security Article Write-up */}
        <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base text-left">
          
          {/* Section 1: NTAG216 Chip Security */}
          <section className="space-y-3 border-b border-slate-200 dark:border-slate-800/80 pb-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              1. NTAG216 Hardware Chip Lock & Anti-Tamper Protection
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Every physical Enlazer Card embeds a genuine high-frequency NTAG216 NFC semiconductor chip. Before dispatch, each chip undergoes permanent hardware memory locking with write-protection keys to ensure complete data integrity.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Write-Lock Keys:</strong> Prevents malicious third-party overwrite attempts, unauthorized cloning, or reprogramming.
              </li>
              <li>
                <strong>7-Byte Unique Serial UID:</strong> Hardcoded at manufacture, providing an immutable physical hardware identity for every tag.
              </li>
            </ul>
          </section>

          {/* Section 2: AES-256 Data Encryption */}
          <section className="space-y-3 border-b border-slate-200 dark:border-slate-800/80 pb-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              2. AES-256 Storage Encryption & TLS 1.3 Transmission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Your digital profiles, contact cards, private notes, and saved leads are safeguarded by enterprise-grade encryption standards both at rest and in motion across our secure API infrastructure.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>AES-256 at Rest:</strong> All stored database records, encrypted contact cards, and secret tokens use military-grade AES-256 encryption.
              </li>
              <li>
                <strong>TLS 1.3 Transport Layer:</strong> All profile taps, web interactions, and API calls communicate via HTTPS with TLS 1.3 transport encryption.
              </li>
            </ul>
          </section>

          {/* Section 3: Session Security */}
          <section className="space-y-3 border-b border-slate-200 dark:border-slate-800/80 pb-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              3. Strict HTTP-Only Session Cookies & XSS Defense
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              To defend against account takeovers and browser-side script injection attacks, user session credentials are tokenized and isolated under strict web browser security policies.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>HTTP-Only Flags:</strong> Session tokens cannot be accessed or intercepted by client-side JavaScript code running in the browser.
              </li>
              <li>
                <strong>SameSite Strict Directives:</strong> Prevents Cross-Site Request Forgery (CSRF) by restricting session cookie transmissions to authorized origin requests only.
              </li>
            </ul>
          </section>

          {/* Section 4: Remote Card Freeze */}
          <section className="space-y-3 pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              4. Instant Remote Card Disabling & Emergency Freeze
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Should you ever misplace your physical Enlazer Card or NFC wristband at an event or conference, you maintain full real-time control directly from your account dashboard.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              <strong>Emergency Action:</strong> One click on <em>"Deactivate Card"</em> from your settings instantly freezes all physical tap redirects until your card is recovered or replaced.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecurityPage;

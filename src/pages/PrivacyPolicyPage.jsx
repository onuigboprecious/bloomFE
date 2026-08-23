import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ShieldCheck, Lock, Eye } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <div className="space-y-4 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 dark:bg-slate-900 text-[#00BCFF] border border-cyan-200 dark:border-slate-800">
            <Lock className="w-3.5 h-3.5 mr-1.5" />
            PRIVACY & DATA PROTECTION
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 font-mono">Last updated: August 2026 • Version 2.4</p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              1. Information We Collect
            </h2>
            <p>
              When you create a Bloom account, order a physical NFC card, or customize your digital profile handle (`bloom.app/@username`), we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account Credentials:</strong> Name, email address, hashed passwords, and handle.</li>
              <li><strong>Profile Content:</strong> Phone number, job title, company name, bio, social links, and custom theme settings.</li>
              <li><strong>Hardware Card Data:</strong> Unique NFC Hardware Chip Identifier (NTAG216 Card UID).</li>
              <li><strong>Lead & Tap Interactions:</strong> Timestamp, general location (city level), and device user-agent when someone taps your card or fills out a Share Back form.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-400" />
              2. How We Use Your Data
            </h2>
            <p>
              Your data is strictly utilized to render your public digital contact card, generate instant phonebook vCards, process physical card orders, and compile real-time analytics for your personal dashboard.
            </p>
            <p>
              <strong>We NEVER sell your personal information or contact list to third-party data brokers or advertisers.</strong>
            </p>
          </section>

          <section className="space-y-3 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Data Encryption & Storage
            </h2>
            <p>
              All traffic between your browser, physical NFC cards, and our servers is encrypted using AES-256 and SSL/TLS 1.3 protocol. Passwords and session keys are securely stored with bcrypt hashing algorithms.
            </p>
          </section>

          <section className="space-y-3 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Contact Us About Your Privacy
            </h2>
            <p>
              If you wish to request data deletion, export your leads, or have questions regarding data security, please contact our Data Protection Officer at <a href="mailto:privacy@bloomlabs.africa" className="text-[#00BCFF] font-bold hover:underline">privacy@bloomlabs.africa</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;

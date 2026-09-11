import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GoogleOAuthDisclosure = () => {
  const { setCurrentPage } = useApp() || {};

  return (
    <section id="google-privacy-transparency" className="py-16 bg-slate-900/60 dark:bg-slate-900/80 border-y border-slate-800 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00BCFF]/10 text-[#00BCFF] border border-[#00BCFF]/30">
            <Lock className="w-3.5 h-3.5" />
            <span>TRANSPARENT USER DATA PRIVACY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            How Enlazer Uses & Protects Your Google Data
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Enlazer is committed to total transparency regarding user data, Google OAuth authentication, and contacts synchronization.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Pillar 1 */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-white">1. Google Sign-In</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We request basic Google profile information (name, email, avatar) to securely verify your identity and log you into your Enlazer account without needing passwords.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-white">2. Google Contacts Sync</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              With explicit user consent (<code className="text-cyan-300 font-mono text-[11px]">/auth/contacts</code> scope), Enlazer allows you to save card-tap lead contacts directly into your personal Google Contacts account.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-white">3. Google Limited Use Policy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enlazer strictly adheres to the Google API Services User Data Policy, including Limited Use. We never sell, rent, or share your Google user data with third-party brokers.
            </p>
          </div>

        </div>

        {/* Footer Link to Privacy Policy */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <span className="text-slate-400 text-center sm:text-left">
            Have questions about your privacy or Google data usage? Read our complete, verified policy.
          </span>
          <button
            onClick={() => setCurrentPage && setCurrentPage('privacy')}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <span>View Full Privacy Policy</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default GoogleOAuthDisclosure;

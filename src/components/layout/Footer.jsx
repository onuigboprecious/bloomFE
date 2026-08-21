import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="footer" className="bg-slate-900 text-white pt-16 pb-12 mt-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-0.5">
              <span className="text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">bloom</span>
              <span className="text-2xl font-black text-[#00BCFF]">.</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Bloom Card is the next-generation NFC digital business card platform. Tap to share contacts, social links, portfolios, and capture leads effortlessly.
            </p>
            <div className="flex items-center gap-4 text-slate-400 text-xs pt-2">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-cyan-400" /> NTAG216 High-Speed Chip</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Universal Compatibility</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">NFC Finishes</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#customizer" className="hover:text-cyan-400 transition-colors">Stealth Matte Black</a></li>
              <li><a href="#customizer" className="hover:text-cyan-400 transition-colors">Stainless Steel Edition</a></li>
              <li><a href="#customizer" className="hover:text-cyan-400 transition-colors">Rose Gold Metallic</a></li>
              <li><a href="#customizer" className="hover:text-cyan-400 transition-colors">Eco Bamboo Wood</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Corporate Teams</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Press & Media</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Security & Encryption</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Returns & Guarantee</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bloom Card Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">NFC ENABLED</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">iOS & ANDROID</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

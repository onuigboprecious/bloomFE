import React from 'react';
import { ShieldCheck, Lock, MapPin, Mail, Phone } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer id="footer" className="bg-slate-900 text-white pt-16 pb-12 mt-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 text-left cursor-pointer">
              <span className="text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">bloom</span>
              <span className="text-2xl font-black text-[#00BCFF]">.</span>
            </button>
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
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">NFC Products</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><button onClick={() => setCurrentPage('cards')} className="hover:text-cyan-400 transition-colors cursor-pointer text-left">NFC Cards</button></li>
              <li><button onClick={() => setCurrentPage('wristbands')} className="hover:text-cyan-400 transition-colors cursor-pointer text-left">Active Wristband</button></li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Victoria Island, Lagos & CBD, Abuja, Nigeria</span>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:support@bloom.app" className="hover:text-cyan-400 transition-colors">support@bloom.app</a>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+2348031234567" className="hover:text-cyan-400 transition-colors">+234 803 123 4567</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><button onClick={() => setCurrentPage('privacy')} className="hover:text-cyan-400 transition-colors cursor-pointer text-left">Privacy Policy</button></li>
              <li><button onClick={() => setCurrentPage('terms')} className="hover:text-cyan-400 transition-colors cursor-pointer text-left">Terms of Service</button></li>
              <li><button onClick={() => setCurrentPage('security')} className="hover:text-cyan-400 transition-colors cursor-pointer text-left">Security & Encryption</button></li>
              <li><button onClick={() => setCurrentPage('returns')} className="hover:text-cyan-400 transition-colors cursor-pointer text-left">Returns & Guarantee</button></li>
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

import React from 'react';
import { ShieldCheck, Lock, MapPin, Mail, Phone, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const { setCurrentPage } = useApp();

  const whatsappUrl = "https://wa.me/2348084137577?text=Hello%20Enlazer%20Support%2C%20I%20have%20a%20question%20about%20my%20NFC%20card";

  return (
    <footer id="footer" className="bg-slate-900 text-white pt-16 pb-12 mt-24 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">

          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 text-left cursor-pointer">
              <span className="text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">enlazer</span>
              <span className="text-2xl font-black text-[#00BCFF]">.</span>
            </button>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Enlazer is Africa & Nigeria's #1 NFC smart card and hosted digital profile platform. Build your profile free, share with one tap, and get doorstep NFC card delivery across FCT Abuja and all 36 states of Nigeria.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs pt-1">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-cyan-400" />Free Hosted Profile</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free NFC Card Delivery</span>
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
                <a href="mailto:support@enlazer.com.ng" className="hover:text-cyan-400 transition-colors">support@enlazer.com.ng</a>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+2348084137577" className="hover:text-cyan-400 transition-colors">+234 808 413 7577</a>
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

        {/* Bottom Bar: Copyright on Left, Social Icons on Right */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Enlazer; A commercial product of Infarbloom. All rights reserved.</p>

          {/* Social Media Icon Buttons */}
          <div className="flex items-center gap-2.5">
            {/* TikTok */}
            <a
              href="https://tiktok.com/@enlazer_cloud"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-8.5 h-8.5 rounded-xl bg-slate-800 hover:bg-black border border-slate-700 hover:border-cyan-400/50 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
            >
              <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68 6.34 6.34 0 009.67 22A6.33 6.33 0 0016 15.67V9a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.18-.43z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/enlazer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8.5 h-8.5 rounded-xl bg-slate-800 hover:bg-[#1877F2] border border-slate-700 hover:border-[#1877F2]/50 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
            >
              <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/enlazer_cloud"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8.5 h-8.5 rounded-xl bg-slate-800 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] border border-slate-700 hover:border-pink-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
            >
              <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/enlazer_cloud"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-8.5 h-8.5 rounded-xl bg-slate-800 hover:bg-slate-950 border border-slate-700 hover:border-cyan-400/50 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
            >
              <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

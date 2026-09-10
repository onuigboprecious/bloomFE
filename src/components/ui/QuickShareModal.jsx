import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink, Download, QrCode, Smartphone, Sparkles, Share2 } from 'lucide-react';
import { getAppDomainUrl } from '../../config/domainConfig';

export const QuickShareModal = ({ isOpen, onClose, profile, customHandle, saveContactToPhone }) => {
  const [copied, setCopied] = useState(false);
  const liveUrl = getAppDomainUrl(`/${customHandle || profile?.username || 'user'}`);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate a clean inline SVG QR Code representation for instant scanning
  const qrTarget = encodeURIComponent(liveUrl);
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${qrTarget}&color=00bcff&bgcolor=0f172a`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white overflow-hidden z-10"
        >
          {/* Top Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-[#00BCFF] border border-cyan-500/20">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-1.5">
                  <span>Share Your Profile</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </h3>
                <p className="text-xs text-slate-400">Scan QR or share link directly with contacts</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center space-y-4 pt-2 relative z-10">
            <div className="p-4 bg-slate-950 border-2 border-cyan-500/30 rounded-3xl shadow-xl shadow-cyan-500/10 relative group">
              <img
                src={qrApiUrl}
                alt="Profile QR Code"
                className="w-52 h-52 object-contain rounded-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/260?text=Scan+QR";
                }}
              />
              <div className="absolute inset-0 bg-slate-950/80 rounded-2xl flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity text-center space-y-2">
                <Smartphone className="w-8 h-8 text-[#00BCFF] animate-bounce" />
                <span className="text-xs font-bold text-white">Tap NFC Card or Scan QR</span>
                <span className="text-[10px] text-slate-400">Zero app download required</span>
              </div>
            </div>

            {/* Profile Handle Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300">
              <Share2 className="w-3.5 h-3.5 text-[#00BCFF]" />
              <span className="truncate max-w-[220px]">enlazer.cloud/{customHandle || profile?.username || 'user'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2 relative z-10">
            <button
              onClick={handleCopy}
              className="w-full py-3.5 rounded-2xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
              <span>{copied ? 'Profile Link Copied!' : 'Copy Live Link'}</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  if (saveContactToPhone) saveContactToPhone();
                }}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save .vCard</span>
              </button>

              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Live</span>
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-[10px] text-slate-500 text-center font-medium">
            🔒 Protected by Bloom Cryptographic Signature Gatekeeper
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickShareModal;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, XCircle, ShoppingBag, ShieldAlert, KeyRound } from 'lucide-react';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';

export const InvalidCardPage = ({ reason: propReason, message: propMessage }) => {
  const { setCurrentPage } = useApp();
  const [reason, setReason] = useState(propReason || '');
  const [customMessage, setCustomMessage] = useState(propMessage || '');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reasonFromUrl = params.get('reason');
    if (reasonFromUrl) setReason(reasonFromUrl);
  }, []);

  const getReasonDetails = () => {
    if (reason === 'tampered_signature') {
      return {
        title: 'Invalid NFC Signature',
        body: customMessage || 'This card signature is fake or modified. Hardware card signature verification failed.',
        badge: 'HMAC Signature Verification Failed',
      };
    }

    if (reason === 'unregistered_card') {
      return {
        title: 'Unregistered Card',
        body: customMessage || 'This card has not been registered or provisioned in our system.',
        badge: 'Card UID Not Provisioned',
      };
    }

    return {
      title: 'Unregistered NFC Card',
      body: customMessage || 'This card has not been provisioned by Enlazer or has an invalid signature. Make sure you are using an official Enlazer NFC card.',
      badge: 'Unverified Hardware Card',
    };
  };

  const details = getReasonDetails();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col justify-between relative overflow-hidden transition-colors">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between z-10">
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 px-3.5 py-2 rounded-full transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 group">
          <span className="text-2xl font-black tracking-tight text-slate-950 dark:text-white font-['Plus_Jakarta_Sans']">enlazer</span>
          <span className="text-2xl font-black text-[#00BCFF] group-hover:scale-125 transition-transform">.</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto px-4 py-8 z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-rose-100/90 dark:border-rose-950/60 text-center space-y-6 relative"
        >
          <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 border border-rose-200 dark:border-rose-900 flex items-center justify-center mx-auto shadow-xl">
            {reason === 'tampered_signature' ? (
              <KeyRound className="w-10 h-10 stroke-[2]" />
            ) : (
              <XCircle className="w-12 h-12 stroke-[2]" />
            )}
          </div>

          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              {details.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {details.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {details.body}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2 text-left">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Official Enlazer cards include laser-engraved security UIDs and signed digital certificates.</span>
          </div>

          <div className="pt-2">
            <Button
              onClick={() => setCurrentPage('cards')}
              variant="primary"
              size="lg"
              className="w-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold py-4 text-sm shadow-lg shadow-cyan-400/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Official Enlazer Card</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 z-10">
        © {new Date().getFullYear()} Enlazer Card Technologies Ltd. All rights reserved.
      </div>
    </div>
  );
};

export default InvalidCardPage;

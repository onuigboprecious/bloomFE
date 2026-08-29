import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Copy, ShieldCheck, Mail, User, Phone, CreditCard, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WaitlistModal = ({ isOpen, onClose }) => {
  const { joinWaitlist, cardFinishes } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredFinish: 'Stealth Matte Black'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [queuePosition, setQueuePosition] = useState(342);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      joinWaitlist(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Randomize queue position around 300s
      setQueuePosition(Math.floor(250 + Math.random() * 150));
    }, 800);
  };

  const handleCopyLink = () => {
    const handle = (formData.name || 'member').toLowerCase().replace(/\s+/g, '');
    const refUrl = `https://enlazer.app/waitlist?ref=${handle}`;
    navigator.clipboard.writeText(refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', preferredFinish: 'Stealth Matte Black' });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Modal Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 my-8"
        >
          {/* Top Decorative Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            /* Waitlist Form View */
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Header Badge & Title */}
              <div className="text-center space-y-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 text-xs font-bold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  VIP Early Access Waitlist
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  Get Cards by Bloom
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  Be the first to get physical NFC cards & smart profile handles when our next batch drops in Lagos & Abuja.
                </p>
              </div>

              {/* Form inputs */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name <span className="text-cyan-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Precious Onuigbo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address <span className="text-cyan-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="precious@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    WhatsApp / Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+234 803 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Preferred Finish */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Preferred Card Finish
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {cardFinishes.slice(0, 4).map((finish) => {
                      const isSelected = formData.preferredFinish === finish.name;
                      return (
                        <div
                          key={finish.id}
                          onClick={() => setFormData({ ...formData, preferredFinish: finish.name })}
                          className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 shadow-xs'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          <span className="truncate pr-1">{finish.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#00BCFF] hover:bg-cyan-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-4"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Reserving your spot...
                    </span>
                  ) : (
                    <>
                      <span>Join VIP Waitlist</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Security Assurance */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Free • Early Access Discounts • No Spam</span>
              </div>
            </div>
          ) : (
            /* Confirmation Success State */
            <div className="p-6 sm:p-8 text-center space-y-6">
              
              {/* Success Badge Icon */}
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  You're on the list! 🎉
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. We've reserved your VIP priority spot.
                </p>
              </div>

              {/* Waitlist Ticket Position */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-inner flex items-center justify-around">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 block">Queue Spot</span>
                  <span className="text-2xl font-extrabold font-mono text-white">#{queuePosition}</span>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Status</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    VIP Priority
                  </span>
                </div>
              </div>

              {/* Referral Link Box */}
              <div className="space-y-2 text-left">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Invite friends to jump the queue:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://enlazer.app/waitlist?ref=${(formData.name || 'member').toLowerCase().replace(/\s+/g, '')}`}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WaitlistModal;

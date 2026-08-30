import React, { useState } from 'react';
import Modal from './Modal';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WaitlistModal = ({ isOpen, onClose }) => {
  const { joinWaitlist } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      if (joinWaitlist) {
        await joinWaitlist(email);
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Join the Exclusive Waitlist">
      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">You're on the VIP List!</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            We've reserved your priority spot. We'll notify you as soon as next-gen Enlazer features unlock.
          </p>
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
          >
            Got It!
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-[#00BCFF] text-xs font-semibold">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Get early access to NFC Metal Black Cards & custom bio features.</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer"
          >
            {loading ? 'Joining...' : 'Join Waitlist Now'}
          </button>
        </form>
      )}
    </Modal>
  );
};

export default WaitlistModal;

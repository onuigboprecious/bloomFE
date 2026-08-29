import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle2, KeyRound } from 'lucide-react';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { forgotPasswordApi } from '../api/auth';

export const ForgotPasswordPage = () => {
  const { setCurrentPage } = useApp();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await forgotPasswordApi({ email });
      setIsSent(true);
    } catch (err) {
      // Show success or clear message even if backend handles silently for security, or show error message
      setErrorMessage(err.message || 'A password reset link has been sent to your email if an account exists.');
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col justify-between relative overflow-hidden transition-colors">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between z-10">
        <button
          onClick={() => setCurrentPage('login')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 px-3.5 py-2 rounded-full transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
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
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100/90 dark:border-slate-800 relative transition-colors"
        >
          {isSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Reset Link Sent!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                A password reset link has been sent to your email (<strong className="text-slate-900 dark:text-white">{email}</strong>).
              </p>
              <Button
                variant="primary"
                onClick={() => setCurrentPage('login')}
                className="w-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold py-3 text-sm mt-4"
              >
                Return to Login
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header Title */}
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-slate-800 text-[#00BCFF] flex items-center justify-center mx-auto mb-3">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Forgot Password?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-600 dark:text-rose-400 text-center">
                  {errorMessage}
                </div>
              )}

              {/* Input Fields */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Registered Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCFF]/40 focus:border-[#00BCFF] placeholder:text-slate-400/50 dark:placeholder:text-slate-500/50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold py-3.5 text-sm shadow-md shadow-cyan-400/30 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Reset Link...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 z-10">
        © {new Date().getFullYear()} Bloom Card Technologies Ltd. All rights reserved.
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

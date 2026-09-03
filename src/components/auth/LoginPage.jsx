import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Mail, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';

export const LoginPage = () => {
  const { setCurrentPage, loginUser, loginWithGoogleRedirect, selectedFinish, setIsOrderModalOpen } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await loginUser({ email, password });
      setLoginSuccess(true);
      setTimeout(() => {
        const pendingCardUid = localStorage.getItem('pending_claim_cardUid');
        if (pendingCardUid) {
          setCurrentPage('claim-card');
        } else if (selectedFinish) {
          setIsOrderModalOpen(true);
          setCurrentPage('home');
        } else {
          setCurrentPage('home');
        }
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
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
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 px-3.5 py-2 rounded-none hover:rounded-full transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <a href="#" onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 group">
          <span className="text-2xl font-black tracking-tight text-slate-950 dark:text-white font-['Plus_Jakarta_Sans']">enlazer</span>
          <span className="text-2xl font-black text-[#00BCFF] group-hover:scale-125 transition-transform">.</span>
        </a>
      </div>

      {/* Main Login Card Container */}
      <div className="w-full max-w-md mx-auto px-4 py-8 z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-lg dark:shadow-none border border-slate-100/90 dark:border-slate-800 relative transition-colors"
        >
          {loginSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Welcome Back!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Log in successful. Redirecting to your Enlazer dashboard...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Header Title */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Welcome to Enlazer
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Log in to manage your NFC card & digital contacts
                </p>
              </div>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={loginWithGoogleRedirect}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/70 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-none cursor-pointer group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
                <span className="bg-white dark:bg-slate-900 px-3 text-[11px] uppercase tracking-wider font-semibold text-slate-400 shrink-0">
                  or continue with email
                </span>
                <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-600 dark:text-rose-400 text-center">
                  {errorMessage}
                </div>
              )}

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCFF]/40 focus:border-[#00BCFF] placeholder:text-slate-400/50 dark:placeholder:text-slate-500/50 placeholder:italic placeholder:font-normal"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setCurrentPage('forgot-password')}
                      className="text-xs font-bold text-[#00BCFF] hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCFF]/40 focus:border-[#00BCFF] placeholder:text-slate-400/50 dark:placeholder:text-slate-500/50 placeholder:italic placeholder:font-normal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300 text-[#00BCFF] focus:ring-[#00BCFF]"
                  />
                  <span>Remember this device</span>
                </label>
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
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  'Log In to Dashboard'
                )}
              </Button>

              {/* Switch to Sign Up */}
              <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                Don't have an Enlazer Card yet?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentPage('signup')}
                  className="font-bold text-[#00BCFF] hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 z-10">
        © {new Date().getFullYear()} Enlazer Card Technologies Ltd. All rights reserved.
      </div>
    </div>
  );
};

export default LoginPage;

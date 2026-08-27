import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, CreditCard, LogIn, UserPlus } from 'lucide-react';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { claimCardApi } from '../api/profile';

export const ClaimCardPage = ({ cardUid: initialUid }) => {
  const { setCurrentPage, isAuthenticated, user, claimAndLinkCard } = useApp();
  const [cardUid, setCardUid] = useState(initialUid || 'BLM-88A92K-NFC');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [claimSuccess, setClaimSuccess] = useState(false);

  useEffect(() => {
    // Extract cardUid from URL query string ?cardUid=... or fallback to initialUid or localStorage
    const params = new URLSearchParams(window.location.search);
    const uidFromUrl = params.get('cardUid') || localStorage.getItem('pending_claim_cardUid');
    if (uidFromUrl) {
      setCardUid(uidFromUrl);
    } else if (initialUid) {
      setCardUid(initialUid);
    }
  }, [initialUid]);

  const handleClaimCard = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await claimCardApi(cardUid);
      await claimAndLinkCard(cardUid);
      localStorage.removeItem('pending_claim_cardUid');
      setClaimSuccess(true);
      setTimeout(() => {
        setCurrentPage('dashboard');
      }, 1500);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to claim card. It may already be linked to another account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRedirectAuth = (targetPage) => {
    localStorage.setItem('pending_claim_cardUid', cardUid);
    setCurrentPage(targetPage);
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
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 px-3.5 py-2 rounded-full transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 group">
          <span className="text-2xl font-black tracking-tight text-slate-950 dark:text-white font-['Plus_Jakarta_Sans']">bloom</span>
          <span className="text-2xl font-black text-[#00BCFF] group-hover:scale-125 transition-transform">.</span>
        </button>
      </div>

      {/* Main Claim Container */}
      <div className="w-full max-w-lg mx-auto px-4 py-8 z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100/90 dark:border-slate-800 relative text-center space-y-6"
        >
          {/* Welcome Banner */}
          <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-slate-800/80 border border-cyan-200 dark:border-slate-700 text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00BCFF] shrink-0" />
            <span>🎉 Welcome to Bloom! You've tapped a brand new NFC Card.</span>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-slate-950 text-[#00BCFF] border border-cyan-500/30 flex items-center justify-center mx-auto shadow-xl">
            <CreditCard className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Claim Your Bloom Card
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
              Hardware ID: <strong className="text-slate-900 dark:text-white">{cardUid}</strong>
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-600 dark:text-rose-400 text-center">
              {errorMessage}
            </div>
          )}

          {claimSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 space-y-3"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Card Claimed Successfully!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Redirecting to your dashboard...</p>
            </motion.div>
          ) : (
            <div className="space-y-4 pt-2">
              {isAuthenticated ? (
                /* Authenticated State */
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Logged in as <strong className="text-slate-900 dark:text-white">{user?.email || 'User'}</strong>. Link this physical card to your profile now.
                  </p>
                  <Button
                    onClick={handleClaimCard}
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold py-4 text-sm shadow-lg shadow-cyan-400/30 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Claiming Card...
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>Claim Card & Link to My Profile</span>
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                /* Unauthenticated State */
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Log in or create a free Bloom account to associate this physical NFC card with your profile.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <Button
                      onClick={() => handleRedirectAuth('login')}
                      variant="secondary"
                      className="w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 border-slate-300 dark:border-slate-700"
                    >
                      <LogIn className="w-4 h-4 text-[#00BCFF]" />
                      <span>Log In to Claim</span>
                    </Button>
                    <Button
                      onClick={() => handleRedirectAuth('signup')}
                      variant="primary"
                      className="w-full py-3.5 text-xs font-bold bg-[#00BCFF] text-white flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Create Account to Claim</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
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

export default ClaimCardPage;

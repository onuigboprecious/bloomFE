import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { claimCardApi } from '../api/profile';

export const ClaimCardPage = ({ cardUid: initialUid }) => {
  const { setCurrentPage, isAuthenticated, user, claimAndLinkCard, profile } = useApp();
  const [cardUid, setCardUid] = useState(initialUid || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [claimSuccess, setClaimSuccess] = useState(false);

  useEffect(() => {
    // Prioritize passed initialUid prop -> URL query string ?cardUid=... -> fallback pending_claim_cardUid from localStorage
    const params = new URLSearchParams(window.location.search);
    const uidFromUrl = params.get('cardUid');
    const pendingFromStorage = localStorage.getItem('pending_claim_cardUid');

    if (initialUid) {
      setCardUid(initialUid);
    } else if (uidFromUrl) {
      setCardUid(uidFromUrl);
    } else if (pendingFromStorage) {
      setCardUid(pendingFromStorage);
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-between relative overflow-hidden transition-colors">

      {/* Top Header Row */}
      <div className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between z-10">
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-dim)] hover:text-[var(--text)] bg-[var(--card-hover)] px-3.5 py-2 rounded-full transition-all duration-300 cursor-pointer border border-[var(--border)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 group">
          <span className="text-2xl font-black tracking-tight text-[var(--text)] font-['Plus_Jakarta_Sans']">enlazer</span>
          <span className="text-2xl font-black text-[var(--accent)] group-hover:scale-125 transition-transform">.</span>
        </button>
      </div>

      {/* Main Claim Container */}
      <div className="w-full max-w-lg mx-auto px-4 py-8 z-10 my-auto">
        
        {/* Welcome Header Text - Left Aligned, Not in a Card Box */}
        <div className="mb-5 text-left space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
            Welcome to Enlazer!
          </h1>
          <p className="text-sm font-medium text-[var(--text-dim)]">
            You've tapped a brand new NFC Card.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-[var(--card)] rounded-2xl p-6 sm:p-8 shadow-xl border border-[var(--border)] text-left space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[var(--card-hover)] text-[var(--accent)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <CreditCard className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">
                Claim Your Enlazer Card
              </h2>
              <p className="text-xs text-[var(--text-dim)] mt-1 font-mono">
                Hardware ID: <strong className="text-[var(--text)]">{cardUid}</strong>
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-500 text-left">
              {errorMessage}
            </div>
          )}

          {claimSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-2 space-y-5 text-left"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-[var(--success)]/10 text-[var(--success)] flex items-center justify-center border border-[var(--success)]/20">
                  <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-extrabold text-[var(--text)]">Card #{cardUid} Successfully Linked!</h3>
                <p className="text-xs text-[var(--text-dim)]">
                  Your physical Enlazer NFC card has been claimed and linked to your account.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setCurrentPage('dashboard')}
                  variant="primary"
                  className="bg-[var(--accent)] text-white font-bold py-3 px-6 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:opacity-90"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to My Dashboard</span>
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4 pt-1">
              {isAuthenticated ? (
                /* Authenticated State */
                <div className="space-y-4">
                  <p className="text-xs text-[var(--text-dim)]">
                    Logged in as <strong className="text-[var(--text)]">{user?.email || 'User'}</strong>. Link this physical card to your profile now.
                  </p>
                  <Button
                    onClick={handleClaimCard}
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--accent)] hover:opacity-90 text-white font-bold py-3.5 text-sm shadow-xs cursor-pointer flex items-center justify-center gap-2"
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
                  <p className="text-xs text-[var(--text-dim)]">
                    Log in or create a free Enlazer account to associate this physical NFC card with your profile.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <Button
                      onClick={() => handleRedirectAuth('login')}
                      variant="secondary"
                      className="w-full py-3 text-xs font-bold flex items-center justify-center gap-2 bg-[var(--card-hover)] border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)]"
                    >
                      <LogIn className="w-4 h-4 text-[var(--accent)]" />
                      <span>Log In to Claim</span>
                    </Button>
                    <Button
                      onClick={() => handleRedirectAuth('signup')}
                      variant="primary"
                      className="w-full py-3 text-xs font-bold bg-[var(--accent)] text-white flex items-center justify-center gap-2 hover:opacity-90"
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
      <div className="text-center py-6 text-xs text-[var(--text-faint)] z-10">
        © {new Date().getFullYear()} Enlazer Card Technologies Ltd. All rights reserved.
      </div>
    </div>
  );
};

export default ClaimCardPage;


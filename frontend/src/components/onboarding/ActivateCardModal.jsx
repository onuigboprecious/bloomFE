import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rss, CheckCircle2, ShieldCheck, User, Building2, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useApp } from '../../context/AppContext';

export const ActivateCardModal = ({ isOpen, onClose }) => {
  const { updateProfileField, setCurrentPage, claimAndLinkCard } = useApp();
  const [step, setStep] = useState(1); // 1: Scan/UID, 2: Complete
  const [cardUid, setCardUid] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const newUid = 'BLM-' + Math.floor(1000 + Math.random() * 9000) + '-NFC';
      setCardUid(newUid);
      claimAndLinkCard(newUid);
      setStep(4); // Card is immediately claimed & linked!
    }, 1200);
  };

  const handleClaimCard = () => {
    setStep(3);
  };

  const handleCompleteSetup = (e) => {
    e.preventDefault();
    if (fullName) updateProfileField('name', fullName);
    if (company) updateProfileField('company', company);
    if (jobTitle) updateProfileField('title', jobTitle);
    setStep(4);
  };

  const handleFinish = () => {
    onClose();
    setCurrentPage('dashboard');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      {/* STEP 1: Scan NFC / Enter UID */}
      {step === 1 && (
        <div className="space-y-5 text-center">
          <div className="w-16 h-16 rounded-3xl bg-cyan-50 dark:bg-slate-800 border border-cyan-100 dark:border-slate-700 text-[#00BCFF] flex items-center justify-center mx-auto shadow-md">
            <Rss className="w-8 h-8 stroke-[2.5] animate-pulse" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Activate Your Bloom Card</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tap your physical NFC card against your phone or enter the activation code on the back.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <Button
              variant="primary"
              size="lg"
              disabled={isScanning}
              onClick={handleSimulateScan}
              className="w-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold py-3 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-400/20"
            >
              {isScanning ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Simulating NFC Tap...
                </span>
              ) : (
                <>
                  <Rss className="w-4 h-4" />
                  <span>Simulate NFC Card Tap</span>
                </>
              )}
            </Button>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-slate-50 dark:bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-400 absolute">
                or enter code manually
              </span>
            </div>

            <div className="pt-2 flex gap-2">
              <input
                type="text"
                value={cardUid}
                onChange={(e) => setCardUid(e.target.value.toUpperCase())}
                placeholder="e.g. BLM-9921-NFC"
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-3.5 py-2 rounded-xl text-xs uppercase font-mono font-bold focus:outline-none focus:border-[#00BCFF]"
              />
              <Button
                variant="secondary"
                disabled={!cardUid}
                onClick={() => {
                  claimAndLinkCard(cardUid);
                  setStep(4);
                }}
                className="px-4 py-2 text-xs font-bold whitespace-nowrap cursor-pointer"
              >
                Claim & Link Instantly
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Claim Ownership */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="text-center space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
              ✓ Card Verified
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Claim Card #{cardUid}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This card is ready to be linked to your digital contact profile.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Card UID</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{cardUid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Security Encryption</span>
              <span className="font-bold text-emerald-600">NTAG216 Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status</span>
              <span className="font-bold text-cyan-600">Unclaimed</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleClaimCard}
            className="w-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold py-3 text-sm cursor-pointer shadow-md"
          >
            Claim & Link to My Account
          </Button>
        </div>
      )}

      {/* STEP 3: Create Profile in Under 60 Seconds */}
      {step === 3 && (
        <form onSubmit={handleCompleteSetup} className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Quick Profile Setup</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set up your public card details in under 60 seconds.
            </p>
          </div>

          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Precious Onuigbo"
            required
          />

          <Input
            label="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Founder & CEO"
            required
          />

          <Input
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Bloom Labs Africa"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold py-3 text-sm cursor-pointer mt-2"
          >
            Save & Activate Card
          </Button>
        </form>
      )}

      {/* STEP 4: Complete */}
      {step === 4 && (
        <div className="text-center space-y-5 py-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Bloom Card Activated!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your physical card is now linked to your digital profile and live for NFC tapping.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleFinish}
            className="w-full bg-[#00BCFF] hover:bg-cyan-500 font-bold cursor-pointer"
          >
            Go to My Dashboard
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ActivateCardModal;

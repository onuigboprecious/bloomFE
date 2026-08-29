import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rss, CheckCircle2, ShieldCheck, User, Building2, Mail, Lock, ArrowRight, ArrowLeft, Eye, Zap } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import MobilePhonePreview from '../ui/MobilePhonePreview';
import { useApp } from '../../context/AppContext';

export const ActivateCardModal = ({ isOpen, onClose }) => {
  const { profile, updateProfileField, setCurrentPage, claimAndLinkCard } = useApp();
  const [step, setStep] = useState(1); // 1: Scan/UID, 2: Complete, 3: Profile Setup, 4: Finish
  const [cardUid, setCardUid] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [fullName, setFullName] = useState(profile?.name || '');
  const [jobTitle, setJobTitle] = useState(profile?.title || '');
  const [company, setCompany] = useState(profile?.company || '');
  const [scanStatus, setScanStatus] = useState('');

  const handleSimulateScan = async () => {
    setIsScanning(true);
    setScanStatus('');

    // Check if Web NFC API (NDEFReader) is supported on device/browser
    if (typeof window !== 'undefined' && 'NDEFReader' in window) {
      try {
        setScanStatus('Hold your physical Enlazer NFC card near your phone...');
        const ndef = new window.NDEFReader();
        await ndef.scan();
        ndef.onreading = (event) => {
          const serialNumber = event.serialNumber;
          const scannedUid = serialNumber 
            ? `ENL-${serialNumber.replace(/:/g, '').slice(0, 4).toUpperCase()}-NFC` 
            : ('ENL-' + Math.floor(1000 + Math.random() * 9000) + '-NFC');
          setCardUid(scannedUid);
          claimAndLinkCard(scannedUid);
          setIsScanning(false);
          setScanStatus('');
          setStep(4);
        };
        ndef.onreadingerror = () => {
          setScanStatus('Error reading tag. Using manual fallback code...');
          fallbackScanSimulation();
        };
        return;
      } catch (err) {
        setScanStatus('Web NFC permission error. Simulating NFC tap...');
      }
    }
    fallbackScanSimulation();
  };

  const fallbackScanSimulation = () => {
    setTimeout(() => {
      setIsScanning(false);
      setScanStatus('');
      const newUid = 'ENL-' + Math.floor(1000 + Math.random() * 9000) + '-NFC';
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
      <div className="p-6 text-white space-y-6 relative overflow-hidden bg-slate-900">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* STEP 1: Scan NFC / Enter UID */}
        {step === 1 && (
          <div className="space-y-6 text-center relative z-10">
            
            {/* Glowing Icon Badge */}
            <div className="relative w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-[#00BCFF] flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
              <Rss className="w-8 h-8 stroke-[2.5] animate-pulse" />
              <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 animate-ping pointer-events-none" />
            </div>

            {/* Header Text */}
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-white tracking-tight">Activate Your Enlazer Card</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Tap your physical NFC card against your phone or enter the activation code on the back.
              </p>
            </div>

            {/* Inner Dark Form Container */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 shadow-xl">
              
              {/* Simulate Tap Primary Blue Button */}
              <button
                disabled={isScanning}
                onClick={handleSimulateScan}
                className="w-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black py-3.5 px-4 text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Simulating NFC Tap...</span>
                  </span>
                ) : (
                  <>
                    <Rss className="w-4 h-4" />
                    <span>Simulate NFC Card Tap</span>
                  </>
                )}
              </button>

              {scanStatus && (
                <p className="text-[11px] font-bold text-cyan-400 animate-pulse">{scanStatus}</p>
              )}

              {/* Or Enter Code Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-slate-950 px-3 text-[9px] uppercase font-black tracking-widest text-slate-500 absolute">
                  OR ENTER CODE MANUALLY
                </span>
              </div>

              {/* Manual Input + Claim */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={cardUid}
                  onChange={(e) => setCardUid(e.target.value.toUpperCase())}
                  placeholder="e.g. ENL-9921-NFC"
                  className="w-full bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs uppercase font-mono font-bold focus:outline-none focus:border-[#00BCFF] placeholder-slate-600"
                />
                <button
                  disabled={!cardUid}
                  onClick={() => {
                    claimAndLinkCard(cardUid);
                    setStep(4);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs whitespace-nowrap transition-colors disabled:opacity-40 cursor-pointer border border-slate-700 shrink-0"
                >
                  Claim & Link
                </button>
              </div>

            </div>

          </div>
        )}

        {/* STEP 2: Claim Ownership */}
        {step === 2 && (
          <div className="space-y-6 relative z-10 text-center">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Tag
              </span>
              <h3 className="text-xl font-black text-white">Claim Card #{cardUid}</h3>
              <p className="text-xs text-slate-400">
                This card is ready to be linked to your digital contact profile.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5 text-xs text-left">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Card UID</span>
                <span className="font-mono font-bold text-white">{cardUid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Security Chip</span>
                <span className="font-bold text-emerald-400">NTAG216 Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Hardware Status</span>
                <span className="font-bold text-[#00BCFF]">Unclaimed</span>
              </div>
            </div>

            <button
              onClick={handleClaimCard}
              className="w-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black py-3.5 text-xs rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95 transition-all"
            >
              Claim & Link to My Account
            </button>
          </div>
        )}

        {/* STEP 3: Create Profile in Under 60 Seconds */}
        {step === 3 && (
          <form onSubmit={handleCompleteSetup} className="space-y-4 relative z-10">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-white">Quick Profile Setup</h3>
              <p className="text-xs text-slate-400">
                Set up your public card details in under 60 seconds.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] font-extrabold text-slate-400 uppercase block mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Precious Onuigbo"
                  className="w-full bg-slate-950 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-slate-400 uppercase block mb-1">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Founder & CEO"
                  className="w-full bg-slate-950 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-slate-400 uppercase block mb-1">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Enlazer Labs Africa"
                  className="w-full bg-slate-950 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black py-3.5 text-xs rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95 transition-all mt-2"
            >
              Save & Activate Card
            </button>
          </form>
        )}

        {/* STEP 4: Complete & Live Preview */}
        {step === 4 && (
          <div className="text-center space-y-4 py-1 max-h-[80vh] overflow-y-auto custom-scrollbar px-1 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Enlazer Card Activated!</h3>
              <p className="text-xs text-slate-400">
                Below is the live preview of what people see when they tap your card:
              </p>
            </div>

            <div className="py-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#00BCFF] text-[10px] font-extrabold uppercase mb-3">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Tap View Preview</span>
              </div>
              <MobilePhonePreview data={profile} className="scale-95" />
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black py-3.5 text-xs rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95 transition-all"
            >
              Go to My Dashboard
            </button>
          </div>
        )}

      </div>
    </Modal>
  );
};

export default ActivateCardModal;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rss,
  CheckCircle2,
  ShieldCheck,
  User,
  Briefcase,
  Building2,
  Phone,
  Globe,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CreditCard,
  Smartphone,
  Check,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import MobilePhonePreview from '../components/ui/MobilePhonePreview';
import SocialIcon from '../components/ui/SocialIcon';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const OnboardingSetupPage = () => {
  const {
    profile,
    updateProfileField,
    updateSocialLink,
    claimAndLinkCard,
    activeCardUid,
    setCurrentPage
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1); // 1: Card, 2: Profile, 3: Socials, 4: Preview
  const [cardUidInput, setCardUidInput] = useState(activeCardUid || '');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [cardLinkedSuccess, setCardLinkedSuccess] = useState(true);

  // Local Form States
  const [name, setName] = useState(profile?.name || '');
  const [title, setTitle] = useState(profile?.title || '');
  const [company, setCompany] = useState(profile?.company || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [bio, setBio] = useState(profile?.bio || '');

  const [website, setWebsite] = useState(profile?.website || '');
  const [linkedin, setLinkedin] = useState(profile?.socials?.linkedin || '');
  const [twitter, setTwitter] = useState(profile?.socials?.twitter || '');
  const [instagram, setInstagram] = useState(profile?.socials?.instagram || '');

  // NFC Scan Handler with Native NDEFReader + Graceful Fallback
  const handleScanCard = async () => {
    setIsScanning(true);
    setScanStatus('');

    if (typeof window !== 'undefined' && 'NDEFReader' in window) {
      try {
        setScanStatus('Hold your physical Bloom card near your smartphone...');
        const ndef = new window.NDEFReader();
        await ndef.scan();
        ndef.onreading = (event) => {
          const serialNumber = event.serialNumber;
          const scannedUid = serialNumber
            ? `BLM-${serialNumber.replace(/:/g, '').slice(0, 4).toUpperCase()}-NFC`
            : ('BLM-' + Math.floor(1000 + Math.random() * 9000) + '-NFC');
          setCardUidInput(scannedUid);
          claimAndLinkCard(scannedUid);
          setCardLinkedSuccess(true);
          setIsScanning(false);
          setScanStatus('');
        };
        ndef.onreadingerror = () => {
          setScanStatus('Failed to read tag. Using simulated NFC code...');
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
      const generatedUid = 'BLM-' + Math.floor(1000 + Math.random() * 9000) + '-NFC';
      setCardUidInput(generatedUid);
      claimAndLinkCard(generatedUid);
      setCardLinkedSuccess(true);
      setIsScanning(false);
      setScanStatus('');
    }, 1200);
  };

  const handleManualBindCard = (e) => {
    e.preventDefault();
    if (!cardUidInput) return;
    claimAndLinkCard(cardUidInput);
    setCardLinkedSuccess(true);
  };

  // Step 2 Submit Handler
  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (name) updateProfileField('name', name);
    if (title) updateProfileField('title', title);
    if (company) updateProfileField('company', company);
    if (phone) updateProfileField('phone', phone);
    if (bio) updateProfileField('bio', bio);
    setCurrentStep(3);
  };

  // Step 3 Submit Handler
  const handleStep3Submit = (e) => {
    e.preventDefault();
    if (website) updateProfileField('website', website);
    if (linkedin) updateSocialLink('linkedin', linkedin);
    if (twitter) updateSocialLink('twitter', twitter);
    if (instagram) updateSocialLink('instagram', instagram);
    setCurrentStep(4);
  };

  // Step 4 Complete Handler
  const handleCompleteOnboarding = () => {
    setCurrentPage('dashboard');
  };

  const steps = [
    { num: 1, label: 'Link Card', icon: CreditCard },
    { num: 2, label: 'Profile Details', icon: User },
    { num: 3, label: 'Social Channels', icon: Globe },
    { num: 4, label: 'Tap Preview', icon: Smartphone }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        
        {/* Header Title */}
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-cyan-50 dark:bg-cyan-950/60 text-[#00BCFF] border border-cyan-200 dark:border-cyan-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bloom Account Setup</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Configure Your Physical Card & Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Set up your digital business identity in 4 easy steps.
          </p>
        </div>

        {/* 4-Step Progress Stepper Bar */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="relative flex items-center justify-between">
            {/* Horizontal Line Connector */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#00BCFF] transition-all duration-500 -z-0"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />

            {/* Step Nodes */}
            {steps.map((step) => {
              const isCompleted = currentStep > step.num;
              const isActive = currentStep === step.num;
              const StepIcon = step.icon;

              return (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <div
                    onClick={() => {
                      if (step.num < currentStep) setCurrentStep(step.num);
                    }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-md ${
                      isCompleted
                        ? 'bg-[#00BCFF] text-slate-950 ring-4 ring-cyan-500/20'
                        : isActive
                        ? 'bg-slate-900 text-white dark:bg-slate-800 border-2 border-[#00BCFF] ring-4 ring-cyan-500/20'
                        : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-extrabold mt-2 hidden sm:block ${
                      isActive ? 'text-[#00BCFF]' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Card Container (Dark Glassmorphism Card) */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: LINK PHYSICAL NFC CARD */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 max-w-xl mx-auto text-center"
              >
                <div className="w-16 h-16 rounded-3xl bg-cyan-50 dark:bg-slate-800 border border-cyan-100 dark:border-slate-700 text-[#00BCFF] flex items-center justify-center mx-auto shadow-lg">
                  <Rss className="w-8 h-8 stroke-[2.5] animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Step 1: Link Your Physical Bloom Card
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tap your NFC card against your phone or enter the 10-character Card UID printed on the back.
                  </p>
                </div>

                {cardLinkedSuccess && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Card #{cardUidInput || activeCardUid} Successfully Linked & Bound!</span>
                  </div>
                )}

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-4">
                  <button
                    type="button"
                    disabled={isScanning}
                    onClick={handleScanCard}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isScanning ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>{scanStatus || 'Scanning NFC Tag...'}</span>
                      </span>
                    ) : (
                      <>
                        <Rss className="w-4 h-4" />
                        <span>Tap Physical Card Against Phone to Link</span>
                      </>
                    )}
                  </button>

                  <div className="relative flex items-center justify-center my-2">
                    <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
                    <span className="bg-slate-50 dark:bg-slate-950 px-3 text-[10px] uppercase font-extrabold text-slate-400 absolute">
                      or enter card code manually
                    </span>
                  </div>

                  <form onSubmit={handleManualBindCard} className="flex gap-2">
                    <input
                      type="text"
                      value={cardUidInput}
                      onChange={(e) => setCardUidInput(e.target.value.toUpperCase())}
                      placeholder="e.g. BLM-9921-NFC"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-xs uppercase font-mono font-bold focus:outline-none focus:border-[#00BCFF]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer shrink-0"
                    >
                      Bind UID
                    </button>
                  </form>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-7 py-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Core Profile Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CORE PROFILE DETAILS */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 max-w-xl mx-auto"
              >
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Step 2: Core Profile Information
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    What people see immediately when they tap your Bloom card.
                  </p>
                </div>

                <form onSubmit={handleStep2Submit} className="space-y-4">
                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Precious Onuigbo"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                        Job Title
                      </label>
                      <div className="relative flex items-center">
                        <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5" />
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g. Founder & CEO"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                        Company
                      </label>
                      <div className="relative flex items-center">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5" />
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Bloom Labs"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                      Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +234 803 123 4567"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                      Short Bio / Pitch
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Brief headline bio introducing your work or mission..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#00BCFF]"
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="px-7 py-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>Next: Social Channels</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: SOCIAL & CONTACT LINKS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 max-w-xl mx-auto"
              >
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Step 3: Connect Social & Online Profiles
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add your website and active social channels for instant 1-tap connection.
                  </p>
                </div>

                <form onSubmit={handleStep3Submit} className="space-y-4">
                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                      Website URL
                    </label>
                    <div className="relative flex items-center">
                      <Globe className="w-4 h-4 text-cyan-400 absolute left-3.5" />
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                      LinkedIn Username / URL
                    </label>
                    <div className="relative flex items-center">
                      <SocialIcon platform="linkedin" className="w-4 h-4 text-blue-500 absolute left-3.5" />
                      <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="preciousonuigbo"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                      X / Twitter Handle
                    </label>
                    <div className="relative flex items-center">
                      <SocialIcon platform="twitter" className="w-4 h-4 text-slate-400 absolute left-3.5" />
                      <input
                        type="text"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="preciousonuigbo"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                      Instagram Handle
                    </label>
                    <div className="relative flex items-center">
                      <SocialIcon platform="instagram" className="w-4 h-4 text-pink-500 absolute left-3.5" />
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="precious.design"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="px-7 py-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>Next: Live Tap Preview</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 4: LIVE TAP PREVIEW & ACTIVATION FINISH */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Step 4: Card Activated & Bound</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Your Physical Bloom Card is Ready to Tap!
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Below is the exact live profile recipients will see when tapping your physical card against any iPhone or Android smartphone.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400">Linked Card UID:</span>
                      <span className="font-mono text-cyan-400 font-extrabold">{cardUidInput || activeCardUid}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400">Account Name:</span>
                      <span className="font-sans text-cyan-400 font-extrabold">{profile.name}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Socials</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCompleteOnboarding}
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                    >
                      <span>Complete & Go to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Smartphone Preview Mockup */}
                <div className="lg:col-span-6 flex justify-center">
                  <MobilePhonePreview data={profile} />
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default OnboardingSetupPage;

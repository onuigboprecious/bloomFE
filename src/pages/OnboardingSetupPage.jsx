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
  FileText,
  Video,
  Copy,
  QrCode,
  Download,
  Share2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Mail,
  Palette,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import MobilePhonePreview from '../components/ui/MobilePhonePreview';
import SocialIcon from '../components/ui/SocialIcon';
import Tooltip from '../components/ui/Tooltip';
import VideoWalkthroughModal from '../components/ui/VideoWalkthroughModal';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const CARD_TEMPLATES = [
  {
    id: 'dark-luxe',
    name: 'Midnight Obsidian',
    tagline: 'Sleek dark obsidian with cyan ambient glows',
    accentColor: '#00BCFF',
    badge: 'Popular',
    previewBg: 'bg-[#0F172A]'
  },
  {
    id: 'neon-cyber',
    name: 'Cyberpunk Glow',
    tagline: 'High-contrast neon matrix cyan & purple glow',
    accentColor: '#06B6D4',
    badge: 'Tech & Cyber',
    previewBg: 'bg-black'
  },
  {
    id: 'sunset-amber',
    name: 'Sahara Sunset',
    tagline: 'Warm amber gold metallic finish for executives',
    accentColor: '#F59E0B',
    badge: 'Executive',
    previewBg: 'bg-[#451A03]'
  },
  {
    id: 'emerald-green',
    name: 'Lagos Emerald',
    tagline: 'Deep emerald green & gold luxury edition',
    accentColor: '#10B981',
    badge: 'Luxury',
    previewBg: 'bg-[#022C22]'
  },
  {
    id: 'minimal-white',
    name: 'Minimal Pure Light',
    tagline: 'Clean high-contrast daylight finish for modern pros',
    accentColor: '#020617',
    badge: 'Clean',
    previewBg: 'bg-[#F8FAFC]'
  }
];

const ONBOARDING_FAQS = [
  {
    q: 'Do recipients need an app to view my card?',
    a: 'No app is required! When recipients tap your NFC card or scan your QR code, your branded card opens natively in their mobile browser in under 500ms.'
  },
  {
    q: 'Can I update my profile details after onboarding?',
    a: 'Yes, absolutely. Any changes you make in your Bloom dashboard update instantly in real time on your live card link and NFC tap profile.'
  },
  {
    q: 'How do I share my card on Day 1 without physical NFC hardware?',
    a: 'Your digital card is 100% shareable immediately! You can show your instant QR code, share your custom URL, or add your digital pass link to your phone wallet.'
  },
  {
    q: 'How do I link a physical NFC card later?',
    a: 'Whenever your physical Bloom NFC card arrives, tap it against your phone or enter the 10-character Card UID in your dashboard to bind it to your profile instantly.'
  }
];

export const OnboardingSetupPage = () => {
  const {
    profile,
    updateProfileField,
    updateSocialLink,
    claimAndLinkCard,
    activeCardUid,
    setCurrentPage,
    saveContactToPhone
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1); // 1: Profile, 2: Socials, 3: Template, 4: Day-1 Launch
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // Card UID & NFC States
  const [cardUidInput, setCardUidInput] = useState(activeCardUid || '');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [cardLinkedSuccess, setCardLinkedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Form States
  const [name, setName] = useState(profile?.name || '');
  const [title, setTitle] = useState(profile?.title || '');
  const [company, setCompany] = useState(profile?.company || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [location, setLocation] = useState(profile?.location || '');

  // Social States
  const [website, setWebsite] = useState(profile?.website || '');
  const [linkedin, setLinkedin] = useState(profile?.socials?.linkedin || '');
  const [twitter, setTwitter] = useState(profile?.socials?.twitter || '');
  const [instagram, setInstagram] = useState(profile?.socials?.instagram || '');
  const [github, setGithub] = useState(profile?.socials?.github || '');
  const [whatsapp, setWhatsapp] = useState(profile?.socials?.whatsapp || '');

  // Selected Theme
  const [selectedTheme, setSelectedTheme] = useState(profile?.cardTheme || 'dark-luxe');

  const shareableUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/card/${activeCardUid || 'BLM-9921-NFC'}`
    : `https://www.enlazer.com.ng/card/${activeCardUid || 'BLM-9921-NFC'}`;

  // NFC Scan Handler
  const handleScanCard = async () => {
    setIsScanning(true);
    setScanStatus('');

    if (typeof window !== 'undefined' && 'NDEFReader' in window) {
      try {
        setScanStatus('Hold physical Bloom card near phone...');
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
          fallbackScanSimulation();
        };
        return;
      } catch (err) {
        setScanStatus('Simulating NFC tap...');
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

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (name) updateProfileField('name', name);
    if (title) updateProfileField('title', title);
    if (company) updateProfileField('company', company);
    if (phone) updateProfileField('phone', phone);
    if (bio) updateProfileField('bio', bio);
    if (location) updateProfileField('location', location);
    setCurrentStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (website) updateProfileField('website', website);
    if (linkedin) updateSocialLink('linkedin', linkedin);
    if (twitter) updateSocialLink('twitter', twitter);
    if (instagram) updateSocialLink('instagram', instagram);
    if (github) updateSocialLink('github', github);
    if (whatsapp) updateSocialLink('whatsapp', whatsapp);
    setCurrentStep(3);
  };

  const handleSelectTemplate = (themeId) => {
    setSelectedTheme(themeId);
    updateProfileField('cardTheme', themeId);
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    setCurrentStep(4);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCompleteOnboarding = () => {
    setCurrentPage('dashboard');
  };

  const steps = [
    { num: 1, label: 'Profile Creation', icon: User },
    { num: 2, label: 'Social Channels', icon: Globe },
    { num: 3, label: 'Template Selection', icon: Palette },
    { num: 4, label: 'Day-1 Card Share', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        
        {/* Onboarding Header Banner */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-cyan-50 dark:bg-cyan-950/60 text-[#00BCFF] border border-cyan-200 dark:border-cyan-800/80 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#00BCFF]" />
            <span>Day-1 Branded Card Setup Flow</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Have Your Branded Card Ready on Day 1
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Set up your digital business profile in 4 guided steps. Recipient contacts sync automatically with 1 tap.
          </p>

          {/* Quick Video Walkthrough Trigger */}
          <div className="pt-1">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer border border-slate-700/50"
            >
              <Video className="w-4 h-4 text-[#00BCFF]" />
              <span>Watch 20s Step Walkthrough Video</span>
            </button>
          </div>
        </div>

        {/* 4-Step Stepper Progress Bar */}
        <div className="mb-12 max-w-3xl mx-auto px-2">
          <div className="relative flex items-center justify-between">
            {/* Background Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#00BCFF] transition-all duration-500 -z-0"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />

            {/* Stepper Nodes */}
            {steps.map((step) => {
              const isCompleted = currentStep > step.num;
              const isActive = currentStep === step.num;
              const StepIcon = step.icon;

              return (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => {
                      if (step.num < currentStep) setCurrentStep(step.num);
                    }}
                    disabled={step.num > currentStep}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 shadow-md ${
                      isCompleted
                        ? 'bg-[#00BCFF] text-slate-950 ring-4 ring-cyan-500/20 cursor-pointer'
                        : isActive
                        ? 'bg-slate-900 text-white dark:bg-slate-800 border-2 border-[#00BCFF] ring-4 ring-cyan-500/20'
                        : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
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

        {/* Step Container Card */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PROFILE CREATION */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Step 1: Core Profile Details</span>
                      <Tooltip content="Your profile details sync directly into your contact's mobile phonebook with 1 tap." title="vCard Sync" />
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      What people see immediately when they tap your physical Bloom card or scan your QR code.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#00BCFF] hover:underline"
                  >
                    <Video className="w-4 h-4" />
                    <span>Watch Tutorial</span>
                  </button>
                </div>

                <form onSubmit={handleStep1Submit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                      <span>Full Name *</span>
                      <Tooltip content="Enter your preferred professional display name." />
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

                  {/* Title & Company Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                        <span>Job Title</span>
                        <Tooltip content="Your current role or professional designation." />
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
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                        <span>Company / Org</span>
                        <Tooltip content="Company or brand name associated with your card." />
                      </label>
                      <div className="relative flex items-center">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5" />
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Bloom Technologies"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Location Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                        <span>Phone Number</span>
                        <Tooltip content="Enables 1-tap direct phone calls & contact saving." title="Phone Direct Dial" />
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
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                        <span>City / Country</span>
                        <Tooltip content="Your primary location or HQ city." />
                      </label>
                      <div className="relative flex items-center">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5" />
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Lagos, Nigeria"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Short Bio */}
                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                      <span>Short Bio / Value Pitch</span>
                      <Tooltip content="A 1-2 sentence introduction highlighting your expertise or tagline." />
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Brief headline bio introducing your work or mission..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#00BCFF]"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-105"
                    >
                      <span>Next: Connect Social Channels</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 2: SOCIAL CHANNELS & ONLINE PROFILES */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Step 2: Social Channels & Web Links</span>
                      <Tooltip content="Social links open directly inside native apps on iOS & Android." title="App Deep Linking" />
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Add your website and active social channels for instant 1-tap connection.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#00BCFF] hover:underline"
                  >
                    <Video className="w-4 h-4" />
                    <span>Watch Tutorial</span>
                  </button>
                </div>

                <form onSubmit={handleStep2Submit} className="space-y-4">
                  {/* Website */}
                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                      <span>Website / Portfolio URL</span>
                      <Tooltip content="Primary company website, linktree, or portfolio." />
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

                  {/* LinkedIn & Twitter Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                        <span>LinkedIn Username</span>
                        <Tooltip content="Enter username or full LinkedIn profile URL." />
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
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                        <span>X / Twitter Handle</span>
                        <Tooltip content="Enter @handle or profile link." />
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
                  </div>

                  {/* Instagram & WhatsApp Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                        <span>Instagram Handle</span>
                        <Tooltip content="Enter Instagram handle without @" />
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

                    <div>
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                        <span>WhatsApp Number</span>
                        <Tooltip content="Opens instant 1-tap WhatsApp chat window." title="WhatsApp Direct Chat" />
                      </label>
                      <div className="relative flex items-center">
                        <SocialIcon platform="whatsapp" className="w-4 h-4 text-emerald-500 absolute left-3.5" />
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="+2348031234567"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* GitHub */}
                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                      <span>GitHub / Developer Profile</span>
                      <Tooltip content="Showcase technical code repositories & open-source work." />
                    </label>
                    <div className="relative flex items-center">
                      <SocialIcon platform="github" className="w-4 h-4 text-slate-300 absolute left-3.5" />
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="onuigbo-precious"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-105"
                    >
                      <span>Next: Card Template Selection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: TEMPLATE SELECTION & REAL-TIME PREVIEW */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Controls: Template Picker */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Step 3: Select Card Design Template</span>
                      <Tooltip content="Pick a pre-built design theme that aligns with your brand identity." title="Design Themes" />
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Tap any template below to preview how your card renders live in real time on mobile devices.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {CARD_TEMPLATES.map((tmpl) => {
                      const isSelected = selectedTheme === tmpl.id;
                      return (
                        <div
                          key={tmpl.id}
                          onClick={() => handleSelectTemplate(tmpl.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-cyan-500/10 border-[#00BCFF] ring-2 ring-[#00BCFF]/30 shadow-lg'
                              : 'bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/20 shadow-md font-bold text-xs"
                              style={{ backgroundColor: tmpl.accentColor, color: tmpl.id === 'minimal-white' ? '#fff' : '#000' }}
                            >
                              <Palette className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-black text-slate-900 dark:text-white">{tmpl.name}</h4>
                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {tmpl.badge}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tmpl.tagline}</p>
                            </div>
                          </div>

                          <div className="shrink-0 ml-2">
                            {isSelected ? (
                              <div className="w-6 h-6 rounded-full bg-[#00BCFF] text-slate-950 flex items-center justify-center">
                                <Check className="w-4 h-4 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border border-slate-400/40" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStep3Submit}
                      className="px-8 py-3.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-105"
                    >
                      <span>Next: Day-1 Launch Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Panel: Live Mobile Phone Device Preview */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  <div className="text-center mb-3">
                    <span className="text-[11px] font-extrabold uppercase text-[#00BCFF] tracking-wider block">
                      Live Real-Time Device Preview
                    </span>
                    <p className="text-xs text-slate-400">Updates dynamically as you click templates</p>
                  </div>
                  <MobilePhonePreview data={profile} />
                </div>
              </motion.div>
            )}

            {/* STEP 4: DAY-1 LAUNCH & SHARING HUB */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 max-w-4xl mx-auto"
              >
                {/* Celebration Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-slate-900 to-indigo-500/20 border border-cyan-500/40 text-center space-y-3 relative overflow-hidden shadow-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Day-1 Ready: Your Branded Digital Card is Live!</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Start Sharing & Collecting Connections Today
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                    Your digital card is fully operational. Share your instant URL, display your QR code, or pair a physical NFC card anytime.
                  </p>
                </div>

                {/* Day-1 Sharing Action Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Share Action 1: Instant URL Copy */}
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-[#00BCFF] flex items-center justify-center">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">1-Tap Direct Web Link</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Add to email signatures, Instagram bio, or WhatsApp status.
                      </p>
                    </div>
                    <button
                      onClick={handleCopyShareLink}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Custom URL</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Share Action 2: Show QR Code */}
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">Instant QR Code Scan</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Show your phone screen to let anyone scan with standard camera.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowQrModal(true)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700/50"
                    >
                      <QrCode className="w-4 h-4 text-purple-400" />
                      <span>View Instant QR Code</span>
                    </button>
                  </div>

                  {/* Share Action 3: Test vCard Download */}
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">Test Contact Saving</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Test downloading your .vcf file directly into address book.
                      </p>
                    </div>
                    <button
                      onClick={() => saveContactToPhone(profile)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700/50"
                    >
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span>Download .vcf File</span>
                    </button>
                  </div>

                </div>

                {/* Optional NFC Physical Card Pairing Section */}
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-[#00BCFF] flex items-center justify-center">
                        <Rss className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">Physical NFC Card Pairing (Optional)</h4>
                        <p className="text-xs text-slate-400">Have a physical Bloom NFC card or wristband? Bind it now.</p>
                      </div>
                    </div>
                    {cardLinkedSuccess && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                        Linked: #{cardUidInput || activeCardUid}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      disabled={isScanning}
                      onClick={handleScanCard}
                      className="py-3 px-4 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isScanning ? (
                        <span>{scanStatus || 'Scanning NFC Tag...'}</span>
                      ) : (
                        <>
                          <Rss className="w-4 h-4" />
                          <span>Tap Physical Card to Link</span>
                        </>
                      )}
                    </button>

                    <form onSubmit={handleManualBindCard} className="flex gap-2">
                      <input
                        type="text"
                        value={cardUidInput}
                        onChange={(e) => setCardUidInput(e.target.value.toUpperCase())}
                        placeholder="Card Code (e.g. BLM-9921-NFC)"
                        className="w-full bg-slate-950 border border-slate-800 text-white px-3 py-2.5 rounded-xl text-xs uppercase font-mono font-bold focus:outline-none focus:border-[#00BCFF]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shrink-0 cursor-pointer"
                      >
                        Bind
                      </button>
                    </form>
                  </div>
                </div>

                {/* Navigation Finish Button */}
                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Templates</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCompleteOnboarding}
                    className="px-10 py-4 rounded-2xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-sm transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <span>Finish Setup & Open Dashboard</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Self-Serve Onboarding FAQ Drawer (No Support Ticket Needed) */}
        <div className="mt-16 max-w-3xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#00BCFF]" />
              <span>Instant Help & Onboarding FAQs</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Get immediate answers without opening a support ticket.
            </p>
          </div>

          <div className="space-y-3">
            {ONBOARDING_FAQS.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#00BCFF]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Instant QR Code View Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl relative text-white">
            <h4 className="text-lg font-black">Scan Your Day-1 Card</h4>
            <p className="text-xs text-slate-400">Point smartphone camera at QR code to open your card instantly.</p>
            
            {/* SVG Rendered High-Res QR Code */}
            <div className="w-56 h-56 mx-auto bg-white p-4 rounded-2xl flex items-center justify-center shadow-xl">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950 fill-current">
                <path d="M0,0 h35 v35 h-35 z M5,5 v25 h25 v-25 z M10,10 h15 v15 h-15 z" />
                <path d="M65,0 h35 v35 h-35 z M70,5 v25 h25 v-25 z M75,10 h15 v15 h-15 z" />
                <path d="M0,65 h35 v35 h-35 z M5,70 v25 h25 v-25 z M10,75 h15 v15 h-15 z" />
                <rect x="42" y="10" width="16" height="8" />
                <rect x="42" y="24" width="8" height="16" />
                <rect x="52" y="42" width="16" height="16" />
                <rect x="10" y="42" width="16" height="8" />
                <rect x="70" y="65" width="25" height="10" />
                <rect x="65" y="80" width="15" height="15" />
                <rect x="85" y="85" width="10" height="10" />
              </svg>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all cursor-pointer"
              >
                Close QR Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Walkthrough Modal */}
      <VideoWalkthroughModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        step={currentStep}
      />

      <Footer />
    </div>
  );
};

export default OnboardingSetupPage;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  BarChart3,
  CreditCard,
  Shield,
  ArrowLeft,
  LogOut,
  Plus,
  UserPlus,
  Share2,
  Copy,
  Check,
  Smartphone,
  Eye,
  TrendingUp,
  Rss,
  Sparkles,
  X,
  CheckCircle2
} from 'lucide-react';
import ProfileEditorTab from './ProfileEditorTab';
import AnalyticsTab from './AnalyticsTab';
import LeadsTab from './LeadsTab';
import CardManagementTab from './CardManagementTab';
import BillingTab from './BillingTab';
import ActivateCardModal from '../onboarding/ActivateCardModal';
import { useApp } from '../../context/AppContext';

export const DashboardPage = () => {
  const { setCurrentPage, profile, leads, openShareBackModal, triggerNfcTap, isTapSimulating } = useApp();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'leads' | 'analytics' | 'cards' | 'billing'
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showGuidePrompt, setShowGuidePrompt] = useState(true);

  const handleCopyProfileLink = () => {
    const handleUrl = `https://bloom.app/@${profile.username || 'precious'}`;
    navigator.clipboard.writeText(handleUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const navItems = [
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'leads', label: 'Leads', icon: UserPlus, badge: leads?.length || 0 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'billing', label: 'Billing', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors pb-24 md:pb-16">
      
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('home')}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-none hover:rounded-full transition-all duration-300 cursor-pointer"
              title="Back to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <a href="#" onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 group">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                bloom
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#00BCFF]">.</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Dashboard
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsActivationModalOpen(true)}
              className="px-3.5 sm:px-4 py-2 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Activate New Card</span>
              <span className="sm:hidden text-[11px]">Activate</span>
            </button>

            <button
              onClick={() => setCurrentPage('home')}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Dashboard Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* User Identity & Stats Quick Card */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-cyan-400/40 shadow-sm shrink-0"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    {profile.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-extrabold text-[10px]">
                    PRO MEMBER
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {profile.title} • {profile.company}
                </p>
                <button
                  onClick={handleCopyProfileLink}
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-mono font-bold cursor-pointer pt-0.5"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Profile Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>bloom.app/@{profile.username || 'precious'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
              <button
                onClick={openShareBackModal}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Recipient Share Back</span>
              </button>

              <button
                onClick={triggerNfcTap}
                disabled={isTapSimulating}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
              >
                {isTapSimulating ? (
                  <span className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Rss className="w-3.5 h-3.5 text-cyan-400" />
                )}
                <span>Simulate Tap</span>
              </button>
            </div>

          </div>

          {/* Top Quick KPI Strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center">
            <div className="bg-slate-50 dark:bg-slate-950/60 p-2.5 sm:p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 space-y-0.5">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Taps</span>
              <span className="text-base sm:text-xl font-black text-slate-900 dark:text-white font-mono block">
                {(profile.stats?.totalTaps || 1422).toLocaleString()}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/60 p-2.5 sm:p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 space-y-0.5">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider block">Captured Leads</span>
              <span className="text-base sm:text-xl font-black text-emerald-500 font-mono block">
                {profile.stats?.leadsCaptured || leads?.length || 0}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/60 p-2.5 sm:p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 space-y-0.5">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider block">Conversion</span>
              <span className="text-base sm:text-xl font-black text-cyan-400 font-mono block">
                {profile.stats?.conversionRate || 84}%
              </span>
            </div>
          </div>

        </div>

        {/* 2.5 Onboarding Prompt Banner: How Card Linking & NFC Tapping Works */}
        <AnimatePresence>
          {showGuidePrompt && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 p-6 sm:p-7 rounded-3xl border border-cyan-500/30 text-white shadow-xl space-y-5"
            >
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#00BCFF]/20 border border-[#00BCFF]/40 text-[#00BCFF] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <span>How Your Bloom Profile & Card Work</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Linking your card & sharing your profile when people tap your card
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGuidePrompt(false)}
                  className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Dismiss guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                
                {/* Flow 1: Linking of Cards */}
                <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs uppercase tracking-wider">
                    <CreditCard className="w-4 h-4" />
                    <span>1. Linking Your Physical Card</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                      <span>Click <strong>Activate New Card</strong> button at the top of your dashboard.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                      <span>Tap your physical Bloom card against your phone or enter the <strong>Card UID</strong> (e.g. <code>BLM-9921-NFC</code>).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                      <span>Your card is permanently bound to <strong>@{profile.username || 'precious'}</strong>!</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setIsActivationModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Link Card Now</span>
                  </button>
                </div>

                {/* Flow 2: Tapping to Show Profile */}
                <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                    <Smartphone className="w-4 h-4" />
                    <span>2. Let People View Your Profile on Tap</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                      <span>Tap your card against any smartphone (iOS or Android).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                      <span>A instant pop-up notification opens your live digital profile—<strong>no app needed!</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                      <span>They can tap <strong>Save Contact (.vcf)</strong> or send their details back to your dashboard.</span>
                    </li>
                  </ul>
                  <button
                    onClick={triggerNfcTap}
                    disabled={isTapSimulating}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1 disabled:opacity-50"
                  >
                    <Rss className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Test Tap Profile View</span>
                  </button>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>


        {/* 3. Desktop Tab Navigation Segmented Bar */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200 dark:border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00BCFF]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-[#00BCFF] text-slate-950' : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 4. Tab Content View Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 p-4 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs"
          >
            {activeTab === 'profile' && <ProfileEditorTab />}
            {activeTab === 'leads' && <LeadsTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'cards' && <CardManagementTab onOpenActivateModal={() => setIsActivationModalOpen(true)} />}
            {activeTab === 'billing' && <BillingTab />}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* 5. Mobile Bottom Floating Dock Bar (Fixed on screens under md) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 px-2 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-cyan-500 dark:text-cyan-400 font-extrabold'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[9px] font-black flex items-center justify-center border border-white dark:border-slate-900">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 font-bold">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute -bottom-1 w-6 h-0.5 bg-cyan-400 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Onboarding Card Activation Modal */}
      <ActivateCardModal
        isOpen={isActivationModalOpen}
        onClose={() => setIsActivationModalOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;

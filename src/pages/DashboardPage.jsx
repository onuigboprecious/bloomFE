import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  CreditCard,
  TrendingUp,
  Users,
  Rss,
  CheckCircle2,
  Share2,
  ExternalLink,
  Plus,
  Trash2,
  Mail,
  Phone,
  Globe,
  Camera,
  Eye,
  ShieldCheck,
  Smartphone,
  Copy,
  Check,
  Menu,
  X,
  Link,
  LayoutDashboard,
  LogOut,
  Palette,
  Layers,
  BarChart3,
  MapPin,
  ArrowUpRight,
  Inbox,
  Settings,
  Sun,
  Moon,
  AlertCircle,
  Loader2,
  Activity
} from 'lucide-react';
import MobilePhonePreview from '../components/ui/MobilePhonePreview';
import ActivateCardModal from '../components/onboarding/ActivateCardModal';
import SocialIcon from '../components/ui/SocialIcon';
import { useApp } from '../context/AppContext';
import { mockAnalyticsHourly } from '../data/mockData';

export const DashboardPage = () => {
  const {
    profile,
    saveFullProfile,
    updateProfileField,
    updateSocialLink,
    activeCardUid,
    claimAndLinkCard,
    leads,
    setCurrentPage,
    logoutUser,
    darkMode,
    toggleDarkMode
  } = useApp();

  const [activeTab, setActiveTab] = useState('creators'); // 'creators' | 'cards' | 'leads' | 'analytics'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newCardUidInput, setNewCardUidInput] = useState('');
  const [cardLinkMsg, setCardLinkMsg] = useState('');

  // Profile Form States
  const [avatar, setAvatar] = useState(profile?.avatar || '');
  const [name, setName] = useState(profile?.name || '');
  const [title, setTitle] = useState(profile?.title || '');
  const [company, setCompany] = useState(profile?.company || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [location, setLocation] = useState(profile?.location || '');
  const [customHandle, setCustomHandle] = useState(profile?.username || '');

  // Dynamic Connected Social Handles State
  const [socialHandlesList, setSocialHandlesList] = useState(() => {
    const existing = profile?.socials || {};
    const keys = Object.keys(existing);
    if (keys.length > 0) {
      return keys.map((key, i) => ({ id: `s-${i}`, platform: key, handle: existing[key] }));
    }
    return [];
  });
  const [newSocialPlatform, setNewSocialPlatform] = useState('instagram');
  const [newSocialValue, setNewSocialValue] = useState('');

  // Creators custom linktree state
  const [customLinks, setCustomLinks] = useState(() => profile?.customLinks || []);
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const [toast, setToast] = useState({ show: false, type: 'success', message: '' });
  const [isSaving, setIsSaving] = useState(false);

  const showToastNotification = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: 'success', message: '' }), 4000);
  };

  const handleSaveProfile = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsSaving(true);

    const updatedSocials = {};
    socialHandlesList.forEach((item) => {
      if (item.handle) {
        updatedSocials[item.platform] = item.handle;
      }
    });

    try {
      const res = await saveFullProfile({
        avatar,
        name,
        title,
        company,
        phone,
        bio,
        website,
        location,
        username: customHandle,
        socials: updatedSocials,
        customLinks
      });

      if (res && res.success === false) {
        showToastNotification('error', res.error || 'Failed to save profile changes.');
      } else {
        showToastNotification('success', 'Profile updated successfully!');
      }
    } catch (err) {
      showToastNotification('error', err?.message || 'An unexpected error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  // Keep local form fields in sync when profile state is updated from backend
  useEffect(() => {
    if (profile) {
      if (profile.avatar) setAvatar(profile.avatar);
      if (profile.name) setName(profile.name);
      if (profile.title) setTitle(profile.title);
      if (profile.company) setCompany(profile.company);
      if (profile.phone) setPhone(profile.phone);
      if (profile.bio) setBio(profile.bio);
      if (profile.website) setWebsite(profile.website);
      if (profile.location) setLocation(profile.location);
      if (profile.username) setCustomHandle(profile.username);
      if (profile.customLinks) setCustomLinks(profile.customLinks);

      if (profile.socials && Object.keys(profile.socials).length > 0) {
        setSocialHandlesList(
          Object.entries(profile.socials).map(([platform, handle], i) => ({
            id: `s-${i}-${platform}`,
            platform,
            handle
          }))
        );
      }
    }
  }, [profile]);

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyProfileLink = () => {
    const profileUrl = `https://enlazer.app/@${customHandle}`;
    navigator.clipboard.writeText(profileUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddSocialHandle = (e) => {
    e.preventDefault();
    if (!newSocialValue) return;
    setSocialHandlesList([
      ...socialHandlesList,
      { id: Date.now().toString(), platform: newSocialPlatform, handle: newSocialValue }
    ]);
    setNewSocialValue('');
  };

  const handleRemoveSocialHandle = (id) => {
    setSocialHandlesList(socialHandlesList.filter((s) => s.id !== id));
  };

  const handleUpdateSocialHandle = (id, val) => {
    setSocialHandlesList(socialHandlesList.map((s) => s.id === id ? { ...s, handle: val } : s));
  };



  const handleAddCustomLink = (e) => {
    e.preventDefault();
    if (!newLinkLabel || !newLinkUrl) return;
    setCustomLinks([...customLinks, { id: Date.now(), label: newLinkLabel, url: newLinkUrl }]);
    setNewLinkLabel('');
    setNewLinkUrl('');
  };

  const handleRemoveCustomLink = (id) => {
    setCustomLinks(customLinks.filter((l) => l.id !== id));
  };

  const handleLinkNewCard = (e) => {
    e.preventDefault();
    if (!newCardUidInput) return;
    claimAndLinkCard(newCardUidInput.toUpperCase());
    setCardLinkMsg(`Card #${newCardUidInput.toUpperCase()} successfully bound!`);
    setNewCardUidInput('');
    setTimeout(() => setCardLinkMsg(''), 4000);
  };

  const navTabs = [
    { id: 'creators', label: 'Profile Studio', icon: User },
    { id: 'cards', label: 'My Physical Cards', icon: CreditCard },
    { id: 'leads', label: 'Received Contacts', icon: Users, count: (leads || []).length },
    { id: 'analytics', label: 'Tap Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex items-center justify-center p-4 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 border-4 border-[#00BCFF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">Loading your Enlazer dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">

      <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-4 lg:px-6 pt-3 pb-20">

        {/* Mobile Sticky Top Header with Sidebar Drawer Toggle */}
        <div className="md:hidden flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
              alt={profile?.name || 'User'}
              className="w-10 h-10 rounded-xl object-cover border border-cyan-400"
            />
            <div>
              <h2 className="text-sm font-black text-slate-900 dark:text-white leading-tight">{profile?.name || 'User'}</h2>
              <span className="text-[10px] text-cyan-500 font-extrabold uppercase">
                {navTabs.find((t) => t.id === activeTab)?.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#00BCFF]" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
              />

              {/* Sidebar Content */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between h-full z-10 text-white shadow-2xl"
              >
                <div className="space-y-6">
                  {/* User Info Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <img src={profile?.avatar || null} alt={profile?.name || 'User'} className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-400 shrink-0" />
                      <div className="space-y-1 min-w-0">
                        <h3 className="font-extrabold text-sm text-white truncate">{profile.name}</h3>
                        <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-lg">
                          <span className="text-[10px] font-mono text-[#00BCFF] font-bold truncate">enlazer.app/@{customHandle}</span>
                          <button
                            onClick={handleCopyProfileLink}
                            className="p-0.5 hover:bg-cyan-500/20 rounded text-[#00BCFF] transition-colors cursor-pointer shrink-0"
                            title="Copy Bio Link"
                          >
                            {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Tag #{activeCardUid}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white shrink-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Nav Links */}
                  <div className="space-y-1.5">
                    {navTabs.map((tab) => {
                      const TabIcon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${isActive
                            ? 'bg-[#00BCFF] text-slate-950 shadow-md shadow-cyan-500/20'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <TabIcon className="w-4 h-4" />
                            <span>{tab.label}</span>
                          </div>
                          {tab.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-[#00BCFF] text-[9px] font-extrabold uppercase">
                              {tab.badge}
                            </span>
                          )}
                          {tab.count !== undefined && (
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                              {tab.count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sidebar Bottom Actions */}
                <div className="pt-6 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => {
                      setIsActivateModalOpen(true);
                      setIsMobileSidebarOpen(false);
                    }}
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-cyan-400" />
                    <span>Activate New Card</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      logoutUser();
                      setCurrentPage('home');
                    }}
                    className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Dashboard Layout (Desktop Sidebar + Content Area) */}
        <div className="flex flex-col md:flex-row gap-5 items-start">

          {/* Desktop Left Sidebar (Fixed / Sticky, Auto Height) */}
          <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 space-y-6 shadow-sm sticky top-3 h-fit">

            {/* User Profile Badge & Theme Toggle */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                  alt={profile?.name || 'User'}
                  className="w-11 h-11 rounded-2xl object-cover border-2 border-cyan-400 shadow-xs shrink-0"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{profile?.name || 'User'}</h3>
                  <span className="text-[10px] font-semibold text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Tag #{activeCardUid}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1.5">
              {navTabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${isActive
                      ? 'bg-[#00BCFF] text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <TabIcon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${isActive ? 'bg-slate-950 text-white' : 'bg-cyan-500/10 text-[#00BCFF]'
                        }`}>
                        {tab.badge}
                      </span>
                    )}
                    {tab.count !== undefined && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Bottom Action Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
              <button
                onClick={() => setIsActivateModalOpen(true)}
                className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-extrabold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Activate New Card</span>
              </button>

              <button
                onClick={() => {
                  logoutUser();
                  setCurrentPage('home');
                }}
                className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 font-extrabold text-xs border border-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Log Out</span>
              </button>
            </div>

          </aside>

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full space-y-6">

            {/* TAB CONTENTS */}

            {/* UNIFIED TAB 1: CREATOR BIO & PROFILE STUDIO */}
            {activeTab === 'creators' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Left Side: Combined Creator Bio & Profile Details Editor */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm">

                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-[#00BCFF]" />
                        <span>Profile Studio</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">All-in-one editor for handle, contact details, social links & bio buttons.</p>
                    </div>
                  </div>

                  {/* 2. Profile Details Form */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2">
                      <User className="w-4 h-4 text-[#00BCFF]" />
                      <span>Personal & Contact Information</span>
                    </h4>

                    {/* Profile Picture Upload Section */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                      <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 block">
                        Profile Picture / Avatar
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#00BCFF] shrink-0 group">
                          <img
                            src={avatar || profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                            alt="Avatar preview"
                            className="w-full h-full object-cover"
                          />
                          <label className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera className="w-5 h-5 text-white" />
                            <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
                          </label>
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-extrabold text-xs cursor-pointer transition-all active:scale-95 shadow-xs">
                            <Camera className="w-4 h-4" />
                            <span>Upload New Photo</span>
                            <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
                          </label>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Supports JPG, PNG, GIF or WebP. Updates live instantly!</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                          Job Title / Craft
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                          Brand / Company
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                        Bio / Creator Pitch
                      </label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#00BCFF]"
                      />
                    </div>

                    {/* Dynamic Social Accounts Manager */}
                    <div className="pt-2 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Share2 className="w-4 h-4 text-[#00BCFF]" />
                          <span>Connected Social Handles & Channels</span>
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">{socialHandlesList.length} Connected</span>
                      </div>

                      {/* Active Social Handles List */}
                      {socialHandlesList.length === 0 ? (
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-1">
                          <Share2 className="w-5 h-5 text-slate-400 mx-auto opacity-50" />
                          <p className="text-xs font-bold text-slate-500">No social channels connected yet.</p>
                          <p className="text-[10px] text-slate-400">Select a platform below to connect your Instagram, LinkedIn, WhatsApp, TikTok, GitHub, or portfolio!</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {socialHandlesList.map((item) => (
                            <div key={item.id} className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                              <div className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800/80 shrink-0">
                                <SocialIcon platform={item.platform} className="w-4 h-4 text-[#00BCFF]" />
                              </div>
                              <div className="flex-1 min-w-0 space-y-0.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase block truncate">{item.platform}</span>
                                <input
                                  type="text"
                                  value={item.handle}
                                  onChange={(e) => handleUpdateSocialHandle(item.id, e.target.value)}
                                  className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none truncate"
                                  placeholder={`Enter ${item.platform} handle`}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveSocialHandle(item.id)}
                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer shrink-0"
                                title="Remove handle"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add New Social Handle Form */}
                      <form onSubmit={handleAddSocialHandle} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
                        <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300 block">Add New Social Channel / Handle</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <select
                            value={newSocialPlatform}
                            onChange={(e) => setNewSocialPlatform(e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF] capitalize"
                          >
                            <option value="instagram">Instagram</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="twitter">X / Twitter</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="tiktok">TikTok</option>
                            <option value="youtube">YouTube</option>
                            <option value="github">GitHub</option>
                            <option value="threads">Threads</option>
                            <option value="telegram">Telegram</option>
                            <option value="spotify">Spotify</option>
                            <option value="calendly">Calendly</option>
                            <option value="website">Website / Portfolio</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Handle or URL (e.g. username)"
                            value={newSocialValue}
                            onChange={(e) => setNewSocialValue(e.target.value)}
                            className="sm:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-4 h-4 text-cyan-400" />
                          <span>Add Social Handle</span>
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* 3. Custom Linktree Buttons Builder */}
                  <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Link className="w-4 h-4 text-[#00BCFF]" />
                      <span>Custom Bio Linktree Buttons</span>
                    </h4>

                    {/* Existing Links List */}
                    {customLinks.length === 0 ? (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-1">
                        <Link className="w-5 h-5 text-slate-400 mx-auto opacity-50" />
                        <p className="text-xs font-bold text-slate-500">No custom bio button links created yet.</p>
                        <p className="text-[10px] text-slate-400">Use the form below to add your portfolio, booking calendar, or custom website links!</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {customLinks.map((linkItem) => (
                          <div key={linkItem.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                            <div className="space-y-0.5 truncate pr-2">
                              <span className="text-xs font-extrabold text-slate-900 dark:text-white block truncate">{linkItem.label}</span>
                              <span className="text-[10px] font-mono text-cyan-500 truncate block">{linkItem.url}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomLink(linkItem.id)}
                              className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add New Link Form */}
                    <form onSubmit={handleAddCustomLink} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
                      <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300 block">Add New Bio Button Link</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Button Label (e.g. Portfolio)"
                          value={newLinkLabel}
                          onChange={(e) => setNewLinkLabel(e.target.value)}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                        <input
                          type="url"
                          placeholder="URL (https://...)"
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-cyan-400" />
                        <span>Add Bio Link Button</span>
                      </button>
                    </form>

                  </div>

                  {/* Save Profile Updates Action Button (Bottom of Card) */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      type="button"
                      disabled={isSaving}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#00BCFF] hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95 text-center flex items-center justify-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Saving Updates...</span>
                        </>
                      ) : (
                        <span>Save Profile Updates</span>
                      )}
                    </button>
                  </div>

                </div>

                {/* Right Side: Mobile Phone Live Preview */}
                <div className="lg:col-span-5 sticky top-3 h-fit">
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4 text-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center justify-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" /> Live Profile Preview
                    </span>
                    <MobilePhonePreview
                      data={{
                        ...profile,
                        avatar: avatar || profile?.avatar,
                        name: name !== '' ? name : profile?.name,
                        title: title !== '' ? title : profile?.title,
                        company: company !== '' ? company : profile?.company,
                        phone: phone !== '' ? phone : profile?.phone,
                        bio: bio !== '' ? bio : profile?.bio,
                        website: website !== '' ? website : profile?.website,
                        location: location !== '' ? location : profile?.location,
                        username: customHandle !== '' ? customHandle : profile?.username,
                        socials: socialHandlesList.reduce((acc, curr) => {
                          if (curr.handle) acc[curr.platform] = curr.handle;
                          return acc;
                        }, {}),
                        customLinks: customLinks,
                      }}
                    />
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: MY PHYSICAL CARDS */}
            {activeTab === 'cards' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">Active Physical Cards</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Manage NFC hardware tags linked to your account.</p>
                    </div>
                    <button
                      onClick={() => setIsActivateModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Activate Additional Card</span>
                    </button>
                  </div>

                  {cardLinkMsg && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-in fade-in">
                      {cardLinkMsg}
                    </div>
                  )}

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 border border-cyan-500/30 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                    <div className="space-y-2 relative z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-[#00BCFF] border border-cyan-500/40 text-[10px] font-extrabold uppercase">
                        <ShieldCheck className="w-3.5 h-3.5" /> NTAG216 Verified Primary Tag
                      </div>
                      <h4 className="text-2xl font-mono font-black">{activeCardUid}</h4>
                      <p className="text-xs text-slate-400">Linked to account: <strong className="text-white">{profile.name}</strong></p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                      Link & Bind New Physical Card UID
                    </h4>
                    <form onSubmit={handleLinkNewCard} className="flex gap-2 max-w-md">
                      <input
                        type="text"
                        value={newCardUidInput}
                        onChange={(e) => setNewCardUidInput(e.target.value.toUpperCase())}
                        placeholder="e.g. ENL-9921-NFC"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#00BCFF]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer shrink-0"
                      >
                        Bind UID
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: RECEIVED CONTACTS */}
            {activeTab === 'leads' && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#00BCFF]" />
                      <span>Received Contacts</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Contact details, roles, and notes shared back by people when they tap your Enlazer card.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-[#00BCFF] font-bold text-xs">
                    {leads.length} Received Contacts
                  </span>
                </div>

                {/* Received Contacts Cards List */}
                {leads.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <Users className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
                    <p className="text-xs text-slate-500 font-bold">No received contacts yet. Tap your card against a phone to start receiving contact details!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {leads.map((item, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-[#00BCFF] font-black text-xs flex items-center justify-center">
                              {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-slate-900 dark:text-white">{item.name}</h4>
                              {(item.role || item.title) && <p className="text-[10px] text-slate-500 font-semibold">{item.role || item.title}</p>}
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">{item.date || 'Today'}</span>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          {item.email && (
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                              <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold truncate">{item.email}</span>
                            </div>
                          )}
                          {item.phone && (
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="font-mono">{item.phone}</span>
                            </div>
                          )}
                          {(item.notes || item.note) && (
                            <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
                              <p className="text-xs italic text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                                "{item.notes || item.note}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: TAP ANALYTICS & INSIGHTS GRAPH STUDIO */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                
                {/* Analytics Header Bar */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#00BCFF]" />
                      <span>Tap Analytics & Performance Studio</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Real-time hardware tap metrics, peak activity hours & geographic insights.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Timeframe:</span>
                    <select className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#00BCFF]">
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                    </select>
                  </div>
                </div>

                {/* Top Metric Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Total Taps</span>
                      <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3" /> +18.4%
                      </span>
                    </div>
                    <div className="text-3xl font-black text-[#00BCFF]">{profile.stats?.totalTaps || 1422}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Lifetime NFC & QR interactions</div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Monthly Taps</span>
                      <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3" /> +24.2%
                      </span>
                    </div>
                    <div className="text-3xl font-black text-cyan-400">{profile.stats?.monthlyTaps || 482}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Active taps this month</div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Unique Viewers</span>
                      <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3" /> +14.6%
                      </span>
                    </div>
                    <div className="text-3xl font-black text-emerald-400">{profile.stats?.uniqueVisitors || 1104}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Unique smartphone devices</div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Conversion Rate</span>
                      <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3" /> +8.2%
                      </span>
                    </div>
                    <div className="text-3xl font-black text-purple-400">{profile.stats?.conversionRate || 84}%</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">vCard saves & lead submissions</div>
                  </div>
                </div>

                {/* Main Graph Card: Hourly Tap Activity & Spline Area Chart */}
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4">
                    <div className="space-y-0.5">
                      <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#00BCFF]" />
                        <span>Peak Tap Activity & Hourly Breakdown</span>
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Comparing total NFC taps vs unique visitor sessions throughout the day.</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold">
                      <div className="flex items-center gap-1.5 text-[#00BCFF]">
                        <span className="w-3 h-3 rounded-full bg-[#00BCFF]" />
                        <span>Total Taps</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-3 h-3 rounded-full bg-emerald-400" />
                        <span>Unique Viewers</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Spline Area Chart */}
                  <div className="relative pt-4">
                    <div className="h-64 w-full relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00BCFF" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#00BCFF" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Grid Background Lines */}
                        <line x1="0" y1="40" x2="700" y2="40" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="4 4" />
                        <line x1="0" y1="90" x2="700" y2="90" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="4 4" />
                        <line x1="0" y1="140" x2="700" y2="140" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="4 4" />

                        {/* Area 1: Total Taps (Cyan Curve) */}
                        <polygon
                          points="0,200 0,170 116,130 233,60 350,20 466,50 583,110 700,150 700,200"
                          fill="url(#cyanGradient)"
                        />
                        <path
                          d="M 0 170 Q 116 130 233 60 T 350 20 T 466 50 T 583 110 T 700 150"
                          fill="none"
                          stroke="#00BCFF"
                          strokeWidth="3.5"
                        />

                        {/* Area 2: Unique Viewers (Emerald Curve) */}
                        <polygon
                          points="0,200 0,180 116,150 233,90 350,50 466,80 583,130 700,165 700,200"
                          fill="url(#emeraldGradient)"
                        />
                        <path
                          d="M 0 180 Q 116 150 233 90 T 350 50 T 466 80 T 583 130 T 700 165"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2.5"
                          strokeDasharray="6 3"
                        />

                        {/* Data Points */}
                        {mockAnalyticsHourly.map((item, idx) => {
                          const x = (idx / (mockAnalyticsHourly.length - 1)) * 700;
                          const yTaps = 200 - (item.taps / 220) * 180;
                          const yUnique = 200 - (item.unique / 220) * 180;
                          return (
                            <g key={idx} className="group cursor-pointer">
                              <circle cx={x} cy={yTaps} r="5" fill="#00BCFF" stroke="#0F172A" strokeWidth="2" className="transition-transform group-hover:r-7" />
                              <circle cx={x} cy={yUnique} r="4" fill="#10B981" stroke="#0F172A" strokeWidth="2" />
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    {/* X-Axis Labels */}
                    <div className="flex justify-between items-center pt-3 text-[11px] font-mono font-bold text-slate-500 border-t border-slate-200 dark:border-slate-800">
                      {mockAnalyticsHourly.map((item, idx) => (
                        <span key={idx}>{item.hour}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Device OS & City Location Distribution Bar Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Chart 1: Smartphone Operating System Breakdown */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#00BCFF]" />
                        <span>Smartphone OS Distribution</span>
                      </h4>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">100% Mobile Native</span>
                    </div>

                    <div className="space-y-4">
                      {/* iOS / iPhone */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00BCFF]" /> iPhone / iOS
                          </span>
                          <span className="font-mono text-[#00BCFF]">68% (967 Taps)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-[#00BCFF] h-full rounded-full w-[68%]" />
                        </div>
                      </div>

                      {/* Android */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Android Devices
                          </span>
                          <span className="font-mono text-emerald-400">28% (398 Taps)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full rounded-full w-[28%]" />
                        </div>
                      </div>

                      {/* Desktop / Dynamic QR */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Dynamic QR Code / Web
                          </span>
                          <span className="font-mono text-purple-400">4% (57 Scans)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-purple-400 h-full rounded-full w-[4%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chart 2: Top Tap Locations & Cities */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span>Top Tap Locations</span>
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">Lagos & Abuja Peak</span>
                    </div>

                    <div className="space-y-4">
                      {/* Lagos */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-900 dark:text-white">Victoria Island & Lekki, Lagos</span>
                          <span className="font-mono text-cyan-400">58% (825 Taps)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full rounded-full w-[58%]" />
                        </div>
                      </div>

                      {/* Abuja */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-900 dark:text-white">CBD & Maitama, Abuja</span>
                          <span className="font-mono text-emerald-400">28% (398 Taps)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full rounded-full w-[28%]" />
                        </div>
                      </div>

                      {/* Port Harcourt & Others */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-900 dark:text-white">Port Harcourt & International</span>
                          <span className="font-mono text-purple-400">14% (199 Taps)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-purple-400 h-full rounded-full w-[14%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 5: SETTINGS STUDIO */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm">
                  <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4">
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-[#00BCFF]" />
                      <span>Account & Studio Settings</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage your account security, handle username, and profile preferences.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Public Username Handle Settings */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Enlazer Digital Handle</label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700">enlazer.app/@</span>
                        <input
                          type="text"
                          value={customHandle}
                          onChange={(e) => setCustomHandle(e.target.value.toLowerCase().trim())}
                          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>
                    </div>

                    {/* Email Account */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Account Email</label>
                      <input
                        type="email"
                        value={profile.email || ''}
                        readOnly
                        className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-xl px-3.5 py-2.5 text-xs font-bold"
                      />
                    </div>
                  </div>

                  {/* Appearance & Theme Preference */}
                  <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                          {darkMode ? <Moon className="w-4 h-4 text-[#00BCFF]" /> : <Sun className="w-4 h-4 text-amber-400" />}
                          <span>Appearance & Theme Preference</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Choose your preferred visual theme for the Enlazer Dashboard & Studio.</p>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {darkMode ? 'Dark Mode Active' : 'Light Mode Active'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Dark Mode Card Option */}
                      <button
                        type="button"
                        onClick={() => { if (!darkMode) toggleDarkMode(); }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          darkMode
                            ? 'bg-slate-900 border-[#00BCFF] ring-2 ring-[#00BCFF]/20 text-white'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                            <Moon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-extrabold block">Dark Theme</span>
                            <span className="text-[10px] opacity-75">Sleek obsidian dark UI with vibrant neon accents.</span>
                          </div>
                        </div>
                        {darkMode && <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0" />}
                      </button>

                      {/* Light Mode Card Option */}
                      <button
                        type="button"
                        onClick={() => { if (darkMode) toggleDarkMode(); }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          !darkMode
                            ? 'bg-white border-[#00BCFF] ring-2 ring-[#00BCFF]/20 text-slate-900 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600 border border-amber-200">
                            <Sun className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-extrabold block">Light Theme</span>
                            <span className="text-[10px] opacity-75">Clean high-contrast light mode layout.</span>
                          </div>
                        </div>
                        {!darkMode && <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-all shadow-md cursor-pointer"
                    >
                      Save Settings Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Activate Card Modal */}
      <ActivateCardModal
        isOpen={isActivateModalOpen}
        onClose={() => setIsActivateModalOpen(false)}
      />

      {/* Floating Save Profile Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-950/95 dark:bg-slate-900/95 backdrop-blur-xl border shadow-2xl max-w-md cursor-pointer transition-all ${
              toast.type === 'success' ? 'border-emerald-500/40 shadow-emerald-950/20' : 'border-rose-500/40 shadow-rose-950/20'
            }`}
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
          >
            <div className={`p-2 rounded-xl shrink-0 ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <div className="space-y-0.5 flex-1 min-w-0 pr-2">
              <h5 className={`text-xs font-black ${toast.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {toast.type === 'success' ? 'Profile Saved Successfully!' : 'Save Profile Failed'}
              </h5>
              <p className="text-[11px] font-medium text-slate-300 truncate">
                {toast.message}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setToast((prev) => ({ ...prev, show: false }));
              }}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;

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
  Loader2,
  Music,
  Image as ImageIcon,
  ShoppingBag,
  AlertCircle,
  Activity,
  Search,
  Download
} from 'lucide-react';
import MobilePhonePreview from '../components/ui/MobilePhonePreview';
import ActivateCardModal from '../components/onboarding/ActivateCardModal';
import SocialIcon from '../components/ui/SocialIcon';
import { THEMES, TEMPLATES } from '../components/profile/ProfileView';
import { useApp } from '../context/AppContext';
import { mockAnalyticsHourly } from '../data/mockData';
import TemplateSelector from '../components/dashboard/TemplateSelector';
import CreatorFields from '../components/dashboard/CreatorFields';
import ArtGalleryFields from '../components/dashboard/ArtGalleryFields';
import BusinessVendorFields from '../components/dashboard/BusinessVendorFields';
import PersonalInfoForm from '../components/dashboard/PersonalInfoForm';
import SocialHandlesManager from '../components/dashboard/SocialHandlesManager';
import CustomLinksManager from '../components/dashboard/CustomLinksManager';
import SettingsStudio from '../components/dashboard/SettingsStudio';

export const DashboardPage = () => {
  const {
    profile,
    saveFullProfile,
    updateProfileField,
    updateSocialLink,
    activeCardUid,
    claimAndLinkCard,
    leads,
    deleteLead,
    exportVCards,
    saveContactToPhone,
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
  const [showEmail, setShowEmail] = useState(profile?.showEmail !== false);
  const [selectedTheme, setSelectedTheme] = useState(profile?.theme || 'dark-luxe');
  const [selectedTemplate, setSelectedTemplate] = useState(profile?.template || profile?.layout || 'classic-stack');

  // Dynamic Template Fields State
  const [featuredTrack, setFeaturedTrack] = useState(() => profile?.featuredTrack || {
    title: 'Aura of Midnight (Single)',
    artist: profile?.name || 'Enlazer Sounds',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400',
    streamUrl: 'https://open.spotify.com'
  });

  const [artworks, setArtworks] = useState(() => profile?.artworks || [
    {
      id: 'art-1',
      title: 'Lagos Horizon at Dusk',
      medium: 'Oil & Acrylic on Canvas',
      size: '36 x 48 inches',
      price: '₦450,000 ($350)',
      image: '',
      available: true
    },
    {
      id: 'art-2',
      title: 'Golden African Essence No. 4',
      medium: 'Mixed Media & 24K Gold Leaf',
      size: '30 x 40 inches',
      price: '₦620,000 ($480)',
      image: '',
      available: true
    }
  ]);

  const [products, setProducts] = useState(() => profile?.products || [
    {
      id: 'prod-1',
      name: 'Stealth Black Smart NFC Card',
      price: '₦25,000',
      desc: 'Stainless steel matte finish with instant contact tap.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'prod-2',
      name: 'IP68 Waterproof NFC Wristband',
      price: '₦15,000',
      desc: 'Eco-silicone wearable for events & VIP check-in.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400'
    }
  ]);

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

  // Contacts states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

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
        showEmail,
        theme: selectedTheme,
        template: selectedTemplate,
        socials: updatedSocials,
        customLinks,
        featuredTrack,
        artworks,
        products
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
      if (profile.theme) setSelectedTheme(profile.theme);
      if (profile.template || profile.layout) setSelectedTemplate(profile.template || profile.layout);

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
    const profileUrl = `https://www.enlazer.com.ng/@${customHandle}`;
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

                  {/* 1. Profile Layout Template Selector Card */}
                  <TemplateSelector
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                  />

                  {/* 2. Dynamic Specialized Template Content Fields */}
                  {(selectedTemplate === 'creator-artist' || selectedTemplate === 'modern-card') && (
                    <CreatorFields
                      featuredTrack={featuredTrack}
                      setFeaturedTrack={setFeaturedTrack}
                    />
                  )}

                  {(selectedTemplate === 'art-gallery' || selectedTemplate === 'minimalist-glass') && (
                    <ArtGalleryFields
                      artworks={artworks}
                      setArtworks={setArtworks}
                    />
                  )}

                  {(selectedTemplate === 'business-vendor' || selectedTemplate === 'bento-grid') && (
                    <BusinessVendorFields
                      products={products}
                      setProducts={setProducts}
                    />
                  )}

                  {/* 3. Personal & Contact Information */}
                  <PersonalInfoForm
                    avatar={avatar}
                    profile={profile}
                    handleAvatarFileChange={handleAvatarFileChange}
                    name={name}
                    setName={setName}
                    title={title}
                    setTitle={setTitle}
                    company={company}
                    setCompany={setCompany}
                    phone={phone}
                    setPhone={setPhone}
                    location={location}
                    setLocation={setLocation}
                    showEmail={showEmail}
                    setShowEmail={setShowEmail}
                    bio={bio}
                    setBio={setBio}
                  />

                  {/* 4. Connected Social Handles */}
                  <SocialHandlesManager
                    socialHandlesList={socialHandlesList}
                    setSocialHandlesList={setSocialHandlesList}
                    newSocialPlatform={newSocialPlatform}
                    setNewSocialPlatform={setNewSocialPlatform}
                    newSocialValue={newSocialValue}
                    setNewSocialValue={setNewSocialValue}
                    handleAddSocialHandle={handleAddSocialHandle}
                    handleRemoveSocialHandle={handleRemoveSocialHandle}
                  />

                  {/* 5. Custom Bio Link Buttons */}
                  <CustomLinksManager
                    customLinks={customLinks}
                    newLinkLabel={newLinkLabel}
                    setNewLinkLabel={setNewLinkLabel}
                    newLinkUrl={newLinkUrl}
                    setNewLinkUrl={setNewLinkUrl}
                    handleAddCustomLink={handleAddCustomLink}
                    handleRemoveCustomLink={handleRemoveCustomLink}
                  />

                  {/* Save Profile Updates Action Button */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      type="button"
                      disabled={isSaving}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#00BCFF] hover:bg-cyan-400 disabled:opacity-50 text-[#0F172A] font-black text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95 text-center flex items-center justify-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#0F172A]" />
                          <span>Saving Updates...</span>
                        </>
                      ) : (
                        <span>Save Profile Updates</span>
                      )}
                    </button>
                  </div>

                </div>

                {/* Right Side: Mobile Phone Live Preview */}
                <div className="lg:col-span-5 sticky top-3 h-fit flex flex-col items-center w-full">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5 mb-3.5">
                    <Smartphone className="w-3.5 h-3.5 text-[#00BCFF]" /> Live Profile Preview
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
                      showEmail,
                      theme: selectedTheme,
                      template: selectedTemplate,
                      socials: socialHandlesList.reduce((acc, curr) => {
                        if (curr.handle) acc[curr.platform] = curr.handle;
                        return acc;
                      }, {}),
                      customLinks: customLinks,
                      featuredTrack: featuredTrack,
                      artworks: artworks,
                      products: products,
                    }}
                  />
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
            {activeTab === 'leads' && (() => {
              const leadsArray = Array.isArray(leads) ? leads : [];
              const filteredLeads = leadsArray.filter((item) => {
                const term = searchTerm.toLowerCase();
                return (
                  (item.name || '').toLowerCase().includes(term) ||
                  (item.email || '').toLowerCase().includes(term) ||
                  (item.phone || '').toLowerCase().includes(term) ||
                  (item.role || item.title || '').toLowerCase().includes(term) ||
                  (item.company || '').toLowerCase().includes(term)
                );
              });

              const isAllSelected = filteredLeads.length > 0 && selectedLeadIds.length === filteredLeads.length;

              const handleToggleSelectLead = (id) => {
                setSelectedLeadIds((prev) =>
                  prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                );
              };

              const handleToggleSelectAll = () => {
                if (isAllSelected) {
                  setSelectedLeadIds([]);
                } else {
                  setSelectedLeadIds(filteredLeads.map(l => l.id || `lead-${l.name}-${l.email}`));
                }
              };

              return (
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 animate-in fade-in duration-300">
                  
                  {/* Tab Title Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#00BCFF]" />
                        <span>Received Contacts</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Contact details, roles, and notes shared back by people when they tap your Enlazer card.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-[#00BCFF] font-bold text-xs">
                        {leadsArray.length} Total
                      </span>
                      {filteredLeads.length !== leadsArray.length && (
                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs">
                          {filteredLeads.length} Found
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Toolbar & Filter Bar */}
                  {leadsArray.length > 0 && (
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                      {/* Search Bar */}
                      <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <input
                          type="text"
                          placeholder="Search by name, email, phone or title..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-xs font-bold rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#00BCFF] transition-all"
                        />
                      </div>

                      {/* General Actions */}
                      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <button
                          type="button"
                          onClick={handleToggleSelectAll}
                          className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={() => {}} // handled by button click
                            className="rounded text-[#00BCFF] focus:ring-[#00BCFF] pointer-events-none"
                          />
                          <span>Select All</span>
                        </button>

                        <button
                          type="button"
                          onClick={exportLeadsCSV}
                          className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors cursor-pointer"
                          title="Export All to CSV"
                        >
                          <Download className="w-4 h-4 text-slate-400" />
                          <span>Export CSV</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bulk Actions Header (visible when contacts are selected) */}
                  {selectedLeadIds.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 bg-cyan-500/5 dark:bg-[#00BCFF]/5 border border-cyan-500/20 dark:border-[#00BCFF]/20 rounded-2xl gap-3 animate-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-[#00BCFF]/10 text-[#00BCFF] text-[10px] font-black flex items-center justify-center">
                          {selectedLeadIds.length}
                        </div>
                        <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">Contacts Selected</span>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const selected = leadsArray.filter(l => selectedLeadIds.includes(l.id || `lead-${l.name}-${l.email}`));
                            exportVCards(selected);
                            showToastNotification('success', `Exported ${selected.length} contacts as vCard!`);
                          }}
                          className="px-3 py-2 bg-[#00BCFF]/10 hover:bg-[#00BCFF]/20 text-[#00BCFF] rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> Import Selected to Phone
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            selectedLeadIds.forEach(id => deleteLead(id));
                            setSelectedLeadIds([]);
                            showToastNotification('success', 'Selected contacts deleted.');
                          }}
                          className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete Selected
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedLeadIds([])}
                          className="text-xs font-extrabold text-slate-400 hover:text-slate-600 dark:hover:text-white px-2 py-1.5 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of Contacts */}
                  {leadsArray.length === 0 ? (
                    <div className="text-center py-16 space-y-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-6 bg-slate-50/50 dark:bg-slate-950/20">
                      <div className="w-16 h-16 rounded-full bg-cyan-500/5 text-[#00BCFF] flex items-center justify-center mx-auto border border-cyan-500/10">
                        <Users className="w-7 h-7" />
                      </div>
                      <div className="space-y-1 max-w-sm mx-auto">
                        <p className="text-sm font-black text-slate-900 dark:text-white">No contacts captured yet</p>
                        <p className="text-xs text-slate-400 leading-relaxed">Share your Enlazer profile handle or card, and when people share their info back, they will appear here instantly!</p>
                      </div>
                    </div>
                  ) : filteredLeads.length === 0 ? (
                    <div className="text-center py-12 space-y-2">
                      <Search className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
                      <p className="text-xs font-extrabold text-slate-500">No matching contacts found for "{searchTerm}"</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredLeads.map((item, idx) => {
                        const uniqueId = item.id || `lead-${item.name}-${item.email}`;
                        const isSelected = selectedLeadIds.includes(uniqueId);
                        const isConfirmingDelete = deleteConfirmId === uniqueId;

                        return (
                          <div
                            key={uniqueId}
                            className={`relative p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border transition-all duration-200 space-y-3.5 shadow-xs overflow-hidden ${
                              isSelected
                                ? 'border-[#00BCFF] bg-cyan-500/5 dark:bg-cyan-500/5'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 hover:scale-[1.01]'
                            }`}
                          >
                            {/* Inline Delete Confirmation Overlay */}
                            {isConfirmingDelete && (
                              <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/95 rounded-2xl flex flex-col items-center justify-center p-4 text-center z-25 animate-in fade-in duration-150">
                                <p className="text-xs font-extrabold text-slate-900 dark:text-white mb-2.5">
                                  Delete this contact permanently?
                                </p>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      deleteLead(item.id);
                                      setDeleteConfirmId(null);
                                      setSelectedLeadIds(prev => prev.filter(x => x !== uniqueId));
                                      showToastNotification('success', 'Contact deleted successfully.');
                                    }}
                                    className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-extrabold cursor-pointer transition-colors"
                                  >
                                    Yes, Delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-white rounded-xl text-[10px] font-extrabold cursor-pointer transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Card Header Row */}
                            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2.5">
                              <div className="flex items-start gap-2.5 min-w-0">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleToggleSelectLead(uniqueId)}
                                  className="w-4 h-4 mt-2.5 rounded border-slate-300 dark:border-slate-800 text-[#00BCFF] focus:ring-[#00BCFF] cursor-pointer shrink-0"
                                />
                                <div className="w-9 h-9 rounded-2xl bg-cyan-500/10 text-[#00BCFF] font-black text-xs flex items-center justify-center shrink-0">
                                  {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">{item.name}</h4>
                                  {(item.role || item.title || item.company) && (
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold truncate">
                                      {item.role || item.title} {item.company ? `@ ${item.company}` : ''}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[9px] text-slate-400 font-extrabold uppercase bg-slate-200/50 dark:bg-slate-900 px-2 py-0.5 rounded-md">
                                  {item.date || 'Today'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(uniqueId)}
                                  className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-rose-400 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900/60 transition-colors cursor-pointer"
                                  title="Delete Contact"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Contact Card Body (Emails, Phones, Notes) */}
                            <div className="space-y-2 text-xs">
                              {item.email && (
                                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 group">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                    <span className="font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-400 truncate">{item.email}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(item.email);
                                      showToastNotification('success', 'Email copied to clipboard!');
                                    }}
                                    className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                                    title="Copy Email"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              )}

                              {item.phone && (
                                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 group">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate">{item.phone}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(item.phone);
                                      showToastNotification('success', 'Phone number copied!');
                                    }}
                                    className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                                    title="Copy Phone"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              )}

                              {(item.notes || item.note) && (
                                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-850">
                                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Shared Note</span>
                                  <p className="text-[11px] italic text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                                    "{item.notes || item.note}"
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Card Footer Actions */}
                            <div className="pt-2 flex items-center justify-end border-t border-slate-250/20 dark:border-slate-850/20">
                              <button
                                type="button"
                                onClick={() => {
                                  saveContactToPhone(item);
                                  showToastNotification('success', 'Contact vCard downloaded!');
                                }}
                                className="w-full py-2 bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 rounded-xl text-[10px] font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Import to Phone / Google</span>
                              </button>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}

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
              <SettingsStudio
                customHandle={customHandle}
                setCustomHandle={setCustomHandle}
                profile={profile}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                handleSaveProfile={handleSaveProfile}
              />
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

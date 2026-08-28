import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  CreditCard,
  TrendingUp,
  Users,
  Rss,
  Sparkles,
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
  AtSign
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MobilePhonePreview from '../components/ui/MobilePhonePreview';
import ActivateCardModal from '../components/onboarding/ActivateCardModal';
import SocialIcon from '../components/ui/SocialIcon';
import { useApp } from '../context/AppContext';

export const DashboardPage = () => {
  const {
    profile,
    updateProfileField,
    updateSocialLink,
    activeCardUid,
    claimAndLinkCard,
    leads,
    setCurrentPage,
    triggerNfcTap,
    isTapSimulating
  } = useApp();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'leads' | 'cards' | 'analytics'
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newCardUidInput, setNewCardUidInput] = useState('');
  const [cardLinkMsg, setCardLinkMsg] = useState('');

  // Profile Form States
  const [name, setName] = useState(profile?.name || '');
  const [title, setTitle] = useState(profile?.title || '');
  const [company, setCompany] = useState(profile?.company || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [location, setLocation] = useState(profile?.location || '');

  const [instagram, setInstagram] = useState(profile?.socials?.instagram || '');
  const [linkedin, setLinkedin] = useState(profile?.socials?.linkedin || '');
  const [twitter, setTwitter] = useState(profile?.socials?.twitter || '');
  const [whatsapp, setWhatsapp] = useState(profile?.socials?.whatsapp || '');

  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  const handleCopyProfileLink = () => {
    const profileUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/card/${activeCardUid || 'BLM-9921-NFC'}`
      : 'http://localhost:5175';
    navigator.clipboard.writeText(profileUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (name) updateProfileField('name', name);
    if (title) updateProfileField('title', title);
    if (company) updateProfileField('company', company);
    if (phone) updateProfileField('phone', phone);
    if (bio) updateProfileField('bio', bio);
    if (website) updateProfileField('website', website);
    if (location) updateProfileField('location', location);

    if (instagram) updateSocialLink('instagram', instagram);
    if (linkedin) updateSocialLink('linkedin', linkedin);
    if (twitter) updateSocialLink('twitter', twitter);
    if (whatsapp) updateSocialLink('whatsapp', whatsapp);

    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleLinkNewCard = (e) => {
    e.preventDefault();
    if (!newCardUidInput) return;
    claimAndLinkCard(newCardUidInput.toUpperCase());
    setCardLinkMsg(`Card #${newCardUidInput.toUpperCase()} successfully bound!`);
    setNewCardUidInput('');
    setTimeout(() => setCardLinkMsg(''), 4000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Editor', icon: User },
    { id: 'cards', label: 'My Physical Cards', icon: CreditCard },
    { id: 'leads', label: 'Captured Leads', icon: Users },
    { id: 'analytics', label: 'Tap Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-8">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 p-6 sm:p-8 rounded-3xl border border-slate-800 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-400 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{profile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-[#00BCFF] border border-cyan-500/30 text-[10px] font-extrabold uppercase">
                  PRO USER
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>{profile.email || 'precious@bloomlabs.africa'}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 flex items-center gap-1 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Linked: #{activeCardUid}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3 relative z-10 w-full md:w-auto">
            <button
              onClick={handleCopyProfileLink}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Profile Link'}</span>
            </button>

            <button
              onClick={triggerNfcTap}
              disabled={isTapSimulating}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Rss className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Simulate NFC Tap</span>
            </button>

            <button
              onClick={() => setIsActivateModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Activate New Card</span>
            </button>
          </div>
        </div>

        {/* Desktop & Mobile Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#00BCFF] text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        <div className="space-y-6">
          
          {/* TAB 1: PROFILE EDITOR */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Side */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Profile Details</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Updates sync instantly to your NFC card.</p>
                  </div>
                  {saveSuccessMsg && (
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
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
                        Job Title
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
                        Company
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
                      Bio / Pitch
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#00BCFF]"
                    />
                  </div>

                  {/* Social Links */}
                  <div className="pt-2 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                      Connected Social Handles
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative flex items-center">
                        <SocialIcon platform="instagram" className="w-4 h-4 text-pink-500 absolute left-3" />
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="Instagram handle"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-9 pr-3 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>

                      <div className="relative flex items-center">
                        <SocialIcon platform="linkedin" className="w-4 h-4 text-blue-500 absolute left-3" />
                        <input
                          type="text"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="LinkedIn profile"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-9 pr-3 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>

                      <div className="relative flex items-center">
                        <SocialIcon platform="twitter" className="w-4 h-4 text-slate-400 absolute left-3" />
                        <input
                          type="text"
                          value={twitter}
                          onChange={(e) => setTwitter(e.target.value)}
                          placeholder="X / Twitter handle"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-9 pr-3 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>

                      <div className="relative flex items-center">
                        <SocialIcon platform="whatsapp" className="w-4 h-4 text-emerald-500 absolute left-3" />
                        <input
                          type="text"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="WhatsApp number"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-9 pr-3 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                    >
                      Save Profile Updates
                    </button>
                  </div>
                </form>
              </div>

              {/* Phone Preview Side */}
              <div className="hidden lg:block lg:col-span-5 sticky top-24">
                <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-2xl space-y-4 text-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center justify-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" /> Real-Time NFC Tap View
                  </span>
                  <MobilePhonePreview data={profile} />
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

                {/* Primary Active Card Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 border border-cyan-500/30 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                  <div className="space-y-2 relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-[#00BCFF] border border-cyan-500/40 text-[10px] font-extrabold uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" /> NTAG216 Verified Primary Tag
                    </div>
                    <h4 className="text-2xl font-mono font-black">{activeCardUid}</h4>
                    <p className="text-xs text-slate-400">Linked to account: <strong className="text-white">{profile.name}</strong></p>
                  </div>

                  <div className="flex items-center gap-3 relative z-10">
                    <button
                      onClick={triggerNfcTap}
                      disabled={isTapSimulating}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Rss className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Test Tap Profile</span>
                    </button>
                  </div>
                </div>

                {/* Inline Card Binding Form */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    Link & Bind New Physical Card UID
                  </h4>
                  <form onSubmit={handleLinkNewCard} className="flex gap-2 max-w-md">
                    <input
                      type="text"
                      value={newCardUidInput}
                      onChange={(e) => setNewCardUidInput(e.target.value.toUpperCase())}
                      placeholder="e.g. BLM-9921-NFC"
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

          {/* TAB 3: CAPTURED LEADS */}
          {activeTab === 'leads' && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Captured Leads</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">People who tapped your card and shared their details back.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-[#00BCFF] font-bold text-xs">
                  {leads.length} Total Leads
                </span>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Users className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
                  <p className="text-xs text-slate-500 font-bold">No leads captured yet. Tap your card against a phone to start receiving contact details!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leads.map((lead, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">{lead.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">{lead.date || 'Today'}</span>
                      </div>
                      <p className="text-xs text-[#00BCFF] font-bold">{lead.email}</p>
                      {lead.phone && <p className="text-xs text-slate-400 font-mono">{lead.phone}</p>}
                      {lead.note && <p className="text-xs italic text-slate-500 dark:text-slate-400 pt-1">"{lead.note}"</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: TAP ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Taps</span>
                  <div className="text-3xl font-black text-[#00BCFF]">{profile.stats?.totalTaps || 1422}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Taps</span>
                  <div className="text-3xl font-black text-cyan-400">{profile.stats?.monthlyTaps || 482}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unique Viewers</span>
                  <div className="text-3xl font-black text-emerald-400">{profile.stats?.uniqueVisitors || 1104}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conversion Rate</span>
                  <div className="text-3xl font-black text-purple-400">{profile.stats?.conversionRate || 84}%</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* Activate Card Modal */}
      <ActivateCardModal
        isOpen={isActivateModalOpen}
        onClose={() => setIsActivateModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default DashboardPage;

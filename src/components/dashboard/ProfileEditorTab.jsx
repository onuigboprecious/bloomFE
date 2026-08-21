import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, Globe, MapPin, Camera, Save, CheckCircle2,
  Palette, LayoutGrid, Check, Eye, Smartphone, Rss,
  Calendar, Video, ExternalLink, Share2, Download, MessageCircle, Play, Upload,
  Plus, Trash2, ChevronDown, AtSign, Link2, X, ArrowRight, Sparkles, Layers
} from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import SocialIcon from '../ui/SocialIcon';
import { useApp } from '../../context/AppContext';
import { mockProfileThemes, mockProfileLayouts } from '../../data/mockData';

const AVAILABLE_PLATFORMS = [
  { id: 'instagram', label: 'Instagram', color: 'text-pink-500', placeholder: 'username (e.g. precious.design)', prefix: '@' },
  { id: 'tiktok', label: 'TikTok', color: 'text-cyan-400', placeholder: 'handle (e.g. @precious_creator)', prefix: '@' },
  { id: 'whatsapp', label: 'WhatsApp', color: 'text-emerald-500', placeholder: 'phone number (+2348031234567)', prefix: '+' },
  { id: 'twitter', label: 'X / Twitter', color: 'text-slate-200', placeholder: 'username (e.g. preciousonuigbo)', prefix: '@' },
  { id: 'linkedin', label: 'LinkedIn', color: 'text-blue-500', placeholder: 'username or URL', prefix: 'in/' },
  { id: 'calendly', label: 'Calendly / Booking', color: 'text-cyan-400', placeholder: 'https://calendly.com/yourname', prefix: 'https://' },
  { id: 'portfolio', label: 'Portfolio Website', color: 'text-emerald-400', placeholder: 'https://yourwebsite.com', prefix: 'https://' },
  { id: 'youtube', label: 'YouTube Channel', color: 'text-rose-500', placeholder: '@yourchannel', prefix: '@' }
];

const THEME_CONFIGS = {
  'dark-luxe': {
    name: 'Midnight Obsidian',
    bg: 'bg-slate-950 text-white',
    cardInner: 'bg-slate-900/90 border-slate-800 text-white',
    accentText: 'text-[#00BCFF]',
    primaryBtn: 'bg-[#00BCFF] text-slate-950 hover:bg-cyan-400 font-black',
    secBtn: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-black',
    swatchBg: 'bg-slate-900',
    badge: 'Most Popular'
  },
  'neon-cyber': {
    name: 'Cyberpunk Glow',
    bg: 'bg-black text-cyan-400',
    cardInner: 'bg-slate-950 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-white',
    accentText: 'text-cyan-300',
    primaryBtn: 'bg-cyan-400 text-black hover:bg-cyan-300 font-black',
    secBtn: 'bg-teal-400 text-black hover:bg-teal-300 font-black',
    swatchBg: 'bg-black',
    badge: 'Creator Favorite'
  },
  'sunset-amber': {
    name: 'Sahara Sunset',
    bg: 'bg-amber-950 text-amber-100',
    cardInner: 'bg-amber-950/40 border-amber-500/30 text-amber-100',
    accentText: 'text-amber-400',
    primaryBtn: 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-black',
    secBtn: 'bg-rose-500 text-white hover:bg-rose-400 font-black',
    swatchBg: 'bg-amber-950',
    badge: 'Warm Luxe'
  },
  'emerald-green': {
    name: 'Lagos Emerald',
    bg: 'bg-emerald-950 text-emerald-100',
    cardInner: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-100',
    accentText: 'text-emerald-400',
    primaryBtn: 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-black',
    secBtn: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-black',
    swatchBg: 'bg-emerald-950',
    badge: 'Fresh'
  },
  'minimal-white': {
    name: 'Minimal Pure Light',
    bg: 'bg-slate-100 text-slate-900',
    cardInner: 'bg-white border-slate-200 shadow-md text-slate-900',
    accentText: 'text-cyan-600',
    primaryBtn: 'bg-slate-900 text-white hover:bg-slate-800 font-black',
    secBtn: 'bg-[#00BCFF] text-slate-950 hover:bg-cyan-400 font-black',
    swatchBg: 'bg-slate-200',
    badge: 'Clean Light'
  }
};

export const ProfileEditorTab = () => {
  const {
    profile,
    updateProfileField,
    updateSocialLink,
    exportVCard,
    openShareBackModal,
    isTapSimulating,
    triggerNfcTap
  } = useApp();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [selectedPlatformToAdd, setSelectedPlatformToAdd] = useState('');
  const fileInputRef = useRef(null);

  const currentThemeKey = profile.theme || 'dark-luxe';
  const themeConfig = THEME_CONFIGS[currentThemeKey] || THEME_CONFIGS['dark-luxe'];
  const currentLayoutKey = profile.layout || 'stack';

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be under 5MB.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateProfileField('avatar', event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  const handleAddPlatform = (platformId) => {
    if (!platformId) return;
    const currentVal = profile.socials?.[platformId] || '';
    if (!currentVal) {
      updateSocialLink(platformId, '');
    }
    setSelectedPlatformToAdd('');
  };

  const handleRemoveSocial = (platformId) => {
    updateSocialLink(platformId, '');
  };

  // Get active social platforms
  const activeSocialKeys = Object.keys(profile.socials || {}).filter(
    (key) => profile.socials[key] !== undefined && profile.socials[key] !== ''
  );

  return (
    <div className="space-y-8 max-w-7xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Edit Profile Details
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage your handle, contact details, dynamic social channels, themes, and live mobile preview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Saved Live!</span>
            </div>
          )}
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Profile Editor Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">

          {/* 1. Personal Handle & URL */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Personal Handle
              </label>
              <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-lg">
                bloom.app/@{profile.username || 'precious'}
              </span>
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs font-bold text-slate-400 select-none">bloom.app/@</span>
              <input
                type="text"
                value={profile.username || ''}
                onChange={(e) => updateProfileField('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="yourname"
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono font-bold rounded-xl pl-24 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#00BCFF]"
              />
            </div>
          </div>

          {/* 2. Avatar & Basic Information */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800/80 pb-2">
              Basic Profile Details
            </h4>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/webp, image/gif"
              className="hidden"
              onChange={handleAvatarFileChange}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer" onClick={handleTriggerUpload}>
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-xs group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white block">Profile Avatar</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Upload custom photo (PNG, JPG max 5MB).
                  </span>
                  {uploadError && (
                    <span className="text-[11px] text-rose-500 font-bold block">{uploadError}</span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleTriggerUpload}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white hover:border-cyan-400 cursor-pointer flex items-center gap-1.5 self-start sm:self-center"
              >
                <Upload className="w-3.5 h-3.5 text-[#00BCFF]" />
                <span>Upload Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(e) => updateProfileField('name', e.target.value)}
                placeholder="e.g. Precious Onuigbo"
              />
              <Input
                label="Title / Craft"
                value={profile.title}
                onChange={(e) => updateProfileField('title', e.target.value)}
                placeholder="e.g. Product Designer & Creator"
              />
              <Input
                label="Company / Brand"
                value={profile.company}
                onChange={(e) => updateProfileField('company', e.target.value)}
                placeholder="e.g. Bloom Labs"
              />
              <Input
                label="Location"
                value={profile.location}
                onChange={(e) => updateProfileField('location', e.target.value)}
                placeholder="e.g. Lagos & Abuja, Nigeria"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Short Bio / Pitch
              </label>
              <textarea
                rows={3}
                value={profile.bio || ''}
                onChange={(e) => updateProfileField('bio', e.target.value)}
                placeholder="Briefly state what you build or offer when someone taps your card..."
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:border-[#00BCFF] resize-none"
              />
            </div>
          </div>

          {/* 3. SMART DYNAMIC CONTACT & SOCIAL CHANNELS */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Contact & Social Channels
              </h4>
              <span className="text-[10px] font-bold text-slate-400">
                {activeSocialKeys.length + 2} Connected Channels
              </span>
            </div>

            {/* Core Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Primary Email Address"
                type="email"
                value={profile.email}
                onChange={(e) => updateProfileField('email', e.target.value)}
                placeholder="e.g. precious@bloomlabs.africa"
              />
              <Input
                label="WhatsApp / Direct Phone"
                value={profile.phone}
                onChange={(e) => updateProfileField('phone', e.target.value)}
                placeholder="e.g. +234 803 123 4567"
              />
            </div>

            {/* Active Social Channels */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                Connected Social Icons & Channels
              </label>

              <div className="space-y-2.5">
                {AVAILABLE_PLATFORMS.map((platform) => {
                  const val = profile.socials?.[platform.id];
                  if (val === undefined && !activeSocialKeys.includes(platform.id)) {
                    return null;
                  }
                  return (
                    <div
                      key={platform.id}
                      className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3 transition-all hover:border-cyan-500/30"
                    >
                      {/* Authentic Brand SVG Icon */}
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                        <SocialIcon platform={platform.id} className={`w-4 h-4 ${platform.color}`} />
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-extrabold text-slate-900 dark:text-white block">
                            {platform.label}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({platform.prefix})
                          </span>
                        </div>
                        <input
                          type="text"
                          value={val || ''}
                          onChange={(e) => updateSocialLink(platform.id, e.target.value)}
                          placeholder={platform.placeholder}
                          className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white outline-none focus:text-cyan-400 placeholder:text-slate-400/50"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveSocial(platform.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors"
                        title="Remove Channel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Smart Add Channel Dropdown Picker */}
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                + Add Social Icon / Channel
              </label>
              <div className="relative">
                <select
                  value={selectedPlatformToAdd}
                  onChange={(e) => handleAddPlatform(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 appearance-none focus:outline-none focus:border-[#00BCFF] cursor-pointer"
                >
                  <option value="">Select a platform (Instagram, TikTok, WhatsApp, X, LinkedIn, YouTube...)</option>
                  {AVAILABLE_PLATFORMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} {profile.socials?.[p.id] ? '(Connected)' : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* 4. RE-DESIGNED INTERACTIVE THEME & LAYOUT PICKER (UI/UX CONCEPT) */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-6">
            
            {/* Theme Picker */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#00BCFF]" />
                  <span>Card Theme Palette</span>
                </label>
                <span className="text-[10px] font-bold text-cyan-500">
                  Active: {themeConfig.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.keys(THEME_CONFIGS).map((themeKey) => {
                  const cfg = THEME_CONFIGS[themeKey];
                  const isSelected = (profile.theme || 'dark-luxe') === themeKey;
                  return (
                    <div
                      key={themeKey}
                      onClick={() => updateProfileField('theme', themeKey)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? 'border-[#00BCFF] ring-2 ring-[#00BCFF]/30 shadow-lg'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 bg-white dark:bg-slate-950'
                      }`}
                    >
                      {/* Theme Color Gradient Swatch */}
                      <div className={`h-12 w-full rounded-xl ${cfg.swatchBg} border border-white/10 p-2 flex items-center justify-between shadow-inner mb-2.5`}>
                        <span className="text-[10px] font-black uppercase tracking-wider text-white/80 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {cfg.badge}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#00BCFF] text-slate-950 flex items-center justify-center font-bold">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <h5 className="text-xs font-black text-slate-900 dark:text-white">
                          {cfg.name}
                        </h5>
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Real-time live swatch
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Layout Picker */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-[#00BCFF]" />
                  <span>Profile Layout Wireframe</span>
                </label>
                <span className="text-[10px] font-bold text-cyan-500 uppercase font-mono">
                  {currentLayoutKey}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'stack',
                    name: 'Modern Stack',
                    desc: 'Centered avatar, stacked actions & social row',
                    icon: Layers
                  },
                  {
                    id: 'grid',
                    name: 'Portfolio Grid',
                    desc: 'Bento-grid cards with 2-col action & social tiles',
                    icon: LayoutGrid
                  },
                  {
                    id: 'linktree',
                    name: 'Bio Link First',
                    desc: 'Full-width link bar cards with brand icons',
                    icon: Link2
                  }
                ].map((layout) => {
                  const isSelected = currentLayoutKey === layout.id;
                  const Icon = layout.icon;
                  return (
                    <div
                      key={layout.id}
                      onClick={() => updateProfileField('layout', layout.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'border-[#00BCFF] bg-cyan-500/10 ring-2 ring-[#00BCFF]/30'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#00BCFF]">
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-black uppercase text-[#00BCFF] bg-cyan-500/20 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs font-black text-slate-900 dark:text-white block">
                          {layout.name}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
                          {layout.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>

        </form>

        {/* Right Column: Dynamic Live iPhone 15 Pro Mockup (Tablet & Desktop Only) */}
        <div className="hidden md:block lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          
          {/* Card Preview Container */}
          <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
            
            {/* Header info bar */}
            <div className="flex items-center justify-between px-2 text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 text-cyan-400">
                <Smartphone className="w-3.5 h-3.5" />
                iPhone 15 Pro Live Preview
              </span>
              <span className="font-mono text-[10px] bg-slate-900 px-2.5 py-0.5 rounded-md border border-slate-800 text-slate-300">
                bloom.app/@{profile.username || 'precious'}
              </span>
            </div>

            {/* REALISTIC iPHONE 15 PRO HARDWARE FRAME */}
            <div className="relative mx-auto w-full max-w-[340px]">
              
              {/* iPhone Hardware Outer Frame (Titanium Border + Side Buttons) */}
              <div className="relative rounded-[46px] border-[10px] border-slate-800 bg-slate-950 p-3.5 shadow-2xl ring-1 ring-slate-700/50">
                
                {/* iPhone Left Volume & Mute Side Buttons */}
                <div className="absolute -left-[14px] top-24 w-[4px] h-7 bg-slate-800 rounded-l-md" />
                <div className="absolute -left-[14px] top-36 w-[4px] h-10 bg-slate-800 rounded-l-md" />
                <div className="absolute -left-[14px] top-50 w-[4px] h-10 bg-slate-800 rounded-l-md" />

                {/* iPhone Right Power Button */}
                <div className="absolute -right-[14px] top-36 w-[4px] h-14 bg-slate-800 rounded-r-md" />

                {/* DYNAMIC ISLAND (iPhone 15 Notch) */}
                <div className="w-24 h-5 bg-black rounded-full mx-auto mb-3 flex items-center justify-between px-2.5 shrink-0 z-30 relative shadow-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                  <span className="w-2 h-2 rounded-full bg-blue-950 border border-blue-900/60" />
                </div>

                {/* iPHONE DISPLAY SCREEN (Theme & Layout Reactive) */}
                <div className={`${themeConfig.bg} rounded-[32px] p-4 text-center min-h-[460px] flex flex-col justify-between overflow-hidden transition-all duration-300 border border-white/5`}>
                  
                  {/* Screen Content */}
                  <div className="my-auto space-y-4 w-full">
                    
                    {/* 1. MODERN STACK LAYOUT */}
                    {currentLayoutKey === 'stack' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 mx-auto shadow-md"
                          />
                          <h4 className="text-base font-black tracking-tight">{profile.name || "Your Name"}</h4>
                          <p className={`text-xs font-medium ${themeConfig.accentText}`}>{profile.title || "Your Title"}</p>
                          <p className="text-[11px] opacity-70 font-mono">{profile.company} • {profile.location}</p>
                        </div>

                        {profile.bio && (
                          <p className={`text-xs italic px-2 p-2.5 rounded-xl border ${themeConfig.cardInner}`}>
                            "{profile.bio}"
                          </p>
                        )}

                        {activeSocialKeys.length > 0 && (
                          <div className="flex flex-wrap items-center justify-center gap-2 py-1">
                            {activeSocialKeys.map((key) => {
                              const platformInfo = AVAILABLE_PLATFORMS.find((p) => p.id === key);
                              return (
                                <span
                                  key={key}
                                  className="w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-white shadow-xs"
                                  title={platformInfo?.label || key}
                                >
                                  <SocialIcon platform={key} className={`w-4 h-4 ${platformInfo?.color || 'text-cyan-400'}`} />
                                </span>
                              );
                            })}
                          </div>
                        )}

                        <div className="space-y-2 pt-1">
                          <button
                            type="button"
                            onClick={exportVCard}
                            className={`w-full py-2.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${themeConfig.primaryBtn}`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Save Contact to Phone</span>
                          </button>

                          <button
                            type="button"
                            onClick={openShareBackModal}
                            className={`w-full py-2.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${themeConfig.secBtn}`}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share Contact Back 🤝</span>
                          </button>

                          {profile.socials?.calendly && (
                            <a
                              href={profile.socials.calendly}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full bg-slate-800 border border-slate-700 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-2"
                            >
                              <SocialIcon platform="calendly" className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Book a Call</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 2. PORTFOLIO BENTO GRID LAYOUT */}
                    {currentLayoutKey === 'grid' && (
                      <div className="space-y-3 text-left">
                        <div className={`p-3.5 rounded-2xl border ${themeConfig.cardInner} flex items-center gap-3`}>
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-14 h-14 rounded-xl object-cover border-2 border-cyan-400 shrink-0"
                          />
                          <div className="space-y-0.5 truncate">
                            <h4 className="text-sm font-black truncate">{profile.name || "Your Name"}</h4>
                            <p className={`text-xs font-bold ${themeConfig.accentText} truncate`}>{profile.title || "Your Title"}</p>
                            <span className="text-[10px] opacity-70 block font-mono truncate">{profile.company}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={exportVCard}
                            className={`py-2.5 px-2 rounded-xl text-[11px] shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${themeConfig.primaryBtn}`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Save Contact</span>
                          </button>

                          <button
                            type="button"
                            onClick={openShareBackModal}
                            className={`py-2.5 px-2 rounded-xl text-[11px] shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${themeConfig.secBtn}`}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share Back</span>
                          </button>
                        </div>

                        {activeSocialKeys.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {activeSocialKeys.map((key) => {
                              const platformInfo = AVAILABLE_PLATFORMS.find((p) => p.id === key);
                              return (
                                <div
                                  key={key}
                                  className={`p-2.5 rounded-xl border ${themeConfig.cardInner} flex items-center gap-2`}
                                >
                                  <SocialIcon platform={key} className={`w-4 h-4 ${platformInfo?.color || 'text-cyan-400'}`} />
                                  <span className="text-[11px] font-bold truncate capitalize">{key}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 3. BIO LINK FIRST (LINKTREE STYLE) */}
                    {currentLayoutKey === 'linktree' && (
                      <div className="space-y-3 text-center">
                        <div className="space-y-1.5">
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 mx-auto shadow-md"
                          />
                          <h4 className="text-base font-black tracking-tight">{profile.name || "Your Name"}</h4>
                          <p className={`text-xs font-bold ${themeConfig.accentText}`}>{profile.title || "Your Title"}</p>
                        </div>

                        <div className="space-y-2 pt-2">
                          <button
                            type="button"
                            onClick={exportVCard}
                            className={`w-full py-2.5 rounded-2xl text-xs shadow-md flex items-center justify-between px-4 cursor-pointer transition-all ${themeConfig.primaryBtn}`}
                          >
                            <div className="flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              <span>Save Contact to Phone</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={openShareBackModal}
                            className={`w-full py-2.5 rounded-2xl text-xs shadow-md flex items-center justify-between px-4 cursor-pointer transition-all ${themeConfig.secBtn}`}
                          >
                            <div className="flex items-center gap-2">
                              <Share2 className="w-4 h-4" />
                              <span>Share Contact Back 🤝</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          {activeSocialKeys.map((key) => {
                            const platformInfo = AVAILABLE_PLATFORMS.find((p) => p.id === key);
                            const val = profile.socials?.[key];
                            return (
                              <div
                                key={key}
                                className={`w-full py-2.5 px-4 rounded-2xl border ${themeConfig.cardInner} flex items-center justify-between text-xs font-bold`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <SocialIcon platform={key} className={`w-4 h-4 ${platformInfo?.color || 'text-cyan-400'}`} />
                                  <span className="capitalize">{platformInfo?.label || key}</span>
                                </div>
                                <span className="text-[10px] opacity-60 font-mono truncate max-w-[100px]">{val}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* iPhone Bottom Home Bar */}
                  <div className="w-24 h-1 bg-slate-400/50 rounded-full mx-auto mt-4 shrink-0" />
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileEditorTab;

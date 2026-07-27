import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, Globe, MapPin, Camera, Save, CheckCircle2,
  Sparkles, Palette, LayoutGrid, Check, Eye, Smartphone, Rss,
  Calendar, Video, ExternalLink, Share2, Download, MessageCircle, Play, Upload, RefreshCw
} from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useApp } from '../../context/AppContext';
import { mockProfileThemes, mockProfileLayouts } from '../../data/mockData';
import africanFounderImg from '../../assets/images/african_founder.png';
import africanWomanImg from '../../assets/images/african_woman_executive.png';

export const ProfileEditorTab = () => {
  const {
    profile,
    updateProfileField,
    updateSocialLink,
    exportVCard,
    isTapSimulating,
    triggerNfcTap
  } = useApp();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const activeTheme = mockProfileThemes.find((t) => t.id === profile.theme) || mockProfileThemes[0];

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

  return (
    <div className="space-y-8 max-w-7xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Profile Personalization Studio</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Customize your themes, layout choices, and social link ordering with instant live mobile preview.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile Updated Live!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-8">

          {/* Personal Vanity Handle Customization */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-transparent border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#00BCFF] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Personal Vanity Handle</span>
              </label>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full font-mono">
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
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono font-bold rounded-xl pl-24 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#00BCFF] placeholder:text-slate-400/50 dark:placeholder:text-slate-500/50 placeholder:font-normal placeholder:italic"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              This handle links directly to your digital profile and updates the live mobile preview in real-time.
            </p>
          </div>

          {/* Theme Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#00BCFF]" />
              <span>Profile Color Theme</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {mockProfileThemes.map((theme) => {
                const isSelected = profile.theme === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => updateProfileField('theme', theme.id)}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#00BCFF] ring-2 ring-[#00BCFF]/40 bg-cyan-500/10 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-400'
                    }`}
                  >
                    <div className={`h-7 rounded-lg mb-1.5 ${theme.bg} ${theme.border} border flex items-center justify-end px-2`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">{theme.name}</span>
                    <span className="text-[10px] text-slate-400 block">{theme.badge}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Layout Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-[#00BCFF]" />
              <span>Profile Layout Style</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mockProfileLayouts.map((layout) => {
                const isSelected = profile.layout === layout.id;
                return (
                  <div
                    key={layout.id}
                    onClick={() => updateProfileField('layout', layout.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#00BCFF] ring-2 ring-[#00BCFF]/40 bg-cyan-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">{layout.name}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">{layout.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Avatar Upload Section */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            
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
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400 shadow-md group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleTriggerUpload(); }}
                    className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#00BCFF] text-white shadow-md hover:bg-cyan-500 cursor-pointer"
                    title="Upload Custom Photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block">Profile Avatar Picture</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">
                    Upload PNG, JPG, or WEBP photo (max 5MB).
                  </span>
                  {uploadError && (
                    <span className="text-xs text-rose-500 font-bold block">{uploadError}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleTriggerUpload}
                  className="text-xs border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 mr-1.5 text-[#00BCFF]" />
                  Upload Photo
                </Button>
              </div>
            </div>

            {/* Quick Avatar Presets */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Or choose preset:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateProfileField('avatar', africanFounderImg)}
                  className={`w-9 h-9 rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                    profile.avatar === africanFounderImg ? 'border-[#00BCFF] ring-2 ring-[#00BCFF]/40' : 'border-slate-300 dark:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                  title="Preset Founder"
                >
                  <img src={africanFounderImg} alt="Founder Preset" className="w-full h-full object-cover" />
                </button>
                <button
                  type="button"
                  onClick={() => updateProfileField('avatar', africanWomanImg)}
                  className={`w-9 h-9 rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                    profile.avatar === africanWomanImg ? 'border-[#00BCFF] ring-2 ring-[#00BCFF]/40' : 'border-slate-300 dark:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                  title="Preset Executive"
                >
                  <img src={africanWomanImg} alt="Executive Preset" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>

          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              label="Base Location"
              value={profile.location}
              onChange={(e) => updateProfileField('location', e.target.value)}
              placeholder="e.g. Lagos & Abuja, Nigeria"
            />
          </div>

          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(e) => updateProfileField('email', e.target.value)}
              placeholder="e.g. precious@bloomlabs.africa"
            />
            <Input
              label="WhatsApp Number"
              value={profile.phone}
              onChange={(e) => updateProfileField('phone', e.target.value)}
              placeholder="e.g. +234 803 123 4567"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Bio / Personal Tagline
            </label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => updateProfileField('bio', e.target.value)}
              placeholder="e.g. Designing digital experiences & building next-gen physical NFC tools across Africa..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#00BCFF] placeholder:text-slate-400/50 dark:placeholder:text-slate-500/50 placeholder:font-normal placeholder:italic"
            />
          </div>

          {/* Individual Social & Link Variety */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Expanded Social & Booking Links</h4>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Drag to reorder in Pro</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Instagram Handle"
                value={profile.socials?.instagram || ''}
                onChange={(e) => updateSocialLink('instagram', e.target.value)}
                placeholder="e.g. precious.design"
              />
              <Input
                label="TikTok Handle"
                value={profile.socials?.tiktok || ''}
                onChange={(e) => updateSocialLink('tiktok', e.target.value)}
                placeholder="e.g. @precious_creator"
              />
              <Input
                label="X / Twitter Handle"
                value={profile.socials?.twitter || ''}
                onChange={(e) => updateSocialLink('twitter', e.target.value)}
                placeholder="e.g. preciousonuigbo"
              />
              <Input
                label="Calendly / Booking Link"
                value={profile.socials?.calendly || ''}
                onChange={(e) => updateSocialLink('calendly', e.target.value)}
                placeholder="e.g. https://calendly.com/yourname/30min"
              />
              <Input
                label="Portfolio / Website URL"
                value={profile.socials?.portfolio || ''}
                onChange={(e) => updateSocialLink('portfolio', e.target.value)}
                placeholder="e.g. https://precious.design"
              />
              <Input
                label="YouTube Channel"
                value={profile.socials?.youtube || ''}
                onChange={(e) => updateSocialLink('youtube', e.target.value)}
                placeholder="e.g. @precious_builds"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold py-3.5 px-8 text-sm cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Live Profile
          </Button>
        </form>

        {/* Right Column: Sticky Real-time Phone Live Preview */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            
            {/* Live Indicator Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#00BCFF]" />
                Live Digital Profile Preview
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Updating Live
              </span>
            </div>

            {/* Smartphone Outer Mockup Frame */}
            <div className="w-full max-w-[320px] mx-auto rounded-[40px] border-4 border-slate-700 bg-black p-2 shadow-2xl relative overflow-hidden">
              
              {/* Phone Speaker & Camera Notch */}
              <div className="w-28 h-4 bg-slate-900 rounded-b-xl mx-auto mb-2 flex items-center justify-center gap-1.5 z-20 relative">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
                <div className="w-8 h-1 rounded-full bg-slate-800" />
              </div>

              {/* Dynamic Theme & Layout Mobile Screen Content */}
              <div className={`w-full min-h-[480px] rounded-[32px] ${activeTheme.bg} ${activeTheme.border} border p-4 flex flex-col justify-between text-center relative overflow-hidden shadow-inner`}>
                
                {/* Simulated URL Pill Bar */}
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] font-mono text-cyan-300 mx-auto mb-2 flex items-center gap-1.5 shrink-0">
                  <Rss className="w-3 h-3" />
                  <span>bloom.app/@{profile.username || 'precious'}</span>
                </div>

                {/* REAL-TIME DYNAMIC LAYOUT VARIATIONS */}

                {/* 1. MODERN STACK LAYOUT */}
                {(!profile.layout || profile.layout === 'stack') && (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 my-auto"
                  >
                    <div className="space-y-2">
                      <div className="relative w-18 h-18 mx-auto">
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-full h-full rounded-full object-cover border-2 border-cyan-400 shadow-xl"
                        />
                      </div>

                      <div>
                        <h4 className="text-base font-black tracking-tight leading-tight">
                          {profile.name || "Your Full Name"}
                        </h4>
                        <p className="text-xs opacity-80 font-medium mt-0.5">
                          {profile.title || "Your Craft / Job Title"}
                        </p>
                        {profile.company && (
                          <p className="text-[11px] opacity-60 font-semibold mt-0.5">
                            @{profile.company}
                          </p>
                        )}
                      </div>

                      {profile.location && (
                        <div className="inline-flex items-center gap-1 text-[10px] opacity-75 bg-white/10 px-2.5 py-0.5 rounded-full mx-auto">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span>{profile.location}</span>
                        </div>
                      )}

                      {profile.bio && (
                        <p className="text-[11px] opacity-90 leading-relaxed px-1 line-clamp-2 italic">
                          "{profile.bio}"
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <button
                        onClick={exportVCard}
                        className="w-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-extrabold text-xs py-2 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Save Contact (vCard)</span>
                      </button>

                      {profile.socials?.calendly && (
                        <a
                          href={profile.socials.calendly}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-white/15 hover:bg-white/20 border border-white/20 text-white font-bold text-xs py-1.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                          <span>Book a Call</span>
                        </a>
                      )}
                    </div>

                    <div className="space-y-1 pt-2 border-t border-white/10">
                      <span className="text-[9px] uppercase tracking-widest opacity-50 block font-bold">Connect With Me</span>
                      <div className="flex flex-wrap justify-center gap-1">
                        {profile.socials?.instagram && (
                          <span className="px-2 py-0.5 rounded-lg bg-white/10 text-[9px] flex items-center gap-1">
                            <Camera className="w-2.5 h-2.5 text-pink-400" /> Instagram
                          </span>
                        )}
                        {profile.socials?.tiktok && (
                          <span className="px-2 py-0.5 rounded-lg bg-white/10 text-[9px] flex items-center gap-1">
                            <Video className="w-2.5 h-2.5 text-cyan-400" /> TikTok
                          </span>
                        )}
                        {profile.socials?.twitter && (
                          <span className="px-2 py-0.5 rounded-lg bg-white/10 text-[9px] flex items-center gap-1">
                            <MessageCircle className="w-2.5 h-2.5 text-sky-400" /> X
                          </span>
                        )}
                        {profile.socials?.portfolio && (
                          <span className="px-2 py-0.5 rounded-lg bg-white/10 text-[9px] flex items-center gap-1">
                            <Globe className="w-2.5 h-2.5 text-emerald-400" /> Portfolio
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. PORTFOLIO GRID LAYOUT */}
                {profile.layout === 'grid' && (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 my-auto text-left"
                  >
                    {/* Compact Header Card */}
                    <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/10 border border-white/15">
                      <img src={profile.avatar} alt={profile.name} className="w-11 h-11 rounded-xl object-cover border border-cyan-400 shrink-0" />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-black truncate">{profile.name || "Your Name"}</h4>
                        <p className="text-[10px] opacity-80 truncate">{profile.title}</p>
                        <span className="text-[9px] opacity-60 block font-mono">{profile.location}</span>
                      </div>
                    </div>

                    {profile.bio && (
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[10px] italic opacity-90 leading-tight">
                        "{profile.bio}"
                      </div>
                    )}

                    {/* 2-Column Grid Cards */}
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      <button
                        onClick={exportVCard}
                        className="col-span-2 p-2 rounded-xl bg-[#00BCFF] text-slate-950 font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-md text-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Save Contact (vCard)</span>
                      </button>

                      {profile.socials?.calendly && (
                        <a href={profile.socials.calendly} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/15 border border-white/20 text-white font-bold flex items-center gap-1 justify-center">
                          <Calendar className="w-3 h-3 text-cyan-300" />
                          <span className="text-[10px]">Calendly</span>
                        </a>
                      )}

                      {profile.socials?.portfolio && (
                        <a href={profile.socials.portfolio} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/15 border border-white/20 text-white font-bold flex items-center gap-1 justify-center">
                          <Globe className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px]">Website</span>
                        </a>
                      )}

                      {profile.socials?.instagram && (
                        <div className="p-2 rounded-xl bg-white/10 border border-white/15 flex items-center gap-1 justify-center">
                          <Camera className="w-3 h-3 text-pink-400" />
                          <span className="text-[10px]">Instagram</span>
                        </div>
                      )}

                      {profile.socials?.tiktok && (
                        <div className="p-2 rounded-xl bg-white/10 border border-white/15 flex items-center gap-1 justify-center">
                          <Video className="w-3 h-3 text-cyan-400" />
                          <span className="text-[10px]">TikTok</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 3. BIO LINK FIRST (LINKTREE STYLE) LAYOUT */}
                {profile.layout === 'linktree' && (
                  <motion.div
                    key="linktree"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 my-auto"
                  >
                    <div className="space-y-1">
                      <img src={profile.avatar} alt={profile.name} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400 mx-auto shadow-md" />
                      <h4 className="text-sm font-black">{profile.name}</h4>
                      <p className="text-[10px] opacity-75">{profile.title}</p>
                    </div>

                    {/* Full Width Stacked Action Buttons */}
                    <div className="space-y-1.5 text-xs">
                      <button
                        onClick={exportVCard}
                        className="w-full bg-[#00BCFF] text-slate-950 font-extrabold py-2 rounded-xl shadow-lg flex items-center justify-between px-3 cursor-pointer hover:scale-[1.01] transition-transform text-xs"
                      >
                        <span className="flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Save Contact</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </button>

                      {profile.socials?.calendly && (
                        <a
                          href={profile.socials.calendly}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-white/15 hover:bg-white/20 border border-white/20 text-white font-bold py-1.5 rounded-xl flex items-center justify-between px-3 text-[11px]"
                        >
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-cyan-300" /> Book a Call</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}

                      {profile.socials?.portfolio && (
                        <a
                          href={profile.socials.portfolio}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-white/15 hover:bg-white/20 border border-white/20 text-white font-bold py-1.5 rounded-xl flex items-center justify-between px-3 text-[11px]"
                        >
                          <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-emerald-400" /> Portfolio Website</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}

                      {profile.socials?.instagram && (
                        <div className="w-full bg-white/10 border border-white/15 text-white font-semibold py-1.5 rounded-xl flex items-center justify-between px-3 text-[11px]">
                          <span className="flex items-center gap-1.5"><Camera className="w-3.5 h-3.5 text-pink-400" /> Instagram (@{profile.socials.instagram})</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </div>
                      )}

                      {profile.socials?.tiktok && (
                        <div className="w-full bg-white/10 border border-white/15 text-white font-semibold py-1.5 rounded-xl flex items-center justify-between px-3 text-[11px]">
                          <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5 text-cyan-400" /> TikTok</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Phone Home Bar */}
                <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-2 shrink-0" />
              </div>

            </div>

            {/* Simulate NFC Tap Action Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={triggerNfcTap}
              disabled={isTapSimulating}
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-xs py-2.5 cursor-pointer"
            >
              {isTapSimulating ? (
                <span className="flex items-center gap-2 justify-center text-cyan-400 font-bold">
                  <span className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  Simulating NFC Tap...
                </span>
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  <Rss className="w-3.5 h-3.5 text-cyan-400" />
                  Simulate NFC Card Tap
                </span>
              )}
            </Button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileEditorTab;

import React from 'react';
import { User, Camera, Mail, Phone, MapPin, Briefcase, Building, Sparkles, Eye, ShieldCheck } from 'lucide-react';

export const PersonalInfoForm = ({
  avatar,
  profile,
  handleAvatarFileChange,
  name,
  setName,
  title,
  setTitle,
  company,
  setCompany,
  phone,
  setPhone,
  location,
  setLocation,
  showEmail,
  setShowEmail,
  bio,
  setBio
}) => {
  return (
    <div className="space-y-6 pt-1">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-4 h-4 text-[#00BCFF]" />
          <span>Personal Identity & Contact Info</span>
        </h4>
        <span className="text-[10px] font-mono text-cyan-500 font-extrabold uppercase px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
          Core Card Profile
        </span>
      </div>

      {/* Profile Avatar Card */}
      <div className="p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
            Profile Photo / Avatar
          </label>
          <span className="text-[10px] text-slate-400 font-medium">PNG, JPG or WEBP (Max 5MB)</span>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#00BCFF] shadow-lg shadow-cyan-500/10 shrink-0 group">
            <img
              src={avatar || profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
              alt="Avatar preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <label className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
              <Camera className="w-6 h-6 text-[#00BCFF]" />
              <span className="text-[9px] font-extrabold mt-1 uppercase">Change</span>
              <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
            </label>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Upload a crisp headshot or brand logo to display on your NFC physical card tap view.
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs cursor-pointer transition-all active:scale-95 shadow-md shadow-cyan-500/20">
              <Camera className="w-4 h-4 text-slate-950" />
              <span>Upload Photo</span>
              <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Name Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#00BCFF]" /> Full Display Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex Morgan"
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all"
        />
      </div>

      {/* Title & Company Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Job Title / Craft
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Chief Product Strategist"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-cyan-400" /> Company / Studio
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Innovations Ltd"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all"
          />
        </div>
      </div>

      {/* Phone & Location Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-400" /> Direct Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234 800 000 0000"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Base Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Victoria Island, Lagos, NG"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all"
          />
        </div>
      </div>

      {/* Public Email Visibility Toggle Switch */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm">
        <div className="space-y-0.5 min-w-0 pr-3">
          <span className="text-xs font-black text-slate-900 dark:text-white block flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#00BCFF]" /> Public Email Visibility
          </span>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
            Allow recipients to tap and email you directly from your bio page
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowEmail((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${showEmail ? 'bg-[#00BCFF]' : 'bg-slate-300 dark:bg-slate-700'}`}
        >
          <div className={`bg-slate-950 dark:bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${showEmail ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>

      {/* Bio / Creator Pitch */}
      <div className="space-y-1.5">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Bio / Pitch Summary
        </label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Briefly describe your craft, mission, or value proposition..."
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl p-4 text-xs font-medium focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all leading-relaxed"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;


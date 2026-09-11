import React from 'react';
import { User, Camera, Mail, Phone, MapPin, Briefcase, Building, FileText } from 'lucide-react';

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
      <div className="flex items-center justify-between pb-3 border-b border-[#1E2A42]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] flex items-center gap-2">
          <User className="w-4 h-4 text-[#38BDF8]" />
          <span>Personal Identity & Contact Info</span>
        </h4>
      </div>

      {/* Profile Avatar Card with Story Ring */}
      <div className="p-5 rounded-2xl bg-[#10192B] border border-[#1E2A42] space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] block">
            Profile Photo / Avatar
          </label>
          <span className="text-[11px] text-[#8B98AE]">PNG, JPG or WEBP (Max 5MB)</span>
        </div>
        
        <div className="flex items-center gap-5">
          {/* Story Ring Avatar Wrap */}
          <div className="story-ring-wrap w-20 h-20 group relative cursor-pointer">
            <div className="story-ring-inner">
              <img
                src={avatar || profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                alt="Avatar preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <label className="absolute inset-0 bg-[#070B14]/80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
              <Camera className="w-5 h-5 text-[#38BDF8]" />
              <span className="text-[9px] font-bold mt-0.5 uppercase">Change</span>
              <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
            </label>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-xs text-[#8B98AE] leading-relaxed font-normal">
              Upload a crisp headshot or brand logo for your physical card & digital bio.
            </p>
            <label style={{ background: 'var(--grad)' }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs cursor-pointer transition-all active:scale-95 shadow-md">
              <Camera className="w-4 h-4 text-white" />
              <span>Upload Photo</span>
              <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Name Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#38BDF8]" /> Full Display Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex Morgan"
          className="w-full bg-[#16223A] border border-[#1E2A42] text-[#F1F5F9] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#38BDF8]"
        />
      </div>

      {/* Title & Company Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#38BDF8]" /> Job Title / Craft
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Chief Product Strategist"
            className="w-full bg-[#16223A] border border-[#1E2A42] text-[#F1F5F9] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#38BDF8]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-[#38BDF8]" /> Company / Studio
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Innovations Ltd"
            className="w-full bg-[#16223A] border border-[#1E2A42] text-[#F1F5F9] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#38BDF8]"
          />
        </div>
      </div>

      {/* Phone & Location Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#34D399]" /> Direct Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234 800 000 0000"
            className="w-full bg-[#16223A] border border-[#1E2A42] text-[#F1F5F9] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#38BDF8]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#34D399]" /> Base Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Victoria Island, Lagos, NG"
            className="w-full bg-[#16223A] border border-[#1E2A42] text-[#F1F5F9] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#38BDF8]"
          />
        </div>
      </div>

      {/* Public Email Visibility Toggle Switch */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#10192B] border border-[#1E2A42]">
        <div className="space-y-0.5 min-w-0 pr-3">
          <span className="text-xs font-bold text-[#F1F5F9] flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#38BDF8]" /> Public Email Visibility
          </span>
          <span className="text-[11px] text-[#8B98AE] block">
            Allow recipients to tap and email you directly from your bio page
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowEmail((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${showEmail ? 'bg-[#38BDF8]' : 'bg-[#16223A] border border-[#1E2A42]'}`}
        >
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${showEmail ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>

      {/* Bio / Creator Pitch */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#38BDF8]" /> Bio / Pitch Summary
        </label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Briefly describe your craft, mission, or value proposition..."
          className="w-full bg-[#16223A] border border-[#1E2A42] text-[#F1F5F9] rounded-xl p-3.5 text-xs font-normal focus:outline-none focus:border-[#38BDF8] leading-relaxed"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;



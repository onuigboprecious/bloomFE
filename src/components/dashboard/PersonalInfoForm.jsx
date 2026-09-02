import React from 'react';
import { User, Camera } from 'lucide-react';

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

      {/* Email Visibility Toggle Switch */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="space-y-0.5">
          <span className="text-xs font-extrabold text-slate-900 dark:text-white block">Public Email Visibility</span>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Allow people who tap your card to see and email you</span>
        </div>
        <button
          type="button"
          onClick={() => setShowEmail((prev) => !prev)}
          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${showEmail ? 'bg-[#00BCFF]' : 'bg-slate-300 dark:bg-slate-700'}`}
        >
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${showEmail ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
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
    </div>
  );
};

export default PersonalInfoForm;

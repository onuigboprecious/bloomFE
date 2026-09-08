import React from 'react';
import { Share2, Trash2, Plus, Globe, CheckCircle2, Sparkles } from 'lucide-react';
import SocialIcon from '../ui/SocialIcon';

export const SocialHandlesManager = ({
  socialHandlesList,
  setSocialHandlesList,
  newSocialPlatform,
  setNewSocialPlatform,
  newSocialValue,
  setNewSocialValue,
  handleAddSocialHandle,
  handleRemoveSocialHandle
}) => {
  return (
    <div className="pt-2 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <Share2 className="w-4 h-4 text-[#00BCFF]" />
          <span>Social Channels & Digital Identity</span>
        </h4>
        <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          {socialHandlesList.length} Connected
        </span>
      </div>

      {/* Active Social Handles List */}
      {socialHandlesList.length === 0 ? (
        <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-950/50 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-[#00BCFF] flex items-center justify-center mx-auto border border-cyan-500/20">
            <Share2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-extrabold text-slate-900 dark:text-white">No social channels connected yet.</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Connect your Instagram, LinkedIn, WhatsApp, TikTok, X, or GitHub handle below to share them on tap.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialHandlesList.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/40 transition-all shadow-xs group"
            >
              <div className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-[#00BCFF] border border-slate-800 shrink-0 shadow-inner">
                <SocialIcon platform={item.platform} className="w-4 h-4 text-[#00BCFF]" />
              </div>
              <div className="flex-1 min-w-0 space-y-0.5">
                <span className="text-[9px] font-mono font-extrabold text-cyan-500 uppercase tracking-wider block truncate">
                  {item.platform}
                </span>
                <input
                  type="text"
                  value={item.handle}
                  onChange={(e) => {
                    const updated = socialHandlesList.map((s) => s.id === item.id ? { ...s, handle: e.target.value } : s);
                    setSocialHandlesList(updated);
                  }}
                  placeholder="@handle or URL"
                  className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none truncate"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSocialHandle(item.id)}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer shrink-0 opacity-80 group-hover:opacity-100"
                title="Remove handle"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Connect New Social Channel Form */}
      <div className="p-5 rounded-3xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white block">
            Add New Social Channel
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Select platform & input handle</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={newSocialPlatform}
            onChange={(e) => setNewSocialPlatform(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-3.5 py-3 text-xs font-extrabold focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all cursor-pointer"
          >
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="twitter">X / Twitter</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="spotify">Spotify</option>
            <option value="applemusic">Apple Music</option>
            <option value="calendly">Calendly</option>
            <option value="github">GitHub</option>
            <option value="behance">Behance</option>
            <option value="dribbble">Dribbble</option>
            <option value="website">Custom Website</option>
          </select>
          <input
            type="text"
            placeholder="@username or profile URL"
            value={newSocialValue}
            onChange={(e) => setNewSocialValue(e.target.value)}
            className="sm:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all"
          />
        </div>
        <button
          type="button"
          onClick={handleAddSocialHandle}
          className="w-full py-3 rounded-2xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20 active:scale-95"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Connect Social Channel</span>
        </button>
      </div>
    </div>
  );
};

export default SocialHandlesManager;


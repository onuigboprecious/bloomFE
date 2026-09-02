import React from 'react';
import { Share2, Trash2, Plus } from 'lucide-react';
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
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Connect New Social Channel Form */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300 block">Connect New Social Platform</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={newSocialPlatform}
            onChange={(e) => setNewSocialPlatform(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
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
            placeholder="@handle or full URL"
            value={newSocialValue}
            onChange={(e) => setNewSocialValue(e.target.value)}
            className="sm:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
          />
        </div>
        <button
          type="button"
          onClick={handleAddSocialHandle}
          className="w-full py-2.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Connect Platform Channel</span>
        </button>
      </div>
    </div>
  );
};

export default SocialHandlesManager;

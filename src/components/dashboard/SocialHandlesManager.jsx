import React, { useState } from 'react';
import { Share2, Trash2, Plus, CheckCircle2, Sparkles, X } from 'lucide-react';
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
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="pt-2 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#1E2A42] pb-3">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#38BDF8]" />
            <span>Social Channels & Identity</span>
          </h4>
        </div>
        <span className="text-[10px] font-mono text-[#38BDF8] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20">
          {socialHandlesList.length} Connected
        </span>
      </div>

      {/* STORY BAR (Instagram-inspired channel bubbles) */}
      <div className="space-y-2">
        <p className="text-[11px] font-semibold text-[#8B98AE]">Connected Story Bar Channels</p>
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 px-1">
          {socialHandlesList.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer">
              {/* 52px Story Ring Bubble */}
              <div className="story-ring-wrap w-[52px] h-[52px] group-hover:scale-105 transition-transform">
                <div className="story-ring-inner">
                  <SocialIcon platform={item.platform} className="w-5 h-5 text-[#F1F5F9]" />
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#F1F5F9] capitalize truncate max-w-[64px] text-center">
                {item.platform}
              </span>
            </div>
          ))}

          {/* Trailing '+' Add Channel Bubble */}
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
          >
            <div className="w-[52px] h-[52px] rounded-full border-2 border-dashed border-[#1E2A42] bg-[#16223A] hover:border-[#38BDF8] flex items-center justify-center transition-all group-hover:scale-105">
              {showAddForm ? <X className="w-5 h-5 text-[#38BDF8]" /> : <Plus className="w-5 h-5 text-[#38BDF8]" />}
            </div>
            <span className="text-[11px] font-semibold text-[#38BDF8]">
              {showAddForm ? 'Close' : 'Add Channel'}
            </span>
          </button>
        </div>
      </div>

      {/* Editable List of Channels */}
      {socialHandlesList.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-[#8B98AE]">Manage Handles & Links</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socialHandlesList.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#10192B] border border-[#1E2A42] hover:border-[#38BDF8]/40 transition-all shadow-xs group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#16223A] text-[#38BDF8] border border-[#1E2A42] shrink-0 flex items-center justify-center">
                  <SocialIcon platform={item.platform} className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <span className="text-[9px] font-mono font-extrabold text-[#38BDF8] uppercase tracking-wider block truncate">
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
                    className="w-full bg-transparent text-xs font-semibold text-[#F1F5F9] focus:outline-none truncate"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSocialHandle(item.id)}
                  className="p-1.5 text-[#8B98AE] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                  title="Remove handle"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Channel Form (Collapsible or Always accessible) */}
      {(showAddForm || socialHandlesList.length === 0) && (
        <div className="p-5 rounded-2xl bg-[#10192B] border border-[#1E2A42] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] block">
              Connect New Channel
            </span>
            <span className="text-[11px] text-[#8B98AE]">Select platform & handle</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={newSocialPlatform}
              onChange={(e) => setNewSocialPlatform(e.target.value)}
              className="bg-[#16223A] border border-[#1E2A42] text-[#F1F5F9] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#38BDF8] cursor-pointer"
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
              className="sm:col-span-2 bg-[#16223A] border border-[#1E2A42] text-[#F1F5F9] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#38BDF8]"
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              handleAddSocialHandle(e);
              setShowAddForm(false);
            }}
            style={{ background: 'var(--grad)' }}
            className="w-full py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Add Channel to Story Bar</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialHandlesManager;



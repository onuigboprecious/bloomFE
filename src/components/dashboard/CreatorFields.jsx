import React from 'react';
import { Music } from 'lucide-react';

export const CreatorFields = ({ featuredTrack, setFeaturedTrack }) => {
  return (
    <div className="p-5 rounded-2xl bg-[#00BCFF]/5 border border-[#00BCFF]/20 space-y-4">
      <h4 className="text-xs font-extrabold uppercase text-[#00BCFF] flex items-center gap-1.5 border-b border-[#00BCFF]/20 pb-2">
        <Music className="w-4 h-4" />
        <span>Featured Music Release & Media Showcase</span>
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Track / Release Title</label>
          <input
            type="text"
            value={featuredTrack.title}
            onChange={(e) => setFeaturedTrack({ ...featuredTrack, title: e.target.value })}
            placeholder="e.g. Midnight Frequency (Single)"
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Artist / Producer Name</label>
          <input
            type="text"
            value={featuredTrack.artist}
            onChange={(e) => setFeaturedTrack({ ...featuredTrack, artist: e.target.value })}
            placeholder="e.g. Enlazer Sounds"
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
          />
        </div>
      </div>
      <div>
        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Cover Image URL</label>
        <input
          type="text"
          value={featuredTrack.cover}
          onChange={(e) => setFeaturedTrack({ ...featuredTrack, cover: e.target.value })}
          placeholder="https://..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
        />
      </div>
    </div>
  );
};

export default CreatorFields;

import React from 'react';
import { Link as LinkIcon, Trash2, Plus, ExternalLink, Sparkles } from 'lucide-react';

export const CustomLinksManager = ({
  customLinks,
  newLinkLabel,
  setNewLinkLabel,
  newLinkUrl,
  setNewLinkUrl,
  handleAddCustomLink,
  handleRemoveCustomLink
}) => {
  return (
    <div className="pt-2 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-[#00BCFF]" />
          <span>Custom Bio Buttons & Action Links</span>
        </h4>
        <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          {customLinks.length} Active Buttons
        </span>
      </div>

      {/* Active Custom Bio Buttons */}
      {customLinks.length === 0 ? (
        <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-950/50 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-[#00BCFF] flex items-center justify-center mx-auto border border-cyan-500/20">
            <LinkIcon className="w-5 h-5" />
          </div>
          <p className="text-xs font-extrabold text-slate-900 dark:text-white">No custom action buttons added yet.</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Add custom portfolio buttons, pitch decks, Calendly booking links, online store URLs, or music streams!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {customLinks.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3 hover:border-cyan-500/40 transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-[#00BCFF] border border-slate-800 shrink-0">
                  <LinkIcon className="w-4 h-4 text-[#00BCFF]" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="text-xs font-black text-slate-900 dark:text-white truncate block flex items-center gap-1.5">
                    {item.label}
                    <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono truncate block opacity-90">{item.url}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCustomLink(item.id)}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer shrink-0 opacity-80 group-hover:opacity-100"
                title="Delete Link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Link Form */}
      <form
        onSubmit={handleAddCustomLink}
        className="p-5 rounded-3xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-3 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white block">
            Create Custom Bio Button
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Add label & full URL</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Button Title (e.g. Download My Portfolio)"
            value={newLinkLabel}
            onChange={(e) => setNewLinkLabel(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all"
          />
          <input
            type="url"
            placeholder="Target URL (https://...)"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20 active:scale-95"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Add Custom Bio Button</span>
        </button>
      </form>
    </div>
  );
};

export default CustomLinksManager;


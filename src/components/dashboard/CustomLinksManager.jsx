import React from 'react';
import { Link, Trash2, Plus } from 'lucide-react';

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
    <div className="pt-2 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
          <Link className="w-4 h-4 text-[#00BCFF]" />
          <span>Custom Bio Link Buttons</span>
        </h4>
        <span className="text-[10px] font-mono text-slate-400">{customLinks.length} Active Links</span>
      </div>

      {/* Active Custom Bio Buttons */}
      {customLinks.length === 0 ? (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-1">
          <Link className="w-5 h-5 text-slate-400 mx-auto opacity-50" />
          <p className="text-xs font-bold text-slate-500">No custom bio links added yet.</p>
          <p className="text-[10px] text-slate-400">Add portfolio buttons, pitch decks, Calendly booking, or store links!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {customLinks.map((item) => (
            <div key={item.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Link className="w-4 h-4 text-[#00BCFF] shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate block">{item.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono truncate block">{item.url}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCustomLink(item.id)}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Link Form */}
      <form onSubmit={handleAddCustomLink} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300 block">Add New Bio Button Link</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Button Label (e.g. Portfolio)"
            value={newLinkLabel}
            onChange={(e) => setNewLinkLabel(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
          />
          <input
            type="url"
            placeholder="URL (https://...)"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-cyan-400" />
          <span>Add Bio Link Button</span>
        </button>
      </form>
    </div>
  );
};

export default CustomLinksManager;

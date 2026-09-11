import React from 'react';
import { Link as LinkIcon, Trash2, Plus, ExternalLink } from 'lucide-react';

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
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-[var(--accent)]" />
          <span>Custom Bio Buttons & Action Links</span>
        </h4>
        <span className="text-[11px] font-mono text-[var(--accent)] font-extrabold uppercase">
          {customLinks.length} Active Buttons
        </span>
      </div>

      {/* Active Custom Bio Buttons */}
      {customLinks.length === 0 ? (
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-dashed border-[var(--border)] text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto border border-[var(--accent)]/20">
            <LinkIcon className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-[var(--text)]">No custom action buttons added yet.</p>
          <p className="text-[11px] text-[var(--text-dim)] max-w-sm mx-auto">
            Add custom portfolio buttons, pitch decks, Calendly booking links, online store URLs, or music streams!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {customLinks.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-between gap-3 hover:border-[var(--accent)]/40 transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-[var(--input-bg)] text-[var(--accent)] border border-[var(--border)] shrink-0">
                  <LinkIcon className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="text-xs font-bold text-[var(--text)] truncate flex items-center gap-1.5">
                    {item.label}
                    <ExternalLink className="w-3 h-3 text-[var(--text-dim)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-[10px] text-[var(--accent)] font-mono truncate block">{item.url}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCustomLink(item.id)}
                className="p-1.5 text-[var(--text-dim)] hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
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
        className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block">
            Create Custom Bio Button
          </span>
          <span className="text-[11px] text-[var(--text-dim)]">Label & Destination URL</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text)]">Button Label</label>
            <input
              type="text"
              placeholder="e.g. Download Pitch Deck"
              value={newLinkLabel}
              onChange={(e) => setNewLinkLabel(e.target.value)}
              className="w-full bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text)]">Target URL</label>
            <input
              type="url"
              placeholder="https://drive.google.com/..."
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              className="w-full bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>

        <button
          type="submit"
          style={{ background: 'var(--grad)' }}
          className="w-full py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Custom Button to Bio</span>
        </button>
      </form>
    </div>
  );
};

export default CustomLinksManager;



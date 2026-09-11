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
      <div className="flex items-center justify-between border-b border-[#1E2A42] pb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-[#38BDF8]" />
          <span>Custom Bio Buttons & Action Links</span>
        </h4>
        <span className="text-[11px] font-mono text-[#38BDF8] font-extrabold uppercase">
          {customLinks.length} Active Buttons
        </span>
      </div>

      {/* Active Custom Bio Buttons */}
      {customLinks.length === 0 ? (
        <div className="p-6 rounded-2xl bg-[#10192B] border border-dashed border-[#1E2A42] text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center mx-auto border border-[#38BDF8]/20">
            <LinkIcon className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-[#F1F5F9]">No custom action buttons added yet.</p>
          <p className="text-[11px] text-[#8B98AE] max-w-sm mx-auto">
            Add custom portfolio buttons, pitch decks, Calendly booking links, online store URLs, or music streams!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {customLinks.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#10192B] border border-[#1E2A42] flex items-center justify-between gap-3 hover:border-[#38BDF8]/40 transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-[#16223A] text-[#38BDF8] border border-[#1E2A42] shrink-0">
                  <LinkIcon className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="text-xs font-bold text-[#F1F5F9] truncate flex items-center gap-1.5">
                    {item.label}
                    <ExternalLink className="w-3 h-3 text-[#8B98AE] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-[10px] text-[#38BDF8] font-mono truncate block">{item.url}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCustomLink(item.id)}
                className="p-1.5 text-[#8B98AE] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
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
        className="p-5 rounded-2xl bg-[#10192B] border border-[#1E2A42] space-y-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F1F5F9] block">
            Create Custom Bio Button
          </span>
          <span className="text-[11px] text-[#8B98AE]">Add label & full URL</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Button Title (e.g. Download My Portfolio)"
            value={newLinkLabel}
            onChange={(e) => setNewLinkLabel(e.target.value)}
            className="bg-[#16223A] border border-[#1E2A42] text-[#F1F5F9] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#38BDF8]"
          />
          <input
            type="url"
            placeholder="Target URL (https://...)"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
            className="bg-[#16223A] border border-[#1E2A42] text-[#F1F5F9] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#38BDF8]"
          />
        </div>
        
        <button
          type="submit"
          style={{ background: 'var(--grad)' }}
          className="w-full py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Custom Bio Button</span>
        </button>
      </form>
    </div>
  );
};

export default CustomLinksManager;



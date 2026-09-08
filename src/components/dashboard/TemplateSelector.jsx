import React, { useState } from 'react';
import { Palette, CheckCircle2, HelpCircle } from 'lucide-react';
import { TEMPLATES } from '../profile/ProfileView';

export const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const [activeTooltipId, setActiveTooltipId] = useState(null);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3.5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#00BCFF]/10 text-[#00BCFF] flex items-center justify-center">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Profile Layout Template</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Select your card's layout style</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id || (
            (tmpl.id === 'corporate-pro' && selectedTemplate === 'classic-stack') ||
            (tmpl.id === 'creator-artist' && selectedTemplate === 'modern-card') ||
            (tmpl.id === 'art-gallery' && selectedTemplate === 'minimalist-glass') ||
            (tmpl.id === 'business-vendor' && selectedTemplate === 'bento-grid')
          );

          const isHoveredTooltip = activeTooltipId === tmpl.id;

          return (
            <div
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl.id)}
              className={`relative text-left p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${isSelected
                  ? 'bg-[#00BCFF]/10 border-[#00BCFF] ring-2 ring-[#00BCFF]/30 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className="px-2 py-0.5 rounded-md bg-[#00BCFF]/15 text-[#00BCFF] text-[9px] font-extrabold uppercase shrink-0">
                  {tmpl.badge}
                </span>
                <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                  {tmpl.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Question Mark Info Icon */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTooltipId(prev => prev === tmpl.id ? null : tmpl.id);
                    }}
                    onMouseEnter={() => setActiveTooltipId(tmpl.id)}
                    onMouseLeave={() => setActiveTooltipId(null)}
                    className="p-1 text-slate-400 hover:text-[#00BCFF] transition-colors cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="View Template Details"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>

                  {/* Info Tooltip Popover */}
                  {isHoveredTooltip && (
                    <div className="absolute right-0 bottom-full mb-2 w-64 p-3 rounded-xl bg-slate-950 text-white text-[11px] font-medium leading-relaxed border border-slate-800 shadow-2xl z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      <div className="font-bold text-cyan-400 mb-1 flex items-center justify-between">
                        <span>{tmpl.name}</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-extrabold">{tmpl.badge}</span>
                      </div>
                      <p className="text-slate-300">{tmpl.desc}</p>
                      <div className="absolute right-3 -bottom-1.5 w-3 h-3 bg-slate-950 border-r border-b border-slate-800 rotate-45" />
                    </div>
                  )}
                </div>

                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;

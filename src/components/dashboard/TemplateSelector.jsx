import React from 'react';
import { Palette, CheckCircle2 } from 'lucide-react';
import { TEMPLATES } from '../profile/ProfileView';

export const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="w-9 h-9 rounded-2xl bg-[#00BCFF]/10 text-[#00BCFF] flex items-center justify-center">
          <Palette className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Profile Layout Template</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Select your specialized audience template for your live card</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id || (
            (tmpl.id === 'corporate-pro' && selectedTemplate === 'classic-stack') ||
            (tmpl.id === 'creator-artist' && selectedTemplate === 'modern-card') ||
            (tmpl.id === 'art-gallery' && selectedTemplate === 'minimalist-glass') ||
            (tmpl.id === 'business-vendor' && selectedTemplate === 'bento-grid')
          );
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => setSelectedTemplate(tmpl.id)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                isSelected
                  ? 'bg-[#00BCFF]/10 border-[#00BCFF] ring-2 ring-[#00BCFF]/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-[#00BCFF]/15 text-[#00BCFF] text-[9px] font-extrabold uppercase">
                  {tmpl.badge}
                </span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00BCFF]" />}
              </div>
              <div className="font-extrabold text-xs text-slate-900 dark:text-white">
                {tmpl.name}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {tmpl.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;

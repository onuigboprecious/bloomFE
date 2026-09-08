import React from 'react';
import { Settings, Moon, Sun, CheckCircle2, ShieldCheck, UserCheck, KeyRound, Sparkles } from 'lucide-react';

export const SettingsStudio = ({
  customHandle,
  setCustomHandle,
  profile,
  darkMode,
  toggleDarkMode,
  handleSaveProfile
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#00BCFF]" />
              <span>Account Security & Studio Settings</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage digital handle username, account credentials, and display themes.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" /> Account Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Public Username Handle Settings */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
              Digital Bio Handle (URL)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#00BCFF] font-black bg-slate-100 dark:bg-slate-800/80 px-3.5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
                enlazer.cloud/@
              </span>
              <input
                type="text"
                value={customHandle}
                onChange={(e) => setCustomHandle(e.target.value.toLowerCase().trim())}
                placeholder="username"
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-[#00BCFF] focus:ring-2 focus:ring-[#00BCFF]/20 transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Your public URL: https://enlazer.cloud/@{customHandle || 'username'}</p>
          </div>

          {/* Email Account */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
              Registered Account Email
            </label>
            <input
              type="email"
              value={profile?.email || ''}
              readOnly
              className="w-full bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 rounded-2xl px-4 py-3 text-xs font-bold cursor-not-allowed"
            />
            <p className="text-[10px] text-slate-400 font-medium">Primary email linked to authentication session.</p>
          </div>
        </div>

        {/* Appearance & Theme Preference */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              {darkMode ? <Moon className="w-4 h-4 text-[#00BCFF]" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>Dashboard Theme Preference</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Toggle interface appearance between dark obsidian mode and pure slate mode.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {/* Dark Mode Card Option */}
            <button
              type="button"
              onClick={() => { if (!darkMode) toggleDarkMode(); }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                darkMode
                  ? 'bg-slate-900 border-[#00BCFF] ring-2 ring-[#00BCFF]/20 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-800 text-[#00BCFF] border border-slate-700">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold block text-white">Dark Obsidian</span>
                  <span className="text-[10px] opacity-75">Sleek dark mode with neon accents.</span>
                </div>
              </div>
              {darkMode && <CheckCircle2 className="w-5 h-5 text-[#00BCFF] shrink-0" />}
            </button>

            {/* Light Mode Card Option */}
            <button
              type="button"
              onClick={() => { if (darkMode) toggleDarkMode(); }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                !darkMode
                  ? 'bg-white border-[#00BCFF] ring-2 ring-[#00BCFF]/20 text-slate-900 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600 border border-amber-200">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold block text-slate-900">Pure Slate Light</span>
                  <span className="text-[10px] opacity-75">Clean light mode canvas environment.</span>
                </div>
              </div>
              {!darkMode && <CheckCircle2 className="w-5 h-5 text-[#00BCFF] shrink-0" />}
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={handleSaveProfile}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95 text-center"
          >
            Save Settings Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsStudio;


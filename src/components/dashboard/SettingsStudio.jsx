import React from 'react';
import { Settings, Moon, Sun, CheckCircle2 } from 'lucide-react';

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
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#00BCFF]" />
            <span>Account & Studio Settings</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage your account security, handle username, and profile preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Public Username Handle Settings */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Enlazer Digital Handle</label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#00BCFF] font-bold bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700">enlazer.app/@</span>
              <input
                type="text"
                value={customHandle}
                onChange={(e) => setCustomHandle(e.target.value.toLowerCase().trim())}
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#00BCFF]"
              />
            </div>
          </div>

          {/* Email Account */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Account Email</label>
            <input
              type="email"
              value={profile?.email || ''}
              readOnly
              className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-xl px-3.5 py-2.5 text-xs font-bold"
            />
          </div>
        </div>

        {/* Appearance & Theme Preference */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              {darkMode ? <Moon className="w-4 h-4 text-[#00BCFF]" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>Appearance & Theme Preference</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Choose your preferred visual theme for the Enlazer Dashboard & Studio.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 max-w-xl">
            {/* Dark Mode Card Option */}
            <button
              type="button"
              onClick={() => { if (!darkMode) toggleDarkMode(); }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                darkMode
                  ? 'bg-slate-900 border-[#00BCFF] ring-2 ring-[#00BCFF]/20 text-white'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold block">Dark Theme</span>
                  <span className="text-[10px] opacity-75">Sleek obsidian UI with neon accents.</span>
                </div>
              </div>
              {darkMode && <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0" />}
            </button>

            {/* Light Mode Card Option */}
            <button
              type="button"
              onClick={() => { if (darkMode) toggleDarkMode(); }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                !darkMode
                  ? 'bg-white border-[#00BCFF] ring-2 ring-[#00BCFF]/20 text-slate-900 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-600 border border-amber-200">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold block">Light Theme</span>
                  <span className="text-[10px] opacity-75">Clean high-contrast light mode layout.</span>
                </div>
              </div>
              {!darkMode && <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0" />}
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={handleSaveProfile}
            className="px-6 py-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-all shadow-md cursor-pointer"
          >
            Save Settings Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsStudio;

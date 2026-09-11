import React, { useState, useEffect } from 'react';
import { Settings, Moon, Sun, CheckCircle2, ShieldCheck, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { checkHandleApi } from '../../api/profile';

export const SettingsStudio = ({
  customHandle,
  setCustomHandle,
  profile,
  darkMode,
  toggleDarkMode,
  handleSaveProfile,
  isSaving
}) => {
  const [handleStatus, setHandleStatus] = useState('idle'); // 'idle' | 'checking' | 'available' | 'taken' | 'invalid'
  const [handleMessage, setHandleMessage] = useState('');

  useEffect(() => {
    const clean = (customHandle || '').toLowerCase().trim();

    if (!clean) {
      setHandleStatus('invalid');
      setHandleMessage('Username handle cannot be empty');
      return;
    }

    if (clean.length < 3) {
      setHandleStatus('invalid');
      setHandleMessage('Username handle must be at least 3 characters');
      return;
    }

    if (!/^[a-z0-9_-]+$/.test(clean)) {
      setHandleStatus('invalid');
      setHandleMessage('Username can only contain lowercase letters, numbers, underscores, and hyphens');
      return;
    }

    // If handle matches user's current handle
    if (profile?.username && clean === profile.username.toLowerCase()) {
      setHandleStatus('available');
      setHandleMessage('This is your current active handle');
      return;
    }

    setHandleStatus('checking');
    setHandleMessage('Checking handle availability...');

    const timer = setTimeout(async () => {
      try {
        const res = await checkHandleApi(clean);
        if (res && res.available) {
          setHandleStatus('available');
          setHandleMessage(`enlazer.cloud/${clean} is available!`);
        } else {
          setHandleStatus('taken');
          setHandleMessage(`@${clean} is already taken by another account`);
        }
      } catch (err) {
        setHandleStatus('idle');
        setHandleMessage('');
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [customHandle, profile?.username]);

  const isFormDisabled = handleStatus === 'taken' || handleStatus === 'invalid' || handleStatus === 'checking';

  return (
    <div className="space-y-6">
      <div className="bg-[var(--card)] p-6 sm:p-7 rounded-2xl border border-[var(--border)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div>
            <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2">
              <Settings className="w-5 h-5 text-[var(--accent)]" />
              <span>Account Security & Studio Settings</span>
            </h3>
            <p className="text-xs text-[var(--text-dim)] mt-0.5">Manage digital bio username handle, email, and display theme.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20 text-[10px] font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" /> Account Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Public Username Handle Settings */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block">
              Digital Bio Handle (URL)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--accent)] font-bold bg-[var(--input-bg)] px-3.5 py-2.5 rounded-xl border border-[var(--border)] shrink-0">
                enlazer.cloud/
              </span>
              <input
                type="text"
                value={customHandle}
                onChange={(e) => setCustomHandle(e.target.value.toLowerCase().trim())}
                placeholder="username"
                className={`flex-1 bg-[var(--input-bg)] border text-[var(--text)] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none transition-colors ${
                  handleStatus === 'taken'
                    ? 'border-rose-500/80 focus:border-rose-500'
                    : handleStatus === 'available'
                    ? 'border-emerald-500/80 focus:border-emerald-500'
                    : 'border-[var(--border)] focus:border-[var(--accent)]'
                }`}
              />
            </div>

            {/* Real-time Status Badge */}
            {handleStatus === 'checking' && (
              <div className="flex items-center gap-1.5 text-[11px] text-cyan-500 font-medium pt-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Checking handle availability...</span>
              </div>
            )}
            {handleStatus === 'available' && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-semibold pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>{handleMessage || `enlazer.cloud/${customHandle} is available!`}</span>
              </div>
            )}
            {handleStatus === 'taken' && (
              <div className="flex items-center gap-1.5 text-[11px] text-rose-500 font-bold pt-1">
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>{handleMessage}</span>
              </div>
            )}
            {handleStatus === 'invalid' && (
              <div className="flex items-center gap-1.5 text-[11px] text-amber-500 font-medium pt-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>{handleMessage}</span>
              </div>
            )}
          </div>

          {/* Email Account */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block">
              Registered Account Email
            </label>
            <input
              type="email"
              value={profile?.email || ''}
              readOnly
              className="w-full bg-[var(--input-bg)]/60 border border-[var(--border)] text-[var(--text-dim)] rounded-xl px-4 py-2.5 text-xs font-semibold cursor-not-allowed"
            />
            <p className="text-[11px] text-[var(--text-dim)]">Primary email linked to authentication session.</p>
          </div>
        </div>

        {/* Appearance & Theme Preference */}
        <div className="space-y-4 pt-4 border-t border-[var(--border)]">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-2">
              {darkMode ? <Moon className="w-4 h-4 text-[var(--accent)]" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>Dashboard Theme Preference</span>
            </h4>
            <p className="text-[11px] text-[var(--text-dim)] mt-0.5">Toggle interface appearance between obsidian dark mode and slate mode.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {/* Dark Mode Card Option */}
            <button
              type="button"
              onClick={() => { if (!darkMode) toggleDarkMode(); }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                darkMode
                  ? 'bg-[var(--input-bg)] border-[var(--accent)] text-[var(--text)]'
                  : 'bg-[var(--card)] border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)]/50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-[var(--bg)] text-[var(--accent)] border border-[var(--border)]">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-[var(--text)]">Dark Obsidian</span>
                  <span className="text-[11px] text-[var(--text-dim)]">Sleek dark mode with neon accents.</span>
                </div>
              </div>
              {darkMode && <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0" />}
            </button>

            {/* Light Mode Card Option */}
            <button
              type="button"
              onClick={() => { if (darkMode) toggleDarkMode(); }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                !darkMode
                  ? 'bg-[var(--input-bg)] border-[var(--accent)] text-[var(--text)]'
                  : 'bg-[var(--card)] border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)]/50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-[var(--text)]">Pure Slate Light</span>
                  <span className="text-[11px] text-[var(--text-dim)]">Clean slate light mode.</span>
                </div>
              </div>
              {!darkMode && <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0" />}
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border)] flex justify-end">
          <button
            onClick={handleSaveProfile}
            disabled={isSaving || isFormDisabled}
            type="button"
            style={{ background: isFormDisabled ? '#94A3B8' : 'var(--grad)' }}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md text-center ${
              isFormDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-95'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Settings Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsStudio;

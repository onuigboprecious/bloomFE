import React, { useState } from 'react';
import { CreditCard, RefreshCw, CheckCircle2, ShieldCheck, Plus, ArrowRight, Rss, Download, Copy, Check, Smartphone } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useApp } from '../../context/AppContext';

export const CardManagementTab = () => {
  const { profile, selectedFinish, saveContactToPhone, generateRawVCardString } = useApp();
  const [activeCardUid, setActiveCardUid] = useState("BLM-9921-NFC");
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [targetName, setTargetName] = useState("");
  const [reassignSuccess, setReassignSuccess] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const handleReassign = (e) => {
    e.preventDefault();
    setReassignSuccess(true);
    setTimeout(() => {
      setReassignSuccess(false);
      setReassignModalOpen(false);
    }, 2000);
  };

  const handleCopyRawPayload = () => {
    const rawVCard = generateRawVCardString();
    navigator.clipboard.writeText(rawVCard);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">NFC Physical Card & Hardware Management</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage assigned NFC cards, configure automatic contact saving on scan, or reassign profiles.
        </p>
      </div>

      {/* Primary Active Physical Card Widget */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-10 rounded-xl bg-cyan-500/20 p-0.5 shadow-md flex items-center justify-center border border-cyan-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Rss className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">Active NFC Card</span>
              <h4 className="text-lg font-black text-white">{selectedFinish.name}</h4>
              <span className="text-xs text-slate-400 font-mono">UID: {activeCardUid}</span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active & Transmitting
          </span>
        </div>

        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Linked Target Profile</span>
            <span className="font-bold text-white block mt-0.5">{profile.name}</span>
          </div>
          <div>
            <span className="text-slate-500 block">NFC Hardware Chip</span>
            <span className="font-bold text-white block mt-0.5">NTAG216 High Speed</span>
          </div>
          <div>
            <span className="text-slate-500 block">Auto-Save Protocol</span>
            <span className="font-bold text-emerald-400 block mt-0.5">Enabled (Google / iOS Contacts)</span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => setReassignModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reassign Card to New Profile</span>
          </button>
        </div>
      </div>

      {/* Auto-Save on Scan Protocol Info */}
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Instant Auto-Save to Google & Phone Contacts
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              When anyone scans your QR code or taps your NFC card, their phone automatically triggers the native Google Contacts / iOS Contacts import prompt!
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => saveContactToPhone()}
            className="w-full py-2.5 px-4 rounded-xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Test Auto-Save Contact Download</span>
          </button>

          <button
            onClick={handleCopyRawPayload}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {copiedPayload ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copiedPayload ? 'Copied Raw vCard Payload!' : 'Copy Hardware vCard Payload'}</span>
          </button>
        </div>
      </div>

      {/* Reassign Card Dialog Form */}
      {reassignModalOpen && (
        <form onSubmit={handleReassign} className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Reassign Card #{activeCardUid}</h4>
          <p className="text-xs text-slate-500">
            Instantly point this physical card to another colleague or executive profile in under 10 seconds.
          </p>

          <Input
            label="Target Recipient Full Name"
            value={targetName}
            onChange={(e) => setTargetName(e.target.value)}
            placeholder="e.g. Amina Bello"
            required
          />

          <div className="flex gap-2">
            <Button type="submit" variant="primary" size="md" className="bg-[#00BCFF] hover:bg-cyan-500 font-bold text-xs cursor-pointer">
              {reassignSuccess ? 'Reassigned Successfully!' : 'Confirm Reassignment'}
            </Button>
            <Button type="button" variant="secondary" size="md" onClick={() => setReassignModalOpen(false)} className="text-xs cursor-pointer">
              Cancel
            </Button>
          </div>
        </form>
      )}

    </div>
  );
};

export default CardManagementTab;

import React from 'react';
import { CreditCard, Check, ShieldCheck, Download, Zap, Sparkles, Star } from 'lucide-react';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { mockPricingTiers } from '../../data/mockData';

export const BillingTab = () => {
  const { isProUser, setIsProUser, profile } = useApp();

  const invoices = [
    { id: "INV-2026-PRO-01", date: "Jul 01, 2026", amount: "₦3,500", status: "Paid", tier: "Bloom Pro Monthly" },
    { id: "INV-2026-CARD-01", date: "Jun 15, 2026", amount: "₦35,000", status: "Paid", tier: "Stealth Black NFC Card" }
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Individual Membership & Plan</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Simple pricing: One physical card purchase + optional Bloom Pro personal features.
        </p>
      </div>

      {/* Current Active Plan Card */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 text-white p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              Active Individual Membership
            </span>
            <h4 className="text-2xl font-black text-white">
              {isProUser ? 'Bloom Pro Creator Tier' : 'Bloom Free Individual Tier'}
            </h4>
            <p className="text-xs text-slate-300">
              Personalized handle: <span className="font-mono text-cyan-300 font-bold">bloom.app/@{profile.username || 'precious'}</span>
            </p>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-extrabold">
            {isProUser ? 'PRO ACTIVE' : 'FREE TIER'}
          </span>
        </div>

        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Subscription Price</span>
            <span className="font-bold text-white block mt-0.5 font-mono">₦3,500 / month</span>
          </div>
          <div>
            <span className="text-slate-400 block">Next Billing Date</span>
            <span className="font-bold text-white block mt-0.5">August 01, 2026</span>
          </div>
          <div>
            <span className="text-slate-400 block">Physical Card Status</span>
            <span className="font-bold text-emerald-400 block mt-0.5">Delivered & Active</span>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsProUser(!isProUser)}
            className="text-xs border-slate-700 text-white hover:bg-slate-800 cursor-pointer"
          >
            {isProUser ? 'Pause Pro Membership' : 'Upgrade to Pro Tier (₦3,500/mo)'}
          </Button>
        </div>
      </div>

      {/* Pro Features Included */}
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400" />
          <span>Included in Bloom Pro Tier</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {mockPricingTiers.proFeatures.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Check className="w-4 h-4 text-cyan-500 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Receipts & Payment History</h4>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {invoices.map((inv) => (
            <div key={inv.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{inv.id}</span>
                <span className="text-slate-500 dark:text-slate-400">{inv.tier} • {inv.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-900 dark:text-white">{inv.amount}</span>
                <button className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingTab;

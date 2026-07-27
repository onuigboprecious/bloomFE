import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, CreditCard, Lock, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';

export const StepReview = ({ onBack, onConfirm }) => {
  const { rentAmount, selectedCard, userProfile } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  const fee = Math.round(rentAmount * 0.0125); // 1.25% processing fee
  const totalAmount = rentAmount + fee;
  const pointsEarned = Math.round(rentAmount * selectedCard.pointsMultiplier);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 1500);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <button
          onClick={onBack}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 2 of 2</span>
      </div>

      <div className="text-center space-y-1">
        <h4 className="text-xl font-extrabold text-slate-900">Review Payment</h4>
        <p className="text-xs text-slate-500">Confirm payment parameters before authorizing</p>
      </div>

      {/* Summary Box */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
        <div className="flex justify-between text-xs text-slate-600">
          <span>Rent Amount to Landlord</span>
          <span className="font-bold text-slate-900 font-mono">£{rentAmount.toLocaleString()}.00</span>
        </div>
        <div className="flex justify-between text-xs text-slate-600">
          <span>Payr Card Processing Fee (1.25%)</span>
          <span className="font-bold text-slate-900 font-mono">£{fee.toLocaleString()}.00</span>
        </div>

        <div className="h-px bg-slate-200" />

        <div className="flex justify-between text-sm text-slate-900">
          <span className="font-extrabold">Total Charged to Card</span>
          <span className="font-black text-cyan-600 font-mono">£{totalAmount.toLocaleString()}.00</span>
        </div>
      </div>

      {/* Rewards Perks Callout */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#00bbf9] text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-cyan-900 block">Rewards Unlocked</span>
            <span className="text-[11px] text-cyan-700 font-medium">
              +{pointsEarned.toLocaleString()} {selectedCard.brand} Points
            </span>
          </div>
        </div>
        <span className="text-xs font-extrabold text-cyan-600 bg-white px-2.5 py-1 rounded-full border border-cyan-200 shadow-2xs">
          +{selectedCard.cashbackRate}% Return
        </span>
      </div>

      {/* Selected Card Details */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white text-xs">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-cyan-400" />
          <span>{selectedCard.brand} ending in **** {selectedCard.last4}</span>
        </div>
        <span className="text-slate-400 font-mono">EXP {selectedCard.exp}</span>
      </div>

      <Button
        variant="primary"
        size="lg"
        disabled={isProcessing}
        onClick={handlePay}
        className="w-full bg-[#00bbf9] hover:bg-cyan-500 font-bold py-3.5 mt-4 text-base"
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Authorizing Fast Transfer...
          </span>
        ) : (
          `Authorize £${totalAmount.toLocaleString()} Payment`
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <Lock className="w-3 h-3 text-emerald-500" />
        <span>Protected by 256-bit Bank Grade SSL Encryption</span>
      </div>
    </div>
  );
};

export default StepReview;

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, Copy, Share2, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';

export const StepSuccess = ({ onClose, txDetails }) => {
  const { userProfile } = useApp();

  useEffect(() => {
    // Launch confetti on success
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const copyReceipt = () => {
    navigator.clipboard.writeText(`PAYR RECEIPT: Ref #${txDetails?.reference || userProfile.paymentRef} - £${txDetails?.amount || userProfile.rentAmount} Status: Captured`);
    alert('Receipt reference copied to clipboard!');
  };

  return (
    <div className="text-center space-y-5 py-2">
      {/* Animated Success Checkmark Icon */}
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border-4 border-emerald-50 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>

      <div className="space-y-1">
        <h4 className="text-2xl font-black text-slate-900">Payment Captured!</h4>
        <p className="text-xs text-slate-500">
          Your rent payment was authorized and sent directly to your landlord.
        </p>
      </div>

      {/* Interactive Receipt Card */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Payment reference</span>
          <span className="font-bold text-slate-900 font-mono">
            {txDetails?.reference || `312`}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Status</span>
          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            Captured
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Amount Transfer</span>
          <span className="font-extrabold text-slate-900 text-sm font-mono">
            £{(txDetails?.amount || userProfile.rentAmount).toLocaleString()}.00
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
          <span className="text-slate-400 font-medium">Date</span>
          <span className="font-semibold text-slate-700">
            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="md"
          onClick={copyReceipt}
          className="flex-1 text-xs border-slate-300 gap-1.5"
        >
          <Copy className="w-3.5 h-3.5" /> Copy Ref
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={onClose}
          className="flex-1 text-xs bg-[#00bbf9] hover:bg-cyan-500 font-bold gap-1.5"
        >
          Done <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default StepSuccess;

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useApp } from '../../context/AppContext';

export const OrderModal = () => {
  const { isOrderModalOpen, setIsOrderModalOpen, cardFinishes, selectedFinish, setSelectedFinish, profile } = useApp();
  const [step, setStep] = useState(1);
  const [shippingName, setShippingName] = useState(profile.name);
  const [engravedText, setEngravedText] = useState(profile.name);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    setIsOrderModalOpen(false);
    setTimeout(() => {
      setStep(1);
    }, 300);
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <Modal isOpen={isOrderModalOpen} onClose={handleClose} maxWidth="max-w-md">
      {step === 1 && (
        <div className="space-y-5">
          <div className="text-center space-y-1">
            <h4 className="text-xl font-extrabold text-slate-900">get cards by bloom.</h4>
            <p className="text-xs text-slate-500">Choose your physical NFC card finish & material</p>
          </div>

          <div className="space-y-2.5">
            {cardFinishes.map((finish) => {
              const isSelected = selectedFinish.id === finish.id;
              return (
                <div
                  key={finish.id}
                  onClick={() => setSelectedFinish(finish)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-50/40 shadow-sm ring-1 ring-cyan-500/50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 rounded-md bg-slate-900 overflow-hidden">
                      <img src={finish.image} alt={finish.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-tight">
                        {finish.name}
                      </span>
                      <span className="text-[11px] text-slate-500">{finish.material}</span>
                    </div>
                  </div>

                  <span className="text-sm font-extrabold text-slate-900 font-mono">
                    ₦{finish.price.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full bg-[#00BCFF] hover:bg-cyan-500 font-bold mt-4 cursor-pointer"
            onClick={() => setStep(2)}
          >
            Continue to Customization
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 2 of 2</span>
          </div>

          <div className="text-center space-y-1">
            <h4 className="text-xl font-extrabold text-slate-900">Custom Engraving</h4>
            <p className="text-xs text-slate-500">Laser-engraved onto your {selectedFinish.name}</p>
          </div>

          <Input
            label="Name to Engrave on Card"
            value={engravedText}
            onChange={(e) => setEngravedText(e.target.value)}
            placeholder="e.g. Precious Onuigbo"
          />

          <Input
            label="Shipping Recipient Name"
            value={shippingName}
            onChange={(e) => setShippingName(e.target.value)}
            placeholder="Full Name"
          />

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>{selectedFinish.name}</span>
              <span className="font-bold text-slate-900 font-mono">₦{selectedFinish.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Custom Laser Engraving</span>
              <span className="font-bold text-emerald-600 font-mono">FREE</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Express Tracked Delivery (Nigeria)</span>
              <span className="font-bold text-emerald-600 font-mono">FREE</span>
            </div>
            <div className="h-px bg-slate-200" />
            <div className="flex justify-between text-sm text-slate-900 font-extrabold">
              <span>Total</span>
              <span className="text-cyan-600 font-mono">₦{selectedFinish.price.toLocaleString()}</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            disabled={isProcessing}
            onClick={handleCompleteOrder}
            className="w-full bg-[#00BCFF] hover:bg-cyan-500 font-bold py-3.5 text-base cursor-pointer"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing NFC Card Order...
              </span>
            ) : (
              `Complete Order (₦${selectedFinish.price.toLocaleString()})`
            )}
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center space-y-5 py-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border-4 border-emerald-50 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl font-black text-slate-900">Bloom Card Ordered!</h4>
            <p className="text-xs text-slate-500">
              Your custom {selectedFinish.name} is now being precision laser-engraved.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Order Number</span>
              <span className="font-bold text-slate-900 font-mono">#BLM-9824</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Engraving</span>
              <span className="font-bold text-slate-900">{engravedText}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Estimated Delivery</span>
              <span className="font-bold text-emerald-600">2-3 Business Days</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleClose}
            className="w-full bg-[#00BCFF] hover:bg-cyan-500 font-bold cursor-pointer"
          >
            Back to Dashboard
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default OrderModal;

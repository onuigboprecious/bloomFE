import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ShieldCheck, Lock, ArrowRight, CreditCard, Sparkles } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useApp } from '../../context/AppContext';

export const OrderModal = () => {
  const { isOrderModalOpen, setIsOrderModalOpen, selectedFinish, profile = {}, isAuthenticated, setCurrentPage } = useApp();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [shippingName, setShippingName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [engravedText, setEngravedText] = useState(profile.name || '');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Lagos');

  useEffect(() => {
    if (profile.email) setEmail(profile.email);
    if (profile.name) {
      setShippingName(profile.name);
      setEngravedText(profile.name);
    }
    if (profile.phone) setPhone(profile.phone);
  }, [profile.email, profile.name, profile.phone]);

  const quantity = selectedFinish?.quantity || 1;
  const unitPrice = selectedFinish?.price || 40000;
  const itemTotal = unitPrice * quantity;
  const shippingFee = city.includes('Abuja') ? 0 : 5000;
  const totalPrice = itemTotal + shippingFee;

  const handleClose = () => {
    setIsOrderModalOpen(false);
    setTimeout(() => {
      setIsCompleted(false);
      setIsProcessing(false);
    }, 300);
  };

  const handleCheckoutSubmit = async (e) => {
    e?.preventDefault();

    if (!shippingName?.trim() || !phone?.trim() || !email?.trim() || !deliveryAddress?.trim() || !city) {
      return;
    }

    setIsProcessing(true);

    const transactionRef = 'ENL_' + Math.floor(Math.random() * 1000000000 + 1);

    // Non-blocking async backend notification
    const notifyBackend = async () => {
      try {
        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        await fetch(`${backendUrl}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            finishId: selectedFinish?.id || 'nfc-product',
            finishName: selectedFinish?.name || 'Smart NFC Item',
            quantity: quantity,
            amount: totalPrice,
            shippingName: shippingName,
            phone: phone,
            email: email,
            deliveryAddress: deliveryAddress,
            city: city,
            paymentRef: transactionRef
          })
        });
      } catch (err) {
        console.warn('Backend order recording notice:', err);
      }
    };

    // Load Paystack Inline SDK
    const loadPaystackScript = () => {
      return new Promise((resolve) => {
        if (window.PaystackPop) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const scriptLoaded = await loadPaystackScript();

    if (scriptLoaded && window.PaystackPop) {
      try {
        const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_35696820fac838fa5b578d369a132e86126248bb';

        const handler = window.PaystackPop.setup({
          key: paystackPublicKey,
          email: email,
          amount: totalPrice * 100, // Amount in kobo
          currency: 'NGN',
          ref: transactionRef,
          onClose: () => {
            setIsProcessing(false);
          },
          callback: (response) => {
            setIsProcessing(false);
            setIsCompleted(true);
            notifyBackend();
          }
        });
        handler.openIframe();
      } catch (err) {
        console.error('Paystack iframe open error:', err);
        setIsProcessing(false);
      }
    } else {
      console.warn('Paystack SDK script failed to load.');
      setIsProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOrderModalOpen} onClose={handleClose} maxWidth="max-w-xl">
      {!isCompleted ? (
        <form onSubmit={handleCheckoutSubmit} className="p-5 sm:p-6 space-y-3.5">

          {/* Header */}
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 pr-8">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Order {selectedFinish?.name || 'Smart NFC Card'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              Complete your delivery details. Guest checkout available.
            </p>
          </div>

          {/* Section: Personal & Shipping Information */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Delivery & Contact Details
              </h4>
              <span className="text-[10px] font-bold text-rose-500">* All fields compulsory</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Input
                label="Full Name"
                required
                value={shippingName}
                onChange={(e) => setShippingName(e.target.value)}
                placeholder="Recipient Full Name"
              />
              <Input
                label="Phone Number"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="sm:col-span-2">
                <Input
                  label="Delivery Address"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Street Address, Suite / Flat"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  State / City <span className="text-rose-500 font-bold">*</span>
                </label>
                <select
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 cursor-pointer font-medium"
                >
                  <option value="" disabled>Select State</option>
                  {[
                    'Lagos',
                    'Abuja (FCT)',
                    'Rivers (Port Harcourt)',
                    'Enugu'
                  ].map((st) => (
                    <option key={st} value={st} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-slate-200">
                {selectedFinish?.name} ({quantity}x)
              </span>
              <span className="font-bold font-mono text-slate-900 dark:text-white text-sm">
                ₦{itemTotal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{city.includes('Abuja') ? 'Express Delivery (Abuja)' : 'Delivery (5 Business Days)'}</span>
              {shippingFee === 0 ? (
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">FREE</span>
              ) : (
                <span className="font-bold text-slate-900 dark:text-white font-mono">₦{shippingFee.toLocaleString()}</span>
              )}
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-800 my-0.5" />

            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Total Payable</span>
              <span className="text-lg sm:text-xl font-black text-cyan-600 dark:text-[#00BCFF] font-mono">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 px-5 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-black text-sm sm:text-base shadow-md shadow-cyan-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all disabled:opacity-80"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Order...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Pay ₦{totalPrice.toLocaleString()} with Paystack</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </span>
            )}
          </button>

        </form>
      ) : (
        /* Order Confirmed Success State */
        <div className="p-7 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border-4 border-emerald-50 dark:border-emerald-900/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">Order Confirmed!</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              Your custom {selectedFinish?.name} order has been placed. Please check your email address (<strong className="text-slate-900 dark:text-white">{email}</strong>) for your official receipt and order summary.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 text-left space-y-2.5">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Order Reference</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">#ENL-84920</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Recipient Name</span>
              <span className="font-bold text-slate-900 dark:text-white">{shippingName}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Email Receipt</span>
              <span className="font-bold text-[#00BCFF]">{email}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Delivery Location</span>
              <span className="font-bold text-slate-900 dark:text-white">{city}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Delivery Status</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {city.includes('Abuja') ? 'Express Delivery (24-48 Hours)' : 'Standard Delivery (5 Business Days)'}
              </span>
            </div>
          </div>

          {/* Optional Post-Purchase Account Creation Callout */}
          {!isAuthenticated && (
            <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800/40 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
                <Sparkles className="w-4 h-4 text-[#00BCFF] shrink-0" />
                <span>Save info for live card tracking & profile management?</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Create a password to access your Enlazer profile dashboard anytime.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  setCurrentPage('signup');
                }}
                className="w-full mt-1.5 py-2.5 px-4 bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer text-center block shadow-sm"
              >
                Create Account with {email}
              </button>
            </div>
          )}

          <Button
            variant="primary"
            size="lg"
            onClick={handleClose}
            className="w-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-black cursor-pointer py-3.5"
          >
            Close & Return to Page
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default OrderModal;

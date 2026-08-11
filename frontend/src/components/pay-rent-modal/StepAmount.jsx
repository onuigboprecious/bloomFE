import React, { useState } from 'react';
import { CreditCard, Home, Check } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useApp } from '../../context/AppContext';

export const StepAmount = ({ onNext }) => {
  const { rentAmount, setRentAmount, cards, selectedCard, setSelectedCard, userProfile } = useApp();
  const [landlordRef, setLandlordRef] = useState(userProfile.landlordName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rentAmount || rentAmount <= 0) return;
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1 text-center mb-4">
        <h4 className="text-xl font-extrabold text-slate-900">Pay Monthly Rent</h4>
        <p className="text-xs text-slate-500">Enter payment details & select your preferred card</p>
      </div>

      {/* Rent Amount Input */}
      <Input
        label="Monthly Rent Amount (£)"
        type="number"
        prefix="£"
        value={rentAmount}
        onChange={(e) => setRentAmount(Number(e.target.value))}
        placeholder="2000"
      />

      {/* Landlord Name */}
      <Input
        label="Landlord / Property Reference"
        type="text"
        value={landlordRef}
        onChange={(e) => setLandlordRef(e.target.value)}
        placeholder="Mayfair Luxury Properties Ltd"
      />

      {/* Select Payment Card */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Select Payment Card
        </label>
        <div className="space-y-2">
          {cards.map((card) => {
            const isSelected = selectedCard.id === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50/40 shadow-sm ring-1 ring-cyan-500/50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-extrabold">
                    {card.brand}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      {card.brand} ending in {card.last4}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Earns {card.cashbackRate}% cashback / {card.pointsMultiplier}x points
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-cyan-500 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full bg-[#00bbf9] hover:bg-cyan-500 font-bold mt-6"
      >
        Continue to Review
      </Button>
    </form>
  );
};

export default StepAmount;

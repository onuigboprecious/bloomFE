import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Award, Plane, DollarSign, Sparkles } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';

export const RewardsCalculator = () => {
  const { setIsPayModalOpen } = useApp();
  const [calcRent, setCalcRent] = useState(2000);
  const [selectedRewardType, setSelectedRewardType] = useState('points'); // points | miles | cashback

  const annualRent = calcRent * 12;
  const annualPoints = Math.round(annualRent * 1.5);
  const annualMiles = Math.round(annualRent * 1.2);
  const annualCashback = Math.round(annualRent * 0.015);

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden my-16 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Calculate your annual rent rewards
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            See how many credit card points, BA Avios airline miles, or direct cash back you can unlock every year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-950/60 p-6 sm:p-8 rounded-3xl border border-slate-800 backdrop-blur-xl">
          
          {/* Controls Side */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Monthly Rent Amount
                </label>
                <span className="text-2xl font-black text-cyan-400 font-mono">
                  £{calcRent.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="6000"
                step="100"
                value={calcRent}
                onChange={(e) => setCalcRent(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>£500/mo</span>
                <span>£3,000/mo</span>
                <span>£6,000/mo</span>
              </div>
            </div>

            {/* Reward Type Selectors */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Reward Category
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedRewardType('points')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                    selectedRewardType === 'points'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Award className="w-5 h-5" />
                  <span>Card Points</span>
                </button>
                <button
                  onClick={() => setSelectedRewardType('miles')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                    selectedRewardType === 'miles'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Plane className="w-5 h-5" />
                  <span>Airline Miles</span>
                </button>
                <button
                  onClick={() => setSelectedRewardType('cashback')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                    selectedRewardType === 'cashback'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <DollarSign className="w-5 h-5" />
                  <span>Cash Back</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="md:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
              Estimated Yearly Benefit
            </span>

            {selectedRewardType === 'points' && (
              <motion.div key="pts" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <span className="text-4xl sm:text-5xl font-black text-cyan-400 tracking-tight block">
                  {annualPoints.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-300 mt-1 block">Reward Points / Year</span>
                <p className="text-[11px] text-slate-500 mt-2">
                  Equivalent to 2x transatlantic flight upgrades or hotel stays.
                </p>
              </motion.div>
            )}

            {selectedRewardType === 'miles' && (
              <motion.div key="miles" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <span className="text-4xl sm:text-5xl font-black text-cyan-400 tracking-tight block">
                  {annualMiles.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-300 mt-1 block">Avios / Flying Club Miles</span>
                <p className="text-[11px] text-slate-500 mt-2">
                  Enough for round-trip European business class flights.
                </p>
              </motion.div>
            )}

            {selectedRewardType === 'cashback' && (
              <motion.div key="cash" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight block">
                  £{annualCashback.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-300 mt-1 block">Annual Cash Back</span>
                <p className="text-[11px] text-slate-500 mt-2">
                  Direct cash returned to your credit card statement balance.
                </p>
              </motion.div>
            )}

            <Button
              variant="primary"
              size="md"
              className="w-full bg-[#00bbf9] hover:bg-cyan-400 text-white font-bold py-3 mt-4"
              onClick={() => setIsPayModalOpen(true)}
            >
              Start Earning Now
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RewardsCalculator;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Watch, Droplet, Zap, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Rss, Activity, Award, UserCheck, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import OrderModal from '../order-modal/OrderModal';
import InteractiveWristband3D from '../features/InteractiveWristband3D';
import WristbandShowcaseSection from '../features/WristbandShowcaseSection';

export const NfcWristbandsPage = () => {
  const { cardFinishes, setSelectedFinish, setIsOrderModalOpen, setCurrentPage } = useApp();

  const wristbandProduct = cardFinishes.find((f) => f.category === 'wristband') || {
    id: "finish-5",
    name: "Enlazer Active NFC Wristband",
    tagline: "Waterproof IP68 Silicon • Double-Tap NTAG216",
    price: "₦25,000",
    rating: "4.95",
    reviews: "1,240+",
    stock: "In Stock - Ships Nationwide in 24h",
    description: "Engineered for active professionals, founders, athletes, and event leaders. Never lose a contact opportunity during fitness sessions, marathon summits, or VIP poolsides. Water-resistant, sweatproof, and equipped with ultra-fast NTAG216 chip logic.",
    features: [
      "IP68 100% Waterproof & Sweatproof Premium Silicon",
      "Instant 2-Way Contact Transfer (No App Required)",
      "Universal Tap Compatibility (All iOS & Android Devices)",
      "High-Density NTAG216 Chip with Lifetime Guarantee",
      "Laser-Engraved Enlazer Brand Certificate",
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 px-3.5 py-2 rounded-full transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="w-4 h-4 text-[#00BCFF]" />
            <span>Official Enlazer Hardware Store</span>
          </div>
        </div>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive 3D/Image Preview */}
          <div className="lg:col-span-7 space-y-4">
            <InteractiveWristband3D />
            
            <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/40 text-xs text-cyan-800 dark:text-cyan-300 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00BCFF] shrink-0" />
              <span>
                <strong>Dual-Device Strategy:</strong> Pair your Enlazer Card for formal meetings & your NFC Wristband for workout or VIP event networking.
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NfcWristbandsPage;

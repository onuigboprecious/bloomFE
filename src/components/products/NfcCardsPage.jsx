import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import CardShowcaseSection from '../features/CardShowcaseSection';

export const NfcCardsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <Navbar />

      {/* NFC Cards Showcase Section */}
      <CardShowcaseSection />
      <Footer />
    </div>
  );
};

export default NfcCardsPage;

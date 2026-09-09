import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Cards from './Cards';
import OrderModal from '../order-modal/OrderModal';
import SEO from '../common/SEO';

export const NfcCardsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <SEO
        title="Smart NFC Business Cards Nigeria — Enlazer"
        description="Order premium laser-engraved Smart NFC Business Cards in Nigeria. Instant delivery to Lagos, Abuja, Port Harcourt, and Enugu."
        url="https://enlazer.cloud/cards"
      />
      <Navbar />
      <Cards />
      <Footer />
      <OrderModal />
    </div>
  );
};


export default NfcCardsPage;

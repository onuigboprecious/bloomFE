import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Cards from './Cards';
import OrderModal from '../order-modal/OrderModal';

export const NfcCardsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <Navbar />
      <Cards />
      <Footer />
      <OrderModal />
    </div>
  );
};

export default NfcCardsPage;

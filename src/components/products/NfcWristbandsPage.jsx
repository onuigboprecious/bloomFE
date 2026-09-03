import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Bands from './Bands';
import OrderModal from '../order-modal/OrderModal';

export const NfcWristbandsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <Navbar />
      <Bands />
      <Footer />
      <OrderModal />
    </div>
  );
};

export default NfcWristbandsPage;

import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Bands from './Bands';
import OrderModal from '../order-modal/OrderModal';
import SEO from '../common/SEO';

export const NfcWristbandsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <SEO
        title="IP68 Waterproof NFC Wristbands Nigeria — Enlazer"
        description="Get IP68 waterproof NFC silicone wristbands in Nigeria. Share your WhatsApp & profile hands-free in Lagos, Abuja, Port Harcourt, and Enugu."
        url="https://enlazer.cloud/wristbands"
      />
      <Navbar />
      <Bands />
      <Footer />
      <OrderModal />
    </div>
  );
};


export default NfcWristbandsPage;

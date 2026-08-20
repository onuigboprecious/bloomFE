import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import NfcProcessSteps from './components/features/NfcProcessSteps';
import WristbandShowcaseSection from './components/features/WristbandShowcaseSection';
import Testimonials from './components/features/Testimonials';
import FaqSection from './components/faq/FaqSection';
import Footer from './components/layout/Footer';
import OrderModal from './components/order-modal/OrderModal';
import WaitlistModal from './components/ui/WaitlistModal';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import DashboardPage from './components/dashboard/DashboardPage';
import CardBuilderPage from './components/builder/CardBuilderPage';
import NfcCardsPage from './components/products/NfcCardsPage';
import NfcWristbandsPage from './components/products/NfcWristbandsPage';

export const AppContent = () => {
  const { currentPage, isWaitlistModalOpen, closeWaitlistModal } = useApp();

  if (currentPage === 'login') {
    return <LoginPage />;
  }

  if (currentPage === 'signup') {
    return <SignUpPage />;
  }

  if (currentPage === 'dashboard') {
    return <DashboardPage />;
  }

  if (currentPage === 'customizer') {
    return <CardBuilderPage />;
  }

  if (currentPage === 'cards') {
    return <NfcCardsPage />;
  }

  if (currentPage === 'wristbands') {
    return <NfcWristbandsPage />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <WristbandShowcaseSection />
        <NfcProcessSteps />
        <Testimonials />
        <FaqSection />
      </main>
      <Footer />
      <OrderModal />
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={closeWaitlistModal} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

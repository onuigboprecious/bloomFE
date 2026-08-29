import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import NfcProcessSteps from './components/features/NfcProcessSteps';
import Testimonials from './components/features/Testimonials';
import FaqSection from './components/faq/FaqSection';
import Footer from './components/layout/Footer';
import OrderModal from './components/order-modal/OrderModal';
import WaitlistModal from './components/ui/WaitlistModal';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import OnboardingSetupPage from './pages/OnboardingSetupPage';
import NfcCardsPage from './components/products/NfcCardsPage';
import NfcWristbandsPage from './components/products/NfcWristbandsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AboutUsPage from './pages/AboutUsPage';
import PressMediaPage from './pages/PressMediaPage';
import ContactSupportPage from './pages/ContactSupportPage';
import LegalPage from './pages/LegalPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SecurityPage from './pages/SecurityPage';
import ReturnsGuaranteePage from './pages/ReturnsGuaranteePage';
import ClaimCardPage from './pages/ClaimCardPage';
import InvalidCardPage from './pages/InvalidCardPage';
import CardTapHandler from './pages/CardTapHandler';

export const AppContent = () => {
  const { currentPage, setCurrentPage, isWaitlistModalOpen, closeWaitlistModal } = useApp();

  useEffect(() => {
    // Detect URL paths & search parameters for direct NFC taps, claims, or invalid card alerts
    const pathname = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    if (pathname.startsWith('/card/') || params.get('cardTap')) {
      setCurrentPage('card-tap');
    } else if (pathname === '/claim' || params.get('claimCard')) {
      setCurrentPage('claim-card');
    } else if (pathname === '/dashboard') {
      setCurrentPage('dashboard');
    } else if (pathname === '/onboarding' || pathname === '/setup-profile') {
      setCurrentPage('onboarding');
    } else if (pathname === '/invalid-card' || params.get('invalidCard')) {
      setCurrentPage('invalid-card');
    } else if (params.get('token')) {
      setCurrentPage('reset-password');
    }
  }, [setCurrentPage]);

  if (currentPage === 'card-tap') {
    return <CardTapHandler />;
  }

  if (currentPage === 'claim-card') {
    return <ClaimCardPage />;
  }

  if (currentPage === 'onboarding') {
    return <OnboardingSetupPage />;
  }

  if (currentPage === 'invalid-card') {
    return <InvalidCardPage />;
  }

  if (currentPage === 'login') {
    return <LoginPage />;
  }

  if (currentPage === 'signup') {
    return <SignUpPage />;
  }

  if (currentPage === 'forgot-password') {
    return <ForgotPasswordPage />;
  }

  if (currentPage === 'reset-password') {
    return <ResetPasswordPage />;
  }

  if (currentPage === 'dashboard') {
    return <DashboardPage />;
  }

  // if (currentPage === 'customizer') {
  //   return <CardBuilderPage />;
  // }

  if (currentPage === 'cards') {
    return <NfcCardsPage />;
  }

  if (currentPage === 'wristbands') {
    return <NfcWristbandsPage />;
  }

  if (currentPage === 'about') {
    return <AboutUsPage />;
  }

  if (currentPage === 'press') {
    return <PressMediaPage />;
  }

  if (currentPage === 'support') {
    return <ContactSupportPage />;
  }

  if (currentPage === 'legal') {
    return <LegalPage />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicyPage />;
  }

  if (currentPage === 'terms') {
    return <TermsOfServicePage />;
  }

  if (currentPage === 'security') {
    return <SecurityPage />;
  }

  if (currentPage === 'returns') {
    return <ReturnsGuaranteePage />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
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

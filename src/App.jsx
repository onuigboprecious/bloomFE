import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { isAppDomain, isMarketingDomain, getMarketingDomainUrl, getAppDomainUrl } from './config/domainConfig';

import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import HeroShowcase from './components/hero/HeroShowcase';
import Testimonials from './components/hero/Testimonials';
import FaqSection from './components/faq/FaqSection';
import Footer from './components/layout/Footer';
import OrderModal from './components/order-modal/OrderModal';
import WaitlistModal from './components/ui/WaitlistModal';

import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import DashboardPage from './pages/DashboardPage';
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

// Home Page Layout Component (enlazer.com.ng)
export const HomePage = () => {
  const { isWaitlistModalOpen, closeWaitlistModal } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <HeroShowcase />
        <Testimonials />
        <FaqSection />
      </main>
      <Footer />
      <OrderModal />
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={closeWaitlistModal} />
    </div>
  );
};

// Route & App Context Synchronization Bridge (Multi-domain Aware)
const RouteSyncBridge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPage, setCurrentPage } = useApp();
  const isFirstRender = React.useRef(true);
  const prevPageRef = React.useRef(currentPage);

  // Page name to URL path map
  const pageToPath = {
    home: '/',
    login: '/login',
    signup: '/signup',
    dashboard: '/dashboard',
    profile: '/profile',
    'card-tap': '/profile',
    onboarding: '/dashboard',
    'claim-card': '/claim',
    'invalid-card': '/invalid-card',
    'reset-password': '/reset-password',
    'forgot-password': '/forgot-password',
    cards: '/cards',
    wristbands: '/wristbands',
    about: '/about',
    press: '/press',
    support: '/support',
    legal: '/legal',
    privacy: '/privacy',
    terms: '/terms',
    security: '/security',
    returns: '/returns'
  };

  const pathToPage = {
    '/': 'home',
    '/login': 'login',
    '/signup': 'signup',
    '/dashboard': 'dashboard',
    '/profile': 'card-tap',
    '/onboarding': 'dashboard',
    '/claim': 'claim-card',
    '/invalid-card': 'invalid-card',
    '/reset-password': 'reset-password',
    '/forgot-password': 'forgot-password',
    '/cards': 'cards',
    '/wristbands': 'wristbands',
    '/about': 'about',
    '/press': 'press',
    '/support': 'support',
    '/legal': 'legal',
    '/privacy': 'privacy',
    '/terms': 'terms',
    '/security': 'security',
    '/returns': 'returns'
  };

  // 1. Sync URL -> App Context state on route change / initial load
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.startsWith('/card/') || pathname.startsWith('/@')) {
      setCurrentPage('card-tap');
    } else {
      const page = pathToPage[pathname.toLowerCase()];
      if (page && page !== currentPage) {
        setCurrentPage(page);
      }
    }
  }, [location.pathname, setCurrentPage, currentPage]);

  // 2. Sync App Context state -> URL (and cross-domain navigation if required in production)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPageRef.current = currentPage;
      return;
    }

    if (prevPageRef.current !== currentPage) {
      prevPageRef.current = currentPage;
      const targetPath = pageToPath[currentPage] || '/';
      const isDev = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.endsWith('.local')
      );

      // Perform cross-domain redirects in production environments
      if (!isDev) {
        const appPages = ['dashboard', 'profile', 'card-tap', 'claim-card'];
        const isTargetAppPage = appPages.includes(currentPage);
        const currentlyOnAppDomain = isAppDomain();

        if (isTargetAppPage && !currentlyOnAppDomain) {
          window.location.href = getAppDomainUrl(targetPath);
          return;
        }

        if (!isTargetAppPage && currentlyOnAppDomain) {
          window.location.href = getMarketingDomainUrl(targetPath);
          return;
        }
      }

      if (targetPath && location.pathname !== targetPath) {
        navigate(targetPath);
      }
    }
  }, [currentPage, location.pathname, navigate]);

  return null;
};

export const AppRoutes = () => {
  const isApp = isAppDomain();

  return (
    <>
      <RouteSyncBridge />
      <Routes>
        {/* 1. Home / Root Route */}
        {/* On enlazer.app domain root (/), redirect to /dashboard. On enlazer.com.ng, render HomePage */}
        <Route path="/" element={isApp ? <Navigate to="/dashboard" replace /> : <HomePage />} />

        {/* 2. Dashboard Route (enlazer.app/dashboard) */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* 3. Profile & NFC Card Tap Views (enlazer.app/profile, enlazer.app/@username, enlazer.app/card/:cardUid) */}
        <Route path="/profile" element={<CardTapHandler />} />
        <Route path="/@:username" element={<CardTapHandler />} />
        <Route path="/card/:cardUid" element={<CardTapHandler />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/claim" element={<ClaimCardPage />} />
        <Route path="/invalid-card" element={<InvalidCardPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Marketing Pages (enlazer.com.ng) */}
        <Route path="/cards" element={<NfcCardsPage />} />
        <Route path="/wristbands" element={<NfcWristbandsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/press" element={<PressMediaPage />} />
        <Route path="/support" element={<ContactSupportPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/returns" element={<ReturnsGuaranteePage />} />

        {/* Fallback route */}
        <Route path="*" element={isApp ? <CardTapHandler /> : <HomePage />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

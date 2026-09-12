import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { isAppDomain, isMarketingDomain, getMarketingDomainUrl, getAppDomainUrl } from './config/domainConfig';

import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import ConnectionBanner from './components/hero/ConnectionBanner';
import HeroShowcase from './components/hero/HeroShowcase';
import Testimonials from './components/hero/Testimonials';
import PricingSection from './components/hero/PricingSection';
import FaqSection from './components/faq/FaqSection';
import Footer from './components/layout/Footer';
import OrderModal from './components/order-modal/OrderModal';
import PublishModal from './components/order-modal/PublishModal';
import StickyCtaBar from './components/layout/StickyCtaBar';
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

import SEO from './components/common/SEO';
import GoogleOAuthDisclosure from './components/hero/GoogleOAuthDisclosure';

// Home Page Layout Component (enlazer.cloud & enlazer.com.ng)
export const HomePage = () => {
  const { isWaitlistModalOpen, closeWaitlistModal, isPublishModalOpen, setIsPublishModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors overflow-x-hidden relative pb-16">
      <SEO
        title="Enlazer — #1 NFC Smart Cards & Digital Business Cards in Nigeria, FCT Abuja & Africa"
        description="Create your free Enlazer profile and share your WhatsApp, socials, and portfolio with one NFC card tap."
        url="https://enlazer.cloud/"
      />
      <Navbar />
      <main>
        <HeroSection />
        <ConnectionBanner />
        <HeroShowcase />
        <GoogleOAuthDisclosure />
        <PricingSection />
        <Testimonials />
        <FaqSection />
      </main>
      <Footer />
      <OrderModal />
      <PublishModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} />
      <StickyCtaBar />
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
    const isReserved = Object.keys(pathToPage).includes(pathname.toLowerCase());
    if (pathname.startsWith('/card/') || pathname.startsWith('/@') || pathname.startsWith('/profile/') || (!isReserved && pathname !== '/')) {
      setCurrentPage('card-tap');
    } else {
      const page = pathToPage[pathname.toLowerCase()];
      if (page && page !== currentPage) {
        setCurrentPage(page);
      }
    }
  }, [location.pathname, setCurrentPage, currentPage]);

  // 2. Sync App Context state -> URL
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPageRef.current = currentPage;
      return;
    }

    if (prevPageRef.current !== currentPage) {
      prevPageRef.current = currentPage;
      let targetPath = pageToPath[currentPage] || '/';
      
      // Preserve dynamic profile/card-tap paths (/@username, /card/:uid, /profile/:username, /username)
      if (currentPage === 'card-tap' || currentPage === 'profile') {
        targetPath = location.pathname;
      }

      if (targetPath && location.pathname !== targetPath) {
        navigate(targetPath);
      }
    }
  }, [currentPage, location.pathname, navigate]);

  return null;
};

// Guard for protected routes requiring authentication
const RequireAuth = ({ children }) => {
  const { isAuthenticated, authLoading } = useApp();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex items-center justify-center p-4 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 border-4 border-[#00BCFF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Guard to redirect authenticated users away from auth pages (/login, /signup) to /dashboard
const RedirectIfAuth = ({ children }) => {
  const { isAuthenticated, authLoading } = useApp();

  if (authLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  const isApp = isAppDomain();
  const { isAuthenticated, authLoading } = useApp();

  return (
    <>
      <RouteSyncBridge />
      <Routes>
        {/* 1. Home / Root Route */}
        {/* On enlazer.cloud / www.enlazer.cloud app domain, redirect authenticated to /dashboard, unauthenticated to /login */}
        {/* On enlazer.com.ng marketing domain, render HomePage */}
        <Route
          path="/"
          element={
            isApp ? (
              authLoading ? (
                <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex items-center justify-center p-4 text-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 border-4 border-[#00BCFF] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Verifying session...</p>
                  </div>
                </div>
              ) : isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <HomePage />
            )
          }
        />

        {/* 2. Dashboard Route (enlazer.cloud/dashboard) */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />

        {/* 3. Profile & NFC Card Tap Views (enlazer.cloud/profile, enlazer.cloud/@username, enlazer.cloud/profile/:username, enlazer.cloud/card/:cardUid) */}
        <Route path="/profile" element={<CardTapHandler />} />
        <Route path="/profile/:username" element={<CardTapHandler />} />
        <Route path="/@:username" element={<CardTapHandler />} />
        <Route path="/card/:cardUid" element={<CardTapHandler />} />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <SignUpPage />
            </RedirectIfAuth>
          }
        />
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

        {/* Dynamic Handle Profile route */}
        <Route path="/:username" element={<CardTapHandler />} />

        {/* Fallback route */}
        <Route
          path="*"
          element={
            isApp ? (
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <HomePage />
            )
          }
        />
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

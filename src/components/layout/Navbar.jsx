import React, { useState } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon,
  LayoutDashboard,
  Settings,
  LogOut,
  User,
  Sliders,
  CreditCard,
  Watch,
  Sparkles,
  ChevronRight,
  Building2,
  Users,
  Zap,
  HelpCircle,
  Newspaper,
  ShieldCheck,
  BookOpen,
  Palette,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const {
    setIsOrderModalOpen,
    openWaitlistModal,
    cardFinishes,
    setSelectedFinish,
    currentPage,
    setCurrentPage,
    darkMode,
    toggleDarkMode,
    isAuthenticated,
    logoutUser,
    profile
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const nfcCards = cardFinishes.filter((f) => f.category !== 'wristband');
  const nfcWristbands = cardFinishes.filter((f) => f.category === 'wristband');

  return (
    <header className="sticky top-0 z-40 w-full pt-4 pb-2 px-4 sm:px-6 lg:px-8 bg-transparent transition-colors">
      <div className="max-w-6xl mx-auto">

        {/* Floating Capsule Bar Container */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-full px-6 sm:px-8 py-3 flex items-center justify-between shadow-sm hover:shadow-md transition-all">

          {/* Brand Logo */}
          <a href="#" onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 group">
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
              enlazer
            </span>
            <span className="text-2xl font-black text-[#00BCFF] group-hover:scale-125 transition-transform">
              .
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[13px] font-semibold text-slate-500 dark:text-slate-400">
            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  setCurrentPage('home');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`transition-colors cursor-pointer py-1 font-bold ${
                currentPage === 'home'
                  ? 'text-[#00BCFF] dark:text-[#00BCFF]'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Our Story</span>
            </button>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProductsOpen(!productsOpen);
                  setSolutionsOpen(false);
                  setResourcesOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors py-1 cursor-pointer"
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180 text-[#00BCFF]' : 'text-slate-400'}`} />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 mt-5 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-1">
                  {/* NFC Cards Link Card */}
                  <button
                    onClick={() => {
                      setCurrentPage('cards');
                      setProductsOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex items-start gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-[#00BCFF]/10 text-[#00BCFF] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <CreditCard className="w-4 h-4 text-[#00BCFF]" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-[#00BCFF] transition-colors">NFC Cards</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                        Sleek matte PVC, stainless steel, rose gold & bamboo digital business cards.
                      </p>
                    </div>
                  </button>

                  {/* NFC Wearables Link Card */}
                  <button
                    onClick={() => {
                      setCurrentPage('wristbands');
                      setProductsOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex items-start gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-[#00BCFF]/10 text-[#00BCFF] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <Watch className="w-4 h-4 text-[#00BCFF]" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-[#00BCFF] transition-colors">NFC Wearables</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                        IP68 waterproof eco-silicone smart wearables for active hands-free networking.
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setSolutionsOpen(!solutionsOpen);
                  setProductsOpen(false);
                  setResourcesOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors py-1 cursor-pointer"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180 text-[#00BCFF]' : 'text-slate-400'}`} />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-5 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-1">
                  {/* Teams & Enterprises */}
                  <button
                    onClick={() => {
                      setCurrentPage('cards');
                      setSolutionsOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex items-start gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-[#00BCFF]/10 text-[#00BCFF] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4 text-[#00BCFF]" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-[#00BCFF] transition-colors">Teams & Enterprises</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                        Centralized digital card management and team lead capturing at scale.
                      </p>
                    </div>
                  </button>



                  {/* Events & Hospitality */}
                  <button
                    onClick={() => {
                      setCurrentPage('wristbands');
                      setSolutionsOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex items-start gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-[#00BCFF]/10 text-[#00BCFF] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-[#00BCFF]" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-[#00BCFF] transition-colors">Events & Hospitality</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                        Wearable contactless wristbands for event check-in & VIP networking.
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  setProductsOpen(false);
                  setSolutionsOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors py-1 cursor-pointer"
              >
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180 text-[#00BCFF]' : 'text-slate-400'}`} />
              </button>

              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-5 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-1">
                  {/* Help & Support */}
                  <button
                    onClick={() => {
                      setCurrentPage('support');
                      setResourcesOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex items-start gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-[#00BCFF]/10 text-[#00BCFF] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4 text-[#00BCFF]" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-[#00BCFF] transition-colors">Help & Support</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                        Contact 24/7 support, view FAQs, and step-by-step setup guides.
                      </p>
                    </div>
                  </button>

                  {/* Press & Media */}
                  <button
                    onClick={() => {
                      setCurrentPage('press');
                      setResourcesOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex items-start gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-[#00BCFF]/10 text-[#00BCFF] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <Newspaper className="w-4 h-4 text-[#00BCFF]" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-[#00BCFF] transition-colors">Press & Media</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                        Download brand assets, press kits, and company announcements.
                      </p>
                    </div>
                  </button>

                  {/* Security & Guarantee */}
                  <button
                    onClick={() => {
                      setCurrentPage('security');
                      setResourcesOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex items-start gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-[#00BCFF]/10 text-[#00BCFF] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-[#00BCFF]" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-[#00BCFF] transition-colors">Security & Trust</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                        Hardware security specs, NTAG216 chip encryption & guarantees.
                      </p>
                    </div>
                  </button>

                  {/* About Us */}
                  <button
                    onClick={() => {
                      setCurrentPage('about');
                      setResourcesOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex items-start gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-[#00BCFF]/10 text-[#00BCFF] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4 text-[#00BCFF]" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-[#00BCFF] transition-colors">About Enlazer</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                        Learn about our story, leadership team, and physical hardware vision.
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>

          </nav>

          {/* Right Action Buttons & Profile Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              /* AUTHENTICATED: Profile Avatar & Dropdown Menu */
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setProductsOpen(false);
                    setSolutionsOpen(false);
                    setResourcesOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-slate-400 bg-white dark:bg-slate-950 cursor-pointer transition-all"
                >
                  <img
                    src={profile?.avatar || null}
                    alt={profile?.name || 'User Profile'}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[100px] truncate">
                    {profile.name.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180 text-[#00BCFF]' : 'text-slate-400'}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-5 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-1">

                    {/* User Header */}
                    <div className="p-2.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-extrabold text-slate-900 dark:text-white text-xs block truncate">
                        {profile.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                        {profile.email}
                      </span>
                    </div>

                    {/* My Cart */}
                    <button
                      onClick={() => {
                        setIsOrderModalOpen(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#00BCFF]" />
                      <span>Cart</span>
                    </button>

                    {/* Logout */}
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => {
                          logoutUser();
                          setCurrentPage('home');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              /* NOT AUTHENTICATED: Log In Button */
              <button
                onClick={() => setCurrentPage('login')}
                className="px-5 py-2 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-slate-400 text-slate-900 dark:text-white font-bold text-xs transition-all active:scale-95 cursor-pointer bg-transparent"
              >
                Log In
              </button>
            )}

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-slate-400 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 cursor-pointer transition-all active:scale-95"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

          </div>

          {/* Mobile Right Bar: Dark Mode Toggle & Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl mt-3 p-5 shadow-xl space-y-3">
            {/* Mobile Products Links */}
            <div className="py-2 border-b border-slate-100 dark:border-slate-800/80 space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Products</span>
              <button
                onClick={() => {
                  setCurrentPage('cards');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full text-left py-2 px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#00BCFF]" />
                  <span>NFC Cards</span>
                </div>
                <span className="text-[11px] text-[#00BCFF]">View Page →</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage('wristbands');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full text-left py-2 px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Watch className="w-4 h-4 text-[#00BCFF]" />
                  <span>NFC Wearables</span>
                </div>
                <span className="text-[11px] text-[#00BCFF]">View Page →</span>
              </button>
            </div>

            {/* Mobile Solutions Section */}
            <div className="py-2 border-b border-slate-100 dark:border-slate-800/80 space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Solutions</span>
              <button
                onClick={() => {
                  setCurrentPage('cards');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full text-left py-2 px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#00BCFF]" />
                  <span>Teams & Enterprises</span>
                </div>
                <span className="text-[11px] text-[#00BCFF]">View →</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('wristbands');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full text-left py-2 px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#00BCFF]" />
                  <span>Events & Hospitality</span>
                </div>
                <span className="text-[11px] text-[#00BCFF]">View →</span>
              </button>
            </div>

            {/* Mobile Resources Section */}
            <div className="py-2 border-b border-slate-100 dark:border-slate-800/80 space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Resources</span>
              <button
                onClick={() => {
                  setCurrentPage('support');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full text-left py-2 px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#00BCFF]" />
                  <span>Help & Support</span>
                </div>
                <span className="text-[11px] text-[#00BCFF]">View →</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage('press');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full text-left py-2 px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-[#00BCFF]" />
                  <span>Press & Media</span>
                </div>
                <span className="text-[11px] text-[#00BCFF]">View →</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage('security');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full text-left py-2 px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00BCFF]" />
                  <span>Security & Trust</span>
                </div>
                <span className="text-[11px] text-[#00BCFF]">View →</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full text-left py-2 px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#00BCFF]" />
                  <span>About Enlazer</span>
                </div>
                <span className="text-[11px] text-[#00BCFF]">View →</span>
              </button>
            </div>

            {isAuthenticated && (
              <div className="py-2 border-b border-slate-100 dark:border-slate-800/80 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Orders & Cart</span>
                <button
                  onClick={() => {
                    setIsOrderModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full text-left py-2 px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#00BCFF]" />
                    <span>Cart</span>
                  </div>
                  <span className="text-[11px] text-[#00BCFF]">View Cart →</span>
                </button>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logoutUser();
                    setCurrentPage('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-full border border-rose-300 dark:border-rose-800 text-rose-600 font-bold text-xs text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentPage('login');
                  }}
                  className="w-full py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs text-center cursor-pointer"
                >
                  Log In
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentPage('customizer');
                }}
                className="w-full py-2.5 rounded-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-extrabold text-xs text-center shadow-md cursor-pointer transition-all active:scale-95"
              >
                Get Enlazer Card
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;


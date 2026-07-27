import React, { useState } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight, Sun, Moon, LayoutDashboard, Settings, LogOut, User, Sliders } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const {
    setIsOrderModalOpen,
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
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full pt-5 pb-3 px-4 sm:px-6 lg:px-8 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Floating Capsule Bar Container */}
        <div className="bg-[#F1F3F6] dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-full px-6 sm:px-8 py-3 flex items-center justify-between shadow-xs transition-colors">
          
          {/* Brand Logo */}
          <a href="#" onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 group">
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
              bloom
            </span>
            <span className="text-2xl font-black text-[#00BCFF] group-hover:scale-125 transition-transform">
              .
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[13px] font-semibold text-slate-500 dark:text-slate-400">
            <button onClick={() => setCurrentPage('home')} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProductsOpen(!productsOpen);
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors py-1 cursor-pointer"
              >
                <span>NFC Cards</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180 text-[#00BCFF]' : 'text-slate-400'}`} />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {cardFinishes.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => {
                        setSelectedFinish(finish);
                        setCurrentPage('customizer');
                        setProductsOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white text-sm">{finish.name}</span>
                        <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">₦{finish.price.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{finish.material}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons, Theme Toggle & Profile Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {isAuthenticated ? (
              /* AUTHENTICATED: Profile Avatar & Dropdown Menu */
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setProductsOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-slate-400 bg-white dark:bg-slate-950 cursor-pointer transition-all"
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[100px] truncate">
                    {profile.name.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180 text-[#00BCFF]' : 'text-slate-400'}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-1">
                    
                    {/* User Header */}
                    <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-extrabold text-slate-900 dark:text-white text-xs block truncate">
                        {profile.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                        {profile.email}
                      </span>
                    </div>

                    {/* Dashboard */}
                    <button
                      onClick={() => {
                        setCurrentPage('dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#00BCFF]" />
                      <span>Dashboard</span>
                    </button>

                    {/* Card Builder */}
                    <button
                      onClick={() => {
                        setCurrentPage('customizer');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
                    >
                      <Sliders className="w-4 h-4 text-emerald-500" />
                      <span>Card Builder</span>
                    </button>

                    {/* Settings */}
                    <button
                      onClick={() => {
                        setCurrentPage('dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-indigo-500" />
                      <span>Settings</span>
                    </button>

                    {/* Logout */}
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => {
                          logoutUser();
                          setCurrentPage('home');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors text-left cursor-pointer"
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

            <button
              onClick={() => setCurrentPage('signup')}
              className="px-5 py-2 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-400/25 transition-all active:scale-95 cursor-pointer"
            >
              <span>get cards by bloom.</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl mt-3 p-5 shadow-xl space-y-3">
            <button
              onClick={() => {
                setCurrentPage('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-semibold text-slate-800 dark:text-white hover:text-[#00BCFF]"
            >
              Home
            </button>

            {isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    setCurrentPage('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-semibold text-slate-800 dark:text-white hover:text-[#00BCFF]"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('customizer');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-semibold text-slate-800 dark:text-white hover:text-[#00BCFF]"
                >
                  Card Builder
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-semibold text-slate-800 dark:text-white hover:text-[#00BCFF]"
                >
                  Settings
                </button>
              </>
            )}

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logoutUser();
                    setCurrentPage('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-full border border-rose-300 dark:border-rose-800 text-rose-600 font-bold text-xs text-center cursor-pointer"
                >
                  Log Out
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
                  setCurrentPage('signup');
                }}
                className="w-full py-2.5 rounded-full bg-[#00BCFF] text-white font-bold text-xs text-center shadow-sm cursor-pointer"
              >
                get cards by bloom.
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;

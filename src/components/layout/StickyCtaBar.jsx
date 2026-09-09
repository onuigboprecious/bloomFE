import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StickyCtaBar = () => {
  const {
    currentPage,
    setCurrentPage,
    isAuthenticated,
    isPublished,
    setIsPublishModalOpen
  } = useApp();

  const isBuilderPage = currentPage === 'dashboard' || currentPage === 'onboarding';

  const handleClick = () => {
    if (isBuilderPage) {
      setIsPublishModalOpen(true);
    } else if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('signup');
    }
  };

  // If page is already published inside builder, don't display the floating sticky bar
  if (isBuilderPage && isPublished) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg pointer-events-auto"
    >
      <div className="bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 text-white rounded-full py-3.5 px-5 flex items-center justify-between shadow-2xl shadow-cyan-500/15 min-h-[68px]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-[#00BCFF]/20 text-[#00BCFF] flex items-center justify-center shrink-0">
            <Rocket className="w-5 h-5" />
          </div>
          <div className="truncate">
            <span className="text-xs sm:text-sm font-black block truncate text-white">
              {isBuilderPage ? "Draft Ready to Publish" : "Free Digital Profile"}
            </span>
            <span className="text-[11px] text-cyan-300 block truncate font-medium">
              {isBuilderPage ? "Go live + get free NFC card" : "Pay only when you publish"}
            </span>
          </div>
        </div>

        <button
          onClick={handleClick}
          className="shrink-0 px-5 py-3 rounded-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98] flex items-center gap-1.5 cursor-pointer"
        >
          <span>{isBuilderPage ? "Publish Now" : "Build Free Page"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

export default StickyCtaBar;

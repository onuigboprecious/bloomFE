import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Info } from 'lucide-react';

export const Tooltip = ({
  content,
  title = 'Pro Tip',
  position = 'top',
  icon = 'help',
  children,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 -translate-y-1/2';
      case 'top':
      default:
        return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {children || (
        <button
          type="button"
          className="text-slate-400 hover:text-[#00BCFF] focus:text-[#00BCFF] transition-colors p-0.5 rounded-full cursor-pointer focus:outline-none"
          aria-label="Contextual Help"
        >
          {icon === 'info' ? (
            <Info className="w-4 h-4" />
          ) : (
            <HelpCircle className="w-4 h-4" />
          )}
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: position === 'top' ? 4 : -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute z-50 w-64 p-3 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white text-xs shadow-2xl border border-slate-700/80 pointer-events-none ${getPositionClasses()}`}
          >
            {title && (
              <div className="font-extrabold text-[#00BCFF] text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#00BCFF]" />
                <span>{title}</span>
              </div>
            )}
            <p className="text-slate-200 text-[11px] leading-relaxed font-normal">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;

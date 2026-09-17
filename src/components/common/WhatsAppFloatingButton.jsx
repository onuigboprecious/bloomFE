import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const defaultWhatsappUrl = "https://wa.me/2348031234567?text=Hello%20Enlazer%20Support%2C%20I%20have%20a%20question%20about%20my%20NFC%20card";

  const handleSendCustomMessage = (e) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(customMessage.trim() || "Hello Enlazer Support, I would like to inquire about NFC cards.");
    const fullUrl = `https://wa.me/2348031234567?text=${encodedText}`;
    window.open(fullUrl, '_blank');
    setIsOpen(false);
    setCustomMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto flex flex-col items-end space-y-3 font-['Plus_Jakarta_Sans',sans-serif]">

      {/* Expandable Chat Box Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[310px] sm:w-[350px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white mb-2"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
                </div>

                <div>
                  <h4 className="text-sm font-black tracking-tight text-white leading-tight">
                    Enlazer WhatsApp Support
                  </h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 font-medium mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>Typically replies within minutes</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3 bg-slate-950/80">
              <div className="bg-slate-800/90 rounded-2xl p-3.5 border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-1">
                <p className="font-semibold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Hi there! 👋 How can we help?
                </p>
                <p className="text-slate-300">
                  Order tracking, card designs, profile customization, or delivery info — send us a direct message on WhatsApp!
                </p>
              </div>

              <form onSubmit={handleSendCustomMessage} className="space-y-2.5 pt-1">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-white outline-none transition-colors placeholder:text-slate-500"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Chat</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="WhatsApp Support Chat"
        className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs shadow-2xl shadow-emerald-500/30 border border-emerald-400/40 cursor-pointer transition-all"
      >
        <div className="relative">
          <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </div>

        <span className="hidden sm:inline-block">Need help? Chat us</span>
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
      </motion.button>
    </div>
  );
};

export default WhatsAppFloatingButton;

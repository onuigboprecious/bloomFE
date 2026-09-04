import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
    setIsOrderModalOpen,
    setCurrentPage,
  } = useApp();

  const cartCount = getCartCount();
  const subtotal = getCartTotal();

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="w-screen max-w-md bg-white dark:bg-slate-950 border-l border-slate-200/80 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-[#00BCFF] flex items-center justify-center relative">
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00BCFF] text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Your Cart</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {cartCount === 0 ? 'No items selected' : `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in cart`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body - Items List */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Your cart is empty</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                        Explore our high-performance NFC Cards and Wristbands to tap and connect instantly.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCurrentPage('home');
                        setTimeout(() => {
                          const el = document.getElementById('nfc-cards');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold text-xs shadow-md cursor-pointer transition-all active:scale-95"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 flex items-center gap-4 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                    >
                      {/* Product Preview Thumbnail */}
                      <div className="w-14 h-14 rounded-xl shrink-0 overflow-hidden bg-slate-800 border border-white/10 flex items-center justify-center relative">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className={`w-full h-full ${item.color || 'bg-gradient-to-br from-cyan-600 to-slate-900'} p-1.5 flex flex-col justify-between text-[8px] font-black text-white`}>
                            <span>enlazer</span>
                            <span className="self-end text-[7px]">NFC</span>
                          </div>
                        )}
                      </div>

                      {/* Info & Quantity controls */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.material && (
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.material}</p>
                        )}

                        <div className="flex items-center justify-between pt-1.5">
                          {/* Quantity Selector [- Qty +] */}
                          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-5 h-5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-4 text-center text-xs font-bold text-slate-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-5 h-5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          {/* Line Price */}
                          <span className="text-xs font-extrabold text-cyan-600 dark:text-[#00BCFF]">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer Summary */}
              {cart.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
                  {/* Delivery Callout Banner */}
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Truck className="w-4 h-4 text-[#00BCFF] shrink-0" />
                    <span><strong>Free Delivery</strong> in Abuja | ₦5,000 nationwide</span>
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Subtotal</span>
                      <span className="font-bold text-slate-900 dark:text-white">₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Estimated Delivery</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Calculated at checkout</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm font-black text-slate-900 dark:text-white">
                      <span>Total</span>
                      <span className="text-base text-cyan-600 dark:text-[#00BCFF]">₦{subtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout Action Button */}
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 px-6 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-black text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full text-center text-[11px] font-semibold text-slate-400 hover:text-rose-500 transition-colors py-1 cursor-pointer"
                  >
                    Empty Shopping Cart
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

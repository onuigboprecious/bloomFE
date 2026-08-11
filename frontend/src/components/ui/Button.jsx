import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  icon: Icon
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variants = {
    primary: "bg-[#00bbf9] hover:bg-[#00a8e0] text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 border border-cyan-400/30",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/10",
    outline: "bg-white/80 hover:bg-white text-slate-800 border border-slate-200/80 shadow-sm hover:border-slate-300",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60",
    darkPill: "bg-slate-900 hover:bg-slate-800 text-white rounded-full"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 rounded-full gap-1.5",
    md: "text-sm px-5 py-2.5 rounded-full gap-2",
    lg: "text-base px-7 py-3.5 rounded-full gap-2.5 font-semibold"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default Button;

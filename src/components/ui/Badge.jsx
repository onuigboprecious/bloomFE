import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const variants = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    success: "bg-emerald-50 text-emerald-600 border border-emerald-200/80 font-medium",
    cyan: "bg-cyan-50 text-cyan-700 border border-cyan-200 font-medium",
    dark: "bg-slate-900 text-white font-medium",
    pill: "bg-slate-100 text-slate-600 font-semibold uppercase text-[10px] tracking-wider rounded-md"
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

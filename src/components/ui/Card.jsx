import React from 'react';

export const Card = ({
  children,
  className = '',
  glass = false,
  hoverable = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl transition-all duration-300 ${
        glass
          ? 'bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-900/5'
          : 'bg-white border border-slate-100 shadow-lg shadow-slate-200/50'
      } ${
        hoverable ? 'hover:-translate-y-1 hover:shadow-xl cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

import React from 'react';

export const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  className = '',
  required = false,
  error
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
          {label}
          {required && <span className="text-rose-500 ml-0.5 font-bold">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-slate-400 font-medium text-sm select-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 placeholder:text-slate-500 dark:placeholder:text-slate-400 placeholder:font-normal ${
            prefix ? 'pl-9' : ''
          } ${suffix ? 'pr-9' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3.5 text-slate-400 font-medium text-sm select-none">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
};

export default Input;

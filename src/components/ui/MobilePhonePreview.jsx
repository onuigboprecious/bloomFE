import React from 'react';
import ProfileView from '../profile/ProfileView';
import { useApp } from '../../context/AppContext';

export const MobilePhonePreview = ({ data, className = '' }) => {
  const { profile } = useApp();
  const targetData = data || profile;

  return (
    <div className={`relative mx-auto max-w-[430px] w-full ${className}`}>
      {/* Outer Phone Shell Device Frame */}
      <div className="relative border-[10px] sm:border-[12px] border-slate-900 dark:border-slate-800 bg-slate-950 rounded-[44px] sm:rounded-[48px] shadow-2xl overflow-hidden ring-1 ring-white/10">
        
        {/* Top Speaker & Dynamic Island Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-4 sm:h-5 bg-slate-900 dark:bg-slate-800 rounded-b-2xl z-30 flex items-center justify-center gap-2 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700/60" />
          <div className="w-8 h-1.5 rounded-full bg-slate-950/80" />
        </div>

        {/* Inner Phone Screen Content */}
        <div className="h-[600px] sm:h-[680px] overflow-y-auto custom-scrollbar relative pt-2">
          <ProfileView data={targetData} />
        </div>

        {/* Bottom Mobile Home Bar Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-500/50 rounded-full z-30 pointer-events-none" />
      </div>
    </div>
  );
};

export default MobilePhonePreview;

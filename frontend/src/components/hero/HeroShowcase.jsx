import React from 'react';
import PhoneMockup from './PhoneMockup';
import FloatingWidgets from './FloatingWidgets';

export const HeroShowcase = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12 mb-8 pt-6 pb-12 flex justify-center items-center">
      {/* Background Soft Ambient Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/15 via-blue-200/20 to-indigo-300/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Hero Phone & Floating Elements Stack */}
      <div className="relative z-10 w-full flex justify-center">
        <PhoneMockup />
        <FloatingWidgets />
      </div>
    </div>
  );
};

export default HeroShowcase;

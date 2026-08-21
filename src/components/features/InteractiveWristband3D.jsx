import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import wristbandShowcaseImg from '../../assets/images/nfc_wristband_showcase.png';

export const InteractiveWristband3D = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt & rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physics springs
  const mouseX = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 20 });

  // 3D rotation transforms
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-22, 22]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [18, -18]);
  
  // Dynamic glare position
  const shineX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentX = (e.clientX - rect.left) / width - 0.5;
    const currentY = (e.clientY - rect.top) / height - 0.5;

    x.set(currentX);
    y.set(currentY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full flex items-center justify-center p-4 cursor-grab active:cursor-grabbing select-none perspective-[1200px]"
    >
      <motion.div
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-full max-w-md rounded-3xl overflow-hidden bg-transparent flex items-center justify-center transition-all duration-100"
      >
        {/* High-Fidelity Studio Wristband Render (Zero Mesh Distortion, 100% Sharp) */}
        <img
          src={wristbandShowcaseImg}
          alt="Bloom Interactive 3D NFC Wristbands"
          className="w-full h-auto object-contain rounded-3xl pointer-events-none drop-shadow-2xl"
        />

        {/* Dynamic 3D Glare Reflection Layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 opacity-20 bg-white/10"
        />
      </motion.div>
    </div>
  );
};

export default InteractiveWristband3D;

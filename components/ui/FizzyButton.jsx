'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════
   FIZZY BUTTON COMPONENT WITH PARTICLE ACTION
   ═══════════════════════════════════════════════════ */
export default function FizzyButton({
  children,
  onClick,
  variant = 'primary', // primary | secondary | accent | success
  className = '',
  icon,
  showCheckmarkOnSuccess = false,
  ...props
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const [particles, setParticles] = useState([]);
  const buttonId = useId();

  // Color palette for fizzy particles
  const particleColors = [
    '#E8705A', // Saffron / Coral
    '#FF9933', // Gold Accent
    '#5BB8D4', // Sky Blue
    '#138808', // Emerald Green
    '#C25975', // Rose Pink
    '#5B3256', // Purple
  ];

  // Generate 24 fizzy spots statically for hover spew
  const fizzySpots = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 360;
    const distance = 25 + (i % 5) * 8;
    const color = particleColors[i % particleColors.length];
    const size = 4 + (i % 4) * 2;
    const delay = (i % 8) * 0.08;
    return { id: i, angle, distance, color, size, delay };
  });

  const handleClick = (e) => {
    // Generate explosive click particles
    const newParticles = Array.from({ length: 18 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      size: 4 + Math.random() * 6,
      scale: 0.5 + Math.random() * 1,
    }));

    setParticles(newParticles);
    setIsClicked(true);

    if (showCheckmarkOnSuccess) {
      setShowTick(true);
      setTimeout(() => setShowTick(false), 2200);
    }

    setTimeout(() => {
      setIsClicked(false);
      setParticles([]);
    }, 1000);

    if (onClick) onClick(e);
  };

  const variantStyles = {
    primary: 'bg-[#E8705A] text-white hover:bg-[#d4624e] border-2 border-[#E8705A]',
    secondary: 'bg-[#0D4F4F] text-white hover:bg-[#073636] border-2 border-[#0D4F4F]',
    accent: 'bg-[#FF9933] text-white hover:bg-[#e58826] border-2 border-[#FF9933]',
    success: 'bg-[#138808] text-white hover:bg-[#0f6b06] border-2 border-[#138808]',
    outline: 'bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20',
  };

  return (
    <div className="relative inline-block group">
      {/* Background Fizzy Particle Spots */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
        {fizzySpots.map((spot) => (
          <span
            key={spot.id}
            className="absolute rounded-full opacity-0 group-hover:opacity-90 transition-all duration-500"
            style={{
              width: `${spot.size}px`,
              height: `${spot.size}px`,
              backgroundColor: spot.color,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${spot.angle}deg) translate(${spot.distance}px) rotate(-${spot.angle}deg)`,
              boxShadow: `0 0 8px ${spot.color}`,
              transitionDelay: `${spot.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Explosive Click Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, scale: 0.2, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: p.scale,
              x: p.x,
              y: p.y,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute rounded-full pointer-events-none z-20"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              top: '50%',
              left: '50%',
              boxShadow: `0 0 10px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Fizzy Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleClick}
        className={`relative z-10 px-7 py-3.5 rounded-full font-[family-name:var(--font-sora)] font-bold text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
          variantStyles[variant] || variantStyles.primary
        } ${className}`}
        {...props}
      >
        {/* Animated Icon */}
        {icon && (
          <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
            {icon}
          </span>
        )}

        {/* Text Content */}
        <span className="relative z-10">{children}</span>

        {/* Checkmark Tick Animation on Success */}
        <AnimatePresence>
          {showTick && (
            <motion.span
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="text-emerald-300 font-extrabold text-base ml-1"
            >
              ✓
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

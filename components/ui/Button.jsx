'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const particleColors = [
  '#E8705A', // Coral / Saffron
  '#FF9933', // Gold
  '#5BB8D4', // Sky Blue
  '#138808', // Emerald Green
  '#00C4FF', // Cyan Fizzy
  '#C25975', // Rose Pink
];

export default function Button({
  variant = 'primary',
  size = 'md',
  magnetic = true,
  fizzy = true,
  href,
  children,
  className = '',
  onClick,
  ...props
}) {
  const ref = useRef(null);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const [isRippling, setIsRippling] = useState(false);
  const [clickParticles, setClickParticles] = useState([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // 20 static fizzy perimeter spots for hover
  const fizzyHoverSpots = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 360;
    const distance = 22 + (i % 4) * 8;
    const color = particleColors[i % particleColors.length];
    const spotSize = 3 + (i % 4) * 2;
    const delay = (i % 6) * 0.08;
    return { id: i, angle, distance, color, spotSize, delay };
  });

  const handleMouseMove = (e) => {
    if (!magnetic || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setClickPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 500);

      if (fizzy) {
        const newBurst = Array.from({ length: 16 }, (_, i) => ({
          id: `${Date.now()}-${i}`,
          x: (Math.random() - 0.5) * 110,
          y: (Math.random() - 0.5) * 110,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          size: 4 + Math.random() * 5,
        }));
        setClickParticles(newBurst);
        setTimeout(() => setClickParticles([]), 900);
      }
    }
    if (onClick) onClick(e);
  };

  const baseStyles =
    'relative overflow-visible font-[family-name:var(--font-sora)] rounded-full inline-flex items-center justify-center font-bold transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group';

  const sizeStyles = {
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantStyles = {
    primary: 'bg-[#0D4F4F] text-white hover:bg-[#073636] border-2 border-[#0D4F4F] shadow-lg',
    secondary: 'bg-transparent border-2 border-[#0D4F4F] text-[#0D4F4F] hover:bg-[#0D4F4F] hover:text-white',
    saffron: 'bg-[#E8705A] text-white hover:bg-[#d4624e] border-2 border-[#E8705A] shadow-xl',
    gold: 'bg-[#FF9933] text-white hover:bg-[#e58826] border-2 border-[#FF9933] shadow-lg',
  };

  const buttonClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`;

  const innerContent = (
    <>
      {/* Perimeter Hover Fizzy Spots */}
      {fizzy && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
          {fizzyHoverSpots.map((spot) => (
            <span
              key={spot.id}
              className="absolute rounded-full opacity-0 group-hover:opacity-90 transition-all duration-500"
              style={{
                width: `${spot.spotSize}px`,
                height: `${spot.spotSize}px`,
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
      )}

      {/* Explosive Click Burst Particles */}
      {fizzy && (
        <AnimatePresence>
          {clickParticles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, scale: 0.2, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.4, x: p.x, y: p.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
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
      )}

      <span className="relative z-10 pointer-events-none">{children}</span>

      {/* Ripple Ring */}
      {isRippling && (
        <span
          className="absolute z-0 w-32 h-32 bg-white/30 rounded-full animate-ping pointer-events-none"
          style={{
            left: clickPos.x,
            top: clickPos.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className={buttonClasses}
          style={magnetic ? { x: springX, y: springY } : {}}
        >
          {innerContent}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={buttonClasses}
      style={magnetic ? { x: springX, y: springY } : {}}
    >
      {innerContent}
    </motion.button>
  );
}

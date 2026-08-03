'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.hasAttribute('data-cursor') ||
        e.target.closest('[data-cursor]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [x, y]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{ x: cursorX, y: cursorY }}
      animate={{
        scale: isHovering ? 1.5 : 1,
      }}
      className="fixed top-0 left-0 w-[32px] h-[32px] rounded-full border-2 border-[var(--color-teal)] pointer-events-none z-[9999] mix-blend-difference"
    />
  );
}

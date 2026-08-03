'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

export default function Button({
  variant = 'primary',
  size = 'md',
  magnetic = true,
  href,
  children,
  className = '',
  onClick,
  ...props
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const [isRippling, setIsRippling] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!magnetic || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!magnetic) return;
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
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
    }
    if (onClick) onClick(e);
  };

  const baseStyles = 'relative overflow-hidden font-[var(--font-heading)] rounded-full inline-flex items-center justify-center transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]';
  
  const sizeStyles = {
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: 'bg-[var(--color-teal)] text-white hover:bg-[#126b6b]',
    secondary: 'bg-transparent border-2 border-[var(--color-teal)] text-[var(--color-teal)] hover:bg-[#0D4F4F1A]',
  };

  const Component = href ? motion.a : motion.button;

  const content = (
    <>
      <span className="relative z-10 pointer-events-none">{children}</span>
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

  const wrapperProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onClick: handleClick,
    className: `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`,
    style: magnetic ? { x: springX, y: springY } : {},
    ...props,
  };

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <Component {...wrapperProps}>{content}</Component>
      </Link>
    );
  }

  return <Component {...wrapperProps}>{content}</Component>;
}

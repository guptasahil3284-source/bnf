'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

const galleryItems = [
  {
    id: 1,
    title: 'Interactive Workshops',
    subtitle: 'Building confidence & future skills together',
    image: '/images/hero/students.jpg',
    tag: '🎓 Learning',
    accent: '#0D4F4F',
  },
  {
    id: 2,
    title: 'Career Readiness',
    subtitle: 'Guidance tailored to student potential',
    image: '/images/hero/workshop.jpg',
    tag: '📊 Career',
    accent: '#E8705A',
  },
  {
    id: 3,
    title: 'Personalized Counseling',
    subtitle: 'Empowering students to find their path',
    image: '/images/hero/guidance.jpg',
    tag: '🧭 Guidance',
    accent: '#5BB8D4',
  },
  {
    id: 4,
    title: 'Volunteer Network',
    subtitle: 'Passionate mentors across India',
    image: '/images/hero/volunteers.jpg',
    tag: '🤝 Community',
    accent: '#0D4F4F',
  },
  {
    id: 5,
    title: 'Self-Reflection & Journaling',
    subtitle: 'Fostering emotional intelligence',
    image: '/images/hero/learning.jpg',
    tag: '📝 Journaling',
    accent: '#E8705A',
  },
  {
    id: 6,
    title: 'Holistic Student Growth',
    subtitle: 'Bridging education with real-world readiness',
    image: '/images/hero/activity.jpg',
    tag: '⭐ Growth',
    accent: '#5BB8D4',
  },
];

// Floating sparkle particles
function Sparkles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
            y: [0, -30, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function HeroGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-200, 200], [12, -12]);
  const rotateY = useTransform(springX, [-200, 200], [-12, 12]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  }, [mouseX, mouseY]);

  // Auto-rotate
  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryItems.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovering]);

  const currentItem = galleryItems[activeIndex];

  // Get positions for the orbiting cards
  const getCardStyle = (index) => {
    const total = galleryItems.length;
    const offset = ((index - activeIndex + total) % total);
    
    // Position cards in a 3D arc behind the main card
    const configs = {
      0: { x: 0, y: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 30 },        // Front center
      1: { x: 180, y: 15, z: -120, rotateY: -35, scale: 0.72, opacity: 0.7, zIndex: 20 },  // Right
      2: { x: 220, y: 40, z: -220, rotateY: -55, scale: 0.55, opacity: 0.4, zIndex: 10 },  // Far right
      3: { x: 0, y: 50, z: -280, rotateY: 0, scale: 0.45, opacity: 0.2, zIndex: 5 },       // Behind
      4: { x: -220, y: 40, z: -220, rotateY: 55, scale: 0.55, opacity: 0.4, zIndex: 10 },  // Far left
      5: { x: -180, y: 15, z: -120, rotateY: 35, scale: 0.72, opacity: 0.7, zIndex: 20 },  // Left
    };

    return configs[offset] || configs[3];
  };

  return (
    <div
      className="relative w-full h-[560px] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovering(true)}
      style={{ perspective: '1200px' }}
    >
      <Sparkles />

      {/* Ambient glow behind the active card */}
      <motion.div
        className="absolute w-72 h-72 rounded-full blur-[100px] opacity-40 pointer-events-none z-0"
        animate={{ 
          backgroundColor: currentItem.accent,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: '-50%', y: '-30%', left: '50%', top: '40%' }}
      />

      {/* Secondary glow orb */}
      <motion.div
        className="absolute w-48 h-48 rounded-full blur-[80px] opacity-25 pointer-events-none z-0"
        animate={{ 
          backgroundColor: ['#E8705A', '#5BB8D4', '#0D4F4F', '#E8705A'],
          x: [20, -20, 20],
          y: [-10, 10, -10],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ right: '10%', top: '20%' }}
      />

      {/* 3D Orbiting Cards Container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: 'preserve-3d',
        }}
      >
        {galleryItems.map((item, index) => {
          const config = getCardStyle(index);
          const isFront = ((index - activeIndex + galleryItems.length) % galleryItems.length) === 0;

          return (
            <motion.div
              key={item.id}
              className="absolute cursor-pointer"
              style={{
                zIndex: config.zIndex,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                x: config.x,
                y: config.y,
                z: config.z,
                rotateY: config.rotateY,
                scale: config.scale,
                opacity: config.opacity,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={() => setActiveIndex(index)}
              whileHover={!isFront ? { scale: config.scale + 0.05, opacity: Math.min(config.opacity + 0.2, 1) } : {}}
            >
              {/* Card */}
              <div className={`relative overflow-hidden rounded-3xl shadow-2xl ${isFront ? 'w-[320px] h-[400px]' : 'w-[280px] h-[350px]'}`}>
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={isFront}
                  className="object-cover"
                />

                {/* Gradient overlay */}
                <div className={`absolute inset-0 ${isFront 
                  ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent' 
                  : 'bg-gradient-to-t from-black/60 via-black/30 to-black/10'}`
                } />

                {/* Card Content (only visible on front card) */}
                {isFront && (
                  <motion.div
                    className="absolute inset-0 p-6 flex flex-col justify-between z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Top Tag */}
                    <motion.span
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                      className="self-start px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md shadow-lg"
                      style={{ color: item.accent }}
                    >
                      {item.tag}
                    </motion.span>

                    {/* Bottom Info */}
                    <div>
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                        className="font-[family-name:var(--font-sora)] text-xl font-bold text-white drop-shadow-lg mb-1"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                        className="font-[family-name:var(--font-inter)] text-xs text-white/85 font-medium"
                      >
                        {item.subtitle}
                      </motion.p>

                      {/* Animated progress bar */}
                      <div className="mt-4 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.accent }}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 3.5, ease: 'linear' }}
                          key={activeIndex}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Shine/Reflection effect on front card */}
                {isFront && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.15) 45%, transparent 60%)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  />
                )}

                {/* Glowing border on front card */}
                {isFront && (
                  <div className="absolute inset-0 rounded-3xl pointer-events-none z-10"
                    style={{
                      boxShadow: `0 0 30px ${item.accent}40, 0 0 60px ${item.accent}20, inset 0 0 1px rgba(255,255,255,0.3)`,
                    }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full shadow-xl border border-white/50">
          {galleryItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className="group relative"
              aria-label={`View ${item.title}`}
            >
              <motion.div
                className="rounded-full transition-colors"
                animate={{
                  width: idx === activeIndex ? 28 : 10,
                  height: 10,
                  backgroundColor: idx === activeIndex ? item.accent : '#d1d5db',
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              />
              {/* Tooltip on hover */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-bold text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Prev/Next Arrow Buttons */}
      <button
        onClick={() => setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-[#0D4F4F] hover:bg-white hover:scale-110 transition-all"
        aria-label="Previous image"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={() => setActiveIndex((prev) => (prev + 1) % galleryItems.length)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-[#0D4F4F] hover:bg-white hover:scale-110 transition-all"
        aria-label="Next image"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

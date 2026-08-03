'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/sections/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

/* ═══════════════════════════════════════════════════
   REUSABLE ANIMATION PRIMITIVES
   ═══════════════════════════════════════════════════ */

// Smooth fade-in with directional slide
function FadeIn({ children, delay = 0, direction = 'up', className = '', once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-60px' });
  const map = { up: { y: 50 }, down: { y: -50 }, left: { x: 60 }, right: { x: -60 } };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...map[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Animated counter (springs from 0 → target)
function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target, 10);
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

// 3D Tilt card on mouse hover
function TiltCard({ children, className = '', intensity = 15 }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * intensity);
    rotateY.set(x * intensity);
  }, [intensity, rotateX, rotateY]);

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

// Letter-by-letter reveal animation
function TextReveal({ text, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', marginRight: '0.3em', overflow: 'hidden' }}>
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              style={{ display: 'inline-block' }}
              initial={{ y: '110%', opacity: 0, rotateX: 90 }}
              animate={isInView ? { y: '0%', opacity: 1, rotateX: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: delay + wi * 0.08 + ci * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

// Floating particle system
function Particles({ count = 30, color = '#0D4F4F' }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    dur: Math.random() * 4 + 3,
    del: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, backgroundColor: color }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -40, 0], x: [0, Math.random() * 20 - 10, 0] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Animated SVG draw-on-scroll line
function AnimatedLine({ className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <svg ref={ref} className={className} viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M0 10 Q50 0 100 10 T200 10"
        stroke="#E8705A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </svg>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 1 — HERO BANNER (Cinematic)
   ═══════════════════════════════════════════════════ */
function AboutHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <section ref={ref} className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Parallax BG with scale */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
        <Image src="/images/about/hero-banner.jpg" alt="About BNF" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D4F4F]/85 via-[#0D4F4F]/50 to-[#0F1F1F]/95" />
      </motion.div>

      {/* Floating particles */}
      <Particles count={35} color="rgba(255,255,255,0.4)" />

      {/* Animated grid pattern overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-[140px] bg-[#E8705A]/25 pointer-events-none z-[1]"
        animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '5%' }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-[120px] bg-[#5BB8D4]/20 pointer-events-none z-[1]"
        animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '15%', right: '10%' }}
      />

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6 max-w-4xl" style={{ opacity: textOpacity, y: textY }}>
        {/* Pill badge with shimmer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="relative inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/20 mb-10 overflow-hidden"
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
          />
          <span className="relative text-sm font-medium text-white/90 font-[family-name:var(--font-inter)]">
            🌱 Who We Are & Why We Exist
          </span>
        </motion.div>

        {/* Main heading with letter reveal */}
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-[family-name:var(--font-sora)] font-bold text-white mb-8 leading-[1.1]">
          <TextReveal text="Who We Are" delay={0.3} />
        </h1>

        {/* Subtitle with clip-path reveal */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-white/75 font-[family-name:var(--font-inter)] max-w-2xl mx-auto leading-relaxed"
        >
          A student&apos;s holistic development-focused foundation, run by the students.
        </motion.p>

        {/* Animated underline */}
        <motion.div
          className="mx-auto mt-8 h-[2px] bg-gradient-to-r from-transparent via-[#E8705A] to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mt-12"
        >
          {[
            { num: '5000', suffix: '+', label: 'Students Impacted' },
            { num: '100', suffix: '+', label: 'Partner Schools' },
            { num: '50', suffix: '+', label: 'Programs Run' },
          ].map((s, i) => (
            <div key={s.label} className="text-center">
              <span className="block text-3xl md:text-4xl font-[family-name:var(--font-sora)] font-bold text-white">
                <AnimatedCounter target={s.num} suffix={s.suffix} duration={2 + i * 0.3} />
              </span>
              <span className="block text-xs text-white/50 font-[family-name:var(--font-inter)] mt-1 uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-14"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-white/80 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 2 — ABOUT BNF (3D Cards + Draw-on-scroll)
   ═══════════════════════════════════════════════════ */
function AboutBNF() {
  const iconCards = [
    {
      icon: '🧠',
      title: 'Built on Psychology',
      desc: 'Science-backed psychometric tools',
      color: '#0D4F4F',
    },
    {
      icon: '📖',
      title: 'Personalised Journaling',
      desc: 'Custom journals for every student',
      color: '#E8705A',
    },
    {
      icon: '🎯',
      title: 'Career Clarity',
      desc: 'Directed guidance, not guesswork',
      color: '#5BB8D4',
    },
    {
      icon: '📊',
      title: 'Measurable Growth',
      desc: 'Track progress before & after',
      color: '#0D4F4F',
    },
  ];

  return (
    <section className="py-28 bg-[#FAFAF7] relative overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #0D4F4F 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Text */}
          <div>
            <FadeIn>
              <span className="text-[#E8705A] font-[family-name:var(--font-sora)] text-sm font-bold uppercase tracking-[0.2em]">
                About Us
              </span>
              <AnimatedLine className="w-32 mt-2 mb-6" />
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] mb-8 leading-tight">
                <TextReveal text="Bodhini NextGen Foundation" delay={0.2} />
              </h2>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-5 text-[#0F1F1F]/70 font-[family-name:var(--font-inter)] text-base leading-[1.8]">
                <p>
                  We are an education-focused non-profit that helps students discover who they are — before deciding what they want to become.
                </p>
                <p>
                  We do this through scientifically designed psychometric assessments, structured personal journaling, and one-on-one career guidance.
                </p>
                <motion.blockquote
                  className="relative pl-6 py-3 italic text-[#0F1F1F]/80 font-medium"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div
                    className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#0D4F4F] to-[#E8705A] rounded-full"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ transformOrigin: 'top' }}
                  />
                  Our belief: Every student has hidden strengths. Our job is to help them find it.
                </motion.blockquote>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-10">
                <Button variant="secondary" size="md" href="#mission" magnetic>
                  Read Our Mission →
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Right — 3D Tilt Icon Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ perspective: '1000px' }}>
            {iconCards.map((card, i) => (
              <FadeIn key={card.title} delay={0.15 + i * 0.12} direction={i < 2 ? 'left' : 'right'}>
                <TiltCard className="h-full" intensity={12}>
                  <motion.div
                    className="group relative bg-white rounded-3xl p-7 shadow-sm border border-gray-100/80 hover:shadow-2xl transition-shadow duration-500 cursor-default overflow-hidden h-full"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {/* Animated gradient border glow on hover */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `0 0 25px ${card.color}25, 0 0 50px ${card.color}10` }}
                    />

                    {/* Top accent line that draws in */}
                    <motion.div
                      className="absolute top-0 left-0 h-1 rounded-t-3xl"
                      style={{ backgroundColor: card.color }}
                      initial={{ width: '0%' }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Icon with bg pulse */}
                    <motion.div
                      className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                      style={{ backgroundColor: `${card.color}12` }}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                    >
                      {card.icon}
                      {/* Pulse ring on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100"
                        style={{ borderColor: card.color }}
                        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>

                    <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0F1F1F] text-base mb-2">
                      {card.title}
                    </h4>
                    <p className="font-[family-name:var(--font-inter)] text-sm text-[#0F1F1F]/55 leading-relaxed">
                      {card.desc}
                    </p>
                  </motion.div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 3 — FOUNDER (Reveal + Orbit Ring)
   ═══════════════════════════════════════════════════ */
function AboutFounder() {
  const highlights = [
    { emoji: '⭐', text: '6+ Yrs IT Experience' },
    { emoji: '📚', text: '5+ Yrs in Education' },
    { emoji: '🎯', text: 'Certified Career Coach' },
  ];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={sectionRef} className="py-28 bg-white relative overflow-hidden">
      {/* Floating accent blob */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-[180px] bg-[#E8705A]/8 pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container>
        <FadeIn>
          <span className="text-[#E8705A] font-[family-name:var(--font-sora)] text-sm font-bold uppercase tracking-[0.2em]">
            Our Founder
          </span>
          <AnimatedLine className="w-28 mt-2" />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-12">
          {/* Left — Photo with orbital decoration */}
          <FadeIn direction="right">
            <div className="relative flex justify-center lg:justify-start">
              {/* Orbit ring decoration */}
              <motion.div
                className="absolute w-[340px] h-[340px] md:w-[380px] md:h-[380px] rounded-full border-2 border-dashed border-[#E8705A]/20 pointer-events-none"
                style={{ rotate: decorRotate }}
              />
              {/* Second orbit ring */}
              <motion.div
                className="absolute w-[380px] h-[380px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-[#0D4F4F]/10 pointer-events-none"
                style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
              />
              {/* Orbiting dots */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-[#E8705A] shadow-lg shadow-[#E8705A]/50"
                style={{
                  rotate: decorRotate,
                  x: 170,
                }}
              />

              {/* Main photo */}
              <TiltCard intensity={8}>
                <motion.div
                  className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                >
                  {/* Animated border with gradient */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#FF9933] via-[#E8705A] to-[#0D4F4F] animate-[spin_8s_linear_infinite] z-0" />
                  <div className="absolute inset-[3px] rounded-full overflow-hidden z-10 bg-white">
                    <Image src="/images/about/founder.jpg" alt="Founder" fill className="object-cover" sizes="320px" />
                  </div>
                </motion.div>
              </TiltCard>

              {/* Floating name badge */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="absolute -bottom-2 right-4 lg:right-0 bg-[#0D4F4F] text-white px-6 py-4 rounded-2xl shadow-xl shadow-[#0D4F4F]/30 z-20"
              >
                <p className="font-[family-name:var(--font-sora)] font-bold text-sm">Founder Name</p>
                <p className="font-[family-name:var(--font-inter)] text-xs text-white/60 mt-0.5">Founder & Director, BNF</p>
              </motion.div>
            </div>
          </FadeIn>

          {/* Right — Content */}
          <div>
            <FadeIn delay={0.1}>
              <motion.span
                className="inline-block bg-[#FF9933] text-white text-xs font-bold px-4 py-1.5 rounded-full font-[family-name:var(--font-inter)] mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Founder & Director
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] mb-6">
                <TextReveal text="Founder Name" delay={0.2} />
              </h2>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-4 text-[#0F1F1F]/70 font-[family-name:var(--font-inter)] text-base leading-[1.8]">
                <p>
                  With 6+ years in IT project management and 5+ years in education, our founder saw a recurring problem — students graduating without knowing their own strengths.
                </p>
                <p>
                  This insight led to the creation of BNF, a platform combining psychology, journaling and career science to guide every student&apos;s journey.
                </p>
              </div>
            </FadeIn>

            {/* Highlight chips with staggered bounce-in */}
            <div className="flex flex-wrap gap-3 mt-8">
              {highlights.map((h, i) => (
                <motion.span
                  key={h.text}
                  className="inline-flex items-center gap-2 bg-[#FAFAF7] border border-gray-200 text-[#0F1F1F]/80 text-sm font-medium px-5 py-2.5 rounded-full font-[family-name:var(--font-inter)] hover:border-[#0D4F4F]/40 hover:shadow-md transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  <span className="text-base">{h.emoji}</span> {h.text}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 4 — TEAM BNF (Core Team + Advisory + Interns + Volunteers)
   ═══════════════════════════════════════════════════ */

// --- Core Team Sub-Section ---
function CoreTeam() {
  const members = [
    {
      name: 'Founder Name',
      role: 'Founder & Director',
      bio: 'IT + Education expert. Vision behind BNF.',
      color: '#FF9933',
      borderColor: '#FF9933',
      chipBg: '#FF9933',
      chipText: 'navy',
    },
    {
      name: 'Team Member',
      role: 'Psychometric Head',
      bio: 'Designs & evaluates all assessment models.',
      color: '#0D4F4F',
      borderColor: '#0D4F4F',
      chipBg: '#0D4F4F',
      chipText: 'white',
    },
    {
      name: 'Team Member',
      role: 'Operations Manager',
      bio: 'Keeps programs running smoothly.',
      color: '#FF9933',
      borderColor: '#FF9933',
      chipBg: '#FF9933',
      chipText: 'navy',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="mb-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-[2px] bg-[#E8705A]" />
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]">
            Core Team
          </h3>
        </div>
      </FadeIn>

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7" style={{ perspective: '1000px' }}>
        {members.map((m, i) => (
          <motion.div
            key={m.name + i}
            initial={{ opacity: 0, y: 60, rotateX: 20 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 * i, type: 'spring', stiffness: 100, damping: 18 }}
          >
            <TiltCard className="h-full" intensity={10}>
              <motion.div
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-500 overflow-hidden h-full flex flex-col items-center text-center cursor-default"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Photo circle */}
                <motion.div
                  className="relative w-[120px] h-[120px] rounded-full overflow-hidden mb-5 shadow-lg"
                  style={{ border: `3px solid ${m.borderColor}` }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold font-[family-name:var(--font-sora)] text-white" style={{ backgroundColor: m.color }}>
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100"
                    style={{ borderColor: m.borderColor }}
                    animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>

                {/* Name */}
                <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] text-lg mb-2">
                  {m.name}
                </h4>

                {/* Role chip */}
                <span
                  className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4 font-[family-name:var(--font-inter)]"
                  style={{ backgroundColor: m.chipBg, color: m.chipText === 'navy' ? '#0F1F1F' : '#ffffff' }}
                >
                  {m.role}
                </span>

                {/* Bio */}
                <p className="font-[family-name:var(--font-inter)] text-sm text-[#0F1F1F]/55 leading-relaxed flex-grow">
                  {m.bio}
                </p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 0 30px ${m.color}20, 0 0 60px ${m.color}10` }}
                />
              </motion.div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Advisory Board Sub-Section ---
function AdvisoryBoard() {
  const advisors = [
    {
      name: 'Advisor Name',
      domain: 'Education Expert',
      quote: 'Self-awareness is the foundation of every great career decision.',
      borderColor: '#FF9933',
    },
    {
      name: 'Advisor Name',
      domain: 'Industry Professional',
      quote: 'BNF bridges the gap that traditional education never addressed.',
      borderColor: '#0D4F4F',
    },
    {
      name: 'Advisor Name',
      domain: 'Psychologist',
      quote: 'Psychometric tools in schools can change how we see students.',
      borderColor: '#138808',
    },
    {
      name: 'Advisor Name',
      domain: 'Policy Specialist',
      quote: 'Aligned with NEP 2020, BNF is the model India needs.',
      borderColor: '#FF9933',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div className="mb-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-[2px] bg-[#5BB8D4]" />
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]">
            Advisory Board
          </h3>
        </div>
      </FadeIn>

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {advisors.map((a, i) => (
          <motion.div
            key={a.domain + i}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="group relative bg-white rounded-2xl p-6 h-full flex flex-col cursor-default overflow-hidden hover:shadow-xl transition-shadow duration-500"
              style={{ borderLeft: `4px solid ${a.borderColor}` }}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ backgroundColor: `${a.borderColor}12` }}
              >
                💡
              </div>

              <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0F1F1F] text-base mb-1">
                {a.name}
              </h4>
              <span className="text-xs font-medium text-[#0F1F1F]/50 font-[family-name:var(--font-inter)] mb-4">
                {a.domain}
              </span>

              <p className="font-[family-name:var(--font-inter)] text-sm text-[#0F1F1F]/65 italic leading-relaxed flex-grow">
                &ldquo;{a.quote}&rdquo;
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 25px ${a.borderColor}12` }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Interns Sub-Section ---
function Interns() {
  const interns = [
    { name: 'Intern 1', dept: 'Research' },
    { name: 'Intern 2', dept: 'Design' },
    { name: 'Intern 3', dept: 'Content' },
    { name: 'Intern 4', dept: 'Tech' },
    { name: 'Intern 5', dept: 'Outreach' },
    { name: 'Intern 6', dept: 'Events' },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div className="mb-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-[2px] bg-[#0D4F4F]" />
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]">
            Interns
          </h3>
        </div>
      </FadeIn>

      <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {interns.map((intern, i) => (
          <motion.div
            key={intern.name}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.08 * i, type: 'spring', stiffness: 150 }}
          >
            <motion.div
              className="group bg-white rounded-2xl p-5 text-center border border-gray-100 hover:shadow-lg transition-shadow duration-400 cursor-default h-full flex flex-col items-center"
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Small avatar */}
              <motion.div
                className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#0D4F4F] to-[#5BB8D4] flex items-center justify-center text-white text-lg font-bold font-[family-name:var(--font-sora)] mb-4 shadow-md"
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {intern.name.replace('Intern ', 'I')}
              </motion.div>

              <p className="font-[family-name:var(--font-sora)] font-bold text-[#0F1F1F] text-sm mb-2">
                {intern.name}
              </p>

              <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full bg-[#138808]/10 text-[#138808] font-[family-name:var(--font-inter)] uppercase tracking-wider">
                {intern.dept}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Volunteers Sub-Section ---
function Volunteers() {
  const volunteers = [
    { name: 'Volunteer Name', city: 'Indore', role: 'Event Coordinator' },
    { name: 'Volunteer Name', city: 'Bhopal', role: 'Content Writer' },
    { name: 'Volunteer Name', city: 'Mumbai', role: 'Social Media' },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div>
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-[2px] bg-[#E8705A]" />
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]">
            Volunteers
          </h3>
        </div>
      </FadeIn>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {volunteers.map((v, i) => (
          <motion.div
            key={v.role + i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="group bg-white rounded-2xl px-6 py-5 border border-gray-100 hover:shadow-xl transition-shadow duration-400 cursor-default flex items-center gap-5 overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Avatar */}
              <motion.div
                className="shrink-0 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#E8705A] to-[#FF9933] flex items-center justify-center text-white text-lg font-bold font-[family-name:var(--font-sora)] shadow-md"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {v.name.split(' ').map(n => n[0]).join('')}
              </motion.div>

              <div className="flex-grow min-w-0">
                <p className="font-[family-name:var(--font-sora)] font-bold text-[#0F1F1F] text-sm">
                  {v.name}
                </p>
                <p className="font-[family-name:var(--font-inter)] text-xs text-[#0F1F1F]/50 mt-0.5">
                  City: {v.city} | Role: {v.role}
                </p>
              </div>

              {/* Volunteer tag */}
              <span className="shrink-0 text-[10px] font-bold px-3 py-1.5 rounded-full bg-[#FF9933]/15 text-[#FF9933] font-[family-name:var(--font-inter)] uppercase tracking-wider">
                Volunteer
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Main Team BNF Section ---
function TeamBNF() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section id="team" ref={ref} className="relative overflow-hidden scroll-mt-20">
      {/* Team Hero Banner */}
      <div className="relative py-20 bg-[#0D4F4F] overflow-hidden">
        <Particles count={25} color="rgba(255,255,255,0.3)" />
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-[150px] bg-[#E8705A]/20 pointer-events-none"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '10%', right: '5%' }}
        />
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-sora)] font-bold text-white mb-4">
              <TextReveal text="Meet Our Team" delay={0.1} />
            </h2>
            <p className="text-white/60 font-[family-name:var(--font-inter)] text-lg max-w-2xl mx-auto mb-10">
              A passionate group of educators, mentors & changemakers working to transform student lives.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-10"
          >
            {[
              { num: '20', suffix: '+', label: 'Team Members' },
              { num: '10', suffix: '+', label: 'Mentors' },
              { num: '50', suffix: '+', label: 'Volunteers' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-3xl font-[family-name:var(--font-sora)] font-bold text-white">
                  <AnimatedCounter target={s.num} suffix={s.suffix} duration={1.5} />
                </span>
                <span className="block text-xs text-white/45 font-[family-name:var(--font-inter)] mt-1 uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </Container>
      </div>

      {/* Team Content */}
      <div className="py-24 bg-[#FAFAF7]">
        <Container>
          <CoreTeam />
          <AdvisoryBoard />
          <Interns />
          <Volunteers />
        </Container>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 5 — SDG ALIGNMENT (3D Perspective Cards)
   ═══════════════════════════════════════════════════ */
function SDGAlignment() {
  const sdgs = [
    { number: 3, title: 'Good Health & Well-Being', desc: 'Mental health support & journaling for student wellness', color: '#4C9F38', icon: '💚' },
    { number: 4, title: 'Quality Education', desc: 'Skill-based learning aligned with NEP 2020 & career readiness', color: '#C5192D', icon: '📖' },
    { number: 8, title: 'Decent Work & Economic Growth', desc: 'Training, placement support & industry connections', color: '#A21942', icon: '💼' },
    { number: 9, title: 'Industry, Innovation', desc: 'Startup support, R&D ecosystem & technical services', color: '#FD6925', icon: '🚀' },
    { number: 17, title: 'Partnerships for Goals', desc: '100+ universities & startups for collaboration', color: '#19486A', icon: '🤝' },
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <Particles count={15} color="#5BB8D4" />

      <Container>
        <div className="text-center mb-20">
          <FadeIn>
            <span className="text-[#5BB8D4] font-[family-name:var(--font-sora)] text-sm font-bold uppercase tracking-[0.2em]">
              SDG Alignment
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] mt-4 mb-5">
              <TextReveal text="Our Work Aligns with Global Goals" delay={0.2} />
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[#0F1F1F]/55 font-[family-name:var(--font-inter)] max-w-2xl mx-auto text-base">
              BNF contributes to 5 United Nations Sustainable Development Goals
            </p>
          </FadeIn>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" style={{ perspective: '1200px' }}>
          {sdgs.map((sdg, i) => (
            <motion.div
              key={sdg.number}
              initial={{ opacity: 0, rotateY: 90, z: -200 }}
              animate={isInView ? { opacity: 1, rotateY: 0, z: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 * i,
                type: 'spring',
                stiffness: 80,
                damping: 15,
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <TiltCard intensity={10}>
                <motion.div
                  className="group relative bg-white rounded-3xl p-7 text-center border border-gray-100/80 shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-default overflow-hidden h-full flex flex-col"
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Top color bar */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1.5 rounded-t-3xl"
                    style={{ backgroundColor: sdg.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-5"
                    style={{ backgroundColor: `${sdg.color}12` }}
                    whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {sdg.icon}
                  </motion.div>

                  {/* SDG Number */}
                  <motion.span
                    className="inline-block text-xs font-bold uppercase tracking-wider font-[family-name:var(--font-sora)] px-3 py-1 rounded-full mb-3"
                    style={{ color: sdg.color, backgroundColor: `${sdg.color}12` }}
                    whileHover={{ scale: 1.1 }}
                  >
                    SDG {sdg.number}
                  </motion.span>

                  <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0F1F1F] text-sm mt-2 mb-3 leading-snug">
                    {sdg.title}
                  </h4>
                  <p className="font-[family-name:var(--font-inter)] text-xs text-[#0F1F1F]/50 leading-relaxed flex-grow">
                    {sdg.desc}
                  </p>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `0 0 40px ${sdg.color}15, 0 0 80px ${sdg.color}08` }}
                  />
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 6 — CTA BANNER (Premium Gradient + Particles)
   ═══════════════════════════════════════════════════ */
function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D4F4F] via-[#0A3A3A] to-[#0F1F1F]" />

      {/* Animated mesh overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      {/* Particles */}
      <Particles count={20} color="rgba(232,112,90,0.5)" />

      {/* Glow orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-[120px] bg-[#E8705A]/15 pointer-events-none"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-20%', right: '5%' }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full blur-[100px] bg-[#5BB8D4]/15 pointer-events-none"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '-15%', left: '5%' }}
      />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-[family-name:var(--font-sora)] font-bold text-white mb-8 leading-tight">
              <TextReveal text="Want to Know More About Our Work?" delay={0.1} />
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-white/60 font-[family-name:var(--font-inter)] text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Explore our brochure or get in touch with our team to learn how we&apos;re shaping the future.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <motion.a
                href="#"
                className="group relative inline-flex items-center gap-3 bg-[#E8705A] text-white px-9 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base shadow-xl shadow-[#E8705A]/30 overflow-hidden"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="relative z-10">Download Brochure</span>
              </motion.a>

              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white/25 text-white px-9 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Us →
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   MAIN ABOUT PAGE
   ═══════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutBNF />
        <AboutFounder />
        <TeamBNF />
        <SDGAlignment />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}

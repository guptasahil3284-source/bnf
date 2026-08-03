'use client';

import React, { useRef, useState, useCallback } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
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

function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
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

function TiltCard({ children, className = '', intensity = 12 }) {
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
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d', perspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

function Particles({ count = 25, color = 'rgba(255,255,255,0.4)' }) {
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
          animate={{ opacity: [0, 0.6, 0], y: [0, -35, 0] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}


/* ═══════════════════════════════════════════════════
   ENQUIRY MODAL COMPONENT
   ═══════════════════════════════════════════════════ */
function EnquiryModal({ isOpen, onClose, programType = 'School' }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', org: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Dialog */}
        <motion.div
          className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl z-10 border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Header bar accent */}
          <div
            className="absolute top-0 left-0 w-full h-2"
            style={{ backgroundColor: programType === 'School' ? '#138808' : '#E8705A' }}
          />

          <div className="flex justify-between items-center mb-6">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{
                  backgroundColor: programType === 'School' ? '#13880815' : '#E8705A15',
                  color: programType === 'School' ? '#138808' : '#E8705A',
                }}
              >
                {programType} Program Enquiry
              </span>
              <h3 className="text-2xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] mt-2">
                Get Started with BNF
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
                ✓
              </div>
              <h4 className="text-xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]">
                Enquiry Submitted!
              </h4>
              <p className="text-sm text-gray-600 mt-2 font-[family-name:var(--font-inter)]">
                Our program coordinator will reach out to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Principal Sharma / Prof. Verma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0D4F4F] transition-colors text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="email@institution.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0D4F4F] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0D4F4F] transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  School / College / Organization Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. St. Xavier School / Delhi University"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0D4F4F] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Message (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about student count, location or specific needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0D4F4F] transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl text-white font-[family-name:var(--font-sora)] font-bold text-base shadow-lg transition-all"
                style={{ backgroundColor: programType === 'School' ? '#138808' : '#E8705A' }}
              >
                Submit {programType} Enquiry →
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 1 — PROGRAMS HERO
   ═══════════════════════════════════════════════════ */
function ProgramsHero({ activeTab, setActiveTab }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const ageGroups = [
    { label: '6–12 yrs', target: 'school-program' },
    { label: '13–18 yrs', target: 'school-program' },
    { label: '19–22 yrs', target: 'college-program' },
    { label: '23+ yrs', target: 'college-program' },
  ];

  return (
    <section ref={ref} className="relative py-28 bg-[#0D4F4F] text-white overflow-hidden min-h-[560px] flex items-center">
      {/* Background gradient mesh */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D4F4F] via-[#0A3A3A] to-[#0F1F1F]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-[#E8705A]/20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[140px] bg-[#5BB8D4]/20 pointer-events-none" />
      </motion.div>

      <Particles count={30} color="rgba(255,255,255,0.3)" />

      <Container className="relative z-10 text-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-8"
        >
          <span className="text-sm font-medium text-white/90 font-[family-name:var(--font-inter)]">
            🚀 Structured Learning for Every Stage
          </span>
        </motion.div>

        {/* H1 Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-sora)] font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
          <TextReveal text="Programs Designed for Real Growth" delay={0.2} />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg md:text-xl text-[#DEE2E6] font-[family-name:var(--font-inter)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          From classroom to career — we guide students at every stage of their journey.
        </motion.p>

        {/* Filter Tabs (Pill Buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="inline-flex p-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 gap-2 mb-10 flex-wrap justify-center"
        >
          {[
            { id: 'all', label: '⚡ All Programs' },
            { id: 'school', label: '🏫 School Students (Classes 6–12)' },
            { id: 'college', label: '🎓 College Students (UG / PG)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'school') {
                  document.getElementById('school-program')?.scrollIntoView({ behavior: 'smooth' });
                } else if (tab.id === 'college') {
                  document.getElementById('college-program')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`relative px-6 py-3 rounded-full text-xs sm:text-sm font-bold font-[family-name:var(--font-sora)] transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#E8705A] text-white shadow-lg shadow-[#E8705A]/30'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Age Group Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-xs text-white/50 font-[family-name:var(--font-inter)] uppercase tracking-wider mr-2">
            Target Age Groups:
          </span>
          {ageGroups.map((g) => (
            <motion.button
              key={g.label}
              whileHover={{ scale: 1.05 }}
              onClick={() => document.getElementById(g.target)?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-1.5 rounded-full text-xs text-white/90 font-medium font-[family-name:var(--font-inter)] transition-colors"
            >
              {g.label}
            </motion.button>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 2 — SCHOOL PROGRAM
   ═══════════════════════════════════════════════════ */
function SchoolProgram({ onEnquire }) {
  const checklist = [
    'Psychometric Assessment (Baseline + Annual)',
    'Personalised Journaling Kit',
    'Emotional & Mental Development Sessions',
    'Habit Building Workshops',
    'Parent & Teacher Report Cards',
  ];

  const featureCards = [
    {
      icon: '🧠',
      title: 'Psychometric Testing',
      desc: 'Understand personality, interests & learning styles early.',
      borderColor: '#FF9933',
    },
    {
      icon: '📓',
      title: 'Journaling Kit',
      desc: "Custom journal tailored to the student's psychometric profile.",
      borderColor: '#138808',
    },
    {
      icon: '💬',
      title: 'Soft Skills Sessions',
      desc: 'Communication, teamwork, leadership — from Day 1.',
      borderColor: '#0D4F4F',
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      desc: 'Monthly score cards & comparative growth reports.',
      borderColor: '#FF9933',
    },
  ];

  return (
    <section id="school-program" className="py-28 bg-white relative overflow-hidden scroll-mt-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Text — 6 cols */}
          <div className="lg:col-span-6">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-[#138808]/10 px-4 py-1.5 rounded-full border border-[#138808]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#138808] animate-ping" />
                <span className="text-xs font-bold text-[#138808] uppercase tracking-wider font-[family-name:var(--font-sora)]">
                  🏫 FOR SCHOOL STUDENTS (Classes 6–12)
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] mb-6 leading-tight">
                <TextReveal text="Build the Foundation Early" delay={0.1} />
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-[#0F1F1F]/70 font-[family-name:var(--font-inter)] leading-relaxed mb-8">
                Our school program uses scientifically designed psychometric tests to understand each child&apos;s learning style, personality and strengths early.
              </p>
            </FadeIn>

            {/* Checklist */}
            <FadeIn delay={0.3}>
              <div className="mb-10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4F4F] font-[family-name:var(--font-sora)] mb-4">
                  What&apos;s Included:
                </h4>
                <ul className="space-y-3">
                  {checklist.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      className="flex items-center gap-3 text-sm text-[#0F1F1F]/80 font-[family-name:var(--font-inter)] font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#138808]/15 text-[#138808] flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Enquire Button */}
            <FadeIn delay={0.5}>
              <motion.button
                onClick={() => onEnquire('School')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-[#138808] text-white px-8 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base shadow-xl shadow-[#138808]/25 hover:bg-[#0f6f06] transition-colors"
              >
                Enquire for Schools →
              </motion.button>
            </FadeIn>
          </div>

          {/* Right Cards Stack — 6 cols */}
          <div className="lg:col-span-6 space-y-4">
            {featureCards.map((card, i) => (
              <FadeIn key={card.title} delay={0.15 * i} direction="left">
                <TiltCard intensity={8}>
                  <motion.div
                    className="group relative bg-[#FAFAF7] rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-400 cursor-default flex items-start gap-5 overflow-hidden"
                    style={{ borderLeft: `5px solid ${card.borderColor}` }}
                    whileHover={{ x: 6 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${card.borderColor}15` }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0F1F1F] text-base mb-1">
                        {card.title}
                      </h4>
                      <p className="font-[family-name:var(--font-inter)] text-sm text-[#0F1F1F]/60 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{ boxShadow: `0 0 30px ${card.borderColor}15` }}
                    />
                  </motion.div>
                </TiltCard>
              </FadeIn>
            ))}

            {/* School Hero Image banner card */}
            <FadeIn delay={0.6}>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg border border-gray-200 mt-6">
                <Image
                  src="/images/programs/school-hero.jpg"
                  alt="School Students Program"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-5">
                  <span className="text-white font-[family-name:var(--font-sora)] text-sm font-bold">
                    🎓 Transforming Classroom Learning into Future Readiness
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 3 — COLLEGE PROGRAM (Mirror Layout)
   ═══════════════════════════════════════════════════ */
function CollegeProgram({ onEnquire }) {
  const checklist = [
    'Advanced Psychometric Report',
    'Career-Oriented Personal Journal',
    'Resume + LinkedIn Profile Support',
    'Mock Interview & Soft Skills Training',
    'Internship & Placement Assistance',
    'Entrepreneurship & Startup Guidance',
  ];

  const featureCards = [
    {
      icon: '🔬',
      title: 'Advanced Psychometrics',
      desc: 'Deeper personality, aptitude & career aptitude analysis.',
      borderColor: '#FF9933',
    },
    {
      icon: '📝',
      title: 'Career Journaling',
      desc: 'Goal-oriented journaling aligned to career aspirations.',
      borderColor: '#138808',
    },
    {
      icon: '🎯',
      title: 'Placement Readiness',
      desc: 'Resume building, mock interviews & industry exposure.',
      borderColor: '#0D4F4F',
    },
    {
      icon: '🚀',
      title: 'Entrepreneurship Track',
      desc: 'For students who want to start something of their own.',
      borderColor: '#FF9933',
    },
  ];

  return (
    <section id="college-program" className="py-28 bg-[#FAFAF7] relative overflow-hidden scroll-mt-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Cards Stack (Mirror Layout) — 6 cols */}
          <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
            {featureCards.map((card, i) => (
              <FadeIn key={card.title} delay={0.15 * i} direction="right">
                <TiltCard intensity={8}>
                  <motion.div
                    className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-400 cursor-default flex items-start gap-5 overflow-hidden"
                    style={{ borderLeft: `5px solid ${card.borderColor}` }}
                    whileHover={{ x: -6 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${card.borderColor}15` }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0F1F1F] text-base mb-1">
                        {card.title}
                      </h4>
                      <p className="font-[family-name:var(--font-inter)] text-sm text-[#0F1F1F]/60 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{ boxShadow: `0 0 30px ${card.borderColor}15` }}
                    />
                  </motion.div>
                </TiltCard>
              </FadeIn>
            ))}

            {/* College Hero Image banner card */}
            <FadeIn delay={0.6}>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg border border-gray-200 mt-6">
                <Image
                  src="/images/programs/college-hero.jpg"
                  alt="College Students Program"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-5">
                  <span className="text-white font-[family-name:var(--font-sora)] text-sm font-bold">
                    🏛️ Bridging University Education with Industry Placement
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Text (Mirror Layout) — 6 cols */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-[#E8705A]/10 px-4 py-1.5 rounded-full border border-[#E8705A]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#E8705A] animate-ping" />
                <span className="text-xs font-bold text-[#E8705A] uppercase tracking-wider font-[family-name:var(--font-sora)]">
                  🎓 FOR COLLEGE STUDENTS (UG / PG)
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] mb-6 leading-tight">
                <TextReveal text="Go Deeper. Go Further." delay={0.1} />
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-[#0F1F1F]/70 font-[family-name:var(--font-inter)] leading-relaxed mb-8">
                Our college program combines advanced psychometric profiling with career-focused journaling and direct industry connections.
              </p>
            </FadeIn>

            {/* Checklist */}
            <FadeIn delay={0.3}>
              <div className="mb-10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4F4F] font-[family-name:var(--font-sora)] mb-4">
                  What&apos;s Included:
                </h4>
                <ul className="space-y-3">
                  {checklist.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      className="flex items-center gap-3 text-sm text-[#0F1F1F]/80 font-[family-name:var(--font-inter)] font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#E8705A]/15 text-[#E8705A] flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Enquire Button */}
            <FadeIn delay={0.5}>
              <motion.button
                onClick={() => onEnquire('College')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-[#E8705A] text-white px-8 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base shadow-xl shadow-[#E8705A]/25 hover:bg-[#d4624e] transition-colors"
              >
                Enquire for Colleges →
              </motion.button>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 4 — NEP 2020 ALIGNMENT STRIP
   ═══════════════════════════════════════════════════ */
function NEPAlignmentStrip() {
  const chips = [
    { icon: '📜', label: 'NEP 2020 Compliant' },
    { icon: '🏛️', label: 'AICTE Framework Aligned' },
    { icon: '🌐', label: 'UNESCO Skills Guidance' },
  ];

  return (
    <section className="py-20 bg-[#0D4F4F] text-white relative overflow-hidden">
      <Particles count={20} color="rgba(255,153,51,0.4)" />

      <Container className="relative z-10 text-center max-w-4xl">
        <FadeIn>
          <span className="text-[#FF9933] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.2em]">
            National Policy Framework
          </span>
          <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-sora)] font-bold text-[#FF9933] mt-3 mb-4">
            <TextReveal text="Aligned with National Education Policy 2020" delay={0.1} />
          </h3>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-white/80 font-[family-name:var(--font-inter)] text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Our programs follow the NEP 2020 framework emphasizing holistic development, experiential learning, and skill-based education.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {chips.map((chip, i) => (
              <motion.div
                key={chip.label}
                whileHover={{ scale: 1.06, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 text-white text-sm font-semibold font-[family-name:var(--font-inter)] shadow-md"
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   SECTION 5 — CTA BANNER
   ═══════════════════════════════════════════════════ */
function ProgramsCTA({ onEnquire }) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1F1F] via-[#0D4F4F] to-[#0A3A3A]" />

      <Container className="relative z-10 text-center max-w-3xl">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-sora)] font-bold text-white mb-6 leading-tight">
            Ready to Bring BNF to Your Institution?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-white/70 font-[family-name:var(--font-inter)] text-lg mb-10 leading-relaxed">
            Partner with us to empower your students with psychometric insight, structured journaling, and career direction.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              onClick={() => onEnquire('School')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#138808] text-white px-8 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base shadow-xl shadow-[#138808]/30 hover:bg-[#0f6f06] transition-colors"
            >
              School Program Enquiry →
            </motion.button>
            <motion.button
              onClick={() => onEnquire('College')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#E8705A] text-white px-8 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base shadow-xl shadow-[#E8705A]/30 hover:bg-[#d4624e] transition-colors"
            >
              College Program Enquiry →
            </motion.button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   MAIN PROGRAMS PAGE
   ═══════════════════════════════════════════════════ */
export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState('School');

  const handleEnquire = (type) => {
    setEnquiryType(type);
    setModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <main>
        <ProgramsHero activeTab={activeTab} setActiveTab={setActiveTab} />
        {(activeTab === 'all' || activeTab === 'school') && (
          <SchoolProgram onEnquire={handleEnquire} />
        )}
        {(activeTab === 'all' || activeTab === 'college') && (
          <CollegeProgram onEnquire={handleEnquire} />
        )}
        <NEPAlignmentStrip />
        <ProgramsCTA onEnquire={handleEnquire} />
      </main>
      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        programType={enquiryType}
      />
    </>
  );
}

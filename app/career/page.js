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

/* ═══════════════════════════════════════════════════
   ANIMATION HELPER PRIMITIVES
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
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
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

function TiltCard({ children, className = '', intensity = 10 }) {
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
   FIXED PERFECT FIT APPLICATION FORM MODAL (Full Scrolling & Modern UI)
   ═══════════════════════════════════════════════════ */
function ApplicationModal({ isOpen, onClose, selectedRole = 'General Application' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: selectedRole,
    linkedin: '',
    whyJoin: '',
  });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
  }, [selectedRole]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {/* Fixed Full Page Scrollable Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Modal Inner Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative bg-white rounded-3xl p-6 sm:p-10 max-w-xl w-full shadow-2xl my-auto border-2 border-[#0D4F4F]/20 overflow-hidden text-left max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar Accent */}
          <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-[#0D4F4F] via-[#E8705A] to-[#FF9933]" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
            <div>
              <span className="text-[11px] font-extrabold text-[#E8705A] uppercase tracking-widest font-[family-name:var(--font-sora)] block">
                BNF Career Application
              </span>
              <h3 className="text-xl sm:text-2xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-0.5">
                Apply for {selectedRole}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold text-base shrink-0 shadow-sm"
            >
              ✕
            </button>
          </div>

          {/* Smooth Scrollable Form Content */}
          <div className="overflow-y-auto pt-5 pr-1 space-y-5 flex-grow font-[family-name:var(--font-inter)]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
                  ✓
                </div>
                <h4 className="text-2xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]">
                  Application Submitted!
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                  Thank you for applying. Our hiring team will review your application and respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Section 1: Personal Info */}
                <div className="space-y-4">
                  <span className="text-xs font-bold text-[#0D4F4F] uppercase tracking-wider block font-[family-name:var(--font-sora)] border-b pb-1">
                    1. Personal Details
                  </span>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm bg-gray-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm bg-gray-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Role & Motivation */}
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-bold text-[#0D4F4F] uppercase tracking-wider block font-[family-name:var(--font-sora)] border-b pb-1">
                    2. Role & Motivation
                  </span>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Role Applying For *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm bg-gray-50/50 focus:bg-white text-gray-800 cursor-pointer font-medium"
                    >
                      <option value="Psychometric Facilitator">Psychometric Facilitator (Education)</option>
                      <option value="Content & Curriculum Designer">Content & Curriculum Designer (Programs)</option>
                      <option value="Social Media & Outreach Manager">Social Media & Outreach Manager (Marketing)</option>
                      <option value="Student Counsellor">Student Counsellor (Guidance)</option>
                      <option value="Operations Coordinator">Operations Coordinator (Admin)</option>
                      <option value="General Application">General Application / Open Role</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      LinkedIn Profile / Portfolio Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Why do you want to join BNF? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us about your passion for student impact and experience..."
                      value={formData.whyJoin}
                      onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm bg-gray-50/50 focus:bg-white resize-none transition-colors"
                    />
                  </div>
                </div>

                {/* Section 3: Resume Upload */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-[#0D4F4F] uppercase tracking-wider block font-[family-name:var(--font-sora)] border-b pb-1">
                    3. Resume Attachment
                  </span>

                  <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-5 text-center hover:border-[#E8705A] transition-colors bg-[#FAFAF7] cursor-pointer group">
                    <input
                      type="file"
                      required={!file}
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="space-y-1">
                      <span className="text-3xl block group-hover:scale-110 transition-transform">📄</span>
                      <span className="text-xs font-bold text-[#0D4F4F] block font-[family-name:var(--font-sora)]">
                        {file ? `Selected: ${file.name}` : 'Click or Drag & Drop Resume PDF (max 5MB)'}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Supports PDF, DOC, DOCX
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-[#E8705A] text-white font-[family-name:var(--font-sora)] font-bold text-base shadow-xl hover:bg-[#d4624e] transition-colors"
                  >
                    Submit Application →
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


/* ═══════════════════════════════════════════════════
   1. ANIMATIVE CAREER HERO WITH FULL-BLEED BACKGROUND IMAGE
   ═══════════════════════════════════════════════════ */
function CareerHero({ onApply }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  const bottomStrip = [
    '🌟 Purpose-Driven Work',
    '👥 Collaborative Culture',
    '🤝 Grow With Us',
    '🏡 Flexible & Hybrid Work',
  ];

  return (
    <section ref={ref} className="relative py-36 bg-[#0F1F1F] text-white overflow-hidden min-h-[780px] flex items-center pt-36">
      {/* Full-Bleed Animated Hero Background Image */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/career/team-culture.jpg"
          alt="BNF Team Culture Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105"
        />

        {/* Invert Dark Gradient Overlays for High Contrast & Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1F1F]/95 via-[#0D4F4F]/85 to-[#0F1F1F]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F1F] via-transparent to-[#0F1F1F]/70" />
      </motion.div>

      {/* Floating Animated Orbs */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-10 w-[550px] h-[550px] rounded-full blur-[150px] bg-[#E8705A]/25 pointer-events-none z-1"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full blur-[140px] bg-[#5BB8D4]/25 pointer-events-none z-1"
      />

      <Particles count={35} color="rgba(255,255,255,0.4)" />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <FadeIn>
            <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 mb-8 shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933] animate-ping" />
              <span className="text-xs font-bold text-white uppercase tracking-widest font-[family-name:var(--font-sora)]">
                Careers at BNF Foundation
              </span>
            </div>
          </FadeIn>

          {/* H1 Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-sora)] font-extrabold text-white mb-8 leading-[1.08] tracking-tight drop-shadow-lg">
            <TextReveal text="Join a Team That Changes Lives" delay={0.2} />
          </h1>

          {/* Subtitle */}
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-white/90 font-[family-name:var(--font-inter)] leading-relaxed mb-12 max-w-3xl drop-shadow-md">
              At BNF, every role has a clear purpose. Come be part of the movement to transform student futures through scientifically backed psychometric guidance.
            </p>
          </FadeIn>

          {/* Hero Action Buttons */}
          <FadeIn delay={0.6}>
            <div className="flex flex-wrap items-center gap-5 mb-14">
              <motion.a
                href="#open-roles"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#E8705A] text-white px-9 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base shadow-2xl hover:bg-[#d4624e] transition-colors"
              >
                View Open Roles →
              </motion.a>

              <motion.button
                onClick={() => onApply('General Application')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/15 border-2 border-white/30 text-white px-9 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base hover:bg-white/25 transition-colors backdrop-blur-md"
              >
                Submit Your CV 📄
              </motion.button>
            </div>
          </FadeIn>

          {/* Bottom Strip Chips */}
          <FadeIn delay={0.8}>
            <div className="flex flex-wrap items-center gap-3.5">
              {bottomStrip.map((chip) => (
                <motion.span
                  key={chip}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="bg-white/15 backdrop-blur-xl border border-white/30 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white font-[family-name:var(--font-inter)] shadow-xl hover:bg-white/25 transition-all"
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   2. UNIQUE INTERACTIVE FEATURE SPOTLIGHT: WHY JOIN BNF (No Box Cards!)
   ═══════════════════════════════════════════════════ */
function WhyJoinBNF() {
  const [activeIdx, setActiveIdx] = useState(0);

  const pillars = [
    {
      id: 'meaningful',
      num: '01',
      icon: '🌟',
      title: 'Meaningful Purpose-Driven Work',
      tagline: 'Direct Impact on Student Futures',
      desc: 'What you do every single day directly impacts a student’s self-confidence and career trajectory. Zero corporate bureaucracy — just real workshops, direct mentorship, and measurable student transformation.',
      highlights: ['No Corporate Red Tape', 'Direct Student Interaction', 'Measurable Social Outcome'],
      accent: '#E8705A',
    },
    {
      id: 'growth',
      num: '02',
      icon: '📚',
      title: 'Continuous Learning & Growth',
      tagline: 'Expand Your Leadership & Skills',
      desc: 'We invest heavily in our team’s personal evolution. Access expert workshops, executive mentorship, and a work culture where curiosity is celebrated from Day 1.',
      highlights: ['Executive Mentorship', 'Skill Development Budget', 'Continuous Training Workshops'],
      accent: '#138808',
    },
    {
      id: 'culture',
      num: '03',
      icon: '🤝',
      title: 'High-Trust Collaborative Culture',
      tagline: 'Your Ideas Matter & Get Built',
      desc: 'A close-knit team with big national ambitions. Your voice will actually be heard, tested, and acted upon without endless approval loops.',
      accent: '#0D4F4F',
      highlights: ['High Autonomy & Ownership', 'Open Communication', 'Cross-Functional Exposure'],
    },
    {
      id: 'flexibility',
      num: '04',
      icon: '🏡',
      title: 'Flexible & Hybrid Workplace',
      tagline: 'Results & Impact Over Logged Hours',
      desc: 'Work from our Indore headquarters or remotely from anywhere in India. We care about real student outcomes and creative execution, not rigid desk hours.',
      accent: '#5BB8D4',
      highlights: ['Indore Office + Remote Options', 'Work-Life Balance Priority', 'Outcome-Focused Culture'],
    },
  ];

  const current = pillars[activeIdx];

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Our Work Environment
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              <TextReveal text="Why Join BNF?" delay={0.1} />
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-lg">
              Click through our core culture pillars below to explore what makes working at BNF unique.
            </p>
          </FadeIn>
        </div>

        {/* 4 Interactive Selector Tabs (No Cards!) */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap border-b border-gray-200 pb-6">
          {pillars.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIdx(i)}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold font-[family-name:var(--font-sora)] transition-all ${
                activeIdx === i
                  ? 'bg-[#0D4F4F] text-white shadow-lg scale-102'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {p.icon} {p.num}. {p.title.split(' ')[0]} {p.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Interactive Feature Spotlight Display (Large Editorial Layout - No Card Enclosures!) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6"
          >
            {/* Left Accent Column */}
            <div className="lg:col-span-7 space-y-6 border-l-4 pl-8 sm:pl-12" style={{ borderColor: current.accent }}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{current.icon}</span>
                <span
                  className="text-xs font-extrabold uppercase tracking-widest font-[family-name:var(--font-sora)]"
                  style={{ color: current.accent }}
                >
                  PILLAR {current.num} • {current.tagline}
                </span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] leading-tight">
                {current.title}
              </h3>

              <p className="text-base sm:text-lg text-[#0F1F1F]/75 font-[family-name:var(--font-inter)] leading-relaxed">
                {current.desc}
              </p>

              {/* Highlights List */}
              <div className="pt-4 flex flex-wrap gap-3">
                {current.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-[family-name:var(--font-inter)] border"
                    style={{ backgroundColor: `${current.accent}12`, borderColor: `${current.accent}30`, color: current.accent }}
                  >
                    <span>✓</span>
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right Large Numerical Accent Column */}
            <div className="lg:col-span-5 text-center lg:text-right">
              <span
                className="text-[120px] sm:text-[180px] font-[family-name:var(--font-sora)] font-extrabold opacity-25 leading-none block select-none pointer-events-none"
                style={{ color: current.accent }}
              >
                {current.num}
              </span>
              <span className="text-sm font-semibold text-gray-500 font-[family-name:var(--font-inter)] block -mt-6">
                BNF Culture Pillar
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   3. OPEN ROLES SECTION WITH INTERACTIVE DEPARTMENT FILTERING & ACCORDION DETAILS
   ═══════════════════════════════════════════════════ */
function OpenRolesSection({ onApply }) {
  const [activeDept, setActiveDept] = useState('all');
  const [expandedRole, setExpandedRole] = useState(null);

  const roles = [
    {
      id: 'facilitator',
      title: 'Psychometric Facilitator',
      dept: 'education',
      deptLabel: 'Education',
      type: 'Full-time',
      location: 'Indore / Hybrid',
      color: '#E8705A',
      summary: 'Conduct psychometric test interpretations and student counseling sessions across partner schools.',
      details: [
        'Facilitate interactive psychometric evaluation sessions for high school students.',
        'Review baseline report scorecards with parents and school principals.',
        'Collaborate with curriculum designers to refine journaling prompts.',
      ],
    },
    {
      id: 'curriculum',
      title: 'Content & Curriculum Designer',
      dept: 'programs',
      deptLabel: 'Programs',
      type: 'Full-time',
      location: 'Remote',
      color: '#138808',
      summary: 'Design guided journaling workbooks, NEP 2020 aligned modules, and psychometric assessment frameworks.',
      details: [
        'Author structured reflection prompts for school and college journaling kits.',
        'Ensure alignment with National Education Policy (NEP 2020) guidelines.',
        'Develop training guides for workshop facilitators and mentors.',
      ],
    },
    {
      id: 'marketing',
      title: 'Social Media & Outreach Manager',
      dept: 'marketing',
      deptLabel: 'Marketing',
      type: 'Full-time',
      location: 'Remote / Indore',
      color: '#0D4F4F',
      summary: 'Drive organic storytelling, manage social channels, and build relationships with school principals & partners.',
      details: [
        'Manage Instagram, LinkedIn, and YouTube organic content pipelines.',
        'Design campaign graphics and video reels showcasing student impact.',
        'Connect with potential partner schools, colleges, and CSR organizations.',
      ],
    },
    {
      id: 'counsellor',
      title: 'Student Counsellor',
      dept: 'guidance',
      deptLabel: 'Guidance',
      type: 'Part-time',
      location: 'Indore',
      color: '#5BB8D4',
      summary: 'Provide 1-on-1 career guidance and psychometric report reviews to high school and college students.',
      details: [
        'Deliver 1-on-1 counseling sessions grounded in psychometric aptitude data.',
        'Guide students in selecting stream choices (Classes 10-12) and university degrees.',
        'Track student progress over 1-year journaling cycles.',
      ],
    },
    {
      id: 'operations',
      title: 'Operations Coordinator',
      dept: 'admin',
      deptLabel: 'Admin',
      type: 'Full-time',
      location: 'Indore',
      color: '#FF9933',
      summary: 'Coordinate workshop logistics, school schedules, and volunteer dispatch for flawless program execution.',
      details: [
        'Schedule workshop events with school management across Madhya Pradesh.',
        'Manage physical journal printing and dispatch logistics.',
        'Oversee volunteer onboardings and regional field operations.',
      ],
    },
  ];

  const filteredRoles = activeDept === 'all' ? roles : roles.filter((r) => r.dept === activeDept);

  return (
    <section id="open-roles" className="py-28 bg-[#FAFAF7] relative overflow-hidden scroll-mt-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <FadeIn>
            <span className="text-[#E8705A] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Current Opportunities
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              Explore Open Roles
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-base md:text-lg">
              Click any role to expand full responsibilities or click &ldquo;Apply Now&rdquo; to launch your application.
            </p>
          </FadeIn>
        </div>

        {/* Department Filter Pills */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {[
            { id: 'all', label: '⚡ All Roles (5)' },
            { id: 'education', label: '🎓 Education' },
            { id: 'programs', label: '📚 Programs' },
            { id: 'marketing', label: '📢 Marketing' },
            { id: 'guidance', label: '🧭 Guidance' },
            { id: 'admin', label: '⚙️ Admin' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDept(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-[family-name:var(--font-sora)] transition-all ${
                activeDept === tab.id
                  ? 'bg-[#0D4F4F] text-white shadow-lg scale-102'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Job Listing Rows with Expandable Accordion */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredRoles.map((r, i) => {
            const isExpanded = expandedRole === r.id;
            return (
              <FadeIn key={r.id} delay={0.08 * i}>
                <div
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  style={{ borderLeft: `6px solid ${r.color}` }}
                >
                  {/* Row Header */}
                  <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div
                      onClick={() => setExpandedRole(isExpanded ? null : r.id)}
                      className="space-y-2 cursor-pointer flex-grow"
                    >
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className="text-xs font-bold px-3.5 py-1 rounded-full font-[family-name:var(--font-sora)]"
                          style={{ backgroundColor: `${r.color}15`, color: r.color }}
                        >
                          Dept: {r.deptLabel}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-[family-name:var(--font-inter)]">
                          {r.type}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 font-[family-name:var(--font-inter)]">
                          📍 {r.location}
                        </span>
                      </div>

                      <h3 className="font-[family-name:var(--font-sora)] font-extrabold text-xl sm:text-2xl text-[#0D4F4F] hover:text-[#E8705A] transition-colors flex items-center gap-2">
                        <span>📌 {r.title}</span>
                        <span className="text-xs text-gray-400 font-normal">
                          {isExpanded ? '▲ (Collapse)' : '▼ (View Details)'}
                        </span>
                      </h3>

                      <p className="text-sm text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] leading-relaxed">
                        {r.summary}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                      <motion.button
                        onClick={() => onApply(r.title)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#E8705A] text-white font-[family-name:var(--font-sora)] font-bold text-sm shadow-md hover:bg-[#d4624e] transition-colors"
                      >
                        Apply Now →
                      </motion.button>
                    </div>
                  </div>

                  {/* Expandable Accordion Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 sm:px-8 pb-6 border-t border-gray-100 pt-4 bg-[#FAFAF7]/50"
                      >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4F4F] font-[family-name:var(--font-sora)] mb-3">
                          Key Responsibilities & Scope:
                        </h4>
                        <ul className="space-y-2 mb-6">
                          {r.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-[family-name:var(--font-inter)]">
                              <span className="text-[#E8705A] font-bold">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => onApply(r.title)}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#E8705A] underline underline-offset-4 font-[family-name:var(--font-sora)]"
                        >
                          Ready? Launch Application Form for {r.title} →
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   4. FULL-BLEED ORGANIC CTA BANNER
   ═══════════════════════════════════════════════════ */
function CareerCTA({ onApply }) {
  return (
    <section className="relative py-28 bg-[#FF9933] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-white/25 pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl">
        <FadeIn>
          <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
            Don&apos;t See a Direct Match?
          </span>
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0F1F1F] mt-4 mb-6 leading-tight">
            Send Us Your CV Anyway!
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-[#0F1F1F]/80 font-[family-name:var(--font-inter)] text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            We are always looking for passionate educators, mentors, technologists, and storytellers. Submit a general application and we will reach out when a suitable role opens.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <motion.button
              onClick={() => onApply('General Application')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#0D4F4F] text-white px-10 py-5 rounded-full font-[family-name:var(--font-sora)] font-bold text-lg shadow-2xl hover:bg-[#073636] transition-colors"
            >
              Submit Your CV →
            </motion.button>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-transparent border-2 border-[#0D4F4F] text-[#0D4F4F] px-10 py-5 rounded-full font-[family-name:var(--font-sora)] font-bold text-lg hover:bg-[#0D4F4F]/10 transition-colors"
            >
              Learn About BNF Mission
            </motion.a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   MAIN CAREER PAGE
   ═══════════════════════════════════════════════════ */
export default function CareerPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('General Application');

  const handleApply = (roleName) => {
    setSelectedRole(roleName);
    setModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <main>
        <CareerHero onApply={handleApply} />
        <WhyJoinBNF />
        <OpenRolesSection onApply={handleApply} />
        <CareerCTA onApply={handleApply} />
      </main>
      <Footer />

      {/* Fixed Perfect Fit Application Form Modal */}
      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedRole={selectedRole}
      />
    </>
  );
}

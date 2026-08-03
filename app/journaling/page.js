'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
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


/* ═══════════════════════════════════════════════════
   1. EDITORIAL HERO SECTION WITH ADVANCED ANIMATED HERO MOCKUP
   ═══════════════════════════════════════════════════ */
function JournalingHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative py-28 bg-[#FAFAF7] overflow-hidden min-h-[780px] flex items-center pt-32">
      {/* Dynamic Animated Blobs */}
      <motion.div
        style={{ rotate: blobRotate }}
        className="absolute top-10 right-10 w-[600px] h-[600px] rounded-full blur-[150px] bg-[#E8705A]/15 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full blur-[140px] bg-[#5BB8D4]/18 pointer-events-none"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Large Editorial Typography Column */}
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-[#E8705A]" />
                <span className="text-xs font-bold text-[#E8705A] uppercase tracking-[0.25em] font-[family-name:var(--font-sora)]">
                  BNF Guided Journaling System
                </span>
              </div>
            </FadeIn>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mb-8 leading-[1.08] tracking-tight">
              <TextReveal text="Your Growth, in Your Own Words." delay={0.1} />
            </h1>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-[#0F1F1F]/70 font-[family-name:var(--font-inter)] leading-relaxed mb-10 max-w-2xl">
                Journaling is not just writing diaries. It is a <strong className="text-[#0D4F4F] font-semibold">structured, science-backed personal evolution system</strong> that bridges your psychometric profile with daily habits.
              </p>
            </FadeIn>

            {/* Feature Highlights */}
            <FadeIn delay={0.5}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 border-t border-b border-gray-200/80 py-6">
                {[
                  { num: '01', title: 'Custom Prompts', desc: 'Built for your mindset' },
                  { num: '02', title: 'Data Tracking', desc: 'Pre vs post growth' },
                  { num: '03', title: 'Career Focus', desc: 'Daily habit alignment' },
                ].map((item) => (
                  <div key={item.num} className="space-y-1">
                    <span className="text-sm font-bold text-[#E8705A] font-[family-name:var(--font-sora)] block">
                      {item.num}.
                    </span>
                    <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#0F1F1F]/55 font-[family-name:var(--font-inter)]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* CTA Actions */}
            <FadeIn delay={0.7}>
              <div className="flex flex-wrap items-center gap-6">
                <motion.a
                  href="#how-it-works"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#0D4F4F] text-white px-9 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base shadow-xl hover:bg-[#073636] transition-colors"
                >
                  Start Your Journal →
                </motion.a>

                <a
                  href="#notebook-preview"
                  className="inline-flex items-center gap-2 text-[#E8705A] font-[family-name:var(--font-sora)] font-bold text-sm hover:underline underline-offset-4"
                >
                  <span>Preview Page Inside</span>
                  <span>↓</span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Image Presentation with Floating Animations & Hover Effects */}
          <div className="lg:col-span-5 relative">
            <motion.div style={{ y: heroY, scale: imageScale }} className="relative">
              {/* Outer Pulsing Glow Aura */}
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.98, 1.03, 0.98] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-6 bg-gradient-to-tr from-[#0D4F4F]/20 via-[#E8705A]/25 to-[#5BB8D4]/25 rounded-[44px] blur-2xl pointer-events-none"
              />

              {/* Main Image Frame with Smooth Floating Bob */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-2xl bg-white group cursor-pointer"
              >
                <Image
                  src="/images/journaling/journal-mockup.jpg"
                  alt="BNF Journaling System"
                  width={600}
                  height={450}
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover w-full h-[470px] transition-transform duration-700 group-hover:scale-108"
                />

                {/* Shimmer Sweep Animation */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.2) 45%, transparent 60%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                />

                {/* Floating Orbiting Badges */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 shadow-lg flex items-center gap-2"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#0D4F4F] font-[family-name:var(--font-sora)]">
                    Psychometric Calibrated
                  </span>
                </motion.div>

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-100 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#E8705A] block font-[family-name:var(--font-sora)]">
                        Custom Guided Prompts
                      </span>
                      <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] text-sm mt-0.5">
                        BNF Personal Evolution Edition
                      </h4>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      className="w-11 h-11 rounded-full bg-[#0D4F4F] text-white flex items-center justify-center text-lg shadow-md shrink-0"
                    >
                      📖
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   2. STORYTELLING SECTION: "MORE THAN JUST WRITING"
   ═══════════════════════════════════════════════════ */
function WhatIsJournalingStory() {
  return (
    <section id="story" className="py-28 bg-[#0D4F4F] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <Container className="relative z-10 max-w-5xl">
        <div className="text-center mb-20">
          <FadeIn>
            <span className="text-[#FF9933] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Beyond Traditional Notebooks
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-white mt-4 mb-6 leading-tight">
              <TextReveal text="More Than Just Writing" delay={0.1} />
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-white/80 font-[family-name:var(--font-inter)] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              The BNF Journaling System is directly calibrated with your <span className="text-[#FF9933] font-semibold">psychometric profile</span>. Every question and prompt is generated to match your career interests, personality, and emotional goals.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-white/15">
          {[
            {
              num: '01',
              title: 'Personalised Prompts',
              desc: 'Every question is dynamically chosen based on your psychometric test results, targeting your unique strengths and growth areas.',
              accent: '#FF9933',
            },
            {
              num: '02',
              title: 'Structured Routine',
              desc: 'Built for busy students — 5-minute morning intentions, weekly self-evaluations, and monthly career alignment milestones.',
              accent: '#5BB8D4',
            },
            {
              num: '03',
              title: 'Measurable Progress',
              desc: 'Pre-and-post evaluation metrics show real quantitative evidence of how your confidence and clarity develop over time.',
              accent: '#138808',
            },
          ].map((pillar, i) => (
            <FadeIn key={pillar.num} delay={0.2 + i * 0.15}>
              <div className="relative pl-6 border-l-2" style={{ borderColor: pillar.accent }}>
                <span
                  className="font-[family-name:var(--font-sora)] font-extrabold text-4xl block mb-3 opacity-90"
                  style={{ color: pillar.accent }}
                >
                  {pillar.num}
                </span>

                <h3 className="font-[family-name:var(--font-sora)] font-bold text-xl text-white mb-3">
                  {pillar.title}
                </h3>

                <p className="font-[family-name:var(--font-inter)] text-sm text-white/70 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   3. FLOWING TIMELINE: "HOW IT WORKS"
   ═══════════════════════════════════════════════════ */
function HowItWorksTimeline() {
  const steps = [
    {
      step: '01',
      tag: 'ASSESSMENT',
      title: 'Take Your Psychometric Test',
      desc: 'Discover your intrinsic cognitive patterns, emotional strengths, career interests, and personality type through our scientifically built assessment.',
      accent: '#E8705A',
      image: '/images/hero/students.jpg',
    },
    {
      step: '02',
      tag: 'PERSONALIZATION',
      title: 'Get Your Custom Journal',
      desc: 'Receive a physical or digital guided journal customized explicitly for your profile, containing targeted prompts tailored to your career track.',
      accent: '#0D4F4F',
      image: '/images/hero/learning.jpg',
    },
    {
      step: '03',
      tag: 'DAILY PRACTICE',
      title: 'Write & Reflect Daily',
      desc: 'Engage in structured 5-minute morning check-ins and evening reflections designed to build discipline, emotional clarity, and focus.',
      accent: '#138808',
      image: '/images/hero/workshop.jpg',
    },
    {
      step: '04',
      tag: 'GROWTH TRACKING',
      title: 'Track Your Growth & Repeat',
      desc: 'Receive monthly performance scorecards comparing your baseline data with ongoing progress. Final psychometric testing re-evaluates yearly growth.',
      accent: '#5BB8D4',
      image: '/images/hero/guidance.jpg',
    },
  ];

  return (
    <section id="how-it-works" className="py-32 bg-white relative overflow-hidden scroll-mt-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-24">
          <FadeIn>
            <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              The 4-Step Process
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-6">
              <TextReveal text="How the Journaling System Works" delay={0.1} />
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-lg">
              A seamless continuous cycle from initial assessment to ongoing personal transformation.
            </p>
          </FadeIn>
        </div>

        <div className="space-y-28 relative">
          <div className="hidden lg:block absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#E8705A] via-[#0D4F4F] to-[#138808] opacity-30 z-0" />

          {steps.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={s.step} className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1 lg:text-right lg:pr-12' : 'lg:order-2 lg:text-left lg:pl-12'}`}>
                  <FadeIn direction={isEven ? 'right' : 'left'}>
                    <div className={`inline-flex items-center gap-2 mb-3 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                      <span className="font-[family-name:var(--font-sora)] font-extrabold text-2xl" style={{ color: s.accent }}>
                        {s.step}.
                      </span>
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full font-[family-name:var(--font-sora)]"
                        style={{ backgroundColor: `${s.accent}15`, color: s.accent }}
                      >
                        {s.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] mb-4">
                      {s.title}
                    </h3>

                    <p className="text-base text-[#0F1F1F]/70 font-[family-name:var(--font-inter)] leading-relaxed max-w-lg inline-block">
                      {s.desc}
                    </p>
                  </FadeIn>
                </div>

                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-4 shadow-xl items-center justify-center font-[family-name:var(--font-sora)] font-bold text-lg z-20"
                  style={{ borderColor: s.accent, color: s.accent }}>
                  {s.step}
                </div>

                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2 lg:pl-12' : 'lg:order-1 lg:pr-12'}`}>
                  <FadeIn direction={isEven ? 'left' : 'right'}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
                      <Image
                        src={s.image}
                        alt={s.title}
                        width={550}
                        height={350}
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-cover w-full h-[320px] transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    </div>
                  </FadeIn>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   4. REDESIGNED NOTEBOOK DISPLAY: "LOOK INSIDE THE GUIDED JOURNAL PAGE"
   (Perfect Seamless Tab Alignment without Gaps/Notches!)
   ═══════════════════════════════════════════════════ */
function NotebookPreview() {
  const [activeTab, setActiveTab] = useState('morning');

  const pages = {
    morning: {
      tag: 'MORNING CHECK-IN',
      title: 'Setting Purpose & Daily Alignment',
      prompt: 'What is one strength from your assessment profile you will deploy today?',
      lines: [
        'Target Goal: Lead group project discussion with confidence.',
        'Primary Strength: Analytical Problem Solving.',
        'Action Step: Listen actively and synthesize key ideas before concluding.',
      ],
      note: 'Focus Area: Emotion Regulation & Active Leadership',
      accentColor: '#E8705A',
    },
    evening: {
      tag: 'EVENING REFLECTION',
      title: 'Reviewing Progress & Lessons Learned',
      prompt: 'What situation today challenged your mindset, and how did you navigate it?',
      lines: [
        'Challenge: Unexpected timeline shift during afternoon session.',
        'My Reaction: Kept calm, prioritized top 2 critical tasks.',
        'Key Lesson: Flexibility turns friction into growth opportunities.',
      ],
      note: 'Focus Area: Stress Management & Mindset Adaptability',
      accentColor: '#5BB8D4',
    },
    weekly: {
      tag: 'WEEKLY CAREER MAPPING',
      title: 'Connecting Daily Actions to Career Goals',
      prompt: 'How did this week’s achievements align with your target career track?',
      lines: [
        'Skill Built: Public speaking & presentation techniques.',
        'Industry Insight: Researched 2 emerging careers in sustainable tech.',
        'Next Week Focus: Draft resume project highlights.',
      ],
      note: 'Focus Area: Strategic Career Direction',
      accentColor: '#138808',
    },
  };

  const currentPage = pages[activeTab];

  return (
    <section id="notebook-preview" className="py-28 bg-[#FAFAF7] relative overflow-hidden scroll-mt-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <FadeIn>
            <span className="text-[#E8705A] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Real Notebook Preview
            </span>
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              Look Inside the Guided Journal Page
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-base">
              Click the index tabs below to flip between morning, evening, and weekly sections.
            </p>
          </FadeIn>
        </div>

        {/* Notebook Display Container */}
        <div className="max-w-4xl mx-auto">
          {/* Integrated Header Bar & Index Tabs (Unified Frame - No Gaps!) */}
          <div className="bg-[#0D4F4F] rounded-t-3xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            {/* Index Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'morning', label: '🌅 Morning Intention' },
                { id: 'evening', label: '🌇 Evening Reflection' },
                { id: 'weekly', label: '🧭 Weekly Career Track' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-[family-name:var(--font-sora)] transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-[#0D4F4F] shadow-md scale-102'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Edition Tag */}
            <span className="hidden sm:inline-block text-xs font-semibold text-white/60 font-[family-name:var(--font-inter)] pr-2">
              BNF Guided Edition 2026
            </span>
          </div>

          {/* Authentic Ruled Journal Paper Page (Attached to Top Bar) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, rotateY: 15 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-b-3xl p-8 sm:p-12 shadow-2xl border-2 border-t-0 border-[#0D4F4F]/20 relative overflow-hidden"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #F0F2F5 39px, #F0F2F5 40px)',
                backgroundPosition: '0 24px',
              }}
            >
              {/* Red Vertical Margin Line */}
              <div className="absolute top-0 bottom-0 left-10 sm:left-14 w-[2px] bg-red-400/80 pointer-events-none z-10" />

              <div className="pl-6 sm:pl-10 relative z-20">
                {/* Notebook Header Row */}
                <div className="flex flex-wrap items-center justify-between border-b-2 border-[#0D4F4F] pb-4 mb-8 gap-4 bg-white/90">
                  <div>
                    <span
                      className="text-[11px] font-extrabold uppercase tracking-widest block font-[family-name:var(--font-sora)]"
                      style={{ color: currentPage.accentColor }}
                    >
                      {currentPage.tag}
                    </span>
                    <h3 className="font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] text-xl sm:text-2xl mt-0.5">
                      {currentPage.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 font-[family-name:var(--font-inter)] font-semibold block">
                      DATE: ____ / ____ / 2026
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">● Active Student Entry</span>
                  </div>
                </div>

                {/* Prompt Question Box */}
                <div className="mb-8 bg-white/95 p-3 rounded-xl border border-gray-200/80 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0D4F4F] block mb-1">
                    Guided Prompt Question:
                  </span>
                  <p className="font-[family-name:var(--font-sora)] font-bold text-base sm:text-lg text-[#0F1F1F]">
                    &ldquo;{currentPage.prompt}&rdquo;
                  </p>
                </div>

                {/* Hand-written Style Response Lines */}
                <div className="space-y-4 mb-10 font-[family-name:var(--font-inter)] text-gray-800 text-sm sm:text-base font-medium">
                  {currentPage.lines.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx + 0.2 }}
                      className="flex items-start gap-3 bg-white/95 py-1"
                    >
                      <span className="font-bold shrink-0" style={{ color: currentPage.accentColor }}>✍️</span>
                      <span className="leading-relaxed">{line}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Footer Note */}
                <div className="pt-4 border-t border-gray-300 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2 bg-white/90">
                  <span className="font-semibold text-[#0D4F4F]">
                    💡 {currentPage.note}
                  </span>
                  <span className="italic font-serif text-gray-400">BNF Guided Journaling Framework</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   5. EDITORIAL STAT DATA HIGHLIGHTS: "BENEFITS"
   ═══════════════════════════════════════════════════ */
function JournalingBenefitsEditorial() {
  const benefits = [
    {
      title: 'Self-Awareness',
      stat: '+75%',
      sub: 'Improvement after 1 Year',
      desc: 'Students report significantly clearer self-understanding and emotional clarity after structured daily journaling.',
      color: '#E8705A',
    },
    {
      title: 'Academic Confidence',
      stat: '+80%',
      sub: 'Improvement after 1 Year',
      desc: 'Consistent reflection builds a strong internal foundation, improving classroom participation and presentation confidence.',
      color: '#138808',
    },
    {
      title: 'Decision Clarity',
      stat: '+70%',
      sub: 'Improvement after 1 Year',
      desc: 'Targeted career prompts train the brain to make thoughtful, value-aligned career and subject choices.',
      color: '#0D4F4F',
    },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Quantitative Impact
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              <TextReveal text="Proven Impact on Growth" delay={0.1} />
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t-2 border-b-2 border-gray-100 py-16">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={0.15 * i}>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 font-[family-name:var(--font-sora)] block">
                  {b.title}
                </span>

                <span
                  className="text-6xl sm:text-7xl font-[family-name:var(--font-sora)] font-extrabold block tracking-tight"
                  style={{ color: b.color }}
                >
                  {b.stat}
                </span>

                <span className="text-sm font-semibold text-[#0F1F1F] block font-[family-name:var(--font-inter)]">
                  {b.sub}
                </span>

                <p className="text-sm text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center mt-10">
            <span className="text-xs text-gray-400 italic font-[family-name:var(--font-inter)]">
              Source: Proposed model data & longitudinal assessment evaluation by BNF Foundation
            </span>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   6. ORGANIC FULL-BLEED CTA BANNER
   ═══════════════════════════════════════════════════ */
function JournalingCTA() {
  return (
    <section className="relative py-28 bg-[#FF9933] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-white/25 pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl">
        <FadeIn>
          <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
            Take the Next Step
          </span>
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0F1F1F] mt-4 mb-6 leading-tight">
            Ready to Start Your Journaling Journey?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-[#0F1F1F]/80 font-[family-name:var(--font-inter)] text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Get your customized guided journal calibrated to your unique psychometric profile.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#0D4F4F] text-white px-10 py-5 rounded-full font-[family-name:var(--font-sora)] font-bold text-lg shadow-2xl hover:bg-[#073636] transition-colors"
            >
              Get My Journal →
            </motion.a>
            <motion.a
              href="/programs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-transparent border-2 border-[#0D4F4F] text-[#0D4F4F] px-10 py-5 rounded-full font-[family-name:var(--font-sora)] font-bold text-lg hover:bg-[#0D4F4F]/10 transition-colors"
            >
              Explore Programs
            </motion.a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   MAIN JOURNALING PAGE
   ═══════════════════════════════════════════════════ */
export default function JournalingPage() {
  return (
    <>
      <Navbar />
      <main>
        <JournalingHero />
        <WhatIsJournalingStory />
        <HowItWorksTimeline />
        <NotebookPreview />
        <JournalingBenefitsEditorial />
        <JournalingCTA />
      </main>
      <Footer />
    </>
  );
}

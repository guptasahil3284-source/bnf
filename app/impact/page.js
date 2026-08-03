'use client';

import React, { useRef, useState, useEffect } from 'react';
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

function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.replace(/[^0-9]/g, ''), 10);
    let start = 0;
    const stepTime = Math.abs(Math.floor((duration * 1000) / num));
    const timer = setInterval(() => {
      start += Math.ceil(num / 40);
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
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
   1. EDITORIAL IMPACT HERO WITH FULL-BLEED BACKGROUND IMAGE & ANIMATION
   ═══════════════════════════════════════════════════ */
function ImpactHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  const statStrip = [
    '5,000+ Students',
    '120+ Schools',
    '10,000+ Assessments',
    '15+ Cities',
    '50+ Partners',
  ];

  return (
    <section ref={ref} className="relative py-36 bg-[#0F1F1F] text-white overflow-hidden min-h-[780px] flex items-center pt-36">
      {/* Full-Bleed Animated Hero Background Image */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/impact/hero-students.jpg"
          alt="Impact Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105"
        />

        {/* Invert Dark Gradient Overlays for High Contrast & Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1F1F]/95 via-[#0D4F4F]/80 to-[#0F1F1F]/40" />
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
                Measurable Student Transformation
              </span>
            </div>
          </FadeIn>

          {/* H1 Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-sora)] font-extrabold text-white mb-8 leading-[1.08] tracking-tight drop-shadow-lg">
            <TextReveal text="Every Number Represents a Student's Story" delay={0.2} />
          </h1>

          {/* Subtitle */}
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-white/90 font-[family-name:var(--font-inter)] leading-relaxed mb-12 max-w-3xl drop-shadow-md">
              We measure our success not in static reports, but in the confidence, clarity, and career direction of every student we mentor across India.
            </p>
          </FadeIn>

          {/* Stat Strip Chips Floating Layer */}
          <FadeIn delay={0.6}>
            <div className="flex flex-wrap items-center gap-3.5">
              {statStrip.map((chip) => (
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
   2. KEY NUMBERS: GIANT EDITORIAL WALL OF STATISTICS (No Cards!)
   ═══════════════════════════════════════════════════ */
function KeyNumbersEditorial() {
  const stats = [
    { num: '5000', suffix: '+', label: 'Students Impacted', color: '#FF9933' },
    { num: '120', suffix: '+', label: 'Schools Reached', color: '#0D4F4F' },
    { num: '10000', suffix: '+', label: 'Assessments Done', color: '#138808' },
    { num: '15', suffix: '+', label: 'Cities Covered', color: '#5BB8D4' },
    { num: '50', suffix: '+', label: 'Active Partners', color: '#E8705A' },
  ];

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Proven Nationwide Reach
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              Impact by the Numbers
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-lg">
              Empowering schools, colleges, and students across India.
            </p>
          </FadeIn>
        </div>

        {/* Giant Editorial Numbers Grid with Dividing Lines (No Card Boxes!) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t-2 border-b-2 border-gray-100 py-16 text-center">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={0.1 * i}>
              <div className="space-y-3">
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-sora)] font-extrabold tracking-tight"
                  style={{ color: s.color }}
                >
                  <AnimatedCounter target={s.num} suffix={s.suffix} duration={2} />
                </span>
                <span className="block text-xs sm:text-sm font-extrabold text-[#0F1F1F]/70 font-[family-name:var(--font-sora)] uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   3. BEFORE / AFTER COMPARISON WITH IMAGE & GRAPH GAUGES (No Cards!)
   ═══════════════════════════════════════════════════ */
function BeforeAfterComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const metrics = [
    {
      title: 'SELF-AWARENESS',
      before: 40,
      after: 75,
      improvement: '+35% Improvement',
      desc: 'Students report a 35% jump in recognizing their core learning style and emotional triggers.',
      color: '#E8705A',
    },
    {
      title: 'ACADEMIC & PERSONAL CONFIDENCE',
      before: 45,
      after: 80,
      improvement: '+35% Improvement',
      desc: 'Classroom participation and presentation confidence increases significantly after 12 months.',
      color: '#138808',
    },
    {
      title: 'CAREER & DECISION CLARITY',
      before: 35,
      after: 70,
      improvement: '+35% Improvement',
      desc: 'Students select subjects and career tracks aligned with their psychometric aptitude profile.',
      color: '#5BB8D4',
    },
  ];

  return (
    <section className="py-28 bg-[#FAFAF7] relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <span className="text-[#E8705A] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Longitudinal Assessment Data
            </span>
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              <TextReveal text="What Changes After 1 Year with BNF?" delay={0.1} />
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-base md:text-lg">
              Based on psychometric comparison: Initial Test vs. Final Test after 1 year of guided journaling.
            </p>
          </FadeIn>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Left Column: Real Mentor Session Image Showcase */}
          <div className="lg:col-span-5">
            <FadeIn direction="right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src="/images/impact/mentor-session.jpg"
                  alt="Mentorship Session"
                  width={500}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover w-full h-[480px] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D4F4F]/90 via-[#0D4F4F]/30 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-bold text-[#FF9933] uppercase tracking-wider font-[family-name:var(--font-sora)] mb-1">
                    Direct Mentorship
                  </span>
                  <h4 className="font-[family-name:var(--font-sora)] font-bold text-lg text-white">
                    1-on-1 Psychometric Profile Review
                  </h4>
                  <p className="text-xs text-white/80 font-[family-name:var(--font-inter)] mt-1">
                    Every student receives personalized feedback on baseline vs 1-year progress.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Animated Data Bar Visualizers (No Box Cards!) */}
          <div className="lg:col-span-7 space-y-10">
            {metrics.map((m, i) => (
              <FadeIn key={m.title} delay={0.15 * i} direction="left">
                <div className="border-b border-gray-200 pb-8 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] text-base sm:text-lg">
                      {m.title}
                    </h4>
                    <span
                      className="text-xs font-bold px-3.5 py-1 rounded-full text-white font-[family-name:var(--font-sora)] shadow-sm"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.improvement}
                    </span>
                  </div>

                  {/* Dual Bar Display */}
                  <div className="space-y-3 pt-2">
                    {/* Before Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 font-semibold mb-1 font-[family-name:var(--font-inter)]">
                        <span>BEFORE (Initial Test)</span>
                        <span>{m.before}%</span>
                      </div>
                      <div className="w-full h-3.5 bg-gray-200/80 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#0D4F4F] rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${m.before}%` } : {}}
                          transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* After Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1 font-[family-name:var(--font-inter)]" style={{ color: m.color }}>
                        <span>AFTER (1 Year Journaling)</span>
                        <span>{m.after}%</span>
                      </div>
                      <div className="w-full h-3.5 bg-gray-200/80 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: m.color }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${m.after}%` } : {}}
                          transition={{ duration: 1.5, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 font-[family-name:var(--font-inter)] leading-relaxed pt-1">
                    {m.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Source Citation */}
        <FadeIn delay={0.6}>
          <div className="text-center mt-12">
            <span className="text-xs text-[#6C757D] italic font-[family-name:var(--font-inter)] block">
              Source: Proposed model data & longitudinal assessment evaluation by BNF Foundation
            </span>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   4. STUDENT STORIES: EDITORIAL QUOTE CAROUSEL (No Cards!)
   ═══════════════════════════════════════════════════ */
function StudentTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const stories = [
    {
      quote: 'For the first time, I understand what I actually want in life. The psychometric profile was eye-opening! It helped me choose my senior subjects without anxiety.',
      name: 'Priya Sharma',
      role: 'Class 11 Student',
      school: 'St. Xavier High School, Indore',
      stars: 5,
      avatar: 'PS',
      color: '#E8705A',
    },
    {
      quote: 'I discovered I am better suited for creative fields — something traditional school marks never showed. The daily journaling prompts kept me focused on building my portfolio.',
      name: 'Rahul Mehta',
      role: 'B.Com 2nd Year',
      school: 'Delhi University, New Delhi',
      stars: 5,
      avatar: 'RM',
      color: '#0D4F4F',
    },
    {
      quote: 'My confidence went from 40% to 72% in one year. I can see the difference in how I handle interviews and public presentations!',
      name: 'Ananya Rao',
      role: 'MBA Student',
      school: 'Symbiosis Institute, Pune',
      stars: 5,
      avatar: 'AR',
      color: '#138808',
    },
  ];

  const current = stories[activeIdx];

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Real Student Transformations
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              Student Stories
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-base">
              Click through student voices to read their personal journey with BNF.
            </p>
          </FadeIn>
        </div>

        {/* Story Selector Buttons (No Cards!) */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {stories.map((story, i) => (
            <button
              key={story.name}
              onClick={() => setActiveIdx(i)}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold font-[family-name:var(--font-sora)] transition-all ${
                activeIdx === i
                  ? 'bg-[#0D4F4F] text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {story.name} ({story.role})
            </button>
          ))}
        </div>

        {/* Featured Editorial Quote Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto relative pl-8 sm:pl-16 border-l-4"
            style={{ borderColor: current.color }}
          >
            {/* Giant Quotation Mark */}
            <span
              className="text-7xl sm:text-9xl font-[family-name:var(--font-sora)] font-extrabold absolute -top-8 left-2 sm:left-6 opacity-20 pointer-events-none select-none"
              style={{ color: current.color }}
            >
              “
            </span>

            <p className="font-[family-name:var(--font-sora)] font-semibold text-xl sm:text-3xl text-[#0F1F1F] leading-snug mb-8 relative z-10">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="flex items-center gap-4 relative z-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold font-[family-name:var(--font-sora)] text-lg shadow-md shrink-0"
                style={{ backgroundColor: current.color }}
              >
                {current.avatar}
              </div>

              <div>
                <div className="flex items-center gap-1 text-[#FF9933] text-sm mb-0.5">
                  {'★'.repeat(current.stars)}
                </div>
                <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] text-lg">
                  {current.name}
                </h4>
                <p className="text-xs text-gray-500 font-[family-name:var(--font-inter)]">
                  {current.role} • {current.school}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   5. FULL-BLEED ORGANIC CTA BANNER
   ═══════════════════════════════════════════════════ */
function ImpactCTA() {
  return (
    <section className="relative py-28 bg-[#FF9933] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-white/25 pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl">
        <FadeIn>
          <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
            Partner with BNF
          </span>
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0F1F1F] mt-4 mb-6 leading-tight">
            Ready to Bring Real Impact to Your Students?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-[#0F1F1F]/80 font-[family-name:var(--font-inter)] text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Join 120+ schools and colleges using BNF psychometric profiling and guided journaling to transform student futures.
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
              Get Involved as Partner →
            </motion.a>
            <motion.a
              href="/programs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-transparent border-2 border-[#0D4F4F] text-[#0D4F4F] px-10 py-5 rounded-full font-[family-name:var(--font-sora)] font-bold text-lg hover:bg-[#0D4F4F]/10 transition-colors"
            >
              View Our Programs
            </motion.a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   MAIN IMPACT PAGE
   ═══════════════════════════════════════════════════ */
export default function ImpactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ImpactHero />
        <KeyNumbersEditorial />
        <BeforeAfterComparison />
        <StudentTestimonials />
        <ImpactCTA />
      </main>
      <Footer />
    </>
  );
}

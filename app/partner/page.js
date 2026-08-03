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

function Particles({ count = 30, color = 'rgba(255,255,255,0.4)' }) {
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
   1. FULL-BLEED ANIMATED PARTNER HERO SECTION
   ═══════════════════════════════════════════════════ */
function PartnerHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  const stats = [
    { value: '50+', label: 'Partner Institutions' },
    { value: '15+', label: 'CSR Corporate Sponsors' },
    { value: '100%', label: 'Audit-Ready ESG Impact' },
  ];

  return (
    <section ref={ref} className="relative py-36 bg-[#0F1F1F] text-white overflow-hidden min-h-[780px] flex items-center pt-36">
      {/* Full-Bleed Animated Hero Background Image */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/partner/hero-bg.jpg"
          alt="BNF Partnership MoU Ceremony"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105"
        />

        {/* Dark Gradient Invert Overlays */}
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
        className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full blur-[140px] bg-[#FF9933]/25 pointer-events-none z-1"
      />

      <Particles count={35} color="rgba(255,255,255,0.4)" />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <FadeIn>
            <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 mb-8 shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8705A] animate-ping" />
              <span className="text-xs font-bold text-white uppercase tracking-widest font-[family-name:var(--font-sora)]">
                Together, We Scale Impact
              </span>
            </div>
          </FadeIn>

          {/* H1 Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-sora)] font-extrabold text-white mb-8 leading-[1.08] tracking-tight drop-shadow-lg">
            <TextReveal text="Partner With BNF to Build the Future" delay={0.2} />
          </h1>

          {/* Subtitle */}
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-white/90 font-[family-name:var(--font-inter)] leading-relaxed mb-12 max-w-3xl drop-shadow-md">
              We are actively looking for schools, colleges, startups, MSMEs, NGOs and corporates who share our belief that every student deserves a chance to discover their potential.
            </p>
          </FadeIn>

          {/* Hero Action Buttons */}
          <FadeIn delay={0.6}>
            <div className="flex flex-wrap items-center gap-5 mb-14">
              <motion.a
                href="#mou-form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#E8705A] text-white px-9 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base shadow-2xl hover:bg-[#d4624e] transition-colors"
              >
                Become a Partner →
              </motion.a>

              <motion.a
                href="#mou-form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/15 border-2 border-white/30 text-white px-9 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base hover:bg-white/25 transition-colors backdrop-blur-md"
              >
                Sign an MoU 📜
              </motion.a>
            </div>
          </FadeIn>

          {/* Stat Chips */}
          <FadeIn delay={0.8}>
            <div className="flex flex-wrap items-center gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/15 backdrop-blur-xl border border-white/30 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl"
                >
                  <span className="text-2xl font-extrabold text-[#FF9933] font-[family-name:var(--font-sora)]">
                    {s.value}
                  </span>
                  <span className="text-xs font-semibold text-white font-[family-name:var(--font-inter)]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   2. 6 CORE PARTNERSHIP TYPES (Interactive Showcase Grid)
   ═══════════════════════════════════════════════════ */
function PartnershipTypes({ onSelectType }) {
  const types = [
    {
      id: 'School / College',
      icon: '🏫',
      title: 'Schools & Colleges',
      badge: 'Educational Institutions',
      desc: 'Bring BNF psychometric baseline assessments, guided journaling kits, and NEP 2020 career workshops directly to your students.',
      action: 'Partner as Institution →',
      color: '#E8705A',
    },
    {
      id: 'Startup / MSME',
      icon: '🚀',
      title: 'Startups & MSMEs',
      badge: 'Industry & Talent',
      desc: 'Offer internship opportunities, co-create practical career projects, and connect directly with self-aware student talent.',
      action: 'Partner as Startup →',
      color: '#0D4F4F',
    },
    {
      id: 'NGO / Non-Profit',
      icon: '🌐',
      title: 'NGOs & Non-Profits',
      badge: 'Social Impact',
      desc: 'Amplify reach in underserved student communities with shared educational resources and co-facilitated growth programs.',
      action: 'Partner as NGO →',
      color: '#138808',
    },
    {
      id: 'Corporate (CSR)',
      icon: '🏢',
      title: 'Corporates (CSR)',
      badge: 'CSR & ESG',
      desc: 'Sponsor student psychometric evaluation kits with measurable social impact metrics and audit-ready CSR compliance reports.',
      action: 'CSR Enquiry →',
      color: '#FF9933',
    },
    {
      id: 'Government Body',
      icon: '🏛️',
      title: 'Government & Policy Bodies',
      badge: 'Public Sector',
      desc: 'Align with National Education Policy (NEP 2020) skill initiatives. We collaborate with district bodies and state education cells.',
      action: 'Policy Collaboration →',
      color: '#5BB8D4',
    },
    {
      id: 'Individual Mentor / Other',
      icon: '👨‍🏫',
      title: 'Individual Mentors & Experts',
      badge: 'Advisory & Mentorship',
      desc: 'Join our advisory board, mentor students 1-on-1, and conduct expert masterclasses for high school and university students.',
      action: 'Sign Up as Expert →',
      color: '#E8705A',
    },
  ];

  return (
    <section className="py-28 bg-[#FAFAF7] relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <span className="text-[#E8705A] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Strategic Collaboration
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              <TextReveal text="Partnership Categories" delay={0.1} />
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-lg">
              Explore how your organization can partner with BNF to shape the next generation of future-ready leaders.
            </p>
          </FadeIn>
        </div>

        {/* 6 Category Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {types.map((t, i) => (
            <FadeIn key={t.title} delay={0.1 * i}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
                style={{ borderTop: `6px solid ${t.color}` }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                      {t.icon}
                    </span>
                    <span
                      className="text-[11px] font-bold px-3 py-1 rounded-full font-[family-name:var(--font-sora)]"
                      style={{ backgroundColor: `${t.color}15`, color: t.color }}
                    >
                      {t.badge}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-sora)] font-extrabold text-2xl text-[#0D4F4F] group-hover:text-[#E8705A] transition-colors">
                    {t.title}
                  </h3>

                  <p className="text-sm text-[#0F1F1F]/70 font-[family-name:var(--font-inter)] leading-relaxed">
                    {t.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6">
                  <button
                    onClick={() => onSelectType(t.id)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#E8705A] font-[family-name:var(--font-sora)] group-hover:underline"
                  >
                    {t.action}
                  </button>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   3. PARTNER BENEFITS (Editorial Typography Pillars - Left Accent Line Indicators)
   ═══════════════════════════════════════════════════ */
function PartnerBenefits() {
  const benefits = [
    {
      num: '01',
      icon: '📜',
      title: 'Formal MoU Agreement',
      desc: 'Legally documented Memorandum of Understanding defining strategic goals, joint initiatives, and institutional responsibilities.',
      accent: '#0D4F4F',
    },
    {
      num: '02',
      icon: '🏆',
      title: 'Co-Branding & Visibility',
      desc: 'Prominent logo integration across BNF’s website, student guided journals, national event banners, and annual certificates.',
      accent: '#FF9933',
    },
    {
      num: '03',
      icon: '📊',
      title: 'Granular Impact Reports',
      desc: 'Audit-ready CSR & ESG reports documenting baseline vs endline data on student career clarity and psychological growth.',
      accent: '#138808',
    },
  ];

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Why Partner With Us
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              <TextReveal text="Partner Benefits" delay={0.1} />
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-lg">
              We ensure every institutional collaboration delivers mutual strategic value, formal documentation, and measurable social impact.
            </p>
          </FadeIn>
        </div>

        {/* 3 Column Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t-2 border-b-2 border-gray-100 py-16">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={0.15 * i}>
              <div className="relative pl-8 border-l-4 space-y-4" style={{ borderColor: b.accent }}>
                <span className="text-4xl block">{b.icon}</span>
                <span
                  className="font-[family-name:var(--font-sora)] font-bold text-xs uppercase tracking-widest block"
                  style={{ color: b.accent }}
                >
                  {b.num}. {b.title}
                </span>
                <h3 className="font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] text-2xl">
                  {b.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-base text-[#0F1F1F]/75 leading-relaxed">
                  {b.desc}
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
   4. CURRENT PARTNERS LOGO MARQUEE STRIP
   ═══════════════════════════════════════════════════ */
function CurrentPartnersStrip() {
  const partners = [
    'NEP 2020 Aligned Framework',
    'AICTE Recommended',
    'UNICEF Guidance Guidelines',
    'UNESCO Standards',
    'MSME Registered NGO',
    'Rotary Club Education Partner',
    'Indore Sahodaya School Complex',
  ];

  return (
    <section className="py-16 bg-[#FAFAF7] border-t border-b border-gray-200/80 overflow-hidden">
      <Container className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0D4F4F] font-[family-name:var(--font-sora)]">
          Trusted Frameworks & Educational Partners
        </span>
      </Container>

      <div className="flex overflow-hidden space-x-8 select-none">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex space-x-6 shrink-0 items-center"
        >
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200/90 rounded-2xl px-6 py-4 text-xs sm:text-sm font-bold font-[family-name:var(--font-sora)] text-[#0D4F4F] shadow-sm whitespace-nowrap"
            >
              🤝 {p}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   5. PARTNER / MOU ENQUIRY FORM SECTION
   ═══════════════════════════════════════════════════ */
function PartnerEnquiryForm({ prefilledType }) {
  const [formData, setFormData] = useState({
    orgName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    city: '',
    orgType: prefilledType || 'School / College',
    interests: [],
    goals: '',
  });
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (prefilledType) {
      setFormData((prev) => ({ ...prev, orgType: prefilledType }));
    }
  }, [prefilledType]);

  const interestOptions = [
    'Programs & Workshops',
    'Internships & Hiring',
    'CSR Funding & Sponsorship',
    'MoU Signing',
    'Co-Branding & Events',
    'Research & Assessments',
  ];

  const toggleInterest = (item) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        orgName: '',
        contactPerson: '',
        designation: '',
        email: '',
        phone: '',
        city: '',
        orgType: 'School / College',
        interests: [],
        goals: '',
      });
    }, 3000);
  };

  return (
    <section id="mou-form" className="py-28 bg-white relative overflow-hidden scroll-mt-20">
      <Container className="max-w-4xl">
        <FadeIn>
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200/90 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-[#0D4F4F] via-[#E8705A] to-[#FF9933]" />

            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8705A] font-[family-name:var(--font-sora)] block mb-1">
                Initiate Strategic MoU
              </span>
              <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F]">
                Let&apos;s Build Something Together
              </h2>
              <p className="text-sm text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] mt-2">
                Fill in your organisation details below. Our partnerships team will get back to you within 2 business days.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-14 text-center space-y-4"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
                  ✓
                </div>
                <h3 className="text-2xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]">
                  Partnership Enquiry Received!
                </h3>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)] max-w-md mx-auto">
                  Thank you for reaching out. Our institutional director will review your enquiry and schedule an introductory MoU call.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organisation & Contact Person */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                      Organisation Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. St. Xavier School / TechCorp Inc"
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Mehta"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Designation & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                      Designation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Principal / CSR Lead / Dean..."
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Indore, Mumbai, Bengaluru..."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rajesh@organisation.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Type of Organisation Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                    Type of Organisation *
                  </label>
                  <select
                    value={formData.orgType}
                    onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white text-gray-800 cursor-pointer font-medium"
                  >
                    <option value="School / College">School / College / University</option>
                    <option value="Startup / MSME">Startup / MSME</option>
                    <option value="NGO / Non-Profit">NGO / Non-Profit</option>
                    <option value="Corporate (CSR)">Corporate (CSR / ESG)</option>
                    <option value="Government Body">Government / Policy Body</option>
                    <option value="Individual Mentor / Other">Individual Mentor / Other</option>
                  </select>
                </div>

                {/* Partnership Interest Multi-select */}
                <div>
                  <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                    Partnership Interest (Multi-select) *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {interestOptions.map((opt) => {
                      const isSelected = formData.interests.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleInterest(opt)}
                          className={`px-4 py-2.5 rounded-full text-xs font-bold font-[family-name:var(--font-inter)] border transition-all ${
                            isSelected
                              ? 'bg-[#E8705A] text-white border-[#E8705A] shadow-md'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tell us about your goals Textarea */}
                <div>
                  <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                    Tell us about your organisation & partnership goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe student count, target timeline, or specific MoU objectives..."
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E8705A] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white resize-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-full bg-[#E8705A] text-white font-[family-name:var(--font-sora)] font-bold text-base shadow-xl hover:bg-[#d4624e] transition-colors"
                >
                  Submit Partnership Enquiry →
                </motion.button>
              </form>
            )}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   6. FULL-BLEED ORGANIC PARTNER CTA BANNER
   ═══════════════════════════════════════════════════ */
function PartnerCTA() {
  return (
    <section className="relative py-28 bg-[#0D4F4F] text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-[#FF9933]/20 pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl">
        <FadeIn>
          <span className="text-[#FF9933] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
            Scaling National Impact Together
          </span>
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-white mt-4 mb-6 leading-tight">
            Ready to Empower the Next Generation of Self-Aware Leaders?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-white/85 font-[family-name:var(--font-inter)] text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Schedule an introductory consultation with our partnership leads to explore custom MoU structures.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <motion.a
              href="#mou-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#E8705A] text-white px-10 py-5 rounded-full font-[family-name:var(--font-sora)] font-extrabold text-lg shadow-2xl hover:bg-[#d4624e] transition-colors"
            >
              Sign an MoU Today →
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-[family-name:var(--font-sora)] font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Director
            </motion.a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   MAIN PARTNER PAGE
   ═══════════════════════════════════════════════════ */
export default function PartnerPage() {
  const [selectedType, setSelectedType] = useState('');

  const handleSelectType = (typeName) => {
    setSelectedType(typeName);
    const formElement = document.getElementById('mou-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <PartnerHero />
        <PartnershipTypes onSelectType={handleSelectType} />
        <PartnerBenefits />
        <CurrentPartnersStrip />
        <PartnerEnquiryForm prefilledType={selectedType} />
        <PartnerCTA />
      </main>
      <Footer />
    </>
  );
}

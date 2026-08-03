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
   1. FULL-BLEED ANIMATED VOLUNTEER HERO SECTION
   ═══════════════════════════════════════════════════ */
function VolunteerHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  const stats = [
    { value: '50+', label: 'Active Volunteers' },
    { value: '15+', label: 'Cities Reached' },
    { value: '5,000+', label: 'Students Impacted' },
  ];

  return (
    <section ref={ref} className="relative py-36 bg-[#0F1F1F] text-white overflow-hidden min-h-[780px] flex items-center pt-36">
      {/* Full-Bleed Animated Hero Background Image */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/volunteer/hero-bg.jpg"
          alt="BNF Volunteer Mentoring"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105"
        />

        {/* Dark Gradient Invert Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1F1F]/95 via-[#0D4F4F]/85 to-[#0F1F1F]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F1F] via-transparent to-[#0F1F1F]/70" />
      </motion.div>

      {/* Floating Ambient Glowing Blur Orbs */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-10 w-[550px] h-[550px] rounded-full blur-[150px] bg-[#138808]/25 pointer-events-none z-1"
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
              <span className="w-2.5 h-2.5 rounded-full bg-[#138808] animate-ping" />
              <span className="text-xs font-bold text-white uppercase tracking-widest font-[family-name:var(--font-sora)]">
                Volunteer Movement at BNF
              </span>
            </div>
          </FadeIn>

          {/* H1 Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-sora)] font-extrabold text-white mb-8 leading-[1.08] tracking-tight drop-shadow-lg">
            <TextReveal text="Give a Few Hours. Change a Student's Life." delay={0.2} />
          </h1>

          {/* Subtitle */}
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-white/90 font-[family-name:var(--font-inter)] leading-relaxed mb-12 max-w-3xl drop-shadow-md">
              Volunteering with BNF means you directly impact school and college students through mentoring, event support, content creation, and awareness campaigns.
            </p>
          </FadeIn>

          {/* Hero Action Buttons */}
          <FadeIn delay={0.6}>
            <div className="flex flex-wrap items-center gap-5 mb-14">
              <motion.a
                href="#signup-form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#138808] text-white px-9 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base shadow-2xl hover:bg-[#0f6b06] transition-colors"
              >
                Sign Up to Volunteer →
              </motion.a>

              <motion.a
                href="#what-youll-do"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/15 border-2 border-white/30 text-white px-9 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-base hover:bg-white/25 transition-colors backdrop-blur-md"
              >
                Explore Opportunities ↓
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
   2. WHY VOLUNTEER SECTION (3 Editorial Pillars - No Box Cards!)
   ═══════════════════════════════════════════════════ */
function WhyVolunteer() {
  const pillars = [
    {
      num: '01',
      icon: '🎓',
      title: 'Build Your Resume',
      desc: 'Gain real-world experience in education management, social impact, event coordination, and student leadership that sets your career profile apart.',
      accent: '#138808',
    },
    {
      num: '02',
      icon: '🌟',
      title: 'Create Real Impact',
      desc: 'Don’t just file papers — mentor students, run psychometric feedback sessions, and see the immediate difference in student confidence.',
      accent: '#FF9933',
    },
    {
      num: '03',
      icon: '🤝',
      title: 'Join a Community',
      desc: 'Connect with a vibrant network of like-minded educators, students, mentors, and change-makers across India who share your drive for purpose.',
      accent: '#0D4F4F',
    },
  ];

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Volunteer Benefits
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              <TextReveal text="Why Volunteer With Us?" delay={0.1} />
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-lg">
              Volunteering at BNF is an enriching experience that fuels your personal and professional growth while helping students thrive.
            </p>
          </FadeIn>
        </div>

        {/* 3 Column Editorial Pillars with Colored Left Accent Indicators (No Cards!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t-2 border-b-2 border-gray-100 py-16">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={0.15 * i}>
              <div className="relative pl-8 border-l-4 space-y-4" style={{ borderColor: p.accent }}>
                <span className="text-4xl block">{p.icon}</span>
                <span
                  className="font-[family-name:var(--font-sora)] font-bold text-xs uppercase tracking-widest block"
                  style={{ color: p.accent }}
                >
                  {p.num}. {p.title}
                </span>
                <h3 className="font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] text-2xl">
                  {p.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-base text-[#0F1F1F]/75 leading-relaxed">
                  {p.desc}
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
   3. WHAT YOU'LL DO: COMPREHENSIVE CATEGORIZED VOLUNTEER ROLES
   ═══════════════════════════════════════════════════ */
function WhatYoullDo({ onSelectRole }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: '⚡ All Roles (24+)' },
    { id: 'outreach', label: '🏫 School & Campus' },
    { id: 'guidance', label: '🧠 Guidance & Mentoring' },
    { id: 'content', label: '📖 Content & Design' },
    { id: 'media', label: '📢 Media & Events' },
    { id: 'fundraising', label: '💚 Impact & Fundraiser' },
    { id: 'tech', label: '⚙️ Tech & Ops' },
  ];

  const roles = [
    // Category 1: School & Campus
    { cat: 'outreach', title: 'School Partner Volunteer', desc: 'Assist in organizing BNF workshops & psychometric sessions at local partner schools.', icon: '🏫' },
    { cat: 'outreach', title: 'Student Campus Ambassador', desc: 'Represent BNF across your college campus, leading student awareness drives.', icon: '🎓' },
    { cat: 'outreach', title: 'University Partner Liaison', desc: 'Connect BNF with university career cells and student leadership councils.', icon: '🏛️' },
    { cat: 'outreach', title: 'NEP Workshop Facilitator', desc: 'Support facilitators during NEP 2020 career guidance interactive sessions.', icon: '📜' },

    // Category 2: Guidance & Mentoring
    { cat: 'guidance', title: 'Student Mentor', desc: 'Provide 1-on-1 guidance to high school students working through guided journals.', icon: '👨‍🏫' },
    { cat: 'guidance', title: 'Career Counselor Volunteer', desc: 'Help students explore streams and degree pathways based on baseline reports.', icon: '🧭' },
    { cat: 'guidance', title: 'Baseline Test Assessor', desc: 'Assist in scoring and organizing psychometric evaluation result summaries.', icon: '📊' },
    { cat: 'guidance', title: 'Peer Guidance Lead', desc: 'Lead student peer-to-peer discussion circles during regional workshops.', icon: '🤝' },

    // Category 3: Content & Design
    { cat: 'content', title: 'Journaling Facilitator', desc: 'Guide students on effective journaling habits during classroom sessions.', icon: '📔' },
    { cat: 'content', title: 'Curriculum Content Creator', desc: 'Draft reflection prompts, career stories, and goal-setting exercises for journals.', icon: '✍️' },
    { cat: 'content', title: 'Design & Infographic Creator', desc: 'Create visually engaging infographics and student worksheets using brand colors.', icon: '🎨' },
    { cat: 'content', title: 'Copywriter & Editor', desc: 'Edit newsletter updates, blog posts, and educational guides for students.', icon: '📝' },

    // Category 4: Media & Events
    { cat: 'media', title: 'Event Volunteer', desc: 'Coordinate venue setups, student registrations, and logistics for BNF seminars.', icon: '📍' },
    { cat: 'media', title: 'Photographer / Videographer', desc: 'Capture high-energy photos and video reels during student workshops and events.', icon: '📸' },
    { cat: 'media', title: 'Social Media Ambassador', desc: 'Amplify BNF campaigns, reels, and student success stories across social platforms.', icon: '📱' },
    { cat: 'media', title: 'Community Manager', desc: 'Engage with student queries and volunteer cohorts across online groups.', icon: '💬' },

    // Category 5: Impact & Fundraiser
    { cat: 'fundraising', title: 'Fundraiser Volunteer', desc: 'Help raise funds and resources to deliver free journals to underserved students.', icon: '💚' },
    { cat: 'fundraising', title: 'CSR Program Liaison', desc: 'Assist in coordinating CSR sponsor meetings and impact report compilations.', icon: '💼' },
    { cat: 'fundraising', title: 'NGO Network Coordinator', desc: 'Build relationships with local educational NGOs and community centers.', icon: '🌐' },
    { cat: 'fundraising', title: 'Impact Analytics Assistant', desc: 'Collect baseline vs endline data to quantify student growth metrics.', icon: '📈' },

    // Category 6: Tech & Operations
    { cat: 'tech', title: 'Website & UI Developer', desc: 'Contribute frontend features and web enhancements to the official BNF portal.', icon: '💻' },
    { cat: 'tech', title: 'Data Operations Lead', desc: 'Organize student test database entries and report generation workflows.', icon: '🗄️' },
    { cat: 'tech', title: 'Logistics Coordinator', desc: 'Manage physical journal inventory packing and school delivery dispatches.', icon: '📦' },
    { cat: 'tech', title: 'Volunteer Cohort Coordinator', desc: 'Help onboard, train, and manage new volunteer cohorts in your city.', icon: '📋' },
  ];

  const filteredRoles = activeCategory === 'all' ? roles : roles.filter((r) => r.cat === activeCategory);

  return (
    <section id="what-youll-do" className="py-28 bg-[#FAFAF7] relative overflow-hidden scroll-mt-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <FadeIn>
            <span className="text-[#138808] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Comprehensive Opportunities
            </span>
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3 mb-4">
              What You Can Do at BNF
            </h2>
            <p className="text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] text-base md:text-lg">
              Explore 24+ specialized volunteer roles across our core operating domains. Select a role to get pre-filled in the sign-up form.
            </p>
          </FadeIn>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-[family-name:var(--font-sora)] transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#138808] text-white shadow-lg scale-102'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Role Grid Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((r, i) => (
            <FadeIn key={r.title} delay={0.05 * (i % 6)}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div className="space-y-3">
                  <span className="text-3xl block group-hover:scale-110 transition-transform">
                    {r.icon}
                  </span>
                  <h3 className="font-[family-name:var(--font-sora)] font-bold text-lg text-[#0D4F4F] group-hover:text-[#138808] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] leading-relaxed">
                    {r.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-gray-100 mt-4">
                  <button
                    onClick={() => onSelectRole(r.title)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#138808] font-[family-name:var(--font-sora)] group-hover:underline"
                  >
                    Select Role & Sign Up →
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
   4. VOLUNTEER SIGN-UP FORM SECTION
   ═══════════════════════════════════════════════════ */
function VolunteerSignUpForm({ prefilledRole }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    age: '',
    occupation: 'Student',
    interests: [],
    availability: [],
    whyVolunteer: prefilledRole ? `Interested in volunteering for: ${prefilledRole}` : '',
  });
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (prefilledRole) {
      setFormData((prev) => ({
        ...prev,
        whyVolunteer: `Interested in volunteering for: ${prefilledRole}`,
      }));
    }
  }, [prefilledRole]);

  const interestOptions = [
    'School Outreach',
    'Student Mentoring',
    'Psychometric Guidance',
    'Content & Journaling',
    'Photography & Video',
    'Social Media',
    'Fundraising & CSR',
    'Tech & Ops',
  ];

  const availabilityOptions = ['Weekdays', 'Weekends', 'Flexible'];

  const toggleInterest = (item) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const toggleAvailability = (item) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(item)
        ? prev.availability.filter((a) => a !== item)
        : [...prev.availability, item],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        age: '',
        occupation: 'Student',
        interests: [],
        availability: [],
        whyVolunteer: '',
      });
    }, 3000);
  };

  return (
    <section id="signup-form" className="py-28 bg-white relative overflow-hidden scroll-mt-20">
      <Container className="max-w-4xl">
        <FadeIn>
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200/90 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-[#138808] via-[#FF9933] to-[#0D4F4F]" />

            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#138808] font-[family-name:var(--font-sora)] block mb-1">
                Join the BNF Movement
              </span>
              <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F]">
                Sign Up to Volunteer with BNF
              </h2>
              <p className="text-sm text-[#0F1F1F]/65 font-[family-name:var(--font-inter)] mt-2">
                Fill in your details below and our volunteer onboarding team will reach out within 48 hours.
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
                  Welcome to the BNF Volunteer Family!
                </h3>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)] max-w-md mx-auto">
                  Your application has been received. Check your email inbox for our welcome kit and orientation schedule.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#138808] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#138808] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
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
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#138808] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* City, Age, Occupation Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Indore, Bhopal, Delhi..."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#138808] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      min="15"
                      max="80"
                      placeholder="e.g. 21"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#138808] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                      Occupation *
                    </label>
                    <select
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#138808] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white text-gray-800 cursor-pointer font-medium"
                    >
                      <option value="Student">Student (School / College)</option>
                      <option value="Working Professional">Working Professional</option>
                      <option value="Educator">Teacher / Educator</option>
                      <option value="Freelancer">Freelancer / Creative</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Area of Interest Multi-select Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                    Area of Interest (Multi-select) *
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
                              ? 'bg-[#138808] text-white border-[#138808] shadow-md'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Availability Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                    Availability *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {availabilityOptions.map((avail) => {
                      const isSelected = formData.availability.includes(avail);
                      return (
                        <button
                          key={avail}
                          type="button"
                          onClick={() => toggleAvailability(avail)}
                          className={`px-5 py-2.5 rounded-full text-xs font-bold font-[family-name:var(--font-inter)] border transition-all ${
                            isSelected
                              ? 'bg-[#0D4F4F] text-white border-[#0D4F4F] shadow-md'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{avail}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Why do you want to volunteer Textarea */}
                <div>
                  <label className="block text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                    Why do you want to volunteer with BNF? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your motivation, relevant skills, or specific volunteer goals..."
                    value={formData.whyVolunteer}
                    onChange={(e) => setFormData({ ...formData, whyVolunteer: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#138808] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white resize-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-full bg-[#138808] text-white font-[family-name:var(--font-sora)] font-bold text-base shadow-xl hover:bg-[#0f6b06] transition-colors"
                >
                  Sign Me Up! →
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
   5. FULL-BLEED ORGANIC VOLUNTEER CTA BANNER
   ═══════════════════════════════════════════════════ */
function VolunteerCTA() {
  return (
    <section className="relative py-28 bg-[#138808] text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-white/20 pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl">
        <FadeIn>
          <span className="text-[#FF9933] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
            Be the Spark of Transformation
          </span>
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-white mt-4 mb-6 leading-tight">
            Be a Part of the Movement Building Self-Aware, Future-Ready Individuals
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-white/90 font-[family-name:var(--font-inter)] text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Whether you can spare 2 hours a week or lead regional school drives, your contribution matters.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <motion.a
              href="#signup-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#FF9933] text-[#0F1F1F] px-10 py-5 rounded-full font-[family-name:var(--font-sora)] font-extrabold text-lg shadow-2xl hover:bg-[#e68524] transition-colors"
            >
              JOIN US NOW →
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-[family-name:var(--font-sora)] font-bold text-lg hover:bg-white/10 transition-colors"
            >
              CONTACT US
            </motion.a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   MAIN VOLUNTEER PAGE
   ═══════════════════════════════════════════════════ */
export default function VolunteerPage() {
  const [selectedRole, setSelectedRole] = useState('');

  const handleSelectRole = (roleTitle) => {
    setSelectedRole(roleTitle);
    const formElement = document.getElementById('signup-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <VolunteerHero />
        <WhyVolunteer />
        <WhatYoullDo onSelectRole={handleSelectRole} />
        <VolunteerSignUpForm prefilledRole={selectedRole} />
        <VolunteerCTA />
      </main>
      <Footer />
    </>
  );
}

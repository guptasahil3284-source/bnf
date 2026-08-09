'use client';

import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/sections/Footer';
import Container from '@/components/ui/Container';

/* ═══════════════════════════════════════════════════
   ANIMATION HELPER PRIMITIVES
   ═══════════════════════════════════════════════════ */

function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const map = { up: { y: 40 }, down: { y: -40 }, left: { x: 50 }, right: { x: -50 } };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...map[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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
   JOURNALS CATALOG DATA SET (12 Structured Books)
   ═══════════════════════════════════════════════════ */
const journalsData = [
  {
    id: 'future-engineer',
    title: 'Future Engineer Journal',
    category: 'Engineering',
    price: 499,
    originalPrice: 699,
    rating: 4.9,
    reviews: 128,
    color: '#0F4C81', // Deep Engineer Blue
    accentColor: '#5BB8D4',
    badge: 'Best Seller',
    tagline: 'Improve problem-solving, innovation and technical thinking.',
    description:
      'Designed for students passionate about engineering, coding, robotics, and technology. Helps you build logical problem-solving skills, log STEM projects, track progress, and stay focused on your dream engineering branch.',
    insideList: [
      'Daily Reflection & Coding Challenge Pages',
      'Weekly STEM & Logic Planner',
      'Project Innovation & Idea Incubator Sheets',
      'Career Exploration Tasks (IIT / NIT / Foreign University Roadmap)',
      'Quarterly Aptitude & Skills Tracker',
    ],
    audience: 'Students in Classes 9-12 and Engineering Undergraduates.',
    benefits: ['Better Focus', 'Critical Thinking', 'Career Clarity', 'Problem Solving', 'Confidence', 'Future Ready'],
    featured: true,
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur Journal',
    category: 'Business',
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviews: 112,
    color: '#E8705A', // Saffron Orange
    accentColor: '#FF9933',
    badge: 'Popular',
    tagline: 'Build leadership, business mindset and innovative ideas.',
    description:
      'Crafted for aspiring founders, business students, and creative visionaries. Turn raw ideas into structured business models, learn financial discipline, and cultivate resilience.',
    insideList: [
      'Business Model Canvas Reflection Pages',
      'Daily Market & Idea Validation Logs',
      'Pitch Deck & Elevator Pitch Frameworks',
      'Financial Discipline & Cash Flow Trackers',
      'Founder Resilience & Mindfulness Exercises',
    ],
    audience: 'Students interested in Startups, Commerce, MBA, and Business.',
    benefits: ['Strategic Thinking', 'Financial Awareness', 'Leadership', 'Risk Management', 'Confidence', 'Future Ready'],
    featured: true,
  },
  {
    id: 'medical-explorer',
    title: 'Medical Explorer Journal',
    category: 'Medical',
    price: 499,
    originalPrice: 699,
    rating: 4.9,
    reviews: 96,
    color: '#138808', // Emerald Forest Green
    accentColor: '#5BB8D4',
    badge: 'Recommended',
    tagline: 'Explore the world of medicine and human biology.',
    description:
      'Tailored for pre-med, NEET aspirants, and biology enthusiasts. Master complex medical concepts, maintain study discipline, and build empathy and mental fortitude.',
    insideList: [
      'Biology & Anatomical Concept Loggers',
      'NEET Revision & Mock Test Trackers',
      'Empathy & Clinical Ethics Reflection Exercises',
      'Stress Management & Burnout Prevention Sheets',
      'Medical Speciality Exploration Profiles',
    ],
    audience: 'Pre-Med, NEET Aspirants, MBBS & Biotechnology Students.',
    benefits: ['Study Discipline', 'Mental Fortitude', 'Medical Knowledge', 'Empathy', 'Focus', 'Future Ready'],
    featured: true,
  },
  {
    id: 'creative-designer',
    title: 'Creative Designer Journal',
    category: 'Creative Arts',
    price: 499,
    originalPrice: 699,
    rating: 4.7,
    reviews: 87,
    color: '#5B3256', // Deep Purple / Plum
    accentColor: '#E8705A',
    badge: 'Trending',
    tagline: 'Enhance imagination, creativity and visual thinking.',
    description:
      'Ideal for designers, artists, animators, and architects. Unblock creative potential, sketch daily visual ideas, and build a standout portfolio.',
    insideList: [
      'Grid & Blank Sketching Canvas Sheets',
      'Daily Moodboards & Color Palette Logs',
      'Design Thinking & User Problem Prompts',
      'Portfolio Development Milestones',
      'Creative Block Buster Exercises',
    ],
    audience: 'Design, NID/NIFT Aspirants, Fine Arts & Architecture Students.',
    benefits: ['Visual Thinking', 'Portfolio Growth', 'Creative Freedom', 'Innovation', 'Focus', 'Future Ready'],
    featured: true,
  },
  {
    id: 'leadership-journal',
    title: 'Leadership Journal',
    category: 'Leadership',
    price: 499,
    originalPrice: 649,
    rating: 4.9,
    reviews: 142,
    color: '#0D4F4F', // Deep Teal
    accentColor: '#FF9933',
    badge: 'Essential',
    tagline: 'Build confidence and effective leadership skills.',
    description:
      'Cultivate emotional intelligence, team management, public speaking, and decisiveness needed to lead in school, college, and career.',
    insideList: [
      'Public Speaking & Debate Loggers',
      'Emotional Intelligence (EQ) Reflection Prompts',
      'Team Conflict Resolution Frameworks',
      'Monthly Leadership Impact Scorecards',
    ],
    audience: 'School Captains, Student Council Members, & Student Leaders.',
    benefits: ['Public Speaking', 'Emotional Intelligence', 'Decision Making', 'Confidence', 'Leadership'],
    featured: false,
  },
  {
    id: 'student-success',
    title: 'Student Success Journal',
    category: 'Self Growth',
    price: 449,
    originalPrice: 599,
    rating: 4.8,
    reviews: 105,
    color: '#0A6666', // Deep Teal Green
    accentColor: '#5BB8D4',
    badge: 'Top Rated',
    tagline: 'Plan better, stay productive and achieve more.',
    description:
      'The foundational productivity journal for all students. Master time management, eliminate procrastination, and balance academics with extracurriculars.',
    insideList: [
      'Daily Pomodoro & Time-Block Planners',
      'Habit Loop & Goal Tracking Grids',
      'Exam Preparation Timelines',
      'Weekly Gratitude & Achievement Reviews',
    ],
    audience: 'All Students in Classes 6-12 & College Undergraduates.',
    benefits: ['Time Management', 'Productivity', 'Habit Building', 'Academic Growth'],
    featured: false,
  },
  {
    id: 'mental-wellness',
    title: 'Mental Wellness Journal',
    category: 'Self Growth',
    price: 449,
    originalPrice: 599,
    rating: 4.9,
    reviews: 160,
    color: '#C25975', // Rose Pink
    accentColor: '#E8705A',
    badge: 'Must Have',
    tagline: 'Improve mindfulness and emotional well-being.',
    description:
      'A safe space to manage academic stress, process emotions, practice gratitude, and build self-compassion during critical student years.',
    insideList: [
      'Daily Emotion & Anxiety Check-In Prompts',
      'Mindful Breathing & Grounding Exercises',
      'Gratitude & Positivity Trackers',
      'Self-Care Routine Builders',
    ],
    audience: 'Students seeking stress management, mindfulness & mental peace.',
    benefits: ['Stress Relief', 'Emotional Balance', 'Mindfulness', 'Self Care'],
    featured: false,
  },
  {
    id: 'goal-planner',
    title: 'Goal Planner Journal',
    category: 'Self Growth',
    price: 399,
    originalPrice: 499,
    rating: 4.7,
    reviews: 98,
    color: '#C98A2C', // Warm Gold
    accentColor: '#FF9933',
    badge: 'Value Pack',
    tagline: 'Set goals, track habits and stay consistent.',
    description:
      'Turn big yearly dreams into actionable monthly milestones and daily habits. Built on scientific habit formation frameworks.',
    insideList: [
      'SMART Goal Setting Worksheets',
      'Monthly Milestone Breakdown Pages',
      'Daily Habit Streak Checklists',
      'End-of-Month Review & Reflection',
    ],
    audience: 'Students looking to build discipline and achieve targets.',
    benefits: ['Goal Achievement', 'Consistency', 'Habit Building', 'Focus'],
    featured: false,
  },
  {
    id: 'civil-services-prep',
    title: 'Civil Services Prep Journal',
    category: 'Civil Services',
    price: 499,
    originalPrice: 699,
    rating: 4.9,
    reviews: 115,
    color: '#1E293B', // Slate Navy
    accentColor: '#E8705A',
    badge: 'Specialized',
    tagline: 'Stay organized and focused on your preparation.',
    description:
      'Tailored for UPSC, State PSC, and competitive examination aspirants. Organize syllabus coverage, current affairs notes, and answer writing practice.',
    insideList: [
      'UPSC / State PSC Syllabus Tracker',
      'Daily Current Affairs Summary Log',
      'Mains Answer Writing Practice Prompts',
      'Mock Test Score & Error Analysis Grids',
    ],
    audience: 'Civil Services, UPSC, & Competitive Exam Aspirants.',
    benefits: ['Syllabus Mastery', 'Exam Focus', 'Consistency', 'Strategic Prep'],
    featured: false,
  },
  {
    id: 'researcher-journal',
    title: 'Researcher Journal',
    category: 'Engineering',
    price: 449,
    originalPrice: 599,
    rating: 4.8,
    reviews: 76,
    color: '#065F46', // Deep Emerald
    accentColor: '#5BB8D4',
    badge: 'Academic',
    tagline: 'Perfect for research ideas, notes and experiments.',
    description:
      'Designed for young scientists, researchers, and scholars. Record literature reviews, document hypotheses, and track lab experiment outcomes.',
    insideList: [
      'Hypothesis & Experiment Methodology Grids',
      'Literature Citation & Paper Summary Logs',
      'Data Analysis & Visualization Sketches',
    ],
    audience: 'Science, Research & Higher Education Students.',
    benefits: ['Research Rigor', 'Data Organization', 'Scientific Method'],
    featured: false,
  },
  {
    id: 'financial-literacy',
    title: 'Financial Literacy Journal',
    category: 'Business',
    price: 399,
    originalPrice: 499,
    rating: 4.7,
    reviews: 88,
    color: '#78350F', // Bronze Brown
    accentColor: '#FF9933',
    badge: 'Essential Skills',
    tagline: 'Learn, plan and grow your financial knowledge.',
    description:
      'Master personal budgeting, savings goals, stock market basics, and smart money habits early in life.',
    insideList: [
      'Monthly Income & Expense Loggers',
      'Savings & Investment Goal Trackers',
      'Financial Concept Flash Prompts',
    ],
    audience: 'Students building early financial independence.',
    benefits: ['Money Management', 'Savings Habit', 'Financial IQ'],
    featured: false,
  },
  {
    id: 'artist-sketch',
    title: 'Artist Sketch & Idea Journal',
    category: 'Creative Arts',
    price: 449,
    originalPrice: 599,
    rating: 4.8,
    reviews: 92,
    color: '#4C1D95', // Violet
    accentColor: '#E8705A',
    badge: 'Creative Pack',
    tagline: 'Sketch, doodle and capture your creative ideas.',
    description:
      'Premium heavy-gsm paper pages for drawing, doodling, concept art, and visual storyboarding.',
    insideList: [
      'Heavy GSM Unlined Sketch Pages',
      'Visual Storyboard Layout Grid',
      'Creative Expression Prompts',
    ],
    audience: 'Artists, Animators, Illustrators & Storytellers.',
    benefits: ['Creative Expression', 'Doodling', 'Visual Art'],
    featured: false,
  },
];

/* ═══════════════════════════════════════════════════
   STORE HERO BANNER SECTION
   ═══════════════════════════════════════════════════ */
function StoreHero({ onExplore }) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0D4F4F] via-[#0A3A3A] to-[#0F1F1F] text-white overflow-hidden pt-28">
      {/* Background Glow Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] bg-[#E8705A]/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[130px] bg-[#5BB8D4]/20 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text — 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-ping" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-[family-name:var(--font-sora)]">
                  BNF Personalized Journal Store
                </span>
              </div>
            </FadeIn>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-sora)] font-extrabold text-white leading-tight">
              <TextReveal text="Unlock Your Potential One Journal at a Time" delay={0.2} />
            </h1>

            <FadeIn delay={0.4}>
              <p className="text-base sm:text-lg text-gray-200 font-[family-name:var(--font-inter)] max-w-xl leading-relaxed">
                Discover personalized journals designed according to your personality, interests, and career aspirations. Every journal is built to guide your self-discovery, reflection, and future growth.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onExplore}
                  className="px-8 py-4 rounded-full bg-[#E8705A] text-white font-[family-name:var(--font-sora)] font-bold text-sm shadow-xl hover:bg-[#d4624e] transition-transform hover:scale-105"
                >
                  Explore Journals 🛍️
                </button>
                <Link
                  href="/journaling"
                  className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-[family-name:var(--font-sora)] font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md"
                >
                  Take Psychometric Assessment 🧠
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Banner Visual — 5 cols */}
          <div className="lg:col-span-5 relative">
            <FadeIn direction="left" delay={0.3}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-[#0F1F1F]">
                <Image
                  src="/images/product/hero-banner.jpg"
                  alt="BNF Guided Journal Store"
                  width={600}
                  height={400}
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover w-full h-[360px] sm:h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-bold text-[#FF9933] uppercase font-[family-name:var(--font-sora)] block">
                    ⚡ 10,000+ Students Guided Across India
                  </span>
                  <p className="text-xs text-gray-200 font-[family-name:var(--font-inter)]">
                    Calibrated specifically for School, College, and Professional Aspirations.
                  </p>
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
   PRODUCT QUICK VIEW MODAL / DRAWER
   ═══════════════════════════════════════════════════ */
function ProductQuickViewModal({ journal, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!isOpen || !journal) return null;

  const sampleThumbnails = [
    { label: 'Cover View', color: journal.color },
    { label: 'Daily Page', color: '#FAFAF7' },
    { label: 'Weekly Planner', color: '#F0F4F4' },
    { label: 'Reflection Sheet', color: '#FFF8F0' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl z-10 border-2 border-gray-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar Accent */}
          <div
            className="h-2 w-full"
            style={{ backgroundColor: journal.color }}
          />

          {/* Sticky Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 font-[family-name:var(--font-inter)]">
                Home / Journals /
              </span>
              <span className="text-xs font-bold text-[#0D4F4F] font-[family-name:var(--font-sora)]">
                {journal.title}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: 3D Journal Mockup Gallery — 5 cols */}
              <div className="md:col-span-5 space-y-4">
                <div
                  className="rounded-3xl p-8 text-white text-center shadow-xl flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden transition-all"
                  style={{ backgroundColor: journal.color }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl mb-4">
                    📘
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/80 font-[family-name:var(--font-sora)] mb-1">
                    BNF GUIDED JOURNAL
                  </span>
                  <h3 className="text-xl font-[family-name:var(--font-sora)] font-extrabold text-white max-w-[200px] leading-tight">
                    {journal.title}
                  </h3>
                  <span className="text-xs text-white/80 font-[family-name:var(--font-inter)] mt-3 block">
                    {journal.category} Edition
                  </span>
                  <div className="absolute bottom-4 right-4 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-white">
                    ⭐ {journal.rating}
                  </div>
                </div>

                {/* Thumbnails list */}
                <div className="grid grid-cols-4 gap-2">
                  {sampleThumbnails.map((t, idx) => (
                    <button
                      key={t.label}
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`p-2 rounded-xl border text-[10px] font-bold font-[family-name:var(--font-inter)] text-center transition-all ${
                        selectedImgIdx === idx
                          ? 'border-[#0D4F4F] bg-gray-100 font-extrabold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Product Details & Purchase Controls — 7 cols */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full text-white font-[family-name:var(--font-sora)]"
                      style={{ backgroundColor: journal.color }}
                    >
                      {journal.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      In Stock • Available
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F]">
                    {journal.title}
                  </h2>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-amber-500 text-sm font-bold">
                      {'★'.repeat(Math.floor(journal.rating))}
                    </span>
                    <span className="text-xs font-bold text-gray-700 font-[family-name:var(--font-inter)]">
                      {journal.rating} ({journal.reviews} Reviews)
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 border-t border-b border-gray-100 py-3">
                  <span className="text-3xl font-extrabold text-[#0D4F4F] font-[family-name:var(--font-sora)]">
                    ₹{journal.price}
                  </span>
                  <span className="text-sm line-through text-gray-400 font-[family-name:var(--font-inter)]">
                    ₹{journal.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 font-[family-name:var(--font-inter)]">
                    Save ₹{journal.originalPrice - journal.price} (28% OFF)
                  </span>
                </div>

                {/* About Summary */}
                <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)] leading-relaxed">
                  {journal.description}
                </p>

                {/* What's Inside Checklist */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4F4F] font-[family-name:var(--font-sora)] mb-2">
                    What&apos;s Inside?
                  </h4>
                  <ul className="space-y-1.5">
                    {journal.insideList.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-700 font-[family-name:var(--font-inter)]">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity & Add to Cart Controls */}
                <div className="pt-2 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-700 font-[family-name:var(--font-sora)] uppercase">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-sm font-bold text-[#0D4F4F]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        onAddToCart(journal, quantity);
                        onClose();
                      }}
                      className="flex-1 min-w-[160px] py-4 rounded-xl bg-[#E8705A] text-white font-[family-name:var(--font-sora)] font-bold text-sm shadow-xl hover:bg-[#d4624e] transition-colors"
                    >
                      Add to Cart (₹{journal.price * quantity}) →
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(journal, quantity);
                        onClose();
                      }}
                      className="flex-1 min-w-[140px] py-4 rounded-xl bg-[#138808] text-white font-[family-name:var(--font-sora)] font-bold text-sm shadow-xl hover:bg-[#0f6b06] transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════
   SLIDE-OVER SHOPPING CART DRAWER
   ═══════════════════════════════════════════════════ */
function ShoppingCartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#0D4F4F] text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <h3 className="font-[family-name:var(--font-sora)] font-bold text-lg">
                Your Journal Cart ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 text-white font-bold flex items-center justify-center hover:bg-white/30"
            >
              ✕
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-grow space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <span className="text-5xl block">🛍️</span>
                <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] text-lg">
                  Your Cart is Empty
                </h4>
                <p className="text-xs text-gray-500 font-[family-name:var(--font-inter)]">
                  Browse our catalog and select a journal aligned with your career goals.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-gray-200 flex items-center gap-4 bg-[#FAFAF7]"
                >
                  <div
                    className="w-12 h-14 rounded-xl flex items-center justify-center text-white text-lg shrink-0 font-bold"
                    style={{ backgroundColor: item.color }}
                  >
                    📘
                  </div>

                  <div className="flex-grow">
                    <h4 className="font-[family-name:var(--font-sora)] font-bold text-sm text-[#0D4F4F]">
                      {item.title}
                    </h4>
                    <span className="text-xs font-bold text-[#E8705A] block">
                      ₹{item.price} x {item.quantity}
                    </span>

                    {/* Quantity Adjustment */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-gray-200 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-gray-200 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-xs text-red-500 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center text-sm font-[family-name:var(--font-sora)]">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-extrabold text-xl text-[#0D4F4F]">₹{subtotal}</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold">
                ✓ Free Shipping across India on orders above ₹499
              </p>

              <button
                onClick={() => alert('Redirecting to Secure Payment Gateway...')}
                className="w-full py-4 rounded-xl bg-[#E8705A] text-white font-[family-name:var(--font-sora)] font-bold text-base shadow-xl hover:bg-[#d4624e] transition-colors"
              >
                Proceed to Checkout →
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PRODUCT / STORE PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ProductStorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 4 items per page for clean pagination

  const [selectedJournal, setSelectedJournal] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { ...journalsData[0], quantity: 1 }, // Pre-filled default sample item
  ]);

  const catalogRef = useRef(null);

  const categories = [
    'All',
    'Engineering',
    'Medical',
    'Business',
    'Creative Arts',
    'Civil Services',
    'Self Growth',
    'Leadership',
  ];

  // Filtering Logic
  const filteredJournals = journalsData.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Reset pagination on filter change
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Pagination Math
  const totalPages = Math.ceil(filteredJournals.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJournals = filteredJournals.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (catalogRef.current) {
        catalogRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Add to Cart
  const handleAddToCart = (journal, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === journal.id);
      if (existing) {
        return prev.map((i) => (i.id === journal.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...prev, { ...journal, quantity: qty }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i)));
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <>
      <Navbar />

      {/* Floating Cart Launcher Button */}
      <motion.button
        onClick={() => setCartOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 bg-[#E8705A] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white cursor-pointer"
      >
        <span className="text-xl">🛒</span>
        <span className="text-xs font-bold font-[family-name:var(--font-sora)]">
          Cart ({totalCartCount})
        </span>
      </motion.button>

      <main className="bg-[#FAFAF7]">
        {/* Top Sub-Header Announcement Strip */}
        <div className="bg-[#0D4F4F] py-2.5 px-4 text-center text-xs font-bold text-white/90 uppercase tracking-widest font-[family-name:var(--font-sora)] pt-24">
          ✨ Empowering Students Through Psychometric Assessment & Personalized Journaling
        </div>

        {/* Hero Section */}
        <StoreHero
          onExplore={() => {
            if (catalogRef.current) {
              catalogRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Search, Filter & Catalog Section */}
        <section ref={catalogRef} className="py-20 scroll-mt-20">
          <Container>
            {/* Search & Controls Bar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 mb-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Search Bar — 6 cols */}
                <div className="md:col-span-6 relative">
                  <span className="absolute left-4 top-3.5 text-gray-400 text-base">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by career, interest or journal name..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#E8705A] text-sm font-[family-name:var(--font-inter)] bg-gray-50/50 focus:bg-white transition-colors"
                  />
                </div>

                {/* Category Dropdown — 3 cols */}
                <div className="md:col-span-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-xs sm:text-sm font-bold text-[#0D4F4F] font-[family-name:var(--font-sora)] bg-gray-50/50 focus:bg-white cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        Category: {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Selector — 3 cols */}
                <div className="md:col-span-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-xs sm:text-sm font-bold text-gray-700 font-[family-name:var(--font-sora)] bg-gray-50/50 focus:bg-white cursor-pointer"
                  >
                    <option value="popular">Sort By: Most Popular</option>
                    <option value="rating">Sort By: Highest Rating</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold font-[family-name:var(--font-sora)] shrink-0 transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#E8705A] text-white shadow-md scale-102'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid Heading & Stats */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E8705A] font-[family-name:var(--font-sora)] block">
                  Recommended For You
                </span>
                <h2 className="text-2xl sm:text-4xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F]">
                  BNF Guided Journals Catalog
                </h2>
              </div>
              <span className="text-xs font-bold text-gray-500 font-[family-name:var(--font-inter)]">
                Showing {filteredJournals.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + itemsPerPage, filteredJournals.length)} of {filteredJournals.length} Journals
              </span>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {paginatedJournals.map((journal, i) => (
                <FadeIn key={journal.id} delay={0.05 * (i % 4)}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[10px] font-bold px-3 py-1 rounded-full text-white font-[family-name:var(--font-sora)]"
                        style={{ backgroundColor: journal.color }}
                      >
                        {journal.category}
                      </span>
                      <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                        ★ {journal.rating}
                      </span>
                    </div>

                    {/* 3D Journal Book Visual Card */}
                    <div
                      onClick={() => {
                        setSelectedJournal(journal);
                        setQuickViewOpen(true);
                      }}
                      className="rounded-2xl p-6 text-white text-center shadow-lg flex flex-col items-center justify-center min-h-[220px] cursor-pointer relative overflow-hidden group-hover:scale-103 transition-transform"
                      style={{ backgroundColor: journal.color }}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl mb-3">
                        📘
                      </div>
                      <h3 className="font-[family-name:var(--font-sora)] font-extrabold text-lg text-white leading-tight">
                        {journal.title}
                      </h3>
                      <span className="text-[10px] text-white/80 font-[family-name:var(--font-inter)] mt-2 block">
                        Quick Preview →
                      </span>
                    </div>

                    {/* Description & Price */}
                    <div className="mt-4 space-y-2">
                      <h4 className="font-[family-name:var(--font-sora)] font-bold text-base text-[#0D4F4F]">
                        {journal.title}
                      </h4>
                      <p className="text-xs text-gray-600 font-[family-name:var(--font-inter)] line-clamp-2 leading-relaxed">
                        {journal.tagline}
                      </p>

                      <div className="flex items-baseline gap-2 pt-2">
                        <span className="text-xl font-extrabold text-[#0D4F4F] font-[family-name:var(--font-sora)]">
                          ₹{journal.price}
                        </span>
                        <span className="text-xs line-through text-gray-400 font-[family-name:var(--font-inter)]">
                          ₹{journal.originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                      <button
                        onClick={() => handleAddToCart(journal, 1)}
                        className="w-full py-3 rounded-xl bg-[#E8705A] text-white font-[family-name:var(--font-sora)] font-bold text-xs shadow-md hover:bg-[#d4624e] transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJournal(journal);
                          setQuickViewOpen(true);
                        }}
                        className="w-full py-2.5 rounded-xl bg-gray-100 text-[#0D4F4F] font-[family-name:var(--font-sora)] font-bold text-xs hover:bg-gray-200 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>

            {/* Pagination Controls Bar with Prev/Next Arrows */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-200 pt-8 mt-12 flex-wrap gap-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-5 py-3 rounded-2xl font-[family-name:var(--font-sora)] font-bold text-xs flex items-center gap-2 transition-all ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#0D4F4F] text-white hover:bg-[#073636] shadow-md'
                  }`}
                >
                  ← Prev
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-10 h-10 rounded-2xl font-[family-name:var(--font-sora)] font-bold text-xs transition-all ${
                        currentPage === pageNum
                          ? 'bg-[#E8705A] text-white shadow-lg scale-105'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-3 rounded-2xl font-[family-name:var(--font-sora)] font-bold text-xs flex items-center gap-2 transition-all ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#0D4F4F] text-white hover:bg-[#073636] shadow-md'
                  }`}
                >
                  Next →
                </button>
              </div>
            )}

            {/* 5-Step Workflow Banner Strip */}
            <div className="mt-20 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-200/80">
              <div className="text-center mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0D4F4F] font-[family-name:var(--font-sora)] block">
                  How It Works
                </span>
                <h3 className="text-2xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-1">
                  5 Steps to Personalized Student Growth
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 text-center">
                {[
                  { step: '1', title: 'Take Assessment', desc: 'Discover your strengths and interests.' },
                  { step: '2', title: 'Get Recommendations', desc: 'We suggest the best journals for you.' },
                  { step: '3', title: 'Choose Your Journal', desc: 'Select a journal that matches your goals.' },
                  { step: '4', title: 'Reflect & Grow', desc: 'Write, reflect and track progress daily.' },
                  { step: '5', title: 'Achieve Your Goals', desc: 'Build the future you desire.' },
                ].map((s) => (
                  <div key={s.step} className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-[#E8705A] text-white font-bold flex items-center justify-center mx-auto text-sm shadow-md font-[family-name:var(--font-sora)]">
                      {s.step}
                    </div>
                    <h4 className="font-[family-name:var(--font-sora)] font-bold text-xs text-[#0D4F4F]">
                      {s.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-[family-name:var(--font-inter)] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        journal={selectedJournal}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <ShoppingCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </>
  );
}

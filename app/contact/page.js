'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
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
   1. CONTACT HERO SECTION
   ═══════════════════════════════════════════════════ */
function ContactHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  const contactChips = [
    { icon: '✉️', label: 'info@bodhini.org', href: 'mailto:info@bodhini.org' },
    { icon: '📞', label: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: '📍', label: 'Indore, Madhya Pradesh, India', href: '#map' },
  ];

  return (
    <section ref={ref} className="relative py-28 bg-[#0D4F4F] text-white overflow-hidden min-h-[540px] flex items-center pt-32">
      {/* Background Gradient Mesh */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D4F4F] via-[#0A3A3A] to-[#0F1F1F]" />
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full blur-[160px] bg-[#E8705A]/20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full blur-[140px] bg-[#5BB8D4]/20 pointer-events-none" />
      </motion.div>

      <Particles count={30} color="rgba(255,255,255,0.3)" />

      <Container className="relative z-10 text-center">
        {/* Badge */}
        <FadeIn>
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8705A] animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-widest font-[family-name:var(--font-sora)]">
              We&apos;d Love to Hear From You
            </span>
          </div>
        </FadeIn>

        {/* H1 Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-sora)] font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto">
          <TextReveal text="Get In Touch With Us" delay={0.2} />
        </h1>

        {/* Subtitle */}
        <FadeIn delay={0.4}>
          <p className="text-lg md:text-xl text-[#DEE2E6] font-[family-name:var(--font-inter)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are a school, a student, a partner or just curious — we are here to answer every question.
          </p>
        </FadeIn>

        {/* Contact Strip (3 Chips) */}
        <FadeIn delay={0.6}>
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto">
            {contactChips.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-white font-[family-name:var(--font-inter)] hover:bg-white/20 hover:border-white/40 transition-all shadow-md"
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   2. CONTACT FORM & INFO SECTION (Split Column)
   ═══════════════════════════════════════════════════ */
function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Student',
    message: '',
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', role: 'Student', message: '', agree: false });
    }, 3000);
  };

  return (
    <section className="py-28 bg-[#FAFAF7] relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Contact Form — 7 cols */}
          <div className="lg:col-span-7">
            <FadeIn direction="right">
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200/80 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0D4F4F] via-[#E8705A] to-[#5BB8D4]" />

                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E8705A] font-[family-name:var(--font-sora)] block mb-1">
                    Send Us a Message
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F]">
                    How Can We Help You?
                  </h3>
                </div>

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
                      Message Sent Successfully!
                    </h4>
                    <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)] max-w-md mx-auto">
                      Thank you for reaching out. Our team will review your message and respond within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8705A] transition-colors text-sm font-[family-name:var(--font-inter)] shadow-sm bg-gray-50/50 focus:bg-white"
                      />
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="ananya@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8705A] transition-colors text-sm font-[family-name:var(--font-inter)] shadow-sm bg-gray-50/50 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8705A] transition-colors text-sm font-[family-name:var(--font-inter)] shadow-sm bg-gray-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Role Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                        I am a: *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8705A] transition-colors text-sm font-[family-name:var(--font-inter)] shadow-sm bg-gray-50/50 focus:bg-white text-gray-700 cursor-pointer"
                      >
                        <option value="Student">Student (School / College)</option>
                        <option value="School">School Representative / Principal</option>
                        <option value="College">College Representative / Dean</option>
                        <option value="NGO">NGO Partner</option>
                        <option value="CSR">CSR Company / Sponsor</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0D4F4F] uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about your requirements, student count, or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8705A] transition-colors text-sm font-[family-name:var(--font-inter)] shadow-sm bg-gray-50/50 focus:bg-white resize-none"
                      />
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="agree"
                        required
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        className="w-4 h-4 rounded text-[#E8705A] focus:ring-[#E8705A] accent-[#E8705A]"
                      />
                      <label htmlFor="agree" className="text-xs text-gray-600 font-[family-name:var(--font-inter)] cursor-pointer">
                        I agree to the privacy policy & allow BNF Foundation to contact me.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 rounded-full bg-[#E8705A] text-white font-[family-name:var(--font-sora)] font-bold text-base shadow-xl hover:bg-[#d4624e] transition-colors"
                    >
                      Send Message →
                    </motion.button>

                    <p className="text-center text-xs text-[#6C757D] font-[family-name:var(--font-inter)]">
                      ⚡ We respond within 24 hours during business days.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Right: Contact Info & Map — 5 cols */}
          <div className="lg:col-span-5 space-y-8">
            <FadeIn direction="left">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0D4F4F] font-[family-name:var(--font-sora)] block mb-1">
                    Contact Details
                  </span>
                  <h3 className="text-2xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]">
                    Our Details
                  </h3>
                </div>

                {/* Details Items */}
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8705A]/15 text-[#E8705A] flex items-center justify-center text-xl shrink-0">
                      📧
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-gray-400 block font-[family-name:var(--font-sora)]">
                        Email Us
                      </span>
                      <a href="mailto:info@bodhini.org" className="text-[#E8705A] font-bold font-[family-name:var(--font-inter)] hover:underline">
                        info@bodhini.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0D4F4F]/15 text-[#0D4F4F] flex items-center justify-center text-xl shrink-0">
                      📞
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-gray-400 block font-[family-name:var(--font-sora)]">
                        Call Us
                      </span>
                      <a href="tel:+919876543210" className="text-[#0D4F4F] font-bold font-[family-name:var(--font-inter)] hover:underline">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#138808]/15 text-[#138808] flex items-center justify-center text-xl shrink-0">
                      📍
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-gray-400 block font-[family-name:var(--font-sora)]">
                        Head Office Address
                      </span>
                      <p className="text-sm font-semibold text-gray-800 font-[family-name:var(--font-inter)] leading-relaxed">
                        Bodhini NextGen Foundation<br />
                        Indore, Madhya Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#5BB8D4]/15 text-[#5BB8D4] flex items-center justify-center text-xl shrink-0">
                      🕒
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-gray-400 block font-[family-name:var(--font-sora)]">
                        Office Hours
                      </span>
                      <p className="text-sm font-semibold text-gray-800 font-[family-name:var(--font-inter)]">
                        Mon – Sat: 10:00 AM – 6:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Embedded OpenStreetMap Container */}
            <FadeIn direction="left" delay={0.3}>
              <div id="map" className="rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-white">
                <div className="bg-[#0D4F4F] px-5 py-3 text-white flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider font-[family-name:var(--font-sora)]">
                    📍 Indore Office Location
                  </span>
                  <span className="text-[10px] text-white/70">OpenStreetMap</span>
                </div>
                <div className="h-[240px] w-full relative">
                  <iframe
                    title="Bodhini NextGen Foundation Location Map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=75.8000%2C22.6500%2C75.9500%2C22.7800&amp;layer=mapnik&amp;marker=22.7196%2C75.8577"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
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
   3. SOCIAL MEDIA SHOWCASE STRIP
   ═══════════════════════════════════════════════════ */
function SocialMediaStrip() {
  const channels = [
    { name: 'Instagram', handle: '@bodhininextgen', icon: '📸', color: '#E8705A', link: '#' },
    { name: 'Facebook', handle: 'Bodhini NextGen Foundation', icon: '👤', color: '#0D4F4F', link: '#' },
    { name: 'LinkedIn', handle: 'Bodhini NextGen Foundation', icon: '💼', color: '#138808', link: '#' },
    { name: 'YouTube', handle: '@BodhiniNextGen', icon: '▶️', color: '#E8705A', link: '#' },
    { name: 'Twitter / X', handle: '@BodhiniNGF', icon: '𝕏', color: '#0D4F4F', link: '#' },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-b border-gray-100">
      <Container>
        <div className="text-center mb-12">
          <FadeIn>
            <span className="text-[#0D4F4F] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Connect With Us
            </span>
            <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] mt-2">
              Follow BNF Across Social Platforms
            </h3>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {channels.map((ch, i) => (
            <FadeIn key={ch.name} delay={0.1 * i}>
              <motion.a
                href={ch.link}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group bg-[#FAFAF7] rounded-2xl p-5 text-center border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center h-full cursor-pointer"
              >
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {ch.icon}
                </span>
                <h4 className="font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] text-sm mb-1">
                  {ch.name}
                </h4>
                <span className="text-xs text-gray-500 font-[family-name:var(--font-inter)] truncate max-w-full">
                  {ch.handle}
                </span>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   4. INTERACTIVE FAQ ACCORDION SECTION
   ═══════════════════════════════════════════════════ */
function ContactFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How can our school or college partner with BNF?',
      a: 'You can submit an inquiry through our contact form above or email us at info@bodhini.org. Our program manager will conduct a brief consultation and arrange a customized psychometric & journaling workshop for your students.',
    },
    {
      q: 'Are BNF psychometric tests aligned with standard educational policies?',
      a: 'Yes! All BNF assessments and journaling frameworks strictly adhere to the National Education Policy (NEP 2020) guidelines emphasizing holistic development and career awareness.',
    },
    {
      q: 'How do individual students receive their personal journals?',
      a: 'After completing their baseline psychometric assessment, each student receives their customized physical or digital BNF guided journal calibrated to their specific strengths.',
    },
    {
      q: 'Can CSR companies or NGOs sponsor BNF student programs?',
      a: 'Absolutely. We actively partner with CSR initiatives and NGOs to sponsor programs for underserved school students. Reach out via the contact form under the "CSR / NGO" category.',
    },
  ];

  return (
    <section className="py-28 bg-[#FAFAF7] relative overflow-hidden">
      <Container className="max-w-4xl">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="text-[#E8705A] font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-sora)] font-extrabold text-[#0D4F4F] mt-3">
              Got Questions? We Have Answers
            </h2>
          </FadeIn>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <FadeIn key={faq.q} delay={0.1 * i}>
                <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] text-base sm:text-lg focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0 text-sm font-bold">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 text-sm text-[#0F1F1F]/70 font-[family-name:var(--font-inter)] leading-relaxed border-t border-gray-100 pt-4"
                      >
                        {faq.a}
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
   MAIN CONTACT PAGE
   ═══════════════════════════════════════════════════ */
export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactFormSection />
        <SocialMediaStrip />
        <ContactFAQ />
      </main>
      <Footer />
    </>
  );
}

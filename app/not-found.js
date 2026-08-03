'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/sections/Footer';
import Container from '@/components/ui/Container';

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

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen py-36 bg-[#0F1F1F] text-white flex items-center justify-center relative overflow-hidden">
        {/* Background Animated Glowing Orbs */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-10 w-[550px] h-[550px] rounded-full blur-[160px] bg-[#E8705A]/25 pointer-events-none z-1"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full blur-[140px] bg-[#5BB8D4]/25 pointer-events-none z-1"
        />

        <Particles count={35} color="rgba(255,255,255,0.4)" />

        <Container className="relative z-10 text-center max-w-3xl">
          {/* Giant Animated 404 Numbers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-block mb-6"
          >
            <span className="text-[120px] sm:text-[180px] font-[family-name:var(--font-sora)] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E8705A] via-[#FF9933] to-[#5BB8D4] leading-none select-none tracking-tighter filter drop-shadow-2xl">
              404
            </span>
            <div className="absolute -top-3 -right-6 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-[#FF9933]">
              Page Missing
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-5xl font-[family-name:var(--font-sora)] font-extrabold text-white mb-4 leading-tight"
          >
            Oops! You&apos;ve Discovered Uncharted Territory.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg text-white/80 font-[family-name:var(--font-inter)] leading-relaxed mb-10 max-w-xl mx-auto"
          >
            The page you are looking for might have been moved, renamed, or doesn&apos;t exist in the BNF Growth Portal.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <Link
              href="/"
              className="bg-[#E8705A] text-white px-8 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-sm shadow-xl hover:bg-[#d4624e] transition-all hover:scale-105"
            >
              Back to Home →
            </Link>

            <Link
              href="/programs"
              className="bg-[#0D4F4F] text-white border border-white/20 px-8 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-sm shadow-xl hover:bg-[#093939] transition-all hover:scale-105"
            >
              Explore Programs 🎓
            </Link>

            <Link
              href="/contact"
              className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full font-[family-name:var(--font-sora)] font-bold text-sm hover:bg-white/20 transition-all hover:scale-105 backdrop-blur-md"
            >
              Contact Support ✉️
            </Link>
          </motion.div>

          {/* Popular Quick Links Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="border-t border-white/15 pt-8"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-white/50 block font-[family-name:var(--font-sora)] mb-4">
              Or Jump Directly To:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: 'About BNF', href: '/about' },
                { name: 'Journaling System', href: '/journaling' },
                { name: 'Impact Report', href: '/impact' },
                { name: 'Careers', href: '/career' },
                { name: 'Volunteer', href: '/volunteer' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-white/90 hover:bg-white/20 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </Container>
      </main>

      <Footer />
    </>
  );
}

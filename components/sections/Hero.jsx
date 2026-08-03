'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import AnimatedText from '@/components/ui/AnimatedText';
import FloatingIcon from '@/components/ui/FloatingIcon';
import HeroGallery from '@/components/ui/HeroGallery';

export default function Hero() {
  const stats = [
    { number: '5000+', label: 'Students Impacted' },
    { number: '100+', label: 'Partner Schools' },
    { number: '50+', label: 'Programs Run' },
  ];

  const floatingIcons = [
    { delay: 0, top: '5%', left: '5%', icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      </svg>
    )},
    { delay: 0.2, top: '12%', right: '5%', icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#5BB8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    )},
    { delay: 0.4, bottom: '15%', left: '8%', icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D4F4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )},
    { delay: 0.6, bottom: '10%', right: '8%', icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    )},
  ];

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center bg-[#FAFAF7] pt-20">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(13,79,79,0.2)_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(91,184,212,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(232,112,90,0.1)_0%,_transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center w-full">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start pt-10 pb-16 lg:py-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-[#0D4F4F]/10 mb-6"
          >
            <span className="text-sm font-medium text-[#0D4F4F]">🌱 Empowering India&apos;s Youth</span>
          </motion.div>

          <AnimatedText 
            text="Building Future-Ready Students" 
            tag="h1" 
            className="text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-sora)] font-bold text-[#0F1F1F] leading-tight mb-6"
            delay={0.2}
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#0F1F1F]/70 font-[family-name:var(--font-inter)] max-w-xl mb-8 leading-relaxed"
          >
            We bridge the gap between education and career readiness through psychometric assessments, guided journaling, and holistic development programs.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <Button variant="primary" size="lg" href="/login" magnetic>Get Involved / Login</Button>
            <Button variant="secondary" size="lg" href="/register" magnetic>Register Now</Button>
          </motion.div>

          <div className="flex flex-wrap gap-8 mt-4">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                className="flex flex-col"
              >
                <span className="text-3xl md:text-4xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]">{stat.number}</span>
                <span className="text-sm text-[#0F1F1F]/60 font-[family-name:var(--font-inter)] mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Content - 3D Interactive Hero Gallery */}
        <div className="w-full lg:w-1/2 hidden lg:flex justify-center items-center relative min-h-[500px]">
          {floatingIcons.map((item, i) => (
            <div key={i} className="absolute" style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right, zIndex: 20 }}>
              <FloatingIcon delay={item.delay}>
                {item.icon}
              </FloatingIcon>
            </div>
          ))}
          
          <div className="w-full h-full relative z-10">
            <HeroGallery />
          </div>
        </div>

      </div>
    </section>
  );
}

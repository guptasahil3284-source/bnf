'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';

const JoinMovement = () => {
  const cards = [
    "Become a School Partner",
    "Join as Student Volunteer",
    "Join as a Trainer Volunteer",
    "Become a University Partner",
    "Join as a Career Counsellor Volunteer",
    "Join as a Fundraiser Volunteer"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative w-full py-24 bg-[#0D4F4F] overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#E8705A] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#5BB8D4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-[#FAFAF7] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <AnimatedText
          text="Be A Part Of Movement That Is Building Self-Aware, Skilled And Future Ready Individuals"
          className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-sora)] font-bold text-white text-center max-w-4xl mx-auto mb-6"
        />
        
        <p className="text-lg text-white/80 text-center font-[family-name:var(--font-inter)] mb-10 max-w-2xl">
          Join thousands of educators, volunteers, and partners who are transforming student lives across India.
        </p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.a 
            href="/register"
            variants={itemVariants}
            className="bg-white text-[#0D4F4F] rounded-full px-8 py-4 font-semibold hover:scale-105 transition-transform duration-300 shadow-lg font-[family-name:var(--font-inter)] inline-block text-center"
          >
            Join Us / Register
          </motion.a>
          <motion.a 
            href="/login"
            variants={itemVariants}
            className="border-2 border-white text-white rounded-full px-8 py-4 font-semibold hover:bg-white/10 transition-colors duration-300 font-[family-name:var(--font-inter)] inline-block text-center"
          >
            Login / Contact Us
          </motion.a>
        </motion.div>

        <div className="w-full">
          <p className="text-sm uppercase tracking-wider text-white/50 text-center mb-8 font-[family-name:var(--font-inter)]">
            Ways To Get Involved
          </p>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cards.map((card, index) => (
              <motion.a
                key={index}
                href="/register"
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-5 text-center text-white text-sm font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer font-[family-name:var(--font-inter)] flex items-center justify-center min-h-[100px]"
              >
                {card}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinMovement;

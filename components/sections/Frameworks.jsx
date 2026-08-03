'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import Container from '@/components/ui/Container';

const Frameworks = () => {
  const frameworks = [
    { label: 'NEP 2020', full: 'National Education Policy 2020' },
    { label: 'SDGs', full: 'UN Sustainable Development Goals' },
    { label: 'UGC', full: 'University Grants Commission' },
    { label: 'GOI', full: 'Government of India Initiatives' },
    { label: 'AICTE', full: 'All India Council for Technical Education' },
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
    <section className="w-full py-20 bg-[#FAFAF7]">
      <Container>
        <div className="text-center mb-16">
          <AnimatedText
            text="Aligned With National And Global Educational Frameworks"
            className="text-3xl md:text-4xl font-[family-name:var(--font-sora)] font-bold text-[#0F1F1F] mb-4"
          />
          <p className="text-[#0F1F1F]/70 text-lg font-[family-name:var(--font-inter)] max-w-2xl mx-auto">
            Our programs are designed in accordance with India's leading educational frameworks.
          </p>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {frameworks.map((fw, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 px-8 py-6 min-w-[160px] flex-1 max-w-[240px] text-center hover:scale-105 hover:border-[#0D4F4F]/30 hover:bg-[#0D4F4F]/5 transition-all duration-300 flex flex-col justify-center items-center cursor-default"
            >
              <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[#0D4F4F]">
                {fw.label}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-xs text-gray-500 mt-2">
                {fw.full}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Frameworks;

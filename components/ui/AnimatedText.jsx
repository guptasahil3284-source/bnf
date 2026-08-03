'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedText({
  text,
  tag = 'h2',
  className = '',
  delay = 0,
  splitBy = 'word',
}) {
  const elements = splitBy === 'word' ? text.split(' ') : text.split('\n');

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  const Tag = motion[tag];

  return (
    <Tag
      className={className}
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {elements.map((element, index) => (
        <span
          key={index}
          style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.1em', marginRight: splitBy === 'word' ? '0.25em' : '0' }}
        >
          <motion.span style={{ display: 'inline-block' }} variants={childVariant}>
            {element}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

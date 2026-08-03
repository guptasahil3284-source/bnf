'use client';

import { useEffect, useState, useRef } from 'react';
import AnimatedText from '@/components/ui/AnimatedText';
import Container from '@/components/ui/Container';

const metrics = [
  { value: 5000, suffix: '+', label: 'Students Impacted' },
  { value: 100, suffix: '+', label: 'Schools & Colleges' },
  { value: 50, suffix: '+', label: 'Programs Conducted' },
  { value: 90, suffix: '%+', label: 'Positive Growth in Students' },
];

function Counter({ target, suffix = '', duration = 2000, startAnimation }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuad = 1 - (1 - percentage) * (1 - percentage);
      
      setCount(Math.floor(target * easeOutQuad));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, startAnimation]);

  return (
    <span className="font-[family-name:var(--font-sora)]">
      {count}{suffix}
    </span>
  );
}

export default function Impact() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-midnight" ref={sectionRef}>
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0D4F4F] rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0D4F4F] rounded-full blur-[150px] opacity-30 mix-blend-screen pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="text-center mb-16">
          <AnimatedText 
            text="Our Impact So Far" 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-sora)] mb-4"
          />
          <p className="text-lg md:text-xl text-gray-300 font-[family-name:var(--font-inter)]">
            Numbers that tell our story of transformation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5BB8D4]">
                <Counter target={metric.value} suffix={metric.suffix} startAnimation={isInView} />
              </h3>
              <p className="text-base lg:text-lg text-gray-300 font-[family-name:var(--font-inter)] font-medium">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-[family-name:var(--font-sora)] italic text-xl md:text-2xl text-[#0D4F4F] bg-[#FAFAF7] inline-block px-6 py-3 rounded-full font-semibold shadow-lg">
            Stronger Mind, Better Future — Our Mission
          </p>
        </div>
      </Container>
    </section>
  );
}

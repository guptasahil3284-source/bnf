'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '@/components/ui/AnimatedText';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Programs() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const programs = gsap.utils.toArray('.program-block');
    
    programs.forEach((program) => {
      const image = program.querySelector('.program-image');
      const content = program.querySelector('.program-content');
      const listItems = program.querySelectorAll('li');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: program,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        }
      });
      
      tl.fromTo(image, 
        { autoAlpha: 0, scale: 0.9, x: program.classList.contains('reverse-layout') ? 50 : -50 },
        { autoAlpha: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(content,
        { autoAlpha: 0, x: program.classList.contains('reverse-layout') ? -30 : 30 },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(listItems,
        { autoAlpha: 0, x: 20 },
        { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="py-24 bg-white" ref={containerRef}>
      <Container>
        <div className="text-center mb-20 lg:mb-24">
          <AnimatedText 
            text="Programs We Offer" 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight font-[family-name:var(--font-sora)]"
          />
        </div>

        <div className="flex flex-col space-y-24">
          {/* Program 1 */}
          <div className="program-block flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 program-image">
              <Image 
                src="/images/programs/school.jpg" 
                alt="For School Students" 
                width={700} 
                height={500} 
                className="rounded-3xl object-cover w-full h-[400px] md:h-[500px]" 
              />
            </div>
            <div className="w-full lg:w-1/2 program-content flex flex-col items-start">
              <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-sora)] text-midnight mb-6">
                For School Students
              </h3>
              <p className="text-lg text-gray-600 font-[family-name:var(--font-inter)] mb-8 leading-relaxed">
                Comprehensive programs designed for students from Class 8 to Class 12, building self-awareness and future readiness.
              </p>
              <ul className="space-y-4 mb-10">
                {['Self awareness and personality development', 'Habit building and journaling', 'Career Exposure and Guidance', 'Life skills and value education'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#0D4F4F] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-[family-name:var(--font-inter)] text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant="primary">Learn More</Button>
            </div>
          </div>

          {/* Program 2 */}
          <div className="program-block reverse-layout flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 program-image">
              <Image 
                src="/images/programs/college.jpg" 
                alt="For College Students" 
                width={700} 
                height={500} 
                className="rounded-3xl object-cover w-full h-[400px] md:h-[500px]" 
              />
            </div>
            <div className="w-full lg:w-1/2 program-content flex flex-col items-start">
              <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-sora)] text-midnight mb-6">
                For College Students
              </h3>
              <p className="text-lg text-gray-600 font-[family-name:var(--font-inter)] mb-8 leading-relaxed">
                Advanced career readiness programs for undergraduate and postgraduate students, bridging the gap between academic knowledge and industry demands.
              </p>
              <ul className="space-y-4 mb-10">
                {['Career Guidance and Roadmap', 'Skill development and training', 'Internship and industry exposure', 'Placement preparation', 'Future skills (AI, Digital, Soft Skills)'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#0D4F4F] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-[family-name:var(--font-inter)] text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant="primary">Learn More</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '@/components/ui/AnimatedText';
import Container from '@/components/ui/Container';

const solutions = [
  { id: '01', title: 'Scientific Psychometric Assessment', desc: 'Discover strengths, interests, personality and learning style.', image: '/images/approach/assessment.jpg' },
  { id: '02', title: 'Personalized Journaling', desc: 'Reflect, set goals and grow through guided self-reflection.', image: '/images/approach/journaling.jpg' },
  { id: '03', title: 'Personalized Career Mapping', desc: 'Receive career pathways aligned with individual potential.', image: '/images/approach/career.jpg' },
  { id: '04', title: 'Continuous Growth Tracking', desc: 'Track measurable progress through regular reviews and feedback.', image: '/images/approach/tracking.jpg' },
  { id: '05', title: 'Holistic Development', desc: 'Build academic, emotional and career readiness together.', image: '/images/hero/activity.jpg' },
];

export default function Approach() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const blocks = gsap.utils.toArray('.solution-block');
    
    blocks.forEach((block) => {
      const image = block.querySelector('.solution-image');
      const content = block.querySelector('.solution-content');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });
      
      tl.fromTo(image, 
        { autoAlpha: 0, scale: 0.95, y: 30 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(content,
        { autoAlpha: 0, x: block.classList.contains('even-block') ? -30 : 30 },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
      
      gsap.to(image.querySelector('img'), {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: block,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="py-24 bg-offWhite overflow-hidden" ref={containerRef}>
      <Container>
        <div className="text-center mb-16 lg:mb-24">
          <AnimatedText 
            text="Our Unique Approach" 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight font-[family-name:var(--font-sora)] mb-4"
          />
          <p className="text-lg md:text-xl text-gray-600 font-[family-name:var(--font-inter)]">
            We don&apos;t just educate — we transform.
          </p>
        </div>

        <div className="flex flex-col space-y-16 lg:space-y-20">
          {solutions.map((solution, index) => {
            const isEven = index % 2 !== 0;
            return (
              <div 
                key={solution.id} 
                className={`solution-block flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${isEven ? 'lg:flex-row-reverse even-block' : 'odd-block'}`}
              >
                <div className="w-full lg:w-1/2 solution-image overflow-hidden rounded-2xl relative">
                  <Image 
                    src={solution.image} 
                    alt={solution.title} 
                    width={600} 
                    height={450} 
                    className="object-cover w-full h-[350px] md:h-[450px] scale-110 origin-top" 
                  />
                </div>
                
                <div className="w-full lg:w-1/2 solution-content">
                  <span className="text-7xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]/10 block mb-4">
                    {solution.id}
                  </span>
                  <div className="w-16 h-1 bg-[#0D4F4F] rounded-full mb-6"></div>
                  <h3 className="text-3xl font-bold font-[family-name:var(--font-sora)] text-midnight mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-lg text-gray-600 font-[family-name:var(--font-inter)] leading-relaxed">
                    {solution.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

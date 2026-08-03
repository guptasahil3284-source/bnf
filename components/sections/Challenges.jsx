'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@/components/ui/Container';
import AnimatedText from '@/components/ui/AnimatedText';

const steps = [
  { icon: '😕', title: 'Confusion', desc: 'Students often feel lost about their future, unsure of their strengths and interests.' },
  { icon: '🔍', title: 'Lack of Self-Awareness', desc: 'Without proper tools, students struggle to understand their own aptitudes and personality traits.' },
  { icon: '🧭', title: 'No Career Direction', desc: 'The gap between education and career planning leaves students without a clear path forward.' },
  { icon: '📊', title: 'No Growth Tracking', desc: 'Without measurable progress, students can\'t see how far they\'ve come or where they need to go.' },
  { icon: '🎯', title: 'Future Readiness Gap', desc: 'The disconnect between academic learning and real-world skills creates unprepared graduates.' },
];

export default function Challenges() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate line
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      { 
        scaleY: 1, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      }
    );

    // Animate steps
    stepsRef.current.forEach((step, i) => {
      if (!step) return;
      const node = step.querySelector('.timeline-node');
      const content = step.querySelector('.timeline-content');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      
      tl.fromTo(node, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" })
        .fromTo(content, { x: i % 2 === 0 ? -50 : 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3");
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[#FAFAF7] relative overflow-hidden" ref={containerRef}>
      <Container>
        <div className="text-center mb-16 md:mb-24">
          <AnimatedText tag="h2" text="The Journey of Every Student" className="text-4xl md:text-5xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F] mb-4" />
          <p className="text-lg text-gray-600 font-[family-name:var(--font-inter)] max-w-2xl mx-auto opacity-0" style={{animation: 'fadeIn 1s ease-out forwards 0.5s'}}>
            Navigating the path from education to a fulfilling career is filled with obstacles. Here are the common challenges students face today.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 rounded-full overflow-hidden bg-gray-200">
            <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-[#0D4F4F] to-[#E8705A] origin-top"></div>
          </div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                ref={el => stepsRef.current[i] = el}
              >
                {/* Mobile line adjustment */}
                <div className="absolute left-4 md:left-1/2 top-8 md:top-1/2 w-10 border-t-2 border-dashed border-gray-300 -translate-y-1/2 md:-ml-5 -z-10 hidden md:block"></div>
                
                {/* Node */}
                <div className={`timeline-node absolute left-4 md:left-1/2 top-0 md:top-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#0D4F4F] shadow-lg flex items-center justify-center text-xl z-10 -translate-x-1/2 md:-translate-y-1/2`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className={`timeline-content w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-sora)] text-[#0F1F1F] mb-3">{step.title}</h3>
                  <p className="text-gray-600 font-[family-name:var(--font-inter)] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

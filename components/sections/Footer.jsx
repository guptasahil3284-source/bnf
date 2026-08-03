'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter submitted:', email);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0F1F1F] text-gray-300 py-16 pb-8 font-[family-name:var(--font-inter)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-[family-name:var(--font-sora)] text-2xl font-bold text-white">BNF</span>
              <div className="w-2 h-2 bg-[#5BB8D4] rounded-full"></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed pr-4">
              Building Future-Ready Students through holistic development and career guidance.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-sora)] text-sm uppercase tracking-wider text-gray-400 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'About', href: '/about' },
                { name: 'Programs', href: '/programs' },
                { name: 'Journaling', href: '/journaling' },
                { name: 'Impact', href: '/impact' },
                { name: 'Partner', href: '/partner' },
                { name: 'Careers', href: '/career' },
                { name: 'Volunteer', href: '/volunteer' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Programs & Offerings */}
          <div>
            <h4 className="font-[family-name:var(--font-sora)] text-sm uppercase tracking-wider text-gray-400 mb-6">
              Programs & Portals
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'School Program', href: '/programs' },
                { name: 'College Program', href: '/programs' },
                { name: 'Psychometric Test', href: '/journaling' },
                { name: 'Student Growth Portal', href: '/login' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="font-[family-name:var(--font-sora)] text-sm uppercase tracking-wider text-gray-400 mb-6">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates on our programs and impact.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E8705A] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#E8705A] text-white rounded-lg px-6 py-3 font-medium hover:bg-[#d4624e] transition-colors"
              >
                {submitted ? 'Thanks!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BNF. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E8705A] hover:text-white transition-colors duration-300">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E8705A] hover:text-white transition-colors duration-300">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E8705A] hover:text-white transition-colors duration-300">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E8705A] hover:text-white transition-colors duration-300">
              <FaYoutube />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

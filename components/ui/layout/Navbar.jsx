'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuth } from '@/components/providers/AuthProvider';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team BNF', href: '/about#team' },
  { name: 'Programs', href: '/programs' },
  { name: 'Journaling', href: '/journaling' },
  { name: 'Impact', href: '/impact' },
  { name: 'Partner', href: '/partner' },
  { name: 'Career', href: '/career' },
  { name: 'Volunteer', href: '/volunteer' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const { user, isLoggedIn, logout, role } = useAuth();

  useEffect(() => {
    const syncHash = () => {
      setCurrentHash(typeof window !== 'undefined' ? window.location.hash : '');
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
    };
  }, [pathname]);

  // Derive active link from current pathname and hash
  const getActiveLink = () => {
    const fullPath = pathname + (currentHash || '');

    // 1. Exact match with full path + hash (e.g. /about#team) or standalone hash
    const hashMatch = navLinks.find((link) => {
      if (link.href.includes('#')) {
        return link.href === fullPath || link.href === currentHash || (currentHash && link.href.endsWith(currentHash));
      }
      return false;
    });
    if (currentHash && hashMatch) return hashMatch.name;

    // 2. Route pathname match (e.g. /about or /)
    const pageMatch = navLinks.find((link) => {
      if (link.href === '/') return pathname === '/' && !currentHash;
      if (link.href.startsWith('/') && !link.href.includes('#')) {
        return pathname === link.href;
      }
      return false;
    });
    if (pageMatch) return pageMatch.name;

    return 'Home';
  };
  const activeLink = getActiveLink();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out flex items-center ${
          scrolled
            ? 'h-16 bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-md text-[#0F1F1F]'
            : 'h-20 bg-[#0F1F1F]/75 backdrop-blur-md border-b border-white/10 text-white'
        }`}
      >
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0 group z-50">
            <div className="flex items-baseline">
              <span className={`font-[family-name:var(--font-sora)] font-extrabold text-2xl tracking-tight transition-colors ${scrolled ? 'text-[#0D4F4F]' : 'text-white'}`}>
                BNF
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8705A] ml-1 inline-block animate-pulse"></span>
            </div>
            <span className={`hidden sm:inline-block text-[11px] font-medium pl-2 border-l ${scrolled ? 'border-gray-300 text-gray-600' : 'border-white/20 text-white/70'}`}>
              Building Future-Ready Students
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    const hash = link.href.includes('#') ? '#' + link.href.split('#')[1] : '';
                    setCurrentHash(hash);
                  }}
                  className={`px-3 py-1.5 rounded-full font-[family-name:var(--font-inter)] text-[13px] font-medium transition-all duration-200 ${
                    scrolled
                      ? isActive
                        ? 'bg-[#0D4F4F] text-white font-semibold shadow-sm'
                        : 'text-[#0F1F1F] hover:bg-gray-100 hover:text-[#0D4F4F]'
                      : isActive
                      ? 'bg-white/20 text-white font-semibold backdrop-blur-sm'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* User Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/profile"
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    scrolled
                      ? 'border-[#0D4F4F] text-[#0D4F4F] hover:bg-[#0D4F4F]/10'
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{role === 'student' ? user?.firstName || 'Student' : user?.contactPerson || 'Partner'} Profile</span>
                </Link>
                <button
                  onClick={logout}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    scrolled ? 'text-gray-500 hover:text-red-600' : 'text-white/70 hover:text-red-300'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Button variant="primary" size="md" href="/login" className="!text-xs !px-5 !py-2 shadow-sm">
                Get Involved
              </Button>
            )}
          </div>

          {/* Mobile & Tablet Hamburger Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 z-50 relative rounded-xl bg-white/10 backdrop-blur-sm p-2 border border-white/10"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span
              className={`block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                scrolled ? 'bg-[#0F1F1F]' : 'bg-white'
              } ${mobileMenuOpen ? 'rotate-45 translate-y-1.5 !bg-white' : '-translate-y-1'}`}
            ></span>
            <span
              className={`block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
                scrolled ? 'bg-[#0F1F1F]' : 'bg-white'
              } ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            ></span>
            <span
              className={`block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                scrolled ? 'bg-[#0F1F1F]' : 'bg-white'
              } ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5 !bg-white' : 'translate-y-1'}`}
            ></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0D4F4F] flex flex-col justify-center items-center px-6 py-12 overflow-y-auto"
          >
            <div className="flex flex-col space-y-3.5 items-center text-center max-w-sm w-full pt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: i * 0.04 + 0.1, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-wide text-[#FAFAF7] hover:text-[#E8705A] transition-colors"
                    onClick={() => {
                      const hash = link.href.includes('#') ? '#' + link.href.split('#')[1] : '';
                      setCurrentHash(hash);
                      toggleMenu();
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: navLinks.length * 0.04 + 0.1, duration: 0.3 }}
                className="flex flex-col space-y-3 pt-6 w-full"
              >
                {isLoggedIn ? (
                  <>
                    <Button variant="primary" size="lg" href="/profile" onClick={toggleMenu} className="w-full justify-center">
                      My Profile
                    </Button>
                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="text-white/80 hover:text-white py-2 text-sm font-semibold"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" size="lg" href="/login" onClick={toggleMenu} className="w-full justify-center">
                      Login / Get Involved
                    </Button>
                    <Button variant="secondary" size="lg" href="/register" onClick={toggleMenu} className="w-full justify-center !text-white !border-white">
                      Register Now
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}




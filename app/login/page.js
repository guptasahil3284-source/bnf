'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/sections/Footer';
import Button from '@/components/ui/Button';
import { useAuth } from '@/components/providers/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState('student'); // 'student' | 'partner'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login(email, password, role);
      setLoading(false);
      router.push('/profile');
    }, 600);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 bg-[#FAFAF7] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0D4F4F] via-[#5BB8D4] to-[#E8705A]"></div>

          {/* Header */}
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-sora)] text-3xl font-extrabold text-[#0F1F1F]">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-gray-600 font-[family-name:var(--font-inter)]">
              Sign in to access your BNF Growth Portal
            </p>
          </div>

          {/* Role Toggle Switch */}
          <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                role === 'student'
                  ? 'bg-[#0D4F4F] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#0F1F1F]'
              }`}
            >
              🎓 Student Login
            </button>
            <button
              type="button"
              onClick={() => setRole('partner')}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                role === 'partner'
                  ? 'bg-[#0D4F4F] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#0F1F1F]'
              }`}
            >
              🤝 Partner Login
            </button>
          </div>

          {/* Login Form */}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                {role === 'student' ? 'Student Email / Contact No' : 'Organisation Email'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'student' ? 'student@example.com' : 'partner@org.edu.in'}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0D4F4F] focus:ring-2 focus:ring-[#0D4F4F]/20 outline-none transition-all text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[#E8705A] hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0D4F4F] focus:ring-2 focus:ring-[#0D4F4F]/20 outline-none transition-all text-sm"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center !py-3.5 !text-sm mt-4 shadow-lg"
              onClick={handleSubmit}
            >
              {loading ? 'Logging in...' : `Login as ${role === 'student' ? 'Student' : 'Partner'}`}
            </Button>
          </form>

          {/* Registration Link Prompt */}
          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account yet?{' '}
              <Link href="/register" className="text-[#E8705A] font-bold hover:underline">
                Create an Account (Student / Partner)
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

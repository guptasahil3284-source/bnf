'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/sections/Footer';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [role, setRole] = useState('student'); // 'student' | 'partner'
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: Input email, 2: OTP/Reset link sent
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleSendReset = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 800);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Reset success state
    }, 800);
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 bg-[#FAFAF7] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Ambient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-10 w-[450px] h-[450px] rounded-full blur-[140px] bg-[#E8705A]/20 pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full blur-[130px] bg-[#0D4F4F]/15 pointer-events-none"
        />

        <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden z-10">
          {/* Top Bar Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0D4F4F] via-[#E8705A] to-[#FF9933]" />

          {/* Header */}
          <div className="text-center">
            <span className="text-xs font-bold text-[#E8705A] uppercase tracking-widest font-[family-name:var(--font-sora)] block mb-1">
              Account Recovery
            </span>
            <h1 className="font-[family-name:var(--font-sora)] text-3xl font-extrabold text-[#0F1F1F]">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-600 font-[family-name:var(--font-inter)]">
              {step === 1
                ? 'Enter your registered email or phone to receive a 4-digit reset OTP.'
                : step === 2
                ? `We sent a 4-digit code to ${email || 'your email'}.`
                : 'Password reset link sent successfully!'}
            </p>
          </div>

          {/* Role Toggle Switch */}
          {step === 1 && (
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
                🎓 Student Account
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
                🤝 Partner Account
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Request Reset */}
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendReset}
                className="space-y-6"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]">
                    {role === 'student' ? 'Student Email / Registered Phone' : 'Organisation Registered Email'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === 'student' ? 'student@example.com' : 'partner@org.edu.in'}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#0D4F4F] focus:ring-2 focus:ring-[#0D4F4F]/20 outline-none transition-all text-sm font-[family-name:var(--font-inter)]"
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center !py-3.5 !text-sm shadow-lg bg-[#E8705A] hover:bg-[#d4624e]"
                >
                  {loading ? 'Sending OTP...' : 'Send Reset Code →'}
                </Button>
              </motion.form>
            )}

            {/* Step 2: OTP Entry */}
            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOtp}
                className="space-y-6 text-center"
              >
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={otp[idx]}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      className="w-12 h-14 text-center text-2xl font-bold font-[family-name:var(--font-sora)] rounded-xl border-2 border-gray-200 focus:border-[#0D4F4F] focus:ring-2 focus:ring-[#0D4F4F]/20 outline-none"
                    />
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center !py-3.5 !text-sm shadow-lg bg-[#0D4F4F]"
                >
                  {loading ? 'Verifying OTP...' : 'Verify OTP & Reset →'}
                </Button>

                <p className="text-xs text-gray-500 font-[family-name:var(--font-inter)]">
                  Didn&apos;t receive the code?{' '}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#E8705A] font-bold hover:underline"
                  >
                    Resend Code
                  </button>
                </p>
              </motion.form>
            )}

            {/* Step 3: Success Confirmation */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                  ✓
                </div>
                <h3 className="text-xl font-[family-name:var(--font-sora)] font-bold text-[#0D4F4F]">
                  Password Reset Verified!
                </h3>
                <p className="text-xs text-gray-600 font-[family-name:var(--font-inter)]">
                  Check your inbox to create your new password, or click below to return to login.
                </p>

                <Link
                  href="/login"
                  className="inline-block w-full py-3.5 rounded-xl bg-[#0D4F4F] text-white font-[family-name:var(--font-sora)] font-bold text-sm shadow-lg hover:bg-[#073636] transition-colors"
                >
                  Return to Login →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Back to Login */}
          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600 font-[family-name:var(--font-inter)]">
              Remembered your password?{' '}
              <Link href="/login" className="text-[#E8705A] font-bold hover:underline">
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

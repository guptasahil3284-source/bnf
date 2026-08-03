'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/sections/Footer';
import StudentProfile from '@/components/profile/StudentProfile';
import PartnerProfile from '@/components/profile/PartnerProfile';
import { useAuth } from '@/components/providers/AuthProvider';

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, role, login } = useAuth();

  useEffect(() => {
    // If user accesses /profile without logging in, default auto-login to demo student profile
    if (!isLoggedIn) {
      login('demo.student@example.com', 'password', 'student');
    }
  }, [isLoggedIn, login]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 bg-[#FAFAF7] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {role === 'partner' ? <PartnerProfile /> : <StudentProfile />}
        </div>
      </main>

      <Footer />
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/sections/Footer';
import Button from '@/components/ui/Button';
import { useAuth } from '@/components/providers/AuthProvider';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  
  // Step 1: Role Selection ('none' | 'student' | 'partner')
  const [selectedRole, setSelectedRole] = useState('none');
  
  // Student Form State (11 Fields)
  const [studentForm, setStudentForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Select Gender',
    contactNo: '',
    email: '',
    schoolName: '',
    studentClass: '',
    ageGroup: '13-17',
    city: '',
    state: '',
    country: 'India',
    stream: '',
    password: '',
    confirmPassword: '',
  });

  // Partner Form State (12 Fields)
  const [partnerForm, setPartnerForm] = useState({
    partnerType: 'School',
    orgEmail: '',
    orgType: '',
    contactPerson: '',
    designation: '',
    email: '',
    phoneNo: '',
    address: '',
    city: '',
    website: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (studentForm.password !== studentForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      register(studentForm, 'student');
      setLoading(false);
      router.push('/profile');
    }, 600);
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    if (partnerForm.password !== partnerForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      register(partnerForm, 'partner');
      setLoading(false);
      router.push('/profile');
    }, 600);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-24 bg-[#FAFAF7] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-[family-name:var(--font-sora)] text-3xl sm:text-4xl font-extrabold text-[#0F1F1F]">
              Join the BNF Movement
            </h1>
            <p className="mt-2 text-base text-gray-600 font-[family-name:var(--font-inter)] max-w-xl mx-auto">
              Empowering self-aware, skilled, and future-ready individuals across India
            </p>
          </div>

          {/* STEP 1: BEFORE REGISTRATION - ROLE SELECTION QUESTION */}
          {selectedRole === 'none' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 text-center"
            >
              <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[#0D4F4F] mb-3">
                How would you like to register?
              </h2>
              <p className="text-sm text-gray-600 mb-8 max-w-md mx-auto">
                Please select your registration type to proceed with your customized application form.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Student Registration Card */}
                <div
                  onClick={() => setSelectedRole('student')}
                  className="group cursor-pointer bg-[#FAFAF7] hover:bg-[#0D4F4F] p-8 rounded-2xl border-2 border-gray-200 hover:border-[#0D4F4F] transition-all duration-300 shadow-sm hover:shadow-xl text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-[#0D4F4F]/10 group-hover:bg-white/20 flex items-center justify-center text-2xl mb-4 transition-colors">
                      🎓
                    </div>
                    <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[#0F1F1F] group-hover:text-white mb-2">
                      Register as Student
                    </h3>
                    <p className="text-xs text-gray-600 group-hover:text-white/80 leading-relaxed">
                      For school and college students seeking psychometric assessment, career mapping, guided journaling, and skill development.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold text-[#0D4F4F] group-hover:text-[#E8705A]">
                    <span>Fill Student Form</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Partner Registration Card */}
                <div
                  onClick={() => setSelectedRole('partner')}
                  className="group cursor-pointer bg-[#FAFAF7] hover:bg-[#0D4F4F] p-8 rounded-2xl border-2 border-gray-200 hover:border-[#0D4F4F] transition-all duration-300 shadow-sm hover:shadow-xl text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-[#E8705A]/10 group-hover:bg-white/20 flex items-center justify-center text-2xl mb-4 transition-colors">
                      🏢
                    </div>
                    <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[#0F1F1F] group-hover:text-white mb-2">
                      Register as Partner
                    </h3>
                    <p className="text-xs text-gray-600 group-hover:text-white/80 leading-relaxed">
                      For schools, colleges, NGOs, CSR corporate companies, and organisations aiming to transform student education.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold text-[#0D4F4F] group-hover:text-[#E8705A]">
                    <span>Fill Partner Form</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500">
                Already registered?{' '}
                <Link href="/login" className="text-[#0D4F4F] font-bold hover:underline">
                  Log in to your account
                </Link>
              </div>
            </motion.div>
          )}

          {/* STEP 2A: STUDENT REGISTRATION FORM (11 FIELDS) */}
          {selectedRole === 'student' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 relative"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold text-[#E8705A] uppercase tracking-wider">Student Registration</span>
                  <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[#0F1F1F]">
                    Student Profile Application
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRole('none')}
                  className="text-xs text-gray-500 hover:text-[#0D4F4F] font-semibold underline"
                >
                  ← Change Role
                </button>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleStudentSubmit} className="space-y-6">
                {/* Personal Information (Fields 1-6) */}
                <div>
                  <h3 className="text-sm font-bold text-[#0D4F4F] uppercase tracking-wider mb-4">
                    1. Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 1. First Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">1. First Name *</label>
                      <input
                        type="text"
                        required
                        value={studentForm.firstName}
                        onChange={(e) => setStudentForm({ ...studentForm, firstName: e.target.value })}
                        placeholder="e.g. Rahul"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none"
                      />
                    </div>

                    {/* 2. Last Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">2. Last Name *</label>
                      <input
                        type="text"
                        required
                        value={studentForm.lastName}
                        onChange={(e) => setStudentForm({ ...studentForm, lastName: e.target.value })}
                        placeholder="e.g. Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none"
                      />
                    </div>

                    {/* 3. DOB */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">3. Date of Birth (DOB) *</label>
                      <input
                        type="date"
                        required
                        value={studentForm.dob}
                        onChange={(e) => setStudentForm({ ...studentForm, dob: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none"
                      />
                    </div>

                    {/* 4. Gender */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">4. Gender *</label>
                      <select
                        value={studentForm.gender}
                        onChange={(e) => setStudentForm({ ...studentForm, gender: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none bg-white"
                      >
                        <option value="Select Gender">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other / Prefer not to say</option>
                      </select>
                    </div>

                    {/* 5. Contact No */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">5. Contact No. *</label>
                      <input
                        type="tel"
                        required
                        value={studentForm.contactNo}
                        onChange={(e) => setStudentForm({ ...studentForm, contactNo: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none"
                      />
                    </div>

                    {/* 6. Email Address */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">6. Email Address *</label>
                      <input
                        type="email"
                        required
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                        placeholder="student@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic & Age Details (Fields 7-11) */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-[#0D4F4F] uppercase tracking-wider mb-4">
                    2. Academic & Location Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 7. School / College Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">7. School / College Name *</label>
                      <input
                        type="text"
                        required
                        value={studentForm.schoolName}
                        onChange={(e) => setStudentForm({ ...studentForm, schoolName: e.target.value })}
                        placeholder="e.g. Delhi Public School"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none"
                      />
                    </div>

                    {/* 8. Class */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">8. Class / Year *</label>
                      <input
                        type="text"
                        required
                        value={studentForm.studentClass}
                        onChange={(e) => setStudentForm({ ...studentForm, studentClass: e.target.value })}
                        placeholder="e.g. Class 11 / B.Tech 2nd Year"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none"
                      />
                    </div>

                    {/* 9. Age Group (4 specific options: 6-12, 13-17, 18-21, 22-25) */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">9. Age Group *</label>
                      <select
                        value={studentForm.ageGroup}
                        onChange={(e) => setStudentForm({ ...studentForm, ageGroup: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none bg-white font-medium"
                      >
                        <option value="6-12">6 - 12 years</option>
                        <option value="13-17">13 - 17 years</option>
                        <option value="18-21">18 - 21 years</option>
                        <option value="22-25">22 - 25 years</option>
                      </select>
                    </div>

                    {/* 11. Course / Stream */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">11. Course / Stream *</label>
                      <input
                        type="text"
                        required
                        value={studentForm.stream}
                        onChange={(e) => setStudentForm({ ...studentForm, stream: e.target.value })}
                        placeholder="e.g. Science (PCM) / Commerce / Humanities"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none"
                      />
                    </div>

                    {/* 10. Location (City, State, Country) */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">10a. City *</label>
                        <input
                          type="text"
                          required
                          value={studentForm.city}
                          onChange={(e) => setStudentForm({ ...studentForm, city: e.target.value })}
                          placeholder="City"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">10b. State *</label>
                        <input
                          type="text"
                          required
                          value={studentForm.state}
                          onChange={(e) => setStudentForm({ ...studentForm, state: e.target.value })}
                          placeholder="State"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">10c. Country *</label>
                        <input
                          type="text"
                          required
                          value={studentForm.country}
                          onChange={(e) => setStudentForm({ ...studentForm, country: e.target.value })}
                          placeholder="India"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
                    <input
                      type="password"
                      required
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password *</label>
                    <input
                      type="password"
                      required
                      value={studentForm.confirmPassword}
                      onChange={(e) => setStudentForm({ ...studentForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#0D4F4F] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center !py-3.5 shadow-lg"
                    onClick={handleStudentSubmit}
                  >
                    {loading ? 'Submitting Registration...' : 'Complete Student Registration'}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 2B: PARTNER REGISTRATION FORM (12 FIELDS) */}
          {selectedRole === 'partner' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 relative"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold text-[#5BB8D4] uppercase tracking-wider">Partner Registration</span>
                  <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[#0F1F1F]">
                    Organisation Partner Application
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRole('none')}
                  className="text-xs text-gray-500 hover:text-[#0D4F4F] font-semibold underline"
                >
                  ← Change Role
                </button>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handlePartnerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 1. First Drop-down: Type of partner */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      1. What type of partner are you? *
                    </label>
                    <select
                      value={partnerForm.partnerType}
                      onChange={(e) => setPartnerForm({ ...partnerForm, partnerType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-[#0D4F4F] focus:border-[#0D4F4F] outline-none bg-white"
                    >
                      <option value="School">School</option>
                      <option value="NGO">NGO</option>
                      <option value="College">College</option>
                      <option value="CSR Company">CSR Company</option>
                      <option value="Organisation">Organisation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* 2. Organisation Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">2. Organisation Email *</label>
                    <input
                      type="email"
                      required
                      value={partnerForm.orgEmail}
                      onChange={(e) => setPartnerForm({ ...partnerForm, orgEmail: e.target.value })}
                      placeholder="info@institution.org"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>

                  {/* 3. Organisation Type */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">3. Organisation Type / Domain *</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.orgType}
                      onChange={(e) => setPartnerForm({ ...partnerForm, orgType: e.target.value })}
                      placeholder="e.g. Higher Education / Corporate CSR"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>

                  {/* 4. Contact Person */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">4. Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.contactPerson}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                      placeholder="e.g. Dr. Anita Roy"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>

                  {/* 5. Designation */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">5. Designation *</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.designation}
                      onChange={(e) => setPartnerForm({ ...partnerForm, designation: e.target.value })}
                      placeholder="e.g. Principal / CSR Head"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>

                  {/* 6. Email (Contact person email) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">6. Personal / Direct Email *</label>
                    <input
                      type="email"
                      required
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      placeholder="anita.roy@institution.org"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>

                  {/* 7. Phone No */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">7. Phone No. *</label>
                    <input
                      type="tel"
                      required
                      value={partnerForm.phoneNo}
                      onChange={(e) => setPartnerForm({ ...partnerForm, phoneNo: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>

                  {/* 8. Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">8. Address *</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.address}
                      onChange={(e) => setPartnerForm({ ...partnerForm, address: e.target.value })}
                      placeholder="Street / Sector Address"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>

                  {/* 9. City */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">9. City *</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.city}
                      onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })}
                      placeholder="City Name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>

                  {/* 10. Website of org */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">10. Website of Organisation *</label>
                    <input
                      type="url"
                      required
                      value={partnerForm.website}
                      onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                      placeholder="https://www.organisation-website.org"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>

                  {/* 11. Pass */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">11. Password *</label>
                    <input
                      type="password"
                      required
                      value={partnerForm.password}
                      onChange={(e) => setPartnerForm({ ...partnerForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>

                  {/* 12. Conf pass */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">12. Confirm Password *</label>
                    <input
                      type="password"
                      required
                      value={partnerForm.confirmPassword}
                      onChange={(e) => setPartnerForm({ ...partnerForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0D4F4F]"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center !py-3.5 shadow-lg"
                    onClick={handlePartnerSubmit}
                  >
                    {loading ? 'Registering Organisation...' : 'Complete Partner Registration'}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

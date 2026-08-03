'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useAuth } from '@/components/providers/AuthProvider';

export default function StudentProfile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Editable local state initialized from user context
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Rahul',
    lastName: user?.lastName || 'Sharma',
    email: user?.email || 'rahul.sharma@example.com',
    dob: user?.dob || '2006-05-14',
    gender: user?.gender || 'Male',
    contactNo: user?.contactNo || '+91 98765 43210',
    schoolName: user?.schoolName || 'Delhi Public School, R.K. Puram',
    studentClass: user?.studentClass || 'Class 12',
    ageGroup: user?.ageGroup || '13-17',
    city: user?.city || 'New Delhi',
    state: user?.state || 'Delhi',
    country: user?.country || 'India',
    stream: user?.stream || 'Science (PCM)',
    bio: user?.bio || 'Passionate student exploring career pathways in software engineering and cognitive science.',
    linkedinUrl: user?.linkedinUrl || 'https://linkedin.com/in/rahul-sharma',
    skills: user?.skills || ['Python', 'Problem Solving', 'Public Speaking', 'Analytical Thinking'],
    avatar: user?.avatar || '/images/hero/students.jpg',
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !formData.skills.includes(newSkillInput.trim())) {
      const updatedSkills = [...formData.skills, newSkillInput.trim()];
      setFormData({ ...formData, skills: updatedSkills });
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = formData.skills.filter((s) => s !== skillToRemove);
    setFormData({ ...formData, skills: updatedSkills });
  };

  return (
    <div className="space-y-8">
      {/* Top Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#0D4F4F] via-[#5BB8D4] to-[#E8705A] rounded-2xl mb-6 relative">
          <span className="absolute bottom-3 right-4 text-xs font-semibold text-white/90 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
            Student Growth Portal
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 relative -mt-16 sm:-mt-20 px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Avatar Image */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-gray-100">
              <Image
                src={formData.avatar || '/images/hero/students.jpg'}
                alt="Student Profile Avatar"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h1 className="font-[family-name:var(--font-sora)] text-2xl sm:text-3xl font-extrabold text-[#0F1F1F]">
                  {formData.firstName} {formData.lastName}
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0D4F4F]/10 text-[#0D4F4F]">
                  Age {formData.ageGroup}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {formData.studentClass} • {formData.schoolName}
              </p>
              <p className="text-xs text-gray-500">
                📍 {formData.city}, {formData.state}, {formData.country}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              isEditing
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-[#0D4F4F] text-white hover:bg-[#0D4F4F]/90'
            }`}
          >
            {isEditing ? 'Cancel Edit' : '✏️ Edit Profile'}
          </button>
        </div>

        {/* Bio Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2">About / Bio</h3>
          {isEditing ? (
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-gray-200 focus:border-[#0D4F4F] outline-none"
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed font-[family-name:var(--font-inter)]">
              "{formData.bio}"
            </p>
          )}
        </div>

        {/* LinkedIn & Social Links */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-500 uppercase">LinkedIn URL:</span>
            {isEditing ? (
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setStudentForm({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 w-64 outline-none"
              />
            ) : formData.linkedinUrl ? (
              <a
                href={formData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#0D4F4F] font-semibold hover:underline flex items-center space-x-1"
              >
                <span>🔗 {formData.linkedinUrl}</span>
              </a>
            ) : (
              <span className="text-xs text-gray-400">Not provided</span>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
        <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[#0F1F1F] mb-4">
          Key Skills & Aptitudes
        </h3>

        <div className="flex flex-wrap gap-2.5 mb-6">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#FAFAF7] text-[#0D4F4F] border border-[#0D4F4F]/20 flex items-center space-x-2 shadow-xs"
            >
              <span>{skill}</span>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-red-500 hover:text-red-700 font-bold text-xs"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>

        {isEditing && (
          <div className="flex items-center space-x-2 max-w-md">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              placeholder="Add new skill (e.g. Critical Thinking)"
              className="flex-1 px-4 py-2 text-xs rounded-xl border border-gray-200 outline-none"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#E8705A] text-white hover:bg-[#E8705A]/90"
            >
              + Add
            </button>
          </div>
        )}
      </div>

      {/* Editable Information Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
        <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[#0F1F1F] mb-6">
          Student Information & Academic Record
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">School / Institution</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.schoolName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Class / Grade</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.studentClass}
                onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.studentClass}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Course / Stream</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.stream}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Age Group</label>
            {isEditing ? (
              <select
                value={formData.ageGroup}
                onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm bg-white"
              >
                <option value="6-12">6 - 12 years</option>
                <option value="13-17">13 - 17 years</option>
                <option value="18-21">18 - 21 years</option>
                <option value="22-25">22 - 25 years</option>
              </select>
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.ageGroup} years</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Contact Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.contactNo}
                onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.contactNo}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.email}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <Button variant="primary" size="md" onClick={handleSave} className="!px-8">
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useAuth } from '@/components/providers/AuthProvider';

export default function PartnerProfile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    partnerType: user?.partnerType || 'School',
    orgEmail: user?.orgEmail || 'contact@dpsrkpuram.edu.in',
    orgType: user?.orgType || 'K-12 Educational Institution',
    contactPerson: user?.contactPerson || 'Dr. Anita Roy',
    designation: user?.designation || 'Principal & Academic Director',
    email: user?.email || 'anita.roy@dpsrkpuram.edu.in',
    phoneNo: user?.phoneNo || '+91 11 2617 4130',
    address: user?.address || 'Sector 12, R.K. Puram',
    city: user?.city || 'New Delhi',
    website: user?.website || 'https://dpsrkpuram.edu.in',
    orgBio: user?.orgBio || 'Leading K-12 educational institution committed to student career orientation, psychometric evaluation, and holistic growth.',
    avatar: user?.avatar || '/images/hero/workshop.jpg',
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#0D4F4F] via-[#5BB8D4] to-[#E8705A] rounded-2xl mb-6 relative">
          <span className="absolute bottom-3 right-4 text-xs font-semibold text-white/90 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
            Partner Portal Dashboard
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 relative -mt-16 sm:-mt-20 px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Logo / Image */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-gray-100">
              <Image
                src={formData.avatar || '/images/hero/workshop.jpg'}
                alt="Partner Organisation Logo"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h1 className="font-[family-name:var(--font-sora)] text-2xl sm:text-3xl font-extrabold text-[#0F1F1F]">
                  {formData.contactPerson}
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8705A]/10 text-[#E8705A]">
                  {formData.partnerType} Partner
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                {formData.designation}
              </p>
              <p className="text-xs text-gray-500">
                🏢 {formData.orgType} • 📍 {formData.city}
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
            {isEditing ? 'Cancel Edit' : '✏️ Edit Organisation Profile'}
          </button>
        </div>

        {/* Organisation Bio */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-xs font-bold text-[#0D4F4F] uppercase tracking-wider mb-2">
            Organisation Mission & Overview
          </h3>
          {isEditing ? (
            <textarea
              rows={3}
              value={formData.orgBio}
              onChange={(e) => setFormData({ ...formData, orgBio: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-gray-200 focus:border-[#0D4F4F] outline-none"
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed font-[family-name:var(--font-inter)]">
              "{formData.orgBio}"
            </p>
          )}
        </div>

        {/* Website & Direct Link */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Website:</span>
            {isEditing ? (
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 w-64 outline-none"
              />
            ) : (
              <a
                href={formData.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#0D4F4F] font-semibold hover:underline flex items-center space-x-1"
              >
                <span>🌐 {formData.website}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Editable Organisation Details (12 Fields Grid) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
        <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[#0F1F1F] mb-6">
          Organisation & Contact Representative Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Partner Category</label>
            {isEditing ? (
              <select
                value={formData.partnerType}
                onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm bg-white font-semibold"
              >
                <option value="School">School</option>
                <option value="NGO">NGO</option>
                <option value="College">College</option>
                <option value="CSR Company">CSR Company</option>
                <option value="Organisation">Organisation</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.partnerType}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Organisation Type</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.orgType}
                onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.orgType}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Organisation Email</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.orgEmail}
                onChange={(e) => setFormData({ ...formData, orgEmail: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.orgEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Contact Person Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.contactPerson}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Designation</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.designation}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Direct Email</label>
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

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phoneNo}
                onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.phoneNo}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">City</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.city}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase">Official Address</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm"
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F1F1F] mt-1">{formData.address}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <Button variant="primary" size="md" onClick={handleSave} className="!px-8">
              Save Partner Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

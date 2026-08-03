'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  role: null,
  isLoggedIn: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  updateProfile: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'student' | 'partner'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load persisted auth from localStorage
    try {
      const storedUser = localStorage.getItem('bnf_user');
      const storedRole = localStorage.getItem('bnf_role');
      if (storedUser && storedRole) {
        setUser(JSON.parse(storedUser));
        setRole(storedRole);
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error('Error loading auth from localStorage', e);
    }
  }, []);

  const login = (email, password, userRole = 'student') => {
    // Mock login logic with prefilled default profile if first time
    const demoUser = userRole === 'student' ? {
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: email || 'rahul.sharma@example.com',
      dob: '2006-05-14',
      gender: 'Male',
      contactNo: '+91 98765 43210',
      schoolName: 'Delhi Public School, R.K. Puram',
      studentClass: 'Class 12',
      ageGroup: '13-17',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      stream: 'Science (PCM + Computer Science)',
      bio: 'Passionate about AI, physics, and creative writing. Eager to explore career pathways in Software Engineering and Cognitive Science.',
      linkedinUrl: 'https://linkedin.com/in/rahul-sharma-demo',
      skills: ['Python', 'Problem Solving', 'Public Speaking', 'Analytical Thinking', 'Team Leadership'],
      avatar: '/images/hero/students.jpg'
    } : {
      partnerType: 'School',
      orgEmail: email || 'contact@dpsrkpuram.edu.in',
      orgType: 'K-12 Educational Institution',
      contactPerson: 'Dr. Anita Roy',
      designation: 'Principal & Academic Director',
      email: email || 'anita.roy@dpsrkpuram.edu.in',
      phoneNo: '+91 11 2617 4130',
      address: 'Sector 12, R.K. Puram',
      city: 'New Delhi',
      website: 'https://dpsrkpuram.edu.in',
      orgBio: 'Leading K-12 school dedicated to holistic student growth, career readiness, and modern skill development across science and humanities.',
      focusAreas: ['Career Guidance', 'Psychometric Assessment', 'Student Leadership Workshops'],
      avatar: '/images/hero/workshop.jpg'
    };

    setUser(demoUser);
    setRole(userRole);
    setIsLoggedIn(true);

    localStorage.setItem('bnf_user', JSON.stringify(demoUser));
    localStorage.setItem('bnf_role', userRole);
    return demoUser;
  };

  const register = (data, userRole) => {
    const newUser = {
      ...data,
      bio: data.bio || (userRole === 'student' ? 'Student eager to learn and explore future career opportunities.' : 'Organisation partner empowering student growth.'),
      skills: data.skills || (userRole === 'student' ? ['Communication', 'Critical Thinking', 'Leadership'] : []),
      linkedinUrl: data.linkedinUrl || '',
      avatar: data.avatar || (userRole === 'student' ? '/images/hero/students.jpg' : '/images/hero/workshop.jpg')
    };

    setUser(newUser);
    setRole(userRole);
    setIsLoggedIn(true);

    localStorage.setItem('bnf_user', JSON.stringify(newUser));
    localStorage.setItem('bnf_role', userRole);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem('bnf_user');
    localStorage.removeItem('bnf_role');
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedData };
      localStorage.setItem('bnf_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, role, isLoggedIn, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

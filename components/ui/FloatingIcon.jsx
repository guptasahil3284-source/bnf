import React from 'react';

export default function FloatingIcon({ children, className = '', delay = '0s' }) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        animation: 'float 3s ease-in-out infinite',
        animationDelay: delay,
      }}
    >
      {children}
    </div>
  );
}

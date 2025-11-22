import React from 'react';

export const SesoLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" fill="#047857" />
      {/* Sun/Arch */}
      <path 
        d="M20 55 C 20 30, 80 30, 80 55" 
        stroke="#10b981" 
        strokeWidth="8" 
        strokeLinecap="round"
      />
      {/* Fields */}
      <path 
        d="M15 70 Q 35 60 50 70 T 85 70" 
        stroke="#10b981" 
        strokeWidth="6" 
        fill="none"
      />
      <path 
        d="M25 85 Q 40 78 55 85 T 80 85" 
        stroke="#065f46" 
        strokeWidth="5" 
        fill="none"
      />
    </svg>
  );
};
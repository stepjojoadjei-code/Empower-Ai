import React from 'react';

export const HamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    className="w-6 h-6 text-gray-300 hover:text-white transition-transform duration-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="transition-transform duration-300 ease-in-out" style={{ transformOrigin: 'center' }}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16"
        className={`transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 12h16"
        className={`transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 18h16"
        className={`transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
      />
    </g>
  </svg>
);

import React from 'react';

// Atributos comunes para los íconos para mejorar la accesibilidad
const commonProps = {
  'aria-hidden': true,
  // FIX: Changed 'false' to boolean false to match the expected type 'Booleanish' for the SVG 'focusable' attribute.
  focusable: false,
  role: 'img',
};

export const FastParkingLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600.000000 480.000000"
    preserveAspectRatio="xMidYMid meet"
    {...commonProps}
    {...props}
  >
    <g
      transform="translate(0.000000,480.000000) scale(0.100000,-0.100000)"
      fill="currentColor"
      stroke="none"
    >
      <path d="M561 2413 c-50 -148 -91 -272 -91 -276 0 -5 10 -7 22 -5 18 3 33 37 110 258 48 140 91 263 94 273 4 13 0 17 -19 17 -23 0 -30 -15 -116 -267z" />
      <path d="M731 2658 c-4 -13 -45 -131 -91 -263 -45 -132 -85 -246 -88 -253 -3 -10 8 -12 48 -10 l53 3 83 240 c59 171 79 242 71 247 -8 5 -6 8 6 8 9 0 17 4 17 9 0 5 3 16 6 25 5 13 -2 16 -45 16 -44 0 -53 -3 -60 -22z" />
      <path d="M871 2658 c-8 -22 -6 -23 46 -26 46 -3 70 -12 146 -58 l90 -54 112 0 c88 0 114 -3 118 -14 3 -8 29 -19 59 -25 98 -21 206 -100 225 -164 7 -22 10 -44 7 -49 -6 -10 -171 -11 -238 -2 -26 4 -42 10 -36 14 6 4 -12 5 -42 3 -72 -6 -83 -11 -25 -12 51 -1 58 -11 31 -49 -31 -45 -68 -55 -178 -47 -107 8 -109 10 -34 20 35 5 46 10 41 21 -3 7 -15 14 -27 14 -12 0 -26 4 -31 9 -6 5 -26 11 -45 14 -22 2 -12 4 28 5 55 2 62 4 62 23 0 31 18 58 53 79 l32 20 -80 2 c-63 1 -46 4 85 13 163 12 164 12 70 15 -82 3 -88 4 -45 10 l50 6 -56 27 c-58 28 -82 30 -344 29 -38 0 -77 4 -85 9 -10 6 -2 8 28 9 24 0 41 4 38 9 -7 12 42 21 77 14 15 -3 27 -3 27 -1 0 13 -141 99 -156 96 -15 -2 -37 -56 -101 -238 -45 -129 -82 -238 -82 -243 -1 -4 227 -6 506 -5 l507 3 93 265 c50 146 92 268 92 273 1 4 -226 7 -504 7 l-506 0 -8 -22z" />
      <path d="M2825 2518 c-29 -17 -35 -28 -35 -75 0 -48 19 -66 83 -77 57 -10 44 -26 -23 -26 -59 0 -60 0 -60 -29 0 -27 3 -29 53 -34 104 -13 159 27 142 102 -7 35 -23 46 -78 56 -53 10 -41 31 17 28 45 -3 46 -2 46 26 0 21 -6 30 -22 35 -37 9 -101 6 -123 -6z" />
      <path d="M5373 2523 c-42 -9 -63 -49 -63 -122 0 -44 5 -74 15 -88 21 -29 80 -45 135 -35 l45 7 3 68 3 67 -46 0 c-43 0 -45 -1 -45 -30 0 -16 5 -30 10 -30 6 0 10 -7 10 -15 0 -9 -9 -15 -25 -15 -26 0 -26 1 -23 68 l3 67 48 0 c42 0 49 3 54 23 3 13 3 26 -1 29 -8 8 -95 13 -123 6z" />
      <path d="M2220 2400 l0 -120 35 0 c35 0 35 0 35 45 0 45 0 45 35 45 32 0 35 2 35 30 0 28 -3 30 -35 30 -24 0 -35 5 -35 15 0 11 11 15 40 15 38 0 40 2 40 30 l0 30 -75 0 -75 0 0 -120z" />
      <path d="M2501 2483 c-5 -21 -17 -67 -26 -103 -9 -36 -18 -73 -21 -82 -4 -15 1 -18 34 -18 31 0 41 4 45 20 4 15 14 20 41 20 29 0 36 -4 36 -20 0 -17 7 -20 40 -20 22 0 40 3 40 8 0 4 -13 57 -28 117 l-28 110 -62 3 -61 3 -10 -38z m88 -90 c1 -7 -8 -13 -19 -13 -17 0 -19 4 -14 28 10 43 18 49 25 22 4 -14 7 -31 8 -37z" />
      <path d="M3082 2493 c2 -22 9 -29 31 -31 l27 -3 0 -90 0 -89 40 0 40 0 0 90 c0 89 0 90 25 90 21 0 25 5 25 30 l0 30 -96 0 -95 0 3 -27z" />
      <path d="M3520 2400 l0 -120 35 0 c32 0 35 2 35 30 0 29 2 30 45 30 62 0 85 24 85 90 0 75 -19 90 -120 90 l-80 0 0 -120z m120 30 c0 -25 -4 -30 -25 -30 -21 0 -25 5 -25 30 0 25 4 30 25 30 21 0 25 -5 25 -30z" />
      <path d="M3855 2508 c-6 -18 -55 -215 -55 -222 0 -3 18 -6 40 -6 33 0 40 3 40 20 0 16 7 20 36 20 27 0 37 -5 41 -20 4 -16 14 -20 45 -20 33 0 38 3 34 18 -3 9 -12 46 -21 82 -9 36 -21 82 -26 103 l-10 37 -60 0 c-39 0 -61 -4 -64 -12z m79 -100 c5 -24 3 -28 -15 -28 -17 0 -20 4 -15 23 3 12 6 29 6 37 0 21 16 0 24 -32z" />
      <path d="M4140 2400 l0 -120 40 0 c39 0 40 1 40 35 0 19 4 35 8 35 5 0 16 -16 25 -35 15 -31 21 -35 57 -35 l40 0 -19 38 c-18 36 -18 40 -4 55 24 23 23 100 -1 126 -17 18 -30 21 -103 21 l-83 0 0 -120z m125 35 c0 -13 -8 -21 -22 -23 -19 -3 -23 1 -23 23 0 22 4 26 23 23 14 -2 22 -10 22 -23z" />
      <path d="M4460 2400 l0 -120 40 0 40 0 0 53 0 52 25 -52 c23 -51 25 -53 65 -53 l40 0 -30 60 -30 59 25 57 c14 31 25 58 25 60 0 2 -17 4 -39 4 -36 0 -40 -3 -59 -47 l-20 -48 -1 48 -1 47 -40 0 -40 0 0 -120z" />
      <path d="M4780 2400 l0 -120 35 0 35 0 0 120 0 120 -35 0 -35 0 0 -120z" />
      <path d="M4980 2400 l0 -120 35 0 35 0 0 52 0 53 35 -53 c31 -46 40 -52 70 -52 l35 0 0 120 0 120 -34 0 c-34 0 -35 -1 -38 -46 l-3 -46 -32 46 c-28 40 -37 46 -68 46 l-35 0 0 -120z" />
      <path d="M1518 2390 c22 -20 43 -30 64 -30 29 0 31 2 17 15 -9 9 -38 22 -65 30 l-49 15 33 -30z" />
      <path d="M1349 2354 c17 -14 31 -31 31 -37 0 -8 17 -11 50 -9 45 4 50 6 50 28 0 32 -27 44 -100 44 l-62 0 31 -26z" />
    </g>
  </svg>
);

export const QrCodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...commonProps}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <path d="M14 14h7v7h-7z" />
  </svg>
);

export const WheelchairIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...commonProps}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path d="M9,6a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,9,6Zm7,8H11a1,1,0,0,1-1-1V12h4a1,1,0,0,0,0-2H10V8A1,1,0,0,0,8,8v5a3,3,0,0,0,3,3h4.54l3.7,4.317a1,1,0,0,0,1.4.119l2-1.667a1,1,0,0,0-1.282-1.538l-1.242,1.037L16.76,14.35A1,1,0,0,0,16,14ZM9,23a8.008,8.008,0,0,0,6.565-3.428,1,1,0,0,0-1.64-1.144,6,6,0,1,1-7.5-8.851,1,1,0,0,0-.858-1.806A8,8,0,0,0,9,23Z" />
  </svg>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...commonProps}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...commonProps}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

export const CarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...commonProps}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v9c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const SystemIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...commonProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...commonProps} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

import React from 'react';

export const CelebrationStickFigure = () => {
  return (
    <div style={{ width: '140px', height: '140px', margin: '0 auto' }}>
      <svg viewBox="0 0 140 140" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Glow halo */}
        <circle cx="70" cy="70" r="50" fill="#fef3c7" opacity="0.6" className="animate-glow" />

        {/* Celebrating Stick Figure */}
        <g style={{ animation: 'thumbsUpBounce 1.5s ease-in-out infinite' }}>
          {/* Head */}
          <circle cx="70" cy="40" r="16" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          {/* Big victory smile */}
          <path d="M63 43 Q70 52 77 43" stroke="#0f172a" strokeWidth="2.5" fill="none" />

          {/* Torso */}
          <line x1="70" y1="56" x2="70" y2="92" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

          {/* Arms raised in V for victory */}
          <path d="M70 66 L50 48 L40 32" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="39" cy="31" r="4" fill="#0284c7" />

          <path d="M70 66 L90 48 L100 32" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="101" cy="31" r="4" fill="#0284c7" />

          {/* Jumping legs spread out */}
          <line x1="70" y1="92" x2="52" y2="124" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <line x1="70" y1="92" x2="88" y2="124" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Floating Sparkles */}
        <polygon points="25,25 28,31 34,34 28,37 25,43 22,37 16,34 22,31" fill="#f59e0b" />
        <polygon points="115,20 117,25 122,27 117,29 115,34 113,29 108,27 113,25" fill="#10b981" />
        <polygon points="110,85 112,89 116,91 112,93 110,97 108,93 104,91 108,89" fill="#0284c7" />
      </svg>
    </div>
  );
};

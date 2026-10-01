import React, { useState, useEffect } from 'react';

export const InternDeskScene = ({ isReplaying }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600); // walked to desk
    const t2 = setTimeout(() => setStep(2), 1400); // laptop opens & glows
    const t3 = setTimeout(() => setStep(3), 2200); // Priya appears with speech bubble

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isReplaying]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 520 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <filter id="laptopGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Floor Line */}
        <line x1="40" y1="185" x2="480" y2="185" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

        {/* Desk */}
        <rect x="230" y="130" width="130" height="10" rx="3" fill="#94a3b8" />
        <line x1="245" y1="140" x2="245" y2="185" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
        <line x1="345" y1="140" x2="345" y2="185" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
        {/* Office plant on desk */}
        <rect x="330" y="118" width="14" height="12" rx="2" fill="#cbd5e1" />
        <path d="M337 118 Q333 108 329 110 Q334 116 337 118" fill="#10b981" />
        <path d="M337 118 Q341 106 345 110 Q340 116 337 118" fill="#059669" />

        {/* Office Chair */}
        <path d="M190 145 C190 135 205 135 205 145 L205 160 L185 160 Z" fill="#cbd5e1" />
        <line x1="195" y1="160" x2="195" y2="185" stroke="#64748b" strokeWidth="3" />
        <line x1="180" y1="185" x2="210" y2="185" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />

        {/* Laptop on desk */}
        <rect x="260" y="126" width="34" height="4" rx="1.5" fill="#334155" />
        {/* Laptop Screen */}
        <path
          d={step >= 2 ? "M260 126 L272 104 L294 104 L294 126 Z" : "M260 126 L294 126"}
          fill={step >= 2 ? "#e0f2fe" : "#334155"}
          stroke="#0f172a"
          strokeWidth="2"
          style={{ transition: 'all 0.5s ease-out' }}
        />
        {/* Screen glow */}
        {step >= 2 && (
          <polygon
            points="272,104 294,104 315,145 255,145"
            fill="url(#laptopGlow)"
            opacity="0.35"
            style={{ fill: '#38bdf8' }}
          />
        )}

        {/* Intern Stick Figure */}
        <g
          style={{
            transform: step === 0 ? 'translateX(100px)' : 'translateX(175px)',
            transition: 'transform 0.8s cubic-bezier(0.34, 1.2, 0.64, 1)'
          }}
        >
          {/* Head */}
          <circle cx="28" cy="85" r="13" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          {/* Intern Lanyard */}
          <path d="M25 98 L28 112 L31 98" stroke="#0284c7" strokeWidth="1.5" fill="none" />
          <rect x="25" y="112" width="6" height="8" rx="1" fill="#0284c7" />
          {/* Torso */}
          <line x1="28" y1="98" x2="28" y2="140" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

          {/* Arms */}
          {step < 2 ? (
            <>
              {/* Walking arms */}
              <line x1="28" y1="108" x2="16" y2="125" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="28" y1="108" x2="42" y2="125" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Typing at laptop - reach keyboard at x=260-294 */}
              <path d="M28 108 L55 120 L86 127" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M28 108 L58 115 L96 127" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Legs */}
          {step === 0 ? (
            <>
              {/* Walking legs */}
              <line x1="28" y1="140" x2="16" y2="185" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="28" y1="140" x2="40" y2="185" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Seated legs */}
              <path d="M28 140 L45 152 L45 185" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Name badge label */}
          <text x="28" y="65" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0284c7">
            You (Intern)
          </text>
        </g>

        {/* Manager Priya Stick Figure */}
        {step >= 3 && (
          <g style={{ opacity: 1, animation: 'popFadeIn 0.5s ease-out' }}>
            {/* Priya Head */}
            <circle cx="425" cy="85" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            {/* Priya hair bun */}
            <circle cx="425" cy="69" r="5" fill="#334155" />
            {/* Priya Torso */}
            <line x1="425" y1="99" x2="425" y2="148" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            {/* Gesture arm pointing towards desk */}
            <path d="M425 111 L395 120 L370 118" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <line x1="425" y1="111" x2="440" y2="138" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            {/* Legs */}
            <line x1="425" y1="148" x2="415" y2="185" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="425" y1="148" x2="435" y2="185" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            {/* Label below floor to prevent collision */}
            <text x="425" y="202" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">
              Priya (Manager)
            </text>

            {/* Speech Bubble */}
            <g style={{ animation: 'popoverDown 0.3s ease-out', transformBox: 'fill-box', transformOrigin: 'bottom center' }}>
              <rect x="275" y="12" width="200" height="42" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.06))" />
              <polygon points="415,54 430,54 422,62" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="416" y1="54" x2="429" y2="54" stroke="#ffffff" strokeWidth="2.5" />
              <text x="375" y="28" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0f172a">
                "Welcome to the Cloud! Let's
              </text>
              <text x="375" y="42" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0284c7">
                build your first environment."
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

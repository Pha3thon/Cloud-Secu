import React, { useState, useEffect } from 'react';

export const MissionChecklistScene = ({ isReplaying }) => {
  const [checks, setChecks] = useState([false, false, false, false]);

  useEffect(() => {
    const t1 = setTimeout(() => setChecks([true, false, false, false]), 400);
    const t2 = setTimeout(() => setChecks([true, true, false, false]), 900);
    const t3 = setTimeout(() => setChecks([true, true, true, false]), 1400);
    const t4 = setTimeout(() => setChecks([true, true, true, true]), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isReplaying]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 520 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Floor */}
        <line x1="40" y1="185" x2="480" y2="185" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

        {/* Stick figure giving thumbs up */}
        <g transform="translate(100, 70)">
          <g style={{ animation: 'thumbsUpBounce 2s ease-in-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }}>
            {/* Head */}
            <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            {/* Confident smile */}
            <path d="M16 23 Q20 28 24 23" stroke="#0f172a" strokeWidth="1.5" fill="none" />
            {/* Torso */}
            <line x1="20" y1="34" x2="20" y2="80" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

            {/* Thumbs up arm */}
            <path d="M20 44 L38 35 L48 24" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Fist with thumb up */}
            <circle cx="48" cy="24" r="4" fill="#0f172a" />
            <line x1="48" y1="24" x2="48" y2="16" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

            {/* Other arm on hip */}
            <path d="M20 44 L6 50 L12 60" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Legs */}
            <line x1="20" y1="80" x2="10" y2="115" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="20" y1="80" x2="30" y2="115" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

            {/* Speech / label */}
            <text x="20" y="-8" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0284c7">
              "Ready for Lab!"
            </text>
          </g>
        </g>

        {/* Mission Checklist Clipboard */}
        <g transform="translate(230, 25)">
          {/* Clipboard Board */}
          <rect x="0" y="10" width="230" height="150" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))" />
          {/* Clip */}
          <rect x="85" y="4" width="60" height="14" rx="4" fill="#64748b" />
          <circle cx="115" cy="11" r="3" fill="#ffffff" />

          {/* Checklist Title */}
          <text x="115" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0f172a">
            Lab 4 Mission Tasks
          </text>
          <line x1="20" y1="44" x2="210" y2="44" stroke="#f1f5f9" strokeWidth="1.5" />

          {/* Item 1 */}
          <g transform="translate(20, 52)">
            <rect x="0" y="0" width="16" height="16" rx="4" fill={checks[0] ? '#10b981' : '#f1f5f9'} stroke={checks[0] ? '#059669' : '#cbd5e1'} strokeWidth="1.5" />
            {checks[0] && <path d="M4 8 L7 11 L12 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
            <text x="26" y="12" fontSize="10.5" fontWeight={checks[0] ? '600' : '500'} fill={checks[0] ? '#0f172a' : '#64748b'}>
              Task 1: Deploy Virtual Machine
            </text>
          </g>

          {/* Item 2 */}
          <g transform="translate(20, 77)">
            <rect x="0" y="0" width="16" height="16" rx="4" fill={checks[1] ? '#10b981' : '#f1f5f9'} stroke={checks[1] ? '#059669' : '#cbd5e1'} strokeWidth="1.5" />
            {checks[1] && <path d="M4 8 L7 11 L12 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
            <text x="26" y="12" fontSize="10.5" fontWeight={checks[1] ? '600' : '500'} fill={checks[1] ? '#0f172a' : '#64748b'}>
              Task 2: Inspect Network Security
            </text>
          </g>

          {/* Item 3 */}
          <g transform="translate(20, 102)">
            <rect x="0" y="0" width="16" height="16" rx="4" fill={checks[2] ? '#10b981' : '#f1f5f9'} stroke={checks[2] ? '#059669' : '#cbd5e1'} strokeWidth="1.5" />
            {checks[2] && <path d="M4 8 L7 11 L12 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
            <text x="26" y="12" fontSize="10.5" fontWeight={checks[2] ? '600' : '500'} fill={checks[2] ? '#0f172a' : '#64748b'}>
              Task 3: Provision Object Bucket
            </text>
          </g>

          {/* Item 4 */}
          <g transform="translate(20, 127)">
            <rect x="0" y="0" width="16" height="16" rx="4" fill={checks[3] ? '#10b981' : '#f1f5f9'} stroke={checks[3] ? '#059669' : '#cbd5e1'} strokeWidth="1.5" />
            {checks[3] && <path d="M4 8 L7 11 L12 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
            <text x="26" y="12" fontSize="10.5" fontWeight={checks[3] ? '600' : '500'} fill={checks[3] ? '#0f172a' : '#64748b'}>
              Task 4: Audit Admin Identity
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

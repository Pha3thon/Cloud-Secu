import React, { useState, useEffect } from 'react';

export const DefaultConfigScene = ({ isReplaying }) => {
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDefault(true);
    }, 700);
    return () => clearTimeout(timer);
  }, [isReplaying]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 520 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Floor */}
        <line x1="40" y1="185" x2="480" y2="185" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

        {/* Shrugging Stick Figure */}
        <g transform="translate(110, 70)">
          <g style={{ animation: 'shrugShoulders 2.5s ease-in-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }}>
            {/* Head tilted */}
            <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            {/* Shrug mouth / smile */}
            <path d="M14 24 Q20 28 26 23" stroke="#0f172a" strokeWidth="1.5" fill="none" />
            {/* Torso */}
            <line x1="20" y1="34" x2="20" y2="80" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

            {/* Shrugging Arms (Palms up) */}
            <path d="M20 44 L5 48 L-6 36" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M20 44 L35 48 L46 36" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Legs */}
            <line x1="20" y1="80" x2="8" y2="115" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="20" y1="80" x2="32" y2="115" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

            {/* Thought bubble */}
            <g>
              <rect x="-35" y="-22" width="110" height="24" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="20" y="-7" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#64748b">
                "Just keep defaults?"
              </text>
            </g>
          </g>
        </g>

        {/* Configuration Selector Console Card */}
        <g transform="translate(230, 40)">
          <rect x="0" y="0" width="230" height="135" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))" />

          {/* Header */}
          <rect x="0" y="0" width="230" height="32" rx="12" fill="#f8fafc" />
          <line x1="0" y1="32" x2="230" y2="32" stroke="#e2e8f0" strokeWidth="1.5" />
          <text x="16" y="21" fontSize="11" fontWeight="700" fill="#0f172a">
            Configuration Preset
          </text>

          {/* Option A: Default Settings (Selected) */}
          <g transform="translate(16, 45)">
            <rect
              x="0"
              y="0"
              width="198"
              height="36"
              rx="6"
              fill={isDefault ? '#fffbeb' : '#ffffff'}
              stroke={isDefault ? '#f59e0b' : '#cbd5e1'}
              strokeWidth={isDefault ? '2' : '1'}
              style={{ transition: 'all 0.4s ease' }}
            />
            {/* Radio / Check button */}
            <circle cx="16" cy="18" r="8" fill={isDefault ? '#f59e0b' : '#ffffff'} stroke="#cbd5e1" strokeWidth="2" />
            {isDefault && <circle cx="16" cy="18" r="4" fill="#ffffff" />}
            <text x="32" y="16" fontSize="10.5" fontWeight="700" fill="#0f172a">
              Default Quick-Start
            </text>
            <text x="32" y="27" fontSize="8.5" fontWeight="500" fill="#d97706">
              ⚠️ Insecure (Port 22 Open, Public ACL)
            </text>
          </g>

          {/* Option B: Custom Hardened */}
          <g transform="translate(16, 88)">
            <rect x="0" y="0" width="198" height="36" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="16" cy="18" r="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <text x="32" y="16" fontSize="10.5" fontWeight="600" fill="#64748b">
              Custom Hardened Policy
            </text>
            <text x="32" y="27" fontSize="8.5" fontWeight="500" fill="#94a3b8">
              Least-privilege VPC, MFA required
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

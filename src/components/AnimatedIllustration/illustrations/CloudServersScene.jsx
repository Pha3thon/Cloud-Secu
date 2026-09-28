import React, { useState, useEffect } from 'react';

export const CloudServersScene = ({ isReplaying }) => {
  const [cloudOpen, setCloudOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCloudOpen(true);
    }, 900);
    return () => clearTimeout(timer);
  }, [isReplaying]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 520 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Ground */}
        <line x1="40" y1="185" x2="480" y2="185" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

        {/* Stick figure on ground looking up */}
        <g transform="translate(100, 75)">
          {/* Head looking tilted up */}
          <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          {/* Eye looking up */}
          <circle cx="25" cy="16" r="2.5" fill="#0f172a" />
          {/* Hand over brow looking up */}
          <path d="M20 40 L34 26 L26 12" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Other arm */}
          <line x1="20" y1="40" x2="10" y2="65" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Torso */}
          <line x1="20" y1="34" x2="20" y2="75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs standing */}
          <line x1="20" y1="75" x2="10" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="75" x2="30" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Question / thought bubble */}
          <text x="20" y="-5" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">
            "Where is the cloud?"
          </text>
        </g>

        {/* Floating Cloud Structure */}
        <g transform="translate(260, 20)">
          {/* Server Rack Box inside the cloud */}
          <g
            style={{
              opacity: cloudOpen ? 1 : 0.2,
              transform: cloudOpen ? 'scale(1)' : 'scale(0.85)',
              transformOrigin: '95px 65px',
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Outer Rack Enclosure */}
            <rect x="35" y="25" width="120" height="85" rx="6" fill="#1e293b" stroke="#0284c7" strokeWidth="2" />
            
            {/* Server 1 */}
            <rect x="42" y="32" width="106" height="20" rx="3" fill="#334155" />
            <circle cx="52" cy="42" r="3" fill="#10b981" className="animate-pulse-green" />
            <circle cx="62" cy="42" r="3" fill="#38bdf8" />
            <line x1="75" y1="42" x2="135" y2="42" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

            {/* Server 2 */}
            <rect x="42" y="57" width="106" height="20" rx="3" fill="#334155" />
            <circle cx="52" cy="67" r="3" fill="#10b981" />
            <circle cx="62" cy="67" r="3" fill="#f59e0b" />
            <line x1="75" y1="67" x2="135" y2="67" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

            {/* Server 3 */}
            <rect x="42" y="82" width="106" height="20" rx="3" fill="#334155" />
            <circle cx="52" cy="92" r="3" fill="#10b981" />
            <circle cx="62" cy="92" r="3" fill="#38bdf8" />
            <line x1="75" y1="92" x2="135" y2="92" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

            {/* Explanatory Banner */}
            <rect x="20" y="118" width="150" height="24" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
            <text x="95" y="134" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">
              "Someone else's computers!"
            </text>
          </g>

          {/* Cloud Cover Left Flap */}
          <path
            d="M 95 10 C 70 10 50 25 45 45 C 20 45 10 65 15 85 C 10 105 35 125 55 120 C 65 125 85 125 95 120 Z"
            fill="#ffffff"
            stroke="#0284c7"
            strokeWidth="2.5"
            style={{
              transform: cloudOpen ? 'translateX(-45px) rotate(-8deg)' : 'translateX(0)',
              opacity: cloudOpen ? 0.8 : 1,
              transition: 'all 0.7s cubic-bezier(0.34, 1.2, 0.64, 1)'
            }}
          />

          {/* Cloud Cover Right Flap */}
          <path
            d="M 95 10 C 120 10 140 25 145 45 C 170 45 180 65 175 85 C 180 105 155 125 135 120 C 125 125 105 125 95 120 Z"
            fill="#ffffff"
            stroke="#0284c7"
            strokeWidth="2.5"
            style={{
              transform: cloudOpen ? 'translateX(45px) rotate(8deg)' : 'translateX(0)',
              opacity: cloudOpen ? 0.8 : 1,
              transition: 'all 0.7s cubic-bezier(0.34, 1.2, 0.64, 1)'
            }}
          />
        </g>
      </svg>
    </div>
  );
};

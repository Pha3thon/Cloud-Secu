import React, { useState, useEffect } from 'react';

export const VmMakerScene = ({ isReplaying }) => {
  const [buildStep, setBuildStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setBuildStep(1), 500); // chassis drawn
    const t2 = setTimeout(() => setBuildStep(2), 1200); // CPU & RAM slotted
    const t3 = setTimeout(() => setBuildStep(3), 1900); // screen pops on
    const t4 = setTimeout(() => setBuildStep(4), 2500); // power light blinking

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

        {/* Builder Stick Figure */}
        <g transform="translate(100, 75)">
          {/* Head */}
          <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          {/* Hard hat */}
          <path d="M4 17 Q20 4 36 17 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
          {/* Torso */}
          <line x1="20" y1="34" x2="20" y2="75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms holding digital blueprint/wand */}
          <path d="M20 45 L38 48 L56 36" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Digital wand spark */}
          <polygon points="58,34 62,38 58,42 54,38" fill="#0284c7" />
          <line x1="20" y1="45" x2="6" y2="60" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="20" y1="75" x2="10" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="75" x2="30" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Label */}
          <text x="20" y="-8" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">
            "Constructing VM..."
          </text>
        </g>

        {/* The Virtual Machine Computer Box */}
        <g transform="translate(230, 45)">
          {/* Software cloud aura background */}
          <rect
            x="10"
            y="10"
            width="200"
            height="130"
            rx="12"
            fill={buildStep >= 1 ? '#f0f9ff' : '#f8fafc'}
            stroke={buildStep >= 1 ? '#0284c7' : '#cbd5e1'}
            strokeWidth="2"
            strokeDasharray={buildStep >= 1 ? 'none' : '6 4'}
            style={{ transition: 'all 0.5s ease' }}
          />

          {/* Software Chassis */}
          {buildStep >= 1 && (
            <g style={{ animation: 'popFadeIn 0.4s ease' }}>
              {/* Virtual Monitor Box */}
              <rect x="30" y="24" width="160" height="85" rx="8" fill="#1e293b" />
              {/* Stand */}
              <rect x="95" y="109" width="30" height="12" fill="#334155" />
              <rect x="80" y="121" width="60" height="6" rx="3" fill="#475569" />
            </g>
          )}

          {/* Internal CPU / RAM chips slotting in */}
          {buildStep >= 2 && (
            <g style={{ animation: 'popoverDown 0.4s ease' }}>
              <rect x="42" y="34" width="36" height="20" rx="3" fill="#0284c7" />
              <text x="60" y="47" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">
                vCPU
              </text>
              <rect x="84" y="34" width="36" height="20" rx="3" fill="#0369a1" />
              <text x="102" y="47" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">
                4GB RAM
              </text>
            </g>
          )}

          {/* Screen powers on with OS prompt */}
          {buildStep >= 3 && (
            <g style={{ animation: 'popFadeIn 0.3s ease' }}>
              <rect x="42" y="60" width="136" height="38" rx="4" fill="#0f172a" />
              <circle cx="50" cy="70" r="2" fill="#ef4444" />
              <circle cx="56" cy="70" r="2" fill="#f59e0b" />
              <circle cx="62" cy="70" r="2" fill="#10b981" />
              <text x="50" y="86" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#38bdf8">
                nimbus-os:~$ ready_
              </text>
            </g>
          )}

          {/* Power LED and badge */}
          {buildStep >= 4 && (
            <g style={{ animation: 'popFadeIn 0.3s ease' }}>
              <circle cx="178" cy="34" r="4" fill="#10b981" className="animate-pulse-green" />
              <text x="178" y="46" textAnchor="middle" fontSize="7" fontWeight="600" fill="#10b981">
                ONLINE
              </text>
            </g>
          )}

          {/* Top Label */}
          <rect x="35" y="-12" width="150" height="22" rx="11" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
          <text x="110" y="3" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">
            "A Computer Made of Software"
          </text>
        </g>
      </svg>
    </div>
  );
};

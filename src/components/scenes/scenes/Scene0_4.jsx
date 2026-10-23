import React from 'react';
import { interpolate } from '@/utils/interpolate';

/**
 * Scene0_4: The course roadmap
 * Visual: 5 sequential phase milestone badges:
 * Foundations (M1-M3) -> Build (M4-M5) -> Attack (M6-M9) -> Harden (M10-M12) -> Report & Compliance (M13).
 * Animated progress indicator tracks continuously through the phases.
 */
export default function Scene0_4({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;

  const phases = [
    { num: 1, name: 'Foundations', mods: 'M1–M3', color: '#0284c7', pos: 0.05 },
    { num: 2, name: 'Build', mods: 'M4–M5', color: '#0d9488', pos: 0.28 },
    { num: 3, name: 'Attack', mods: 'M6–M9', color: '#dc2626', pos: 0.50 },
    { num: 4, name: 'Harden', mods: 'M10–M12', color: '#d97706', pos: 0.72 },
    { num: 5, name: 'Report', mods: 'M13', color: '#4f46e5', pos: 0.95 }
  ];

  const fillX2 = interpolate(p, [0.05, 0.95], [45, 295], { ease: 'easeInOut' });

  return (
    <g>
      {/* Top Banner */}
      <rect x="20" y="10" width="300" height="20" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="800">
        COURSE PROGRESSION: 5 PHASES · 13 MODULES
      </text>

      {/* Main Connecting Track Line */}
      <line x1="45" y1="85" x2="295" y2="85" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      {/* Continuously gliding progress bar fill */}
      <line
        x1="45"
        y1="85"
        x2={isReducedMotion ? 295 : fillX2}
        y2="85"
        stroke="#0284c7"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 5 Phase Milestone Nodes */}
      {phases.map((phase, idx) => {
        const xPos = 45 + idx * 62.5;
        const reachedRatio = interpolate(p, [phase.pos - 0.06, phase.pos], [0, 1]);
        const isReached = isReducedMotion || reachedRatio >= 0.5;
        const ringRadius = interpolate(p, [phase.pos - 0.05, phase.pos, phase.pos + 0.15], [13, 16, 13]);

        return (
          <g key={phase.num} transform={`translate(${xPos}, 85)`}>
            {/* Outer ring */}
            <circle
              cx="0"
              cy="0"
              r={isReducedMotion ? 13 : ringRadius}
              fill="#ffffff"
              stroke={isReached ? phase.color : '#cbd5e1'}
              strokeWidth={isReached ? '2.5' : '1.8'}
              filter={isReached ? 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' : 'none'}
            />
            {/* Center number */}
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill={isReached ? phase.color : '#94a3b8'}
              fontSize="9"
              fontWeight="800"
            >
              {phase.num}
            </text>

            {/* Phase name label */}
            <text
              x="0"
              y="-22"
              textAnchor="middle"
              fill={isReached ? '#0f172a' : '#94a3b8'}
              fontSize="8"
              fontWeight={isReached ? '800' : '600'}
            >
              {phase.name}
            </text>

            {/* Modules badge */}
            <rect
              x="-22"
              y="22"
              width="44"
              height="16"
              rx="3"
              fill={isReached ? phase.color : '#f1f5f9'}
            />
            <text
              x="0"
              y="33"
              textAnchor="middle"
              fill={isReached ? '#ffffff' : '#94a3b8'}
              fontSize="6.5"
              fontWeight="700"
            >
              {phase.mods}
            </text>
          </g>
        );
      })}

      {/* Bottom Subtext */}
      <text x="170" y="172" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">
        {p > 0.7 ? 'Final Deliverable: Executive Audit Report' : 'Each module builds directly on the previous'}
      </text>
    </g>
  );
}

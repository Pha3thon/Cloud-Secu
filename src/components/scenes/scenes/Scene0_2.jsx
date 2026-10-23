import React from 'react';
import { interpolate } from '@/utils/interpolate';

/**
 * Scene0_2: Cloud computing, in one breath
 * Visual: Smooth transition from Standalone On-Prem Generator to Utility Cloud Grid.
 * Continuous motion: smoke drifts up, energy pulses across divider, plug smoothly connects.
 */
export default function Scene0_2({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;

  // Smoothly cross-fade focus from left generator to right utility grid
  const leftOpacity = interpolate(p, [0, 0.4, 0.6, 1], [1, 1, 0.4, 0.4], { ease: 'easeInOut' });
  const rightOpacity = interpolate(p, [0, 0.4, 0.6, 1], [0.4, 0.4, 1, 1], { ease: 'easeInOut' });

  // Smoke particles smoothly rising from generator exhaust
  const smokeY1 = interpolate(p, [0, 0.4], [24, 10]);
  const smokeR1 = interpolate(p, [0, 0.4], [3, 7]);
  const smokeOp1 = interpolate(p, [0, 0.08, 0.32, 0.45], [0, 0.65, 0.65, 0]);

  const smokeY2 = interpolate(p, [0.1, 0.5], [24, 8]);
  const smokeR2 = interpolate(p, [0.1, 0.5], [2.5, 6]);
  const smokeOp2 = interpolate(p, [0.1, 0.18, 0.42, 0.52], [0, 0.5, 0.5, 0]);

  // Center flow packet gliding from generator to cloud grid
  const flowX = interpolate(p, [0.35, 0.62], [150, 185], { ease: 'easeInOut' });
  const flowOp = interpolate(p, [0.32, 0.38, 0.58, 0.65], [0, 1, 1, 0]);

  // Utility grid plug cable energy flow
  const cableDash = interpolate(p, [0.55, 0.95], [60, 0]);
  const rightBorderColor = interpolate(p, [0.45, 0.7], ['#cbd5e1', '#0284c7']);

  return (
    <g>
      {/* Title Header Bar */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f1f5f9" />
      <text x="170" y="24" textAnchor="middle" fill="#334155" fontSize="8.5" fontWeight="700">
        RENTING VS BUYING: ON-PREM GENERATOR VS UTILITY POWER GRID
      </text>

      {/* Left: Standalone Diesel Generator (On-Premises Hardware) */}
      <g transform="translate(30, 42)" style={{ opacity: leftOpacity }}>
        <rect x="0" y="0" width="125" height="110" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="10" y="10" width="105" height="20" rx="4" fill="#fee2e2" />
        <text x="62" y="23" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="800">
          OWNED HARDWARE
        </text>

        {/* Generator body */}
        <rect x="25" y="38" width="75" height="42" rx="4" fill="#475569" />
        {/* Exhaust pipe */}
        <path d="M 40 38 L 40 28 L 32 24" fill="none" stroke="#64748b" strokeWidth="3" />

        {/* Continuously floating smoke puffs */}
        {!isReducedMotion && (
          <>
            <circle cx="28" cy={smokeY1} r={smokeR1} fill="#94a3b8" opacity={smokeOp1} />
            <circle cx="24" cy={smokeY2} r={smokeR2} fill="#cbd5e1" opacity={smokeOp2} />
          </>
        )}

        {/* Meter */}
        <circle cx="62" cy="59" r="10" fill="#1e293b" />
        <text x="62" y="62" textAnchor="middle" fill="#ef4444" fontSize="6.5" fontWeight="800">
          $ CAPEX
        </text>
        <text x="62" y="96" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600">
          Upfront purchase & idle fuel
        </text>
      </g>

      {/* Center Divider / Smooth Flow Arrow */}
      <line x1="160" y1="97" x2="180" y2="97" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
      {!isReducedMotion && (
        <circle cx={flowX} cy="97" r="4" fill="#0284c7" opacity={flowOp} />
      )}

      {/* Right: City Power Grid / Cloud Plug (Utility Compute) */}
      <g transform="translate(185, 42)" style={{ opacity: rightOpacity }}>
        <rect
          x="0"
          y="0"
          width="125"
          height="110"
          rx="8"
          fill="#ffffff"
          stroke={rightBorderColor}
          strokeWidth="1.8"
        />
        <rect
          x="10"
          y="10"
          width="105"
          height="20"
          rx="4"
          fill={p >= 0.55 ? '#e0f2fe' : '#f1f5f9'}
        />
        <text
          x="62"
          y="23"
          textAnchor="middle"
          fill={p >= 0.55 ? '#0369a1' : '#64748b'}
          fontSize="8"
          fontWeight="800"
        >
          UTILITY CLOUD GRID
        </text>

        {/* Cloud Wall Socket */}
        <rect x="35" y="40" width="55" height="40" rx="4" fill="#f8fafc" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="52" cy="60" r="3" fill="#0f172a" />
        <circle cx="72" cy="60" r="3" fill="#0f172a" />

        {/* Animated Plug Cable */}
        <path
          d="M 62 60 L 62 78 L 105 78"
          fill="none"
          stroke={p >= 0.55 ? '#0284c7' : '#94a3b8'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset={isReducedMotion ? 0 : cableDash}
        />

        {/* Meter reading */}
        <text
          x="62"
          y="96"
          textAnchor="middle"
          fill={p >= 0.55 ? '#0284c7' : '#64748b'}
          fontSize="7"
          fontWeight="700"
        >
          {p >= 0.55 ? 'Pay only for what you draw' : 'On-demand API plug'}
        </text>
      </g>

      {/* Bottom Subtext */}
      <text x="170" y="172" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="600">
        M2 covers architecture in depth — for now, hold this one concept.
      </text>
    </g>
  );
}

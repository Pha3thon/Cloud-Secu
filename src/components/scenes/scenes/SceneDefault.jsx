import React from 'react';
import { Character } from '../parts';
import { interpolate } from '@/utils/interpolate';

export default function SceneDefault({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const packetX = interpolate(p, [0.15, 0.85], [150, 205], { ease: 'easeInOut' });
  const packetOp = interpolate(p, [0.12, 0.20, 0.80, 0.88], [0, 1, 1, 0]);

  return (
    <g>
      {/* Background workspace blueprint */}
      <rect x="40" y="25" width="260" height="135" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1="40" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1.5" />
      <circle cx="55" cy="38" r="4" fill="var(--brand-primary, #0284c7)" />
      <text x="65" y="42" fill="#0f172a" fontSize="9" fontWeight="700">QuickMart Cloud Platform</text>

      {/* Cloud node interaction */}
      <g transform="translate(70, 70)">
        <rect width="80" height="55" rx="6" fill="#f8fafc" stroke="var(--brand-primary, #0284c7)" strokeWidth="1.5" />
        <text x="40" y="25" textAnchor="middle" fill="var(--brand-primary, #0284c7)" fontSize="8.5" fontWeight="800">OpenStack</text>
        <text x="40" y="40" textAnchor="middle" fill="#64748b" fontSize="7.5">qm-net</text>
      </g>

      {/* Data flow */}
      <path d="M 150 97 L 205 97" stroke="#0d9488" strokeWidth="2" strokeDasharray="3,3" />
      <polygon points="210,97 202,93 202,101" fill="#0d9488" />
      {!isReducedMotion && (
        <circle cx={packetX} cy="97" r="3.5" fill="#0d9488" opacity={packetOp} />
      )}

      <g transform="translate(210, 70)">
        <rect width="80" height="55" rx="6" fill="#f8fafc" stroke="#0d9488" strokeWidth="1.5" />
        <text x="40" y="25" textAnchor="middle" fill="#0d9488" fontSize="8.5" fontWeight="800">Workload</text>
        <text x="40" y="40" textAnchor="middle" fill="#64748b" fontSize="7.5">qm-web-01</text>
      </g>

      <Character type="trainee" x={50} y={120} scale={0.75} />
      <Character type="priya" x={290} y={120} scale={0.75} flip={true} />
    </g>
  );
}

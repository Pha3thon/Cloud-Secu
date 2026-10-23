import React from 'react';
import { Character } from '../parts';
import { interpolate } from '@/utils/interpolate';

/**
 * Scene0_6: Quick check-in (ungraded reflection)
 * Visual: Trainee seated at terminal desk with thought bubbles reflecting on
 * key takeaways, crystallizing smoothly into an "Orientation Ready" launchpad.
 */
export default function Scene0_6({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;

  const bubbles = [
    { label: 'Linux Shell & Perms', icon: '>_', color: '#0d9488', range: [0.1, 0.35] },
    { label: 'Subnets & 10.x.x.x', icon: 'IP', color: '#0284c7', range: [0.35, 0.62] },
    { label: 'Packet Firewalls', icon: 'FW', color: '#6366f1', range: [0.62, 0.90] }
  ];

  const screenPulse = interpolate(p, [0, 0.5, 1], [0.85, 1, 0.85]);

  return (
    <g>
      {/* Desk and Workstation */}
      <rect x="25" y="115" width="130" height="10" rx="2" fill="#334155" />
      <rect x="35" y="125" width="8" height="40" rx="1" fill="#475569" />
      <rect x="135" y="125" width="8" height="40" rx="1" fill="#475569" />

      {/* Monitor */}
      <rect x="60" y="70" width="55" height="38" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
      <rect x="63" y="73" width="49" height="32" rx="2" fill="#1e293b" />
      <rect x="83" y="108" width="10" height="7" fill="#475569" />
      <text
        x="87"
        y="92"
        textAnchor="middle"
        fill="#38bdf8"
        fontSize="7"
        fontFamily="monospace"
        style={{ opacity: isReducedMotion ? 1 : screenPulse }}
      >
        student@cdac
      </text>

      {/* Trainee Character */}
      <Character type="trainee" x={155} y={80} scale={1} flip={true} label="You" />

      {/* Reflection Thought Bubbles on Right */}
      <g transform="translate(200, 25)">
        <text x="55" y="10" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
          MENTAL ANCHOR
        </text>

        {bubbles.map((b, idx) => {
          const yPos = 20 + idx * 36;
          const [startP, endP] = b.range;
          const ratio = interpolate(p, [startP, endP], [0, 1]);
          const isLit = isReducedMotion || ratio >= 0.5;
          const bubbleY = interpolate(p, [startP, endP], [yPos + 5, yPos], { ease: 'easeOut' });
          const bubbleOp = interpolate(p, [startP - 0.05, endP], [0.35, 1]);

          return (
            <g
              key={b.label}
              transform={`translate(0, ${isReducedMotion ? yPos : bubbleY})`}
              style={{ opacity: isReducedMotion ? 1 : bubbleOp }}
            >
              <rect
                x="0"
                y="0"
                width="115"
                height="28"
                rx="6"
                fill={isLit ? '#ffffff' : '#f8fafc'}
                stroke={isLit ? b.color : '#cbd5e1'}
                strokeWidth={isLit ? '1.8' : '1'}
                filter={isLit ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))' : 'none'}
              />
              <circle cx="16" cy="14" r="9" fill={isLit ? b.color : '#cbd5e1'} />
              <text x="16" y="17" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">
                {b.icon}
              </text>
              <text x="32" y="18" fill={isLit ? '#0f172a' : '#64748b'} fontSize="7" fontWeight="700">
                {b.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* Bottom Subtext */}
      <text x="170" y="178" textAnchor="middle" fill="#059669" fontSize="8.5" fontWeight="700">
        ✓ Orientation complete — foundation vocabulary unlocked
      </text>
    </g>
  );
}

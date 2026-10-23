import React from 'react';
import { interpolate } from '@/utils/interpolate';

/**
 * Scene0_5: Why these specific non-cloud topics matter later
 * Visual: 4-lane connection bridge mapping non-cloud foundations on the left
 * to where they resurface directly in cloud security labs on the right.
 * Continuous beam pulses glide along each bridge lane sequentially.
 */
export default function Scene0_5({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;

  const lanes = [
    { left: 'Networking & Subnets', right: 'Cloud VPCs & CIDR (M4, M10)', color: '#0284c7', range: [0.05, 0.28] },
    { left: 'Linux CLI & Files', right: 'Kali Shell & VM Admin (All Labs)', color: '#0d9488', range: [0.28, 0.52] },
    { left: 'DNS, HTTP & TLS', right: 'Recon & Web Attacks (M6–M8)', color: '#dc2626', range: [0.52, 0.76] },
    { left: 'CIA Triad & Zero Trust', right: 'Cloud IAM & Audit Reports (M7, M13)', color: '#4f46e5', range: [0.76, 0.98] }
  ];

  return (
    <g>
      {/* Column Headers */}
      <text x="75" y="16" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="800">
        M1 NON-CLOUD TOPIC
      </text>
      <text x="265" y="16" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="800">
        WHERE IT RESURFACES
      </text>

      {/* 4 Lanes */}
      {lanes.map((lane, idx) => {
        const yPos = 36 + idx * 34;
        const [startP, endP] = lane.range;
        const activeRatio = interpolate(p, [startP, endP], [0, 1]);
        const isActive = isReducedMotion || activeRatio > 0.3;
        const packetX = interpolate(p, [startP, endP], [135, 195], { ease: 'easeInOut' });
        const packetOp = interpolate(p, [startP, startP + 0.05, endP - 0.05, endP], [0, 1, 1, 0]);

        return (
          <g key={lane.left} transform={`translate(0, ${yPos})`}>
            {/* Left Box */}
            <rect
              x="15"
              y="0"
              width="120"
              height="26"
              rx="4"
              fill={isActive ? '#ffffff' : '#f8fafc'}
              stroke={isActive ? lane.color : '#cbd5e1'}
              strokeWidth={isActive ? '1.8' : '1'}
              filter={isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))' : 'none'}
            />
            <text
              x="75"
              y="16"
              textAnchor="middle"
              fill={isActive ? '#0f172a' : '#64748b'}
              fontSize="7"
              fontWeight="700"
            >
              {lane.left}
            </text>

            {/* Connecting Animated Tracer Line */}
            <line
              x1="135"
              y1="13"
              x2="195"
              y2="13"
              stroke={isActive ? lane.color : '#e2e8f0'}
              strokeWidth={isActive ? '2' : '1.5'}
              strokeDasharray={isActive ? 'none' : '3,3'}
            />
            {!isReducedMotion && (
              <circle cx={packetX} cy="13" r="3" fill={lane.color} opacity={packetOp} />
            )}

            {/* Right Box */}
            <rect
              x="195"
              y="0"
              width="135"
              height="26"
              rx="4"
              fill={isActive ? '#ffffff' : '#f8fafc'}
              stroke={isActive ? lane.color : '#cbd5e1'}
              strokeWidth={isActive ? '1.8' : '1'}
              filter={isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))' : 'none'}
            />
            <text
              x="262"
              y="16"
              textAnchor="middle"
              fill={isActive ? lane.color : '#64748b'}
              fontSize="6.8"
              fontWeight="700"
            >
              {lane.right}
            </text>
          </g>
        );
      })}

      {/* Bottom Subtext */}
      <text x="170" y="178" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">
        Everything in M1 is direct scaffolding for specific attack/defense labs later.
      </text>
    </g>
  );
}

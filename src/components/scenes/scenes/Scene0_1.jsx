import React from 'react';
import { interpolate } from '@/utils/interpolate';

/**
 * Scene0_1: What is this course actually about?
 * Visual: Foundation pillars (Networking, Linux, Security) lighting up sequentially,
 * establishing the foundation upon which cloud API orchestrations sit.
 */
export default function Scene0_1({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;

  const foundations = [
    { title: 'Networking', subtitle: 'IPs, Subnets, Ports', color: '#0284c7', icon: 'NET', range: [0.05, 0.3] },
    { title: 'Linux System', subtitle: 'CLI, Processes, Perms', color: '#0d9488', icon: 'CLI', range: [0.25, 0.52] },
    { title: 'Security Basics', subtitle: 'Firewalls, CIA Triad', color: '#6366f1', icon: 'SEC', range: [0.48, 0.75] }
  ];

  const cloudArcOp = interpolate(p, [0.7, 0.95], [0.4, 1], { ease: 'easeInOut' });
  const cloudArcStroke = interpolate(p, [0.7, 0.95], ['#cbd5e1', '#38bdf8']);
  const cloudArcFill = interpolate(p, [0.7, 0.95], ['#f8fafc', '#e0f2fe']);

  return (
    <g>
      {/* Cloud Horizon Arc (Top) */}
      <path
        d="M 40 45 C 80 15 260 15 300 45 L 310 70 L 30 70 Z"
        fill={cloudArcFill}
        stroke={cloudArcStroke}
        strokeWidth="1.5"
      />
      <text
        x="170"
        y="42"
        textAnchor="middle"
        fill={p >= 0.75 ? '#0369a1' : '#94a3b8'}
        fontSize="10"
        fontWeight="800"
        letterSpacing="0.05em"
        style={{ opacity: cloudArcOp }}
      >
        CLOUD PLATFORMS & AUTOMATION APIS
      </text>

      {/* 3 Strong Foundation Pillars */}
      {foundations.map((item, idx) => {
        const xPos = 45 + idx * 95;
        const [startP, endP] = item.range;
        const activeRatio = interpolate(p, [startP, endP], [0, 1], { ease: 'easeInOut' });
        const yOffset = interpolate(p, [startP, endP], [8, 0], { ease: 'easeOut' });
        const cardOpacity = interpolate(p, [startP - 0.05, startP + 0.15], [0.4, 1]);
        const borderColor = interpolate(p, [startP, endP], ['#cbd5e1', item.color]);

        return (
          <g
            key={item.title}
            transform={`translate(${xPos}, ${85 + (isReducedMotion ? 0 : yOffset)})`}
            style={{ opacity: isReducedMotion ? 1 : cardOpacity }}
          >
            {/* Pillar Block */}
            <rect
              x="0"
              y="0"
              width="68"
              height="80"
              rx="6"
              fill={activeRatio > 0.5 ? '#ffffff' : '#f1f5f9'}
              stroke={borderColor}
              strokeWidth={activeRatio > 0.5 ? '2' : '1.5'}
              filter={activeRatio > 0.5 ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.06))' : 'none'}
            />
            {/* Pillar Header Badge */}
            <rect
              x="0"
              y="0"
              width="68"
              height="24"
              rx="6"
              fill={activeRatio > 0.5 ? item.color : '#cbd5e1'}
            />
            <text x="34" y="16" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
              {item.icon}
            </text>

            {/* Pillar Labels */}
            <text x="34" y="44" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
              {item.title}
            </text>
            <text x="34" y="58" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="600">
              {item.subtitle}
            </text>

            {/* Active Status Indicator */}
            {activeRatio > 0.5 && (
              <circle cx="34" cy="70" r="3" fill="#10b981" />
            )}
          </g>
        );
      })}

      {/* Bottom Baseline Ground */}
      <line x1="20" y1="168" x2="320" y2="168" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <text x="170" y="179" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">
        Prerequisite Ground: Fundamentals Before Cloud Buttons
      </text>
    </g>
  );
}

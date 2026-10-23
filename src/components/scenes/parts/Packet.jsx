import React from 'react';
import Character from './Character';

/**
 * Animated packet representation.
 */
export function Packet({ cx = 170, cy = 62, r = 5, color = '#f59e0b', pulse = true }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      className={pulse ? 'animate-pulse' : ''}
    />
  );
}

/**
 * ServerRack visual prop.
 */
export function ServerRack({ x = 30, y = 30, width = 60, height = 90, label = 'Host' }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={width} height={height} rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      {[12, 28, 44, 60, 76].map((unitY, idx) => (
        <g key={idx}>
          <rect x="6" y={unitY} width={width - 12} height="10" rx="2" fill="#0f172a" />
          <circle cx="12" cy={unitY + 5} r="2" fill={idx % 2 === 0 ? '#10b981' : '#38bdf8'} />
          <circle cx="18" cy={unitY + 5} r="1.5" fill="#64748b" />
          <line
            x1="24"
            y1={unitY + 5}
            x2={width - 10}
            y2={unitY + 5}
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        </g>
      ))}
      <text
        x={width / 2}
        y={height + 14}
        textAnchor="middle"
        fill="#64748b"
        fontSize="9"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  );
}

/**
 * ScooterRider delivery prop.
 */
export function ScooterRider({ x = 50, y = 100, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="-25" cy="40" r="10" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
      <circle cx="30" cy="40" r="10" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
      <path
        d="M -25 40 L -5 38 L 15 38 L 26 12 L 20 8"
        fill="none"
        stroke="#e11d48"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <rect x="-24" y="8" width="22" height="22" rx="3" fill="#e11d48" />
      <text x="-13" y="22" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">
        QM
      </text>
      <Character type="rider" x={5} y={0} scale={0.8} />
    </g>
  );
}

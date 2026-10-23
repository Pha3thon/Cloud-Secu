import React from 'react';
import { ScooterRider } from '../parts';

export default function Scene2_1({ currentStep: _currentStep }) {
  return (
    <g>
      {/* Warehouse floor outline (qm-net) */}
      <rect
        x="50"
        y="30"
        width="240"
        height="120"
        rx="12"
        fill="#f0fdf4"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeDasharray="6,4"
      />
      <text x="65" y="48" fill="#047857" fontSize="10" fontWeight="800">qm-net (Private Network)</text>

      {/* Subnet shelf divisions */}
      <line x1="60" y1="85" x2="280" y2="85" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="3,3" />
      <text x="65" y="78" fill="#059669" fontSize="8">qm-subnet: 10.20.1.0/24</text>

      {/* Shelf rows */}
      <rect x="70" y="95" width="45" height="28" rx="3" fill="#ffffff" stroke="#10b981" />
      <text x="92" y="112" textAnchor="middle" fill="#065f46" fontSize="7.5">10.20.1.3 (Web)</text>

      <rect x="140" y="95" width="45" height="28" rx="3" fill="#ffffff" stroke="#10b981" />
      <text x="162" y="112" textAnchor="middle" fill="#065f46" fontSize="7.5">10.20.1.4 (DB)</text>

      {/* Rider plugging cable */}
      <ScooterRider x={220} y={75} scale={0.75} />
    </g>
  );
}

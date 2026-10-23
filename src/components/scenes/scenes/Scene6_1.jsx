import React from 'react';

export default function Scene6_1({ currentStep }) {
  return (
    <g>
      {/* Floating Tag */}
      <g
        transform={`translate(${currentStep >= 1 ? 160 : 70}, 35)`}
        style={{ transition: 'all 600ms ease-in-out' }}
      >
        <rect
          width="90"
          height="24"
          rx="12"
          fill="var(--brand-primary, #0284c7)"
          filter="drop-shadow(0 3px 6px rgba(2,132,199,0.3))"
        />
        <text x="45" y="15" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800">
          203.0.113.27
        </text>
      </g>

      {/* Instance 1 */}
      <rect x="40" y="80" width="90" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <text x="85" y="105" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="700">qm-web-01</text>
      <text x="85" y="120" textAnchor="middle" fill="#64748b" fontSize="7.5">10.20.1.3</text>

      {/* Instance 2 */}
      <rect x="160" y="80" width="90" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <text x="205" y="105" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="700">qm-web-02</text>
      <text x="205" y="120" textAnchor="middle" fill="#64748b" fontSize="7.5">10.20.1.5</text>
    </g>
  );
}

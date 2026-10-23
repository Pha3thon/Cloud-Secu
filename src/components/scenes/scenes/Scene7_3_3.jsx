import React from 'react';
import { Character } from '../parts';

/**
 * Scene7_3_3: Who gets an account at QuickMart
 * Visual: 4 personas mapped to their authorized roles:
 * - Ravi (Operations Lead) → member
 * - FreshFarms (Produce Vendor) → reader
 * - Customer Test → No access (0 cloud roles)
 * - Trainee → member (build without user-admin)
 */
export default function Scene7_3_3({ currentStep }) {
  const personas = [
    { type: 'ravi', name: 'Ravi', role: 'member', label: 'Store Ops', color: '#0284c7' },
    { type: 'freshfarms', name: 'FreshFarms', role: 'reader', label: 'Supplier', color: '#16a34a' },
    { type: 'customer', name: 'Customer', role: 'No access', label: 'Shopper', color: '#64748b' },
    { type: 'trainee', name: 'Trainee', role: 'member', label: 'Engineer', color: '#0284c7' }
  ];

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        QUICKMART PERSONAS: LEAST PRIVILEGE ROLE ASSIGNMENTS
      </text>

      {/* 4 Persona Cards */}
      <g transform="translate(25, 40)">
        {personas.map((p, idx) => {
          const xPos = idx * 72;
          const isActive = currentStep === idx || currentStep >= 4;

          return (
            <g key={p.name} transform={`translate(${xPos}, 0)`} style={{ transition: 'all 250ms ease' }}>
              <rect
                x="0"
                y="0"
                width="66"
                height="105"
                rx="6"
                fill="#ffffff"
                stroke={isActive ? p.color : '#e2e8f0'}
                strokeWidth={isActive ? '2' : '1'}
                filter={isActive ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))' : 'none'}
              />
              {/* Character Figure */}
              <Character type={p.type} x={33} y={15} scale={0.7} />

              {/* Name & Role Badge */}
              <text x="33" y="68" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="800">
                {p.name}
              </text>
              <text x="33" y="78" textAnchor="middle" fill="#64748b" fontSize="6">
                {p.label}
              </text>

              <rect
                x="6"
                y="84"
                width="54"
                height="15"
                rx="3"
                fill={isActive ? p.color : '#f1f5f9'}
              />
              <text
                x="33"
                y="94"
                textAnchor="middle"
                fill={isActive ? '#ffffff' : '#64748b'}
                fontSize="6.5"
                fontWeight="800"
              >
                {p.role}
              </text>
            </g>
          );
        })}
      </g>

      {/* Bottom Subtext */}
      <text x="170" y="166" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Customers shop through the app and need zero cloud console access.
      </text>
    </g>
  );
}

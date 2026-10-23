import React from 'react';

/**
 * Scene7_3_1: Roles: reader, member, admin
 * Visual: 3-rung ladder of increasing privilege:
 * 1. reader (view only, green eye)
 * 2. member (manage & build, blue wrench)
 * 3. admin (full control, purple crown / master key)
 */
export default function Scene7_3_1({ currentStep }) {
  const roles = [
    { name: 'reader', perm: 'View only', desc: 'Read metrics, list instances, view configs', color: '#16a34a', icon: '👁' },
    { name: 'member', perm: 'Manage & Build', desc: 'Launch VMs, configure networks & security groups', color: '#0284c7', icon: '🔧' },
    { name: 'admin', perm: 'Full Control', desc: 'Create users, assign roles, delete any resource', color: '#9333ea', icon: '👑' }
  ];

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        KEYSTONE ROLE HIERARCHY: LADDER OF INCREASING POWER
      </text>

      {/* 3 Ladder Rungs */}
      <g transform="translate(30, 38)">
        {roles.map((r, idx) => {
          const yPos = (2 - idx) * 36;
          const isActive = currentStep === idx || currentStep >= 3;

          return (
            <g key={r.name} transform={`translate(0, ${yPos})`} style={{ transition: 'all 250ms ease' }}>
              <rect
                x="0"
                y="0"
                width="280"
                height="30"
                rx="5"
                fill={isActive ? '#ffffff' : '#f8fafc'}
                stroke={isActive ? r.color : '#e2e8f0'}
                strokeWidth={isActive ? '2' : '1'}
                filter={isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))' : 'none'}
              />
              {/* Icon badge */}
              <rect x="6" y="5" width="28" height="20" rx="3" fill={isActive ? r.color : '#f1f5f9'} />
              <text x="20" y="19" textAnchor="middle" fill={isActive ? '#ffffff' : '#64748b'} fontSize="10">
                {r.icon}
              </text>

              {/* Role Title */}
              <text x="44" y="15" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="800">
                {r.name}
              </text>
              <text x="44" y="25" fill="#64748b" fontSize="6.5">
                {r.desc}
              </text>

              {/* Badge */}
              <rect x="205" y="6" width="68" height="18" rx="3" fill={isActive ? r.color : '#f1f5f9'} />
              <text x="239" y="18" textAnchor="middle" fill={isActive ? '#ffffff' : '#94a3b8'} fontSize="6.5" fontWeight="800">
                {r.perm}
              </text>
            </g>
          );
        })}
      </g>

      {/* Principle of Least Privilege callout */}
      <text x="170" y="168" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Grant the lowest rung that accomplishes the job to limit blast radius.
      </text>
    </g>
  );
}

import React from 'react';

/**
 * Scene4_3_2: Rule and Port
 * Visual: Add Rule form opening distinct numbered security doors:
 * Port 22 (SSH terminal), Port 80 (HTTP storefront), Port 443 (HTTPS padlock),
 * Port 3306 (MySQL database cylinder).
 */
export default function Scene4_3_2({ currentStep }) {
  const doors = [
    { port: '22', name: 'SSH', color: '#0284c7', icon: '>_' },
    { port: '80', name: 'HTTP', color: '#0d9488', icon: 'WEB' },
    { port: '443', name: 'HTTPS', color: '#16a34a', icon: 'SSL' },
    { port: '3306', name: 'MySQL', color: '#d97706', icon: 'SQL' }
  ];

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        SECURITY GROUP PRESETS: NUMBERED APPLICATION DOORS
      </text>

      {/* 4 Port Doors */}
      <g transform="translate(30, 45)">
        {doors.map((door, idx) => {
          const xPos = idx * 72;
          const isOpen = currentStep === idx || currentStep >= 4;

          return (
            <g key={door.port} transform={`translate(${xPos}, 0)`} style={{ transition: 'all 300ms ease' }}>
              {/* Door Frame */}
              <rect
                x="0"
                y="0"
                width="64"
                height="95"
                rx="6"
                fill="#ffffff"
                stroke={isOpen ? door.color : '#cbd5e1'}
                strokeWidth={isOpen ? '2' : '1.5'}
                filter={isOpen ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))' : 'none'}
              />
              {/* Door Header */}
              <rect
                x="0"
                y="0"
                width="64"
                height="22"
                rx="6"
                fill={isOpen ? door.color : '#f1f5f9'}
              />
              <text x="32" y="15" textAnchor="middle" fill={isOpen ? '#ffffff' : '#64748b'} fontSize="7.5" fontWeight="800">
                {door.name}
              </text>

              {/* Port Number Pill */}
              <rect x="12" y="32" width="40" height="20" rx="3" fill="#f8fafc" stroke="#e2e8f0" />
              <text x="32" y="46" textAnchor="middle" fill="#0f172a" fontSize="9" fontFamily="monospace" fontWeight="900">
                :{door.port}
              </text>

              {/* Status Badge */}
              <g transform="translate(12, 64)">
                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="16"
                  rx="3"
                  fill={isOpen ? '#ecfdf5' : '#f8fafc'}
                  stroke={isOpen ? '#10b981' : '#cbd5e1'}
                />
                <text
                  x="20"
                  y="11"
                  textAnchor="middle"
                  fill={isOpen ? '#065f46' : '#94a3b8'}
                  fontSize="6.5"
                  fontWeight="800"
                >
                  {isOpen ? 'OPEN' : 'CLOSED'}
                </text>
              </g>
            </g>
          );
        })}
      </g>

      {/* Footer warning */}
      <text x="170" y="165" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Each rule opens one specific TCP port. Never open database 3306 to 0.0.0.0/0.
      </text>
    </g>
  );
}

import React from 'react';

/**
 * Scene6_3_4: Reading results in the browser
 * Visual: 4 Kali Firefox test windows demonstrating exposure testing:
 * 1. http://203.0.113.27 → Storefront loads (200 OK)
 * 2. http://203.0.113.27/status → Database connected
 * 3. http://203.0.113.27:3306 → Connection timed out (firewall drop)
 * 4. http://10.20.1.4 → Unable to connect (no route)
 */
export default function Scene6_3_4({ currentStep }) {
  const tests = [
    { url: 'http://203.0.113.27', result: 'Storefront loads (200 OK)', color: '#16a34a', status: 'PASS' },
    { url: 'http://203.0.113.27/status', result: 'DB: 10.20.1.4:3306 connected', color: '#16a34a', status: 'PASS' },
    { url: 'http://203.0.113.27:3306', result: 'The connection has timed out', color: '#ea580c', status: 'TIMEOUT' },
    { url: 'http://10.20.1.4', result: 'Unable to connect (no route)', color: '#dc2626', status: 'NO ROUTE' }
  ];

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        VERIFYING EXPOSURE FROM KALI LINUX FIREFOX
      </text>

      {/* 4 URL Test Result Strips */}
      <g transform="translate(25, 38)">
        {tests.map((t, idx) => {
          const yPos = idx * 30;
          const isActive = currentStep === idx || currentStep >= 4;

          return (
            <g key={t.url} transform={`translate(0, ${yPos})`} style={{ transition: 'all 250ms ease' }}>
              <rect
                x="0"
                y="0"
                width="290"
                height="24"
                rx="4"
                fill={isActive ? '#ffffff' : '#f8fafc'}
                stroke={isActive ? t.color : '#e2e8f0'}
                strokeWidth={isActive ? '2' : '1'}
                filter={isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))' : 'none'}
              />
              <text x="10" y="15" fill="#0f172a" fontSize="7" fontFamily="monospace" fontWeight="700">
                {t.url}
              </text>
              <text x="175" y="15" fill={t.color} fontSize="6.5" fontWeight="700">
                {t.result}
              </text>
              <rect x="245" y="4" width="40" height="16" rx="2" fill={isActive ? t.color : '#f1f5f9'} />
              <text
                x="265"
                y="15"
                textAnchor="middle"
                fill={isActive ? '#ffffff' : '#94a3b8'}
                fontSize="6"
                fontWeight="900"
              >
                {t.status}
              </text>
            </g>
          );
        })}
      </g>

      {/* Bottom Distinction insight */}
      <text x="170" y="168" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        'Timed out' = dropped by firewall · 'Unable to connect' = no routing path exists.
      </text>
    </g>
  );
}

import React from 'react';

/**
 * Scene5_2: How launching works, and why we need it
 * Visual: 4-stage pipeline of instance boot:
 * 1. Nova Scheduler selects host -> 2. Glance pulls OS image ->
 * 3. Neutron attaches NIC to qm-net -> 4. Status turns from BUILD to ACTIVE.
 */
export default function Scene5_2({ currentStep }) {
  const steps = [
    { title: '1. Nova Schedule', desc: 'Finds physical host', color: '#0284c7' },
    { title: '2. Glance Image', desc: 'Pulls ubuntu template', color: '#ea580c' },
    { title: '3. Neutron Port', desc: 'Plugs into qm-net', color: '#0d9488' },
    { title: '4. Active Status', desc: 'Instance is ACTIVE', color: '#16a34a' }
  ];

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        NOVA LAUNCH PIPELINE: FROM CLICK TO RUNNING INSTANCE
      </text>

      {/* 4 Pipeline Stages */}
      <g transform="translate(25, 45)">
        {steps.map((st, idx) => {
          const xPos = idx * 72;
          const isDone = currentStep >= idx;
          const isCur = currentStep === idx;

          return (
            <g key={st.title} transform={`translate(${xPos}, 0)`} style={{ transition: 'all 300ms ease' }}>
              <rect
                x="0"
                y="0"
                width="66"
                height="85"
                rx="6"
                fill="#ffffff"
                stroke={isDone ? st.color : '#cbd5e1'}
                strokeWidth={isCur ? '2.5' : '1.5'}
                filter={isCur ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' : 'none'}
              />
              <rect
                x="0"
                y="0"
                width="66"
                height="22"
                rx="6"
                fill={isDone ? st.color : '#f1f5f9'}
              />
              <text x="33" y="15" textAnchor="middle" fill={isDone ? '#ffffff' : '#64748b'} fontSize="6.5" fontWeight="800">
                {st.title}
              </text>
              <text x="33" y="44" textAnchor="middle" fill="#0f172a" fontSize="6.5" fontWeight="700">
                {st.desc}
              </text>

              {/* Status Circle */}
              <circle
                cx="33"
                cy="66"
                r="7"
                fill={isDone ? st.color : '#f1f5f9'}
                stroke={isDone ? '#ffffff' : '#cbd5e1'}
                strokeWidth="1.5"
              />
              <text x="33" y="69" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="900">
                {isDone ? '✓' : idx + 1}
              </text>
            </g>
          );
        })}
      </g>

      {/* Status Progress Box at Bottom */}
      <g transform="translate(45, 140)">
        <rect x="0" y="0" width="250" height="25" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="12" y="16" fill="#64748b" fontSize="7" fontWeight="700">
          State transition:
        </text>
        <rect
          x="85"
          y="5"
          width="50"
          height="15"
          rx="3"
          fill={currentStep < 3 ? '#fed7aa' : '#ecfdf5'}
        />
        <text
          x="110"
          y="15"
          textAnchor="middle"
          fill={currentStep < 3 ? '#c2410c' : '#065f46'}
          fontSize="7"
          fontWeight="850"
        >
          {currentStep < 3 ? 'BUILDING...' : 'ACTIVE'}
        </text>
        <text x="195" y="16" textAnchor="middle" fill="#0f172a" fontSize="7" fontFamily="monospace">
          {currentStep >= 3 ? 'IP: 10.20.1.3' : 'Allocating...'}
        </text>
      </g>
    </g>
  );
}

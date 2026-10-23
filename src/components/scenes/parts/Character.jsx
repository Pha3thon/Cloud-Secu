import React from 'react';

/**
 * Shared stick figure character component with role badges and accessories.
 */
export default function Character({
  type = 'trainee',
  x = 50,
  y = 100,
  scale = 1,
  flip = false,
  label = ''
}) {
  const transform = `translate(${x}, ${y}) scale(${flip ? -scale : scale}, ${scale})`;

  let headColor = '#0f172a';
  let badgeColor = 'var(--brand-primary, #0284c7)';
  let accessory = null;

  if (type === 'trainee') {
    badgeColor = 'var(--brand-primary, #0284c7)';
    accessory = (
      <rect x="10" y="16" width="16" height="10" rx="1.5" fill="#334155" />
    );
  } else if (type === 'priya') {
    headColor = '#0f766e';
    badgeColor = '#0d9488';
    accessory = (
      <g>
        <rect x="8" y="14" width="12" height="16" rx="2" fill="#0f766e" />
        <line x1="10" y1="18" x2="18" y2="18" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="10" y1="22" x2="18" y2="22" stroke="#ffffff" strokeWidth="1.5" />
      </g>
    );
  } else if (type === 'ravi') {
    badgeColor = '#d97706';
    accessory = (
      <g>
        <rect x="9" y="18" width="10" height="6" rx="1" fill="#d97706" />
        <line x1="19" y1="21" x2="27" y2="21" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
      </g>
    );
  } else if (type === 'freshfarms') {
    badgeColor = '#16a34a';
    accessory = (
      <g>
        <rect x="6" y="15" width="22" height="14" rx="2" fill="#78350f" />
        <circle cx="12" cy="19" r="3" fill="#16a34a" />
        <circle cx="17" cy="18" r="3.5" fill="#ea580c" />
        <circle cx="22" cy="20" r="2.5" fill="#eab308" />
      </g>
    );
  } else if (type === 'customer') {
    badgeColor = '#64748b';
    accessory = (
      <g>
        <rect x="10" y="14" width="8" height="14" rx="1.5" fill="#0284c7" />
        <circle cx="14" cy="25" r="1" fill="#ffffff" />
      </g>
    );
  } else if (type === 'rider') {
    badgeColor = '#e11d48';
    accessory = (
      <g>
        <circle cx="0" cy="-2" r="9" fill="none" stroke="#e11d48" strokeWidth="2.5" />
        <rect x="-16" y="10" width="10" height="18" rx="2" fill="#e11d48" />
      </g>
    );
  }

  return (
    <g transform={transform}>
      {/* Head */}
      <circle cx="0" cy="0" r="7.5" fill="none" stroke={headColor} strokeWidth="2.5" />
      {/* Torso */}
      <line x1="0" y1="7.5" x2="0" y2="28" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      {/* Legs */}
      <line x1="0" y1="28" x2="-8" y2="46" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="0" y1="28" x2="8" y2="46" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms */}
      <line x1="0" y1="14" x2="-10" y2="24" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="0" y1="14" x2="12" y2="22" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      {/* Badge / Collar */}
      <circle cx="0" cy="12" r="2.5" fill={badgeColor} />
      {/* Accessory */}
      {accessory}
      {/* Label */}
      {label && (
        <text
          x="0"
          y="56"
          textAnchor="middle"
          fill="#475569"
          fontSize="9.5"
          fontWeight="600"
          fontFamily="inherit"
        >
          {label}
        </text>
      )}
    </g>
  );
}

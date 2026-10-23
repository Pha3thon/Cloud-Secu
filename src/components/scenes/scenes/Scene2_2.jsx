import React from 'react';
import { Packet } from '../parts';

export default function Scene2_2({ currentStep }) {
  return (
    <g>
      {/* Virtual Switch */}
      <rect x="110" y="25" width="120" height="30" rx="6" fill="#1e293b" />
      <text x="170" y="44" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="700">Neutron vSwitch</text>

      {/* VM 1 */}
      <rect x="50" y="100" width="70" height="45" rx="6" fill="#ffffff" stroke="var(--brand-primary, #0284c7)" strokeWidth="2" />
      <text x="85" y="125" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700">qm-web-01</text>

      {/* VM 2 */}
      <rect x="220" y="100" width="70" height="45" rx="6" fill="#ffffff" stroke="#0d9488" strokeWidth="2" />
      <text x="255" y="125" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700">qm-db-01</text>

      {/* Connecting cables & port plugs */}
      <path d="M 85 100 L 85 70 L 140 55" fill="none" stroke="var(--brand-primary, #0284c7)" strokeWidth="2.5" />
      <circle cx="140" cy="55" r="4" fill="var(--brand-primary, #0284c7)" />

      <path d="M 255 100 L 255 70 L 200 55" fill="none" stroke="#0d9488" strokeWidth="2.5" />
      <circle cx="200" cy="55" r="4" fill="#0d9488" />

      {/* Animated Packet travelling */}
      {currentStep >= 1 && (
        <Packet cx={170} cy={62} r={5} color="#f59e0b" pulse={true} />
      )}
    </g>
  );
}

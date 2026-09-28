import React, { useState, useEffect } from 'react';

export const NetworkPacketScene = ({ isReplaying }) => {
  const [lineDrawn, setLineDrawn] = useState(false);
  const [packetActive, setPacketActive] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLineDrawn(true), 400);
    const t2 = setTimeout(() => setPacketActive(true), 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isReplaying]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 520 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Floor */}
        <line x1="40" y1="185" x2="480" y2="185" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

        {/* Host A (Stick Figure 1 - Left) */}
        <g transform="translate(70, 75)">
          {/* Head */}
          <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          {/* Torso */}
          <line x1="20" y1="34" x2="20" y2="75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arm holding network cable */}
          <path d="M20 45 L38 52 L55 58" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <line x1="20" y1="45" x2="6" y2="60" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="20" y1="75" x2="10" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="75" x2="30" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Badge */}
          <rect x="-8" y="-12" width="56" height="20" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
          <text x="20" y="2" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0369a1">
            Host A (VM)
          </text>
        </g>

        {/* Host B (Stick Figure 2 - Right) */}
        <g transform="translate(410, 75)">
          {/* Head */}
          <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          {/* Torso */}
          <line x1="20" y1="34" x2="20" y2="75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arm receiving network connection */}
          <path d="M20 45 L2 52 L-15 58" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <line x1="20" y1="45" x2="34" y2="60" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="20" y1="75" x2="10" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="75" x2="30" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Badge */}
          <rect x="-8" y="-12" width="56" height="20" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
          <text x="20" y="2" textAnchor="middle" fontSize="9" fontWeight="700" fill="#059669">
            Host B (App)
          </text>
        </g>

        {/* Middle Network Cloud & Firewall */}
        <g transform="translate(210, 85)">
          {/* Virtual Network Bubble */}
          <rect x="0" y="0" width="100" height="70" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Firewall Shield */}
          <path d="M50 18 L65 24 L65 42 Q50 54 50 54 Q35 42 35 24 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <text x="50" y="38" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0369a1">
            SG
          </text>
          <text x="50" y="66" textAnchor="middle" fontSize="8" fontWeight="600" fill="#64748b">
            Security Group
          </text>
        </g>

        {/* Animated Connecting Dotted Line */}
        <path
          d="M 125 133 L 210 133 M 310 133 L 395 133"
          stroke="#0284c7"
          strokeWidth="3"
          strokeDasharray="6 6"
          fill="none"
          style={{
            strokeDashoffset: lineDrawn ? 0 : 200,
            transition: 'stroke-dashoffset 1s ease-in-out'
          }}
        />

        {/* Animated Traveling Packet */}
        {packetActive && (
          <g
            style={{
              animation: 'packetTravel 2.8s linear infinite'
            }}
            transform="translate(130, 118)"
          >
            <rect x="0" y="0" width="32" height="20" rx="4" fill="#0284c7" filter="drop-shadow(0 2px 4px rgba(2, 132, 199, 0.4))" />
            <text x="16" y="13" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">
              TCP:22
            </text>
          </g>
        )}

        {/* Top VPC Topology Label */}
        <rect x="180" y="25" width="160" height="24" rx="12" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="260" y="41" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0369a1">
          Virtual Private Cloud (VPC)
        </text>
      </svg>
    </div>
  );
};

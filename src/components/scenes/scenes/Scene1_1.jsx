import React from 'react';
import { Character, ServerRack } from '../parts';

export default function Scene1_1({ currentStep }) {
  const nodes = [
    { name: 'Keystone', role: 'Identity', color: '#8b5cf6', icon: 'ID' },
    { name: 'Nova', role: 'Compute', color: '#0284c7', icon: 'VM' },
    { name: 'Neutron', role: 'Network', color: '#0d9488', icon: 'NET' },
    { name: 'Glance', role: 'Images', color: '#f59e0b', icon: 'IMG' },
    { name: 'Horizon', role: 'Dashboard', color: '#10b981', icon: 'UI' }
  ];

  return (
    <g>
      {/* Background cloud bubble */}
      <path
        d="M 90 120 C 60 120 40 90 60 65 C 50 40 80 20 110 30 C 130 10 190 10 220 30 C 250 20 280 40 270 65 C 290 90 270 120 240 120 Z"
        fill={currentStep >= 1 ? '#e0f2fe' : '#f1f5f9'}
        stroke="#bae6fd"
        strokeWidth="2"
        style={{ transition: 'all 500ms' }}
      />
      {/* Physical servers fading to cloud */}
      <ServerRack x={40} y={130} width={45} height={60} label="Rack A" />
      <ServerRack x={95} y={130} width={45} height={60} label="Rack B" />

      {/* 5 OpenStack Service Nodes popping in */}
      {nodes.map((node, i) => {
        const posX = 70 + i * 55;
        const posY = 55 + (i % 2 === 0 ? 0 : 15);
        const isActive = currentStep >= 2;
        return (
          <g key={node.name} transform={`translate(${posX}, ${posY})`} style={{ transition: 'all 400ms' }}>
            <rect
              x="-22"
              y="-18"
              width="44"
              height="36"
              rx="6"
              fill={isActive ? '#ffffff' : '#f8fafc'}
              stroke={isActive ? node.color : '#cbd5e1'}
              strokeWidth={isActive ? '2.5' : '1.5'}
              filter={isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))' : 'none'}
            />
            <text x="0" y="-4" textAnchor="middle" fill={node.color} fontSize="8" fontWeight="800">
              {node.icon}
            </text>
            <text x="0" y="8" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="700">
              {node.name}
            </text>
          </g>
        );
      })}

      <Character type="trainee" x={300} y={120} label="Trainee" />
    </g>
  );
}

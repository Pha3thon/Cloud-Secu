/**
 * Horizon Network Topology Panel
 * Visual interactive diagram of networks, routers, interfaces, and instances.
 */

import React, { useState } from 'react';
import { Globe, Radio, Share2, Server } from 'lucide-react';

export const Topology = ({ simCloud }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const hasRouter = (simCloud.routers || []).some((r) => r.name === 'qm-router');
  const hasNet = (simCloud.networks || []).some((n) => n.name === 'qm-net');
  const instances = simCloud.instances || [];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Network Topology</h2>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Live diagram of OpenStack Neutron networking</p>
      </div>

      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '24px',
          minHeight: '380px',
          position: 'relative'
        }}
      >
        <svg width="100%" height="320" viewBox="0 0 700 320" style={{ overflow: 'visible' }}>
          {/* External Network Line */}
          <line x1="80" y1="60" x2="620" y2="60" stroke="#0284c7" strokeWidth="4" />
          <text x="80" y="45" fill="#0369a1" fontSize="12" fontWeight="700">public-net (External Network)</text>

          {/* Router Node if created */}
          {hasRouter && (
            <g
              transform="translate(250, 60)"
              onClick={() => setSelectedNode('Router: qm-router')}
              style={{ cursor: 'pointer' }}
            >
              <line x1="0" y1="0" x2="0" y2="90" stroke="#64748b" strokeWidth="3" strokeDasharray="4,4" />
              <rect x="-24" y="66" width="48" height="48" rx="8" fill="#0f172a" />
              <circle cx="0" cy="90" r="16" fill="#38bdf8" />
              <text x="0" y="130" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">qm-router</text>
            </g>
          )}

          {/* Internal Network Line if router interface connected */}
          {hasRouter && hasNet && (
            <g>
              <line x1="80" y1="200" x2="620" y2="200" stroke="#0d9488" strokeWidth="4" />
              <text x="80" y="185" fill="#0f766e" fontSize="12" fontWeight="700">qm-net (10.20.1.0/24)</text>
              <line x1="250" y1="114" x2="250" y2="200" stroke="#0d9488" strokeWidth="3" />
            </g>
          )}

          {/* Instances hooked to qm-net */}
          {hasNet && instances.map((vm, idx) => {
            const posX = 160 + idx * 180;
            return (
              <g
                key={vm.name}
                transform={`translate(${posX}, 200)`}
                onClick={() => setSelectedNode(`Instance: ${vm.name} (${vm.privateIp})`)}
                style={{ cursor: 'pointer' }}
              >
                <line x1="0" y1="0" x2="0" y2="50" stroke="#64748b" strokeWidth="2" />
                <rect x="-20" y="45" width="40" height="40" rx="6" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
                <circle cx="0" cy="65" r="8" fill="#10b981" />
                <text x="0" y="102" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="700">{vm.name}</text>
                <text x="0" y="115" textAnchor="middle" fill="#64748b" fontSize="9.5">{vm.privateIp}</text>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Details Bar */}
        {selectedNode && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '10px 14px',
              fontSize: '11.5px',
              color: '#0f172a',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span><strong>Selected Resource:</strong> {selectedNode}</span>
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              style={{ color: '#0284c7', fontWeight: '700' }}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topology;

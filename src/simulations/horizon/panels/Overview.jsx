/**
 * Horizon Overview Panel
 * Displays project quotas and Limit Summary gauges.
 */

import React from 'react';

export const Overview = ({ simCloud }) => {
  const instancesCount = (simCloud.instances || []).length;
  const vcpusCount = (simCloud.instances || []).reduce((acc, vm) => acc + (vm.flavor === 'm1.medium' ? 2 : 1), 0);
  const ramGbCount = (simCloud.instances || []).reduce((acc, vm) => acc + (vm.flavor === 'm1.medium' ? 4 : 2), 0);
  const fipsCount = (simCloud.floatingIps || []).length;
  const sgsCount = (simCloud.securityGroups || []).length;
  const netsCount = (simCloud.networks || []).length;
  const routersCount = (simCloud.routers || []).length;

  const quotas = [
    { label: 'Instances', used: instancesCount, max: 10, unit: '' },
    { label: 'VCPUs', used: vcpusCount, max: 20, unit: '' },
    { label: 'RAM', used: ramGbCount, max: 50, unit: 'GB' },
    { label: 'Floating IPs', used: fipsCount, max: 3, unit: '' },
    { label: 'Security Groups', used: sgsCount, max: 10, unit: '' },
    { label: 'Networks', used: netsCount, max: 5, unit: '' },
    { label: 'Routers', used: routersCount, max: 5, unit: '' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Limit Summary</h2>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Project: quickmart • Hardware allocation quotas</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
        {quotas.map((q) => {
          const pct = Math.min(100, Math.round((q.used / q.max) * 100));
          return (
            <div
              key={q.label}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>{q.label}</span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
                  {q.used} of {q.max} {q.unit}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${pct}%`,
                    height: '100%',
                    backgroundColor: pct >= 80 ? '#ef4444' : '#0284c7',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;

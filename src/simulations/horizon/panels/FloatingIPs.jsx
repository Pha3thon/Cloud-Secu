/**
 * Horizon Floating IPs Panel
 * Displays allocated public floating IPs and mapped instance ports.
 */

import React from 'react';
import { Plus, Globe, Link2 } from 'lucide-react';
import { canCreateResource } from '../policy';

export const FloatingIPs = ({
  simCloud,
  userRole,
  onAllocateFipClick,
  onAssociateFipClick
}) => {
  const floatingIps = simCloud.floatingIps || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Floating IPs</h2>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Public IP allocations from pool public-net</p>
        </div>
        {canCreateResource(userRole) && (
          <button
            type="button"
            onClick={onAllocateFipClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700'
            }}
          >
            <Plus size={14} /> Allocate IP To Project
          </button>
        )}
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px' }}>IP Address</th>
              <th style={{ padding: '10px 14px' }}>Mapped Fixed IP Address</th>
              <th style={{ padding: '10px 14px' }}>Pool</th>
              <th style={{ padding: '10px 14px' }}>Status</th>
              <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {floatingIps.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                  No floating IPs allocated yet.
                </td>
              </tr>
            ) : (
              floatingIps.map((fip) => (
                <tr key={fip.ip} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: '700', color: '#0284c7' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Globe size={14} color="#0284c7" />
                      <span>{fip.ip}</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#334155' }}>
                    {fip.portIp ? `${fip.instanceId} (${fip.portIp})` : '—'}
                  </td>
                  <td style={{ padding: '10px 14px', color: '#64748b' }}>{fip.pool || 'public-net'}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', backgroundColor: fip.instanceId ? '#dcfce7' : '#f1f5f9', color: fip.instanceId ? '#166534' : '#64748b' }}>
                      {fip.instanceId ? 'Active' : 'Down'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => onAssociateFipClick(fip)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        backgroundColor: '#e0f2fe',
                        color: '#0369a1',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}
                    >
                      <Link2 size={12} /> {fip.instanceId ? 'Disassociate' : 'Associate'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FloatingIPs;

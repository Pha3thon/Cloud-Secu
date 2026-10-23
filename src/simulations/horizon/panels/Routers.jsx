/**
 * Horizon Routers Panel
 * Displays virtual routers and interface attachments.
 */

import React, { useState } from 'react';
import { Plus, ArrowLeft, Share2 } from 'lucide-react';
import { canCreateResource } from '../policy';

export const Routers = ({
  simCloud,
  userRole,
  onCreateRouterClick,
  onAddInterfaceClick
}) => {
  const [activeRouterDetail, setActiveRouterDetail] = useState(null);
  const [activeRouterTab, setActiveRouterTab] = useState('interfaces');

  const routers = simCloud.routers || [];
  const selectedRouter = routers.find((r) => r.name === activeRouterDetail);

  if (selectedRouter) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setActiveRouterDetail(null)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#0284c7', fontWeight: '600', marginBottom: '14px' }}
        >
          <ArrowLeft size={14} /> Back to Routers
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Router Details: {selectedRouter.name}</h2>
            <p style={{ fontSize: '12px', color: '#64748b' }}>External Gateway: {selectedRouter.externalNetwork} ({selectedRouter.externalIp})</p>
          </div>
          {canCreateResource(userRole) && (
            <button
              type="button"
              onClick={onAddInterfaceClick}
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
              <Plus size={14} /> Add Interface
            </button>
          )}
        </div>

        {/* Sub-tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => setActiveRouterTab('overview')}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: '700',
              borderBottom: activeRouterTab === 'overview' ? '2px solid #0284c7' : '2px solid transparent',
              color: activeRouterTab === 'overview' ? '#0284c7' : '#64748b'
            }}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveRouterTab('interfaces')}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: '700',
              borderBottom: activeRouterTab === 'interfaces' ? '2px solid #0284c7' : '2px solid transparent',
              color: activeRouterTab === 'interfaces' ? '#0284c7' : '#64748b'
            }}
          >
            Interfaces
          </button>
        </div>

        {activeRouterTab === 'overview' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Router Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div><strong>Name:</strong> {selectedRouter.name}</div>
              <div><strong>Status:</strong> Active</div>
              <div><strong>External Network:</strong> {selectedRouter.externalNetwork}</div>
              <div><strong>External IP:</strong> {selectedRouter.externalIp}</div>
              <div><strong>SNAT:</strong> Enabled</div>
              <div><strong>Admin State:</strong> UP</div>
            </div>
          </div>
        )}

        {activeRouterTab === 'interfaces' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px' }}>Name / Subnet</th>
                  <th style={{ padding: '10px 14px' }}>Fixed IP</th>
                  <th style={{ padding: '10px 14px' }}>Status</th>
                  <th style={{ padding: '10px 14px' }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {(selectedRouter.interfaces || []).length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                      No interfaces currently connected to this router.
                    </td>
                  </tr>
                ) : (
                  (selectedRouter.interfaces || []).map((iface) => (
                    <tr key={iface} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 14px', fontWeight: '700', color: '#0284c7' }}>{iface}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>10.20.1.1</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#166534' }}>
                          ACTIVE
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px', color: '#64748b' }}>Internal Interface</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Routers</h2>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Neutron layer-3 routing between internal subnets and external networks</p>
        </div>
        {canCreateResource(userRole) && (
          <button
            type="button"
            onClick={onCreateRouterClick}
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
            <Plus size={14} /> Create Router
          </button>
        )}
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px' }}>Name</th>
              <th style={{ padding: '10px 14px' }}>Status</th>
              <th style={{ padding: '10px 14px' }}>External Network</th>
              <th style={{ padding: '10px 14px' }}>External Gateway IP</th>
              <th style={{ padding: '10px 14px' }}>SNAT</th>
              <th style={{ padding: '10px 14px' }}>Admin State</th>
            </tr>
          </thead>
          <tbody>
            {routers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                  No routers created yet in project quickmart.
                </td>
              </tr>
            ) : (
              routers.map((r) => (
                <tr key={r.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: '700' }}>
                    <button
                      type="button"
                      onClick={() => setActiveRouterDetail(r.name)}
                      style={{ color: '#0284c7', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Share2 size={14} color="#0284c7" />
                      <span>{r.name}</span>
                    </button>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#166534' }}>
                      Active
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#334155' }}>{r.externalNetwork}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0f172a' }}>{r.externalIp}</td>
                  <td style={{ padding: '10px 14px', color: '#64748b' }}>Enabled</td>
                  <td style={{ padding: '10px 14px', color: '#64748b' }}>UP</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Routers;

/**
 * Horizon Instances Panel
 * Lists compute instances with Launch and Delete action triggers.
 */

import React from 'react';
import { Plus, Trash2, Server } from 'lucide-react';
import { canCreateResource } from '../policy';

export const Instances = ({
  simCloud,
  userRole,
  onLaunchClick,
  onDeleteVmClick
}) => {
  const instances = simCloud.instances || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Instances</h2>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Virtual machines provisioned in project quickmart</p>
        </div>
        {canCreateResource(userRole) && (
          <button
            type="button"
            onClick={onLaunchClick}
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
            <Plus size={14} /> Launch Instance
          </button>
        )}
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px' }}>Instance Name</th>
              <th style={{ padding: '10px 14px' }}>Image Name</th>
              <th style={{ padding: '10px 14px' }}>IP Address</th>
              <th style={{ padding: '10px 14px' }}>Flavor</th>
              <th style={{ padding: '10px 14px' }}>Status</th>
              <th style={{ padding: '10px 14px' }}>Security Groups</th>
              <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instances.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                  No instances available in this project.
                </td>
              </tr>
            ) : (
              instances.map((vm) => (
                <tr key={vm.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: '700', color: '#0284c7' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Server size={14} color="#64748b" />
                      <span>{vm.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#334155' }}>{vm.image}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0f172a' }}>
                    {vm.privateIp}
                  </td>
                  <td style={{ padding: '10px 14px', color: '#64748b' }}>{vm.flavor}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: vm.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2',
                        color: vm.status === 'ACTIVE' ? '#166534' : '#991b1b'
                      }}
                    >
                      {vm.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#475569' }}>
                    {(vm.securityGroups || []).join(', ')}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => onDeleteVmClick(vm)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        color: '#dc2626',
                        backgroundColor: '#fef2f2',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}
                      title="Delete Instance"
                    >
                      <Trash2 size={12} /> Delete
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

export default Instances;

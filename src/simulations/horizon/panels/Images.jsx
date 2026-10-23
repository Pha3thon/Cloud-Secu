/**
 * Horizon Images Panel
 * Displays available Glance operating system and workload images.
 */

import React from 'react';
import { HardDrive } from 'lucide-react';

export const Images = () => {
  const images = [
    { name: 'ubuntu-22.04', type: 'qcow2', status: 'Active', visibility: 'Public', minDisk: '20 GB', minRam: '2 GB' },
    { name: 'mysql-8-server', type: 'qcow2', status: 'Active', visibility: 'Public', minDisk: '40 GB', minRam: '4 GB' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Images</h2>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Glance image repository for provisioning instances</p>
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px' }}>Image Name</th>
              <th style={{ padding: '10px 14px' }}>Type</th>
              <th style={{ padding: '10px 14px' }}>Status</th>
              <th style={{ padding: '10px 14px' }}>Visibility</th>
              <th style={{ padding: '10px 14px' }}>Min Disk</th>
              <th style={{ padding: '10px 14px' }}>Min RAM</th>
            </tr>
          </thead>
          <tbody>
            {images.map((img) => (
              <tr key={img.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700', color: '#0284c7' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <HardDrive size={14} color="#64748b" />
                    <span>{img.name}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>{img.type}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#166534' }}>
                    {img.status}
                  </span>
                </td>
                <td style={{ padding: '10px 14px', color: '#64748b' }}>{img.visibility}</td>
                <td style={{ padding: '10px 14px', color: '#64748b' }}>{img.minDisk}</td>
                <td style={{ padding: '10px 14px', color: '#64748b' }}>{img.minRam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Images;

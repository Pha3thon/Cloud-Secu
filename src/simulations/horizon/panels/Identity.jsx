/**
 * Horizon Identity Panel
 * Keystone administrative panel visible exclusively to cloud admins.
 */

import React from 'react';
import { Users, Shield } from 'lucide-react';

export const Identity = ({ simCloud }) => {
  const userRoles = simCloud.userRoles || {};

  const usersList = [
    { username: 'admin', domain: 'Default', email: 'admin@cdac.lab', role: 'admin' },
    { username: 'trainee', domain: 'Default', email: 'trainee@quickmart.lab', role: userRoles['trainee'] || 'member' },
    { username: 'ravi-employee', domain: 'Default', email: 'ravi@quickmart.lab', role: userRoles['ravi-employee'] || 'No access' },
    { username: 'freshfarms-vendor', domain: 'Default', email: 'orders@freshfarms.lab', role: userRoles['freshfarms-vendor'] || 'No access' },
    { username: 'customer-test', domain: 'Default', email: 'qa@customer.lab', role: userRoles['customer-test'] || 'No access' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Identity: Users & Project Roles</h2>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Keystone administrative user directory for Domain: Default</p>
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px' }}>User Name</th>
              <th style={{ padding: '10px 14px' }}>Email</th>
              <th style={{ padding: '10px 14px' }}>Project</th>
              <th style={{ padding: '10px 14px' }}>Role in quickmart</th>
              <th style={{ padding: '10px 14px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((u) => (
              <tr key={u.username} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={14} color="#0284c7" />
                    <span>{u.username}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>{u.email}</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>quickmart</td>
                <td style={{ padding: '10px 14px' }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: u.role === 'admin' ? '#fee2e2' : (u.role === 'member' ? '#e0f2fe' : (u.role === 'reader' ? '#f0fdf4' : '#f1f5f9')),
                      color: u.role === 'admin' ? '#991b1b' : (u.role === 'member' ? '#0369a1' : (u.role === 'reader' ? '#166534' : '#64748b'))
                    }}
                  >
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#166534' }}>
                    Enabled
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Identity;

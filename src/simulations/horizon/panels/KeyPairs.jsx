/**
 * Horizon Key Pairs Panel
 * Displays SSH keypairs associated with project quickmart.
 */

import React from 'react';
import { Key, Plus } from 'lucide-react';
import { canCreateResource } from '../policy';

export const KeyPairs = ({ simCloud, userRole, onCreateKeyClick }) => {
  const keyPairs = simCloud.keyPairs || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Key Pairs</h2>
          <p style={{ fontSize: '12px', color: '#64748b' }}>SSH keys for passwordless authentication into instances</p>
        </div>
        {canCreateResource(userRole) && (
          <button
            type="button"
            onClick={onCreateKeyClick}
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
            <Plus size={14} /> Create Key Pair
          </button>
        )}
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px' }}>Key Pair Name</th>
              <th style={{ padding: '10px 14px' }}>Type</th>
              <th style={{ padding: '10px 14px' }}>Fingerprint</th>
            </tr>
          </thead>
          <tbody>
            {keyPairs.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                  No key pairs found.
                </td>
              </tr>
            ) : (
              keyPairs.map((k) => (
                <tr key={k.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: '700', color: '#0284c7' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Key size={14} color="#eab308" />
                      <span>{k.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#334155' }}>ssh-rsa</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#64748b' }}>
                    4f:9b:12:8e:7a:c3:2d:55:01:99:a1:8f:3b:5e:1c:99
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

export default KeyPairs;

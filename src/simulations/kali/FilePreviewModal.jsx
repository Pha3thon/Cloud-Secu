import React from 'react';
import { X } from 'lucide-react';

/**
 * FilePreviewModal: Renders content preview for files in the Kali file manager.
 */
export default function FilePreviewModal({ previewFile, onClose }) {
  if (!previewFile) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 100
      }}
    >
      <div
        style={{
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '640px',
          maxHeight: '80%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#f1f5f9' }}>{previewFile}</span>
          <button type="button" onClick={onClose} style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={15} />
          </button>
        </div>
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', color: '#cbd5e1', fontSize: '12px', fontFamily: 'monospace' }}>
          {previewFile === 'access-report-0912.html' ? (
            <div>
              <div style={{ backgroundColor: '#991b1b', color: '#ffffff', padding: '8px 12px', borderRadius: '4px', marginBottom: '12px', fontWeight: '700' }}>
                🚨 AUDIT ALERT: UNEXPECTED OVERNIGHT ESCALATIONS (09:12 AM)
              </div>
              <p style={{ marginBottom: '8px' }}><strong>Tenant:</strong> quickmart (Production Cloud)</p>
              <p style={{ marginBottom: '8px' }}><strong>User Role Audit Log:</strong></p>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                <li><span style={{ color: '#38bdf8' }}>trainee:</span> member (Normal trainee clearance)</li>
                <li><span style={{ color: '#f59e0b' }}>ravi-employee:</span> member (Store operations)</li>
                <li><span style={{ color: '#ef4444', fontWeight: '700' }}>freshfarms-vendor:</span> admin ⚠️ (ESCALATED OVERNIGHT!)</li>
                <li><span style={{ color: '#ef4444' }}>customer-test:</span> member ⚠️ (SHOULD HAVE NO ACCESS!)</li>
              </ul>
              <p style={{ marginTop: '12px', color: '#94a3b8' }}>
                <strong>Action Required:</strong> Log in as freshfarms-vendor and verify if database deletion is possible under training safeguard, then remediate via Access Portal.
              </p>
            </div>
          ) : (
            <div>
              <p>-----BEGIN RSA PRIVATE KEY-----</p>
              <p>MIIEowIBAAKCAQEA0Qm8j1X9L3xP7yK8...[truncated for security]...</p>
              <p>-----END RSA PRIVATE KEY-----</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

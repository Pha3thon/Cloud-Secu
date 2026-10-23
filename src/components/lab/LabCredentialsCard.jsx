import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Copy, Check } from 'lucide-react';
import { M4_LAB_CREDENTIALS } from '@/content/labCredentials';

/**
 * Collapsible Lab Credentials and Endpoints card with quick copy functionality.
 */
export default function LabCredentialsCard({ topicNumber = 1 }) {
  const [isOpen, setIsOpen] = useState(true);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      style={{
        borderRadius: 'var(--radius-lg, 10px)',
        border: '1px solid #cbd5e1',
        backgroundColor: '#ffffff',
        overflow: 'hidden'
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '10px 14px',
          backgroundColor: '#f8fafc',
          borderBottom: isOpen ? '1px solid var(--border-subtle, #e2e8f0)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          fontWeight: '800',
          color: 'var(--text-main, #0f172a)',
          cursor: 'pointer',
          border: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🔑 Lab Credentials & Endpoints</span>
          <span
            style={{
              fontSize: '10px',
              backgroundColor: '#e0f2fe',
              color: 'var(--brand-primary, #0369a1)',
              padding: '1px 6px',
              borderRadius: '4px'
            }}
          >
            Quick Copy
          </span>
        </div>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isOpen && (
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11.5px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <span style={{ color: 'var(--text-muted, #64748b)', display: 'block', fontSize: '10.5px' }}>Horizon URL</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <code style={{ fontSize: '11px', color: 'var(--brand-primary, #0284c7)' }}>
                  {M4_LAB_CREDENTIALS.horizonUrl}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(M4_LAB_CREDENTIALS.horizonUrl, 'url')}
                  style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                  title="Copy Horizon URL"
                >
                  {copiedKey === 'url' ? <Check size={12} color="#10b981" /> : <Copy size={12} color="#94a3b8" />}
                </button>
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted, #64748b)', display: 'block', fontSize: '10.5px' }}>Domain</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <code style={{ fontSize: '11px' }}>{M4_LAB_CREDENTIALS.domain}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(M4_LAB_CREDENTIALS.domain, 'dom')}
                  style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                  title="Copy Domain"
                >
                  {copiedKey === 'dom' ? <Check size={12} color="#10b981" /> : <Copy size={12} color="#94a3b8" />}
                </button>
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted, #64748b)', display: 'block', fontSize: '10.5px' }}>User Name</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <code style={{ fontSize: '11px', fontWeight: '700' }}>{M4_LAB_CREDENTIALS.username}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(M4_LAB_CREDENTIALS.username, 'user')}
                  style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                  title="Copy Username"
                >
                  {copiedKey === 'user' ? <Check size={12} color="#10b981" /> : <Copy size={12} color="#94a3b8" />}
                </button>
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted, #64748b)', display: 'block', fontSize: '10.5px' }}>Password</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <code style={{ fontSize: '11px' }}>{M4_LAB_CREDENTIALS.password}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(M4_LAB_CREDENTIALS.password, 'pass')}
                  style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                  title="Copy Password"
                >
                  {copiedKey === 'pass' ? <Check size={12} color="#10b981" /> : <Copy size={12} color="#94a3b8" />}
                </button>
              </div>
            </div>
          </div>

          {/* Test Personas in Lab 7 */}
          {topicNumber === 7 && (
            <div style={{ borderTop: '1px solid var(--border-subtle, #f1f5f9)', paddingTop: '8px' }}>
              <span style={{ color: '#0369a1', fontWeight: '700', display: 'block', fontSize: '11px', marginBottom: '4px' }}>
                Test Personas (Created by QuickMart IT) — Password: <code>Welcome@123</code>
              </span>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {M4_LAB_CREDENTIALS.personas.map((p) => (
                  <span
                    key={p.username}
                    style={{
                      padding: '2px 8px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}
                  >
                    {p.username}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

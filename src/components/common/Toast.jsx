import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * Common Toast notification component.
 */
export default function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={16} color="var(--color-success, #16a34a)" />,
    error: <AlertCircle size={16} color="var(--color-danger, #ef4444)" />,
    info: <Info size={16} color="var(--brand-primary, #0284c7)" />
  };

  return (
    <div
      className="animate-slide-up"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '12px 18px',
        borderRadius: 'var(--radius-lg, 8px)',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '420px',
        fontSize: '13px',
        fontWeight: '500',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icons[type] || icons.info}
      </div>
      <div style={{ flex: 1, lineHeight: '1.4' }}>{message}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss toast"
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}

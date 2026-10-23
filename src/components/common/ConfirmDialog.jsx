import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

/**
 * Common ConfirmDialog component.
 * Supports standard confirmation and typed phrase confirmation (e.g. 'RESET').
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
  requiredInput = null, // e.g. "RESET"
  inputInstruction = null
}) {
  const [typedValue, setTypedValue] = useState('');

  if (!isOpen) return null;

  const isConfirmed = requiredInput
    ? typedValue.trim() === requiredInput
    : true;

  const handleConfirm = () => {
    if (!isConfirmed) return;
    onConfirm?.();
    setTypedValue('');
  };

  const handleClose = () => {
    setTypedValue('');
    onClose?.();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(3px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="animate-pop-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl, 14px)',
          boxShadow: 'var(--shadow-xl)',
          border: danger ? '1px solid #fee2e2' : '1px solid var(--border-subtle, #e2e8f0)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: danger ? '#fef2f2' : '#ffffff',
            borderBottom: `1px solid ${danger ? '#fecaca' : '#e2e8f0'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-md, 6px)',
                backgroundColor: danger ? '#fee2e2' : '#f0f9ff',
                color: danger ? 'var(--color-danger, #ef4444)' : 'var(--brand-primary, #0284c7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: danger ? '#991b1b' : 'var(--text-main, #0f172a)',
                  margin: 0
                }}
              >
                {title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            style={{
              border: 'none',
              background: 'transparent',
              color: danger ? '#991b1b' : 'var(--text-muted, #64748b)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', lineHeight: '1.6' }}>
            {message}
          </p>

          {requiredInput && (
            <>
              {inputInstruction && (
                <div
                  style={{
                    backgroundColor: danger ? '#fff1f2' : '#f8fafc',
                    borderRadius: 'var(--radius-md, 6px)',
                    border: `1px solid ${danger ? '#ffe4e6' : '#e2e8f0'}`,
                    padding: '10px 12px',
                    fontSize: '12px',
                    color: danger ? '#9f1239' : '#475569'
                  }}
                >
                  {inputInstruction}
                </div>
              )}
              <input
                type="text"
                value={typedValue}
                onChange={(e) => setTypedValue(e.target.value)}
                placeholder={`Type ${requiredInput}`}
                autoFocus
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md, 6px)',
                  border: isConfirmed && typedValue.trim() ? '2px solid #dc2626' : '1px solid #cbd5e1',
                  fontSize: '13px',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  outline: 'none',
                  backgroundColor: '#ffffff'
                }}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px'
          }}
        >
          <Button variant="outline" size="sm" onClick={handleClose}>
            {cancelText}
          </Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            size="sm"
            disabled={!isConfirmed}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

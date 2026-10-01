import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

export const ResetCourseModal = ({ isOpen, onClose }) => {
  const { resetCourse, showToast } = useCourse();
  const [confirmInput, setConfirmInput] = useState('');

  if (!isOpen) return null;

  const isConfirmed = confirmInput.trim() === 'RESET';

  const handleConfirm = () => {
    if (!isConfirmed) return;
    resetCourse();
    onClose();
    if (showToast) {
      showToast('Course reset. Start again from M4.');
    }
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
    >
      <div
        className="animate-pop-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #fee2e2',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#fef2f2',
            borderBottom: '1px solid #fecaca',
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
                borderRadius: '8px',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#991b1b', margin: 0 }}>
                Reset Entire Course
              </h3>
              <span style={{ fontSize: '11px', color: '#b91c1c' }}>
                Irreversible Action
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#991b1b',
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
            Reset the entire course? This clears all your progress: completed slides, lab flags, your Horizon resources, and your Kali session. This cannot be undone.
          </p>

          <div
            style={{
              backgroundColor: '#fff1f2',
              borderRadius: '8px',
              border: '1px solid #ffe4e6',
              padding: '10px 12px',
              fontSize: '12px',
              color: '#9f1239'
            }}
          >
            To confirm, please type <strong>RESET</strong> in the box below:
          </div>

          <input
            type="text"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            placeholder="Type RESET"
            autoFocus
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: isConfirmed ? '2px solid #dc2626' : '1px solid #cbd5e1',
              fontSize: '13px',
              fontWeight: '700',
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              outline: 'none',
              backgroundColor: '#ffffff'
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 20px',
            backgroundColor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#475569',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!isConfirmed}
            onClick={handleConfirm}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isConfirmed ? '#dc2626' : '#fca5a5',
              color: '#ffffff',
              fontSize: '12.5px',
              fontWeight: '700',
              cursor: isConfirmed ? 'pointer' : 'not-allowed',
              boxShadow: isConfirmed ? '0 2px 4px rgba(220, 38, 38, 0.3)' : 'none'
            }}
          >
            Reset Course
          </button>
        </div>
      </div>
    </div>
  );
};

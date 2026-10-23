import React, { useState } from 'react';
import { LogOut, RotateCcw } from 'lucide-react';
import useStore from '@/hooks/useStore';
import ConfirmDialog from '@/components/common/ConfirmDialog';

/**
 * UserMenu component in the layout header.
 * Displays user identity, reset course trigger, and logout button.
 */
export default function UserMenu() {
  const { user, logout, resetCourse, showToast } = useStore();
  const [resetModalOpen, setResetModalOpen] = useState(false);

  if (!user) return null;

  const handleResetConfirm = () => {
    resetCourse();
    setResetModalOpen(false);
    showToast?.('Course reset. Start again from M4.');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
      {/* Avatar and name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#e0f2fe',
            color: 'var(--brand-primary, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '11px'
          }}
        >
          {user.avatar || (user.name ? user.name.slice(0, 2).toUpperCase() : 'CD')}
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main, #0f172a)' }}>
            {user.name}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted, #64748b)', textTransform: 'capitalize' }}>
            {user.role} Access
          </div>
        </div>
      </div>

      {/* Reset Course (student only) */}
      {user.role === 'student' && (
        <button
          type="button"
          onClick={() => setResetModalOpen(true)}
          title="Reset course progress"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md, 6px)',
            border: '1px solid var(--border-subtle, #e2e8f0)',
            backgroundColor: '#ffffff',
            color: 'var(--text-muted, #64748b)',
            fontSize: '11.5px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={12} />
          <span>Reset Course</span>
        </button>
      )}

      {/* Logout button */}
      <button
        type="button"
        onClick={logout}
        title="Log out of CDAC platform"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-md, 6px)',
          border: '1px solid #cbd5e1',
          backgroundColor: '#f8fafc',
          color: 'var(--text-main, #334155)',
          fontSize: '11.5px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        <LogOut size={13} />
        <span>Logout</span>
      </button>

      {/* Reset Course confirmation dialog */}
      <ConfirmDialog
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleResetConfirm}
        title="Reset Entire Course"
        message="Reset the entire course? This clears all your progress: completed slides, lab flags, your Horizon resources, and your Kali session. This cannot be undone."
        confirmText="Confirm Reset"
        cancelText="Cancel"
        danger
        requiredInput="RESET"
        inputInstruction={<span>To confirm, please type <strong>RESET</strong> in the box below:</span>}
      />
    </div>
  );
}

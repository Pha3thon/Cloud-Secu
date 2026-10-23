import React from 'react';
import { CheckCircle2, Lock } from 'lucide-react';

/**
 * SidebarItem component representing an individual slide, briefing, or lab row.
 */
export default function SidebarItem({
  label,
  code,
  icon: Icon,
  isDone = false,
  isCurrent = false,
  isLocked = false,
  onClick,
  title,
  variant = 'default' // 'default' | 'lab'
}) {
  const isLab = variant === 'lab';

  const getBgColor = () => {
    if (isCurrent) return isLab ? '#f0fdfa' : '#e0f2fe';
    return 'transparent';
  };

  const getTextColor = () => {
    if (isCurrent) return isLab ? '#0f766e' : '#0369a1';
    if (isLocked) return 'var(--text-muted, #94a3b8)';
    return isLab ? '#0d9488' : 'var(--text-main, #334155)';
  };

  return (
    <button
      type="button"
      disabled={isLocked}
      aria-disabled={isLocked}
      title={title || label}
      onClick={isLocked ? undefined : onClick}
      style={{
        padding: '6px 8px',
        borderRadius: 'var(--radius-md, 6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11.5px',
        backgroundColor: getBgColor(),
        color: getTextColor(),
        fontWeight: isLab || isCurrent ? '700' : '500',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        border: 'none',
        textAlign: 'left',
        width: '100%',
        marginTop: isLab ? '2px' : '0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
        {Icon && <Icon size={12} color={isCurrent ? (isLab ? '#0d9488' : 'var(--brand-primary, #0284c7)') : '#64748b'} />}
        {code && (
          <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '10.5px' }}>
            {code}
          </span>
        )}
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      </div>

      {isDone ? (
        <CheckCircle2 size={12} color="var(--color-success, #10b981)" />
      ) : isLocked ? (
        <Lock size={11} color="var(--border-subtle, #cbd5e1)" />
      ) : isCurrent ? (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: isLab ? '#0d9488' : 'var(--brand-primary, #0284c7)'
          }}
        />
      ) : null}
    </button>
  );
}

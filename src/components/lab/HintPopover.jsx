import React from 'react';

/**
 * HintPopover component displaying hint text when toggled.
 */
export default function HintPopover({ hint, isOpen }) {
  if (!isOpen || !hint) return null;

  return (
    <div
      className="animate-pop-in"
      style={{
        padding: '8px 12px',
        borderRadius: 'var(--radius-md, 6px)',
        backgroundColor: '#fef3c7',
        border: '1px solid #fde68a',
        color: '#92400e',
        fontSize: '11.5px',
        lineHeight: '1.45'
      }}
    >
      💡 {hint}
    </div>
  );
}

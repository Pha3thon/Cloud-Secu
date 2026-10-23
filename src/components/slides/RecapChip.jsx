import React from 'react';
import { Bookmark } from 'lucide-react';

/**
 * RecapChip component for displaying slide quick takeaways.
 */
export default function RecapChip({ label }) {
  if (!label) return null;

  return (
    <span
      style={{
        fontSize: '11px',
        fontWeight: '600',
        backgroundColor: '#f1f5f9',
        color: 'var(--text-main, #475569)',
        padding: '2px 10px',
        borderRadius: 'var(--radius-full, 12px)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}
    >
      <Bookmark size={11} color="var(--brand-primary, #0284c7)" />
      {label}
    </span>
  );
}

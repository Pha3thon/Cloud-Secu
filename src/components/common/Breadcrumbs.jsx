import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Common Breadcrumbs navigation component.
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        color: 'var(--text-muted, #64748b)'
      }}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight size={13} color="var(--border-subtle, #cbd5e1)" />}
            {item.onClick && !isLast ? (
              <button
                type="button"
                onClick={item.onClick}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: item.active ? 'var(--brand-primary, #0284c7)' : 'var(--text-muted, #64748b)',
                  fontWeight: item.active ? '700' : '500',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </button>
            ) : (
              <span
                style={{
                  color: isLast ? 'var(--text-main, #0f172a)' : 'var(--text-muted, #64748b)',
                  fontWeight: isLast ? '700' : '500'
                }}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

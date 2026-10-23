import React from 'react';

/**
 * Common Badge component with status colors.
 */
export default function Badge({
  children,
  variant = 'neutral', // 'neutral' | 'primary' | 'success' | 'warning' | 'danger'
  size = 'md',        // 'sm' | 'md'
  icon: Icon,
  style = {}
}) {
  const variantStyles = {
    neutral: {
      backgroundColor: '#f1f5f9',
      color: '#475569',
      border: '1px solid #e2e8f0'
    },
    primary: {
      backgroundColor: '#e0f2fe',
      color: '#0369a1',
      border: '1px solid #bae6fd'
    },
    success: {
      backgroundColor: '#dcfce7',
      color: '#15803d',
      border: '1px solid #bbf7d0'
    },
    warning: {
      backgroundColor: '#fef3c7',
      color: '#b45309',
      border: '1px solid #fde68a'
    },
    danger: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      border: '1px solid #fecaca'
    }
  };

  const sizeStyles = {
    sm: { padding: '2px 6px', fontSize: '10.5px' },
    md: { padding: '3px 8px', fontSize: '11.5px' }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        borderRadius: 'var(--radius-full, 9999px)',
        fontWeight: '700',
        letterSpacing: '0.02em',
        ...(sizeStyles[size] || sizeStyles.md),
        ...(variantStyles[variant] || variantStyles.neutral),
        ...style
      }}
    >
      {Icon && <Icon size={size === 'sm' ? 10 : 12} />}
      {children}
    </span>
  );
}

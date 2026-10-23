import React from 'react';

/**
 * Common Button component with design tokens.
 */
export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconRight: IconRight,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  style = {},
  title,
  ...props
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    borderRadius: 'var(--radius-md, 6px)',
    fontFamily: 'inherit',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.15s ease',
    border: '1px solid transparent',
    outline: 'none',
    userSelect: 'none',
    ...style
  };

  const sizeStyles = {
    sm: { padding: '4px 10px', fontSize: '11.5px', height: '28px' },
    md: { padding: '6px 14px', fontSize: '12.5px', height: '34px' },
    lg: { padding: '10px 18px', fontSize: '14px', height: '42px' }
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--brand-primary, #0284c7)',
      color: '#ffffff',
      borderColor: 'var(--brand-primary, #0284c7)'
    },
    secondary: {
      backgroundColor: '#f1f5f9',
      color: '#334155',
      borderColor: '#cbd5e1'
    },
    danger: {
      backgroundColor: 'var(--color-danger, #ef4444)',
      color: '#ffffff',
      borderColor: '#dc2626'
    },
    outline: {
      backgroundColor: '#ffffff',
      color: '#475569',
      borderColor: '#cbd5e1'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#64748b',
      borderColor: 'transparent'
    }
  };

  const mergedStyle = {
    ...baseStyle,
    ...(sizeStyles[size] || sizeStyles.md),
    ...(variantStyles[variant] || variantStyles.primary),
    ...style
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      title={title}
      className={className}
      style={mergedStyle}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 13 : 15} />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 13 : 15} />}
    </button>
  );
}

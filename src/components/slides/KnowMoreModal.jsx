import React, { useEffect } from 'react';
import { X, BookOpen, Info, Lightbulb } from 'lucide-react';

/**
 * KnowMoreModal component for supplemental slide concepts.
 */
export default function KnowMoreModal({ isOpen, onClose, knowMoreData }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !knowMoreData) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="animate-pop-in"
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl, 16px)',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          padding: '24px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            borderBottom: '1px solid var(--border-subtle, #f1f5f9)',
            paddingBottom: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-md, 8px)',
                backgroundColor: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <BookOpen size={18} color="var(--brand-primary, #0284c7)" />
            </div>
            <div>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: '800',
                  color: 'var(--brand-primary, #0284c7)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                Know More (Optional)
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main, #0f172a)' }}>
                {knowMoreData.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-muted, #94a3b8)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 3 Structured Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 1. What is it? */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              padding: '14px',
              borderRadius: 'var(--radius-lg, 10px)',
              border: '1px solid var(--border-subtle, #e2e8f0)'
            }}
          >
            <h4
              style={{
                fontSize: '12px',
                fontWeight: '800',
                color: '#0369a1',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Info size={14} />
              What is it?
            </h4>
            <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', margin: 0 }}>
              {knowMoreData.whatIsIt}
            </p>
          </div>

          {/* 2. Why does it matter here? */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              padding: '14px',
              borderRadius: 'var(--radius-lg, 10px)',
              border: '1px solid var(--border-subtle, #e2e8f0)'
            }}
          >
            <h4
              style={{
                fontSize: '12px',
                fontWeight: '800',
                color: '#0d9488',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Lightbulb size={14} />
              Why does it matter here?
            </h4>
            <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', margin: 0 }}>
              {knowMoreData.whyDoesItMatter}
            </p>
          </div>

          {/* 3. Real-world Analogy */}
          {knowMoreData.simpleAnalogy && (
            <div
              style={{
                backgroundColor: '#fffbeb',
                padding: '14px',
                borderRadius: 'var(--radius-lg, 10px)',
                border: '1px solid #fef3c7'
              }}
            >
              <h4
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  color: '#b45309',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '6px'
                }}
              >
                Real-World Analogy
              </h4>
              <p style={{ fontSize: '13px', color: '#78350f', lineHeight: '1.5', margin: 0, fontStyle: 'italic' }}>
                "{knowMoreData.simpleAnalogy}"
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '14px',
            borderTop: '1px solid var(--border-subtle, #f1f5f9)',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 18px',
              backgroundColor: 'var(--brand-primary, #0284c7)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md, 6px)',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

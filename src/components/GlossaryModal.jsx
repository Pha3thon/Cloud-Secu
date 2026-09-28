import React, { useEffect } from 'react';
import { X, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

export const GlossaryModal = ({ isOpen, onClose, title, content }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !content) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(4px)',
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
          borderRadius: '16px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0',
          padding: '28px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '20px',
            borderBottom: '1px solid #f1f5f9',
            paddingBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284c7'
              }}
            >
              <BookOpen size={20} />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0284c7' }}>
                Deep Dive Concept
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                {title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: '#64748b',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.color = '#64748b';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Section 1: What is it? */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              padding: '16px',
              border: '1px solid #f1f5f9'
            }}
          >
            <h4
              style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ color: '#0284c7' }}>●</span> What is it?
            </h4>
            <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.6' }}>
              {content.whatIsIt}
            </p>
          </div>

          {/* Section 2: Why does it matter here? */}
          <div
            style={{
              backgroundColor: '#fffbeb',
              borderRadius: '10px',
              padding: '16px',
              border: '1px solid #fef3c7'
            }}
          >
            <h4
              style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#92400e',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <AlertCircle size={15} color="#d97706" /> Why does it matter here?
            </h4>
            <p style={{ fontSize: '13.5px', color: '#78350f', lineHeight: '1.6' }}>
              {content.whyDoesItMatter}
            </p>
          </div>

          {/* Section 3: Simple Everyday Analogy */}
          <div
            style={{
              backgroundColor: '#ecfdf5',
              borderRadius: '10px',
              padding: '16px',
              border: '1px solid #d1fae5'
            }}
          >
            <h4
              style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#065f46',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={15} color="#10b981" /> Everyday Analogy
            </h4>
            <p style={{ fontSize: '13.5px', color: '#064e3b', lineHeight: '1.6' }}>
              {content.simpleAnalogy}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#0284c7',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0369a1')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0284c7')}
          >
            Got it, back to slide
          </button>
        </div>
      </div>
    </div>
  );
};

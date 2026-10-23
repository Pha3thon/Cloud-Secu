import React from 'react';
import { Lightbulb } from 'lucide-react';

/**
 * RealLifeCallout component for theory slides.
 */
export default function RealLifeCallout({ example }) {
  if (!example) return null;

  return (
    <div
      style={{
        padding: '14px 16px',
        borderRadius: 'var(--radius-lg, 10px)',
        backgroundColor: '#fffbeb',
        border: '1px solid #fef3c7',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start'
      }}
    >
      <Lightbulb size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            color: '#b45309',
            letterSpacing: '0.04em',
            marginBottom: '2px'
          }}
        >
          Real-Life Analogy — {example.title}
        </div>
        <div
          style={{
            fontSize: '12.5px',
            color: '#92400e',
            lineHeight: '1.45',
            fontStyle: 'italic'
          }}
        >
          "{example.analogy}"
        </div>
      </div>
    </div>
  );
}

/**
 * OutcomesList Component
 * CDAC Cloud Security Training Platform
 * Compact two-column checklist replacing repetitive boxed outcome cards.
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function OutcomesList({ outcomes = [] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%'
      }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main, #0f172a)', margin: 0 }}>
        Key Learning Outcomes
      </h2>

      {/* Two-column responsive checklist (2 columns on >= 720px, 1 column on < 720px) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          columnGap: '32px',
          rowGap: '16px'
        }}
      >
        {outcomes.map((outcome, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              fontSize: '13.5px',
              color: 'var(--text-main, #334155)',
              lineHeight: '1.6'
            }}
          >
            <CheckCircle2
              size={18}
              color="var(--color-success, #059669)"
              style={{
                flexShrink: 0,
                marginTop: '3px'
              }}
            />
            <span style={{ fontWeight: '500' }}>{outcome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

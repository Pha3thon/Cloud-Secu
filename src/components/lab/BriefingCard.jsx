import React from 'react';
import { ArrowRight } from 'lucide-react';
import { M4_BRIEFING } from '@/content/m4';

/**
 * BriefingCard: Displays mission brief or per-topic briefing before launching the lab.
 */
export default function BriefingCard({ topicNumber, currentTopic, onLaunchInitial, onLaunchResume }) {
  if (topicNumber === 1) {
    return (
      <div
        style={{
          maxWidth: '680px',
          margin: '30px auto',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl, 16px)',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          padding: '36px',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
        className="animate-pop-in"
      >
        <div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              backgroundColor: '#e0f2fe',
              color: 'var(--brand-primary, #0369a1)',
              padding: '3px 10px',
              borderRadius: '12px'
            }}
          >
            Lab Briefing
          </span>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text-main, #0f172a)', marginTop: '10px', marginBottom: '8px' }}>
            {M4_BRIEFING.title}
          </h1>
        </div>

        <div style={{ fontSize: '14.5px', color: 'var(--text-main, #334155)', lineHeight: '1.65' }}>
          <p style={{ marginBottom: '14px' }}>{M4_BRIEFING.scenario}</p>
          <p style={{ fontStyle: 'italic', color: 'var(--text-muted, #64748b)', marginBottom: '14px' }}>
            {M4_BRIEFING.context}
          </p>
          <p style={{ fontWeight: '700', color: 'var(--brand-primary, #0369a1)' }}>
            Ready to build? Click Launch Lab to start your Kali workstation and connect to Horizon.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle, #f1f5f9)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onLaunchInitial}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              backgroundColor: 'var(--brand-primary, #0284c7)',
              color: '#ffffff',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.3)',
              border: 'none'
            }}
          >
            <span>{M4_BRIEFING.cta}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '30px auto',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl, 16px)',
        border: '1px solid var(--border-subtle, #e2e8f0)',
        padding: '36px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
      className="animate-pop-in"
    >
      <div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            backgroundColor: '#f0fdfa',
            color: '#0f766e',
            padding: '3px 10px',
            borderRadius: '12px'
          }}
        >
          Priya's Lab Briefing
        </span>
        <h1 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--text-main, #0f172a)', marginTop: '10px', marginBottom: '8px' }}>
          {currentTopic.lab?.title || `Lab ${topicNumber}`}
        </h1>
      </div>

      <div style={{ fontSize: '14.5px', color: 'var(--text-main, #334155)', lineHeight: '1.65' }}>
        <div
          style={{
            backgroundColor: '#f8fafc',
            borderLeft: '4px solid #0d9488',
            padding: '14px 18px',
            borderRadius: '0 8px 8px 0',
            marginBottom: '16px',
            fontStyle: 'italic',
            color: '#1e293b'
          }}
        >
          "{currentTopic.lab?.priyaIntro}"
        </div>
        <p style={{ margin: 0, color: 'var(--text-muted, #64748b)', fontSize: '13.5px' }}>
          Your theory slides for this topic are complete. Open your workstation to complete the 3 hands-on flags.
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--border-subtle, #f1f5f9)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onLaunchResume}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            backgroundColor: '#0d9488',
            color: '#ffffff',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(13, 148, 136, 0.3)',
            border: 'none'
          }}
        >
          <span>Open Lab</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

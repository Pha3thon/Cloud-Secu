import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { COURSE_SUMMARY, MODULES_DATA } from '@/content/modules';
import useStore from '@/hooks/useStore';
import PhaseTimeline from '@/components/common/PhaseTimeline';
import OutcomesList from '@/components/common/OutcomesList';

/**
 * Dashboard route screen: displays course overview, integrated hours bar,
 * connected phase stepper with hover reveals, two-column outcomes, and join course callout.
 */
export default function Dashboard() {
  const { navigateTo } = useStore();

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '36px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}
    >
      {/* 1 & 2: Course Hero & Integrated Hours Visual (Boxed Container 1 of 2) */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl, 20px)',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          padding: '36px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#e0f2fe',
              color: 'var(--brand-primary, #0369a1)',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '14px'
            }}
          >
            <Shield size={12} />
            Vendor-Neutral Cloud Security Training
          </div>
          <h1
            style={{
              fontSize: '30px',
              fontWeight: '900',
              color: 'var(--text-main, #0f172a)',
              letterSpacing: '-0.025em',
              marginBottom: '10px',
              lineHeight: '1.25'
            }}
          >
            {COURSE_SUMMARY.title}
          </h1>
          <div style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--brand-primary, #0284c7)', marginBottom: '14px' }}>
            {COURSE_SUMMARY.duration}
          </div>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-muted, #475569)',
              lineHeight: '1.65',
              maxWidth: '960px',
              margin: 0
            }}
          >
            {COURSE_SUMMARY.description}
          </p>
        </div>

        {/* 3: Course Duration Hours Visual: 40 Theory vs 50 Lab Integrated Wide Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle, #f1f5f9)',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: '700' }}>
            <span style={{ color: 'var(--brand-primary, #0284c7)' }}>
              Theory: 40 Hours ({Math.round((40 / 90) * 100)}%)
            </span>
            <span style={{ color: '#0d9488' }}>
              Hands-on Labs: 50 Hours ({Math.round((50 / 90) * 100)}%)
            </span>
          </div>

          {/* Integrated Split Bar */}
          <div style={{ height: '12px', width: '100%', borderRadius: '6px', display: 'flex', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
            <div style={{ width: `${(40 / 90) * 100}%`, backgroundColor: 'var(--brand-primary, #0284c7)' }} title="40 Hours Theory" />
            <div style={{ width: `${(50 / 90) * 100}%`, backgroundColor: '#0d9488' }} title="50 Hours Hands-on Labs" />
          </div>

          <div style={{ fontSize: '11.5px', color: 'var(--text-muted, #64748b)', textAlign: 'center' }}>
            Curriculum Balance: 90 Total Hours across 13 Modules (Ungraded Orientation in M0)
          </div>
        </div>
      </section>

      {/* 4: Connected Horizontal Phase Timeline with Hover Reveals (Not Boxed Cards) */}
      <PhaseTimeline phases={COURSE_SUMMARY.phases} modules={MODULES_DATA} />

      {/* 5: Key Learning Outcomes Compact Two-Column List (Not Boxed Cards) */}
      <OutcomesList outcomes={COURSE_SUMMARY.outcomes} />

      {/* 6: Join Course Area (Boxed Container 2 of 2) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl, 16px)',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          padding: '24px 32px',
          boxShadow: 'var(--shadow-xs)',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main, #0f172a)', marginBottom: '4px' }}>
            Ready to start training?
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted, #64748b)' }}>
            Jump into Phase 0 Orientation or start building in OpenStack with Module 4.
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('curriculum')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '13px 28px',
            backgroundColor: 'var(--brand-primary, #0284c7)',
            color: '#ffffff',
            borderRadius: 'var(--radius-lg, 10px)',
            fontSize: '14.5px',
            fontWeight: '700',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.25)',
            transition: 'all 200ms ease'
          }}
        >
          <span>Explore Curriculum</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

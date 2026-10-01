import React from 'react';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { COURSE_SUMMARY } from '../data/courseData';
import { useCourse } from '../context/CourseContext';

export const DashboardPage = () => {
  const { navigateTo } = useCourse();

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '36px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '36px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
            <Shield size={12} />
            Vendor-Neutral Cloud Training
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#0f172a',
              letterSpacing: '-0.02em',
              marginBottom: '12px',
              lineHeight: '1.25'
            }}
          >
            {COURSE_SUMMARY.title}
          </h1>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0284c7', marginBottom: '14px' }}>
            {COURSE_SUMMARY.duration}
          </div>
          <p
            style={{
              fontSize: '14.5px',
              color: '#475569',
              lineHeight: '1.65',
              maxWidth: '920px',
              margin: 0
            }}
          >
            {COURSE_SUMMARY.description}
          </p>
        </div>

        {/* Course Duration Hours Visual: 40 Theory vs 50 Lab Split */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: '700' }}>
            <span style={{ color: '#0284c7' }}>
              Theory: 40 Hours ({Math.round((40 / 90) * 100)}%)
            </span>
            <span style={{ color: '#0d9488' }}>
              Hands-on Labs: 50 Hours ({Math.round((50 / 90) * 100)}%)
            </span>
          </div>
          {/* Split Bar */}
          <div style={{ height: '14px', width: '100%', borderRadius: '7px', display: 'flex', overflow: 'hidden' }}>
            <div style={{ width: `${(40 / 90) * 100}%`, backgroundColor: '#0284c7' }} title="40 Hours Theory" />
            <div style={{ width: `${(50 / 90) * 100}%`, backgroundColor: '#0d9488' }} title="50 Hours Hands-on Labs" />
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
            Curriculum Balance: 90 Total Hours across 13 Modules
          </div>
        </div>
      </section>

      {/* 5 Phases at a Glance */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
          5 Phases at a Glance
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {COURSE_SUMMARY.phases.map((phase) => (
            <div
              key={phase.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '18px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: phase.badgeColor, letterSpacing: '0.04em' }}>
                Phase {phase.number}
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                {phase.title}
              </div>
              <div style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '1.45' }}>
                {phase.tagline}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Learning Outcomes (6) */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)'
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
          Key Learning Outcomes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '14px' }}>
          {COURSE_SUMMARY.outcomes.map((outcome, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '13px',
                color: '#334155',
                lineHeight: '1.5'
              }}
            >
              <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{outcome}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Join Course Area */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
        <button
          type="button"
          onClick={() => navigateTo('curriculum')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 36px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '800',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.3)',
            transition: 'all 200ms ease'
          }}
        >
          <span>Join Course</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

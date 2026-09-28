import React from 'react';
import {
  Shield,
  Clock,
  Award,
  ArrowRight,
  CheckCircle2,
  Layers,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { COURSE_SUMMARY } from '../data/courseData';
import { useCourse } from '../context/CourseContext';

export const DashboardPage = () => {
  const { navigateTo, completedModules } = useCourse();
  const theoryPct = Math.round((COURSE_SUMMARY.theoryHours / COURSE_SUMMARY.totalHours) * 100);
  const labPct = Math.round((COURSE_SUMMARY.labHours / COURSE_SUMMARY.totalHours) * 100);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Hero Course Header Card */}
      <section
        className="animate-pop-in"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '36px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative background watermarks */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.06) 0%, rgba(255, 255, 255, 0) 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Badges Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              padding: '3px 10px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Shield size={12} />
            Vendor-Neutral Curriculum
          </span>

          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              padding: '3px 10px',
              borderRadius: '20px'
            }}
          >
            Level: {COURSE_SUMMARY.level}
          </span>

          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              padding: '3px 10px',
              borderRadius: '20px'
            }}
          >
            {COURSE_SUMMARY.totalModules} Core Modules
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#0f172a',
              letterSpacing: '-0.02em',
              marginBottom: '12px',
              lineHeight: '1.25'
            }}
          >
            {COURSE_SUMMARY.title}
          </h1>

          <p
            style={{
              fontSize: '15.5px',
              color: '#334155',
              lineHeight: '1.65',
              maxWidth: '940px'
            }}
          >
            {COURSE_SUMMARY.description}
          </p>
        </div>

        {/* Metrics Grid & Join Course CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '20px'
          }}
        >
          {/* Quick Metrics */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                Total Training
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                90 Hours
              </div>
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: '#e2e8f0' }} />

            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                Theory Training
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0284c7' }}>
                55 Hours
              </div>
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: '#e2e8f0' }} />

            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                Hands-on Labs
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#059669' }}>
                35 Hours
              </div>
            </div>
          </div>

          {/* Prominent Join Course CTA */}
          <button
            type="button"
            onClick={() => navigateTo('curriculum')}
            style={{
              backgroundColor: '#0284c7',
              color: '#ffffff',
              padding: '13px 28px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.35)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0369a1';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0284c7';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Join Course & View Curriculum</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Grid: Hours Breakdown Visual & 5 Learning Phases */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Hours Breakdown Visual Card */}
        <section
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Clock size={18} color="#0284c7" />
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                Curriculum Hours Breakdown
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
              Balanced 90-hour curriculum divided between architectural deep-dives and live platform simulation.
            </p>

            {/* Proportion Bar */}
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  height: '14px',
                  borderRadius: '7px',
                  display: 'flex',
                  overflow: 'hidden',
                  backgroundColor: '#f1f5f9'
                }}
              >
                <div
                  style={{
                    width: `${theoryPct}%`,
                    backgroundColor: '#0284c7',
                    transition: 'width 0.8s ease'
                  }}
                  title={`55 Hours Theory (${theoryPct}%)`}
                />
                <div
                  style={{
                    width: `${labPct}%`,
                    backgroundColor: '#10b981',
                    transition: 'width 0.8s ease'
                  }}
                  title={`35 Hours Hands-on Labs (${labPct}%)`}
                />
              </div>
            </div>

            {/* Breakdown Legend Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div
                style={{
                  backgroundColor: '#f0f9ff',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  border: '1px solid #e0f2fe'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7' }} />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#0369a1' }}>Theory Lectures</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                  55 Hrs <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>({theoryPct}%)</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                  Concepts, architecture & compliance
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#ecfdf5',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  border: '1px solid #d1fae5'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#065f46' }}>Hands-on Labs</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                  35 Hrs <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>({labPct}%)</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                  Interactive live cloud provisioning
                </div>
              </div>
            </div>
          </div>

          {/* Quick status callout */}
          <div
            style={{
              marginTop: '20px',
              padding: '12px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px'
            }}
          >
            <span style={{ color: '#475569', fontWeight: '600' }}>
              Your Progress: {completedModules.length} / 13 Modules Completed
            </span>
            <span style={{ color: '#0284c7', fontWeight: '700' }}>
              {Math.round((completedModules.length / 13) * 100)}%
            </span>
          </div>
        </section>

        {/* 5 Learning Phases at a Glance */}
        <section
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Layers size={18} color="#0284c7" />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
              5 Learning Phases at a Glance
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
            A structured progressive journey from foundations to offensive exploits, defense, and compliance.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {COURSE_SUMMARY.learningPhases.map((phase) => (
              <div
                key={phase.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    backgroundColor: phase.badgeColor,
                    color: '#ffffff',
                    fontSize: '11.5px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {phase.number}
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{phase.title}</span>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>
                      ({phase.totalHours} Hrs · {phase.moduleCount} {phase.moduleCount === 1 ? 'module' : 'modules'})
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>
                    {phase.tagline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Learning Outcomes Checklist (6 Bullets) */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '28px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Award size={20} color="#0284c7" />
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
            Key Learning Outcomes
          </h3>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '20px' }}>
          Upon completing the 90-hour program, trainees can confidently:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {COURSE_SUMMARY.outcomes.map((outcome, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: '#fafbfc',
                border: '1px solid #f1f5f9'
              }}
            >
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                {outcome}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Covered (Tag / Chip Groups) */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '28px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Wrench size={20} color="#0284c7" />
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
            Industry Standard Tools Covered
          </h3>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '20px' }}>
          Hands-on mastery with standard tools across offensive, defensive, and infrastructure disciplines.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Recon & Offensive */}
          <div
            style={{
              backgroundColor: '#fef2f2',
              borderRadius: '12px',
              border: '1px solid #fee2e2',
              padding: '18px'
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
              Recon & Offensive
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {COURSE_SUMMARY.tools.reconAndOffensive.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontSize: '11.5px',
                    fontWeight: '600',
                    backgroundColor: '#ffffff',
                    color: '#991b1b',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #fecaca'
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Defensive & Audit */}
          <div
            style={{
              backgroundColor: '#ecfdf5',
              borderRadius: '12px',
              border: '1px solid #d1fae5',
              padding: '18px'
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
              Defensive & Audit
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {COURSE_SUMMARY.tools.defensiveAndAudit.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontSize: '11.5px',
                    fontWeight: '600',
                    backgroundColor: '#ffffff',
                    color: '#065f46',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #a7f3d0'
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Cloud-Native */}
          <div
            style={{
              backgroundColor: '#f0f9ff',
              borderRadius: '12px',
              border: '1px solid #e0f2fe',
              padding: '18px'
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
              Cloud-Native & IaC
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {COURSE_SUMMARY.tools.cloudNative.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontSize: '11.5px',
                    fontWeight: '600',
                    backgroundColor: '#ffffff',
                    color: '#0369a1',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #bae6fd'
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Sticky Action Banner */}
      <div
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '16px',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          color: '#ffffff'
        }}
      >
        <div>
          <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '4px' }}>
            Ready to start learning?
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            Module M4: "Our First Cloud Configuration" is ready to launch right now.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('curriculum')}
          style={{
            backgroundColor: '#0284c7',
            color: '#ffffff',
            padding: '11px 22px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0369a1')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0284c7')}
        >
          <span>Open Curriculum</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

/**
 * ReflectionBox component for Slide 0.6.
 * Ungraded reflection text area:
 * - Never scored or validated.
 * - Never gates progression.
 * - Does not use FlagList or lab validation components.
 * - Supports an optional disclosure toggle to view a sample model answer.
 * - Safely caches user's draft in localStorage without writing to course progress store.
 */
export default function ReflectionBox({
  prompt = "In your own words: why does this course start with networking and Linux fundamentals rather than jumping straight into cloud provider web consoles?",
  sampleAnswer = "Cloud computing is simply rented hardware abstracted by software. Cloud constructs like AWS VPCs, Security Groups, and EC2 instances are software-defined subnets, stateful firewalls, and Linux virtual machines. Without understanding fundamental IP routing, ports, and Linux access permissions, cloud configuration is just guessing at web buttons with no mental model for where security vulnerabilities originate."
}) {
  const [reflectionText, setReflectionText] = useState(() => {
    try {
      return localStorage.getItem('cdac_m0_reflection_draft') || '';
    } catch {
      return '';
    }
  });
  const [showSample, setShowSample] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    setReflectionText(val);
    try {
      localStorage.setItem('cdac_m0_reflection_draft', val);
    } catch {
      // Ignore storage errors in private browsing modes
    }
  };

  return (
    <div
      style={{
        marginTop: '16px',
        backgroundColor: '#f8fafc',
        borderRadius: 'var(--radius-lg, 12px)',
        border: '1px solid #e2e8f0',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            backgroundColor: '#e0f2fe',
            color: 'var(--brand-primary, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <MessageSquare size={13} />
        </div>
        <div>
          <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748b' }}>
            Ungraded Check-In · Self Reflection
          </span>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main, #0f172a)' }}>
            {prompt}
          </div>
        </div>
      </div>

      <textarea
        value={reflectionText}
        onChange={handleChange}
        placeholder="Type a sentence or two here for your own thoughts before continuing..."
        rows={3}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          fontSize: '13px',
          lineHeight: '1.5',
          fontFamily: 'inherit',
          color: 'var(--text-main, #0f172a)',
          backgroundColor: '#ffffff',
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 150ms ease'
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--brand-primary, #0284c7)')}
        onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          type="button"
          onClick={() => setShowSample((prev) => !prev)}
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: 'var(--brand-primary, #0284c7)',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <Sparkles size={13} />
          <span>{showSample ? 'Hide sample answer' : 'Show a sample answer'}</span>
          {showSample ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        {showSample && (
          <div
            style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '12.5px',
              color: '#1e3a8a',
              lineHeight: '1.55'
            }}
          >
            <strong>Sample model answer:</strong> {sampleAnswer}
          </div>
        )}
      </div>
    </div>
  );
}

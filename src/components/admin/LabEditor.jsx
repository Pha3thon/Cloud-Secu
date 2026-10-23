import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

/**
 * LabEditor: Tab for customizing lab objectives, Priya dialogue, and flag validation criteria.
 */
export default function LabEditor({
  lab,
  onUpdateLab
}) {
  if (!lab) {
    return (
      <div style={{ padding: '24px', color: '#94a3b8', textAlign: 'center' }}>
        No lab configuration available for this topic.
      </div>
    );
  }

  const handlePriyaIntroChange = (text) => {
    onUpdateLab?.({ ...lab, priyaIntro: text });
  };

  const handleFlagChange = (flagIdx, field, val) => {
    const updatedFlags = [...(lab.flags || [])];
    updatedFlags[flagIdx] = {
      ...updatedFlags[flagIdx],
      [field]: val
    };
    onUpdateLab?.({ ...lab, flags: updatedFlags });
  };

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#f8fafc',
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '920px',
        margin: '0 auto'
      }}
    >
      {/* Priya Intro section */}
      <div
        style={{
          padding: '16px',
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <label style={{ fontSize: '12px', fontWeight: '800', color: '#0f766e' }}>
          Priya Dialogue Intro (Lab Mission Brief)
        </label>
        <textarea
          rows={3}
          value={lab.priyaIntro || ''}
          onChange={(e) => handlePriyaIntroChange(e.target.value)}
          style={{
            padding: '8px 10px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '12.5px',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Flags List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
          Sequential Lab Flags (1 to 3)
        </h3>

        {(lab.flags || []).map((flag, idx) => (
          <div
            key={flag.id || idx}
            style={{
              padding: '16px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-subtle, #e2e8f0)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#0284c7' }}>
                Flag {flag.flagNumber || idx + 1}
              </span>
            </div>

            {/* Objective */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Objective
              </label>
              <input
                type="text"
                value={flag.objective || ''}
                onChange={(e) => handleFlagChange(idx, 'objective', e.target.value)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
            </div>

            {/* Question */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Validation Question
              </label>
              <input
                type="text"
                value={flag.question || ''}
                onChange={(e) => handleFlagChange(idx, 'question', e.target.value)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
            </div>

            {/* Accepted Answer */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Expected Answer (Comma-separated)
              </label>
              <input
                type="text"
                value={Array.isArray(flag.correctAnswers) ? flag.correctAnswers.join(', ') : flag.correctAnswers || ''}
                onChange={(e) => handleFlagChange(idx, 'correctAnswers', e.target.value.split(',').map((s) => s.trim()))}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
            </div>

            {/* Hint */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Hint
              </label>
              <input
                type="text"
                value={flag.hint || ''}
                onChange={(e) => handleFlagChange(idx, 'hint', e.target.value)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, Loader2, AlertCircle } from 'lucide-react';
import HintPopover from './HintPopover';
import useLabCheck from '@/hooks/useLabCheck';
import { sanitizeInput } from '@/utils/sanitize';

/**
 * FlagCard component representing an individual lab objective and validation step.
 * Uses useLabCheck for live state validation and detailed diagnostic feedback.
 */
export default function FlagCard({
  flag,
  isPassed = false,
  isCurrent = false,
  isLocked = false,
  isReviewMode = false,
  labId = null,
  topicNumber = 1,
  submittedAnswer = '',
  onSubmitAnswer
}) {
  const [hintOpen, setHintOpen] = useState(false);
  const [answerInput, setAnswerInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const currentLabId = labId || `lab${topicNumber}`;
  const { status, checking, checkResult, runCheck } = useLabCheck(currentLabId, flag.flagNumber);

  // If flag is passed, collapse to summary bar unless in review mode
  if (isPassed && !isReviewMode) {
    return (
      <div
        style={{
          padding: '10px 14px',
          borderRadius: 'var(--radius-lg, 8px)',
          backgroundColor: '#ecfdf5',
          border: '1px solid #a7f3d0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} color="var(--color-success, #059669)" />
          <span style={{ fontWeight: '700', color: '#065f46' }}>
            Flag {flag.flagNumber} Completed: {flag.objective}
          </span>
        </div>
        {flag.priyaReply && (
          <span style={{ fontSize: '11px', color: '#047857', fontStyle: 'italic' }}>
            "{flag.priyaReply}"
          </span>
        )}
      </div>
    );
  }

  const handleAnswerSubmit = () => {
    const cleanAnswer = sanitizeInput(answerInput);
    if (!cleanAnswer) return;
    const result = onSubmitAnswer?.(flag.flagNumber, cleanAnswer);
    if (result && !result.success) {
      setErrorMessage(result.message || 'Incorrect answer. Check your configuration and try again.');
    } else {
      setErrorMessage(null);
    }
  };

  const isCheckVerified = checkResult?.pass || isPassed;

  return (
    <div
      style={{
        borderRadius: 'var(--radius-lg, 10px)',
        border: isCurrent ? '1.5px solid var(--brand-primary, #0284c7)' : '1px solid var(--border-subtle, #e2e8f0)',
        backgroundColor: isLocked ? '#f8fafc' : '#ffffff',
        boxShadow: isCurrent ? '0 4px 6px -1px rgba(2, 132, 199, 0.08)' : 'none',
        opacity: isLocked ? 0.6 : 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Flag Badge & Story Beat */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '10.5px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            padding: '2px 8px',
            borderRadius: '12px',
            backgroundColor: isPassed ? '#ecfdf5' : '#e0f2fe',
            color: isPassed ? '#065f46' : 'var(--brand-primary, #0369a1)'
          }}
        >
          Flag {flag.flagNumber} of 3
        </span>
        {isPassed && (
          <span style={{ fontSize: '11px', color: 'var(--color-success, #059669)', fontWeight: '700' }}>
            ✓ Solved
          </span>
        )}
      </div>

      {/* Story Beat */}
      {flag.storyBeat && (
        <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--text-muted, #475569)', margin: 0 }}>
          "{flag.storyBeat}"
        </p>
      )}

      {/* Objective */}
      <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main, #0f172a)' }}>
        {flag.objective}
      </div>

      {/* Numbered Steps */}
      {flag.steps && flag.steps.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted, #64748b)' }}>
            Execution Steps:
          </span>
          <ol style={{ paddingLeft: '18px', margin: 0, fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {flag.steps.map((st, idx) => (
              <li key={idx} style={{ lineHeight: '1.45' }}>{st}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Check My Configuration Button */}
      {!isPassed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          <button
            type="button"
            disabled={isLocked || checking}
            onClick={runCheck}
            style={{
              alignSelf: 'flex-start',
              padding: '8px 16px',
              backgroundColor: isLocked
                ? 'var(--text-muted, #94a3b8)'
                : checking
                ? '#0284c7'
                : status === 'passed'
                ? '#059669'
                : status === 'failed'
                ? '#b91c1c'
                : 'var(--brand-primary, #0284c7)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '700',
              borderRadius: 'var(--radius-md, 6px)',
              border: 'none',
              cursor: (isLocked || checking) ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            {checking && <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />}
            {checking
              ? 'Checking Configuration...'
              : status === 'passed'
              ? '✓ Configuration Verified'
              : status === 'failed'
              ? 'Check Again (Issues Found)'
              : 'Check My Configuration'}
          </button>

          {/* Diagnostic feedback from Check My Configuration */}
          {checkResult && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: '600',
                backgroundColor: checkResult.pass ? '#ecfdf5' : '#fef2f2',
                color: checkResult.pass ? '#065f46' : '#991b1b',
                border: `1px solid ${checkResult.pass ? '#a7f3d0' : '#fecaca'}`,
                lineHeight: '1.5'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {checkResult.pass ? <CheckCircle2 size={14} color="#059669" /> : <AlertCircle size={14} color="#dc2626" />}
                <span>{checkResult.message}</span>
              </div>
              {checkResult.failures && checkResult.failures.length > 0 && (
                <ul style={{ margin: '6px 0 0', paddingLeft: '20px', color: '#7f1d1d' }}>
                  {checkResult.failures.map((f, idx) => (
                    <li key={idx} style={{ marginTop: '2px' }}>{f}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      {/* Question Box (Appears after check passes or in review mode) */}
      {(isCheckVerified || isReviewMode) && (
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: 'var(--radius-lg, 8px)',
            padding: '14px',
            marginTop: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-main, #0f172a)' }}>
              {flag.question}
            </div>
            {flag.hint && (
              <button
                type="button"
                onClick={() => setHintOpen((prev) => !prev)}
                title="Need a hint?"
                style={{
                  color: 'var(--brand-primary, #0284c7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: 'none',
                  border: 'none',
                  padding: 0
                }}
              >
                <HelpCircle size={14} />
                <span>Hint</span>
              </button>
            )}
          </div>

          <HintPopover hint={flag.hint} isOpen={hintOpen} />

          {/* Answer Input */}
          {!isPassed ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Enter value..."
                value={answerInput}
                onChange={(e) => { setAnswerInput(e.target.value); if (errorMessage) setErrorMessage(null); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAnswerSubmit();
                  }
                }}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px'
                }}
              />
              <button
                type="button"
                onClick={handleAnswerSubmit}
                style={{
                  padding: '7px 16px',
                  backgroundColor: 'var(--color-success, #059669)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '700',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <div style={{ fontSize: '12px', color: 'var(--color-success, #059669)', fontWeight: '700' }}>
              Answer Submitted: <code>{submittedAnswer || flag.correctAnswers?.[0] || flag.answers?.[0]}</code>
            </div>
          )}

          {errorMessage && (
            <div style={{ color: 'var(--color-danger, #dc2626)', fontSize: '11.5px', fontWeight: '600' }}>
              {errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

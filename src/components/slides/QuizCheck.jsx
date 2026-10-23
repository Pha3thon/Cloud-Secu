import React, { useState } from 'react';
import { HelpCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

/**
 * QuizCheck Component
 * CDAC Cloud Security Training Platform
 * Ambient, ungraded check-in for M1 topic quiz slides.
 * Never gates Next, never validated against a scoring system, never stored as progress.
 */
export default function QuizCheck({ quiz }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userText, setUserText] = useState('');

  if (!quiz) return null;

  const isMultipleChoice = Array.isArray(quiz.options) && quiz.options.length > 0;

  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        borderRadius: 'var(--radius-lg, 12px)',
        border: '1.5px solid #cbd5e1',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
      }}
    >
      {/* Quiz Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: '#e0f2fe',
              color: 'var(--brand-primary, #0369a1)'
            }}
          >
            🎯 Concept Check-in
          </span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            Ungraded reflection — verify your understanding
          </span>
        </div>
      </div>

      {/* Question Prompt */}
      <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main, #0f172a)', lineHeight: '1.45' }}>
        {quiz.question}
      </div>

      {/* Multiple-Choice Options */}
      {isMultipleChoice ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {quiz.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedOption(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: isSelected ? '1.5px solid var(--brand-primary, #0284c7)' : '1px solid #cbd5e1',
                  backgroundColor: isSelected ? '#f0f9ff' : '#ffffff',
                  color: isSelected ? '#0369a1' : '#334155',
                  fontSize: '13px',
                  fontWeight: isSelected ? '700' : '500',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: isSelected ? '2px solid var(--brand-primary, #0284c7)' : '1.5px solid #94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '800',
                    color: isSelected ? '#0284c7' : '#64748b',
                    flexShrink: 0
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Freeform text input */
        <div>
          <textarea
            rows={2}
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Type your reflection or answer here..."
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '13px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff'
            }}
          />
        </div>
      )}

      {/* Reveal Answer Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
        <button
          type="button"
          onClick={() => setShowAnswer(!showAnswer)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            color: 'var(--brand-primary, #0284c7)',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          {showAnswer ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showAnswer ? 'Hide Answer' : 'Show Answer'}</span>
        </button>

        <span style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic' }}>
          This check-in never blocks navigation
        </span>
      </div>

      {/* Answer Reveal Panel */}
      {showAnswer && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#065f46', fontSize: '12.5px', fontWeight: '800' }}>
            <CheckCircle2 size={15} color="#059669" />
            <span>Answer & Explanation</span>
          </div>
          <div style={{ fontSize: '12.5px', color: '#065f46', lineHeight: '1.5' }}>
            {quiz.explanation || quiz.answer}
          </div>
        </div>
      )}
    </div>
  );
}

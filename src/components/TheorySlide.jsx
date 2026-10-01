import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Lightbulb, ArrowRight, Bookmark } from 'lucide-react';
import { SceneAnimation } from './SceneAnimation';
import { KnowMoreModal } from './KnowMoreModal';

export const TheorySlide = ({
  slide,
  isFirstSlide = false,
  isLastSlide = false,
  onNext,
  onBack,
  onFinishAndUnlockLab
}) => {
  const [knowMoreOpen, setKnowMoreOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  if (!slide) return null;

  const lines = slide.textLines || [];

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Bar with Slide Code & Optional Recap Chip */}
      <div
        style={{
          padding: '12px 24px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafbfc'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '800',
              fontFamily: 'monospace',
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: '#e0f2fe',
              color: '#0369a1'
            }}
          >
            {slide.code}
          </span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
            {slide.title}
          </span>
        </div>

        {/* Optional Recap Chip */}
        {slide.recapChip && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: '600',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              padding: '2px 10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Bookmark size={11} color="#0284c7" />
            {slide.recapChip}
          </span>
        )}
      </div>

      {/* Main Slide Layout: Text & Callouts on Left, Scene Animation on Right */}
      <div
        style={{
          padding: '28px 24px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '32px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Title, Synced Sentences, Real-Life Callout, Know More */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: '800',
                color: '#0f172a',
                letterSpacing: '-0.02em',
                lineHeight: '1.3',
                marginBottom: '14px'
              }}
            >
              {slide.title}
            </h2>

            {/* Sentences with soft highlight synced to timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {lines.map((line, idx) => {
                const isActive = activeStep === idx;
                return (
                  <p
                    key={idx}
                    onMouseEnter={() => setActiveStep(idx)}
                    style={{
                      fontSize: '14px',
                      color: isActive ? '#0f172a' : '#475569',
                      lineHeight: '1.6',
                      margin: 0,
                      padding: '4px 8px',
                      borderRadius: '6px',
                      backgroundColor: isActive ? 'rgba(224, 242, 254, 0.45)' : 'transparent',
                      transition: 'all 200ms ease',
                      cursor: 'default'
                    }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Real-Life Callout */}
          {slide.realLifeExample && (
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                backgroundColor: '#fffbeb',
                border: '1px solid #fef3c7',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}
            >
              <Lightbulb size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#b45309', letterSpacing: '0.04em', marginBottom: '2px' }}>
                  Real-Life Analogy — {slide.realLifeExample.title}
                </div>
                <div style={{ fontSize: '12.5px', color: '#92400e', lineHeight: '1.45', fontStyle: 'italic' }}>
                  "{slide.realLifeExample.analogy}"
                </div>
              </div>
            </div>
          )}

          {/* Optional Know More Button */}
          {slide.knowMore && (
            <div>
              <button
                type="button"
                onClick={() => setKnowMoreOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  color: '#0369a1',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <BookOpen size={13} />
                <span>Know More: {slide.knowMore.title}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Scene Animation */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SceneAnimation
            sceneKey={slide.sceneKey}
            activeStep={activeStep}
            onStepChange={setActiveStep}
            stepCount={Math.max(lines.length, 3)}
          />
        </div>
      </div>

      {/* Bottom Navigation Footer */}
      <div
        style={{
          padding: '16px 24px',
          borderTop: '1px solid #f1f5f9',
          backgroundColor: '#fafbfc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <button
          type="button"
          onClick={onBack}
          disabled={isFirstSlide}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: isFirstSlide ? '#f8fafc' : '#ffffff',
            color: isFirstSlide ? '#94a3b8' : '#334155',
            fontSize: '13px',
            fontWeight: '600',
            cursor: isFirstSlide ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        {isLastSlide ? (
          <button
            type="button"
            onClick={onFinishAndUnlockLab}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 20px',
              borderRadius: '8px',
              backgroundColor: '#059669',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 2px 4px rgba(5, 150, 105, 0.2)'
            }}
          >
            <span>Finish & Unlock Lab</span>
            <ArrowRight size={15} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 20px',
              borderRadius: '8px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Know More Modal */}
      {slide.knowMore && (
        <KnowMoreModal
          isOpen={knowMoreOpen}
          onClose={() => setKnowMoreOpen(false)}
          knowMoreData={slide.knowMore}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle, Lightbulb, CheckCircle } from 'lucide-react';
import { AnimatedIllustration } from './AnimatedIllustration/AnimatedIllustration';
import { GlossaryModal } from './GlossaryModal';

export const TheorySlide = ({
  slides,
  currentSlideIndex,
  onSlideChange,
  maxSlideVisited,
  onCompleteTheory
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;
  const isLastSlide = currentSlideIndex === totalSlides - 1;

  const handleNext = () => {
    if (isLastSlide) {
      onCompleteTheory();
    } else {
      onSlideChange(currentSlideIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentSlideIndex > 0) {
      onSlideChange(currentSlideIndex - 1);
    }
  };

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
      {/* Top Header & Progress */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafbfc'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '20px',
              backgroundColor: '#e0f2fe',
              color: '#0369a1'
            }}
          >
            Theory Stage
          </span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
            Slide {currentSlideIndex + 1} of {totalSlides}
          </span>
        </div>

        {/* Slide Progress Dots / Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {slides.map((s, idx) => {
            const isCurrent = idx === currentSlideIndex;
            const isVisited = idx <= maxSlideVisited - 1;

            return (
              <button
                key={s.id}
                onClick={() => isVisited && onSlideChange(idx)}
                disabled={!isVisited}
                title={isVisited ? `Go to Slide ${idx + 1}` : 'Complete current slide first'}
                style={{
                  width: isCurrent ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: isCurrent ? '#0284c7' : isVisited ? '#bae6fd' : '#e2e8f0',
                  transition: 'all 0.25s ease',
                  cursor: isVisited ? 'pointer' : 'not-allowed'
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div
        key={currentSlide.id}
        className="animate-slide-in"
        style={{
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* Animated Visual Hero Illustration */}
        <AnimatedIllustration animationType={currentSlide.animationType} />

        {/* Slide Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#0f172a',
              letterSpacing: '-0.01em'
            }}
          >
            {currentSlide.title}
          </h2>

          {/* Know More Secondary Trigger Button */}
          {currentSlide.knowMore && (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: '600',
                backgroundColor: '#f0f9ff',
                color: '#0369a1',
                border: '1px solid #bae6fd',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e0f2fe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f9ff';
              }}
            >
              <HelpCircle size={15} />
              <span>Know More</span>
            </button>
          )}
        </div>

        {/* 4-5 Lines of plain, high-clarity text */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            lineHeight: '1.7',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {currentSlide.textLines.map((line, index) => (
            <p
              key={index}
              style={{
                fontSize: '14.5px',
                color: '#334155'
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Real-Life Example Callout Box */}
        {currentSlide.realLifeExample && (
          <div
            style={{
              backgroundColor: '#fffbeb',
              borderRadius: '12px',
              border: '1px solid #fef3c7',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}
          >
            <div
              style={{
                backgroundColor: '#fef3c7',
                padding: '8px',
                borderRadius: '8px',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Lightbulb size={18} />
            </div>
            <div>
              <h4
                style={{
                  fontSize: '12.5px',
                  fontWeight: '700',
                  color: '#92400e',
                  marginBottom: '3px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                Real-Life Analogy: {currentSlide.realLifeExample.title}
              </h4>
              <p
                style={{
                  fontSize: '13.5px',
                  color: '#78350f',
                  lineHeight: '1.55'
                }}
              >
                {currentSlide.realLifeExample.analogy}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Slide Navigation Controls */}
      <div
        style={{
          padding: '18px 28px',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafbfc'
        }}
      >
        <button
          onClick={handleBack}
          disabled={currentSlideIndex === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 16px',
            borderRadius: '8px',
            fontSize: '13.5px',
            fontWeight: '600',
            color: currentSlideIndex === 0 ? '#94a3b8' : '#475569',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            if (currentSlideIndex > 0) {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.color = '#0f172a';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = currentSlideIndex === 0 ? '#94a3b8' : '#475569';
          }}
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Next / Complete Button */}
          <button
            onClick={handleNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 20px',
              borderRadius: '8px',
              fontSize: '13.5px',
              fontWeight: '600',
              color: '#ffffff',
              backgroundColor: isLastSlide ? '#059669' : '#0284c7',
              boxShadow: isLastSlide
                ? '0 2px 4px rgba(5, 150, 105, 0.25)'
                : '0 2px 4px rgba(2, 132, 199, 0.25)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isLastSlide ? '#047857' : '#0369a1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isLastSlide ? '#059669' : '#0284c7';
            }}
          >
            <span>{isLastSlide ? 'Finish Theory & Unlock Lab' : 'Next Concept'}</span>
            {isLastSlide ? <CheckCircle size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      </div>

      {/* Know More Modal */}
      {currentSlide.knowMore && (
        <GlossaryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={currentSlide.title}
          content={currentSlide.knowMore}
        />
      )}
    </div>
  );
};

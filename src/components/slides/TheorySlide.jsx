import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, ArrowRight, ExternalLink, Headphones, Volume2, Square } from 'lucide-react';
import SceneAnimation from '@/components/scenes/SceneAnimation';
import { getReadableSlideText } from '@/hooks/useReadableSlideText';
import useTextToSpeech from '@/hooks/useTextToSpeech';
import { useAccessibility } from '@/state/AccessibilityContext';
import KnowMoreModal from './KnowMoreModal';
import RecapChip from './RecapChip';
import RealLifeCallout from './RealLifeCallout';
import ReflectionBox from './ReflectionBox';
import QuizCheck from './QuizCheck';

/**
 * TheorySlide component displaying concept narrative, interactive sentences,
 * real-life analogy callout, Know More modal trigger, and SVG Scene animation.
 *
 * Layout (Revision 12 Reference Pattern):
 *   Above Card:
 *     [ Module Label (e.g. MODULE 1 · 1. TOPIC) ]  [ Card X of Y ]
 *     [ Slide Title (H1) ]
 *     [ Segmented Progress Bar (one pill segment per slide in topic) ]
 *   Inside Card:
 *     Top Header:
 *       [ Tag Chip (e.g. IN SIMPLE WORDS | OFFICIAL DEFINITION | IDEA) ]
 *       [ Inline TTS Controls: Auto-Read: OFF/ON  |  Listen to Card ]
 *     Body:
 *       [ Centered 16:9 Scene Animation with hover scrub bar ]
 *       [ Narrative text / stepped sentences / standards definition ]
 *       [ Reflection / Quiz / Real-life / Know More ]
 *     Footer:
 *       [ < Back ]               [ Next > / Finish & Unlock Lab ]
 */
export default function TheorySlide({
  slide,
  slideIndex = 0,
  totalSlides = 1,
  topicTitle = '',
  moduleLabel = '',
  isFirstSlide = false,
  isLastSlide = false,
  onNext,
  onBack,
  onFinishAndUnlockLab,
  isOrientation = false,
  onContinueToCurriculum
}) {
  const [knowMoreOpen, setKnowMoreOpen] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [loopStep, setLoopStep] = useState(0);

  const { prefs, update } = useAccessibility();
  const { speak, stop, isSpeaking } = useTextToSpeech();

  if (!slide) return null;

  const format = slide.format || (slide.isOfficialDefinition ? 'official-definition' : 'standard');
  const lines = Array.isArray(slide.textLines)
    ? slide.textLines
    : (Array.isArray(slide.body) ? slide.body : []);
  const activeStep = hoveredStep !== null ? hoveredStep : loopStep;
  const hasScene = !!(slide.sceneId || slide.sceneKey) && format !== 'official-definition';

  const handleListenToCard = () => {
    if (isSpeaking) {
      stop();
    } else {
      const text = getReadableSlideText(slide);
      speak(text);
    }
  };

  const getTagLabel = () => {
    if (slide.tag) return slide.tag;
    if (format === 'eli5') return 'In Simple Words';
    if (format === 'official-definition') return 'Official Definition';
    return 'Idea';
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* ─── Above Card: Reference Header Chrome ─── */}
      <div style={{ marginBottom: '18px' }}>
        {/* Module Label on Left, Card X of Y on Right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px'
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-muted, #64748b)'
            }}
          >
            {moduleLabel || (slide.code ? `SLIDE ${slide.code}` : 'MODULE TOPIC')}
          </span>
          <span
            style={{
              fontSize: '12.5px',
              fontWeight: '700',
              color: 'var(--text-secondary, #475569)'
            }}
          >
            Card {slideIndex + 1} of {totalSlides}
          </span>
        </div>

        {/* Slide Title */}
        <h1
          style={{
            fontSize: 'calc(24px * var(--font-scale, 1))',
            fontWeight: '800',
            color: 'var(--text-main, #0f172a)',
            margin: '0 0 14px 0',
            letterSpacing: '-0.02em',
            lineHeight: '1.25'
          }}
        >
          {slide.title}
        </h1>

        {/* Segmented Progress Bar: 1 segment per slide in the current topic */}
        {totalSlides > 1 && (
          <div
            role="progressbar"
            aria-label={`Slide ${slideIndex + 1} of ${totalSlides} in topic`}
            aria-valuenow={slideIndex + 1}
            aria-valuemin={1}
            aria-valuemax={totalSlides}
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {Array.from({ length: totalSlides }).map((_, idx) => {
              const isPassed = idx < slideIndex;
              const isCurrent = idx === slideIndex;
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: isCurrent
                      ? 'var(--brand-primary, #0284c7)'
                      : isPassed
                      ? 'rgba(2, 132, 199, 0.45)'
                      : 'var(--border-medium, #cbd5e1)',
                    transition: 'all 250ms ease'
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Main Content Card ─── */}
      <div
        style={{
          backgroundColor: 'var(--bg-card, #ffffff)',
          borderRadius: 'var(--radius-xl, 16px)',
          border: '1px solid var(--border-default, #e2e8f0)',
          boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.06))',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Top Header Bar inside Card: Tag Chip + Inline TTS Controls */}
        <div
          style={{
            padding: '14px 24px',
            borderBottom: '1px solid var(--border-light, #f1f5f9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-card, #ffffff)',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          {/* Tag Chip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 14px',
                borderRadius: '16px',
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                backgroundColor:
                  format === 'eli5'
                    ? '#fef3c7'
                    : format === 'official-definition'
                    ? '#e0e7ff'
                    : '#eff6ff',
                color:
                  format === 'eli5'
                    ? '#92400e'
                    : format === 'official-definition'
                    ? '#4338ca'
                    : 'var(--brand-primary, #0284c7)',
                border: `1px solid ${
                  format === 'eli5'
                    ? '#fde68a'
                    : format === 'official-definition'
                    ? '#c7d2fe'
                    : '#bfdbfe'
                }`
              }}
            >
              {getTagLabel()}
            </span>
            {slide.recapChip && <RecapChip label={slide.recapChip} />}
          </div>

          {/* Inline TTS Controls: Auto-Read & Listen to Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => update({ autoReadEnabled: !prefs.autoReadEnabled })}
              aria-label={`Toggle auto-read. Currently ${prefs.autoReadEnabled ? 'ON' : 'OFF'}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '16px',
                fontSize: '11.5px',
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: prefs.autoReadEnabled ? '#e0f2fe' : 'var(--bg-card-subtle, #f8fafc)',
                color: prefs.autoReadEnabled ? '#0369a1' : 'var(--text-secondary, #475569)',
                border: `1px solid ${prefs.autoReadEnabled ? '#7dd3fc' : 'var(--border-default, #e2e8f0)'}`,
                transition: 'all 150ms ease'
              }}
            >
              <Headphones size={13} />
              <span>Auto-Read: {prefs.autoReadEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={handleListenToCard}
              aria-label={isSpeaking ? 'Stop audio reading' : 'Listen to card'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                borderRadius: '16px',
                fontSize: '11.5px',
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: isSpeaking ? '#fee2e2' : '#e0f2fe',
                color: isSpeaking ? '#991b1b' : 'var(--brand-primary, #0284c7)',
                border: `1px solid ${isSpeaking ? '#fca5a5' : '#7dd3fc'}`,
                transition: 'all 150ms ease'
              }}
            >
              {isSpeaking ? <Square size={12} fill="currentColor" /> : <Volume2 size={13} />}
              <span>{isSpeaking ? 'Stop' : 'Listen to Card'}</span>
            </button>
          </div>
        </div>

        {/* ─── Card Body ─── */}
        {format === 'official-definition' ? (
          /* Official Definition Layout */
          <div
            style={{
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              maxWidth: '900px',
              margin: '0 auto',
              width: '100%'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-card-subtle, #f8fafc)',
                    border: '1px solid var(--border-default, #e2e8f0)'
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--text-main, #0f172a)', fontFamily: 'monospace' }}>
                    {slide.standardName || slide.standardBody}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted, #94a3b8)' }}>•</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary, #475569)' }}>
                    {slide.standardFullTitle || slide.standardTitle}
                  </span>
                </div>

                {slide.sourceUrl && (
                  <a
                    href={slide.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--primary-50, #f0f9ff)',
                      border: '1px solid var(--primary-200, #bae6fd)',
                      color: 'var(--brand-primary, #0284c7)',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      textDecoration: 'none'
                    }}
                  >
                    <span>View source: {slide.standardName || slide.standardBody}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Formal Standards Definition Box */}
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: 'var(--bg-card-subtle, #fafbfc)',
                borderLeft: '4px solid #4338ca',
                borderTop: '1px solid var(--border-default, #e2e8f0)',
                borderRight: '1px solid var(--border-default, #e2e8f0)',
                borderBottom: '1px solid var(--border-default, #e2e8f0)',
                borderRadius: '0 8px 8px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4338ca' }}>
                Standard Reference Definition
              </div>
              <div style={{ fontSize: 'calc(14.5px * var(--font-scale, 1))', lineHeight: '1.75', color: 'var(--text-secondary, #1e293b)', fontStyle: 'italic' }}>
                "{slide.definitionText}"
              </div>
            </div>

            {/* Bridge Line */}
            {slide.bridgeLine && (
              <div
                style={{
                  padding: '14px 18px',
                  backgroundColor: 'var(--success-bg, #f0fdf4)',
                  border: '1px solid var(--success-border, #bbf7d0)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--success-dark, #15803d)' }}>
                  Plain-Language Connection
                </div>
                <div style={{ fontSize: 'calc(13.5px * var(--font-scale, 1))', color: 'var(--success-text, #166534)', lineHeight: '1.6' }}>
                  {slide.bridgeLine}
                </div>
              </div>
            )}

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
                    borderRadius: 'var(--radius-md, 6px)',
                    backgroundColor: 'var(--primary-50, #f0f9ff)',
                    border: '1px solid var(--primary-200, #bae6fd)',
                    color: 'var(--brand-primary, #0284c7)',
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
        ) : (
          /* Standard / ELI5 Layout — Scene above content */
          <div
            style={{
              padding: hasScene ? '24px 24px 0' : '0',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Continuous SVG Animation Frame with Hover Scrub Bar */}
            {hasScene && (
              <div style={{ marginBottom: '22px' }}>
                <SceneAnimation
                  sceneId={slide.sceneId || slide.sceneKey}
                  sceneKey={slide.sceneKey || slide.sceneId}
                  activeStepOverride={hoveredStep}
                  onStepChange={setLoopStep}
                  stepCount={Math.max(lines.length, 3)}
                />
              </div>
            )}

            {/* Narrative text & interactive components */}
            <div style={{ padding: hasScene ? '0 0 24px' : '28px 24px' }}>
              {/* ELI5 amber card or interactive stepped text */}
              {format === 'eli5' ? (
                <div
                  style={{
                    padding: '20px 24px',
                    backgroundColor: 'var(--warning-bg, #fffbeb)',
                    borderLeft: '4px solid var(--warning-main, #f59e0b)',
                    borderRadius: '0 10px 10px 0',
                    borderTop: '1px solid var(--warning-border, #fef3c7)',
                    borderRight: '1px solid var(--warning-border, #fef3c7)',
                    borderBottom: '1px solid var(--warning-border, #fef3c7)',
                    boxShadow: '0 1px 3px rgba(245, 158, 11, 0.08)'
                  }}
                >
                  <p
                    style={{
                      fontSize: 'calc(15.5px * var(--font-scale, 1))',
                      lineHeight: '1.8',
                      color: 'var(--warning-text, #78350f)',
                      margin: 0,
                      fontWeight: '500'
                    }}
                  >
                    {typeof slide.body === 'string' ? slide.body : lines.join(' ')}
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {lines.map((line, idx) => {
                    const isActive = activeStep === idx;
                    return (
                      <p
                        key={idx}
                        onMouseEnter={() => setHoveredStep(idx)}
                        onMouseLeave={() => setHoveredStep(null)}
                        style={{
                          fontSize: 'calc(14px * var(--font-scale, 1))',
                          color: isActive ? 'var(--text-main, #0f172a)' : 'var(--text-secondary, #475569)',
                          lineHeight: '1.65',
                          margin: 0,
                          padding: '6px 10px',
                          borderRadius: '6px',
                          backgroundColor: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                          transition: 'all 200ms ease',
                          cursor: 'pointer'
                        }}
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>
              )}

              {/* Reflection Box */}
              {slide.reflectionPrompt && (
                <ReflectionBox prompt={slide.reflectionPrompt} sampleAnswer={slide.sampleAnswer} />
              )}

              {/* Ungraded Quiz Check */}
              {slide.quiz && <QuizCheck quiz={slide.quiz} />}

              {/* Real-Life Callout */}
              {format !== 'eli5' && slide.realLifeExample && <RealLifeCallout example={slide.realLifeExample} />}

              {/* Know More Button */}
              {format !== 'eli5' && slide.knowMore && (
                <div style={{ marginTop: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setKnowMoreOpen(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-md, 6px)',
                      backgroundColor: 'var(--primary-50, #f0f9ff)',
                      border: '1px solid var(--primary-200, #bae6fd)',
                      color: 'var(--brand-primary, #0284c7)',
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
          </div>
        )}

        {/* ─── Bottom Navigation Footer ─── */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-light, #f1f5f9)',
            backgroundColor: 'var(--bg-card-subtle, #fafbfc)',
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
              borderRadius: 'var(--radius-md, 8px)',
              border: '1px solid var(--border-medium, #cbd5e1)',
              backgroundColor: isFirstSlide ? 'var(--bg-card-subtle, #f8fafc)' : 'var(--bg-card, #ffffff)',
              color: isFirstSlide ? 'var(--text-muted, #94a3b8)' : 'var(--text-main, #334155)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isFirstSlide ? 'not-allowed' : 'pointer',
              transition: 'all 150ms ease'
            }}
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>

          {isLastSlide ? (
            (isOrientation || slide.isOrientation || slide.id === '0.6') ? (
              <button
                type="button"
                onClick={onContinueToCurriculum || onFinishAndUnlockLab}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 22px',
                  borderRadius: 'var(--radius-md, 8px)',
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.25)'
                }}
              >
                <span>Continue to Curriculum</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                onClick={onFinishAndUnlockLab}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 22px',
                  borderRadius: 'var(--radius-md, 8px)',
                  backgroundColor: 'var(--success-dark, #059669)',
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
            )
          ) : (
            <button
              type="button"
              onClick={onNext}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 22px',
                borderRadius: 'var(--radius-md, 8px)',
                backgroundColor: isOrientation ? '#4f46e5' : 'var(--brand-primary, #0284c7)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0 2px 4px rgba(2, 132, 199, 0.2)'
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
    </div>
  );
}

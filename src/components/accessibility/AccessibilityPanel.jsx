import React, { useState, useEffect, useCallback } from 'react';
import { X, Volume2, VolumeX, Moon, Sun, Type, Contrast, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useAccessibility } from '@/state/AccessibilityContext';
import useTextToSpeech from '@/hooks/useTextToSpeech';

const RATE_OPTIONS = [
  { label: '0.75×', value: 0.75 },
  { label: '1×',    value: 1.0 },
  { label: '1.25×', value: 1.25 },
  { label: '1.5×',  value: 1.5 },
];

const SCALE_OPTIONS = [
  { label: 'Normal',      value: 1 },
  { label: 'Large',       value: 1.2 },
  { label: 'Extra Large', value: 1.45 },
];

function SectionHeader({ label, icon }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '7px',
      fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em',
      color: 'var(--text-muted, #64748b)',
      padding: '4px 0 8px',
      borderBottom: '1px solid var(--border-light, #f1f5f9)',
      marginBottom: '12px'
    }}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

function Toggle({ id, checked, onChange, label, sublabel }) {
  return (
    <label
      htmlFor={id}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '10px', cursor: 'pointer', marginBottom: '10px'
      }}
    >
      <div>
        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main, #0f172a)' }}>{label}</div>
        {sublabel && <div style={{ fontSize: '11.5px', color: 'var(--text-muted, #64748b)', marginTop: '2px' }}>{sublabel}</div>}
      </div>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        />
        <div style={{
          width: '40px', height: '22px',
          borderRadius: '11px',
          backgroundColor: checked ? 'var(--brand-primary, #0284c7)' : 'var(--border-medium, #cbd5e1)',
          transition: 'background-color 200ms ease',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '3px',
            left: checked ? '21px' : '3px',
            width: '16px', height: '16px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'left 200ms ease'
          }} />
        </div>
      </div>
    </label>
  );
}

/**
 * AccessibilityPanel
 * Slide-out panel (not a modal) — fixed right side, non-blocking.
 * Mounted once globally in App.jsx. Does NOT interact with useHostSafetyGuard.
 */
export default function AccessibilityPanel({ currentSlide }) {
  const { prefs, update, resetAll } = useAccessibility();
  const { speak, stop, isSpeaking, indianVoiceAvailable } = useTextToSpeech();
  const [open, setOpen] = useState(false);
  const [resetConfirmed, setResetConfirmed] = useState(false);

  const handleReset = useCallback(() => {
    stop();
    resetAll();
    setResetConfirmed(true);
    setTimeout(() => setResetConfirmed(false), 2500);
  }, [stop, resetAll]);

  const handleListenToCard = useCallback(() => {
    if (!currentSlide) return;
    import('@/hooks/useReadableSlideText').then(({ getReadableSlideText }) => {
      const text = getReadableSlideText(currentSlide);
      speak(text);
    });
  }, [currentSlide, speak]);

  return (
    <>
      {/* Fixed Trigger Button — top-right, always visible */}
      <button
        id="accessibility-panel-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open accessibility and display settings"
        aria-expanded={open}
        style={{
          position: 'fixed',
          top: '14px',
          right: '16px',
          zIndex: 'var(--z-modal, 1000)',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: open ? 'var(--brand-primary, #0284c7)' : 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border-default, #e2e8f0)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 200ms ease',
          color: open ? '#ffffff' : 'var(--text-secondary, #334155)'
        }}
      >
        {/* Universal Accessibility Icon (wheelchair symbol) */}
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="4" r="2" />
          <path d="M7 8h10l-1 6H8L7 8z" />
          <path d="M9 22c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
          <path d="M15 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M14 14h2l1.5 4" />
        </svg>
      </button>

      {/* Slide-out Panel */}
      <div
        role="dialog"
        aria-label="Accessibility and Display Settings"
        aria-modal="false"
        style={{
          position: 'fixed',
          top: 0,
          right: open ? 0 : '-340px',
          width: '320px',
          height: '100vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-elevated, #ffffff)',
          borderLeft: '1px solid var(--border-default, #e2e8f0)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 'var(--z-modal, 1000)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'right 280ms cubic-bezier(0.4, 0, 0.2, 1)',
          paddingBottom: '32px'
        }}
      >
        {/* Panel Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-default, #e2e8f0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--bg-elevated, #ffffff)',
          zIndex: 2
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main, #0f172a)' }}>
              Accessibility & Display
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted, #64748b)', marginTop: '2px' }}>
              Settings apply instantly
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close accessibility panel"
            style={{
              border: 'none',
              background: 'none',
              color: 'var(--text-muted, #64748b)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px',
              display: 'flex'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* ── Reading / Voice Group ── */}
          <section aria-label="Reading and Voice settings">
            <SectionHeader label="Reading & Voice" icon={<Volume2 size={13} />} />

            {/* Master Voiceover Toggle */}
            <Toggle
              id="voiceover-toggle"
              checked={prefs.voiceoverEnabled}
              onChange={(v) => update({ voiceoverEnabled: v })}
              label="Speech Assist (Voiceover)"
              sublabel="Read slides aloud using device voice"
            />

            {/* Auto-Read Toggle */}
            <Toggle
              id="auto-read-toggle"
              checked={prefs.autoReadEnabled}
              onChange={(v) => update({ autoReadEnabled: v })}
              label="Auto-read each slide"
              sublabel="Reads automatically when slide changes"
            />

            {/* Voice: Indian English */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main, #0f172a)', marginBottom: '4px' }}>
                Accent
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 10px',
                borderRadius: '7px',
                backgroundColor: 'var(--bg-card-subtle, #f8fafc)',
                border: '1px solid var(--border-default, #e2e8f0)'
              }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary, #334155)', fontWeight: '500' }}>
                  🇮🇳 Indian English (en-IN)
                </span>
              </div>
              {indianVoiceAvailable === false && (
                <div style={{
                  marginTop: '6px',
                  fontSize: '11.5px',
                  color: 'var(--warning-text, #92400e)',
                  backgroundColor: 'var(--warning-bg, #fffbeb)',
                  border: '1px solid var(--warning-border, #fde68a)',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  lineHeight: '1.5'
                }}>
                  Indian English voice not available on this device/browser — using default voice.
                </div>
              )}
            </div>

            {/* Listen to this card */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main, #0f172a)', marginBottom: '6px' }}>
                Listen to this card
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  id="listen-to-card-btn"
                  onClick={handleListenToCard}
                  disabled={isSpeaking || !currentSlide}
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '7px',
                    backgroundColor: 'var(--primary-50, #f0f9ff)',
                    border: '1px solid var(--primary-200, #bae6fd)',
                    color: 'var(--brand-primary, #0284c7)',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: !currentSlide ? 'not-allowed' : 'pointer',
                    opacity: !currentSlide ? 0.5 : 1
                  }}
                >
                  <Volume2 size={14} />
                  <span>Read aloud</span>
                </button>
                <button
                  id="stop-voice-btn"
                  onClick={stop}
                  disabled={!isSpeaking}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '7px',
                    backgroundColor: isSpeaking ? 'var(--danger-bg, #fef2f2)' : 'var(--bg-card-subtle, #f8fafc)',
                    border: isSpeaking ? '1px solid var(--danger-border, #fecaca)' : '1px solid var(--border-default, #e2e8f0)',
                    color: isSpeaking ? 'var(--danger-text, #dc2626)' : 'var(--text-muted, #94a3b8)',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: !isSpeaking ? 'not-allowed' : 'pointer'
                  }}
                >
                  <VolumeX size={14} />
                  <span>Stop</span>
                </button>
              </div>
            </div>

            {/* Speed Slider */}
            <div style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main, #0f172a)', marginBottom: '8px' }}>
                Reading Speed
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {RATE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update({ speechRate: opt.value })}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: prefs.speechRate === opt.value ? 'var(--brand-primary, #0284c7)' : 'var(--border-default, #e2e8f0)',
                      backgroundColor: prefs.speechRate === opt.value ? 'var(--primary-50, #f0f9ff)' : 'var(--bg-card, #ffffff)',
                      color: prefs.speechRate === opt.value ? 'var(--brand-primary, #0284c7)' : 'var(--text-secondary, #475569)',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── Display Group ── */}
          <section aria-label="Display settings">
            <SectionHeader label="Display" icon={<Type size={13} />} />

            {/* Text Size */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main, #0f172a)', marginBottom: '8px' }}>
                Text Size
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {SCALE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update({ textScale: opt.value })}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: prefs.textScale === opt.value ? 'var(--brand-primary, #0284c7)' : 'var(--border-default, #e2e8f0)',
                      backgroundColor: prefs.textScale === opt.value ? 'var(--primary-50, #f0f9ff)' : 'var(--bg-card, #ffffff)',
                      color: prefs.textScale === opt.value ? 'var(--brand-primary, #0284c7)' : 'var(--text-secondary, #475569)',
                      fontSize: opt.value === 1 ? '11px' : opt.value === 1.2 ? '12px' : '13.5px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast Toggle */}
            <Toggle
              id="high-contrast-toggle"
              checked={prefs.highContrast}
              onChange={(v) => update({ highContrast: v })}
              label="High Contrast Mode"
              sublabel="Works in light and dark theme. Meets WCAG AA."
            />

            {/* Theme Toggle */}
            <div style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main, #0f172a)', marginBottom: '8px' }}>
                Theme
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { label: 'Light', value: 'light', icon: <Sun size={14} /> },
                  { label: 'Dark',  value: 'dark',  icon: <Moon size={14} /> }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update({ theme: opt.value })}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: prefs.theme === opt.value ? 'var(--brand-primary, #0284c7)' : 'var(--border-default, #e2e8f0)',
                      backgroundColor: prefs.theme === opt.value ? 'var(--primary-50, #f0f9ff)' : 'var(--bg-card, #ffffff)',
                      color: prefs.theme === opt.value ? 'var(--brand-primary, #0284c7)' : 'var(--text-secondary, #475569)',
                      fontSize: '12.5px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── Reset ── */}
          <section aria-label="Reset settings">
            <button
              id="reset-accessibility-btn"
              onClick={handleReset}
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-medium, #cbd5e1)',
                backgroundColor: 'var(--bg-card-subtle, #f8fafc)',
                color: 'var(--text-secondary, #475569)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
            >
              <RotateCcw size={14} />
              <span>Reset to Default</span>
            </button>
            {resetConfirmed && (
              <div style={{
                marginTop: '8px',
                textAlign: 'center',
                fontSize: '12px',
                color: 'var(--success-dark, #15803d)',
                fontWeight: '600'
              }}>
                ✓ Accessibility settings reset.
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Click-outside-to-close backdrop (non-blocking, transparent) */}
      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'calc(var(--z-modal, 1000) - 1)',
            backgroundColor: 'transparent'
          }}
        />
      )}
    </>
  );
}

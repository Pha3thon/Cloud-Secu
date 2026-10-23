import React from 'react';
import { Bold, Italic, Type, Upload, Crop, RotateCcw } from 'lucide-react';
import SceneAnimation from '@/components/scenes/SceneAnimation';

/**
 * EditorCanvas: Center WYSIWYG canvas for slide presentation and inline element editing.
 */
export default function EditorCanvas({
  slide,
  selectedElement,
  onSelectElement,
  onUpdateSlide,
  textFormatting,
  onToggleBold,
  onToggleItalic,
  onTriggerImageUpload,
  onOpenCropModal,
  onRestoreDefaultAnimation
}) {
  if (!slide) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
        No slide selected.
      </div>
    );
  }

  const lines = slide.textLines || [];

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#f1f5f9',
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Floating Toolbar */}
      <div
        style={{
          marginBottom: '16px',
          padding: '6px 14px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <button
          type="button"
          onClick={onToggleBold}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: textFormatting?.bold ? '#e0f2fe' : 'transparent',
            color: textFormatting?.bold ? '#0284c7' : '#475569',
            cursor: 'pointer'
          }}
          title="Bold"
        >
          <Bold size={14} />
        </button>

        <button
          type="button"
          onClick={onToggleItalic}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: textFormatting?.italic ? '#e0f2fe' : 'transparent',
            color: textFormatting?.italic ? '#0284c7' : '#475569',
            cursor: 'pointer'
          }}
          title="Italic"
        >
          <Italic size={14} />
        </button>

        <div style={{ width: '1px', height: '16px', backgroundColor: '#e2e8f0', margin: '0 4px' }} />

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: '600',
            color: '#0284c7',
            cursor: 'pointer'
          }}
        >
          <Upload size={13} />
          <span>Replace Media</span>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onTriggerImageUpload}
          />
        </label>

        {slide.customMediaUrl && (
          <>
            <button
              type="button"
              onClick={onOpenCropModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: '600',
                color: '#475569',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              <Crop size={13} />
              <span>Crop</span>
            </button>

            <button
              type="button"
              onClick={onRestoreDefaultAnimation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: '600',
                color: '#dc2626',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={13} />
              <span>Restore SVG</span>
            </button>
          </>
        )}
      </div>

      {/* Main Slide Card preview container */}
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Slide Header code */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid var(--border-subtle, #e2e8f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: '800', fontFamily: 'monospace', color: '#0284c7' }}>
            {slide.code}
          </span>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>
            Click any section below to edit properties
          </span>
        </div>

        {/* Content Body Grid */}
        <div
          style={{
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '24px'
          }}
        >
          {/* Left: Title, Text Lines, Callout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Title */}
            <div
              onClick={() => onSelectElement?.('title')}
              style={{
                border: selectedElement === 'title' ? '2px solid #0284c7' : '1px dashed transparent',
                borderRadius: '6px',
                padding: '6px',
                cursor: 'pointer'
              }}
            >
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                {slide.title}
              </h2>
            </div>

            {/* Sentences */}
            <div
              onClick={() => onSelectElement?.('body')}
              style={{
                border: selectedElement === 'body' ? '2px solid #0284c7' : '1px dashed transparent',
                borderRadius: '6px',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {lines.map((line, idx) => (
                <p key={idx} style={{ margin: 0, fontSize: '13.5px', color: '#334155', lineHeight: '1.6' }}>
                  {line}
                </p>
              ))}
            </div>

            {/* Real-Life Callout */}
            {slide.realLifeExample && (
              <div
                onClick={() => onSelectElement?.('callout')}
                style={{
                  border: selectedElement === 'callout' ? '2px solid #0284c7' : '1px dashed transparent',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  backgroundColor: '#fffbeb',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#b45309', textTransform: 'uppercase' }}>
                  Analogy — {slide.realLifeExample.title}
                </div>
                <div style={{ fontSize: '12px', color: '#92400e', fontStyle: 'italic', marginTop: '2px' }}>
                  "{slide.realLifeExample.analogy}"
                </div>
              </div>
            )}
          </div>

          {/* Right: Media / Scene animation */}
          <div
            onClick={() => onSelectElement?.('media')}
            style={{
              border: selectedElement === 'media' ? '2px solid #0284c7' : '1px dashed transparent',
              borderRadius: '10px',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {slide.customMediaUrl ? (
              <img
                src={slide.customMediaUrl}
                alt={slide.title}
                style={{ maxWidth: '100%', maxHeight: '220px', borderRadius: '8px', objectFit: 'contain' }}
              />
            ) : (
              <SceneAnimation sceneKey={slide.sceneKey} activeStep={0} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

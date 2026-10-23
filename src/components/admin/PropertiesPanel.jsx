import React from 'react';
import { Plus, Trash2, X } from 'lucide-react';

/**
 * PropertiesPanel: Right inspector drawer for editing attributes of the selected element.
 */
export default function PropertiesPanel({
  slide,
  selectedElement,
  onClose,
  onUpdateSlide
}) {
  if (!slide || !selectedElement) {
    return (
      <div
        style={{
          width: '280px',
          backgroundColor: '#ffffff',
          borderLeft: '1px solid var(--border-subtle, #e2e8f0)',
          padding: '24px 16px',
          color: '#94a3b8',
          fontSize: '12px',
          textAlign: 'center'
        }}
      >
        Select an element in the canvas to customize its properties.
      </div>
    );
  }

  const handleTitleChange = (newTitle) => {
    onUpdateSlide?.({ title: newTitle });
  };

  const handleLineChange = (idx, text) => {
    const updated = [...(slide.textLines || [])];
    updated[idx] = text;
    onUpdateSlide?.({ textLines: updated });
  };

  const handleAddLine = () => {
    const updated = [...(slide.textLines || []), 'New key takeaway sentence.'];
    onUpdateSlide?.({ textLines: updated });
  };

  const handleRemoveLine = (idx) => {
    const updated = (slide.textLines || []).filter((_, i) => i !== idx);
    onUpdateSlide?.({ textLines: updated });
  };

  const handleCalloutChange = (field, val) => {
    onUpdateSlide?.({
      realLifeExample: {
        ...(slide.realLifeExample || {}),
        [field]: val
      }
    });
  };

  return (
    <div
      style={{
        width: '300px',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid var(--border-subtle, #e2e8f0)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--border-subtle, #e2e8f0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ fontSize: '12.5px', fontWeight: '800', textTransform: 'capitalize', color: '#0f172a' }}>
          {selectedElement} Properties
        </span>
        <button
          type="button"
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
        >
          <X size={15} />
        </button>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Title editor */}
        {selectedElement === 'title' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Slide Heading</label>
            <input
              type="text"
              value={slide.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              style={{
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '12.5px',
                outline: 'none'
              }}
            />
          </div>
        )}

        {/* Body lines editor */}
        {selectedElement === 'body' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Content Sentences</label>
              <button
                type="button"
                onClick={handleAddLine}
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#0284c7',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <Plus size={12} />
                <span>Add</span>
              </button>
            </div>

            {(slide.textLines || []).map((line, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                <textarea
                  value={line}
                  rows={2}
                  onChange={(e) => handleLineChange(idx, e.target.value)}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLine(idx)}
                  style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Real-Life Callout editor */}
        {selectedElement === 'callout' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Analogy Title
              </label>
              <input
                type="text"
                value={slide.realLifeExample?.title || ''}
                onChange={(e) => handleCalloutChange('title', e.target.value)}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Analogy Description
              </label>
              <textarea
                rows={3}
                value={slide.realLifeExample?.analogy || ''}
                onChange={(e) => handleCalloutChange('analogy', e.target.value)}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', resize: 'vertical' }}
              />
            </div>
          </div>
        )}

        {/* Media / Scene key selector */}
        {selectedElement === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>SVG Scene Animation</label>
            <select
              value={slide.sceneKey || 'scene_1_1'}
              onChange={(e) => onUpdateSlide?.({ sceneKey: e.target.value })}
              style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
            >
              <option value="scene_1_1">Scene 1.1: What is OpenStack</option>
              <option value="scene_1_2">Scene 1.2: What is Horizon</option>
              <option value="scene_1_3">Scene 1.3: How to access Horizon</option>
              <option value="scene_1_4">Scene 1.4: Tour of Dashboard</option>
              <option value="scene_1_5">Scene 1.5: Projects and Quotas</option>
              <option value="scene_2_1">Scene 2.1: Networks and Subnets</option>
              <option value="scene_2_2">Scene 2.2: Virtual Switches</option>
              <option value="scene_2_3_2">Scene 2.3: CIDR Subnets</option>
              <option value="scene_3_1">Scene 3.1: Routers & Public-net</option>
              <option value="scene_4_1">Scene 4.1: Security Groups</option>
              <option value="scene_4_4">Scene 4.4: Two-Tier SG Isolation</option>
              <option value="scene_6_1">Scene 6.1: Floating IPs</option>
              <option value="scene_7_1">Scene 7.1: Keystone Roles</option>
              <option value="scene_generic">Scene Generic Fallback</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

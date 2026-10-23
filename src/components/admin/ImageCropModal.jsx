import React, { useState, useRef, useEffect } from 'react';
import { Crop, Check, X, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

/**
 * ImageCropModal for cropping and resizing uploaded media in the admin editor.
 */
export default function ImageCropModal({ isOpen, imageSrc, onConfirmCrop, onCancel }) {
  const [cropBox, setCropBox] = useState({ x: 10, y: 10, width: 80, height: 80 });
  const [zoom, setZoom] = useState(1);
  const [aspectPreset, setAspectPreset] = useState('free');
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, boxX: 0, boxY: 0 });

  useEffect(() => {
    if (isOpen) {
      setCropBox({ x: 10, y: 10, width: 80, height: 80 });
      setZoom(1);
    }
  }, [isOpen]);

  if (!isOpen || !imageSrc) return null;

  const handlePreset = (preset) => {
    setAspectPreset(preset);
    if (preset === '1:1') {
      setCropBox({ x: 20, y: 10, width: 60, height: 60 });
    } else if (preset === '16:9') {
      setCropBox({ x: 10, y: 20, width: 80, height: 45 });
    } else if (preset === '4:3') {
      setCropBox({ x: 15, y: 15, width: 70, height: 52 });
    } else {
      setCropBox({ x: 10, y: 10, width: 80, height: 80 });
    }
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      boxX: cropBox.x,
      boxY: cropBox.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const deltaXPct = ((e.clientX - dragStartRef.current.x) / rect.width) * 100;
    const deltaYPct = ((e.clientY - dragStartRef.current.y) / rect.height) * 100;

    const newX = Math.max(0, Math.min(100 - cropBox.width, dragStartRef.current.boxX + deltaXPct));
    const newY = Math.max(0, Math.min(100 - cropBox.height, dragStartRef.current.boxY + deltaYPct));

    setCropBox((prev) => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const executeCrop = () => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const canvas = document.createElement('canvas');
    const pixelX = (cropBox.x / 100) * naturalWidth;
    const pixelY = (cropBox.y / 100) * naturalHeight;
    const pixelWidth = (cropBox.width / 100) * naturalWidth;
    const pixelHeight = (cropBox.height / 100) * naturalHeight;

    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      img,
      pixelX,
      pixelY,
      pixelWidth,
      pixelHeight,
      0,
      0,
      pixelWidth,
      pixelHeight
    );

    const croppedDataUrl = canvas.toDataURL('image/png');
    onConfirmCrop(croppedDataUrl);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="animate-pop-in"
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f8fafc'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crop size={18} color="var(--brand-primary, #0284c7)" />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              Crop & Resize Slide Media
            </h3>
          </div>
          <button
            onClick={onCancel}
            style={{
              padding: '6px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Toolbar Presets & Zoom */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: '#f1f5f9',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: '600', color: '#475569' }}>Ratio:</span>
            {['free', '16:9', '4:3', '1:1'].map((preset) => (
              <button
                key={preset}
                onClick={() => handlePreset(preset)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: aspectPreset === preset ? 'var(--brand-primary, #0284c7)' : '#ffffff',
                  color: aspectPreset === preset ? '#ffffff' : '#334155',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {preset}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
            >
              <ZoomOut size={14} />
            </button>
            <span style={{ fontWeight: '600', minWidth: '36px', textAlign: 'center' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => { setCropBox({ x: 10, y: 10, width: 80, height: 80 }); setZoom(1); }}
              title="Reset"
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
            >
              <RotateCw size={14} />
            </button>
          </div>
        </div>

        {/* Crop Stage Area */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '380px',
            backgroundColor: '#0f172a',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none'
          }}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Crop Target"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              transform: `scale(${zoom})`,
              transition: 'transform 0.1s ease-out'
            }}
          />

          {/* Draggable Crop Frame */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              left: `${cropBox.x}%`,
              top: `${cropBox.y}%`,
              width: `${cropBox.width}%`,
              height: `${cropBox.height}%`,
              border: '2px solid var(--brand-primary, #0284c7)',
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.55)',
              cursor: 'move',
              boxSizing: 'border-box'
            }}
          >
            {/* Guide Grid */}
            <div style={{ position: 'absolute', left: '33.3%', top: 0, bottom: 0, borderLeft: '1px dashed rgba(255,255,255,0.4)' }} />
            <div style={{ position: 'absolute', left: '66.6%', top: 0, bottom: 0, borderLeft: '1px dashed rgba(255,255,255,0.4)' }} />
            <div style={{ position: 'absolute', top: '33.3%', left: 0, right: 0, borderTop: '1px dashed rgba(255,255,255,0.4)' }} />
            <div style={{ position: 'absolute', top: '66.6%', left: 0, right: 0, borderTop: '1px dashed rgba(255,255,255,0.4)' }} />
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px'
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={executeCrop}
            style={{
              padding: '8px 18px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'var(--brand-primary, #0284c7)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Check size={16} />
            <span>Apply Crop</span>
          </button>
        </div>
      </div>
    </div>
  );
}

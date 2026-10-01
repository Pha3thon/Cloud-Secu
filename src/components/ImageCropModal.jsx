import React, { useState, useRef, useEffect } from 'react';
import { Crop, Check, X, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

export const ImageCropModal = ({ isOpen, imageSrc, onConfirmCrop, onCancel }) => {
  const [cropBox, setCropBox] = useState({ x: 10, y: 10, width: 80, height: 80 }); // in percentages
  const [zoom, setZoom] = useState(1);
  const [aspectPreset, setAspectPreset] = useState('free'); // 'free' | '16:9' | '4:3' | '1:1'
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

    let newX = Math.max(0, Math.min(100 - cropBox.width, dragStartRef.current.boxX + deltaXPct));
    let newY = Math.max(0, Math.min(100 - cropBox.height, dragStartRef.current.boxY + deltaYPct));

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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
            <Crop size={18} color="#0284c7" />
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
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Preset Aspect Ratios */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Aspect:</span>
            {['free', '16:9', '4:3', '1:1'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handlePreset(p)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: aspectPreset === p ? '700' : '500',
                  color: aspectPreset === p ? '#0284c7' : '#475569',
                  backgroundColor: aspectPreset === p ? '#f0f9ff' : '#f1f5f9',
                  border: aspectPreset === p ? '1px solid #bae6fd' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Zoom Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ZoomOut size={14} color="#64748b" />
            <input
              type="range"
              min="0.8"
              max="2"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              style={{ width: '100px', cursor: 'pointer' }}
            />
            <ZoomIn size={14} color="#64748b" />
            <span style={{ fontSize: '11.5px', color: '#64748b', minWidth: '36px' }}>
              {Math.round(zoom * 100)}%
            </span>
          </div>
        </div>

        {/* Canvas / Image Crop Workspace */}
        <div
          style={{
            padding: '24px',
            backgroundColor: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '340px',
            maxHeight: '460px',
            overflow: 'hidden',
            position: 'relative',
            userSelect: 'none'
          }}
        >
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              display: 'inline-block',
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.1s ease',
              maxHeight: '380px'
            }}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop preview"
              style={{
                display: 'block',
                maxHeight: '360px',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />

            {/* Dark Overlay around Crop Box */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                pointerEvents: 'none'
              }}
            />

            {/* Interactive Crop Frame Box */}
            <div
              onMouseDown={handleMouseDown}
              style={{
                position: 'absolute',
                left: `${cropBox.x}%`,
                top: `${cropBox.y}%`,
                width: `${cropBox.width}%`,
                height: `${cropBox.height}%`,
                border: '2px solid #38bdf8',
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.45)',
                cursor: 'move',
                zIndex: 2
              }}
            >
              {/* Corner Handles */}
              <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '1px' }} />
              <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '1px' }} />
              <div style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '1px' }} />
              <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '1px' }} />

              {/* Grid 3x3 Guidelines */}
              <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.35)' }} />
              <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.35)' }} />
              <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.35)' }} />
              <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.35)' }} />

              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '700',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  pointerEvents: 'none'
                }}
              >
                Drag to Move Crop Area
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff'
          }}
        >
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Drag box to position. Aspect: <strong>{aspectPreset.toUpperCase()}</strong>
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={executeCrop}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 4px rgba(2, 132, 199, 0.3)'
              }}
            >
              <Check size={15} />
              <span>Confirm Crop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

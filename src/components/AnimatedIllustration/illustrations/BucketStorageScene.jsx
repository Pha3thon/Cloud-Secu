import React, { useState, useEffect } from 'react';

export const BucketStorageScene = ({ isReplaying }) => {
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setFileCount(1), 600); // 1st file drops
    const t2 = setTimeout(() => setFileCount(2), 1400); // 2nd file drops
    const t3 = setTimeout(() => setFileCount(3), 2200); // 3rd file drops, bucket glows

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isReplaying]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 520 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Floor */}
        <line x1="40" y1="185" x2="480" y2="185" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

        {/* Stick figure dropping files */}
        <g transform="translate(100, 75)">
          {/* Head */}
          <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          {/* Torso */}
          <line x1="20" y1="34" x2="20" y2="75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms holding and tossing file */}
          <path d="M20 45 L38 35 L55 28" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <line x1="20" y1="45" x2="6" y2="60" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="20" y1="75" x2="10" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="75" x2="30" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Label */}
          <text x="20" y="-8" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">
            "Uploading Objects"
          </text>
        </g>

        {/* Animated Flying Files */}
        {/* File 1: image.png */}
        <g
          style={{
            transform: fileCount >= 1 ? 'translate(310px, 120px) scale(0.7)' : 'translate(160px, 95px) scale(1)',
            opacity: fileCount >= 1 ? 0.3 : 1,
            transition: 'all 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)'
          }}
        >
          <rect x="0" y="0" width="30" height="38" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
          <path d="M18 0 L30 12 L18 12 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <circle cx="10" cy="18" r="3" fill="#f59e0b" />
          <path d="M6 30 L14 22 L24 30 Z" fill="#0284c7" />
          <text x="15" y="47" textAnchor="middle" fontSize="8" fontWeight="600" fill="#64748b">
            img.png
          </text>
        </g>

        {/* File 2: backup.sql */}
        <g
          style={{
            transform: fileCount >= 2 ? 'translate(330px, 115px) scale(0.7)' : 'translate(190px, 80px) scale(1)',
            opacity: fileCount >= 2 ? 0.3 : (fileCount >= 1 ? 1 : 0),
            transition: 'all 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)'
          }}
        >
          <rect x="0" y="0" width="30" height="38" rx="4" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          <path d="M18 0 L30 12 L18 12 Z" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
          <text x="15" y="24" textAnchor="middle" fontSize="8" fontWeight="700" fill="#059669">
            SQL
          </text>
          <text x="15" y="47" textAnchor="middle" fontSize="8" fontWeight="600" fill="#64748b">
            db.sql
          </text>
        </g>

        {/* The Storage Bucket */}
        <g transform="translate(290, 45)">
          {/* Bucket Outer Cylinder / Container */}
          <g className={fileCount >= 3 ? 'animate-glow' : ''}>
            <ellipse cx="65" cy="40" rx="55" ry="16" fill="#f8fafc" stroke="#0284c7" strokeWidth="2.5" />
            <path
              d="M 10 40 L 22 130 C 22 142 108 142 108 130 L 120 40"
              fill={fileCount >= 3 ? '#e0f2fe' : '#f0f9ff'}
              stroke="#0284c7"
              strokeWidth="2.5"
              style={{ transition: 'fill 0.5s ease' }}
            />
            <ellipse cx="65" cy="130" rx="43" ry="12" fill="#bae6fd" opacity="0.6" />
          </g>

          {/* Bucket Handle */}
          <path d="M 12 40 C 12 -5 118 -5 118 40" fill="none" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 3" />

          {/* Stored objects inside bucket */}
          {fileCount >= 1 && (
            <circle cx="48" cy="90" r="10" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" style={{ animation: 'popoverDown 0.3s ease' }} />
          )}
          {fileCount >= 2 && (
            <circle cx="82" cy="85" r="11" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" style={{ animation: 'popoverDown 0.3s ease' }} />
          )}
          {fileCount >= 3 && (
            <circle cx="65" cy="65" r="12" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" style={{ animation: 'popoverDown 0.3s ease' }} />
          )}

          {/* Fill level badge */}
          <rect x="25" y="148" width="80" height="20" rx="10" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
          <text x="65" y="162" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0369a1">
            {fileCount === 0 ? 'Empty Bucket' : fileCount === 1 ? '1 Object Stored' : fileCount === 2 ? '2 Objects Stored' : 'Bucket Ready ✨'}
          </text>

          {/* Top Label */}
          <text x="65" y="15" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">
            Object Storage Bucket
          </text>
        </g>
      </svg>
    </div>
  );
};

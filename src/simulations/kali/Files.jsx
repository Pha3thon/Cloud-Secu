/**
 * Kali Linux Files (File Manager) Component
 * Shows /home/kali downloads, documents, and generated keys/reports.
 */

import React, { useState } from 'react';
import {
  Folder,
  FileText,
  Key,
  Download,
  File,
  X,
  Maximize2,
  Minimize2,
  ChevronRight,
  HardDrive
} from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import FilePreviewModal from './FilePreviewModal';

export const Files = ({ onClose, onMaximize, isMaximized }) => {
  const { simCloud, recordLabEvent } = useStore();
  const [activeFolder, setActiveFolder] = useState('documents'); // 'downloads' | 'documents'
  const [previewFile, setPreviewFile] = useState(null);

  const downloads = simCloud.kaliFiles?.downloads || [];
  const documents = simCloud.kaliFiles?.documents || [];

  const handleOpenFile = (fileName) => {
    setPreviewFile(fileName);
    if (fileName === 'access-report-0912.html') {
      recordLabEvent('report_opened');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: isMaximized ? 0 : '40px',
        left: isMaximized ? 0 : '60px',
        right: isMaximized ? 0 : '60px',
        bottom: isMaximized ? 0 : '40px',
        backgroundColor: '#1e293b',
        borderRadius: isMaximized ? 0 : '8px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #334155',
        zIndex: 50
      }}
    >
      {/* Window Title Bar */}
      <div
        style={{
          height: '34px',
          backgroundColor: '#0f172a',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          borderBottom: '1px solid #334155',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Folder size={15} color="#38bdf8" />
          <span style={{ fontSize: '11.5px', fontWeight: '700' }}>Files - /home/kali</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={onMaximize}
            style={{ color: '#94a3b8', padding: '4px' }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ color: '#ef4444', padding: '4px' }}
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div style={{ flex: 1, display: 'flex', backgroundColor: '#0f172a' }}>
        {/* Left Sidebar */}
        <div
          style={{
            width: '180px',
            backgroundColor: '#1e293b',
            borderRight: '1px solid #334155',
            padding: '12px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', padding: '4px 8px' }}>
            Places
          </div>
          <button
            type="button"
            onClick={() => setActiveFolder('documents')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              color: activeFolder === 'documents' ? '#ffffff' : '#94a3b8',
              backgroundColor: activeFolder === 'documents' ? '#0284c7' : 'transparent',
              fontWeight: activeFolder === 'documents' ? '700' : '500',
              textAlign: 'left'
            }}
          >
            <FileText size={15} />
            <span>Documents</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFolder('downloads')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              color: activeFolder === 'downloads' ? '#ffffff' : '#94a3b8',
              backgroundColor: activeFolder === 'downloads' ? '#0284c7' : 'transparent',
              fontWeight: activeFolder === 'downloads' ? '700' : '500',
              textAlign: 'left'
            }}
          >
            <Download size={15} />
            <span>Downloads</span>
          </button>
        </div>

        {/* Right Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Breadcrumb Path */}
          <div
            style={{
              height: '32px',
              backgroundColor: '#1e293b',
              borderBottom: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: '6px',
              fontSize: '11px',
              color: '#94a3b8'
            }}
          >
            <HardDrive size={13} />
            <span>home</span>
            <ChevronRight size={12} />
            <span>kali</span>
            <ChevronRight size={12} />
            <span style={{ color: '#38bdf8', fontWeight: '700' }}>{activeFolder}</span>
          </div>

          {/* Files List Table */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
              <thead>
                <tr style={{ color: '#64748b', borderBottom: '1px solid #334155', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px' }}>Name</th>
                  <th style={{ padding: '8px 12px' }}>Size</th>
                  <th style={{ padding: '8px 12px' }}>Type</th>
                  <th style={{ padding: '8px 12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeFolder === 'downloads' && (
                  <>
                    {downloads.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                          Folder is empty.
                        </td>
                      </tr>
                    ) : (
                      downloads.map((f) => (
                        <tr key={f} style={{ borderBottom: '1px solid #1e293b', color: '#f1f5f9' }}>
                          <td style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Key size={15} color="#eab308" />
                            <span>{f}</span>
                          </td>
                          <td style={{ padding: '10px 12px', color: '#94a3b8' }}>1.7 KB</td>
                          <td style={{ padding: '10px 12px', color: '#94a3b8' }}>PEM Key Pair</td>
                          <td style={{ padding: '10px 12px' }}>
                            <button
                              type="button"
                              onClick={() => handleOpenFile(f)}
                              style={{ padding: '3px 8px', backgroundColor: '#334155', color: '#38bdf8', borderRadius: '4px', fontSize: '10.5px' }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </>
                )}

                {activeFolder === 'documents' && (
                  <>
                    {documents.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                          No documents generated yet.
                        </td>
                      </tr>
                    ) : (
                      documents.map((f) => (
                        <tr key={f} style={{ borderBottom: '1px solid #1e293b', color: '#f1f5f9' }}>
                          <td style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText size={15} color="#38bdf8" />
                            <span>{f}</span>
                          </td>
                          <td style={{ padding: '10px 12px', color: '#94a3b8' }}>3.4 KB</td>
                          <td style={{ padding: '10px 12px', color: '#94a3b8' }}>HTML Report</td>
                          <td style={{ padding: '10px 12px' }}>
                            <button
                              type="button"
                              onClick={() => handleOpenFile(f)}
                              style={{ padding: '3px 8px', backgroundColor: '#0284c7', color: '#ffffff', borderRadius: '4px', fontSize: '10.5px', fontWeight: '700' }}
                            >
                              Open in Viewer
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* File Preview Overlay Modal */}
      <FilePreviewModal
        previewFile={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
};

export default Files;


/**
 * Kali Linux Workstation Desktop Environment
 * Simulated external analyst environment running Firefox, Files, and SimulatedTerminal.
 */

// TODO: replace simulated Kali with real VM stream (e.g. noVNC/Guacamole iframe)

import React, { useState } from 'react';
import {
  Globe,
  Folder,
  Terminal as TerminalIcon,
  Wifi,
  Volume2,
  Battery,
  ShieldAlert,
  Activity,
  ShieldCheck
} from 'lucide-react';
import useStore from '@/hooks/useStore';
import { Firefox } from './Firefox';
import { Files } from './Files';
import { SimulatedTerminal } from '../terminal/SimulatedTerminal';
import { getInitialVirtualFilesystem } from '../terminal/virtualFilesystem';
import Wireshark from './Wireshark';
import NvdBrowser from './NvdBrowser';

export const KaliDesktop = ({
  onVisitIdentity403,
  needsTerminal: propNeedsTerminal,
  topicNumber = 1,
  labId = null,
  moduleId = 'm4',
  isExpanded = false,
  onToggleExpand
}) => {
  const { simCloud, updateSimCloud, recordLabEvent } = useStore();

  const effectiveLabId = labId || (moduleId === 'm1'
    ? `m1-lab${topicNumber === 2 ? 1 : (topicNumber === 5 ? 2 : (topicNumber === 6 ? 3 : 1))}`
    : `lab${topicNumber}`);

  const isWiresharkNeeded = moduleId === 'm1' && (effectiveLabId === 'm1-lab2' || topicNumber === 5);
  const isNvdNeeded = moduleId === 'm1' && (effectiveLabId === 'm1-lab3' || topicNumber === 6);

  const [activeWindow, setActiveWindow] = useState(() => {
    if (moduleId === 'm1') {
      if (effectiveLabId === 'm1-lab2' || topicNumber === 5) return 'wireshark';
      if (effectiveLabId === 'm1-lab3' || topicNumber === 6) return 'nvd';
      return 'terminal';
    }
    return 'firefox';
  });
  const [isFirefoxMaximized, setIsFirefoxMaximized] = useState(false);
  const [isFilesMaximized, setIsFilesMaximized] = useState(false);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  const [isWiresharkMaximized, setIsWiresharkMaximized] = useState(false);
  const [isNvdMaximized, setIsNvdMaximized] = useState(false);

  // Terminal is enabled for labs that require CLI work (e.g. M1 labs, Lab 1 / Topic 1)
  const isTerminalNeeded = propNeedsTerminal !== undefined
    ? propNeedsTerminal
    : (moduleId === 'm1' || topicNumber === 1 || Boolean(simCloud?.terminalEnabled));

  const handleUpdateVfs = (nextVfs) => {
    updateSimCloud((prev) => ({
      ...prev,
      terminalVfs: nextVfs
    }));
  };

  const vfsState = simCloud?.terminalVfs || getInitialVirtualFilesystem(effectiveLabId);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#090d16',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Kali Top Bar Panel */}
      <div
        style={{
          height: '28px',
          backgroundColor: '#0f172a',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          borderBottom: '1px solid #1e293b',
          fontSize: '11px',
          fontWeight: '600',
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: '800' }}>
            <ShieldAlert size={14} />
            <span>Kali Linux</span>
          </div>
          <span style={{ color: '#64748b' }}>|</span>
          <button
            type="button"
            onClick={() => setActiveWindow('firefox')}
            style={{ color: '#cbd5e1', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            <Globe size={13} color="#f97316" /> Firefox
          </button>
          <button
            type="button"
            onClick={() => setActiveWindow('files')}
            style={{ color: '#cbd5e1', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            <Folder size={13} color="#38bdf8" /> Files
          </button>
          {isTerminalNeeded ? (
            <button
              type="button"
              onClick={() => setActiveWindow('terminal')}
              style={{ color: '#cbd5e1', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              <TerminalIcon size={13} color="#38bdf8" /> Terminal
            </button>
          ) : (
            <span
              title="Not needed in this module."
              style={{ color: '#64748b', opacity: 0.5, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'not-allowed' }}
            >
              <TerminalIcon size={13} /> Terminal
            </span>
          )}
          {isWiresharkNeeded && (
            <button
              type="button"
              onClick={() => setActiveWindow('wireshark')}
              style={{ color: '#cbd5e1', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              <Activity size={13} color="#38bdf8" /> Wireshark
            </button>
          )}
          {isNvdNeeded && (
            <button
              type="button"
              onClick={() => setActiveWindow('nvd')}
              style={{ color: '#cbd5e1', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              <ShieldCheck size={13} color="#38bdf8" /> NVD Browser
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94a3b8' }}>
          <Wifi size={13} />
          <Volume2 size={13} />
          <Battery size={13} />
          <span style={{ color: '#f8fafc', fontWeight: '700' }}>09:12 AM</span>
        </div>
      </div>

      {/* Kali Desktop Workspace / Wallpaper */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #090d16 100%)',
          padding: '20px'
        }}
      >
        {/* Desktop Shortcut Icons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '70px' }}>
          <button
            type="button"
            onClick={() => setActiveWindow('firefox')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#f8fafc', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={24} color="#f97316" />
            </div>
            <span>Firefox</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveWindow('files')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#f8fafc', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Folder size={24} color="#38bdf8" />
            </div>
            <span>Files</span>
          </button>

          {isTerminalNeeded ? (
            <button
              type="button"
              onClick={() => setActiveWindow('terminal')}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#f8fafc', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#1e293b', border: '1px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TerminalIcon size={24} color="#38bdf8" />
              </div>
              <span>Terminal</span>
            </button>
          ) : (
            <div
              title="Not needed in this module."
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '11px', opacity: 0.5, cursor: 'not-allowed' }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TerminalIcon size={24} />
              </div>
              <span>Terminal</span>
            </div>
          )}

          {isWiresharkNeeded && (
            <button
              type="button"
              onClick={() => setActiveWindow('wireshark')}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#f8fafc', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#0284c7', border: '1px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={24} color="#ffffff" />
              </div>
              <span>Wireshark</span>
            </button>
          )}

          {isNvdNeeded && (
            <button
              type="button"
              onClick={() => setActiveWindow('nvd')}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#f8fafc', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#1e3a8a', border: '1px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={24} color="#38bdf8" />
              </div>
              <span>NVD Browser</span>
            </button>
          )}
        </div>

        {/* Window 1: Firefox */}
        {activeWindow === 'firefox' && (
          <Firefox
            onClose={() => setActiveWindow(null)}
            onMaximize={() => setIsFirefoxMaximized(!isFirefoxMaximized)}
            isMaximized={isFirefoxMaximized}
            onVisitIdentity403={onVisitIdentity403}
          />
        )}

        {/* Window 2: Files */}
        {activeWindow === 'files' && (
          <Files
            onClose={() => setActiveWindow(null)}
            onMaximize={() => setIsFilesMaximized(!isFilesMaximized)}
            isMaximized={isFilesMaximized}
          />
        )}

        {/* Window 3: Simulated Terminal */}
        {activeWindow === 'terminal' && isTerminalNeeded && (
          <SimulatedTerminal
            onClose={() => setActiveWindow(null)}
            onMaximize={() => setIsTerminalMaximized(!isTerminalMaximized)}
            isMaximized={isTerminalMaximized}
            vfs={vfsState}
            onUpdateVfs={handleUpdateVfs}
            labId={effectiveLabId}
            recordLabEvent={recordLabEvent}
          />
        )}

        {/* Window 4: Wireshark */}
        {activeWindow === 'wireshark' && isWiresharkNeeded && (
          <Wireshark
            onClose={() => setActiveWindow(null)}
            onMaximize={() => setIsWiresharkMaximized(!isWiresharkMaximized)}
            isMaximized={isWiresharkMaximized}
            recordLabEvent={recordLabEvent}
          />
        )}

        {/* Window 5: NvdBrowser */}
        {activeWindow === 'nvd' && isNvdNeeded && (
          <NvdBrowser
            onClose={() => setActiveWindow(null)}
            onMaximize={() => setIsNvdMaximized(!isNvdMaximized)}
            isMaximized={isNvdMaximized}
            recordLabEvent={recordLabEvent}
          />
        )}
      </div>

      {/* Kali Bottom Taskbar */}
      <div
        style={{
          height: '32px',
          backgroundColor: '#0f172a',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          gap: '6px'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveWindow('firefox')}
          style={{
            padding: '4px 10px',
            borderRadius: '4px',
            backgroundColor: activeWindow === 'firefox' ? '#334155' : 'transparent',
            color: activeWindow === 'firefox' ? '#ffffff' : '#94a3b8',
            fontSize: '11px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Globe size={13} color="#f97316" /> Firefox
        </button>
        <button
          type="button"
          onClick={() => setActiveWindow('files')}
          style={{
            padding: '4px 10px',
            borderRadius: '4px',
            backgroundColor: activeWindow === 'files' ? '#334155' : 'transparent',
            color: activeWindow === 'files' ? '#ffffff' : '#94a3b8',
            fontSize: '11px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Folder size={13} color="#38bdf8" /> Files
        </button>
        {isTerminalNeeded && (
          <button
            type="button"
            onClick={() => setActiveWindow('terminal')}
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: activeWindow === 'terminal' ? '#334155' : 'transparent',
              color: activeWindow === 'terminal' ? '#ffffff' : '#94a3b8',
              fontSize: '11px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <TerminalIcon size={13} color="#38bdf8" /> Terminal
          </button>
        )}
        {isWiresharkNeeded && (
          <button
            type="button"
            onClick={() => setActiveWindow('wireshark')}
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: activeWindow === 'wireshark' ? '#334155' : 'transparent',
              color: activeWindow === 'wireshark' ? '#ffffff' : '#94a3b8',
              fontSize: '11px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Activity size={13} color="#38bdf8" /> Wireshark
          </button>
        )}
        {isNvdNeeded && (
          <button
            type="button"
            onClick={() => setActiveWindow('nvd')}
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: activeWindow === 'nvd' ? '#334155' : 'transparent',
              color: activeWindow === 'nvd' ? '#ffffff' : '#94a3b8',
              fontSize: '11px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ShieldCheck size={13} color="#38bdf8" /> NVD Browser
          </button>
        )}
      </div>
    </div>
  );
};

export default KaliDesktop;

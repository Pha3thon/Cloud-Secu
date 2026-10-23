/**
 * Firefox Browser Component for Kali Workstation
 * Dispatches web requests based on urlRouter.
 */

import React, { useState } from 'react';
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Plus,
  X,
  Maximize2,
  Minimize2,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { matchFirefoxUrl, ROUTE_TYPES } from './urlRouter';
import { Horizon } from '../horizon/Horizon';
import { AccessPortal } from '../accessPortal/AccessPortal';

export const Firefox = ({
  onClose,
  onMaximize,
  isMaximized,
  onVisitIdentity403
}) => {
  const { simCloud, recordLabEvent } = useStore();

  const [urlInput, setUrlInput] = useState('http://horizon.quickmart.lab/dashboard');
  const [currentUrl, setCurrentUrl] = useState('http://horizon.quickmart.lab/dashboard');
  const [navHistory, setNavHistory] = useState(['http://horizon.quickmart.lab/dashboard']);
  const [navHistoryIndex, setNavHistoryIndex] = useState(0);

  const handleNavigate = (url) => {
    const trimmed = (url || '').trim();
    if (!trimmed) return;
    const nextHistory = [...navHistory.slice(0, navHistoryIndex + 1), trimmed];
    setNavHistory(nextHistory);
    setNavHistoryIndex(nextHistory.length - 1);
    setCurrentUrl(trimmed);
    setUrlInput(trimmed);
    if (recordLabEvent) {
      recordLabEvent(`url:${trimmed}`);
    }
  };

  const handleBack = () => {
    if (navHistoryIndex > 0) {
      const nextIdx = navHistoryIndex - 1;
      const targetUrl = navHistory[nextIdx];
      setNavHistoryIndex(nextIdx);
      setCurrentUrl(targetUrl);
      setUrlInput(targetUrl);
    }
  };

  const handleForward = () => {
    if (navHistoryIndex < navHistory.length - 1) {
      const nextIdx = navHistoryIndex + 1;
      const targetUrl = navHistory[nextIdx];
      setNavHistoryIndex(nextIdx);
      setCurrentUrl(targetUrl);
      setUrlInput(targetUrl);
    }
  };

  const routeMatch = matchFirefoxUrl(currentUrl);

  return (
    <div
      style={{
        position: 'absolute',
        top: isMaximized ? 0 : '20px',
        left: isMaximized ? 0 : '40px',
        right: isMaximized ? 0 : '40px',
        bottom: isMaximized ? 0 : '20px',
        backgroundColor: '#1e293b',
        borderRadius: isMaximized ? 0 : '8px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #334155',
        zIndex: 40
      }}
    >
      {/* Title Bar */}
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
          <Globe size={15} color="#f97316" />
          <span style={{ fontSize: '11.5px', fontWeight: '700' }}>Firefox Web Browser</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button type="button" onClick={onMaximize} style={{ color: '#94a3b8', padding: '4px' }}>
            {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button type="button" onClick={onClose} style={{ color: '#ef4444', padding: '4px' }}>
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div style={{ height: '32px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 8px', borderBottom: '1px solid #334155', gap: '4px' }}>
        <div
          style={{
            height: '26px',
            backgroundColor: '#334155',
            color: '#ffffff',
            borderRadius: '6px 6px 0 0',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            fontWeight: '600',
            maxWidth: '220px'
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {routeMatch.title}
          </span>
          <X size={12} color="#94a3b8" />
        </div>
      </div>

      {/* URL Nav Bar */}
      <div style={{ height: '40px', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '8px', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            onClick={handleBack}
            disabled={navHistoryIndex === 0}
            title="Back (Simulated Firefox History)"
            style={{
              color: navHistoryIndex === 0 ? '#475569' : '#cbd5e1',
              padding: '4px',
              background: 'none',
              border: 'none',
              cursor: navHistoryIndex === 0 ? 'default' : 'pointer',
              opacity: navHistoryIndex === 0 ? 0.35 : 1
            }}
          >
            <ArrowLeft size={14} />
          </button>
          <button
            type="button"
            onClick={handleForward}
            disabled={navHistoryIndex >= navHistory.length - 1}
            title="Forward (Simulated Firefox History)"
            style={{
              color: navHistoryIndex >= navHistory.length - 1 ? '#475569' : '#cbd5e1',
              padding: '4px',
              background: 'none',
              border: 'none',
              cursor: navHistoryIndex >= navHistory.length - 1 ? 'default' : 'pointer',
              opacity: navHistoryIndex >= navHistory.length - 1 ? 0.35 : 1
            }}
          >
            <ArrowRight size={14} />
          </button>
          <button
            type="button"
            onClick={() => handleNavigate(currentUrl)}
            title="Reload Tab"
            style={{ color: '#94a3b8', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <RotateCcw size={13} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleNavigate(urlInput); }} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
            <Lock size={12} color="#64748b" style={{ position: 'absolute', left: '10px' }} />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '6px 10px 6px 28px',
                fontSize: '11.5px',
                fontFamily: 'monospace'
              }}
            />
          </div>
        </form>
      </div>

      {/* Bookmarks Toolbar */}
      <div style={{ height: '28px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '10px', borderBottom: '1px solid #334155', overflowX: 'auto' }}>
        {[
          { label: 'Horizon Dashboard', url: 'http://horizon.quickmart.lab/dashboard' },
          { label: 'Access Portal', url: 'http://access.quickmart.lab' },
          { label: 'Storefront (Public)', url: 'http://203.0.113.27' },
          { label: 'DB Status', url: 'http://203.0.113.27/status' },
          { label: 'Direct DB:3306', url: 'http://203.0.113.27:3306' },
          { label: 'Private 10.20.1.4', url: 'http://10.20.1.4' }
        ].map((bm) => (
          <button
            key={bm.url}
            type="button"
            onClick={() => handleNavigate(bm.url)}
            style={{ fontSize: '10.5px', color: '#94a3b8', whiteSpace: 'nowrap', padding: '2px 4px' }}
          >
            ★ {bm.label}
          </button>
        ))}
      </div>

      {/* Viewport Area */}
      <div style={{ flex: 1, backgroundColor: '#ffffff', overflowY: 'auto', position: 'relative' }}>
        {routeMatch.type === ROUTE_TYPES.HORIZON && <Horizon onVisitIdentity403={onVisitIdentity403} />}

        {routeMatch.type === ROUTE_TYPES.ACCESS_PORTAL && <AccessPortal />}

        {routeMatch.type === ROUTE_TYPES.STOREFRONT && (
          <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
              🛒 QuickMart 10-Minute Grocery Delivery
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
              Fresh produce and groceries delivered to your door in 10 minutes.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#065f46', fontSize: '13px', fontWeight: '700' }}>
              <CheckCircle2 size={16} /> Web Server Online at Public Floating IP 203.0.113.27
            </div>
          </div>
        )}

        {routeMatch.type === ROUTE_TYPES.STOREFRONT_STATUS && (
          <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '13px', backgroundColor: '#0f172a', color: '#f8fafc', height: '100%' }}>
            <div style={{ color: '#38bdf8', marginBottom: '12px' }}>{`// QuickMart Health Check Endpoint: GET /status`}</div>
            <div>{`{`}</div>
            <div style={{ paddingLeft: '20px' }}>{`"status": "UP",`}</div>
            <div style={{ paddingLeft: '20px' }}>{`"service": "quickmart-web",`}</div>
            <div style={{ paddingLeft: '20px', color: '#4ade80' }}>
              {`"database": "10.20.1.4:3306 connected",`}
            </div>
            <div style={{ paddingLeft: '20px' }}>{`"cluster": "qm-db-01",`}</div>
            <div style={{ paddingLeft: '20px' }}>{`"latency_ms": 1.4`}</div>
            <div>{`}`}</div>
          </div>
        )}

        {routeMatch.type === ROUTE_TYPES.DB_PORT_TIMEOUT && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '32px', textAlign: 'center' }}>
            <div style={{ maxWidth: '480px' }}>
              <AlertTriangle size={42} color="#d97706" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                The connection has timed out
              </h2>
              <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '1.6' }}>
                The server at 203.0.113.27 is taking too long to respond. Packets sent to TCP port 3306 were silently dropped by the perimeter security group rules.
              </p>
            </div>
          </div>
        )}

        {routeMatch.type === ROUTE_TYPES.RFC1918_UNROUTABLE && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '32px', textAlign: 'center' }}>
            <div style={{ maxWidth: '480px' }}>
              <AlertTriangle size={42} color="#dc2626" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                Unable to connect
              </h2>
              <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '1.6' }}>
                Firefox can’t establish a connection to the server at 10.20.1.4. Private RFC 1918 addresses cannot be reached from an external network without a public floating IP.
              </p>
            </div>
          </div>
        )}

        {routeMatch.type === ROUTE_TYPES.NOT_FOUND && (
          <div style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
            <h2>404 Server Not Found</h2>
            <p>The requested URL cannot be resolved by the training DNS agent.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Firefox;

import React, { useState, useEffect } from 'react';
import {
  Globe,
  Folder,
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  ShieldAlert,
  FileText,
  Clock,
  X,
  Minus,
  Square,
  AlertOctagon,
  CheckCircle2
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { SimulatedHorizon } from './SimulatedHorizon';
import { AccessPortal } from './AccessPortal';

// // TODO: replace simulated Kali with real VM stream (e.g. noVNC/Guacamole iframe)
export const KaliWorkstation = ({ isExpanded = false, onToggleExpand }) => {
  const { simCloud, updateSimCloud, recordLabEvent } = useCourse();

  // Desktop Windows Open State: 'firefox' | 'files' | null
  const [activeWindow, setActiveWindow] = useState('firefox');
  const [isWindowMaximized, setIsWindowMaximized] = useState(false);

  // Files App state
  const [activeFolder, setActiveFolder] = useState('downloads'); // 'downloads' | 'documents'
  const [openedFile, setOpenedFile] = useState(null); // 'qm-key.pem' | 'access-report-0912.html'

  // Firefox Browser state
  const [firefoxUrl, setFirefoxUrl] = useState('http://horizon.quickmart.lab/dashboard');
  const [inputUrl, setInputUrl] = useState('http://horizon.quickmart.lab/dashboard');
  const [activeTabId, setActiveTabId] = useState('tab-1');

  // Time for Kali top panel
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigateUrl = (targetUrl) => {
    const trimmed = (targetUrl || '').trim();
    setFirefoxUrl(trimmed);
    setInputUrl(trimmed);

    // Track visit in simCloud history and per-lab events
    updateSimCloud((prev) => {
      const history = prev.browserVisitedUrls || [];
      if (!history.includes(trimmed)) {
        return { browserVisitedUrls: [...history, trimmed] };
      }
      return prev;
    });

    if (recordLabEvent) {
      recordLabEvent(`url:${trimmed}`);
      recordLabEvent('url_visited');
    }

    // If navigating to identity directly as non-admin
    if (trimmed.includes('horizon.quickmart.lab/identity')) {
      updateSimCloud({ identityVisitedAsTrainee: true });
      if (recordLabEvent) recordLabEvent('identity_403_seen');
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    handleNavigateUrl(inputUrl);
  };

  // Evaluate Network Exposure & Firewall Reachability
  const isWebVmActive = simCloud.instances.some((i) => i.name === 'qm-web-01' && i.status === 'ACTIVE');
  const isFipAttached = simCloud.floatingIps.some((f) => f.ip === '203.0.113.27' && f.instanceId === 'qm-web-01');
  const webSg = simCloud.securityGroups.find((s) => s.name === 'qm-web-sg');
  const allowsHttp80 = webSg?.rules?.some((r) => r.direction === 'ingress' && (r.port === 80 || r.port === '80') && r.remote === '0.0.0.0/0');
  const routerExists = simCloud.routers.some((r) => r.name === 'qm-router' && r.externalNetwork === 'public-net');
  const routerInterfaceExists = simCloud.routers.some((r) => r.interfaces?.includes('qm-subnet'));

  const canReachStorefront = isWebVmActive && isFipAttached && allowsHttp80 && routerExists && routerInterfaceExists;

  const dbSg = simCloud.securityGroups.find((s) => s.name === 'qm-db-sg');
  const isDbActive = simCloud.instances.some((i) => i.name === 'qm-db-01' && i.status === 'ACTIVE');
  const allowsDbInternal = dbSg?.rules?.some((r) => r.direction === 'ingress' && (r.port === 3306 || r.port === '3306') && r.remote === 'qm-web-sg');

  const canWebReachDb = canReachStorefront && isDbActive && allowsDbInternal;

  // Firefox Content Renderer based on active URL
  const renderBrowserContent = () => {
    const url = firefoxUrl.toLowerCase();

    // 1. Horizon Login / Dashboard
    if (url.includes('horizon.quickmart.lab/dashboard')) {
      return <SimulatedHorizon />;
    }

    // 2. Direct Horizon Identity Access
    if (url.includes('horizon.quickmart.lab/identity')) {
      const activeUser = simCloud.activeHorizonUser;
      const role = simCloud.userRoles[activeUser];
      if (role === 'admin') {
        return <SimulatedHorizon />;
      }
      return (
        <div style={{ padding: '40px 24px', textAlign: 'center', backgroundColor: '#ffffff', height: '100%' }}>
          <AlertOctagon size={48} color="#dc2626" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#991b1b', marginBottom: '8px' }}>
            Unauthorized: You are not allowed to access this page. (HTTP 403 Forbidden)
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748b', maxWidth: '440px', margin: '0 auto 20px' }}>
            User <code>{activeUser || 'trainee'}</code> with role <code>{role || 'member'}</code> does not have permission to view Keystone Identity domain settings.
          </p>
          <button
            type="button"
            onClick={() => handleNavigateUrl('http://horizon.quickmart.lab/dashboard')}
            style={{ padding: '8px 16px', backgroundColor: '#0284c7', color: '#ffffff', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
          >
            Return to Compute Dashboard
          </button>
        </div>
      );
    }

    // 3. Access Request Portal
    if (url.includes('access.quickmart.lab')) {
      return <AccessPortal />;
    }

    // 4. QuickMart Storefront Root (port 80)
    if (url === 'http://203.0.113.27' || url === 'http://203.0.113.27/') {
      if (!canReachStorefront) {
        return (
          <div style={{ padding: '60px 24px', textAlign: 'center', backgroundColor: '#ffffff', height: '100%' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#334155', marginBottom: '8px' }}>
              The connection has timed out
            </h2>
            <p style={{ fontSize: '12.5px', color: '#64748b', maxWidth: '420px', margin: '0 auto' }}>
              The server at 203.0.113.27 is taking too long to respond. Check if the floating IP is attached, qm-web-01 is Active, and port 80 is allowed in qm-web-sg.
            </p>
          </div>
        );
      }

      return (
        <div style={{ height: '100%', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Storefront Hero */}
          <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '24px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>
                  QM
                </div>
                <div>
                  <h1 style={{ fontSize: '18px', fontWeight: '800' }}>QuickMart</h1>
                  <p style={{ fontSize: '11px', color: '#94a3b8' }}>10-Minute Grocery Delivery — Production Release v1.0</p>
                </div>
              </div>
              <span style={{ fontSize: '11px', backgroundColor: '#10b981', color: '#ffffff', padding: '3px 10px', borderRadius: '12px', fontWeight: '700' }}>
                ● Storefront Online
              </span>
            </div>
          </div>

          <div style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} />
              <span>
                <strong>Storefront Operational:</strong> Hosted on <code>qm-web-01</code> (10.20.1.3), exposed via floating IP <code>203.0.113.27</code>.
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { name: 'Fresh Organic Milk', price: '$2.49', stock: '24 in stock' },
                { name: 'Artisan Sourdough', price: '$4.10', stock: '12 in stock' },
                { name: 'Farm Crisp Apples (1kg)', price: '$3.50', stock: '40 in stock' }
              ].map((prod) => (
                <div key={prod.name} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '4px' }}>{prod.name}</div>
                  <div style={{ color: '#0284c7', fontWeight: '800', fontSize: '14px', marginBottom: '4px' }}>{prod.price}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{prod.stock}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 5. QuickMart Database Status Endpoint
    if (url.includes('203.0.113.27/status')) {
      if (!canWebReachDb) {
        return (
          <div style={{ padding: '60px 24px', textAlign: 'center', backgroundColor: '#ffffff', height: '100%' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#dc2626', marginBottom: '8px' }}>
              Database connection error
            </h2>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              Unable to reach internal database cluster. Verify qm-db-sg allows port 3306 from qm-web-sg.
            </p>
          </div>
        );
      }
      return (
        <div style={{ padding: '30px', fontFamily: 'monospace', fontSize: '13px', backgroundColor: '#0f172a', color: '#10b981', height: '100%' }}>
          <div>[INFO] QuickMart Health Service v1.0</div>
          <div>[OK] Web instance qm-web-01 healthy.</div>
          <div style={{ fontWeight: '800', color: '#38bdf8', marginTop: '10px' }}>
            Database: 10.20.1.4:3306 connected
          </div>
          <div style={{ color: '#94a3b8', marginTop: '6px' }}>Status: Ready for grocery catalog transactions.</div>
        </div>
      );
    }

    // 6. Direct Database Port on Public IP (Port 3306)
    if (url.includes('203.0.113.27:3306')) {
      return (
        <div style={{ padding: '60px 24px', textAlign: 'center', backgroundColor: '#ffffff', height: '100%' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#334155', marginBottom: '8px' }}>
            The connection has timed out
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748b', maxWidth: '440px', margin: '0 auto' }}>
            The server at 203.0.113.27:3306 took too long to respond. The firewall silently dropped inbound packets on port 3306.
          </p>
        </div>
      );
    }

    // 7. Direct Private IP Attempt from Outside (10.20.1.4)
    if (url.includes('10.20.1.4')) {
      return (
        <div style={{ padding: '60px 24px', textAlign: 'center', backgroundColor: '#ffffff', height: '100%' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#334155', marginBottom: '8px' }}>
            Unable to connect
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748b', maxWidth: '440px', margin: '0 auto' }}>
            Firefox can't establish a connection to the server at 10.20.1.4. Private RFC 1918 addresses cannot be routed from the external internet without a floating IP.
          </p>
        </div>
      );
    }

    // 8. Default unrouted URL
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center', backgroundColor: '#ffffff', height: '100%' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#334155', marginBottom: '8px' }}>
          We can't find that site
        </h2>
        <p style={{ fontSize: '12.5px', color: '#64748b' }}>
          Check the URL address for typos, or use the bookmarks toolbar above.
        </p>
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        minHeight: '620px',
        backgroundColor: '#1e293b',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
        border: '1px solid #334155'
      }}
    >
      {/* Top Kali Panel Bar */}
      <div
        style={{
          height: '28px',
          backgroundColor: '#0f172a',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          fontSize: '11.5px',
          borderBottom: '1px solid #1e293b',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontWeight: '800', color: '#38bdf8', letterSpacing: '0.04em' }}>
            WORKSTATION — KALI
          </span>
          <span style={{ color: '#64748b' }}>QuickMart Cloud Training Terminal</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
            <Clock size={12} />
            <span>{currentTime}</span>
          </div>

          {onToggleExpand && (
            <button
              type="button"
              onClick={onToggleExpand}
              title={isExpanded ? 'Collapse workstation' : 'Expand workstation'}
              style={{
                color: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
          )}
        </div>
      </div>

      {/* Kali Desktop Workspace (Wallpaper) */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px'
        }}
      >
        {/* Subtle geometric grid wallpaper watermark */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.35,
            pointerEvents: 'none'
          }}
        />

        {/* ================================================================= */}
        {/* Window 1: Firefox Browser */}
        {/* ================================================================= */}
        {activeWindow === 'firefox' && (
          <div
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #475569',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 10
            }}
          >
            {/* Firefox Title Bar */}
            <div
              style={{
                backgroundColor: '#1e293b',
                color: '#e2e8f0',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #334155'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={14} color="#38bdf8" />
                <span style={{ fontSize: '11.5px', fontWeight: '700' }}>Firefox Web Browser</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => setIsWindowMaximized(!isWindowMaximized)}
                  style={{ color: '#94a3b8', cursor: 'pointer' }}
                >
                  <Square size={11} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveWindow(null)}
                  style={{ color: '#94a3b8', cursor: 'pointer' }}
                >
                  <Minus size={12} />
                </button>
              </div>
            </div>

            {/* Firefox URL Bar & Navigation */}
            <div
              style={{
                backgroundColor: '#f1f5f9',
                padding: '6px 12px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <button
                type="button"
                onClick={() => handleNavigateUrl('http://horizon.quickmart.lab/dashboard')}
                title="Back to Horizon"
                style={{ color: '#475569', cursor: 'pointer' }}
              >
                <ArrowLeft size={13} />
              </button>
              <button
                type="button"
                onClick={() => handleNavigateUrl(firefoxUrl)}
                title="Reload"
                style={{ color: '#475569', cursor: 'pointer' }}
              >
                <RotateCw size={12} />
              </button>

              <form onSubmit={handleUrlSubmit} style={{ flex: 1 }}>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    backgroundColor: '#ffffff',
                    color: '#0f172a'
                  }}
                />
              </form>
            </div>

            {/* Firefox Bookmarks Toolbar */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                padding: '4px 12px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '11px'
              }}
            >
              <button
                type="button"
                onClick={() => handleNavigateUrl('http://horizon.quickmart.lab/dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#0284c7',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <Bookmark size={11} />
                <span>QuickMart Horizon</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigateUrl('http://access.quickmart.lab')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#0d9488',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <Bookmark size={11} />
                <span>Access Request Portal</span>
              </button>
            </div>

            {/* Firefox Viewport Area */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              {renderBrowserContent()}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* Window 2: Files Browser */}
        {/* ================================================================= */}
        {activeWindow === 'files' && (
          <div
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #475569',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 10
            }}
          >
            {/* Title Bar */}
            <div
              style={{
                backgroundColor: '#1e293b',
                color: '#e2e8f0',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #334155'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Folder size={14} color="#f59e0b" />
                <span style={{ fontSize: '11.5px', fontWeight: '700' }}>Files — /home/kali</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveWindow(null)}
                style={{ color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={13} />
              </button>
            </div>

            {/* Files Main Layout */}
            <div style={{ flex: 1, display: 'flex' }}>
              {/* Folder Sidebar */}
              <div style={{ width: '150px', backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '12px 8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFolder('downloads');
                    setOpenedFile(null);
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    fontSize: '11.5px',
                    fontWeight: activeFolder === 'downloads' ? '700' : '500',
                    backgroundColor: activeFolder === 'downloads' ? '#e0f2fe' : 'transparent',
                    color: activeFolder === 'downloads' ? '#0369a1' : '#334155',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Folder size={13} />
                  <span>Downloads</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFolder('documents');
                    setOpenedFile(null);
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    fontSize: '11.5px',
                    fontWeight: activeFolder === 'documents' ? '700' : '500',
                    backgroundColor: activeFolder === 'documents' ? '#e0f2fe' : 'transparent',
                    color: activeFolder === 'documents' ? '#0369a1' : '#334155',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    marginTop: '2px'
                  }}
                >
                  <Folder size={13} />
                  <span>Documents</span>
                </button>
              </div>

              {/* Folder Contents */}
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                {openedFile ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenedFile(null)}
                      style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: '700', marginBottom: '12px', cursor: 'pointer' }}
                    >
                      ← Back to {activeFolder}
                    </button>
                    {openedFile === 'qm-key.pem' && (
                      <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '16px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '11px', whiteSpace: 'pre-wrap' }}>
                        {`-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0zQ81o9xW5B+Qm2jK8+qmKeyFileQuickMart...
...[RSA 2048-bit Private Key for Trainee Cloud Engineer]...
-----END RSA PRIVATE KEY-----`}
                      </div>
                    )}
                    {openedFile === 'access-report-0912.html' && (
                      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#991b1b', marginBottom: '8px' }}>
                          QuickMart Overnight IAM Audit Report — 09:12 AM
                        </h3>
                        <p style={{ fontSize: '11.5px', color: '#64748b', marginBottom: '14px' }}>
                          Automated audit scanner detected anomalous role assignments on project <code>quickmart</code>.
                        </p>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                          <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                              <th style={{ padding: '6px 8px', textAlign: 'left' }}>User</th>
                              <th style={{ padding: '6px 8px', textAlign: 'left' }}>Project</th>
                              <th style={{ padding: '6px 8px', textAlign: 'left' }}>Current Role</th>
                              <th style={{ padding: '6px 8px', textAlign: 'left' }}>Anomaly Flag</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '6px 8px' }}>trainee</td>
                              <td style={{ padding: '6px 8px' }}>quickmart</td>
                              <td style={{ padding: '6px 8px' }}>member</td>
                              <td style={{ padding: '6px 8px', color: '#059669' }}>Normal</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '6px 8px' }}>ravi-employee</td>
                              <td style={{ padding: '6px 8px' }}>quickmart</td>
                              <td style={{ padding: '6px 8px' }}>member</td>
                              <td style={{ padding: '6px 8px', color: '#059669' }}>Normal</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#fee2e2' }}>
                              <td style={{ padding: '6px 8px', fontWeight: '700' }}>freshfarms-vendor</td>
                              <td style={{ padding: '6px 8px' }}>quickmart</td>
                              <td style={{ padding: '6px 8px', fontWeight: '800', color: '#991b1b' }}>admin</td>
                              <td style={{ padding: '6px 8px', fontWeight: '800', color: '#991b1b' }}>CRITICAL: Over-privileged vendor!</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#fef3c7' }}>
                              <td style={{ padding: '6px 8px', fontWeight: '700' }}>customer-test</td>
                              <td style={{ padding: '6px 8px' }}>quickmart</td>
                              <td style={{ padding: '6px 8px', fontWeight: '800', color: '#92400e' }}>member</td>
                              <td style={{ padding: '6px 8px', fontWeight: '800', color: '#92400e' }}>WARN: Customer has cloud role</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {activeFolder === 'downloads' && (
                      <div>
                        {simCloud.kaliFiles?.downloads?.length > 0 ? (
                          simCloud.kaliFiles.downloads.map((file) => (
                            <button
                              key={file}
                              type="button"
                              onClick={() => setOpenedFile(file)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 14px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                backgroundColor: '#f8fafc',
                                cursor: 'pointer'
                              }}
                            >
                              <FileText size={16} color="#0284c7" />
                              <span style={{ fontSize: '12px', fontWeight: '700' }}>{file}</span>
                            </button>
                          ))
                        ) : (
                          <div style={{ color: '#94a3b8', fontSize: '12px' }}>Downloads folder is empty.</div>
                        )}
                      </div>
                    )}

                    {activeFolder === 'documents' && (
                      <div>
                        {simCloud.kaliFiles?.documents?.length > 0 ? (
                          simCloud.kaliFiles.documents.map((file) => (
                            <button
                              key={file}
                              type="button"
                              onClick={() => {
                                setOpenedFile(file);
                                updateSimCloud({ reportOpened: true });
                                if (recordLabEvent) recordLabEvent('report_opened');
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 14px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                backgroundColor: '#fee2e2',
                                color: '#991b1b',
                                cursor: 'pointer'
                              }}
                            >
                              <FileText size={16} color="#dc2626" />
                              <span style={{ fontSize: '12px', fontWeight: '800' }}>{file}</span>
                            </button>
                          ))
                        ) : (
                          <div style={{ color: '#94a3b8', fontSize: '12px' }}>No documents available.</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Kali Dock */}
      <div
        style={{
          height: '42px',
          backgroundColor: '#0f172a',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '0 16px'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveWindow('firefox')}
          title="Firefox Web Browser"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            backgroundColor: activeWindow === 'firefox' ? '#334155' : 'transparent',
            color: '#38bdf8',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <Globe size={16} />
          <span>Firefox</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveWindow('files')}
          title="File Manager"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            backgroundColor: activeWindow === 'files' ? '#334155' : 'transparent',
            color: '#f59e0b',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <Folder size={16} />
          <span>Files</span>
        </button>

        {/* Disabled Terminal with tooltip */}
        <div
          title="Not needed in this module. You'll use it in the Attack phase."
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            color: '#475569',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'not-allowed',
            opacity: 0.6
          }}
        >
          <TerminalIcon size={16} />
          <span>Terminal</span>
        </div>
      </div>
    </div>
  );
};

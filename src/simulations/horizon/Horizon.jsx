/**
 * OpenStack Horizon Shell & Panel Router
 * CDAC Cloud Security Training Platform
 * Split: Navigation in HorizonNav.jsx, Wizards in HorizonModals.jsx to stay under 300 lines.
 */

// TODO: replace simulated Horizon with real Horizon

import React, { useState, useEffect } from 'react';
import { LogOut, AlertTriangle } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { evaluateDeleteAction } from './policy';
import HorizonNav from './HorizonNav';
import HorizonModals from './HorizonModals';

// Panels
import { Login } from './panels/Login';
import { Overview } from './panels/Overview';
import { Instances } from './panels/Instances';
import { Images } from './panels/Images';
import { KeyPairs } from './panels/KeyPairs';
import { Networks } from './panels/Networks';
import { Routers } from './panels/Routers';
import { SecurityGroups } from './panels/SecurityGroups';
import { FloatingIPs } from './panels/FloatingIPs';
import { Topology } from './panels/Topology';
import { Identity } from './panels/Identity';

export const Horizon = ({ onVisitIdentity403 }) => {
  const { simCloud, updateSimCloud, recordLabEvent } = useStore();

  const [currentNav, setCurrentNav] = useState('overview');
  const [modalOpen, setModalOpen] = useState(null);
  const [targetSgForRule, setTargetSgForRule] = useState(null);
  const [targetFipForAssociate, setTargetFipForAssociate] = useState(null);
  const [safeguardBanner, setSafeguardBanner] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const activeUser = simCloud?.activeHorizonUser || 'trainee';
  const userRole = simCloud?.userRoles?.[activeUser] || null;

  useEffect(() => {
    if (currentNav === 'overview' && recordLabEvent) recordLabEvent('overview_opened');
    if (currentNav === 'images' && recordLabEvent) recordLabEvent('images_opened');
    if (currentNav === 'topology' && recordLabEvent) recordLabEvent('topology_viewed');
  }, [currentNav, recordLabEvent]);

  const showToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogin = (username) => {
    updateSimCloud({ activeHorizonUser: username });
  };

  const handleLogout = () => {
    updateSimCloud({ activeHorizonUser: null });
  };

  const handleDeleteVm = (vm) => {
    const evalRes = evaluateDeleteAction(activeUser, userRole);
    if (evalRes.safeguardTriggered) {
      setSafeguardBanner(evalRes.message);
      if (recordLabEvent) recordLabEvent('vendor_delete_attempted');
      return;
    }

    if (!evalRes.allowed) {
      showToast(evalRes.message, true);
      if (activeUser === 'freshfarms-vendor' && recordLabEvent) {
        recordLabEvent('vendor_delete_denied_seen');
      }
      return;
    }

    updateSimCloud((prev) => ({
      instances: (prev.instances || []).filter((i) => i.name !== vm.name)
    }));
    showToast(`Instance '${vm.name}' deleted.`);
  };

  const handleSelectNav = (nav) => {
    if (nav === 'identity' && userRole !== 'admin') {
      showToast('HTTP 403 Forbidden: Identity management requires admin credentials.', true);
      if (activeUser === 'trainee') {
        if (recordLabEvent) recordLabEvent('identity_403_seen');
        if (onVisitIdentity403) onVisitIdentity403();
      }
      return;
    }
    setCurrentNav(nav);
  };

  if (!activeUser) {
    return <Login onLogin={handleLogin} />;
  }

  if (userRole === null || userRole === 'No access') {
    if (activeUser === 'customer-test' && recordLabEvent) {
      recordLabEvent('customer_unauthorized_seen');
    }
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '420px', backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <AlertTriangle size={36} color="#d97706" style={{ margin: '0 auto 14px' }} />
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
            You are not authorized for any projects.
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748b', marginBottom: '20px' }}>
            User <strong>{activeUser}</strong> currently holds no role assignment in the QuickMart cloud tenant.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            style={{ padding: '8px 16px', backgroundColor: '#0284c7', color: '#ffffff', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      {/* Safeguard Warning Banner */}
      {safeguardBanner && (
        <div style={{ backgroundColor: '#fffbeb', borderBottom: '1px solid #fde68a', color: '#92400e', padding: '8px 16px', fontSize: '12px', fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={15} color="#d97706" />
            <span>{safeguardBanner}</span>
          </div>
          <button type="button" onClick={() => setSafeguardBanner(null)} style={{ color: '#92400e', fontWeight: '800' }}>✕</button>
        </div>
      )}

      {/* Top Header */}
      <div style={{ height: '46px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: '900', color: '#38bdf8' }}>OpenStack</span>
          <div style={{ fontSize: '12px', padding: '3px 8px', backgroundColor: '#1e293b', borderRadius: '4px', color: '#f1f5f9' }}>
            Project: <strong>quickmart</strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px' }}>
          <span>User: <strong>{activeUser}</strong> ({userRole})</span>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign out of OpenStack Horizon"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Layout Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <HorizonNav currentNav={currentNav} onSelectNav={handleSelectNav} />

        {/* Panel Viewport */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
          {currentNav === 'overview' && <Overview simCloud={simCloud} />}
          {currentNav === 'instances' && (
            <Instances
              simCloud={simCloud}
              userRole={userRole}
              onLaunchClick={() => setModalOpen('launch_vm')}
              onDeleteVmClick={handleDeleteVm}
            />
          )}
          {currentNav === 'images' && <Images />}
          {currentNav === 'keypairs' && (
            <KeyPairs
              simCloud={simCloud}
              userRole={userRole}
              onCreateKeyClick={() => setModalOpen('create_key')}
            />
          )}
          {currentNav === 'networks' && (
            <Networks
              simCloud={simCloud}
              userRole={userRole}
              onCreateNetClick={() => setModalOpen('create_net')}
              onRecordLabEvent={recordLabEvent}
            />
          )}
          {currentNav === 'routers' && (
            <Routers
              simCloud={simCloud}
              userRole={userRole}
              onCreateRouterClick={() => setModalOpen('create_router')}
              onAddInterfaceClick={() => setModalOpen('add_interface')}
            />
          )}
          {currentNav === 'securitygroups' && (
            <SecurityGroups
              simCloud={simCloud}
              userRole={userRole}
              onCreateSgClick={() => setModalOpen('create_sg')}
              onAddRuleClick={(sg) => { setTargetSgForRule(sg); setModalOpen('add_rule'); }}
              onRecordLabEvent={recordLabEvent}
            />
          )}
          {currentNav === 'floatingips' && (
            <FloatingIPs
              simCloud={simCloud}
              userRole={userRole}
              onAllocateFipClick={() => setModalOpen('allocate_fip')}
              onAssociateFipClick={(fip) => { setTargetFipForAssociate(fip); setModalOpen('associate_fip'); }}
            />
          )}
          {currentNav === 'topology' && <Topology simCloud={simCloud} />}
          {currentNav === 'identity' && <Identity simCloud={simCloud} />}
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '16px', right: '16px', padding: '10px 16px', backgroundColor: toastMessage.isError ? '#991b1b' : '#0f172a', color: '#ffffff', borderRadius: '6px', fontSize: '12px', fontWeight: '700', zIndex: 2000 }}>
          {toastMessage.text}
        </div>
      )}

      {/* Wizards & Modals */}
      <HorizonModals
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        targetSgForRule={targetSgForRule}
        setTargetSgForRule={setTargetSgForRule}
        targetFipForAssociate={targetFipForAssociate}
        setTargetFipForAssociate={setTargetFipForAssociate}
        simCloud={simCloud}
        updateSimCloud={updateSimCloud}
        showToast={showToast}
      />
    </div>
  );
};

export default Horizon;

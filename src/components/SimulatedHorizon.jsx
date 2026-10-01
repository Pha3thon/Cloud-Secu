import React, { useState } from 'react';
import {
  Server,
  Layers,
  Shield,
  Key,
  Globe,
  Radio,
  Share2,
  HardDrive,
  Users,
  LogOut,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Info,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  X
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';

// // TODO: replace simulated Horizon with real Horizon
export const SimulatedHorizon = ({ onVisitIdentity403 }) => {
  const { simCloud, updateSimCloud, recordLabEvent } = useCourse();

  // Active Horizon view navigation
  // 'overview' | 'instances' | 'images' | 'keypairs' | 'networks' | 'routers' | 'securitygroups' | 'floatingips' | 'topology' | 'identity'
  const [currentNav, setCurrentNav] = useState('overview');

  // Fix B.3: Track view events into per-lab events
  React.useEffect(() => {
    if (currentNav === 'overview' && recordLabEvent) {
      recordLabEvent('overview_opened');
    } else if (currentNav === 'images' && recordLabEvent) {
      recordLabEvent('images_opened');
    } else if (currentNav === 'topology' && recordLabEvent) {
      recordLabEvent('topology_viewed');
    }
  }, [currentNav, recordLabEvent]);

  // Modals
  const [modalOpen, setModalOpen] = useState(null); // 'create_net' | 'create_router' | 'add_interface' | 'create_sg' | 'add_rule' | 'create_key' | 'launch_vm' | 'allocate_fip' | 'associate_fip' | 'delete_vm_confirm'
  const [selectedVmForAction, setSelectedVmForAction] = useState(null);
  const [safeguardBanner, setSafeguardBanner] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Selected item sub-views
  const [activeNetworkDetail, setActiveNetworkDetail] = useState(null); // 'qm-net'
  const [activeNetworkTab, setActiveNetworkTab] = useState('overview'); // 'overview' | 'subnets' | 'ports'
  const [activeRouterDetail, setActiveRouterDetail] = useState(null); // 'qm-router'
  const [activeRouterTab, setActiveRouterTab] = useState('interfaces');
  const [activeSgDetail, setActiveSgDetail] = useState(null); // sg object for manage rules

  // Wizard state: Create Network
  const [netWizardTab, setNetWizardTab] = useState('network'); // 'network' | 'subnet' | 'details'
  const [newNetName, setNewNetName] = useState('qm-net');
  const [newSubnetName, setNewSubnetName] = useState('qm-subnet');
  const [newNetCidr, setNewNetCidr] = useState('10.20.1.0/24');
  const [newNetGateway, setNewNetGateway] = useState('10.20.1.1');
  const [newNetDhcp, setNewNetDhcp] = useState(true);

  // Wizard state: Create Router
  const [newRouterName, setNewRouterName] = useState('qm-router');
  const [newRouterExtNet, setNewRouterExtNet] = useState('public-net');

  // Dialog state: Add Interface
  const [selectedSubnetForInterface, setSelectedSubnetForInterface] = useState('qm-subnet');

  // Dialog state: Create SG
  const [newSgName, setNewSgName] = useState('');
  const [newSgDesc, setNewSgDesc] = useState('');

  // Dialog state: Add SG Rule
  const [rulePreset, setRulePreset] = useState('HTTP');
  const [ruleDirection, setRuleDirection] = useState('ingress');
  const [rulePort, setRulePort] = useState('80');
  const [ruleRemoteType, setRuleRemoteType] = useState('CIDR'); // 'CIDR' | 'SG'
  const [ruleRemoteValue, setRuleRemoteValue] = useState('0.0.0.0/0');

  // Wizard state: Launch Instance
  const [launchTab, setLaunchTab] = useState('details'); // 'details' | 'source' | 'flavor' | 'networks' | 'securitygroups' | 'keypair'
  const [vmName, setVmName] = useState('qm-web-01');
  const [vmImage, setVmImage] = useState('ubuntu-22.04');
  const [vmFlavor, setVmFlavor] = useState('m1.small');
  const [vmAllocatedNets, setVmAllocatedNets] = useState(['qm-net']);
  const [vmAllocatedSgs, setVmAllocatedSgs] = useState(['default']); // Default is pre-allocated
  const [vmKeyName, setVmKeyName] = useState('qm-key');

  // Dialog state: Floating IP
  const [selectedFipForAssociate, setSelectedFipForAssociate] = useState('203.0.113.27');
  const [selectedPortForAssociate, setSelectedPortForAssociate] = useState('qm-web-01: 10.20.1.3');

  // Dialog state: Create Keypair
  const [newKeyName, setNewKeyName] = useState('qm-key');

  const showToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const activeUser = simCloud.activeHorizonUser || 'trainee';
  const userRole = simCloud.userRoles[activeUser] || null;

  // Handle Sign out / Sign in inside Horizon
  const [loginDomain, setLoginDomain] = useState('Default');
  const [loginUsername, setLoginUsername] = useState('trainee');
  const [loginPassword, setLoginPassword] = useState('Quick@Mart1');
  const [loginError, setLoginError] = useState('');

  const handleHorizonLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const u = loginUsername.trim().toLowerCase();
    const p = loginPassword.trim();

    if (u === 'trainee' && p === 'Quick@Mart1') {
      updateSimCloud({ activeHorizonUser: 'trainee' });
      return;
    }
    if (u === 'ravi-employee' && p === 'Welcome@123') {
      updateSimCloud({ activeHorizonUser: 'ravi-employee' });
      return;
    }
    if (u === 'freshfarms-vendor' && p === 'Welcome@123') {
      updateSimCloud({ activeHorizonUser: 'freshfarms-vendor' });
      return;
    }
    if (u === 'customer-test' && p === 'Welcome@123') {
      updateSimCloud({ activeHorizonUser: 'customer-test' });
      return;
    }

    setLoginError('Invalid credentials. Please verify Domain, Username, and Password.');
  };

  const handleHorizonLogout = () => {
    updateSimCloud({ activeHorizonUser: null });
  };

  // If user is not logged in to Horizon
  if (!activeUser) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f1f5f9',
          padding: '20px'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '380px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>OpenStack Horizon</h2>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Training Edition — QuickMart Cloud</p>
          </div>

          {loginError && (
            <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px', padding: '8px 12px', fontSize: '11px', color: '#991b1b' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleHorizonLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Domain</label>
              <input
                type="text"
                value={loginDomain}
                onChange={(e) => setLoginDomain(e.target.value)}
                style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>User Name</label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>
            <button
              type="submit"
              style={{
                marginTop: '8px',
                padding: '9px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontSize: '12.5px',
                fontWeight: '700',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If user has NO role assigned on any project
  if (userRole === null || userRole === 'No access') {
    if (activeUser === 'customer-test' && recordLabEvent) {
      recordLabEvent('customer_unauthorized_seen');
    }
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          padding: '24px',
          textAlign: 'center'
        }}
      >
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
            onClick={handleHorizonLogout}
            style={{ padding: '8px 16px', backgroundColor: '#0284c7', color: '#ffffff', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // Resource Counts & Limit Calculations
  const instancesCount = simCloud.instances.length;
  const vcpusCount = simCloud.instances.reduce((acc, vm) => acc + (vm.flavor === 'm1.medium' ? 2 : 1), 0);
  const ramGbCount = simCloud.instances.reduce((acc, vm) => acc + (vm.flavor === 'm1.medium' ? 4 : 2), 0);
  const fipsCount = simCloud.floatingIps.length;
  const sgsCount = simCloud.securityGroups.length;
  const netsCount = simCloud.networks.length;
  const routersCount = simCloud.routers.length;

  // Handlers for creating resources
  const handleSaveNetwork = () => {
    if (!newNetName || !newNetCidr) {
      showToast('Network Name and CIDR are required.', true);
      return;
    }
    const newNet = {
      name: newNetName,
      subnetName: newSubnetName,
      cidr: newNetCidr,
      gateway: newNetGateway,
      dhcp: newNetDhcp,
      allocationPoolStart: '10.20.1.2',
      allocationPoolEnd: '10.20.1.254'
    };
    updateSimCloud((prev) => ({
      networks: [...prev.networks.filter((n) => n.name !== newNetName), newNet]
    }));
    setModalOpen(null);
    showToast(`Network '${newNetName}' successfully created.`);
  };

  const handleSaveRouter = () => {
    if (!newRouterName) {
      showToast('Router Name is required.', true);
      return;
    }
    const newRouter = {
      name: newRouterName,
      externalNetwork: newRouterExtNet,
      externalIp: '203.0.113.15',
      interfaces: []
    };
    updateSimCloud((prev) => ({
      routers: [...prev.routers.filter((r) => r.name !== newRouterName), newRouter]
    }));
    setModalOpen(null);
    showToast(`Router '${newRouterName}' created with gateway on ${newRouterExtNet}.`);
  };

  const handleAddInterface = () => {
    updateSimCloud((prev) => {
      const updatedRouters = prev.routers.map((r) => {
        if (r.name === 'qm-router') {
          const currentInterfaces = r.interfaces || [];
          return {
            ...r,
            interfaces: currentInterfaces.includes('qm-subnet') ? currentInterfaces : [...currentInterfaces, 'qm-subnet']
          };
        }
        return r;
      });
      return { routers: updatedRouters };
    });
    setModalOpen(null);
    showToast("Interface attached to 'qm-router' on subnet 'qm-subnet' (10.20.1.1).");
  };

  const handleSaveSecurityGroup = () => {
    if (!newSgName) {
      showToast('Security group name is required.', true);
      return;
    }
    const newSg = {
      id: `sg-${Date.now()}`,
      name: newSgName,
      description: newSgDesc,
      rules: [
        { id: `r-${Date.now()}-egr`, direction: 'egress', rule: 'ALL', protocol: 'ALL', port: 'ALL', remote: '0.0.0.0/0' }
      ]
    };
    updateSimCloud((prev) => ({
      securityGroups: [...prev.securityGroups, newSg]
    }));
    setModalOpen(null);
    setNewSgName('');
    setNewSgDesc('');
    showToast(`Security group '${newSg.name}' created with default egress.`);
  };

  const handleAddSgRule = () => {
    if (!activeSgDetail) return;
    const rulePortNum = rulePreset === 'SSH' ? 22 : rulePreset === 'HTTP' ? 80 : rulePreset === 'HTTPS' ? 443 : rulePreset === 'MYSQL' ? 3306 : parseInt(rulePort, 10);
    const newRule = {
      id: `rule-${Date.now()}`,
      direction: ruleDirection,
      rule: rulePreset,
      protocol: 'TCP',
      port: rulePortNum,
      remote: ruleRemoteType === 'SG' ? ruleRemoteValue : ruleRemoteValue
    };

    updateSimCloud((prev) => {
      const updated = prev.securityGroups.map((sg) => {
        if (sg.id === activeSgDetail.id) {
          const curRules = sg.rules || [];
          return { ...sg, rules: [...curRules, newRule] };
        }
        return sg;
      });
      return { securityGroups: updated };
    });

    setActiveSgDetail((prev) => ({ ...prev, rules: [...(prev.rules || []), newRule] }));
    setModalOpen(null);
    showToast(`Rule for port ${rulePortNum} added to '${activeSgDetail.name}'.`);
  };

  const handleCreateKeyPair = () => {
    if (!newKeyName) {
      showToast('Key pair name is required.', true);
      return;
    }
    updateSimCloud((prev) => ({
      keyPairs: [...prev.keyPairs.filter((k) => k.name !== newKeyName), { name: newKeyName }],
      kaliFiles: {
        ...prev.kaliFiles,
        downloads: [...(prev.kaliFiles?.downloads || []).filter((f) => f !== `${newKeyName}.pem`), `${newKeyName}.pem`]
      }
    }));
    setModalOpen(null);
    showToast(`Key pair '${newKeyName}' created! Downloaded '${newKeyName}.pem' to Kali Downloads.`);
  };

  const handleLaunchInstance = () => {
    if (!vmName) {
      showToast('Instance Name is required.', true);
      return;
    }
    if (!vmAllocatedNets.includes('qm-net')) {
      showToast('You must allocate a network before launching!', true);
      return;
    }

    const assignedPrivateIp = vmName === 'qm-web-01' ? '10.20.1.3' : '10.20.1.4';
    const newVm = {
      id: `inst-${Date.now()}`,
      name: vmName,
      image: vmImage,
      flavor: vmFlavor,
      network: 'qm-net',
      privateIp: assignedPrivateIp,
      securityGroups: [...vmAllocatedSgs],
      keyName: vmKeyName,
      status: 'BUILD'
    };

    updateSimCloud((prev) => ({
      instances: [...prev.instances.filter((i) => i.name !== vmName), newVm]
    }));
    setModalOpen(null);
    showToast(`Instance '${vmName}' is launching (BUILD)...`);

    // Transition BUILD -> ACTIVE in 3 seconds
    setTimeout(() => {
      updateSimCloud((prev) => {
        const updated = prev.instances.map((vm) => {
          if (vm.name === newVm.name) {
            return { ...vm, status: 'ACTIVE' };
          }
          return vm;
        });
        return { instances: updated };
      });
      showToast(`Instance '${vmName}' is now ACTIVE at ${assignedPrivateIp}.`);
    }, 3000);
  };

  const handleAllocateFip = () => {
    updateSimCloud((prev) => {
      const existing = prev.floatingIps || [];
      if (existing.some((f) => f.ip === '203.0.113.27')) return prev;
      return {
        floatingIps: [...existing, { ip: '203.0.113.27', pool: 'public-net', instanceId: null, portIp: null }]
      };
    });
    setModalOpen(null);
    showToast('Allocated Floating IP 203.0.113.27 from pool public-net.');
  };

  const handleAssociateFip = () => {
    updateSimCloud((prev) => {
      const updated = prev.floatingIps.map((fip) => {
        if (fip.ip === selectedFipForAssociate) {
          return {
            ...fip,
            instanceId: 'qm-web-01',
            portIp: '10.20.1.3'
          };
        }
        return fip;
      });
      return { floatingIps: updated };
    });
    setModalOpen(null);
    showToast('Associated 203.0.113.27 with qm-web-01 (10.20.1.3).');
  };

  const handleDeleteVm = (vm) => {
    // If user is reader
    if (userRole === 'reader') {
      showToast("Error: Unable to delete instance. Policy doesn't allow compute:delete to be performed. (HTTP 403 Forbidden)", true);
      if (recordLabEvent) {
        recordLabEvent('vendor_delete_attempted');
        recordLabEvent('vendor_delete_denied_seen');
      }
      setModalOpen(null);
      return;
    }

    // If user is admin (e.g. freshfarms-vendor in Lab 7 Flag 2)
    if (userRole === 'admin') {
      updateSimCloud({ vendorDeleteAttempted: true });
      if (recordLabEvent) recordLabEvent('vendor_delete_attempted');
      setSafeguardBanner("Training safeguard: nothing was deleted, but this request would have been Allowed.");
      setModalOpen(null);
      return;
    }

    // Standard member delete
    updateSimCloud((prev) => ({
      instances: prev.instances.filter((i) => i.name !== vm.name)
    }));
    setModalOpen(null);
    showToast(`Instance '${vm.name}' terminated.`);
  };

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'inherit',
        overflow: 'hidden'
      }}
    >
      {/* Top Banner Safeguard if active */}
      {safeguardBanner && (
        <div
          style={{
            backgroundColor: '#fef3c7',
            borderBottom: '1px solid #fde68a',
            color: '#92400e',
            padding: '10px 16px',
            fontSize: '12px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={16} />
            <span>{safeguardBanner}</span>
          </div>
          <button type="button" onClick={() => setSafeguardBanner(null)} style={{ cursor: 'pointer', color: '#92400e' }}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Floating Toast Message */}
      {toastMessage && (
        <div
          style={{
            position: 'absolute',
            top: '55px',
            right: '20px',
            zIndex: 9999,
            backgroundColor: toastMessage.isError ? '#fee2e2' : '#ecfdf5',
            color: toastMessage.isError ? '#991b1b' : '#065f46',
            border: `1px solid ${toastMessage.isError ? '#fecaca' : '#a7f3d0'}`,
            borderRadius: '6px',
            padding: '10px 16px',
            fontSize: '12px',
            fontWeight: '700',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
          }}
        >
          {toastMessage.text}
        </div>
      )}

      {/* Top Navigation Bar */}
      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #1e293b'
        }}
      >
        {/* Project Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '13px', color: '#38bdf8' }}>
            <span>☁ OpenStack</span>
            <span style={{ fontSize: '10px', backgroundColor: '#1e293b', color: '#94a3b8', padding: '1px 6px', borderRadius: '4px' }}>Horizon</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1e293b',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'default'
            }}
          >
            <span style={{ color: '#94a3b8' }}>Project:</span>
            <strong style={{ color: '#ffffff' }}>quickmart</strong>
          </div>
        </div>

        {/* User Menu & Role */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '12px',
              backgroundColor: userRole === 'admin' ? '#fee2e2' : '#e0f2fe',
              color: userRole === 'admin' ? '#991b1b' : '#0369a1',
              fontWeight: '700'
            }}
          >
            {activeUser} ({userRole})
          </span>
          <button
            type="button"
            onClick={handleHorizonLogout}
            title="Sign out of Horizon"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: '#94a3b8',
              fontSize: '11.5px',
              cursor: 'pointer'
            }}
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Horizon Body with Left Nav & Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Sidebar Navigation */}
        <div
          style={{
            width: '210px',
            backgroundColor: '#f8fafc',
            borderRight: '1px solid #e2e8f0',
            padding: '16px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflowY: 'auto'
          }}
        >
          {/* Project > Compute */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '6px', paddingLeft: '8px' }}>
              Compute
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <button
                type="button"
                onClick={() => {
                  setCurrentNav('overview');
                  updateSimCloud({ overviewVisited: true });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: currentNav === 'overview' ? '700' : '500',
                  backgroundColor: currentNav === 'overview' ? '#e0f2fe' : 'transparent',
                  color: currentNav === 'overview' ? '#0369a1' : '#334155',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Layers size={14} />
                <span>Overview</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentNav('instances')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: currentNav === 'instances' ? '700' : '500',
                  backgroundColor: currentNav === 'instances' ? '#e0f2fe' : 'transparent',
                  color: currentNav === 'instances' ? '#0369a1' : '#334155',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Server size={14} />
                <span>Instances ({instancesCount})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentNav('images');
                  updateSimCloud({ imagesVisited: true });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: currentNav === 'images' ? '700' : '500',
                  backgroundColor: currentNav === 'images' ? '#e0f2fe' : 'transparent',
                  color: currentNav === 'images' ? '#0369a1' : '#334155',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <HardDrive size={14} />
                <span>Images</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentNav('keypairs')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: currentNav === 'keypairs' ? '700' : '500',
                  backgroundColor: currentNav === 'keypairs' ? '#e0f2fe' : 'transparent',
                  color: currentNav === 'keypairs' ? '#0369a1' : '#334155',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Key size={14} />
                <span>Key Pairs</span>
              </button>
            </div>
          </div>

          {/* Project > Network */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '6px', paddingLeft: '8px' }}>
              Network
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <button
                type="button"
                onClick={() => {
                  setCurrentNav('topology');
                  updateSimCloud({ topologyVisited: true });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: currentNav === 'topology' ? '700' : '500',
                  backgroundColor: currentNav === 'topology' ? '#e0f2fe' : 'transparent',
                  color: currentNav === 'topology' ? '#0369a1' : '#334155',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Share2 size={14} />
                <span>Network Topology</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentNav('networks')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: currentNav === 'networks' ? '700' : '500',
                  backgroundColor: currentNav === 'networks' ? '#e0f2fe' : 'transparent',
                  color: currentNav === 'networks' ? '#0369a1' : '#334155',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Radio size={14} />
                <span>Networks ({netsCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentNav('routers')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: currentNav === 'routers' ? '700' : '500',
                  backgroundColor: currentNav === 'routers' ? '#e0f2fe' : 'transparent',
                  color: currentNav === 'routers' ? '#0369a1' : '#334155',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Globe size={14} />
                <span>Routers ({routersCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentNav('securitygroups')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: currentNav === 'securitygroups' ? '700' : '500',
                  backgroundColor: currentNav === 'securitygroups' ? '#e0f2fe' : 'transparent',
                  color: currentNav === 'securitygroups' ? '#0369a1' : '#334155',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Shield size={14} />
                <span>Security Groups ({sgsCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentNav('floatingips')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: currentNav === 'floatingips' ? '700' : '500',
                  backgroundColor: currentNav === 'floatingips' ? '#e0f2fe' : 'transparent',
                  color: currentNav === 'floatingips' ? '#0369a1' : '#334155',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Radio size={14} />
                <span>Floating IPs ({fipsCount}/3)</span>
              </button>
            </div>
          </div>

          {/* Identity Panel (Admin only) */}
          {userRole === 'admin' ? (
            <div>
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#991b1b', marginBottom: '6px', paddingLeft: '8px' }}>
                Identity (Admin)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button
                  type="button"
                  onClick={() => setCurrentNav('identity')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: currentNav === 'identity' ? '700' : '500',
                    backgroundColor: currentNav === 'identity' ? '#fee2e2' : 'transparent',
                    color: currentNav === 'identity' ? '#991b1b' : '#334155',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <Users size={14} />
                  <span>Projects & Users</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ paddingLeft: '8px', marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontStyle: 'italic' }}>
                Identity panel restricted to cloud admins.
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content Pane */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
          {/* ================================================================= */}
          {/* Nav: Overview */}
          {/* ================================================================= */}
          {currentNav === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                  Limit Summary
                </h2>
                <p style={{ fontSize: '12px', color: '#64748b' }}>
                  Resource quota consumption for project <strong>quickmart</strong>.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                {[
                  { title: 'Instances', used: instancesCount, max: 10, unit: '' },
                  { title: 'VCPUs', used: vcpusCount, max: 20, unit: '' },
                  { title: 'RAM', used: ramGbCount, max: 50, unit: 'GB' },
                  { title: 'Floating IPs', used: fipsCount, max: 3, unit: '' },
                  { title: 'Security Groups', used: sgsCount, max: 10, unit: '' },
                  { title: 'Networks', used: netsCount, max: 5, unit: '' },
                  { title: 'Routers', used: routersCount, max: 5, unit: '' }
                ].map((item) => {
                  const pct = Math.min(Math.round((item.used / item.max) * 100), 100);
                  const isHigh = pct >= 80;
                  return (
                    <div
                      key={item.title}
                      style={{
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                        <span>{item.title}</span>
                        <span style={{ color: isHigh ? '#dc2626' : '#64748b' }}>
                          {item.used} of {item.max} {item.unit} Used
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${pct}%`,
                            height: '100%',
                            backgroundColor: isHigh ? '#ef4444' : '#0284c7',
                            transition: 'width 400ms ease'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Nav: Instances */}
          {/* ================================================================= */}
          {currentNav === 'instances' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Instances</h2>
                <button
                  type="button"
                  onClick={() => {
                    setLaunchTab('details');
                    setVmName(simCloud.instances.some((i) => i.name === 'qm-web-01') ? 'qm-db-01' : 'qm-web-01');
                    setVmFlavor(simCloud.instances.some((i) => i.name === 'qm-web-01') ? 'm1.medium' : 'm1.small');
                    setVmImage(simCloud.instances.some((i) => i.name === 'qm-web-01') ? 'mysql-8-server' : 'ubuntu-22.04');
                    setVmAllocatedSgs(['default']); // Default is pre-allocated in Horizon
                    setModalOpen('launch_vm');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '7px 14px',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                  <span>Launch Instance</span>
                </button>
              </div>

              <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <tr>
                      <th style={{ padding: '10px 12px' }}>Instance Name</th>
                      <th style={{ padding: '10px 12px' }}>Image</th>
                      <th style={{ padding: '10px 12px' }}>IP Address</th>
                      <th style={{ padding: '10px 12px' }}>Flavor</th>
                      <th style={{ padding: '10px 12px' }}>Status</th>
                      <th style={{ padding: '10px 12px' }}>Key Pair</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simCloud.instances.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                          No instances deployed yet. Click <strong>'Launch Instance'</strong> to begin.
                        </td>
                      </tr>
                    ) : (
                      simCloud.instances.map((vm) => {
                        const associatedFip = simCloud.floatingIps.find((f) => f.instanceId === vm.name);
                        return (
                          <tr key={vm.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '10px 12px', fontWeight: '700' }}>{vm.name}</td>
                            <td style={{ padding: '10px 12px', color: '#64748b' }}>{vm.image}</td>
                            <td style={{ padding: '10px 12px' }}>
                              <div style={{ fontFamily: 'monospace' }}>qm-net: {vm.privateIp}</div>
                              {associatedFip && (
                                <div style={{ fontFamily: 'monospace', color: '#0284c7', fontWeight: '700', fontSize: '11px' }}>
                                  Floating IP: {associatedFip.ip}
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '10px 12px' }}>{vm.flavor}</td>
                            <td style={{ padding: '10px 12px' }}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  backgroundColor: vm.status === 'ACTIVE' ? '#ecfdf5' : '#fffbeb',
                                  color: vm.status === 'ACTIVE' ? '#065f46' : '#b45309'
                                }}
                              >
                                {vm.status === 'ACTIVE' ? <CheckCircle2 size={11} /> : <div className="animate-spin">⟳</div>}
                                {vm.status}
                              </span>
                            </td>
                            <td style={{ padding: '10px 12px' }}>{vm.keyName || '-'}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedVmForAction(vm);
                                  setModalOpen('delete_vm_confirm');
                                }}
                                style={{
                                  padding: '4px 8px',
                                  backgroundColor: '#fee2e2',
                                  color: '#991b1b',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  cursor: 'pointer'
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Nav: Images */}
          {/* ================================================================= */}
          {currentNav === 'images' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Images</h2>
              <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <tr>
                      <th style={{ padding: '10px 12px' }}>Image Name</th>
                      <th style={{ padding: '10px 12px' }}>Type</th>
                      <th style={{ padding: '10px 12px' }}>Status</th>
                      <th style={{ padding: '10px 12px' }}>Visibility</th>
                      <th style={{ padding: '10px 12px' }}>Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'ubuntu-22.04', type: 'Raw / Golden', status: 'Active', vis: 'Public', size: '2.2 GB' },
                      { name: 'mysql-8-server', type: 'Database Appliance', status: 'Active', vis: 'Public', size: '3.4 GB' },
                      { name: 'cirros-0.6', type: 'Test Minimal', status: 'Active', vis: 'Public', size: '16 MB' },
                      { name: 'legacy-centos-7 (deprecated)', type: 'End-of-Life', status: 'Active', vis: 'Public', size: '1.8 GB' }
                    ].map((img) => (
                      <tr key={img.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 12px', fontWeight: '700' }}>{img.name}</td>
                        <td style={{ padding: '10px 12px', color: '#64748b' }}>{img.type}</td>
                        <td style={{ padding: '10px 12px', color: '#059669', fontWeight: '600' }}>{img.status}</td>
                        <td style={{ padding: '10px 12px' }}>{img.vis}</td>
                        <td style={{ padding: '10px 12px' }}>{img.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Nav: Key Pairs */}
          {/* ================================================================= */}
          {currentNav === 'keypairs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Key Pairs</h2>
                <button
                  type="button"
                  onClick={() => {
                    setNewKeyName('qm-key');
                    setModalOpen('create_key');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '7px 14px',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                  <span>Create Key Pair</span>
                </button>
              </div>

              <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <tr>
                      <th style={{ padding: '10px 12px' }}>Key Pair Name</th>
                      <th style={{ padding: '10px 12px' }}>Type</th>
                      <th style={{ padding: '10px 12px' }}>Fingerprint</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simCloud.keyPairs.length === 0 ? (
                      <tr>
                        <td colSpan={3} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                          No key pairs created yet. Click <strong>'Create Key Pair'</strong>.
                        </td>
                      </tr>
                    ) : (
                      simCloud.keyPairs.map((kp) => (
                        <tr key={kp.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 12px', fontWeight: '700' }}>{kp.name}</td>
                          <td style={{ padding: '10px 12px', color: '#64748b' }}>SSH (RSA 2048)</td>
                          <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#475569' }}>
                            b4:21:99:ea:7d:02:18:ff:c8:31:42:01:aa:90:54:19
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Nav: Networks */}
          {/* ================================================================= */}
          {currentNav === 'networks' && !activeNetworkDetail && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Networks</h2>
                <button
                  type="button"
                  onClick={() => {
                    setNetWizardTab('network');
                    setNewNetName('qm-net');
                    setNewSubnetName('qm-subnet');
                    setNewNetCidr('10.20.1.0/24');
                    setNewNetGateway('10.20.1.1');
                    setNewNetDhcp(true);
                    setModalOpen('create_net');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '7px 14px',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                  <span>Create Network</span>
                </button>
              </div>

              <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <tr>
                      <th style={{ padding: '10px 12px' }}>Network Name</th>
                      <th style={{ padding: '10px 12px' }}>Subnets Associated</th>
                      <th style={{ padding: '10px 12px' }}>Shared</th>
                      <th style={{ padding: '10px 12px' }}>Status</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simCloud.networks.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                          No networks created yet. Click <strong>'+ Create Network'</strong>.
                        </td>
                      </tr>
                    ) : (
                      simCloud.networks.map((net) => (
                        <tr key={net.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 12px', fontWeight: '700' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveNetworkDetail(net);
                                setActiveNetworkTab('overview');
                              }}
                              style={{ color: '#0284c7', fontWeight: '700', cursor: 'pointer' }}
                            >
                              {net.name}
                            </button>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            {net.subnetName}: {net.cidr}
                          </td>
                          <td style={{ padding: '10px 12px', color: '#64748b' }}>No</td>
                          <td style={{ padding: '10px 12px', color: '#059669', fontWeight: '700' }}>Active</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveNetworkDetail(net);
                                setActiveNetworkTab('ports');
                                updateSimCloud({ portsVisited: true });
                                if (recordLabEvent) recordLabEvent('ports_tab_viewed');
                              }}
                              style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: '#f1f5f9', color: '#0369a1', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                            >
                              View Ports
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Network Detail View */}
          {currentNav === 'networks' && activeNetworkDetail && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setActiveNetworkDetail(null)}
                  style={{ fontSize: '12px', color: '#0284c7', fontWeight: '700', cursor: 'pointer' }}
                >
                  ← Networks
                </button>
                <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Network: {activeNetworkDetail.name}</h2>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid #e2e8f0' }}>
                {['overview', 'subnets', 'ports'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveNetworkTab(tab);
                      if (tab === 'ports') {
                        updateSimCloud({ portsVisited: true });
                        if (recordLabEvent) recordLabEvent('ports_tab_viewed');
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      fontSize: '12px',
                      fontWeight: activeNetworkTab === tab ? '700' : '500',
                      borderBottom: activeNetworkTab === tab ? '2px solid #0284c7' : 'none',
                      color: activeNetworkTab === tab ? '#0284c7' : '#64748b',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab: Overview */}
              {activeNetworkTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
                  <div><strong>Name:</strong> {activeNetworkDetail.name}</div>
                  <div><strong>ID:</strong> net-9018420-qm</div>
                  <div><strong>Status:</strong> ACTIVE</div>
                  <div><strong>Admin State:</strong> UP</div>
                  <div><strong>Shared:</strong> No</div>
                  <div><strong>External:</strong> No</div>
                </div>
              )}

              {/* Tab: Subnets */}
              {activeNetworkTab === 'subnets' && (
                <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <tr>
                        <th style={{ padding: '10px 12px' }}>Name</th>
                        <th style={{ padding: '10px 12px' }}>CIDR</th>
                        <th style={{ padding: '10px 12px' }}>Gateway IP</th>
                        <th style={{ padding: '10px 12px' }}>Allocation Pools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '10px 12px', fontWeight: '700' }}>{activeNetworkDetail.subnetName}</td>
                        <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{activeNetworkDetail.cidr}</td>
                        <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{activeNetworkDetail.gateway}</td>
                        <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>
                          {activeNetworkDetail.allocationPoolStart} - {activeNetworkDetail.allocationPoolEnd}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab: Ports */}
              {activeNetworkTab === 'ports' && (
                <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <tr>
                        <th style={{ padding: '10px 12px' }}>Name / Device</th>
                        <th style={{ padding: '10px 12px' }}>Fixed IP</th>
                        <th style={{ padding: '10px 12px' }}>Device Owner</th>
                        <th style={{ padding: '10px 12px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 12px', fontWeight: '700' }}>qm-dhcp-port</td>
                        <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontWeight: '700', color: '#0284c7' }}>10.20.1.2</td>
                        <td style={{ padding: '10px 12px', color: '#64748b' }}>network:dhcp</td>
                        <td style={{ padding: '10px 12px', color: '#059669', fontWeight: '700' }}>ACTIVE</td>
                      </tr>
                      {simCloud.routers.some((r) => r.interfaces?.includes('qm-subnet')) && (
                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 12px', fontWeight: '700' }}>qm-router-gateway</td>
                          <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>10.20.1.1</td>
                          <td style={{ padding: '10px 12px', color: '#64748b' }}>network:router_interface</td>
                          <td style={{ padding: '10px 12px', color: '#059669', fontWeight: '700' }}>ACTIVE</td>
                        </tr>
                      )}
                      {simCloud.instances.map((vm) => (
                        <tr key={vm.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 12px', fontWeight: '700' }}>{vm.name} (eth0)</td>
                          <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{vm.privateIp}</td>
                          <td style={{ padding: '10px 12px', color: '#64748b' }}>compute:nova</td>
                          <td style={{ padding: '10px 12px', color: '#059669', fontWeight: '700' }}>ACTIVE</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* Nav: Routers */}
          {/* ================================================================= */}
          {currentNav === 'routers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Routers</h2>
                <button
                  type="button"
                  onClick={() => {
                    setNewRouterName('qm-router');
                    setNewRouterExtNet('public-net');
                    setModalOpen('create_router');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '7px 14px',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                  <span>Create Router</span>
                </button>
              </div>

              <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <tr>
                      <th style={{ padding: '10px 12px' }}>Router Name</th>
                      <th style={{ padding: '10px 12px' }}>External Gateway</th>
                      <th style={{ padding: '10px 12px' }}>Connected Interfaces</th>
                      <th style={{ padding: '10px 12px' }}>Status</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simCloud.routers.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                          No routers created yet. Click <strong>'+ Create Router'</strong>.
                        </td>
                      </tr>
                    ) : (
                      simCloud.routers.map((r) => (
                        <tr key={r.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 12px', fontWeight: '700' }}>{r.name}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <div>{r.externalNetwork}</div>
                            <div style={{ fontFamily: 'monospace', color: '#0284c7', fontWeight: '700', fontSize: '11px' }}>
                              IP: {r.externalIp}
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            {r.interfaces?.length > 0 ? (
                              r.interfaces.map((iface) => (
                                <span key={iface} style={{ backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>
                                  {iface} (10.20.1.1)
                                </span>
                              ))
                            ) : (
                              <span style={{ color: '#94a3b8' }}>None (Island)</span>
                            )}
                          </td>
                          <td style={{ padding: '10px 12px', color: '#059669', fontWeight: '700' }}>ACTIVE</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedSubnetForInterface('qm-subnet');
                                setModalOpen('add_interface');
                              }}
                              style={{
                                padding: '4px 10px',
                                backgroundColor: '#e0f2fe',
                                color: '#0369a1',
                                borderRadius: '4px',
                                fontSize: '11.5px',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              + Add Interface
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Nav: Network Topology */}
          {/* ================================================================= */}
          {currentNav === 'topology' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Network Topology</h2>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Interactive visual map of QuickMart's virtual infrastructure.</p>
                </div>
              </div>

              {/* Topology SVG Canvas */}
              <div
                style={{
                  width: '100%',
                  height: '360px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 700 360">
                  {/* External Network bar */}
                  <rect x="50" y="30" width="600" height="24" rx="4" fill="#0284c7" />
                  <text x="350" y="46" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">
                    public-net (External Uplink — 203.0.113.0/24)
                  </text>

                  {/* Router Node if present */}
                  {simCloud.routers.map((r) => (
                    <g key={r.name} transform="translate(300, 100)">
                      {/* Connection line from public-net */}
                      <line x1="50" y1="-46" x2="50" y2="0" stroke="#0284c7" strokeWidth="3" />
                      <rect width="100" height="48" rx="6" fill="#1e293b" />
                      <text x="50" y="22" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="800">qm-router</text>
                      <text x="50" y="38" textAnchor="middle" fill="#94a3b8" fontSize="8">GW: 203.0.113.15</text>
                    </g>
                  ))}

                  {/* Internal Subnet Bar */}
                  {simCloud.networks.map((net) => {
                    const hasRouterInterface = simCloud.routers.some((r) => r.interfaces?.includes(net.subnetName));
                    return (
                      <g key={net.name} transform="translate(50, 190)">
                        {/* Connection line from router to subnet */}
                        {hasRouterInterface && (
                          <line x1="300" y1="-42" x2="300" y2="0" stroke="#10b981" strokeWidth="3" />
                        )}
                        <rect width="600" height="24" rx="4" fill="#10b981" />
                        <text x="300" y="16" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">
                          {net.name} ({net.cidr} — Gateway: {net.gateway})
                        </text>
                      </g>
                    );
                  })}

                  {/* Instances connected to qm-net */}
                  {simCloud.instances.map((vm, idx) => {
                    const posX = 160 + idx * 240;
                    return (
                      <g key={vm.name} transform={`translate(${posX}, 260)`}>
                        <line x1="50" y1="-46" x2="50" y2="0" stroke="#10b981" strokeWidth="2.5" />
                        <rect width="100" height="55" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                        <text x="50" y="20" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700">{vm.name}</text>
                        <text x="50" y="34" textAnchor="middle" fill="#0284c7" fontSize="8.5" fontFamily="monospace">{vm.privateIp}</text>
                        <text x="50" y="47" textAnchor="middle" fill="#059669" fontSize="7.5" fontWeight="700">{vm.status}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Nav: Security Groups */}
          {/* ================================================================= */}
          {currentNav === 'securitygroups' && !activeSgDetail && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Security Groups</h2>
                <button
                  type="button"
                  onClick={() => {
                    setNewSgName('');
                    setNewSgDesc('');
                    setModalOpen('create_sg');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '7px 14px',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                  <span>Create Security Group</span>
                </button>
              </div>

              <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <tr>
                      <th style={{ padding: '10px 12px' }}>Name</th>
                      <th style={{ padding: '10px 12px' }}>Description</th>
                      <th style={{ padding: '10px 12px' }}>Rules Count</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simCloud.securityGroups.map((sg) => (
                      <tr key={sg.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 12px', fontWeight: '700' }}>{sg.name}</td>
                        <td style={{ padding: '10px 12px', color: '#64748b' }}>{sg.description || '-'}</td>
                        <td style={{ padding: '10px 12px' }}>{sg.rules?.length || 0}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveSgDetail(sg);
                              if (recordLabEvent) recordLabEvent('rules_viewed');
                            }}
                            style={{
                              padding: '4px 10px',
                              backgroundColor: '#e0f2fe',
                              color: '#0369a1',
                              borderRadius: '4px',
                              fontSize: '11.5px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            Manage Rules
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Security Group Manage Rules */}
          {currentNav === 'securitygroups' && activeSgDetail && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveSgDetail(null)}
                    style={{ fontSize: '12px', color: '#0284c7', fontWeight: '700', cursor: 'pointer' }}
                  >
                    ← Security Groups
                  </button>
                  <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Rules: {activeSgDetail.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRulePreset('HTTP');
                    setRuleDirection('ingress');
                    setRulePort('80');
                    setRuleRemoteType('CIDR');
                    setRuleRemoteValue('0.0.0.0/0');
                    setModalOpen('add_rule');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '7px 14px',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                  <span>Add Rule</span>
                </button>
              </div>

              <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <tr>
                      <th style={{ padding: '10px 12px' }}>Direction</th>
                      <th style={{ padding: '10px 12px' }}>IP Protocol</th>
                      <th style={{ padding: '10px 12px' }}>Port Range</th>
                      <th style={{ padding: '10px 12px' }}>Remote</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeSgDetail.rules || []).map((rule, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 12px', textTransform: 'capitalize', fontWeight: '700', color: rule.direction === 'ingress' ? '#0369a1' : '#059669' }}>
                          {rule.direction}
                        </td>
                        <td style={{ padding: '10px 12px' }}>{rule.protocol || 'TCP'}</td>
                        <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{rule.port}</td>
                        <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{rule.remote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Nav: Floating IPs */}
          {/* ================================================================= */}
          {currentNav === 'floatingips' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Floating IPs</h2>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Public IP allocations for ingress exposure.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAllocateFip}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '7px 14px',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                  <span>Allocate IP To Project</span>
                </button>
              </div>

              <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <tr>
                      <th style={{ padding: '10px 12px' }}>IP Address</th>
                      <th style={{ padding: '10px 12px' }}>Pool</th>
                      <th style={{ padding: '10px 12px' }}>Mapped Instance (Port)</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simCloud.floatingIps.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                          No floating IPs allocated. Click <strong>'Allocate IP To Project'</strong>.
                        </td>
                      </tr>
                    ) : (
                      simCloud.floatingIps.map((fip) => (
                        <tr key={fip.ip} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 12px', fontWeight: '700', fontFamily: 'monospace', color: '#0284c7' }}>
                            {fip.ip}
                          </td>
                          <td style={{ padding: '10px 12px' }}>{fip.pool}</td>
                          <td style={{ padding: '10px 12px' }}>
                            {fip.instanceId ? (
                              <span style={{ fontWeight: '600' }}>
                                {fip.instanceId} ({fip.portIp})
                              </span>
                            ) : (
                              <span style={{ color: '#94a3b8' }}>Not Associated</span>
                            )}
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedFipForAssociate(fip.ip);
                                setModalOpen('associate_fip');
                              }}
                              style={{
                                padding: '4px 10px',
                                backgroundColor: '#e0f2fe',
                                color: '#0369a1',
                                borderRadius: '4px',
                                fontSize: '11.5px',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              Manage Associations
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Nav: Identity (Admin Only) */}
          {/* ================================================================= */}
          {currentNav === 'identity' && userRole === 'admin' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Identity — Projects & Users</h2>
              <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <tr>
                      <th style={{ padding: '10px 12px' }}>User</th>
                      <th style={{ padding: '10px 12px' }}>Domain</th>
                      <th style={{ padding: '10px 12px' }}>Project</th>
                      <th style={{ padding: '10px 12px' }}>Assigned Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(simCloud.userRoles).map(([uname, rname]) => (
                      <tr key={uname} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 12px', fontWeight: '700' }}>{uname}</td>
                        <td style={{ padding: '10px 12px' }}>Default</td>
                        <td style={{ padding: '10px 12px' }}>quickmart</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '700',
                              backgroundColor: rname === 'admin' ? '#fee2e2' : rname === 'member' ? '#e0f2fe' : '#f1f5f9',
                              color: rname === 'admin' ? '#991b1b' : rname === 'member' ? '#0369a1' : '#334155'
                            }}
                          >
                            {rname || 'None'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Modals & Wizards */}
      {/* ========================================================================= */}

      {/* 1. Modal: Create Network */}
      {modalOpen === 'create_net' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '500px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '14px' }}>Create Network</span>
              <button type="button" onClick={() => setModalOpen(null)} style={{ color: '#ffffff' }}><X size={16} /></button>
            </div>

            {/* Wizard Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              {['network', 'subnet', 'details'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setNetWizardTab(tab)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontSize: '12px',
                    fontWeight: netWizardTab === tab ? '700' : '500',
                    borderBottom: netWizardTab === tab ? '2px solid #0284c7' : 'none',
                    color: netWizardTab === tab ? '#0284c7' : '#64748b',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {tab === 'network' ? 'Network' : tab === 'subnet' ? 'Subnet' : 'Subnet Details'}
                </button>
              ))}
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
              {netWizardTab === 'network' && (
                <div>
                  <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Network Name</label>
                  <input
                    type="text"
                    value={newNetName}
                    onChange={(e) => setNewNetName(e.target.value)}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  />
                  <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <input type="checkbox" checked={true} readOnly={true} />
                      <span>Create Subnet (checked)</span>
                    </label>
                  </div>
                </div>
              )}

              {netWizardTab === 'subnet' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Subnet Name</label>
                    <input
                      type="text"
                      value={newSubnetName}
                      onChange={(e) => setNewSubnetName(e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Network Address (CIDR)</label>
                    <input
                      type="text"
                      value={newNetCidr}
                      onChange={(e) => setNewNetCidr(e.target.value)}
                      placeholder="10.20.1.0/24"
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Gateway IP</label>
                    <input
                      type="text"
                      value={newNetGateway}
                      onChange={(e) => setNewNetGateway(e.target.value)}
                      placeholder="10.20.1.1"
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>
              )}

              {netWizardTab === 'details' && (
                <div>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={newNetDhcp}
                      onChange={(e) => setNewNetDhcp(e.target.checked)}
                    />
                    <strong>Enable DHCP</strong>
                  </label>
                  <p style={{ marginTop: '8px', color: '#64748b' }}>
                    Allocation Pool defaults automatically to 10.20.1.2 - 10.20.1.254.
                  </p>
                </div>
              )}
            </div>

            <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setModalOpen(null)} style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>Cancel</button>
              {netWizardTab !== 'details' ? (
                <button
                  type="button"
                  onClick={() => setNetWizardTab(netWizardTab === 'network' ? 'subnet' : 'details')}
                  style={{ padding: '6px 14px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '700' }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveNetwork}
                  style={{ padding: '6px 14px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '700' }}
                >
                  Create
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: Create Router */}
      {modalOpen === 'create_router' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '420px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '14px' }}>Create Router</span>
              <button type="button" onClick={() => setModalOpen(null)} style={{ color: '#ffffff' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Router Name</label>
                <input
                  type="text"
                  value={newRouterName}
                  onChange={(e) => setNewRouterName(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>External Network</label>
                <select
                  value={newRouterExtNet}
                  onChange={(e) => setNewRouterExtNet(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                >
                  <option value="public-net">public-net (203.0.113.0/24)</option>
                </select>
              </div>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setModalOpen(null)} style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>Cancel</button>
              <button type="button" onClick={handleSaveRouter} style={{ padding: '6px 14px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '700' }}>Create Router</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal: Add Interface */}
      {modalOpen === 'add_interface' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '420px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '14px' }}>Add Interface</span>
              <button type="button" onClick={() => setModalOpen(null)} style={{ color: '#ffffff' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Subnet</label>
                <select
                  value={selectedSubnetForInterface}
                  onChange={(e) => setSelectedSubnetForInterface(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                >
                  <option value="qm-subnet">qm-subnet: 10.20.1.0/24 (qm-net)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>IP Address (Optional)</label>
                <input
                  type="text"
                  placeholder="Defaults to subnet gateway: 10.20.1.1"
                  readOnly={true}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9' }}
                />
              </div>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setModalOpen(null)} style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>Cancel</button>
              <button type="button" onClick={handleAddInterface} style={{ padding: '6px 14px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '700' }}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal: Create Security Group */}
      {modalOpen === 'create_sg' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '420px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '14px' }}>Create Security Group</span>
              <button type="button" onClick={() => setModalOpen(null)} style={{ color: '#ffffff' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Name</label>
                <input
                  type="text"
                  value={newSgName}
                  onChange={(e) => setNewSgName(e.target.value)}
                  placeholder="e.g. qm-web-sg"
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Description</label>
                <input
                  type="text"
                  value={newSgDesc}
                  onChange={(e) => setNewSgDesc(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setModalOpen(null)} style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>Cancel</button>
              <button type="button" onClick={handleSaveSecurityGroup} style={{ padding: '6px 14px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '700' }}>Create Security Group</button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal: Add Security Group Rule */}
      {modalOpen === 'add_rule' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '440px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '14px' }}>Add Rule</span>
              <button type="button" onClick={() => setModalOpen(null)} style={{ color: '#ffffff' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Rule Preset</label>
                <select
                  value={rulePreset}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRulePreset(val);
                    if (val === 'SSH') setRulePort('22');
                    else if (val === 'HTTP') setRulePort('80');
                    else if (val === 'HTTPS') setRulePort('443');
                    else if (val === 'MYSQL') setRulePort('3306');
                  }}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                >
                  <option value="HTTP">HTTP (Port 80)</option>
                  <option value="HTTPS">HTTPS (Port 443)</option>
                  <option value="SSH">SSH (Port 22)</option>
                  <option value="MYSQL">MYSQL (Port 3306)</option>
                  <option value="Custom TCP">Custom TCP</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Direction</label>
                <select
                  value={ruleDirection}
                  onChange={(e) => setRuleDirection(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                >
                  <option value="ingress">Ingress</option>
                  <option value="egress">Egress</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Port</label>
                <input
                  type="text"
                  value={rulePort}
                  onChange={(e) => setRulePort(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Remote</label>
                <select
                  value={ruleRemoteType}
                  onChange={(e) => {
                    const t = e.target.value;
                    setRuleRemoteType(t);
                    setRuleRemoteValue(t === 'CIDR' ? '0.0.0.0/0' : 'qm-web-sg');
                  }}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', marginBottom: '6px' }}
                >
                  <option value="CIDR">CIDR</option>
                  <option value="SG">Security Group</option>
                </select>

                {ruleRemoteType === 'CIDR' ? (
                  <input
                    type="text"
                    value={ruleRemoteValue}
                    onChange={(e) => setRuleRemoteValue(e.target.value)}
                    placeholder="0.0.0.0/0"
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  />
                ) : (
                  <select
                    value={ruleRemoteValue}
                    onChange={(e) => setRuleRemoteValue(e.target.value)}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="qm-web-sg">qm-web-sg</option>
                    <option value="qm-db-sg">qm-db-sg</option>
                    <option value="default">default</option>
                  </select>
                )}
              </div>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setModalOpen(null)} style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>Cancel</button>
              <button type="button" onClick={handleAddSgRule} style={{ padding: '6px 14px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '700' }}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal: Create Key Pair */}
      {modalOpen === 'create_key' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '420px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '14px' }}>Create Key Pair</span>
              <button type="button" onClick={() => setModalOpen(null)} style={{ color: '#ffffff' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Key Pair Name</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="qm-key"
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <p style={{ color: '#d97706', fontSize: '11.5px', fontWeight: '600' }}>
                Note: The private key will be downloaded to your workstation once. It cannot be viewed again.
              </p>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setModalOpen(null)} style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>Cancel</button>
              <button type="button" onClick={handleCreateKeyPair} style={{ padding: '6px 14px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '700' }}>Create Key Pair</button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Modal: Launch Instance Wizard */}
      {modalOpen === 'launch_vm' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '640px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '14px' }}>Launch Instance</span>
              <button type="button" onClick={() => setModalOpen(null)} style={{ color: '#ffffff' }}><X size={16} /></button>
            </div>

            {/* Launch Instance Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', overflowX: 'auto' }}>
              {['details', 'source', 'flavor', 'networks', 'securitygroups', 'keypair'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setLaunchTab(tab)}
                  style={{
                    padding: '8px 14px',
                    fontSize: '11.5px',
                    fontWeight: launchTab === tab ? '700' : '500',
                    borderBottom: launchTab === tab ? '2px solid #0284c7' : 'none',
                    color: launchTab === tab ? '#0284c7' : '#64748b',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab === 'securitygroups' ? 'Security Groups' : tab === 'keypair' ? 'Key Pair' : tab}
                </button>
              ))}
            </div>

            <div style={{ padding: '20px', minHeight: '220px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
              {/* Tab 1: Details */}
              {launchTab === 'details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Instance Name</label>
                    <input
                      type="text"
                      value={vmName}
                      onChange={(e) => setVmName(e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Count</label>
                    <input type="number" value={1} readOnly={true} style={{ width: '120px', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9' }} />
                  </div>
                </div>
              )}

              {/* Tab 2: Source */}
              {launchTab === 'source' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div><strong>Select Boot Source:</strong> Image</div>
                    <div><strong>Create New Volume:</strong> No</div>
                  </div>
                  <div style={{ borderRadius: '6px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                      <thead style={{ backgroundColor: '#f8fafc' }}>
                        <tr>
                          <th style={{ padding: '6px 10px', textAlign: 'left' }}>Image Name</th>
                          <th style={{ padding: '6px 10px', textAlign: 'right' }}>Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {['ubuntu-22.04', 'mysql-8-server', 'cirros-0.6'].map((img) => (
                          <tr key={img} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: vmImage === img ? '#e0f2fe' : 'transparent' }}>
                            <td style={{ padding: '6px 10px', fontWeight: vmImage === img ? '700' : '500' }}>{img}</td>
                            <td style={{ padding: '6px 10px', textAlign: 'right' }}>
                              <button
                                type="button"
                                onClick={() => setVmImage(img)}
                                style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: vmImage === img ? '#0284c7' : '#f1f5f9', color: vmImage === img ? '#ffffff' : '#334155', fontWeight: '700' }}
                              >
                                {vmImage === img ? 'Allocated ↑' : 'Allocate ↑'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: Flavor */}
              {launchTab === 'flavor' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ borderRadius: '6px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                      <thead style={{ backgroundColor: '#f8fafc' }}>
                        <tr>
                          <th style={{ padding: '6px 10px', textAlign: 'left' }}>Flavor</th>
                          <th style={{ padding: '6px 10px' }}>VCPUs</th>
                          <th style={{ padding: '6px 10px' }}>RAM</th>
                          <th style={{ padding: '6px 10px' }}>Disk</th>
                          <th style={{ padding: '6px 10px', textAlign: 'right' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'm1.tiny', cpu: 1, ram: '512 MB', disk: '1 GB' },
                          { name: 'm1.small', cpu: 1, ram: '2 GB', disk: '20 GB' },
                          { name: 'm1.medium', cpu: 2, ram: '4 GB', disk: '40 GB' },
                          { name: 'm1.large', cpu: 4, ram: '8 GB', disk: '80 GB' }
                        ].map((fl) => (
                          <tr key={fl.name} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: vmFlavor === fl.name ? '#e0f2fe' : 'transparent' }}>
                            <td style={{ padding: '6px 10px', fontWeight: vmFlavor === fl.name ? '700' : '500' }}>{fl.name}</td>
                            <td style={{ padding: '6px 10px', textAlign: 'center' }}>{fl.cpu}</td>
                            <td style={{ padding: '6px 10px', textAlign: 'center' }}>{fl.ram}</td>
                            <td style={{ padding: '6px 10px', textAlign: 'center' }}>{fl.disk}</td>
                            <td style={{ padding: '6px 10px', textAlign: 'right' }}>
                              <button
                                type="button"
                                onClick={() => setVmFlavor(fl.name)}
                                style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: vmFlavor === fl.name ? '#0284c7' : '#f1f5f9', color: vmFlavor === fl.name ? '#ffffff' : '#334155', fontWeight: '700' }}
                              >
                                {vmFlavor === fl.name ? 'Allocated ↑' : 'Allocate ↑'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 4: Networks */}
              {launchTab === 'networks' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ color: '#475569' }}>Allocated Networks for this instance:</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '4px', backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: '700' }}>
                      qm-net (Allocated)
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 5: Security Groups */}
              {launchTab === 'securitygroups' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ color: '#b45309', fontWeight: '600', fontSize: '11.5px' }}>
                    Important: Default is pre-allocated. Click 'Remove ↓' to decouple default, and 'Allocate ↑' to assign your custom group.
                  </p>
                  <div style={{ borderRadius: '6px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                      <thead style={{ backgroundColor: '#f8fafc' }}>
                        <tr>
                          <th style={{ padding: '6px 10px', textAlign: 'left' }}>Security Group</th>
                          <th style={{ padding: '6px 10px' }}>Status</th>
                          <th style={{ padding: '6px 10px', textAlign: 'right' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {['default', 'qm-web-sg', 'qm-db-sg'].map((sgName) => {
                          const isAllocated = vmAllocatedSgs.includes(sgName);
                          return (
                            <tr key={sgName} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '6px 10px', fontWeight: isAllocated ? '700' : '500' }}>{sgName}</td>
                              <td style={{ padding: '6px 10px', color: isAllocated ? '#0284c7' : '#94a3b8' }}>
                                {isAllocated ? 'Allocated' : 'Available'}
                              </td>
                              <td style={{ padding: '6px 10px', textAlign: 'right' }}>
                                {isAllocated ? (
                                  <button
                                    type="button"
                                    onClick={() => setVmAllocatedSgs(vmAllocatedSgs.filter((s) => s !== sgName))}
                                    style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#fee2e2', color: '#991b1b', fontWeight: '700' }}
                                  >
                                    Remove ↓
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setVmAllocatedSgs([...vmAllocatedSgs, sgName])}
                                    style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: '700' }}
                                  >
                                    Allocate ↑
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 6: Key Pair */}
              {launchTab === 'keypair' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'block', fontWeight: '700' }}>Select Key Pair:</label>
                  <select
                    value={vmKeyName}
                    onChange={(e) => setVmKeyName(e.target.value)}
                    style={{ width: '220px', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="qm-key">qm-key</option>
                  </select>
                </div>
              )}
            </div>

            <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setModalOpen(null)} style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>Cancel</button>
              <button
                type="button"
                onClick={handleLaunchInstance}
                style={{ padding: '6px 18px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '700' }}
              >
                Launch Instance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Modal: Associate Floating IP */}
      {modalOpen === 'associate_fip' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '440px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '14px' }}>Manage Floating IP Associations</span>
              <button type="button" onClick={() => setModalOpen(null)} style={{ color: '#ffffff' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>IP Address</label>
                <input type="text" value={selectedFipForAssociate} readOnly={true} style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px' }}>Port to be associated</label>
                <select
                  value={selectedPortForAssociate}
                  onChange={(e) => setSelectedPortForAssociate(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                >
                  <option value="qm-web-01: 10.20.1.3">qm-web-01: 10.20.1.3</option>
                  <option value="qm-db-01: 10.20.1.4">qm-db-01: 10.20.1.4 (NOT RECOMMENDED!)</option>
                </select>
              </div>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setModalOpen(null)} style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>Cancel</button>
              <button type="button" onClick={handleAssociateFip} style={{ padding: '6px 14px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '700' }}>Associate</button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Modal: Delete VM Confirmation */}
      {modalOpen === 'delete_vm_confirm' && selectedVmForAction && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '420px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#991b1b', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '14px' }}>Confirm Delete Instance</span>
              <button type="button" onClick={() => setModalOpen(null)} style={{ color: '#ffffff' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
              <p>Are you sure you want to delete instance <strong>{selectedVmForAction.name}</strong>?</p>
              <p style={{ color: '#64748b', fontSize: '11.5px' }}>This action will release virtual hardware allocations and purge ephemeral storage.</p>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setModalOpen(null)} style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>Cancel</button>
              <button
                type="button"
                onClick={() => handleDeleteVm(selectedVmForAction)}
                style={{ padding: '6px 14px', borderRadius: '4px', backgroundColor: '#dc2626', color: '#ffffff', fontWeight: '700' }}
              >
                Delete Instance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { M4_TOPICS } from '../data/m4Content';
import { LABS } from '../data/labsRegistry';

const CourseContext = createContext(null);

const STORAGE_KEY = 'cdac_cloudsec_state_v3';
const ADMIN_CONTENT_KEY = 'cdac_admin_content_v3';

const INITIAL_SIMULATED_CLOUD = {
  // Horizon logged in user: 'trainee' | 'ravi-employee' | 'freshfarms-vendor' | 'customer-test' | null
  activeHorizonUser: 'trainee',
  overviewVisited: false,
  imagesVisited: false,
  portsVisited: false,
  topologyVisited: false,
  identityVisitedAsTrainee: false,
  vendorDeleteAttempted: false,
  reportOpened: false,
  timeSkipTriggered: false, // 9:12 AM event in Lab 7

  // OpenStack Resources
  networks: [], // e.g. { name: 'qm-net', subnetName: 'qm-subnet', cidr: '10.20.1.0/24', gateway: '10.20.1.1', dhcp: true }
  routers: [], // e.g. { name: 'qm-router', externalNetwork: 'public-net', externalIp: '203.0.113.15', interfaces: ['qm-subnet'] }
  securityGroups: [
    {
      id: 'sg-default',
      name: 'default',
      description: 'Default security group',
      rules: [
        { id: 'r-def-1', direction: 'ingress', rule: 'ALL', protocol: 'ALL', port: 'ALL', remote: 'default' },
        { id: 'r-def-2', direction: 'egress', rule: 'ALL', protocol: 'ALL', port: 'ALL', remote: '0.0.0.0/0' }
      ]
    }
  ],
  keyPairs: [], // e.g. [{ name: 'qm-key' }]
  instances: [], // e.g. [{ name: 'qm-web-01', image: 'ubuntu-22.04', flavor: 'm1.small', network: 'qm-net', privateIp: '10.20.1.3', securityGroups: ['qm-web-sg'], keyName: 'qm-key', status: 'ACTIVE' }]
  floatingIps: [], // e.g. [{ ip: '203.0.113.27', pool: 'public-net', instanceId: 'qm-web-01', portIp: '10.20.1.3' }]

  // User Personas & Keystone role assignments
  userRoles: {
    'trainee': 'member',
    'ravi-employee': null,
    'freshfarms-vendor': null,
    'customer-test': null
  },

  // Access Request Portal Requests
  accessRequests: [],

  // Kali Workstation Files
  kaliFiles: {
    downloads: [], // e.g. ['qm-key.pem']
    documents: []  // e.g. ['access-report-0912.html']
  },

  // Browser visit history
  browserVisitedUrls: []
};

const INITIAL_STATE = {
  user: null, // { username: 'student', name: 'Trainee Cloud Engineer', role: 'student' | 'admin' }
  completedModules: [],
  unlockedModules: ['m4'], // M4 is available demo
  currentView: 'login', // 'login' | 'dashboard' | 'curriculum' | 'module-m4' | 'admin-dashboard'

  // M4 Learning Path & Gating
  m4State: {
    currentTopicIndex: 0, // 0 to 6
    currentItemType: 'slide', // 'slide' | 'briefing' | 'lab' - FIX 1: always opens on slide 1.1
    currentSlideIndex: 0, // index inside current topic slides
    furthestTopicIndex: 0,
    furthestItemType: 'slide',
    furthestSlideIndex: 0,
    completedItemIds: [], // ['1.1', '1.2', ..., 't1-briefing', 'lab1', '2.1', ...]
    passedLabIds: [], // ['lab1', 'lab2', ...]
    labSessionRunning: false,
    labElapsedSeconds: 0,
    labActiveFlag: 1, // 1, 2, or 3
    labCompletedFlags: {}, // { 'lab1': [1, 2, 3], ... }
    labAnswers: {} // { 'flag-1-1': 'quickmart', ... }
  },

  // Fix B.3: Per-lab viewed events: { lab1: [], lab2: [], ..., lab7: [] }
  labEvents: {
    lab1: [],
    lab2: [],
    lab3: [],
    lab4: [],
    lab5: [],
    lab6: [],
    lab7: []
  },

  // Lab snapshot store per lab: { [labId]: snapshotOfSimCloud }
  labSnapshots: {},
  labEndSnapshots: {},

  // Simulated Cloud Environment
  simCloud: INITIAL_SIMULATED_CLOUD
};

export const CourseProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.unlockedModules?.includes('m4')) {
          parsed.unlockedModules = ['m4', ...(parsed.unlockedModules || [])];
        }
        if (!parsed.labEvents) {
          parsed.labEvents = { lab1: [], lab2: [], lab3: [], lab4: [], lab5: [], lab6: [], lab7: [] };
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
    return INITIAL_STATE;
  });

  // Admin Custom Content state for editable modules
  // // TODO: replace with real CMS API
  const [customContent, setCustomContent] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_CONTENT_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load admin content from localStorage', e);
    }
    return {};
  });

  // Preview as Student overrides
  const [previewUnlockAll, setPreviewUnlockAll] = useState(false);

  // Global Toast Notifications
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg, duration = 3500) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, duration);
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [state]);

  // Sync custom content to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_CONTENT_KEY, JSON.stringify(customContent));
    } catch (e) {
      console.error('Failed to save admin content to localStorage', e);
    }
  }, [customContent]);

  // Lab Timer
  useEffect(() => {
    let interval = null;
    if (state.m4State?.labSessionRunning) {
      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          m4State: {
            ...prev.m4State,
            labElapsedSeconds: (prev.m4State.labElapsedSeconds || 0) + 1
          }
        }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.m4State?.labSessionRunning]);

  // =========================================================================
  // Auth Functions
  // =========================================================================
  // // TODO: connect real backend authentication
  const login = (username, password) => {
    const trimmedUser = (username || '').trim().toLowerCase();
    const trimmedPass = (password || '').trim();

    if (trimmedUser === 'admin' && (trimmedPass === 'admin@cdac' || trimmedPass === 'admin')) {
      const adminObj = {
        username: 'admin',
        name: 'CDAC Administrator',
        role: 'admin',
        avatar: 'AD'
      };
      setState((prev) => ({
        ...prev,
        user: adminObj,
        currentView: 'admin-dashboard'
      }));
      return { success: true, role: 'admin' };
    }

    const studentObj = {
      username: username.trim() || 'student',
      name: 'Trainee Cloud Engineer',
      role: 'student',
      avatar: 'TR'
    };
    setState((prev) => ({
      ...prev,
      user: studentObj,
      currentView: 'dashboard'
    }));
    return { success: true, role: 'student' };
  };

  const logout = () => {
    setState((prev) => ({
      ...prev,
      user: null,
      currentView: 'login'
    }));
  };

  const navigateTo = (view) => {
    setState((prev) => ({
      ...prev,
      currentView: view
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // Navigation & Completed-Only Progression
  // =========================================================================
  const getItemRank = (topicIndex, itemType, slideIndex = 0) => {
    const topic = M4_TOPICS[topicIndex];
    const slideCount = topic?.slides?.length || 1;
    if (itemType === 'slide') {
      return slideIndex;
    }
    if (itemType === 'briefing') {
      return slideCount; // directly after the last slide of this topic
    }
    if (itemType === 'lab') {
      return slideCount + 1; // directly after briefing
    }
    return 0;
  };

  const isItemCompleted = (itemId) => {
    if (previewUnlockAll) return true;
    if (state.m4State.completedItemIds.includes(itemId)) return true;
    if (itemId.startsWith('lab')) {
      const normalized = itemId.replace('-', '');
      const alt = itemId.includes('-') ? itemId : `lab-${itemId.replace('lab', '')}`;
      return state.m4State.passedLabIds.includes(normalized) || state.m4State.passedLabIds.includes(alt);
    }
    return false;
  };

  // FIX (Diag 6): Sidebar lock state was previously calculated from stale or separate state; now derived purely from central store m4State (furthestTopicIndex, furthestItemType, furthestSlideIndex).
  const isItemLocked = (topicIndex, itemType, slideIndex = 0) => {
    if (previewUnlockAll) return false;
    const { furthestTopicIndex, furthestItemType, furthestSlideIndex } = state.m4State;
    if (topicIndex < furthestTopicIndex) return false;
    if (topicIndex > furthestTopicIndex) return true;

    // Within same topic
    const curRank = getItemRank(topicIndex, itemType, slideIndex);
    const furRank = getItemRank(furthestTopicIndex, furthestItemType, furthestSlideIndex);

    return curRank > furRank;
  };

  const navigateToM4Item = (topicIndex, itemType, slideIndex = 0) => {
    setState((prev) => {
      const cur = prev.m4State;
      let newCompleted = [...cur.completedItemIds];

      // Mark current item completed as it is viewed
      let currentKey = '';
      if (itemType === 'briefing') {
        currentKey = `t${topicIndex + 1}-briefing`;
      } else if (itemType === 'slide') {
        const slide = M4_TOPICS[topicIndex]?.slides[slideIndex];
        if (slide) currentKey = slide.id;
      }

      if (currentKey && !newCompleted.includes(currentKey)) {
        newCompleted.push(currentKey);
      }

      // Calculate new furthest reached point
      let newFurthestTopic = cur.furthestTopicIndex;
      let newFurthestItemType = cur.furthestItemType;
      let newFurthestSlide = cur.furthestSlideIndex;

      const curRank = getItemRank(topicIndex, itemType, slideIndex);
      const furRank = getItemRank(cur.furthestTopicIndex, cur.furthestItemType, cur.furthestSlideIndex);

      if (topicIndex > cur.furthestTopicIndex) {
        newFurthestTopic = topicIndex;
        newFurthestItemType = itemType;
        newFurthestSlide = slideIndex;
      } else if (topicIndex === cur.furthestTopicIndex) {
        if (curRank > furRank) {
          newFurthestItemType = itemType;
          newFurthestSlide = slideIndex;
        }
      }

      // FIX (Diag 4): labSnapshots was previously overwritten on every open or at app start; now captured only on first open from state left by previous lab.
      const labKey = `lab${topicIndex + 1}`;
      let updatedSnapshots = { ...(prev.labSnapshots || {}) };
      if (itemType === 'lab' && !updatedSnapshots[labKey]) {
        updatedSnapshots[labKey] = JSON.parse(JSON.stringify(prev.simCloud));
        updatedSnapshots[`lab-${topicIndex + 1}`] = JSON.parse(JSON.stringify(prev.simCloud));
      }

      return {
        ...prev,
        labSnapshots: updatedSnapshots,
        m4State: {
          ...cur,
          currentTopicIndex: topicIndex,
          currentItemType: itemType,
          currentSlideIndex: slideIndex,
          furthestTopicIndex: newFurthestTopic,
          furthestItemType: newFurthestItemType,
          furthestSlideIndex: newFurthestSlide,
          completedItemIds: newCompleted
        }
      };
    });
  };

  // FIX (Diag 5): Viewed checks previously read global flags that leaked from Lab 1; now tracked in isolated per-lab event sets labEvents[labId].
  const recordLabEvent = (eventName, labIdOverride) => {
    setState((prev) => {
      const currentTopicNum = (prev.m4State?.currentTopicIndex ?? 0) + 1;
      const labId = (labIdOverride || `lab${currentTopicNum}`).replace('-', '');
      const prevLabEvents = prev.labEvents?.[labId] || [];
      if (prevLabEvents.includes(eventName)) return prev;
      return {
        ...prev,
        labEvents: {
          ...(prev.labEvents || {}),
          [labId]: [...prevLabEvents, eventName],
          [`lab-${currentTopicNum}`]: [...prevLabEvents, eventName]
        }
      };
    });
  };

  const returnToFurthestPoint = () => {
    setState((prev) => ({
      ...prev,
      m4State: {
        ...prev.m4State,
        currentTopicIndex: prev.m4State.furthestTopicIndex,
        currentItemType: prev.m4State.furthestItemType,
        currentSlideIndex: prev.m4State.furthestSlideIndex
      }
    }));
  };

  // Lab Lifecycle
  const startLabSession = () => {
    setState((prev) => ({
      ...prev,
      m4State: {
        ...prev.m4State,
        labSessionRunning: true
      }
    }));
  };

  const pauseLabSession = () => {
    setState((prev) => ({
      ...prev,
      m4State: {
        ...prev.m4State,
        labSessionRunning: false
      }
    }));
  };

  // Fix A.1, Fix B.3 & Revision 2: Reset Lab atomic action (replaces simulation state + flag state together)
  const resetCurrentLab = (targetLabKey) => {
    const currentTopicNum = state.m4State.currentTopicIndex + 1;
    const labId = (targetLabKey || `lab${currentTopicNum}`).replace('-', '');
    const topicNum = parseInt(labId.replace('lab', ''), 10);
    const isPassed = state.m4State.passedLabIds.includes(labId) || state.m4State.passedLabIds.includes(`lab-${topicNum}`);

    setState((prev) => {
      // 1. Determine snapshot to restore
      let snapshotToRestore = prev.labSnapshots?.[labId] || prev.labSnapshots?.[`lab-${topicNum}`];
      if (isPassed && (prev.labEndSnapshots?.[labId] || prev.labEndSnapshots?.[`lab-${topicNum}`])) {
        snapshotToRestore = prev.labEndSnapshots[labId] || prev.labEndSnapshots[`lab-${topicNum}`];
      }
      if (!snapshotToRestore) {
        snapshotToRestore = INITIAL_SIMULATED_CLOUD;
      }
      const restoredCloud = JSON.parse(JSON.stringify(snapshotToRestore));

      // Specific cleanup for Lab 7 if not in review mode
      if (labId === 'lab7' && !isPassed) {
        restoredCloud.timeSkipTriggered = false;
        restoredCloud.reportOpened = false;
        restoredCloud.identityVisitedAsTrainee = false;
        restoredCloud.vendorDeleteAttempted = false;
        restoredCloud.accessRequests = [];
        restoredCloud.userRoles = {
          'trainee': 'member',
          'ravi-employee': null,
          'freshfarms-vendor': null,
          'customer-test': null
        };
        if (restoredCloud.kaliFiles?.documents) {
          restoredCloud.kaliFiles.documents = restoredCloud.kaliFiles.documents.filter(
            (d) => d !== 'access-report-0912.html'
          );
        }
      }

      // Fix B.3: RESET_LAB clears that lab's set
      const newLabEvents = { ...(prev.labEvents || {}) };
      newLabEvents[labId] = [];
      newLabEvents[`lab-${topicNum}`] = [];

      // 2. Flags and answers for this lab
      const newCompletedFlags = { ...prev.m4State.labCompletedFlags };
      const newAnswers = { ...prev.m4State.labAnswers };

      if (!isPassed) {
        newCompletedFlags[labId] = [];
        newCompletedFlags[`lab-${topicNum}`] = [];
        delete newAnswers[`flag-${topicNum}-1`];
        delete newAnswers[`flag-${topicNum}-2`];
        delete newAnswers[`flag-${topicNum}-3`];
      }

      // 3. Keep completedItemIds consistent
      let newCompletedItems = [...prev.m4State.completedItemIds];
      if (!isPassed) {
        newCompletedItems = newCompletedItems.filter((id) => id !== labId && id !== `lab-${topicNum}`);
      }

      return {
        ...prev,
        labEvents: newLabEvents,
        m4State: {
          ...prev.m4State,
          labActiveFlag: isPassed ? 3 : 1,
          labElapsedSeconds: 0,
          labCompletedFlags: newCompletedFlags,
          labAnswers: newAnswers,
          completedItemIds: newCompletedItems
        },
        simCloud: restoredCloud
      };
    });
  };

  // Course Reset option
  const resetCourse = () => {
    setState((prev) => ({
      ...prev,
      completedModules: [],
      unlockedModules: ['m4'],
      currentView: 'curriculum',
      m4State: {
        currentTopicIndex: 0,
        currentItemType: 'slide',
        currentSlideIndex: 0,
        furthestTopicIndex: 0,
        furthestItemType: 'slide',
        furthestSlideIndex: 0,
        completedItemIds: [],
        passedLabIds: [],
        labSessionRunning: false,
        labElapsedSeconds: 0,
        labActiveFlag: 1,
        labCompletedFlags: {},
        labAnswers: {}
      },
      labEvents: {
        lab1: [],
        lab2: [],
        lab3: [],
        lab4: [],
        lab5: [],
        lab6: [],
        lab7: []
      },
      labSnapshots: {},
      labEndSnapshots: {},
      simCloud: JSON.parse(JSON.stringify(INITIAL_SIMULATED_CLOUD))
    }));
  };

  // =========================================================================
  // Fix A.1 & Fix B.4: Validation Engine & Answer Submission
  // Driven strictly by single LABS registry and per-lab events
  // =========================================================================
  const checkMyConfiguration = (topicNumberOrLabId, flagNumber) => {
    try {
      const labId = typeof topicNumberOrLabId === 'string' && topicNumberOrLabId.startsWith('lab')
        ? topicNumberOrLabId.replace('-', '')
        : `lab${topicNumberOrLabId}`;
      const labDef = LABS[labId];
      if (!labDef) {
        return { success: false, message: `Lab definition '${labId}' not found.` };
      }
      const flagDef = labDef.flags?.[flagNumber - 1];
      if (!flagDef) {
        return { success: false, message: `Flag ${flagNumber} not found for ${labId}.` };
      }
      const currentLabEvents = state.labEvents?.[labId] || [];
      const result = flagDef.check(state.simCloud, currentLabEvents);
      if (result.pass) {
        return { success: true, message: 'Configuration verified! Answer the question below.' };
      }
      const failMessage = result.failures && result.failures.length > 0
        ? result.failures.join(' ')
        : 'Configuration check failed. Check your settings and try again.';
      return { success: false, message: failMessage };
    } catch (err) {
      return { success: false, message: `Check error: ${err.message}` };
    }
  };

  // Fix A.2: Single atomic completion action
  const completeLab = (targetLabId) => {
    const currentTopicNum = state.m4State.currentTopicIndex + 1;
    const labId = (targetLabId || `lab${currentTopicNum}`).replace('-', '');
    const topicNum = parseInt(labId.replace('lab', ''), 10);
    const topicIndex = topicNum - 1;
    const isLab7 = labId === 'lab7' || topicNum === 7;

    setState((prev) => {
      // 1. Mark lab completed in passedLabIds
      const newPassedLabs = prev.m4State.passedLabIds.includes(labId)
        ? prev.m4State.passedLabIds
        : [...prev.m4State.passedLabIds, labId, `lab-${topicNum}`];

      // 2. Mark lab and topic completed in completedItemIds
      const newCompletedItems = [...prev.m4State.completedItemIds];
      if (!newCompletedItems.includes(labId)) newCompletedItems.push(labId);
      if (!newCompletedItems.includes(`lab-${topicNum}`)) newCompletedItems.push(`lab-${topicNum}`);
      if (!newCompletedItems.includes(`topic-${topicNum}`)) newCompletedItems.push(`topic-${topicNum}`);

      // 3. Advance furthestReached to next topic's first slide (x.1)
      let nextFurthestTopic = prev.m4State.furthestTopicIndex;
      let nextFurthestItemType = prev.m4State.furthestItemType;
      let nextFurthestSlideIndex = prev.m4State.furthestSlideIndex;

      if (!isLab7) {
        const nextTopicIndex = topicIndex + 1;
        if (nextTopicIndex > nextFurthestTopic) {
          nextFurthestTopic = nextTopicIndex;
          nextFurthestItemType = 'slide';
          nextFurthestSlideIndex = 0;
        }
      } else {
        nextFurthestTopic = 6;
        nextFurthestItemType = 'lab';
        nextFurthestSlideIndex = 0;
      }

      // 4. For Lab 7, mark M4 Completed and M5 Unlocked
      const newCompletedModules = [...prev.completedModules];
      const newUnlockedModules = [...prev.unlockedModules];
      if (isLab7) {
        if (!newCompletedModules.includes('m4')) newCompletedModules.push('m4');
        if (!newUnlockedModules.includes('m5')) newUnlockedModules.push('m5');
      }

      // 5. Capture snapshots for state continuity
      const updatedEndSnapshots = { ...(prev.labEndSnapshots || {}) };
      const updatedStartSnapshots = { ...(prev.labSnapshots || {}) };
      updatedEndSnapshots[labId] = JSON.parse(JSON.stringify(prev.simCloud));
      updatedEndSnapshots[`lab-${topicNum}`] = JSON.parse(JSON.stringify(prev.simCloud));

      if (!isLab7) {
        const nextLabKey = `lab${topicNum + 1}`;
        if (!updatedStartSnapshots[nextLabKey]) {
          updatedStartSnapshots[nextLabKey] = JSON.parse(JSON.stringify(prev.simCloud));
        }
      }

      const updatedLabFlags = {
        ...prev.m4State.labCompletedFlags,
        [labId]: [1, 2, 3],
        [`lab-${topicNum}`]: [1, 2, 3]
      };

      return {
        ...prev,
        completedModules: newCompletedModules,
        unlockedModules: newUnlockedModules,
        labSnapshots: updatedStartSnapshots,
        labEndSnapshots: updatedEndSnapshots,
        m4State: {
          ...prev.m4State,
          passedLabIds: newPassedLabs,
          completedItemIds: newCompletedItems,
          furthestTopicIndex: nextFurthestTopic,
          furthestItemType: nextFurthestItemType,
          furthestSlideIndex: nextFurthestSlideIndex,
          labCompletedFlags: updatedLabFlags
        }
      };
    });
  };

  // FIX (Diag 1): Passing Flag 3 previously only collapsed the flag UI without dispatching a central completion action or unlocking the next topic; now atomically calls completeLab(labId).
  const submitLabAnswer = (topicNumberOrLabId, flagNumber, inputAnswer) => {
    const labId = typeof topicNumberOrLabId === 'string' && topicNumberOrLabId.startsWith('lab')
      ? topicNumberOrLabId.replace('-', '')
      : `lab${topicNumberOrLabId}`;
    const topicNum = parseInt(labId.replace('lab', ''), 10);
    const labDef = LABS[labId];
    if (!labDef) return { success: false, message: `Lab '${labId}' not found.` };
    const flagDef = labDef.flags?.[flagNumber - 1];
    if (!flagDef) return { success: false, message: `Flag ${flagNumber} not found.` };

    const cleanInput = (inputAnswer || '').trim().toLowerCase();
    const validAnswers = [...(flagDef.answers || []), ...(flagDef.altAnswers || [])];

    // Dynamic state-dependent values
    if (labId === 'lab5' && flagNumber === 1) {
      const web = state.simCloud.instances?.find((i) => i.name === 'qm-web-01');
      if (web?.privateIp) validAnswers.push(web.privateIp, `${web.privateIp}/24`);
    }
    if (labId === 'lab5' && flagNumber === 2) {
      const db = state.simCloud.instances?.find((i) => i.name === 'qm-db-01');
      if (db?.privateIp) validAnswers.push(db.privateIp, `${db.privateIp}/24`);
    }
    if (labId === 'lab6' && flagNumber === 1) {
      const fip = state.simCloud.floatingIps?.[0];
      if (fip?.ip) validAnswers.push(fip.ip, `${fip.ip}/24`);
    }

    const isCorrect = validAnswers.some(
      (valid) => String(valid).toLowerCase().trim() === cleanInput
    );

    if (!isCorrect) {
      return {
        success: false,
        message: 'Not quite — check your configuration and try again.'
      };
    }

    const flagKey = `flag-${topicNum}-${flagNumber}`;

    // Lab 7 9:12 AM time-skip after Flag 1
    if (labId === 'lab7' && flagNumber === 1 && !state.simCloud.timeSkipTriggered) {
      setState((prev) => ({
        ...prev,
        simCloud: {
          ...prev.simCloud,
          timeSkipTriggered: true,
          userRoles: {
            ...prev.simCloud.userRoles,
            'freshfarms-vendor': 'admin',
            'customer-test': 'member'
          },
          kaliFiles: {
            ...prev.simCloud.kaliFiles,
            documents: ['access-report-0912.html']
          }
        }
      }));
    }

    // Update completed flags
    const currentCompleted = state.m4State.labCompletedFlags[labId] || [];
    const updatedFlags = currentCompleted.includes(flagNumber)
      ? currentCompleted
      : [...currentCompleted, flagNumber];

    setState((prev) => ({
      ...prev,
      m4State: {
        ...prev.m4State,
        labCompletedFlags: {
          ...prev.m4State.labCompletedFlags,
          [labId]: updatedFlags,
          [`lab-${topicNum}`]: updatedFlags
        },
        labAnswers: {
          ...prev.m4State.labAnswers,
          [flagKey]: inputAnswer.trim()
        }
      }
    }));

    if (updatedFlags.length >= 3) {
      completeLab(labId);
    }

    return { success: true };
  };

  // Fix C: Dev helper for Preview as Student
  // // DEV ONLY: remove before production
  const autoCompleteCurrentLab = (labIdOverride) => {
    const currentTopicNum = state.m4State.currentTopicIndex + 1;
    const labId = (labIdOverride || `lab${currentTopicNum}`).replace('-', '');
    const topicNum = parseInt(labId.replace('lab', ''), 10);

    setState((prev) => {
      let cloud = JSON.parse(JSON.stringify(prev.simCloud));
      let events = [...(prev.labEvents?.[labId] || [])];

      if (labId === 'lab1') {
        cloud.activeHorizonUser = 'trainee';
        events.push('overview_opened', 'images_opened');
      } else if (labId === 'lab2') {
        if (!cloud.networks.some((n) => n.name === 'qm-net')) {
          cloud.networks.push({
            name: 'qm-net',
            subnetName: 'qm-subnet',
            cidr: '10.20.1.0/24',
            gateway: '10.20.1.1',
            dhcp: true
          });
        }
        events.push('ports_tab_viewed', 'overview_opened');
      } else if (labId === 'lab3') {
        if (!cloud.routers.some((r) => r.name === 'qm-router')) {
          cloud.routers.push({
            name: 'qm-router',
            externalNetwork: 'public-net',
            externalIp: '203.0.113.15',
            interfaces: ['qm-subnet']
          });
        }
        events.push('topology_viewed');
      } else if (labId === 'lab4') {
        if (!cloud.securityGroups.some((s) => s.name === 'qm-web-sg')) {
          cloud.securityGroups.push({
            id: 'sg-qm-web',
            name: 'qm-web-sg',
            description: 'QuickMart Web Security Group',
            rules: [
              { id: 'r1', direction: 'ingress', protocol: 'tcp', port: '22', remote: '0.0.0.0/0' },
              { id: 'r2', direction: 'ingress', protocol: 'tcp', port: '80', remote: '0.0.0.0/0' },
              { id: 'r3', direction: 'ingress', protocol: 'tcp', port: '443', remote: '0.0.0.0/0' },
              { id: 'r4', direction: 'egress', protocol: 'ALL', port: 'ALL', remote: '0.0.0.0/0' }
            ]
          });
        }
        if (!cloud.securityGroups.some((s) => s.name === 'qm-db-sg')) {
          cloud.securityGroups.push({
            id: 'sg-qm-db',
            name: 'qm-db-sg',
            description: 'QuickMart DB Security Group',
            rules: [
              { id: 'r5', direction: 'ingress', protocol: 'tcp', port: '3306', remote: 'qm-web-sg' },
              { id: 'r6', direction: 'ingress', protocol: 'tcp', port: '22', remote: 'qm-web-sg' },
              { id: 'r7', direction: 'egress', protocol: 'ALL', port: 'ALL', remote: '0.0.0.0/0' }
            ]
          });
        }
        events.push('rules_viewed');
      } else if (labId === 'lab5') {
        if (!cloud.keyPairs.some((k) => k.name === 'qm-key')) {
          cloud.keyPairs.push({ name: 'qm-key' });
        }
        if (!cloud.instances.some((i) => i.name === 'qm-web-01')) {
          cloud.instances.push({
            name: 'qm-web-01',
            image: 'ubuntu-22.04',
            flavor: 'm1.small',
            network: 'qm-net',
            privateIp: '10.20.1.3',
            securityGroups: ['qm-web-sg'],
            keyName: 'qm-key',
            status: 'ACTIVE'
          });
        }
        if (!cloud.instances.some((i) => i.name === 'qm-db-01')) {
          cloud.instances.push({
            name: 'qm-db-01',
            image: 'mysql-8-server',
            flavor: 'm1.medium',
            network: 'qm-net',
            privateIp: '10.20.1.4',
            securityGroups: ['qm-db-sg'],
            keyName: 'qm-key',
            status: 'ACTIVE'
          });
        }
        events.push('overview_opened');
      } else if (labId === 'lab6') {
        if (!cloud.floatingIps.some((f) => f.ip === '203.0.113.27')) {
          cloud.floatingIps = [
            { ip: '203.0.113.27', pool: 'public-net', instanceId: 'qm-web-01', portIp: '10.20.1.3' }
          ];
        }
        cloud.browserVisitedUrls = [
          'http://203.0.113.27',
          'http://203.0.113.27/status',
          'http://203.0.113.27:3306',
          'http://10.20.1.4'
        ];
        events.push(
          'overview_opened',
          'url:http://203.0.113.27',
          'url:http://203.0.113.27/status',
          'url:http://203.0.113.27:3306',
          'url:http://10.20.1.4'
        );
      } else if (labId === 'lab7') {
        cloud.timeSkipTriggered = true;
        cloud.reportOpened = true;
        cloud.identityVisitedAsTrainee = true;
        cloud.vendorDeleteAttempted = true;
        cloud.accessRequests = [
          { id: '1', user: 'ravi-employee', requestedRole: 'member', status: 'Approved' },
          { id: '2', user: 'freshfarms-vendor', requestedRole: 'reader', status: 'Approved' },
          { id: '3', user: 'customer-test', requestedRole: 'No access', status: 'Approved' }
        ];
        cloud.userRoles = {
          'trainee': 'member',
          'ravi-employee': 'member',
          'freshfarms-vendor': 'reader',
          'customer-test': null
        };
        events.push(
          'report_opened',
          'identity_403_seen',
          'vendor_delete_attempted',
          'vendor_delete_denied_seen',
          'customer_unauthorized_seen'
        );
      }

      const newLabEvents = {
        ...(prev.labEvents || {}),
        [labId]: events,
        [`lab-${topicNum}`]: events
      };

      return {
        ...prev,
        simCloud: cloud,
        labEvents: newLabEvents
      };
    });

    completeLab(labId);
  };

  const completeM4Module = () => {
    setState((prev) => ({
      ...prev,
      completedModules: prev.completedModules.includes('m4')
        ? prev.completedModules
        : [...prev.completedModules, 'm4'],
      unlockedModules: prev.unlockedModules.includes('m5')
        ? prev.unlockedModules
        : [...prev.unlockedModules, 'm5']
    }));
  };

  // =========================================================================
  // Simulated Cloud Mutation Helpers (for Horizon & Kali)
  // =========================================================================
  const updateSimCloud = (patchOrUpdater) => {
    setState((prev) => {
      const nextCloud = typeof patchOrUpdater === 'function' ? patchOrUpdater(prev.simCloud) : { ...prev.simCloud, ...patchOrUpdater };
      return {
        ...prev,
        simCloud: nextCloud
      };
    });
  };

  // Admin Module Content Persistence
  // // TODO: replace with real CMS API
  const saveAdminContent = (moduleId, content) => {
    setCustomContent((prev) => ({
      ...prev,
      [moduleId]: {
        ...content,
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  const getModuleTopics = (moduleId = 'm4') => {
    if (customContent[moduleId]?.topics) {
      return customContent[moduleId].topics;
    }
    return M4_TOPICS;
  };

  return (
    <CourseContext.Provider
      value={{
        ...state,
        LABS,
        customContent,
        previewUnlockAll,
        setPreviewUnlockAll,
        login,
        logout,
        navigateTo,
        isItemCompleted,
        isItemLocked,
        navigateToM4Item,
        returnToFurthestPoint,
        startLabSession,
        pauseLabSession,
        resetCurrentLab,
        checkMyConfiguration,
        submitLabAnswer,
        completeLab,
        recordLabEvent,
        autoCompleteCurrentLab,
        completeM4Module,
        updateSimCloud,
        toastMessage,
        showToast,
        resetCourse,
        saveAdminContent,
        getModuleTopics
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

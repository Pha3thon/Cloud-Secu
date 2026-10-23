/**
 * Central State Store & Persistence Layer
 * CDAC Cloud Security Training Platform
 * Split note: Complex state transitions and auto-completion logic are modularized in
 * storeReducers.js and labValidationBridge.js to keep store.js clean and under 300 lines.
 */

import React, { createContext, useEffect, useCallback, useState } from 'react';
import { safeGet, safeSet } from '@/utils/storage';
import { M4_TOPICS } from '@/content/m4';
import { M1_TOPICS } from '@/content/m1';
import { M0_TOPICS } from '@/content/m0';
import { LABS } from '@/labs/registry';
import { INITIAL_AUTH_STATE } from './authSlice';
import { INITIAL_PROGRESS_STATE } from './progressSlice';
import { INITIAL_SIMULATED_CLOUD } from './simSlice';
import { INITIAL_LAB_STATE } from './labSlice';
import { validateConfiguration, processLabAnswer } from './labValidationBridge';
import {
  handleNavigateM4Item,
  handleNavigateM1Item,
  handleCompleteLabState,
  handleResetCurrentLabState,
  handleAnswerSubmittedState,
  handleAutoCompleteState
} from './storeReducers';

const STORAGE_KEY = 'cdac_cloudsec_store_v4';
const CUSTOM_CONTENT_KEY = 'cdac_custom_module_content_v4';

export const StoreContext = createContext(null);

const getInitialState = () => {
  const persisted = safeGet(STORAGE_KEY, null);
  if (persisted && typeof persisted === 'object') {
    return {
      user: persisted.user ?? INITIAL_AUTH_STATE.user,
      currentView: persisted.user?.role === 'admin' ? 'admin' : (persisted.currentView ?? 'dashboard'),
      unlockedModules: persisted.unlockedModules ?? INITIAL_PROGRESS_STATE.unlockedModules,
      completedModules: persisted.completedModules ?? INITIAL_PROGRESS_STATE.completedModules,
      m1State: {
        ...INITIAL_PROGRESS_STATE.m1State,
        ...INITIAL_LAB_STATE,
        ...(persisted.m1State || {})
      },
      m4State: {
        ...INITIAL_PROGRESS_STATE.m4State,
        ...INITIAL_LAB_STATE,
        ...(persisted.m4State || {})
      },
      simCloud: persisted.simCloud ?? JSON.parse(JSON.stringify(INITIAL_SIMULATED_CLOUD)),
      labEvents: persisted.labEvents ?? { lab1: [], lab2: [], lab3: [], lab4: [], lab5: [], lab6: [], lab7: [] },
      labSnapshots: persisted.labSnapshots ?? {},
      labEndSnapshots: persisted.labEndSnapshots ?? {}
    };
  }
  return {
    ...INITIAL_AUTH_STATE,
    ...INITIAL_PROGRESS_STATE,
    ...INITIAL_LAB_STATE,
    simCloud: JSON.parse(JSON.stringify(INITIAL_SIMULATED_CLOUD)),
    labEvents: { lab1: [], lab2: [], lab3: [], lab4: [], lab5: [], lab6: [], lab7: [] },
    labSnapshots: {},
    labEndSnapshots: {}
  };
};

export const StoreProvider = ({ children }) => {
  const [state, setState] = useState(getInitialState);
  const [toastMessage, setToastMessage] = useState(null);
  const [previewUnlockAll, setPreviewUnlockAll] = useState(false);
  const [customContent, setCustomContent] = useState(() => safeGet(CUSTOM_CONTENT_KEY, {}));

  useEffect(() => {
    safeSet(STORAGE_KEY, state);
  }, [state]);

  useEffect(() => {
    safeSet(CUSTOM_CONTENT_KEY, customContent);
  }, [customContent]);

  // Lab timer
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

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const login = useCallback((username, password) => {
    if (username === 'admin' && password === 'admin@cdac') {
      const adminUser = { username: 'admin', name: 'Dr. Aris Thorne', role: 'admin', avatar: 'AT' };
      setState((prev) => ({ ...prev, user: adminUser, currentView: 'admin' }));
      return { success: true };
    }
    if (username === 'student' && password === 'cloudsec123') {
      const studentUser = { username: 'student', name: 'Aarav Patel', role: 'student', avatar: 'AP' };
      setState((prev) => ({ ...prev, user: studentUser, currentView: 'dashboard' }));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials.' };
  }, []);

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, user: null, currentView: 'login' }));
  }, []);

  const navigateTo = useCallback((view) => {
    setState((prev) => ({ ...prev, currentView: view }));
  }, []);

  const getTopics = useCallback((moduleId = 'm4') => {
    if (moduleId === 'm0') {
      return M0_TOPICS;
    }
    if (moduleId === 'm1') {
      return customContent['m1']?.topics?.length > 0 ? customContent['m1'].topics : M1_TOPICS;
    }
    if (customContent[moduleId]?.topics?.length > 0) {
      return customContent[moduleId].topics;
    }
    return M4_TOPICS;
  }, [customContent]);

  const isItemCompleted = useCallback((itemId, moduleId = 'm4') => {
    const targetState = moduleId === 'm1' ? state.m1State : state.m4State;
    return targetState?.completedItemIds?.includes(itemId) || false;
  }, [state.m1State?.completedItemIds, state.m4State?.completedItemIds]);

  const isItemLocked = useCallback((topicIndex, itemType, slideIndex = 0, moduleId = 'm4') => {
    if (state.user?.role === 'admin' || previewUnlockAll) return false;
    const targetState = moduleId === 'm1' ? (state.m1State || {}) : state.m4State;
    const { furthestTopicIndex = 0, furthestItemType = 'slide', furthestSlideIndex = 0 } = targetState;
    if (topicIndex < furthestTopicIndex) return false;
    if (topicIndex > furthestTopicIndex) return true;
    if (furthestItemType === 'lab') return false;
    if (itemType === 'slide') {
      if (furthestItemType === 'briefing') return false;
      return slideIndex > furthestSlideIndex;
    }
    if (itemType === 'briefing') return furthestItemType !== 'briefing' && furthestItemType !== 'lab';
    if (itemType === 'lab') return furthestItemType !== 'lab';
    return false;
  }, [state.user?.role, previewUnlockAll, state.m1State, state.m4State]);

  const completeM0Module = useCallback(() => {
    setState((prev) => {
      const newCompleted = prev.completedModules.includes('m0')
        ? prev.completedModules
        : [...prev.completedModules, 'm0'];
      const newUnlocked = prev.unlockedModules.includes('m1')
        ? prev.unlockedModules
        : [...prev.unlockedModules, 'm1'];
      return {
        ...prev,
        completedModules: newCompleted,
        unlockedModules: newUnlocked
      };
    });
  }, []);

  const navigateToM1Item = useCallback((topicIndex, itemType, slideIndex = 0) => {
    setState((prev) => handleNavigateM1Item(prev, topicIndex, itemType, slideIndex, getTopics('m1')));
  }, [getTopics]);

  const returnToFurthestPointM1 = useCallback(() => {
    setState((prev) => ({
      ...prev,
      m1State: {
        ...prev.m1State,
        currentTopicIndex: prev.m1State.furthestTopicIndex,
        currentItemType: prev.m1State.furthestItemType,
        currentSlideIndex: prev.m1State.furthestSlideIndex
      }
    }));
  }, []);

  const completeM1Module = useCallback(() => {
    setState((prev) => {
      const newCompleted = prev.completedModules.includes('m1')
        ? prev.completedModules
        : [...prev.completedModules, 'm1'];
      const newUnlocked = prev.unlockedModules.includes('m2')
        ? prev.unlockedModules
        : [...prev.unlockedModules, 'm2'];
      return {
        ...prev,
        completedModules: newCompleted,
        unlockedModules: newUnlocked
      };
    });
  }, []);

  const navigateToM4Item = useCallback((topicIndex, itemType, slideIndex = 0) => {
    setState((prev) => handleNavigateM4Item(prev, topicIndex, itemType, slideIndex, getTopics('m4')));
  }, [getTopics]);

  const returnToFurthestPoint = useCallback(() => {
    setState((prev) => ({
      ...prev,
      m4State: {
        ...prev.m4State,
        currentTopicIndex: prev.m4State.furthestTopicIndex,
        currentItemType: prev.m4State.furthestItemType,
        currentSlideIndex: prev.m4State.furthestSlideIndex
      }
    }));
  }, []);

  const recordLabEvent = useCallback((eventName, labIdOverride) => {
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
  }, []);

  const startLabSession = useCallback(() => {
    setState((prev) => ({ ...prev, m4State: { ...prev.m4State, labSessionRunning: true } }));
  }, []);

  const pauseLabSession = useCallback(() => {
    setState((prev) => ({ ...prev, m4State: { ...prev.m4State, labSessionRunning: false } }));
  }, []);

  const completeLab = useCallback((targetLabId) => {
    const currentTopicNum = state.m4State.currentTopicIndex + 1;
    const labId = (targetLabId || `lab${currentTopicNum}`).replace('-', '');
    const topicNum = parseInt(labId.replace('lab', ''), 10);
    const isLab7 = labId === 'lab7' || topicNum === 7;

    setState((prev) => handleCompleteLabState(prev, labId, topicNum, isLab7));
  }, [state.m4State.currentTopicIndex]);

  const resetCurrentLab = useCallback((targetLabKey) => {
    const currentTopicNum = state.m4State.currentTopicIndex + 1;
    const labId = (targetLabKey || `lab${currentTopicNum}`).replace('-', '');
    const topicNum = parseInt(labId.replace('lab', ''), 10);
    const isPassed = state.m4State.passedLabIds.includes(labId) || state.m4State.passedLabIds.includes(`lab-${topicNum}`);

    setState((prev) => handleResetCurrentLabState(prev, labId, topicNum, isPassed));
  }, [state.m4State.currentTopicIndex, state.m4State.passedLabIds]);

  const resetCourse = useCallback(() => {
    setState((prev) => ({
      ...prev,
      completedModules: [],
      unlockedModules: ['m0', 'm4'],
      currentView: 'curriculum',
      m4State: { ...INITIAL_PROGRESS_STATE.m4State, ...INITIAL_LAB_STATE },
      labEvents: { lab1: [], lab2: [], lab3: [], lab4: [], lab5: [], lab6: [], lab7: [] },
      labSnapshots: {},
      labEndSnapshots: {},
      simCloud: JSON.parse(JSON.stringify(INITIAL_SIMULATED_CLOUD))
    }));
  }, []);

  const checkMyConfiguration = useCallback((topicNumberOrLabId, flagNumber) => {
    return validateConfiguration(LABS, state.simCloud, state.labEvents, topicNumberOrLabId, flagNumber);
  }, [state.labEvents, state.simCloud]);

  const submitLabAnswer = useCallback((topicNumberOrLabId, flagNumber, inputAnswer) => {
    const res = processLabAnswer(LABS, state, topicNumberOrLabId, flagNumber, inputAnswer);
    if (!res.success) return res;

    const { labId, topicNum } = res;
    setState((prev) => handleAnswerSubmittedState(prev, labId, topicNum, flagNumber, inputAnswer));

    const currentCompleted = state.m4State.labCompletedFlags[labId] || [];
    const updatedFlags = currentCompleted.includes(flagNumber) ? currentCompleted : [...currentCompleted, flagNumber];
    if (updatedFlags.length >= 3) completeLab(labId);

    return { success: true };
  }, [state, completeLab]);

  const autoCompleteCurrentLab = useCallback((labIdOverride) => {
    const currentTopicNum = state.m4State.currentTopicIndex + 1;
    const labId = (labIdOverride || `lab${currentTopicNum}`).replace('-', '');
    setState((prev) => handleAutoCompleteState(prev, labId));
    completeLab(labId);
  }, [state.m4State.currentTopicIndex, completeLab]);

  const updateSimCloud = useCallback((updater) => {
    setState((prev) => ({
      ...prev,
      simCloud: typeof updater === 'function' ? updater(prev.simCloud) : { ...prev.simCloud, ...updater }
    }));
  }, []);

  const completeM4Module = useCallback(() => {
    completeLab('lab7');
  }, [completeLab]);

  const saveAdminContent = useCallback((moduleId, content) => {
    setCustomContent((prev) => ({
      ...prev,
      [moduleId]: { ...content, lastUpdated: new Date().toISOString() }
    }));
  }, []);

  return React.createElement(
    StoreContext.Provider,
    {
      value: {
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
        completeM0Module,
        navigateToM1Item,
        returnToFurthestPointM1,
        completeM1Module,
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
        getModuleTopics: getTopics
      }
    },
    children
  );
};

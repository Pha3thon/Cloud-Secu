/**
 * Lab Slice
 * Manages per-lab flags, events, snapshots, session timer, and atomic lab reset/completion.
 */

import { INITIAL_SIMULATED_CLOUD } from './simSlice';
import { getInitialVirtualFilesystem } from '@/simulations/terminal/virtualFilesystem';

export const INITIAL_LAB_STATE = {
  labSessionRunning: false,
  labElapsedSeconds: 0,
  labActiveFlag: 1,
  labCompletedFlags: {},
  labAnswers: {},
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
  labEndSnapshots: {}
};

export const labReducer = (state, action) => {
  switch (action.type) {
    case 'LAB/START_SESSION': {
      return {
        ...state,
        m4State: {
          ...state.m4State,
          labSessionRunning: true
        }
      };
    }

    case 'LAB/PAUSE_SESSION': {
      return {
        ...state,
        m4State: {
          ...state.m4State,
          labSessionRunning: false
        }
      };
    }

    case 'LAB/TICK_TIMER': {
      if (!state.m4State?.labSessionRunning) return state;
      return {
        ...state,
        m4State: {
          ...state.m4State,
          labElapsedSeconds: (state.m4State.labElapsedSeconds || 0) + 1
        }
      };
    }

    case 'LAB/RECORD_EVENT': {
      const { eventName, labIdOverride } = action.payload;
      const currentTopicNum = (state.m4State?.currentTopicIndex ?? 0) + 1;
      const labId = (labIdOverride || `lab${currentTopicNum}`).replace('-', '');
      const prevLabEvents = state.labEvents?.[labId] || [];
      if (prevLabEvents.includes(eventName)) return state;

      return {
        ...state,
        labEvents: {
          ...(state.labEvents || {}),
          [labId]: [...prevLabEvents, eventName],
          [`lab-${currentTopicNum}`]: [...prevLabEvents, eventName]
        }
      };
    }

    case 'LAB/RESET_LAB': {
      const { targetLabKey } = action.payload || {};
      const currentTopicNum = state.m4State.currentTopicIndex + 1;
      const labId = (targetLabKey || `lab${currentTopicNum}`).replace('-', '');
      const topicNum = parseInt(labId.replace('lab', ''), 10);
      const isPassed = state.m4State.passedLabIds.includes(labId) || state.m4State.passedLabIds.includes(`lab-${topicNum}`);

      let snapshotToRestore = state.labSnapshots?.[labId] || state.labSnapshots?.[`lab-${topicNum}`];
      if (isPassed && (state.labEndSnapshots?.[labId] || state.labEndSnapshots?.[`lab-${topicNum}`])) {
        snapshotToRestore = state.labEndSnapshots[labId] || state.labEndSnapshots[`lab-${topicNum}`];
      }
      if (!snapshotToRestore) {
        snapshotToRestore = INITIAL_SIMULATED_CLOUD;
      }
      const restoredCloud = JSON.parse(JSON.stringify(snapshotToRestore));
      if (!isPassed) {
        restoredCloud.terminalVfs = getInitialVirtualFilesystem(labId);
      }

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

      const newLabEvents = { ...(state.labEvents || {}) };
      newLabEvents[labId] = [];
      newLabEvents[`lab-${topicNum}`] = [];

      const newCompletedFlags = { ...state.m4State.labCompletedFlags };
      const newAnswers = { ...state.m4State.labAnswers };

      if (!isPassed) {
        newCompletedFlags[labId] = [];
        newCompletedFlags[`lab-${topicNum}`] = [];
        delete newAnswers[`flag-${topicNum}-1`];
        delete newAnswers[`flag-${topicNum}-2`];
        delete newAnswers[`flag-${topicNum}-3`];
      }

      let newCompletedItems = [...state.m4State.completedItemIds];
      if (!isPassed) {
        newCompletedItems = newCompletedItems.filter((id) => id !== labId && id !== `lab-${topicNum}`);
      }

      return {
        ...state,
        labEvents: newLabEvents,
        m4State: {
          ...state.m4State,
          labActiveFlag: isPassed ? 3 : 1,
          labElapsedSeconds: 0,
          labCompletedFlags: newCompletedFlags,
          labAnswers: newAnswers,
          completedItemIds: newCompletedItems
        },
        simCloud: restoredCloud
      };
    }

    case 'LAB/COMPLETE_LAB': {
      const { targetLabId } = action.payload || {};
      const currentTopicNum = state.m4State.currentTopicIndex + 1;
      const labId = (targetLabId || `lab${currentTopicNum}`).replace('-', '');
      const topicNum = parseInt(labId.replace('lab', ''), 10);
      const topicIndex = topicNum - 1;
      const isLab7 = labId === 'lab7' || topicNum === 7;

      const newPassedLabs = state.m4State.passedLabIds.includes(labId)
        ? state.m4State.passedLabIds
        : [...state.m4State.passedLabIds, labId, `lab-${topicNum}`];

      const newCompletedItems = [...state.m4State.completedItemIds];
      if (!newCompletedItems.includes(labId)) newCompletedItems.push(labId);
      if (!newCompletedItems.includes(`lab-${topicNum}`)) newCompletedItems.push(`lab-${topicNum}`);
      if (!newCompletedItems.includes(`topic-${topicNum}`)) newCompletedItems.push(`topic-${topicNum}`);

      let nextFurthestTopic = state.m4State.furthestTopicIndex;
      let nextFurthestItemType = state.m4State.furthestItemType;
      let nextFurthestSlideIndex = state.m4State.furthestSlideIndex;

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

      const newCompletedModules = [...state.completedModules];
      const newUnlockedModules = [...state.unlockedModules];
      if (isLab7) {
        if (!newCompletedModules.includes('m4')) newCompletedModules.push('m4');
        if (!newUnlockedModules.includes('m5')) newUnlockedModules.push('m5');
      }

      const updatedEndSnapshots = { ...(state.labEndSnapshots || {}) };
      const updatedStartSnapshots = { ...(state.labSnapshots || {}) };
      updatedEndSnapshots[labId] = JSON.parse(JSON.stringify(state.simCloud));
      updatedEndSnapshots[`lab-${topicNum}`] = JSON.parse(JSON.stringify(state.simCloud));

      if (!isLab7) {
        const nextLabKey = `lab${topicNum + 1}`;
        if (!updatedStartSnapshots[nextLabKey]) {
          updatedStartSnapshots[nextLabKey] = JSON.parse(JSON.stringify(state.simCloud));
        }
      }

      const updatedLabFlags = {
        ...state.m4State.labCompletedFlags,
        [labId]: [1, 2, 3],
        [`lab-${topicNum}`]: [1, 2, 3]
      };

      return {
        ...state,
        completedModules: newCompletedModules,
        unlockedModules: newUnlockedModules,
        labSnapshots: updatedStartSnapshots,
        labEndSnapshots: updatedEndSnapshots,
        m4State: {
          ...state.m4State,
          passedLabIds: newPassedLabs,
          completedItemIds: newCompletedItems,
          furthestTopicIndex: nextFurthestTopic,
          furthestItemType: nextFurthestItemType,
          furthestSlideIndex: nextFurthestSlideIndex,
          labCompletedFlags: updatedLabFlags
        }
      };
    }

    default:
      return state;
  }
};

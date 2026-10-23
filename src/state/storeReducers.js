/**
 * Pure state transition functions for course navigation, lab resets, completions, and auto-complete.
 * Split note: Extracted from store.js to keep both store.js and reducer helpers well under 300 lines.
 */

import { INITIAL_SIMULATED_CLOUD } from './simSlice';
import { generateAutoCompleteCloud } from './labValidationBridge';
import { getInitialVirtualFilesystem } from '@/simulations/terminal/virtualFilesystem';

export function handleNavigateM4Item(prev, topicIndex, itemType, slideIndex, topics) {
  const cur = prev.m4State;
  let newCompleted = [...cur.completedItemIds];
  if (cur.currentItemType === 'slide' && topics[cur.currentTopicIndex]?.slides?.[cur.currentSlideIndex]) {
    const prevSlideId = topics[cur.currentTopicIndex].slides[cur.currentSlideIndex].id;
    if (!newCompleted.includes(prevSlideId)) newCompleted.push(prevSlideId);
  }
  if (cur.currentItemType === 'briefing' && !newCompleted.includes(`t${cur.currentTopicIndex + 1}-briefing`)) {
    newCompleted.push(`t${cur.currentTopicIndex + 1}-briefing`);
  }

  let newFurthestTopic = Math.max(cur.furthestTopicIndex, topicIndex);
  let newFurthestItemType = cur.furthestItemType;
  let newFurthestSlide = cur.furthestSlideIndex;

  if (topicIndex > cur.furthestTopicIndex) {
    newFurthestTopic = topicIndex;
    newFurthestItemType = itemType;
    newFurthestSlide = slideIndex;
  } else if (topicIndex === cur.furthestTopicIndex) {
    const curRank = itemType === 'slide' ? slideIndex : (itemType === 'briefing' ? (topics[topicIndex]?.slides?.length || 1) : 99);
    const furRank = cur.furthestItemType === 'slide' ? cur.furthestSlideIndex : (cur.furthestItemType === 'briefing' ? (topics[topicIndex]?.slides?.length || 1) : 99);
    if (curRank > furRank) {
      newFurthestItemType = itemType;
      newFurthestSlide = slideIndex;
    }
  }

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
}

export function handleNavigateM1Item(prev, topicIndex, itemType, slideIndex, topics) {
  const cur = prev.m1State || {
    currentTopicIndex: 0,
    currentItemType: 'slide',
    currentSlideIndex: 0,
    furthestTopicIndex: 0,
    furthestItemType: 'slide',
    furthestSlideIndex: 0,
    completedItemIds: [],
    passedLabIds: []
  };
  let newCompleted = [...(cur.completedItemIds || [])];
  if (cur.currentItemType === 'slide' && topics[cur.currentTopicIndex]?.slides?.[cur.currentSlideIndex]) {
    const prevSlideId = topics[cur.currentTopicIndex].slides[cur.currentSlideIndex].id;
    if (!newCompleted.includes(prevSlideId)) newCompleted.push(prevSlideId);
  }
  if (cur.currentItemType === 'briefing' && !newCompleted.includes(`m1-t${cur.currentTopicIndex + 1}-briefing`)) {
    newCompleted.push(`m1-t${cur.currentTopicIndex + 1}-briefing`);
  }

  let newFurthestTopic = Math.max(cur.furthestTopicIndex, topicIndex);
  let newFurthestItemType = cur.furthestItemType;
  let newFurthestSlide = cur.furthestSlideIndex;

  if (topicIndex > cur.furthestTopicIndex) {
    newFurthestTopic = topicIndex;
    newFurthestItemType = itemType;
    newFurthestSlide = slideIndex;
  } else if (topicIndex === cur.furthestTopicIndex) {
    const curRank = itemType === 'slide' ? slideIndex : (itemType === 'briefing' ? (topics[topicIndex]?.slides?.length || 1) : 99);
    const furRank = cur.furthestItemType === 'slide' ? cur.furthestSlideIndex : (cur.furthestItemType === 'briefing' ? (topics[topicIndex]?.slides?.length || 1) : 99);
    if (curRank > furRank) {
      newFurthestItemType = itemType;
      newFurthestSlide = slideIndex;
    }
  }

  return {
    ...prev,
    m1State: {
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
}

export function handleCompleteLabState(prev, labId, topicNum, isLab7) {
  if (labId.startsWith('m1')) {
    const isM1Lab3 = labId === 'm1lab3' || labId === 'm1-lab3' || topicNum === 5 || topicNum === 3;
    const curM1 = prev.m1State || { completedItemIds: [], passedLabIds: [], furthestTopicIndex: 0, furthestItemType: 'slide', furthestSlideIndex: 0 };
    const newPassedLabs = curM1.passedLabIds.includes(labId) ? curM1.passedLabIds : [...curM1.passedLabIds, labId, `m1-lab${topicNum}`];
    const newCompletedItems = [...curM1.completedItemIds];
    if (!newCompletedItems.includes(labId)) newCompletedItems.push(labId);
    if (!newCompletedItems.includes(`m1-lab${topicNum}`)) newCompletedItems.push(`m1-lab${topicNum}`);

    const newCompletedModules = [...prev.completedModules];
    const newUnlockedModules = [...prev.unlockedModules];
    if (isM1Lab3) {
      if (!newCompletedModules.includes('m1')) newCompletedModules.push('m1');
      if (!newUnlockedModules.includes('m2')) newUnlockedModules.push('m2');
    }

    return {
      ...prev,
      completedModules: newCompletedModules,
      unlockedModules: newUnlockedModules,
      m1State: {
        ...curM1,
        passedLabIds: newPassedLabs,
        completedItemIds: newCompletedItems,
        furthestTopicIndex: isM1Lab3 ? 5 : Math.max(curM1.furthestTopicIndex, topicNum),
        furthestItemType: 'slide',
        furthestSlideIndex: 0,
        labCompletedFlags: { ...(curM1.labCompletedFlags || {}), [labId]: [1, 2, 3, 4] }
      }
    };
  }

  const newPassedLabs = prev.m4State.passedLabIds.includes(labId)
    ? prev.m4State.passedLabIds
    : [...prev.m4State.passedLabIds, labId, `lab-${topicNum}`];

  const newCompletedItems = [...prev.m4State.completedItemIds];
  if (!newCompletedItems.includes(labId)) newCompletedItems.push(labId);
  if (!newCompletedItems.includes(`lab-${topicNum}`)) newCompletedItems.push(`lab-${topicNum}`);
  if (!newCompletedItems.includes(`topic-${topicNum}`)) newCompletedItems.push(`topic-${topicNum}`);

  let nextFurthestTopic = prev.m4State.furthestTopicIndex;
  let nextFurthestItemType = prev.m4State.furthestItemType;
  let nextFurthestSlideIndex = prev.m4State.furthestSlideIndex;

  if (!isLab7) {
    const nextTopicIndex = topicNum;
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

  const newCompletedModules = [...prev.completedModules];
  const newUnlockedModules = [...prev.unlockedModules];
  if (isLab7) {
    if (!newCompletedModules.includes('m4')) newCompletedModules.push('m4');
    if (!newUnlockedModules.includes('m5')) newUnlockedModules.push('m5');
  }

  return {
    ...prev,
    completedModules: newCompletedModules,
    unlockedModules: newUnlockedModules,
    m4State: {
      ...prev.m4State,
      passedLabIds: newPassedLabs,
      completedItemIds: newCompletedItems,
      furthestTopicIndex: nextFurthestTopic,
      furthestItemType: nextFurthestItemType,
      furthestSlideIndex: nextFurthestSlideIndex,
      labCompletedFlags: { ...prev.m4State.labCompletedFlags, [labId]: [1, 2, 3], [`lab-${topicNum}`]: [1, 2, 3] }
    }
  };
}

export function handleResetCurrentLabState(prev, labId, topicNum, isPassed) {
  let snapshot = prev.labSnapshots?.[labId] || INITIAL_SIMULATED_CLOUD;
  const restoredCloud = JSON.parse(JSON.stringify(snapshot));
  if (!isPassed) {
    restoredCloud.terminalVfs = getInitialVirtualFilesystem(labId);
  }
  const newLabEvents = { ...(prev.labEvents || {}), [labId]: [], [`lab-${topicNum}`]: [] };

  if (labId.startsWith('m1')) {
    const curM1 = prev.m1State || {};
    const newCompletedFlags = { ...(curM1.labCompletedFlags || {}) };
    const newAnswers = { ...(curM1.labAnswers || {}) };
    if (!isPassed) {
      newCompletedFlags[labId] = [];
      newCompletedFlags[`m1-lab${topicNum}`] = [];
    }
    return {
      ...prev,
      labEvents: newLabEvents,
      m1State: {
        ...curM1,
        labActiveFlag: isPassed ? 3 : 1,
        labElapsedSeconds: 0,
        labCompletedFlags: newCompletedFlags,
        labAnswers: newAnswers
      },
      simCloud: restoredCloud
    };
  }

  const newCompletedFlags = { ...prev.m4State.labCompletedFlags };
  const newAnswers = { ...prev.m4State.labAnswers };
  if (!isPassed) {
    newCompletedFlags[labId] = [];
    newCompletedFlags[`lab-${topicNum}`] = [];
    delete newAnswers[`flag-${topicNum}-1`];
    delete newAnswers[`flag-${topicNum}-2`];
    delete newAnswers[`flag-${topicNum}-3`];
  }

  return {
    ...prev,
    labEvents: newLabEvents,
    m4State: {
      ...prev.m4State,
      labActiveFlag: isPassed ? 3 : 1,
      labElapsedSeconds: 0,
      labCompletedFlags: newCompletedFlags,
      labAnswers: newAnswers
    },
    simCloud: restoredCloud
  };
}

export function handleAnswerSubmittedState(prev, labId, topicNum, flagNumber, inputAnswer) {
  let simCloud = prev.simCloud;
  if (labId === 'lab7' && flagNumber === 1 && !prev.simCloud.timeSkipTriggered) {
    simCloud = {
      ...prev.simCloud,
      timeSkipTriggered: true,
      userRoles: { ...prev.simCloud.userRoles, 'freshfarms-vendor': 'admin', 'customer-test': 'member' },
      kaliFiles: { ...prev.simCloud.kaliFiles, documents: ['access-report-0912.html'] }
    };
  }

  const flagKey = `flag-${topicNum}-${flagNumber}`;

  if (labId.startsWith('m1')) {
    const curM1 = prev.m1State || {};
    const currentCompleted = curM1.labCompletedFlags?.[labId] || [];
    const updatedFlags = currentCompleted.includes(flagNumber) ? currentCompleted : [...currentCompleted, flagNumber];
    return {
      ...prev,
      simCloud,
      m1State: {
        ...curM1,
        labCompletedFlags: { ...(curM1.labCompletedFlags || {}), [labId]: updatedFlags, [`m1-lab${topicNum}`]: updatedFlags },
        labAnswers: { ...(curM1.labAnswers || {}), [flagKey]: inputAnswer.trim() }
      }
    };
  }

  const currentCompleted = prev.m4State.labCompletedFlags[labId] || [];
  const updatedFlags = currentCompleted.includes(flagNumber) ? currentCompleted : [...currentCompleted, flagNumber];

  return {
    ...prev,
    simCloud,
    m4State: {
      ...prev.m4State,
      labCompletedFlags: { ...prev.m4State.labCompletedFlags, [labId]: updatedFlags, [`lab-${topicNum}`]: updatedFlags },
      labAnswers: { ...prev.m4State.labAnswers, [flagKey]: inputAnswer.trim() }
    }
  };
}

export function handleAutoCompleteState(prev, labId) {
  const { cloud, events } = generateAutoCompleteCloud(prev.simCloud, prev.labEvents?.[labId], labId);
  return {
    ...prev,
    simCloud: cloud,
    labEvents: { ...(prev.labEvents || {}), [labId]: events }
  };
}

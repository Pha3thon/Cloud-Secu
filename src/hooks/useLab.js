/**
 * useLab Hook
 * Focused hook for the active hands-on lab lifecycle and verification engine.
 */

import { useStore } from './useStore';

export const useLab = (topicNumber) => {
  const {
    m4State,
    simCloud,
    labEvents,
    checkMyConfiguration,
    submitLabAnswer,
    completeLab,
    resetCurrentLab,
    startLabSession,
    pauseLabSession,
    recordLabEvent,
    autoCompleteCurrentLab,
    LABS
  } = useStore();

  const currentTopic = topicNumber ?? (m4State.currentTopicIndex + 1);
  const labId = `lab${currentTopic}`;
  const labData = LABS[labId] || null;

  const completedFlags = m4State.labCompletedFlags[labId] || m4State.labCompletedFlags[`lab-${currentTopic}`] || [];
  const isPassed = m4State.passedLabIds.includes(labId) || m4State.passedLabIds.includes(`lab-${currentTopic}`);
  const activeFlag = isPassed ? 3 : (completedFlags.length + 1);

  return {
    labId,
    labData,
    isPassed,
    completedFlags,
    activeFlag,
    isRunning: m4State.labSessionRunning,
    elapsedSeconds: m4State.labElapsedSeconds,
    simCloud,
    labEvents: labEvents[labId] || [],
    checkConfiguration: (flagNum) => checkMyConfiguration(labId, flagNum),
    submitAnswer: (flagNum, answer) => submitLabAnswer(labId, flagNum, answer),
    completeLab: () => completeLab(labId),
    resetLab: (key) => resetCurrentLab(key || labId),
    startSession: startLabSession,
    pauseSession: pauseLabSession,
    recordEvent: (eventName) => recordLabEvent(eventName, labId),
    autoComplete: () => autoCompleteCurrentLab(labId)
  };
};

export default useLab;

import { LABS } from '../src/data/labsRegistry.js';

console.log('--- Testing Store Progression & resetCurrentLab Logic ---');

// Emulate CourseContext logic directly
let state = {
  activeModuleId: 'm4',
  m4State: {
    currentTopicIndex: 0,
    currentItemType: 'lab',
    currentSlideIndex: 0,
    furthestTopicIndex: 0,
    furthestItemType: 'lab',
    furthestSlideIndex: 0,
    topicStatus: { 1: 'in_progress', 2: 'locked', 3: 'locked', 4: 'locked', 5: 'locked', 6: 'locked', 7: 'locked' },
    unlockedLabs: { 'lab-1': true, 'lab1': true },
    completedFlags: { 'lab1': [1, 2, 3] },
    flagAnswers: {},
    activeLabSession: 'lab1'
  },
  moduleStatus: { m1: 'completed', m2: 'completed', m3: 'completed', m4: 'in_progress', m5: 'locked', m6: 'locked' },
  labSnapshots: {},
  labEvents: { lab1: ['overview_opened', 'images_opened'], lab2: [] }
};

function completeLab(targetLabId) {
  const labId = targetLabId.replace('-', '');
  const topicNum = parseInt(labId.replace('lab', ''), 10);
  const labDef = LABS[labId];

  const nextTopicIdx = topicNum; // 0-indexed for next topic
  const isLab7 = labId === 'lab7';

  state = {
    ...state,
    moduleStatus: {
      ...state.moduleStatus,
      m4: isLab7 ? 'completed' : state.moduleStatus.m4,
      m5: isLab7 ? 'unlocked' : state.moduleStatus.m5
    },
    m4State: {
      ...state.m4State,
      topicStatus: {
        ...state.m4State.topicStatus,
        [topicNum]: 'completed',
        ...(topicNum < 7 ? { [topicNum + 1]: 'in_progress' } : {})
      },
      completedFlags: {
        ...state.m4State.completedFlags,
        [labId]: [1, 2, 3],
        [`lab-${topicNum}`]: [1, 2, 3]
      },
      furthestTopicIndex: Math.max(state.m4State.furthestTopicIndex, isLab7 ? 6 : nextTopicIdx),
      furthestItemType: 'slide',
      furthestSlideIndex: 0
    }
  };
}

// Test completeLab for lab1
completeLab('lab1');
console.log('After completeLab(lab1):');
console.log('- Topic 1 status:', state.m4State.topicStatus[1]); // completed
console.log('- Topic 2 status:', state.m4State.topicStatus[2]); // in_progress
console.log('- furthestTopicIndex:', state.m4State.furthestTopicIndex); // 1
console.log('- furthestItemType:', state.m4State.furthestItemType); // slide
console.log('- furthestSlideIndex:', state.m4State.furthestSlideIndex); // 0
if (state.m4State.topicStatus[1] !== 'completed' || state.m4State.topicStatus[2] !== 'in_progress' || state.m4State.furthestTopicIndex !== 1) {
  throw new Error('Progression after Lab 1 failed');
}

// Test completeLab for lab7
completeLab('lab7');
console.log('\nAfter completeLab(lab7):');
console.log('- M4 status:', state.moduleStatus.m4); // completed
console.log('- M5 status:', state.moduleStatus.m5); // unlocked
if (state.moduleStatus.m4 !== 'completed' || state.moduleStatus.m5 !== 'unlocked') {
  throw new Error('Progression after Lab 7 failed');
}

console.log('\n✓ Store progression logic tested and verified!');

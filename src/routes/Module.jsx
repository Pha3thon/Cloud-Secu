import React, { useState, useEffect, useContext } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useStore from '@/hooks/useStore';
import { M4_BRIEFING, M4_TOPICS } from '@/content/m4';
import { M1_BRIEFING, M1_TOPICS } from '@/content/m1';
import { M0_TOPICS } from '@/content/m0';
import OutlineSidebar from '@/components/sidebar/OutlineSidebar';
import TheorySlide from '@/components/slides/TheorySlide';
import LabGuide from '@/components/lab/LabGuide';
import KaliDesktop from '@/simulations/kali/KaliDesktop';
import LabLaunchLoader from '@/components/lab/LabLaunchLoader';
import CelebrationScreen from '@/components/lab/CelebrationScreen';
import BriefingCard from '@/components/lab/BriefingCard';
import LabSessionGuard from '@/components/lab/LabSessionGuard';
import { ActiveSlideContext } from '@/App';
import { useAccessibility } from '@/state/AccessibilityContext';
import { getReadableSlideText } from '@/hooks/useReadableSlideText';

/**
 * Module route screen: hosts slide view and split lab view for active topic.
 * Conditionally scopes HostSafetyGuard strictly to active running labs.
 */
export default function Module() {
  const {
    currentView,
    navigateTo,
    m1State,
    m4State,
    completeM0Module,
    navigateToM1Item,
    returnToFurthestPointM1,
    completeM1Module,
    navigateToM4Item,
    returnToFurthestPoint,
    startLabSession,
    pauseLabSession,
    resetCurrentLab,
    completeM4Module,
    getModuleTopics,
    showToast
  } = useStore();
  const activeSlideCtx = useContext(ActiveSlideContext);
  const { prefs } = useAccessibility();

  const isModule0 = currentView === 'module-m0';
  const isModule1 = currentView === 'module-m1';
  const activeModuleId = isModule0 ? 'm0' : (isModule1 ? 'm1' : 'm4');

  const activeState = isModule1 ? (m1State || {}) : m4State;
  const navigateItem = isModule1 ? navigateToM1Item : navigateToM4Item;
  const returnToFurthest = isModule1 ? returnToFurthestPointM1 : returnToFurthestPoint;

  const handleEndLabSafety = () => {
    pauseLabSession?.();
    navigateTo('curriculum');
  };

  const [m0SlideIndex, setM0SlideIndex] = useState(0);

  const topics = isModule0
    ? M0_TOPICS
    : isModule1
    ? (getModuleTopics ? getModuleTopics('m1') : M1_TOPICS)
    : (getModuleTopics ? getModuleTopics('m4') : M4_TOPICS);

  const currentTopic = isModule0 ? topics[0] : (topics[activeState.currentTopicIndex] || topics[0]);
  const topicNumber = isModule0 ? 0 : currentTopic.topicNumber;
  const currentSlide = isModule0
    ? (currentTopic.slides ? currentTopic.slides[m0SlideIndex] : null)
    : (currentTopic.slides ? currentTopic.slides[activeState.currentSlideIndex] : null);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [workstationExpanded, setWorkstationExpanded] = useState(false);
  const [leftWidthPct, setLeftWidthPct] = useState(48);
  const [isDraggingDivider, setIsDraggingDivider] = useState(false);
  const [launchLoaderMode, setLaunchLoaderMode] = useState(null);
  const [celebrationType, setCelebrationType] = useState(null);

  // Register active slide with accessibility context for TTS
  const resolvedSlide = isModule0
    ? (topics[0]?.slides ? topics[0].slides[m0SlideIndex] : null)
    : (topics[activeState?.currentTopicIndex]?.slides ? topics[activeState.currentTopicIndex].slides[activeState.currentSlideIndex] : null);

  useEffect(() => {
    if (activeSlideCtx?.setActiveSlide) {
      activeSlideCtx.setActiveSlide(resolvedSlide || null);
    }
  }, [resolvedSlide?.id, activeSlideCtx?.setActiveSlide]);

  // Auto-read slide when it changes (if voiceover + auto-read enabled)
  useEffect(() => {
    if (!prefs.voiceoverEnabled || !prefs.autoReadEnabled) return;
    if (!resolvedSlide) return;
    const text = getReadableSlideText(resolvedSlide);
    if (!text) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const synth = window.speechSynthesis;
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = prefs.speechRate || 1.0;
    const voices = synth.getVoices();
    const preferred = voices.find((v) => v.lang === (prefs.voiceLang || 'en-IN'))
      || voices.find((v) => v.lang.startsWith('en'));
    if (preferred) utt.voice = preferred;
    synth.speak(utt);
    return () => { synth.cancel(); };
  }, [resolvedSlide?.id, prefs.voiceoverEnabled, prefs.autoReadEnabled, prefs.speechRate, prefs.voiceLang]);

  const isReviewingEarlierItem =
    !isModule0 &&
    (activeState.currentTopicIndex < activeState.furthestTopicIndex ||
      (activeState.currentTopicIndex === activeState.furthestTopicIndex &&
        (activeState.currentItemType === 'briefing' && activeState.furthestItemType !== 'briefing') ||
        (activeState.currentItemType === 'slide' &&
          (activeState.furthestItemType === 'lab' || activeState.currentSlideIndex < activeState.furthestSlideIndex))));

  const labKey = isModule1
    ? (currentTopic.lab?.id || `m1-lab${topicNumber === 2 ? 1 : (topicNumber === 5 ? 2 : (topicNumber === 6 ? 3 : 1))}`)
    : `lab-${topicNumber}`;

  const isLabPassed = activeState?.passedLabIds?.includes(labKey) ||
    activeState?.passedLabIds?.includes(labKey.replace('-', ''));

  const handleLaunchLoaderComplete = () => {
    setLaunchLoaderMode(null);
    startLabSession();
    navigateItem(activeState.currentTopicIndex, 'lab');
  };

  const handleNextSlide = () => {
    if (activeState.currentSlideIndex < currentTopic.slides.length - 1) {
      navigateItem(activeState.currentTopicIndex, 'slide', activeState.currentSlideIndex + 1);
    }
  };

  const handleBackSlide = () => {
    if (activeState.currentSlideIndex > 0) {
      navigateItem(activeState.currentTopicIndex, 'slide', activeState.currentSlideIndex - 1);
    }
  };

  const handleFinishAndUnlockLab = () => {
    if (currentTopic.lab) {
      if (currentTopic.hasBriefing) {
        navigateItem(activeState.currentTopicIndex, 'briefing');
      } else {
        navigateItem(activeState.currentTopicIndex, 'lab');
      }
    } else {
      // If no lab in topic (e.g. M1 Topic 1, 3, 4), advance to next topic
      const nextTopicIdx = activeState.currentTopicIndex + 1;
      if (nextTopicIdx < topics.length) {
        navigateItem(nextTopicIdx, 'slide', 0);
      } else {
        if (isModule1) {
          completeM1Module();
          navigateTo('curriculum');
        }
      }
    }
  };

  const handleResetLab = (targetLabKey) => {
    const key = targetLabKey || labKey;
    resetCurrentLab(key);
    const isPassed = activeState?.passedLabIds?.includes(key) || activeState?.passedLabIds?.includes(key.replace('-', ''));
    showToast?.(isPassed ? 'Lab restored to completed state.' : 'Lab reset. Starting again from Flag 1.');
    setLaunchLoaderMode('resume');
  };

  useEffect(() => {
    if (isModule1) {
      const isM1Lab3Passed = activeState?.passedLabIds?.includes('m1-lab3') || activeState?.passedLabIds?.includes('m1lab3');
      if (isM1Lab3Passed && (activeState.currentTopicIndex === 5 || topicNumber === 6) && activeState.currentItemType === 'lab') {
        setCelebrationType('m1_complete');
      }
    } else if (!isModule0) {
      const isLab6Passed = m4State?.passedLabIds?.includes('lab6') || m4State?.passedLabIds?.includes('lab-6');
      const isLab7Passed = m4State?.passedLabIds?.includes('lab7') || m4State?.passedLabIds?.includes('lab-7');
      if (isLab6Passed && !isLab7Passed && m4State.currentTopicIndex === 5 && m4State.currentItemType === 'lab') {
        setCelebrationType('lab6_live');
      } else if (isLab7Passed && m4State.currentTopicIndex === 6 && m4State.currentItemType === 'lab') {
        setCelebrationType('m4_complete');
      }
    }
  }, [isModule0, isModule1, activeState.passedLabIds, activeState.currentTopicIndex, activeState.currentItemType, m4State?.passedLabIds]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingDivider) return;
      const container = document.getElementById('lab-split-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newPct = Math.max(25, Math.min(75, ((e.clientX - rect.left) / rect.width) * 100));
      setLeftWidthPct(newPct);
    };

    const handleMouseUp = () => {
      setIsDraggingDivider(false);
    };

    if (isDraggingDivider) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingDivider]);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-app, #f8fafc)', overflow: 'hidden' }}>
      <OutlineSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        moduleId={activeModuleId}
        m0SlideIndex={m0SlideIndex}
        onSelectM0Slide={setM0SlideIndex}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Header bar */}
        <div style={{ height: '48px', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-subtle, #e2e8f0)', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={() => navigateTo('curriculum')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700', color: 'var(--brand-primary, #0284c7)', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
            >
              <ArrowLeft size={14} />
              <span>Curriculum</span>
            </button>
            <span style={{ color: '#cbd5e1' }}>/</span>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main, #0f172a)' }}>
              {isModule0
                ? 'Phase 0 · Orientation: Course Orientation'
                : isModule1
                ? `Module 1 · Topic ${topicNumber}: ${currentTopic.title}`
                : `Topic ${topicNumber}: ${currentTopic.title}`}
            </div>
          </div>

          {isReviewingEarlierItem && (
            <button
              type="button"
              onClick={returnToFurthest}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', backgroundColor: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: '6px', color: 'var(--brand-primary, #0369a1)', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer' }}
            >
              <span>Back to where you left off</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>

        {/* Viewport */}
        <div style={{ flex: 1, overflowY: 'auto', padding: (!isModule0 && activeState.currentItemType === 'lab') ? '12px' : '28px 24px', display: 'flex', flexDirection: 'column' }}>
          {isModule0 && currentSlide && (
            <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
              <TheorySlide
                slide={currentSlide}
                slideIndex={m0SlideIndex}
                totalSlides={currentTopic.slides?.length || 1}
                topicTitle={currentTopic.title}
                moduleLabel="ORIENTATION · COURSE INTRODUCTION"
                isFirstSlide={m0SlideIndex === 0}
                isLastSlide={m0SlideIndex === currentTopic.slides.length - 1}
                isOrientation={true}
                onNext={() => setM0SlideIndex((prev) => Math.min(currentTopic.slides.length - 1, prev + 1))}
                onBack={() => setM0SlideIndex((prev) => Math.max(0, prev - 1))}
                onContinueToCurriculum={() => {
                  completeM0Module();
                  navigateTo('curriculum');
                }}
              />
            </div>
          )}

          {!isModule0 && activeState.currentItemType === 'briefing' && (
            <BriefingCard
              topicNumber={topicNumber}
              currentTopic={currentTopic}
              onLaunchInitial={() => setLaunchLoaderMode('initial')}
              onLaunchResume={() => setLaunchLoaderMode('resume')}
            />
          )}

          {!isModule0 && activeState.currentItemType === 'slide' && currentSlide && (
            <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
              <TheorySlide
                slide={currentSlide}
                slideIndex={activeState.currentSlideIndex}
                totalSlides={currentTopic.slides?.length || 1}
                topicTitle={currentTopic.title}
                moduleLabel={
                  isModule1
                    ? `MODULE 1 · ${topicNumber}. ${currentTopic.title?.toUpperCase()}`
                    : `MODULE 4 · ${topicNumber}. ${currentTopic.title?.toUpperCase()}`
                }
                isFirstSlide={activeState.currentSlideIndex === 0}
                isLastSlide={activeState.currentSlideIndex === currentTopic.slides.length - 1}
                onNext={handleNextSlide}
                onBack={handleBackSlide}
                onFinishAndUnlockLab={handleFinishAndUnlockLab}
              />
            </div>
          )}

          {!isModule0 && activeState.currentItemType === 'lab' && (
            <LabSessionGuard
              isRunning={Boolean(activeState.labSessionRunning)}
              onEndLab={handleEndLabSafety}
              showToast={showToast}
            >
              <div id="lab-split-container" style={{ flex: 1, display: 'flex', height: '100%', position: 'relative', overflow: 'hidden' }}>
                {!workstationExpanded && (
                  <div style={{ width: `${leftWidthPct}%`, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <LabGuide topicNumber={topicNumber} labData={currentTopic.lab} onResetLab={handleResetLab} isReviewMode={isLabPassed} />
                  </div>
                )}

                {!workstationExpanded && (
                  <div
                    onMouseDown={() => setIsDraggingDivider(true)}
                    style={{ width: '8px', cursor: 'col-resize', backgroundColor: isDraggingDivider ? 'var(--brand-primary, #0284c7)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none' }}
                  >
                    <div style={{ width: '2px', height: '32px', backgroundColor: '#cbd5e1', borderRadius: '1px' }} />
                  </div>
                )}

                <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
                  <KaliDesktop
                    topicNumber={topicNumber}
                    labId={currentTopic.lab?.id}
                    moduleId={activeModuleId}
                    isExpanded={workstationExpanded}
                    onToggleExpand={() => setWorkstationExpanded(!workstationExpanded)}
                  />
                </div>
              </div>
            </LabSessionGuard>
          )}
        </div>
      </div>

      {launchLoaderMode && <LabLaunchLoader mode={launchLoaderMode} onComplete={handleLaunchLoaderComplete} />}

      {celebrationType === 'lab6_live' && (
        <CelebrationScreen type="lab6_live" onContinue={() => { setCelebrationType(null); navigateItem(6, 'slide', 0); }} />
      )}

      {celebrationType === 'm4_complete' && (
        <CelebrationScreen type="m4_complete" onContinue={() => { setCelebrationType(null); completeM4Module(); navigateTo('curriculum'); }} />
      )}

      {celebrationType === 'm1_complete' && (
        <CelebrationScreen type="m1_complete" onContinue={() => { setCelebrationType(null); completeM1Module(); navigateTo('curriculum'); }} />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Bookmark
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { M4_BRIEFING, M4_TOPICS } from '../data/m4Content';
import { OutlineSidebar } from '../components/OutlineSidebar';
import { TheorySlide } from '../components/TheorySlide';
import { LabGuide } from '../components/LabGuide';
import { KaliWorkstation } from '../components/KaliWorkstation';
import { LabLaunchLoader } from '../components/LabLaunchLoader';
import { CelebrationScreen } from '../components/CelebrationScreen';

export const ModuleDetailPage = () => {
  const {
    navigateTo,
    m4State,
    navigateToM4Item,
    returnToFurthestPoint,
    startLabSession,
    resetCurrentLab,
    completeM4Module,
    getModuleTopics,
    showToast
  } = useCourse();

  // Load topics from admin custom content if available
  const topics = getModuleTopics ? getModuleTopics('m4') : M4_TOPICS;

  const currentTopic = topics[m4State.currentTopicIndex] || topics[0];
  const topicNumber = currentTopic.topicNumber;
  const currentSlide = currentTopic.slides ? currentTopic.slides[m4State.currentSlideIndex] : null;

  // Sidebar collapse toggle
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Workstation expansion state
  const [workstationExpanded, setWorkstationExpanded] = useState(false);

  // Draggable split width (left panel percentage)
  const [leftWidthPct, setLeftWidthPct] = useState(48);
  const [isDraggingDivider, setIsDraggingDivider] = useState(false);

  // Launch loader state
  const [launchLoaderMode, setLaunchLoaderMode] = useState(null); // 'initial' | 'resume' | 'time_skip' | null

  // Celebration Modals
  const [celebrationType, setCelebrationType] = useState(null); // 'lab6_live' | 'm4_complete' | null

  // Check if viewing an earlier item (Furthest point check)
  const isReviewingEarlierItem =
    m4State.currentTopicIndex < m4State.furthestTopicIndex ||
    (m4State.currentTopicIndex === m4State.furthestTopicIndex &&
      (m4State.currentItemType === 'briefing' && m4State.furthestItemType !== 'briefing') ||
      (m4State.currentItemType === 'slide' &&
        (m4State.furthestItemType === 'lab' || m4State.currentSlideIndex < m4State.furthestSlideIndex)));

  // Lab review mode check (lab passed already)
  const labKey = `lab-${topicNumber}`;
  const isLabPassed = m4State.passedLabIds.includes(labKey) || m4State.passedLabIds.includes(`lab${topicNumber}`);

  // Handle Launch Lab from Briefing Card (Topic 1)
  const handleLaunchLabFromBriefing = () => {
    setLaunchLoaderMode('initial');
  };

  const handleLaunchLoaderComplete = () => {
    setLaunchLoaderMode(null);
    startLabSession();
    navigateToM4Item(m4State.currentTopicIndex, 'lab');
  };

  // Handle slide traversal
  const handleNextSlide = () => {
    if (m4State.currentSlideIndex < currentTopic.slides.length - 1) {
      navigateToM4Item(m4State.currentTopicIndex, 'slide', m4State.currentSlideIndex + 1);
    }
  };

  const handleBackSlide = () => {
    if (m4State.currentSlideIndex > 0) {
      navigateToM4Item(m4State.currentTopicIndex, 'slide', m4State.currentSlideIndex - 1);
    }
  };

  // FIX 1: Finish & Unlock Lab moves to Briefing / Pre-lab message card, never jumps straight to lab
  const handleFinishAndUnlockLab = () => {
    navigateToM4Item(m4State.currentTopicIndex, 'briefing');
  };

  // FIX 2: Reset lab handler with resume animation and feedback toast
  const handleResetLab = (targetLabKey) => {
    resetCurrentLab(targetLabKey);
    const labId = targetLabKey || `lab${topicNumber}`;
    const isPassed = m4State.passedLabIds.includes(labId) || m4State.passedLabIds.includes(targetLabKey);
    if (showToast) {
      showToast(isPassed ? 'Lab restored to completed state.' : 'Lab reset. Starting again from Flag 1.');
    }
    setLaunchLoaderMode('resume');
  };

  // Watch for Lab 6 / Lab 7 completions to trigger celebrations
  React.useEffect(() => {
    const isLab6Passed = m4State.passedLabIds.includes('lab6') || m4State.passedLabIds.includes('lab-6');
    const isLab7Passed = m4State.passedLabIds.includes('lab7') || m4State.passedLabIds.includes('lab-7');
    if (isLab6Passed && !isLab7Passed && m4State.currentTopicIndex === 5 && m4State.currentItemType === 'lab') {
      setCelebrationType('lab6_live');
    } else if (isLab7Passed && m4State.currentTopicIndex === 6 && m4State.currentItemType === 'lab') {
      setCelebrationType('m4_complete');
    }
  }, [m4State.passedLabIds, m4State.currentTopicIndex, m4State.currentItemType]);

  // Draggable divider mouse events
  const handleMouseDownDivider = () => {
    setIsDraggingDivider(true);
  };

  React.useEffect(() => {
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
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 60px)',
        backgroundColor: '#f8fafc',
        overflow: 'hidden'
      }}
    >
      {/* 1. Collapsible Outline Sidebar */}
      <OutlineSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* 2. Main Stage Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Top Header / Sub-navigation */}
        <div
          style={{
            height: '48px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={() => navigateTo('curriculum')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#0284c7',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={14} />
              <span>Curriculum</span>
            </button>

            <span style={{ color: '#cbd5e1' }}>/</span>

            <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
              Topic {topicNumber}: {currentTopic.title}
            </div>
          </div>

          {/* "Back to where you left off" Button if reviewing earlier items */}
          {isReviewingEarlierItem && (
            <button
              type="button"
              onClick={returnToFurthestPoint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                backgroundColor: '#e0f2fe',
                border: '1px solid #bae6fd',
                borderRadius: '6px',
                color: '#0369a1',
                fontSize: '11.5px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <span>Back to where you left off</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>

        {/* 3. Stage Viewport */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: m4State.currentItemType === 'lab' ? '12px' : '28px 24px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* STAGE A: Briefing / Pre-Lab Card */}
          {m4State.currentItemType === 'briefing' && (
            <div
              style={{
                maxWidth: '680px',
                margin: '30px auto',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '36px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
              className="animate-pop-in"
            >
              {topicNumber === 1 ? (
                <>
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        backgroundColor: '#e0f2fe',
                        color: '#0369a1',
                        padding: '3px 10px',
                        borderRadius: '12px'
                      }}
                    >
                      Lab Briefing
                    </span>
                    <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', marginTop: '10px', marginBottom: '8px' }}>
                      {M4_BRIEFING.title}
                    </h1>
                  </div>

                  <div style={{ fontSize: '14.5px', color: '#334155', lineHeight: '1.65' }}>
                    <p style={{ marginBottom: '14px' }}>
                      {M4_BRIEFING.scenario}
                    </p>
                    <p style={{ fontStyle: 'italic', color: '#64748b', marginBottom: '14px' }}>
                      {M4_BRIEFING.context}
                    </p>
                    <p style={{ fontWeight: '700', color: '#0369a1' }}>
                      Ready to build? Click Launch Lab to start your Kali workstation and connect to Horizon.
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={handleLaunchLabFromBriefing}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 28px',
                        backgroundColor: '#0284c7',
                        color: '#ffffff',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.3)',
                        border: 'none'
                      }}
                    >
                      <span>{M4_BRIEFING.cta}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        backgroundColor: '#f0fdfa',
                        color: '#0f766e',
                        padding: '3px 10px',
                        borderRadius: '12px'
                      }}
                    >
                      Priya's Lab Briefing
                    </span>
                    <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#0f172a', marginTop: '10px', marginBottom: '8px' }}>
                      {currentTopic.lab?.title || `Lab ${topicNumber}`}
                    </h1>
                  </div>

                  <div style={{ fontSize: '14.5px', color: '#334155', lineHeight: '1.65' }}>
                    <div
                      style={{
                        backgroundColor: '#f8fafc',
                        borderLeft: '4px solid #0d9488',
                        padding: '14px 18px',
                        borderRadius: '0 8px 8px 0',
                        marginBottom: '16px',
                        fontStyle: 'italic',
                        color: '#1e293b'
                      }}
                    >
                      "{currentTopic.lab?.priyaIntro}"
                    </div>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '13.5px' }}>
                      Your theory slides for this topic are complete. Open your workstation to complete the 3 hands-on flags.
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    {/* FIX (Diag 3): Open Lab previously called a dead or inconsistent handler; now unifies entry with 2-second resume animation and workstation state retention */}
                    <button
                      type="button"
                      onClick={() => {
                        setLaunchLoaderMode('resume');
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 28px',
                        backgroundColor: '#0d9488',
                        color: '#ffffff',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px -1px rgba(13, 148, 136, 0.3)',
                        border: 'none'
                      }}
                    >
                      <span>Open Lab</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STAGE B: Theory Slide View */}
          {m4State.currentItemType === 'slide' && currentSlide && (
            <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
              <TheorySlide
                slide={currentSlide}
                isFirstSlide={m4State.currentSlideIndex === 0}
                isLastSlide={m4State.currentSlideIndex === currentTopic.slides.length - 1}
                onNext={handleNextSlide}
                onBack={handleBackSlide}
                onFinishAndUnlockLab={handleFinishAndUnlockLab}
              />
            </div>
          )}

          {/* STAGE C: Lab Split-Screen View */}
          {m4State.currentItemType === 'lab' && (
            <div
              id="lab-split-container"
              style={{
                flex: 1,
                display: 'flex',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Left Panel: Lab Guide */}
              {!workstationExpanded && (
                <div
                  style={{
                    width: `${leftWidthPct}%`,
                    height: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <LabGuide
                    topicNumber={topicNumber}
                    labData={currentTopic.lab}
                    onResetLab={handleResetLab}
                    isReviewMode={isLabPassed}
                  />
                </div>
              )}

              {/* Draggable Divider */}
              {!workstationExpanded && (
                <div
                  onMouseDown={handleMouseDownDivider}
                  style={{
                    width: '8px',
                    cursor: 'col-resize',
                    backgroundColor: isDraggingDivider ? '#0284c7' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                    transition: 'background-color 150ms'
                  }}
                >
                  <div style={{ width: '2px', height: '32px', backgroundColor: '#cbd5e1', borderRadius: '1px' }} />
                </div>
              )}

              {/* Right Panel: Kali Workstation */}
              <div
                style={{
                  flex: 1,
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <KaliWorkstation
                  isExpanded={workstationExpanded}
                  onToggleExpand={() => setWorkstationExpanded(!workstationExpanded)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lab Launch Animation Modal */}
      {launchLoaderMode && (
        <LabLaunchLoader
          mode={launchLoaderMode}
          onComplete={handleLaunchLoaderComplete}
        />
      )}

      {/* Celebrations */}
      {celebrationType === 'lab6_live' && (
        <CelebrationScreen
          type="lab6_live"
          onContinue={() => {
            setCelebrationType(null);
            navigateToM4Item(6, 'slide', 0); // Jump to Topic 7 slide 1
          }}
        />
      )}

      {celebrationType === 'm4_complete' && (
        <CelebrationScreen
          type="m4_complete"
          onContinue={() => {
            setCelebrationType(null);
            completeM4Module();
            navigateTo('curriculum');
          }}
        />
      )}
    </div>
  );
};

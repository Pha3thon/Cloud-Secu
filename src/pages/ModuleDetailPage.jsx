import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Terminal,
  Play,
  Square,
  Lock,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { M4_NARRATIVE, M4_SLIDES, M4_LAB_TASKS } from '../data/m4Content';
import { TheorySlide } from '../components/TheorySlide';
import { SequentialTaskList } from '../components/SequentialTaskList';
import { LabConsole } from '../components/LabConsole';
import { LabLaunchLoader } from '../components/LabLaunchLoader';
import { CelebrationScreen } from '../components/CelebrationScreen';
import { useCourse } from '../context/CourseContext';

export const ModuleDetailPage = () => {
  const {
    navigateTo,
    slideProgress,
    updateSlideVisited,
    markSlidesCompleted,
    labProgress,
    startLab,
    endLab,
    submitTaskAnswer,
    completeModule
  } = useCourse();

  // Local active state
  const [activeStage, setActiveStage] = useState('theory'); // 'theory' | 'lab'
  const [isLaunching, setIsLaunching] = useState(false);
  const [showSkipTooltip, setShowSkipTooltip] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [consoleTab, setConsoleTab] = useState('vm');

  const m4SlideState = slideProgress.m4 || {
    currentSlide: 1,
    maxSlideVisited: 1,
    completed: false
  };

  const m4LabState = labProgress.m4 || {
    isLaunched: false,
    isRunning: false,
    elapsedSeconds: 0,
    activeTaskId: 'task-1',
    completedTasks: [],
    answers: {},
    isCompleted: false
  };

  const isTheoryCompleted = m4SlideState.completed;
  const currentSlideIndex = (m4SlideState.currentSlide || 1) - 1;

  // Handle slide change
  const handleSlideChange = (newIndex) => {
    updateSlideVisited('m4', newIndex + 1, M4_SLIDES.length);
  };

  // Handle finish theory
  const handleCompleteTheory = () => {
    markSlidesCompleted('m4');
    setActiveStage('lab');
  };

  // Launch lab animation trigger
  const handleLaunchLabClick = () => {
    if (!isTheoryCompleted) {
      setShowSkipTooltip(true);
      setTimeout(() => setShowSkipTooltip(false), 3000);
      return;
    }
    setIsLaunching(true);
  };

  const handleLaunchCompleted = () => {
    setIsLaunching(false);
    startLab('m4');
    setActiveStage('lab');
  };

  // Task answer submission
  const handleSubmitAnswer = (taskId, answer, correctAnswers, nextTaskId) => {
    const result = submitTaskAnswer('m4', taskId, answer, correctAnswers, nextTaskId);
    if (result.success) {
      // Check if this was the last task (task-4)
      if (taskId === 'task-4') {
        setTimeout(() => {
          completeModule('m4', 'm5');
          setShowCelebration(true);
        }, 500);
      }
    }
    return result;
  };

  // Format timer
  const formatTimer = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Top Breadcrumb & Header Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <button
          type="button"
          onClick={() => navigateTo('curriculum')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#0284c7',
            fontSize: '13.5px',
            fontWeight: '600'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Curriculum</span>
        </button>

        {/* Stage Selector Pills */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            padding: '3px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
          }}
        >
          <button
            onClick={() => setActiveStage('theory')}
            style={{
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: activeStage === 'theory' ? '700' : '500',
              color: activeStage === 'theory' ? '#0284c7' : '#64748b',
              backgroundColor: activeStage === 'theory' ? '#f0f9ff' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <BookOpen size={14} />
            <span>Stage 1: Theory Slides</span>
            {isTheoryCompleted && <CheckCircle2 size={13} color="#10b981" />}
          </button>

          <button
            onClick={() => {
              if (isTheoryCompleted) {
                setActiveStage('lab');
              } else {
                setShowSkipTooltip(true);
                setTimeout(() => setShowSkipTooltip(false), 3000);
              }
            }}
            style={{
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: activeStage === 'lab' ? '700' : '500',
              color: !isTheoryCompleted
                ? '#94a3b8'
                : activeStage === 'lab'
                ? '#0284c7'
                : '#64748b',
              backgroundColor: activeStage === 'lab' ? '#f0f9ff' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: isTheoryCompleted ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
              position: 'relative'
            }}
          >
            {isTheoryCompleted ? <Terminal size={14} /> : <Lock size={13} />}
            <span>Stage 2: Hands-on Lab</span>
            {m4LabState.isCompleted && <CheckCircle2 size={13} color="#10b981" />}
          </button>
        </div>
      </div>

      {/* Narrative Scenario Hero Banner */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px 28px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: '800',
              color: '#0284c7',
              backgroundColor: '#e0f2fe',
              padding: '2px 8px',
              borderRadius: '6px'
            }}
          >
            Module M4
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#0369a1',
              backgroundColor: '#e0f2fe',
              padding: '2px 8px',
              borderRadius: '12px'
            }}
          >
            Phase 2: Build
          </span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            3T + 4L = 7 Hours
          </span>
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          Our First Cloud Configuration — Building Your Own Cloud
        </h1>

        {/* Narrative Box */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            borderLeft: '4px solid #0284c7',
            padding: '12px 16px',
            borderRadius: '0 8px 8px 0',
            fontSize: '13.5px',
            color: '#334155',
            lineHeight: '1.6'
          }}
        >
          <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
            {M4_NARRATIVE.title}
          </div>
          <p style={{ fontStyle: 'italic', marginBottom: '6px', color: '#475569' }}>
            {M4_NARRATIVE.scenario}
          </p>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            {M4_NARRATIVE.context}
          </p>
        </div>
      </section>

      {/* Skip Warning Tooltip Alert if user tries to jump directly to lab */}
      {showSkipTooltip && (
        <div
          className="animate-pop-in"
          style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#92400e',
            fontSize: '13px'
          }}
        >
          <AlertCircle size={18} color="#d97706" style={{ flexShrink: 0 }} />
          <span>
            <strong>Theory Completion Required:</strong> Please complete all 7 theory slides before launching the hands-on lab environment.
          </span>
        </div>
      )}

      {/* STAGE 1: THEORY SLIDES VIEW */}
      {activeStage === 'theory' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TheorySlide
            slides={M4_SLIDES}
            currentSlideIndex={currentSlideIndex}
            onSlideChange={handleSlideChange}
            maxSlideVisited={m4SlideState.maxSlideVisited || 1}
            onCompleteTheory={handleCompleteTheory}
            isTheoryCompleted={isTheoryCompleted}
          />

          {/* Transition / Unlock Card when theory is done */}
          {isTheoryCompleted && (
            <div
              className="animate-slide-in"
              style={{
                backgroundColor: '#ecfdf5',
                borderRadius: '14px',
                border: '1.5px solid #a7f3d0',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#065f46', fontWeight: '800', fontSize: '15px' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Theory Stage Complete!</span>
                </div>
                <p style={{ fontSize: '13.5px', color: '#047857', marginTop: '4px' }}>
                  Nice work — you've covered the basics. Ready to build your first cloud environment?
                </p>
              </div>

              <button
                type="button"
                onClick={handleLaunchLabClick}
                style={{
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  padding: '11px 22px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.3)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#047857')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
              >
                <Play size={15} fill="#ffffff" />
                <span>Launch Hands-on Lab</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* STAGE 2: HANDS-ON LAB VIEW */}
      {activeStage === 'lab' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Lab Control Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            {/* Status indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {m4LabState.isRunning ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981'
                    }}
                    className="animate-pulse-green"
                  />
                  <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#065f46' }}>
                    Lab Running
                  </span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#94a3b8' }} />
                  <span style={{ fontSize: '13.5px', fontWeight: '600', color: '#64748b' }}>
                    Lab Offline
                  </span>
                </div>
              )}

              {/* Timer */}
              {m4LabState.isRunning && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    color: '#334155',
                    backgroundColor: '#f1f5f9',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}
                >
                  <Clock size={13} color="#64748b" />
                  <span>{formatTimer(m4LabState.elapsedSeconds || 0)}</span>
                </div>
              )}

              <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                Completed: {m4LabState.completedTasks?.length || 0} / {M4_LAB_TASKS.length} Tasks
              </span>
            </div>

            {/* Launch / End Button */}
            <div>
              {m4LabState.isRunning ? (
                <button
                  type="button"
                  onClick={() => endLab('m4')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    color: '#dc2626',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca'
                  }}
                >
                  <Square size={13} fill="#dc2626" />
                  <span>End Lab Session</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLaunchLabClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 18px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#ffffff',
                    backgroundColor: '#0284c7',
                    boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)'
                  }}
                >
                  <Play size={14} fill="#ffffff" />
                  <span>Launch Lab</span>
                </button>
              )}
            </div>
          </div>

          {/* Split-Screen Lab Workspace */}
          {m4LabState.isLaunched ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(340px, 1fr) minmax(440px, 1.25fr)',
                gap: '20px',
                alignItems: 'start'
              }}
              className="lab-split-screen"
            >
              {/* LEFT PANEL: Sequential Task List */}
              <div>
                <SequentialTaskList
                  tasks={M4_LAB_TASKS}
                  activeTaskId={m4LabState.activeTaskId || 'task-1'}
                  completedTasks={m4LabState.completedTasks || []}
                  answers={m4LabState.answers || {}}
                  onSubmitAnswer={handleSubmitAnswer}
                  onTaskFocus={(tabToOpen) => setConsoleTab(tabToOpen)}
                />
              </div>

              {/* RIGHT PANEL: Simulated Training Cloud Console */}
              <div style={{ position: 'sticky', top: '80px' }}>
                <LabConsole activeTab={consoleTab} onTabChange={setConsoleTab} />
              </div>
            </div>
          ) : (
            /* Pre-launch prompt card */
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '40px 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Terminal size={28} />
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                Ready to Provision Your First Cloud?
              </h3>

              <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '520px', lineHeight: '1.6' }}>
                Launch your dedicated containerized training environment. You'll complete 4 configuration-awareness tasks using the simulated Nimbus Cloud Console.
              </p>

              <button
                type="button"
                onClick={handleLaunchLabClick}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.3)'
                }}
              >
                <Play size={16} fill="#ffffff" />
                <span>Launch Lab Environment</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Reusable Lab Launch Loader Modal (Plays 4-6s animated sequence) */}
      {isLaunching && <LabLaunchLoader onComplete={handleLaunchCompleted} />}

      {/* Celebration Modal triggered upon Task 4 completion */}
      {showCelebration && (
        <CelebrationScreen
          onContinueToNextModule={() => {
            setShowCelebration(false);
            navigateTo('curriculum');
          }}
          onReviewModule={() => {
            setShowCelebration(false);
          }}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  HelpCircle,
  Play,
  RotateCcw,
  Clock,
  ExternalLink,
  AlertTriangle,
  Info,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { M4_LAB_CREDENTIALS } from '../data/m4Content';
import { LABS } from '../data/labsRegistry';

export const LabGuide = ({
  topicNumber = 1,
  labData,
  onResetLab,
  isReviewMode = false
}) => {
  const {
    m4State,
    simCloud,
    checkMyConfiguration,
    submitLabAnswer,
    startLabSession,
    pauseLabSession,
    navigateToM4Item,
    completeM4Module,
    navigateTo
  } = useCourse();

  // Collapsible Credentials Card
  const [credentialsOpen, setCredentialsOpen] = useState(true);
  const [copiedKey, setCopiedKey] = useState(null);

  // Active validation state per flag
  const [checkResult, setCheckResult] = useState({}); // { [flagNum]: { passed: bool, message: '' } }
  const [answers, setAnswers] = useState({}); // { [flagNum]: '' }
  const [answerResult, setAnswerResult] = useState({}); // { [flagNum]: { error: '' } }
  const [hintOpen, setHintOpen] = useState({}); // { [flagNum]: bool }

  // Lab reset confirmation dialog
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // FIX (Diag 2): Labs 2-7 were previously hard-coded or mis-keyed with a stale global active flag; now loaded purely from LABS[labId] registry and completedFlags.
  const labId = `lab${topicNumber}`;
  const lab = LABS[labId] || labData;

  const completedFlags = m4State.labCompletedFlags[labId] || m4State.labCompletedFlags[`lab-${topicNumber}`] || [];
  const isPassedLab = m4State.passedLabIds.includes(labId) || m4State.passedLabIds.includes(`lab-${topicNumber}`);
  const isAllPassed = completedFlags.length >= 3 || isPassedLab || isReviewMode;

  // Fix: activeFlagNum is dynamically derived from completedFlags, never corrupted by a stale global number
  const activeFlagNum = isAllPassed ? 3 : (completedFlags.length + 1);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunCheck = (flagNum) => {
    const result = checkMyConfiguration(labId, flagNum);
    setCheckResult((prev) => ({
      ...prev,
      [flagNum]: {
        passed: result.success,
        message: result.message
      }
    }));
  };

  const handleSubmit = (flagNum) => {
    const inputVal = answers[flagNum] || '';
    if (!inputVal.trim()) return;

    const res = submitLabAnswer(labId, flagNum, inputVal);
    if (!res.success) {
      setAnswerResult((prev) => ({
        ...prev,
        [flagNum]: { error: res.message || 'Incorrect answer. Check your configuration and try again.' }
      }));
    } else {
      setAnswerResult((prev) => ({
        ...prev,
        [flagNum]: { error: null }
      }));
    }
  };

  // Fix A.3: Leave workstation and continue to next topic or module
  const handleContinueAfterLab = () => {
    pauseLabSession();
    if (topicNumber < 6) {
      navigateToM4Item(topicNumber, 'slide', 0);
    } else if (topicNumber === 6) {
      navigateToM4Item(6, 'slide', 0);
    } else {
      completeM4Module();
      navigateTo('curriculum');
    }
  };

  // Format session timer
  const formatTimer = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Fix B.6: Friendly fallback if lab fails to load
  if (!lab) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
        <h3 style={{ color: '#0f172a', fontWeight: '800' }}>Lab Configuration Not Found</h3>
        <p style={{ color: '#64748b', fontSize: '13px' }}>The configuration for Lab {topicNumber} could not be loaded.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => onResetLab && onResetLab(labId)}
            style={{ padding: '8px 16px', backgroundColor: '#dc2626', color: '#fff', borderRadius: '6px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
          >
            Reset Lab
          </button>
          <button
            type="button"
            onClick={() => navigateToM4Item(topicNumber - 1, 'slide', 0)}
            style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', color: '#334155', borderRadius: '6px', fontWeight: '700', border: '1px solid #cbd5e1', cursor: 'pointer' }}
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
        overflowY: 'auto',
        paddingRight: '6px'
      }}
    >
      {/* Lab Header & Status Bar */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Green Pulsing Lab Running Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                backgroundColor: m4State.labSessionRunning ? '#10b981' : '#94a3b8'
              }}
              className={m4State.labSessionRunning ? 'animate-pulse' : ''}
            />
            <span style={{ fontSize: '12px', fontWeight: '800', color: m4State.labSessionRunning ? '#065f46' : '#64748b' }}>
              {m4State.labSessionRunning ? 'Lab Running' : 'Lab Paused'}
            </span>
          </div>

          {/* Session Timer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#f1f5f9',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '700',
              fontFamily: 'monospace',
              color: '#334155'
            }}
          >
            <Clock size={12} />
            <span>{formatTimer(m4State.labElapsedSeconds || 0)}</span>
          </div>
        </div>

        {/* Lab Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11.5px',
              color: '#dc2626',
              fontWeight: '600',
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid #fecaca',
              backgroundColor: '#fef2f2',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={12} />
            <span>Reset Lab</span>
          </button>

          <button
            type="button"
            onClick={() => {
              pauseLabSession();
              navigateToM4Item(topicNumber - 1, 'slide', 0);
            }}
            title="Leave workstation and return to course slides"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11.5px',
              color: '#334155',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <LogOut size={12} />
            <span>End Lab</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {resetConfirmOpen && (
        <div
          className="animate-pop-in"
          style={{
            padding: '16px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '10px',
            fontSize: '12.5px',
            color: '#991b1b',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div style={{ fontWeight: '800', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={15} />
            <span>Confirm Reset Lab</span>
          </div>
          <p style={{ margin: 0, lineHeight: '1.5', color: '#7f1d1d' }}>
            Reset this lab? Your flags and changes in this lab will be cleared and the workstation returns to how it was when the lab started. Earlier labs are not affected.
          </p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setResetConfirmOpen(false)}
              style={{
                padding: '6px 14px',
                backgroundColor: '#ffffff',
                color: '#334155',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setCheckResult({});
                setAnswers({});
                setAnswerResult({});
                setHintOpen({});
                setResetConfirmOpen(false);
                if (onResetLab) onResetLab(labKey);
              }}
              style={{
                padding: '6px 14px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                borderRadius: '6px',
                border: 'none',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(220, 38, 38, 0.3)'
              }}
            >
              Reset Lab
            </button>
          </div>
        </div>
      )}

      {/* Review Mode Banner if viewing completed lab */}
      {isReviewMode && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle2 size={16} />
          <span>
            <strong>Review Mode:</strong> All 3 flags for this lab have been passed. You can review instructions and explore the workstation without affecting saved progress.
          </span>
        </div>
      )}

      {/* Collapsible Lab Credentials Card */}
      <div
        style={{
          borderRadius: '10px',
          border: '1px solid #cbd5e1',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}
      >
        <button
          type="button"
          onClick={() => setCredentialsOpen(!credentialsOpen)}
          style={{
            width: '100%',
            padding: '10px 14px',
            backgroundColor: '#f8fafc',
            borderBottom: credentialsOpen ? '1px solid #e2e8f0' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            fontWeight: '800',
            color: '#0f172a',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🔑 Lab Credentials & Endpoints</span>
            <span style={{ fontSize: '10px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '1px 6px', borderRadius: '4px' }}>
              Quick Copy
            </span>
          </div>
          {credentialsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {credentialsOpen && (
          <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11.5px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '10.5px' }}>Horizon URL</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <code style={{ fontSize: '11px', color: '#0284c7' }}>{M4_LAB_CREDENTIALS.horizonUrl}</code>
                  <button type="button" onClick={() => handleCopy(M4_LAB_CREDENTIALS.horizonUrl, 'url')} style={{ cursor: 'pointer' }}>
                    {copiedKey === 'url' ? <Check size={12} color="#10b981" /> : <Copy size={12} color="#94a3b8" />}
                  </button>
                </div>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '10.5px' }}>Domain</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <code style={{ fontSize: '11px' }}>{M4_LAB_CREDENTIALS.domain}</code>
                  <button type="button" onClick={() => handleCopy(M4_LAB_CREDENTIALS.domain, 'dom')} style={{ cursor: 'pointer' }}>
                    {copiedKey === 'dom' ? <Check size={12} color="#10b981" /> : <Copy size={12} color="#94a3b8" />}
                  </button>
                </div>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '10.5px' }}>User Name</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <code style={{ fontSize: '11px', fontWeight: '700' }}>{M4_LAB_CREDENTIALS.username}</code>
                  <button type="button" onClick={() => handleCopy(M4_LAB_CREDENTIALS.username, 'user')} style={{ cursor: 'pointer' }}>
                    {copiedKey === 'user' ? <Check size={12} color="#10b981" /> : <Copy size={12} color="#94a3b8" />}
                  </button>
                </div>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '10.5px' }}>Password</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <code style={{ fontSize: '11px' }}>{M4_LAB_CREDENTIALS.password}</code>
                  <button type="button" onClick={() => handleCopy(M4_LAB_CREDENTIALS.password, 'pass')} style={{ cursor: 'pointer' }}>
                    {copiedKey === 'pass' ? <Check size={12} color="#10b981" /> : <Copy size={12} color="#94a3b8" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Test Personas in Lab 7 */}
            {topicNumber === 7 && (
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                <span style={{ color: '#0369a1', fontWeight: '700', display: 'block', fontSize: '11px', marginBottom: '4px' }}>
                  Test Personas (Created by QuickMart IT) — Password: <code>Welcome@123</code>
                </span>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {M4_LAB_CREDENTIALS.personas.map((p) => (
                    <span
                      key={p.username}
                      style={{
                        padding: '2px 8px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '4px',
                        fontSize: '11px'
                      }}
                    >
                      {p.username}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Priya Dialogue Intro Card */}
      {labData?.priyaIntro && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '10px',
            backgroundColor: '#f0fdfa',
            border: '1px solid #99f6e4',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#0d9488',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '12px',
              flexShrink: 0
            }}
          >
            P
          </div>
          <div style={{ fontSize: '12.5px', color: '#134e4a', lineHeight: '1.45' }}>
            <strong style={{ display: 'block', color: '#0f766e', fontSize: '11.5px', marginBottom: '2px' }}>
              Priya — Head of Cloud Platform
            </strong>
            "{labData.priyaIntro}"
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3 Flags Sequential Progression */}
      {/* =================================================================== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {labData?.flags?.map((flag) => {
          const isPassed = completedFlags.includes(flag.flagNumber);
          const isCurrent = flag.flagNumber === activeFlagNum && !isPassed;
          const isLocked = flag.flagNumber > activeFlagNum && !isPassed;

          // If flag is passed, collapse to summary bar unless review mode
          if (isPassed && !isReviewMode) {
            return (
              <div
                key={flag.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span style={{ fontWeight: '700', color: '#065f46' }}>
                    Flag {flag.flagNumber} Completed: {flag.objective}
                  </span>
                </div>
                {flag.priyaReply && (
                  <span style={{ fontSize: '11px', color: '#047857', fontStyle: 'italic' }}>
                    "{flag.priyaReply}"
                  </span>
                )}
              </div>
            );
          }

          // Render active or reviewable flag card
          return (
            <div
              key={flag.id}
              style={{
                borderRadius: '10px',
                border: isCurrent ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                backgroundColor: isLocked ? '#f8fafc' : '#ffffff',
                boxShadow: isCurrent ? '0 4px 6px -1px rgba(2, 132, 199, 0.08)' : 'none',
                opacity: isLocked ? 0.6 : 1,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {/* Flag Badge & Story Beat */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    backgroundColor: isPassed ? '#ecfdf5' : '#e0f2fe',
                    color: isPassed ? '#065f46' : '#0369a1'
                  }}
                >
                  Flag {flag.flagNumber} of 3
                </span>
                {isPassed && (
                  <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>✓ Solved</span>
                )}
              </div>

              {/* Story Beat */}
              <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#475569' }}>
                "{flag.storyBeat}"
              </p>

              {/* Objective */}
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                {flag.objective}
              </div>

              {/* Numbered Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b' }}>
                  Execution Steps:
                </span>
                <ol style={{ paddingLeft: '18px', margin: 0, fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {flag.steps.map((st, idx) => (
                    <li key={idx} style={{ lineHeight: '1.45' }}>{st}</li>
                  ))}
                </ol>
              </div>

              {/* Check My Configuration Button */}
              {!isPassed && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => handleRunCheck(flag.flagNumber)}
                    style={{
                      alignSelf: 'flex-start',
                      padding: '8px 16px',
                      backgroundColor: isLocked ? '#94a3b8' : '#0284c7',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '700',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: isLocked ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Check My Configuration
                  </button>

                  {/* Diagnostic feedback from Check My Configuration */}
                  {checkResult[flag.flagNumber] && (
                    <div
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: '600',
                        backgroundColor: checkResult[flag.flagNumber].passed ? '#ecfdf5' : '#fee2e2',
                        color: checkResult[flag.flagNumber].passed ? '#065f46' : '#991b1b',
                        border: `1px solid ${checkResult[flag.flagNumber].passed ? '#a7f3d0' : '#fecaca'}`
                      }}
                    >
                      {checkResult[flag.flagNumber].message}
                    </div>
                  )}
                </div>
              )}

              {/* Question Box (Appears ONLY after check passes or in review mode) */}
              {(checkResult[flag.flagNumber]?.passed || isPassed) && (
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '14px',
                    marginTop: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#0f172a' }}>
                      {flag.question}
                    </div>
                    {/* Hint Popover Toggle */}
                    <button
                      type="button"
                      onClick={() => setHintOpen((prev) => ({ ...prev, [flag.flagNumber]: !prev[flag.flagNumber] }))}
                      title="Need a hint?"
                      style={{ color: '#0284c7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: '600' }}
                    >
                      <HelpCircle size={14} />
                      <span>Hint</span>
                    </button>
                  </div>

                  {/* Hint Popover Content */}
                  {hintOpen[flag.flagNumber] && (
                    <div style={{ padding: '8px 12px', borderRadius: '6px', backgroundColor: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', fontSize: '11.5px' }}>
                      💡 {flag.hint}
                    </div>
                  )}

                  {/* Answer Input */}
                  {!isPassed ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Enter value..."
                        value={answers[flag.flagNumber] || ''}
                        onChange={(e) => setAnswers({ ...answers, [flag.flagNumber]: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(flag.flagNumber)}
                        style={{
                          flex: 1,
                          padding: '7px 10px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '12px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleSubmit(flag.flagNumber)}
                        style={{
                          padding: '7px 16px',
                          backgroundColor: '#059669',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: '700',
                          borderRadius: '6px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Submit Answer
                      </button>
                    </div>
                  ) : (
                    <div style={{ fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                      Answer Submitted: <code>{m4State.labAnswers[`flag-${topicNumber}-${flag.flagNumber}`] || flag.correctAnswers[0]}</code>
                    </div>
                  )}

                  {answerResult[flag.flagNumber]?.error && (
                    <div style={{ color: '#dc2626', fontSize: '11.5px', fontWeight: '600' }}>
                      {answerResult[flag.flagNumber].error}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Fix A.3: Primary Continue Button after lab completion */}
        {isAllPassed && (
          <div
            className="animate-pop-in"
            style={{
              marginTop: '16px',
              padding: '20px',
              backgroundColor: '#ecfdf5',
              borderRadius: '12px',
              border: '1.5px solid #10b981',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="#059669" />
              <span style={{ fontSize: '15px', fontWeight: '800', color: '#065f46' }}>
                {topicNumber === 7
                  ? 'Module M4 Completed!'
                  : topicNumber === 6
                  ? 'QuickMart is Live!'
                  : `Lab ${topicNumber} Completed!`}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#047857', lineHeight: '1.5' }}>
              {topicNumber === 7
                ? 'All three access audit flags have been resolved. Excellent work protecting QuickMart!'
                : topicNumber === 6
                ? 'Storefront is reachable on port 80, database port is blocked, and internal IP is unreachable.'
                : `All three flags solved. You are ready to move on to Topic ${topicNumber + 1}.`}
            </p>

            <button
              type="button"
              onClick={handleContinueAfterLab}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: '#059669',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: '800',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.3)',
                transition: 'background-color 150ms'
              }}
            >
              <span>
                {topicNumber < 6
                  ? `Continue to Topic ${topicNumber + 1}: ${lab.nextTopicTitle || ''}`
                  : topicNumber === 6
                  ? 'Continue to Topic 7: Users & Roles (Keystone)'
                  : 'Continue to Next Module'}
              </span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

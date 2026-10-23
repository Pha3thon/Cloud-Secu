import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import useStore from '@/hooks/useStore';
import { LABS } from '@/labs/registry';
import LabTopBar from './LabTopBar';
import LabCredentialsCard from './LabCredentialsCard';
import FlagCard from './FlagCard';
import ConfirmDialog from '@/components/common/ConfirmDialog';

/**
 * LabGuide component coordinating lab execution, step validation, and milestone transitions.
 */
export default function LabGuide({
  topicNumber = 1,
  labData,
  onResetLab,
  isReviewMode = false
}) {
  const {
    m4State,
    checkMyConfiguration,
    submitLabAnswer,
    pauseLabSession,
    navigateToM4Item,
    completeM4Module,
    navigateTo
  } = useStore();

  const [checkResult, setCheckResult] = useState({});
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const labId = `lab${topicNumber}`;
  const lab = LABS[labId] || labData;

  const completedFlags = m4State?.labCompletedFlags?.[labId] || m4State?.labCompletedFlags?.[`lab-${topicNumber}`] || [];
  const isPassedLab = m4State?.passedLabIds?.includes(labId) || m4State?.passedLabIds?.includes(`lab-${topicNumber}`);
  const isAllPassed = completedFlags.length >= 3 || isPassedLab || isReviewMode;
  const activeFlagNum = isAllPassed ? 3 : (completedFlags.length + 1);

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

  const handleSubmitAnswer = (flagNum, answerVal) => {
    return submitLabAnswer(labId, flagNum, answerVal);
  };

  const handleContinueAfterLab = () => {
    pauseLabSession?.();
    if (topicNumber < 6) {
      navigateToM4Item(topicNumber, 'slide', 0);
    } else if (topicNumber === 6) {
      navigateToM4Item(6, 'slide', 0);
    } else {
      completeM4Module();
      navigateTo('curriculum');
    }
  };

  if (!lab) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
        <h3 style={{ color: '#0f172a', fontWeight: '800' }}>Lab Configuration Not Found</h3>
        <p style={{ color: '#64748b', fontSize: '13px' }}>The configuration for Lab {topicNumber} could not be loaded.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => onResetLab?.(labId)}
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
      {/* Top status bar */}
      <LabTopBar
        isRunning={m4State?.labSessionRunning ?? true}
        elapsedSeconds={m4State?.labElapsedSeconds || 0}
        onResetClick={() => setResetConfirmOpen(true)}
        onEndLabClick={() => {
          pauseLabSession?.();
          navigateToM4Item(topicNumber - 1, 'slide', 0);
        }}
      />

      {/* Review Mode Banner */}
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

      {/* Credentials Card */}
      <LabCredentialsCard topicNumber={topicNumber} />

      {/* Priya Dialogue Intro */}
      {lab.priyaIntro && (
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
            "{lab.priyaIntro}"
          </div>
        </div>
      )}

      {/* 3 Flags Sequential Progression */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {lab.flags?.map((flag) => {
          const isPassed = completedFlags.includes(flag.flagNumber);
          const isCurrent = flag.flagNumber === activeFlagNum && !isPassed;
          const isLocked = flag.flagNumber > activeFlagNum && !isPassed;

          return (
            <FlagCard
              key={flag.id}
              flag={flag}
              isPassed={isPassed}
              isCurrent={isCurrent}
              isLocked={isLocked}
              isReviewMode={isReviewMode}
              topicNumber={topicNumber}
              submittedAnswer={m4State?.labAnswers?.[`flag-${topicNumber}-${flag.flagNumber}`]}
              checkResult={checkResult[flag.flagNumber]}
              onRunCheck={handleRunCheck}
              onSubmitAnswer={handleSubmitAnswer}
            />
          );
        })}

        {/* Continue to next topic or module button */}
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
                boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.3)'
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

      {/* Lab Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        onConfirm={() => {
          setCheckResult({});
          setResetConfirmOpen(false);
          onResetLab?.(labId);
        }}
        title="Confirm Reset Lab"
        message="Reset this lab? Your flags and changes in this lab will be cleared and the workstation returns to how it was when the lab started. Earlier labs are not affected."
        confirmText="Reset Lab"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}

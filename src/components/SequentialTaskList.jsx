import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const SequentialTaskList = ({
  tasks,
  activeTaskId,
  completedTasks = [],
  answers = {},
  onSubmitAnswer,
  onTaskFocus
}) => {
  const [userInputs, setUserInputs] = useState({});
  const [activeHintTaskId, setActiveHintTaskId] = useState(null);
  const [feedbackMessages, setFeedbackMessages] = useState({});
  const [expandedCompletedTaskId, setExpandedCompletedTaskId] = useState(null);

  const handleInputChange = (taskId, value) => {
    setUserInputs((prev) => ({ ...prev, [taskId]: value }));
    // Clear feedback on type
    if (feedbackMessages[taskId]) {
      setFeedbackMessages((prev) => ({ ...prev, [taskId]: null }));
    }
  };

  const handleCheckAnswer = (task) => {
    const answer = userInputs[task.id] || '';
    if (!answer.trim()) {
      setFeedbackMessages((prev) => ({
        ...prev,
        [task.id]: { type: 'error', text: 'Please enter an answer to check.' }
      }));
      return;
    }

    const nextTask = tasks.find((t) => t.taskNumber === task.taskNumber + 1);
    const result = onSubmitAnswer(
      task.id,
      answer,
      task.correctAnswers,
      nextTask ? nextTask.id : null
    );

    if (result.success) {
      setFeedbackMessages((prev) => ({
        ...prev,
        [task.id]: { type: 'success', text: task.explanation }
      }));
      if (onTaskFocus && nextTask) {
        onTaskFocus(nextTask.consoleTabToHighlight);
      }
    } else {
      setFeedbackMessages((prev) => ({
        ...prev,
        [task.id]: { type: 'error', text: result.message }
      }));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {tasks.map((task) => {
        const isCompleted = completedTasks.includes(task.id);
        const isActive = activeTaskId === task.id && !isCompleted;
        const isManuallyExpanded = expandedCompletedTaskId === task.id;

        // COMPACT COMPLETED STATE
        if (isCompleted && !isManuallyExpanded) {
          return (
            <div
              key={task.id}
              className="animate-pop-in"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #a7f3d0',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#065f46' }}>
                    Task {task.taskNumber}: {task.title}
                  </span>
                  <div style={{ fontSize: '11px', color: '#047857' }}>
                    Answer: <code style={{ fontWeight: '600' }}>{answers[task.id] || 'Verified'}</code>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExpandedCompletedTaskId(task.id)}
                style={{
                  fontSize: '11.5px',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#ecfdf5'
                }}
              >
                <span>Review</span>
                <ChevronDown size={14} />
              </button>
            </div>
          );
        }

        // EXPANDED COMPLETED OR ACTIVE TASK
        if (isActive || isManuallyExpanded) {
          return (
            <div
              key={task.id}
              className="animate-slide-in"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: isCompleted ? '1px solid #10b981' : '2px solid #0284c7',
                boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.08), 0 2px 4px -2px rgba(2, 132, 199, 0.05)',
                overflow: 'hidden'
              }}
            >
              {/* Task Header */}
              <div
                style={{
                  padding: '14px 20px',
                  backgroundColor: isCompleted ? '#ecfdf5' : '#f0f9ff',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      backgroundColor: isCompleted ? '#10b981' : '#0284c7',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}
                  >
                    Task {task.taskNumber}
                  </span>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                    {task.title}
                  </h3>
                </div>

                {isCompleted && (
                  <button
                    type="button"
                    onClick={() => setExpandedCompletedTaskId(null)}
                    style={{
                      fontSize: '11px',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Collapse</span>
                    <ChevronUp size={14} />
                  </button>
                )}
              </div>

              {/* Task Body */}
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.6' }}>
                  {task.description}
                </p>

                {/* Optional Task Reference Image */}
                {task.imageUrl && (
                  <div
                    style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#f8fafc',
                      maxHeight: '260px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={task.imageUrl}
                      alt={task.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '260px',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>
                )}

                {/* Hint Button & Popover */}
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveHintTaskId(activeHintTaskId === task.id ? null : task.id)
                    }
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#d97706',
                      backgroundColor: '#fffbeb',
                      border: '1px solid #fde68a',
                      borderRadius: '8px',
                      padding: '5px 10px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Lightbulb size={14} />
                    <span>{activeHintTaskId === task.id ? 'Hide Hint' : 'Need a hint? (💡)'}</span>
                  </button>

                  {/* Hint Popover */}
                  {activeHintTaskId === task.id && (
                    <div
                      className="animate-popover"
                      style={{
                        marginTop: '8px',
                        padding: '12px 14px',
                        backgroundColor: '#fffbeb',
                        border: '1px solid #fde68a',
                        borderRadius: '8px',
                        fontSize: '12.5px',
                        color: '#92400e',
                        lineHeight: '1.5',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px'
                      }}
                    >
                      <Sparkles size={16} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>Hint: </strong> {task.hint}
                      </div>
                    </div>
                  )}
                </div>

                {/* Configuration-Awareness Question Input */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    padding: '14px 16px'
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '8px'
                    }}
                  >
                    {task.question}
                  </label>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      disabled={isCompleted}
                      placeholder={task.placeholder}
                      value={isCompleted ? answers[task.id] || '' : userInputs[task.id] || ''}
                      onChange={(e) => handleInputChange(task.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isCompleted) {
                          handleCheckAnswer(task);
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13.5px',
                        color: '#0f172a',
                        backgroundColor: isCompleted ? '#f1f5f9' : '#ffffff',
                        outline: 'none'
                      }}
                    />

                    {!isCompleted && (
                      <button
                        type="button"
                        onClick={() => handleCheckAnswer(task)}
                        style={{
                          backgroundColor: '#0284c7',
                          color: '#ffffff',
                          padding: '9px 18px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0369a1')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0284c7')}
                      >
                        <span>Check Answer</span>
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>

                  {/* Feedback Message */}
                  {feedbackMessages[task.id] && (
                    <div
                      className="animate-slide-in"
                      style={{
                        marginTop: '10px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        fontSize: '12.5px',
                        lineHeight: '1.5',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        backgroundColor:
                          feedbackMessages[task.id].type === 'success' ? '#ecfdf5' : '#fef2f2',
                        border:
                          feedbackMessages[task.id].type === 'success'
                            ? '1px solid #a7f3d0'
                            : '1px solid #fecaca',
                        color:
                          feedbackMessages[task.id].type === 'success' ? '#065f46' : '#991b1b'
                      }}
                    >
                      {feedbackMessages[task.id].type === 'success' ? (
                        <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      ) : (
                        <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                      )}
                      <span>{feedbackMessages[task.id].text}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }

        // LOCKED STUB TASK (Future task)
        return (
          <div
            key={task.id}
            style={{
              backgroundColor: '#fafbfc',
              borderRadius: '12px',
              border: '1px dashed #cbd5e1',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: 0.6
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#e2e8f0',
                  color: '#64748b',
                  fontSize: '11px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {task.taskNumber}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                Task {task.taskNumber}: {task.title}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>
              Locked until previous task completes
            </span>
          </div>
        );
      })}
    </div>
  );
};

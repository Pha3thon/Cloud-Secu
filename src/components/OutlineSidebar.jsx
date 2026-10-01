import React, { useState } from 'react';
import {
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Terminal,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { M4_TOPICS } from '../data/m4Content';

export const OutlineSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const {
    m4State,
    navigateToM4Item,
    isItemCompleted,
    isItemLocked
  } = useCourse();

  // Collapsed state per topic section
  const [openTopics, setOpenTopics] = useState(() => {
    const initial = {};
    M4_TOPICS.forEach((_, idx) => {
      initial[idx] = true;
    });
    return initial;
  });

  const toggleTopicAccordion = (idx) => {
    setOpenTopics((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (isCollapsed) {
    return (
      <div
        style={{
          width: '42px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px 0',
          gap: '12px'
        }}
      >
        <button
          type="button"
          onClick={onToggleCollapse}
          title="Expand Outline Sidebar"
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            backgroundColor: '#f1f5f9',
            border: '1px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#334155'
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '290px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto'
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          padding: '16px 14px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', color: '#0284c7', letterSpacing: '0.04em' }}>
            Module M4 Curriculum
          </span>
          <h3 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a' }}>
            Course Outline
          </h3>
        </div>
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Collapse Sidebar"
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <ChevronLeft size={15} />
          </button>
        )}
      </div>

      {/* Topics List */}
      <div style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {M4_TOPICS.map((topic, topicIdx) => {
          const isOpen = openTopics[topicIdx];
          const isTopicLocked = isItemLocked(topicIdx, 'slide', 0) && isItemLocked(topicIdx, 'lab');

          return (
            <div
              key={topic.id}
              style={{
                borderRadius: '8px',
                border: '1px solid #f1f5f9',
                backgroundColor: isTopicLocked ? '#f8fafc' : '#ffffff',
                overflow: 'hidden'
              }}
            >
              {/* Topic Accordion Header */}
              <button
                type="button"
                onClick={() => toggleTopicAccordion(topicIdx)}
                style={{
                  width: '100%',
                  padding: '10px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f8fafc',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  {isTopicLocked ? (
                    <Lock size={13} color="#94a3b8" />
                  ) : (
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#0284c7' }}>
                      T{topic.topicNumber}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: isTopicLocked ? '#94a3b8' : '#0f172a',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {topic.title}
                  </span>
                </div>
                {isOpen ? <ChevronDown size={14} color="#64748b" /> : <ChevronRight size={14} color="#64748b" />}
              </button>

              {/* Topic Sub-items (Slides + Lab) */}
              {isOpen && (
                <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {/* Slides */}
                  {topic.slides.map((slide, slideIdx) => {
                    const isDone = isItemCompleted(slide.id);
                    const isCur =
                      m4State.currentTopicIndex === topicIdx &&
                      m4State.currentItemType === 'slide' &&
                      m4State.currentSlideIndex === slideIdx;
                    const isLock = isItemLocked(topicIdx, 'slide', slideIdx);

                    return (
                      <button
                        key={slide.id}
                        type="button"
                        disabled={isLock}
                        aria-disabled={isLock}
                        title={isLock ? 'Complete the previous item to unlock' : `${slide.code} ${slide.title}`}
                        onClick={() => !isLock && navigateToM4Item(topicIdx, 'slide', slideIdx)}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '11.5px',
                          backgroundColor: isCur ? '#e0f2fe' : 'transparent',
                          color: isCur ? '#0369a1' : isLock ? '#94a3b8' : '#334155',
                          cursor: isLock ? 'not-allowed' : 'pointer',
                          border: 'none',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '10.5px' }}>
                            {slide.code}
                          </span>
                          <span style={{ fontWeight: isCur ? '700' : '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {slide.title}
                          </span>
                        </div>
                        {isDone ? (
                          <CheckCircle2 size={12} color="#10b981" />
                        ) : isLock ? (
                          <Lock size={11} color="#cbd5e1" />
                        ) : isCur ? (
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0284c7' }} />
                        ) : null}
                      </button>
                    );
                  })}

                  {/* Topic 1 Lab Briefing item (placed after slide 1.5) */}
                  {topic.hasBriefing && (
                    (() => {
                      const isDone = isItemCompleted('t1-briefing');
                      const isCur = m4State.currentTopicIndex === topicIdx && m4State.currentItemType === 'briefing';
                      const isLock = isItemLocked(topicIdx, 'briefing');

                      return (
                        <button
                          key="briefing"
                          type="button"
                          disabled={isLock}
                          aria-disabled={isLock}
                          title={isLock ? 'Complete slide 1.5 to unlock' : 'Lab Briefing: Your Mission'}
                          onClick={() => !isLock && navigateToM4Item(topicIdx, 'briefing')}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '11.5px',
                            backgroundColor: isCur ? '#e0f2fe' : 'transparent',
                            color: isCur ? '#0369a1' : isLock ? '#94a3b8' : '#334155',
                            cursor: isLock ? 'not-allowed' : 'pointer',
                            border: 'none',
                            textAlign: 'left'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                            <BookOpen size={12} color={isCur ? '#0284c7' : '#64748b'} />
                            <span style={{ fontWeight: isCur ? '700' : '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              Lab Briefing
                            </span>
                          </div>
                          {isDone ? (
                            <CheckCircle2 size={12} color="#10b981" />
                          ) : isLock ? (
                            <Lock size={11} color="#cbd5e1" />
                          ) : isCur ? (
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0284c7' }} />
                          ) : null}
                        </button>
                      );
                    })()
                  )}

                  {/* Lab Node */}
                  {(() => {
                    const labKey = `lab-${topic.topicNumber}`;
                    const isDone = m4State.passedLabIds.includes(labKey);
                    const isCur =
                      m4State.currentTopicIndex === topicIdx &&
                      m4State.currentItemType === 'lab';
                    const isLock = isItemLocked(topicIdx, 'lab');

                    return (
                      <button
                        type="button"
                        disabled={isLock}
                        aria-disabled={isLock}
                        title={isLock ? 'Complete previous slides to unlock lab' : `Lab ${topic.topicNumber}`}
                        onClick={() => !isLock && navigateToM4Item(topicIdx, 'lab')}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '11.5px',
                          backgroundColor: isCur ? '#f0fdfa' : 'transparent',
                          color: isCur ? '#0f766e' : isLock ? '#94a3b8' : '#0d9488',
                          fontWeight: '700',
                          cursor: isLock ? 'not-allowed' : 'pointer',
                          border: 'none',
                          textAlign: 'left',
                          marginTop: '2px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                          <Terminal size={12} color={isCur ? '#0d9488' : '#14b8a6'} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            LAB {topic.topicNumber} (3 Flags)
                          </span>
                        </div>
                        {isDone ? (
                          <CheckCircle2 size={12} color="#10b981" />
                        ) : isLock ? (
                          <Lock size={11} color="#cbd5e1" />
                        ) : isCur ? (
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0d9488' }} />
                        ) : null}
                      </button>
                    );
                  })()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

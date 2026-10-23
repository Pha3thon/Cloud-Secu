import React, { useState } from 'react';
import {
  Lock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Terminal,
  ChevronLeft
} from 'lucide-react';
import useStore from '@/hooks/useStore';
import { M4_TOPICS } from '@/content/m4';
import { M1_TOPICS } from '@/content/m1';
import { M0_TOPICS } from '@/content/m0';
import SidebarItem from './SidebarItem';

/**
 * OutlineSidebar component for displaying Module outline and progress.
 * Supports M0 (Orientation), M1 (Foundations), and M4 (OpenStack Build).
 */
export default function OutlineSidebar({
  isCollapsed = false,
  onToggleCollapse,
  moduleId = 'm4',
  m0SlideIndex = 0,
  onSelectM0Slide
}) {
  const isM0 = moduleId === 'm0';
  const isM1 = moduleId === 'm1';

  const {
    m1State,
    m4State,
    navigateToM1Item,
    navigateToM4Item,
    isItemCompleted,
    isItemLocked
  } = useStore();

  const activeState = isM1 ? (m1State || {}) : m4State;
  const navigateItem = isM1 ? navigateToM1Item : navigateToM4Item;
  const topics = isM0 ? M0_TOPICS : (isM1 ? M1_TOPICS : M4_TOPICS);

  // Collapsed state per topic section
  const [openTopics, setOpenTopics] = useState(() => {
    const initial = {};
    topics.forEach((_, idx) => {
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
          borderRight: '1px solid var(--border-subtle, #e2e8f0)',
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
            borderRadius: 'var(--radius-md, 6px)',
            backgroundColor: '#f1f5f9',
            border: '1px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-main, #334155)'
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
        borderRight: '1px solid var(--border-subtle, #e2e8f0)',
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
          borderBottom: '1px solid var(--border-subtle, #e2e8f0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: '800',
              textTransform: 'uppercase',
              color: isM0 ? '#4f46e5' : 'var(--brand-primary, #0284c7)',
              letterSpacing: '0.04em'
            }}
          >
            {isM0 ? 'Phase 0 · Orientation' : isM1 ? 'Module M1 Foundations' : 'Module M4 Curriculum'}
          </span>
          <h3 style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-main, #0f172a)', margin: 0 }}>
            {isM0 ? 'Orientation Slides' : 'Course Outline'}
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
              borderRadius: 'var(--radius-md, 6px)',
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted, #64748b)'
            }}
          >
            <ChevronLeft size={15} />
          </button>
        )}
      </div>

      {/* Topics / Slides List */}
      <div style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {isM0 ? (
          <div
            style={{
              borderRadius: 'var(--radius-lg, 8px)',
              border: '1px solid #e0e7ff',
              backgroundColor: '#ffffff',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: '100%',
                padding: '10px 10px',
                backgroundColor: '#f5f3ff',
                borderBottom: '1px solid #e0e7ff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#4f46e5' }}>
                Phase 0
              </span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                Course Orientation
              </span>
            </div>
            <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {M0_TOPICS[0].slides.map((slide, slideIdx) => {
                const isCur = m0SlideIndex === slideIdx;
                return (
                  <SidebarItem
                    key={slide.id}
                    code={slide.code}
                    label={slide.title}
                    isDone={false}
                    isCurrent={isCur}
                    isLocked={false}
                    onClick={() => onSelectM0Slide?.(slideIdx)}
                    title={`${slide.code} ${slide.title}`}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          topics.map((topic, topicIdx) => {
            const isOpen = openTopics[topicIdx];
            const hasLab = Boolean(topic.lab);
            const isTopicLocked = isItemLocked(topicIdx, 'slide', 0, moduleId) && (!hasLab || isItemLocked(topicIdx, 'lab', 0, moduleId));

            return (
              <div
                key={topic.id}
                style={{
                  borderRadius: 'var(--radius-lg, 8px)',
                  border: '1px solid var(--border-subtle, #f1f5f9)',
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
                      <Lock size={13} color="var(--text-muted, #94a3b8)" />
                    ) : (
                      <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--brand-primary, #0284c7)' }}>
                        T{topic.topicNumber}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: isTopicLocked ? 'var(--text-muted, #94a3b8)' : 'var(--text-main, #0f172a)',
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

                {/* Topic Sub-items (Slides + Briefing + Lab) */}
                {isOpen && (
                  <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {/* Slides */}
                    {topic.slides.map((slide, slideIdx) => {
                      const isDone = isItemCompleted(slide.id, moduleId);
                      const isCur =
                        activeState.currentTopicIndex === topicIdx &&
                        activeState.currentItemType === 'slide' &&
                        activeState.currentSlideIndex === slideIdx;
                      const isLock = isItemLocked(topicIdx, 'slide', slideIdx, moduleId);

                      return (
                        <SidebarItem
                          key={slide.id}
                          code={slide.code}
                          label={slide.title}
                          isDone={isDone}
                          isCurrent={isCur}
                          isLocked={isLock}
                          onClick={() => navigateItem(topicIdx, 'slide', slideIdx)}
                          title={isLock ? 'Complete the previous item to unlock' : `${slide.code} ${slide.title}`}
                        />
                      );
                    })}

                    {/* Topic Lab Briefing item if present */}
                    {topic.hasBriefing && (() => {
                      const briefingKey = isM1 ? `m1-t${topic.topicNumber}-briefing` : `t${topic.topicNumber}-briefing`;
                      const isDone = isItemCompleted(briefingKey, moduleId);
                      const isCur = activeState.currentTopicIndex === topicIdx && activeState.currentItemType === 'briefing';
                      const isLock = isItemLocked(topicIdx, 'briefing', 0, moduleId);

                      return (
                        <SidebarItem
                          key="briefing"
                          icon={BookOpen}
                          label="Lab Briefing"
                          isDone={isDone}
                          isCurrent={isCur}
                          isLocked={isLock}
                          onClick={() => navigateItem(topicIdx, 'briefing')}
                          title={isLock ? 'Complete slides to unlock' : 'Lab Briefing: Your Mission'}
                        />
                      );
                    })()}

                    {/* Lab Node if this topic has an attached lab */}
                    {hasLab && (() => {
                      const labKey = isM1
                        ? (topic.lab.id || `m1-lab${topic.lab.order || topic.topicNumber}`)
                        : `lab-${topic.topicNumber}`;
                      const isDone =
                        activeState.passedLabIds?.includes(labKey) ||
                        activeState.passedLabIds?.includes(labKey.replace('-', ''));
                      const isCur =
                        activeState.currentTopicIndex === topicIdx &&
                        activeState.currentItemType === 'lab';
                      const isLock = isItemLocked(topicIdx, 'lab', 0, moduleId);

                      const flagCount = topic.lab.flags?.length || 3;

                      return (
                        <SidebarItem
                          key="lab"
                          icon={Terminal}
                          label={isM1 ? `LAB: ${topic.lab.title?.split(':')[1] || topic.lab.title} (${flagCount} Flags)` : `LAB ${topic.topicNumber} (3 Flags)`}
                          variant="lab"
                          isDone={isDone}
                          isCurrent={isCur}
                          isLocked={isLock}
                          onClick={() => navigateItem(topicIdx, 'lab')}
                          title={isLock ? 'Complete previous slides to unlock lab' : `Lab ${topic.topicNumber}`}
                        />
                      );
                    })()}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

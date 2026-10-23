import React from 'react';
import { Plus, Copy, Trash2, ChevronRight, BookOpen, Terminal } from 'lucide-react';

/**
 * SidebarTree component for navigating and reorganizing topics and slides in Admin editor.
 */
export default function SidebarTree({
  topics = [],
  selectedTopicIdx = 0,
  selectedSlideIdx = 0,
  onSelectTopic,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onAddTopic
}) {
  return (
    <div
      style={{
        width: '260px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid var(--border-subtle, #e2e8f0)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--border-subtle, #e2e8f0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-main, #0f172a)' }}>
          Course Content Tree
        </span>
        <button
          type="button"
          onClick={onAddTopic}
          title="Add New Topic"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: '700',
            backgroundColor: '#e0f2fe',
            color: 'var(--brand-primary, #0369a1)',
            padding: '3px 8px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Plus size={12} />
          <span>Topic</span>
        </button>
      </div>

      {/* Tree items */}
      <div style={{ padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {topics.map((topic, tIdx) => {
          const isTopicSelected = selectedTopicIdx === tIdx;

          return (
            <div
              key={topic.id || tIdx}
              style={{
                borderRadius: '6px',
                border: isTopicSelected ? '1px solid #bae6fd' : '1px solid transparent',
                backgroundColor: isTopicSelected ? '#f8fafc' : 'transparent',
                overflow: 'hidden'
              }}
            >
              {/* Topic header */}
              <button
                type="button"
                onClick={() => onSelectTopic?.(tIdx)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: isTopicSelected ? '#f0f9ff' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                  <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--brand-primary, #0284c7)' }}>
                    T{topic.topicNumber}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: isTopicSelected ? '700' : '600',
                      color: 'var(--text-main, #0f172a)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {topic.title}
                  </span>
                </div>
                <ChevronRight size={13} color="#94a3b8" />
              </button>

              {/* Nested slides if topic is active */}
              {isTopicSelected && (
                <div style={{ padding: '4px 6px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {topic.slides?.map((slide, sIdx) => {
                    const isSlideSelected = selectedSlideIdx === sIdx;

                    return (
                      <div
                        key={slide.id || sIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '5px 8px',
                          borderRadius: '4px',
                          backgroundColor: isSlideSelected ? 'var(--brand-primary, #0284c7)' : 'transparent',
                          color: isSlideSelected ? '#ffffff' : 'var(--text-main, #334155)',
                          fontSize: '11.5px',
                          cursor: 'pointer'
                        }}
                        onClick={() => onSelectSlide?.(sIdx)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '10px' }}>
                            {slide.code || `${topic.topicNumber}.${sIdx + 1}`}
                          </span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {slide.title}
                          </span>
                        </div>

                        {/* Action buttons on slide */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDuplicateSlide?.(sIdx);
                            }}
                            title="Duplicate slide"
                            style={{
                              background: 'none',
                              border: 'none',
                              color: isSlideSelected ? '#ffffff' : '#94a3b8',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                          >
                            <Copy size={11} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteSlide?.(sIdx);
                            }}
                            title="Delete slide"
                            style={{
                              background: 'none',
                              border: 'none',
                              color: isSlideSelected ? '#ffffff' : '#94a3b8',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Add slide button */}
                  <button
                    type="button"
                    onClick={onAddSlide}
                    style={{
                      marginTop: '4px',
                      padding: '5px 8px',
                      borderRadius: '4px',
                      border: '1px dashed #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: 'var(--brand-primary, #0284c7)',
                      fontSize: '11px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={11} />
                    <span>Add Slide</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

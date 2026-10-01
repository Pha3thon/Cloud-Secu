import React, { useState, useEffect } from 'react';
import {
  Save,
  Eye,
  LogOut,
  Upload,
  Crop,
  Plus,
  Trash2,
  Copy,
  AlertTriangle,
  CheckCircle2,
  Bold,
  Italic,
  Type,
  ImageIcon,
  X,
  Link,
  BookOpen,
  Terminal,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Move,
  RotateCcw
} from 'lucide-react';
import { MODULES_DATA } from '../data/courseData';
import { M4_TOPICS, M4_BRIEFING, M4_LAB_CREDENTIALS } from '../data/m4Content';
import { useCourse } from '../context/CourseContext';
import { SceneAnimation } from '../components/SceneAnimation';
import { ImageCropModal } from '../components/ImageCropModal';
import { LabGuide } from '../components/LabGuide';
import { KaliWorkstation } from '../components/KaliWorkstation';

// // TODO: replace with real CMS API
export const AdminDashboardPage = () => {
  const {
    logout,
    saveAdminContent,
    getModuleTopics,
    previewUnlockAll,
    setPreviewUnlockAll,
    autoCompleteCurrentLab
  } = useCourse();

  // Top Bar Module Selector
  const [selectedModuleId, setSelectedModuleId] = useState('m4');

  // Bottom Tab Mode: 'slides' | 'lab'
  const [activeBottomTab, setActiveBottomTab] = useState('slides');

  // Tree Selection: active topic index & active slide index
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);
  const [selectedSlideIdx, setSelectedSlideIdx] = useState(0);

  // Selected element for Properties Panel: 'title' | 'body' | 'callout' | 'knowMore' | 'media' | null
  const [selectedElement, setSelectedElement] = useState(null);

  // Draft topics state for editing
  const [topics, setTopics] = useState(() => {
    return JSON.parse(JSON.stringify(getModuleTopics('m4')));
  });

  // Briefing and Credentials draft state
  const [briefingDraft, setBriefingDraft] = useState(() => JSON.parse(JSON.stringify(M4_BRIEFING)));
  const [credentialsDraft, setCredentialsDraft] = useState(() => JSON.parse(JSON.stringify(M4_LAB_CREDENTIALS)));

  // Tracking unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Floating text toolbar state
  const [textFormatting, setTextFormatting] = useState({ bold: false, italic: false, fontSize: 14, color: '#0f172a' });

  // Media Replacement & Crop State
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropTargetImage, setCropTargetImage] = useState(null);
  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [tempUrlInput, setTempUrlInput] = useState('');

  // Student Preview Modal (isolated preview state)
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState('slide'); // 'slide' | 'lab'
  const [previewSlideIdx, setPreviewSlideIdx] = useState(0);

  const currentTopic = topics[selectedTopicIdx] || topics[0];
  const currentSlide = currentTopic?.slides ? currentTopic.slides[selectedSlideIdx] || currentTopic.slides[0] : null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Browser-native beforeunload prompt if unsaved changes exist
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Handle module selector switch
  const handleSelectModule = (modId) => {
    if (modId === selectedModuleId) return;
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Leave anyway?');
      if (!confirmLeave) return;
    }
    setSelectedModuleId(modId);
    if (modId === 'm4') {
      setTopics(JSON.parse(JSON.stringify(getModuleTopics('m4'))));
    } else {
      // Baseline template for stub modules
      setTopics([
        {
          id: `topic-${modId}-1`,
          topicNumber: 1,
          title: `${modId.toUpperCase()} Cloud Architecture Overview`,
          service: 'Core',
          slides: [
            {
              id: '1.1',
              code: '1.1',
              title: `Introduction to ${modId.toUpperCase()}`,
              textLines: [
                `Welcome to module ${modId.toUpperCase()}.`,
                'This module content can be directly customized here in the Canva-lite editor.',
                'Click any element to edit text, upload media, or configure learning objectives.'
              ],
              realLifeExample: {
                title: 'Operational Baseline',
                analogy: 'Establishing the architectural foundation before live operations.'
              },
              sceneKey: 'scene_1_1'
            }
          ],
          lab: {
            id: `lab-${modId}-1`,
            topicNumber: 1,
            title: `Lab 1: ${modId.toUpperCase()} Baseline`,
            priyaIntro: `Let's begin configuration for ${modId.toUpperCase()}.`,
            flags: [
              {
                id: 'flag-1',
                flagNumber: 1,
                storyBeat: 'Verify platform connectivity.',
                objective: 'Inspect active cluster nodes.',
                steps: ['Verify node status in the console.'],
                question: 'What is the cluster status?',
                correctAnswers: ['active', 'ready'],
                hint: 'Look for the green status badge.'
              }
            ]
          }
        }
      ]);
    }
    setSelectedTopicIdx(0);
    setSelectedSlideIdx(0);
    setSelectedElement(null);
    setHasUnsavedChanges(false);
  };

  // Mutate current slide
  const updateCurrentSlide = (patch) => {
    setTopics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const targetTopic = next[selectedTopicIdx];
      if (targetTopic && targetTopic.slides && targetTopic.slides[selectedSlideIdx]) {
        targetTopic.slides[selectedSlideIdx] = {
          ...targetTopic.slides[selectedSlideIdx],
          ...patch
        };
      }
      return next;
    });
    setHasUnsavedChanges(true);
  };

  // Add / Duplicate / Delete Slide
  const handleAddSlide = () => {
    setTopics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const targetTopic = next[selectedTopicIdx];
      if (!targetTopic.slides) targetTopic.slides = [];
      const newSlideNum = targetTopic.slides.length + 1;
      const newSlide = {
        id: `${targetTopic.topicNumber}.${newSlideNum}`,
        code: `${targetTopic.topicNumber}.${newSlideNum}`,
        title: `New Concept ${newSlideNum}`,
        textLines: [
          'First line of concept explanation.',
          'Second line detailing the OpenStack component behavior.',
          'Third line with configuration instruction.'
        ],
        realLifeExample: {
          title: 'Practical Analogy',
          analogy: 'A real-world example comparing the cloud concept to daily logistics.'
        },
        sceneKey: 'scene_generic'
      };
      targetTopic.slides.push(newSlide);
      return next;
    });
    setSelectedSlideIdx(currentTopic.slides.length);
    setHasUnsavedChanges(true);
    showToast('New slide added.');
  };

  const handleDuplicateSlide = (sIdx) => {
    setTopics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const targetTopic = next[selectedTopicIdx];
      const sourceSlide = targetTopic.slides[sIdx];
      const dup = JSON.parse(JSON.stringify(sourceSlide));
      dup.id = `${dup.id}-copy`;
      dup.title = `${dup.title} (Copy)`;
      targetTopic.slides.splice(sIdx + 1, 0, dup);
      return next;
    });
    setSelectedSlideIdx(sIdx + 1);
    setHasUnsavedChanges(true);
    showToast('Slide duplicated.');
  };

  const handleDeleteSlide = (sIdx) => {
    if (currentTopic.slides.length <= 1) {
      alert('A topic must have at least one slide.');
      return;
    }
    const confirmDelete = window.confirm('Delete this slide?');
    if (!confirmDelete) return;

    setTopics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[selectedTopicIdx].slides.splice(sIdx, 1);
      return next;
    });
    setSelectedSlideIdx(Math.max(0, sIdx - 1));
    setHasUnsavedChanges(true);
    showToast('Slide deleted.');
  };

  // Add / Delete Topic
  const handleAddTopic = () => {
    setTopics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const newTopicNum = next.length + 1;
      const newTopic = {
        id: `topic-${newTopicNum}`,
        topicNumber: newTopicNum,
        title: `Topic ${newTopicNum}: Advanced Configuration`,
        service: 'Neutron',
        slides: [
          {
            id: `${newTopicNum}.1`,
            code: `${newTopicNum}.1`,
            title: 'Topic Overview',
            textLines: [
              'Understand the component architecture.',
              'Learn configuration parameters and defaults.',
              'Prepare for the hands-on lab.'
            ],
            realLifeExample: {
              title: 'Analogy',
              analogy: 'Daily life comparison.'
            },
            sceneKey: 'scene_generic'
          }
        ],
        lab: {
          id: `lab-${newTopicNum}`,
          topicNumber: newTopicNum,
          title: `Lab ${newTopicNum}: Configuration Exercise`,
          priyaIntro: "Let's configure this component.",
          flags: [
            {
              id: 'flag-1',
              flagNumber: 1,
              storyBeat: 'Execute deployment step.',
              objective: 'Verify resource creation.',
              steps: ['Open Horizon dashboard.'],
              question: 'Confirm status:',
              correctAnswers: ['active'],
              hint: 'Check table.'
            }
          ]
        }
      };
      next.push(newTopic);
      return next;
    });
    setSelectedTopicIdx(topics.length);
    setSelectedSlideIdx(0);
    setHasUnsavedChanges(true);
    showToast('New topic added.');
  };

  // Save changes to localStorage
  // // TODO: replace with real CMS API
  const handleSave = () => {
    saveAdminContent(selectedModuleId, {
      topics,
      briefing: briefingDraft,
      credentials: credentialsDraft
    });
    setHasUnsavedChanges(false);
    showToast('All changes saved to platform storage.');
  };

  // Image Upload / Replace
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      updateCurrentSlide({ customMediaUrl: dataUrl, hideAnimation: true });
      showToast('Custom media applied to slide.');
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrlMedia = () => {
    if (!tempUrlInput) return;
    updateCurrentSlide({ customMediaUrl: tempUrlInput.trim(), hideAnimation: true });
    setUrlInputOpen(false);
    setTempUrlInput('');
    showToast('Media URL applied.');
  };

  const handleRestoreDefaultAnimation = () => {
    updateCurrentSlide({ customMediaUrl: null, hideAnimation: false });
    showToast('Default SVG scene animation restored.');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: 'inherit',
        overflow: 'hidden'
      }}
    >
      {/* 1. Admin Top Bar */}
      <div
        style={{
          height: '56px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #1e293b'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: '900', fontSize: '18px', color: '#38bdf8' }}>
              CDAC
            </span>
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: '700',
                backgroundColor: '#1e293b',
                color: '#f59e0b',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid #334155'
              }}
            >
              Admin Content Editor Mode
            </span>
          </div>

          {/* Module Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Module:</span>
            <select
              value={selectedModuleId}
              onChange={(e) => handleSelectModule(e.target.value)}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                border: '1px solid #334155',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              {MODULES_DATA.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.code} — {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Bar Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Unsaved indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: hasUnsavedChanges ? '#f59e0b' : '#10b981'
              }}
            />
            <span style={{ color: hasUnsavedChanges ? '#f59e0b' : '#94a3b8' }}>
              {hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved'}
            </span>
          </div>

          {/* Preview as Student Button */}
          <button
            type="button"
            onClick={() => setPreviewModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              borderRadius: '6px',
              border: '1px solid #334155',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            <Eye size={14} />
            <span>Preview as Student</span>
          </button>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            <Save size={14} />
            <span>Save</span>
          </button>

          <button
            type="button"
            onClick={logout}
            title="Log out of Admin Editor"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: '#94a3b8',
              fontSize: '11.5px',
              cursor: 'pointer',
              marginLeft: '8px'
            }}
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '68px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: '#0f172a',
            color: '#38bdf8',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '12.5px',
            fontWeight: '700',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle2 size={16} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Main Canva-Lite Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Sidebar Tree: Module -> Topics -> Slides -> Lab */}
        <div
          style={{
            width: '260px',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e2e8f0',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '11.5px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>
              Module Structure
            </span>
            <button
              type="button"
              onClick={handleAddTopic}
              title="Add Topic"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                fontSize: '11px',
                color: '#0284c7',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <Plus size={12} />
              <span>Topic</span>
            </button>
          </div>

          {/* Topics Tree */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {topics.map((top, tIdx) => {
              const isTopicActive = selectedTopicIdx === tIdx;
              return (
                <div key={top.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div
                    onClick={() => {
                      setSelectedTopicIdx(tIdx);
                      setSelectedSlideIdx(0);
                    }}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      backgroundColor: isTopicActive ? '#e0f2fe' : '#f8fafc',
                      color: isTopicActive ? '#0369a1' : '#334155',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>T{top.topicNumber}: {top.title}</span>
                  </div>

                  {/* Sub-items (Slides + Lab) */}
                  {isTopicActive && (
                    <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {top.slides?.map((sld, sIdx) => {
                        const isSlideActive = selectedSlideIdx === sIdx && activeBottomTab === 'slides';
                        return (
                          <div
                            key={sld.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              backgroundColor: isSlideActive ? '#f1f5f9' : 'transparent',
                              fontSize: '11.5px',
                              cursor: 'pointer'
                            }}
                          >
                            <span
                              onClick={() => {
                                setSelectedSlideIdx(sIdx);
                                setActiveBottomTab('slides');
                              }}
                              style={{
                                color: isSlideActive ? '#0284c7' : '#475569',
                                fontWeight: isSlideActive ? '700' : '500',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {sld.code} {sld.title}
                            </span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDuplicateSlide(sIdx);
                                }}
                                title="Duplicate slide"
                                style={{ color: '#94a3b8', cursor: 'pointer' }}
                              >
                                <Copy size={11} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSlide(sIdx);
                                }}
                                title="Delete slide"
                                style={{ color: '#dc2626', cursor: 'pointer' }}
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      <button
                        type="button"
                        onClick={handleAddSlide}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          color: '#0284c7',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          marginTop: '4px'
                        }}
                      >
                        <Plus size={11} />
                        <span>Add Slide</span>
                      </button>

                      {/* Lab Node in Tree */}
                      <div
                        onClick={() => setActiveBottomTab('lab')}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '4px',
                          backgroundColor: activeBottomTab === 'lab' ? '#f0fdfa' : 'transparent',
                          color: activeBottomTab === 'lab' ? '#0f766e' : '#0d9488',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '4px'
                        }}
                      >
                        <Terminal size={12} />
                        <span>LAB {top.topicNumber} Configuration</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: WYSIWYG Canvas rendering exactly as students see it */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f1f5f9',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          {activeBottomTab === 'slides' && currentSlide && (
            <div
              style={{
                maxWidth: '960px',
                width: '100%',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #cbd5e1',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                padding: '28px',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '28px',
                position: 'relative'
              }}
            >
              {/* Left Column: Editable Title, Sentences, Real-Life Callout */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Title */}
                <div
                  onClick={() => setSelectedElement('title')}
                  style={{
                    border: selectedElement === 'title' ? '2px dashed #0284c7' : '1px solid transparent',
                    padding: '6px',
                    borderRadius: '6px'
                  }}
                >
                  <label style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase' }}>
                    Slide Title (Click to edit)
                  </label>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                    style={{
                      width: '100%',
                      fontSize: '20px',
                      fontWeight: '800',
                      color: '#0f172a',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>

                {/* Body Sentences with line count warnings */}
                <div
                  onClick={() => setSelectedElement('body')}
                  style={{
                    border: selectedElement === 'body' ? '2px dashed #0284c7' : '1px solid transparent',
                    padding: '8px',
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase' }}>
                      Body Sentences (1 per line)
                    </label>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: '700',
                        color:
                          currentSlide.textLines?.length >= 6
                            ? '#dc2626'
                            : currentSlide.textLines?.length >= 4
                            ? '#d97706'
                            : '#64748b'
                      }}
                    >
                      {currentSlide.textLines?.length} lines
                      {currentSlide.textLines?.length >= 6 && ' (Warning: Too dense!)'}
                      {currentSlide.textLines?.length === 4 && ' (Optimal length)'}
                    </span>
                  </div>

                  <textarea
                    rows={Math.max(5, currentSlide.textLines?.length || 4)}
                    value={(currentSlide.textLines || []).join('\n')}
                    onChange={(e) => {
                      const lines = e.target.value.split('\n');
                      updateCurrentSlide({ textLines: lines });
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      fontFamily: 'inherit',
                      color: '#334155'
                    }}
                  />
                </div>

                {/* Real-Life Callout Box */}
                <div
                  onClick={() => setSelectedElement('callout')}
                  style={{
                    border: selectedElement === 'callout' ? '2px dashed #0284c7' : '1px solid #fef3c7',
                    backgroundColor: '#fffbeb',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <label style={{ fontSize: '10px', color: '#b45309', fontWeight: '800', textTransform: 'uppercase' }}>
                    Real-Life Callout
                  </label>
                  <input
                    type="text"
                    value={currentSlide.realLifeExample?.title || ''}
                    onChange={(e) => {
                      updateCurrentSlide({
                        realLifeExample: {
                          ...currentSlide.realLifeExample,
                          title: e.target.value
                        }
                      });
                    }}
                    placeholder="Analogy title..."
                    style={{
                      width: '100%',
                      fontSize: '12px',
                      fontWeight: '800',
                      color: '#92400e',
                      border: 'none',
                      background: 'transparent',
                      outline: 'none'
                    }}
                  />
                  <textarea
                    rows={2}
                    value={currentSlide.realLifeExample?.analogy || ''}
                    onChange={(e) => {
                      updateCurrentSlide({
                        realLifeExample: {
                          ...currentSlide.realLifeExample,
                          analogy: e.target.value
                        }
                      });
                    }}
                    placeholder="Analogy explanation..."
                    style={{
                      width: '100%',
                      fontSize: '12px',
                      color: '#78350f',
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontStyle: 'italic',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>

              {/* Right Column: Media Canvas & Scene Area */}
              <div
                onClick={() => setSelectedElement('media')}
                style={{
                  border: selectedElement === 'media' ? '2px dashed #0284c7' : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {currentSlide.customMediaUrl ? (
                  <div style={{ position: 'relative', width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={currentSlide.customMediaUrl}
                      alt="Custom Slide Media"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }}
                    />
                  </div>
                ) : (
                  <SceneAnimation
                    sceneKey={currentSlide.sceneKey}
                    activeStep={0}
                    stepCount={currentSlide.textLines?.length || 3}
                  />
                )}
                <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                  Click to select media / scene properties in right panel
                </span>
              </div>
            </div>
          )}

          {/* Bottom Tab: LAB Editor */}
          {activeBottomTab === 'lab' && currentTopic.lab && (
            <div
              style={{
                maxWidth: '960px',
                width: '100%',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #cbd5e1',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#0d9488', textTransform: 'uppercase' }}>
                  Lab Configuration Editor
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                  {currentTopic.lab.title}
                </h2>
              </div>

              {/* If Topic 1, also edit Lab Briefing & Lab Credentials */}
              {selectedTopicIdx === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '18px' }}>
                  <div style={{ border: '1px solid #bae6fd', backgroundColor: '#f0f9ff', padding: '14px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontWeight: '800', fontSize: '13px', color: '#0369a1' }}>
                      Topic 1: Lab Briefing Text
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0369a1' }}>Scenario:</label>
                      <textarea
                        rows={3}
                        value={briefingDraft.scenario}
                        onChange={(e) => {
                          setBriefingDraft((prev) => ({ ...prev, scenario: e.target.value }));
                          setHasUnsavedChanges(true);
                        }}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #93c5fd', fontSize: '12px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0369a1' }}>Context:</label>
                      <input
                        type="text"
                        value={briefingDraft.context}
                        onChange={(e) => {
                          setBriefingDraft((prev) => ({ ...prev, context: e.target.value }));
                          setHasUnsavedChanges(true);
                        }}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #93c5fd', fontSize: '12px' }}
                      />
                    </div>
                  </div>

                  <div style={{ border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontWeight: '800', fontSize: '13px', color: '#334155' }}>
                      Topic 1: Lab Credentials Entries
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '11.5px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: '700' }}>Username:</label>
                        <input
                          type="text"
                          value={credentialsDraft.username}
                          onChange={(e) => {
                            setCredentialsDraft((prev) => ({ ...prev, username: e.target.value }));
                            setHasUnsavedChanges(true);
                          }}
                          style={{ width: '100%', padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '700' }}>Password:</label>
                        <input
                          type="text"
                          value={credentialsDraft.password}
                          onChange={(e) => {
                            setCredentialsDraft((prev) => ({ ...prev, password: e.target.value }));
                            setHasUnsavedChanges(true);
                          }}
                          style={{ width: '100%', padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '700' }}>Domain:</label>
                        <input
                          type="text"
                          value={credentialsDraft.domain}
                          onChange={(e) => {
                            setCredentialsDraft((prev) => ({ ...prev, domain: e.target.value }));
                            setHasUnsavedChanges(true);
                          }}
                          style={{ width: '100%', padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '700' }}>Project:</label>
                        <input
                          type="text"
                          value={credentialsDraft.project}
                          onChange={(e) => {
                            setCredentialsDraft((prev) => ({ ...prev, project: e.target.value }));
                            setHasUnsavedChanges(true);
                          }}
                          style={{ width: '100%', padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Priya Intro Message */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
                  Priya Intro Dialogue:
                </label>
                <textarea
                  rows={2}
                  value={currentTopic.lab.priyaIntro || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTopics((prev) => {
                      const next = JSON.parse(JSON.stringify(prev));
                      next[selectedTopicIdx].lab.priyaIntro = val;
                      return next;
                    });
                    setHasUnsavedChanges(true);
                  }}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                />
              </div>

              {/* 3 Flags List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '800' }}>Lab Flags (3 Flags)</h3>
                {currentTopic.lab.flags?.map((flag, fIdx) => (
                  <div
                    key={flag.id}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: '#f8fafc',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ fontWeight: '800', fontSize: '12.5px', color: '#0284c7' }}>
                      Flag {flag.flagNumber} of 3
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700' }}>Objective:</label>
                      <input
                        type="text"
                        value={flag.objective}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTopics((prev) => {
                            const next = JSON.parse(JSON.stringify(prev));
                            next[selectedTopicIdx].lab.flags[fIdx].objective = val;
                            return next;
                          });
                          setHasUnsavedChanges(true);
                        }}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700' }}>Validation Question:</label>
                      <input
                        type="text"
                        value={flag.question}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTopics((prev) => {
                            const next = JSON.parse(JSON.stringify(prev));
                            next[selectedTopicIdx].lab.flags[fIdx].question = val;
                            return next;
                          });
                          setHasUnsavedChanges(true);
                        }}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700' }}>Correct Answers (comma-separated alternatives):</label>
                      <input
                        type="text"
                        value={flag.correctAnswers?.join(', ') || ''}
                        onChange={(e) => {
                          const val = e.target.value.split(',').map((s) => s.trim());
                          setTopics((prev) => {
                            const next = JSON.parse(JSON.stringify(prev));
                            next[selectedTopicIdx].lab.flags[fIdx].correctAnswers = val;
                            return next;
                          });
                          setHasUnsavedChanges(true);
                        }}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Properties Panel for selected element */}
        <div
          style={{
            width: '280px',
            backgroundColor: '#ffffff',
            borderLeft: '1px solid #e2e8f0',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflowY: 'auto'
          }}
        >
          <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>
              Properties Panel
            </span>
          </div>

          {/* Media / Scene Properties */}
          {selectedElement === 'media' && currentSlide && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700' }}>Media & Animation</div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  color: '#0284c7',
                  cursor: 'pointer'
                }}
              >
                <Upload size={14} />
                <span>Replace Image / GIF</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>

              <button
                type="button"
                onClick={() => setUrlInputOpen(!urlInputOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <Link size={14} />
                <span>Add Media by URL</span>
              </button>

              {urlInputOpen && (
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={tempUrlInput}
                    onChange={(e) => setTempUrlInput(e.target.value)}
                    style={{ flex: 1, padding: '5px 8px', fontSize: '11px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrlMedia}
                    style={{ padding: '5px 8px', backgroundColor: '#0284c7', color: '#ffffff', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}
                  >
                    Apply
                  </button>
                </div>
              )}

              {currentSlide.customMediaUrl && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setCropTargetImage(currentSlide.customMediaUrl);
                      setCropModalOpen(true);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 12px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      color: '#334155',
                      cursor: 'pointer'
                    }}
                  >
                    <Crop size={14} />
                    <span>Crop Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRestoreDefaultAnimation}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 12px',
                      backgroundColor: '#e0f2fe',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      color: '#0369a1',
                      cursor: 'pointer'
                    }}
                  >
                    <RotateCcw size={14} />
                    <span>Restore Default Animation</span>
                  </button>
                </>
              )}
            </div>
          )}

          {/* Know More Modal Fields in Properties Panel */}
          {currentSlide && (
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '700' }}>Know More Modal</span>
                <input
                  type="checkbox"
                  checked={!!currentSlide.knowMore}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateCurrentSlide({
                        knowMore: {
                          title: 'Advanced Architecture Concept',
                          whatIsIt: 'Technical explanation of the concept.',
                          whyDoesItMatter: 'Security and operational context.',
                          simpleAnalogy: 'Daily life comparison.'
                        }
                      });
                    } else {
                      updateCurrentSlide({ knowMore: null });
                    }
                  }}
                />
              </div>

              {currentSlide.knowMore && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '2px' }}>Title:</label>
                    <input
                      type="text"
                      value={currentSlide.knowMore.title || ''}
                      onChange={(e) => {
                        updateCurrentSlide({
                          knowMore: { ...currentSlide.knowMore, title: e.target.value }
                        });
                      }}
                      style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '2px' }}>What is it?</label>
                    <textarea
                      rows={2}
                      value={currentSlide.knowMore.whatIsIt || ''}
                      onChange={(e) => {
                        updateCurrentSlide({
                          knowMore: { ...currentSlide.knowMore, whatIsIt: e.target.value }
                        });
                      }}
                      style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '2px' }}>Why does it matter?</label>
                    <textarea
                      rows={2}
                      value={currentSlide.knowMore.whyDoesItMatter || ''}
                      onChange={(e) => {
                        updateCurrentSlide({
                          knowMore: { ...currentSlide.knowMore, whyDoesItMatter: e.target.value }
                        });
                      }}
                      style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Tabs: Slides | Lab */}
      <div
        style={{
          height: '42px',
          backgroundColor: '#0f172a',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '12px'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveBottomTab('slides')}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '700',
            backgroundColor: activeBottomTab === 'slides' ? '#334155' : 'transparent',
            color: activeBottomTab === 'slides' ? '#38bdf8' : '#94a3b8',
            cursor: 'pointer'
          }}
        >
          Slides
        </button>
        <button
          type="button"
          onClick={() => setActiveBottomTab('lab')}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '700',
            backgroundColor: activeBottomTab === 'lab' ? '#334155' : 'transparent',
            color: activeBottomTab === 'lab' ? '#38bdf8' : '#94a3b8',
            cursor: 'pointer'
          }}
        >
          Lab
        </button>
      </div>

      {/* Student Preview Modal with "Unlock all for preview" toggle */}
      {previewModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px'
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Preview Modal Header */}
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontWeight: '800', fontSize: '14px', color: '#38bdf8' }}>
                  Student Mode Preview
                </span>
                {/* Unlock all for preview toggle */}
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#cbd5e1', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={previewUnlockAll}
                    onChange={(e) => setPreviewUnlockAll(e.target.checked)}
                  />
                  <span>Unlock all for preview</span>
                </label>

                {/* Reset preview button */}
                <button
                  type="button"
                  onClick={() => {
                    setPreviewSlideIdx(0);
                    showToast('Preview reset to slide 1.1.');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #475569',
                    backgroundColor: '#1e293b',
                    color: '#e2e8f0',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={12} />
                  <span>Reset preview</span>
                </button>

                {/* DEV ONLY: remove before production */}
                <button
                  type="button"
                  onClick={() => {
                    const currentLabId = `lab${currentTopic?.topicNumber || selectedTopicIdx + 1}`;
                    if (autoCompleteCurrentLab) {
                      autoCompleteCurrentLab(currentLabId);
                      showToast(`Dev Helper: ${currentLabId} auto-completed!`);
                    }
                  }}
                  title="Auto-complete current lab (dispatches correct state + COMPLETE_LAB)"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #10b981',
                    backgroundColor: '#064e3b',
                    color: '#a7f3d0',
                    fontSize: '11px',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  <CheckCircle2 size={12} />
                  <span>Auto-complete current lab</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                style={{ color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Preview Viewport */}
            <div style={{ flex: 1, overflow: 'auto', padding: '24px', backgroundColor: '#f8fafc' }}>
              {(() => {
                const previewSlide = currentTopic?.slides ? currentTopic.slides[previewSlideIdx] || currentTopic.slides[0] : null;
                if (!previewSlide) return null;
                return (
                  <div style={{ maxWidth: '960px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase' }}>
                        Slide {previewSlide.code} of Topic {currentTopic.topicNumber}
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          disabled={previewSlideIdx === 0}
                          onClick={() => setPreviewSlideIdx((p) => Math.max(0, p - 1))}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '11.5px',
                            fontWeight: '600',
                            backgroundColor: '#ffffff',
                            cursor: previewSlideIdx === 0 ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          disabled={previewSlideIdx >= (currentTopic?.slides?.length || 1) - 1}
                          onClick={() => setPreviewSlideIdx((p) => Math.min((currentTopic?.slides?.length || 1) - 1, p + 1))}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '11.5px',
                            fontWeight: '700',
                            backgroundColor: '#0284c7',
                            color: '#ffffff',
                            cursor: previewSlideIdx >= (currentTopic?.slides?.length || 1) - 1 ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '14px' }}>{previewSlide.title}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {previewSlide.textLines?.map((line, idx) => (
                        <p key={idx} style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>{line}</p>
                      ))}
                    </div>
                    <SceneAnimation sceneKey={previewSlide.sceneKey} activeStep={0} stepCount={previewSlide.textLines?.length || 3} />
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Media Crop Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={cropTargetImage}
        onConfirmCrop={(cropped) => {
          updateCurrentSlide({ customMediaUrl: cropped });
          setCropModalOpen(false);
          showToast('Image cropped and updated.');
        }}
        onCancel={() => setCropModalOpen(false)}
      />
    </div>
  );
};

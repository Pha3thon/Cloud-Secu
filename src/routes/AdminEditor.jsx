import React, { useState } from 'react';
import { Save, Eye, LogOut, BookOpen, Terminal } from 'lucide-react';
import useStore from '@/hooks/useStore';
import { M4_BRIEFING, M4_LAB_CREDENTIALS } from '@/content/m4';
import SidebarTree from '@/components/admin/SidebarTree';
import EditorCanvas from '@/components/admin/EditorCanvas';
import PropertiesPanel from '@/components/admin/PropertiesPanel';
import LabEditor from '@/components/admin/LabEditor';
import ImageCropModal from '@/components/admin/ImageCropModal';
import TheorySlide from '@/components/slides/TheorySlide';
import useHostSafetyGuard from '@/hooks/useHostSafetyGuard';

/**
 * AdminEditor route screen: provides Canva-lite CMS editing for course slides and lab definitions.
 */
// TODO: replace with real CMS API
export default function AdminEditor() {
  const { logout, saveAdminContent, getModuleTopics, showToast } = useStore();

  const [selectedModuleId, setSelectedModuleId] = useState('m4');
  const [activeTab, setActiveTab] = useState('slides'); // 'slides' | 'lab'
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);
  const [selectedSlideIdx, setSelectedSlideIdx] = useState(0);
  const [selectedElement, setSelectedElement] = useState(null);

  const [topics, setTopics] = useState(() => {
    return JSON.parse(JSON.stringify(getModuleTopics ? getModuleTopics('m4') : []));
  });
  const [briefingDraft] = useState(() => JSON.parse(JSON.stringify(M4_BRIEFING)));
  const [credentialsDraft] = useState(() => JSON.parse(JSON.stringify(M4_LAB_CREDENTIALS)));

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [textFormatting, setTextFormatting] = useState({ bold: false, italic: false });
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const currentTopic = topics[selectedTopicIdx] || {};
  const currentSlide = currentTopic.slides?.[selectedSlideIdx] || null;

  const handleModuleChange = (newModuleId) => {
    if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Switch modules anyway?')) {
      return;
    }
    setSelectedModuleId(newModuleId);
    setSelectedTopicIdx(0);
    setSelectedSlideIdx(0);
    setTopics(JSON.parse(JSON.stringify(getModuleTopics ? getModuleTopics(newModuleId) : [])));
    setHasUnsavedChanges(false);
  };

  const { GuardDialog } = useHostSafetyGuard({
    onEndLab: () => {
      logout?.();
    },
    active: Boolean(previewModalOpen || (activeTab === 'slides' && hasUnsavedChanges)),
    showToast
  });

  const updateCurrentSlide = (updates) => {
    setTopics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const targetSlide = next[selectedTopicIdx]?.slides?.[selectedSlideIdx];
      if (targetSlide) {
        Object.assign(targetSlide, updates);
      }
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const updateCurrentLab = (updatedLab) => {
    setTopics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (next[selectedTopicIdx]) {
        next[selectedTopicIdx].lab = updatedLab;
      }
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    saveAdminContent?.(selectedModuleId, {
      topics,
      briefing: briefingDraft,
      credentials: credentialsDraft
    });
    setHasUnsavedChanges(false);
    showToast?.('All changes saved to platform storage.');
  };

  const handleAddSlide = () => {
    setTopics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const targetTopic = next[selectedTopicIdx];
      const newNum = (targetTopic.slides?.length || 0) + 1;
      targetTopic.slides.push({
        id: `${targetTopic.topicNumber}.${newNum}`,
        code: `${targetTopic.topicNumber}.${newNum}`,
        title: 'New Slide Title',
        textLines: ['Key takeaway statement 1.', 'Key takeaway statement 2.'],
        realLifeExample: { title: 'Practical Analogy', analogy: 'A real-world example comparing the cloud concept.' },
        sceneKey: 'scene_generic'
      });
      return next;
    });
    setSelectedSlideIdx(currentTopic.slides.length);
    setHasUnsavedChanges(true);
    showToast?.('New slide added.');
  };

  const handleDuplicateSlide = (sIdx) => {
    setTopics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const targetTopic = next[selectedTopicIdx];
      const dup = JSON.parse(JSON.stringify(targetTopic.slides[sIdx]));
      dup.id = `${dup.id}-copy`;
      dup.title = `${dup.title} (Copy)`;
      targetTopic.slides.splice(sIdx + 1, 0, dup);
      return next;
    });
    setSelectedSlideIdx(sIdx + 1);
    setHasUnsavedChanges(true);
    showToast?.('Slide duplicated.');
  };

  const handleDeleteSlide = (sIdx) => {
    if (currentTopic.slides.length <= 1) {
      alert('A topic must have at least one slide.');
      return;
    }
    setTopics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[selectedTopicIdx].slides.splice(sIdx, 1);
      return next;
    });
    setSelectedSlideIdx(Math.max(0, sIdx - 1));
    setHasUnsavedChanges(true);
    showToast?.('Slide deleted.');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      updateCurrentSlide({ customMediaUrl: event.target.result });
      showToast?.('Custom media applied to slide.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
      {/* Top Bar */}
      <header style={{ height: '56px', backgroundColor: '#0f172a', color: '#ffffff', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: 'monospace', fontWeight: '900', fontSize: '18px', color: '#38bdf8' }}>CDAC</span>
          <span style={{ fontSize: '10.5px', fontWeight: '700', backgroundColor: '#1e293b', color: '#f59e0b', padding: '2px 8px', borderRadius: '4px' }}>
            Admin Content Editor Mode
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Module:</span>
            <select
              value={selectedModuleId}
              onChange={(e) => handleModuleChange(e.target.value)}
              style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#1e293b', color: '#ffffff', border: '1px solid #334155', fontSize: '12px' }}
            >
              <option value="m0">M0: Course Orientation</option>
              <option value="m1">M1: Cloud Foundations (Linux & Networking)</option>
              <option value="m4">M4: Core Cloud Architecture (OpenStack)</option>
            </select>
          </div>
        </div>

        {/* Save / Preview / Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setPreviewModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '6px', backgroundColor: '#1e293b', color: '#ffffff', border: '1px solid #334155', fontSize: '12px', cursor: 'pointer' }}
          >
            <Eye size={13} />
            <span>Student Preview</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 14px', borderRadius: '6px', backgroundColor: 'var(--brand-primary, #0284c7)', color: '#ffffff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
          >
            <Save size={13} />
            <span>Save All Changes</span>
          </button>

          <button
            type="button"
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', borderRadius: '6px', backgroundColor: 'transparent', color: '#94a3b8', border: 'none', fontSize: '12px', cursor: 'pointer' }}
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Mode Sub-nav tabs */}
      <div style={{ height: '40px', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-subtle, #e2e8f0)', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('slides')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', border: 'none', background: 'none', color: activeTab === 'slides' ? 'var(--brand-primary, #0284c7)' : '#64748b', fontWeight: activeTab === 'slides' ? '700' : '500', borderBottom: activeTab === 'slides' ? '2px solid #0284c7' : 'none', cursor: 'pointer', fontSize: '12.5px' }}
        >
          <BookOpen size={14} />
          <span>Theory Slides Editor</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('lab')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', border: 'none', background: 'none', color: activeTab === 'lab' ? 'var(--brand-primary, #0284c7)' : '#64748b', fontWeight: activeTab === 'lab' ? '700' : '500', borderBottom: activeTab === 'lab' ? '2px solid #0284c7' : 'none', cursor: 'pointer', fontSize: '12.5px' }}
        >
          <Terminal size={14} />
          <span>Lab Configuration</span>
        </button>
      </div>

      {/* Editor Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <SidebarTree
          topics={topics}
          selectedTopicIdx={selectedTopicIdx}
          selectedSlideIdx={selectedSlideIdx}
          onSelectTopic={(tIdx) => { setSelectedTopicIdx(tIdx); setSelectedSlideIdx(0); }}
          onSelectSlide={(sIdx) => setSelectedSlideIdx(sIdx)}
          onAddSlide={handleAddSlide}
          onDuplicateSlide={handleDuplicateSlide}
          onDeleteSlide={handleDeleteSlide}
        />

        {activeTab === 'slides' ? (
          <>
            <EditorCanvas
              slide={currentSlide}
              selectedElement={selectedElement}
              onSelectElement={(el) => setSelectedElement(el)}
              onUpdateSlide={updateCurrentSlide}
              textFormatting={textFormatting}
              onToggleBold={() => setTextFormatting((p) => ({ ...p, bold: !p.bold }))}
              onToggleItalic={() => setTextFormatting((p) => ({ ...p, italic: !p.italic }))}
              onTriggerImageUpload={handleImageUpload}
              onOpenCropModal={() => setCropModalOpen(true)}
              onRestoreDefaultAnimation={() => updateCurrentSlide({ customMediaUrl: null })}
            />
            <PropertiesPanel
              slide={currentSlide}
              selectedElement={selectedElement}
              onClose={() => setSelectedElement(null)}
              onUpdateSlide={updateCurrentSlide}
            />
          </>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <LabEditor lab={currentTopic.lab} onUpdateLab={updateCurrentLab} />
          </div>
        )}
      </div>

      {/* Crop Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={currentSlide?.customMediaUrl}
        onConfirmCrop={(croppedUrl) => {
          updateCurrentSlide({ customMediaUrl: croppedUrl });
          setCropModalOpen(false);
          showToast?.('Cropped media applied.');
        }}
        onCancel={() => setCropModalOpen(false)}
      />

      {/* Student Preview Modal */}
      {previewModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ width: '100%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Student View Preview</h3>
              <button type="button" onClick={() => setPreviewModalOpen(false)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>Close Preview</button>
            </div>
            <TheorySlide slide={currentSlide} isFirstSlide isLastSlide onNext={() => {}} onBack={() => {}} onFinishAndUnlockLab={() => {}} />
          </div>
        </div>
      )}

      <GuardDialog />
    </div>
  );
}

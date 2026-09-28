import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { InternDeskScene } from './illustrations/InternDeskScene';
import { CloudServersScene } from './illustrations/CloudServersScene';
import { VmMakerScene } from './illustrations/VmMakerScene';
import { BucketStorageScene } from './illustrations/BucketStorageScene';
import { NetworkPacketScene } from './illustrations/NetworkPacketScene';
import { DefaultConfigScene } from './illustrations/DefaultConfigScene';
import { MissionChecklistScene } from './illustrations/MissionChecklistScene';

export const AnimatedIllustration = ({ animationType }) => {
  const [replayCount, setReplayCount] = useState(0);

  const handleReplay = () => {
    setReplayCount((prev) => prev + 1);
  };

  const renderScene = () => {
    switch (animationType) {
      case 'intern_desk':
        return <InternDeskScene isReplaying={replayCount} />;
      case 'cloud_servers':
        return <CloudServersScene isReplaying={replayCount} />;
      case 'vm_maker':
        return <VmMakerScene isReplaying={replayCount} />;
      case 'bucket_storage':
        return <BucketStorageScene isReplaying={replayCount} />;
      case 'network_packet':
        return <NetworkPacketScene isReplaying={replayCount} />;
      case 'default_config':
        return <DefaultConfigScene isReplaying={replayCount} />;
      case 'mission_checklist':
        return <MissionChecklistScene isReplaying={replayCount} />;
      default:
        return <InternDeskScene isReplaying={replayCount} />;
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        background: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '16px 20px',
        width: '100%',
        minHeight: '230px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.02)'
      }}
    >
      {/* Replay Button */}
      <button
        type="button"
        onClick={handleReplay}
        title="Replay animation"
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '11px',
          fontWeight: '500',
          color: '#64748b',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '4px 10px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          zIndex: 10,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#0284c7';
          e.currentTarget.style.borderColor = '#bae6fd';
          e.currentTarget.style.backgroundColor = '#f0f9ff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#64748b';
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.backgroundColor = '#ffffff';
        }}
      >
        <RotateCcw size={12} />
        <span>Replay</span>
      </button>

      {/* Render the active scene */}
      <div key={replayCount} style={{ width: '100%' }}>
        {renderScene()}
      </div>
    </div>
  );
};

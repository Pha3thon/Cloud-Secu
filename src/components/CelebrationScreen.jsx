import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CelebrationStickFigure } from './AnimatedIllustration/illustrations/CelebrationStickFigure';

export const CelebrationScreen = ({ onContinueToNextModule, onReviewModule }) => {
  useEffect(() => {
    // Fire festive confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.6 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });
    fire(0.2, {
      spread: 60
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="animate-pop-in"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '560px',
          padding: '36px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Animated Stick Figure Mascot */}
        <CelebrationStickFigure />

        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginTop: '12px',
            marginBottom: '10px'
          }}
        >
          <Award size={14} color="#10b981" />
          <span>Module M4 Completed!</span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '10px',
            letterSpacing: '-0.01em'
          }}
        >
          Outstanding Work, Cloud Intern! 🎉
        </h2>

        {/* Required Prompt Message */}
        <p
          style={{
            fontSize: '15px',
            color: '#334155',
            lineHeight: '1.6',
            marginBottom: '18px'
          }}
        >
          You just deployed your first cloud environment! Next up: learning why default settings are dangerous.
        </p>

        {/* Key takeaways summary card */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '16px',
            textAlign: 'left',
            marginBottom: '24px'
          }}
        >
          <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
            What you observed in this lab:
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#334155' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Default region <code>us-central-1</code> assigned without compliance verification</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Port <code>22</code> (SSH) opened to the public internet (<code>0.0.0.0/0</code>)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Storage bucket created with <code>public</code> read permissions</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Default <code>admin</code> identity provisioned without MFA enforcement</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={onReviewModule}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: '600',
              color: '#475569',
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
          >
            Review Lab
          </button>

          <button
            type="button"
            onClick={onContinueToNextModule}
            style={{
              padding: '10px 24px',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: '700',
              color: '#ffffff',
              backgroundColor: '#0284c7',
              boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0369a1')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0284c7')}
          >
            <span>Continue to Next Module</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { Character, ScooterRider } from './SceneAnimation';
import { M4_BRIEFING } from '../data/m4Content';

export const CelebrationScreen = ({
  type = 'm4_complete', // 'lab6_live' | 'm4_complete'
  onContinue,
  onClose
}) => {
  useEffect(() => {
    // Fire confetti bursts
    const count = 200;
    const defaults = { origin: { y: 0.6 } };

    function fire(particleRatio, opts) {
      try {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      } catch (e) {
        // Fallback if canvas-confetti fails
      }
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  if (type === 'lab6_live') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
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
            maxWidth: '520px',
            padding: '36px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          {/* QuickMart Stick Figure Delivery Rider */}
          <div style={{ width: '180px', height: '90px' }}>
            <svg viewBox="0 0 160 80" style={{ width: '100%', height: '100%' }}>
              <ScooterRider x={70} y={15} scale={1} />
            </svg>
          </div>

          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                padding: '3px 12px',
                borderRadius: '20px'
              }}
            >
              🎉 QuickMart is Live!
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '10px', marginBottom: '8px' }}>
              The Storefront is Open to Customers
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
              Workloads are connected, the public floating IP is routing requests, and deliveries are rolling out.
            </p>
          </div>

          {/* Priya Hand-off quote */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: '#f0fdfa',
              borderRadius: '10px',
              border: '1px solid #99f6e4',
              color: '#134e4a',
              fontSize: '12.5px',
              fontStyle: 'italic',
              textAlign: 'left'
            }}
          >
            <strong>Priya:</strong> "Great job getting the storefront online in record time! But we aren't done yet. Now we have to verify who gets access behind the scenes..."
          </div>

          <button
            type="button"
            onClick={onContinue}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <span>Proceed to Topic 7: Users & Roles</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Type: m4_complete
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
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
          padding: '36px',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Stick Figure Celebration Graphic */}
        <div style={{ width: '180px', height: '90px' }}>
          <svg viewBox="0 0 160 80" style={{ width: '100%', height: '100%' }}>
            <Character type="trainee" x={50} y={20} scale={0.9} />
            <Character type="priya" x={110} y={20} scale={0.9} flip={true} />
          </svg>
        </div>

        <div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              padding: '3px 12px',
              borderRadius: '20px'
            }}
          >
            ✓ Module M4 Completed!
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '10px', marginBottom: '8px' }}>
            Our First Cloud Configuration Complete
          </h2>
        </div>

        {/* Priya Closing Quote */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            color: '#334155',
            fontSize: '13px',
            lineHeight: '1.6',
            textAlign: 'left'
          }}
        >
          <strong style={{ display: 'block', color: '#0f766e', fontSize: '11.5px', marginBottom: '4px' }}>
            Priya's Closing Assessment:
          </strong>
          "{M4_BRIEFING.closingQuote}"
        </div>

        <button
          type="button"
          onClick={onContinue}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            backgroundColor: '#059669',
            color: '#ffffff',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.3)'
          }}
        >
          <span>Continue to Next Module</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

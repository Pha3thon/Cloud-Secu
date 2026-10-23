import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { ScooterRider } from '@/components/scenes/parts';

/**
 * CelebrationScreen modal for major milestone accomplishments (Lab 6 live, Module M4 complete).
 */
export default function CelebrationScreen({
  type = 'm4_complete', // 'lab6_live' | 'm4_complete'
  onContinue,
  onClose
}) {
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
        // Fallback if canvas-confetti is not supported
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
            boxShadow: 'var(--shadow-xl)',
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
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main, #0f172a)', marginTop: '10px', marginBottom: '8px' }}>
              The Storefront is Open to Customers
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted, #64748b)', lineHeight: '1.5', margin: 0 }}>
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
              backgroundColor: 'var(--brand-primary, #0284c7)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md, 8px)',
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

  if (type === 'm1_complete') {
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
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#e0e7ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4338ca',
              boxShadow: '0 4px 6px -1px rgba(67, 56, 202, 0.2)'
            }}
          >
            <Award size={36} />
          </div>

          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '10px'
              }}
            >
              <Sparkles size={14} color="#059669" />
              <span>Module M1 Certified</span>
            </div>

            <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main, #0f172a)', letterSpacing: '-0.02em', margin: '0 0 10px 0' }}>
              Foundations Mastered!
            </h1>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted, #475569)', lineHeight: '1.6', margin: 0, maxWidth: '460px' }}>
              You have successfully mastered OS virtualization boundaries, Linux system auditing, IPv4 subnetting & DNS, Wireshark packet reconstruction, and the foundational CIA & Zero Trust security frameworks.
            </p>
          </div>

          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              border: '1px solid #bbf7d0',
              color: '#166534',
              fontSize: '12.5px',
              textAlign: 'left',
              lineHeight: '1.5'
            }}
          >
            <div style={{ fontWeight: '800', color: '#15803d', marginBottom: '4px' }}>
              A note from Priya:
            </div>
            "Outstanding work! With operating systems, networking, and security foundations locked down, you are officially prepared to explore Cloud Computing Concepts & Architecture."
          </div>

          <button
            type="button"
            onClick={onContinue}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              backgroundColor: '#4338ca',
              color: '#ffffff',
              borderRadius: 'var(--radius-md, 8px)',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(67, 56, 202, 0.3)'
            }}
          >
            <span>Return to Curriculum</span>
            <CheckCircle2 size={18} />
          </button>
        </div>
      </div>
    );
  }

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
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#fef3c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#d97706',
            boxShadow: '0 4px 6px -1px rgba(217, 119, 6, 0.2)'
          }}
        >
          <Award size={36} />
        </div>

        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px'
            }}
          >
            <Sparkles size={14} color="#059669" />
            <span>Module M4 Certified</span>
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main, #0f172a)', letterSpacing: '-0.02em', margin: '0 0 10px 0' }}>
            Mission Accomplished!
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted, #475569)', lineHeight: '1.6', margin: 0, maxWidth: '440px' }}>
            You have successfully configured, secured, and audited the QuickMart e-commerce deployment across OpenStack Compute, Networking, Security Groups, and Keystone IAM.
          </p>
        </div>

        {/* Priya Completion Letter */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#f0fdfa',
            borderRadius: '12px',
            border: '1px solid #99f6e4',
            color: '#134e4a',
            fontSize: '12.5px',
            textAlign: 'left',
            lineHeight: '1.5'
          }}
        >
          <div style={{ fontWeight: '800', color: '#0f766e', marginBottom: '4px' }}>
            A note from Priya:
          </div>
          "Incredible job! QuickMart survived launch day, blocked unauthorized port scans, and cleanly audited identity permissions. You are officially ready for the subsequent architectural modules in the CDAC curriculum."
        </div>

        <button
          type="button"
          onClick={onContinue}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            backgroundColor: 'var(--color-success, #059669)',
            color: '#ffffff',
            borderRadius: 'var(--radius-md, 8px)',
            fontSize: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.3)'
          }}
        >
          <span>Return to Curriculum</span>
          <CheckCircle2 size={18} />
        </button>
      </div>
    </div>
  );
}

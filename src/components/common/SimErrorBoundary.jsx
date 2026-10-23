import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

/**
 * SimErrorBoundary: Scoped error boundary for simulated Horizon wizards and lab forms.
 * Catches runtime exceptions within simulated dialogs and renders an inline recovery card
 * with Reset Lab / Close affordance rather than bubbling to host browser or crashing the app.
 */
export class SimErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[SimErrorBoundary] Caught simulated form exception:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onResetLab) {
      this.props.onResetLab();
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  handleDismiss = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            padding: '20px',
            backgroundColor: '#fef2f2',
            border: '1.5px solid #fecaca',
            borderRadius: '10px',
            margin: '12px 0',
            color: '#991b1b',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} color="#dc2626" />
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#991b1b' }}>
                Something went wrong with this form
              </span>
            </div>
            {this.props.onClose && (
              <button
                type="button"
                onClick={this.handleDismiss}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#991b1b',
                  cursor: 'pointer',
                  padding: '2px'
                }}
                title="Close"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <p style={{ fontSize: '12px', color: '#7f1d1d', margin: 0, lineHeight: '1.5' }}>
            An unexpected error occurred while processing this simulated form. You can reset the lab to restore safe initial state or close this dialog.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '6px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={13} />
              <span>Reset Lab</span>
            </button>
            {this.props.onClose && (
              <button
                type="button"
                onClick={this.handleDismiss}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SimErrorBoundary;

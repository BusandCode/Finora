import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { authService } from '../../services/authService';

type FormState = 'input' | 'sending' | 'success' | 'error';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [formState, setFormState] = useState<FormState>('input');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormState('sending');
    setErrorMessage('');
    try {
      await authService.forgotPassword(email);
      setFormState('success');
    } catch (err: any) {
      setFormState('error');
      setErrorMessage(err.message || 'An error occurred.');
    }
  };

  const handleBackToLogin = () => navigate('/login');
  const handleSignUp = () => navigate('/register');
  const handleTryAgain = () => { setFormState('input'); setErrorMessage(''); };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080c14',
      color: '#f1f5f9',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(20px, 5vw, 48px)',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      {/* Dot grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Glow orb */}
      <div style={{
        position: 'fixed', top: '-15%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 500, borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)',
      }} />

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 460,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 'clamp(28px, 5vw, 48px)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 60px rgba(0,0,0,0.4)',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 32 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg,#10b981,#0d9488)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={13} color="#fff" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Finora</span>
        </div>

        {/* Back button */}
        <button
          onClick={handleBackToLogin}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 500,
            marginBottom: 28, padding: 0, transition: 'color 0.2s',
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#10b981')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
        >
          <ArrowLeft size={15} />
          Back to login
        </button>

        {/* ── INPUT / SENDING STATE ── */}
        {(formState === 'input' || formState === 'sending') && (
          <>
            {/* Icon */}
            <div style={{
              width: 44, height: 44, borderRadius: 11,
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
            }}>
              <Mail size={20} color="#10b981" />
            </div>

            <h1 style={{
              fontSize: 'clamp(22px,4vw,28px)', fontWeight: 700,
              letterSpacing: '-0.03em', color: '#f1f5f9', marginBottom: 8,
            }}>
              Forgot Password?
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 28 }}>
              No worries! Enter your email and we'll send you instructions to reset your password.
            </p>

            {/* Inline error */}
            {formState === 'input' && errorMessage && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '12px 14px', borderRadius: 10, marginBottom: 20,
                background: 'rgba(239,68,68,0.07)',
                border: '1px solid rgba(239,68,68,0.2)',
              }}>
                <AlertCircle size={15} color="#f87171" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, color: '#f87171', lineHeight: 1.6 }}>{errorMessage}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 8, letterSpacing: '0.04em' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={formState === 'sending'}
                style={{
                  width: '100%', padding: '12px 14px',
                  fontSize: 14, color: '#f1f5f9',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, outline: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 20, boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  opacity: formState === 'sending' ? 0.5 : 1,
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(16,185,129,0.5)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />

              <button
                type="submit"
                disabled={formState === 'sending'}
                style={{
                  width: '100%', padding: '13px',
                  fontSize: 14, fontWeight: 600,
                  background: 'linear-gradient(135deg,#10b981,#0d9488)',
                  color: '#fff', border: 'none', borderRadius: 10,
                  cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 0 24px rgba(16,185,129,0.2)',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                  opacity: formState === 'sending' ? 0.75 : 1,
                }}
                onMouseEnter={e => { if (formState !== 'sending') (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                {formState === 'sending' ? (
                  <>
                    <div style={{
                      width: 14, height: 14, borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      animation: 'spin 0.7s linear infinite',
                    }} />
                    Sending Reset Link...
                  </>
                ) : (
                  <> Send Reset Link <Mail size={15} /> </>
                )}
              </button>
            </form>

            {/* Footer hint */}
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 24 }}>
              Remember your password?{' '}
              <button onClick={handleBackToLogin} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#10b981', fontWeight: 600, fontSize: 12,
                fontFamily: "'DM Sans', sans-serif", padding: 0,
              }}>Sign in instead</button>
            </p>
          </>
        )}

        {/* ── SUCCESS STATE ── */}
        {formState === 'success' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', margin: '0 auto 20px',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle2 size={24} color="#10b981" />
              </div>
              <h1 style={{ fontSize: 'clamp(22px,4vw,28px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f1f5f9', marginBottom: 8 }}>
                Check Your Email
              </h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                We've sent reset instructions to
              </p>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#10b981', marginTop: 6 }}>{email}</p>
            </div>

            {/* Steps */}
            <div style={{
              padding: '16px', borderRadius: 10, marginBottom: 16,
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>
                What's next?
              </p>
              {[
                'Check your inbox for an email from Finora',
                'Click the reset link — valid for 1 hour',
                'Create a new strong password',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: i < 2 ? 8 : 0 }}>
                  <span style={{ color: '#10b981', fontSize: 12, marginTop: 1, flexShrink: 0 }}>•</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>

            <div style={{
              padding: '12px 14px', borderRadius: 10, marginBottom: 24,
              background: 'rgba(251,191,36,0.05)',
              border: '1px solid rgba(251,191,36,0.15)',
            }}>
              <p style={{ fontSize: 12, color: 'rgba(251,191,36,0.8)', lineHeight: 1.6 }}>
                <strong>Didn't receive it?</strong> Check your spam folder or{' '}
                <button onClick={handleTryAgain} style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  color: 'rgba(251,191,36,0.9)', fontWeight: 600, fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif", textDecoration: 'underline',
                }}>try again</button>
              </p>
            </div>

            <button
              onClick={handleBackToLogin}
              style={{
                width: '100%', padding: '13px', fontSize: 14, fontWeight: 600,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, cursor: 'pointer',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(16,185,129,0.4)';
                (e.currentTarget as HTMLButtonElement).style.color = '#f1f5f9';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)';
              }}
            >
              Back to Login
            </button>
          </>
        )}

        {/* ── ERROR STATE ── */}
        {formState === 'error' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', margin: '0 auto 20px',
                background: 'rgba(239,68,68,0.07)',
                border: '1px solid rgba(239,68,68,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <AlertCircle size={24} color="#f87171" />
              </div>
              <h1 style={{ fontSize: 'clamp(22px,4vw,28px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f1f5f9', marginBottom: 8 }}>
                Email Not Found
              </h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                We couldn't find an account for{' '}
                <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{email}</span>
              </p>
            </div>

            {/* Suggestions */}
            <div style={{
              padding: '16px', borderRadius: 10, marginBottom: 24,
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>
                Try these steps
              </p>
              {[
                'Double-check your email for typos',
                'Try a different email you might have used',
                'Make sure you have an account with Finora',
              ].map((tip, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: i < 2 ? 8 : 0 }}>
                  <span style={{ color: '#f87171', fontSize: 12, marginTop: 1, flexShrink: 0 }}>•</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{tip}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={handleTryAgain}
                style={{
                  width: '100%', padding: '13px', fontSize: 14, fontWeight: 600,
                  background: 'linear-gradient(135deg,#10b981,#0d9488)',
                  color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer',
                  boxShadow: '0 0 24px rgba(16,185,129,0.2)',
                  fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                Try Another Email
              </button>

              <button
                onClick={handleBackToLogin}
                style={{
                  width: '100%', padding: '13px', fontSize: 14, fontWeight: 600,
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
                  fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(16,185,129,0.4)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#f1f5f9';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                Back to Login
              </button>
            </div>

            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 20 }}>
              Don't have an account?{' '}
              <button onClick={handleSignUp} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#10b981', fontWeight: 600, fontSize: 12,
                fontFamily: "'DM Sans', sans-serif", padding: 0,
              }}>Sign up for free</button>
            </p>
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
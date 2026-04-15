import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Zap, Shield, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

/* ─────────────────── Sidebar features ─────────────────── */
const features = [
  { icon: <TrendingUp size={14} />, title: 'Fast approvals',      desc: 'Get loan decisions in minutes, not days.' },
  { icon: <Shield size={14} />,     title: 'Bank-grade security', desc: '256-bit encryption. Your data stays private.' },
  { icon: <Clock size={14} />,      title: 'Flexible repayment',  desc: 'Plans that adapt to your income and schedule.' },
];

/* ─────────────────── Field ─────────────────── */
const Field: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: React.ReactNode;
}> = ({ label, type = 'text', value, onChange, placeholder, suffix }) => (
  <div>
    <label style={{
      display: 'block', fontSize: 10, letterSpacing: '0.12em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
      marginBottom: 7, fontFamily: "'DM Mono', monospace",
    }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '11px 14px',
          paddingRight: suffix ? 42 : 14,
          fontSize: 14,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 8, color: '#f1f5f9', outline: 'none',
          fontFamily: "'DM Sans', sans-serif",
          boxSizing: 'border-box', transition: 'border-color 0.2s, background 0.2s',
        }}
        onFocus={(e) => { e.target.style.borderColor = 'rgba(16,185,129,0.6)'; e.target.style.background = 'rgba(16,185,129,0.04)'; }}
        onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
      />
      {suffix && (
        <div style={{
          position: 'absolute', right: 13, top: '50%',
          transform: 'translateY(-50%)', display: 'flex',
        }}>
          {suffix}
        </div>
      )}
    </div>
  </div>
);

/* ─────────────────── Page ─────────────────── */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPw,   setShowPw]   = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setError(''); setLoading(true);
    try {
      const res = await authService.login(email, password);
      login(res);
      navigate('/user/dashboard');
    } catch (e: any) { setError(e.message || 'Failed to sign in.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#080c14', fontFamily: "'DM Sans', sans-serif" }}>

      {/* dot grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      {/* glow */}
      <div style={{
        position: 'fixed', top: -200, left: '30%', width: 600, height: 600,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
      }} />

      {/* ── Sidebar ── */}
      <aside
        className="sidebar-panel"
        style={{
          display: 'none', position: 'relative', zIndex: 1,
          width: '42%', minWidth: 360,
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '48px 44px',
          flexDirection: 'column', justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 52 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #10b981, #0d9488)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={15} color="#fff" />
            </div>
            <span style={{ fontSize: 18, fontWeight: 600, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Finora</span>
          </div>

          <p style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.25, marginBottom: 12, letterSpacing: '-0.03em' }}>
            Smarter loans.<br />Better decisions.
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 40, maxWidth: 280 }}>
            Access flexible loans, transparent terms, and instant approvals built for your financial growth.
          </p>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 44 }}>
            {features.map((f) => (
              <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 30, height: 30, minWidth: 30, borderRadius: 7,
                  border: '1px solid rgba(16,185,129,0.25)',
                  background: 'rgba(16,185,129,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#10b981',
                }}>
                  {f.icon}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{f.title}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12, padding: '16px 18px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)',
            }} />
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 34, height: 34, minWidth: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #0d9488)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: '#fff',
                fontFamily: "'DM Mono', monospace",
              }}>AO</div>
              <div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
                  "Finora got me approved in minutes. Transparent rates, zero hidden fees."
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 6, fontFamily: "'DM Mono', monospace" }}>
                  Amara O. — Lagos, NG
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex', gap: 12, fontSize: 11,
          color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.08em',
        }}>
          <span>REGULATED</span><span>·</span><span>TRANSPARENT</span><span>·</span><span>TRUSTED</span>
        </div>
      </aside>

      {/* ── Form panel ── */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px', position: 'relative', zIndex: 1,
      }}>
        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Mobile wordmark */}
          <div className="mobile-logo" style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 32 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: 'linear-gradient(135deg, #10b981, #0d9488)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={13} color="#fff" />
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#f1f5f9' }}>Finora</span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 28 }}>
            <p style={{
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#10b981', fontFamily: "'DM Mono', monospace", marginBottom: 10,
            }}>
              SIGN IN
            </p>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 6 }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              Sign in to continue with Finora.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              padding: '10px 14px', marginBottom: 20,
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 8, fontSize: 13, color: '#fca5a5',
              fontFamily: "'DM Mono', monospace",
            }}>
              ⚠ {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <Field
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
            />

            <div>
              <Field
                label="Password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={setPassword}
                placeholder="Enter your password"
                suffix={
                  <span
                    onClick={() => setShowPw(!showPw)}
                    style={{ color: 'rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex' }}
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </span>
                }
              />
              {/* Forgot password */}
              <div style={{ marginTop: 8, textAlign: 'right' }}>
                <span
                  onClick={() => navigate('/forgot-password')}
                  style={{
                    fontSize: 12, color: '#10b981', cursor: 'pointer',
                    fontFamily: "'DM Mono', monospace", letterSpacing: '0.02em',
                    textDecoration: 'underline', textUnderlineOffset: 3,
                  }}
                >
                  Forgot password?
                </span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '2px 0' }} />

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%', padding: '12px 20px', borderRadius: 8, border: 'none',
                fontSize: 14, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s',
                background: 'linear-gradient(135deg, #10b981, #0d9488)',
                color: '#fff',
                opacity: loading ? 0.8 : 1,
                letterSpacing: '-0.01em',
                boxShadow: loading ? 'none' : '0 0 24px rgba(16,185,129,0.25)',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
            >
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> Signing in…</>
              ) : (
                <>Sign in <ArrowRight size={15} /></>
              )}
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>
              Don't have an account?{' '}
              <span
                onClick={() => navigate('/register')}
                style={{ color: '#10b981', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}
              >
                Sign up for free
              </span>
            </p>
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgba(255,255,255,0.18) !important; }
        @media (min-width: 1024px) {
          .sidebar-panel { display: flex !important; }
          .mobile-logo   { display: none !important; }
        }
        .animate-spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Login;
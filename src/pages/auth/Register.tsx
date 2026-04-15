import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Eye, EyeOff, ArrowRight, Check, Zap, Shield, Users, Loader2 } from 'lucide-react';

/* ─────────────────── Password Strength ─────────────────── */
const PasswordStrengthBar: React.FC<{ password: string }> = ({ password }) => {
  const getScore = (pw: string): number => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const score = getScore(password);
  const meta = [
    { label: 'Weak',   color: '#ef4444' },
    { label: 'Fair',   color: '#f59e0b' },
    { label: 'Good',   color: '#22c55e' },
    { label: 'Strong', color: '#10b981' },
  ];
  if (!password) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: 2,
              flex: 1,
              borderRadius: 99,
              background: i < score ? meta[score - 1].color : 'rgba(255,255,255,0.08)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
      <p style={{ fontSize: 11, marginTop: 5, color: meta[score - 1].color, fontFamily: "'DM Mono', monospace", letterSpacing: '0.04em' }}>
        {meta[score - 1].label}
      </p>
    </div>
  );
};

/* ─────────────────── Input ─────────────────── */
const Field: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: React.ReactNode;
}> = ({ label, type = 'text', value, onChange, placeholder, suffix }) => (
  <div>
    <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 7, fontFamily: "'DM Mono', monospace" }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '11px 14px',
          paddingRight: suffix ? 42 : 14,
          fontSize: 14,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 8,
          color: '#f1f5f9',
          outline: 'none',
          fontFamily: "'DM Sans', sans-serif",
          boxSizing: 'border-box',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onFocus={(e) => { e.target.style.borderColor = 'rgba(16,185,129,0.6)'; e.target.style.background = 'rgba(16,185,129,0.04)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
      />
      {suffix && (
        <div style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', display: 'flex', cursor: 'pointer' }}>
          {suffix}
        </div>
      )}
    </div>
  </div>
);

/* ─────────────────── Sidebar features ─────────────────── */
const features = [
  { icon: <Zap size={14} />, title: 'Instant decisions', desc: 'Apply and get approved in under 60 seconds.' },
  { icon: <Shield size={14} />, title: 'Bank-grade security', desc: '256-bit encryption. Your data never leaves our servers.' },
  { icon: <Users size={14} />, title: '150 000+ members', desc: 'Join a community of financially empowered users.' },
];

/* ─────────────────── Page ─────────────────── */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [firstName, setFirstName]         = useState('');
  const [lastName,  setLastName]          = useState('');
  const [email,     setEmail]             = useState('');
  const [password,  setPassword]          = useState('');
  const [confirm,   setConfirm]           = useState('');
  const [terms,     setTerms]             = useState(false);
  const [error,     setError]             = useState('');
  const [loading,   setLoading]           = useState(false);
  const [success,   setSuccess]           = useState(false);
  const [showPw,    setShowPw]            = useState(false);
  const [showCpw,   setShowCpw]           = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirm) { setError('Please fill in all fields.'); return; }
    if (password !== confirm)  { setError('Passwords do not match.'); return; }
    if (!terms)                { setError('Please accept the terms to continue.'); return; }
    setError(''); setLoading(true);
    try {
      const res = await authService.register({ name: `${firstName} ${lastName}`, email, password });
      login(res); setSuccess(true);
      setTimeout(() => navigate('/user/dashboard'), 900);
    } catch (e: any) { setError(e.message || 'Registration failed.'); }
    finally { setLoading(false); }
  };

  /* ─── Shared styles ─── */
  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    background: '#080c14',
    fontFamily: "'DM Sans', sans-serif",
  };

  /* subtle dot-grid overlay */
  const dotGrid: React.CSSProperties = {
    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
  };

  /* accent glow */
  const glow: React.CSSProperties = {
    position: 'fixed', top: -200, left: '30%', width: 600, height: 600,
    borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
    background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
  };

  return (
    <div style={pageStyle}>
      <div style={dotGrid} />
      <div style={glow} />

      {/* ── Sidebar ── */}
      <aside style={{
        display: 'none',
        position: 'relative', zIndex: 1,
        width: '42%', minWidth: 360,
        borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 44px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // show on large screens via inline style override below
      }}
        className="sidebar-panel"
      >
        {/* Wordmark */}
        <div>
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
            The smarter way<br />to manage money
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 40, maxWidth: 280 }}>
            Fast loans, flexible repayments, and crystal-clear pricing — all in one place.
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

        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.08em' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 32 }} className="mobile-logo">
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
            <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#10b981', fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>
              NEW ACCOUNT
            </p>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 6 }}>
              Create your account
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              Get started in minutes. No paperwork.
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

            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="First name" value={firstName} onChange={setFirstName} placeholder="Andrew" />
              <Field label="Last name"  value={lastName}  onChange={setLastName}  placeholder="Adetokunbo" />
            </div>

            <Field label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />

            {/* Password */}
            <div>
              <Field
                label="Password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={setPassword}
                placeholder="Min. 8 characters"
                suffix={
                  <span onClick={() => setShowPw(!showPw)} style={{ color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </span>
                }
              />
              <PasswordStrengthBar password={password} />
            </div>

            <Field
              label="Confirm password"
              type={showCpw ? 'text' : 'password'}
              value={confirm}
              onChange={setConfirm}
              placeholder="Repeat password"
              suffix={
                <span onClick={() => setShowCpw(!showCpw)} style={{ color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>
                  {showCpw ? <EyeOff size={15} /> : <Eye size={15} />}
                </span>
              }
            />

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '2px 0' }} />

            {/* Terms */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
              <div
                onClick={() => setTerms(!terms)}
                style={{
                  width: 16, height: 16, minWidth: 16, marginTop: 1, borderRadius: 4,
                  border: terms ? '1.5px solid #10b981' : '1.5px solid rgba(255,255,255,0.18)',
                  background: terms ? 'rgba(16,185,129,0.15)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', cursor: 'pointer',
                }}
              >
                {terms && <Check size={10} color="#10b981" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                I agree to the{' '}
                <span style={{ color: '#10b981', textDecoration: 'underline', textUnderlineOffset: 2, cursor: 'pointer' }}>Terms of Service</span>
                {' '}and{' '}
                <span style={{ color: '#10b981', textDecoration: 'underline', textUnderlineOffset: 2, cursor: 'pointer' }}>Privacy Policy</span>
              </span>
            </label>

            {/* Submit */}
            <button
              onClick={handleRegister}
              disabled={loading || success}
              style={{
                width: '100%', padding: '12px 20px', borderRadius: 8, border: 'none',
                fontSize: 14, fontWeight: 600, cursor: loading || success ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s',
                background: success
                  ? 'linear-gradient(135deg, #059669, #0d9488)'
                  : 'linear-gradient(135deg, #10b981, #0d9488)',
                color: '#fff',
                opacity: loading ? 0.8 : 1,
                letterSpacing: '-0.01em',
                boxShadow: success || loading ? 'none' : '0 0 24px rgba(16,185,129,0.25)',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => { if (!loading && !success) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
            >
              {success ? (
                <><Check size={15} /> Account created!</>
              ) : loading ? (
                <><Loader2 size={15} className="animate-spin" /> Creating your account…</>
              ) : (
                <>Create account <ArrowRight size={15} /></>
              )}
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                style={{ color: '#10b981', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </main>

      {/* Responsive styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        input::placeholder { color: rgba(255,255,255,0.18) !important; }

        @media (min-width: 1024px) {
          .sidebar-panel { display: flex !important; }
          .mobile-logo   { display: none !important; }
        }

        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Register;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, AlertTriangle } from 'lucide-react';

/* ── Animated glitch digits ── */
const GlitchDigit: React.FC<{ char: string; delay: number }> = ({ char, delay }) => (
  <span
    className="glitch-digit"
    style={{ animationDelay: `${delay}ms` }}
    data-char={char}
  >
    {char}
  </span>
);

/* ── Terminal line ── */
const TermLine: React.FC<{ text: string; delay: number; color?: string }> = ({
  text, delay, color = 'rgba(255,255,255,0.35)',
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: 12, color,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(4px)',
      transition: 'opacity 0.4s, transform 0.4s',
      lineHeight: 1.8,
    }}>
      {text}
    </div>
  );
};

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080c14',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 20px',
    }}>

      {/* dot grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* ambient glow — red-tinted for error state */}
      <div style={{
        position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 500, borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, rgba(16,185,129,0.03) 50%, transparent 70%)',
      }} />

      {/* corner scan lines */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)',
      }} />

      {/* ── Wordmark ── */}
      <div style={{
        position: 'absolute', top: 28, left: 28,
        display: 'flex', alignItems: 'center', gap: 9, zIndex: 2,
        opacity: mounted ? 1 : 0, transition: 'opacity 0.5s',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: 'linear-gradient(135deg, #10b981, #0d9488)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={13} color="#fff" />
        </div>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Finora</span>
      </div>

      {/* ── Main content ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', maxWidth: 520,
        opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.6s, transform 0.6s',
      }}>

        {/* status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '5px 12px', borderRadius: 999,
          border: '1px solid rgba(239,68,68,0.25)',
          background: 'rgba(239,68,68,0.08)',
          marginBottom: 32,
        }}>
          <AlertTriangle size={11} color="#ef4444" />
          <span style={{
            fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#ef4444', fontFamily: "'DM Mono', monospace",
          }}>
            ERROR 404 — PAGE NOT FOUND
          </span>
        </div>

        {/* 404 display */}
        <div style={{
          fontSize: 'clamp(88px, 18vw, 148px)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.06em',
          color: '#f1f5f9',
          marginBottom: 8,
          position: 'relative',
          userSelect: 'none',
        }}
          className="four-o-four"
        >
          <GlitchDigit char="4" delay={0} />
          <GlitchDigit char="0" delay={120} />
          <GlitchDigit char="4" delay={60} />

          {/* underline accent */}
          <div style={{
            position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
            width: '60%', height: 2,
            background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
          }} />
        </div>

        {/* terminal block */}
        <div style={{
          width: '100%', background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 12, padding: '18px 20px',
          textAlign: 'left', marginBottom: 36,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* top shimmer */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.4), transparent)',
          }} />

          {/* terminal dots */}
          <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
            {['#ef4444', '#f59e0b', 'rgba(255,255,255,0.15)'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            ))}
          </div>

          <TermLine text="$ finora resolve --path /current" delay={300} color="#10b981" />
          <TermLine text="  ↳ Scanning route registry…" delay={600} />
          <TermLine text="  ↳ No match found for requested path." delay={900} color="rgba(239,68,68,0.7)" />
          <TermLine text="  ↳ Resource may have moved or never existed." delay={1200} />
          <TermLine text="" delay={0} />
          <TermLine text="  STATUS  404   UPTIME  99.98%   BUILD  v2.4.1" delay={1500} color="rgba(255,255,255,0.2)" />
        </div>

        {/* copy */}
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 36, maxWidth: 340 }}>
          The page you're looking for doesn't exist or has been moved. Head back to safety.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 20px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.7)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = '#f1f5f9'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)'; }}
          >
            <ArrowLeft size={14} />
            Go back
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #10b981, #0d9488)',
              color: '#fff', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s', letterSpacing: '-0.01em',
              boxShadow: '0 0 20px rgba(16,185,129,0.2)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
          >
            Back to home
          </button>
        </div>
      </div>

      {/* bottom status bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(8,12,20,0.9)', backdropFilter: 'blur(8px)',
        padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.8s 0.4s',
      }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.1em' }}>
          FINORA © 2025
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.1em' }}>
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .glitch-digit {
          display: inline-block;
          position: relative;
          animation: glitch-idle 6s infinite;
        }
        .glitch-digit::before,
        .glitch-digit::after {
          content: attr(data-char);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0;
        }
        .glitch-digit::before {
          color: #10b981;
          animation: glitch-before 6s infinite;
        }
        .glitch-digit::after {
          color: #ef4444;
          animation: glitch-after 6s infinite;
        }

        @keyframes glitch-idle {
          0%, 90%, 100% { transform: translate(0); }
          92%  { transform: translate(-2px, 1px); }
          94%  { transform: translate(2px, -1px); }
          96%  { transform: translate(-1px, 0); }
          98%  { transform: translate(1px, 1px); }
        }
        @keyframes glitch-before {
          0%, 90%, 100% { opacity: 0; transform: translate(0); }
          92%  { opacity: 0.6; transform: translate(3px, -2px); clip-path: inset(30% 0 40% 0); }
          94%  { opacity: 0; }
          96%  { opacity: 0.4; transform: translate(-3px, 1px); clip-path: inset(60% 0 10% 0); }
          98%  { opacity: 0; }
        }
        @keyframes glitch-after {
          0%, 90%, 100% { opacity: 0; transform: translate(0); }
          93%  { opacity: 0.5; transform: translate(-3px, 2px); clip-path: inset(10% 0 70% 0); }
          95%  { opacity: 0; }
          97%  { opacity: 0.4; transform: translate(3px, -1px); clip-path: inset(50% 0 20% 0); }
          99%  { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
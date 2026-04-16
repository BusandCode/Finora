import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Zap, ArrowRight, Shield, Clock, Eye, BarChart2,
  Headphones, ChevronDown, ChevronUp, CheckCircle2,
} from "lucide-react";

/* ── helpers ── */
const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const features = [
  { icon: <Zap size={16} />,        title: "Instant Approval",      desc: "AI-powered review in under 5 minutes." },
  { icon: <Shield size={16} />,     title: "Bank-grade Security",   desc: "256-bit encryption & full compliance." },
  { icon: <Clock size={16} />,      title: "Flexible Repayment",    desc: "Weekly or monthly schedules that adapt." },
  { icon: <Eye size={16} />,        title: "Real-time Tracking",    desc: "Monitor every loan movement, anytime." },
  { icon: <BarChart2 size={16} />,  title: "No Hidden Fees",        desc: "Transparent interest rates, always." },
  { icon: <Headphones size={16} />, title: "24/7 Support",          desc: "Human help when you need it most." },
];

const steps = [
  { n: "01", title: "Create account",  desc: "Sign up in 60 seconds. No paperwork." },
  { n: "02", title: "Choose loan",     desc: "Pick amount, tenure and purpose." },
  { n: "03", title: "Get approved",    desc: "Our AI decides in minutes." },
  { n: "04", title: "Receive funds",   desc: "Money hits your account instantly." },
];

const faqs = [
  { q: "What do I need to apply?",   a: "A valid ID, a bank account, and proof of income. The entire process is online." },
  { q: "How fast is approval?",      a: "Most applications are approved within 5 minutes via our automated system." },
  { q: "Are there hidden charges?",  a: "No. Finora practices transparent pricing. What you see is what you pay." },
  { q: "Can I repay early?",         a: "Yes. Early repayment is allowed with zero penalties." },
];

const stats = [
  { v: "₦5B+", l: "Loans Disbursed" },
  { v: "50K+", l: "Active Users" },
  { v: "5 min", l: "Avg. Approval" },
  { v: "4.8★",  l: "User Rating" },
];

/* ── Stat counter ── */
const StatCard: React.FC<{ v: string; l: string }> = ({ v, l }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontSize: "clamp(28px,4vw,40px)", fontWeight: 800,
        color: "#10b981", letterSpacing: "-0.03em",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
        fontFamily: "'DM Sans', sans-serif",
      }}>{v}</div>
      <div style={{
        fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)", marginTop: 6,
        fontFamily: "'DM Mono', monospace",
      }}>{l}</div>
    </div>
  );
};

/* ── FAQ item ── */
const FaqItem: React.FC<{ q: string; a: string; open: boolean; onToggle: () => void }> = ({ q, a, open, onToggle }) => (
  <div style={{
    border: "1px solid",
    borderColor: open ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.07)",
    borderRadius: 10, overflow: "hidden",
    background: open ? "rgba(16,185,129,0.04)" : "rgba(255,255,255,0.02)",
    transition: "border-color 0.2s, background 0.2s",
  }}>
    <button
      onClick={onToggle}
      style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 20px", background: "transparent", border: "none",
        color: "#f1f5f9", fontSize: 14, fontWeight: 500, cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif", textAlign: "left", gap: 12,
      }}
    >
      <span>{q}</span>
      <span style={{ color: open ? "#10b981" : "rgba(255,255,255,0.3)", flexShrink: 0 }}>
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </span>
    </button>
    <div style={{
      maxHeight: open ? 200 : 0, overflow: "hidden",
      transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <p style={{
        padding: "0 20px 16px", fontSize: 13,
        color: "rgba(255,255,255,0.45)", lineHeight: 1.7,
        fontFamily: "'DM Sans', sans-serif",
      }}>{a}</p>
    </div>
  </div>
);

/* ── Reusable FadeUp wrapper ── */
const FadeUp: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0,
  children,
  style,
}) => (
  <motion.div
    variants={fadeUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={delay}
    style={style}
  >
    {children}
  </motion.div>
);

/* ═══════════════════════════════════════════════════════ */
const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const s: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100vh", background: "#080c14",
      color: "#f1f5f9", overflowX: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    },
    dotGrid: {
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
    },
  };

  return (
    <div style={s.page}>
      <div style={s.dotGrid} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60, padding: "0 clamp(20px,5vw,64px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        background: scrolled ? "rgba(8,12,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg,#10b981,#0d9488)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Zap size={13} color="#fff" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>Finora</span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 32, fontSize: 13, color: "rgba(255,255,255,0.5)" }} className="nav-links">
          {["features","loans","how","faq"].map(id => (
            <a key={id} href={`#${id}`} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link to="/login" style={{
            padding: "8px 16px", fontSize: 13, fontWeight: 500,
            border: "1px solid rgba(255,255,255,0.12)", borderRadius: 7,
            color: "rgba(255,255,255,0.7)", textDecoration: "none",
            transition: "all 0.2s", background: "transparent",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f1f5f9"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)"; }}
          >
            Login
          </Link>
          <Link to="/register" style={{
            padding: "8px 18px", fontSize: 13, fontWeight: 600,
            background: "linear-gradient(135deg,#10b981,#0d9488)", borderRadius: 7,
            color: "#fff", textDecoration: "none",
            boxShadow: "0 0 18px rgba(16,185,129,0.2)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", textAlign: "center", padding: "clamp(80px,12vw,140px) clamp(20px,5vw,64px) clamp(60px,10vw,120px)", zIndex: 1 }}>
        {/* glow */}
        <div style={{
          position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
          width: 800, height: 600, borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)",
        }} />

        <FadeUp delay={0} style={{ marginBottom: 20 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "5px 14px", borderRadius: 999,
            border: "1px solid rgba(16,185,129,0.25)",
            background: "rgba(16,185,129,0.07)", fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#10b981", fontFamily: "'DM Mono', monospace",
          }}>
            <CheckCircle2 size={10} /> Now live in Nigeria
          </span>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 style={{
            maxWidth: 760, margin: "0 auto 20px",
            fontSize: "clamp(36px,7vw,72px)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.04em", color: "#f1f5f9",
          }}>
            Fast, reliable loans{" "}
            <span style={{
              background: "linear-gradient(90deg,#10b981,#34d399)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              anytime, anywhere
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p style={{
            maxWidth: 480, margin: "0 auto 40px",
            fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7,
          }}>
            Access instant funds, track repayments, and manage your finances from one powerful platform.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link to="/register" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 26px", borderRadius: 8, textDecoration: "none",
              background: "linear-gradient(135deg,#10b981,#0d9488)",
              color: "#fff", fontWeight: 600, fontSize: 14,
              boxShadow: "0 0 28px rgba(16,185,129,0.25)",
              letterSpacing: "-0.01em", transition: "all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
            >
              Apply for a loan <ArrowRight size={15} />
            </Link>
            <a href="#how" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 26px", borderRadius: 8, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.7)", fontSize: 14,
              background: "rgba(255,255,255,0.03)", transition: "all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f1f5f9"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.10)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)"; }}
            >
              How it works
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ── STATS ── */}
      <section style={{
        position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
        gap: 1, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.03)",
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: "32px 20px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}>
            <StatCard v={s.v} l={s.l} />
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ position: "relative", zIndex: 1, padding: "clamp(60px,8vw,100px) clamp(20px,5vw,80px)" }}>
        <FadeUp delay={0} style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>
            WHY FINORA
          </p>
          <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#f1f5f9" }}>
            Everything you need to borrow smarter
          </h2>
        </FadeUp>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 16, maxWidth: 1100, margin: "0 auto",
        }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.07}
              whileHover={{ y: -4 }}
              style={{
                padding: "24px", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.025)",
                transition: "border-color 0.2s",
                cursor: "default",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8, marginBottom: 14,
                border: "1px solid rgba(16,185,129,0.25)",
                background: "rgba(16,185,129,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#10b981",
              }}>{f.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{
        position: "relative", zIndex: 1,
        padding: "clamp(60px,8vw,100px) clamp(20px,5vw,80px)",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <FadeUp delay={0} style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>
            THE PROCESS
          </p>
          <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#f1f5f9" }}>
            How it works
          </h2>
        </FadeUp>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 32, maxWidth: 960, margin: "0 auto", position: "relative",
        }}>
          {/* connector line */}
          <div style={{
            position: "absolute", top: 20, left: "12%", right: "12%", height: 1,
            background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.2),rgba(16,185,129,0.2),transparent)",
            pointerEvents: "none",
          }} className="step-connector" />

          {steps.map((st, i) => (
            <FadeUp key={st.n} delay={i * 0.1} style={{ textAlign: "center" }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%", margin: "0 auto 16px",
                border: "1px solid rgba(16,185,129,0.3)",
                background: "rgba(16,185,129,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700,
                color: "#10b981", position: "relative", zIndex: 1,
              }}>{st.n}</div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 6 }}>{st.title}</h3>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.65 }}>{st.desc}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{
        position: "relative", zIndex: 1,
        padding: "clamp(60px,8vw,100px) clamp(20px,5vw,80px)",
      }}>
        <FadeUp delay={0} style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>
            FAQ
          </p>
          <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#f1f5f9" }}>
            Common questions
          </h2>
        </FadeUp>

        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((f, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <FaqItem q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        position: "relative", zIndex: 1,
        padding: "clamp(60px,8vw,100px) clamp(20px,5vw,64px)",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 65%)",
        }} />
        <FadeUp delay={0}>
          <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>
            GET STARTED TODAY
          </p>
          <h2 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#f1f5f9", marginBottom: 16, lineHeight: 1.15 }}>
            Ready to take control<br />of your finances?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 36 }}>
            Join 50,000+ Nigerians already using Finora.
          </p>
          <Link to="/register" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 32px", borderRadius: 8, textDecoration: "none",
            background: "linear-gradient(135deg,#10b981,#0d9488)",
            color: "#fff", fontWeight: 600, fontSize: 15,
            boxShadow: "0 0 32px rgba(16,185,129,0.25)",
            letterSpacing: "-0.01em", transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(16,185,129,0.35)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 32px rgba(16,185,129,0.25)"; }}
          >
            Create free account <ArrowRight size={16} />
          </Link>
        </FadeUp>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "24px clamp(20px,5vw,64px)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 5,
            background: "linear-gradient(135deg,#10b981,#0d9488)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Zap size={11} color="#fff" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "-0.01em" }}>Finora</span>
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>
          © {new Date().getFullYear()} FINORA. ALL RIGHTS RESERVED.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .step-connector { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
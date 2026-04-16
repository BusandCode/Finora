import { type FC, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Banknote, CalendarDays, FileText, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { dataService } from "../../services/dataService";

/* ── Field ── */
const Field: FC<{
  label: string;
  hint?: string;
  children: React.ReactNode;
}> = ({ label, hint, children }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
      <label style={{
        fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace",
      }}>{label}</label>
      {hint && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}>{hint}</span>}
    </div>
    {children}
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 14px", fontSize: 14,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 8, color: "#f1f5f9", outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s",
};

const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.target.style.borderColor = "rgba(16,185,129,0.6)"; e.target.style.background = "rgba(16,185,129,0.04)"; };
const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.target.style.borderColor = "rgba(255,255,255,0.10)"; e.target.style.background = "rgba(255,255,255,0.04)"; };

/* ── Summary card ── */
const SummaryCard: FC<{ icon: React.ReactNode; title: string; value: string; sub?: string; accent: string }> = ({
  icon, title, value, sub, accent,
}) => (
  <div style={{
    padding: "20px", borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.025)",
    position: "relative", overflow: "hidden",
  }}>
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 2,
      background: `linear-gradient(90deg, ${accent}55, ${accent}22, transparent)`,
    }} />
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 6,
        background: `${accent}18`,
        border: `1px solid ${accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accent,
      }}>{icon}</div>
      <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>
        {title}
      </span>
    </div>
    <p style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</p>
    {sub && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 5, fontFamily: "'DM Mono', monospace" }}>{sub}</p>}
  </div>
);

/* ── Range slider ── */
const RangeSlider: FC<{ value: number; min: number; max: number; step: number; onChange: (v: number) => void }> = ({
  value, min, max, step, onChange,
}) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ position: "relative", paddingTop: 4 }}>
      <div style={{
        position: "relative", height: 4, borderRadius: 99,
        background: "rgba(255,255,255,0.08)", marginBottom: 8,
      }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${pct}%`, borderRadius: 99,
          background: "linear-gradient(90deg,#10b981,#0d9488)", transition: "width 0.1s",
        }} />
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          position: "absolute", top: 0, left: 0, width: "100%",
          opacity: 0, cursor: "pointer", height: 20,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}>₦{min.toLocaleString()}</span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}>₦{max.toLocaleString()}</span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════ */
const ApplyLoan: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [amount,      setAmount]      = useState(100000);
  const [tenure,      setTenure]      = useState("");
  const [purpose,     setPurpose]     = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted,   setSubmitted]   = useState(false);

  const RATE = 0.12;
  const monthlyInterest = amount * RATE / 12;
  const tenureNum = Number(tenure) || 0;
  const monthlyPayment = tenureNum > 0 ? (amount / tenureNum + monthlyInterest) : 0;
  const totalRepayable = tenureNum > 0 ? monthlyPayment * tenureNum : 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !amount || !tenure || !purpose) return;
    setIsSubmitting(true);
    try {
      await dataService.applyForLoan(user.id, amount, Number(tenure), purpose);
      setSubmitted(true);
      setTimeout(() => navigate("/user/dashboard"), 1200);
    } catch (err) {
      console.error("Failed to apply for loan", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 780, margin: "0 auto", padding: "40px 0 40px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 32 }}
        >
          <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>
            LOAN APPLICATION
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.03em", marginBottom: 6 }}>
            Apply for a Loan
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            Fill out the form below to request funds. Approval in under 5 minutes.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: "28px",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* top shimmer */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.4),transparent)",
            }} />

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

                {/* Loan amount with slider */}
                <Field label="Loan Amount" hint={`₦${amount.toLocaleString()}`}>
                  <div style={{
                    padding: "14px", borderRadius: 8, marginBottom: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>₦</span>
                    <input
                      type="number" value={amount}
                      onChange={e => setAmount(Number(e.target.value))}
                      style={{ ...inputStyle, background: "transparent", border: "none", padding: 0, flex: 1, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}
                      onFocus={e => { e.target.style.outline = "none"; }}
                    />
                  </div>
                  <RangeSlider value={amount} min={10000} max={5000000} step={10000} onChange={setAmount} />
                </Field>

                {/* Tenure */}
                <Field label="Tenure (Months)" hint="1–60 months">
                  <input
                    type="number" required min={1} max={60}
                    value={tenure} onChange={e => setTenure(e.target.value)}
                    placeholder="e.g. 12"
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut}
                  />
                </Field>

                {/* Purpose */}
                <Field label="Loan Purpose">
                  <textarea
                    required value={purpose} onChange={e => setPurpose(e.target.value)}
                    placeholder="Briefly describe how you'll use the funds…"
                    rows={4}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={focusIn} onBlur={focusOut}
                  />
                </Field>

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  style={{
                    width: "100%", padding: "13px 20px", borderRadius: 8, border: "none",
                    fontSize: 14, fontWeight: 600, cursor: isSubmitting || submitted ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "all 0.2s", letterSpacing: "-0.01em",
                    background: submitted
                      ? "linear-gradient(135deg,#059669,#0d9488)"
                      : "linear-gradient(135deg,#10b981,#0d9488)",
                    color: "#fff",
                    opacity: isSubmitting ? 0.8 : 1,
                    boxShadow: submitted || isSubmitting ? "none" : "0 0 24px rgba(16,185,129,0.2)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => { if (!isSubmitting && !submitted) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
                >
                  {submitted ? (
                    <><CheckCircle2 size={15} /> Application submitted!</>
                  ) : isSubmitting ? (
                    <><Loader2 size={15} className="spin" /> Processing application…</>
                  ) : (
                    <>Submit Application <ArrowRight size={15} /></>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Summary cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}
          >
            <SummaryCard
              icon={<Banknote size={14} />} title="Loan Amount"
              value={`₦${amount.toLocaleString()}`}
              sub="Principal requested"
              accent="#10b981"
            />
            <SummaryCard
              icon={<CalendarDays size={14} />} title="Duration"
              value={tenure ? `${tenure} mo.` : "—"}
              sub={tenure ? `${tenure} repayments` : "Set tenure above"}
              accent="#3b82f6"
            />
            <SummaryCard
              icon={<FileText size={14} />} title="Est. Monthly"
              value={monthlyPayment > 0 ? `₦${Math.round(monthlyPayment).toLocaleString()}` : "—"}
              sub="12% p.a. flat rate"
              accent="#f59e0b"
            />
            <SummaryCard
              icon={<Banknote size={14} />} title="Total Repayable"
              value={totalRepayable > 0 ? `₦${Math.round(totalRepayable).toLocaleString()}` : "—"}
              sub="Principal + interest"
              accent="#8b5cf6"
            />
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{
              fontSize: 11, color: "rgba(255,255,255,0.2)",
              fontFamily: "'DM Mono', monospace", lineHeight: 1.7,
              padding: "12px 16px",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 8, background: "rgba(255,255,255,0.015)",
            }}
          >
            DISCLAIMER: Estimated figures are for illustrative purposes only. Final terms are subject to credit assessment and may vary. All loans are subject to Finora's terms and conditions.
          </motion.p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        input[type=range]::-webkit-slider-thumb { width: 16px; height: 16px; border-radius: 50%; background: #10b981; cursor: pointer; -webkit-appearance: none; border: 2px solid #080c14; box-shadow: 0 0 6px rgba(16,185,129,0.4); }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </DashboardLayout>
  );
};

export default ApplyLoan;
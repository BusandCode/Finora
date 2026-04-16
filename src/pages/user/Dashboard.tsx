import { type FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, AlertCircle, Calendar, ArrowRight, Zap,
  Plus, CreditCard, ArrowUpRight, ArrowDownLeft, ChevronRight,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { dataService, type Loan, type Transaction } from "../../services/dataService";

/* ─────────────────── Types ─────────────────── */
interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: string;
  accentBg: string;
}
interface LoanDetailProps { label: string; value: string; }
interface TransactionItemProps { title: string; amount: string; positive: boolean; }

/* ─────────────────── Page ─────────────────── */
const UserDashboard: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [txns, setTxns]   = useState<Transaction[]>([]);

  useEffect(() => {
    if (user) {
      setLoans(dataService.getUserLoans(user.id));
      setTxns(dataService.getUserTransactions(user.id));
    }
  }, [user]);

  const activeLoans        = loans.filter((l) => l.status === "Active");
  const totalAmount        = activeLoans.reduce((sum, l) => sum + l.amount, 0);
  const outstandingBalance = activeLoans.reduce((sum, l) => sum + l.amount + l.amount * 0.12, 0);
  const currentLoan        = activeLoans.length > 0 ? activeLoans[0] : null;
  const recentTxns         = txns.slice(-5).reverse();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };
  const displayName = user?.email ? user.email.split("@")[0] : "User";

  return (
    <DashboardLayout>
      <div style={{ minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 60px" }}>

          {/* ── Header ── */}
          <div style={{
            display: "flex", alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 40, flexWrap: "wrap", gap: 16,
          }}>
            <div>
              {/* Mobile wordmark (hidden on desktop via DashboardLayout's sidebar) */}
              <div className="ud-mobile-logo" style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 20 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: "linear-gradient(135deg, #10b981, #0d9488)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Zap size={12} color="#fff" />
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9" }}>Finora</span>
              </div>

              <p style={{
                fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#10b981", fontFamily: "'DM Mono', monospace", marginBottom: 8,
              }}>
                {greeting()}
              </p>
              <h1 style={{
                fontSize: 26, fontWeight: 700, color: "#f1f5f9",
                letterSpacing: "-0.03em", marginBottom: 4,
              }}>
                {displayName} 👋
              </h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                Here's your financial overview
              </p>
            </div>

            <button
              onClick={() => navigate("/user/apply-loan")}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "11px 20px", borderRadius: 8, border: "none",
                background: "linear-gradient(135deg, #10b981, #0d9488)",
                color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                boxShadow: "0 0 24px rgba(16,185,129,0.2)",
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              <Plus size={14} /> Apply for Loan
            </button>
          </div>

          {/* ── Summary Cards ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14, marginBottom: 28,
          }}>
            <SummaryCard
              title="Active Loans"
              value={`₦${totalAmount.toLocaleString()}`}
              subtitle={`${activeLoans.length} ongoing loan${activeLoans.length !== 1 ? "s" : ""}`}
              icon={<TrendingUp size={13} />}
              accent="#10b981"
              accentBg="rgba(16,185,129,0.1)"
            />
            <SummaryCard
              title="Outstanding Balance"
              value={`₦${Math.round(outstandingBalance).toLocaleString()}`}
              subtitle="Remaining to be paid"
              icon={<AlertCircle size={13} />}
              accent="#ef4444"
              accentBg="rgba(239,68,68,0.1)"
            />
            <SummaryCard
              title="Next Repayment"
              value={currentLoan ? "Pending" : "₦0"}
              subtitle={currentLoan ? "Check repayments tab" : "No due dates"}
              icon={<Calendar size={13} />}
              accent="#3b82f6"
              accentBg="rgba(59,130,246,0.1)"
            />
          </div>

          {/* ── Main Content Grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }} className="ud-grid">

            {/* Current Loan Card */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "26px 28px",
              position: "relative", overflow: "hidden",
            }}>
              {/* shimmer line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)",
              }} />

              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 7,
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#10b981",
                  }}>
                    <CreditCard size={13} />
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", letterSpacing: "-0.01em" }}>
                    Current Loan
                  </h3>
                </div>
                {currentLoan && (
                  <span style={{
                    fontSize: 10, letterSpacing: "0.10em", textTransform: "uppercase",
                    fontFamily: "'DM Mono', monospace",
                    background: "rgba(16,185,129,0.08)", color: "#10b981",
                    border: "1px solid rgba(16,185,129,0.2)",
                    borderRadius: 6, padding: "3px 10px",
                  }}>
                    Active
                  </span>
                )}
              </div>

              {currentLoan ? (
                <>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: 20, marginBottom: 26,
                  }}>
                    <LoanDetail label="Loan Amount" value={`₦${currentLoan.amount.toLocaleString()}`} />
                    <LoanDetail label="Interest Rate" value={`${currentLoan.interest}%`} />
                    <LoanDetail label="Tenure" value={`${currentLoan.tenure} months`} />
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginBottom: 26 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                      <span style={{
                        fontSize: 10, color: "rgba(255,255,255,0.3)",
                        fontFamily: "'DM Mono', monospace", letterSpacing: "0.10em",
                      }}>
                        REPAYMENT PROGRESS
                      </span>
                      <span style={{ fontSize: 10, color: "#10b981", fontFamily: "'DM Mono', monospace" }}>
                        32%
                      </span>
                    </div>
                    <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                      <div style={{
                        width: "32%", height: "100%", borderRadius: 99,
                        background: "linear-gradient(90deg, #10b981, #0d9488)",
                      }} />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/user/repayments")}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "10px 18px", borderRadius: 8,
                      background: "rgba(16,185,129,0.06)",
                      border: "1px solid rgba(16,185,129,0.18)",
                      color: "#10b981", fontSize: 13, fontWeight: 600,
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(16,185,129,0.12)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(16,185,129,0.06)"; }}
                  >
                    Make Repayment <ArrowRight size={13} />
                  </button>
                </>
              ) : (
                <div style={{
                  textAlign: "center", padding: "36px 20px",
                  border: "1px dashed rgba(255,255,255,0.07)", borderRadius: 12,
                }}>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 16 }}>
                    You don't have any active loans yet.
                  </p>
                  <button
                    onClick={() => navigate("/user/apply-loan")}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "10px 18px", borderRadius: 8, border: "none",
                      background: "linear-gradient(135deg, #10b981, #0d9488)",
                      color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Apply Now <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* Recent Transactions Card */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "26px 28px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.35), transparent)",
              }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", letterSpacing: "-0.01em" }}>
                  Recent Transactions
                </h3>
                <button
                  onClick={() => navigate("/user/transactions")}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    background: "transparent", border: "none", cursor: "pointer",
                    fontSize: 11, color: "rgba(255,255,255,0.3)",
                    fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#10b981"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)"; }}
                >
                  VIEW ALL <ChevronRight size={11} />
                </button>
              </div>

              {recentTxns.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {recentTxns.map((txn) => (
                    <TransactionItem
                      key={txn.id}
                      title={txn.type}
                      amount={`${txn.type === "Loan Disbursement" ? "+" : "-"} ₦${txn.amount.toLocaleString()}`}
                      positive={txn.type === "Loan Disbursement"}
                    />
                  ))}
                </div>
              ) : (
                <p style={{
                  color: "rgba(255,255,255,0.2)", fontSize: 13,
                  textAlign: "center", padding: "32px 0",
                  fontFamily: "'DM Mono', monospace",
                }}>
                  No transactions yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @media (min-width: 768px) {
          .ud-grid       { grid-template-columns: 3fr 2fr !important; }
          .ud-mobile-logo { display: none !important; }
        }
        @media (min-width: 1024px) {
          .ud-mobile-logo { display: none !important; }
        }
      `}</style>
    </DashboardLayout>
  );
};

/* ─────────────────── SummaryCard ─────────────────── */
const SummaryCard: FC<SummaryCardProps> = ({ title, value, subtitle, icon, accent, accentBg }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14, padding: "20px 22px",
      position: "relative", overflow: "hidden",
      transition: "border-color 0.2s",
    }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.11)"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
      <p style={{
        fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace",
      }}>
        {title}
      </p>
      <div style={{
        width: 26, height: 26, borderRadius: 6,
        background: accentBg, border: `1px solid ${accent}28`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accent, flexShrink: 0,
      }}>
        {icon}
      </div>
    </div>

    <h4 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.03em", marginBottom: 3 }}>
      {value}
    </h4>
    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{subtitle}</p>

    {/* Bottom accent bar */}
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
      background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
    }} />
  </div>
);

/* ─────────────────── LoanDetail ─────────────────── */
const LoanDetail: FC<LoanDetailProps> = ({ label, value }) => (
  <div>
    <p style={{
      fontSize: 10, letterSpacing: "0.10em", textTransform: "uppercase",
      color: "rgba(255,255,255,0.28)", fontFamily: "'DM Mono', monospace", marginBottom: 5,
    }}>
      {label}
    </p>
    <p style={{ fontSize: 19, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
      {value}
    </p>
  </div>
);

/* ─────────────────── TransactionItem ─────────────────── */
const TransactionItem: FC<TransactionItemProps> = ({ title, amount, positive }) => (
  <div
    style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 13px", borderRadius: 9, transition: "background 0.15s", cursor: "default",
    }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <div style={{
        width: 30, height: 30, minWidth: 30, borderRadius: 7,
        background: positive ? "rgba(16,185,129,0.07)" : "rgba(239,68,68,0.07)",
        border: positive ? "1px solid rgba(16,185,129,0.18)" : "1px solid rgba(239,68,68,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: positive ? "#10b981" : "#ef4444",
      }}>
        {positive ? <ArrowDownLeft size={12} /> : <ArrowUpRight size={12} />}
      </div>
      <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 500 }}>{title}</span>
    </div>
    <span style={{
      fontSize: 13, fontWeight: 600,
      color: positive ? "#10b981" : "#ef4444",
      fontFamily: "'DM Mono', monospace",
    }}>
      {amount}
    </span>
  </div>
);

export default UserDashboard;
import { type FC, useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { dataService, type Repayment } from "../../services/dataService";

const Repayments: FC = () => {
  const { user } = useAuth();
  const [repayments, setRepayments] = useState<Repayment[]>([]);

  useEffect(() => {
    if (user) setRepayments(dataService.getUserRepayments(user.id));
  }, [user]);

  const totalPaid    = repayments.filter((r) => r.status === "Paid").reduce((s, r) => s + r.amount, 0);
  const pendingAmt   = repayments.filter((r) => r.status === "Pending").reduce((s, r) => s + r.amount, 0);
  const overdueAmt   = repayments.filter((r) => r.status === "Overdue").reduce((s, r) => s + r.amount, 0);

  return (
    <DashboardLayout>
      <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 780, margin: "0 auto", padding: "40px 0 40px" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
          .rep-row { transition: background 0.15s; }
          .rep-row:hover { background: rgba(255,255,255,0.03) !important; }
          .pay-btn { transition: opacity 0.2s, transform 0.2s; }
          .pay-btn:hover { opacity: 0.85 !important; transform: translateY(-1px); }
        `}</style>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#10b981", fontFamily: "'DM Mono', monospace", marginBottom: 8,
          }}>REPAYMENTS</p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.03em", marginBottom: 4 }}>
            Repayment Schedule
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            Track and manage your loan repayments
          </p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 32 }}>
          {[
            { label: "Total Paid",   value: `₦${totalPaid.toLocaleString()}`,  accent: "#10b981" },
            { label: "Pending",      value: `₦${pendingAmt.toLocaleString()}`, accent: "#fbbf24" },
            { label: "Overdue",      value: `₦${overdueAmt.toLocaleString()}`, accent: "#f87171" },
          ].map((c) => (
            <div key={c.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: "18px 20px", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${c.accent}55, transparent)`,
              }} />
              <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>
                {c.label}
              </p>
              <p style={{ fontSize: 22, fontWeight: 700, color: c.accent, letterSpacing: "-0.02em" }}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 14, overflow: "hidden",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.35), transparent)",
          }} />

          <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>All Repayments</p>
          </div>

          {repayments.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    {["Loan ID", "Amount", "Due Date", "Status", "Action"].map((h, i) => (
                      <th key={h} style={{
                        padding: "11px 24px",
                        textAlign: i === 4 ? "right" : "left",
                        fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.3)",
                        fontFamily: "'DM Mono', monospace",
                        background: "rgba(0,0,0,0.2)",
                        fontWeight: 500,
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {repayments.map((r) => (
                    <tr key={r.id} className="rep-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "14px 24px", color: "#e2e8f0", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
                        {r.loanId}
                      </td>
                      <td style={{ padding: "14px 24px", color: "#f1f5f9", fontWeight: 600 }}>
                        ₦{r.amount.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 24px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
                        {r.dueDate}
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <RepaymentBadge status={r.status} />
                      </td>
                      <td style={{ padding: "14px 24px", textAlign: "right" }}>
                        {r.status === "Pending" && (
                          <button className="pay-btn" style={{
                            padding: "7px 16px", borderRadius: 7, border: "none", cursor: "pointer",
                            fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                            background: "linear-gradient(135deg, #10b981, #0d9488)", color: "#fff",
                            boxShadow: "0 0 14px rgba(16,185,129,0.2)",
                          }}>Pay Now</button>
                        )}
                        {r.status === "Paid" && (
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}>COMPLETED</span>
                        )}
                        {r.status === "Overdue" && (
                          <button className="pay-btn" style={{
                            padding: "7px 16px", borderRadius: 7, border: "1px solid rgba(248,113,113,0.35)",
                            cursor: "pointer", fontSize: 12, fontWeight: 600,
                            fontFamily: "'DM Sans', sans-serif",
                            background: "rgba(248,113,113,0.08)", color: "#f87171",
                          }}>Pay Overdue</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: "64px 24px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>
                NO REPAYMENT SCHEDULES AVAILABLE
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const RepaymentBadge: FC<{ status: Repayment["status"] }> = ({ status }) => {
  const styles: Record<string, { bg: string; color: string; dot: string }> = {
    Paid:    { bg: "rgba(16,185,129,0.1)",  color: "#10b981", dot: "#10b981" },
    Pending: { bg: "rgba(245,158,11,0.1)",  color: "#fbbf24", dot: "#fbbf24" },
    Overdue: { bg: "rgba(248,113,113,0.1)", color: "#f87171", dot: "#f87171" },
  };
  const s = styles[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 600, fontFamily: "'DM Mono', monospace",
      background: s.bg, color: s.color,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {status}
    </span>
  );
};

export default Repayments;
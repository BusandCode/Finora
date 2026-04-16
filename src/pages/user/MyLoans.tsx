import { type FC, useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { dataService, type Loan } from "../../services/dataService";

const MyLoans: FC = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    if (user) setLoans(dataService.getUserLoans(user.id));
  }, [user]);

  const totalActive = loans.filter((l) => l.status === "Active").length;
  const totalAmount = loans.reduce((sum, l) => sum + l.amount, 0);

  return (
    <DashboardLayout>
      <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 780, margin: "0 auto", padding: "40px 0 40px" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
          .loan-card { transition: transform 0.2s, box-shadow 0.2s; }
          .loan-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important; }
        `}</style>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#10b981", fontFamily: "'DM Mono', monospace", marginBottom: 8,
          }}>
            PORTFOLIO
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.03em", marginBottom: 4 }}>
            My Loans
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            Track all your loans, status, and details
          </p>
        </div>

        {/* Summary Strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 32 }}>
          {[
            { label: "Total Loans", value: loans.length },
            { label: "Active Loans", value: totalActive },
            { label: "Total Borrowed", value: `₦${totalAmount.toLocaleString()}` },
          ].map((s) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: "18px 20px", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.35), transparent)",
              }} />
              <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>
                {s.label}
              </p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Cards Grid */}
        {loans.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {loans.map((loan) => <LoanCard key={loan.id} {...loan} />)}
          </div>
        ) : (
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: "64px 24px", textAlign: "center",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px", fontSize: 22,
            }}>📋</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginBottom: 6 }}>No loans found</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", maxWidth: 300, margin: "0 auto" }}>
              You haven't applied for any loans yet. Navigate to "Apply Loan" to get started.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const statusMap: Record<string, { bg: string; color: string; dot: string }> = {
  Active:    { bg: "rgba(16,185,129,0.1)",  color: "#10b981", dot: "#10b981" },
  Completed: { bg: "rgba(99,102,241,0.1)",  color: "#818cf8", dot: "#818cf8" },
  Pending:   { bg: "rgba(245,158,11,0.1)",  color: "#fbbf24", dot: "#fbbf24" },
};

const LoanCard: FC<Loan> = ({ amount, tenure, interest, status, startDate, endDate }) => {
  const s = statusMap[status] ?? statusMap.Pending;
  return (
    <div className="loan-card" style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14, padding: "22px 22px 18px",
      display: "flex", flexDirection: "column", gap: 18,
      position: "relative", overflow: "hidden",
      boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)",
      }} />

      <div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>
          LOAN AMOUNT
        </p>
        <h4 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.03em" }}>
          ₦{amount.toLocaleString()}
        </h4>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {[["Tenure", `${tenure} mo.`], ["Interest", `${interest}%`]].map(([k, v]) => (
          <div key={k}>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", marginBottom: 3 }}>{k}</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{v}</p>
          </div>
        ))}
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
          background: s.bg, color: s.color, fontFamily: "'DM Mono', monospace",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
          {status}
        </span>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace" }}>
          {startDate} – {endDate}
        </p>
      </div>
    </div>
  );
};

export default MyLoans;
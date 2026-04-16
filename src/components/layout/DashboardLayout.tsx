import { type FC, useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Zap, LogOut } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const menuItems = [
    { label: "Dashboard",    path: "/user/dashboard" },
    { label: "Apply Loan",   path: "/user/apply-loan" },
    { label: "My Loans",     path: "/user/my-loans" },
    { label: "Repayments",   path: "/user/repayments" },
    { label: "Transactions", path: "/user/transactions" },
    { label: "Profile",      path: "/user/profile" },
  ];

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "28px 20px" }}>
      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #10b981, #0d9488)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Zap size={15} color="#fff" />
        </div>
        <span style={{ fontSize: 18, fontWeight: 600, color: "#f1f5f9", letterSpacing: "-0.02em", fontFamily: "'DM Sans', sans-serif" }}>
          Finora
        </span>
      </div>

      {/* Nav label */}
      <p style={{
        fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace",
        marginBottom: 10, paddingLeft: 4,
      }}>
        Navigation
      </p>

      {/* Nav items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => handleNavigate(item.path)}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "11px 14px", borderRadius: 8, border: "none",
            background: "rgba(239,68,68,0.06)",
            color: "rgba(239,68,68,0.7)", fontSize: 13, fontWeight: 500,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.12)";
            (e.currentTarget as HTMLButtonElement).style.color = "#f87171";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.06)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(239,68,68,0.7)";
          }}
        >
          <LogOut size={14} />
          Logout
        </button>
        <p style={{
          textAlign: "center", marginTop: 14,
          fontSize: 11, color: "rgba(255,255,255,0.15)",
          fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em",
        }}>
          © {new Date().getFullYear()} Finora
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080c14", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Dot grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      {/* Glow */}
      <div style={{
        position: "fixed", top: -200, right: "10%", width: 600, height: 600,
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
      }} />

      {/* ── Mobile Header ── */}
      <div className="dl-mobile-header" style={{
        display: "none",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        background: "rgba(8,12,20,0.9)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 6,
            background: "linear-gradient(135deg, #10b981, #0d9488)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Zap size={12} color="#fff" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9" }}>Finora</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: "rgba(255,255,255,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 40, backdropFilter: "blur(2px)",
          }}
          className="dl-mobile-overlay"
        />
      )}

      {/* ── Mobile Sidebar ── */}
      <aside
        className="dl-mobile-sidebar"
        style={{
          position: "fixed", top: 0, left: 0, height: "100%", width: 260,
          background: "#0a0f1a",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          zIndex: 50,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          display: "none",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 6, width: 28, height: 28, cursor: "pointer",
            color: "rgba(255,255,255,0.4)", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 14,
          }}
        >
          ✕
        </button>
        <SidebarContent />
      </aside>

      {/* ── Desktop Sidebar ── */}
      <aside
        className="dl-desktop-sidebar"
        style={{
          position: "fixed", top: 0, left: 0, height: "100%", width: 240,
          background: "#0a0f1a",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          zIndex: 30, display: "none",
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── Main Content ── */}
      <main
        className="dl-main"
        style={{ flex: 1, position: "relative", zIndex: 1 }}
      >
        {children}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @media (max-width: 1023px) {
          .dl-mobile-header  { display: flex !important; }
          .dl-mobile-sidebar { display: block !important; }
          .dl-main           { padding-top: 58px !important; }
        }

        @media (min-width: 1024px) {
          .dl-desktop-sidebar { display: block !important; }
          .dl-main            { margin-left: 240px !important; }
        }
      `}</style>
    </div>
  );
};

/* ─── NavItem ─── */
interface NavItemProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: FC<NavItemProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%", textAlign: "left",
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 14px", borderRadius: 8, border: "none",
      fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      transition: "all 0.15s",
      background: active ? "rgba(16,185,129,0.12)" : "transparent",
      color: active ? "#10b981" : "rgba(255,255,255,0.5)",
      ...(active ? { boxShadow: "inset 0 0 0 1px rgba(16,185,129,0.2)" } : {}),
    }}
    onMouseEnter={(e) => {
      if (!active) {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
      }
    }}
  >
    {/* Active indicator dot */}
    {active && (
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        background: "#10b981", flexShrink: 0,
        boxShadow: "0 0 6px rgba(16,185,129,0.6)",
      }} />
    )}
    {label}
  </button>
);

export default DashboardLayout;
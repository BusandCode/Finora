import { type FC, useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
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
    { label: "Overview", path: "/admin/dashboard" },
    { label: "Loan Requests", path: "/admin/requests" },
    { label: "Manage Users", path: "/admin/users" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f0f4fa]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#ffffff] flex items-center justify-between px-4 py-4">
        <h1 className="text-lg font-bold text-[#001a33]">Finora Admin</h1>
        <button onClick={() => setOpen(true)} className="text-[#001a33]" aria-label="Open menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#ffffff] text-[#001a33] z-50 transform transition-transform duration-300 lg:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-2xl font-bold">Finora Admin</h1>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <NavItem
                  key={item.path}
                  label={item.label}
                  active={location.pathname === item.path}
                  onClick={() => handleNavigate(item.path)}
                />
              ))}
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-6 px-4 py-3 rounded-lg bg-[#001a33]/10 text-[#001a33] hover:bg-[#001a33]/20 transition font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-[#ffffff] text-[#001a33] flex-col justify-between z-30">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-10 tracking-tight">Finora Admin</h1>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavItem
                key={item.path}
                label={item.label}
                active={location.pathname === item.path}
                onClick={() => handleNavigate(item.path)}
              />
            ))}
          </nav>
        </div>
        <div className="p-6 space-y-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-lg bg-[#001a33]/10 text-[#001a33] hover:bg-[#001a33]/20 transition font-medium"
          >
            Logout
          </button>
          <p className="text-sm text-[#001a33]/60">© {new Date().getFullYear()} Finora</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 pt-20">{children}</main>
    </div>
  );
};

interface NavItemProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: FC<NavItemProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition
      ${active ? "bg-[#001a33] text-white" : "hover:bg-[#001a33]/10 text-[#001a33]"}`}
  >
    {label}
  </button>
);

export default AdminLayout;

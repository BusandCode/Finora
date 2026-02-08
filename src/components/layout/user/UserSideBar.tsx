import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSidebar: FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0A2540] flex items-center justify-between px-4 py-4">
        <h1 className="text-lg font-bold text-white">Finora</h1>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="text-white"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0A2540] text-white z-50 transform transition-transform duration-300 lg:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-2xl font-bold">Finora</h1>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <nav className="space-y-2">
              <NavItem label="Dashboard" onClick={() => handleNavigate("/user/dashboard")} active />
              <NavItem label="Apply Loan" onClick={() => handleNavigate("/user/apply-loan")} />
              <NavItem label="My Loans" onClick={() => handleNavigate("/user/my-loans")} />
              <NavItem label="Repayments" onClick={() => handleNavigate("/user/repayments")} />
              <NavItem label="Transactions" onClick={() => handleNavigate("/user/transactions")} />
              <NavItem label="Profile" onClick={() => handleNavigate("/user/profile")} />
            </nav>
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Finora
          </p>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#0A2540] text-white flex-col justify-between">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-10 tracking-tight">
            Finora
          </h1>

          <nav className="space-y-2">
            <NavItem label="Dashboard" onClick={() => handleNavigate("/user/dashboard")} active />
            <NavItem label="Apply Loan" onClick={() => handleNavigate("/user/apply-loan")} />
            <NavItem label="My Loans" onClick={() => handleNavigate("/user/my-loans")} />
            <NavItem label="Repayments" onClick={() => handleNavigate("/user/repayments")} />
            <NavItem label="Transactions" onClick={() => handleNavigate("/user/transactions")} />
            <NavItem label="Profile" onClick={() => handleNavigate("/user/profile")} />
          </nav>
        </div>

        <div className="p-6 text-sm text-gray-400">
          © {new Date().getFullYear()} Finora
        </div>
      </aside>
    </>
  );
};

/* ---------- Nav Item ---------- */

interface NavItemProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: FC<NavItemProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
      ${
        active
          ? "bg-[#1DBF73] text-[#0A2540]"
          : "hover:bg-[#081f35] text-white"
      }`}
  >
    {label}
  </button>
);

export default UserSidebar;

import { type FC, useState } from "react";

const UserSidebar: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0A2540] flex items-center justify-between px-4 py-4">
        <h1 className="text-lg font-bold text-white">Finora</h1>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="text-white focus:outline-none"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-2xl font-bold">Finora</h1>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-3">
              <NavItem active>Dashboard</NavItem>
              <NavItem>My Loans</NavItem>
              <NavItem>Repayments</NavItem>
              <NavItem>Transactions</NavItem>
              <NavItem>Profile</NavItem>
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

          <nav className="space-y-3">
            <NavItem active>Dashboard</NavItem>
            <NavItem>My Loans</NavItem>
            <NavItem>Repayments</NavItem>
            <NavItem>Transactions</NavItem>
            <NavItem>Profile</NavItem>
          </nav>
        </div>

        <div className="p-6 text-sm text-gray-400">
          © {new Date().getFullYear()} Finora
        </div>
      </aside>
    </>
  );
};

/* ---------- Reusable Nav Item ---------- */

interface NavItemProps {
  children: string;
  active?: boolean;
}

const NavItem: FC<NavItemProps> = ({ children, active }) => (
  <a
    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
      ${
        active
          ? "bg-[#1DBF73] text-[#0A2540]"
          : "hover:bg-[#081f35]"
      }`}
  >
    {children}
  </a>
);

export default UserSidebar;

import { type FC } from "react";
import UserSidebar from "../../components/layout/user/UserSideBar";

/* ---------- Interfaces ---------- */

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  accent: string;
}

interface LoanDetailProps {
  label: string;
  value: string;
}

interface TransactionItemProps {
  title: string;
  amount: string;
}

/* ---------- Main Dashboard ---------- */

const UserDashboard: FC = () => {
  return (
    <div className="min-h-screen flex bg-[#F5F7FA]">
      <UserSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 ">

        {/* Header */}
        <div className="flex flex-col mt-14 lg:mt-0  md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#0A2540]">
              Welcome back 👋
            </h2>
            <p className="text-[#1F2937]">
              Track your loans and repayments easily
            </p>
          </div>

          <button className="mt-4 md:mt-0 bg-[#1DBF73] text-[#0A2540] px-6 py-3 rounded-lg font-semibold hover:bg-[#18a864] transition">
            Apply for Loan
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <SummaryCard
            title="Active Loan"
            value="₦750,000"
            subtitle="1 ongoing loan"
            accent="#1DBF73"
          />
          <SummaryCard
            title="Outstanding Balance"
            value="₦430,000"
            subtitle="Remaining to be paid"
            accent="#EF4444"
          />
          <SummaryCard
            title="Next Repayment"
            value="₦50,000"
            subtitle="Due Mar 18, 2026"
            accent="#3B82F6"
          />
        </div>

        {/* Loan Details */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">
            Current Loan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LoanDetail label="Loan Amount" value="₦750,000" />
            <LoanDetail label="Interest Rate" value="12%" />
            <LoanDetail label="Tenure" value="12 months" />
          </div>

          <button className="mt-6 bg-[#0A2540] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#081f35] transition">
            Make Repayment
          </button>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">
            Recent Transactions
          </h3>

          <div className="space-y-4">
            <TransactionItem title="Loan Disbursement" amount="+ ₦750,000" />
            <TransactionItem title="Repayment" amount="- ₦50,000" />
            <TransactionItem title="Repayment" amount="- ₦50,000" />
          </div>
        </div>

      </main>
    </div>
  );
};

/* ---------- Components ---------- */

const SummaryCard: FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  accent,
}) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <h4 className="text-2xl font-bold text-[#0A2540]">{value}</h4>
    <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
    <div
      className="h-1 w-12 mt-4 rounded"
      style={{ backgroundColor: accent }}
    />
  </div>
);

const LoanDetail: FC<LoanDetailProps> = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-[#1F2937]">{value}</p>
  </div>
);

const TransactionItem: FC<TransactionItemProps> = ({ title, amount }) => (
  <div className="flex items-center justify-between border-b pb-3 last:border-none">
    <p className="text-[#1F2937]">{title}</p>
    <p className="font-semibold text-[#1DBF73]">{amount}</p>
  </div>
);

export default UserDashboard;

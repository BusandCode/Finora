import { type FC } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

/* ---------- Interfaces ---------- */
interface LoanProps {
  id: string;
  amount: string;
  tenure: string;
  interest: string;
  status: "Active" | "Completed" | "Pending";
  startDate: string;
  endDate: string;
}

/* ---------- Sample Data ---------- */
const sampleLoans: LoanProps[] = [
  {
    id: "LN001",
    amount: "₦750,000",
    tenure: "12 months",
    interest: "12%",
    status: "Active",
    startDate: "Feb 1, 2026",
    endDate: "Feb 1, 2027",
  },
  {
    id: "LN002",
    amount: "₦500,000",
    tenure: "6 months",
    interest: "10%",
    status: "Completed",
    startDate: "Jan 1, 2025",
    endDate: "Jul 1, 2025",
  },
  {
    id: "LN003",
    amount: "₦300,000",
    tenure: "3 months",
    interest: "8%",
    status: "Pending",
    startDate: "Mar 1, 2026",
    endDate: "Jun 1, 2026",
  },
];

/* ---------- Main Component ---------- */
const MyLoans: FC = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0A2540]">My Loans 💼</h2>
        <p className="text-[#1F2937] mt-1">
          Track all your loans, status, and details
        </p>
      </div>

      {/* Loan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleLoans.map((loan) => (
          <LoanCard key={loan.id} {...loan} />
        ))}
      </div>
    </DashboardLayout>
  );
};

/* ---------- Components ---------- */
interface LoanCardProps extends LoanProps {}

const LoanCard: FC<LoanCardProps> = ({
  amount,
  tenure,
  interest,
  status,
  startDate,
  endDate,
}) => {
  const statusColors: Record<string, string> = {
    Active: "bg-[#1DBF73]/20 text-[#1DBF73]",
    Completed: "bg-blue-100 text-blue-600",
    Pending: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-[#0A2540]">{amount}</h4>
        <p className="text-gray-500 text-sm">Tenure: {tenure}</p>
        <p className="text-gray-500 text-sm">Interest: {interest}</p>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
        >
          {status}
        </span>
        <p className="text-gray-400 text-xs">
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  );
};

export default MyLoans;

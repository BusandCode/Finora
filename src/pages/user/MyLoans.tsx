import { type FC, useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { dataService, type Loan } from "../../services/dataService";

/* ---------- Main Component ---------- */
const MyLoans: FC = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    if (user) {
      setLoans(dataService.getUserLoans(user.id));
    }
  }, [user]);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0A2540]">My Loans </h2>
        <p className="text-[#1F2937] mt-1">
          Track all your loans, status, and details
        </p>
      </div>

      {/* Loan Cards */}
      {loans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan) => (
            <LoanCard key={loan.id} {...loan} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <h3 className="text-lg font-semibold text-[#0A2540] mb-2">No loans found</h3>
          <p className="text-gray-500 max-w-sm">You haven't applied for any loans yet. Navigate to "Apply Loan" to get started.</p>
        </div>
      )}
    </DashboardLayout>
  );
};

/* ---------- Components ---------- */

const LoanCard: FC<Loan> = ({
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
        <h4 className="text-lg font-semibold text-[#0A2540]">₦{amount.toLocaleString()}</h4>
        <p className="text-gray-500 text-sm">Tenure: {tenure} months</p>
        <p className="text-gray-500 text-sm">Interest: {interest}%</p>
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

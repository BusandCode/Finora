import { type FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { dataService, type Loan, type Transaction } from "../../services/dataService";

interface SummaryCardProps { title: string; value: string; subtitle: string; accent: string; }
interface LoanDetailProps { label: string; value: string; }
interface TransactionItemProps { title: string; amount: string; }

const UserDashboard: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [txns, setTxns] = useState<Transaction[]>([]);

  useEffect(() => {
    if (user) {
      setLoans(dataService.getUserLoans(user.id));
      setTxns(dataService.getUserTransactions(user.id));
    }
  }, [user]);

  const activeLoans = loans.filter((l) => l.status === "Active");
  const totalAmount = activeLoans.reduce((sum, l) => sum + l.amount, 0);
  
  // Calculate mock outstanding (principal + 12% flat) for active loans
  const outstandingBalance = activeLoans.reduce((sum, l) => sum + l.amount + l.amount * 0.12, 0);
  const currentLoan = activeLoans.length > 0 ? activeLoans[0] : null;
  const recentTxns = txns.slice(-3).reverse();

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#001a33]">Welcome back, {user?.email ? user.email.split("@")[0] : "User"} 👋</h2>
          <p className="text-[#001a33]">Track your loans and repayments easily</p>
        </div>
        <button 
          onClick={() => navigate("/user/apply-loan")}
          className="mt-4 md:mt-0 bg-[#001a33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d1f34] transition"
        >
          Apply for Loan
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <SummaryCard 
          title="Active Loan" 
          value={`₦${totalAmount.toLocaleString()}`} 
          subtitle={`${activeLoans.length} ongoing loan(s)`} 
          accent="#1DBF73" 
        />
        <SummaryCard 
          title="Outstanding Balance" 
          value={`₦${Math.round(outstandingBalance).toLocaleString()}`} 
          subtitle="Remaining to be paid" 
          accent="#EF4444" 
        />
        <SummaryCard 
          title="Next Repayment" 
          value={currentLoan ? "Pending" : "₦0"} 
          subtitle={currentLoan ? "Check Repayments tab" : "No due dates"} 
          accent="#3B82F6" 
        />
      </div>

      {/* Current Loan */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10">
        <h3 className="text-xl font-semibold text-[#001a33] mb-4">Current Loan</h3>
        {currentLoan ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <LoanDetail label="Loan Amount" value={`₦${currentLoan.amount.toLocaleString()}`} />
              <LoanDetail label="Interest Rate" value={`${currentLoan.interest}%`} />
              <LoanDetail label="Tenure" value={`${currentLoan.tenure} months`} />
            </div>
            <button 
              onClick={() => navigate("/user/repayments")}
              className="mt-6 bg-[#001a33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d1f34] transition"
            >
              Make Repayment
            </button>
          </>
        ) : (
          <div className="flex flex-col flex-1 items-center justify-center p-8 text-center bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
            <p className="text-gray-500 mb-4">You don't have any active loans yet.</p>
            <button 
              onClick={() => navigate("/user/apply-loan")}
              className="mt-4 md:mt-0 bg-[#001a33] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#0d1f34] transition"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold text-[#001a33] mb-4">Recent Transactions</h3>
        {recentTxns.length > 0 ? (
          <div className="space-y-4">
            {recentTxns.map((txn) => (
              <TransactionItem 
                key={txn.id}
                title={txn.type} 
                amount={`${txn.type === "Loan Disbursement" ? "+" : "-"} ₦${txn.amount.toLocaleString()}`} 
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">No recent transactions to display.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

/* ---------- Components ---------- */
const SummaryCard: FC<SummaryCardProps> = ({ title, value, subtitle, accent }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <h4 className="text-2xl font-bold text-[#001a33]">{value}</h4>
    <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
    <div className="h-1 w-12 mt-4 rounded" style={{ backgroundColor: accent }} />
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
    <p className="font-semibold text-[#001a33]">{amount}</p>
  </div>
);

export default UserDashboard;

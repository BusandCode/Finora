import { type FC, useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { dataService, type Transaction } from "../../services/dataService";

const Transactions: FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (user) {
      setTransactions(dataService.getUserTransactions(user.id));
    }
  }, [user]);

  const totalDisbursed = transactions
    .filter((t) => t.type === "Loan Disbursement" && t.status === "Successful")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRepaid = transactions
    .filter((t) => t.type === "Repayment" && t.status === "Successful")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFailed = transactions
    .filter((t) => t.status === "Failed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#001a33]">
            Transactions
          </h1>
          <p className="text-gray-500 text-sm">
            View all your financial activities
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard title="Total Disbursed" value={`₦${totalDisbursed.toLocaleString()}`} />
          <SummaryCard title="Total Repaid" value={`₦${totalRepaid.toLocaleString()}`} highlight />
          <SummaryCard title="Failed Transactions" value={`₦${totalFailed.toLocaleString()}`} danger />
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-4 border-b">
            <h2 className="font-semibold text-[#001a33]">
              Transaction History
            </h2>
          </div>

          <div className="overflow-x-auto">
            {transactions.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Reference</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        {txn.reference}
                      </td>
                      <td className="px-4 py-3">{txn.type}</td>
                      <td className="px-4 py-3">
                        ₦{txn.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{txn.date}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={txn.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No transactions recorded yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

/* ---------- Components ---------- */

const SummaryCard: FC<{
  title: string;
  value: string;
  highlight?: boolean;
  danger?: boolean;
}> = ({ title, value, highlight, danger }) => (
  <div
    className={`rounded-xl p-5 border shadow-sm bg-white ${
      highlight
        ? "border-[#001a33]/30"
        : danger
        ? "border-red-500/30"
        : "border-gray-100"
    }`}
  >
    <p className="text-sm text-gray-500">{title}</p>
    <h3
      className={`text-xl font-bold mt-1 ${
        highlight
          ? "text-[#001a33]"
          : danger
          ? "text-red-600"
          : "text-[#001a33]"
      }`}
    >
      {value}
    </h3>
  </div>
);

const StatusBadge: FC<{ status: Transaction["status"] }> = ({ status }) => {
  const base = "px-3 py-1 rounded-full text-xs font-medium";

  if (status === "Successful")
    return (
      <span className={`${base} bg-[#001a33]/20 text-[#001a33]`}>
        Successful
      </span>
    );

  if (status === "Pending")
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700`}>
        Pending
      </span>
    );

  return (
    <span className={`${base} bg-red-100 text-red-600`}>
        Failed
    </span>
  );
};

export default Transactions;

import { type FC } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface Transaction {
  id: string;
  reference: string;
  type: "Loan Disbursement" | "Repayment";
  amount: number;
  date: string;
  status: "Successful" | "Pending" | "Failed";
}

const transactions: Transaction[] = [
  {
    id: "1",
    reference: "TXN-872311",
    type: "Loan Disbursement",
    amount: 150000,
    date: "2026-01-05",
    status: "Successful",
  },
  {
    id: "2",
    reference: "TXN-872988",
    type: "Repayment",
    amount: 25000,
    date: "2026-02-10",
    status: "Pending",
  },
  {
    id: "3",
    reference: "TXN-871102",
    type: "Repayment",
    amount: 20000,
    date: "2025-12-20",
    status: "Failed",
  },
];

const Transactions: FC = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]">
            Transactions
          </h1>
          <p className="text-gray-500 text-sm">
            View all your financial activities
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard title="Total Disbursed" value="₦150,000" />
          <SummaryCard title="Total Repaid" value="₦45,000" highlight />
          <SummaryCard title="Failed Transactions" value="₦20,000" danger />
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-4 border-b">
            <h2 className="font-semibold text-[#0A2540]">
              Transaction History
            </h2>
          </div>

          <div className="overflow-x-auto">
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
        ? "border-[#1DBF73]/30"
        : danger
        ? "border-red-500/30"
        : "border-gray-100"
    }`}
  >
    <p className="text-sm text-gray-500">{title}</p>
    <h3
      className={`text-xl font-bold mt-1 ${
        highlight
          ? "text-[#1DBF73]"
          : danger
          ? "text-red-600"
          : "text-[#0A2540]"
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
      <span className={`${base} bg-[#1DBF73]/20 text-[#1DBF73]`}>
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

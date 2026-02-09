import { type FC } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface Repayment {
  id: string;
  loanId: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
}

const repayments: Repayment[] = [
  {
    id: "1",
    loanId: "LN-10234",
    amount: 25000,
    dueDate: "2026-02-10",
    status: "Pending",
  },
  {
    id: "2",
    loanId: "LN-10012",
    amount: 15000,
    dueDate: "2026-01-15",
    status: "Paid",
  },
  {
    id: "3",
    loanId: "LN-09901",
    amount: 20000,
    dueDate: "2025-12-20",
    status: "Overdue",
  },
];

const Repayments: FC = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]">Repayments</h1>
          <p className="text-gray-500 text-sm">
            Track and manage your loan repayments
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SummaryCard title="Total Paid" value="₦40,000" />
          <SummaryCard title="Pending Amount" value="₦25,000" highlight />
          <SummaryCard title="Overdue" value="₦20,000" danger />
        </div>

        {/* Repayments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-4 border-b">
            <h2 className="font-semibold text-[#0A2540]">
              Repayment Schedule
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">Loan ID</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Due Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {repayments.map((repayment) => (
                  <tr key={repayment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {repayment.loanId}
                    </td>
                    <td className="px-4 py-3">
                      ₦{repayment.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{repayment.dueDate}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={repayment.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      {repayment.status === "Pending" && (
                        <button className="px-4 py-2 text-sm rounded-lg bg-[#1DBF73] text-[#0A2540] font-medium hover:opacity-90 transition">
                          Pay Now
                        </button>
                      )}
                      {repayment.status === "Paid" && (
                        <span className="text-gray-400 text-xs">Completed</span>
                      )}
                      {repayment.status === "Overdue" && (
                        <button className="px-4 py-2 text-sm rounded-lg bg-red-500/10 text-red-600 font-medium hover:bg-red-500/20 transition">
                          Pay Overdue
                        </button>
                      )}
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

const StatusBadge: FC<{ status: Repayment["status"] }> = ({ status }) => {
  const base = "px-3 py-1 rounded-full text-xs font-medium";

  if (status === "Paid")
    return (
      <span className={`${base} bg-[#1DBF73]/20 text-[#1DBF73]`}>
        Paid
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
      Overdue
    </span>
  );
};

export default Repayments;

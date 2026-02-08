import { type FC, useState } from "react";
import UserSidebar from "../../components/layout/user/UserSideBar";

const ApplyLoan: FC = () => {
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [purpose, setPurpose] = useState("");

  return (
    <div className="min-h-screen flex bg-[#F5F7FA]">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#0A2540]">
              Apply for a Loan 💰
            </h2>
            <p className="text-[#1F2937] mt-1">
              Fill out the form below to request a new loan
            </p>
          </div>
        </div>

        {/* Loan Form */}
        <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1F2937] mb-2">
              Loan Amount (₦)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1DBF73] focus:ring-1 focus:ring-[#1DBF73] outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1F2937] mb-2">
              Tenure (Months)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter loan tenure"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1DBF73] focus:ring-1 focus:ring-[#1DBF73] outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1F2937] mb-2">
              Purpose
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter purpose of loan"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1DBF73] focus:ring-1 focus:ring-[#1DBF73] outline-none transition resize-none"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-4 bg-[#1DBF73] text-[#0A2540] font-semibold rounded-xl shadow hover:bg-[#18a864] transition"
          >
            Submit Application
          </button>
        </div>

        {/* Loan Summary Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto">
          <SummaryCard title="Loan Amount" value={amount || "₦0"} accent="#1DBF73" />
          <SummaryCard title="Tenure" value={tenure ? `${tenure} months` : "-"} accent="#3B82F6" />
          <SummaryCard title="Interest Rate" value="12%" accent="#EF4444" />
        </div>
      </main>
    </div>
  );
};

/* ---------- Components ---------- */

interface SummaryCardProps {
  title: string;
  value: string;
  accent: string;
}

const SummaryCard: FC<SummaryCardProps> = ({ title, value, accent }) => (
  <div className="bg-white rounded-2xl shadow p-6 text-center">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <h4 className="text-2xl font-bold text-[#0A2540]">{value}</h4>
    <div className="h-1 w-12 mt-4 rounded mx-auto" style={{ backgroundColor: accent }} />
  </div>
);

export default ApplyLoan;

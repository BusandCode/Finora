import { type FC, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { dataService } from "../../services/dataService";

const ApplyLoan: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !amount || !tenure || !purpose) return;

    setIsSubmitting(true);
    try {
      await dataService.applyForLoan(
        user.id,
        Number(amount),
        Number(tenure),
        purpose
      );
      navigate("/user/dashboard");
    } catch (err) {
      console.error("Failed to apply for loan", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col max-w-2xl mx-auto md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#001a33]">Apply for a Loan 💰</h2>
          <p className="text-[#001a33] mt-1">Fill out the form below to request a new loan</p>
        </div>
      </div>

      {/* Loan Form */}
      <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#001a33] mb-2">Loan Amount (₦)</label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1DBF73] focus:ring-1 focus:ring-[#1DBF73] outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Tenure (Months)</label>
            <input
              type="number"
              required
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter loan tenure"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1DBF73] focus:ring-1 focus:ring-[#1DBF73] outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Purpose</label>
            <textarea
              required
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter purpose of loan"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1DBF73] focus:ring-1 focus:ring-[#1DBF73] outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-4 py-4 rounded-xl shadow transition font-semibold ${
              isSubmitting ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#001a33] text-white hover:bg-[#0d1f34]"
            }`}
          >
            {isSubmitting ? "Processing..." : "Submit Application"}
          </button>
        </form>
      </div>

      {/* Loan Summary Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto">
        <SummaryCard title="Loan Amount" value={`₦${amount ? Number(amount).toLocaleString() : "0"}`} accent="#001a33" />
        <SummaryCard title="Tenure" value={tenure ? `${tenure} months` : "-"} accent="#3B82F6" />
        <SummaryCard title="Interest Rate" value="12%" accent="#EF4444" />
      </div>
    </DashboardLayout>
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
    <h4 className="text-2xl font-bold text-[#001a33]">{value}</h4>
    <div className="h-1 w-12 mt-4 rounded mx-auto" style={{ backgroundColor: accent }} />
  </div>
);

export default ApplyLoan;

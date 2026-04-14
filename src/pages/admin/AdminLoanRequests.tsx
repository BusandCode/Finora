import { type FC, useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { dataService, type Loan } from "../../services/dataService";
import { authService } from "../../services/authService";

const AdminLoanRequests: FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchState = () => {
    setLoans(dataService.getAllLoans().filter((l) => l.status === "Pending").reverse());
    setUsers(authService.getAllUsers());
  };

  useEffect(() => {
    fetchState();
  }, []);

  const handleApprove = async (loanId: string) => {
    setProcessing(loanId);
    try {
      await dataService.approveLoan(loanId);
      fetchState();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (loanId: string) => {
    setProcessing(loanId);
    try {
      await dataService.rejectLoan(loanId);
      fetchState();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(null);
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]">Loan Application Queue</h1>
          <p className="text-gray-500 text-sm">Review, approve, or reject incoming user requests</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-[#0A2540]">Pending Requests ({loans.length})</h2>
          </div>

          <div className="overflow-x-auto">
            {loans.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Applicant</th>
                    <th className="px-4 py-3 text-left">Purpose</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Tenure</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y relative">
                  {loans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">{loan.startDate}</td>
                      <td className="px-4 py-3 font-semibold text-[#0A2540]">{getUserName(loan.userId)}</td>
                      <td className="px-4 py-3">{loan.purpose || "General"}</td>
                      <td className="px-4 py-3 font-bold text-[#1DBF73]">₦{loan.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">{loan.tenure} mos</td>
                      <td className="px-4 py-3 flex gap-2 justify-center">
                        <button
                          onClick={() => handleApprove(loan.id)}
                          disabled={processing === loan.id}
                          className="px-3 py-1.5 flex-1 bg-[#1DBF73] text-white rounded font-medium hover:bg-[#18a864] transition disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(loan.id)}
                          disabled={processing === loan.id}
                          className="px-3 py-1.5 flex-1 bg-red-100 text-red-600 rounded font-medium hover:bg-red-200 transition disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-lg font-semibold text-[#0A2540] mb-2">Inbox Zero!</h3>
                <p className="text-gray-500 max-w-sm mx-auto">There are no pending loan applications at the moment. You're all caught up.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLoanRequests;

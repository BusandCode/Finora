import { type FC, useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { dataService, type Loan } from "../../services/dataService";
import { authService } from "../../services/authService";

const AdminDashboard: FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch global admin data
    setLoans(dataService.getAllLoans());
    setUserCount(authService.getAllUsers().filter((u) => u.role !== "admin").length);
  }, []);

  const totalPending = loans.filter((l) => l.status === "Pending").length;
  const activeLoans = loans.filter((l) => l.status === "Active");
  const totalVolume = activeLoans.reduce((sum, l) => sum + l.amount, 0);

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#001a33]">Admin Overview</h2>
          <p className="text-[#001a33]">System activity and loan metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-yellow-400">
          <p className="text-sm text-gray-500 mb-1">Pending Requests</p>
          <h4 className="text-3xl font-bold text-[#001a33]">{totalPending}</h4>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 mb-1">Registered Users</p>
          <h4 className="text-3xl font-bold text-[#001a33]">{userCount}</h4>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-[#001a33]">
          <p className="text-sm text-gray-500 mb-1">Total Disbursed Volume</p>
          <h4 className="text-3xl font-bold text-[#001a33]">₦{totalVolume.toLocaleString()}</h4>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold text-[#001a33] mb-4">Recent Portfolio Activity</h3>
        {activeLoans.length > 0 ? (
          <div className="space-y-4">
            {activeLoans.slice(-5).reverse().map((loan) => (
              <div key={loan.id} className="flex justify-between items-center pb-3 border-b last:border-0 hover:bg-gray-50 p-2 rounded">
                <div>
                  <p className="font-semibold text-[#001a33]">{loan.id}</p>
                  <p className="text-xs text-gray-500">Tenure: {loan.tenure} months</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#001a33]">₦{loan.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{loan.startDate}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">No active disbursed loans yet.</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

import { type FC, useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { authService } from "../../services/authService";
import { dataService, type Loan } from "../../services/dataService";

const AdminUsers: FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    setUsers(authService.getAllUsers().filter((u) => u.role !== "admin"));
    setLoans(dataService.getAllLoans());
  }, []);

  const getUserLoanStats = (userId: string) => {
    const userLoans = loans.filter((l) => l.userId === userId);
    return {
      total: userLoans.length,
      active: userLoans.filter((l) => l.status === "Active").length,
      volume: userLoans.filter((l) => l.status === "Active" || l.status === "Completed").reduce((sum, l) => sum + l.amount, 0),
    };
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]">Registered Customers</h1>
          <p className="text-gray-500 text-sm">View all platform users and their aggregate activity</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-[#0A2540]">Active Consumers ({users.length})</h2>
          </div>

          <div className="overflow-x-auto">
            {users.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email Address</th>
                    <th className="px-4 py-3 text-center">Total Apps</th>
                    <th className="px-4 py-3 text-center">Active Loans</th>
                    <th className="px-4 py-3 text-right">Funded Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y relative">
                  {users.map((user) => {
                    const stats = getUserLoanStats(user.id);
                    return (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-xs text-gray-400 font-mono">{user.id}</td>
                        <td className="px-4 py-3 font-semibold text-[#0A2540]">{user.name || "N/A"}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3 text-center font-medium">{stats.total}</td>
                        <td className="px-4 py-3 text-center">
                          {stats.active > 0 ? (
                            <span className="px-2 py-1 bg-[#1DBF73]/20 text-[#1DBF73] rounded-full text-xs font-bold">{stats.active}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-[#0A2540]">
                          ₦{stats.volume.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">No registered users found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;

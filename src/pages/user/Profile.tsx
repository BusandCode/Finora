import { type FC, useState, type ChangeEvent, type FormEvent } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const Profile: FC = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "John Doe",
    email: "johndoe@email.com",
    phone: "+234 801 234 5678",
    address: "Lagos, Nigeria",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-2 sm:px-4 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]">Profile</h1>
          <p className="text-gray-500 text-sm">
            Manage your personal information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73] font-bold text-xl">
              JD
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0A2540]">
                {formData.fullName}
              </h2>
              <p className="text-sm text-gray-500">{formData.email}</p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1DBF73]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1DBF73]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1DBF73]/40"
              />
            </div>

            {/* Action */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#1DBF73] text-[#0A2540] font-semibold hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

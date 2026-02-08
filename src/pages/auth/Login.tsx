import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ArrowRight, Sparkles, ShieldCheck, Clock, TrendingUp } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, children }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-[#1DBF73]">{icon}</div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-white/70 text-sm mt-1">{children}</p>
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    // 🔴 Replace this with real API call later
    const response = {
      user: {
        id: "1",
        email: "user@finora.com",
        role: "user" as const,
      },
      token: "mock-jwt-token",
    };

    // Save auth globally
    login(response);

    // Redirect to dashboard
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] relative overflow-hidden font-['Outfit',sans-serif]">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-125 h-125 rounded-full blur-[90px] opacity-15 bg-linear-to-br from-[#0A2540] to-[#1DBF73] -top-32 -left-32 animate-float"></div>
        <div className="absolute w-105 h-105 rounded-full blur-[90px] opacity-15 bg-linear-to-br from-[#3B82F6] to-[#1DBF73] bottom-0 right-0 animate-float-delayed"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between w-1/2 bg-linear-to-br from-[#0A2540] to-[#0d3556] px-16 py-14 text-white">

          <div>
            <div className="flex items-center gap-4 mb-14">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#1DBF73] to-[#17a865] flex items-center justify-center shadow-lg animate-pulse-soft">
                <Sparkles size={28} />
              </div>
              <h1 className="font-['DM_Serif_Display',serif] text-5xl">
                Finora
              </h1>
            </div>

            <h2 className="text-4xl font-semibold mb-4">
              Smarter Loans.<br />Better Decisions.
            </h2>

            <p className="text-white/70 mb-12 max-w-md">
              Access flexible loans, transparent terms, and instant approvals designed for your financial growth.
            </p>

            <div className="space-y-6">
              <Feature icon={<TrendingUp />} title="Fast Approvals">
                Get loan decisions in minutes, not days.
              </Feature>
              <Feature icon={<ShieldCheck />} title="Secure & Encrypted">
                Bank-grade security protects your data.
              </Feature>
              <Feature icon={<Clock />} title="Flexible Repayment">
                Plans that adapt to your income.
              </Feature>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-sm text-white/60">
            Trusted by <span className="text-[#1DBF73] font-semibold">150,000+</span> customers • Rated 4.9★
          </div>
        </aside>

        {/* Login Form */}
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-lg">

            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-[#0A2540]">
                Welcome Back
              </h3>
              <p className="text-slate-500">
                Sign in to continue with Finora
              </p>
            </div>

            <form className="space-y-5">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-[#F5F7FA] rounded-xl focus:border-[#1DBF73] outline-none"
              />

              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-[#F5F7FA] rounded-xl focus:border-[#1DBF73] outline-none"
                />
                <Eye size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              <div className="flex justify-between text-sm">
                <span
                  onClick={handleForgotPassword}
                  className="text-[#3B82F6] cursor-pointer hover:underline"
                >
                  Forgot password?
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                className="w-full py-3.5 text-white font-semibold rounded-xl bg-linear-to-br from-[#1DBF73] to-[#17a865] flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="text-center text-sm text-slate-500 mt-8">
              Don’t have an account?{" "}
              <span
                onClick={handleSignUp}
                className="text-[#1DBF73] font-semibold cursor-pointer hover:underline"
              >
                Sign up for free
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;

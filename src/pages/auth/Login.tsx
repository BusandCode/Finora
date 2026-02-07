import React from 'react';
import { Eye, ArrowRight, Sparkles, ShieldCheck, Clock, TrendingUp } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}
const Feature: React.FC<FeatureProps> = ({ icon, title, children }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-[#1DBF73]">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-white/70 text-sm mt-1">{children}</p>
      </div>
    </div>
  );
};
const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] relative overflow-hidden font-['Outfit',sans-serif]">

      {/* Floating Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[90px] opacity-15 bg-gradient-to-br from-[#0A2540] to-[#1DBF73] -top-32 -left-32 animate-float"></div>
        <div className="absolute w-[420px] h-[420px] rounded-full blur-[90px] opacity-15 bg-gradient-to-br from-[#3B82F6] to-[#1DBF73] bottom-0 right-0 animate-float-delayed"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#0A2540] to-[#0d3556] px-16 py-14 text-white">

          {/* Top */}
          <div>
            <div className="flex items-center gap-4 mb-14">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1DBF73] to-[#17a865] flex items-center justify-center shadow-lg animate-pulse-soft">
                <Sparkles size={28} />
              </div>
              <h1 className="font-['DM_Serif_Display',serif] text-5xl tracking-tight">
                Finora
              </h1>
            </div>

            <h2 className="text-4xl font-semibold leading-tight mb-4">
              Smarter Loans.<br />Better Decisions.
            </h2>
            <p className="text-white/70 max-w-md mb-12">
              Access flexible loans, transparent terms, and instant approvals designed
              for your financial growth.
            </p>

            {/* Features */}
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

          {/* Bottom */}
          <div className="border-t border-white/10 pt-6 text-sm text-white/60">
            Trusted by <span className="text-[#1DBF73] font-semibold">150,000+</span> customers • Rated 4.9★
          </div>
        </aside>

        {/* Login Section */}
        <main className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">

            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-[#0A2540] mb-1">
                Welcome Back
              </h3>
              <p className="text-slate-500">
                Sign in to continue with Finora
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-[#F5F7FA] rounded-xl border-2 border-transparent focus:border-[#1DBF73] focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-[#F5F7FA] rounded-xl border-2 border-transparent focus:border-[#1DBF73] focus:bg-white outline-none transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Eye size={18} />
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <label className="flex items-center gap-2 text-[#1F2937]">
                  <input type="checkbox" className="accent-[#1DBF73]" />
                  Remember me
                </label>
                <span className="text-[#3B82F6] cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>

              <button
                type="button"
                className="w-full py-3.5 text-white font-semibold rounded-xl bg-gradient-to-br from-[#1DBF73] to-[#17a865] hover:-translate-y-0.5 transition flex items-center justify-center gap-2 shadow"
              >
                Sign In
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8 text-center">
              <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200"></div>
              <span className="relative bg-white px-4 text-sm text-slate-500">
                or continue with
              </span>
            </div>

            {/* Google UI */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-slate-200 rounded-xl font-medium hover:border-[#1DBF73] hover:bg-[#f8fffe] transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.3-1.5 3.8-5.1 3.8-3.1 0-5.6-2.6-5.6-5.6S8.9 6.4 12 6.4c1.8 0 3 .7 3.7 1.3l2.5-2.4C16.7 3.8 14.6 3 12 3 7.6 3 4 6.6 4 12s3.6 9 8 9c4.6 0 7.6-3.2 7.6-7.7 0-.5-.1-.9-.1-1.1H12z"/>
              </svg>
              Continue with Google
            </button>

            <div className="text-center text-sm text-slate-500 mt-8">
              Don’t have an account?{' '}
              <span className="text-[#1DBF73] font-semibold cursor-pointer hover:underline">
                Sign up for free
              </span>
            </div>
          </div>
        </main>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(60px,-60px); }
        }
        @keyframes pulse-soft {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-float { animation: float 20s infinite ease-in-out; }
        .animate-float-delayed { animation: float 20s infinite ease-in-out -8s; }
        .animate-pulse-soft { animation: pulse-soft 2s infinite; }
      `}</style>
    </div>
  );
};

export default Login;

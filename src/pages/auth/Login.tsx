import React, { useState, type FormEvent } from 'react';
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', { email, password });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] relative overflow-hidden font-['Outfit',sans-serif]">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-125 h-125 rounded-full blur-[80px] opacity-15 bg-linear-to-br from-[#0A2540] to-[#1DBF73] -top-[10%] -left-[10%] animate-float"></div>
        <div className="absolute w-100 h-100 rounded-full blur-[80px] opacity-15 bg-linear-to-br from-[#3B82F6] to-[#1DBF73] -bottom-[5%] -right-[5%] animate-float-delayed-7"></div>
        <div className="absolute w-87.5 h-87.5 rounded-full blur-[80px] opacity-15 bg-linear-to-br from-[#1DBF73] to-[#0A2540] top-[40%] left-[50%] animate-float-delayed-14"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-1 bg-linear-to-br from-[#0A2540] to-[#0d3556] p-16 items-center justify-center relative overflow-hidden">
          {/* Radial linear overlays */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-linear(circle_at_20%_80%,rgba(29,191,115,0.1)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-linear(circle_at_80%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
          </div>

          <div className="relative z-10 max-w-125 animate-slide-in-left">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-linear-to-br from-[#1DBF73] to-[#17a865] rounded-2xl flex items-center justify-center text-white shadow-[0_8px_24px_rgba(29,191,115,0.3)] animate-pulse-soft">
                <Sparkles size={32} strokeWidth={2} />
              </div>
              <h1 className="font-['DM_Serif_Display',serif] text-5xl font-normal text-white tracking-tight">
                Finora
              </h1>
            </div>

            {/* Tagline */}
            <div className="mb-12">
              <h2 className="text-5xl font-semibold text-white leading-tight mb-4 tracking-tight">
                Your Financial Journey,<br />Simplified
              </h2>
              <p className="text-lg text-white/70 leading-relaxed font-light">
                Smart loans for smart decisions. Get approved in minutes, not days.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/12 hover:-translate-y-1 hover:border-[#1DBF73]/30">
                <div className="text-3xl font-bold text-[#1DBF73] mb-2 tracking-tight">$2.4B+</div>
                <div className="text-sm text-white/60">Loans Disbursed</div>
              </div>
              <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/12 hover:-translate-y-1 hover:border-[#1DBF73]/30">
                <div className="text-3xl font-bold text-[#1DBF73] mb-2 tracking-tight">150K+</div>
                <div className="text-sm text-white/60">Happy Customers</div>
              </div>
              <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/12 hover:-translate-y-1 hover:border-[#1DBF73]/30">
                <div className="text-3xl font-bold text-[#1DBF73] mb-2 tracking-tight">4.9★</div>
                <div className="text-sm text-white/60">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-[#F5F7FA]">
          <div className="w-full max-w-115 bg-white rounded-3xl p-12 shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.04)] animate-slide-in-right">
            {/* Form Header */}
            <div className="mb-10 text-center">
              <h3 className="text-4xl font-semibold text-[#0A2540] mb-2 tracking-tight">
                Welcome Back
              </h3>
              <p className="text-base text-slate-500">
                Continue your financial journey with Finora
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mb-8">
              {/* Email Field */}
              <div className="mb-6">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-[#1F2937] mb-2 transition-colors duration-200 group-focus-within:text-[#1DBF73]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3.5 text-base text-[#1F2937] bg-[#F5F7FA] border-2 border-transparent rounded-xl transition-all duration-300 outline-none focus:bg-white focus:border-[#1DBF73] focus:shadow-[0_0_0_4px_rgba(29,191,115,0.1)] placeholder:text-slate-400"
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-[#1F2937] mb-2 transition-colors duration-200"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3.5 text-base text-[#1F2937] bg-[#F5F7FA] border-2 border-transparent rounded-xl transition-all duration-300 outline-none focus:bg-white focus:border-[#1DBF73] focus:shadow-[0_0_0_4px_rgba(29,191,115,0.1)] placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 p-1 flex items-center justify-center transition-colors duration-200 hover:text-[#1DBF73]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Form Options */}
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-[#1F2937]">
                  <input 
                    type="checkbox" 
                    className="w-4.5 h-4.5 cursor-pointer accent-[#1DBF73]"
                  />
                  <span>Remember me</span>
                </label>
                <a 
                  href="#forgot" 
                  className="text-sm text-[#3B82F6] font-medium transition-colors duration-200 hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-4 text-base font-semibold text-white bg-linear-to-br from-[#1DBF73] to-[#17a865] border-none rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_12px_rgba(29,191,115,0.2)] hover:shadow-[0_8px_20px_rgba(29,191,115,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative text-center my-8">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200"></div>
              <span className="relative bg-white px-4 text-sm text-slate-500">
                or continue with
              </span>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                type="button"
                className="px-4 py-3.5 text-[15px] font-medium text-[#1F2937] bg-white border-2 border-slate-200 rounded-xl cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300 hover:border-[#1DBF73] hover:bg-[#f8fffe] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button 
                type="button"
                className="px-4 py-3.5 text-[15px] font-medium text-[#1F2937] bg-white border-2 border-slate-200 rounded-xl cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300 hover:border-[#1DBF73] hover:bg-[#f8fffe] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Signup Prompt */}
            <div className="text-center text-[15px] text-slate-500">
              Don't have an account?{' '}
              <a 
                href="#signup" 
                className="text-[#1DBF73] font-semibold transition-colors duration-200 hover:text-[#17a865]"
              >
                Sign up for free
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(100px, -100px) scale(1.1);
          }
          66% {
            transform: translate(-50px, 50px) scale(0.9);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-soft {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 8px 24px rgba(29, 191, 115, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 12px 32px rgba(29, 191, 115, 0.4);
          }
        }

        .animate-float {
          animation: float 20s infinite ease-in-out;
        }

        .animate-float-delayed-7 {
          animation: float 20s infinite ease-in-out;
          animation-delay: -7s;
        }

        .animate-float-delayed-14 {
          animation: float 20s infinite ease-in-out;
          animation-delay: -14s;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
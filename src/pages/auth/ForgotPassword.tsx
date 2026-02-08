import React, { useState, type FormEvent } from 'react';
import { ArrowLeft, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

type FormState = 'input' | 'sending' | 'success' | 'error';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [formState, setFormState] = useState<FormState>('input');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormState('sending');
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      // Simulate random success/error for demo
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        setFormState('success');
      } else {
        setFormState('error');
        setErrorMessage('No account found with this email address. Please check and try again.');
      }
    }, 2000);
  };

  const handleBackToLogin = () => {
    window.location.href = '#login'; // Replace with your router navigation
  };

  const handleTryAgain = () => {
    setFormState('input');
    setErrorMessage('');
  };

  return (
    <div className="h-screen bg-finora-light relative overflow-hidden font-outfit">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-125 h-125 rounded-full blur-[80px] opacity-15 bg-linear-to-br from-finora-navy to-finora-emerald -top-[10%] -left-[10%] animate-float"></div>
        <div className="absolute w-100 h-100 rounded-full blur-[80px] opacity-15 bg-linear-to-br from-finora-accent to-finora-emerald -bottom-[5%] -right-[5%] animate-float-delayed-7"></div>
        <div className="absolute w-87.5 h-87.5 rounded-full blur-[80px] opacity-15 bg-linear-to-br from-finora-emerald to-finora-navy top-[40%] left-[50%] animate-float-delayed-14"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-120 bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.04)] animate-slide-in-right my-auto">
          
          {/* Back Button */}
          <button
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-finora-dark hover:text-finora-emerald transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">Back to login</span>
          </button>

          {/* Input State */}
          {(formState === 'input' || formState === 'sending') && (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="w-16 h-16 bg-finora-emerald/10 rounded-2xl flex items-center justify-center mb-6">
                  <Mail size={32} className="text-finora-emerald" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold text-finora-navy mb-3 tracking-tight">
                  Forgot Password?
                </h1>
                <p className="text-base text-slate-600 leading-relaxed">
                  No worries! Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              {/* Error Alert */}
              {formState === 'input' && errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-slide-in-right">
                  <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-finora-dark mb-2"
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
                    disabled={formState === 'sending'}
                    className="w-full px-4 py-3.5 text-base text-finora-dark bg-finora-light border-2 border-transparent rounded-xl transition-all duration-300 outline-none focus:bg-white focus:border-finora-emerald focus:shadow-[0_0_0_4px_rgba(29,191,115,0.1)] placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full px-4 py-4 text-base font-semibold text-white bg-linear-to-br from-finora-emerald to-[#17a865] border-none rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_12px_rgba(29,191,115,0.2)] hover:shadow-[0_8px_20px_rgba(29,191,115,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {formState === 'sending' ? (
                    <>
                      <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <Mail size={20} />
                    </>
                  )}
                </button>
              </form>

              {/* Help Text */}
              <div className="mt-8 p-4 bg-finora-light rounded-xl">
                <p className="text-sm text-slate-600 text-center">
                  Remember your password?{' '}
                  <button 
                    onClick={handleBackToLogin}
                    className="text-finora-emerald font-semibold hover:text-[#17a865] transition-colors duration-200"
                  >
                    Sign in instead
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Success State */}
          {formState === 'success' && (
            <>
              {/* Success Icon */}
              <div className="text-center mb-8 animate-slide-in-right">
                <div className="w-20 h-20 bg-finora-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
                  <CheckCircle2 size={40} className="text-finora-emerald" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold text-finora-navy mb-3 tracking-tight">
                  Check Your Email
                </h1>
                <p className="text-base text-slate-600 leading-relaxed">
                  We've sent password reset instructions to
                </p>
                <p className="text-base font-semibold text-finora-navy mt-2">
                  {email}
                </p>
              </div>

              {/* Instructions */}
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-finora-light rounded-xl">
                  <h3 className="text-sm font-semibold text-finora-dark mb-2">
                    📧 What's next?
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-finora-emerald mt-1">•</span>
                      <span>Check your inbox for an email from Finora</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-finora-emerald mt-1">•</span>
                      <span>Click the reset link (valid for 1 hour)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-finora-emerald mt-1">•</span>
                      <span>Create a new strong password</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">Didn't receive it?</span> Check your spam folder or{' '}
                    <button 
                      onClick={handleTryAgain}
                      className="font-semibold underline hover:text-amber-900 transition-colors duration-200"
                    >
                      try again
                    </button>
                  </p>
                </div>
              </div>

              {/* Back to Login */}
              <button
                onClick={handleBackToLogin}
                className="w-full px-4 py-4 text-base font-semibold text-finora-navy bg-finora-light border-2 border-finora-light rounded-xl transition-all duration-300 hover:border-finora-emerald hover:bg-white hover:shadow-md"
              >
                Back to Login
              </button>
            </>
          )}

          {/* Error State */}
          {formState === 'error' && (
            <>
              {/* Error Icon */}
              <div className="text-center mb-8 animate-slide-in-right">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={40} className="text-red-600" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold text-finora-navy mb-3 tracking-tight">
                  Email Not Found
                </h1>
                <p className="text-base text-slate-600 leading-relaxed">
                  We couldn't find an account associated with{' '}
                  <span className="font-semibold text-finora-navy">{email}</span>
                </p>
              </div>

              {/* Suggestions */}
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-finora-light rounded-xl">
                  <h3 className="text-sm font-semibold text-finora-dark mb-3">
                    Try these steps:
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-finora-accent mt-1">•</span>
                      <span>Double-check your email for typos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-finora-accent mt-1">•</span>
                      <span>Try a different email address you might have used</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-finora-accent mt-1">•</span>
                      <span>Make sure you have an account with Finora</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleTryAgain}
                  className="w-full px-4 py-4 text-base font-semibold text-white bg-linear-to-br from-finora-emerald to-[#17a865] border-none rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_12px_rgba(29,191,115,0.2)] hover:shadow-[0_8px_20px_rgba(29,191,115,0.3)] hover:-translate-y-0.5"
                >
                  Try Another Email
                </button>
                
                <button
                  onClick={handleBackToLogin}
                  className="w-full px-4 py-4 text-base font-semibold text-finora-navy bg-finora-light border-2 border-finora-light rounded-xl transition-all duration-300 hover:border-finora-emerald hover:bg-white hover:shadow-md"
                >
                  Back to Login
                </button>
              </div>

              {/* Sign Up Prompt */}
              <div className="mt-6 p-4 bg-finora-light rounded-xl">
                <p className="text-sm text-slate-600 text-center">
                  Don't have an account?{' '}
                  <a 
                    href="#signup"
                    className="text-finora-emerald font-semibold hover:text-[#17a865] transition-colors duration-200"
                  >
                    Sign up for free
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
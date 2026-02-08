import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <header className="fixed w-full z-50 bg-white shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-[#0A2540]">Finora</h1>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#features" className="text-[#0A2540] hover:text-[#1DBF73] transition">Features</a>
            <a href="#how-it-works" className="text-[#0A2540] hover:text-[#1DBF73] transition">How It Works</a>
            <a href="#testimonials" className="text-[#0A2540] hover:text-[#1DBF73] transition">Reviews</a>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg font-semibold text-[#0A2540] hover:bg-[#F0F0F0] transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 bg-[#1DBF73] text-white rounded-lg font-semibold hover:bg-[#18a864] transition"
            >
              Get Started
            </button>
          </nav>

          <MobileMenu />
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto mt-24 md:mt-32 p-6 gap-10">
        <div className="flex-1">
          <div className="inline-block bg-green-100 text-[#1DBF73] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✨ Trusted by 50,000+ Nigerians
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
            Fast, Reliable Loans <span className="text-[#1DBF73]">Anytime, Anywhere</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Get instant access to funds when you need them most. No hidden fees, no endless paperwork, no long waiting periods. Just simple, transparent lending designed for your life.
          </p>
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-[#1DBF73] text-white font-semibold rounded-lg hover:bg-[#18a864] transition shadow-lg"
            >
              Apply for a Loan
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 border border-gray-300 rounded-lg text-[#0A2540] hover:bg-gray-100 transition"
            >
              Login
            </button>
          </div>
          <div className="flex gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-[#1DBF73] text-xl">✓</span>
              <span>No collateral needed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#1DBF73] text-xl">✓</span>
              <span>Instant approval</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#1DBF73] text-xl">✓</span>
              <span>Flexible repayment</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format" 
            alt="Happy person managing finances on mobile device" 
            className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0A2540] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard value="₦5B+" label="Loans Disbursed" />
            <StatCard value="50K+" label="Happy Customers" />
            <StatCard value="5 mins" label="Average Approval Time" />
            <StatCard value="4.8/5" label="Customer Rating" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#F5F7FA] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-[#0A2540] mb-4">Why Choose Finora?</h3>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            We've built Finora to give you the financial freedom you deserve, with transparent terms and technology that works for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              title="Lightning Fast Approval" 
              description="Get your loan approved within 5 minutes. Our AI-powered system reviews your application instantly, so you can access funds when you need them most." 
              icon="⚡" 
            />
            <FeatureCard 
              title="Bank-Level Security" 
              description="Your data is protected with 256-bit encryption and multi-factor authentication. We never share your information with third parties." 
              icon="🔒" 
            />
            <FeatureCard 
              title="Real-Time Tracking" 
              description="Monitor all your loans, repayments, and transaction history from one easy dashboard. Get instant notifications for every activity." 
              icon="📊" 
            />
            <FeatureCard 
              title="Flexible Repayment" 
              description="Choose repayment plans that fit your schedule. Pay weekly, bi-weekly, or monthly—whatever works best for you." 
              icon="📅" 
            />
            <FeatureCard 
              title="No Hidden Fees" 
              description="What you see is what you pay. We believe in complete transparency with clear interest rates and zero surprise charges." 
              icon="💰" 
            />
            <FeatureCard 
              title="24/7 Support" 
              description="Our customer support team is always available to help you. Chat with us anytime, day or night, via phone, email, or live chat." 
              icon="💬" 
            />
          </div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-[#0A2540] text-center mb-4">Loans Tailored to Your Needs</h3>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Whether you need emergency funds or want to invest in your future, we have the right loan for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <LoanTypeCard 
            title="Emergency Loans"
            amount="Up to ₦500,000"
            duration="1-6 months"
            rate="2.5% monthly"
            features={["Instant approval", "Same-day disbursement", "No collateral required"]}
          />
          <LoanTypeCard 
            title="Salary Advance"
            amount="Up to ₦200,000"
            duration="1-3 months"
            rate="2% monthly"
            features={["Automatic deduction", "For salaried employees", "Quick processing"]}
          />
          <LoanTypeCard 
            title="Business Loans"
            amount="Up to ₦2,000,000"
            duration="6-12 months"
            rate="3% monthly"
            features={["Grow your business", "Flexible terms", "Dedicated support"]}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-[#F5F7FA] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-[#0A2540] text-center mb-4">How It Works</h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Getting a loan shouldn't be complicated. Here's how simple it is with Finora.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <StepCard 
              step="1" 
              title="Create Account" 
              description="Sign up in under 2 minutes with your phone number and basic details. No lengthy forms or documents needed." 
            />
            <StepCard 
              step="2" 
              title="Choose Your Loan" 
              description="Select the loan amount and repayment plan that works for you. See exactly what you'll pay before you apply." 
            />
            <StepCard 
              step="3" 
              title="Get Instant Approval" 
              description="Our smart system reviews your application in real-time. Most applications are approved within 5 minutes." 
            />
            <StepCard 
              step="4" 
              title="Receive Funds" 
              description="Once approved, funds are transferred directly to your bank account instantly. Start using your money right away." 
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-[#0A2540] text-center mb-4">What Our Users Say</h3>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust Finora for their financial needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <TestimonialCard 
            name="Tolu Adeyemi" 
            role="Small Business Owner"
            feedback="Finora saved my business! I needed urgent funds to restock inventory, and they approved my loan in 3 minutes. The whole process was incredibly smooth and professional." 
            rating={5}
          />
          <TestimonialCard 
            name="Chioma Okonkwo" 
            role="Software Engineer"
            feedback="I love how transparent everything is. No hidden charges, clear repayment schedule, and I can track everything from the app. Best loan platform I've used in Nigeria!" 
            rating={5}
          />
          <TestimonialCard 
            name="Emeka Uche" 
            role="Marketing Manager"
            feedback="The customer support team is exceptional! They guided me through my first loan application and answered all my questions. I got my money the same day I applied." 
            rating={5}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F5F7FA] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-[#0A2540] text-center mb-12">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <FAQItem 
              question="What do I need to apply for a loan?"
              answer="You only need a valid ID, a bank account, and proof of income. The entire application can be completed online in minutes."
            />
            <FAQItem 
              question="How long does approval take?"
              answer="Most loans are approved within 5 minutes. Once approved, funds are transferred to your account instantly."
            />
            <FAQItem 
              question="What are the interest rates?"
              answer="Our rates start from 2% monthly depending on the loan type and duration. We believe in transparent pricing with no hidden fees."
            />
            <FAQItem 
              question="Can I repay my loan early?"
              answer="Yes! You can repay your loan at any time without any early repayment penalties. We actually encourage it."
            />
            <FAQItem 
              question="What if I miss a payment?"
              answer="We understand that life happens. Contact our support team immediately, and we'll work with you to find a solution."
            />
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <p className="text-gray-600 font-semibold mb-6">Trusted and Secured By</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <TrustBadge text="CBN Licensed" />
            <TrustBadge text="SSL Secured" />
            <TrustBadge text="NDPR Compliant" />
            <TrustBadge text="ISO Certified" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-[#1DBF73] to-[#18a864] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Control of Your Finances?</h3>
          <p className="mb-8 text-green-50 text-lg">
            Join over 50,000 Nigerians who trust Finora for fast, reliable loans. Get started today and experience the difference.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-white text-[#1DBF73] font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg text-lg"
          >
            Apply for a Loan Now
          </button>
          <p className="mt-4 text-sm text-green-100">No credit card required • Instant approval • 100% secure</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-xl mb-4">Finora</h4>
              <p className="text-sm">
                Making financial services accessible to everyone in Nigeria. Fast, transparent, and reliable.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Products</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Emergency Loans</a></li>
                <li><a href="#" className="hover:text-white transition">Salary Advance</a></li>
                <li><a href="#" className="hover:text-white transition">Business Loans</a></li>
                <li><a href="#" className="hover:text-white transition">Student Loans</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© {new Date().getFullYear()} Finora. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">F</div>
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">T</div>
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Instagram</span>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">I</div>
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">LinkedIn</span>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">L</div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ---------- Components ---------- */

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard: FC<StatCardProps> = ({ value, label }) => (
  <div>
    <div className="text-3xl md:text-4xl font-bold text-[#1DBF73] mb-2">{value}</div>
    <div className="text-sm text-gray-300">{label}</div>
  </div>
);

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition text-center">
    <div className="text-5xl mb-4">{icon}</div>
    <h4 className="font-bold text-xl mb-3 text-[#0A2540]">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

interface LoanTypeCardProps {
  title: string;
  amount: string;
  duration: string;
  rate: string;
  features: string[];
}

const LoanTypeCard: FC<LoanTypeCardProps> = ({ title, amount, duration, rate, features }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition border-2 border-gray-100">
    <h4 className="font-bold text-2xl mb-4 text-[#0A2540]">{title}</h4>
    <div className="mb-4">
      <p className="text-3xl font-bold text-[#1DBF73]">{amount}</p>
      <p className="text-sm text-gray-600 mt-1">Loan amount</p>
    </div>
    <div className="space-y-2 mb-6 text-sm text-gray-600">
      <p><strong>Duration:</strong> {duration}</p>
      <p><strong>Interest:</strong> {rate}</p>
    </div>
    <ul className="space-y-2 mb-6">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
          <span className="text-[#1DBF73] mt-1">✓</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className="w-full py-3 bg-[#1DBF73] text-white font-semibold rounded-lg hover:bg-[#18a864] transition">
      Apply Now
    </button>
  </div>
);

interface StepCardProps {
  step: string;
  title: string;
  description: string;
}

const StepCard: FC<StepCardProps> = ({ step, title, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
    <div className="w-16 h-16 bg-[#1DBF73] text-white text-3xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
      {step}
    </div>
    <h4 className="font-bold text-xl mb-3 text-[#0A2540]">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

interface TestimonialCardProps {
  name: string;
  role: string;
  feedback: string;
  rating: number;
}

const TestimonialCard: FC<TestimonialCardProps> = ({ name, role, feedback, rating }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">★</span>
      ))}
    </div>
    <p className="text-gray-700 mb-6 leading-relaxed">&quot;{feedback}&quot;</p>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-[#1DBF73] rounded-full flex items-center justify-center text-white font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-[#0A2540]">{name}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  </div>
);

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
      >
        <span className="font-semibold text-[#0A2540]">{question}</span>
        <span className="text-2xl text-[#1DBF73]">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-6 pb-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

const TrustBadge: FC<{ text: string }> = ({ text }) => (
  <div className="px-6 py-3 bg-gray-100 rounded-lg text-gray-700 font-semibold text-sm">
    {text}
  </div>
);

/* Mobile Menu Component */
const MobileMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    { label: "Features", path: "#features" },
    { label: "How It Works", path: "#how-it-works" },
    { label: "Reviews", path: "#testimonials" },
    { label: "Login", path: "/login" },
    { label: "Get Started", path: "/register" },
  ];

  return (
    <>
      <button className="md:hidden text-[#0A2540]" onClick={() => setOpen(!open)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col border-t">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className="px-6 py-3 text-left hover:bg-gray-50 transition text-[#0A2540]"
              onClick={() => {
                if (item.path.startsWith("#")) {
                  document.querySelector(item.path)?.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate(item.path);
                }
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default LandingPage;
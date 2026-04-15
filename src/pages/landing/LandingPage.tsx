import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What do I need to apply for a loan?",
      a: "You only need a valid ID, a bank account, and proof of income. The entire process is online."
    },
    {
      q: "How fast is loan approval?",
      a: "Most applications are approved within 5 minutes using our automated system."
    },
    {
      q: "Are there hidden charges?",
      a: "No. Finora practices transparent pricing. What you see is what you pay."
    },
    {
      q: "Can I repay early?",
      a: "Yes. Early repayment is allowed with no penalties."
    }
  ];

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between h-[64px] px-6 md:px-12 border-b border-white/10 bg-[#080c14]/90 backdrop-blur">
        <div className="flex items-center gap-2 font-bold text-lg">Finora</div>
        <div className="hidden md:flex gap-6 text-sm text-white/60">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#loans" className="hover:text-white">Loans</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </div>
        <div className="flex gap-2">
          <Link to="/login" className="px-4 py-2 text-sm border border-white/20 rounded-md hover:border-white">Login</Link>
          <Link to="/register" className="px-4 py-2 text-sm bg-emerald-500 text-black rounded-md font-semibold hover:bg-emerald-400">Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative text-center px-6 pt-32 pb-40">
        <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
          className="max-w-4xl mx-auto text-4xl md:text-6xl font-extrabold">
          Fast, reliable loans <span className="text-emerald-400">anytime, anywhere</span>
        </motion.h1>
        <p className="max-w-xl mx-auto mt-6 text-white/60">
          Access instant funds, track repayments, and manage your finances from one powerful platform.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/register" className="px-6 py-3 bg-emerald-500 text-black rounded-lg font-semibold hover:bg-emerald-400">Apply for a loan</Link>
          <a href="#how" className="px-6 py-3 border border-white/20 rounded-lg hover:border-white">How it works</a>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-24 py-16 border-y border-white/10 bg-[#0d1117]">
        {[['₦5B+','Loans Disbursed'],['50K+','Users'],['5 mins','Approval Time'],['4.8★','User Rating']].map(([v,l])=> (
          <div key={l} className="text-center">
            <div className="text-3xl font-bold text-emerald-400">{v}</div>
            <div className="text-xs uppercase tracking-widest text-white/40">{l}</div>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 md:px-24 py-28">
        <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center">Why choose Finora?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            ['Instant Approval','AI-powered review in minutes'],
            ['Secure Platform','Bank-grade encryption & compliance'],
            ['Flexible Repayment','Weekly or monthly schedules'],
            ['Real-time Tracking','Monitor loans anytime'],
            ['No Hidden Fees','Transparent interest rates'],
            ['24/7 Support','Always available assistance']
          ].map(([t,d]) => (
            <motion.div key={t} whileHover={{y:-6}} className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-sm text-white/60">{d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 md:px-24 py-28 bg-[#0a0f1a]">
        <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
        <div className="grid md:grid-cols-4 gap-10">
          {[
            ['1','Create account'],
            ['2','Choose loan'],
            ['3','Get approved'],
            ['4','Receive funds']
          ].map(([n,t]) => (
            <div key={n} className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">{n}</div>
              <div className="font-semibold">{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-24 py-28">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((f,i)=>(
            <div key={i} className="border border-white/10 rounded-lg">
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full px-6 py-4 flex justify-between items-center text-left">
                <span>{f.q}</span>
                <span>{openFaq===i?'−':'+'}</span>
              </button>
              {openFaq===i && <div className="px-6 pb-4 text-sm text-white/60">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6 py-32 bg-[#080c14]">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
        <p className="text-white/60 mb-10">Join thousands of Nigerians already using Finora.</p>
        <Link to="/register" className="px-8 py-4 bg-emerald-500 text-black rounded-lg font-semibold hover:bg-emerald-400">Create free account</Link>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 border-t border-white/10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Finora. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

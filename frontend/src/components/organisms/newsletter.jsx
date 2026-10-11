"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please provide a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Thank you for subscribing! Check your inbox soon.");
  };

  return (
    <section className="py-16">
      <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-tr from-blue-900 via-indigo-950 to-slate-900 p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-white/10">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Mail className="w-3.5 h-3.5" />
              <span>Stay Ahead In Tech</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Unlock ৳1,000 Off Your First Order
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Subscribe to get exclusive member deals, priority access to flagship product launches, and weekly tech review digests.
            </p>

            {subscribed ? (
              <div className="pt-4 flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-500/10 py-3 px-6 rounded-2xl border border-emerald-500/30 max-w-md mx-auto">
                <CheckCircle className="w-5 h-5" />
                <span>You are subscribed! Coupon code sent to {email}.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="pt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 h-13 px-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  className="h-13 px-7 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/30 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-slate-400 pt-2">
              No spam guaranteed. You can unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;

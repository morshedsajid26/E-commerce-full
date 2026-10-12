"use client";

import React from "react";
import Link from "next/link";
import { Megaphone, Sparkles, ArrowRight } from "lucide-react";

export function TickerNotice() {
  const notices = [
    "🔥 Gadget Land BD মেগা অফার: সকল ইন্টেল ও এএমডি রাইজেন প্রসেসরে আকর্ষণীয় ক্যাশব্যাক!",
    "🛠️ অনলাইন পিসি বিল্ডার (PC Builder) দিয়ে আপনার বাজেট অনুযায়ী কাস্টম রিগ তৈরি করুন।",
    "💳 সকল শীর্ষ ব্যাংকের ক্রেডিট কার্ডে ০% সুদে সর্বোচ্চ ৩৬ মাস পর্যন্ত সহজ EMI সুবিধা।",
    "🚚 ঢাকা সিটিতে ২৪ ঘণ্টায় এক্সপ্রেস ডেলিভারি ও সারাদেশে দ্রুততম ক্যাশ অন ডেলিভারি।",
    "🛡️ ১০০% অফিশিয়াল অথোরাইজড প্রোডাক্ট ও ব্র্যান্ড ওয়ারেন্টি সার্ভিস নিশ্চয়তা।",
  ];

  return (
    <div className="bg-red-600 text-white py-2 px-4 shadow-xs">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto flex items-center gap-3">
        {/* Notice Badge */}
        <div className="shrink-0 flex items-center gap-1.5 bg-red-800/80 px-2.5 py-1 rounded text-[11px] font-black uppercase tracking-wider">
          <Megaphone className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
          <span>বিজ্ঞপ্তি / Updates</span>
        </div>

        {/* Marquee ticker text */}
        <div className="overflow-hidden whitespace-nowrap flex-1 text-xs font-semibold relative">
          <div className="inline-block animate-marquee hover:pause cursor-default">
            {notices.map((notice, idx) => (
              <span key={idx} className="mx-6 inline-flex items-center gap-2">
                <span>{notice}</span>
                <span className="text-red-300">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Quick Offer CTA Link */}
        <Link
          href="/offers"
          className="hidden sm:inline-flex items-center gap-1 shrink-0 text-xs font-bold bg-white text-red-600 px-3 py-1 rounded hover:bg-red-50 transition-colors"
        >
          <span>সকল অফার দেখুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default TickerNotice;

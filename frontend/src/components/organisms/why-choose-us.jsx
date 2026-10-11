"use client";

import React from "react";
import { ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      title: "100% Original Products",
      desc: "Every gadget is sourced directly from certified global distributors with serial verification.",
      icon: ShieldCheck,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Official Brand Warranty",
      desc: "Enjoy peace of mind with 1 to 2 years official manufacturer warranty and localized repair support.",
      icon: Award,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Ultra Fast Delivery",
      desc: "Same-day delivery inside Dhaka and 24 to 48 hours doorstep shipping across all 64 districts.",
      icon: Truck,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "7 Days Hassle-Free Returns",
      desc: "Not satisfied or facing a manufacturing defect? Get an instant replacement or full refund.",
      icon: RotateCcw,
      color: "bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Why Shop With GADGETS BD?
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            We are dedicated to providing the premier tech buying experience in Bangladesh with unmatched authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-5`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

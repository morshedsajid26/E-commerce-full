"use client";

import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Tanvir Ahmed",
      role: "Software Architect, Dhaka",
      product: "MacBook Pro M3 Max",
      text: "The delivery arrived within 4 hours in Dhanmondi! Authentic sealed box with official warranty verification on Apple's portal. Outstanding service.",
      rating: 5,
    },
    {
      name: "Dr. Nabila Rahman",
      role: "Medical Practitioner, Sylhet",
      product: "iPhone 16 Pro 256GB",
      text: "Was hesitant about online gadget purchase outside Dhaka, but GADGETS BD delivered safely via Currier within 24 hours. Packaging was bulletproof.",
      rating: 5,
    },
    {
      name: "Farhan Hossain",
      role: "Content Creator & Youtuber",
      product: "Sony WH-1000XM5 & Rode Mic",
      text: "Best pricing in Bangladesh compared to retail shops. Their customer care was very responsive when answering pre-sale questions.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-muted/20 border-t border-border/40">
      <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-primary">
            Real Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
            Loved By Over 50,000 Tech Enthusiasts
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            See why power users trust GADGETS BD for their most critical computing & personal electronics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic mb-6">
                  "{r.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <span>{r.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  </h4>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {r.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Flame } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pb-24">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Season 2026 • Official Distributor</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
              Elevate Your <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">Digital Life</span> With Pure Power.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore the latest premium smartphones, studio-grade laptops, audio marvels and authentic wearables with 100% manufacturer warranty.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto h-13 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:gap-3"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pre-order"
                className="w-full sm:w-auto h-13 px-8 rounded-xl border border-input bg-card/80 hover:bg-accent text-foreground font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Pre-Order Flagships</span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/60 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-foreground">50k+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-foreground">100%</p>
                <p className="text-xs text-muted-foreground mt-0.5">Genuine Guarantee</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-foreground">24-48h</p>
                <p className="text-xs text-muted-foreground mt-0.5">Nationwide Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Visual Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl bg-gradient-to-b from-card to-card/60 p-6 sm:p-8 border border-border/80 shadow-2xl backdrop-blur-xl overflow-hidden group">
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Zap className="w-3.5 h-3.5" /> Hot Deal
                </div>

                <div className="aspect-square rounded-2xl overflow-hidden bg-muted/40 flex items-center justify-center p-6 relative">
                  <img
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
                    alt="Featured MacBook Pro"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Apple Pro Series</span>
                      <h3 className="text-xl font-bold text-foreground">MacBook Studio Pro M4 Max</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground line-through block">৳ 320,000</span>
                      <span className="text-xl font-black text-foreground">৳ 289,900</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    36GB Unified Memory, 1TB SSD, 16.2" Liquid Retina XDR display with ProMotion 120Hz.
                  </p>

                  <div className="pt-4 flex gap-2">
                    <Link
                      href="/category/laptops"
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-center font-bold text-xs hover:bg-primary/90 transition-colors"
                    >
                      View Laptop Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

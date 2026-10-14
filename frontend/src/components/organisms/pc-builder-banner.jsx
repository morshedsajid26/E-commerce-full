"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Wrench, ShieldCheck, Zap, ArrowRight, Sparkles } from "lucide-react";

export function PcBuilderBanner() {
  return (
    <section className="py-8 bg-background">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border border-blue-500/30 p-6 sm:p-10 text-white shadow-xl">
          {/* Background decoration */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Gadget Land BD Signature Tool</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                Build Your Custom <span className="text-blue-400">Dream Gaming PC</span> in Minutes!
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Choose from the largest inventory of Intel, AMD, ASUS, MSI, and Gigabyte hardware. Our smart PC Builder automatically verifies socket compatibility, wattage requirements, and calculates instant EMI monthly installments.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg text-xs font-bold text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Pro Assembly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Compatibility Check</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>3-Yr Warranty Support</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/shop"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:gap-3"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Start PC Builder Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/offers"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-xs transition-colors"
                >
                  Pre-Built Gaming Rigs
                </Link>
              </div>
            </div>

            {/* Visual Hardware Specs Card on Right */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-xl bg-slate-900/80 border border-white/10 p-5 backdrop-blur-md space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-white/10 text-xs">
                  <span className="text-slate-400">Featured Configuration</span>
                  <span className="text-blue-400 font-bold">Tier: Extreme 4K</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Processor:</span>
                    <span className="font-bold">AMD Ryzen 7 7800X3D</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Graphics:</span>
                    <span className="font-bold text-blue-400">RTX 4080 Super 16GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">RAM:</span>
                    <span className="font-bold">Corsair 32GB DDR5 6000MHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">SSD:</span>
                    <span className="font-bold">Samsung 990 Pro 2TB Gen4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Power Supply:</span>
                    <span className="font-bold">Corsair RM850e 80+ Gold</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Estimated Total:</span>
                  <span className="text-lg font-black text-blue-400">৳ 2,89,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PcBuilderBanner;

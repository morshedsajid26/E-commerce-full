"use client";

import React from "react";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Wrench,
  Clock,
  HelpCircle,
  Award,
} from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      title: "100% Genuine BD Warranty",
      desc: "Direct official distributor sourcing with authorized serial verification and repair support.",
      icon: ShieldCheck,
      color: "bg-red-500/10 text-red-600",
    },
    {
      title: "0% Interest EMI Facility",
      desc: "Buy your dream laptop or PC with up to 36 months easy installments on leading bank credit cards.",
      icon: CreditCard,
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      title: "Fast Nationwide Delivery",
      desc: "Express 24-hour delivery inside Dhaka and fast doorstep Cash on Delivery across all 64 districts.",
      icon: Truck,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Expert PC Assembly & Service",
      desc: "Professional cable management, stress-testing, and dedicated hardware troubleshooting.",
      icon: Wrench,
      color: "bg-emerald-500/10 text-emerald-600",
    },
  ];

  return (
    <section className="py-12 bg-slate-50 dark:bg-muted/10 border-t border-border">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 text-xs font-black uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Gadget Land BD Customer Promise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Why Gadget Land BD is Your Trusted Tech Partner?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Serving tech enthusiasts, gamers, and enterprises across Bangladesh with authentic computing excellence since 2016.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-xl border border-border bg-card hover:border-red-500/60 hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-foreground mb-1.5">
                  {f.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Gadget Land BD SEO & Buying Guide Info Box */}
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h3 className="font-black text-base sm:text-lg text-foreground">
            Leading Computer, Laptop & Gaming PC Shop in Bangladesh - Gadget Land BD
          </h3>
          <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              Gadget Land BD is one of the most reliable and trusted computer and IT retail chains in Bangladesh. Whether you are looking for top-brand laptops from ASUS, HP, Dell, Lenovo, Acer, and Apple, or building a high-performance custom gaming desktop PC, we offer competitive pricing with 100% genuine official warranty.
            </p>
            <p>
              Explore our comprehensive range of computer components including Intel and AMD processors, NVIDIA GeForce RTX and AMD Radeon graphics cards, motherboards, high-speed DDR5 RAM, and Gen4/Gen5 NVMe SSDs. With our innovative online <strong>PC Builder</strong> tool, users can design their dream rig according to their budget and requirement.
            </p>
            <p>
              Visit our showrooms at Multiplan Computer City, IDB Bhaban Agargaon, Uttara, and Chattogram, or order online to get fast nationwide doorstep delivery with flexible 0% interest EMI payment facilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

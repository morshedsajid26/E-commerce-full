"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  Flame,
  CreditCard,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react";

export function QuickServices() {
  const services = [
    {
      title: "PC Builder",
      desc: "Build Your Custom Rig",
      icon: Wrench,
      href: "/shop",
      bgHover: "hover:border-blue-500",
      accent: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",
      tag: "Popular",
    },
    {
      title: "Special Offers",
      desc: "Top Discounts & Deals",
      icon: Flame,
      href: "/offers",
      bgHover: "hover:border-amber-500",
      accent: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
      tag: "Save More",
    },
    {
      title: "0% EMI Facility",
      desc: "Up to 36 Months Installment",
      icon: CreditCard,
      href: "/shop",
      bgHover: "hover:border-blue-500",
      accent: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
      tag: "Easy Pay",
    },
    {
      title: "100% Genuine",
      desc: "Official BD Brand Warranty",
      icon: ShieldCheck,
      href: "/shop",
      bgHover: "hover:border-emerald-500",
      accent: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
      tag: "Guaranteed",
    },
    {
      title: "Fast Delivery",
      desc: "Nationwide Cash on Delivery",
      icon: Truck,
      href: "/shop",
      bgHover: "hover:border-purple-500",
      accent: "text-purple-500 bg-purple-50 dark:bg-purple-950/40",
      tag: "24-48 Hours",
    },
  ];

  return (
    <section className="py-4 bg-slate-50 dark:bg-background">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group p-3.5 sm:p-4 rounded-xl bg-card border border-border shadow-xs ${item.bgHover} transition-all duration-200 flex items-center justify-between hover:shadow-md hover:-translate-y-0.5`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.accent} group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-xs sm:text-sm text-foreground group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default QuickServices;

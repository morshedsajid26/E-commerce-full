"use client";

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Cpu,
  ArrowRight,
} from "lucide-react";

export function FeaturedCategories() {
  const categories = [
    {
      title: "Smartphones",
      slug: "smartphone",
      desc: "iPhones, Samsung Galaxy, Pixel",
      icon: Smartphone,
      color: "from-blue-600/20 to-blue-500/5",
      accent: "text-blue-500",
      count: "120+ Models",
    },
    {
      title: "Laptops & PCs",
      slug: "laptops",
      desc: "MacBook, ThinkPad, ROG",
      icon: Laptop,
      color: "from-indigo-600/20 to-indigo-500/5",
      accent: "text-indigo-500",
      count: "85+ Models",
    },
    {
      title: "Headphones & Audio",
      slug: "audio",
      desc: "Sony, Bose, AirPods, JBL",
      icon: Headphones,
      color: "from-purple-600/20 to-purple-500/5",
      accent: "text-purple-500",
      count: "64+ Models",
    },
    {
      title: "Smartwatches",
      slug: "smartwatches",
      desc: "Apple Watch, Galaxy Watch, Garmin",
      icon: Watch,
      color: "from-rose-600/20 to-rose-500/5",
      accent: "text-rose-500",
      count: "40+ Models",
    },
    {
      title: "Gaming & VR",
      slug: "gaming",
      desc: "PlayStation, Xbox, Meta Quest",
      icon: Gamepad2,
      color: "from-emerald-600/20 to-emerald-500/5",
      accent: "text-emerald-500",
      count: "35+ Models",
    },
    {
      title: "Accessories",
      slug: "accessories",
      desc: "GaN Chargers, Docks, Cases",
      icon: Cpu,
      color: "from-amber-600/20 to-amber-500/5",
      accent: "text-amber-500",
      count: "190+ Items",
    },
  ];

  return (
    <section className="py-12 border-t border-border/40">
      <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Featured Categories
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Browse top hardware engineered for creators, gamers & professionals.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-bold text-primary hover:underline flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group relative rounded-2xl border border-border/70 bg-card p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} ${cat.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {cat.desc}
                  </p>
                  <span className="text-[11px] font-semibold text-primary/80 mt-3 block">
                    {cat.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;

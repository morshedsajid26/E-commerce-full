"use client";

import React from "react";
import Link from "next/link";
import {
  Laptop,
  Monitor,
  Cpu,
  HardDrive,
  Gamepad2,
  Armchair,
  CircuitBoard,
  Keyboard,
  ShieldAlert,
  ArrowRight,
  Flame,
} from "lucide-react";

export function FeaturedCategories() {
  const categories = [
    {
      title: "Laptop & Notebook",
      slug: "laptops",
      desc: "Gaming, Ultrabook, Mac",
      icon: Laptop,
      color: "from-blue-600/15 to-indigo-500/5",
      accent: "text-blue-600",
      count: "150+ Models",
    },
    {
      title: "Desktop PC",
      slug: "desktops",
      desc: "Custom Rig, All-in-One",
      icon: Monitor,
      color: "from-blue-600/15 to-blue-500/5",
      accent: "text-blue-600",
      count: "95+ Builds",
    },
    {
      title: "Processors (CPU)",
      slug: "components",
      desc: "Intel Core Ultra, Ryzen 9",
      icon: Cpu,
      color: "from-amber-600/15 to-amber-500/5",
      accent: "text-amber-600",
      count: "60+ Models",
    },
    {
      title: "Graphics Card (GPU)",
      slug: "components",
      desc: "RTX 40/50 Series, RX 7000",
      icon: CircuitBoard,
      color: "from-emerald-600/15 to-emerald-500/5",
      accent: "text-emerald-600",
      count: "80+ Models",
    },
    {
      title: "Gaming Monitors",
      slug: "monitors",
      desc: "144Hz - 360Hz, 4K, Curved",
      icon: Monitor,
      color: "from-indigo-600/15 to-indigo-500/5",
      accent: "text-indigo-600",
      count: "110+ Models",
    },
    {
      title: "NVMe SSD & Storage",
      slug: "components",
      desc: "PCIe Gen 4/5, External HDD",
      icon: HardDrive,
      color: "from-purple-600/15 to-purple-500/5",
      accent: "text-purple-600",
      count: "75+ Items",
    },
    {
      title: "Keyboards & Mice",
      slug: "accessories",
      desc: "Mechanical, Wireless, RGB",
      icon: Keyboard,
      color: "from-cyan-600/15 to-cyan-500/5",
      accent: "text-cyan-600",
      count: "140+ Items",
    },
    {
      title: "Gaming Chairs",
      slug: "gaming",
      desc: "Ergonomic, Racing Style",
      icon: Armchair,
      color: "from-indigo-600/15 to-violet-500/5",
      accent: "text-indigo-600",
      count: "30+ Models",
    },
  ];

  return (
    <section className="py-8 bg-background border-t border-border">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6 pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-blue-600 rounded-xs" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Featured Hardware Categories
              </h2>
              <p className="text-xs text-muted-foreground">
                Get genuine IT hardware & gaming gadgets at the best prices in Bangladesh
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={`/category/${cat.slug}`}
                className="group p-4 rounded-xl border border-border bg-card hover:border-blue-500/60 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center justify-between"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} ${cat.accent} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-foreground group-hover:text-blue-600 transition-colors line-clamp-1">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                    {cat.desc}
                  </p>
                  <span className="text-[10px] font-bold text-blue-600/90 mt-2 block bg-blue-50 dark:bg-blue-950/40 py-0.5 px-2 rounded-full">
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

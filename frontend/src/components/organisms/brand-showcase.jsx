"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandShowcase() {
  const brands = [
    { name: "ASUS", tag: "ROG & TUF Gaming", link: "/shop?brand=ASUS" },
    { name: "INTEL", tag: "Core Ultra Processors", link: "/shop?brand=Intel" },
    { name: "AMD", tag: "Ryzen & Radeon GPUs", link: "/shop?brand=AMD" },
    { name: "MSI", tag: "Gaming Laptops & Boards", link: "/shop?brand=MSI" },
    { name: "GIGABYTE", tag: "AORUS Hardware", link: "/shop?brand=Gigabyte" },
    { name: "CORSAIR", tag: "DDR5 RAM & PSUs", link: "/shop?brand=Corsair" },
    { name: "RAZER", tag: "Peripherals & Laptops", link: "/shop?brand=Razer" },
    { name: "DELL", tag: "Alienware & XPS", link: "/shop?brand=Dell" },
    { name: "HP", tag: "Victus & Omen", link: "/shop?brand=HP" },
    { name: "LENOVO", tag: "Legion & ThinkPad", link: "/shop?brand=Lenovo" },
    { name: "SAMSUNG", tag: "Odyssey & 990 Pro", link: "/shop?brand=Samsung" },
    { name: "LOGITECH", tag: "PRO & MX Series", link: "/shop?brand=Logitech" },
  ];

  return (
    <section className="py-8 bg-slate-50 dark:bg-muted/20 border-t border-border">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6 pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-red-600 rounded-xs" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Authorized Brand Partners
              </h2>
              <p className="text-xs text-muted-foreground">
                100% genuine products with manufacturer warranty directly from official distributors
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group"
          >
            <span>All Authorized Brands</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {brands.map((b) => (
            <Link
              key={b.name}
              href={b.link}
              className="p-4 rounded-xl border border-border bg-card hover:border-red-500 hover:shadow-md transition-all text-center group flex flex-col justify-center items-center h-24"
            >
              <span className="font-black text-lg tracking-wider text-foreground group-hover:text-red-600 transition-colors">
                {b.name}
              </span>
              <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors mt-0.5 line-clamp-1">
                {b.tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandShowcase;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Clock,
  ShoppingBag,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useAppStore } from "@/store";
import toast from "react-hot-toast";

export function FlashSale({ products = [] }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 18,
  });

  const addToCart = useAppStore((state) => state.addToCart);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const defaultDeals = [
    {
      id: "deal-1",
      title: "ASUS TUF Gaming GeForce RTX 4070 Ti Super 16GB",
      specs: ["16GB GDDR6X", "Boost Clock: 2640 MHz", "Military-grade Caps", "3x Axial-tech Fans"],
      price: 114000,
      oldPrice: 126000,
      discount: 10,
      stockTotal: 15,
      stockSold: 11,
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
      brand: "ASUS",
    },
    {
      id: "deal-2",
      title: "AMD Ryzen 7 7800X3D Gaming Processor",
      specs: ["8 Cores, 16 Threads", "Up to 5.0 GHz Max Boost", "104MB 3D V-Cache", "AM5 Socket"],
      price: 43500,
      oldPrice: 48500,
      discount: 11,
      stockTotal: 25,
      stockSold: 19,
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80",
      brand: "AMD",
    },
    {
      id: "deal-3",
      title: "MSI MAG 274QRF QD E2 27\" 180Hz 2K Rapid IPS Monitor",
      specs: ["27\" WQHD 2560x1440", "180Hz Refresh Rate", "0.5ms Response", "Quantum Dot Color"],
      price: 36500,
      oldPrice: 41000,
      discount: 11,
      stockTotal: 20,
      stockSold: 16,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
      brand: "MSI",
    },
    {
      id: "deal-4",
      title: "Lenovo LOQ 15 Gaming Laptop (Core i7 13th Gen / RTX 4060)",
      specs: ["Core i7-13650HX", "16GB DDR5 5200MHz", "512GB PCIe 4.0 SSD", "15.6\" FHD 144Hz 100% sRGB"],
      price: 129000,
      oldPrice: 142000,
      discount: 9,
      stockTotal: 12,
      stockSold: 9,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
      brand: "Lenovo",
    },
  ];

  const dealsToRender =
    products && products.length >= 4
      ? products.slice(0, 4).map((p, idx) => ({
          ...p,
          specs: p.specs || [
            "Official Brand Warranty",
            "Authentic Retail Box",
            "High Speed Performance",
          ],
          stockTotal: 20,
          stockSold: 12 + idx * 2,
        }))
      : defaultDeals;

  const handleAddToCart = (item, e) => {
    e.preventDefault();
    addToCart(item, 1);
    toast.success(`${item.title.slice(0, 24)}... Added to cart!`);
  };

  return (
    <section className="py-8 bg-blue-50/50 dark:bg-blue-950/10 border-y border-blue-200/60 dark:border-blue-900/40">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Deal Header with Live Countdown Timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-blue-200/80 dark:border-blue-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-600/30 animate-pulse">
              <Flame className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded">
                  Limited Time Offers
                </span>
                <span className="text-xs text-muted-foreground font-semibold hidden sm:inline">
                  • Ends when stock runs out!
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Gadget Land Deal of the Day
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground hidden sm:inline">
              Offer Ends In:
            </span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 bg-card border border-blue-200 dark:border-blue-900 px-2.5 py-1.5 rounded-lg shadow-xs">
                <span className="text-sm font-black text-blue-600">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-muted-foreground font-bold">H</span>
              </div>
              <span className="font-bold text-blue-600">:</span>
              <div className="flex items-center gap-1 bg-card border border-blue-200 dark:border-blue-900 px-2.5 py-1.5 rounded-lg shadow-xs">
                <span className="text-sm font-black text-blue-600">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-muted-foreground font-bold">M</span>
              </div>
              <span className="font-bold text-blue-600">:</span>
              <div className="flex items-center gap-1 bg-card border border-blue-200 dark:border-blue-900 px-2.5 py-1.5 rounded-lg shadow-xs">
                <span className="text-sm font-black text-blue-600">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-muted-foreground font-bold">S</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dealsToRender.map((deal) => {
            const stockRemaining = deal.stockTotal - deal.stockSold;
            const percentage = Math.round((deal.stockSold / deal.stockTotal) * 100);

            return (
              <div
                key={deal.id}
                className="group rounded-xl border border-border bg-card p-4 hover:border-blue-500/80 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase">
                    Save {deal.discount}%
                  </span>
                </div>

                {/* Brand Tag */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-[10px] font-extrabold uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {deal.brand}
                  </span>
                </div>

                {/* Product Thumbnail */}
                <div className="aspect-4/3 rounded-lg overflow-hidden bg-white dark:bg-muted/30 p-3 mt-4 flex items-center justify-center relative">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="mt-3 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-xs sm:text-sm text-foreground line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {deal.title}
                    </h3>

                    {/* Spec Bullets */}
                    <ul className="mt-2 space-y-1 text-[11px] text-muted-foreground">
                      {deal.specs?.slice(0, 3).map((spec, i) => (
                        <li key={i} className="flex items-center gap-1.5 line-clamp-1">
                          <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="pt-2">
                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground mb-1">
                      <span>Available: {stockRemaining} units</span>
                      <span className="text-blue-600 font-extrabold">{percentage}% Sold</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="pt-2 flex items-baseline justify-between border-t border-border">
                    <div>
                      <span className="text-[10px] text-muted-foreground block line-through">
                        ৳ {deal.oldPrice?.toLocaleString()}
                      </span>
                      <span className="text-base sm:text-lg font-black text-blue-600">
                        ৳ {deal.price?.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(deal, e)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FlashSale;

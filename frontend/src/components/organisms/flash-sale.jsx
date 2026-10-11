"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Clock, ShoppingBag, Flame } from "lucide-react";
import { useAppStore } from "@/store";
import toast from "react-hot-toast";

export function FlashSale({ products = [] }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
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

  const flashProducts =
    products && products.length > 0
      ? products.slice(0, 4)
      : [
          {
            id: "flash-1",
            title: "Apple AirPods Max - Space Gray",
            price: 68500,
            oldPrice: 79000,
            discount: 13,
            image:
              "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
          },
          {
            id: "flash-2",
            title: "Sony PlayStation 5 Slim 1TB Digital",
            price: 58000,
            oldPrice: 65000,
            discount: 11,
            image:
              "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80",
          },
          {
            id: "flash-3",
            title: "Apple Watch Ultra 2 Titanium Case",
            price: 94000,
            oldPrice: 105000,
            discount: 10,
            image:
              "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
          },
          {
            id: "flash-4",
            title: "Anker Prime 20,000mAh 200W Power Bank",
            price: 14500,
            oldPrice: 17500,
            discount: 17,
            image:
              "https://images.unsplash.com/photo-1609592426508-cc02c52516db?w=800&q=80",
          },
        ];

  return (
    <section className="py-12 bg-gradient-to-b from-rose-950/20 via-background to-background border-y border-rose-500/10">
      <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-lg shadow-rose-500/25 animate-pulse">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-500">
                  Limited Time Only
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Flash Mega Deals
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-card border border-border px-4 py-2.5 rounded-2xl shadow-xs">
              <Clock className="w-4 h-4 text-rose-500 mr-1" />
              <div className="flex items-center gap-1 text-center font-black">
                <div className="min-w-8 bg-muted rounded-lg py-1 px-1.5 text-sm">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <span>:</span>
                <div className="min-w-8 bg-muted rounded-lg py-1 px-1.5 text-sm">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <span>:</span>
                <div className="min-w-8 bg-muted rounded-lg py-1 px-1.5 text-sm text-rose-500">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flash cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl border border-rose-500/20 bg-card p-4 hover:border-rose-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-square rounded-2xl bg-muted/40 p-4 flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 bg-rose-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full z-10 shadow-xs">
                  Save {p.discount || 10}%
                </span>
                <Link href={`/product/${p.id}`} className="w-full h-full flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </Link>
              </div>

              <div className="mt-4 flex-1 flex flex-col justify-between">
                <Link
                  href={`/product/${p.id}`}
                  className="font-bold text-sm text-foreground hover:text-rose-500 transition-colors line-clamp-2"
                >
                  {p.title}
                </Link>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                  <div>
                    {p.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through block">
                        ৳ {p.oldPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-base font-black text-rose-500">
                      ৳ {p.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(p, 1);
                      toast.success("Added to cart!");
                    }}
                    className="h-9 px-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Claim</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FlashSale;

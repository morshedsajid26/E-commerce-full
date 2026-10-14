"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Laptop,
  Monitor,
  Cpu,
  HardDrive,
  Gamepad2,
  Wifi,
  Printer,
  Headphones,
  Zap,
  ShieldCheck,
  ChevronRight,
  Flame,
  ArrowRight,
  Wrench,
  Sparkles,
  ChevronLeft,
} from "lucide-react";

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      badge: "Flagship GPU Launch 2026",
      title: "GeForce RTX 40 & 50 Series",
      subtitle: "Unleash extreme DLSS 3.5 & ray tracing graphics for 4K ultra gaming and AI workstations.",
      pricePrefix: "Starting at",
      price: "৳ 48,500",
      link: "/category/components",
      cta: "Explore Graphics Cards",
      tag: "Official BD Distributor",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1000&q=80",
      bgGradient: "from-slate-950 via-slate-900 to-blue-950/40",
      accentColor: "text-blue-500",
    },
    {
      badge: "Next-Gen Gaming Laptops",
      title: "ASUS ROG & MSI Raider",
      subtitle: "Intel Core 14th Gen & AMD Ryzen 8000/9000 with up to 240Hz OLED high-refresh screens.",
      pricePrefix: "Special Offer from",
      price: "৳ 1,18,000",
      link: "/category/laptops",
      cta: "Shop Gaming Laptops",
      tag: "Free Gaming Backpack",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1000&q=80",
      bgGradient: "from-slate-950 via-slate-900 to-indigo-950/40",
      accentColor: "text-indigo-400",
    },
    {
      badge: "Workstation & Enthusiast",
      title: "Intel Core Ultra & AMD Ryzen 9",
      subtitle: "Highest multi-threaded benchmarks, unlocked overclocking, and PCIe 5.0 speeds.",
      pricePrefix: "Starting from",
      price: "৳ 24,500",
      link: "/category/components",
      cta: "View Processors",
      tag: "3 Years Official Warranty",
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1000&q=80",
      bgGradient: "from-slate-950 via-slate-900 to-amber-950/40",
      accentColor: "text-amber-400",
    },
  ];

  const megaCategories = [
    {
      title: "Desktop PC",
      subtitle: "Gaming PC, All-in-One, Brand PC",
      icon: Monitor,
      href: "/category/desktops",
    },
    {
      title: "Laptop & Notebook",
      subtitle: "Gaming, Ultrabook, MacBook",
      icon: Laptop,
      href: "/category/laptops",
    },
    {
      title: "PC Components",
      subtitle: "Processor, GPU, Motherboard, RAM",
      icon: Cpu,
      href: "/category/components",
    },
    {
      title: "Gaming Monitors",
      subtitle: "144Hz-360Hz, 4K, Curved OLED",
      icon: Monitor,
      href: "/category/monitors",
    },
    {
      title: "Storage & Memory",
      subtitle: "Gen4 NVMe SSD, DDR5 RAM, HDD",
      icon: HardDrive,
      href: "/category/components",
    },
    {
      title: "Gaming Gear & VR",
      subtitle: "Keyboards, Mice, Chairs, Headsets",
      icon: Gamepad2,
      href: "/category/gaming",
    },
    {
      title: "Networking & Router",
      subtitle: "Wi-Fi 6/7, Mesh, Switch, Cable",
      icon: Wifi,
      href: "/category/networking",
    },
    {
      title: "Office & Printers",
      subtitle: "Laser Printer, Scanner, Projector",
      icon: Printer,
      href: "/shop",
    },
    {
      title: "Sound & Audio",
      subtitle: "Studio Speakers, Soundbar, ANC",
      icon: Headphones,
      href: "/category/audio",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="pt-2 pb-6 bg-slate-50 dark:bg-background">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* 1. Left Column: Vertical Category Menu */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden h-full flex flex-col justify-between">
              <div className="bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-yellow-300" />
                  Top Tech Categories
                </span>
                <span className="text-[10px] bg-blue-700/80 px-2 py-0.5 rounded font-bold">
                  Browse All
                </span>
              </div>

              <div className="divide-y divide-border/60 flex-1">
                {megaCategories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.title}
                      href={cat.href}
                      className="group flex items-center justify-between px-3.5 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-150"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-muted group-hover:bg-blue-600 group-hover:text-white text-muted-foreground flex items-center justify-center transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="leading-tight">
                          <span className="text-xs font-bold text-foreground group-hover:text-blue-600 transition-colors block">
                            {cat.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground line-clamp-1">
                            {cat.subtitle}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
              </div>

              {/* Bottom PC Builder Quick Link in Sidebar */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border-t border-blue-200 dark:border-blue-900/50">
                <Link
                  href="/shop"
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-xs transition-colors"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Build Custom PC</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Center Column: Promotional Banner Slider */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden border border-border shadow-xs h-[380px] sm:h-[420px] lg:h-full min-h-[380px] flex flex-col justify-between group">
              {heroSlides.map((slide, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <div
                    key={slide.title}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {/* Background visual banner */}
                    <div className="absolute inset-0 bg-slate-950">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105 group-hover:scale-100 transition-transform duration-1000"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`}
                      />
                    </div>

                    {/* Banner Content Overlay */}
                    <div className="relative z-10 h-full p-6 sm:p-10 flex flex-col justify-between text-white">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-black uppercase tracking-wider shadow-xs mb-3">
                          <Sparkles className="w-3 h-3 text-yellow-300" />
                          <span>{slide.badge}</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight max-w-md">
                          {slide.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-sm line-clamp-2 leading-relaxed">
                          {slide.subtitle}
                        </p>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-slate-300">{slide.pricePrefix}</span>
                          <span className="text-2xl sm:text-3xl font-black text-blue-400">
                            {slide.price}
                          </span>
                          <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-slate-200 font-semibold ml-2">
                            {slide.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Link
                            href={slide.link}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all hover:gap-3"
                          >
                            <span>{slide.cta}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href="/offers"
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold text-xs backdrop-blur-xs transition-colors"
                          >
                            <Flame className="w-3.5 h-3.5 text-amber-400" />
                            <span>View All Offers</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Slider Arrows & Dots Controls */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide(
                      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
                    )
                  }
                  className="w-7 h-7 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveSlide(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeSlide === i ? "w-6 bg-blue-500" : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide((prev) => (prev + 1) % heroSlides.length)
                  }
                  className="w-7 h-7 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Right Column: 2 Stacked Feature Promo Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Promo Card 1: PC Builder Highlight */}
            <div className="relative rounded-xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/60 p-5 text-white flex flex-col justify-between shadow-xs group">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded inline-block">
                  Custom Gaming PC
                </span>
                <h3 className="text-lg font-black leading-tight text-white group-hover:text-blue-400 transition-colors">
                  Build Your Dream Gaming Rig
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  Select Processor, Motherboard, GPU & Power with automated compatibility checks.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">EMI Starts From</span>
                  <span className="text-sm font-black text-amber-400">৳ 2,450 / month</span>
                </div>
                <Link
                  href="/shop"
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center gap-1 shadow-md shadow-blue-600/25 transition-all"
                >
                  <span>Start Build</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Promo Card 2: Laptop Mega Deals */}
            <div className="relative rounded-xl overflow-hidden border border-border bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 text-white flex flex-col justify-between shadow-xs group">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded inline-block">
                  Official Warranty
                </span>
                <h3 className="text-lg font-black leading-tight text-white group-hover:text-amber-300 transition-colors">
                  Official Laptop Mega Offer
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  HP, Dell, Lenovo, Acer & Apple MacBooks with free accessories bundle & 2-year warranty.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Up to Cashback</span>
                  <span className="text-sm font-black text-emerald-400">৳ 12,000 Off</span>
                </div>
                <Link
                  href="/category/laptops"
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-white text-xs font-black flex items-center gap-1 transition-all border border-slate-700 hover:border-blue-600"
                >
                  <span>View Laptops</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

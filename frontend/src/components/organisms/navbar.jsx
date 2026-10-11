"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  User,
  Menu,
  Sparkles,
  PhoneCall,
  Laptop,
  Smartphone,
  Headphones,
} from "lucide-react";
import { useAppStore } from "@/store";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { cn } from "@/utils/cn";

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  const cart = useAppStore((state) => state.cart);
  const wishlist = useAppStore((state) => state.wishlist);
  const compare = useAppStore((state) => state.compare);

  const setCartOpen = useAppStore((state) => state.setCartOpen);
  const setWishlistOpen = useAppStore((state) => state.setWishlistOpen);
  const setSearchOpen = useAppStore((state) => state.setSearchOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  const totalCartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Smartphones", href: "/category/smartphone" },
    { label: "Laptops", href: "/category/laptops" },
    { label: "Offers", href: "/offers" },
    { label: "Pre-Order", href: "/pre-order" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top announcement bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 hidden md:flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Free Express Delivery inside Dhaka on orders above ৳3,000</span>
        </div>
        <div className="flex items-center gap-5 text-slate-400">
          <Link href="/offers" className="hover:text-white transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Flash Deals
          </Link>
          <span className="w-px h-3 bg-white/20"></span>
          <span className="flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5 text-blue-400" /> Support: 01900-112233
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          "w-full transition-all duration-300 backdrop-blur-xl border-b border-border/40",
          scrolled
            ? "bg-background/90 shadow-sm py-2.5"
            : "bg-background/70 py-3.5"
        )}
      >
        <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile Menu Button + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-accent text-foreground transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                G
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight leading-none text-foreground">
                  GADGETS<span className="text-primary font-black">BD</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  Premium Tech
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-input/60 hover:bg-accent text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all cursor-pointer"
              aria-label="Search products"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline text-xs font-normal">Search gadgets...</span>
            </button>

            {/* Compare */}
            <Link
              href="/compare"
              className="relative p-2.5 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Compare products"
            >
              <SlidersHorizontal className="h-5 w-5" />
              {compare.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {compare.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              className="relative p-2.5 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[11px] font-black flex items-center justify-center shadow-sm border border-background">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Account / Profile */}
            <Link
              href={user ? "/profile" : "/login"}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors text-sm font-semibold ml-1"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline text-xs font-semibold">
                {user ? (user.name ? user.name.split(" ")[0] : "Account") : "Sign In"}
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

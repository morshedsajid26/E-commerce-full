"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  Repeat,
  LogIn,
  Menu,
  ChevronRight,
  Tag,
  Wrench,
  Monitor,
  X,
} from "lucide-react";
import { useAppStore } from "@/store";
import { useAuth } from "@/context/AuthContext";
import { MEGA_MENU_DATA, SUB_FLYOUT_ITEMS } from "@/data/mega-menu-data";
import { cn } from "@/utils/cn";

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const cart = useAppStore((state) => state.cart);
  const wishlist = useAppStore((state) => state.wishlist);
  const compare = useAppStore((state) => state.compare);

  const setCartOpen = useAppStore((state) => state.setCartOpen);
  const setWishlistOpen = useAppStore((state) => state.setWishlistOpen);
  const setSearchOpen = useAppStore((state) => state.setSearchOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  const totalCartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Categories list matching TechLand BD navigation bar exactly
  const categoryList = [
    "Laptop",
    "Desktop",
    "Components",
    "Accessories",
    "Phone & Tab",
    "Monitor",
    "Networking",
    "Office Equipments",
    "Gadgets",
    "Cameras",
    "TV & Sound",
    "Power",
    "Security",
    "Gaming",
    "Appliance",
    "Software",
    "Servers",
  ];

  const handleMouseEnterCategory = (cat) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredCategory(cat);
    setActiveSubItem(null);
  };

  const handleMouseLeaveCategory = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
      setActiveSubItem(null);
    }, 180);
  };

  const handleMouseEnterDropdown = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const activeMegaData = hoveredCategory ? MEGA_MENU_DATA[hoveredCategory] : null;
  const activeFlyoutItems = activeSubItem ? SUB_FLYOUT_ITEMS[activeSubItem] : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 1. Main Header (Dark Blue/Black #0b1320 as in TechLand BD screenshot) */}
      <div className="w-full bg-[#0b1320] text-white py-2.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-[98%] xl:max-w-[1680px] mx-auto flex items-center justify-between gap-3 lg:gap-6">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* GADGETLAND Logo */}
            <Link href="/" className="flex items-center group">
              <span className="font-black text-2xl sm:text-[26px] tracking-tight text-white flex items-center">
                <span>GADGET</span>
                <span className="font-extrabold text-white">LAND</span>
              </span>
            </Link>
          </div>

          {/* Center: Search Box */}
          <div className="hidden md:flex flex-1 max-w-xl xl:max-w-2xl items-center mx-2">
            <div className="w-full flex items-center bg-white rounded-xs overflow-hidden shadow-xs">
              <input
                type="text"
                placeholder="Type a product, brand or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchOpen(true);
                  }
                }}
                className="w-full h-9.5 px-3.5 text-xs text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-400 font-normal"
              />

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="h-9.5 px-4 bg-[#1b263b] hover:bg-[#25354e] text-white flex items-center justify-center gap-1.5 font-bold text-xs transition-colors shrink-0 cursor-pointer"
                aria-label="Search"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* OFFERS Button */}
            <Link
              href="/offers"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#142033] hover:bg-[#1e2f4a] border border-[#23354f] text-slate-200 text-xs font-semibold transition-colors"
            >
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFERS</span>
            </Link>

            {/* TOOLS Button */}
            <Link
              href="/shop"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#142033] hover:bg-[#1e2f4a] border border-[#23354f] text-slate-200 text-xs font-semibold transition-colors"
            >
              <Wrench className="w-3.5 h-3.5 text-slate-300" />
              <span>TOOLS</span>
            </Link>

            {/* PC BUILDER Button */}
            <Link
              href="/shop"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#142033] hover:bg-[#1e2f4a] border border-[#23354f] text-slate-200 text-xs font-semibold transition-colors"
            >
              <Monitor className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">PC BUILDER</span>
            </Link>

            {/* Compare */}
            <Link
              href="/compare"
              className="relative p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Compare Products"
            >
              <Repeat className="h-4.5 w-4.5" />
              {compare.length > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 h-4 w-4 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                  {compare.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              className="relative p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className="h-4.5 w-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              {totalCartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Login */}
            <Link
              href={user ? "/profile" : "/login"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#142033] hover:bg-[#1e2f4a] border border-[#23354f] text-slate-200 text-xs font-semibold transition-colors ml-1"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-300" />
              <span>{user ? (user.name ? user.name.split(" ")[0] : "Account") : "Login"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. White Category Navigation Bar (Exactly as in user's screenshot) */}
      <nav
        className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs relative hidden lg:block"
        onMouseLeave={handleMouseLeaveCategory}
      >
        <div className="max-w-[98%] xl:max-w-[1680px] mx-auto px-2 flex items-center justify-between">
          <div className="flex items-center flex-wrap">
            {categoryList.map((cat) => {
              const isHovered = hoveredCategory === cat;
              return (
                <div
                  key={cat}
                  onMouseEnter={() => handleMouseEnterCategory(cat)}
                  className="relative"
                >
                  <Link
                    href={`/category/${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    className={cn(
                      "inline-flex items-center px-3 py-2 text-[12.5px] font-semibold transition-all duration-150 whitespace-nowrap border-b-2",
                      isHovered
                        ? "text-[#1d68d8] border-[#1d68d8] font-bold"
                        : "text-slate-800 dark:text-slate-200 border-transparent hover:text-[#1d68d8]"
                    )}
                  >
                    <span>{cat}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Multi-Column Mega Dropdown Panel on Hover (Matching screenshot exactly) */}
        {activeMegaData && (
          <div
            onMouseEnter={handleMouseEnterDropdown}
            onMouseLeave={handleMouseLeaveCategory}
            className="absolute left-4 xl:left-8 top-full z-50 bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 rounded-b-md p-3.5 flex items-start gap-4 animate-in fade-in slide-in-from-top-1 duration-150"
            style={{
              minWidth: "620px",
              maxWidth: "95vw",
            }}
          >
            {/* Columns of Subcategories */}
            <div className="flex items-start divide-x divide-slate-100 dark:divide-slate-800">
              {activeMegaData.columns.map((col, colIdx) => (
                <div key={colIdx} className="min-w-[190px] max-w-[230px] px-3.5 first:pl-1">
                  {col.title && (
                    <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2 px-2">
                      {col.title}
                    </div>
                  )}

                  <ul className="space-y-0.5">
                    {col.items.map((item, itemIdx) => {
                      const isSubActive = activeSubItem === item.label;
                      return (
                        <li
                          key={itemIdx}
                          onMouseEnter={() => {
                            if (item.hasSub) {
                              setActiveSubItem(item.label);
                            } else {
                              setActiveSubItem(null);
                            }
                          }}
                        >
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-between px-2.5 py-1.5 rounded text-[12px] transition-colors group cursor-pointer",
                              isSubActive
                                ? "bg-slate-100 dark:bg-slate-800 text-[#1d68d8] font-bold"
                                : "text-slate-700 dark:text-slate-300 hover:text-[#1d68d8] hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium"
                            )}
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              {item.label}
                            </span>
                            {item.hasSub && (
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1d68d8] shrink-0 ml-1.5" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Optional 4th Flyout Column when hovering an item with '>' */}
            {activeFlyoutItems && (
              <div className="min-w-[210px] pl-3.5 border-l border-slate-100 dark:border-slate-800 animate-in fade-in duration-100">
                <div className="text-[11px] font-black uppercase tracking-wider text-[#1d68d8] mb-2 px-2">
                  {activeSubItem} Options
                </div>
                <ul className="space-y-0.5">
                  {activeFlyoutItems.map((sub, sIdx) => (
                    <li key={sIdx}>
                      <Link
                        href={sub.href}
                        className="flex items-center px-2.5 py-1.5 rounded text-[11.5px] font-medium text-slate-600 dark:text-slate-400 hover:text-[#1d68d8] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span>{sub.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;

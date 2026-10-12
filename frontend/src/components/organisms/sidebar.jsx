"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  User,
  SlidersHorizontal,
  LogOut,
  ChevronDown,
  ChevronRight,
  Monitor,
  Tag,
  Wrench,
  Cpu,
} from "lucide-react";
import { useAppStore } from "@/store";
import { useAuth } from "@/context/AuthContext";
import { MEGA_MENU_DATA } from "@/data/mega-menu-data";
import { cn } from "@/utils/cn";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  const [expandedCat, setExpandedCat] = useState(null);

  if (!isSidebarOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setSidebarOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-background shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-300 border-r border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#0b1320] text-white border-b border-slate-800">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-1.5"
          >
            <span className="font-black text-xl tracking-tight text-white flex items-center">
              <span>GADGET</span>
              <span className="font-extrabold text-white">LAND</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Tools & PC Builder in Mobile Drawer */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-muted/30 border-b border-border text-xs font-bold">
          <Link
            href="/shop"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-red-600 text-white shadow-xs"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>PC Builder</span>
          </Link>
          <Link
            href="/offers"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-[#142033] border border-[#23354f] text-slate-200"
          >
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>Offers</span>
          </Link>
        </div>

        {/* Categories List with Accordion */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[11px] font-bold text-muted-foreground uppercase px-2 mb-1">
            Product Categories
          </div>

          {categoryList.map((cat) => {
            const isExpanded = expandedCat === cat;
            const megaData = MEGA_MENU_DATA[cat];

            return (
              <div key={cat} className="rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/60 transition-colors">
                  <Link
                    href={`/category/${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    onClick={() => setSidebarOpen(false)}
                    className="flex-1"
                  >
                    {cat}
                  </Link>

                  {megaData && (
                    <button
                      type="button"
                      onClick={() => setExpandedCat(isExpanded ? null : cat)}
                      className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {isExpanded && megaData && (
                  <div className="bg-muted/40 px-3 py-2 space-y-1.5 border-l-2 border-red-600 ml-3 my-1">
                    {megaData.columns.flatMap((col) => col.items).slice(0, 8).map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        onClick={() => setSidebarOpen(false)}
                        className="block text-[11px] text-muted-foreground hover:text-red-600 py-0.5"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Account Section */}
        <div className="p-4 border-t border-border bg-muted/30">
          {user ? (
            <div className="space-y-2">
              <Link
                href="/profile"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold bg-background border border-border hover:bg-accent transition-colors"
              >
                <User className="h-4 w-4 text-red-600" />
                <span className="truncate flex-1">{user.name || "My Account"}</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center py-2 px-3 rounded-lg text-xs font-bold border border-input hover:bg-accent transition-colors text-center"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center py-2 px-3 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

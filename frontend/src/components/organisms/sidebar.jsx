"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  ShoppingBag,
  Smartphone,
  Laptop,
  Headphones,
  Sparkles,
  Clock,
  BookOpen,
  User,
  SlidersHorizontal,
  LogOut,
} from "lucide-react";
import { useAppStore } from "@/store";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils/cn";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  if (!isSidebarOpen) return null;

  const links = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop All", href: "/shop", icon: ShoppingBag },
    { label: "Smartphones", href: "/category/smartphone", icon: Smartphone },
    { label: "Laptops & Computers", href: "/category/laptops", icon: Laptop },
    { label: "Audio & Accessories", href: "/category/accessories", icon: Headphones },
    { label: "Offers & Coupons", href: "/offers", icon: Sparkles },
    { label: "Pre-Order", href: "/pre-order", icon: Clock },
    { label: "Compare Specs", href: "/compare", icon: SlidersHorizontal },
    { label: "Blog & Guides", href: "/blog", icon: BookOpen },
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
        <div className="flex items-center justify-between p-5 border-b border-border">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black">
              G
            </div>
            <span className="font-bold text-lg tracking-tight">
              GADGETS<span className="text-primary font-black">BD</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
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
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium bg-background border border-border hover:bg-accent transition-colors"
              >
                <User className="h-4 w-4 text-primary" />
                <span className="truncate flex-1">{user.name || "My Account"}</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
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
                className="flex items-center justify-center py-2.5 px-3 rounded-xl text-sm font-semibold border border-input hover:bg-accent transition-colors text-center"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center py-2.5 px-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center"
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

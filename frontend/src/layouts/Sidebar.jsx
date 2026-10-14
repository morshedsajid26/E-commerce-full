"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ShoppingBag,
  Truck,
  AlertTriangle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  X,
  LogOut,
  Users,
  CreditCard,
  Settings,
  Heart,
  FileText,
  Cpu,
  User,
} from "lucide-react";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { useAuth } from "../context/AuthContext";
import { getPendingOrdersCountAction } from "@/lib/actions/online-admin.actions";

const adminMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ShoppingCart, label: "Sales (POS)", path: "/sales" },
  { icon: ShoppingBag, label: "Online Orders", path: "/online-orders" },
  { icon: Heart, label: "Customer Requests", path: "/customer-requests" },
  { icon: Truck, label: "Purchases", path: "/purchases" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: CreditCard, label: "Due Management", path: "/dues" },
  { icon: AlertTriangle, label: "Low Stock", path: "/low-stock" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
];

const customerMenuItems = [
  { icon: User, label: "Account Overview", path: "/profile" },
  { icon: ShoppingBag, label: "My Orders", path: "/profile/orders" },
  { icon: Settings, label: "Profile Settings", path: "/profile/settings" },
];

export function Sidebar() {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarCollapsed,
    toggleCollapse,
  } = useUI();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const count = await getPendingOrdersCountAction();
        setPendingOrdersCount(count);
      } catch (error) {
        console.error("Sidebar pending orders count error:", error);
      }
    }
    fetchCount();
    const interval = setInterval(fetchCount, 8000); // Check every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ... (Mobile Overlay) */}
      <div
        className={cn(
          "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-[#0b1320] text-slate-300 border-r border-[#1e293b] transition-all duration-300 z-50 flex flex-col pt-4 shadow-2xl lg:translate-x-0",
          isSidebarCollapsed ? "w-20" : "w-64",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="px-5 flex items-center justify-between mb-7 overflow-hidden">
          <Link
            href="/"
            className="flex items-center gap-3 group hover:opacity-90 transition-opacity"
          >
            <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Cpu className="text-white w-5 h-5" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-black text-[17px] text-white tracking-tight leading-none whitespace-nowrap">
                  GADGET<span className="text-blue-500">LAND</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1 truncate">
                  {user?.type === "admin" ? "Admin Control" : "Customer Portal"}
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            className="lg:hidden p-1.5 hover:bg-[#142033] text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto hide-scrollbar">
          {(user?.type === "admin" ? adminMenuItems : customerMenuItems).map(
            (item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/40 font-bold border-l-2 border-white"
                      : "text-slate-300 hover:bg-[#142033] hover:text-white hover:border-[#23354f]",
                  )}
                >
                  <item.icon
                    size={19}
                    className={cn(
                      "shrink-0 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"
                    )}
                  />
                  {!isSidebarCollapsed && (
                    <span className="font-medium text-xs whitespace-nowrap">
                      {item.label}
                    </span>
                  )}

                  {item.path === "/online-orders" && pendingOrdersCount > 0 && (
                    <span className="ml-auto bg-blue-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                      {pendingOrdersCount}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isSidebarCollapsed && (
                    <div className="absolute left-full ml-4 px-2.5 py-1 bg-[#142033] border border-[#23354f] text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            },
          )}
        </nav>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-blue-600 text-white rounded-full items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-[60] border-2 border-[#0b1320] cursor-pointer"
          aria-label="Toggle sidebar"
        >
          {isSidebarCollapsed ? (
            <ChevronRight size={13} />
          ) : (
            <ChevronLeft size={13} />
          )}
        </button>

        {/* Footer / User Status & Back to Store */}
        <div className="p-3.5 mt-auto border-t border-[#1e293b] bg-[#070d17]/50 overflow-hidden space-y-2">
          {/* Back to Store Quick Link */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#142033]/60 hover:bg-[#142033] border border-[#23354f]/60 hover:border-[#23354f] transition-all",
              isSidebarCollapsed && "justify-center px-0"
            )}
            title="Back to Landing Page"
          >
            <ShoppingBag size={15} className="text-blue-400 shrink-0" />
            {!isSidebarCollapsed && <span>Back to Store</span>}
          </Link>

          {/* User Info Bar */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex-shrink-0 border border-blue-400/30 flex items-center justify-center text-white text-xs font-bold overflow-hidden shadow-sm">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0) || "U"
                )}
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate leading-tight">
                    {user?.name || "Member"}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                      Online
                    </span>
                  </div>
                </div>
              )}
            </div>

            {!isSidebarCollapsed && (
              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-[#142033] rounded-lg transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut size={15} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

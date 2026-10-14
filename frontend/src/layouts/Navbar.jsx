"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Settings, Menu, X, LogOut } from "lucide-react";
import { useUI } from "../context/UIContext";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { toggleSidebar, isSidebarOpen } = useUI();
  const { user, logout } = useAuth();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside handler to dismiss dropdown automatically
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Mobile Menu Toggle */}
      <button 
        className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Brand Logo for Mobile */}
      <Link href="/" className="lg:hidden flex items-center gap-2 ml-2">
         <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-600/30">
            <span className="text-white font-black text-xs">GL</span>
         </div>
         <span className="font-black text-base text-slate-900 tracking-tight">
           GADGET<span className="text-blue-600">LAND</span>
         </span>
      </Link>

      {/* spacer to push profile details to the far right */}
      <div className="flex-1"></div>

      {/* Quick Action: Back to Storefront */}
      <Link
        href="/"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200/80 hover:border-blue-200 text-xs font-bold transition-all mr-3"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Storefront</span>
      </Link>

      {/* Profile Dropdown Container */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-end gap-3 pl-2 group focus:outline-none select-none cursor-pointer"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-blue-600 transition-colors">
              {user?.name || "Member"}
            </p>
            <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">
              {user?.role || (user?.type === "admin" ? "Admin" : "Customer")}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs ring-2 ring-transparent group-hover:ring-blue-100 overflow-hidden transition-all cursor-pointer">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              user?.name ? user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "U"
            )}
          </div>
        </button>

        {/* Dropdown Menu Popup */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Account Portal
              </p>
              <p className="text-xs font-bold text-slate-800 truncate mt-0.5">
                {user?.name || "User"}
              </p>
            </div>
            
            <Link 
              href="/profile/settings"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-semibold transition-colors"
            >
              <Settings size={14} className="text-slate-400 group-hover:text-blue-600" />
              <span>Settings</span>
            </Link>

            <Link 
              href="/"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 font-semibold transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Visit Shop</span>
            </Link>
            
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 font-bold transition-colors border-t border-slate-100"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

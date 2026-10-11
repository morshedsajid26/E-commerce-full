"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store";

export function SearchModal() {
  const router = useRouter();
  const isSearchOpen = useAppStore((state) => state.isSearchOpen);
  const setSearchOpen = useAppStore((state) => state.setSearchOpen);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    "iPhone 16 Pro",
    "MacBook Air M3",
    "Samsung Galaxy S24",
    "Sony WH-1000XM5",
    "Apple Watch Series 10",
    "Gaming Laptop",
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  const handleQuickSelect = (term) => {
    setSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setSearchOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-background rounded-2xl shadow-2xl z-10 border border-border p-6 animate-in zoom-in-95 duration-200">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, laptops, audio, accessories..."
            className="w-full h-14 pl-12 pr-12 rounded-xl bg-muted/50 border border-input text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 p-1 rounded-md text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="absolute right-4 p-1 rounded-md text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </form>

        {/* Popular Tags */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span>Trending Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleQuickSelect(term)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer border border-border/40"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Quick Nav */}
        <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-mono">ESC</kbd> to close</span>
          <button
            type="button"
            onClick={() => handleQuickSelect("")}
            className="text-primary hover:underline font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;

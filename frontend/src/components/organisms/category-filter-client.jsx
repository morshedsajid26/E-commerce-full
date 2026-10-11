"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  Search,
  Star,
  ShoppingBag,
  Heart,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { useAppStore } from "@/store";
import toast from "react-hot-toast";

const fallbackProducts = [
  {
    id: "cat-prod-1",
    title: "Flagship Edition Gadget Pro - 256GB",
    price: 98000,
    oldPrice: 108000,
    discount: 9,
    rating: "4.9",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
  },
  {
    id: "cat-prod-2",
    title: "Ultra Performance Studio Device",
    price: 135000,
    oldPrice: 145000,
    discount: 7,
    rating: "4.8",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
  },
  {
    id: "cat-prod-3",
    title: "Next-Gen Tech Companion",
    price: 45000,
    oldPrice: 52000,
    discount: 13,
    rating: "4.7",
    brand: "Sony",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
];

export function CategoryFilterClient({
  initialProducts = [],
  categoryName = "Products",
}) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const addToCart = useAppStore((state) => state.addToCart);
  const wishlist = useAppStore((state) => state.wishlist);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const compare = useAppStore((state) => state.compare);
  const toggleCompare = useAppStore((state) => state.toggleCompare);

  const baseProducts =
    initialProducts && initialProducts.length > 0
      ? initialProducts
      : fallbackProducts;

  const brands = useMemo(() => {
    const list = new Set();
    baseProducts.forEach((p) => {
      if (p.brand) list.add(p.brand);
    });
    return ["all", ...Array.from(list)];
  }, [baseProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    if (selectedBrand !== "all") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    }

    return result;
  }, [baseProducts, search, selectedBrand, sortBy]);

  return (
    <div className="space-y-8">
      {/* Category Title & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {categoryName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Showing {filteredProducts.length} items available with instant delivery
          </p>
        </div>

        {/* Filters and sorting */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:flex-initial min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name..."
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-input bg-card text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 px-3 rounded-xl border border-input bg-card text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Brand Pills */}
      {brands.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Brands:
          </span>
          {brands.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBrand(b)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedBrand === b
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {b === "all" ? "All Brands" : b}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-3xl border border-border/70 p-8">
          <p className="text-lg font-bold text-foreground">No matching products found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your brand or search keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedBrand("all");
              setSortBy("default");
            }}
            className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isCompared = compare.includes(product.id);

            return (
              <div
                key={product.id}
                className="group relative rounded-3xl border border-border/70 bg-card p-4 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-2xl bg-muted/40 overflow-hidden flex items-center justify-center p-6 border border-border/40">
                  {product.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full z-10">
                      -{product.discount}%
                    </span>
                  )}

                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 rounded-xl bg-background/80 backdrop-blur-xs border border-border/60 hover:bg-background text-foreground transition-all cursor-pointer shadow-xs"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? "text-rose-500 fill-rose-500" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCompare(product.id)}
                      className={`p-2 rounded-xl bg-background/80 backdrop-blur-xs border border-border/60 hover:bg-background transition-all cursor-pointer shadow-xs ${
                        isCompared ? "text-blue-500" : "text-muted-foreground"
                      }`}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <Link href={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </Link>
                </div>

                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{product.brand || "Gadget"}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{product.rating || "4.8"}</span>
                      </div>
                    </div>

                    <Link
                      href={`/product/${product.id}`}
                      className="font-bold text-sm text-foreground hover:text-primary transition-colors line-clamp-2"
                    >
                      {product.title}
                    </Link>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                    <div>
                      {product.oldPrice && (
                        <span className="text-xs text-muted-foreground line-through block">
                          ৳ {product.oldPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-base font-extrabold text-foreground">
                        ৳ {(product.price || 0).toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product, 1);
                        toast.success("Added to cart!");
                      }}
                      className="h-10 px-3.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 hover:bg-primary/90 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryFilterClient;

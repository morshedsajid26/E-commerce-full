"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  ArrowRight,
  Check,
} from "lucide-react";
import { useAppStore } from "@/store";
import toast from "react-hot-toast";

// High-quality mock gadgets fallback in case DB is empty
const defaultMockProducts = [
  {
    id: "prod-1",
    title: "iPhone 16 Pro Max - 256GB Desert Titanium",
    price: 172000,
    oldPrice: 185000,
    discount: 7,
    rating: "4.9",
    reviews: 42,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    category: "Smartphone",
    brand: "Apple",
  },
  {
    id: "prod-2",
    title: "Samsung Galaxy S24 Ultra 5G - Titanium Gray",
    price: 154000,
    oldPrice: 168000,
    discount: 8,
    rating: "4.8",
    reviews: 38,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
    category: "Smartphone",
    brand: "Samsung",
  },
  {
    id: "prod-3",
    title: "MacBook Pro 14 M3 Pro - 18GB/512GB Space Black",
    price: 245000,
    oldPrice: 260000,
    discount: 6,
    rating: "5.0",
    reviews: 29,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    category: "Laptops",
    brand: "Apple",
  },
  {
    id: "prod-4",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 36500,
    oldPrice: 42000,
    discount: 13,
    rating: "4.9",
    reviews: 84,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Audio",
    brand: "Sony",
  },
];

export function ProductGridSection({
  title,
  subtitle,
  products = [],
  viewAllLink,
  limit,
}) {
  const displayProducts =
    products && products.length > 0 ? products : defaultMockProducts;
  const itemsToRender = limit ? displayProducts.slice(0, limit) : displayProducts;

  const addToCart = useAppStore((state) => state.addToCart);
  const wishlist = useAppStore((state) => state.wishlist);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const compare = useAppStore((state) => state.compare);
  const toggleCompare = useAppStore((state) => state.toggleCompare);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.title.slice(0, 24)}... added to cart!`);
  };

  const handleToggleWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
    const isSaved = wishlist.includes(productId);
    if (!isSaved) {
      toast.success("Saved to wishlist!");
    } else {
      toast("Removed from wishlist", { icon: "💔" });
    }
  };

  const handleToggleCompare = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(productId);
    const isCompared = compare.includes(productId);
    if (!isCompared) {
      toast.success("Added to comparison list!");
    } else {
      toast("Removed from comparison list");
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="text-sm font-bold text-primary hover:underline flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itemsToRender.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isCompared = compare.includes(product.id);

            return (
              <div
                key={product.id}
                className="group relative rounded-3xl border border-border/70 bg-card p-4 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-square rounded-2xl bg-muted/40 overflow-hidden flex items-center justify-center p-6 border border-border/40">
                  {product.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider z-10 shadow-xs">
                      -{product.discount}%
                    </span>
                  )}

                  {/* Top-right quick actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                    <button
                      type="button"
                      onClick={(e) => handleToggleWishlist(product.id, e)}
                      className="p-2 rounded-xl bg-background/80 backdrop-blur-xs border border-border/60 hover:bg-background text-foreground transition-all cursor-pointer shadow-xs active:scale-90"
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted
                            ? "text-rose-500 fill-rose-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleToggleCompare(product.id, e)}
                      className={`p-2 rounded-xl bg-background/80 backdrop-blur-xs border border-border/60 hover:bg-background transition-all cursor-pointer shadow-xs active:scale-90 ${
                        isCompared ? "text-blue-500" : "text-muted-foreground"
                      }`}
                      aria-label="Compare"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <Link href={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>

                {/* Details */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{product.brand || product.category || "Gadget"}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{product.rating || "4.8"}</span>
                      </div>
                    </div>

                    <Link
                      href={`/product/${product.id}`}
                      className="font-bold text-sm text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
                    >
                      {product.title}
                    </Link>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                    <div>
                      {product.oldPrice && product.oldPrice > product.price && (
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
                      onClick={(e) => handleAddToCart(product, e)}
                      className="h-10 px-3.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 hover:bg-primary/90 transition-all active:scale-95 shadow-xs cursor-pointer"
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
      </div>
    </section>
  );
}

export default ProductGridSection;

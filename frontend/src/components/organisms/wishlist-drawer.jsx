"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store";
import toast from "react-hot-toast";

export function WishlistDrawer() {
  const router = useRouter();
  const isWishlistOpen = useAppStore((state) => state.isWishlistOpen);
  const setWishlistOpen = useAppStore((state) => state.setWishlistOpen);
  const wishlist = useAppStore((state) => state.wishlist);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const addToCart = useAppStore((state) => state.addToCart);

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-background shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300 border-l border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
            <h3 className="font-bold text-lg text-foreground">Your Saved Wishlist</h3>
            <span className="text-xs bg-rose-500/10 text-rose-500 font-bold px-2 py-0.5 rounded-full">
              {wishlist.length} saved
            </span>
          </div>
          <button
            type="button"
            onClick={() => setWishlistOpen(false)}
            className="p-2 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wishlist items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                <Heart className="w-8 h-8 opacity-60" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-lg">No saved gadgets yet</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                  Tap the heart icon on any product to save it for later.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setWishlistOpen(false);
                  router.push("/shop");
                }}
                className="mt-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            wishlist.map((item, index) => {
              // item can be an id or an object
              const isObj = typeof item === "object" && item !== null;
              const product = isObj
                ? item
                : {
                    id: item,
                    title: `Saved Gadget #${item}`,
                    price: 24990,
                    image:
                      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
                  };

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex gap-4 p-3 rounded-2xl border border-border/60 bg-card/60 hover:border-border transition-colors items-center"
                >
                  <div className="w-16 h-16 bg-muted/40 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1.5 border border-border/40">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${product.id}`}
                      onClick={() => setWishlistOpen(false)}
                      className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {product.title}
                    </Link>
                    <p className="text-sm font-bold text-foreground mt-0.5">
                      ৳ {(product.price || 0).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(item);
                        toast.success("Moved to cart!");
                      }}
                      className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      title="Move to Cart"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(item)}
                      className="p-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default WishlistDrawer;

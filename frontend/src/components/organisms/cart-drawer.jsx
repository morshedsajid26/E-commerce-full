"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store";

export function CartDrawer() {
  const router = useRouter();
  const isCartOpen = useAppStore((state) => state.isCartOpen);
  const setCartOpen = useAppStore((state) => state.setCartOpen);
  const cart = useAppStore((state) => state.cart);
  const updateCartQuantity = useAppStore((state) => state.updateCartQuantity);
  const removeFromCart = useAppStore((state) => state.removeFromCart);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-background shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300 border-l border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-lg text-foreground">Your Shopping Cart</h3>
            <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)} items
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="p-2 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-lg">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                  Discover top tech gadgets, smartphones and accessories.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  router.push("/shop");
                }}
                className="mt-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item, index) => {
              const product = item.product || {};
              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex gap-4 p-3 rounded-2xl border border-border/60 bg-card/60 hover:border-border transition-colors"
                >
                  <div className="w-20 h-20 bg-muted/40 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1.5 border border-border/40">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"}
                      alt={product.title || "Product"}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${product.id}`}
                          onClick={() => setCartOpen(false)}
                          className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-1"
                        >
                          {product.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(index)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        ৳ {(product.price || 0).toLocaleString()} each
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-lg bg-background">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(index, item.quantity - 1)}
                          className="p-1 hover:bg-accent text-foreground transition-colors rounded-l-md"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(index, item.quantity + 1)}
                          className="p-1 hover:bg-accent text-foreground transition-colors rounded-r-md"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-foreground">
                        ৳ {((product.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-border bg-card/40 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold text-lg text-foreground">
                ৳ {subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Shipping & taxes calculated at checkout. Free shipping available on orders over ৳3,000.
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  router.push("/checkout");
                }}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="w-full py-2.5 rounded-xl border border-input text-xs font-semibold hover:bg-accent transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;

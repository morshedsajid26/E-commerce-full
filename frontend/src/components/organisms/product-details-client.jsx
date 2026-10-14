"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  Plus,
  Minus,
  Check,
  Share2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/store";
import toast from "react-hot-toast";

export function ProductDetailsClient({ product, relatedProducts = [] }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [activeTab, setActiveTab] = useState("overview");

  const addToCart = useAppStore((state) => state.addToCart);
  const wishlist = useAppStore((state) => state.wishlist);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const compare = useAppStore((state) => state.compare);
  const toggleCompare = useAppStore((state) => state.toggleCompare);

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compare.includes(product.id);

  const galleryImages = [
    product.image,
    ...(product.gallery || []),
  ].filter(Boolean);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-muted-foreground gap-2 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-primary transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/category/${product.category?.toLowerCase() || "smartphone"}`}
          className="hover:text-primary transition-colors"
        >
          {product.category || "Gadget"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-semibold truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-3xl bg-white dark:bg-card border border-border/80 p-8 flex items-center justify-center overflow-hidden shadow-sm relative group">
            <img
              src={selectedImage || product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl bg-card border p-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                    (selectedImage || product.image) === img
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border/60 hover:border-border"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specs & Buy Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                {product.brand || "Official"}
              </span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>{product.rating || "4.8"}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {product.reviews || 24} customer ratings
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-5 rounded-2xl bg-card border border-border/70 flex items-baseline gap-4">
            <span className="text-3xl sm:text-4xl font-black text-foreground">
              ৳ {(product.price || 0).toLocaleString()}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                ৳ {product.oldPrice.toLocaleString()}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-600 text-white uppercase">
                Save {product.discount}%
              </span>
            )}
          </div>

          {/* Description highlight */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description ||
              "Authentic premium hardware with genuine manufacturer package and seal. Engineered for industry-standard reliability."}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-4 border-t border-border/60">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-xl bg-card">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 hover:bg-accent text-foreground transition-colors rounded-l-xl cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 text-sm font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 hover:bg-accent text-foreground transition-colors rounded-r-xl cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="h-13 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="h-13 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Buy It Now</span>
              </button>
            </div>

            {/* Wishlist & Compare Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  toggleWishlist(product.id);
                  toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist!");
                }}
                className={`flex-1 h-11 rounded-xl border border-input text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isWishlisted
                    ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
                <span>{isWishlisted ? "In Wishlist" : "Save to Wishlist"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleCompare(product.id);
                  toast(isCompared ? "Removed from compare" : "Added to comparison!");
                }}
                className={`flex-1 h-11 rounded-xl border border-input text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isCompared
                    ? "bg-blue-500/10 text-blue-500 border-blue-500/30"
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{isCompared ? "In Compare List" : "Add to Compare"}</span>
              </button>
            </div>
          </div>

          {/* Delivery & Warranty Guarantees */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-muted/40 border border-border/60 text-center">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 mx-auto text-primary" />
              <p className="text-xs font-bold text-foreground">
                {product.warranty || "1 Year Warranty"}
              </p>
              <p className="text-[10px] text-muted-foreground">Official support</p>
            </div>
            <div className="space-y-1 border-x border-border/60 px-2">
              <Truck className="w-5 h-5 mx-auto text-emerald-500" />
              <p className="text-xs font-bold text-foreground">Fast Delivery</p>
              <p className="text-[10px] text-muted-foreground">24-48 Hours</p>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-5 h-5 mx-auto text-amber-500" />
              <p className="text-xs font-bold text-foreground">7-Day Return</p>
              <p className="text-[10px] text-muted-foreground">Replacement policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Reviews */}
      <div className="pt-8 border-t border-border/60">
        <div className="flex gap-4 border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "overview"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("delivery")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "delivery"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Delivery & Returns
          </button>
        </div>

        <div className="py-6">
          {activeTab === "overview" && (
            <div className="max-w-2xl divide-y divide-border/60 text-sm">
              <div className="py-3 flex justify-between">
                <span className="text-muted-foreground font-medium">Brand</span>
                <span className="font-bold text-foreground">{product.brand || "Genuine OEM"}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-muted-foreground font-medium">Category</span>
                <span className="font-bold text-foreground">{product.category || "Electronics"}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-muted-foreground font-medium">Stock Status</span>
                <span className="font-bold text-emerald-600">Available ({product.stock || 25} units)</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-muted-foreground font-medium">Official Warranty</span>
                <span className="font-bold text-foreground">{product.warranty || "12 Months Official"}</span>
              </div>
            </div>
          )}

          {activeTab === "delivery" && (
            <div className="space-y-3 text-sm text-muted-foreground max-w-2xl leading-relaxed">
              <p>
                <strong>Inside Dhaka:</strong> Delivery within 12 to 24 hours. Express home delivery available via our personal courier fleet.
              </p>
              <p>
                <strong>Outside Dhaka:</strong> 24 to 48 hours delivery via SA Paribahan, Sundarban Courier, or Pathao with full shipment tracking.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-border/60 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/product/${rel.id}`}
                className="p-3 rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all flex flex-col justify-between group"
              >
                <div className="aspect-square rounded-xl bg-muted/40 p-3 flex items-center justify-center">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="mt-2">
                  <h4 className="text-xs font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs font-bold text-foreground mt-1">
                    ৳ {(rel.price || 0).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsClient;

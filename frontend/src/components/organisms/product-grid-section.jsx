"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useAppStore } from "@/store";
import toast from "react-hot-toast";

// Reliable fallback hardware products for TechLand BD
const defaultHardwareProducts = [
  {
    id: "hw-1",
    title: "ASUS ROG Strix GeForce RTX 4080 Super OC Edition 16GB",
    specs: ["16GB GDDR6X 256-bit", "Boost Clock: 2670 MHz", "PCIe 4.0, Axial-tech Fans", "Aura Sync RGB"],
    price: 168000,
    oldPrice: 178000,
    discount: 6,
    rating: "4.9",
    category: "Components",
    brand: "ASUS",
    inStock: true,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
  },
  {
    id: "hw-2",
    title: "Intel Core i9-14900K 14th Gen Desktop Processor",
    specs: ["24 Cores (8P + 16E), 32 Threads", "Up to 6.0 GHz Max Turbo", "36MB Intel Smart Cache", "LGA1700 Socket"],
    price: 66500,
    oldPrice: 72000,
    discount: 8,
    rating: "4.8",
    category: "Components",
    brand: "Intel",
    inStock: true,
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80",
  },
  {
    id: "hw-3",
    title: "Dell UltraSharp U3224KB 32\" 6K UHD IPS Black Monitor",
    specs: ["6144 x 3456 at 60Hz", "IPS Black Technology", "Built-in 4K Webcam & Mic", "Thunderbolt 4 140W PD"],
    price: 325000,
    oldPrice: 345000,
    discount: 6,
    rating: "5.0",
    category: "Monitors",
    brand: "Dell",
    inStock: true,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
  },
  {
    id: "hw-4",
    title: "Apple MacBook Pro 16\" M3 Max (36GB / 1TB SSD) Space Black",
    specs: ["Apple M3 Max 14-core CPU", "30-core GPU, 16-core Neural Engine", "36GB Unified Memory", "16.2\" Liquid Retina XDR"],
    price: 415000,
    oldPrice: 435000,
    discount: 5,
    rating: "4.9",
    category: "Laptops",
    brand: "Apple",
    inStock: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
  },
  {
    id: "hw-5",
    title: "Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD with Heatsink",
    specs: ["Read up to 7450 MB/s", "Write up to 6900 MB/s", "Samsung In-House Controller", "PS5 & PC Compatible"],
    price: 24500,
    oldPrice: 27500,
    discount: 11,
    rating: "4.9",
    category: "Components",
    brand: "Samsung",
    inStock: true,
    image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=800&q=80",
  },
  {
    id: "hw-6",
    title: "Gigabyte Z790 AORUS ELITE AX DDR5 Motherboard",
    specs: ["Supports 14th/13th/12th Gen Intel", "Twin 16+1+2 Phases VRM", "4x PCIe 4.0 M.2 Connectors", "Wi-Fi 6E & 2.5GbE LAN"],
    price: 34500,
    oldPrice: 38000,
    discount: 9,
    rating: "4.7",
    category: "Components",
    brand: "Gigabyte",
    inStock: true,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    id: "hw-7",
    title: "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30",
    specs: ["Optimized for AMD EXPO & Intel XMP", "Dynamic Ten-Zone RGB Lighting", "Onboard Voltage Regulation", "Custom Performance PCB"],
    price: 15500,
    oldPrice: 17500,
    discount: 11,
    rating: "4.8",
    category: "Components",
    brand: "Corsair",
    inStock: true,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80",
  },
  {
    id: "hw-8",
    title: "Razer Blade 16 Gaming Laptop (Core i9 14th Gen / RTX 4080)",
    specs: ["Intel Core i9-14900HX", "NVIDIA RTX 4080 12GB (175W TGP)", "32GB DDR5 5600MHz", "Dual-Mode Mini-LED 4K/FHD"],
    price: 385000,
    oldPrice: 410000,
    discount: 6,
    rating: "4.9",
    category: "Laptops",
    brand: "Razer",
    inStock: true,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
  },
];

export function ProductGridSection({
  title,
  subtitle,
  products = [],
  viewAllLink = "/shop",
  limit = 8,
  tabs = [],
}) {
  const [activeTab, setActiveTab] = useState(tabs[0] || null);

  const displayProducts =
    products && products.length > 0 ? products : defaultHardwareProducts;

  const filteredProducts = activeTab
    ? displayProducts.filter(
        (p) =>
          p.category?.toLowerCase() === activeTab.toLowerCase() ||
          p.brand?.toLowerCase() === activeTab.toLowerCase() ||
          activeTab === "All"
      )
    : displayProducts;

  const itemsToRender = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts;

  const addToCart = useAppStore((state) => state.addToCart);
  const wishlist = useAppStore((state) => state.wishlist);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const compare = useAppStore((state) => state.compare);
  const toggleCompare = useAppStore((state) => state.toggleCompare);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.title.slice(0, 22)}... added to cart!`);
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
    <section className="py-8 bg-background">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Section Header with Techland BD Style */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-red-600 rounded-xs" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter Tabs if provided */}
            {tabs.length > 0 && (
              <div className="hidden md:flex items-center gap-1 bg-muted p-1 rounded-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      activeTab === tab
                        ? "bg-red-600 text-white shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {itemsToRender.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isCompared = compare.includes(product.id);
            const discountPercent =
              product.discount ||
              (product.oldPrice
                ? Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) * 100
                  )
                : 0);

            return (
              <div
                key={product.id}
                className="group rounded-xl border border-border bg-card p-4 hover:border-red-500/80 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Badges & Actions */}
                <div className="flex items-center justify-between gap-2 z-10">
                  {discountPercent > 0 ? (
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase">
                      Save {discountPercent}%
                    </span>
                  ) : (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> In Stock
                    </span>
                  )}

                  <div className="flex items-center gap-1">
                    {/* Compare */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleCompare(product.id, e)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isCompared
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-muted text-muted-foreground border-border hover:text-foreground hover:border-red-400"
                      }`}
                      title="Compare"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </button>

                    {/* Wishlist */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleWishlist(product.id, e)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isWishlisted
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-muted text-muted-foreground border-border hover:text-foreground hover:border-red-400"
                      }`}
                      title="Wishlist"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Product Thumbnail */}
                <Link
                  href={`/product/${product.id}`}
                  className="aspect-4/3 rounded-lg overflow-hidden bg-white dark:bg-muted/30 p-3 my-2 flex items-center justify-center relative"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Brand & Title */}
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-wider block">
                      {product.brand || product.category}
                    </span>

                    <Link
                      href={`/product/${product.id}`}
                      className="font-bold text-xs sm:text-sm text-foreground line-clamp-2 group-hover:text-red-600 transition-colors leading-snug"
                    >
                      {product.title}
                    </Link>

                    {/* Spec Bullet points (TechLand BD signature feature) */}
                    <ul className="mt-2 space-y-1 text-[11px] text-muted-foreground">
                      {(product.specs || [
                        "100% Genuine BD Warranty",
                        "High Performance Component",
                        "Cash on Delivery Available",
                      ])
                        .slice(0, 3)
                        .map((spec, i) => (
                          <li key={i} className="flex items-center gap-1.5 line-clamp-1">
                            <span className="w-1 h-1 rounded-full bg-red-600 shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Dual Pricing & Add to Cart button */}
                  <div className="pt-3 flex items-baseline justify-between border-t border-border mt-3">
                    <div>
                      {product.oldPrice && (
                        <span className="text-[10px] text-muted-foreground block line-through">
                          ৳ {product.oldPrice?.toLocaleString()}
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-black text-red-600">
                        ৳ {product.price?.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(product, e)}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy Now</span>
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

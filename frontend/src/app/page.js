import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import { DUMMY_PRODUCTS } from "@/data/dummy/homepage-data";

import { Navbar } from "@/components/organisms/navbar";
import { Sidebar } from "@/components/organisms/sidebar";
import { CartDrawer } from "@/components/organisms/cart-drawer";
import { WishlistDrawer } from "@/components/organisms/wishlist-drawer";
import { SearchModal } from "@/components/organisms/search-modal";
import { BackToTop } from "@/components/molecules/back-to-top";
import { TickerNotice } from "@/components/organisms/ticker-notice";
import { HeroSection } from "@/components/organisms/hero/hero-section";
import { QuickServices } from "@/components/organisms/quick-services";
import { FeaturedCategories } from "@/components/organisms/featured-categories";
import { FlashSale } from "@/components/organisms/flash-sale";
import { ProductGridSection } from "@/components/organisms/product-grid-section";
import { PcBuilderBanner } from "@/components/organisms/pc-builder-banner";
import { BrandShowcase } from "@/components/organisms/brand-showcase";

const WhyChooseUs = dynamic(
  () =>
    import("@/components/organisms/why-choose-us").then(
      (mod) => mod.WhyChooseUs
    ),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/components/organisms/footer").then((mod) => mod.Footer),
  { ssr: true }
);

export default async function Home() {
  let dbProducts = [];
  try {
    dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  } catch (error) {
    // Graceful fallback to dummy hardware inventory
    dbProducts = [];
  }

  const mappedDbProducts = (dbProducts || []).map((p) => ({
    id: p.id,
    title: p.name,
    description: `${p.category} product from ${p.company}`,
    price: p.sellingPrice,
    oldPrice: Math.round(p.sellingPrice * 1.08),
    discount: p.discount || 8,
    rating: "4.8",
    reviews: 24,
    image:
      p.image ||
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
    category: p.category,
    brand: p.brand || p.company,
    inStock: (p.stock ?? 10) > 0,
    stock: p.stock ?? 10,
    specs: [
      "100% Genuine BD Warranty",
      "High Speed Performance",
      "Official Distributor Unit",
    ],
  }));

  // Combine with rich dummy data if DB has few or no records
  const allProducts =
    mappedDbProducts.length > 5 ? mappedDbProducts : DUMMY_PRODUCTS;

  // Curated collections
  const laptopProducts = allProducts.filter(
    (p) =>
      p.category?.toLowerCase() === "laptops" ||
      p.category?.toLowerCase() === "laptop" ||
      p.title?.toLowerCase().includes("macbook") ||
      p.title?.toLowerCase().includes("razer blade")
  );

  const componentProducts = allProducts.filter(
    (p) =>
      p.category?.toLowerCase() === "components" ||
      p.category?.toLowerCase() === "storage" ||
      p.title?.toLowerCase().includes("rtx") ||
      p.title?.toLowerCase().includes("ssd") ||
      p.title?.toLowerCase().includes("ddr5")
  );

  const monitorProducts = allProducts.filter(
    (p) =>
      p.category?.toLowerCase() === "monitors" ||
      p.title?.toLowerCase().includes("monitor")
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 dark:bg-background">
      <Navbar />

      {/* Overlays */}
      <Sidebar />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <BackToTop />

      {/* Main Page Content - accounting for top fixed header height */}
      <main className="flex-1 pt-14 sm:pt-16 lg:pt-24">
        {/* Gadget Land BD News Ticker / Marquee Updates */}
        <TickerNotice />

        {/* Gadget Land BD 3-Column Hero Section */}
        <HeroSection />

        {/* 5 Quick Utility Feature Boxes */}
        <QuickServices />

        {/* Featured Hardware Categories Grid */}
        <FeaturedCategories />

        {/* Gadget Land BD Deal of the Day / Flash Sale */}
        <FlashSale products={allProducts.slice(0, 4)} />

        {/* Curated Product Section 1: PC Components & Hardware */}
        <ProductGridSection
          title="PC Hardware & Components"
          subtitle="Processors, Graphics Cards, Motherboards, RAM & NVMe SSDs with official warranty."
          products={componentProducts.length > 0 ? componentProducts : allProducts}
          viewAllLink="/category/components"
          tabs={["All", "Components", "Storage"]}
          limit={8}
        />

        {/* PC Builder Custom Rig Promo Banner */}
        <PcBuilderBanner />

        {/* Curated Product Section 2: Top Laptops & Notebooks */}
        <ProductGridSection
          title="Top Selling Laptops & MacBooks"
          subtitle="Gaming beasts, ultraportables and creator workstations from ASUS ROG, Lenovo, HP & Apple."
          products={laptopProducts.length > 0 ? laptopProducts : allProducts}
          viewAllLink="/category/laptops"
          tabs={["All", "Laptops"]}
          limit={8}
        />

        {/* Curated Product Section 3: High Refresh Rate Gaming Monitors */}
        <ProductGridSection
          title="High-End Monitors & Displays"
          subtitle="144Hz - 360Hz Esports monitors, 4K UHD color accurate screens & curved OLED panels."
          products={monitorProducts.length > 0 ? monitorProducts : allProducts}
          viewAllLink="/category/monitors"
          limit={4}
        />

        {/* Authorized Brands Carousel/Grid */}
        <BrandShowcase />

        {/* Why Choose Gadget Land BD + SEO Guide Box */}
        <WhyChooseUs />

        {/* Comprehensive Gadget Land BD Footer */}
        <Footer />
      </main>
    </div>
  );
}

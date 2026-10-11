"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/5 pt-16 pb-12 mt-auto">
      <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Prop Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Express Shipping</h4>
              <p className="text-xs text-slate-400 mt-0.5">Fast delivery all over Bangladesh</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Authentic</h4>
              <p className="text-xs text-slate-400 mt-0.5">Official manufacturer warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">7 Days Return</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free replacement policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Expert Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Dedicated gadget specialists</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-lg">
                G
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                GADGETS<span className="text-blue-500 font-black">BD</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Bangladesh's most trusted online store for premium authentic gadgets, smartphones, laptops, audio systems, and smart accessories.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Level 4, Jamuna Future Park, Kuril, Dhaka-1229</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+880 1900-112233 (10 AM - 10 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>support@gadgetsbd.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Shop Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/category/smartphone" className="hover:text-white transition-colors">Smartphones</Link></li>
              <li><Link href="/category/laptops" className="hover:text-white transition-colors">Laptops & PCs</Link></li>
              <li><Link href="/category/smartwatches" className="hover:text-white transition-colors">Smartwatches</Link></li>
              <li><Link href="/category/audio" className="hover:text-white transition-colors">Headphones & Speakers</Link></li>
              <li><Link href="/category/accessories" className="hover:text-white transition-colors">Chargers & Cables</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/profile" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/pre-order" className="hover:text-white transition-colors">Pre-Order Items</Link></li>
              <li><Link href="/offers" className="hover:text-white transition-colors">Offers & Coupons</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare Products</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Tech Reviews & Blog</Link></li>
            </ul>
          </div>

          {/* Trust & Policy */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Policies & Social</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/checkout" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/checkout" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/checkout" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors text-slate-400">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors text-slate-400">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors text-slate-400">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} GADGETS BD Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <span>Bkash</span>
            <span>•</span>
            <span>Nagad</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

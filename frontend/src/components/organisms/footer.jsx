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
  Cpu,
  CreditCard,
  Clock,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/10 pt-12 pb-8 mt-auto">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info & Support */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-blue-600/30">
                G
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="font-black text-2xl tracking-tighter text-white">
                    GADGETLAND
                  </span>
                  <span className="text-blue-500 font-black text-2xl tracking-tight ml-0.5">
                    BD
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold -mt-1">
                  Leading Computer & Gaming PC Store
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Gadget Land BD is the premier destination for authentic computer hardware, laptops, PC components, and high-performance gaming rigs in Bangladesh.
            </p>

            {/* Helpline and Hours */}
            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="font-bold text-white">Hotline: 01708-454850, 09604-454850</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Open: 10:00 AM - 8:00 PM (Everyday)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@gadgetlandbd.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Showroom Outlets */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" /> Showroom Outlets
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <strong className="text-slate-200 block">Multiplan Branch:</strong>
                Level 4 & 5, Multiplan Center, New Elephant Road, Dhaka.
              </li>
              <li>
                <strong className="text-slate-200 block">IDB Bhaban Branch:</strong>
                Shop #SR-4, BCS Computer City, Agargaon, Dhaka.
              </li>
              <li>
                <strong className="text-slate-200 block">Uttara Branch:</strong>
                House #24, Road #2, Sector #3, Uttara, Dhaka.
              </li>
              <li>
                <strong className="text-slate-200 block">Chattogram Branch:</strong>
                Agrabad Commercial Area, Chattogram.
              </li>
            </ul>
          </div>

          {/* Quick Links & Tools */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-3.5">
              PC Tools & Shop
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/shop" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-blue-500" />
                  <span>Online PC Builder</span>
                </Link>
              </li>
              <li>
                <Link href="/category/laptops" className="hover:text-blue-400 transition-colors">
                  Laptop & Notebooks
                </Link>
              </li>
              <li>
                <Link href="/category/components" className="hover:text-blue-400 transition-colors">
                  Desktop Components
                </Link>
              </li>
              <li>
                <Link href="/category/monitors" className="hover:text-blue-400 transition-colors">
                  Gaming Monitors
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-blue-400 transition-colors">
                  Special Offer Deals
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-blue-400 transition-colors">
                  Pre-Built Gaming PC
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-3.5">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/shop" className="hover:text-blue-400 transition-colors">
                  Official Warranty Policy
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-blue-400 transition-colors">
                  0% EMI Facilities
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-blue-400 transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-blue-400 transition-colors">
                  Return & Refund Terms
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  Tech News & Reviews
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-blue-400 transition-colors">
                  Corporate Sales Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Accepted Payment Methods & Security */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <CreditCard className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-slate-200">Payment Methods Accepted:</span>
            <span className="text-slate-400">bKash | Nagad | Rocket | Visa | MasterCard | AMEX | COD</span>
          </div>
          <div className="text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Secure Checkout with 256-Bit SSL Encryption</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Gadget Land BD. All Rights Reserved. Computer & IT Shop in Bangladesh.</p>
          <div className="flex gap-4">
            <Link href="/shop" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/shop" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/shop" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

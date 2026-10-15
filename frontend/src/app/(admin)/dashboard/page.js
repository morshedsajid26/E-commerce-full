"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Package,
  AlertTriangle,
  CreditCard,
  PlusCircle,
  Clock,
  Printer,
  Eye,
  CheckCircle2,
  RefreshCw,
  Search,
  ArrowUpRight,
  User,
  Phone,
  Layers,
  Sparkles,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAdminStore } from "@/store/adminStore";
import { Modal } from "@/components/Modal";
import { PrintInvoice } from "@/components/PrintInvoice";
import toast from "react-hot-toast";

const CATEGORY_COLORS = ["#2563eb", "#06b6d4", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

export default function AdminDashboardPage() {
  const {
    products,
    suppliers,
    purchases,
    sales,
    onlineOrders,
    customers,
    getStats,
    getChartData,
    recordSale,
    recordPurchase,
    addProduct,
    updateOrderStatus,
    adjustProductStock,
  } = useAdminStore();

  const [activeChartRange, setActiveChartRange] = useState("month");
  const [activeTab, setActiveTab] = useState("sales");

  // Modals state
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // New Sale Form State
  const [saleForm, setSaleForm] = useState({
    customerName: "Walk-in Customer",
    customerPhone: "",
    productId: products[0]?.id || "",
    quantity: 1,
    unitPrice: products[0]?.sellingPrice || 0,
    discount: 0,
    paidAmount: "",
    paymentMethod: "Cash",
  });

  // New Purchase Form State
  const [purchaseForm, setPurchaseForm] = useState({
    supplierId: suppliers[0]?.id || "",
    supplierName: suppliers[0]?.name || "",
    invoiceRef: "",
    productId: products[0]?.id || "",
    quantity: 10,
    unitCost: products[0]?.buyingPrice || 0,
    paidAmount: "",
  });

  // New Product Form State
  const [productForm, setProductForm] = useState({
    title: "",
    brand: "",
    category: "Components",
    buyingPrice: "",
    sellingPrice: "",
    stock: 10,
    minStockAlert: 5,
  });

  const stats = useMemo(() => getStats(), [sales, purchases, products, onlineOrders, customers]);
  const chartData = useMemo(() => getChartData(activeChartRange), [activeChartRange, sales, purchases]);

  // Category breakdown for gadgets
  const categoryStats = useMemo(() => {
    const cats = {};
    products.forEach((p) => {
      const c = p.category || "Other";
      cats[c] = (cats[c] || 0) + (p.stock * p.sellingPrice);
    });
    return Object.entries(cats).map(([name, value], idx) => ({
      name,
      value,
      color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
    }));
  }, [products]);

  // Handle Quick POS Sale
  const handleCreateSale = (e) => {
    e.preventDefault();
    const product = products.find((p) => p.id === saleForm.productId);
    if (!product) {
      toast.error("Please select a valid product");
      return;
    }
    if (product.stock < Number(saleForm.quantity)) {
      toast.error(`Insufficient stock! Only ${product.stock} units available.`);
      return;
    }

    const subtotal = Number(saleForm.quantity) * Number(saleForm.unitPrice);
    const totalAmount = Math.max(0, subtotal - Number(saleForm.discount || 0));
    const paidAmount = saleForm.paidAmount === "" ? totalAmount : Number(saleForm.paidAmount);

    const sale = recordSale({
      customerName: saleForm.customerName || "Walk-in Customer",
      customerPhone: saleForm.customerPhone || "N/A",
      items: [
        {
          product: { id: product.id, name: product.title, category: product.category },
          quantity: Number(saleForm.quantity),
          unitPrice: Number(saleForm.unitPrice),
          costPrice: product.buyingPrice,
          totalPrice: subtotal,
        },
      ],
      discount: Number(saleForm.discount || 0),
      paidAmount,
      paymentMethod: saleForm.paymentMethod,
    });

    toast.success(`Sale recorded! Invoice: ${sale.invoiceNo}`);
    setIsSaleModalOpen(false);
    setSelectedInvoice(sale); // open receipt preview
  };

  // Handle Inward Purchase
  const handleCreatePurchase = (e) => {
    e.preventDefault();
    const product = products.find((p) => p.id === purchaseForm.productId);
    const supplier = suppliers.find((s) => s.id === purchaseForm.supplierId);

    const totalCost = Number(purchaseForm.quantity) * Number(purchaseForm.unitCost);
    const paidAmount = purchaseForm.paidAmount === "" ? totalCost : Number(purchaseForm.paidAmount);

    recordPurchase({
      supplierId: supplier?.id,
      supplierName: supplier?.name || "Direct Distributor",
      invoiceRef: purchaseForm.invoiceRef || `PO-${Date.now().toString().slice(-5)}`,
      productId: product?.id,
      quantity: Number(purchaseForm.quantity),
      itemsSummary: product ? `${product.title} (${purchaseForm.quantity}x)` : "Hardware Restock",
      itemsCount: Number(purchaseForm.quantity),
      totalCost,
      paidAmount,
    });

    toast.success("Inward purchase & stock inventory successfully recorded!");
    setIsPurchaseModalOpen(false);
  };

  // Handle Add Product
  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.sellingPrice) {
      toast.error("Title and selling price are required");
      return;
    }

    addProduct({
      title: productForm.title,
      brand: productForm.brand || "Generic",
      category: productForm.category,
      buyingPrice: Number(productForm.buyingPrice || 0),
      sellingPrice: Number(productForm.sellingPrice),
      stock: Number(productForm.stock || 0),
      minStockAlert: Number(productForm.minStockAlert || 5),
    });

    toast.success("New product added to inventory!");
    setIsProductModalOpen(false);
    setProductForm({
      title: "",
      brand: "",
      category: "Components",
      buyingPrice: "",
      sellingPrice: "",
      stock: 10,
      minStockAlert: 5,
    });
  };

  // Format BDT currency
  const fmt = (val) => `৳ ${Number(val || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Executive Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Business Cockpit
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              GadgetLand <span className="text-blue-400">Control Center</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Complete owner executive dashboard for sales, stock purchases, online orders, cash flow & profit monitoring.
            </p>
          </div>

          {/* Quick Action Button Hub */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsSaleModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <ShoppingCart size={16} />
              <span>New POS Sale</span>
            </button>

            <button
              onClick={() => setIsPurchaseModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Truck size={16} className="text-blue-400" />
              <span>Record Purchase</span>
            </button>

            <button
              onClick={() => setIsProductModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer"
            >
              <PlusCircle size={16} className="text-emerald-400" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Executive KPI Metric Cards (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Metric 1: Total Sales */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Sales</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp size={18} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900 mt-2 truncate">{fmt(stats.totalSales)}</h3>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">Today:</span> {fmt(stats.todaySales)}
          </p>
        </div>

        {/* Metric 2: Total Purchases */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Purchases (Cost)</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Truck size={18} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900 mt-2 truncate">{fmt(stats.totalPurchases)}</h3>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-indigo-600 font-bold">This Month:</span> {fmt(stats.todayPurchases || stats.totalPurchases * 0.3)}
          </p>
        </div>

        {/* Metric 3: Net Gross Profit */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Gross Profit</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign size={18} />
            </div>
          </div>
          <h3 className="text-xl font-black text-emerald-600 mt-2 truncate">{fmt(stats.totalProfit)}</h3>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">
            Margin: {stats.profitMargin}%
          </p>
        </div>

        {/* Metric 4: Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag size={18} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900 mt-2">{stats.totalOrdersCount}</h3>
          <p className="text-[11px] text-amber-600 font-bold mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            {stats.pendingOrdersCount} Pending Online
          </p>
        </div>

        {/* Metric 5: Customer Dues */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Customer Dues</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CreditCard size={18} />
            </div>
          </div>
          <h3 className="text-xl font-black text-rose-600 mt-2 truncate">{fmt(stats.totalCustomerDues)}</h3>
          <p className="text-[11px] text-slate-500 mt-1">To be collected</p>
        </div>

        {/* Metric 6: Low Stock Items */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Low Stock Alert</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle size={18} />
            </div>
          </div>
          <h3 className="text-xl font-black text-red-600 mt-2">{stats.lowStockCount} Items</h3>
          <p className="text-[11px] text-slate-500 mt-1">Below min stock (5)</p>
        </div>
      </div>

      {/* 3. Analytics Charts Section (Sales vs Purchase comparison & Category breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Sales vs Purchases vs Profit */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">Sales & Purchase Financials</h2>
              <p className="text-xs text-slate-400 mt-0.5">Comparative revenue, purchase expenditure and gross profit</p>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl self-start sm:self-auto">
              {["day", "month", "year"].map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveChartRange(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    activeChartRange === r
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {r === "day" ? "Today" : r === "month" ? "Monthly" : "Yearly"}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value, name) => [`৳ ${Number(value).toLocaleString()}`, name === "sales" ? "Sales" : name === "purchase" ? "Purchase" : "Profit"]}
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                />
                <Bar dataKey="sales" fill="#2563eb" radius={[6, 6, 0, 0]} name="sales" />
                <Bar dataKey="purchase" fill="#94a3b8" radius={[6, 6, 0, 0]} name="purchase" />
                <Bar dataKey="profit" fill="#10b981" radius={[6, 6, 0, 0]} name="profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 text-xs font-semibold text-slate-500 border-t border-slate-100 mt-auto">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-600" />
              <span>Sales Revenue</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-400" />
              <span>Purchase Expense</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span>Gross Profit</span>
            </span>
          </div>
        </div>

        {/* Side Chart: Category Stock Value Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900 tracking-tight">Stock Asset Valuation</h2>
            <p className="text-xs text-slate-400 mt-0.5">Inventory value distribution by hardware category</p>
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`৳ ${Number(value).toLocaleString()}`, "Valuation"]}
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "10px", border: "none", color: "#fff", fontSize: "11px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-auto pt-3 border-t border-slate-100">
            {categoryStats.slice(0, 4).map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span className="font-bold text-slate-900">{fmt(cat.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Core Operational Tables Section: Recent Sales vs Recent Purchases */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Card: Recent Sales Invoices */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ShoppingCart size={18} className="text-blue-600" />
                Recent Sales & POS Invoices
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Live store & counter transactions</p>
            </div>
            <Link
              href="/sales"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Invoice</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {sales.slice(0, 5).map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3 font-mono font-bold text-slate-800">{sale.invoiceNo}</td>
                    <td className="py-3">
                      <p className="font-bold text-slate-900 leading-tight">{sale.customerName}</p>
                      <p className="text-[10px] text-slate-400">{sale.customerPhone || "In-store counter"}</p>
                    </td>
                    <td className="py-3">
                      <p className="font-black text-slate-900">{fmt(sale.totalAmount)}</p>
                      {sale.dueAmount > 0 && (
                        <span className="text-[10px] text-rose-600 font-bold">Due: {fmt(sale.dueAmount)}</span>
                      )}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {sale.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setSelectedInvoice(sale)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                        title="Print / View Receipt"
                      >
                        <Printer size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Card: Recent Inward Purchases */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Truck size={18} className="text-indigo-600" />
                Recent Inward Purchases (Supplier Orders)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Supplier stock intake & procurement history</p>
            </div>
            <Link
              href="/purchases"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">PO Number</th>
                  <th className="pb-3">Supplier Distributor</th>
                  <th className="pb-3">Items Summary</th>
                  <th className="pb-3">Cost</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {purchases.slice(0, 5).map((po) => (
                  <tr key={po.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 font-mono font-bold text-slate-800">{po.id}</td>
                    <td className="py-3 font-semibold text-slate-900 leading-tight">
                      {po.supplierName}
                    </td>
                    <td className="py-3 text-slate-500 text-[11px] max-w-[160px] truncate" title={po.itemsSummary}>
                      {po.itemsSummary}
                    </td>
                    <td className="py-3 font-black text-slate-900">{fmt(po.totalCost)}</td>
                    <td className="py-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          po.paymentStatus === "Paid"
                            ? "bg-emerald-50 text-emerald-600"
                            : po.paymentStatus === "Partial"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {po.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Actionable Priority Widgets: Low Stock Alerts & Pending Online Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Widget 1: Low Stock Inventory Watchlist */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col xl:col-span-1">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertTriangle size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Low Stock Alert</h3>
                <p className="text-[11px] text-slate-400">Needs supplier reorder</p>
              </div>
            </div>
            <Link href="/low-stock" className="text-xs font-bold text-blue-600 hover:text-blue-700">
              Manage
            </Link>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-72">
            {products
              .filter((p) => p.stock <= (p.minStockAlert || 5))
              .slice(0, 5)
              .map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs text-slate-800 truncate">{prod.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{prod.brand} • {prod.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-xs font-black">
                      {prod.stock} Left
                    </span>
                    <button
                      onClick={() => {
                        setPurchaseForm((prev) => ({
                          ...prev,
                          productId: prod.id,
                          unitCost: prod.buyingPrice,
                        }));
                        setIsPurchaseModalOpen(true);
                      }}
                      className="block mt-1 text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      + Restock
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Widget 2: Pending Online Customer Orders */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col xl:col-span-2">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShoppingBag size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Online Customer Orders</h3>
                <p className="text-[11px] text-slate-400">Dispatch & approve pending customer deliveries</p>
              </div>
            </div>
            <Link href="/online-orders" className="text-xs font-bold text-blue-600 hover:text-blue-700">
              All Orders ({onlineOrders.length})
            </Link>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-72">
            {onlineOrders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="p-3.5 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">{order.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        order.orderStatus === "Pending"
                          ? "bg-amber-100 text-amber-700 animate-pulse"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus === "Delivered"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mt-1">
                    {order.customerName} ({order.customerPhone})
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{order.shippingAddress}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="text-right">
                    <p className="font-black text-xs text-slate-900">{fmt(order.totalAmount)}</p>
                    <p className="text-[10px] text-slate-400">{order.paymentMethod}</p>
                  </div>

                  {order.orderStatus === "Pending" && (
                    <button
                      onClick={() => {
                        updateOrderStatus(order.id, "Processing");
                        toast.success(`Order ${order.id} approved for processing!`);
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Approve
                    </button>
                  )}

                  {order.orderStatus === "Processing" && (
                    <button
                      onClick={() => {
                        updateOrderStatus(order.id, "Shipped");
                        toast.success(`Order ${order.id} dispatched for courier delivery!`);
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Dispatch
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MODAL 1: NEW POS SALE ================= */}
      <Modal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        title="⚡ Fast Point of Sale (POS)"
      >
        <form onSubmit={handleCreateSale} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Customer Name
            </label>
            <input
              type="text"
              value={saleForm.customerName}
              onChange={(e) => setSaleForm({ ...saleForm, customerName: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              placeholder="Walk-in Customer / Client Name"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Customer Phone
            </label>
            <input
              type="text"
              value={saleForm.customerPhone}
              onChange={(e) => setSaleForm({ ...saleForm, customerPhone: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              placeholder="+880 17XX-XXXXXX"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Gadget / Hardware Item
            </label>
            <select
              value={saleForm.productId}
              onChange={(e) => {
                const prod = products.find((p) => p.id === e.target.value);
                setSaleForm({
                  ...saleForm,
                  productId: e.target.value,
                  unitPrice: prod?.sellingPrice || 0,
                });
              }}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} (Stock: {p.stock}) - ৳ {p.sellingPrice.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={saleForm.quantity}
                onChange={(e) => setSaleForm({ ...saleForm, quantity: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Unit Price (৳)
              </label>
              <input
                type="number"
                value={saleForm.unitPrice}
                onChange={(e) => setSaleForm({ ...saleForm, unitPrice: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Discount (৳)
              </label>
              <input
                type="number"
                min="0"
                value={saleForm.discount}
                onChange={(e) => setSaleForm({ ...saleForm, discount: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Payment Method
              </label>
              <select
                value={saleForm.paymentMethod}
                onChange={(e) => setSaleForm({ ...saleForm, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              >
                <option value="Cash">Cash Counter</option>
                <option value="bKash Merchant">bKash Merchant</option>
                <option value="Nagad">Nagad</option>
                <option value="Credit Card (POS)">Credit Card (POS)</option>
                <option value="Bank Wire / Due">Bank Wire / Due</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal:</span>
              <span className="font-bold">{fmt(Number(saleForm.quantity) * Number(saleForm.unitPrice))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Net Payable:</span>
              <span className="font-black text-blue-600 text-sm">
                {fmt(Math.max(0, Number(saleForm.quantity) * Number(saleForm.unitPrice) - Number(saleForm.discount || 0)))}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Paid Amount (৳) (Leave blank if fully paid)
            </label>
            <input
              type="number"
              value={saleForm.paidAmount}
              onChange={(e) => setSaleForm({ ...saleForm, paidAmount: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              placeholder="Full Payment"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsSaleModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
            >
              Complete Sale & Print
            </button>
          </div>
        </form>
      </Modal>

      {/* ================= MODAL 2: INWARD PURCHASE ================= */}
      <Modal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        title="📦 Record Supplier Inward Purchase"
      >
        <form onSubmit={handleCreatePurchase} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Supplier / Distributor
            </label>
            <select
              value={purchaseForm.supplierId}
              onChange={(e) => setPurchaseForm({ ...purchaseForm, supplierId: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
            >
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.contact})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Supplier Invoice Ref #
            </label>
            <input
              type="text"
              value={purchaseForm.invoiceRef}
              onChange={(e) => setPurchaseForm({ ...purchaseForm, invoiceRef: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              placeholder="e.g. ST-2026-991"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Hardware Item to Restock
            </label>
            <select
              value={purchaseForm.productId}
              onChange={(e) => {
                const prod = products.find((p) => p.id === e.target.value);
                setPurchaseForm({
                  ...purchaseForm,
                  productId: e.target.value,
                  unitCost: prod?.buyingPrice || 0,
                });
              }}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} (Current Stock: {p.stock})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quantity Added
              </label>
              <input
                type="number"
                min="1"
                value={purchaseForm.quantity}
                onChange={(e) => setPurchaseForm({ ...purchaseForm, quantity: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Buying Unit Cost (৳)
              </label>
              <input
                type="number"
                value={purchaseForm.unitCost}
                onChange={(e) => setPurchaseForm({ ...purchaseForm, unitCost: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Purchase Expense:</span>
              <span className="font-black text-indigo-600 text-sm">
                {fmt(Number(purchaseForm.quantity) * Number(purchaseForm.unitCost))}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Paid Amount to Supplier (৳)
            </label>
            <input
              type="number"
              value={purchaseForm.paidAmount}
              onChange={(e) => setPurchaseForm({ ...purchaseForm, paidAmount: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              placeholder="Leave blank if fully paid"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsPurchaseModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
            >
              Record Inward Stock
            </button>
          </div>
        </form>
      </Modal>

      {/* ================= MODAL 3: ADD NEW PRODUCT ================= */}
      <Modal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title="➕ Add New Product to Inventory"
      >
        <form onSubmit={handleCreateProduct} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Product Title
            </label>
            <input
              type="text"
              value={productForm.title}
              onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              placeholder="e.g. ASUS ROG Strix GeForce RTX 4080 16GB"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Brand
              </label>
              <input
                type="text"
                value={productForm.brand}
                onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                placeholder="ASUS, Intel, Apple..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              >
                <option value="Laptops">Laptops</option>
                <option value="Components">Components</option>
                <option value="Monitors">Monitors</option>
                <option value="Audio">Audio</option>
                <option value="Peripherals">Peripherals</option>
                <option value="Storage">Storage</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Buying / Cost Price (৳)
              </label>
              <input
                type="number"
                value={productForm.buyingPrice}
                onChange={(e) => setProductForm({ ...productForm, buyingPrice: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                placeholder="80000"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Selling Retail Price (৳)
              </label>
              <input
                type="number"
                value={productForm.sellingPrice}
                onChange={(e) => setProductForm({ ...productForm, sellingPrice: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                placeholder="95000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Initial Stock
              </label>
              <input
                type="number"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Min Stock Alert Level
              </label>
              <input
                type="number"
                value={productForm.minStockAlert}
                onChange={(e) => setProductForm({ ...productForm, minStockAlert: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsProductModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20"
            >
              Save Product
            </button>
          </div>
        </form>
      </Modal>

      {/* ================= MODAL 4: PRINT / VIEW INVOICE ================= */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Invoice Preview: ${selectedInvoice.invoiceNo}`}
        >
          <div className="space-y-4 font-mono text-xs text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-center border-b border-dashed border-slate-300 pb-3">
              <h3 className="font-black text-sm text-slate-900">GADGETLAND BD</h3>
              <p className="text-[10px] text-slate-500">Dhaka, Bangladesh • Hotline: +880 1756-899699</p>
              <p className="text-[10px] text-slate-500">VAT Reg: GL-88991244</p>
            </div>

            <div className="space-y-1 text-[11px] border-b border-dashed border-slate-300 pb-2">
              <p><strong>Invoice:</strong> {selectedInvoice.invoiceNo}</p>
              <p><strong>Date:</strong> {new Date(selectedInvoice.createdAt).toLocaleString()}</p>
              <p><strong>Customer:</strong> {selectedInvoice.customerName}</p>
              <p><strong>Phone:</strong> {selectedInvoice.customerPhone || "N/A"}</p>
              <p><strong>Payment:</strong> {selectedInvoice.paymentMethod}</p>
            </div>

            <table className="w-full text-[11px] border-b border-dashed border-slate-300 pb-2">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="text-left pb-1">Item</th>
                  <th className="text-center pb-1">Qty</th>
                  <th className="text-right pb-1">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-1 font-sans">{item.product?.name || "Hardware item"}</td>
                    <td className="text-center py-1">{item.quantity}</td>
                    <td className="text-right py-1">৳{(item.unitPrice * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-1 text-right text-[11px]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{fmt(selectedInvoice.subtotal)}</span>
              </div>
              {selectedInvoice.discount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Discount:</span>
                  <span>- {fmt(selectedInvoice.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-slate-900 text-sm border-t border-dashed border-slate-300 pt-1">
                <span>Grand Total:</span>
                <span>{fmt(selectedInvoice.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid Amount:</span>
                <span>{fmt(selectedInvoice.paidAmount)}</span>
              </div>
              {selectedInvoice.dueAmount > 0 && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>Due Balance:</span>
                  <span>{fmt(selectedInvoice.dueAmount)}</span>
                </div>
              )}
            </div>

            <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-dashed border-slate-300">
              Official Warranty Authorized • Thank you for choosing GadgetLand BD!
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Printer size={14} />
              <span>Print Thermal Receipt</span>
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import {
  Truck,
  Plus,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { Modal } from "@/components/Modal";
import toast from "react-hot-toast";

export default function PurchasesPage() {
  const { purchases, suppliers, products, recordPurchase } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Purchase Form
  const [form, setForm] = useState({
    supplierId: suppliers[0]?.id || "",
    invoiceRef: "",
    productId: products[0]?.id || "",
    quantity: 10,
    unitCost: products[0]?.buyingPrice || 0,
    paidAmount: "",
  });

  const filteredPurchases = useMemo(() => {
    return purchases.filter((po) => {
      const matchSearch =
        po.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        po.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        po.invoiceRef?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        po.itemsSummary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSupplier =
        selectedSupplierFilter === "All" || po.supplierId === selectedSupplierFilter;
      return matchSearch && matchSupplier;
    });
  }, [purchases, searchQuery, selectedSupplierFilter]);

  // Aggregate Metrics
  const totalCost = useMemo(
    () => purchases.reduce((acc, p) => acc + (p.totalCost || 0), 0),
    [purchases]
  );
  const totalPaid = useMemo(
    () => purchases.reduce((acc, p) => acc + (p.paidAmount || 0), 0),
    [purchases]
  );
  const totalDue = useMemo(
    () => purchases.reduce((acc, p) => acc + (p.dueAmount || 0), 0),
    [purchases]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = products.find((p) => p.id === form.productId);
    const supplier = suppliers.find((s) => s.id === form.supplierId);

    const calculatedTotal = Number(form.quantity) * Number(form.unitCost);
    const paid = form.paidAmount === "" ? calculatedTotal : Number(form.paidAmount);

    recordPurchase({
      supplierId: supplier?.id,
      supplierName: supplier?.name || "Direct Vendor",
      invoiceRef: form.invoiceRef || `PO-${Date.now().toString().slice(-5)}`,
      productId: product?.id,
      quantity: Number(form.quantity),
      itemsSummary: product ? `${product.title} (${form.quantity}x)` : "Hardware Restock",
      itemsCount: Number(form.quantity),
      totalCost: calculatedTotal,
      paidAmount: paid,
    });

    toast.success("Purchase and stock intake successfully recorded!");
    setIsModalOpen(false);
    setForm({
      supplierId: suppliers[0]?.id || "",
      invoiceRef: "",
      productId: products[0]?.id || "",
      quantity: 10,
      unitCost: products[0]?.buyingPrice || 0,
      paidAmount: "",
    });
  };

  const fmt = (val) => `৳ ${Number(val || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Truck size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Purchases & Inward Stock
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Distributor procurement, inventory restock logs and accounts payable
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-500/25 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>New Stock Purchase</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Procurement</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{fmt(totalCost)}</h3>
          <p className="text-xs text-slate-500 mt-1">{purchases.length} Purchase Invoices</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Paid to Suppliers</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">{fmt(totalPaid)}</h3>
          <p className="text-xs text-slate-500 mt-1">Settled Procurement</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Outstanding Payable (Due)</span>
          <h3 className="text-2xl font-black text-rose-600 mt-1">{fmt(totalDue)}</h3>
          <p className="text-xs text-slate-500 mt-1">Supplier Credit Balance</p>
        </div>
      </div>

      {/* Purchases Table Container */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by PO #, supplier, or invoice ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">Supplier:</span>
            <select
              value={selectedSupplierFilter}
              onChange={(e) => setSelectedSupplierFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-700 font-semibold"
            >
              <option value="All">All Distributors</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">PO Number</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Supplier Distributor</th>
                <th className="py-3 px-4">Invoice Ref</th>
                <th className="py-3 px-4">Items Summary</th>
                <th className="py-3 px-4">Total Cost</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Due</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPurchases.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{po.id}</td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {new Date(po.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{po.supplierName}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{po.invoiceRef}</td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={po.itemsSummary}>
                    {po.itemsSummary}
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">{fmt(po.totalCost)}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">{fmt(po.paidAmount)}</td>
                  <td className="py-3.5 px-4 font-bold text-rose-600">
                    {po.dueAmount > 0 ? fmt(po.dueAmount) : "৳ 0"}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        po.paymentStatus === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : po.paymentStatus === "Partial"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
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

      {/* Record Purchase Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="📦 Inward Supplier Purchase Entry">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Supplier Distributor
            </label>
            <select
              value={form.supplierId}
              onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
            >
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.contact} • {s.phone})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Supplier Invoice / Challan Number
            </label>
            <input
              type="text"
              placeholder="e.g. ST-2026-CH-881"
              value={form.invoiceRef}
              onChange={(e) => setForm({ ...form, invoiceRef: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Product to Restock
            </label>
            <select
              value={form.productId}
              onChange={(e) => {
                const prod = products.find((p) => p.id === e.target.value);
                setForm({
                  ...form,
                  productId: e.target.value,
                  unitCost: prod?.buyingPrice || 0,
                });
              }}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} (Stock: {p.stock})
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
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Unit Cost (৳)
              </label>
              <input
                type="number"
                value={form.unitCost}
                onChange={(e) => setForm({ ...form, unitCost: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Calculated Purchase Total:</span>
              <span className="font-black text-indigo-600 text-sm">
                {fmt(Number(form.quantity) * Number(form.unitCost))}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Paid Amount (৳) (Blank for Full)
            </label>
            <input
              type="number"
              value={form.paidAmount}
              onChange={(e) => setForm({ ...form, paidAmount: e.target.value })}
              placeholder="Full Payment"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
            >
              Confirm Stock Purchase
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

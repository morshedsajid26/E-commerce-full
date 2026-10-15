"use client";

import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  Plus,
  Truck,
  Package,
  Search,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { Modal } from "@/components/Modal";
import toast from "react-hot-toast";

export default function LowStockManagementPage() {
  const { products, suppliers, recordPurchase } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductForRestock, setSelectedProductForRestock] = useState(null);
  const [reorderQty, setReorderQty] = useState(15);
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id || "");

  const lowStockItems = useMemo(() => {
    return products.filter(
      (p) =>
        p.stock <= (p.minStockAlert || 5) &&
        (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [products, searchQuery]);

  const handleRestock = (e) => {
    e.preventDefault();
    if (!selectedProductForRestock) return;
    const supplier = suppliers.find((s) => s.id === selectedSupplierId);

    const qty = Number(reorderQty);
    const totalCost = qty * selectedProductForRestock.buyingPrice;

    recordPurchase({
      supplierId: supplier?.id,
      supplierName: supplier?.name || "Direct Vendor",
      invoiceRef: `RESTOCK-${Date.now().toString().slice(-5)}`,
      productId: selectedProductForRestock.id,
      quantity: qty,
      itemsSummary: `${selectedProductForRestock.title} (${qty}x)`,
      itemsCount: qty,
      totalCost,
      paidAmount: totalCost,
    });

    toast.success(`Successfully restocked ${qty} units of ${selectedProductForRestock.title}!`);
    setSelectedProductForRestock(null);
  };

  const fmt = (val) => `৳ ${Number(val || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Low Stock & Out of Stock Alerts
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated inventory replenishment recommendations & supplier re-ordering
            </p>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-bold text-red-900 text-sm">
              {lowStockItems.length} Products Running Critically Low
            </h3>
            <p className="text-xs text-red-700 mt-0.5">
              These items have reached or breached their minimum safety stock threshold (≤ 5 units).
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter low stock items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Hardware Item</th>
                <th className="py-3 px-4">Brand / Category</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Threshold</th>
                <th className="py-3 px-4">Procurement Cost</th>
                <th className="py-3 px-4">Deficit Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lowStockItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    All inventory levels are healthy! No items currently in low stock.
                  </td>
                </tr>
              ) : (
                lowStockItems.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-slate-900 leading-snug">{p.title}</td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {p.brand} • {p.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded font-black text-red-600 bg-red-100 text-xs">
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-bold">{p.minStockAlert || 5} units</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{fmt(p.buyingPrice)}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-bold text-red-600">
                        {p.stock === 0 ? "OUT OF STOCK" : `CRITICAL (${p.stock} LEFT)`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProductForRestock(p);
                          setReorderQty(15);
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <Truck size={13} />
                        <span>Restock</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {selectedProductForRestock && (
        <Modal
          isOpen={!!selectedProductForRestock}
          onClose={() => setSelectedProductForRestock(null)}
          title={`📦 Reorder Stock: ${selectedProductForRestock.title}`}
        >
          <form onSubmit={handleRestock} className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
              <p><strong>Item:</strong> {selectedProductForRestock.title}</p>
              <p><strong>Current Units:</strong> <span className="text-red-600 font-bold">{selectedProductForRestock.stock}</span></p>
              <p><strong>Unit Cost:</strong> {fmt(selectedProductForRestock.buyingPrice)}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Distributor
              </label>
              <select
                value={selectedSupplierId}
                onChange={(e) => setSelectedSupplierId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
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
                Reorder Quantity
              </label>
              <input
                type="number"
                min="1"
                value={reorderQty}
                onChange={(e) => setReorderQty(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                required
              />
            </div>

            <div className="p-3 bg-indigo-50 rounded-xl text-xs flex justify-between font-bold text-indigo-900">
              <span>Total Reorder Expense:</span>
              <span>{fmt(Number(reorderQty) * selectedProductForRestock.buyingPrice)}</span>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedProductForRestock(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
              >
                Confirm Restock Order
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

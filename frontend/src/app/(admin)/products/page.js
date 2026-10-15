"use client";

import React, { useState, useMemo } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  AlertTriangle,
  Layers,
  ArrowUpDown,
  CheckCircle2,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { Modal } from "@/components/Modal";
import toast from "react-hot-toast";

export default function ProductsManagementPage() {
  const { products, addProduct, updateProduct, deleteProduct, adjustProductStock } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All"); // All, Low, InStock

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "Components",
    buyingPrice: "",
    sellingPrice: "",
    stock: 10,
    minStockAlert: 5,
    sku: "",
  });

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchStock =
        stockFilter === "All"
          ? true
          : stockFilter === "Low"
          ? p.stock <= (p.minStockAlert || 5)
          : p.stock > 0;
      return matchSearch && matchCat && matchStock;
    });
  }, [products, searchQuery, selectedCategory, stockFilter]);

  // Inventory value calculations
  const totalCostValue = useMemo(
    () => products.reduce((acc, p) => acc + p.stock * p.buyingPrice, 0),
    [products]
  );
  const totalRetailValue = useMemo(
    () => products.reduce((acc, p) => acc + p.stock * p.sellingPrice, 0),
    [products]
  );

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!form.title || !form.sellingPrice) {
      toast.error("Title and selling price are required");
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title: form.title,
        brand: form.brand,
        category: form.category,
        buyingPrice: Number(form.buyingPrice),
        sellingPrice: Number(form.sellingPrice),
        stock: Number(form.stock),
        minStockAlert: Number(form.minStockAlert),
        sku: form.sku,
      });
      toast.success("Product updated successfully!");
      setEditingProduct(null);
    } else {
      addProduct({
        title: form.title,
        brand: form.brand || "Generic",
        category: form.category,
        buyingPrice: Number(form.buyingPrice || 0),
        sellingPrice: Number(form.sellingPrice),
        stock: Number(form.stock || 0),
        minStockAlert: Number(form.minStockAlert || 5),
        sku: form.sku,
      });
      toast.success("New product added to inventory!");
      setIsAddModalOpen(false);
    }

    setForm({
      title: "",
      brand: "",
      category: "Components",
      buyingPrice: "",
      sellingPrice: "",
      stock: 10,
      minStockAlert: 5,
      sku: "",
    });
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      brand: product.brand,
      category: product.category,
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
      stock: product.stock,
      minStockAlert: product.minStockAlert || 5,
      sku: product.sku || "",
    });
  };

  const fmt = (val) => `৳ ${Number(val || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Hardware Products & Inventory
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Stock levels, procurement cost vs selling prices & catalog control
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setForm({
              title: "",
              brand: "",
              category: "Components",
              buyingPrice: "",
              sellingPrice: "",
              stock: 10,
              minStockAlert: 5,
              sku: "",
            });
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Hardware</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Products</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{products.length} SKUs</h3>
          <p className="text-xs text-slate-500 mt-1">Active Catalog Items</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Inventory Cost Basis</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{fmt(totalCostValue)}</h3>
          <p className="text-xs text-slate-500 mt-1">Total Procurement Value</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Inventory Retail Worth</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">{fmt(totalRetailValue)}</h3>
          <p className="text-xs text-emerald-700 font-bold mt-1">Est. Profit: {fmt(totalRetailValue - totalCostValue)}</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products by title, brand, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold text-slate-700"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold text-slate-700"
            >
              <option value="All">All Stock Status</option>
              <option value="Low">Low Stock Only (≤ 5)</option>
              <option value="InStock">In Stock Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Hardware Item</th>
                <th className="py-3 px-4">SKU / Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Cost (Buy)</th>
                <th className="py-3 px-4">Retail (Sale)</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Quick Stock Adjust</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900 leading-snug">{p.title}</p>
                    <p className="text-[10px] text-slate-400">{p.brand}</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{p.sku}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-600">{fmt(p.buyingPrice)}</td>
                  <td className="py-3 px-4 font-black text-slate-900">{fmt(p.sellingPrice)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                        p.stock <= (p.minStockAlert || 5)
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          adjustProductStock(p.id, -1);
                          toast.success("Stock decreased by 1");
                        }}
                        className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs flex items-center justify-center cursor-pointer"
                        title="Decrease stock"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          adjustProductStock(p.id, 1);
                          toast.success("Stock increased by 1");
                        }}
                        className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs flex items-center justify-center cursor-pointer"
                        title="Increase stock"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => startEdit(p)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${p.title}?`)) {
                            deleteProduct(p.id);
                            toast.success("Product deleted");
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isAddModalOpen || !!editingProduct}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? "✏️ Edit Product Details" : "➕ Add New Hardware Product"}
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Product Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              placeholder="e.g. Intel Core i9-14900K Processor"
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
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                placeholder="Intel, ASUS, Apple..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
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
                Cost Price (৳)
              </label>
              <input
                type="number"
                value={form.buyingPrice}
                onChange={(e) => setForm({ ...form, buyingPrice: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                placeholder="45000"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Selling Price (৳)
              </label>
              <input
                type="number"
                value={form.sellingPrice}
                onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                placeholder="55000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
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
                value={form.minStockAlert}
                onChange={(e) => setForm({ ...form, minStockAlert: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingProduct(null);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
            >
              {editingProduct ? "Update Product" : "Save Hardware"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

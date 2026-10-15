"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingCart,
  Plus,
  Trash2,
  Printer,
  Search,
  User,
  CreditCard,
  DollarSign,
  TrendingUp,
  Receipt,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { Modal } from "@/components/Modal";
import toast from "react-hot-toast";

export default function SalesPOSPage() {
  const { products, sales, customers, recordSale } = useAdminStore();

  const [activeView, setActiveView] = useState("pos"); // "pos" or "history"
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [historySearch, setHistorySearch] = useState("");

  // POS Cart
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("Walk-in Customer");
  const [customerPhone, setCustomerPhone] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // Selected invoice for thermal print
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Filtered products for POS
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.sku?.toLowerCase().includes(productSearch.toLowerCase());
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [products, productSearch, selectedCategory]);

  // Categories list
  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  // Add item to POS cart
  const addToCart = (product) => {
    if (product.stock <= 0) {
      toast.error("This item is out of stock!");
      return;
    }
    const existing = cart.find((i) => i.productId === product.id);
    if (existing) {
      if (existing.quantity >= product.stock) {
        toast.error(`Cannot add more than active stock (${product.stock})!`);
        return;
      }
      setCart(
        cart.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          title: product.title,
          category: product.category,
          price: product.sellingPrice,
          costPrice: product.buyingPrice,
          stock: product.stock,
          quantity: 1,
        },
      ]);
    }
    toast.success(`Added ${product.title.slice(0, 20)}...`);
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      setCart(cart.filter((i) => i.productId !== productId));
    } else {
      const item = cart.find((i) => i.productId === productId);
      if (item && newQty > item.stock) {
        toast.error(`Max stock available is ${item.stock}!`);
        return;
      }
      setCart(
        cart.map((i) => (i.productId === productId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((i) => i.productId !== productId));
  };

  // Cart calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  }, [cart]);

  const netPayable = Math.max(0, subtotal - Number(discount || 0));
  const effectivePaid = paidAmount === "" ? netPayable : Number(paidAmount);
  const dueAmount = Math.max(0, netPayable - effectivePaid);

  // Complete POS Sale
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const saleItems = cart.map((i) => ({
      product: { id: i.productId, name: i.title, category: i.category },
      quantity: i.quantity,
      unitPrice: i.price,
      costPrice: i.costPrice,
      totalPrice: i.price * i.quantity,
    }));

    const sale = recordSale({
      customerName: customerName || "Walk-in Customer",
      customerPhone: customerPhone || "N/A",
      items: saleItems,
      discount: Number(discount || 0),
      paidAmount: effectivePaid,
      paymentMethod,
    });

    toast.success(`POS Sale Completed! Invoice: ${sale.invoiceNo}`);
    setSelectedInvoice(sale);
    // Reset cart
    setCart([]);
    setDiscount(0);
    setPaidAmount("");
    setCustomerName("Walk-in Customer");
    setCustomerPhone("");
  };

  // Filtered sales history
  const filteredSales = useMemo(() => {
    return sales.filter(
      (s) =>
        s.invoiceNo.toLowerCase().includes(historySearch.toLowerCase()) ||
        s.customerName.toLowerCase().includes(historySearch.toLowerCase()) ||
        (s.customerPhone && s.customerPhone.includes(historySearch))
    );
  }, [sales, historySearch]);

  const fmt = (val) => `৳ ${Number(val || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingCart size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Sales & Point of Sale (POS)
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Fast counter billing terminal, custom invoices & transaction records
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher: POS Terminal vs Sales Invoices */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => setActiveView("pos")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === "pos"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ⚡ Live POS Terminal
          </button>
          <button
            onClick={() => setActiveView("history")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === "history"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📋 Invoice Records ({sales.length})
          </button>
        </div>
      </div>

      {activeView === "pos" ? (
        /* ================= POS TERMINAL VIEW ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side: Product Browser (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Search & Category Filter */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products by title, brand, or SKU..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => addToCart(prod)}
                  className="bg-white p-3.5 rounded-2xl border border-slate-100 hover:border-blue-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {prod.brand}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                          prod.stock <= 3
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {prod.stock} in stock
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {prod.title}
                    </h4>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="font-black text-xs text-blue-600">{fmt(prod.sellingPrice)}</span>
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Plus size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Live POS Cart & Billing Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                  <Receipt size={18} className="text-blue-600" />
                  Current Invoice
                </h3>
                <span className="text-xs font-bold text-slate-500">{cart.length} items</span>
              </div>

              {/* Customer Inputs */}
              <div className="grid grid-cols-2 gap-2 mt-3 pb-3 border-b border-slate-100">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Walk-in Customer"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Customer Phone
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+880 17XX..."
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-2 mt-3 max-h-56 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <ShoppingCart size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-xs font-bold">Cart is empty</p>
                    <p className="text-[11px] text-slate-400">Click products on left to add to bill</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.productId}
                      className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-900 truncate">{item.title}</p>
                        <p className="text-[10px] text-slate-400">{fmt(item.price)} each</p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-5 h-5 rounded bg-white border border-slate-200 font-bold flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-5 h-5 rounded bg-white border border-slate-200 font-bold flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold text-slate-900">{fmt(item.price * item.quantity)}</span>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="block text-red-500 hover:text-red-700 ml-auto mt-0.5"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Calculations & Checkout */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">{fmt(subtotal)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Discount (৳)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="0"
                    className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="Cash">Cash Counter</option>
                    <option value="bKash Merchant">bKash Merchant</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Credit Card (POS)">Credit Card (POS)</option>
                    <option value="Bank Wire / Due">Bank Wire / Due</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-dashed border-slate-200">
                <span>Net Total:</span>
                <span className="text-blue-600 text-base">{fmt(netPayable)}</span>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Paid Amount (৳) (Blank for Full)
                </label>
                <input
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  placeholder="Full Amount"
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>

              {dueAmount > 0 && (
                <div className="p-2 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold flex justify-between">
                  <span>Balance Due:</span>
                  <span>{fmt(dueAmount)}</span>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
              >
                Complete POS Sale & Print
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ================= SALES INVOICES HISTORY VIEW ================= */
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-base font-black text-slate-900">All Sales Transactions & Invoices</h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by invoice # or customer..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Invoice No</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Items Summary</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Due</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{sale.invoiceNo}</td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(sale.createdAt).toLocaleDateString()} {new Date(sale.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{sale.customerName}</p>
                      <p className="text-[10px] text-slate-400">{sale.customerPhone || "N/A"}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {sale.itemsCount} item(s)
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {sale.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-slate-900">{fmt(sale.totalAmount)}</td>
                    <td className="py-3 px-4">
                      {sale.dueAmount > 0 ? (
                        <span className="text-rose-600 font-bold">{fmt(sale.dueAmount)}</span>
                      ) : (
                        <span className="text-emerald-600 font-bold text-[10px]">PAID</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedInvoice(sale)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Printer size={12} />
                        <span>Print</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invoice Print Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Thermal Receipt: ${selectedInvoice.invoiceNo}`}
        >
          <div className="space-y-3 font-mono text-xs text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-center border-b border-dashed border-slate-300 pb-2">
              <h3 className="font-black text-sm text-slate-900">GADGETLAND BD</h3>
              <p className="text-[10px] text-slate-500">Dhaka, Bangladesh • Hotline: +880 1756-899699</p>
            </div>
            <div className="space-y-0.5 text-[11px] border-b border-dashed border-slate-300 pb-2">
              <p>Invoice: {selectedInvoice.invoiceNo}</p>
              <p>Date: {new Date(selectedInvoice.createdAt).toLocaleString()}</p>
              <p>Customer: {selectedInvoice.customerName}</p>
              <p>Method: {selectedInvoice.paymentMethod}</p>
            </div>
            <div className="border-b border-dashed border-slate-300 pb-2 space-y-1">
              {selectedInvoice.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span>{item.quantity}x {item.product?.name}</span>
                  <span>{fmt(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1 text-right text-[11px]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{fmt(selectedInvoice.subtotal)}</span>
              </div>
              <div className="flex justify-between font-black text-slate-900 pt-1 border-t border-dashed border-slate-300">
                <span>Grand Total:</span>
                <span>{fmt(selectedInvoice.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid:</span>
                <span>{fmt(selectedInvoice.paidAmount)}</span>
              </div>
              {selectedInvoice.dueAmount > 0 && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>Due:</span>
                  <span>{fmt(selectedInvoice.dueAmount)}</span>
                </div>
              )}
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
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
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

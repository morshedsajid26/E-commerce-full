"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  Phone,
  MapPin,
  Calendar,
  Eye,
  CheckCircle2,
  Printer,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { Modal } from "@/components/Modal";
import toast from "react-hot-toast";

const STATUS_TABS = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OnlineOrdersManagementPage() {
  const { onlineOrders, updateOrderStatus } = useAdminStore();

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return onlineOrders.filter((o) => {
      const matchTab = activeTab === "All" || o.orderStatus === activeTab;
      const matchSearch =
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerPhone.includes(searchQuery) ||
        o.shippingAddress.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [onlineOrders, activeTab, searchQuery]);

  const counts = useMemo(() => {
    const c = { All: onlineOrders.length };
    onlineOrders.forEach((o) => {
      c[o.orderStatus] = (c[o.orderStatus] || 0) + 1;
    });
    return c;
  }, [onlineOrders]);

  const fmt = (val) => `৳ ${Number(val || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShoppingBag size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Online Customer Orders
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Fulfillment workflow: review, verify, approve & dispatch web orders
            </p>
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            {STATUS_TABS.map((tab) => {
              const count = counts[tab] || 0;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{tab}</span>
                  {count > 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                        tab === "Pending"
                          ? "bg-amber-400 text-slate-950"
                          : activeTab === tab
                          ? "bg-slate-800 text-slate-200"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by order ID, customer or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Shipping Destination</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No orders found matching the filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{order.id}</td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 leading-snug">{order.customerName}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone size={10} />
                        {order.customerPhone}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={order.shippingAddress}>
                      {order.shippingAddress}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">{fmt(order.totalAmount)}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          order.orderStatus === "Pending"
                            ? "bg-amber-100 text-amber-800 animate-pulse border border-amber-300"
                            : order.orderStatus === "Processing"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : order.orderStatus === "Shipped"
                            ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                            : order.orderStatus === "Delivered"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-rose-100 text-rose-800 border border-rose-200"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {order.orderStatus === "Pending" && (
                          <button
                            onClick={() => {
                              updateOrderStatus(order.id, "Processing");
                              toast.success(`Order ${order.id} verified and approved!`);
                            }}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
                          >
                            Approve
                          </button>
                        )}
                        {order.orderStatus === "Processing" && (
                          <button
                            onClick={() => {
                              updateOrderStatus(order.id, "Shipped");
                              toast.success(`Order ${order.id} handed to courier!`);
                            }}
                            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
                          >
                            Ship
                          </button>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <button
                            onClick={() => {
                              updateOrderStatus(order.id, "Delivered");
                              toast.success(`Order ${order.id} marked as delivered!`);
                            }}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
                          >
                            Delivered
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                          title="View Order Details"
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order Details: ${selectedOrder.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
              <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</p>
              <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">Ordered Items</h4>
              <div className="space-y-2">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded-lg border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{item.product?.name || "Hardware item"}</p>
                      <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-black text-slate-900">{fmt(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between font-black text-sm">
              <span>Total Payable:</span>
              <span className="text-blue-600">{fmt(selectedOrder.totalAmount)}</span>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white"
              >
                <Printer size={13} />
                <span>Print Packing Slip</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

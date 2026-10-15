"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  DollarSign,
  ShoppingBag,
  Clock,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { Modal } from "@/components/Modal";
import toast from "react-hot-toast";

export default function CustomersManagementPage() {
  const { customers, payCustomerDue } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerForDue, setSelectedCustomerForDue] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customers, searchQuery]);

  const totalSpentAll = useMemo(
    () => customers.reduce((acc, c) => acc + (c.totalSpent || 0), 0),
    [customers]
  );
  const totalDuesAll = useMemo(
    () => customers.reduce((acc, c) => acc + (c.dueAmount || 0), 0),
    [customers]
  );

  const handleCollectDue = (e) => {
    e.preventDefault();
    if (!selectedCustomerForDue) return;
    const amount = Number(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
    }
    payCustomerDue(selectedCustomerForDue.id, amount);
    toast.success(`Received ৳ ${amount.toLocaleString()} due payment from ${selectedCustomerForDue.name}`);
    setSelectedCustomerForDue(null);
    setPaymentAmount("");
  };

  const fmt = (val) => `৳ ${Number(val || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Customer Directory & Accounts
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Client purchase history, contact database and credit due balances
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Clients</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{customers.length} Accounts</h3>
          <p className="text-xs text-slate-500 mt-1">Retail & Corporate Clients</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Customer Spend</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">{fmt(totalSpentAll)}</h3>
          <p className="text-xs text-slate-500 mt-1">Lifetime Revenue Generated</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Outstanding Credit</span>
          <h3 className="text-2xl font-black text-rose-600 mt-1">{fmt(totalDuesAll)}</h3>
          <p className="text-xs text-slate-500 mt-1">Receivable Balance</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by customer name, phone or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Location / Address</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Due Balance</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{cust.name}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{cust.phone}</td>
                  <td className="py-3.5 px-4 text-slate-500">{cust.address}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">{cust.ordersCount || 1} order(s)</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">{fmt(cust.totalSpent)}</td>
                  <td className="py-3.5 px-4">
                    {cust.dueAmount > 0 ? (
                      <span className="font-black text-rose-600 px-2 py-0.5 rounded bg-rose-50 border border-rose-200">
                        {fmt(cust.dueAmount)}
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-bold text-[11px]">Clear (৳ 0)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {cust.dueAmount > 0 ? (
                      <button
                        onClick={() => {
                          setSelectedCustomerForDue(cust);
                          setPaymentAmount(cust.dueAmount.toString());
                        }}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
                      >
                        Collect Due
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">In Good Standing</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Due Modal */}
      {selectedCustomerForDue && (
        <Modal
          isOpen={!!selectedCustomerForDue}
          onClose={() => setSelectedCustomerForDue(null)}
          title={`💰 Collect Due Payment: ${selectedCustomerForDue.name}`}
        >
          <form onSubmit={handleCollectDue} className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
              <p><strong>Customer:</strong> {selectedCustomerForDue.name}</p>
              <p><strong>Phone:</strong> {selectedCustomerForDue.phone}</p>
              <p><strong>Current Outstanding Due:</strong> <span className="text-rose-600 font-black">{fmt(selectedCustomerForDue.dueAmount)}</span></p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Payment Amount Collected (৳)
              </label>
              <input
                type="number"
                max={selectedCustomerForDue.dueAmount}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                required
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedCustomerForDue(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20"
              >
                Confirm Payment Receipt
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

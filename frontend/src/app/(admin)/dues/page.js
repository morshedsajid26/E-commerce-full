"use client";

import React, { useState, useMemo } from "react";
import {
  CreditCard,
  Search,
  DollarSign,
  Phone,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { Modal } from "@/components/Modal";
import toast from "react-hot-toast";

export default function DueManagementPage() {
  const { customers, payCustomerDue } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCust, setSelectedCust] = useState(null);
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("Cash");

  const debtors = useMemo(() => {
    return customers.filter(
      (c) =>
        c.dueAmount > 0 &&
        (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.phone.includes(searchQuery))
    );
  }, [customers, searchQuery]);

  const totalDueAmount = useMemo(
    () => customers.reduce((acc, c) => acc + (c.dueAmount || 0), 0),
    [customers]
  );

  const handleSettleDue = (e) => {
    e.preventDefault();
    if (!selectedCust) return;
    const amount = Number(payAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid settlement amount");
      return;
    }
    payCustomerDue(selectedCust.id, amount);
    toast.success(`Successfully collected ৳ ${amount.toLocaleString()} due via ${payMethod}!`);
    setSelectedCust(null);
    setPayAmount("");
  };

  const fmt = (val) => `৳ ${Number(val || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <CreditCard size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Due & Credit Receivables
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Outstanding client debt recovery, payment receipts and credit limits
            </p>
          </div>
        </div>
      </div>

      {/* KPI Banner */}
      <div className="bg-gradient-to-r from-rose-900 to-slate-900 text-white rounded-3xl p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-rose-300">Total Outstanding Receivables</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">{fmt(totalDueAmount)}</h2>
          <p className="text-xs text-rose-200 mt-1">{debtors.length} customers with pending balance</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/10 text-xs">
          <p className="font-bold text-white">Credit Policy Reminder</p>
          <p className="text-slate-300 text-[11px]">Retail dues must be cleared within 30 days of billing.</p>
        </div>
      </div>

      {/* Debtors List Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-black text-slate-900">Active Debt Accounts ({debtors.length})</h2>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by customer name or phone..."
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
                <th className="py-3 px-4">Client / Account</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Total Purchases</th>
                <th className="py-3 px-4">Current Due</th>
                <th className="py-3 px-4 text-right">Collect Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {debtors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    🎉 Excellent! All customer balances are fully cleared. No pending dues!
                  </td>
                </tr>
              ) : (
                debtors.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{c.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{c.phone}</td>
                    <td className="py-3.5 px-4 text-slate-500">{c.address}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">{fmt(c.totalSpent)}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-black text-rose-600 text-sm">{fmt(c.dueAmount)}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedCust(c);
                          setPayAmount(c.dueAmount.toString());
                        }}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                      >
                        Settle Due
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Due Settlement Modal */}
      {selectedCust && (
        <Modal
          isOpen={!!selectedCust}
          onClose={() => setSelectedCust(null)}
          title={`💵 Receive Due Payment: ${selectedCust.name}`}
        >
          <form onSubmit={handleSettleDue} className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
              <p><strong>Customer:</strong> {selectedCust.name}</p>
              <p><strong>Phone:</strong> {selectedCust.phone}</p>
              <p><strong>Total Pending Due:</strong> <span className="text-rose-600 font-black">{fmt(selectedCust.dueAmount)}</span></p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Amount Received (৳)
              </label>
              <input
                type="number"
                max={selectedCust.dueAmount}
                min="1"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Payment Channel
              </label>
              <select
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
              >
                <option value="Cash">Cash Deposit</option>
                <option value="bKash Merchant">bKash Merchant</option>
                <option value="Nagad">Nagad</option>
                <option value="Bank Transfer">Bank Wire / Deposit</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedCust(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20"
              >
                Confirm Settlement
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

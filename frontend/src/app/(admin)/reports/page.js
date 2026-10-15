"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart3,
  Calendar,
  DollarSign,
  TrendingUp,
  Printer,
  Download,
  FileText,
  PieChart as PieIcon,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminStore } from "@/store/adminStore";

export default function ReportsManagementPage() {
  const { sales, purchases, products, getStats, getChartData } = useAdminStore();
  const [reportRange, setReportRange] = useState("month");

  const stats = useMemo(() => getStats(), [sales, purchases, products]);
  const chartData = useMemo(() => getChartData(reportRange), [reportRange, sales, purchases]);

  // Derived Financial Ledger
  const cogs = useMemo(() => {
    return sales.reduce((acc, s) => {
      const saleCost = (s.items || []).reduce(
        (sum, item) => sum + (item.costPrice || item.unitPrice * 0.8) * item.quantity,
        0
      );
      return acc + saleCost;
    }, 0);
  }, [sales]);

  const grossProfit = Math.max(0, stats.totalSales - cogs);
  const profitMargin = stats.totalSales > 0 ? ((grossProfit / stats.totalSales) * 100).toFixed(1) : 0;

  const fmt = (val) => `৳ ${Number(val || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BarChart3 size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Financial & Business Reports
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Profit & Loss statement, cost of goods sold, and executive daily ledgers
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
        >
          <Printer size={15} />
          <span>Print Statement</span>
        </button>
      </div>

      {/* P&L Statement Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-slate-900">Profit & Loss (P&L) Summary</h2>
            <p className="text-xs text-slate-400 mt-0.5">Comprehensive hardware trading revenue vs inventory expenditures</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Margin: {profitMargin}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-500">Gross Sales Revenue</span>
            <h3 className="text-xl font-black text-blue-900 mt-1">{fmt(stats.totalSales)}</h3>
            <p className="text-[10px] text-blue-600 mt-0.5">From all store & web orders</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Cost of Goods Sold (COGS)</span>
            <h3 className="text-xl font-black text-slate-900 mt-1">{fmt(cogs)}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Cost of sold hardware units</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600">Net Gross Profit</span>
            <h3 className="text-xl font-black text-emerald-700 mt-1">{fmt(grossProfit)}</h3>
            <p className="text-[10px] text-emerald-600 mt-0.5">Gross revenue minus COGS</p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-500">Total Stock Purchases</span>
            <h3 className="text-xl font-black text-indigo-900 mt-1">{fmt(stats.totalPurchases)}</h3>
            <p className="text-[10px] text-indigo-600 mt-0.5">Procurement capital outlays</p>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-slate-900">Financial Performance Breakdown</h3>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {["day", "month", "year"].map((r) => (
                <button
                  key={r}
                  onClick={() => setReportRange(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    reportRange === r ? "bg-white text-blue-600 shadow-xs" : "text-slate-500"
                  }`}
                >
                  {r === "day" ? "Today" : r === "month" ? "Monthly" : "Yearly"}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
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
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "10px", border: "none", color: "#fff", fontSize: "11px" }}
                />
                <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} name="sales" />
                <Bar dataKey="purchase" fill="#94a3b8" radius={[4, 4, 0, 0]} name="purchase" />
                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} name="profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Daily Ledger Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-base font-black text-slate-900">Recent Transaction Ledger</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Reference ID</th>
                <th className="py-3 px-4">Party / Customer / Vendor</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Cash Inflow</th>
                <th className="py-3 px-4">Cash Outflow</th>
                <th className="py-3 px-4 text-right">Net Effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sales.slice(0, 4).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-50 text-blue-700">
                      SALE
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{s.invoiceNo}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{s.customerName}</td>
                  <td className="py-3 px-4 text-slate-500">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">+ {fmt(s.totalAmount)}</td>
                  <td className="py-3 px-4 text-slate-400">-</td>
                  <td className="py-3 px-4 text-right font-black text-emerald-600">+ {fmt(s.profit)}</td>
                </tr>
              ))}
              {purchases.slice(0, 3).map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-50 text-indigo-700">
                      PURCHASE
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{p.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{p.supplierName}</td>
                  <td className="py-3 px-4 text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-slate-400">-</td>
                  <td className="py-3 px-4 font-bold text-rose-600">- {fmt(p.totalCost)}</td>
                  <td className="py-3 px-4 text-right font-mono text-slate-500">Asset +</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

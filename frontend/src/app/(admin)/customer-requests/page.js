"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Heart,
  RefreshCw,
  Loader2,
  Phone,
  User,
  Package,
  Clock,
} from "lucide-react";
import { Card } from "@/components/Card";
import { getProductRequestsAdminAction } from "@/lib/actions/online-customer.actions";
import toast from "react-hot-toast";

export default function CustomerRequestsPage() {
  const [requests, setRequests] = useState([
    {
      id: "req-1",
      customerId: "cust-1",
      customer: { name: "Tanvir Ahmed", phone: "+880 1712-445566" },
      product: { name: "NVIDIA GeForce RTX 4090 24GB", company: "ASUS ROG", category: "Graphics Cards", stock: 0 },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: "req-2",
      customerId: "cust-2",
      customer: { name: "Farhan Kabir", phone: "+880 1614-667788" },
      product: { name: "AMD Ryzen 7 7800X3D Gaming Processor", company: "AMD", category: "Processors", stock: 1 },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    },
    {
      id: "req-3",
      customerId: "cust-3",
      customer: { name: "Nusrat Jahan", phone: "+880 1715-778899" },
      product: "Samsung 990 Pro 4TB NVMe SSD",
      product: { name: "Samsung 990 Pro 4TB NVMe SSD", company: "Samsung", category: "Storage", stock: 0 },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function loadRequests() {
    setLoading(true);
    try {
      const data = await getProductRequestsAdminAction();
      if (data && data.length > 0) {
        setRequests(data);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  }

  // Compute metrics
  const metrics = useMemo(() => {
    const total = requests.length;
    const uniqueCustomers = new Set(requests.map((r) => r.customerId)).size;

    const counts = {};
    requests.forEach((r) => {
      const name = r.product?.name;
      if (name) counts[name] = (counts[name] || 0) + 1;
    });
    let mostRequested = "None";
    let maxCount = 0;
    Object.entries(counts).forEach(([name, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostRequested = `${name} (${count} reqs)`;
      }
    });

    return { total, uniqueCustomers, mostRequested };
  }, [requests]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Heart className="text-red-500 fill-red-500" size={24} />
            Customer Restock Requests
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track out-of-stock items requested by online customers
          </p>
        </div>
        <button
          onClick={loadRequests}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-slate-100 shadow-sm relative overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Requests
              </p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {metrics.total}
              </h3>
            </div>
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
              <Heart size={24} className="fill-red-100" />
            </div>
          </div>
        </Card>

        <Card className="bg-white border-slate-100 shadow-sm relative overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Unique Customers
              </p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {metrics.uniqueCustomers}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <User size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-white border-slate-100 shadow-sm relative overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Most Requested
              </p>
              <h3
                className="text-sm font-bold text-slate-800 mt-2 truncate max-w-[200px]"
                title={metrics.mostRequested}
              >
                {metrics.mostRequested}
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
              <Package size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Table view */}
      {loading ? (
        <div className="h-64 w-full flex flex-col items-center justify-center gap-4 text-slate-400 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="font-semibold text-xs">Loading wishlist requests...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Product Details</th>
                  <th className="py-3 px-4">Active Stock</th>
                  <th className="py-3 px-4">Requesting Customer</th>
                  <th className="py-3 px-4">Requested At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{row.product.name}</span>
                      <span className="text-[11px] text-slate-400">
                        {row.product.company} • {row.product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                          row.product.stock < 2 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {row.product.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <User size={12} className="text-slate-400" />
                        {row.customer.name}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone size={11} className="text-slate-400" />
                        {row.customer.phone}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock size={11} className="text-slate-400" />
                        {new Date(row.createdAt).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

"use server";
export async function getDashboardSummary() { return { totalSales: 0, totalPurchases: 0, totalOrders: 0 }; }
export async function getChartData(range) { return []; }
export async function getTopSellingProducts() { return []; }
export async function getExpiringProducts() { return []; }
export async function getTopProfitableProducts() { return []; }
export async function getUnsoldProducts() { return []; }
export async function getLedgerYears() { return [2026]; }
export async function getDailyLedger(year, month) { return []; }
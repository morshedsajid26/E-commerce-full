"use server";
export async function getPurchases() { return []; }
export async function recordPurchase(data) { return { success: true, purchase: data }; }
export async function updatePurchase(id, data) { return { success: true, purchase: data }; }
export async function deletePurchase(id) { return { success: true }; }
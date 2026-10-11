"use server";
export async function getSales() { return []; }
export async function recordSale(data) { return { success: true, sale: data }; }
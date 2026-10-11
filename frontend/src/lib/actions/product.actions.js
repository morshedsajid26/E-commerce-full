"use server";
export async function getProducts() { return []; }
export async function getLowStockProducts() { return []; }
export async function addProduct(data) { return { success: true, product: data }; }
export async function updateProduct(id, data) { return { success: true, product: data }; }
export async function deleteProduct(id) { return { success: true }; }
export async function getProductsByIds(ids) { return []; }
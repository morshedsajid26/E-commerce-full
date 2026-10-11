"use server";
export async function getPendingOrdersCountAction() { return 0; }
export async function getStorefrontSettingsAction() { return { heroTitle: "Welcome", heroSubtitle: "Shop now" }; }
export async function updateStorefrontSettingsAction(data) { return { success: true }; }
export async function getOnlineOrdersAction() { return []; }
export async function approveOnlineOrderAction(id) { return { success: true }; }
export async function rejectOnlineOrderAction(id) { return { success: true }; }
export async function updateOrderStatusAction(id, status) { return { success: true }; }
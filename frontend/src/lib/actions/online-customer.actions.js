"use server";
export async function registerCustomerAction(name, phone, password) { return { success: true, user: { id: 2, name, phone, role: "CUSTOMER" } }; }
export async function getCustomerOrdersAction() { return []; }
export async function getProductRequestsAdminAction() { return []; }
export async function updateCustomerProfileAction(data) { return { success: true, user: data }; }
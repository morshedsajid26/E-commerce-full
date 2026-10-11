"use server";
export async function getCustomers() { return []; }
export async function createCustomer(data) { return { success: true, customer: data }; }
export async function updateCustomer(id, data) { return { success: true, customer: data }; }
export async function payCustomerDue(id, amount) { return { success: true }; }
"use server";
export async function getPrescriptions() { return []; }
export async function uploadPrescription(data) { return { success: true }; }
export async function getCustomerPrescriptionsAction() { return []; }
export async function uploadPrescriptionAction(data) { return { success: true }; }
export async function createPrescriptionOrder(data) { return { success: true, orderId: "RX-" + Date.now() }; }
export async function getCustomerPrescriptionOrders(customerId) { return []; }
"use server";
export async function loginAction(identifier, password) { return { success: true, user: { id: 1, name: "Admin", role: "ADMIN" } }; }
export async function logoutAction() { return { success: true }; }
export async function getSession() { return { id: 1, name: "Admin", role: "ADMIN" }; }
export async function getCurrentUser() { return { id: 1, name: "Admin", role: "ADMIN" }; }
export async function updateUserAction(data) { return { success: true, user: data }; }
export async function sendResetOtpAction(phone) { return { success: true }; }
export async function verifyResetOtpAction(phone, otp) { return { success: true }; }
export async function resetPasswordAction(phone, otp, newPassword) { return { success: true }; }
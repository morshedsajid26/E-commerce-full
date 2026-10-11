const fs = require('fs');
const path = require('path');

const actionsDir = path.join(__dirname, 'src', 'lib', 'actions');
if (!fs.existsSync(actionsDir)) {
    fs.mkdirSync(actionsDir, { recursive: true });
}

const files = {
    'auth.actions.js': `"use server";\nexport async function loginAction(identifier, password) { return { success: true, user: { id: 1, name: "Admin", role: "ADMIN" } }; }\nexport async function logoutAction() { return { success: true }; }\nexport async function getSession() { return { id: 1, name: "Admin", role: "ADMIN" }; }\nexport async function getCurrentUser() { return { id: 1, name: "Admin", role: "ADMIN" }; }\nexport async function updateUserAction(data) { return { success: true, user: data }; }\nexport async function sendResetOtpAction(phone) { return { success: true }; }\nexport async function verifyResetOtpAction(phone, otp) { return { success: true }; }\nexport async function resetPasswordAction(phone, otp, newPassword) { return { success: true }; }`,
    
    'online-admin.actions.js': `"use server";\nexport async function getPendingOrdersCountAction() { return 0; }\nexport async function getStorefrontSettingsAction() { return { heroTitle: "Welcome", heroSubtitle: "Shop now" }; }\nexport async function updateStorefrontSettingsAction(data) { return { success: true }; }\nexport async function getOnlineOrdersAction() { return []; }\nexport async function approveOnlineOrderAction(id) { return { success: true }; }\nexport async function rejectOnlineOrderAction(id) { return { success: true }; }\nexport async function updateOrderStatusAction(id, status) { return { success: true }; }`,
    
    'customer.actions.js': `"use server";\nexport async function getCustomers() { return []; }\nexport async function createCustomer(data) { return { success: true, customer: data }; }\nexport async function updateCustomer(id, data) { return { success: true, customer: data }; }\nexport async function payCustomerDue(id, amount) { return { success: true }; }`,
    
    'online-customer.actions.js': `"use server";\nexport async function registerCustomerAction(name, phone, password) { return { success: true, user: { id: 2, name, phone, role: "CUSTOMER" } }; }\nexport async function getCustomerOrdersAction() { return []; }\nexport async function getProductRequestsAdminAction() { return []; }\nexport async function updateCustomerProfileAction(data) { return { success: true, user: data }; }`,
    
    'product.actions.js': `"use server";\nexport async function getProducts() { return []; }\nexport async function getLowStockProducts() { return []; }\nexport async function addProduct(data) { return { success: true, product: data }; }\nexport async function updateProduct(id, data) { return { success: true, product: data }; }\nexport async function deleteProduct(id) { return { success: true }; }\nexport async function getProductsByIds(ids) { return []; }`,
    
    'sales.actions.js': `"use server";\nexport async function getSales() { return []; }\nexport async function recordSale(data) { return { success: true, sale: data }; }`,
    
    'purchase.actions.js': `"use server";\nexport async function getPurchases() { return []; }\nexport async function recordPurchase(data) { return { success: true, purchase: data }; }\nexport async function updatePurchase(id, data) { return { success: true, purchase: data }; }\nexport async function deletePurchase(id) { return { success: true }; }`,
    
    'checkout.actions.js': `"use server";\nexport async function placeOrder(data) { return { success: true, orderId: "123" }; }`,
    
    'report.actions.js': `"use server";\nexport async function getDashboardSummary() { return { totalSales: 0, totalPurchases: 0, totalOrders: 0 }; }\nexport async function getChartData(range) { return []; }\nexport async function getTopSellingProducts() { return []; }\nexport async function getExpiringProducts() { return []; }\nexport async function getTopProfitableProducts() { return []; }\nexport async function getUnsoldProducts() { return []; }\nexport async function getLedgerYears() { return [2026]; }\nexport async function getDailyLedger(year, month) { return []; }`,
    
    'prescription.actions.js': `"use server";\nexport async function getPrescriptions() { return []; }\nexport async function uploadPrescription(data) { return { success: true }; }\nexport async function getCustomerPrescriptionsAction() { return []; }\nexport async function uploadPrescriptionAction(data) { return { success: true }; }\nexport async function createPrescriptionOrder(data) { return { success: true, orderId: "RX-" + Date.now() }; }\nexport async function getCustomerPrescriptionOrders(customerId) { return []; }"`
};

for (const [filename, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(actionsDir, filename), content);
}
console.log('Mock actions created successfully.');

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DUMMY_PRODUCTS } from "@/data/dummy/homepage-data";

// Initial Hardware Products with cost & retail prices
const INITIAL_PRODUCTS = (DUMMY_PRODUCTS || []).slice(0, 16).map((p, idx) => ({
  id: p.id || `prod-${idx + 1}`,
  title: p.title,
  category: p.category || "Components",
  brand: p.brand || "GadgetLand",
  buyingPrice: Math.round((p.price || 15000) * 0.8), // ~80% cost basis
  sellingPrice: p.price || 18000,
  stock: p.stock ?? (idx % 3 === 0 ? 3 : 18), // some low stock
  minStockAlert: 5,
  sku: `GL-${(p.category || "HW").substring(0, 3).toUpperCase()}-${1000 + idx}`,
  image: p.image || "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
}));

const INITIAL_SUPPLIERS = [
  { id: "sup-1", name: "Smart Technologies (BD) Ltd", contact: "Mohammad Ali", phone: "+880 1713-009988", email: "sales@smart-bd.com", address: "IDB Bhaban, Agargaon, Dhaka", balanceDue: 0 },
  { id: "sup-2", name: "UCC (Universal Computer)", contact: "Kamrul Islam", phone: "+880 1819-223344", email: "order@ucc.com.bd", address: "BCS Laptop Bazar, Dhaka", balanceDue: 0 },
  { id: "sup-3", name: "Star Tech Wholesale Division", contact: "Farid Ahmed", phone: "+880 9678-002003", email: "b2b@startech.com.bd", address: "Pragati Sharani, Dhaka", balanceDue: 0 },
  { id: "sup-4", name: "Ryans Distribution Hub", contact: "Tanvir Rahman", phone: "+880 9638-442121", email: "supply@ryansplus.com", address: "Kusholi Bhaban, Taltola, Dhaka", balanceDue: 130000 },
  { id: "sup-5", name: "Global Brand PLC", contact: "Shafiqul Alam", phone: "+880 2-9183201", email: "dist@globalbrand.com.bd", address: "Panthapath, Dhaka", balanceDue: 0 },
  { id: "sup-6", name: "Excel Technologies Ltd", contact: "Zakir Hossain", phone: "+880 2-8318855", email: "sales@excel-bd.com", address: "Elephant Road, Dhaka", balanceDue: 0 },
];

const INITIAL_PURCHASES = [
  {
    id: "PO-2026-081",
    supplierId: "sup-1",
    supplierName: "Smart Technologies (BD) Ltd",
    invoiceRef: "ST-INV-88219",
    itemsSummary: "Intel Core i9-14900K (8x), AMD Ryzen 7 7800X3D (10x)",
    itemsCount: 18,
    totalCost: 780000,
    paidAmount: 780000,
    dueAmount: 0,
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "PO-2026-082",
    supplierId: "sup-2",
    supplierName: "UCC (Universal Computer)",
    invoiceRef: "UCC-2026-092",
    itemsSummary: "NVIDIA RTX 4090 24GB (3x), RTX 4080 Super (5x)",
    itemsCount: 8,
    totalCost: 1420000,
    paidAmount: 1420000,
    dueAmount: 0,
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: "PO-2026-083",
    supplierId: "sup-3",
    supplierName: "Star Tech Wholesale Division",
    invoiceRef: "STW-4412",
    itemsSummary: "Samsung 990 Pro 2TB (15x), Corsair Vengeance DDR5 (20x)",
    itemsCount: 35,
    totalCost: 510000,
    paidAmount: 510000,
    dueAmount: 0,
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "PO-2026-084",
    supplierId: "sup-4",
    supplierName: "Ryans Distribution Hub",
    invoiceRef: "RD-55109",
    itemsSummary: "Dell UltraSharp 32\" 4K (4x), ASUS ROG Swift 27\" (6x)",
    itemsCount: 10,
    totalCost: 650000,
    paidAmount: 520000,
    dueAmount: 130000,
    paymentStatus: "Partial",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "PO-2026-085",
    supplierId: "sup-5",
    supplierName: "Global Brand PLC",
    invoiceRef: "GB-90112",
    itemsSummary: "Apple MacBook Pro 16\" M3 Max (3x), MacBook Air M2 (5x)",
    itemsCount: 8,
    totalCost: 1650000,
    paidAmount: 1650000,
    dueAmount: 0,
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: "PO-2026-086",
    supplierId: "sup-6",
    supplierName: "Excel Technologies Ltd",
    invoiceRef: "EX-10492",
    itemsSummary: "Logitech MX Master 3S (15x), Razer Huntsman Keyboard (10x)",
    itemsCount: 25,
    totalCost: 285000,
    paidAmount: 285000,
    dueAmount: 0,
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
];

const INITIAL_SALES = [
  {
    id: "INV-2026-1041",
    invoiceNo: "INV-2026-1041",
    customerId: "cust-1",
    customerName: "Tanvir Ahmed",
    customerPhone: "+880 1712-445566",
    items: [
      { product: { id: "prod-1", name: `MacBook Pro 16" M3 Max (36GB, 1TB SSD)`, category: "Laptops" }, quantity: 1, unitPrice: 415000, costPrice: 332000, totalPrice: 415000 }
    ],
    itemsCount: 1,
    subtotal: 415000,
    discount: 5000,
    totalAmount: 410000,
    paidAmount: 410000,
    dueAmount: 0,
    profit: 78000,
    paymentMethod: "Credit Card (POS)",
    status: "Completed",
    cashier: "Admin / Owner",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: "INV-2026-1042",
    invoiceNo: "INV-2026-1042",
    customerId: "cust-2",
    customerName: "Rahat Hossain",
    customerPhone: "+880 1913-556677",
    items: [
      { product: { id: "prod-2", name: "Dell UltraSharp 32\" 4K USB-C Hub Monitor", category: "Monitors" }, quantity: 1, unitPrice: 105000, costPrice: 84000, totalPrice: 105000 },
      { product: { id: "prod-4", name: "Logitech MX Master 3S Ergonomic Mouse", category: "Peripherals" }, quantity: 1, unitPrice: 12000, costPrice: 9600, totalPrice: 12000 }
    ],
    itemsCount: 2,
    subtotal: 117000,
    discount: 2000,
    totalAmount: 115000,
    paidAmount: 115000,
    dueAmount: 0,
    profit: 21400,
    paymentMethod: "bKash Merchant",
    status: "Completed",
    cashier: "Admin / Owner",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },
  {
    id: "INV-2026-1043",
    invoiceNo: "INV-2026-1043",
    customerId: "cust-3",
    customerName: "Farhan Kabir",
    customerPhone: "+880 1614-667788",
    items: [
      { product: { id: "prod-3", name: "Sony WH-1000XM5 Wireless ANC Headphones", category: "Audio" }, quantity: 1, unitPrice: 42000, costPrice: 33600, totalPrice: 42000 }
    ],
    itemsCount: 1,
    subtotal: 42000,
    discount: 0,
    totalAmount: 42000,
    paidAmount: 42000,
    dueAmount: 0,
    profit: 8400,
    paymentMethod: "Cash",
    status: "Completed",
    cashier: "Admin / Owner",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "INV-2026-1044",
    invoiceNo: "INV-2026-1044",
    customerId: "cust-4",
    customerName: "Mahmudul Hasan",
    customerPhone: "+880 1819-334455",
    items: [
      { product: { id: "prod-2", name: "Dell UltraSharp 32\" 4K USB-C Hub Monitor", category: "Monitors" }, quantity: 1, unitPrice: 105000, costPrice: 84000, totalPrice: 105000 }
    ],
    itemsCount: 1,
    subtotal: 105000,
    discount: 0,
    totalAmount: 105000,
    paidAmount: 85000,
    dueAmount: 20000,
    profit: 21000,
    paymentMethod: "Cash / Due",
    status: "Completed",
    cashier: "Admin / Owner",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "INV-2026-1045",
    invoiceNo: "INV-2026-1045",
    customerId: "cust-5",
    customerName: "CyberTech Solutions (Corporate)",
    customerPhone: "+880 1711-223344",
    items: [
      { product: { id: "prod-1", name: `MacBook Pro 16" M3 Max`, category: "Laptops" }, quantity: 2, unitPrice: 415000, costPrice: 332000, totalPrice: 830000 },
      { product: { id: "prod-2", name: "Dell UltraSharp 32\" 4K Monitor", category: "Monitors" }, quantity: 2, unitPrice: 105000, costPrice: 84000, totalPrice: 210000 }
    ],
    itemsCount: 4,
    subtotal: 1040000,
    discount: 40000,
    totalAmount: 1000000,
    paidAmount: 850000,
    dueAmount: 150000,
    profit: 168000,
    paymentMethod: "Bank Wire / Due",
    status: "Completed",
    cashier: "Admin / Owner",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "INV-2026-1046",
    invoiceNo: "INV-2026-1046",
    customerId: "cust-6",
    customerName: "Walk-in Customer",
    customerPhone: "+880 1700-000000",
    items: [
      { product: { id: "prod-4", name: "Logitech MX Master 3S Ergonomic Mouse", category: "Peripherals" }, quantity: 1, unitPrice: 12000, costPrice: 9600, totalPrice: 12000 }
    ],
    itemsCount: 1,
    subtotal: 12000,
    discount: 0,
    totalAmount: 12000,
    paidAmount: 12000,
    dueAmount: 0,
    profit: 2400,
    paymentMethod: "Cash",
    status: "Completed",
    cashier: "Admin / Owner",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

const INITIAL_ONLINE_ORDERS = [
  {
    id: "ORD-9011",
    customerName: "Sazzad Hossain",
    customerPhone: "+880 1722-114455",
    shippingAddress: "House 24, Road 7, Dhanmondi, Dhaka",
    items: [
      { product: { id: "prod-1", name: `MacBook Pro 16" M3 Max` }, quantity: 1, price: 415000 }
    ],
    totalAmount: 415000,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Unpaid",
    orderStatus: "Pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
  },
  {
    id: "ORD-9012",
    customerName: "Mehedi Hasan",
    customerPhone: "+880 1833-225566",
    shippingAddress: "Apartment 4B, Road 113, Gulshan-2, Dhaka",
    items: [
      { product: { id: "prod-2", name: "Dell UltraSharp 32\" 4K USB-C Hub Monitor" }, quantity: 1, price: 105000 },
      { product: { id: "prod-4", name: "Logitech MX Master 3S Mouse" }, quantity: 1, price: 12000 }
    ],
    totalAmount: 117000,
    paymentMethod: "bKash Online",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "ORD-9013",
    customerName: "Ayesha Siddiqua",
    customerPhone: "+880 1944-336677",
    shippingAddress: "Sector 4, Uttara, Dhaka",
    items: [
      { product: { id: "prod-3", name: "Sony WH-1000XM5 Wireless Headphones" }, quantity: 1, price: 42000 }
    ],
    totalAmount: 42000,
    paymentMethod: "Nagad Online",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  },
  {
    id: "ORD-9014",
    customerName: "Imran Khan",
    customerPhone: "+880 1655-447788",
    shippingAddress: "Nasirabad Housing Society, Chittagong",
    items: [
      { product: { id: "prod-2", name: "Dell UltraSharp 32\" 4K Monitor" }, quantity: 1, price: 105000 }
    ],
    totalAmount: 105000,
    paymentMethod: "Credit Card (SSL)",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "ORD-9015",
    customerName: "Kazi Nayeem",
    customerPhone: "+880 1766-558899",
    shippingAddress: "Upashohor, Sylhet",
    items: [
      { product: { id: "prod-4", name: "Logitech MX Master 3S Mouse" }, quantity: 2, price: 24000 }
    ],
    totalAmount: 24000,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Unpaid",
    orderStatus: "Pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

const INITIAL_CUSTOMERS = [
  { id: "cust-1", name: "Tanvir Ahmed", phone: "+880 1712-445566", email: "tanvir@example.com", address: "Banani, Dhaka", totalSpent: 410000, dueAmount: 0, ordersCount: 1 },
  { id: "cust-2", name: "Rahat Hossain", phone: "+880 1913-556677", email: "rahat@example.com", address: "Dhanmondi, Dhaka", totalSpent: 115000, dueAmount: 0, ordersCount: 1 },
  { id: "cust-3", name: "Farhan Kabir", phone: "+880 1614-667788", email: "farhan@example.com", address: "Mirpur DOHS, Dhaka", totalSpent: 42000, dueAmount: 0, ordersCount: 1 },
  { id: "cust-4", name: "Mahmudul Hasan", phone: "+880 1819-334455", email: "mahmud@example.com", address: "Mohakhali, Dhaka", totalSpent: 105000, dueAmount: 20000, ordersCount: 1 },
  { id: "cust-5", name: "CyberTech Solutions (Corporate)", phone: "+880 1711-223344", email: "procurement@cybertech.bd", address: "Kawran Bazar, Dhaka", totalSpent: 1000000, dueAmount: 150000, ordersCount: 2 },
  { id: "cust-6", name: "Walk-in Customer", phone: "+880 1700-000000", email: "walkin@gadgetland.com", address: "Dhaka Counter", totalSpent: 12000, dueAmount: 0, ordersCount: 1 },
];

export const useAdminStore = create(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      suppliers: INITIAL_SUPPLIERS,
      purchases: INITIAL_PURCHASES,
      sales: INITIAL_SALES,
      onlineOrders: INITIAL_ONLINE_ORDERS,
      customers: INITIAL_CUSTOMERS,

      // === PRODUCT ACTIONS ===
      addProduct: (productData) => set((state) => {
        const id = `prod-${Date.now()}`;
        const newProduct = {
          id,
          title: productData.title,
          category: productData.category || "Components",
          brand: productData.brand || "Brand",
          buyingPrice: Number(productData.buyingPrice || 0),
          sellingPrice: Number(productData.sellingPrice || 0),
          stock: Number(productData.stock || 0),
          minStockAlert: Number(productData.minStockAlert || 5),
          sku: productData.sku || `GL-${Date.now().toString().slice(-6)}`,
          image: productData.image || "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
        };
        return { products: [newProduct, ...state.products] };
      }),

      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      })),

      adjustProductStock: (id, quantityDiff) => set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, stock: Math.max(0, p.stock + quantityDiff) } : p
        ),
      })),

      // === SALE / POS ACTIONS ===
      recordSale: (saleData) => {
        const invoiceNo = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const items = saleData.items || [];
        
        let subtotal = 0;
        let totalCost = 0;
        items.forEach((item) => {
          subtotal += (item.unitPrice || 0) * (item.quantity || 1);
          totalCost += (item.costPrice || (item.unitPrice * 0.8)) * (item.quantity || 1);
        });

        const discount = Number(saleData.discount || 0);
        const totalAmount = Math.max(0, subtotal - discount);
        const paidAmount = Number(saleData.paidAmount ?? totalAmount);
        const dueAmount = Math.max(0, totalAmount - paidAmount);
        const profit = Math.max(0, totalAmount - totalCost);

        const newSale = {
          id: invoiceNo,
          invoiceNo,
          customerId: saleData.customerId || "cust-walkin",
          customerName: saleData.customerName || "Walk-in Customer",
          customerPhone: saleData.customerPhone || "N/A",
          items,
          itemsCount: items.reduce((acc, i) => acc + (i.quantity || 1), 0),
          subtotal,
          discount,
          totalAmount,
          paidAmount,
          dueAmount,
          profit,
          paymentMethod: saleData.paymentMethod || "Cash",
          status: "Completed",
          cashier: "Admin / Owner",
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          // Decrement stock for sold products
          const updatedProducts = state.products.map((prod) => {
            const soldItem = items.find((i) => i.product.id === prod.id);
            if (soldItem) {
              return { ...prod, stock: Math.max(0, prod.stock - (soldItem.quantity || 1)) };
            }
            return prod;
          });

          // Update customer record or add new
          let updatedCustomers = [...state.customers];
          const existingCustIndex = updatedCustomers.findIndex(
            (c) => c.phone === saleData.customerPhone && saleData.customerPhone !== "N/A"
          );
          if (existingCustIndex >= 0) {
            updatedCustomers[existingCustIndex] = {
              ...updatedCustomers[existingCustIndex],
              totalSpent: updatedCustomers[existingCustIndex].totalSpent + totalAmount,
              dueAmount: updatedCustomers[existingCustIndex].dueAmount + dueAmount,
              ordersCount: updatedCustomers[existingCustIndex].ordersCount + 1,
            };
          } else if (saleData.customerName && saleData.customerName !== "Walk-in Customer") {
            updatedCustomers.push({
              id: `cust-${Date.now()}`,
              name: saleData.customerName,
              phone: saleData.customerPhone || "N/A",
              email: "N/A",
              address: "Dhaka",
              totalSpent: totalAmount,
              dueAmount: dueAmount,
              ordersCount: 1,
            });
          }

          return {
            sales: [newSale, ...state.sales],
            products: updatedProducts,
            customers: updatedCustomers,
          };
        });

        return newSale;
      },

      // === PURCHASE / INWARD STOCK ACTIONS ===
      recordPurchase: (purchaseData) => {
        const id = `PO-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
        const totalCost = Number(purchaseData.totalCost || 0);
        const paidAmount = Number(purchaseData.paidAmount ?? totalCost);
        const dueAmount = Math.max(0, totalCost - paidAmount);

        const newPurchase = {
          id,
          supplierId: purchaseData.supplierId || "sup-1",
          supplierName: purchaseData.supplierName || "Smart Technologies (BD) Ltd",
          invoiceRef: purchaseData.invoiceRef || `REF-${Math.floor(10000 + Math.random() * 90000)}`,
          itemsSummary: purchaseData.itemsSummary || "Computer Hardware & Components",
          itemsCount: Number(purchaseData.itemsCount || 1),
          totalCost,
          paidAmount,
          dueAmount,
          paymentStatus: dueAmount === 0 ? "Paid" : paidAmount === 0 ? "Due" : "Partial",
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          // If a specific product was restocked, increase its stock
          let updatedProducts = [...state.products];
          if (purchaseData.productId) {
            updatedProducts = updatedProducts.map((p) =>
              p.id === purchaseData.productId
                ? { ...p, stock: p.stock + Number(purchaseData.quantity || 1) }
                : p
            );
          }

          // Update supplier balance
          const updatedSuppliers = state.suppliers.map((s) =>
            s.id === purchaseData.supplierId ? { ...s, balanceDue: s.balanceDue + dueAmount } : s
          );

          return {
            purchases: [newPurchase, ...state.purchases],
            products: updatedProducts,
            suppliers: updatedSuppliers,
          };
        });

        return newPurchase;
      },

      // === ONLINE ORDER ACTIONS ===
      updateOrderStatus: (orderId, newStatus) => set((state) => ({
        onlineOrders: state.onlineOrders.map((o) =>
          o.id === orderId ? { ...o, orderStatus: newStatus } : o
        ),
      })),

      // === DUE SETTLEMENT ===
      payCustomerDue: (customerId, amount) => set((state) => ({
        customers: state.customers.map((c) =>
          c.id === customerId ? { ...c, dueAmount: Math.max(0, c.dueAmount - Number(amount)) } : c
        ),
      })),

      // === METRICS / KPI CALCULATOR ===
      getStats: () => {
        const state = get();
        const sales = state.sales || [];
        const purchases = state.purchases || [];
        const products = state.products || [];
        const customers = state.customers || [];
        const onlineOrders = state.onlineOrders || [];

        const now = new Date();
        const todayStr = now.toISOString().split("T")[0];
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Total sales
        const totalSales = sales.reduce((acc, s) => acc + (s.totalAmount || 0), 0);
        const totalProfit = sales.reduce((acc, s) => acc + (s.profit || 0), 0);

        // Today sales
        const todaySales = sales
          .filter((s) => s.createdAt && s.createdAt.startsWith(todayStr))
          .reduce((acc, s) => acc + (s.totalAmount || 0), 0);

        // Month sales
        const monthSales = sales
          .filter((s) => {
            const d = new Date(s.createdAt);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
          })
          .reduce((acc, s) => acc + (s.totalAmount || 0), 0);

        // Total purchases
        const totalPurchases = purchases.reduce((acc, p) => acc + (p.totalCost || 0), 0);
        const todayPurchases = purchases
          .filter((p) => p.createdAt && p.createdAt.startsWith(todayStr))
          .reduce((acc, p) => acc + (p.totalCost || 0), 0);

        // Low stock count
        const lowStockCount = products.filter((p) => p.stock <= (p.minStockAlert || 5)).length;

        // Total Dues
        const totalCustomerDues = customers.reduce((acc, c) => acc + (c.dueAmount || 0), 0);
        const totalSupplierDues = state.suppliers.reduce((acc, s) => acc + (s.balanceDue || 0), 0);

        // Inventory Values
        const inventoryCostValue = products.reduce((acc, p) => acc + p.stock * p.buyingPrice, 0);
        const inventoryRetailValue = products.reduce((acc, p) => acc + p.stock * p.sellingPrice, 0);

        // Pending online orders
        const pendingOrdersCount = onlineOrders.filter((o) => o.orderStatus === "Pending").length;

        return {
          totalSales,
          todaySales,
          monthSales,
          totalPurchases,
          todayPurchases,
          totalProfit,
          profitMargin: totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : "0",
          totalOrdersCount: sales.length + onlineOrders.length,
          pendingOrdersCount,
          lowStockCount,
          totalCustomerDues,
          totalSupplierDues,
          inventoryCostValue,
          inventoryRetailValue,
          totalProductsCount: products.length,
        };
      },

      // Chart Data generator
      getChartData: (range = "month") => {
        if (range === "day") {
          return [
            { name: "10 AM", sales: 45000, purchase: 0, profit: 9000 },
            { name: "12 PM", sales: 125000, purchase: 80000, profit: 25000 },
            { name: "02 PM", sales: 210000, purchase: 0, profit: 42000 },
            { name: "04 PM", sales: 340000, purchase: 150000, profit: 68000 },
            { name: "06 PM", sales: 490000, purchase: 0, profit: 98000 },
            { name: "08 PM", sales: 620000, purchase: 285000, profit: 124000 },
          ];
        }

        if (range === "year") {
          return [
            { name: "2022", sales: 12500000, purchase: 9800000, profit: 2700000 },
            { name: "2023", sales: 18200000, purchase: 14500000, profit: 3700000 },
            { name: "2024", sales: 24800000, purchase: 19600000, profit: 5200000 },
            { name: "2025", sales: 32400000, purchase: 25800000, profit: 6600000 },
            { name: "2026 (YTD)", sales: 14200000, purchase: 11100000, profit: 3100000 },
          ];
        }

        // Monthly (Default)
        return [
          { name: "Jan", sales: 1250000, purchase: 980000, profit: 270000 },
          { name: "Feb", sales: 1480000, purchase: 1150000, profit: 330000 },
          { name: "Mar", sales: 1920000, purchase: 1540000, profit: 380000 },
          { name: "Apr", sales: 1650000, purchase: 1280000, profit: 370000 },
          { name: "May", sales: 2100000, purchase: 1680000, profit: 420000 },
          { name: "Jun", sales: 2450000, purchase: 1950000, profit: 500000 },
          { name: "Jul", sales: 2200000, purchase: 1750000, profit: 450000 },
          { name: "Aug", sales: 2680000, purchase: 2100000, profit: 580000 },
          { name: "Sep", sales: 2850000, purchase: 2280000, profit: 570000 },
          { name: "Oct (Active)", sales: 1689000, purchase: 1395000, profit: 294000 },
        ];
      },
    }),
    {
      name: "gadgetland-admin-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

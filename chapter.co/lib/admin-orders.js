const fs = require('fs');
const path = require('path');

const STORAGE_KEY = 'chapter-admin-orders';
const DATA_FILE = path.join(process.cwd(), 'data', 'admin-orders.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }
}

function getStoredOrders() {
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  try {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return orders;
  }

  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2), 'utf8');
  } catch {}

  return orders;
}

function normalizeAdminOrder(order = {}) {
  const items = Array.isArray(order.items) ? order.items : [];
  const normalizedItems = items.map((item) => ({
    name: item.name || item.title || 'สินค้า',
    price: Number(item.price) || 0,
    qty: Number(item.qty || item.quantity || 1) || 1
  }));

  const summary = order.summary || {};
  const subtotal = Number(summary.subtotal ?? order.subtotal ?? normalizedItems.reduce((sum, item) => sum + item.price * item.qty, 0)) || 0;
  const shippingFee = Number(summary.shippingFee ?? order.shippingFee ?? 0) || 0;
  const discount = Number(summary.discountAmount ?? order.discount ?? 0) || 0;
  const amount = Number(summary.total ?? order.amount ?? subtotal + shippingFee - discount) || 0;

  return {
    id: order.id || `ORD-${Date.now()}`,
    customer: order.customer?.name || order.customer || 'ลูกค้า',
    date: order.date || new Date().toLocaleDateString('th-TH'),
    amount,
    status: order.status || 'รอชำระเงิน',
    address: order.address || order.customer?.address || '-',
    shippingMethod: order.shippingMethod || 'standard',
    items: normalizedItems,
    subtotal,
    shippingFee,
    discount,
    promo: order.promo || '-',
    paymentMethod: order.paymentMethod || 'promptpay',
    paymentTime: order.paymentTime || '-',
    trackingNumber: order.trackingNumber || null,
    slipUrl: order.slipUrl || null,
    createdAt: order.createdAt || new Date().toISOString()
  };
}

function upsertAdminOrder(order) {
  const normalized = normalizeAdminOrder(order);
  const orders = getStoredOrders();
  const existingIndex = orders.findIndex((item) => item.id === normalized.id);

  if (existingIndex >= 0) {
    orders[existingIndex] = { ...orders[existingIndex], ...normalized };
  } else {
    orders.unshift(normalized);
  }

  return saveOrders(orders);
}

function updateAdminOrder(id, updates = {}) {
  const orders = getStoredOrders();
  const nextOrders = orders.map((order) => (order.id === id ? { ...order, ...updates } : order));
  return saveOrders(nextOrders);
}

function listAdminOrders() {
  return getStoredOrders();
}

module.exports = {
  STORAGE_KEY,
  normalizeAdminOrder,
  upsertAdminOrder,
  updateAdminOrder,
  listAdminOrders
};

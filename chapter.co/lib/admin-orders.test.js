const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeAdminOrder, upsertAdminOrder, updateAdminOrder } = require('./admin-orders');

test('normalizeAdminOrder converts checkout payload to admin format', () => {
  const order = normalizeAdminOrder({
    id: 'ORD-999',
    customer: { name: 'สมชาย', address: 'กรุงเทพฯ' },
    items: [{ title: 'Clean Code', price: 300, quantity: 2 }],
    summary: { subtotal: 600, shippingFee: 50, discountAmount: 0, total: 650 },
    shippingMethod: 'express',
    paymentMethod: 'promptpay'
  });

  assert.equal(order.id, 'ORD-999');
  assert.equal(order.status, 'รอชำระเงิน');
  assert.equal(order.amount, 650);
  assert.equal(order.items[0].name, 'Clean Code');
  assert.equal(order.shippingMethod, 'express');
});

test('upsertAdminOrder and updateAdminOrder persist order changes', () => {
  const created = upsertAdminOrder({
    id: 'ORD-TEST-1',
    customer: 'นภา',
    items: [{ name: 'Atomic Habits', price: 200, qty: 1 }],
    subtotal: 200,
    shippingFee: 0,
    discount: 0,
    amount: 200,
    address: 'เชียงใหม่',
    shippingMethod: 'standard',
    paymentMethod: 'promptpay'
  });

  assert.equal(created[0].id, 'ORD-TEST-1');
  assert.equal(created[0].status, 'รอชำระเงิน');

  const updated = updateAdminOrder('ORD-TEST-1', { status: 'รอจัดส่ง', trackingNumber: 'TH123456' });
  assert.equal(updated.find((order) => order.id === 'ORD-TEST-1').status, 'รอจัดส่ง');
  assert.equal(updated.find((order) => order.id === 'ORD-TEST-1').trackingNumber, 'TH123456');
});

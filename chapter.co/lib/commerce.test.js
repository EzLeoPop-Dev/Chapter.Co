const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateCartSummary, createOrder } = require('./commerce');

test('calculateCartSummary applies coupon and shipping correctly', () => {
  const result = calculateCartSummary([
    { id: 'bk-1', title: 'Clean Code', price: 250, quantity: 2 }
  ], { couponCode: 'SAVE10' });

  assert.equal(result.subtotal, 500);
  assert.equal(result.discountAmount, 50);
  assert.equal(result.shippingFee, 0);
  assert.equal(result.taxAmount, 31);
  assert.equal(result.total, 481);
});

test('createOrder returns a persisted order with summary', () => {
  const result = createOrder([
    { id: 'bk-2', title: 'The Pragmatic Programmer', price: 400, quantity: 1 }
  ], {
    customerName: 'สมชาย',
    email: 'somchai@example.com',
    address: 'กรุงเทพฯ'
  }, { couponCode: 'WELCOME' });

  assert.equal(result.success, true);
  assert.ok(result.order.orderId.startsWith('ORD-'));
  assert.equal(result.order.summary.total, 400);
  assert.equal(result.order.customer.email, 'somchai@example.com');
});

test('invalid coupon does not change the total', () => {
  const result = calculateCartSummary([
    { id: 'bk-3', title: 'Refactoring', price: 300, quantity: 1 }
  ], { couponCode: 'NOTREAL' });

  assert.equal(result.discountAmount, 0);
  assert.equal(result.total, 300);
  assert.equal(result.coupon.isValid, false);
});

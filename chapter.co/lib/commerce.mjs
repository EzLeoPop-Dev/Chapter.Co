const COUPONS = {
  SAVE10: { type: 'percent', value: 10 },
  WELCOME: { type: 'percent', value: 0, freeShipping: true, taxExempt: true }
};

function calculateCartSummary(items = [], options = {}) {
  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const coupon = COUPONS[(options.couponCode || '').toUpperCase()];
  const discountPercent = coupon ? coupon.value : 0;
  const discountAmount = coupon ? (coupon.type === 'percent' ? Math.round(subtotal * (coupon.value / 100)) : Math.min(subtotal, coupon.value)) : 0;

  // Determine shipping fee: standard = free, express = +50, coupons may override
  let shippingFee = 0;
  const method = (options.shippingMethod || 'standard');
  if (method === 'express') {
    shippingFee = coupon?.freeShipping ? 0 : 50;
  }
  if (subtotal === 0) shippingFee = 0;
  if (coupon?.freeShipping) shippingFee = 0;

  let taxAmount = 0;
  if (subtotal >= 500 && !coupon?.taxExempt) {
    taxAmount = Math.floor((subtotal - discountAmount + shippingFee) * 0.07);
  }
  const total = subtotal - discountAmount + shippingFee + taxAmount;

  return {
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    total,
    couponCode: options.couponCode || null,
    discountPercent,
    coupon: {
      code: (options.couponCode || '').toUpperCase() || null,
      isValid: Boolean(coupon),
      type: coupon?.type || null,
      value: coupon?.value || 0
    }
  };
}

function createOrder(items = [], customer = {}, options = {}) {
  const summary = calculateCartSummary(items, options);
  return {
    success: true,
    order: {
      orderId: `ORD-${Date.now()}`,
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0
      })),
      customer: {
        name: customer.customerName || customer.name || 'Guest',
        email: customer.email || '',
        address: customer.address || ''
      },
      summary,
      createdAt: new Date().toISOString()
    }
  };
}

export { calculateCartSummary, createOrder };
export default { calculateCartSummary, createOrder };

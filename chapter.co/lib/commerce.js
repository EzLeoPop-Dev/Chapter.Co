const COUPONS = {
  SAVE10: { type: 'percent', value: 10 },
  WELCOME: { type: 'percent', value: 0, freeShipping: true, taxExempt: true },
  FIXED50: { type: 'fixed', value: 50 }
};

function calculateCartSummary(items = [], options = {}) {
  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const couponCodes = Array.isArray(options.couponCodes)
    ? options.couponCodes.map((code) => String(code || '').trim().toUpperCase()).filter(Boolean)
    : [String(options.couponCode || '').trim().toUpperCase()].filter(Boolean);

  const coupons = couponCodes.map((code) => {
    const matched = COUPONS[code] || null;
    return {
      code,
      isValid: Boolean(matched),
      type: matched?.type || null,
      value: matched?.value || 0,
      freeShipping: matched?.freeShipping || false,
      taxExempt: matched?.taxExempt || false
    };
  });

  let discountAmount = 0;
  coupons.forEach((coupon) => {
    if (!coupon.isValid) return;
    if (coupon.type === 'percent') {
      discountAmount += Math.round(subtotal * (coupon.value / 100));
    } else if (coupon.type === 'fixed') {
      discountAmount += Math.min(subtotal, coupon.value);
    }
  });
  discountAmount = Math.min(discountAmount, subtotal);

  const hasFreeShipping = coupons.some((coupon) => coupon.freeShipping);
  const isTaxExempt = coupons.some((coupon) => coupon.taxExempt);

  let shippingFee = subtotal > 0 ? (subtotal >= 1000 ? 0 : 60) : 0;
  if (hasFreeShipping) shippingFee = 0;

  const method = options.shippingMethod || 'standard';
  if (method === 'express') {
    shippingFee = hasFreeShipping ? 0 : 50;
  } else {
    shippingFee = 0;
  }

  let taxAmount = 0;
  if (subtotal >= 500 && !isTaxExempt) {
    taxAmount = Math.floor((subtotal - discountAmount + shippingFee) * 0.07);
  }

  const total = subtotal - discountAmount + shippingFee + taxAmount;
  const coupon = coupons.length ? coupons[0] : { code: null, isValid: false, type: null, value: 0 };

  return {
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    total,
    couponCodes: couponCodes.length ? couponCodes : null,
    discountPercent: coupons.filter((c) => c.type === 'percent').reduce((sum, c) => sum + c.value, 0),
    coupons,
    coupon: {
      code: coupon.code,
      isValid: coupon.isValid,
      type: coupon.type,
      value: coupon.value
    }
  };
}

function createOrder(items = [], customer = {}, options = {}) {
  const summary = calculateCartSummary(items, options);
  const order = {
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
      address: customer.address || '',
      phone: customer.phone || null,
      label: customer.label || null
    },
    summary,
    shippingMethod: options.shippingMethod || null,
    paymentMethod: options.paymentMethod || null,
    createdAt: new Date().toISOString()
  };

  return {
    success: true,
    order
  };
}

export { calculateCartSummary, createOrder };
export default { calculateCartSummary, createOrder };

const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizePromotion, getPromotionByCode } = require('./promotions');

test('normalizePromotion parses percent and fixed discounts', () => {
  const percentPromo = normalizePromotion({ name: 'Save 10%', code: 'SAVE10', discount: '10%' });
  const fixedPromo = normalizePromotion({ name: 'Fixed 50', code: 'FIXED50', discount: '50 บาท' });

  assert.equal(percentPromo.type, 'percent');
  assert.equal(percentPromo.value, 10);
  assert.equal(fixedPromo.type, 'fixed');
  assert.equal(fixedPromo.value, 50);
});

test('getPromotionByCode returns an active promotion for a valid code', () => {
  const promo = getPromotionByCode('SAVE10');
  assert.ok(promo);
  assert.equal(promo.code, 'SAVE10');
  assert.equal(promo.status, 'Active');
});

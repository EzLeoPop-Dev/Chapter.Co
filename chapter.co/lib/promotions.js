const fs = require('fs');
const path = require('path');

const STORAGE_KEY = 'chapter-promotions';
const DATA_FILE = path.join(process.cwd(), 'data', 'promotions.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultPromotions(), null, 2), 'utf8');
  }
}

function defaultPromotions() {
  return [
    { id: 1, name: 'ส่วนลด 10% เดือนเกิด', code: 'HBD2026', discount: '10%', status: 'Active', end_date: '31 ธ.ค. 2026' },
    { id: 2, name: 'ส่งฟรี 500 บาทขึ้นไป', code: 'FREESHIP', discount: 'ค่าส่ง 0 บาท', status: 'Active', end_date: 'ไม่มีกำหนด' },
    { id: 3, name: 'Flash Sale (หมดเขต)', code: 'FLASH50', discount: '50 บาท', status: 'Expired', end_date: '10 ก.ค. 2026' }
  ];
}

function readPromotions() {
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultPromotions();
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : defaultPromotions();
    } catch {
      return defaultPromotions();
    }
  }

  try {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultPromotions();
  } catch {
    return defaultPromotions();
  }
}

function writePromotions(promotions) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(promotions));
    return promotions;
  }

  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(promotions, null, 2), 'utf8');
  } catch {}

  return promotions;
}

function normalizePromotion(promo = {}) {
  const discountText = String(promo.discount || '').trim();
  const percentMatch = discountText.match(/(\d+(?:\.\d+)?)(?:\s*)%/);
  const fixedMatch = discountText.match(/(\d+(?:\.\d+)?)(?:\s*)(บาท|฿)/);

  if (percentMatch) {
    return {
      ...promo,
      type: 'percent',
      value: Number(percentMatch[1]) || 0,
      status: promo.status || 'Active'
    };
  }

  if (fixedMatch) {
    return {
      ...promo,
      type: 'fixed',
      value: Number(fixedMatch[1]) || 0,
      status: promo.status || 'Active'
    };
  }

  return {
    ...promo,
    type: 'fixed',
    value: 0,
    status: promo.status || 'Active'
  };
}

function getPromotionByCode(code) {
  const promotions = readPromotions();
  const normalizedCode = String(code || '').trim().toUpperCase();
  const promo = promotions.find((item) => String(item.code || '').trim().toUpperCase() === normalizedCode);
  if (!promo) return null;
  const normalized = normalizePromotion(promo);
  return normalized.status === 'Active' ? normalized : null;
}

function upsertPromotion(promo) {
  const promotions = readPromotions();
  const next = Array.isArray(promotions) ? promotions : [];
  const normalized = { ...promo, id: promo.id || Date.now(), code: String(promo.code || '').trim().toUpperCase(), status: promo.status || 'Active' };
  const index = next.findIndex((item) => item.id === normalized.id);

  if (index >= 0) {
    next[index] = normalized;
  } else {
    next.unshift(normalized);
  }

  return writePromotions(next);
}

function deletePromotion(id) {
  const promotions = readPromotions();
  const next = promotions.filter((item) => item.id !== id);
  return writePromotions(next);
}

module.exports = {
  STORAGE_KEY,
  defaultPromotions,
  readPromotions,
  writePromotions,
  normalizePromotion,
  getPromotionByCode,
  upsertPromotion,
  deletePromotion
};

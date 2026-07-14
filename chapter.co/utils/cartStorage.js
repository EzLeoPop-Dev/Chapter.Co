const CART_STORAGE_KEY = 'chapter-cart-items';

const isBrowser = () => typeof window !== 'undefined';

export const getCartStorageKey = () => CART_STORAGE_KEY;

export const readCartItems = () => {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeCartItems = (items) => {
  if (!isBrowser()) return;
  const normalizedItems = Array.isArray(items) ? items : [];
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizedItems));
  window.dispatchEvent(new Event('chapter-cart-updated'));
};

export const addBookToCart = (book, qtyToAdd = 1) => {
  const quantity = Number(qtyToAdd || 1);
  if (!book || quantity <= 0) {
    return { ok: false, reason: 'invalid' };
  }

  const stock = Number(book.stock || 0);
  if (stock <= 0) {
    return { ok: false, reason: 'out-of-stock' };
  }

  const currentItems = readCartItems();
  const existingItem = currentItems.find((item) => item.id === book.id);
  const currentQty = Number(existingItem?.qty || 0);
  const nextQty = currentQty + quantity;

  if (nextQty > stock) {
    return { ok: false, reason: 'exceed-stock', maxQty: stock };
  }

  const nextItems = existingItem
    ? currentItems.map((item) => (item.id === book.id ? { ...item, qty: nextQty } : item))
    : [...currentItems, { ...book, qty: quantity }];

  writeCartItems(nextItems);
  return { ok: true, qty: nextQty };
};

export const updateCartItemQty = (bookId, qty) => {
  const nextQty = Number(qty || 0);
  const currentItems = readCartItems();

  if (nextQty < 1) {
    const nextItems = currentItems.filter((item) => item.id !== bookId);
    writeCartItems(nextItems);
    return;
  }

  const nextItems = currentItems.map((item) => {
    if (item.id !== bookId) return item;
    const stock = Number(item.stock || 0);
    const safeQty = stock > 0 ? Math.min(nextQty, stock) : nextQty;
    return { ...item, qty: safeQty };
  });

  writeCartItems(nextItems);
};

export const removeCartItem = (bookId) => {
  const nextItems = readCartItems().filter((item) => item.id !== bookId);
  writeCartItems(nextItems);
};

export const getCartItemCount = (items) =>
  (Array.isArray(items) ? items : []).reduce((sum, item) => sum + Number(item.qty || 0), 0);

export const getCartSubtotal = (items) =>
  (Array.isArray(items) ? items : []).reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);

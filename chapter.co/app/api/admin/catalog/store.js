import booksCatalog from '../../../data/books.json';
import { writeFile } from 'node:fs/promises';

const UNCATEGORIZED_LABEL = 'ไม่มีหมวดหมู่';
const UNPUBLISHED_LABEL = 'ไม่มีสำนักพิมพ์';
const FALLBACK_BOOK_IMAGE = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80';
const BOOKS_JSON_URL = new URL('../../../data/books.json', import.meta.url);

const normalizeBook = (book, index) => {
  const stock = Number(book.stock ?? 20);
  const isOut = stock <= 0;
  const isLow = stock > 0 && stock <= 15;
  const normalizedId = Number.isFinite(Number(book.id)) ? Number(book.id) : index + 1;

  return {
    id: normalizedId,
    title: book.title,
    image: (book.image || '').trim() || FALLBACK_BOOK_IMAGE,
    price: Number(book.price || 0),
    stock,
    status: isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock',
    category: book.category || UNCATEGORIZED_LABEL,
    publisher: book.publisher || UNPUBLISHED_LABEL,
    author: book.author || '',
    isbn: book.isbn || '',
    pages: book.pages || '',
    description: book.description || '',
    bookType: book.bookType || 'ปกแข็ง',
    publishDate: book.publishDate || '',
    rating: Number(book.rating || 0),
    reviews: book.reviews || '0',
    sample: book.sample ?? null,
    reviewsData: Array.isArray(book.reviewsData) ? book.reviewsData : [],
  };
};

const buildGroups = (books, key) => {
  const fallback = key === 'category' ? UNCATEGORIZED_LABEL : UNPUBLISHED_LABEL;
  const counts = books.reduce((acc, book) => {
    const value = (book[key] || '').trim() || fallback;
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts)
    .sort((a, b) => a.localeCompare(b, 'th'))
    .map((name, index) => ({ id: index + 1, name, count: counts[name] }));
};

let booksState = booksCatalog.map(normalizeBook);
let nextBookId = booksState.reduce((maxId, book) => {
  const numericId = Number(book.id);
  return Number.isFinite(numericId) && numericId > maxId ? numericId : maxId;
}, 0) + 1;

const sanitizeStatus = (stock) => {
  const value = Number(stock || 0);
  if (value <= 0) return 'Out of Stock';
  if (value <= 15) return 'Low Stock';
  return 'In Stock';
};

const toPersistedBook = (book, index) => ({
  id: Number.isFinite(Number(book.id)) ? Number(book.id) : index + 1,
  title: book.title || '',
  category: book.category || UNCATEGORIZED_LABEL,
  price: Number(book.price || 0),
  bookType: book.bookType || 'ปกแข็ง',
  author: book.author || '',
  pages: book.pages || '',
  publisher: book.publisher || UNPUBLISHED_LABEL,
  description: book.description || '',
  publishDate: book.publishDate || '',
  rating: Number(book.rating || 0),
  reviews: book.reviews || '0',
  image: String(book.image || '').trim() || FALLBACK_BOOK_IMAGE,
  sample: book.sample ?? null,
  reviewsData: Array.isArray(book.reviewsData) ? book.reviewsData : [],
  stock: Number(book.stock || 0),
  isbn: book.isbn || '',
});

export const persistCatalogToBooksJson = async () => {
  const payload = booksState
    .slice()
    .sort((a, b) => Number(a.id) - Number(b.id))
    .map(toPersistedBook);

  await writeFile(BOOKS_JSON_URL, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8');
};

export const getCatalogSnapshot = () => ({
  books: booksState,
  categories: buildGroups(booksState, 'category'),
  publishers: buildGroups(booksState, 'publisher'),
});

export const catalogMutations = {
  createCategory({ name, bookIds = [] }) {
    const normalizedName = (name || '').trim();
    if (!normalizedName) {
      throw new Error('Category name is required');
    }

    booksState = booksState.map((book) => (
      bookIds.includes(book.id) ? { ...book, category: normalizedName } : book
    ));
  },

  updateCategory({ oldName, newName, bookIds = [] }) {
    const normalizedOld = (oldName || '').trim();
    const normalizedNew = (newName || '').trim();
    if (!normalizedOld || !normalizedNew) {
      throw new Error('Category name is required');
    }

    booksState = booksState.map((book) => {
      if (bookIds.includes(book.id)) {
        return { ...book, category: normalizedNew };
      }
      if (book.category === normalizedOld) {
        return { ...book, category: UNCATEGORIZED_LABEL };
      }
      return book;
    });
  },

  deleteCategory({ name }) {
    const normalizedName = (name || '').trim();
    if (!normalizedName) {
      throw new Error('Category name is required');
    }

    booksState = booksState.map((book) => (
      book.category === normalizedName
        ? { ...book, category: UNCATEGORIZED_LABEL }
        : book
    ));
  },

  createPublisher({ name, bookIds = [] }) {
    const normalizedName = (name || '').trim();
    if (!normalizedName) {
      throw new Error('Publisher name is required');
    }

    booksState = booksState.map((book) => (
      bookIds.includes(book.id) ? { ...book, publisher: normalizedName } : book
    ));
  },

  updatePublisher({ oldName, newName, bookIds = [] }) {
    const normalizedOld = (oldName || '').trim();
    const normalizedNew = (newName || '').trim();
    if (!normalizedOld || !normalizedNew) {
      throw new Error('Publisher name is required');
    }

    booksState = booksState.map((book) => {
      if (bookIds.includes(book.id)) {
        return { ...book, publisher: normalizedNew };
      }
      if (book.publisher === normalizedOld) {
        return { ...book, publisher: UNPUBLISHED_LABEL };
      }
      return book;
    });
  },

  deletePublisher({ name }) {
    const normalizedName = (name || '').trim();
    if (!normalizedName) {
      throw new Error('Publisher name is required');
    }

    booksState = booksState.map((book) => (
      book.publisher === normalizedName
        ? { ...book, publisher: UNPUBLISHED_LABEL }
        : book
    ));
  },

  createBook({ book }) {
    if (!book?.title || !book?.price || !String(book?.image || '').trim()) {
      throw new Error('Book title, price and image are required');
    }

    const stock = Number(book.stock || 0);
    const item = {
      id: nextBookId,
      title: book.title,
      image: String(book.image || '').trim() || FALLBACK_BOOK_IMAGE,
      author: book.author || '',
      publisher: book.publisher || UNPUBLISHED_LABEL,
      category: book.category || UNCATEGORIZED_LABEL,
      isbn: book.isbn || '',
      pages: book.pages || '',
      description: book.description || '',
      bookType: book.bookType || 'ปกแข็ง',
      publishDate: book.publishDate || '',
      rating: Number(book.rating || 0),
      reviews: book.reviews || '0',
      sample: book.sample ?? null,
      reviewsData: Array.isArray(book.reviewsData) ? book.reviewsData : [],
      price: Number(book.price || 0),
      stock,
      status: sanitizeStatus(stock),
    };

    nextBookId += 1;
    booksState = [...booksState, item];
  },

  updateBook({ id, book }) {
    if (!id || !book?.title || !book?.price) {
      throw new Error('Book id, title and price are required');
    }

    booksState = booksState.map((item) => {
      if (item.id !== id) {
        return item;
      }
      const stock = Number(book.stock || 0);
      return {
        ...item,
        ...book,
        image: String(book.image || '').trim() || item.image || FALLBACK_BOOK_IMAGE,
        price: Number(book.price || 0),
        stock,
        status: sanitizeStatus(stock),
        category: book.category || UNCATEGORIZED_LABEL,
        publisher: book.publisher || UNPUBLISHED_LABEL,
      };
    });
  },

  deleteBook({ id }) {
    if (!id) {
      throw new Error('Book id is required');
    }

    booksState = booksState.filter((book) => book.id !== id);
  },
};

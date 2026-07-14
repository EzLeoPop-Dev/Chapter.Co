import booksCatalog from '../../../data/books.json';

const UNCATEGORIZED_LABEL = 'ไม่มีหมวดหมู่';
const UNPUBLISHED_LABEL = 'ไม่มีสำนักพิมพ์';

const normalizeBook = (book, index) => {
  const stock = Number(book.stock ?? 20);
  const isOut = stock <= 0;
  const isLow = stock > 0 && stock <= 15;

  return {
    id: `BK-${String(index + 1).padStart(3, '0')}`,
    title: book.title,
    price: Number(book.price || 0),
    stock,
    status: isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock',
    category: book.category || UNCATEGORIZED_LABEL,
    publisher: book.publisher || UNPUBLISHED_LABEL,
    author: book.author || '',
    isbn: book.isbn || '',
    pages: book.pages || '',
    description: book.description || '',
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
let nextBookId = booksState.length + 1;

const sanitizeStatus = (stock) => {
  const value = Number(stock || 0);
  if (value <= 0) return 'Out of Stock';
  if (value <= 15) return 'Low Stock';
  return 'In Stock';
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
    if (!book?.title || !book?.price) {
      throw new Error('Book title and price are required');
    }

    const stock = Number(book.stock || 0);
    const item = {
      id: `BK-${String(nextBookId).padStart(3, '0')}`,
      title: book.title,
      author: book.author || '',
      publisher: book.publisher || UNPUBLISHED_LABEL,
      category: book.category || UNCATEGORIZED_LABEL,
      isbn: book.isbn || '',
      pages: book.pages || '',
      description: book.description || '',
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

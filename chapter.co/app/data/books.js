import booksData from './books.json';

const getDefaultStock = (book) => {
  const base = (Number(book.id) * 7) % 26;
  return base;
};

const getStockStatus = (stock) => {
  if (stock <= 0) return 'Out of Stock';
  if (stock <= 5) return 'Low Stock';
  return 'In Stock';
};

const getFallbackReviews = (book) => {
  const title = book.title || 'หนังสือ';
  const category = book.category || 'ทั่วไป';
  return [
    {
      id: 1,
      user: 'นักอ่านชื่นชอบ',
      rating: 5,
      comment: `"${title}" น่าสนใจและมีคุณค่าทางความรู้ในหมวด${category}`,
    },
    {
      id: 2,
      user: 'เด็กนักอ่าน',
      rating: 4,
      comment: "อ่านแล้วเพลิดเพลินและได้ความรู้มากมาย",
    },
    {
      id: 3,
      user: 'ชอบหนังสือ',
      rating: 5,
      comment: "เนื้อหาดีมากและภาพประกอบสวยงาม",
    },
  ];
};

const normalizeBooks = (data) =>
  data.map((book) => {
    const stock = Number.isFinite(Number(book.stock)) ? Number(book.stock) : getDefaultStock(book);

    return {
      ...book,
      stock,
      stockStatus: getStockStatus(stock),
      desc: book.desc || book.description || 'ไม่มีรายละเอียดเพิ่มเติม',
      isbn: book.isbn || 'ไม่ระบุ',
      dimensions: book.dimensions || 'ไม่ระบุ',
      reviewsData: Array.isArray(book.reviewsData) && book.reviewsData.length > 0 ? book.reviewsData : getFallbackReviews(book),
      chapters: book.chapters || (book.sample ? [{ number: 1, title: 'ตัวอย่างตอนที่ 1', isFree: true }] : []),
    };
  });

export const books = normalizeBooks(booksData);
export const categories = ['All', ...new Set(books.map((book) => book.category))];
export const bookTypes = ['All', 'ปกแข็ง', 'E-Book', 'กาตูนแบบตอน'];
export const publishers = ['All', ...new Set(books.map((book) => book.publisher))];

export const getFilteredBooks = ({
  booksData = books,
  searchQuery = '',
  selectedCategory = 'All',
  selectedBookTypes = [],
  selectedPublisher = 'All',
  priceMin = '',
  priceMax = '',
}) => {
  const normalizedQuery = (searchQuery || '').trim().toLowerCase();
  const minPrice = Number(priceMin);
  const maxPrice = Number(priceMax);
  const hasMinPrice = priceMin !== '' && !Number.isNaN(minPrice);
  const hasMaxPrice = priceMax !== '' && !Number.isNaN(maxPrice);

  return booksData.filter((book) => {
    const price = Number(book.price);
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesBookType = selectedBookTypes.length === 0 || selectedBookTypes.includes(book.bookType);
    const matchesPublisher = selectedPublisher === 'All' || book.publisher === selectedPublisher;
    const matchesSearch = !normalizedQuery || book.title.toLowerCase().includes(normalizedQuery) || book.author.toLowerCase().includes(normalizedQuery);
    const matchesPrice = (!hasMinPrice || price >= minPrice) && (!hasMaxPrice || price <= maxPrice);

    return matchesCategory && matchesBookType && matchesPublisher && matchesSearch && matchesPrice;
  });
};

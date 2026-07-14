import { books, getFilteredBooks } from '@/app/data/books';

export async function POST(request) {
  try {
    const {
      searchQuery = '',
      selectedCategory = 'All',
      selectedBookTypes = [],
      selectedPublisher = 'All',
      priceMin = '',
      priceMax = '',
    } = await request.json();

    const filteredBooks = getFilteredBooks({
      booksData: books,
      searchQuery,
      selectedCategory,
      selectedBookTypes,
      selectedPublisher,
      priceMin,
      priceMax,
    });

    return Response.json({
      success: true,
      count: filteredBooks.length,
      books: filteredBooks,
    });
  } catch (error) {
    console.error('Filter error:', error);
    return Response.json(
      { success: false, error: 'Failed to filter books' },
      { status: 500 }
    );
  }
}

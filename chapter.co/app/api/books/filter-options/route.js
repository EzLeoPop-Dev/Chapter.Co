import { categories, bookTypes, publishers } from '@/app/data/books';

export async function GET() {
  try {
    return Response.json({
      success: true,
      categories: categories.filter((cat) => cat !== 'All'),
      bookTypes: bookTypes.filter((type) => type !== 'All'),
      publishers: publishers.filter((pub) => pub !== 'All'),
    });
  } catch (error) {
    console.error('Get filter options error:', error);
    return Response.json(
      { success: false, error: 'Failed to get filter options' },
      { status: 500 }
    );
  }
}

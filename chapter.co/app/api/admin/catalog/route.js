import { catalogMutations, getCatalogSnapshot, persistCatalogToBooksJson } from './store';

export async function GET() {
  try {
    return Response.json({
      success: true,
      ...getCatalogSnapshot(),
    });
  } catch (error) {
    console.error('Catalog GET error:', error);
    return Response.json({ success: false, error: 'Failed to load catalog' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { action, payload = {} } = await request.json();

    switch (action) {
      case 'category:create':
        catalogMutations.createCategory(payload);
        break;
      case 'category:update':
        catalogMutations.updateCategory(payload);
        break;
      case 'category:delete':
        catalogMutations.deleteCategory(payload);
        break;
      case 'publisher:create':
        catalogMutations.createPublisher(payload);
        break;
      case 'publisher:update':
        catalogMutations.updatePublisher(payload);
        break;
      case 'publisher:delete':
        catalogMutations.deletePublisher(payload);
        break;
      case 'book:create':
        catalogMutations.createBook(payload);
        break;
      case 'book:update':
        catalogMutations.updateBook(payload);
        break;
      case 'book:delete':
        catalogMutations.deleteBook(payload);
        break;
      default:
        return Response.json({ success: false, error: 'Unsupported action' }, { status: 400 });
    }

    await persistCatalogToBooksJson();

    return Response.json({
      success: true,
      ...getCatalogSnapshot(),
    });
  } catch (error) {
    console.error('Catalog POST error:', error);
    return Response.json({ success: false, error: error.message || 'Failed to update catalog' }, { status: 500 });
  }
}

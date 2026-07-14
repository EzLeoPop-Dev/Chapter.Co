import { NextResponse } from 'next/server';
import { calculateCartSummary } from '../../../lib/commerce.js';

export async function POST(request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    const summary = calculateCartSummary(items, {
      couponCodes: Array.isArray(body?.couponCodes)
        ? body.couponCodes
        : body?.couponCode ? [body.couponCode] : [],
      shippingMethod: body?.shippingMethod
    });

    return NextResponse.json({
      success: true,
      items,
      summary
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to calculate cart summary'
      },
      { status: 400 }
    );
  }
}

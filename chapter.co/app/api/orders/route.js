import { NextResponse } from 'next/server';
import { createOrder } from '../../../lib/commerce.js';
import adminOrders from '../../../lib/admin-orders.js';

const { upsertAdminOrder, listAdminOrders, updateAdminOrder } = adminOrders;

export async function GET() {
  return NextResponse.json({ success: true, orders: listAdminOrders() }, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    const customer = body?.customer || {};

    const orderResult = createOrder(items, customer, {
      couponCodes: Array.isArray(body?.couponCodes)
        ? body.couponCodes
        : body?.couponCode ? [body.couponCode] : [],
      shippingMethod: body?.shippingMethod,
      paymentMethod: body?.paymentMethod
    });

    if (orderResult?.success && orderResult?.order) {
      upsertAdminOrder({
        id: orderResult.order.orderId,
        customer: customer.customerName || customer.name || 'ลูกค้า',
        items: orderResult.order.items.map((item) => ({
          name: item.title,
          price: item.price,
          qty: item.quantity
        })),
        subtotal: orderResult.order.summary?.subtotal,
        shippingFee: orderResult.order.summary?.shippingFee,
        discount: orderResult.order.summary?.discountAmount,
        amount: orderResult.order.summary?.total,
        address: customer.address || '-',
        shippingMethod: body?.shippingMethod || 'standard',
        paymentMethod: body?.paymentMethod || 'promptpay',
        createdAt: orderResult.order.createdAt
      });
    }

    return NextResponse.json(orderResult, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create order'
      },
      { status: 400 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, updates = {} } = body || {};

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing order id' }, { status: 400 });
    }

    const updatedOrders = updateAdminOrder(id, updates);
    return NextResponse.json({ success: true, orders: updatedOrders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to update order' }, { status: 400 });
  }
}

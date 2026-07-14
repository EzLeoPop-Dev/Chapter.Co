import { NextResponse } from 'next/server';

// จำลอง Database เก็บข้อมูลเริ่มต้นไว้ทดสอบ
let mockPromotionsDB = [
  { id: 1, name: 'ฉลองเปิดร้านใหม่', code: 'WELCOME2026', discount: '10%', end_date: '2026-12-31', status: 'Active' },
  { id: 2, name: 'ลดสะท้านหน้าร้อน', code: 'SUMMER50', discount: '50 บาท', end_date: '2026-05-30', status: 'Expired' }
];

// 1. [GET] ดึงข้อมูลโปรโมชั่นทั้งหมด
export async function GET() {
  return NextResponse.json({ success: true, promotions: mockPromotionsDB });
}

// 2. [POST] สร้าง หรือ แก้ไขข้อมูลโปรโมชั่น
export async function POST(request) {
  try {
    const body = await request.json();
    const { id, name, code, discount, end_date, status } = body;

    if (!name || !code || !discount || !end_date) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    if (id) {
      // เคสที่ 1: มี ID ส่งมา = แก้ไขข้อมูล (Update)
      mockPromotionsDB = mockPromotionsDB.map(promo => 
        promo.id === Number(id) ? { ...promo, name, code, discount, end_date, status } : promo
      );
    } else {
      // เคสที่ 2: ไม่มี ID ส่งมา = สร้างใหม่ (Create)
      const newPromo = {
        id: Date.now(), // ใช้ timestamp แทน id ชั่วคราว
        name,
        code: code.toUpperCase(),
        discount,
        end_date,
        status: status || 'Active'
      };
      mockPromotionsDB.push(newPromo);
    }

    return NextResponse.json({ success: true, promotions: mockPromotionsDB });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 3. [DELETE] ลบโปรโมชั่น
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
    }

    // ลบข้อมูลแถวที่มี ID ตรงกันออก
    mockPromotionsDB = mockPromotionsDB.filter(promo => promo.id !== Number(id));

    return NextResponse.json({ success: true, promotions: mockPromotionsDB });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
"use client";
import React from 'react';

export default function StaffStockPage() {
  const stockItems = [
    { id: 'BK-001', title: 'Atomic Habits', category: 'จิตวิทยาและการพัฒนาตัวเอง', price: 15.99, stock: 5, status: 'ใกล้หมด' },
    { id: 'BK-002', title: 'Sapiens', category: 'ประวัติศาสตร์', price: 20.50, stock: 2, status: 'ใกล้หมด' },
    { id: 'BK-003', title: 'The Psychology of Money', category: 'จิตวิทยาและการพัฒนาตัวเอง', price: 18.00, stock: 45, status: 'ปกติ' },
    { id: 'BK-004', title: 'Clean Code', category: 'เทคโนโลยีและการเขียนโปรแกรม', price: 35.00, stock: 12, status: 'ปกติ' },
    { id: 'BK-005', title: 'ผ่าพิภพไททัน เล่ม 34', category: 'การ์ตูน (Manga)', price: 4.50, stock: 0, status: 'หมดสต็อก' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-black text-[#1A1A1A]">จัดการสต็อกสินค้า (Stock Management)</h2>
        <button className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary transition-colors shadow-sm flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          เพิ่มสินค้าใหม่
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-white/80 overflow-hidden">
        <div className="p-5 border-b border-[#e6e5e0] flex flex-col md:flex-row gap-4 bg-white/40">
          <input type="text" placeholder="ค้นหาชื่อหนังสือ, รหัสสินค้า..." className="px-5 py-3 border border-[#e6e5e0] rounded-xl text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary bg-white/60 font-medium" />
          <select className="px-5 py-3 border border-[#e6e5e0] rounded-xl text-sm bg-white/60 focus:outline-none focus:ring-2 focus:ring-primary font-bold text-[#1A1A1A]">
            <option>ทุกหมวดหมู่</option>
            <option>จิตวิทยาและการพัฒนาตัวเอง</option>
            <option>ประวัติศาสตร์</option>
            <option>การ์ตูน (Manga)</option>
          </select>
          <select className="px-5 py-3 border border-primary rounded-xl text-sm bg-orange-50 focus:outline-none focus:ring-2 focus:ring-primary text-primary font-bold">
            <option>สถานะ: ทั้งหมด</option>
            <option>สถานะ: ใกล้หมด</option>
            <option>สถานะ: หมดสต็อก</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/60 border-b border-[#e6e5e0] text-xs uppercase tracking-wider text-[#a09c92] font-bold">
                <th className="p-5">รหัสสินค้า</th>
                <th className="p-5">ชื่อหนังสือ</th>
                <th className="p-5">หมวดหมู่</th>
                <th className="p-5 text-right">ราคา</th>
                <th className="p-5 text-center">คงเหลือ</th>
                <th className="p-5 text-center">สถานะ</th>
                <th className="p-5 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e5e0]/50">
              {stockItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/80 transition-colors">
                  <td className="p-5 text-sm font-bold text-[#a09c92]">{item.id}</td>
                  <td className="p-5 font-bold text-[#1A1A1A]">{item.title}</td>
                  <td className="p-5 text-sm font-medium text-[#1A1A1A]">{item.category}</td>
                  <td className="p-5 text-sm font-black text-[#C8861A] text-right">${item.price.toFixed(2)}</td>
                  <td className="p-5 text-center font-black text-xl">
                    <span className={item.stock === 0 ? 'text-red-500' : item.stock <= 5 ? 'text-primary' : 'text-[#1A1A1A]'}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <span className={`px-4 py-1.5 text-[11px] font-bold rounded-full uppercase tracking-wider border ${
                      item.status === 'ปกติ' ? 'bg-green-50 text-green-600 border-green-200' : 
                      item.status === 'ใกล้หมด' ? 'bg-orange-50 text-primary border-primary' : 
                      'bg-red-50 text-red-600 border-red-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-5 flex items-center justify-center space-x-3">
                    <button className="p-2.5 bg-white border border-[#e6e5e0] hover:bg-orange-50 text-[#1A1A1A] hover:text-primary hover:border-primary rounded-xl transition-all shadow-sm" title="ปรับสต็อก">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                    <button className="p-2.5 bg-white border border-[#e6e5e0] hover:bg-[#F2EEE7] text-[#1A1A1A] hover:text-[#1A1A1A] rounded-xl transition-all shadow-sm" title="แก้ไขข้อมูล">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

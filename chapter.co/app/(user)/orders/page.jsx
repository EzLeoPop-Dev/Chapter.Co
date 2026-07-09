"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function OrdersPage() {
  // Mock data for orders
  const orders = [
    {
      id: "ORD-20250709-01",
      date: "9 กรกฎาคม 2026",
      status: "กำลังจัดส่ง",
      statusColor: "text-blue-500 bg-blue-50 border-blue-200",
      total: 37.99,
      items: [
        { title: "Atomic Habits", type: "ปกอ่อน", qty: 1, img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400" },
        { title: "ผ่าพิภพไททัน (Attack on Titan) Vol. 1", type: "E-Book", qty: 1, img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&sig=9" }
      ]
    },
    {
      id: "ORD-20250512-04",
      date: "12 พฤษภาคม 2026",
      status: "จัดส่งสำเร็จ",
      statusColor: "text-green-600 bg-green-50 border-green-200",
      total: 28.50,
      items: [
        { title: "Sapiens", type: "ปกแข็ง", qty: 1, img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#26251e] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#f54e00] selection:text-white p-4 md:p-8 flex flex-col">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col flex-1">
        <Navbar />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          
          {/* Sidebar Menu */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-sm p-4 sticky top-8">
              <div className="flex flex-col items-center p-6 border-b border-[#e6e5e0] mb-4">
                <div className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-amber-500 rounded-full text-white flex items-center justify-center text-3xl font-black mb-4 shadow-md">
                  S
                </div>
                <h3 className="font-bold text-lg text-center">สมชาย รักการอ่าน</h3>
                <p className="text-sm text-[#a09c92]">somchai@example.com</p>
              </div>
              <ul className="space-y-2 font-bold text-sm">
                <li><Link href="/profile" className="block px-4 py-3 rounded-xl text-[#5a5852] hover:bg-white transition-colors">ข้อมูลส่วนตัว</Link></li>
                <li><Link href="/orders" className="block px-4 py-3 rounded-xl bg-orange-50 text-orange-600 transition-colors">ประวัติการสั่งซื้อ</Link></li>
                <li><Link href="/wishlist" className="block px-4 py-3 rounded-xl text-[#5a5852] hover:bg-white transition-colors">หนังสือที่อยากได้</Link></li>
                <li><Link href="/library" className="block px-4 py-3 rounded-xl text-[#5a5852] hover:bg-white transition-colors">คลัง E-book ของฉัน</Link></li>
                <li className="pt-4 mt-4 border-t border-[#e6e5e0]"><Link href="/login" className="block w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors">ออกจากระบบ</Link></li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-3xl font-black text-[#26251e] mb-8">ประวัติการสั่งซื้อ</h2>

            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-white/50 border-b border-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{order.id}</h3>
                      <p className="text-sm text-[#a09c92] font-medium">สั่งซื้อเมื่อ: {order.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold border ${order.statusColor}`}>
                        {order.status}
                      </span>
                      <span className="text-xl font-black text-[#f54e00]">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img src={item.img} alt={item.title} className="w-16 h-20 object-cover rounded-lg shadow-sm" />
                          <div>
                            <h4 className="font-bold text-[#26251e]">{item.title}</h4>
                            <p className="text-sm text-[#a09c92] font-medium">{item.type} x {item.qty}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-[#e6e5e0] flex justify-end gap-3">
                      <button className="px-5 py-2.5 bg-white border-2 border-[#e6e5e0] hover:border-orange-500 hover:text-orange-500 text-[#5a5852] font-bold rounded-xl transition-colors shadow-sm text-sm">
                        ดูรายละเอียด
                      </button>
                      <button className="px-5 py-2.5 bg-orange-100 hover:bg-orange-500 hover:text-white text-orange-600 font-bold rounded-xl transition-colors shadow-sm text-sm">
                        ติดตามพัสดุ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

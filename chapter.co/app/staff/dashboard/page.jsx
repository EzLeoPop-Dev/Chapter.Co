import React from 'react';
import Link from 'next/link';

export default function StaffDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-[#1A1A1A]">ภาพรวมการทำงานวันนี้</h2>
        <span className="text-sm font-bold text-[#C8861A] bg-white/70 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/80 shadow-sm">
          อัปเดตล่าสุด: วันนี้ 10:30 น.
        </span>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-sm flex items-start justify-between hover:-translate-y-1 transition-transform">
          <div>
            <p className="text-sm font-bold text-[#1A1A1A] mb-1">คำสั่งซื้อใหม่รอจัดส่ง</p>
            <h3 className="text-4xl font-black text-[#1A1A1A]">12</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center text-tertiary shadow-inner">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-sm flex items-start justify-between hover:-translate-y-1 transition-transform">
          <div>
            <p className="text-sm font-bold text-[#1A1A1A] mb-1">รอตรวจสอบชำระเงิน</p>
            <h3 className="text-4xl font-black text-[#1A1A1A]">5</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-inner">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-sm flex items-start justify-between hover:-translate-y-1 transition-transform">
          <div>
            <p className="text-sm font-bold text-[#1A1A1A] mb-1">สินค้าใกล้หมดสต็อก</p>
            <h3 className="text-4xl font-black text-[#1A1A1A]">3</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-inner">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-sm flex items-start justify-between hover:-translate-y-1 transition-transform">
          <div>
            <p className="text-sm font-bold text-[#1A1A1A] mb-1">ข้อความจากลูกค้า</p>
            <h3 className="text-4xl font-black text-[#1A1A1A]">8</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shadow-inner">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1A1A1A]">คำสั่งซื้อที่ต้องจัดการด่วน</h3>
            <Link href="/staff/orders" className="text-sm font-bold text-[#C8861A] hover:text-primary">ดูทั้งหมด</Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-white bg-white/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold mr-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-[15px] group-hover:text-[#C8861A] transition-colors">ORD-20260709-0{i}</h4>
                    <p className="text-sm font-medium text-[#a09c92] mt-0.5">2 รายการ • ยอดรวม $37.99</p>
                  </div>
                </div>
                <span className="bg-tertiary text-tertiary border border-blue-200 text-xs font-bold px-3 py-1.5 rounded-full">รอจัดส่ง</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1A1A1A]">แจ้งเตือนสต็อกสินค้า</h3>
            <Link href="/staff/stock" className="text-sm font-bold text-[#C8861A] hover:text-primary">ดูทั้งหมด</Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl border border-white bg-red-50/50 hover:bg-red-50 transition-colors">
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=100" alt="Book" className="w-12 h-16 object-cover rounded-lg shadow-sm mr-4" />
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-[15px]">Sapiens เซเปียนส์</h4>
                  <p className="text-xs text-red-500 font-bold mt-1 bg-red-100 inline-block px-2 py-0.5 rounded">คงเหลือ 2 เล่ม</p>
                </div>
              </div>
              <button className="text-sm font-bold bg-white text-[#1A1A1A] hover:text-[#C8861A] px-4 py-2 rounded-xl border border-[#e6e5e0] shadow-sm transition-colors">อัปเดตสต็อก</button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl border border-white bg-orange-50/50 hover:bg-orange-50 transition-colors">
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=100" alt="Book" className="w-12 h-16 object-cover rounded-lg shadow-sm mr-4" />
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-[15px]">Atomic Habits</h4>
                  <p className="text-xs text-primary font-bold mt-1 bg-primary inline-block px-2 py-0.5 rounded">คงเหลือ 5 เล่ม</p>
                </div>
              </div>
              <button className="text-sm font-bold bg-white text-[#1A1A1A] hover:text-[#C8861A] px-4 py-2 rounded-xl border border-[#e6e5e0] shadow-sm transition-colors">อัปเดตสต็อก</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

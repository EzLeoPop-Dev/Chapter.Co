"use client";
import React from 'react';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'ยอดขายวันนี้', value: '฿12,450', percent: '+15%', isUp: true },
    { title: 'คำสั่งซื้อใหม่', value: '45 รายการ', percent: '+5%', isUp: true },
    { title: 'ผู้ใช้งานใหม่', value: '12 คน', percent: '-2%', isUp: false },
    { title: 'สินค้าใกล้หมด', value: '8 รายการ', percent: 'ต้องสั่งเพิ่ม', isUp: null },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-sm flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">ภาพรวมระบบ (Dashboard)</h2>
          <p className="text-[#a09c92]">ข้อมูลสรุปประจำวันที่ 14 กรกฎาคม 2026</p>
        </div>
        <button className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl font-bold transition-colors text-sm">
          ดาวน์โหลดรายงาน (PDF)
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/70 backdrop-blur-xl border border-white/80 p-6 rounded-[2rem] shadow-sm hover:-translate-y-1 transition-transform">
            <h3 className="text-[#a09c92] font-medium text-sm mb-1">{stat.title}</h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</span>
              {stat.isUp !== null && (
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${stat.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                  {stat.percent}
                </span>
              )}
              {stat.isUp === null && (
                <span className="text-xs font-bold px-2 py-1 rounded-md bg-yellow-50 text-yellow-600">
                  {stat.percent}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts / Data Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white/80 p-6 rounded-[2rem] shadow-sm min-h-[300px] flex flex-col">
          <h3 className="font-bold text-[#1A1A1A] mb-4">ยอดขายย้อนหลัง 7 วัน</h3>
          <div className="flex-1 flex items-end justify-between gap-2 px-2 mt-4">
            {/* Mock Chart Bars */}
            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className="w-full bg-indigo-50 rounded-t-md relative h-48 flex items-end">
                  <div 
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md transition-all duration-500 group-hover:opacity-80"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-[#a09c92]">{i + 8} ก.ค.</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-6 rounded-[2rem] shadow-sm">
          <h3 className="font-bold text-[#1A1A1A] mb-4">สินค้าขายดี (Top 3)</h3>
          <div className="space-y-4">
            {[
              { name: 'ปรมาจารย์ลัทธิมาร', sold: 124 },
              { name: 'แฮร์รี่ พอตเตอร์ 1', sold: 98 },
              { name: 'คิดแบบยิว', sold: 85 }
            ].map((book, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#F2EEE7] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-indigo-600 shadow-sm">
                    {i + 1}
                  </div>
                  <span className="font-medium text-sm text-[#1A1A1A]">{book.name}</span>
                </div>
                <span className="text-xs font-bold bg-white px-2 py-1 rounded-md text-indigo-600">{book.sold} เล่ม</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

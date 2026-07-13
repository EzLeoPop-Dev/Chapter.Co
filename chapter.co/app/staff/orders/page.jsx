"use client";
import React, { useState } from 'react';

export default function StaffOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    { id: 'ORD-20260709-01', customer: 'สมชาย รักการอ่าน', date: '09/07/2026 10:30', amount: 37.99, status: 'รอตรวจสอบชำระเงิน' },
    { id: 'ORD-20260709-02', customer: 'สมศรี รักเรียน', date: '09/07/2026 09:15', amount: 15.50, status: 'รอจัดส่ง' },
    { id: 'ORD-20260708-01', customer: 'มานะ ขยันอ่าน', date: '08/07/2026 15:40', amount: 45.00, status: 'จัดส่งแล้ว' },
    { id: 'ORD-20260708-02', customer: 'ชูใจ ใจดี', date: '08/07/2026 11:20', amount: 120.00, status: 'จัดส่งแล้ว' },
    { id: 'ORD-20260707-01', customer: 'ปิติ อ่านเก่ง', date: '07/07/2026 08:00', amount: 22.99, status: 'ยกเลิก' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'รอตรวจสอบชำระเงิน': return 'bg-primary text-white border-primary';
      case 'รอจัดส่ง': return 'bg-tertiary text-tertiary border-blue-200';
      case 'จัดส่งแล้ว': return 'bg-green-100 text-green-700 border-green-200';
      case 'ยกเลิก': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-black text-[#1A1A1A]">จัดการคำสั่งซื้อ (Orders)</h2>
        <div className="flex bg-white/70 backdrop-blur-xl rounded-xl p-1 border border-white/80 shadow-sm">
          <input type="text" placeholder="ค้นหาเลขออเดอร์, ชื่อลูกค้า..." className="px-4 py-2 text-sm w-64 focus:outline-none bg-transparent text-[#1A1A1A] placeholder-[#a09c92]" />
          <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary transition-colors shadow-sm">ค้นหา</button>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-white/80 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#e6e5e0] overflow-x-auto scrollbar-hide bg-white/40">
          {['ทั้งหมด (all)', 'รอชำระเงิน (pending_payment)', 'รอจัดส่ง (pending_shipment)', 'จัดส่งแล้ว (shipped)'].map((tab) => {
            const key = tab.match(/\(([^)]+)\)/)[1];
            const label = tab.split(' ')[0];
            const isActive = activeTab === key;
            return (
              <button 
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-8 py-5 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${isActive ? 'border-primary text-primary bg-white/60' : 'border-transparent text-[#1A1A1A] hover:text-[#1A1A1A] hover:bg-white/40'}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/60 border-b border-[#e6e5e0] text-xs uppercase tracking-wider text-[#a09c92] font-bold">
                <th className="p-5">Order ID</th>
                <th className="p-5">วันที่ - เวลา</th>
                <th className="p-5">ลูกค้า</th>
                <th className="p-5">ยอดสุทธิ</th>
                <th className="p-5">สถานะ</th>
                <th className="p-5 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e5e0]/50">
              {orders.map((order, idx) => (
                <tr key={idx} className="hover:bg-white/80 transition-colors">
                  <td className="p-5 font-bold text-[#1A1A1A]">{order.id}</td>
                  <td className="p-5 text-sm font-medium text-[#1A1A1A]">{order.date}</td>
                  <td className="p-5 text-sm font-bold text-[#1A1A1A]">{order.customer}</td>
                  <td className="p-5 text-sm font-black text-[#C8861A]">${order.amount.toFixed(2)}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1.5 text-[11px] font-bold rounded-full border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <button className="text-primary hover:text-primary text-sm font-bold transition-colors">ดูรายละเอียด</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-5 border-t border-[#e6e5e0] flex items-center justify-between bg-white/40">
          <span className="text-sm font-medium text-[#1A1A1A]">แสดง 1 ถึง 5 จาก 12 รายการ</span>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-[#e6e5e0] rounded-xl text-sm font-bold text-[#1A1A1A] hover:bg-[#F2EEE7] transition-colors shadow-sm">ก่อนหน้า</button>
            <button className="px-4 py-2 bg-primary border border-primary rounded-xl text-sm text-white font-bold shadow-sm">1</button>
            <button className="px-4 py-2 bg-white border border-[#e6e5e0] rounded-xl text-sm font-bold text-[#1A1A1A] hover:bg-[#F2EEE7] transition-colors shadow-sm">2</button>
            <button className="px-4 py-2 bg-white border border-[#e6e5e0] rounded-xl text-sm font-bold text-[#1A1A1A] hover:bg-[#F2EEE7] transition-colors shadow-sm">ถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  );
}

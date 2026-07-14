"use client";
import React from 'react';

export default function StaffTicketsPage() {
  const tickets = [
    { id: 'TK-001', subject: 'หนังสือชำรุดจากการขนส่ง', customer: 'สมศรี รักเรียน', date: '09/07/2026', status: 'เปิด' },
    { id: 'TK-002', subject: 'ดาวน์โหลด E-book ไม่ได้', customer: 'ใจดี มีตังค์', date: '08/07/2026', status: 'รอดำเนินการ' },
    { id: 'TK-003', subject: 'ขอเปลี่ยนที่อยู่จัดส่ง', customer: 'มานะ ขยันอ่าน', date: '07/07/2026', status: 'ปิดแล้ว' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-[#1A1A1A]">จัดการคำร้องเรียน (Tickets)</h2>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-white/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/60 border-b border-[#e6e5e0] text-xs uppercase tracking-wider text-[#a09c92] font-bold">
                <th className="p-5">Ticket ID</th>
                <th className="p-5">หัวข้อปัญหา</th>
                <th className="p-5">ลูกค้า</th>
                <th className="p-5">วันที่เปิดเรื่อง</th>
                <th className="p-5 text-center">สถานะ</th>
                <th className="p-5 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e5e0]/50">
              {tickets.map((tk, idx) => (
                <tr key={idx} className="hover:bg-white/80 transition-colors">
                  <td className="p-5 font-bold text-[#1A1A1A]">{tk.id}</td>
                  <td className="p-5 text-[15px] font-bold text-[#1A1A1A]">{tk.subject}</td>
                  <td className="p-5 text-sm font-medium text-[#1A1A1A]">{tk.customer}</td>
                  <td className="p-5 text-sm font-medium text-[#a09c92]">{tk.date}</td>
                  <td className="p-5 text-center">
                    <span className={`px-4 py-1.5 text-[11px] font-bold rounded-full uppercase tracking-wider border ${
                      tk.status === 'เปิด' ? 'bg-red-50 text-red-600 border-red-200' :
                      tk.status === 'รอดำเนินการ' ? 'bg-orange-50 text-primary border-primary' :
                      'bg-white text-[#a09c92] border-[#e6e5e0]'
                    }`}>
                      {tk.status}
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
      </div>
    </div>
  );
}

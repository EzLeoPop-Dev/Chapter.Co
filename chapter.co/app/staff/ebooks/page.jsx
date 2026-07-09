"use client";
import React from 'react';

export default function StaffEbooksPage() {
  const ebooks = [
    { id: 'EB-001', title: 'ผ่าพิภพไททัน (Attack on Titan) Vol. 1', file: 'aot_v1.pdf', size: '45 MB', downloads: 120 },
    { id: 'EB-002', title: 'Clean Code (E-Book)', file: 'clean_code.epub', size: '12 MB', downloads: 85 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-black text-[#26251e]">จัดการ E-book (E-book Management)</h2>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          อัปโหลดไฟล์ใหม่
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-white/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/60 border-b border-[#e6e5e0] text-xs uppercase tracking-wider text-[#a09c92] font-bold">
                <th className="p-5">รหัสสินค้า</th>
                <th className="p-5">ชื่อหนังสือ</th>
                <th className="p-5">ชื่อไฟล์</th>
                <th className="p-5 text-center">ขนาด</th>
                <th className="p-5 text-center">ยอดดาวน์โหลด</th>
                <th className="p-5 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e5e0]/50">
              {ebooks.map((eb, idx) => (
                <tr key={idx} className="hover:bg-white/80 transition-colors">
                  <td className="p-5 text-sm font-bold text-[#a09c92]">{eb.id}</td>
                  <td className="p-5 font-bold text-[#26251e]">{eb.title}</td>
                  <td className="p-5 text-sm text-[#5a5852] font-mono"><span className="bg-white/60 border border-[#e6e5e0] px-2.5 py-1 rounded-lg">{eb.file}</span></td>
                  <td className="p-5 text-center text-sm font-bold text-[#5a5852]">{eb.size}</td>
                  <td className="p-5 text-center font-black text-orange-600 text-lg">{eb.downloads}</td>
                  <td className="p-5 flex justify-center space-x-3">
                    <button className="p-2.5 bg-white border border-[#e6e5e0] hover:bg-orange-50 text-[#5a5852] hover:text-orange-600 hover:border-orange-200 rounded-xl transition-all shadow-sm" title="แก้ไข">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button className="p-2.5 bg-white border border-[#e6e5e0] hover:bg-red-50 text-[#5a5852] hover:text-red-500 hover:border-red-200 rounded-xl transition-all shadow-sm" title="ลบ">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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

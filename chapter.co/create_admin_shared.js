const fs = require('fs');
const path = require('path');

const pages = [
  { name: 'orders', title: 'จัดการคำสั่งซื้อ' },
  { name: 'payments', title: 'ตรวจสอบชำระเงิน' },
  { name: 'shipping', title: 'จัดส่งสินค้า' },
  { name: 'stock', title: 'จัดการสต็อก' },
  { name: 'ebooks', title: 'จัดการ E-book' },
  { name: 'chat', title: 'บริการลูกค้า (Chat)' },
  { name: 'tickets', title: 'จัดการคำร้อง' },
  { name: 'reviews', title: 'จัดการรีวิว' }
];

const template = (title) => `"use client";
import React from 'react';

export default function AdminSharedPage() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-12 shadow-sm text-center">
      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">${title} (ระบบ Admin)</h2>
      <p className="text-[#a09c92] max-w-md mx-auto mb-8">
        ฟังก์ชันนี้ทำงานเหมือนกับฝั่ง Staff แต่ถูกรวมไว้ใน Workspace ของผู้ดูแลระบบเพื่อความสะดวกในการจัดการแบบรวมศูนย์
      </p>
      <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md hover:-translate-y-0.5">
        จำลองการทำงานของ ${title}
      </button>
    </div>
  );
}
`;

pages.forEach(p => {
  const dirPath = path.join(__dirname, 'app', 'admin', p.name);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'page.jsx'), template(p.title));
  console.log('Created: ' + p.name);
});

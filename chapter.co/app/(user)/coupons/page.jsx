"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'freeshipping', label: 'โค้ดส่งฟรี' },
    { id: 'discount', label: 'ส่วนลดหนังสือ' },
    { id: 'cashback', label: 'รับเงินคืน' },
  ];

  const coupons = [
    { id: 1, type: 'freeshipping', title: 'ส่งฟรีไม่มีขั้นต่ำ', desc: 'สำหรับการสั่งซื้อครั้งแรก', label: 'FREE', sub: 'SHIPPING', color: 'blue', tag: 'ใช้ได้ 1 ครั้ง', expiry: 'หมดเขตสิ้นเดือน' },
    { id: 2, type: 'discount', title: 'ส่วนลดหนังสือใหม่', desc: 'เมื่อซื้อขั้นต่ำ $40', label: '20%', sub: 'OFF', color: 'orange', tag: 'แนะนำ', expiry: 'หมดเขตพรุ่งนี้' },
    { id: 3, type: 'cashback', title: 'รับเงินคืน 10%', desc: 'รับเป็น Coins คืนสูงสุด 500 Coins', label: '10%', sub: 'CASHBACK', color: 'emerald', tag: 'คุ้มสุด', expiry: 'เหลือ 2 วัน' },
    { id: 4, type: 'discount', title: 'ส่วนลด 50 บาท', desc: 'เมื่อซื้อขั้นต่ำ $20', label: '$5', sub: 'OFF', color: 'purple', tag: 'ยอดนิยม', expiry: 'หมดเขตวันนี้' },
    { id: 5, type: 'freeshipping', title: 'ส่งฟรีลด 40 บาท', desc: 'เมื่อซื้อขั้นต่ำ $15', label: 'FREE', sub: 'SHIPPING', color: 'blue', tag: 'ใช้ได้ 3 ครั้ง', expiry: 'หมดเขตสิ้นเดือน' },
  ];

  const filteredCoupons = activeTab === 'all' ? coupons : coupons.filter(c => c.type === activeTab);

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#26251e] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] p-4 md:p-8 overflow-hidden relative selection:bg-[#f54e00] selection:text-white">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="mb-10 flex items-center justify-between mt-4">
          <div className="flex items-center space-x-5">
            <Link href="/" className="p-3.5 bg-white/60 hover:bg-white rounded-full shadow-sm backdrop-blur-sm transition-all text-[#5a5852] hover:text-[#f54e00] hover:shadow-md hover:-translate-x-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </Link>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#26251e] to-[#5a5852] flex items-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f54e00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              ศูนย์รวมโค้ดส่วนลด
            </h1>
          </div>
        </header>

        {/* Tabs */}
        <div className="backdrop-blur-xl bg-white/50 border border-white/60 shadow-sm rounded-2xl p-2 flex overflow-x-auto space-x-2 mb-10" style={{ scrollbarWidth: 'none' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3.5 rounded-xl font-semibold text-[15px] whitespace-nowrap transition-all duration-300 flex-1 ${activeTab === tab.id ? 'bg-white shadow-md text-[#f54e00]' : 'text-[#807d72] hover:text-[#26251e] hover:bg-white/60'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
             <div key={coupon.id} className="bg-white/80 backdrop-blur-md rounded-[1.5rem] border border-[#e6e5e0] flex overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
               <div className={`w-24 sm:w-28 flex flex-col items-center justify-center border-r-2 border-dashed relative flex-shrink-0
                  ${coupon.color === 'blue' ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}
                  ${coupon.color === 'orange' ? 'bg-orange-50 border-orange-200 text-orange-600' : ''}
                  ${coupon.color === 'emerald' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : ''}
                  ${coupon.color === 'purple' ? 'bg-purple-50 border-purple-200 text-purple-600' : ''}
               `}>
                 <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#f7f7f4] rounded-full"></div>
                 <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#f7f7f4] rounded-full"></div>
                 <span className="font-bold text-2xl sm:text-3xl">{coupon.label}</span>
                 <span className="text-[11px] sm:text-[12px] font-bold tracking-wider opacity-80 mt-1">{coupon.sub}</span>
               </div>
               
               <div className="p-6 flex-1 flex flex-col justify-between">
                 <div>
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="font-bold text-[#26251e] text-[17px] leading-tight pr-2">{coupon.title}</h3>
                     <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap
                        ${coupon.color === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
                        ${coupon.color === 'orange' ? 'bg-orange-100 text-orange-700' : ''}
                        ${coupon.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : ''}
                        ${coupon.color === 'purple' ? 'bg-purple-100 text-purple-700' : ''}
                     `}>{coupon.tag}</span>
                   </div>
                   <p className="text-[#807d72] text-[14px]">{coupon.desc}</p>
                 </div>
                 
                 <div className="flex flex-wrap justify-between items-center mt-6 gap-3">
                   <div className="text-[11px] text-red-500 font-medium flex items-center bg-red-50 px-2 py-1 rounded-lg">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                     {coupon.expiry}
                   </div>
                   <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-orange-500/40 whitespace-nowrap">
                     เก็บโค้ด
                   </button>
                 </div>
               </div>
             </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

"use client";
import React from 'react';

export default function PromotionBanner() {
  return (
    <section className="mb-16">
      <div className="backdrop-blur-md bg-gradient-to-r from-primary to-primary border border-white/40 rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(249,115,22,0.2)] flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-xl relative z-10 mb-6 md:mb-0">
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-[11px] font-semibold tracking-[0.88px] uppercase mb-3 backdrop-blur-sm border border-white/30">
            PROMOTION
          </div>
          <h2 className="text-[36px] font-normal tracking-[-0.72px] text-white mb-2 leading-tight">Mid-Year Book Festival</h2>
          <p className="text-orange-50 text-[16px] font-normal leading-[1.5]">
            ลดกระหน่ำกลางปี! ซื้อหนังสือครบ 3 เล่ม รับส่วนลดทันที 20% ทุกหมวดหมู่ วันนี้ถึงสิ้นเดือนเท่านั้น
          </p>
        </div>
        <button className="relative z-10 bg-white text-[#C8861A] px-8 py-3.5 rounded-2xl text-[14px] font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap">
          ดูโปรโมชั่นทั้งหมด
        </button>
      </div>
    </section>
  );
}

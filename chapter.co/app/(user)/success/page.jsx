"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-[#FCFBFA] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative pb-16">
      
      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-[128px] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 md:px-8">
        <Navbar />

        {/* Breadcrumb */}
        <div className="mt-6 flex items-center space-x-2 text-[11px] font-bold text-[#a09c92]">
          <Link href="/" className="hover:text-[#1A1A1A]">หน้าหลัก</Link>
          <span>›</span>
          <Link href="/profile" className="hover:text-[#1A1A1A]">บัญชีของฉัน</Link>
          <span>›</span>
          <span className="text-[#1A1A1A]">ติดตามสถานะ</span>
        </div>

        {/* Header */}
        <div className="mt-4 mb-8">
          <h1 className="text-2xl font-black text-[#1A1A1A]">ติดตามสถานะการสั่งซื้อ</h1>
        </div>

        {/* Top Summary Info */}
        <div className="bg-white border border-[#e6e5e0] rounded-[24px] p-8 shadow-sm mb-8 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#e6e5e0]">
          <div className="flex-1 py-4 md:py-0 md:px-8 first:pt-0 md:first:pl-0 last:pb-0 md:last:pr-0 flex flex-col justify-center">
            <p className="text-[13px] text-[#807d72] font-medium mb-1.5 uppercase tracking-wide">หมายเลขคำสั่งซื้อ</p>
            <p className="text-[22px] font-black text-[#C8861A]">#ORD-77291</p>
          </div>
          <div className="flex-1 py-4 md:py-0 md:px-8 flex flex-col justify-center">
            <p className="text-[13px] text-[#807d72] font-medium mb-1.5 uppercase tracking-wide">วันที่สั่งซื้อ</p>
            <p className="text-[16px] font-bold text-[#1A1A1A] flex items-center gap-1.5">
              12 
              <span className="bg-orange-50 text-primary px-2 py-0.5 rounded-md text-[13px] font-semibold">ต.ค.</span> 
              2024
            </p>
          </div>
          <div className="flex-1 py-4 md:py-0 md:px-8 flex flex-col justify-center">
            <p className="text-[13px] text-[#807d72] font-medium mb-1.5 uppercase tracking-wide">คาดว่าจะได้รับสินค้า</p>
            <p className="text-[16px] font-bold text-[#1A1A1A] flex items-center gap-1.5">
              15 - 16 
              <span className="bg-blue-50 text-[#1ba5e1] px-2 py-0.5 rounded-md text-[13px] font-semibold">ต.ค.</span> 
              2024
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Tracking Status */}
            <div className="bg-white border border-[#e6e5e0] rounded-[24px] p-8 md:p-10 shadow-sm relative overflow-hidden">
              <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-12">สถานะการจัดส่งล่าสุด</h2>
              
              {/* Horizontal Stepper */}
              <div className="relative mb-14">
                {/* Background Line */}
                <div className="absolute top-[14px] left-[12%] right-[12%] h-[3px] bg-[#f0efeb] z-0"></div>
                {/* Active Line */}
                <div className="absolute top-[14px] left-[12%] w-[50%] h-[3px] bg-[#C8861A] z-0"></div>
                
                <div className="flex justify-between relative z-10 px-2">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center w-24">
                    <div className="w-8 h-8 rounded-full bg-[#C8861A] text-white flex items-center justify-center mb-3 shadow-[0_0_0_4px_white]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-[12px] font-bold text-[#1A1A1A] text-center leading-tight mb-1">รับคำสั่งซื้อแล้ว</p>
                    <p className="text-[10px] text-[#a09c92]">12 พ.ค. | 09:30</p>
                  </div>
                  {/* Step 2 */}
                  <div className="flex flex-col items-center w-24">
                    <div className="w-8 h-8 rounded-full bg-[#C8861A] text-white flex items-center justify-center mb-3 shadow-[0_0_0_4px_white]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-[12px] font-bold text-[#1A1A1A] text-center leading-tight mb-1">กำลังจัดเตรียมสินค้า</p>
                    <p className="text-[10px] text-[#a09c92]">12 พ.ค. | 14:15</p>
                  </div>
                  {/* Step 3 (Active) */}
                  <div className="flex flex-col items-center w-24">
                    <div className="w-10 h-10 rounded-full bg-white border-[3px] border-[#C8861A] flex items-center justify-center mb-2 shadow-[0_0_0_5px_rgba(200,134,26,0.1),0_0_0_4px_white] relative -top-1">
                      <div className="w-3 h-3 rounded-full bg-[#C8861A]"></div>
                    </div>
                    <p className="text-[12px] font-bold text-[#1A1A1A] text-center leading-tight mb-1">อยู่ระหว่างการจัดส่ง</p>
                    <p className="text-[10px] text-[#a09c92]">13 พ.ค. | 08:45</p>
                  </div>
                  {/* Step 4 (Pending) */}
                  <div className="flex flex-col items-center w-24">
                    <div className="w-8 h-8 rounded-full bg-[#f0efeb] mb-3 shadow-[0_0_0_4px_white]"></div>
                    <p className="text-[12px] font-bold text-[#a09c92] text-center leading-tight mb-1">จัดส่งสำเร็จ</p>
                    <p className="text-[10px] text-[#a09c92]">รอการอัปเดต</p>
                  </div>
                </div>
              </div>

              {/* Vertical Timeline */}
              <div className="relative pl-8 pt-4 pb-2 space-y-8 before:absolute before:inset-y-6 before:left-[15px] before:w-[2px] before:bg-[#f0efeb]">
                {/* Event 1 */}
                <div className="relative">
                  <div className="absolute -left-[37px] w-[30px] h-[30px] rounded-full bg-[#C8861A] text-white flex items-center justify-center ring-[6px] ring-white z-10 shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </div>
                  <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-1">พัสดุออกจากศูนย์กระจายสินค้า</h3>
                  <p className="text-[13px] text-[#5a5852] mb-1">Bangkok Distribution Center (BK-04)</p>
                  <p className="text-[11px] text-[#a09c92] font-medium">13 พฤษภาคม 2024, 08:45 น.</p>
                </div>
                {/* Event 2 */}
                <div className="relative">
                  <div className="absolute -left-[27px] w-[12px] h-[12px] rounded-full bg-[#d0cdc5] ring-[6px] ring-white z-10 mt-1"></div>
                  <h3 className="text-[14px] font-bold text-[#5a5852] mb-1">พัสดุมาถึงศูนย์กระจายสินค้า</h3>
                  <p className="text-[13px] text-[#807d72] mb-1">Bangkok Sorting Hub</p>
                  <p className="text-[11px] text-[#a09c92] font-medium">12 พฤษภาคม 2024, 18:20 น.</p>
                </div>
                {/* Event 3 */}
                <div className="relative">
                  <div className="absolute -left-[27px] w-[12px] h-[12px] rounded-full bg-[#d0cdc5] ring-[6px] ring-white z-10 mt-1"></div>
                  <h3 className="text-[14px] font-bold text-[#5a5852] mb-1">สินค้าถูกบรรจุลงกล่องเรียบร้อย</h3>
                  <p className="text-[13px] text-[#807d72] mb-1">Chapter.Co Warehouse A</p>
                  <p className="text-[11px] text-[#a09c92] font-medium">12 พฤษภาคม 2024, 14:15 น.</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-[#e6e5e0] rounded-[24px] p-8 md:p-10 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-6 border-b border-[#e6e5e0] pb-5">รายการสินค้าในคำสั่งซื้อ (2)</h2>
              
              <div className="space-y-6">
                {/* Item 1 */}
                <div className="flex gap-5">
                  <div className="w-20 h-28 bg-[#e5dfd3] rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-[#e6e5e0]">
                    <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop" alt="book" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center py-2">
                    <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-1">The Silent Vault: A Study of Space</h3>
                    <p className="text-[13px] text-[#807d72] mb-4 flex items-center gap-1.5">
                      <span className="bg-[#f0efeb] text-[#807d72] px-2 py-0.5 rounded text-[11px] font-bold">ผู้แต่ง</span> 
                      Eleanor Vance
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-[12px] bg-[#f5f5f5] text-[#5a5852] px-3 py-1 rounded font-bold">จำนวน: 1</span>
                      <span className="text-[15px] font-bold text-[#C8861A]">฿450.00</span>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-5">
                  <div className="w-20 h-28 bg-[#e5dfd3] rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-[#e6e5e0]">
                    <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200&auto=format&fit=crop" alt="book" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center py-2">
                    <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-1">Golden Hour Verses</h3>
                    <p className="text-[13px] text-[#807d72] mb-4 flex items-center gap-1.5">
                      <span className="bg-[#f0efeb] text-[#807d72] px-2 py-0.5 rounded text-[11px] font-bold">ผู้แต่ง</span> 
                      Julian Barnes
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-[12px] bg-[#f5f5f5] text-[#5a5852] px-3 py-1 rounded font-bold">จำนวน: 1</span>
                      <span className="text-[15px] font-bold text-[#C8861A]">฿320.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Shipping Info */}
            <div className="bg-[#f5f3ef] rounded-[24px] p-8 shadow-sm border border-[#e6e5e0] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-[40px] pointer-events-none"></div>
              
              <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-6 flex items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8861A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ข้อมูลการจัดส่ง
              </h3>
              
              <div className="mb-5">
                <p className="text-[11px] text-[#807d72] mb-1">ผู้รับสินค้า</p>
                <p className="text-[14px] font-bold text-[#1A1A1A]">คุณกิตติศักดิ์ พรหมศร</p>
              </div>
              
              <div className="mb-5">
                <p className="text-[11px] text-[#807d72] mb-1">ที่อยู่สำหรับการจัดส่ง</p>
                <p className="text-[13px] text-[#5a5852] leading-relaxed">
                  123/45 หมู่บ้านวิจิตศิลป์ ซอยสุขุมวิท 63<br/>
                  แขวงพระโขนงเหนือ เขตวัฒนา<br/>
                  กรุงเทพมหานคร 10110<br/>
                  ประเทศไทย
                </p>
              </div>

              <div className="mb-6">
                <p className="text-[11px] text-[#807d72] mb-2">วิธีการจัดส่ง</p>
                <div className="flex items-center text-[13px] font-medium text-[#1A1A1A]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ba5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                  Standard Delivery (Kerry Express)
                </div>
              </div>

              <div className="border-t border-[#d0cdc5] pt-6 flex justify-between items-end mt-8">
                <p className="text-[13px] text-[#807d72] font-bold">สรุปยอดชำระ<br/><span className="text-[16px] text-[#1A1A1A]">ยอดรวมสุทธิ</span></p>
                <p className="text-[24px] font-black text-[#1A1A1A]">฿770.00</p>
              </div>
            </div>

            {/* Help Block */}
            <div className="bg-white border border-[#e6e5e0] rounded-[24px] p-8 shadow-sm text-center">
              <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-3">ต้องการความช่วยเหลือ?</h3>
              <p className="text-[13px] text-[#807d72] leading-relaxed mb-6 px-4">
                หากมีข้อสงสัยเกี่ยวกับพัสดุของคุณ หรือต้องการสอบถามเพิ่มเติม ทีมงานของเรายินดีให้บริการ
              </p>
              
              <div className="space-y-4">
                <button className="w-full bg-[#C8861A] text-white font-bold py-3.5 rounded-full text-[14px] flex items-center justify-center hover:bg-[#b07415] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#C8861A]/30 transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  ติดต่อสอบถาม
                </button>
                <button className="w-full bg-[#fdfdfc] text-[#1A1A1A] font-bold py-3.5 rounded-full text-[14px] border-2 border-[#e6e5e0] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>
                  นโยบายการคืนสินค้า
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

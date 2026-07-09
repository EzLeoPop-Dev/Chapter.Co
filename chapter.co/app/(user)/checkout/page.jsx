"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#26251e] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#f54e00] selection:text-white p-4 md:p-8 flex flex-col">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <Navbar />

        <div className="mt-8 mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-black text-[#26251e]">การจัดส่งและการชำระเงิน</h1>
          {/* Stepper */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-bold text-[#a09c92]">
            <span className="flex items-center text-orange-500"><div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center mr-2">1</div> จัดส่ง</span>
            <div className="w-10 h-0.5 bg-[#e6e5e0]"></div>
            <span className="flex items-center"><div className="w-6 h-6 rounded-full bg-[#d0cdc5] text-white flex items-center justify-center mr-2">2</div> ชำระเงิน</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-[2] space-y-6">
            
            {/* Address Selection */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-orange-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ที่อยู่จัดส่ง
              </h2>
              
              <div className="border-2 border-orange-500 bg-orange-50 rounded-2xl p-6 relative cursor-pointer">
                <div className="absolute top-6 right-6 w-5 h-5 rounded-full border-4 border-orange-500 bg-white"></div>
                <h3 className="font-bold text-lg mb-2">นาย สมชาย รักการอ่าน</h3>
                <p className="text-[#5a5852] font-medium leading-relaxed">
                  123/45 ถนนสุขุมวิท ซอย 63 <br/>
                  แขวงคลองตันเหนือ เขตวัฒนา <br/>
                  กรุงเทพมหานคร 10110
                </p>
                <p className="text-[#a09c92] font-medium mt-2">เบอร์โทร: 081-234-5678</p>
              </div>

              <button className="mt-4 text-orange-500 font-bold hover:text-orange-600">+ เพิ่มที่อยู่ใหม่</button>
            </div>

            {/* Shipping Method */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-blue-500"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                วิธีจัดส่ง
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-[#e6e5e0] hover:border-orange-300 rounded-2xl p-5 cursor-pointer bg-white transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold">Standard Delivery</h3>
                    <span className="font-black text-orange-500">$5.00</span>
                  </div>
                  <p className="text-sm text-[#a09c92] font-medium">จัดส่งภายใน 2-3 วันทำการ</p>
                </div>
                <div className="border border-[#e6e5e0] hover:border-orange-300 rounded-2xl p-5 cursor-pointer bg-white transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold">Express Delivery</h3>
                    <span className="font-black text-[#26251e]">$10.00</span>
                  </div>
                  <p className="text-sm text-[#a09c92] font-medium">จัดส่งภายใน 1 วันทำการ</p>
                </div>
              </div>
            </div>

          </div>

          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl sticky top-8">
              <h3 className="text-xl font-bold text-[#26251e] mb-6">สรุปคำสั่งซื้อ</h3>
              
              <div className="space-y-4 text-[15px] font-medium text-[#5a5852] mb-6">
                <div className="flex justify-between">
                  <span>ราคาสินค้า (2 ชิ้น)</span>
                  <span className="font-bold text-[#26251e]">$32.99</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span className="font-bold text-[#26251e]">$5.00</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex space-x-2">
                  <input type="text" placeholder="โค้ดส่วนลด" className="flex-1 bg-[#f7f7f4] border border-[#e6e5e0] rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-orange-300 text-sm" />
                  <button className="bg-[#26251e] hover:bg-[#1a1914] text-white font-bold px-4 py-3 rounded-xl text-sm transition-colors">ใช้โค้ด</button>
                </div>
              </div>

              <div className="border-t border-[#e6e5e0] pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-[#a09c92] uppercase tracking-wider">ยอดสุทธิ</span>
                  <span className="text-3xl font-black text-[#f54e00]">$37.99</span>
                </div>
              </div>

              <Link href="/payment" className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-orange-500/40 transition-all hover:-translate-y-1">
                ดำเนินการชำระเงิน
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

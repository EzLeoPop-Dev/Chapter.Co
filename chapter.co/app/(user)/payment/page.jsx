"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('qr');

  return (
    <div className="min-h-screen bg-[#F2EEE7] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#C8861A] selection:text-white p-4 md:p-8 flex flex-col">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-tertiary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <Navbar />

        <div className="mt-8 mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-black text-[#1A1A1A]">การชำระเงิน</h1>
          <div className="hidden md:flex items-center space-x-4 text-sm font-bold text-[#a09c92]">
            <span className="flex items-center"><div className="w-6 h-6 rounded-full bg-[#d0cdc5] text-white flex items-center justify-center mr-2">1</div> จัดส่ง</span>
            <div className="w-10 h-0.5 bg-[#e6e5e0]"></div>
            <span className="flex items-center text-primary"><div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-2">2</div> ชำระเงิน</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-[2] space-y-6">
            
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">เลือกช่องทางการชำระเงิน</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${paymentMethod === 'qr' ? 'border-primary bg-orange-50' : 'border-[#e6e5e0] bg-white hover:border-primary'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">Thai QR PromptPay</h3>
                    {paymentMethod === 'qr' && <div className="w-4 h-4 rounded-full bg-primary"></div>}
                  </div>
                  <p className="text-sm text-[#a09c92] font-medium">สแกนจ่ายผ่านแอปธนาคาร</p>
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${paymentMethod === 'card' ? 'border-primary bg-orange-50' : 'border-[#e6e5e0] bg-white hover:border-primary'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">Credit / Debit Card</h3>
                    {paymentMethod === 'card' && <div className="w-4 h-4 rounded-full bg-primary"></div>}
                  </div>
                  <p className="text-sm text-[#a09c92] font-medium">บัตรเครดิต หรือบัตรเดบิต</p>
                </button>
              </div>

              {paymentMethod === 'qr' && (
                <div className="bg-white rounded-2xl p-8 border border-[#e6e5e0] flex flex-col items-center justify-center animate-fadeIn text-center">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                    [Mockup QR Code]
                  </div>
                  <h4 className="font-bold text-lg mb-1">สแกน QR Code เพื่อชำระเงิน</h4>
                  <p className="text-[#a09c92] text-sm">ชื่อบัญชี: บจก. Chapter.Co</p>
                  <p className="text-primary font-bold text-xl mt-4">ยอดโอน: $37.99</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="bg-white rounded-2xl p-8 border border-[#e6e5e0] animate-fadeIn space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#a09c92] uppercase tracking-wider mb-2">หมายเลขบัตร</label>
                    <input type="text" className="w-full bg-[#F2EEE7] border border-[#e6e5e0] rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#a09c92] uppercase tracking-wider mb-2">วันหมดอายุ</label>
                      <input type="text" className="w-full bg-[#F2EEE7] border border-[#e6e5e0] rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#a09c92] uppercase tracking-wider mb-2">CVV</label>
                      <input type="text" className="w-full bg-[#F2EEE7] border border-[#e6e5e0] rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {paymentMethod === 'qr' && (
              <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center">อัปโหลดสลิปการโอนเงิน</h2>
                <div className="border-2 border-dashed border-[#d0cdc5] rounded-2xl p-8 text-center cursor-pointer hover:border-primary hover:bg-orange-50 transition-colors">
                  <p className="text-[#a09c92] font-medium">คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่</p>
                  <p className="text-sm text-[#d0cdc5] mt-2">รองรับ JPG, PNG สูงสุด 5MB</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl sticky top-8">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">สรุปคำสั่งซื้อ</h3>
              <div className="border-t border-[#e6e5e0] pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-[#a09c92] uppercase tracking-wider">ยอดที่ต้องชำระ</span>
                  <span className="text-3xl font-black text-[#C8861A]">$37.99</span>
                </div>
              </div>
              {/* Navigate to orders as a mock success route */}
              <Link href="/orders" className="w-full flex items-center justify-center bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-primary/40 transition-all hover:-translate-y-1">
                ยืนยันการชำระเงิน
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

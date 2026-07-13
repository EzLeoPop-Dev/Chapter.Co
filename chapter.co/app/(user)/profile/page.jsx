"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F2EEE7] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#C8861A] selection:text-white p-4 md:p-8 flex flex-col">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-tertiary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col flex-1">
        <Navbar />

        <div className="flex flex-col md:flex-row gap-8 mt-8">

          {/* Sidebar Menu */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-sm p-4 sticky top-8">
              <div className="flex flex-col items-center p-6 border-b border-[#e6e5e0] mb-4">
                <div className="w-20 h-20 bg-gradient-to-tr from-primary to-primary rounded-full text-white flex items-center justify-center text-3xl font-black mb-4 shadow-md">
                  S
                </div>
                <h3 className="font-bold text-lg text-center">สมชาย รักการอ่าน</h3>
                <p className="text-sm text-[#a09c92]">somchai@example.com</p>
              </div>
              <ul className="space-y-2 font-bold text-sm">
                <li><Link href="/profile" className="block px-4 py-3 rounded-xl bg-orange-50 text-primary transition-colors">ข้อมูลส่วนตัว</Link></li>
                <li><Link href="/orders" className="block px-4 py-3 rounded-xl text-[#1A1A1A] hover:bg-white transition-colors">ประวัติการสั่งซื้อ</Link></li>
                <li><Link href="/wishlist" className="block px-4 py-3 rounded-xl text-[#1A1A1A] hover:bg-white transition-colors">หนังสือที่อยากได้</Link></li>
                <li><Link href="/library" className="block px-4 py-3 rounded-xl text-[#1A1A1A] hover:bg-white transition-colors">คลัง E-book ของฉัน</Link></li>
                <li className="pt-4 mt-4 border-t border-[#e6e5e0]">
                  <Link 
                    href="/auth/login" 
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.removeItem('isLoggedIn');
                      }
                    }}
                    className="block w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    ออกจากระบบ
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-[#1A1A1A]">ข้อมูลส่วนตัว</h2>
                <button className="px-5 py-2 bg-[#F2EEE7] hover:bg-[#e6e5e0] text-[#1A1A1A] rounded-xl font-bold transition-colors shadow-sm text-sm">
                  แก้ไขข้อมูล
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[12px] font-bold text-[#a09c92] uppercase tracking-wider mb-2">ชื่อ - นามสกุล</label>
                  <div className="text-lg font-medium text-[#1A1A1A]">นาย สมชาย รักการอ่าน</div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#a09c92] uppercase tracking-wider mb-2">อีเมล</label>
                  <div className="text-lg font-medium text-[#1A1A1A]">somchai@example.com</div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#a09c92] uppercase tracking-wider mb-2">เบอร์โทรศัพท์</label>
                  <div className="text-lg font-medium text-[#1A1A1A]">081-234-5678</div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#a09c92] uppercase tracking-wider mb-2">วันเกิด</label>
                  <div className="text-lg font-medium text-[#1A1A1A]">1 มกราคม 2530</div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#1A1A1A]">ที่อยู่จัดส่งเริ่มต้น</h2>
                <button className="text-primary font-bold hover:text-primary text-sm">จัดการที่อยู่ทั้งหมด</button>
              </div>
              <div className="border border-[#e6e5e0] bg-white rounded-2xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">บ้าน</h3>
                  <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-md">ค่าเริ่มต้น</span>
                </div>
                <p className="text-[#1A1A1A] font-medium leading-relaxed mt-2">
                  123/45 ถนนสุขุมวิท ซอย 63 <br />
                  แขวงคลองตันเหนือ เขตวัฒนา <br />
                  กรุงเทพมหานคร 10110
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

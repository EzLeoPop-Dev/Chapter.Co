"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { books } from '../../data/books';

export default function LibraryPage() {
  const libraryBooks = books.filter(b => b.bookType === 'E-Book' || b.category === 'การ์ตูน (Manga)');

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#26251e] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#f54e00] selection:text-white p-4 md:p-8 flex flex-col">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col flex-1">
        <Navbar />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          
          {/* Sidebar Menu */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-sm p-4 sticky top-8">
              <div className="flex flex-col items-center p-6 border-b border-[#e6e5e0] mb-4">
                <div className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-amber-500 rounded-full text-white flex items-center justify-center text-3xl font-black mb-4 shadow-md">
                  S
                </div>
                <h3 className="font-bold text-lg text-center">สมชาย รักการอ่าน</h3>
                <p className="text-sm text-[#a09c92]">somchai@example.com</p>
              </div>
              <ul className="space-y-2 font-bold text-sm">
                <li><Link href="/profile" className="block px-4 py-3 rounded-xl text-[#5a5852] hover:bg-white transition-colors">ข้อมูลส่วนตัว</Link></li>
                <li><Link href="/orders" className="block px-4 py-3 rounded-xl text-[#5a5852] hover:bg-white transition-colors">ประวัติการสั่งซื้อ</Link></li>
                <li><Link href="/wishlist" className="block px-4 py-3 rounded-xl text-[#5a5852] hover:bg-white transition-colors">หนังสือที่อยากได้</Link></li>
                <li><Link href="/library" className="block px-4 py-3 rounded-xl bg-orange-50 text-orange-600 transition-colors">คลัง E-book ของฉัน</Link></li>
                <li className="pt-4 mt-4 border-t border-[#e6e5e0]"><Link href="/login" className="block w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors">ออกจากระบบ</Link></li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-[#26251e]">คลัง E-book ของฉัน</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white rounded-xl border border-[#e6e5e0] text-sm font-bold shadow-sm hover:border-orange-300">อ่านล่าสุด</button>
                <button className="px-4 py-2 bg-white rounded-xl border border-[#e6e5e0] text-sm font-bold shadow-sm hover:border-orange-300">เรียงตามตัวอักษร</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {libraryBooks.map((book) => (
                <div key={book.id} className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-3xl p-5 hover:bg-white hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative">
                  
                  <div className="relative h-64 mb-5 rounded-2xl overflow-hidden shadow-md flex-shrink-0 cursor-pointer group-hover:-translate-y-2 transition-transform duration-300">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-white text-orange-600 font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform">
                        อ่านตอนนี้
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-500 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">E-BOOK</span>
                      <h3 className="font-bold text-[16px] text-[#26251e] leading-tight mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-[#5a5852] text-[13px] font-medium">{book.author}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#e6e5e0] flex items-center justify-between">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${Math.floor(Math.random() * 100)}%` }}></div>
                      </div>
                      <span className="text-[12px] font-bold text-[#a09c92]">{Math.floor(Math.random() * 100)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

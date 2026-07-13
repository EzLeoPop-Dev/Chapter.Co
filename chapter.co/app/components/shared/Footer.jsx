"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-8 mt-16 relative z-10">
      <div className="bg-white/80 backdrop-blur-xl border border-[#e6e5e0] rounded-[2rem] shadow-sm overflow-hidden p-8 md:p-12 relative">
        
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 relative z-10">
          
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] mb-4">
              Chapter.Co
            </Link>
            <p className="text-[#807d72] text-sm leading-relaxed mb-8 max-w-xs">
              Curated reads for the curious mind. Explore our collection of premium books, e-books, and reading accessories designed to elevate your reading experience.
            </p>
            <div className="flex space-x-3">
              <a href="/" className="w-10 h-10 rounded-full bg-[#F2EEE7] flex items-center justify-center text-[#5a5852] hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-[#e6e5e0]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="/" className="w-10 h-10 rounded-full bg-[#F2EEE7] flex items-center justify-center text-[#5a5852] hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-[#e6e5e0]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="/" className="w-10 h-10 rounded-full bg-[#F2EEE7] flex items-center justify-center text-[#5a5852] hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-[#e6e5e0]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[#1A1A1A] font-bold text-sm uppercase tracking-wider mb-5">เลือกซื้อ</h3>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-[#807d72] hover:text-primary text-sm transition-colors">หนังสือทั้งหมด</Link></li>
              <li><Link href="/shop?category=Fiction" className="text-[#807d72] hover:text-primary text-sm transition-colors">หนังสือนิยาย</Link></li>
              <li><Link href="/shop?category=Non-Fiction" className="text-[#807d72] hover:text-primary text-sm transition-colors">หนังสือสารคดี</Link></li>
              <li><Link href="/shop?type=E-Book" className="text-[#807d72] hover:text-primary text-sm transition-colors">อีบุ๊ก (E-Books)</Link></li>
              <li><Link href="/coupons" className="text-[#807d72] hover:text-primary text-sm transition-colors">รวมโค้ดส่วนลด</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="lg:col-span-2">
            <h3 className="text-[#1A1A1A] font-bold text-sm uppercase tracking-wider mb-5">ช่วยเหลือ</h3>
            <ul className="space-y-3">
              <li><Link href="/profile" className="text-[#807d72] hover:text-primary text-sm transition-colors">บัญชีของฉัน</Link></li>
              <li><Link href="/orders" className="text-[#807d72] hover:text-primary text-sm transition-colors">ติดตามคำสั่งซื้อ</Link></li>
              <li><Link href="/" className="text-[#807d72] hover:text-primary text-sm transition-colors">นโยบายการคืนสินค้า</Link></li>
              <li><Link href="/" className="text-[#807d72] hover:text-primary text-sm transition-colors">คำถามที่พบบ่อย</Link></li>
              <li><Link href="/" className="text-[#807d72] hover:text-primary text-sm transition-colors">ติดต่อเรา</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-[#1A1A1A] font-bold text-sm uppercase tracking-wider mb-5">รับข่าวสาร & ส่วนลด</h3>
            <p className="text-[#807d72] text-sm mb-4 leading-relaxed">
              สมัครรับจดหมายข่าวของเราเพื่อรับส่วนลด 10% สำหรับการสั่งซื้อครั้งแรกและอัปเดตหนังสือใหม่ๆ ก่อนใคร
            </p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="อีเมลของคุณ..." 
                className="w-full bg-[#F2EEE7] border border-[#e6e5e0] text-[#1A1A1A] text-sm rounded-full px-5 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-32"
                required
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 bg-primary hover:bg-opacity-90 text-white text-sm font-bold px-6 rounded-full transition-all shadow-sm"
              >
                ติดตาม
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#e6e5e0] flex flex-col md:flex-row justify-between items-center relative z-10 gap-4">
          <p className="text-[#807d72] text-xs">
            &copy; {new Date().getFullYear()} Chapter.Co Bookstore. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs text-[#807d72]">
            <Link href="/" className="hover:text-primary transition-colors">นโยบายความเป็นส่วนตัว</Link>
            <Link href="/" className="hover:text-primary transition-colors">เงื่อนไขการให้บริการ</Link>
            <Link href="/" className="hover:text-primary transition-colors">นโยบายคุกกี้</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

"use client";
import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-10 border border-white/60 pt-10 pb-8 flex flex-col md:flex-row justify-between items-center relative z-10 backdrop-blur-xl bg-white/40 rounded-[2.5rem] px-10 mb-8 shadow-sm">
      <div className="mb-6 md:mb-0 text-center md:text-left">
        <div className="text-[26px] font-normal tracking-[-0.325px] bg-clip-text text-transparent bg-gradient-to-r from-[#26251e] to-[#5a5852] mb-2">
          Chapter.Co
        </div>
        <p className="text-[#5a5852] text-[14px] font-normal">Curated reads for the curious mind.</p>
        <p className="text-[#807d72] text-[13px] mt-2">&copy; 2026 Chapter.Co Bookstore. All rights reserved.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-[14px] font-medium text-[#5a5852] mb-6 md:mb-0">
        <a href="#" className="hover:text-[#f54e00] transition-colors">เกี่ยวกับเรา</a>
        <a href="#" className="hover:text-[#f54e00] transition-colors">นโยบายความเป็นส่วนตัว</a>
        <a href="#" className="hover:text-[#f54e00] transition-colors">เงื่อนไขการใช้งาน</a>
        <a href="#" className="hover:text-[#f54e00] transition-colors">ติดต่อเรา</a>
      </div>

      <div className="flex space-x-4">
        <button className="p-2.5 text-[#a09c92] hover:text-[#f54e00] hover:bg-white/80 rounded-full transition-all border border-transparent hover:border-white/60 shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </button>
        <button className="p-2.5 text-[#a09c92] hover:text-[#f54e00] hover:bg-white/80 rounded-full transition-all border border-transparent hover:border-white/60 shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </button>
        <button className="p-2.5 text-[#a09c92] hover:text-[#f54e00] hover:bg-white/80 rounded-full transition-all border border-transparent hover:border-white/60 shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
        </button>
      </div>
    </footer>
  );
}

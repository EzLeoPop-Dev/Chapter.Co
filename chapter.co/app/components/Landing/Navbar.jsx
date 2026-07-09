import React from 'react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="mb-10 sticky top-4 z-50">
            <div className="backdrop-blur-xl bg-white/70 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-6 md:px-8 py-4 flex flex-wrap justify-between items-center transition-all">
                <Link href="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 mr-8">
                    Chapter.Co
                </Link>
                <nav className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600 flex-1">
                    <Link href="/" className="text-slate-900 border-b-2 border-orange-400 pb-1">หน้าหลัก</Link>
                    <a href="#" className="hover:text-slate-900 hover:border-b-2 hover:border-orange-200 pb-1 transition-all">หมวดหมู่</a>
                    <a href="#" className="hover:text-slate-900 hover:border-b-2 hover:border-orange-200 pb-1 transition-all">โปรโมชั่น</a>
                    <a href="#" className="hover:text-slate-900 hover:border-b-2 hover:border-orange-200 pb-1 transition-all">E-book</a>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link href="/profile" className="text-slate-500 hover:text-orange-500 transition-colors p-2 bg-white/50 rounded-full">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </Link>
                    <Link href="/profile" className="text-slate-500 hover:text-orange-500 transition-colors p-2 bg-white/50 rounded-full">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </Link>
                    <Link href="/cart" className="text-slate-500 hover:text-orange-500 transition-colors relative p-2 bg-white/50 rounded-full">
                        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </Link>
                </div>
            </div>
        </header>
    );
}
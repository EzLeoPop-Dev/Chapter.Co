"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StaffLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/staff/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'จัดการคำสั่งซื้อ', path: '/staff/orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'ตรวจสอบชำระเงิน', path: '/staff/payments', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'จัดส่งสินค้า', path: '/staff/shipping', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { name: 'จัดการสต็อก', path: '/staff/stock', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { name: 'จัดการ E-book', path: '/staff/ebooks', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'บริการลูกค้า (Chat)', path: '/staff/chat', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { name: 'จัดการคำร้อง (Ticket)', path: '/staff/tickets', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
  ];

  return (
    <div className="min-h-screen bg-[#F2EEE7] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#C8861A] selection:text-white flex overflow-hidden">
      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-tertiary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      {/* Floating Sidebar */}
      <aside className="w-64 h-[calc(100vh-2rem)] bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-sm flex flex-col fixed left-4 top-4 z-50">
        <div className="p-6 border-b border-[#e6e5e0] flex items-center justify-center flex-col relative">
          <span className="text-2xl font-normal tracking-[-0.48px] bg-clip-text text-transparent bg-gradient-to-r from-[#1A1A1A] to-[#1A1A1A] mb-1">Chapter.Co</span>
          <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-md uppercase tracking-wider">Staff Space</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <nav className="px-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
              return (
                <Link key={item.name} href={item.path} className={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-md hover:-translate-y-0.5' : 'text-[#1A1A1A] hover:bg-white hover:text-[#1A1A1A] hover:shadow-sm'}`}>
                  <svg className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#a09c92]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#e6e5e0]">
          <div className="flex items-center px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary flex items-center justify-center text-white font-bold shadow-sm">
              S
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-[#1A1A1A]">คุณพนักงาน</p>
              <p className="text-xs font-medium text-[#a09c92]">staff@chapter.co</p>
            </div>
          </div>
          <Link href="/login" className="w-full flex items-center justify-center px-4 py-2.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-sm font-bold transition-colors">
            ออกจากระบบ
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-[18rem] flex flex-col min-h-screen relative z-10 p-4">
        {/* Floating Topbar */}
        <header className="h-16 bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl flex items-center justify-between px-6 mb-6 shadow-sm sticky top-4 z-40">
          <h1 className="text-lg font-bold text-[#1A1A1A]">ระบบจัดการหลังร้าน (Staff Workspace)</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-[#a09c92] hover:text-[#C8861A] transition-colors rounded-full hover:bg-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-[#e6e5e0]"></div>
            <Link href="/" className="text-sm font-bold text-[#C8861A] hover:text-primary bg-orange-50 px-4 py-2 rounded-xl transition-colors">ไปที่หน้าร้าน</Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 pb-4">
          {children}
        </main>
      </div>
    </div>
  );
}

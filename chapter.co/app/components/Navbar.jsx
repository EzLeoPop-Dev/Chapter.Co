"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const categoriesData = [
    { name: 'Fiction', subcategories: ['Romance', 'Sci-Fi', 'Fantasy', 'Mystery', 'Thriller', 'Historical Fiction'] },
    { name: 'Science', subcategories: ['Physics', 'Biology', 'Chemistry', 'Astronomy', 'Earth Science'] },
    { name: 'Philosophy', subcategories: ['Ethics', 'Metaphysics', 'Logic', 'Aesthetics', 'Eastern Philosophy'] },
    { name: 'Design', subcategories: ['Graphic Design', 'UI/UX', 'Architecture', 'Interior Design', 'Product Design'] },
    { name: 'Technology', subcategories: ['Programming', 'Artificial Intelligence', 'Cybersecurity', 'Hardware', 'Data Science'] },
    { name: 'Business', subcategories: ['Finance & Investing', 'Management', 'Marketing', 'Startup & Entrepreneurship'] },
    { name: 'Self-Help', subcategories: ['Productivity', 'Mindfulness & Meditation', 'Relationships', 'Personal Finance'] },
    { name: 'History', subcategories: ['Ancient History', 'Modern History', 'World Wars', 'Civilizations'] },
    { name: 'Biography', subcategories: ['Historical Figures', 'Entrepreneurs', 'Artists & Creatives', 'Memoirs'] },
    { name: 'Art', subcategories: ['Painting', 'Photography', 'Sculpture', 'Digital Art', 'Art History'] },
  ];

  const cartItems = [
    { id: 1, title: 'Atomic Habits', author: 'James Clear', price: 15.99, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200&auto=format&fit=crop' },
    { id: 2, title: 'Sapiens', author: 'Yuval Noah Harari', price: 28.50, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop' }
  ];
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <header className="mb-6 flex-shrink-0 w-full relative z-40">
        <div className="flex justify-between items-center mb-6 px-4">
          <Link href="/" className="text-[36px] font-normal tracking-[-0.72px] bg-clip-text text-transparent bg-gradient-to-r from-[#1A1A1A] to-[#1A1A1A] hover:opacity-80 transition-opacity">
            Chapter.Co
          </Link>
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsSideMenuOpen(true)} className="group flex items-center p-2.5 text-[#1A1A1A] hover:text-[#1A1A1A] hover:bg-white/60 rounded-full backdrop-blur-sm transition-all">
              <span className="w-0 overflow-hidden opacity-0 group-hover:w-[60px] group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 text-[14px] font-medium whitespace-nowrap text-right text-primary">
                หมวดหมู่
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div className="flex items-center relative">
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-48 opacity-100 mr-2' : 'w-0 opacity-0'}`}>
                <input
                  type="text"
                  placeholder="ค้นหาหนังสือ..."
                  className="w-full bg-white/50 border border-[#e6e5e0] backdrop-blur-sm rounded-full py-1.5 px-4 text-sm text-[#1A1A1A] focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2.5 rounded-full backdrop-blur-sm transition-all z-10 ${isSearchOpen ? 'bg-primary text-[#C8861A]' : 'text-[#1A1A1A] hover:text-[#1A1A1A] hover:bg-white/60'}`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-[#ffffff]/50 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-8 py-4 flex flex-wrap justify-between items-center transition-all">
          <nav className="flex space-x-8 text-[14px] font-medium text-[#1A1A1A]">
            <Link href="/" className="hover:text-[#1A1A1A] hover:border-b-2 hover:border-primary pb-1 transition-all">หน้าหลัก</Link>
            <Link href="/shop" className="hover:text-[#1A1A1A] hover:border-b-2 hover:border-primary pb-1 transition-all">หนังสือแนะนำ</Link>
            <Link href="/shop" className="hover:text-[#1A1A1A] hover:border-b-2 hover:border-primary pb-1 transition-all">เลือกซื้อหนังสือ</Link>
          </nav>
          <div className="flex items-center space-x-5 mt-4 sm:mt-0">
            <Link href="/coupons" className="flex items-center space-x-1.5 bg-gradient-to-r from-primary to-primary text-white px-4 py-1.5 rounded-full hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all font-medium text-[13px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              <span>โค้ดส่วนลด</span>
            </Link>
            
            {mounted && isLoggedIn ? (
              <>
                <Link href="/profile" className="text-[#1A1A1A] hover:text-primary transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </Link>
                <button onClick={() => setIsCartOpen(true)} className="text-[#1A1A1A] hover:text-primary transition-colors relative p-2.5 rounded-full hover:bg-white/60">
                  <span className="absolute top-1 right-1 bg-[#C8861A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </button>
              </>
            ) : mounted ? (
              <Link href="/auth/login" className="flex items-center justify-center bg-white text-[#1A1A1A] border border-[#1A1A1A] px-5 py-1.5 rounded-full hover:bg-[#1A1A1A] hover:text-white transition-all font-semibold text-[13px]">
                เข้าสู่ระบบ
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      {/* Side Menu Overlay */}
      <div className={`fixed inset-0 z-50 flex transition-all duration-300 ${isSideMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isSideMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsSideMenuOpen(false)}></div>
        <div className={`relative w-80 max-w-sm bg-[#F2EEE7]/95 backdrop-blur-xl h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-[#e6e5e0] flex justify-between items-center h-[76px]">
            {selectedCategory ? (
              <div className="flex items-center space-x-3">
                <button onClick={() => setSelectedCategory(null)} className="p-1.5 text-[#1A1A1A] hover:text-[#C8861A] hover:bg-orange-50 rounded-full transition-all -ml-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <h2 className="text-xl font-medium text-[#1A1A1A] truncate max-w-[180px]">{selectedCategory.name}</h2>
              </div>
            ) : (
              <h2 className="text-xl font-medium text-[#1A1A1A]">หมวดหมู่ทั้งหมด</h2>
            )}
            <button onClick={() => { setIsSideMenuOpen(false); setTimeout(() => setSelectedCategory(null), 300); }} className="p-2 text-[#1A1A1A] hover:text-[#1A1A1A] hover:bg-black/5 rounded-full transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="flex-1 overflow-hidden relative">
            {/* Main Categories */}
            <div className={`absolute inset-0 p-4 transition-transform duration-300 ease-in-out ${selectedCategory ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'} overflow-y-auto`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <ul className="space-y-1">
                {categoriesData.map((category, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className="w-full text-left px-4 py-3.5 text-[#1A1A1A] hover:text-[#C8861A] hover:bg-orange-50/80 rounded-xl transition-all font-medium flex justify-between items-center group"
                    >
                      {category.name}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#a09c92] group-hover:text-[#C8861A] transition-colors"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subcategories */}
            <div className={`absolute inset-0 p-4 transition-transform duration-300 ease-in-out ${selectedCategory ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} overflow-y-auto`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {selectedCategory && (
                <ul className="space-y-1">
                  <li className="mb-3">
                    <Link href="/shop" onClick={() => setIsSideMenuOpen(false)} className="block px-4 py-3.5 text-[#C8861A] bg-orange-50/50 hover:bg-primary/50 rounded-xl transition-all font-semibold flex items-center justify-between border border-primary">
                      ดูทั้งหมดใน {selectedCategory.name}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                  </li>
                  {selectedCategory.subcategories.map((sub, idx) => (
                    <li key={idx}>
                      <Link href="/shop" onClick={() => setIsSideMenuOpen(false)} className="block px-4 py-3 text-[#1A1A1A] hover:text-[#1A1A1A] hover:bg-[#e6e5e0]/50 rounded-xl transition-all font-medium">
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Side Panel */}
      <div className={`fixed inset-0 z-[55] flex justify-end transition-all duration-300 ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)}></div>
        
        <div className={`relative w-96 max-w-sm bg-[#F2EEE7]/95 backdrop-blur-xl h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b border-[#e6e5e0] flex justify-between items-center bg-white/50 backdrop-blur-md">
            <div className="flex items-center space-x-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8861A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <h2 className="text-xl font-semibold text-[#1A1A1A]">ตะกร้าสินค้า (2)</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 text-[#1A1A1A] hover:text-[#C8861A] hover:bg-orange-50 rounded-full transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-28 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-[#e6e5e0]">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col flex-1 py-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-[#1A1A1A] leading-tight text-sm pr-4 line-clamp-2">{item.title}</h3>
                      <button className="text-[#a09c92] hover:text-red-500 transition-colors mt-0.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      </button>
                    </div>
                    <p className="text-[#807d72] text-[12px] mb-2">{item.author}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <div className="flex items-center border border-[#e6e5e0] rounded-lg bg-white overflow-hidden">
                        <button className="px-2 py-0.5 text-[#1A1A1A] hover:bg-orange-50 hover:text-[#C8861A] transition-colors">-</button>
                        <span className="px-2 py-0.5 text-sm font-medium text-[#1A1A1A] bg-[#F2EEE7]">1</span>
                        <button className="px-2 py-0.5 text-[#1A1A1A] hover:bg-orange-50 hover:text-[#C8861A] transition-colors">+</button>
                      </div>
                      <span className="font-bold text-[#C8861A]">${item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-[#e6e5e0] bg-white/50 backdrop-blur-md">
            <div className="mb-4 space-y-3">
              <button onClick={() => { setIsCartOpen(false); setTimeout(() => setIsCouponModalOpen(true), 300); }} className="w-full flex items-center justify-between px-4 py-3 bg-orange-50 text-[#C8861A] rounded-xl hover:bg-primary/80 transition-colors border border-primary">
                <div className="flex items-center space-x-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                  <span className="font-semibold text-[13px]">ดูและเก็บโค้ดส่วนลด</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
              
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="กรอกโค้ดส่วนลด" 
                  className="flex-1 bg-white border border-[#e6e5e0] rounded-xl py-2.5 px-4 text-[13px] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-[#a09c92]"
                />
                <button className="px-4 py-2.5 bg-[#1A1A1A] text-white rounded-xl text-[13px] font-medium hover:bg-[#1A1A1A] transition-colors whitespace-nowrap">
                  ใช้โค้ด
                </button>
              </div>
            </div>

            <div className="h-px bg-[#e6e5e0] w-full mb-4"></div>

            <div className="flex justify-between items-center mb-1">
              <span className="text-[#807d72] text-[13px] font-medium">ยอดรวมสินค้า</span>
              <span className="text-[#1A1A1A] font-medium text-[14px]">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-5">
              <span className="text-[#1A1A1A] font-semibold text-[16px]">ยอดสุทธิ</span>
              <span className="text-2xl font-bold text-[#C8861A]">${cartTotal.toFixed(2)}</span>
            </div>
            
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block text-center w-full bg-gradient-to-r from-primary to-primary text-white py-3.5 rounded-2xl font-semibold text-[15px] hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              ดำเนินการชำระเงิน
            </Link>
            
            <button onClick={() => setIsCartOpen(false)} className="w-full bg-white text-[#1A1A1A] border border-[#e6e5e0] py-3.5 mt-3 rounded-2xl font-semibold text-[15px] hover:bg-orange-50 hover:border-primary hover:text-[#C8861A] transition-all duration-300">
              กลับสู่หน้าหลักเพื่อช้อปต่อ
            </button>

            <p className="text-center text-[12px] text-[#a09c92] mt-4 flex items-center justify-center space-x-1">
              <span>✨</span>
              <span>ฟรีค่าจัดส่งเมื่อซื้อครบ $50</span>
            </p>
          </div>
        </div>
      </div>

      {/* Coupon Center Modal */}
      <div className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300 ${isCouponModalOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isCouponModalOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCouponModalOpen(false)}></div>
        
        <div className={`relative w-full max-w-2xl bg-[#F2EEE7] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isCouponModalOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'} m-4 max-h-[85vh]`}>
          
          <div className="bg-gradient-to-r from-primary to-primary p-8 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <button onClick={() => setIsCouponModalOpen(false)} className="absolute top-6 right-6 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors text-white backdrop-blur-md z-[70] cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 className="text-3xl font-bold mb-2 flex items-center relative z-10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              ศูนย์รวมโค้ดส่วนลด
            </h2>
            <p className="text-orange-50 text-[15px] relative z-10">เก็บโค้ดสุดคุ้ม เพื่อใช้เป็นส่วนลดในการสั่งซื้อของคุณ</p>
          </div>

          <div className="p-6 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-white rounded-2xl border border-[#e6e5e0] flex overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary w-24 flex flex-col items-center justify-center border-r border-dashed border-primary relative">
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#F2EEE7] rounded-full"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#F2EEE7] rounded-full"></div>
                  <span className="text-primary font-bold text-2xl">20%</span>
                  <span className="text-primary text-[11px] font-semibold">OFF</span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] text-[15px]">ส่วนลดหนังสือใหม่</h3>
                    <p className="text-[#807d72] text-[12px] mt-1">เมื่อซื้อขั้นต่ำ $40</p>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <span className="text-[10px] text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded text-center">หมดเขตพรุ่งนี้</span>
                    <button className="bg-primary hover:bg-primary text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors">
                      เก็บโค้ด
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e6e5e0] flex overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-50 w-24 flex flex-col items-center justify-center border-r border-dashed border-blue-200 relative">
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#F2EEE7] rounded-full"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#F2EEE7] rounded-full"></div>
                  <span className="text-tertiary font-bold text-xl">FREE</span>
                  <span className="text-tertiary text-[11px] font-semibold">SHIPPING</span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] text-[15px]">ส่งฟรีไม่มีขั้นต่ำ</h3>
                    <p className="text-[#807d72] text-[12px] mt-1">สำหรับการสั่งซื้อครั้งแรก</p>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <span className="text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded text-center">ใช้ได้ 1 ครั้ง</span>
                    <button className="bg-primary hover:bg-primary text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors">
                      เก็บโค้ด
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

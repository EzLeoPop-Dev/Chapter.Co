"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import CategorySidebar from '../../components/shop/CategorySidebar';
import ShopHeader from '../../components/shop/ShopHeader';
import BookGrid from '../../components/shop/BookGrid';
import BookModal from '../../components/shop/BookModal';
import { books, categories, bookTypes, publishers } from '../../data/books';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBookTypes, setSelectedBookTypes] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);



  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesBookType = selectedBookTypes.length === 0 || selectedBookTypes.includes(book.bookType);
    const matchesPublisher = selectedPublisher === 'All' || book.publisher === selectedPublisher;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBookType && matchesPublisher && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F2EEE7] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#C8861A] selection:text-white p-4 md:p-8">
      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-tertiary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      {/* Main Layout Container (Containerized) */}
      <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] relative z-10">
        
        <Navbar />

        {/* Content Below Navbar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar / Categories */}
          <CategorySidebar 
            categories={categories} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            bookTypes={bookTypes}
            selectedBookTypes={selectedBookTypes}
            setSelectedBookTypes={setSelectedBookTypes}
            publishers={publishers}
            selectedPublisher={selectedPublisher}
            setSelectedPublisher={setSelectedPublisher}
          />

          {/* Main Content */}
          <main className="flex-1 flex flex-col h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-sm overflow-hidden relative">
            <div className="p-6 md:p-10 overflow-y-auto h-full scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              
              <ShopHeader 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                bookTypes={bookTypes}
                selectedBookTypes={selectedBookTypes}
                setSelectedBookTypes={setSelectedBookTypes}
                publishers={publishers}
                selectedPublisher={selectedPublisher}
                setSelectedPublisher={setSelectedPublisher}
              />

              {/* Promotion Banner */}
              <div className="bg-gradient-to-r from-primary to-primary rounded-[2rem] p-8 md:p-10 mb-12 relative overflow-hidden shadow-[0_8px_30px_rgb(249,115,22,0.2)]">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-6 md:mb-0 text-white">
                    <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm border border-white/30">
                      พิเศษสุดวันนี้
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">ลดล้างสต๊อก สูงสุด 50%</h2>
                    <p className="text-primary font-medium opacity-90">ในหมวดหมู่ Self-Help และ Business พลาดไม่ได้!</p>
                  </div>
                  <button className="bg-white text-primary font-bold px-8 py-3.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                    ช้อปเลย
                  </button>
                </div>
              </div>

              <BookGrid 
                filteredBooks={filteredBooks}
                setSelectedBook={setSelectedBook}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                setSearchQuery={setSearchQuery}
                setSelectedCategory={setSelectedCategory}
              />
              
            </div>
          </main>
        </div>
      </div>

      <BookModal 
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
      />

    </div>
  );
}

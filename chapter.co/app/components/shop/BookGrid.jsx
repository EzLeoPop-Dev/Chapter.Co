"use client";
import React from 'react';

export default function BookGrid({ filteredBooks, setSelectedBook, searchQuery, selectedCategory, setSearchQuery, setSelectedCategory }) {
  return (
    <>
      {/* Search Results Header */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#26251e]">
            {searchQuery ? `ผลการค้นหา "${searchQuery}"` : (selectedCategory === 'All' ? 'หนังสือทั้งหมด' : `หมวดหมู่: ${selectedCategory}`)}
          </h2>
          <p className="text-[#807d72] mt-1 font-medium">พบทั้งหมด {filteredBooks.length} รายการ</p>
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
          {filteredBooks.map((book) => (
            <div 
              key={book.id} 
              onClick={() => setSelectedBook(book)}
              className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-3xl p-5 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col h-full"
            >
              <div className="relative h-64 mb-5 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                  {book.category}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-[12px] text-[#807d72] mb-2 font-medium">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f54e00" stroke="#f54e00" className="mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    <span className="text-[#26251e] mr-1 font-bold">{book.rating}</span>
                    <span>({book.reviews})</span>
                  </div>
                  <h3 className="font-bold text-[18px] text-[#26251e] leading-tight mb-1 group-hover:text-[#f54e00] transition-colors">{book.title}</h3>
                  <p className="text-[#5a5852] text-[14px] font-medium">{book.author}</p>
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#e6e5e0]">
                  <span className="text-xl font-bold text-[#f54e00]">${book.price.toFixed(2)}</span>
                  <div className="w-10 h-10 rounded-full bg-[#f7f7f4] flex items-center justify-center text-[#5a5852] group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-[#a09c92]">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-[#e6e5e0]"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3 className="text-xl font-bold text-[#5a5852] mb-2">ไม่พบหนังสือที่คุณค้นหา</h3>
          <p>ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่ใหม่</p>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
            className="mt-6 px-6 py-2 bg-orange-100 text-orange-600 font-bold rounded-full hover:bg-orange-200 transition-colors"
          >
            ล้างการค้นหา
          </button>
        </div>
      )}
    </>
  );
}

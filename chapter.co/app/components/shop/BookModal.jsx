"use client";
import React from 'react';
import Link from 'next/link';

export default function BookModal({ selectedBook, setSelectedBook }) {
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-400 ${selectedBook ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-400 ${selectedBook ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSelectedBook(null)}></div>
      
      {selectedBook && (
        <div className={`relative w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] transition-all duration-500 ease-out ${selectedBook ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}>
          
          <button onClick={() => setSelectedBook(null)} className="absolute top-5 right-5 z-20 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-[#5a5852] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Left: Book Cover Image */}
          <div className="w-full md:w-2/5 bg-[#f7f7f4] relative flex items-center justify-center p-8 md:p-12 overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            
            <div className="relative z-10 w-full max-w-[240px] aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden group">
              <img src={selectedBook.image} alt={selectedBook.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>

          {/* Right: Book Details */}
          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-[11px] font-bold uppercase tracking-wider mb-4">
                {selectedBook.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#26251e] leading-tight mb-2">{selectedBook.title}</h2>
              <p className="text-xl text-[#807d72] font-medium mb-6">By <span className="text-[#5a5852]">{selectedBook.author}</span></p>
              
              <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-[#e6e5e0]">
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#a09c92] font-medium uppercase tracking-wider mb-1">Rating</span>
                  <div className="flex items-center text-[#26251e] font-bold text-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#f54e00" stroke="#f54e00" className="mr-1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    {selectedBook.rating}
                  </div>
                </div>
                <div className="w-px h-10 bg-[#e6e5e0]"></div>
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#a09c92] font-medium uppercase tracking-wider mb-1">Reviews</span>
                  <div className="text-[#26251e] font-bold text-lg">{selectedBook.reviews}</div>
                </div>
                <div className="w-px h-10 bg-[#e6e5e0]"></div>
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#a09c92] font-medium uppercase tracking-wider mb-1">Price</span>
                  <div className="text-[#f54e00] font-bold text-xl">${selectedBook.price.toFixed(2)}</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#26251e] mb-3">เรื่องย่อ (Synopsis)</h3>
                <p className="text-[#5a5852] leading-relaxed text-[15px]">{selectedBook.desc}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-orange-500/40 transition-all hover:-translate-y-1 flex items-center justify-center text-[14px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                เพิ่มลงตะกร้า - ${selectedBook.price.toFixed(2)}
              </button>
              <Link href={`/shop/${selectedBook.id}`} className="flex-1 bg-white border-2 border-[#e6e5e0] hover:border-orange-500 hover:text-orange-500 text-[#5a5852] font-bold py-3.5 rounded-2xl transition-all hover:-translate-y-1 flex items-center justify-center text-[14px] shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                ดูรายละเอียดเพิ่มเติม
              </Link>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}

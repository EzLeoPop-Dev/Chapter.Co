"use client";
import React from 'react';

export default function NewArrivals({ newArrivals }) {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-[36px] font-normal tracking-[-0.72px] text-[#1A1A1A] mr-4">มาใหม่ล่าสุด</h2>
          <div className="hidden sm:block w-32 h-px bg-gradient-to-r from-[#e6e5e0] to-transparent"></div>
        </div>
        <button className="text-[14px] font-medium text-[#C8861A] hover:text-primary">ดูทั้งหมด →</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {newArrivals.map((book) => (
          <div key={book.id} className="group cursor-pointer">
            {/* Book Image Container */}
            <div className="backdrop-blur-sm bg-white/50 border border-white/60 p-8 rounded-[2rem] mb-5 flex justify-center items-center h-80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
              <div className={`w-40 h-56 bg-gradient-to-br ${book.theme} rounded-r-xl rounded-l-sm shadow-xl flex flex-col justify-center items-center text-center p-4 relative group-hover:scale-105 group-hover:rotate-1 transition-all duration-500`}>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 rounded-l-sm"></div>
                <h3 className="text-white text-[16px] font-semibold tracking-widest leading-tight whitespace-pre-line">{book.title}</h3>
                <p className={`${book.textTheme} text-[11px] mt-6 tracking-[0.2em]`}>{book.author}</p>
              </div>
            </div>
            {/* Book Details */}
            <div className="px-2">
              <div className="flex items-center text-[13px] text-[#807d72] mb-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#C8861A" stroke="#C8861A" className="mr-1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span className="font-semibold text-[#1A1A1A] mr-1.5">{book.rating}</span>
                <span className="font-normal">{book.reviews} reviews</span>
              </div>
              <h3 className="font-semibold text-[18px] text-[#1A1A1A] mb-1 group-hover:text-[#C8861A] transition-colors line-clamp-1">{book.title.replace('\n', ' ')}</h3>
              <p className="text-[16px] text-[#1A1A1A] mb-4 font-normal">{book.author}</p>

              <div className="flex justify-between items-center">
                <span className="text-[22px] font-normal tracking-[-0.11px] text-[#1A1A1A]">${book.price}</span>
                <button className="bg-[#e6e5e0] text-[#1A1A1A] p-2.5 rounded-xl hover:bg-[#C8861A] hover:text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";
import React, { useRef } from 'react';

export default function BestSellers({ bestSellers }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-16 relative">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-[36px] font-normal tracking-[-0.72px] text-[#1A1A1A] mr-4">หนังสือขายดี</h2>
          <div className="hidden sm:block w-32 h-px bg-gradient-to-r from-[#e6e5e0] to-transparent"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full bg-white border border-[#e6e5e0] flex items-center justify-center text-[#1A1A1A] hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full bg-white border border-[#e6e5e0] flex items-center justify-center text-[#1A1A1A] hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <button className="text-[14px] font-medium text-[#C8861A] hover:text-primary">ดูทั้งหมด →</button>
        </div>
      </div>

      <div ref={scrollRef} className="flex space-x-12 overflow-x-auto pb-8 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {bestSellers.map((book, index) => (
          <div key={book.id} className="group cursor-pointer flex-shrink-0 w-[280px] snap-start relative flex">
            
            {/* Big Rank Number & Animation */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex items-center justify-center z-0 select-none h-full">
              {/* Circular Animation (Behind) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 ease-out opacity-0 group-hover:opacity-100 blur-xl pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/30 rounded-full scale-0 group-hover:scale-[2] transition-transform duration-500 ease-out delay-75 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
              
              {/* Stroke Text Number */}
              <span className="text-[140px] font-black tracking-tighter transition-all duration-500 drop-shadow-sm text-transparent [-webkit-text-stroke:2px_#c2beb2] group-hover:[-webkit-text-stroke:2px_#C8861A] group-hover:text-[#C8861A] relative z-10 leading-none">
                {index + 1}
              </span>
            </div>

            <div className="relative z-10 w-full ml-10">
              {/* Book Image Container */}
              <div className="backdrop-blur-sm bg-white/50 border border-white/60 p-6 rounded-[2rem] mb-5 flex justify-center items-center h-80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                <div className={`w-36 h-52 bg-gradient-to-br ${book.theme} rounded-r-xl rounded-l-sm shadow-xl flex flex-col justify-center items-center text-center p-3 relative group-hover:scale-105 group-hover:rotate-1 transition-all duration-500`}>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 rounded-l-sm"></div>
                  <h3 className="text-white text-[14px] font-semibold tracking-widest leading-tight whitespace-pre-line">{book.title}</h3>
                  <p className={`${book.textTheme} text-[10px] mt-4 tracking-[0.2em]`}>{book.author}</p>
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
                <p className="text-[14px] text-[#807d72] mb-4 font-normal">{book.author}</p>

                <div className="flex justify-between items-center">
                  <span className="text-[20px] font-bold text-[#1A1A1A]">${book.price}</span>
                  <button className="bg-[#F2EEE7] text-[#1A1A1A] p-2.5 rounded-full hover:bg-[#C8861A] hover:text-white hover:shadow-md hover:shadow-primary/30 transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}

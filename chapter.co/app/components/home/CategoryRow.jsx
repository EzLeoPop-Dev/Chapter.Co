"use client";
import React, { useRef } from 'react';

export default function CategoryRow() {
  const categoriesRef = useRef(null);

  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 300;
      categoriesRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mb-16 relative group/categories">
      {/* Navigation Buttons */}
      <button
        onClick={() => scrollCategories('left')}
        className="absolute left-[-16px] md:left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white flex items-center justify-center text-slate-500 hover:text-[#f54e00] hover:scale-110 opacity-0 group-hover/categories:opacity-100 transition-all duration-300"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <button
        onClick={() => scrollCategories('right')}
        className="absolute right-[-16px] md:right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white flex items-center justify-center text-slate-500 hover:text-[#f54e00] hover:scale-110 opacity-0 group-hover/categories:opacity-100 transition-all duration-300"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

      {/* Gradient fading effect for horizontal scroll */}
      <div className="absolute top-0 right-0 w-16 md:w-24 h-32 bg-gradient-to-l from-[#f7f7f4] to-transparent pointer-events-none z-10 rounded-r-[2rem]"></div>
      <div className="absolute top-0 left-0 w-16 md:w-24 h-32 bg-gradient-to-r from-[#f7f7f4] to-transparent pointer-events-none z-10 rounded-l-[2rem]"></div>

      <div ref={categoriesRef} className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {['Fiction', 'Science', 'Philosophy', 'Design', 'Technology', 'Business', 'Self-Help', 'History', 'Biography', 'Art'].map((category, index) => (
          <div key={index} className="flex-none w-36 md:w-48 backdrop-blur-md bg-white/40 border border-white/60 h-32 rounded-[2rem] shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:bg-white/60 hover:-translate-y-1 transition-all duration-300 group snap-center">
            <span className="font-bold text-slate-400 group-hover:text-orange-500 transition-colors tracking-wide text-sm md:text-base">{category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

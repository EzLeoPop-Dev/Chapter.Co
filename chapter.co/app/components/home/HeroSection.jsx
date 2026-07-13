"use client";
import React from 'react';

export default function HeroSection() {
  return (
    <section className="backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2.5rem] p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between mb-12">
      <div className="max-w-lg mb-10 md:mb-0">
        <h1 className="text-[56px] lg:text-[72px] font-normal tracking-[-2.16px] leading-[1.1] mb-6 text-[#1A1A1A]">
          Your next deep dive, <br />
          curated by <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary">
            intelligence
          </span>
        </h1>
        <p className="text-[#1A1A1A] text-[16px] mb-8 leading-[1.5] font-normal">
          Chapter.Co's neural engine analyzes your reading patterns to discover hidden gems tailored to your intellectual curiosity.
        </p>
        <div className="flex space-x-4">
          <button className="bg-gradient-to-r from-primary to-primary text-white px-8 py-3.5 rounded-2xl text-[14px] font-medium hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
            Start Exploring
          </button>
          <button className="bg-white/60 backdrop-blur-sm border border-white text-[#1A1A1A] px-8 py-3.5 rounded-2xl text-[14px] font-medium hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            View Curations
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* Main Book Cover with soft shadow */}
        <div className="w-64 h-84 rounded-xl shadow-2xl shadow-slate-300/50 flex items-center justify-center mb-8 overflow-hidden relative group cursor-pointer border border-white/40">
          <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop" alt="Book Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>

        {/* Thumbnails */}
        <div className="flex items-center space-x-3 backdrop-blur-md bg-white/40 px-4 py-2 rounded-2xl border border-white/50 shadow-sm">
          <button className="p-1.5 text-[#a09c92] hover:text-[#1A1A1A] hover:bg-white/60 rounded-full transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="w-12 h-16 bg-[#e6e5e0] border-2 border-transparent hover:border-primary cursor-pointer rounded-lg overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
              <img src={`https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200&auto=format&fit=crop&sig=${item}`} alt="Thumb" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          ))}
          <button className="p-1.5 text-[#a09c92] hover:text-[#1A1A1A] hover:bg-white/60 rounded-full transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

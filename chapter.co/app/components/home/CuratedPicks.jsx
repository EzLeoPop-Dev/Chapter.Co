"use client";
import React from 'react';

export default function CuratedPicks() {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-3xl font-bold text-[#1A1A1A]">Curated Picks for You</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        
        {/* Left Wide Card */}
        <div className="flex-1 rounded-[1.5rem] border border-[#e6e5e0] overflow-hidden relative shadow-sm hover:shadow-md transition-shadow h-[320px] group bg-[#faf9f7]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=800" 
              alt="Background" 
              className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start w-full">
              <span className="bg-[#e6e5e0]/60 backdrop-blur-sm text-[#1A1A1A] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                ทดลองอ่าน
              </span>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1A1A1A] hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
              </button>
            </div>
            
            <div className="max-w-md">
              <h3 className="text-3xl font-extrabold text-[#1A1A1A] mb-3 leading-tight">
                The Architecture of Stillness
              </h3>
              <p className="text-[#5a5852] text-sm mb-6 leading-relaxed">
                An exploration into how silence shapes our cognitive environments and fosters deep focus in a noisy world.
              </p>
              <button className="bg-primary hover:bg-opacity-90 text-white font-bold py-2.5 px-6 rounded-full transition-all shadow-sm flex items-center w-max">
                หยิบใส่ตะกร้า - ฿450
              </button>
            </div>
          </div>
        </div>

        {/* Right Narrow Card */}
        <div className="w-full md:w-[320px] rounded-[1.5rem] border border-[#e6e5e0] bg-[#faf9f7] overflow-hidden relative shadow-sm hover:shadow-md transition-shadow h-[320px] flex flex-col items-center justify-center p-6 group">
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1A1A1A] hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm z-10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          
          <div className="h-40 w-28 bg-white shadow-md border border-[#e6e5e0] mb-5 group-hover:scale-105 transition-transform duration-500 overflow-hidden relative flex items-center justify-center">
             <div className="absolute inset-0 bg-[#e0d6c8] z-0"></div>
             <div className="relative z-10 text-center px-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#1A1A1A] flex items-center justify-center mb-2 shadow-sm">
                   <div className="w-4 h-4 rounded-full bg-primary"></div>
                </div>
                <div className="text-[7px] font-bold text-[#1A1A1A] uppercase tracking-widest mt-1 opacity-60">Echoes of the Mind</div>
             </div>
          </div>
          
          <div className="text-center w-full">
            <h3 className="font-extrabold text-[#1A1A1A] text-lg mb-1 line-clamp-1">Echoes of the Mind</h3>
            <p className="text-[#807d72] text-xs mb-3">Dr. Elara Vance</p>
            <p className="text-primary font-extrabold">฿320</p>
          </div>
        </div>

      </div>

      {/* Bottom Banner */}
      <div className="rounded-[1.5rem] border border-[#e6e5e0] bg-[#faf9f7] overflow-hidden flex flex-col md:flex-row shadow-sm relative h-auto md:h-[220px]">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <span className="text-primary font-bold text-xs uppercase tracking-wider mb-2">ข้อเสนอพิเศษ</span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-3 leading-tight">
            ลด 20% สำหรับหนังสือแนะนำ
          </h3>
          <p className="text-[#5a5852] text-sm mb-6 leading-relaxed max-w-md">
            พิเศษสำหรับสมาชิก เมื่อซื้อหนังสือในหมวดหมู่ที่คัดสรรเพื่อคุณ
          </p>
          <button className="bg-[#C8861A] hover:bg-[#a66d13] text-white font-bold py-2.5 px-8 rounded-full transition-all shadow-sm w-max">
            ดูรายละเอียด
          </button>
        </div>

        {/* Right Graphic */}
        <div className="w-full md:w-1/2 relative h-48 md:h-full bg-gradient-to-br from-[#e6a235] via-[#C8861A] to-[#8c5a0b] overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white opacity-10 mix-blend-overlay filter blur-2xl"></div>
          <div className="absolute -bottom-20 left-10 w-64 h-64 rounded-full bg-black opacity-20 mix-blend-overlay filter blur-3xl"></div>
          
          {/* Decorative curve lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400" preserveAspectRatio="none">
            <path d="M0 200 C 100 100, 300 300, 400 200" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 10"></path>
            <path d="M0 300 C 150 150, 250 350, 400 100" fill="none" stroke="white" strokeWidth="1"></path>
          </svg>
        </div>

      </div>
    </section>
  );
}

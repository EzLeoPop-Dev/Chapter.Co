"use client";
import React from 'react';

export default function StaffChatPage() {
  return (
    <div className="h-[calc(100vh-10rem)] flex bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-white/80 overflow-hidden">
      
      {/* Contact List */}
      <div className="w-1/3 border-r border-[#e6e5e0] flex flex-col bg-white/40">
        <div className="p-5 border-b border-[#e6e5e0]">
          <input type="text" placeholder="ค้นหาแชท..." className="w-full px-5 py-3 bg-white/60 border border-[#e6e5e0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium placeholder-[#a09c92]" />
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {[1,2,3,4].map((i) => (
            <div key={i} className={`p-5 border-b border-[#e6e5e0]/50 cursor-pointer transition-all flex items-center ${i === 1 ? 'bg-white/80 border-l-4 border-l-orange-500 shadow-sm' : 'hover:bg-white/60'}`}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 shadow-sm">
                U{i}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-sm text-[#1A1A1A] truncate">ลูกค้าท่านที่ {i}</h4>
                  <span className="text-[10px] font-bold text-[#a09c92]">10:30 น.</span>
                </div>
                <p className="text-sm font-medium text-[#1A1A1A] truncate">สอบถามเรื่องการจัดส่งหนังสือครับ...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white/30">
        <div className="p-5 border-b border-[#e6e5e0] flex items-center justify-between bg-white/60">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary flex items-center justify-center text-white font-bold mr-4 shadow-sm">
              U1
            </div>
            <div>
              <h3 className="font-bold text-[#1A1A1A]">ลูกค้าท่านที่ 1</h3>
              <p className="text-xs text-green-500 font-bold flex items-center mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 shadow-sm"></span> ออนไลน์
              </p>
            </div>
          </div>
          <button className="p-2 text-[#a09c92] hover:text-[#1A1A1A] bg-white rounded-full border border-[#e6e5e0] shadow-sm transition-colors">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto space-y-6">
          <div className="flex justify-start">
            <div className="bg-white border border-[#e6e5e0] rounded-2xl rounded-tl-sm px-6 py-4 max-w-[70%] shadow-sm text-[15px] font-medium text-[#1A1A1A]">
              สอบถามเรื่องการจัดส่งหนังสือครับ สั่งไปเมื่อวาน จะได้ของวันไหนครับ?
              <div className="text-[10px] font-bold text-[#a09c92] mt-2 text-right">10:30 น.</div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-6 py-4 max-w-[70%] shadow-sm text-[15px] font-medium">
              สวัสดีค่ะ ขอบคุณที่ใช้บริการค่ะ ตรวจสอบเลขคำสั่งซื้อให้สักครู่นะคะ
              <div className="text-[10px] font-bold text-primary mt-2 text-right">10:32 น.</div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-[#e6e5e0] bg-white/60">
          <div className="flex items-center space-x-3">
            <button className="p-3 bg-white border border-[#e6e5e0] text-[#a09c92] hover:text-[#C8861A] rounded-xl transition-colors shadow-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </button>
            <input type="text" placeholder="พิมพ์ข้อความ..." className="flex-1 px-5 py-3 bg-white border border-[#e6e5e0] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-medium text-[15px]" />
            <button className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary transition-colors shadow-sm">
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

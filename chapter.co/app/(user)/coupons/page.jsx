"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

const COUPON_STORAGE_KEY = 'chapter-cart-coupon';
// คีย์สำหรับดึงข้อมูลที่ส่งมาจากหน้า Admin
const ADMIN_PROMOTIONS_KEY = 'chapter-admin-promotions';

// คูปองเริ่มต้นสำหรับหน้า User กรณีไม่มีข้อมูลใน localStorage
const defaultCoupons = [
  { id: 1, name: 'ส่วนลด 10% เดือนเกิด', code: 'HBD2026', discount: '10%', status: 'Active', end_date: '31 ธ.ค. 2026' },
  { id: 2, name: 'ส่งฟรี 500 บาทขึ้นไป', code: 'FREESHIP', discount: 'ค่าส่ง 0 บาท', status: 'Active', end_date: 'ไม่มีกำหนด' },
  { id: 3, name: 'Flash Sale (หมดเขต)', code: 'FLASH50', discount: '50 บาท', status: 'Expired', end_date: '10 ก.ค. 2026' },
];

export default function CouponsPage() {
  const [savedCoupon, setSavedCoupon] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  
  // 1. สร้าง State สำหรับรับข้อมูลโค้ดจากหน้า Admin
  const [coupons, setCoupons] = useState([]);

  // 2. ดึงข้อมูลจาก localStorage ทั้งคูปองที่เลือกและคูปองจาก Admin
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // ดึงโค้ดที่เลือกใช้ค้างไว้
    const saved = window.localStorage.getItem(COUPON_STORAGE_KEY) || '';
    setSavedCoupon(saved);

    // ดึงรายการโปรโมชั่นทั้งหมดจาก Admin
    const adminPromos = window.localStorage.getItem(ADMIN_PROMOTIONS_KEY);
    if (adminPromos) {
      try {
        setCoupons(JSON.parse(adminPromos));
      } catch (e) {
        console.error("Error parsing admin promotions:", e);
        setCoupons(defaultCoupons);
      }
    } else {
      // หากไม่มีข้อมูลในเครื่อง ให้ดึงค่า Default มาแสดงและเซฟลงเครื่องไปก่อน
      setCoupons(defaultCoupons);
      window.localStorage.setItem(ADMIN_PROMOTIONS_KEY, JSON.stringify(defaultCoupons));
    }
  }, []);

  const handleUseCoupon = (code) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(COUPON_STORAGE_KEY, code);
    setSavedCoupon(code);
    setStatusMessage(`ใช้โค้ด ${code} แล้ว สามารถดูได้ในหน้าตะกร้าและชำระเงิน`);
  };

  const handleCopyCode = async (code) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(code);
      setStatusMessage(`คัดลอกโค้ด ${code} แล้ว`);
    } catch {
      setStatusMessage(`ไม่สามารถคัดลอกโค้ด ${code} ได้`);
    }
  };

  // ฟังก์ชันช่วยเหลือสำหรับแสดง Badge สีของคูปอง
  const getBadgeStyle = (status) => {
    if (status === 'Active') return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    return 'bg-gray-200 text-gray-500';
  };

  return (
    <div className="min-h-screen bg-[#F2EEE7] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] p-4 md:p-8">
      
      <div className="page-container space-y-8 pb-20">
        <Navbar />
        
        {/* Header / Banner Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#e6e5e0] shadow-sm flex flex-col md:flex-row relative">
          <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#1A1A1A]">ศูนย์รวมโค้ดส่วนลด</h1>
            <p className="text-[#5a5852] text-sm md:text-base leading-relaxed mb-8 max-w-md">
              สัมผัสความคุ้มของการอ่าน ด้วยส่วนลดพิเศษที่เราคัดสรรมาเพื่อคุณโดยเฉพาะ
            </p>
            <Link href="/profile/coupons" className="inline-flex items-center bg-white border border-[#e6e5e0] hover:bg-[#F2EEE7] transition-colors rounded-xl px-5 py-3 shadow-sm w-max font-bold text-[#1A1A1A]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8861A" strokeWidth="2.5" className="mr-3"><rect x="3" y="8" width="18" height="12" rx="2"></rect><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-[#807d72] font-semibold">คูปองของฉัน</span>
                <span className="text-sm">12 ใบ</span>
              </div>
            </Link>
          </div>
          <div className="md:w-2/5 h-48 md:h-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 md:block hidden"></div>
            <img 
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800" 
              alt="Cozy reading room" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Ready-to-use coupons */}
        <div className="bg-white rounded-2xl p-6 border border-[#e6e5e0] shadow-sm">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#1A1A1A]">คูปองพร้อมใช้</h2>
              <p className="text-[#807d72] text-sm mt-1">เก็บโค้ดแล้วไปใช้ในหน้าตะกร้าหรือชำระเงินได้ทันที</p>
            </div>
            <div className="rounded-full bg-[#F2EEE7] px-4 py-2 text-sm text-[#1A1A1A] font-medium">
              โค้ดที่บันทึกไว้: <span className="font-bold text-indigo-600">{savedCoupon || 'ยังไม่มีโค้ด'}</span>
            </div>
          </div>

          {statusMessage && (
            <div className="mb-4 rounded-xl border border-[#e6e5e0] bg-[#FCFBF8] px-4 py-3 text-sm text-[#5a5852] animate-pulse">
              {statusMessage}
            </div>
          )}

          {/* ปรับปรุงโครงสร้าง Grid ให้ดึงข้อมูลไดนามิกจาก admin */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {coupons.map((coupon) => (
              <div key={coupon.code} className={`border border-[#e6e5e0] rounded-3xl p-5 bg-[#faf8f3] shadow-sm relative ${coupon.status !== 'Active' ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A1A]">{coupon.name}</h3>
                    <p className="text-[#807d72] text-xs mt-1">
                      ลดราคา: <span className="font-bold text-indigo-600">{coupon.discount}</span>
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${getBadgeStyle(coupon.status)}`}>
                    {coupon.status === 'Active' ? 'พร้อมใช้' : 'หมดเขต'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-[12px] text-[#5a5852]">
                  <span>CODE: <span className="font-bold text-[#1A1A1A]">{coupon.code}</span></span>
                  <span>หมดเขต: {coupon.end_date}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleUseCoupon(coupon.code)} 
                    disabled={coupon.status !== 'Active'}
                    className={`flex-1 min-w-[120px] font-bold py-2 rounded-full text-sm transition-colors ${
                      coupon.status === 'Active' 
                        ? 'bg-[#C8861A] hover:bg-[#a3741a] text-white cursor-pointer' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {coupon.status === 'Active' ? 'ใช้โค้ด' : 'หมดอายุ'}
                  </button>
                  <button 
                    onClick={() => handleCopyCode(coupon.code)} 
                    disabled={coupon.status !== 'Active'}
                    className="flex-1 min-w-[120px] border border-[#e6e5e0] bg-white text-[#1A1A1A] font-bold py-2 rounded-full text-sm hover:bg-[#fafafa] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    คัดลอกโค้ด
                  </button>
                </div>
              </div>
            ))}
            
            {coupons.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-400 text-sm">
                ขณะนี้ยังไม่มีคูปองที่สามารถใช้งานได้
              </div>
            )}
          </div>
        </div>

        {/* [เก็บดีไซน์เดิมของคุณไว้เหมือนเดิมทั้งหมดด้านล่าง] */}
        {/* Daily Check-in Section */}
        <div className="bg-white rounded-2xl p-6 border border-[#e6e5e0] shadow-sm">
          <div className="flex justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#C8861A" stroke="none"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"></path></svg>
                เช็คอินรายวันเพื่อรับเหรียญ
              </h2>
              <p className="text-xs text-[#807d72] mt-1">สะสมเหรียญเพื่อแลกรับส่วนลดและของรางวัลพิเศษ</p>
            </div>
            <button className="bg-[#C8861A] hover:bg-opacity-90 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-sm transition-all">
              เช็คอินวันนี้
            </button>
          </div>
          
          <div className="flex justify-between items-center relative px-2 md:px-10">
            <div className="absolute left-[10%] right-[10%] top-6 h-[2px] bg-[#e6e5e0] z-0"></div>
            {[
              { day: 'จันทร์', status: 'checked' },
              { day: 'อังคาร', status: 'checked' },
              { day: 'พุธ', status: 'pending', value: '+10' },
              { day: 'พฤหัสฯ', status: 'pending', value: '+10' },
              { day: 'ศุกร์', status: 'pending', value: '+15' },
              { day: 'เสาร์', status: 'pending', value: '+20' },
              { day: 'อาทิตย์', status: 'chest' },
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                {item.status === 'checked' && (
                  <div className="w-12 h-12 rounded-full bg-[#C8861A] flex items-center justify-center text-white shadow-md border-4 border-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                )}
                {item.status === 'pending' && (
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#807d72] font-bold text-sm border-[2px] border-[#e6e5e0]">
                    {item.value}
                  </div>
                )}
                {item.status === 'chest' && (
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center border-[2px] border-[#C8861A] text-[#C8861A] shadow-[0_0_15px_rgba(200,134,26,0.3)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6-2v2h-4V5h4zM4 9h16v3h-4.22c-.44-1.16-1.57-2-2.78-2h-2c-1.21 0-2.34.84-2.78 2H4V9zm16 10H4v-5h4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2h4v5z"></path></svg>
                  </div>
                )}
                <span className={`text-xs font-semibold ${item.status === 'checked' ? 'text-[#1A1A1A]' : (item.status === 'chest' ? 'text-[#C8861A]' : 'text-[#807d72]')}`}>{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Vouchers Section */}
        <div className="bg-[#3e2a14] rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl md:text-2xl font-extrabold text-[#F2EEE7]">Flash Vouchers</h2>
              <div className="flex items-center bg-[#291b0c] rounded-md px-3 py-1.5 gap-2 border border-white/10">
                <span className="text-[#F2EEE7] text-[10px] font-bold tracking-wider">ENDS IN</span>
                <div className="flex items-center gap-1">
                  <span className="bg-white/10 text-[#F2EEE7] font-mono text-sm px-1.5 rounded">02</span>
                  <span className="text-[#F2EEE7] text-xs">:</span>
                  <span className="bg-white/10 text-[#F2EEE7] font-mono text-sm px-1.5 rounded">45</span>
                  <span className="text-[#F2EEE7] text-xs">:</span>
                  <span className="bg-white/10 text-[#F2EEE7] font-mono text-sm px-1.5 rounded">12</span>
                </div>
              </div>
            </div>
            <Link href="/coupons" className="text-white/60 hover:text-white text-xs font-bold transition-colors">ดูทั้งหมด</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Flash Card 1 */}
            <div className="bg-white rounded-xl flex overflow-hidden shadow-sm h-32 relative">
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#3e2a14] rounded-full transform -translate-y-1/2 z-10"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#3e2a14] rounded-full transform -translate-y-1/2 z-10"></div>
              
              <div className="w-1/3 bg-[#C8861A] flex flex-col items-center justify-center text-white border-r border-dashed border-white/40">
                <div className="flex items-start">
                  <span className="text-2xl font-bold mt-1 mr-0.5">฿</span>
                  <span className="text-5xl font-extrabold tracking-tighter">500</span>
                </div>
                <span className="text-[11px] font-bold tracking-widest uppercase">OFF</span>
              </div>
              
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[#1A1A1A] text-sm">ส่วนลดพิเศษประจำวัน</h3>
                  <p className="text-[10px] text-[#807d72] mt-0.5">ขั้นต่ำ ฿2,500 | เฉพาะหมวดวรรณกรรม</p>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-[#807d72] mb-1 font-semibold">
                    <span>เหลืออีก 14 สิทธิ์</span>
                    <span>72% used</span>
                  </div>
                  <div className="w-full bg-[#F2EEE7] h-1.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-[#C8861A] h-full rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="text-[10px] text-[#807d72] hover:text-[#1A1A1A] underline decoration-dashed underline-offset-2">เงื่อนไข</button>
                    <button className="bg-[#3e2a14] text-white text-[11px] font-bold px-4 py-1.5 rounded-full hover:bg-black transition-colors">เก็บโค้ด</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Flash Card 2 */}
            <div className="bg-white rounded-xl flex overflow-hidden shadow-sm h-32 relative">
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#3e2a14] rounded-full transform -translate-y-1/2 z-10"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#3e2a14] rounded-full transform -translate-y-1/2 z-10"></div>
              
              <div className="w-1/3 bg-[#C8861A] flex flex-col items-center justify-center text-white border-r border-dashed border-white/40">
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tighter">20</span>
                  <span className="text-2xl font-bold ml-0.5">%</span>
                </div>
                <span className="text-[11px] font-bold tracking-widest uppercase">OFF</span>
              </div>
              
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[#1A1A1A] text-sm">Mid-Day Surprise</h3>
                  <p className="text-[10px] text-[#807d72] mt-0.5">ลดสูงสุด ฿200 | ไม่มีขั้นต่ำ</p>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-[#807d72] mb-1 font-semibold">
                    <span>เหลืออีก 9 สิทธิ์</span>
                    <span>80% used</span>
                  </div>
                  <div className="w-full bg-[#F2EEE7] h-1.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-[#C8861A] h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="text-[10px] text-[#807d72] hover:text-[#1A1A1A] underline decoration-dashed underline-offset-2">เงื่อนไข</button>
                    <button className="bg-[#3e2a14] text-white text-[11px] font-bold px-4 py-1.5 rounded-full hover:bg-black transition-colors">เก็บโค้ด</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Vouchers */}
        <div>
          <div className="flex justify-between items-end mb-4 px-1">
            <h2 className="text-lg font-extrabold text-[#1A1A1A]">ส่วนลดร้านค้า</h2>
            <Link href="/coupons" className="text-[#C8861A] text-xs font-bold hover:underline">ดูทั้งหมด</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#e6e5e0] rounded-xl flex flex-col relative overflow-hidden group">
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#F2EEE7] rounded-full transform -translate-y-1/2 z-10 border-r border-[#e6e5e0]"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#F2EEE7] rounded-full transform -translate-y-1/2 z-10 border-l border-[#e6e5e0]"></div>
              <div className="p-4 flex gap-3 border-b border-dashed border-[#e6e5e0]">
                <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 text-[#C8861A]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A1A] text-sm">สมาชิกใหม่ลด 10%</h3>
                  <p className="text-[10px] text-[#807d72] mt-0.5">ไม่มีขั้นต่ำ</p>
                  <span className="inline-block mt-2 text-[8px] font-bold bg-orange-50 text-[#C8861A] px-1.5 py-0.5 rounded border border-orange-100">NEW MEMBER</span>
                </div>
              </div>
              <div className="p-3 bg-[#faf9f7] flex justify-between items-center text-[10px]">
                <span className="text-[#807d72]">หมดเขต 30 ก.ย. 67</span>
                <button className="text-[#C8861A] font-bold px-3 py-1 bg-white border border-[#C8861A]/20 rounded-full hover:bg-[#C8861A] hover:text-white transition-colors">เก็บโค้ด</button>
              </div>
            </div>

            <div className="bg-white border border-[#e6e5e0] rounded-xl flex flex-col relative overflow-hidden group">
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#F2EEE7] rounded-full transform -translate-y-1/2 z-10 border-r border-[#e6e5e0]"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#F2EEE7] rounded-full transform -translate-y-1/2 z-10 border-l border-[#e6e5e0]"></div>
              <div className="p-4 flex gap-3 border-b border-dashed border-[#e6e5e0]">
                <div className="w-12 h-12 rounded-lg bg-[#F2EEE7] border border-[#e6e5e0] flex items-center justify-center flex-shrink-0 text-[#1A1A1A]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A1A] text-sm">ลด ฿50 เมื่อช้อป ฿500</h3>
                  <p className="text-[10px] text-[#807d72] mt-0.5">สำหรับหมวดจิตวิทยา</p>
                  <span className="inline-block mt-2 text-[8px] font-bold bg-[#F2EEE7] text-[#5a5852] px-1.5 py-0.5 rounded border border-[#e6e5e0]">LIMITED</span>
                </div>
              </div>
              <div className="p-3 bg-[#faf9f7] flex justify-between items-center text-[10px]">
                <span className="text-[#807d72]">หมดเขต 15 ต.ค. 67</span>
                <button className="text-[#C8861A] font-bold px-3 py-1 bg-white border border-[#C8861A]/20 rounded-full hover:bg-[#C8861A] hover:text-white transition-colors">เก็บโค้ด</button>
              </div>
            </div>

            <div className="bg-white border border-[#e6e5e0] rounded-xl flex flex-col relative overflow-hidden group">
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#F2EEE7] rounded-full transform -translate-y-1/2 z-10 border-r border-[#e6e5e0]"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#F2EEE7] rounded-full transform -translate-y-1/2 z-10 border-l border-[#e6e5e0]"></div>
              <div className="p-4 flex gap-3 border-b border-dashed border-[#e6e5e0]">
                <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 text-[#C8861A]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A1A] text-sm">ซื้อ 3 เล่ม ลด ฿100</h3>
                  <p className="text-[10px] text-[#807d72] mt-0.5">เฉพาะสำนักพิมพ์ที่ร่วมรายการ</p>
                  <span className="inline-block mt-2 text-[8px] font-bold bg-orange-50 text-[#C8861A] px-1.5 py-0.5 rounded border border-orange-100">BUNDLE</span>
                </div>
              </div>
              <div className="p-3 bg-[#faf9f7] flex justify-between items-center text-[10px]">
                <span className="text-[#807d72]">หมดเขต 15 ต.ค. 67</span>
                <button className="text-[#C8861A] font-bold px-3 py-1 bg-white border border-[#C8861A]/20 rounded-full hover:bg-[#C8861A] hover:text-white transition-colors">เก็บโค้ด</button>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Vouchers */}
        <div>
          <div className="flex justify-between items-end mb-4 px-1">
            <h2 className="text-lg font-extrabold text-[#1A1A1A]">ส่วนลดค่าจัดส่ง</h2>
            <Link href="/coupons" className="text-[#C8861A] text-xs font-bold hover:underline">ดูทั้งหมด</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-orange-50/50 border border-[#C8861A]/30 rounded-xl p-4 flex flex-col justify-between relative shadow-sm h-32">
              <div>
                <span className="inline-block text-[8px] font-bold bg-[#C8861A] text-white px-1.5 py-0.5 rounded mb-2">FREE SHIPPING</span>
                <h3 className="font-bold text-[#1A1A1A] text-sm">ส่งฟรีไม่มีขั้นต่ำ</h3>
                <p className="text-[10px] text-[#807d72] mt-1">ใช้ได้กับการส่งพัสดุธรรมดา</p>
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-[10px] text-[#807d72]">เหลืออีก 2 วันเท่านั้น</span>
                <button className="bg-[#C8861A] text-white text-[10px] font-bold px-4 py-1.5 rounded-full hover:bg-opacity-90 transition-colors shadow-sm">เก็บโค้ด</button>
              </div>
            </div>

            <div className="bg-orange-50/50 border border-[#C8861A]/30 rounded-xl p-4 flex flex-col justify-between relative shadow-sm h-32">
              <div>
                <span className="inline-block text-[8px] font-bold bg-[#C8861A] text-white px-1.5 py-0.5 rounded mb-2">FREE SHIPPING</span>
                <h3 className="font-bold text-[#1A1A1A] text-sm">ส่งฟรี เมื่อครบ ฿300</h3>
                <p className="text-[10px] text-[#807d72] mt-1">สำหรับการขนส่งมาตรฐาน</p>
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-[10px] text-[#807d72]">ใช้ได้ไม่จำกัด</span>
                <button className="bg-[#C8861A] text-white text-[10px] font-bold px-4 py-1.5 rounded-full hover:bg-opacity-90 transition-colors shadow-sm">เก็บโค้ด</button>
              </div>
            </div>

            <div className="bg-[#e6e5e0]/30 border border-[#e6e5e0] border-dashed rounded-xl p-4 flex flex-col items-center justify-center relative h-32 hover:bg-[#e6e5e0]/50 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#e6e5e0] mb-2 group-hover:scale-110 transition-transform">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#807d72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <span className="text-xs font-semibold text-[#5a5852]">ดูส่วนลดขนส่งอื่นๆ</span>
            </div>
          </div>
        </div>

        {/* Partner Privileges */}
        <div>
          <div className="flex justify-between items-end mb-4 px-1">
            <h2 className="text-lg font-extrabold text-[#1A1A1A]">สิทธิพิเศษพาร์ทเนอร์</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-[#e6e5e0] rounded-xl flex overflow-hidden shadow-sm h-24">
              <div className="w-1/3 bg-[#0f4a9b] flex flex-col items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                <span className="text-[10px] font-extrabold tracking-widest mt-1">VISA</span>
                <span className="text-[8px] opacity-80">Platinum</span>
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[#1A1A1A] text-sm leading-tight">ลด ฿200 ทุกยอดใช้จ่าย</h3>
                  <p className="text-[9px] text-[#807d72] mt-1 leading-tight line-clamp-2">เมื่อมียอดสั่งซื้อขั้นต่ำ ฿1,000 ขึ้นไปผ่านบัตรเครดิตที่ร่วมรายการ</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[9px] text-[#807d72]">CODE : VISABOOK24</span>
                  <button className="text-[10px] font-bold text-[#C8861A] hover:underline">รับสิทธิ์เลย</button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e6e5e0] rounded-xl flex overflow-hidden shadow-sm h-24">
              <div className="w-1/3 bg-[#f5f6f2] flex flex-col items-center justify-center border-r border-[#e6e5e0]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#e6e5e0] mb-1 shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                </div>
                <span className="text-[10px] font-extrabold tracking-widest text-[#1A1A1A]">KBANK</span>
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[#1A1A1A] text-sm leading-tight">รับ K Point 5 เท่า</h3>
                  <p className="text-[9px] text-[#807d72] mt-1 leading-tight line-clamp-2">ทุกวันพุธ เมื่อซื้อหนังสือในหมวดพัฒนาตนเองผ่าน K PLUS</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[9px] text-[#807d72]">Exclusive Reward</span>
                  <button className="text-[10px] font-bold text-[#C8861A] hover:underline">รับสิทธิ์เลย</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
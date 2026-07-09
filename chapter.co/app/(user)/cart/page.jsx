"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { books } from '../../data/books';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { ...books[0], qty: 1 },
    { ...books[8], qty: 2 }
  ]);

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#26251e] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#f54e00] selection:text-white p-4 md:p-8 flex flex-col">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <Navbar />

        <div className="mt-8 mb-4">
          <h1 className="text-3xl font-black text-[#26251e] flex items-center">
            ตะกร้าสินค้า
            <span className="ml-4 text-lg font-bold text-[#a09c92] bg-white px-4 py-1 rounded-full border border-[#e6e5e0]">{cartItems.length} รายการ</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Cart Items */}
          <div className="flex-[2]">
            {cartItems.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center shadow-sm">
                <div className="w-24 h-24 bg-[#f7f7f4] rounded-full flex items-center justify-center mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d0cdc5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[#26251e] mb-2">ตะกร้าของคุณว่างเปล่า</h3>
                <p className="text-[#a09c92] mb-8">ลองหาหนังสือที่น่าสนใจแล้วเพิ่มลงตะกร้าเลย</p>
                <Link href="/shop" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">ไปเลือกซื้อหนังสือ</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-24 aspect-[2/3] rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500 bg-orange-50 px-2 py-1 rounded-md">{item.category}</span>
                          <h3 className="text-lg font-bold text-[#26251e] mt-1">{item.title}</h3>
                          <p className="text-sm font-medium text-[#a09c92]">{item.author}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-2 text-[#d0cdc5] hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3 bg-[#f7f7f4] rounded-full p-1 border border-[#e6e5e0]">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5a5852] hover:text-orange-500 shadow-sm transition-colors">-</button>
                          <span className="font-bold w-4 text-center text-[#26251e]">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5a5852] hover:text-orange-500 shadow-sm transition-colors">+</button>
                        </div>
                        <div className="text-xl font-black text-[#f54e00]">${(item.price * item.qty).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {cartItems.length > 0 && (
            <div className="flex-1">
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl sticky top-8">
                <h3 className="text-xl font-bold text-[#26251e] mb-6">สรุปคำสั่งซื้อ</h3>
                
                <div className="space-y-4 text-[15px] font-medium text-[#5a5852] mb-6">
                  <div className="flex justify-between">
                    <span>ราคาสินค้า ({cartItems.reduce((a,b)=>a+b.qty,0)} ชิ้น)</span>
                    <span className="font-bold text-[#26251e]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ค่าจัดส่ง</span>
                    <span className="font-bold text-[#26251e]">{shipping === 0 ? 'ฟรี' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="border-t border-[#e6e5e0] pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-[#a09c92] uppercase tracking-wider">ยอดสุทธิ</span>
                    <span className="text-3xl font-black text-[#f54e00]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-orange-500/40 transition-all hover:-translate-y-1">
                  ดำเนินการสั่งซื้อ
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

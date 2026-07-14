"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { readCartItems, writeCartItems } from '@/utils/cartStorage';

export default function CartPage() {
  const [cartItems, setCartItems] = useState(() => readCartItems());
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    writeCartItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const syncCart = () => {
      const nextItems = readCartItems();
      setCartItems((prevItems) => {
        const prevSerialized = JSON.stringify(prevItems);
        const nextSerialized = JSON.stringify(nextItems);
        return prevSerialized === nextSerialized ? prevItems : nextItems;
      });
    };
    window.addEventListener('chapter-cart-updated', syncCart);
    window.addEventListener('storage', syncCart);
    return () => {
      window.removeEventListener('chapter-cart-updated', syncCart);
      window.removeEventListener('storage', syncCart);
    };
  }, []);

  useEffect(() => {
    const loadSummary = async () => {
      if (!cartItems.length) {
        setSummary(null);
        return;
      }

      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cartItems.map(({ id, title, price, qty }) => ({ id, title, price, quantity: qty }))
          })
        });

        const data = await response.json();
        if (data?.success) {
          setSummary(data.summary);
        }
      } catch {
        setSummary(null);
      }
    };

    loadSummary();
  }, [cartItems]);

  const updateQty = (id, newQty) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (!item) return;
    const stock = Number(item.stock || 0);
    const safeQty = stock > 0 ? Math.min(newQty, stock) : newQty;
    if (safeQty < 1) return;
    setCartItems((prev) => prev.map((cartItem) => (cartItem.id === id ? { ...cartItem, qty: safeQty } : cartItem)));
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = summary?.subtotal ?? cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = summary?.shippingFee ?? (subtotal > 50 ? 0 : 5);
  const total = summary?.total ?? subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F2EEE7] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#C8861A] selection:text-white p-4 md:p-8 flex flex-col">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-tertiary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <Navbar />

        <div className="mt-8 mb-4">
          <h1 className="text-3xl font-black text-[#1A1A1A] flex items-center">
            ตะกร้าสินค้า
            <span className="ml-4 text-lg font-bold text-[#a09c92] bg-white px-4 py-1 rounded-full border border-[#e6e5e0]">{cartItems.length} รายการ</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Cart Items */}
          <div className="flex-[2]">
            {cartItems.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center shadow-sm">
                <div className="w-24 h-24 bg-[#F2EEE7] rounded-full flex items-center justify-center mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d0cdc5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">ตะกร้าของคุณว่างเปล่า</h3>
                <p className="text-[#a09c92] mb-8">ลองหาหนังสือที่น่าสนใจแล้วเพิ่มลงตะกร้าเลย</p>
                <Link href="/shop" className="bg-primary hover:bg-primary text-white font-bold py-3 px-8 rounded-full transition-colors">ไปเลือกซื้อหนังสือ</Link>
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
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-orange-50 px-2 py-1 rounded-md">{item.category}</span>
                          <h3 className="text-lg font-bold text-[#1A1A1A] mt-1">{item.title}</h3>
                          <p className="text-sm font-medium text-[#a09c92]">{item.author}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-2 text-[#d0cdc5] hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3 bg-[#F2EEE7] rounded-full p-1 border border-[#e6e5e0]">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1A1A1A] hover:text-primary shadow-sm transition-colors">-</button>
                          <span className="font-bold w-4 text-center text-[#1A1A1A]">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1A1A1A] hover:text-primary shadow-sm transition-colors">+</button>
                        </div>
                        <div className="text-xl font-black text-[#C8861A]">${(item.price * item.qty).toFixed(2)}</div>
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
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">สรุปคำสั่งซื้อ</h3>

                <div className="space-y-4 text-[15px] font-medium text-[#1A1A1A] mb-6">
                  <div className="flex justify-between">
                    <span>ราคาสินค้า ({cartItems.reduce((a,b)=>a+b.qty,0)} ชิ้น)</span>
                    <span className="font-bold text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                  </div>
                  {summary?.discountAmount > 0 && (
                    <div className="flex justify-between text-[15px] font-medium text-[#1A1A1A]">
                      <span>ส่วนลด</span>
                      <span className="font-bold text-green-600">-${summary.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>ค่าจัดส่ง</span>
                    <span className="font-bold text-[#1A1A1A]">{shipping === 0 ? 'ฟรี' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="border-t border-[#e6e5e0] pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-[#a09c92] uppercase tracking-wider">ยอดสุทธิ</span>
                    <span className="text-3xl font-black text-[#C8861A]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full flex items-center justify-center bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-primary/40 transition-all hover:-translate-y-1">
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

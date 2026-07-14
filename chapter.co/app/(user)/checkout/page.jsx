"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { books } from '../../data/books';

const CART_STORAGE_KEY = 'chapter-cart-items';
const COUPON_STORAGE_KEY = 'chapter-cart-coupon';
const fallbackItems = [
  { ...books[0], qty: 1 },
  { ...books[8], qty: 2 }
];

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('promptpay');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [summary, setSummary] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const itemsToRender = cartItems.length ? cartItems : fallbackItems;

  const subtotal = summary?.subtotal ?? itemsToRender.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discountAmount = summary?.discountAmount ?? 0;
  const shipping = summary?.shippingFee ?? (subtotal > 50 ? 0 : 5);
  const total = summary?.total ?? subtotal - discountAmount + shipping;
  // Address state (editable)
  const [addrName, setAddrName] = useState('สมชาย ใจดี');
  const [addrPhone, setAddrPhone] = useState('081-234-5678');
  const [addrProvince, setAddrProvince] = useState('กรุงเทพมหานคร 10900');
  const [addrStreet, setAddrStreet] = useState('123/45 หมู่บ้านสวนสวย ซอยวิภาวดี 20 ถนนวิภาวดีรังสิต แขวงจอมพล เขตจตุจักร');
  const [addrLabel, setAddrLabel] = useState('Home');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = window.localStorage.getItem('chapter-shipping-address');
      if (saved) {
        const a = JSON.parse(saved);
        setAddrName(a.name || addrName);
        setAddrPhone(a.phone || addrPhone);
        setAddrProvince(a.province || addrProvince);
        setAddrStreet(a.street || addrStreet);
        setAddrLabel(a.label || addrLabel);
      }
    } catch {}
  }, []);

  const handlePlaceOrder = () => {
    applyCoupon();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      const savedCoupon = (window.localStorage.getItem(COUPON_STORAGE_KEY) || '').trim().toUpperCase();
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems(fallbackItems);
        try { window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(fallbackItems)); } catch {}
      }
      setCouponCode(savedCoupon);
    } catch {
      setCartItems(fallbackItems);
      setCouponCode('');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const normalizedCoupon = couponCode.trim().toUpperCase();
      window.localStorage.setItem(COUPON_STORAGE_KEY, normalizedCoupon);
    }
  }, [couponCode]);

  useEffect(() => {
    const loadSummary = async () => {
      const itemsToUse = cartItems.length ? cartItems : fallbackItems;
      if (!itemsToUse.length) {
        setSummary(null);
        return;
      }

      const normalizedCoupon = couponCode.trim().toUpperCase();
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: itemsToUse.map(({ id, title, price, qty }) => ({ id, title, price, quantity: qty })),
            couponCodes: normalizedCoupon ? [normalizedCoupon] : [],
            shippingMethod: selectedShipping
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
  }, [cartItems, couponCode, selectedShipping]);

  const applyCoupon = async () => {
    const itemsToUse = itemsToRender;
    if (!itemsToUse.length) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Fetch authoritative summary first so UI matches server-side calculation
      const summaryResp = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsToUse.map(({ id, title, price, qty }) => ({ id, title, price, quantity: qty })),
          couponCodes: couponCode ? [couponCode] : [],
          shippingMethod: selectedShipping
        })
      });
      const summaryData = await summaryResp.json();
      if (summaryData?.success) {
        setSummary(summaryData.summary);
      }

      // Now create order using same inputs (server will recalc summary)
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsToUse.map(({ id, title, price, qty }) => ({ id, title, price, quantity: qty })),
          couponCodes: couponCode ? [couponCode] : [],
          customer: {
            customerName: addrName,
            email: '',
            address: `${addrStreet} ${addrProvince}`,
            phone: addrPhone,
            label: addrLabel
          },
          shippingMethod: selectedShipping,
          paymentMethod: selectedPayment
        })
      });

      const data = await response.json();
      if (data?.success) {
        if (typeof window !== 'undefined') {
          const existingOrders = JSON.parse(window.localStorage.getItem('chapter-admin-orders') || '[]');
          const normalizedOrder = {
            id: data.order.orderId,
            customer: data.order.customer?.name || addrName,
            date: new Date().toLocaleDateString('th-TH'),
            amount: data.order.summary?.total || total,
            status: 'รอชำระเงิน',
            address: data.order.customer?.address || `${addrStreet} ${addrProvince}`,
            shippingMethod: selectedShipping === 'express' ? 'Express Delivery' : 'Standard Delivery',
            items: data.order.items?.map((item) => ({ name: item.title, price: item.price, qty: item.quantity })) || [],
            subtotal: data.order.summary?.subtotal || subtotal,
            shippingFee: data.order.summary?.shippingFee || shipping,
            discount: data.order.summary?.discountAmount || discountAmount,
            promo: couponCode || '-',
            paymentMethod: selectedPayment,
            paymentTime: '-'
          };

          const nextOrders = [normalizedOrder, ...existingOrders.filter((order) => order.id !== normalizedOrder.id)];
          window.localStorage.setItem('chapter-admin-orders', JSON.stringify(nextOrders));
          window.localStorage.setItem('chapter-last-order', JSON.stringify(data.order));
          window.localStorage.removeItem(CART_STORAGE_KEY);
          window.dispatchEvent(new Event('chapter-orders-updated'));
        }
        router.push('/success');
      } else {
        setSubmitError(data?.error || 'ไม่สามารถสร้างคำสั่งซื้อได้');
      }
    } catch (err) {
      setSubmitError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#FCFBFA] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#C8861A] selection:text-white pb-16">
      
      {/* Decorative Blobs (optional, keeping minimal for clean look) */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 md:px-8">
        <Navbar />

        {/* Header & Stepper */}
        <div className="mt-8 mb-8">
          <h1 className="text-2xl font-black text-[#1A1A1A] mb-6">ชำระเงิน</h1>
          <div className="flex items-center space-x-4 text-[13px] font-bold text-[#5a5852]">
            <span className="flex items-center text-[#1A1A1A]">1 &nbsp;ที่อยู่</span>
            <div className="w-10 h-[1px] bg-[#e6e5e0]"></div>
            <span className="flex items-center text-[#1A1A1A]">2 &nbsp;การจัดส่ง</span>
            <div className="w-10 h-[1px] bg-[#e6e5e0]"></div>
            <span className="flex items-center text-[#1A1A1A]">3 &nbsp;การชำระเงิน</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column (Forms) */}
          <div className="flex-[1.6] space-y-6">
            
            {/* 1. Shipping Address */}
            <div className="bg-white border border-[#e6e5e0] rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-[16px] font-bold text-[#1A1A1A]">ที่อยู่สำหรับการจัดส่ง</h2>
                <button onClick={() => setIsAddressModalOpen(true)} className="text-[13px] font-bold text-[#C8861A] hover:underline">เพิ่มที่อยู่ใหม่</button>
              </div>
              
              <div className="border border-[#C8861A] bg-[#FCFBF8] rounded-xl p-5 relative">
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#C8861A] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                
                <h3 className="font-bold text-[15px] mb-3">{addrName}</h3>
                <p className="text-[#5a5852] font-medium text-[14px] mb-3">{addrPhone}</p>
                <p className="text-[#5a5852] font-medium text-[14px] leading-relaxed max-w-[80%] mb-4">
                  {addrStreet} {addrProvince}
                </p>
                <button onClick={() => setIsAddressModalOpen(true)} className="px-5 py-1.5 border border-[#d0cdc5] rounded-full text-[13px] font-bold text-[#5a5852] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors bg-white">
                  แก้ไข
                </button>
              </div>
            </div>

            {/* 2. Shipping Method */}
            <div className="bg-white border border-[#e6e5e0] rounded-2xl p-6 shadow-sm">
              <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-5">วิธีการจัดส่ง</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Standard */}
                <div 
                  onClick={() => setSelectedShipping('standard')}
                  className={`border rounded-xl p-5 cursor-pointer transition-colors ${selectedShipping === 'standard' ? 'border-[#C8861A] bg-[#FCFBF8]' : 'border-[#e6e5e0] bg-white hover:border-[#d0cdc5]'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-[14px] text-[#1A1A1A]">Standard Delivery</h3>
                      <p className="text-[12px] text-[#807d72] mt-1">รับสินค้าภายใน 3-5 วันทำการ</p>
                    </div>
                    <span className="font-bold text-[14px] text-[#C8861A]">ฟรี</span>
                  </div>
                </div>
                
                {/* Express */}
                <div 
                  onClick={() => setSelectedShipping('express')}
                  className={`border rounded-xl p-5 cursor-pointer transition-colors ${selectedShipping === 'express' ? 'border-[#C8861A] bg-[#FCFBF8]' : 'border-[#e6e5e0] bg-white hover:border-[#d0cdc5]'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-[14px] text-[#1A1A1A]">Express Delivery</h3>
                      <p className="text-[12px] text-[#807d72] mt-1">รับสินค้าภายใน 1-2 วันทำการ</p>
                    </div>
                    <span className="font-bold text-[14px] text-[#1A1A1A]">฿50</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white border border-[#e6e5e0] rounded-2xl p-6 shadow-sm">
              <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-5">วิธีการชำระเงิน</h2>
              
              <div className="space-y-3">
                {/* Credit Card */}
                <div className={`border rounded-xl transition-colors ${selectedPayment === 'credit' ? 'border-[#C8861A] bg-[#FCFBF8]' : 'border-[#e6e5e0] bg-white hover:border-[#d0cdc5]'}`}>
                  <label className="flex items-center p-4 cursor-pointer">
                    <input type="radio" name="payment" className="hidden" checked={selectedPayment === 'credit'} onChange={() => setSelectedPayment('credit')} />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${selectedPayment === 'credit' ? 'border-[#C8861A]' : 'border-[#d0cdc5]'}`}>
                      {selectedPayment === 'credit' && <div className="w-2 h-2 rounded-full bg-[#C8861A]"></div>}
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#5a5852]"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                        <span className="font-bold text-[14px] text-[#1A1A1A]">บัตรเครดิต / บัตรเดบิต</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-[#e6e5e0] rounded-sm"></div>
                        <div className="w-8 h-5 bg-[#e6e5e0] rounded-sm"></div>
                      </div>
                    </div>
                  </label>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${selectedPayment === 'credit' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-11 pb-4">
                        <button onClick={() => setIsCardModalOpen(true)} className="px-4 py-2 border border-dashed border-[#C8861A] text-[#C8861A] rounded-lg text-[13px] font-bold hover:bg-orange-50 transition-colors flex items-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          เพิ่มบัตร
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Banking */}
                <div className={`border rounded-xl transition-all duration-300 ${selectedPayment === 'mobile_banking' ? 'border-[#C8861A] bg-[#FCFBF8]' : 'border-[#e6e5e0] bg-white hover:border-[#d0cdc5]'}`}>
                  <label className="flex items-center p-4 cursor-pointer">
                    <input type="radio" name="payment" className="hidden" checked={selectedPayment === 'mobile_banking'} onChange={() => setSelectedPayment('mobile_banking')} />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${selectedPayment === 'mobile_banking' ? 'border-[#C8861A]' : 'border-[#d0cdc5]'}`}>
                      {selectedPayment === 'mobile_banking' && <div className="w-2 h-2 rounded-full bg-[#C8861A] animate-in zoom-in duration-200"></div>}
                    </div>
                    <div className="flex items-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#1f87df]"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                      <span className="font-bold text-[14px] text-[#1A1A1A]">Mobile Banking</span>
                    </div>
                  </label>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${selectedPayment === 'mobile_banking' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-11 pb-4 grid grid-cols-4 gap-2">
                        <button onClick={() => setSelectedBank('kbank')} className={`flex flex-col items-center p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${selectedBank === 'kbank' ? 'border-[#138f2d] bg-[#138f2d]/10' : 'border-[#e6e5e0] bg-white hover:border-[#d0cdc5]'}`}>
                          <div className="w-6 h-6 rounded-full bg-[#138f2d] mb-1"></div>
                          <span className="text-[10px] font-bold text-[#1A1A1A]">KBank</span>
                        </button>
                        <button onClick={() => setSelectedBank('scb')} className={`flex flex-col items-center p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${selectedBank === 'scb' ? 'border-[#4e2e7f] bg-[#4e2e7f]/10' : 'border-[#e6e5e0] bg-white hover:border-[#d0cdc5]'}`}>
                          <div className="w-6 h-6 rounded-full bg-[#4e2e7f] mb-1"></div>
                          <span className="text-[10px] font-bold text-[#1A1A1A]">SCB</span>
                        </button>
                        <button onClick={() => setSelectedBank('bbl')} className={`flex flex-col items-center p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${selectedBank === 'bbl' ? 'border-[#1e4598] bg-[#1e4598]/10' : 'border-[#e6e5e0] bg-white hover:border-[#d0cdc5]'}`}>
                          <div className="w-6 h-6 rounded-full bg-[#1e4598] mb-1"></div>
                          <span className="text-[10px] font-bold text-[#1A1A1A]">BBL</span>
                        </button>
                        <button onClick={() => setSelectedBank('ktb')} className={`flex flex-col items-center p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${selectedBank === 'ktb' ? 'border-[#1ba5e1] bg-[#1ba5e1]/10' : 'border-[#e6e5e0] bg-white hover:border-[#d0cdc5]'}`}>
                          <div className="w-6 h-6 rounded-full bg-[#1ba5e1] mb-1"></div>
                          <span className="text-[10px] font-bold text-[#1A1A1A]">KTB</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PromptPay */}
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${selectedPayment === 'promptpay' ? 'border-[#C8861A] bg-[#FCFBF8]' : 'border-[#e6e5e0] bg-white hover:border-[#d0cdc5]'}`}>
                  <input type="radio" name="payment" className="hidden" checked={selectedPayment === 'promptpay'} onChange={() => setSelectedPayment('promptpay')} />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${selectedPayment === 'promptpay' ? 'border-[#C8861A]' : 'border-[#d0cdc5]'}`}>
                    {selectedPayment === 'promptpay' && <div className="w-2 h-2 rounded-full bg-[#C8861A]"></div>}
                  </div>
                  <div className="flex items-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#113566]"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="3"></rect><rect x="14" y="7" width="3" height="3"></rect><rect x="7" y="14" width="3" height="3"></rect><rect x="14" y="14" width="3" height="3"></rect></svg>
                    <span className="font-bold text-[14px] text-[#1A1A1A]">PromptPay</span>
                  </div>
                </label>

                {/* Rabbit LINE Pay */}
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${selectedPayment === 'linepay' ? 'border-[#C8861A] bg-[#FCFBF8]' : 'border-[#e6e5e0] bg-white hover:border-[#d0cdc5]'}`}>
                  <input type="radio" name="payment" className="hidden" checked={selectedPayment === 'linepay'} onChange={() => setSelectedPayment('linepay')} />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${selectedPayment === 'linepay' ? 'border-[#C8861A]' : 'border-[#d0cdc5]'}`}>
                    {selectedPayment === 'linepay' && <div className="w-2 h-2 rounded-full bg-[#C8861A]"></div>}
                  </div>
                  <div className="flex items-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#1fdf64]"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <span className="font-bold text-[14px] text-[#1A1A1A]">Rabbit LINE Pay</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column (Summary) */}
          <div className="flex-1">
            <div className="bg-white border border-[#e6e5e0] rounded-2xl p-6 shadow-sm sticky top-8">
              <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-5">สรุปรายการสั่งซื้อ</h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {itemsToRender.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-[#2d3b4e] rounded-md flex-shrink-0 relative overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[13px] text-[#1A1A1A] leading-tight mb-1">{item.title}</h4>
                      <p className="text-[12px] text-[#807d72] mb-1">จำนวน: {item.qty}</p>
                      <p className="font-bold text-[14px] text-[#C8861A]">฿{(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo code */}
              <div className="grid gap-3 mb-6 border-b border-[#e6e5e0] pb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ใส่รหัสโปรโมชั่น"
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                    className="flex-1 border border-[#e6e5e0] rounded-full px-4 py-2 text-[13px] focus:outline-none focus:border-[#C8861A]"
                  />
                </div>
                <button onClick={applyCoupon} className="w-full bg-[#5a5852] hover:bg-[#1A1A1A] text-white font-bold px-6 py-2 rounded-full text-[13px] transition-colors">ใช้</button>
              </div>

              {/* Subtotals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-[#5a5852] font-medium">ยอดรวมสินค้า</span>
                  <span className="font-bold text-[#5a5852]">฿{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-[#5a5852] font-medium">ส่วนลด</span>
                    <span className="font-bold text-green-600">-฿{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-[#5a5852] font-medium">ค่าจัดส่ง</span>
                  <span className="font-bold text-[#C8861A]">{shipping === 0 ? 'ฟรี' : `฿${shipping.toFixed(2)}`}</span>
                </div>
              </div>

                {summary?.coupon && (
                <div className="mb-4 rounded-xl border border-[#e6e5e0] bg-[#FCFBF8] px-3 py-2 text-[12px] text-[#5a5852]">
                  <span className="font-bold">Coupon status:</span>
                  <p className={`mt-2 ${summary.coupon.isValid ? 'text-[#1A1A1A]' : 'text-red-500'}`}>
                    {summary.coupon.code ? `${summary.coupon.code}: ` : ''}
                    {summary.coupon.isValid ? 'ใช้ได้' : 'ไม่ถูกต้อง'}
                  </p>
                </div>
              )}

              {/* Grand Total */}
              <div className="flex justify-between items-end mb-6">
                <span className="text-[16px] font-black text-[#1A1A1A]">ยอดชำระรวม</span>
                <span className="text-[26px] font-black text-[#C8861A] leading-none">฿{total.toFixed(2)}</span>
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="block w-full text-center bg-[#C8861A] hover:bg-[#b07415] text-white font-bold py-3.5 rounded-full text-[15px] transition-colors mb-3 shadow-[0_4px_14px_rgba(200,134,26,0.25)] disabled:opacity-70"
              >
                {isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยันการสั่งซื้อ'}
              </button>

              {submitError && <p className="text-center text-sm text-red-500 mb-3">{submitError}</p>}
              
              <p className="text-center text-[11px] text-[#a09c92] font-medium">
                โดยการคลิกยืนยัน คุณยอมรับ เงื่อนไขการใช้บริการ
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">เพิ่มที่อยู่ใหม่</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <input type="text" value={addrName} onChange={(e)=>setAddrName(e.target.value)} className="w-full border border-[#e6e5e0] rounded-lg px-3 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#C8861A]" />
                    <span className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-[#a09c92]">Full Name</span>
                  </div>
                  <div className="relative flex-1">
                    <input type="text" value={addrPhone} onChange={(e)=>setAddrPhone(e.target.value)} className="w-full border border-[#e6e5e0] rounded-lg px-3 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#C8861A]" />
                    <span className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-[#a09c92]">Phone Number</span>
                  </div>
                </div>

                <div className="relative">
                  <select value={addrProvince} onChange={(e)=>setAddrProvince(e.target.value)} className="w-full border border-[#e6e5e0] rounded-lg px-3 py-2.5 text-[14px] text-[#1A1A1A] appearance-none focus:outline-none focus:border-[#C8861A] bg-white">
                    <option>กรุงเทพมหานคร 10900</option>
                    <option>กรุงเทพมหานคร 10900</option>
                    <option>ฉะเชิงเทรา 24000</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a09c92" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <span className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-[#a09c92]">Province, District, Sub District, Postal Code</span>
                </div>

                <div className="relative">
                  <textarea rows="2" value={addrStreet} onChange={(e)=>setAddrStreet(e.target.value)} className="w-full border border-[#e6e5e0] rounded-lg px-3 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#C8861A] resize-none"></textarea>
                  <span className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-[#a09c92]">Street Name, Building, House No.</span>
                </div>

                {/* Map Mockup */}
                <div className="w-full h-32 bg-[#e8f4ea] relative rounded-lg overflow-hidden border border-[#e6e5e0]">
                  {/* Decorative map lines */}
                  <div className="absolute w-full h-2 bg-white top-8 -rotate-12 opacity-50"></div>
                  <div className="absolute w-2 h-full bg-white left-1/3 opacity-50"></div>
                  <div className="absolute w-full h-3 bg-white top-1/2 rotate-6 opacity-50"></div>
                  {/* Map Pin */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="#ea4335" stroke="#ea4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>
                  </div>
                </div>

                {/* Labels */}
                <div>
                  <p className="text-[13px] text-[#5a5852] mb-2">Label As:</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={()=>setAddrLabel('Home')} className={`px-4 py-1.5 border rounded ${addrLabel==='Home' ? 'border-[#C8861A] bg-[#FCFBF8]' : 'border-[#e6e5e0] bg-white'}`}>Home</button>
                    <button type="button" onClick={()=>setAddrLabel('Work')} className={`px-4 py-1.5 border rounded ${addrLabel==='Work' ? 'border-[#C8861A] bg-[#FCFBF8]' : 'border-[#e6e5e0] bg-white'}`}>Work</button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button onClick={() => setIsAddressModalOpen(false)} className="px-6 py-2 rounded-full text-[14px] font-bold text-[#5a5852] hover:bg-[#f5f5f5] transition-colors">ยกเลิก</button>
                <button onClick={() => {
                  // save address
                  try { window.localStorage.setItem('chapter-shipping-address', JSON.stringify({ name: addrName, phone: addrPhone, province: addrProvince, street: addrStreet, label: addrLabel })); } catch {}
                  setIsAddressModalOpen(false);
                }} className="px-6 py-2 rounded-full text-[14px] font-bold bg-[#C8861A] text-white hover:bg-[#b07415] transition-colors shadow-md">บันทึก</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credit Card Modal */}
      {isCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">Add Credit Card</h2>
              
              <div className="border border-[#34a853] bg-[#f2fdf4] rounded-lg p-4 mb-6 flex items-start">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 flex-shrink-0 mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                <div>
                  <p className="font-bold text-[14px] text-[#1A1A1A] mb-1">Your card details are protected.</p>
                  <p className="text-[12px] text-[#5a5852] leading-relaxed">We partner with ShopeePay to ensure that your card details are kept safe and secure. Shopee will not have access to your card info.</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[14px] text-[#1A1A1A]">Card Details</h3>
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-[#e6e5e0] rounded-sm flex items-center justify-center text-[8px] font-bold">VISA</div>
                  <div className="w-8 h-5 bg-[#e6e5e0] rounded-sm flex items-center justify-center text-[8px] font-bold">MC</div>
                  <div className="w-8 h-5 bg-[#e6e5e0] rounded-sm flex items-center justify-center text-[8px] font-bold">JCB</div>
                </div>
              </div>

              <div className="space-y-5 mb-6">
                <input type="text" placeholder="Card Number" className="w-full border border-[#e6e5e0] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#C8861A]" />
                
                <div className="flex gap-4">
                  <input type="text" placeholder="Expiry Date (MM/YY)" className="flex-1 border border-[#e6e5e0] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#C8861A]" />
                  <div className="flex-1 relative">
                    <input type="text" placeholder="CVV" className="w-full border border-[#e6e5e0] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#C8861A]" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a09c92" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                  </div>
                </div>

                <input type="text" placeholder="Name on Card" className="w-full border border-[#e6e5e0] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#C8861A]" />
              </div>

              <p className="text-[12px] text-[#807d72] mb-8">
                ฿ 1.00 will be deducted as verification fee. It will be refunded to your card within 14 days.
              </p>

              <div className="flex justify-end gap-3">
                <button onClick={() => setIsCardModalOpen(false)} className="px-6 py-2.5 rounded-lg text-[14px] font-bold text-[#5a5852] border border-[#e6e5e0] hover:bg-[#f5f5f5] transition-colors">Cancel</button>
                <button onClick={() => setIsCardModalOpen(false)} className="px-6 py-2.5 rounded-lg text-[14px] font-bold bg-[#C8861A] text-white hover:bg-[#b07415] transition-colors shadow-md">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

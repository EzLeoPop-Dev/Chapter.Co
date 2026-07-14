"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [orderData, setOrderData] = useState(null);
  const [slipImage, setSlipImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem('chapter-last-order');
      if (raw) {
        setOrderData(JSON.parse(raw));
      }
    } catch (e) {
      console.error('Error loading order:', e);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('ขนาดไฟล์ต้องไม่เกิน 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSlipImage(event.target.result);
      setErrorMsg('');
    };
    reader.onerror = () => {
      setErrorMsg('เกิดข้อผิดพลาดในการอ่านไฟล์');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveSlip = () => {
    setSlipImage(null);
  };

  const handleConfirmPayment = async () => {
    if (paymentMethod === 'qr' && !slipImage) {
      setErrorMsg('กรุณาอัปโหลดสลิปการโอนเงินเพื่อยืนยันการชำระเงิน');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const orderId = orderData?.id || orderData?.orderId;
      if (!orderId) {
        router.push('/success');
        return;
      }

      // Update status to 'ตรวจสอบชำระเงิน' and attach slipUrl in backend database
      const response = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: orderId,
          updates: {
            status: 'ตรวจสอบชำระเงิน',
            slipUrl: slipImage,
            paymentTime: new Date().toLocaleString('th-TH')
          }
        })
      });

      // Update client state in localStorage for order detail visual sync
      if (typeof window !== 'undefined') {
        const existingOrders = JSON.parse(window.localStorage.getItem('chapter-admin-orders') || '[]');
        const updatedOrders = existingOrders.map(order => {
          if (order.id === orderId) {
            return {
              ...order,
              status: 'ตรวจสอบชำระเงิน',
              slipUrl: slipImage,
              paymentTime: new Date().toLocaleString('th-TH')
            };
          }
          return order;
        });
        window.localStorage.setItem('chapter-admin-orders', JSON.stringify(updatedOrders));

        const lastOrder = JSON.parse(window.localStorage.getItem('chapter-last-order') || '{}');
        if (lastOrder && (lastOrder.orderId === orderId || lastOrder.id === orderId)) {
          lastOrder.status = 'ตรวจสอบชำระเงิน';
          if (!lastOrder.summary) lastOrder.summary = {};
          lastOrder.summary.status = 'ตรวจสอบชำระเงิน';
          lastOrder.slipUrl = slipImage;
          lastOrder.paymentTime = new Date().toLocaleString('th-TH');
          window.localStorage.setItem('chapter-last-order', JSON.stringify(lastOrder));
        }

        window.dispatchEvent(new Event('chapter-orders-updated'));
      }

      router.push('/success');
    } catch (err) {
      console.error(err);
      setErrorMsg('เกิดข้อผิดพลาดในการบันทึกข้อมูลการชำระเงิน');
    } finally {
      setIsSubmitting(false);
    }
  };

  const amountToPay = orderData?.summary?.total ?? orderData?.amount ?? 37.99;

  return (
    <div className="min-h-screen bg-[#F2EEE7] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#C8861A] selection:text-white p-4 md:p-8 flex flex-col">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-[#C8861A]/10 rounded-full mix-blend-multiply filter blur-[128px] animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-[#C8861A]/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <Navbar />

        <div className="mt-8 mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-black text-[#1A1A1A]">การชำระเงิน</h1>
          <div className="hidden md:flex items-center space-x-4 text-sm font-bold text-[#a09c92]">
            <span className="flex items-center"><div className="w-6 h-6 rounded-full bg-[#d0cdc5] text-white flex items-center justify-center mr-2">1</div> จัดส่ง</span>
            <div className="w-10 h-0.5 bg-[#e6e5e0]"></div>
            <span className="flex items-center text-primary"><div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-2">2</div> ชำระเงิน</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-[2] space-y-6">
            
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">เลือกช่องทางการชำระเงิน</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${paymentMethod === 'qr' ? 'border-primary bg-orange-50' : 'border-[#e6e5e0] bg-white hover:border-primary'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">Thai QR PromptPay</h3>
                    {paymentMethod === 'qr' && <div className="w-4 h-4 rounded-full bg-primary"></div>}
                  </div>
                  <p className="text-sm text-[#a09c92] font-medium">สแกนจ่ายผ่านแอปธนาคาร</p>
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${paymentMethod === 'card' ? 'border-primary bg-orange-50' : 'border-[#e6e5e0] bg-white hover:border-primary'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">Credit / Debit Card</h3>
                    {paymentMethod === 'card' && <div className="w-4 h-4 rounded-full bg-primary"></div>}
                  </div>
                  <p className="text-sm text-[#a09c92] font-medium">บัตรเครดิต หรือบัตรเดบิต</p>
                </button>
              </div>

              {paymentMethod === 'qr' && (
                <div className="bg-white rounded-2xl p-8 border border-[#e6e5e0] flex flex-col items-center justify-center animate-fadeIn text-center">
                  
                  {/* Premium PromptPay Styled QR Frame */}
                  <div className="w-64 border-2 border-[#113566] rounded-2xl overflow-hidden shadow-md mb-6 bg-white">
                    {/* Header bar */}
                    <div className="bg-[#113566] text-white py-3 px-4 flex flex-col items-center justify-center">
                      <div className="flex items-center space-x-1">
                        <span className="text-[14px] font-black tracking-wider">Thai QR Payment</span>
                      </div>
                    </div>
                    {/* QR Area */}
                    <div className="p-6 bg-white flex flex-col items-center justify-center relative">
                      <div className="w-44 h-44 bg-white relative flex items-center justify-center p-1 border border-[#f0efeb]">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-[#113566]">
                          <rect x="0" y="0" width="100" height="100" fill="none" />
                          <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                          <rect x="9" y="9" width="17" height="17" fill="white" />
                          <rect x="13" y="13" width="9" height="9" fill="currentColor" />
                          <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                          <rect x="74" y="9" width="17" height="17" fill="white" />
                          <rect x="78" y="13" width="9" height="9" fill="currentColor" />
                          <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                          <rect x="9" y="74" width="17" height="17" fill="white" />
                          <rect x="13" y="78" width="9" height="9" fill="currentColor" />
                          <rect x="75" y="75" width="10" height="10" fill="currentColor" />
                          <rect x="77" y="77" width="6" height="6" fill="white" />
                          <rect x="79" y="79" width="2" height="2" fill="currentColor" />
                          <rect x="35" y="5" width="5" height="5" fill="currentColor" />
                          <rect x="45" y="5" width="5" height="5" fill="currentColor" />
                          <rect x="55" y="5" width="10" height="5" fill="currentColor" />
                          <rect x="40" y="15" width="5" height="10" fill="currentColor" />
                          <rect x="50" y="10" width="10" height="5" fill="currentColor" />
                          <rect x="35" y="25" width="10" height="5" fill="currentColor" />
                          <rect x="55" y="20" width="5" height="10" fill="currentColor" />
                          <rect x="5" y="35" width="5" height="10" fill="currentColor" />
                          <rect x="15" y="45" width="10" height="5" fill="currentColor" />
                          <rect x="25" y="35" width="5" height="5" fill="currentColor" />
                          <rect x="35" y="35" width="5" height="15" fill="currentColor" />
                          <rect x="45" y="40" width="15" height="5" fill="currentColor" />
                          <rect x="40" y="50" width="5" height="5" fill="currentColor" />
                          <rect x="50" y="45" width="5" height="10" fill="currentColor" />
                          <rect x="5" y="55" width="10" height="5" fill="currentColor" />
                          <rect x="20" y="55" width="5" height="10" fill="currentColor" />
                          <rect x="30" y="55" width="15" height="5" fill="currentColor" />
                          <rect x="55" y="55" width="5" height="5" fill="currentColor" />
                          <rect x="70" y="35" width="5" height="10" fill="currentColor" />
                          <rect x="80" y="45" width="10" height="5" fill="currentColor" />
                          <rect x="90" y="35" width="5" height="15" fill="currentColor" />
                          <rect x="75" y="50" width="10" height="5" fill="currentColor" />
                          <rect x="85" y="55" width="5" height="10" fill="currentColor" />
                          <rect x="70" y="60" width="10" height="5" fill="currentColor" />
                          <rect x="50" y="70" width="5" height="10" fill="currentColor" />
                          <rect x="35" y="75" width="10" height="5" fill="currentColor" />
                          <rect x="40" y="85" width="15" height="5" fill="currentColor" />
                          <rect x="60" y="75" width="5" height="15" fill="currentColor" />
                          <rect x="60" y="35" width="5" height="5" fill="currentColor" />
                          <rect x="65" y="45" width="5" height="5" fill="currentColor" />
                          <rect x="5" y="45" width="5" height="5" fill="currentColor" />
                          <rect x="15" y="35" width="5" height="5" fill="currentColor" />
                        </svg>
                        <div className="absolute w-8 h-8 bg-white rounded-md border border-[#e6e5e0] shadow-sm flex items-center justify-center p-0.5">
                          <div className="w-full h-full bg-[#113566] rounded flex items-center justify-center text-[7px] font-black text-white leading-none">
                            Prompt<br/><span className="text-yellow-400">Pay</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-bold text-lg mb-1">สแกน QR Code เพื่อชำระเงิน</h4>
                  <p className="text-[#a09c92] text-sm">ชื่อบัญชี: บจก. Chapter.Co</p>
                  <p className="text-primary font-black text-2xl mt-4">ยอดโอน: ฿{amountToPay.toFixed(2)}</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="bg-white rounded-2xl p-8 border border-[#e6e5e0] animate-fadeIn space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#a09c92] uppercase tracking-wider mb-2">หมายเลขบัตร</label>
                    <input type="text" className="w-full bg-[#F2EEE7] border border-[#e6e5e0] rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#a09c92] uppercase tracking-wider mb-2">วันหมดอายุ</label>
                      <input type="text" className="w-full bg-[#F2EEE7] border border-[#e6e5e0] rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#a09c92] uppercase tracking-wider mb-2">CVV</label>
                      <input type="text" className="w-full bg-[#F2EEE7] border border-[#e6e5e0] rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {paymentMethod === 'qr' && (
              <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center">อัปโหลดสลิปการโอนเงิน</h2>
                
                <input
                  type="file"
                  id="slip-upload-input"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!slipImage ? (
                  <label 
                    htmlFor="slip-upload-input"
                    className="border-2 border-dashed border-[#d0cdc5] rounded-2xl p-8 text-center cursor-pointer hover:border-[#C8861A] hover:bg-orange-50/50 transition-all flex flex-col items-center justify-center space-y-2 block"
                  >
                    <svg className="w-10 h-10 text-[#a09c92] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <p className="text-[#a09c92] font-bold text-sm">คลิกเพื่อเลือกไฟล์ หรือลากสลิปการโอนเงินมาวางที่นี่</p>
                    <p className="text-xs text-[#d0cdc5]">รองรับไฟล์รูปภาพ JPG, JPEG, PNG ขนาดไม่เกิน 5MB</p>
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-2xl border border-[#e6e5e0] overflow-hidden max-w-[240px] mx-auto aspect-[3/4] bg-gray-100 flex items-center justify-center shadow-md">
                      <img src={slipImage} alt="Payment Slip Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={handleRemoveSlip}
                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition-colors"
                        title="ลบรูปภาพ"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-center">
                      <label 
                        htmlFor="slip-upload-input" 
                        className="text-xs font-bold text-[#C8861A] hover:underline cursor-pointer"
                      >
                        เลือกรูปภาพอื่น
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl sticky top-8">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">สรุปคำสั่งซื้อ</h3>
              
              {/* Order Items Breakdown */}
              {orderData?.items && orderData.items.length > 0 && (
                <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-1 border-b border-[#e6e5e0] pb-6">
                  {orderData.items.map((item, idx) => (
                    <div key={item.id || idx} className="flex justify-between items-start text-sm">
                      <div className="pr-4">
                        <h4 className="font-bold text-[#1A1A1A] text-[13px] leading-tight">{item.title}</h4>
                        <p className="text-[#a09c92] text-[11px] mt-1">จำนวน: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-[#C8861A] text-[13px] whitespace-nowrap">
                        ฿{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3 mb-6">
                {orderData?.summary && (
                  <>
                    <div className="flex justify-between text-sm text-[#5a5852]">
                      <span>ยอดรวมสินค้า</span>
                      <span className="font-bold">฿{orderData.summary.subtotal.toFixed(2)}</span>
                    </div>
                    {orderData.summary.discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>ส่วนลด</span>
                        <span className="font-bold">-฿{orderData.summary.discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-[#5a5852]">
                      <span>ค่าจัดส่ง</span>
                      <span className="font-bold">{orderData.summary.shippingFee === 0 ? 'ฟรี' : `฿${orderData.summary.shippingFee.toFixed(2)}`}</span>
                    </div>
                  </>
                )}
                
                <div className="border-t border-[#e6e5e0] pt-4 mt-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-[#a09c92] uppercase tracking-wider">ยอดที่ต้องชำระ</span>
                    <span className="text-3xl font-black text-[#C8861A]">฿{amountToPay.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="mb-4 text-center text-sm text-red-500 font-bold bg-red-50 py-2.5 px-4 rounded-xl border border-red-100 animate-fadeIn">
                  {errorMsg}
                </div>
              )}

              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-gradient-to-r from-[#C8861A] to-[#b07415] hover:from-[#b07415] hover:to-[#a06405] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-[#C8861A]/40 transition-all hover:-translate-y-1 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'กำลังบันทึกข้อมูล...' : 'ยืนยันการชำระเงิน'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

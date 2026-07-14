"use client";
import React, { useEffect, useMemo, useState } from 'react';

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSlip, setShowSlip] = useState(false);
  const [shipOrder, setShipOrder] = useState(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [printOrder, setPrintOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        if (data?.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
          return;
        }
      } catch {}

      if (typeof window !== 'undefined') {
        try {
          const raw = window.localStorage.getItem('chapter-admin-orders');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              setOrders(parsed);
              return;
            }
          }
        } catch {}
      }

      setOrders([
        {
          id: 'ORD-001', customer: 'สมชาย รักการอ่าน', date: '14/07/2026', amount: 450, status: 'รอชำระเงิน',
          address: '123 ถ.สุขุมวิท คลองเตย กรุงเทพฯ 10110', shippingMethod: 'EMS (ไปรษณีย์ไทย)',
          items: [{ name: 'แฮร์รี่ พอตเตอร์ เล่ม 1', price: 395, qty: 1 }],
          subtotal: 395, shippingFee: 55, discount: 0, promo: '-',
          paymentMethod: 'โอนเงินผ่านธนาคาร', paymentTime: '-'
        },
        {
          id: 'ORD-002', customer: 'วิภาดา ใจดี', date: '14/07/2026', amount: 890, status: 'ตรวจสอบชำระเงิน',
          address: '45/6 หมู่ 2 ต.บางรัก อ.เมือง จ.เชียงใหม่ 50000', shippingMethod: 'Kerry Express',
          items: [{ name: 'ปรมาจารย์ลัทธิมาร เล่ม 1', price: 450, qty: 1 }, { name: 'ปรมาจารย์ลัทธิมาร เล่ม 2', price: 450, qty: 1 }],
          subtotal: 900, shippingFee: 40, discount: 50, promo: 'FLASH50',
          paymentMethod: 'โอนเงินผ่านธนาคาร (แนบสลิปแล้ว)', paymentTime: '14/07/2026 10:15',
          slipUrl: 'https://placehold.co/400x600/f2eee7/a09c92?text=Payment+Slip+Mockup'
        },
        {
          id: 'ORD-003', customer: 'ณเดชน์ สุดหล่อ', date: '13/07/2026', amount: 1200, status: 'รอจัดส่ง',
          address: '88 คอนโดหรู ถ.สาทร กรุงเทพฯ 10120', shippingMethod: 'Kerry Express',
          items: [{ name: 'Boxset จูจูทสึ ไคเซ็น', price: 1200, qty: 1 }],
          subtotal: 1200, shippingFee: 0, discount: 0, promo: 'FREESHIP',
          paymentMethod: 'บัตรเครดิต (ตัดผ่านระบบ)', paymentTime: '13/07/2026 15:30'
        },
        {
          id: 'ORD-004', customer: 'ญาญ่า น่ารัก', date: '12/07/2026', amount: 350, status: 'จัดส่งแล้ว',
          address: '99/9 ถ.นิมมานเหมินทร์ จ.เชียงใหม่ 50200', shippingMethod: 'EMS (ไปรษณีย์ไทย)',
          items: [{ name: 'คิดแบบยิว', price: 300, qty: 1 }],
          subtotal: 300, shippingFee: 50, discount: 0, promo: '-',
          paymentMethod: 'โอนเงินผ่านธนาคาร', paymentTime: '12/07/2026 09:45',
          slipUrl: 'https://placehold.co/400x600/f2eee7/a09c92?text=Payment+Slip+Mockup'
        }
      ]);
    };

    loadOrders();

    if (typeof window !== 'undefined') {
      const handleOrdersUpdated = () => loadOrders();
      window.addEventListener('chapter-orders-updated', handleOrdersUpdated);
      window.addEventListener('storage', handleOrdersUpdated);
      return () => {
        window.removeEventListener('chapter-orders-updated', handleOrdersUpdated);
        window.removeEventListener('storage', handleOrdersUpdated);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !orders.length) return;
    window.localStorage.setItem('chapter-admin-orders', JSON.stringify(orders));
  }, [orders]);

  React.useEffect(() => {
    if (printOrder) {
      // Small delay to allow react to render the print DOM
      setTimeout(() => {
        window.print();
      }, 100);
    }
  }, [printOrder]);

  // Handle print after-effect
  React.useEffect(() => {
    const handleAfterPrint = () => setPrintOrder(null);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { status: newStatus } })
      });
      const data = await response.json();
      if (data?.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
        return;
      }
    } catch {}

    setOrders((currentOrders) => currentOrders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'รอชำระเงิน': return 'bg-gray-100 text-gray-700';
      case 'ตรวจสอบชำระเงิน': return 'bg-yellow-100 text-yellow-700';
      case 'รอแพ็ค': return 'bg-orange-100 text-orange-700';
      case 'รอจัดส่ง': return 'bg-blue-100 text-blue-700';
      case 'จัดส่งแล้ว': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderActionButtons = (order) => {
    switch (order.status) {
      case 'รอชำระเงิน':
        return (
          <button className="px-3 py-1.5 text-xs font-bold bg-[#F2EEE7] text-[#a09c92] rounded-lg cursor-not-allowed">
            รอลูกค้าชำระเงิน
          </button>
        );
      case 'ตรวจสอบชำระเงิน':
        return (
          <button onClick={() => updateStatus(order.id, 'รอแพ็ค')} className="px-3 py-1.5 text-xs font-bold bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded-lg transition-colors">
            ยืนยันการชำระเงิน
          </button>
        );
      case 'รอแพ็ค':
        return (
          <>
            <button onClick={() => setPrintOrder(order)} className="px-3 py-1.5 text-xs font-bold bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-lg transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              พิมพ์ใบปะหน้า
            </button>
            <button onClick={() => updateStatus(order.id, 'รอจัดส่ง')} className="px-3 py-1.5 text-xs font-bold bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white rounded-lg transition-colors">
              แพ็คเสร็จสิ้น
            </button>
          </>
        );
      case 'รอจัดส่ง':
        return (
          <>
            <button onClick={() => setPrintOrder(order)} className="px-3 py-1.5 text-xs font-bold bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-lg transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              พิมพ์ใบปะหน้า
            </button>
          </>
        );
      default:
        return (
          <button className="px-3 py-1.5 text-xs font-bold bg-[#F2EEE7] text-[#a09c92] rounded-lg cursor-not-allowed">
            เสร็จสิ้น
          </button>
        );
    }
  };

  const filteredOrders = useMemo(() => activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab), [activeTab, orders]);

  return (
    <div>
      <div className="print:hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">จัดการคำสั่งซื้อ (Orders)</h2>
            <p className="text-[#a09c92] text-sm">ตรวจสอบสลิป, ยืนยันชำระเงิน, แพ็คสินค้า และอัปเดตสถานะจัดส่ง</p>
          </div>
        <div className="flex bg-white rounded-xl p-1 border border-[#e6e5e0]">
          <input type="text" placeholder="ค้นหาเลขออเดอร์..." className="px-4 py-1.5 text-sm w-48 focus:outline-none bg-transparent" />
          <button className="bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-bold">ค้นหา</button>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-sm border border-white/80 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#e6e5e0] overflow-x-auto scrollbar-hide bg-white/40">
          {[
            { key: 'all', label: 'ทั้งหมด' },
            { key: 'รอชำระเงิน', label: 'รอชำระเงิน' },
            { key: 'ตรวจสอบชำระเงิน', label: 'ตรวจสอบชำระเงิน' },
            { key: 'รอแพ็ค', label: 'รอแพ็ค' },
            { key: 'รอจัดส่ง', label: 'รอจัดส่ง' },
            { key: 'จัดส่งแล้ว', label: 'จัดส่งแล้ว' }
          ].map((tab) => (
            <button 
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.key ? 'border-primary text-primary bg-white/60' : 'border-transparent text-[#1A1A1A] hover:bg-white/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e6e5e0] text-sm text-[#a09c92]">
                <th className="pb-3 px-4 font-bold">Order ID</th>
                <th className="pb-3 px-4 font-bold">วันที่</th>
                <th className="pb-3 px-4 font-bold">ลูกค้า</th>
                <th className="pb-3 px-4 font-bold text-right">ยอดสุทธิ</th>
                <th className="pb-3 px-4 font-bold text-center">สถานะ</th>
                <th className="pb-3 px-4 font-bold text-right">จัดการสถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e5e0]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#1A1A1A]">{order.id}</td>
                  <td className="py-4 px-4 text-sm text-[#1A1A1A]">{order.date}</td>
                  <td className="py-4 px-4 font-medium text-[#1A1A1A]">{order.customer}</td>
                  <td className="py-4 px-4 text-sm font-black text-[#C8861A] text-right">฿{order.amount}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end items-center gap-2 whitespace-nowrap">
                      {renderActionButtons(order)}
                      {order.status === 'รอจัดส่ง' ? (
                        <button onClick={() => { setSelectedOrder(order); setTrackingInput(order.trackingNumber || ''); }} className="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
                          ตรวจสอบและจัดส่ง
                        </button>
                      ) : (
                        <button onClick={() => setSelectedOrder(order)} className="px-3 py-1.5 text-xs font-bold text-primary hover:bg-orange-50 rounded-lg transition-colors">
                          รายละเอียด
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-[#a09c92]">ไม่มีคำสั่งซื้อในสถานะนี้</div>
          )}
        </div>
      </div>
      </div> {/* End print:hidden space-y-6 */}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm print:hidden">
          <div className="bg-[#FDFBF7] rounded-[2rem] w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#e6e5e0] flex justify-between items-center bg-white">
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">รายละเอียดคำสั่งซื้อ</h3>
                <p className="text-sm text-[#a09c92]">รหัส: {selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#a09c92] hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Customer & Shipping */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#e6e5e0]">
                  <h4 className="text-xs font-bold text-[#a09c92] mb-2 uppercase tracking-wider">ข้อมูลผู้รับ</h4>
                  <p className="font-bold text-[#1A1A1A]">{selectedOrder.customer}</p>
                  <p className="text-sm text-[#555] mt-1">{selectedOrder.address}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#e6e5e0] flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#a09c92] mb-2 uppercase tracking-wider">การจัดส่ง</h4>
                    <p className="font-bold text-[#1A1A1A]">{selectedOrder.shippingMethod}</p>
                    <p className="text-sm text-[#555] mt-1">วันที่สั่งซื้อ: {selectedOrder.date}</p>
                  </div>
                  {/* Tracking Number Section */}
                  <div className="mt-3 pt-3 border-t border-[#e6e5e0]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#a09c92] uppercase">หมายเลขพัสดุ (Tracking)</span>
                    </div>
                    {selectedOrder.trackingNumber ? (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary bg-orange-50 px-3 py-1 rounded-lg text-sm tracking-wider">
                          {selectedOrder.trackingNumber}
                        </span>
                        <button className="text-[#a09c92] hover:text-primary transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                      </div>
                    ) : (selectedOrder.status === 'รอจัดส่ง' || selectedOrder.status === 'รอแพ็ค') ? (
                      <div className="flex gap-2">
                        <input type="text" value={trackingInput} onChange={(e) => setTrackingInput(e.target.value)} placeholder="ระบุเลขพัสดุ..." className="flex-1 px-3 py-1.5 border border-[#e6e5e0] rounded-lg text-sm focus:outline-none focus:border-primary" />
                      </div>
                    ) : (
                      <span className="text-sm text-[#a09c92]">-</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-white p-4 rounded-xl border border-[#e6e5e0]">
                <h4 className="text-xs font-bold text-[#a09c92] mb-3 uppercase tracking-wider">รายการสินค้า</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#F2EEE7] rounded flex items-center justify-center font-bold text-[#a09c92]">{item.qty}x</div>
                        <span className="font-medium text-[#1A1A1A]">{item.name}</span>
                      </div>
                      <span className="font-bold text-[#1A1A1A]">฿{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white p-4 rounded-xl border border-[#e6e5e0] space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#a09c92]">ยอดรวมสินค้า</span>
                  <span className="font-medium">฿{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a09c92]">ค่าจัดส่ง</span>
                  <span className="font-medium">฿{selectedOrder.shippingFee}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>ส่วนลดโปรโมชั่น ({selectedOrder.promo})</span>
                  <span className="font-medium">-฿{selectedOrder.discount}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-[#e6e5e0] flex justify-between items-center">
                  <span className="font-bold text-[#1A1A1A]">ยอดสุทธิ</span>
                  <span className="text-lg font-black text-[#C8861A]">฿{selectedOrder.amount}</span>
                </div>
              </div>

              {/* Payment Details (Only show if not 'รอชำระเงิน') */}
              {selectedOrder.status !== 'รอชำระเงิน' && (
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-green-800">ข้อมูลการชำระเงิน</h4>
                    <p className="text-sm text-green-700 mt-1">ชำระผ่าน: {selectedOrder.paymentMethod}</p>
                    <p className="text-sm text-green-700">เวลา: {selectedOrder.paymentTime}</p>
                  </div>
                  {selectedOrder.slipUrl && (
                    <button 
                      onClick={() => setShowSlip(true)} 
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors whitespace-nowrap"
                    >
                      ดูสลิปโอนเงิน
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            {selectedOrder.status === 'รอจัดส่ง' ? (
              <div className="p-4 border-t border-[#e6e5e0] bg-white flex justify-end gap-3">
                <button 
                  onClick={() => {
                    setSelectedOrder(null);
                    setShowSlip(false);
                    setTrackingInput('');
                  }} 
                  className="px-5 py-2.5 bg-[#F2EEE7] hover:bg-[#e6e5e0] text-[#1A1A1A] rounded-xl font-bold transition-colors text-sm"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={async () => {
                    const nextTracking = trackingInput.trim();
                    try {
                      const response = await fetch('/api/orders', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: selectedOrder.id, updates: { status: 'จัดส่งแล้ว', trackingNumber: nextTracking } })
                      });
                      const data = await response.json();
                      if (data?.success && Array.isArray(data.orders)) {
                        setOrders(data.orders);
                      } else {
                        setOrders((currentOrders) => currentOrders.map((o) => (o.id === selectedOrder.id ? { ...o, status: 'จัดส่งแล้ว', trackingNumber: nextTracking } : o)));
                      }
                    } catch {
                      setOrders((currentOrders) => currentOrders.map((o) => (o.id === selectedOrder.id ? { ...o, status: 'จัดส่งแล้ว', trackingNumber: nextTracking } : o)));
                    }
                    setSelectedOrder(null);
                    setTrackingInput('');
                  }} 
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors text-sm"
                  disabled={!trackingInput.trim()}
                >
                  ยืนยันจัดส่ง
                </button>
              </div>
            ) : (
              <div className="p-4 border-t border-[#e6e5e0] bg-white flex justify-end">
                <button 
                  onClick={() => {
                    setSelectedOrder(null);
                    setShowSlip(false);
                  }} 
                  className="px-5 py-2.5 bg-[#F2EEE7] hover:bg-[#e6e5e0] text-[#1A1A1A] rounded-xl font-bold transition-colors text-sm"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            )}
          </div>

          {/* Slip Image Modal (Nested) */}
          {showSlip && selectedOrder?.slipUrl && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowSlip(false)}>
              <div className="relative max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setShowSlip(false)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img 
                  src={selectedOrder.slipUrl} 
                  alt="Payment Slip" 
                  className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}


      {/* Print Label Area (Only visible during print) */}
      {printOrder && (
        <div className="hidden print:block fixed inset-0 z-[999] bg-white text-black p-8" style={{ width: '100vw', height: '100vh', margin: 0, padding: '2cm', boxSizing: 'border-box' }}>
          <div className="border-4 border-black w-full h-[15cm] p-4 flex flex-col relative font-sans">
            <div className="flex justify-between border-b-2 border-black pb-4 mb-4">
              <div>
                <h1 className="text-4xl font-black mb-1">Kerry Express</h1>
                <p className="text-xl font-bold">Standard Delivery</p>
              </div>
              <div className="text-right">
                <div className="border-2 border-black px-4 py-2 font-bold text-3xl mb-2">COD: ฿{printOrder.status === 'รอชำระเงิน' ? printOrder.amount : '0.00'}</div>
                <div className="text-sm font-bold">Order ID: {printOrder.id}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-6 h-full">
              <div className="border-r-2 border-black pr-4">
                <h3 className="text-lg font-bold uppercase mb-2">ผู้ส่ง (Sender)</h3>
                <p className="font-bold text-xl mb-1">Chapter.Co</p>
                <p className="text-lg">123 อาคาร XYZ ชั้น 4 ถ.พหลโยธิน<br />แขวงสามเสนใน เขตพญาไท<br />กรุงเทพมหานคร 10400</p>
                <p className="text-lg mt-2 font-bold">โทร: 02-123-4567</p>
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase mb-2">ผู้รับ (Receiver)</h3>
                <p className="font-bold text-2xl mb-1">{printOrder.customer}</p>
                <p className="text-xl leading-relaxed">{printOrder.address}</p>
                <p className="text-lg mt-2 font-bold">โทร: 081-XXX-XXXX</p>
              </div>
            </div>

            <div className="absolute bottom-4 left-0 w-full px-4 text-center border-t-2 border-black pt-4">
              <div className="mb-2">
                {/* Mock Barcode using narrow and wide divs */}
                <div className="flex justify-center h-16 w-full items-end gap-[2px]">
                  {Array.from({length: 40}).map((_, i) => (
                    <div key={i} className="bg-black h-full" style={{ width: Math.random() > 0.5 ? '4px' : '2px' }}></div>
                  ))}
                </div>
              </div>
              <p className="tracking-[0.3em] font-mono text-xl font-bold">{printOrder.trackingNumber || 'TH123456789012'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

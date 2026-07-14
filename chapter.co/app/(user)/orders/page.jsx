"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { authService } from '@/utils/authService';

export default function OrdersPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ทั้งหมด");

  const tabs = [
    "ทั้งหมด",
    "รอชำระเงิน",
    "ที่ต้องจัดส่ง",
    "เตรียมการจัดส่ง",
    "อยู่ระหว่างการจัดส่ง",
    "สำเร็จ",
    "ถูกยกเลิก",
    "การคืนเงิน/คืนสินค้า"
  ];

  // Mock data for orders
  const orders = [
    {
      id: "ORD-20250709-01",
      date: "9 กรกฎาคม 2026",
      status: "อยู่ระหว่างการจัดส่ง",
      statusColor: "text-tertiary bg-blue-50 border-blue-200",
      total: 37.99,
      items: [
        { title: "Atomic Habits", type: "ปกอ่อน", qty: 1, img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400" },
        { title: "ผ่าพิภพไททัน (Attack on Titan) Vol. 1", type: "E-Book", qty: 1, img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&sig=9" }
      ]
    },
    {
      id: "ORD-20250512-04",
      date: "12 พฤษภาคม 2026",
      status: "สำเร็จ",
      statusColor: "text-green-600 bg-green-50 border-green-200",
      total: 28.50,
      items: [
        { title: "Sapiens", type: "ปกแข็ง", qty: 1, img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400" }
      ]
    },
    {
      id: "ORD-20250515-09",
      date: "15 พฤษภาคม 2026",
      status: "รอชำระเงิน",
      statusColor: "text-red-500 bg-red-50 border-red-200",
      total: 15.00,
      items: [
        { title: "The Psychology of Money", type: "ปกอ่อน", qty: 1, img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400" }
      ]
    }
  ];

  // ดึงข้อมูล User เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = (e) => {
    e.preventDefault();
    authService.logout();
    router.push('/auth/login');
  };

  // ฟังก์ชันอัปโหลดรูปภาพ
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('ขนาดไฟล์รูปภาพต้องไม่เกิน 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const result = authService.updateUserProfile(user.userId, { profileImage: base64String });
        if (result.success) {
          setUser(result.user);
        } else {
          alert('เกิดข้อผิดพลาดในการเปลี่ยนรูปโปรไฟล์');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (isLoading || !user) {
    return <div className="min-h-screen bg-[#F2EEE7] flex items-center justify-center font-bold">Loading...</div>;
  }

  const avatarLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  const filteredOrders = activeTab === "ทั้งหมด" 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <div className="h-screen bg-[#F2EEE7] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#C8861A] selection:text-white p-4 md:p-8 flex flex-col overflow-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-tertiary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col flex-1 min-h-0">
        <Navbar />

        <div className="flex flex-col md:flex-row gap-8 mt-4 flex-1 min-h-0">
          
          {/* Sidebar Menu */}
          <aside className="w-full md:w-64 flex-shrink-0 h-full overflow-y-auto hide-scrollbar pb-10">
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-sm p-4">
              
              <div className="flex flex-col items-center p-6 border-b border-[#e6e5e0] mb-4">
                <div 
                  onClick={triggerFileInput}
                  className="relative w-20 h-20 rounded-full mb-4 shadow-md cursor-pointer group overflow-hidden border-2 border-transparent hover:border-primary transition-all"
                  title="คลิกเพื่อเปลี่ยนรูปโปรไฟล์"
                >
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-primary to-primary text-white flex items-center justify-center text-3xl font-black uppercase">
                      {avatarLetter}
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[10px] font-bold">เปลี่ยนรูป</span>
                  </div>
                </div>

                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden" 
                />

                <h3 className="font-bold text-lg text-center">{user.name}</h3>
                <p className="text-sm text-[#a09c92]">{user.email}</p>
              </div>

              <ul className="space-y-2 font-bold text-sm">
                <li><Link href="/profile" className="block px-4 py-3 rounded-xl text-[#1A1A1A] hover:bg-white transition-colors">ข้อมูลส่วนตัว</Link></li>
                <li><Link href="/orders" className="block px-4 py-3 rounded-xl bg-orange-50 text-primary transition-colors">ประวัติการสั่งซื้อ</Link></li>
                <li><Link href="/wishlist" className="block px-4 py-3 rounded-xl text-[#1A1A1A] hover:bg-white transition-colors">หนังสือที่อยากได้</Link></li>
                <li><Link href="/library" className="block px-4 py-3 rounded-xl text-[#1A1A1A] hover:bg-white transition-colors">คลัง E-book ของฉัน</Link></li>
                <li className="pt-4 mt-4 border-t border-[#e6e5e0]">
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors">
                    ออกจากระบบ
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 h-full overflow-y-auto hide-scrollbar pb-20 pr-1 md:pr-2">
            <h2 className="text-3xl font-black text-[#1A1A1A] mb-6">ประวัติการสั่งซื้อ</h2>

            {/* Status Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6 flex overflow-x-auto hide-scrollbar border border-[#e6e5e0]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-4 whitespace-nowrap text-[14px] transition-colors border-b-2 flex-1 text-center ${
                    activeTab === tab
                      ? 'border-[#ee4d2d] text-[#ee4d2d] font-bold'
                      : 'border-transparent text-[#5a5852] hover:text-[#ee4d2d] font-medium'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <div key={order.id} className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-white/50 border-b border-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{order.id}</h3>
                      <p className="text-sm text-[#a09c92] font-medium">สั่งซื้อเมื่อ: {order.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold border ${order.statusColor}`}>
                        {order.status}
                      </span>
                      <span className="text-xl font-black text-[#C8861A]">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img src={item.img} alt={item.title} className="w-16 h-20 object-cover rounded-lg shadow-sm" />
                          <div>
                            <h4 className="font-bold text-[#1A1A1A]">{item.title}</h4>
                            <p className="text-sm text-[#a09c92] font-medium">{item.type} x {item.qty}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-[#e6e5e0] flex justify-end gap-3">
                      <button className="px-5 py-2.5 bg-white border-2 border-[#e6e5e0] hover:border-primary hover:text-primary text-[#1A1A1A] font-bold rounded-xl transition-colors shadow-sm text-sm">
                        ดูรายละเอียด
                      </button>
                      <button className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">
                        ติดตามพัสดุ
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="bg-white rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center border border-[#e6e5e0] shadow-sm">
                  <div className="w-24 h-24 bg-[#F2EEE7] rounded-full flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C8861A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">ยังไม่มีคำสั่งซื้อในสถานะนี้</h3>
                  <p className="text-[#a09c92] text-sm">เมื่อคุณสั่งซื้อสินค้า รายการจะมาแสดงที่นี่</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
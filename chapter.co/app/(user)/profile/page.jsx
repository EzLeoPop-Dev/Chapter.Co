"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { authService } from '@/utils/authService';

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', birthdate: '' });
  const [addressForm, setAddressForm] = useState('');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
    } else {
      setUser(currentUser);
      setProfileForm({
        name: currentUser.name || '',
        email: currentUser.email || '', 
        phone: currentUser.phone || '',
        birthdate: currentUser.birthdate || ''
      });
      setAddressForm(currentUser.address || '');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = (e) => {
    e.preventDefault();
    authService.logout();
    router.push('/auth/login');
  };

  const handleSaveProfile = () => {
    const result = authService.updateUserProfile(user.userId, profileForm);
    if (result.success) {
      setUser(result.user);
      setIsEditingProfile(false);
    } else {
      alert(result.message);
    }
  };

  const handleSaveAddress = () => {
    setUser({ ...user, address: addressForm });
    setIsEditingAddress(false);
  };

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

  return (
    <div className="min-h-screen bg-[#F2EEE7] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#C8861A] selection:text-white p-4 md:p-8 flex flex-col">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-tertiary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col flex-1">
        <Navbar />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-sm p-4 sticky top-8">
              
              <div className="flex flex-col items-center p-6 border-b border-[#e6e5e0] mb-4">
                <div 
                  onClick={triggerFileInput}
                  className="relative w-24 h-24 rounded-full mb-4 shadow-md cursor-pointer group overflow-hidden border-2 border-transparent hover:border-primary transition-all"
                  title="คลิกเพื่อเปลี่ยนรูปโปรไฟล์"
                >
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-primary to-primary text-white flex items-center justify-center text-4xl font-black uppercase">
                      {avatarLetter}
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold">เปลี่ยนรูป</span>
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
                <li><Link href="/profile" className="block px-4 py-3 rounded-xl bg-orange-50 text-primary transition-colors">ข้อมูลส่วนตัว</Link></li>
                <li><Link href="/orders" className="block px-4 py-3 rounded-xl text-[#1A1A1A] hover:bg-white transition-colors">ประวัติการสั่งซื้อ</Link></li>
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

          <div className="flex-1">
            
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-[#1A1A1A]">ข้อมูลส่วนตัว</h2>
                
                {isEditingProfile ? (
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditingProfile(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl font-bold transition-colors text-sm">ยกเลิก</button>
                    <button onClick={handleSaveProfile} className="px-5 py-2 bg-primary text-white rounded-xl font-bold transition-colors shadow-sm text-sm hover:shadow-lg">บันทึก</button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditingProfile(true)} className="px-5 py-2 bg-[#F2EEE7] hover:bg-[#e6e5e0] text-[#1A1A1A] rounded-xl font-bold transition-colors shadow-sm text-sm">
                    แก้ไขข้อมูล
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[12px] font-bold text-[#a09c92] uppercase tracking-wider mb-2">ชื่อ - นามสกุล</label>
                  {isEditingProfile ? (
                    <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-white border border-[#e6e5e0] focus:ring-2 focus:ring-primary focus:outline-none" />
                  ) : (
                    <div className="text-lg font-medium text-[#1A1A1A]">{user.name}</div>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#a09c92] uppercase tracking-wider mb-2">อีเมล</label>
                  {isEditingProfile ? (
                    <input type="email" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-white border border-[#e6e5e0] focus:ring-2 focus:ring-primary focus:outline-none" />
                  ) : (
                    <div className="text-lg font-medium text-[#1A1A1A]">{user.email}</div>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#a09c92] uppercase tracking-wider mb-2">เบอร์โทรศัพท์</label>
                  {isEditingProfile ? (
                    <input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} placeholder="08X-XXX-XXXX" className="w-full px-4 py-2 rounded-xl bg-white border border-[#e6e5e0] focus:ring-2 focus:ring-primary focus:outline-none" />
                  ) : (
                    <div className="text-lg font-medium text-[#1A1A1A]">{user.phone || <span className="text-gray-400 italic">ยังไม่ได้ระบุ</span>}</div>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#a09c92] uppercase tracking-wider mb-2">วันเกิด</label>
                  {isEditingProfile ? (
                    <input type="date" value={profileForm.birthdate} onChange={(e) => setProfileForm({...profileForm, birthdate: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-white border border-[#e6e5e0] focus:ring-2 focus:ring-primary focus:outline-none" />
                  ) : (
                    <div className="text-lg font-medium text-[#1A1A1A]">{user.birthdate || <span className="text-gray-400 italic">ยังไม่ได้ระบุ</span>}</div>
                  )}
                </div>
              </div>
            </div>

            {/* ส่วนของ UI ที่อยู่จัดส่งเริ่มต้น ถูกนำกลับมาแสดงผลปกติ */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#1A1A1A]">ที่อยู่จัดส่งเริ่มต้น</h2>
                {isEditingAddress ? (
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditingAddress(false)} className="text-gray-500 font-bold hover:text-gray-700 text-sm">ยกเลิก</button>
                    <button onClick={handleSaveAddress} className="text-primary font-bold hover:text-orange-600 text-sm ml-2">บันทึกที่อยู่</button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditingAddress(true)} className="text-primary font-bold hover:text-primary text-sm">
                    {user.address ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่'}
                  </button>
                )}
              </div>

              <div className="border border-[#e6e5e0] bg-white rounded-2xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">ที่อยู่จัดส่ง</h3>
                  {user.address && !isEditingAddress && <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-md">ค่าเริ่มต้น</span>}
                </div>
                
                {isEditingAddress ? (
                  <textarea 
                    value={addressForm} 
                    onChange={(e) => setAddressForm(e.target.value)} 
                    placeholder="กรอกรายละเอียดที่อยู่จัดส่งของคุณ..." 
                    className="w-full mt-2 p-4 rounded-xl bg-[#F8F9FA] border border-[#e6e5e0] focus:ring-2 focus:ring-primary focus:outline-none min-h-[120px] resize-none"
                  />
                ) : (
                  <p className="text-[#1A1A1A] font-medium leading-relaxed mt-2 whitespace-pre-line">
                    {user.address || <span className="text-[#a09c92] italic">กรุณาเพิ่มที่อยู่จัดส่งของคุณ เพื่อความสะดวกในการสั่งซื้อหนังสือ</span>}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
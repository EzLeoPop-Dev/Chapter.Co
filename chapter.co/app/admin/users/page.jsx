"use client";
import React, { useState, useEffect } from 'react';
import { authService } from '@/utils/authService';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // State สำหรับควบคุม Pop-up เพิ่มพนักงาน
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', password: '', role: 'STAFF' });

  useEffect(() => {
    const session = authService.getCurrentUser();
    setCurrentUser(session);
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const normalizedUsers = storedUsers.map(u => ({ ...u, status: u.status || 'Active' }));
    setUsers(normalizedUsers);
  }, []);

  const saveToStorage = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const toggleStatus = (id) => {
    if (currentUser?.userId === id) {
      alert("ไม่อนุญาตให้แบนหรือปลดแบนบัญชีของตัวเองครับ!");
      return;
    }
    const updatedUsers = users.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Banned' : 'Active' } : u
    );
    saveToStorage(updatedUsers);
  };

  const changeRole = (id, newRole) => {
    if (currentUser?.userId === id) {
      alert("ไม่อนุญาตให้เปลี่ยนสิทธิ์บัญชีของตัวเองครับ!");
      return;
    }
    const updatedUsers = users.map(u => 
      u.id === id ? { ...u, role: newRole } : u
    );
    saveToStorage(updatedUsers);
  };

  // ฟังก์ชันจัดการตอนกด "บันทึก" พนักงานใหม่
  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    
    // เช็คว่าอีเมลซ้ำไหม
    if (users.some(u => u.email === newStaff.email)) {
      alert("อีเมลนี้มีในระบบแล้วครับ!");
      return;
    }

    const newUserObj = {
      id: `staff-${Date.now()}`,
      name: newStaff.name,
      email: newStaff.email,
      password: btoa(newStaff.password), // เข้ารหัสจำลอง
      role: newStaff.role,
      status: 'Active',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUserObj];
    saveToStorage(updatedUsers);
    
    // ปิด Modal และเคลียร์ฟอร์ม
    setIsAddModalOpen(false);
    setNewStaff({ name: '', email: '', password: '', role: 'STAFF' });
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">จัดการผู้ใช้งานและสิทธิ์ (RBAC)</h2>
          <p className="text-[#a09c92]">กำหนดบทบาทผู้ดูแล, พนักงาน และแบนผู้ใช้งานที่ไม่เหมาะสม</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-primary hover:bg-[#C8861A] text-white rounded-xl font-bold transition-colors text-sm shadow-md"
        >
          + เพิ่มพนักงานใหม่
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e6e5e0]">
                <th className="pb-3 px-4 font-bold text-[#a09c92] whitespace-nowrap">ID</th>
                <th className="pb-3 px-4 font-bold text-[#a09c92] whitespace-nowrap">ชื่อ</th>
                <th className="pb-3 px-4 font-bold text-[#a09c92] whitespace-nowrap">อีเมล</th>
                <th className="pb-3 px-4 font-bold text-[#a09c92] whitespace-nowrap">บทบาท (Role)</th>
                <th className="pb-3 px-4 font-bold text-[#a09c92] whitespace-nowrap">สถานะ</th>
                <th className="pb-3 px-4 font-bold text-[#a09c92] whitespace-nowrap text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e5e0]">
              {users.map((user) => (
                <tr key={user.id} className={`hover:bg-white/50 transition-colors ${user.status === 'Banned' ? 'opacity-60' : ''}`}>
                  <td className="py-4 px-4 text-sm text-[#a09c92]">
                    #{String(user.id).substring(0, 8)}...
                  </td>
                  <td className="py-4 px-4 font-medium text-[#1A1A1A]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-[#C8861A] flex items-center justify-center font-bold text-xs uppercase overflow-hidden">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      {user.name}
                      {currentUser?.userId === user.id && (
                        <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">คุณ</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-[#555]">{user.email}</td>
                  <td className="py-4 px-4">
                    <select 
                      value={user.role} 
                      onChange={(e) => changeRole(user.id, e.target.value)}
                      disabled={currentUser?.userId === user.id}
                      className="bg-[#F2EEE7] border-none text-sm font-bold text-[#1A1A1A] rounded-lg focus:ring-2 focus:ring-primary py-1.5 px-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="STAFF">Staff</option>
                      <option value="CUSTOMER">Customer</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      disabled={currentUser?.userId === user.id}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        user.status === 'Active' 
                        ? 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white' 
                        : 'bg-green-50 text-green-600 hover:bg-green-500 hover:text-white'
                      }`}
                    >
                      {user.status === 'Active' ? 'แบน' : 'ปลดแบน'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Pop-up (Modal) สำหรับเพิ่มพนักงาน --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* พื้นหลังสีดำเบลอๆ */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setIsAddModalOpen(false)}
          ></div>
          
          {/* กล่องใส่ข้อมูล */}
          <div className="bg-[#F2EEE7] p-8 rounded-[2rem] shadow-2xl z-10 w-full max-w-md relative">
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">เพิ่มพนักงานใหม่</h3>
            
            <form onSubmit={handleAddStaffSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-1">ชื่อ - นามสกุล</label>
                <input 
                  type="text" 
                  required
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#e6e5e0] focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-1">อีเมล</label>
                <input 
                  type="email" 
                  required
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#e6e5e0] focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-1">รหัสผ่าน (ตั้งต้น)</label>
                <input 
                  type="password" 
                  required
                  value={newStaff.password}
                  onChange={(e) => setNewStaff({...newStaff, password: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#e6e5e0] focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-1">สิทธิ์การใช้งาน (Role)</label>
                <select 
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#e6e5e0] focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="STAFF">พนักงาน (Staff)</option>
                  <option value="ADMIN">ผู้ดูแลระบบ (Admin)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 text-[#1A1A1A] font-bold hover:bg-white rounded-xl transition-colors"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-[#C8861A] transition-colors shadow-md"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
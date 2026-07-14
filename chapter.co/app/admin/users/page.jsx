"use client";
import React, { useState } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Supanat C.', email: 'admin@chapter.co', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Somchai', email: 'staff1@chapter.co', role: 'Staff', status: 'Active' },
    { id: 3, name: 'Customer A', email: 'cust1@gmail.com', role: 'User', status: 'Active' },
    { id: 4, name: 'Spam Bot', email: 'bot@spam.com', role: 'User', status: 'Banned' },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Banned' : 'Active' } : u));
  };

  const changeRole = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">จัดการผู้ใช้งานและสิทธิ์ (RBAC)</h2>
          <p className="text-[#a09c92]">กำหนดบทบาทผู้ดูแล, พนักงาน และแบนผู้ใช้งานที่ไม่เหมาะสม</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors text-sm shadow-md">
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
                <tr key={user.id} className="hover:bg-white/50 transition-colors">
                  <td className="py-4 px-4 text-sm text-[#a09c92]">#{user.id}</td>
                  <td className="py-4 px-4 font-medium text-[#1A1A1A]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-[#555]">{user.email}</td>
                  <td className="py-4 px-4">
                    <select 
                      value={user.role} 
                      onChange={(e) => changeRole(user.id, e.target.value)}
                      className="bg-[#F2EEE7] border-none text-sm font-bold text-[#1A1A1A] rounded-lg focus:ring-2 focus:ring-indigo-500 py-1.5 px-3"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                      <option value="User">User</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                        user.status === 'Active' ? 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white' : 'bg-green-50 text-green-600 hover:bg-green-500 hover:text-white'
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
    </div>
  );
}

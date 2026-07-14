"use client";
import React, { useEffect, useMemo, useState } from 'react';

const FALLBACK_BOOK_IMAGE = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80';

export default function StockManagementPage() {
  const userRole = 'staff';

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ทั้งหมด');

  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [newStock, setNewStock] = useState('');

  useEffect(() => {
    const loadCatalog = async () => {
      setIsSyncing(true);
      setSyncError('');
      try {
        const response = await fetch('/api/admin/catalog');
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || 'โหลดข้อมูลสต๊อกไม่สำเร็จ');
        }

        setBooks(data.books || []);
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Load stock error:', error);
        setSyncError(error.message || 'โหลดข้อมูลสต๊อกไม่สำเร็จ');
      } finally {
        setIsSyncing(false);
      }
    };

    loadCatalog();
  }, []);

  const runCatalogAction = async (action, payload) => {
    setIsSyncing(true);
    setSyncError('');
    try {
      const response = await fetch('/api/admin/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'อัปเดตข้อมูลไม่สำเร็จ');
      }

      setBooks(data.books || []);
      setCategories(data.categories || []);
      return true;
    } catch (error) {
      console.error('Stock action error:', error);
      setSyncError(error.message || 'อัปเดตข้อมูลไม่สำเร็จ');
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณต้องการลบหนังสือเล่มนี้ออกจากระบบใช่หรือไม่?')) {
      await runCatalogAction('book:delete', { id });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-700';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-700';
      case 'Out of Stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredBooks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return books.filter((book) => {
      const matchesQuery =
        !normalizedQuery ||
        book.title.toLowerCase().includes(normalizedQuery) ||
        String(book.id).toLowerCase().includes(normalizedQuery);

      const matchesCategory = categoryFilter === 'ทั้งหมด' || book.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [books, searchQuery, categoryFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-xl border border-white/80 rounded-4xl p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">จัดการสต๊อกสินค้า (Stock)</h2>
          <p className="text-[#a09c92] text-sm">เพิ่ม, แก้ไข, ลบ และอัปเดตจำนวนหนังสือในระบบ</p>
        </div>
        {userRole === 'admin' && (
          <button className="px-5 py-2.5 bg-primary hover:bg-[#b07515] text-white rounded-xl font-bold transition-all shadow-md hover:-translate-y-0.5">
            + เพิ่มหนังสือใหม่
          </button>
        )}
      </div>

      {(isSyncing || syncError) && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            syncError ? 'border-red-200 bg-red-50 text-red-600' : 'border-[#e6e5e0] bg-white/70 text-[#a09c92]'
          }`}
        >
          {syncError ? syncError : 'กำลังซิงก์ข้อมูลสต๊อกผ่าน API...'}
        </div>
      )}

      <div className="bg-white/70 backdrop-blur-xl rounded-4xl shadow-sm border border-white/80 overflow-hidden p-6">
        <div className="flex justify-between mb-6 gap-3">
          <input
            type="text"
            placeholder="ค้นหารหัส หรือชื่อหนังสือ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-[#1A1A1A] w-72"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none text-[#1A1A1A] bg-white"
          >
            <option value="ทั้งหมด">หมวดหมู่ทั้งหมด</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e6e5e0] text-sm text-[#a09c92]">
                <th className="pb-3 px-4 font-bold">รหัส</th>
                <th className="pb-3 px-4 font-bold">รูปปก</th>
                <th className="pb-3 px-4 font-bold">ชื่อหนังสือ</th>
                <th className="pb-3 px-4 font-bold">หมวดหมู่</th>
                <th className="pb-3 px-4 font-bold text-right">ราคา</th>
                <th className="pb-3 px-4 font-bold text-right">คงเหลือ</th>
                <th className="pb-3 px-4 font-bold text-center">สถานะ</th>
                <th className="pb-3 px-4 font-bold text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e5e0]">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-white/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-[#a09c92]">{book.id}</td>
                  <td className="py-4 px-4">
                    <img
                      src={book.image || FALLBACK_BOOK_IMAGE}
                      alt={book.title}
                      className="w-12 h-16 rounded-md object-cover border border-[#e6e5e0]"
                    />
                  </td>
                  <td className="py-4 px-4 font-bold text-[#1A1A1A]">{book.title}</td>
                  <td className="py-4 px-4 text-sm text-[#1A1A1A]">{book.category}</td>
                  <td className="py-4 px-4 text-sm font-bold text-[#C8861A] text-right">฿{Number(book.price).toLocaleString('th-TH')}</td>
                  <td className="py-4 px-4 font-black text-[#1A1A1A] text-right">{book.stock}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${getStatusColor(book.status)}`}>
                      {book.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingBook(book);
                        setNewStock(book.stock.toString());
                        setShowUpdateStockModal(true);
                      }}
                      className="px-3 py-1.5 text-xs font-bold bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-lg transition-colors"
                    >
                      อัปเดตสต๊อก
                    </button>
                    {userRole === 'admin' && (
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="px-3 py-1.5 text-xs font-bold bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors"
                      >
                        ลบ
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredBooks.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-sm text-[#a09c92]">
                    ไม่พบหนังสือตามเงื่อนไขที่เลือก
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showUpdateStockModal && editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowUpdateStockModal(false)}>
          <div className="bg-[#FDFBF7] rounded-4xl w-full max-w-md shadow-xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#e6e5e0] flex justify-between items-center bg-white">
              <h3 className="text-xl font-bold text-[#1A1A1A]">อัปเดตสต๊อกสินค้า</h3>
              <button onClick={() => setShowUpdateStockModal(false)} className="text-[#a09c92] hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 bg-white space-y-4">
              <div>
                <p className="text-sm text-[#a09c92] mb-1">ชื่อหนังสือ</p>
                <p className="font-bold text-[#1A1A1A] text-lg">{editingBook.title}</p>
                <p className="text-xs text-[#a09c92] mt-1">รหัส: {editingBook.id}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">จำนวนสต๊อกปัจจุบัน: {editingBook.stock}</label>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-bold text-[#1A1A1A]">จำนวนใหม่:</label>
                  <input
                    type="number"
                    min="0"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="flex-1 px-4 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-[#1A1A1A] font-bold text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#e6e5e0] bg-white flex justify-end gap-3">
              <button
                onClick={() => setShowUpdateStockModal(false)}
                className="px-5 py-2.5 bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-xl font-bold transition-colors text-sm"
              >
                ยกเลิก
              </button>
              <button
                onClick={async () => {
                  const stockNum = parseInt(newStock, 10) || 0;
                  const success = await runCatalogAction('book:update', {
                    id: editingBook.id,
                    book: {
                      title: editingBook.title,
                      author: editingBook.author || '',
                      publisher: editingBook.publisher || '',
                      category: editingBook.category || '',
                      isbn: editingBook.isbn || '',
                      pages: editingBook.pages || '',
                      description: editingBook.description || '',
                      price: editingBook.price,
                      stock: stockNum,
                    },
                  });

                  if (success) {
                    setShowUpdateStockModal(false);
                  }
                }}
                className="px-5 py-2.5 bg-primary hover:bg-[#b07515] text-white rounded-xl font-bold transition-colors text-sm"
              >
                บันทึกสต๊อก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

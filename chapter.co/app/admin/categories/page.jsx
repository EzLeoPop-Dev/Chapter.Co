"use client";
import React, { useMemo, useState, useEffect } from 'react';

const EMPTY_BOOK_FORM = {
  title: '',
  author: '',
  publisher: '',
  category: '',
  isbn: '',
  pages: '',
  description: '',
  price: '',
  stock: '',
};

export default function AdminCategoriesPage() {
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [bookCategoryFilter, setBookCategoryFilter] = useState('ทั้งหมด');
  
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedBooksForCategory, setSelectedBooksForCategory] = useState([]);

  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);
  const [bookFormData, setBookFormData] = useState(EMPTY_BOOK_FORM);

  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [showAddPublisherModal, setShowAddPublisherModal] = useState(false);
  const [editingPublisherId, setEditingPublisherId] = useState(null);
  const [newPublisherName, setNewPublisherName] = useState('');
  const [selectedBooksForPublisher, setSelectedBooksForPublisher] = useState([]);

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState('');

  useEffect(() => {
    const loadCatalog = async () => {
      setIsSyncing(true);
      setSyncError('');
      try {
        const response = await fetch('/api/admin/catalog');
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || 'โหลดข้อมูลไม่สำเร็จ');
        }

        setBooks(data.books || []);
        setCategories(data.categories || []);
        setPublishers(data.publishers || []);
      } catch (error) {
        console.error('Load catalog error:', error);
        setSyncError(error.message || 'โหลดข้อมูลไม่สำเร็จ');
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
      setPublishers(data.publishers || []);
      return true;
    } catch (error) {
      console.error('Catalog action error:', error);
      setSyncError(error.message || 'อัปเดตข้อมูลไม่สำเร็จ');
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-700';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-700';
      case 'Out of Stock': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const booksInCategory = selectedCategory ? books.filter(b => b.category === selectedCategory.name) : [];
  const booksInPublisher = selectedPublisher ? books.filter(b => b.publisher === selectedPublisher.name) : [];
  const filteredBooks = useMemo(() => {
    const normalizedQuery = bookSearchQuery.trim().toLowerCase();
    return books.filter((book) => {
      const matchesQuery =
        !normalizedQuery ||
        book.title.toLowerCase().includes(normalizedQuery) ||
        String(book.id).toLowerCase().includes(normalizedQuery) ||
        (book.author || '').toLowerCase().includes(normalizedQuery);
      const matchesCategory = bookCategoryFilter === 'ทั้งหมด' || book.category === bookCategoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [books, bookSearchQuery, bookCategoryFilter]);

  const openBookEditor = (book) => {
    setEditingBookId(book.id);
    setBookFormData({
      title: book.title || '',
      author: book.author || '',
      publisher: book.publisher || '',
      category: book.category || '',
      isbn: book.isbn || '',
      pages: book.pages || '',
      description: book.description || '',
      price: book.price || '',
      stock: book.stock || '',
    });
    setSelectedCategory(null);
    setSelectedPublisher(null);
    setShowAddBookModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">จัดการหนังสือและหมวดหมู่</h2>
          <p className="text-[#a09c92] text-sm">เพิ่ม แก้ไข หรือลบหนังสือ หมวดหมู่ และสำนักพิมพ์ในระบบ</p>
        </div>
      </div>

      {(isSyncing || syncError) && (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${syncError ? 'border-red-200 bg-red-50 text-red-600' : 'border-[#e6e5e0] bg-white/70 text-[#a09c92]'}`}>
          {syncError ? syncError : 'กำลังอัปเดตข้อมูลผ่าน API...'}
        </div>
      )}

      <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-sm border border-white/80 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#e6e5e0] overflow-x-auto scrollbar-hide bg-white/40">
          {[
            { key: 'categories', label: 'หมวดหมู่ (Categories)' },
            { key: 'publishers', label: 'สำนักพิมพ์ (Publishers)' },
            { key: 'books', label: 'หนังสือทั้งหมด (Books)' }
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

        <div className="p-6">
          {/* TAB: CATEGORIES */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#1A1A1A]">หมวดหมู่ทั้งหมด</h3>
                <button 
                  onClick={() => {
                    setEditingCategoryId(null);
                    setNewCategoryName('');
                    setSelectedBooksForCategory([]);
                    setShowAddCategoryModal(true);
                  }}
                  className="text-sm font-bold text-white bg-primary hover:bg-[#b07515] px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  + เพิ่มหมวดหมู่
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => (
                  <div 
                    key={cat.id} 
                    onClick={() => setSelectedCategory(cat)}
                    className="p-5 bg-white border border-[#e6e5e0] rounded-2xl hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-[#1A1A1A] text-lg group-hover:text-primary transition-colors">{cat.name}</span>
                      <div className="space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="text-xs p-1.5 bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-lg" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setEditingCategoryId(cat.id);
                            setNewCategoryName(cat.name);
                            setSelectedBooksForCategory(books.filter(b => b.category === cat.name).map(b => b.id));
                            setShowAddCategoryModal(true);
                          }}
                        >
                          แก้ไข
                        </button>
                        <button
                          className="text-xs p-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg"
                          onClick={async (e) => {
                            e.stopPropagation();
                            const ok = window.confirm(`ลบหมวดหมู่ "${cat.name}" ? หนังสือในหมวดนี้จะถูกย้ายไป "ไม่มีหมวดหมู่"`);
                            if (!ok) return;
                            await runCatalogAction('category:delete', { name: cat.name });
                            if (selectedCategory?.id === cat.id) {
                              setSelectedCategory(null);
                            }
                          }}
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                    <span className="text-sm text-[#a09c92] font-medium">{cat.count} เล่มในหมวดนี้</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PUBLISHERS */}
          {activeTab === 'publishers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#1A1A1A]">สำนักพิมพ์ทั้งหมด</h3>
                <button 
                  onClick={() => {
                    setEditingPublisherId(null);
                    setNewPublisherName('');
                    setSelectedBooksForPublisher([]);
                    setShowAddPublisherModal(true);
                  }}
                  className="text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  + เพิ่มสำนักพิมพ์
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publishers.map(pub => (
                  <div 
                    key={pub.id} 
                    onClick={() => setSelectedPublisher(pub)}
                    className="p-5 bg-white border border-[#e6e5e0] rounded-2xl hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-[#1A1A1A] text-lg group-hover:text-purple-600 transition-colors">{pub.name}</span>
                      <div className="space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="text-xs p-1.5 bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-lg" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setEditingPublisherId(pub.id);
                            setNewPublisherName(pub.name);
                            setSelectedBooksForPublisher(books.filter(b => b.publisher === pub.name).map(b => b.id));
                            setShowAddPublisherModal(true);
                          }}
                        >
                          แก้ไข
                        </button>
                        <button
                          className="text-xs p-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg"
                          onClick={async (e) => {
                            e.stopPropagation();
                            const ok = window.confirm(`ลบสำนักพิมพ์ "${pub.name}" ? หนังสือของสำนักพิมพ์นี้จะถูกย้ายไป "ไม่มีสำนักพิมพ์"`);
                            if (!ok) return;
                            await runCatalogAction('publisher:delete', { name: pub.name });
                            if (selectedPublisher?.id === pub.id) {
                              setSelectedPublisher(null);
                            }
                          }}
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                    <span className="text-sm text-[#a09c92] font-medium">{pub.count} เล่ม</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: BOOKS */}
          {activeTab === 'books' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={bookSearchQuery}
                    onChange={(e) => setBookSearchQuery(e.target.value)}
                    placeholder="ค้นหาชื่อหนังสือ / รหัส / ผู้แต่ง..."
                    className="px-4 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-sm w-64"
                  />
                  <select
                    value={bookCategoryFilter}
                    onChange={(e) => setBookCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none text-sm bg-white"
                  >
                    <option value="ทั้งหมด">ทุกหมวดหมู่</option>
                    {categories.map(c => <option key={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <button 
                  onClick={() => {
                    setEditingBookId(null);
                    setBookFormData(EMPTY_BOOK_FORM);
                    setShowAddBookModal(true);
                  }}
                  className="text-sm font-bold text-white bg-primary hover:bg-[#b07515] px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  + เพิ่มหนังสือใหม่
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e6e5e0] text-sm text-[#a09c92]">
                      <th className="pb-3 px-4 font-bold">รหัส</th>
                      <th className="pb-3 px-4 font-bold">ชื่อหนังสือ</th>
                      <th className="pb-3 px-4 font-bold">หมวดหมู่</th>
                      <th className="pb-3 px-4 font-bold">สำนักพิมพ์</th>
                      <th className="pb-3 px-4 font-bold text-right">ราคา</th>
                      <th className="pb-3 px-4 font-bold text-right">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6e5e0]">
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-white/50 transition-colors">
                        <td className="py-4 px-4 text-sm font-medium text-[#a09c92]">{book.id}</td>
                        <td className="py-4 px-4 font-bold text-[#1A1A1A]">{book.title}</td>
                        <td className="py-4 px-4 text-sm text-[#1A1A1A]">{book.category}</td>
                        <td className="py-4 px-4 text-sm text-[#1A1A1A]">{book.publisher}</td>
                        <td className="py-4 px-4 text-sm font-bold text-[#C8861A] text-right">฿{Number(book.price).toLocaleString('th-TH')}</td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button 
                            onClick={() => {
                              setEditingBookId(book.id);
                              setBookFormData({
                                title: book.title || '',
                                author: book.author || '',
                                publisher: book.publisher || '',
                                category: book.category || '',
                                isbn: book.isbn || '',
                                pages: book.pages || '',
                                description: book.description || '',
                                price: book.price || '',
                                stock: book.stock || ''
                              });
                              setShowAddBookModal(true);
                            }}
                            className="px-3 py-1.5 text-xs font-bold bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-lg transition-colors"
                          >
                            แก้ไข
                          </button>
                          <button
                            onClick={async () => {
                              await runCatalogAction('book:delete', { id: book.id });
                            }}
                            className="px-3 py-1.5 text-xs font-bold bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors"
                          >
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredBooks.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-sm text-[#a09c92]">
                          ไม่พบหนังสือตามเงื่อนไขที่เลือก
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Books Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedCategory(null)}>
          <div className="bg-[#FDFBF7] rounded-[2rem] w-full max-w-3xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#e6e5e0] flex justify-between items-center bg-white">
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">หนังสือในหมวด: {selectedCategory.name}</h3>
                <p className="text-sm text-[#a09c92]">พบทั้งหมด {booksInCategory.length} รายการ (จากทั้งหมด {selectedCategory.count} เล่ม)</p>
              </div>
              <button onClick={() => setSelectedCategory(null)} className="text-[#a09c92] hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-white">
              {booksInCategory.length > 0 ? (
                <div className="space-y-3">
                  {booksInCategory.map((book) => (
                    <div key={book.id} className="flex justify-between items-center p-4 border border-[#e6e5e0] rounded-xl hover:border-primary transition-colors">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-16 bg-[#F2EEE7] rounded-md flex items-center justify-center text-xs text-[#a09c92] font-bold">
                          ปก
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1A1A1A]">{book.title}</h4>
                          <p className="text-sm text-[#a09c92]">รหัส: {book.id} • สำนักพิมพ์: {book.publisher}</p>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(book.status)}`}>
                              {book.status}
                            </span>
                            <span className="ml-2 text-xs font-bold text-[#C8861A]">฿{book.price}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => openBookEditor(book)}
                        className="px-3 py-1.5 text-xs font-bold bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-lg transition-colors"
                      >
                        จัดการ
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[#a09c92]">
                  <p>ยังไม่มีหนังสือในหมวดหมู่นี้ หรือไม่ได้อยู่ในข้อมูลทดสอบ</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[#e6e5e0] bg-white flex justify-end">
              <button 
                onClick={() => setSelectedCategory(null)} 
                className="px-5 py-2.5 bg-[#F2EEE7] hover:bg-[#e6e5e0] text-[#1A1A1A] rounded-xl font-bold transition-colors text-sm"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddCategoryModal(false)}>
          <div className="bg-[#FDFBF7] rounded-[2rem] w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#e6e5e0] flex justify-between items-center bg-white">
              <h3 className="text-xl font-bold text-[#1A1A1A]">
                {editingCategoryId ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่ใหม่'}
              </h3>
              <button onClick={() => setShowAddCategoryModal(false)} className="text-[#a09c92] hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-white space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">ชื่อหมวดหมู่ <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="เช่น การ์ตูนมังงะ..." 
                  className="w-full px-4 py-3 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-[#1A1A1A]" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">เลือกหนังสือเข้าหมวดหมู่นี้</label>
                <div className="border border-[#e6e5e0] rounded-xl max-h-60 overflow-y-auto divide-y divide-[#e6e5e0]">
                  {books.map(book => (
                    <label key={book.id} className="flex items-center gap-3 p-3 hover:bg-[#F2EEE7] cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-[#e6e5e0] text-primary focus:ring-primary"
                        checked={selectedBooksForCategory.includes(book.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBooksForCategory([...selectedBooksForCategory, book.id]);
                          } else {
                            setSelectedBooksForCategory(selectedBooksForCategory.filter(id => id !== book.id));
                          }
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-bold text-[#1A1A1A] text-sm">{book.title}</p>
                        <p className="text-xs text-[#a09c92]">{book.category} • {book.publisher}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-[#a09c92] mt-2">เลือกแล้ว {selectedBooksForCategory.length} เล่ม</p>
              </div>
            </div>
            
            <div className="p-4 border-t border-[#e6e5e0] bg-white flex justify-end gap-3">
              <button 
                onClick={() => setShowAddCategoryModal(false)} 
                className="px-5 py-2.5 bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-xl font-bold transition-colors text-sm"
              >
                ยกเลิก
              </button>
              <button 
                onClick={async () => {
                  const normalizedName = newCategoryName.trim();
                  if (!normalizedName) return;

                  let success = false;
                  if (editingCategoryId) {
                    const oldCat = categories.find((c) => c.id === editingCategoryId);
                    success = await runCatalogAction('category:update', {
                      oldName: oldCat?.name,
                      newName: normalizedName,
                      bookIds: selectedBooksForCategory,
                    });
                  } else {
                    success = await runCatalogAction('category:create', {
                      name: normalizedName,
                      bookIds: selectedBooksForCategory,
                    });
                  }

                  if (success) {
                    setShowAddCategoryModal(false);
                    setEditingCategoryId(null);
                    setNewCategoryName('');
                    setSelectedBooksForCategory([]);
                  }
                }} 
                className={`px-5 py-2.5 rounded-xl font-bold transition-colors text-sm ${newCategoryName ? 'bg-primary hover:bg-[#b07515] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                disabled={!newCategoryName}
              >
                บันทึกหมวดหมู่
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Book Modal */}
      {showAddBookModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddBookModal(false)}>
          <div className="bg-[#FDFBF7] rounded-[2rem] w-full max-w-4xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#e6e5e0] flex justify-between items-center bg-white">
              <h3 className="text-xl font-bold text-[#1A1A1A]">
                {editingBookId ? 'แก้ไขข้อมูลหนังสือ' : 'เพิ่มหนังสือใหม่'}
              </h3>
              <button onClick={() => setShowAddBookModal(false)} className="text-[#a09c92] hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-white space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-[#1A1A1A] border-b border-[#e6e5e0] pb-2">ข้อมูลทั่วไป</h4>
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-1">ชื่อหนังสือ <span className="text-red-500">*</span></label>
                    <input type="text" value={bookFormData.title} onChange={e => setBookFormData({...bookFormData, title: e.target.value})} className="w-full px-3 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-1">ผู้แต่ง</label>
                    <input type="text" value={bookFormData.author} onChange={e => setBookFormData({...bookFormData, author: e.target.value})} className="w-full px-3 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-1">สำนักพิมพ์</label>
                      <select value={bookFormData.publisher} onChange={e => setBookFormData({...bookFormData, publisher: e.target.value})} className="w-full px-3 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-sm bg-white">
                        <option value="">เลือก...</option>
                        {publishers.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-1">หมวดหมู่</label>
                      <select value={bookFormData.category} onChange={e => setBookFormData({...bookFormData, category: e.target.value})} className="w-full px-3 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-sm bg-white">
                        <option value="">เลือก...</option>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-[#1A1A1A] border-b border-[#e6e5e0] pb-2">รายละเอียด & การขาย</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-1">ISBN</label>
                      <input type="text" value={bookFormData.isbn} onChange={e => setBookFormData({...bookFormData, isbn: e.target.value})} className="w-full px-3 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-1">จำนวนหน้า</label>
                      <input type="number" value={bookFormData.pages} onChange={e => setBookFormData({...bookFormData, pages: e.target.value})} className="w-full px-3 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-1">ราคา (บาท) <span className="text-red-500">*</span></label>
                      <input type="number" value={bookFormData.price} onChange={e => setBookFormData({...bookFormData, price: e.target.value})} className="w-full px-3 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-1">สต็อกเริ่มต้น</label>
                      <input type="number" value={bookFormData.stock} onChange={e => setBookFormData({...bookFormData, stock: e.target.value})} className="w-full px-3 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-1">รายละเอียดเรื่องย่อ</label>
                    <textarea rows="3" value={bookFormData.description} onChange={e => setBookFormData({...bookFormData, description: e.target.value})} className="w-full px-3 py-2 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-primary text-sm resize-none"></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-[#e6e5e0] bg-white flex justify-end gap-3">
              <button onClick={() => setShowAddBookModal(false)} className="px-5 py-2.5 bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-xl font-bold transition-colors text-sm">
                ยกเลิก
              </button>
              <button 
                onClick={async () => {
                  if (!(bookFormData.title && bookFormData.price)) return;

                  let success = false;
                  if (editingBookId) {
                    success = await runCatalogAction('book:update', {
                      id: editingBookId,
                      book: bookFormData,
                    });
                  } else {
                    success = await runCatalogAction('book:create', {
                      book: bookFormData,
                    });
                  }

                  if (success) {
                    setShowAddBookModal(false);
                    setBookFormData(EMPTY_BOOK_FORM);
                    setEditingBookId(null);
                  }
                }} 
                className={`px-5 py-2.5 rounded-xl font-bold transition-colors text-sm ${(bookFormData.title && bookFormData.price) ? 'bg-primary hover:bg-[#b07515] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                disabled={!(bookFormData.title && bookFormData.price)}
              >
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publisher Books Modal */}
      {selectedPublisher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedPublisher(null)}>
          <div className="bg-[#FDFBF7] rounded-[2rem] w-full max-w-3xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#e6e5e0] flex justify-between items-center bg-white">
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">หนังสือสำนักพิมพ์: {selectedPublisher.name}</h3>
                <p className="text-sm text-[#a09c92]">พบทั้งหมด {booksInPublisher.length} รายการ (จากทั้งหมด {selectedPublisher.count} เล่ม)</p>
              </div>
              <button onClick={() => setSelectedPublisher(null)} className="text-[#a09c92] hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-white">
              {booksInPublisher.length > 0 ? (
                <div className="space-y-3">
                  {booksInPublisher.map((book) => (
                    <div key={book.id} className="flex justify-between items-center p-4 border border-[#e6e5e0] rounded-xl hover:border-purple-500 transition-colors">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-16 bg-[#F2EEE7] rounded-md flex items-center justify-center text-xs text-[#a09c92] font-bold">
                          ปก
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1A1A1A]">{book.title}</h4>
                          <p className="text-sm text-[#a09c92]">รหัส: {book.id} • หมวดหมู่: {book.category}</p>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(book.status)}`}>
                              {book.status}
                            </span>
                            <span className="ml-2 text-xs font-bold text-[#C8861A]">฿{book.price}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => openBookEditor(book)}
                        className="px-3 py-1.5 text-xs font-bold bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-lg transition-colors"
                      >
                        จัดการ
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[#a09c92]">
                  <p>ยังไม่มีหนังสือในสำนักพิมพ์นี้ หรือไม่ได้อยู่ในข้อมูลทดสอบ</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[#e6e5e0] bg-white flex justify-end">
              <button 
                onClick={() => setSelectedPublisher(null)} 
                className="px-5 py-2.5 bg-[#F2EEE7] hover:bg-[#e6e5e0] text-[#1A1A1A] rounded-xl font-bold transition-colors text-sm"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Publisher Modal */}
      {showAddPublisherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddPublisherModal(false)}>
          <div className="bg-[#FDFBF7] rounded-[2rem] w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#e6e5e0] flex justify-between items-center bg-white">
              <h3 className="text-xl font-bold text-[#1A1A1A]">
                {editingPublisherId ? 'แก้ไขสำนักพิมพ์' : 'เพิ่มสำนักพิมพ์ใหม่'}
              </h3>
              <button onClick={() => setShowAddPublisherModal(false)} className="text-[#a09c92] hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-white space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">ชื่อสำนักพิมพ์ <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={newPublisherName}
                  onChange={(e) => setNewPublisherName(e.target.value)}
                  placeholder="เช่น Phoenix, WeLearn..." 
                  className="w-full px-4 py-3 border border-[#e6e5e0] rounded-xl focus:outline-none focus:border-purple-600 text-[#1A1A1A]" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">เลือกหนังสือของสำนักพิมพ์นี้</label>
                <div className="border border-[#e6e5e0] rounded-xl max-h-60 overflow-y-auto divide-y divide-[#e6e5e0]">
                  {books.map(book => (
                    <label key={book.id} className="flex items-center gap-3 p-3 hover:bg-[#F2EEE7] cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-[#e6e5e0] text-purple-600 focus:ring-purple-600"
                        checked={selectedBooksForPublisher.includes(book.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBooksForPublisher([...selectedBooksForPublisher, book.id]);
                          } else {
                            setSelectedBooksForPublisher(selectedBooksForPublisher.filter(id => id !== book.id));
                          }
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-bold text-[#1A1A1A] text-sm">{book.title}</p>
                        <p className="text-xs text-[#a09c92]">{book.category} • {book.publisher}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-[#a09c92] mt-2">เลือกแล้ว {selectedBooksForPublisher.length} เล่ม</p>
              </div>
            </div>
            
            <div className="p-4 border-t border-[#e6e5e0] bg-white flex justify-end gap-3">
              <button 
                onClick={() => setShowAddPublisherModal(false)} 
                className="px-5 py-2.5 bg-[#F2EEE7] hover:bg-gray-200 text-[#1A1A1A] rounded-xl font-bold transition-colors text-sm"
              >
                ยกเลิก
              </button>
              <button 
                onClick={async () => {
                  const normalizedName = newPublisherName.trim();
                  if (!normalizedName) return;

                  let success = false;
                  if (editingPublisherId) {
                    const oldPub = publishers.find((p) => p.id === editingPublisherId);
                    success = await runCatalogAction('publisher:update', {
                      oldName: oldPub?.name,
                      newName: normalizedName,
                      bookIds: selectedBooksForPublisher,
                    });
                  } else {
                    success = await runCatalogAction('publisher:create', {
                      name: normalizedName,
                      bookIds: selectedBooksForPublisher,
                    });
                  }

                  if (success) {
                    setShowAddPublisherModal(false);
                    setEditingPublisherId(null);
                    setNewPublisherName('');
                    setSelectedBooksForPublisher([]);
                  }
                }} 
                className={`px-5 py-2.5 rounded-xl font-bold transition-colors text-sm ${newPublisherName ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                disabled={!newPublisherName}
              >
                บันทึกสำนักพิมพ์
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

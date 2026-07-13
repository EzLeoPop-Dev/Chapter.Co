import React from 'react';
import Link from 'next/link';
import CustomDropdown from './CustomDropdown';
import MultiSelectDropdown from './MultiSelectDropdown';

export default function ShopHeader({ 
  searchQuery, setSearchQuery, 
  categories, selectedCategory, setSelectedCategory,
  bookTypes, selectedBookTypes, setSelectedBookTypes,
  publishers, selectedPublisher, setSelectedPublisher
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="lg:hidden flex items-center space-x-4">
        <Link href="/" className="p-3 bg-white/60 hover:bg-white rounded-full shadow-sm backdrop-blur-sm transition-all text-[#1A1A1A]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </Link>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">เลือกซื้อหนังสือ</h1>
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-96 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a09c92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-focus-within:text-primary transition-colors"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหาชื่อหนังสือ, ผู้แต่ง..." 
          className="w-full pl-12 pr-4 py-4 bg-white/70 border border-white/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-sm placeholder-[#a09c92] text-[#1A1A1A] font-medium"
        />
      </div>

      {/* Mobile Category Dropdown */}
      <div className="w-full md:hidden flex flex-col space-y-4">
        <CustomDropdown 
          options={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="หนังสือทั้งหมด"
        />

        <MultiSelectDropdown 
          options={bookTypes}
          selectedValues={selectedBookTypes}
          onChange={setSelectedBookTypes}
          placeholder="ประเภททั้งหมด"
        />

        <CustomDropdown 
          options={publishers}
          value={selectedPublisher}
          onChange={setSelectedPublisher}
          placeholder="ทุกสำนักพิมพ์"
        />
      </div>
    </div>
  );
}

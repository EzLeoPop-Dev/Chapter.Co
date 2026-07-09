import React from 'react';
import CustomDropdown from './CustomDropdown';
import MultiSelectDropdown from './MultiSelectDropdown';

export default function CategorySidebar({ 
  categories, selectedCategory, setSelectedCategory,
  bookTypes, selectedBookTypes, setSelectedBookTypes,
  publishers, selectedPublisher, setSelectedPublisher
}) {
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-sm mr-6 overflow-hidden">
      <div className="p-8 pb-4">
        <h2 className="text-xl font-bold text-[#26251e] mb-6 flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f54e00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          หมวดหมู่หนังสือ
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto px-6 pb-8" style={{ scrollbarWidth: 'none' }}>
        {/* Category Filter */}
        <div className="mb-6">
          <CustomDropdown 
            label="หมวดหมู่"
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="หนังสือทั้งหมด"
          />
        </div>

        {/* Book Type Filter (Multi-Select) */}
        <div className="mb-6">
          <MultiSelectDropdown 
            label="ประเภทหนังสือ"
            options={bookTypes}
            selectedValues={selectedBookTypes}
            onChange={setSelectedBookTypes}
            placeholder="ประเภททั้งหมด"
          />
        </div>

        {/* Publisher Filter */}
        <div className="mb-8">
          <CustomDropdown 
            label="สำนักพิมพ์"
            options={publishers}
            value={selectedPublisher}
            onChange={setSelectedPublisher}
            placeholder="ทุกสำนักพิมพ์"
          />
        </div>

      </div>
    </aside>
  );
}

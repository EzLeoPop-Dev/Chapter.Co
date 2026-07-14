import React, { useEffect, useState } from 'react';

export default function CategorySidebar({ 
  categories, selectedCategory, setSelectedCategory,
  bookTypes, selectedBookTypes, setSelectedBookTypes,
  publishers, selectedPublisher, setSelectedPublisher,
  priceMin, setPriceMin,
  priceMax, setPriceMax
}) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [priceMinDraft, setPriceMinDraft] = useState(priceMin);
  const [priceMaxDraft, setPriceMaxDraft] = useState(priceMax);

  useEffect(() => {
    setPriceMinDraft(priceMin);
  }, [priceMin]);

  useEffect(() => {
    setPriceMaxDraft(priceMax);
  }, [priceMax]);

  // We'll use the actual `categories` prop to render the list instead of mocked data


  const handleCategoryToggle = (catName) => {
    if (selectedCategory === catName) {
      setSelectedCategory('All');
    } else {
      setSelectedCategory(catName);
    }
  };

  const handleFormatToggle = (format) => {
    if (selectedBookTypes.includes(format)) {
      setSelectedBookTypes(selectedBookTypes.filter(t => t !== format));
    } else {
      setSelectedBookTypes([...selectedBookTypes, format]);
    }
  };

  const clearAll = () => {
    setSelectedCategory('All');
    setSelectedBookTypes([]);
    setSelectedPublisher('All');
    setPriceMin('');
    setPriceMax('');
    setPriceMinDraft('');
    setPriceMaxDraft('');
  };

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col h-full bg-[#FAFAF8] border border-[#e6e5e0] rounded-2xl shadow-sm mr-6 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[20px] font-black text-[#1A1A1A]">ตัวกรอง</h2>
          <button onClick={clearAll} className="text-[12px] font-medium text-[#807d72] hover:text-primary underline">ล้างทั้งหมด</button>
        </div>
        <div className="w-full h-px bg-[#e6e5e0] mb-5"></div>
        
        {/* Category Filter (Accordion Style) */}
        <div className="mb-6">
          <button 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)} 
            className="w-full bg-[#f5f5f5] hover:bg-[#e6e5e0] transition-colors rounded-xl p-3 flex justify-between items-center mb-4"
          >
            <h3 className="font-bold text-[14px] text-[#1A1A1A]">หมวดหมู่สินค้า</h3>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          
          {isCategoryOpen && (
            <div className="px-2">
              <button className="flex items-center text-[14px] font-bold text-[#1A1A1A] mb-3 hover:text-primary transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><polyline points="15 18 9 12 15 6"></polyline></svg>
                หนังสือ
              </button>
              
              <div className="space-y-1 ml-7 max-h-56 overflow-y-auto pr-2">
                {categories.map((cat, idx) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button 
                      key={idx} 
                      onClick={() => handleCategoryToggle(cat)}
                      className={`w-full flex justify-between items-center py-2.5 text-[13px] transition-colors text-left group ${isSelected ? 'text-primary font-bold' : 'text-[#5a5852] hover:text-primary font-medium'}`}
                    >
                      <span className="truncate pr-4">{cat}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isSelected ? 'text-primary' : 'text-[#d0cdc5] group-hover:text-primary'}`}><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="w-full h-px bg-[#e6e5e0] mb-5"></div>

        {/* Book Type Filter */}
        <div className="mb-6">
          <h3 className="font-bold text-[14px] text-[#1A1A1A] mb-3">ประเภท</h3>
          <div className="flex flex-wrap gap-2">
            {bookTypes.filter((type) => type !== 'All').map((type) => {
              const isSelected = selectedBookTypes.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => handleFormatToggle(type)}
                  className={`px-4 py-1 rounded-full text-[12px] font-bold transition-colors border ${isSelected ? 'border-[#C8861A] text-[#C8861A] bg-transparent' : 'border-[#e6e5e0] text-[#807d72] bg-white hover:border-[#C8861A]'}`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-[#e6e5e0] mb-5"></div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-bold text-[14px] text-[#1A1A1A] mb-3">ช่วงราคา</h3>
          <div className="flex items-center justify-between gap-2 mb-3">
            <input 
              type="number"
              min="0"
              placeholder="ต่ำสุด" 
              value={priceMinDraft}
              onChange={(e) => setPriceMinDraft(e.target.value)}
              className="w-full border border-[#e6e5e0] rounded-lg px-2 py-1.5 text-[12px] text-center focus:outline-none focus:border-[#C8861A] focus:ring-1 focus:ring-[#C8861A]"
            />
            <span className="text-[#a09c92] text-[12px]">-</span>
            <input 
              type="number"
              min="0"
              placeholder="สูงสุด" 
              value={priceMaxDraft}
              onChange={(e) => setPriceMaxDraft(e.target.value)}
              className="w-full border border-[#e6e5e0] rounded-lg px-2 py-1.5 text-[12px] text-center focus:outline-none focus:border-[#C8861A] focus:ring-1 focus:ring-[#C8861A]"
            />
          </div>
          <button
            onClick={() => {
              setPriceMin(priceMinDraft);
              setPriceMax(priceMaxDraft);
            }}
            className="w-full bg-[#E8E6E1] text-[#1A1A1A] font-bold text-[13px] py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            ยืนยันช่วงราคา
          </button>
        </div>

        <div className="w-full h-px bg-[#e6e5e0]"></div>

      </div>
    </aside>
  );
}

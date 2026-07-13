"use client";
import React, { useState, useRef, useEffect } from 'react';

export default function CustomDropdown({ options, value, onChange, placeholder, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && <h3 className="text-[13px] font-bold text-[#a09c92] uppercase tracking-wider mb-2 px-2">{label}</h3>}
      
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 bg-white/80 backdrop-blur-md border border-white rounded-2xl flex justify-between items-center text-[#1A1A1A] font-medium shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary group"
      >
        <span className={value === 'All' ? 'text-[#a09c92]' : 'text-[#C8861A] font-bold'}>
          {value === 'All' ? placeholder : value}
        </span>
        <svg 
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-[#a09c92] group-hover:text-primary'}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <div className={`absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}`}>
        <div className="max-h-60 overflow-y-auto scrollbar-hide p-2" style={{ scrollbarWidth: 'none' }}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-between ${
                value === opt 
                ? 'bg-gradient-to-r from-primary to-primary text-white shadow-md' 
                : 'text-[#1A1A1A] hover:bg-orange-50 hover:text-[#C8861A]'
              }`}
            >
              {opt === 'All' ? placeholder : opt}
              {value === opt && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function SectionTitle({ title, subtitle }) {
    return (
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between">
            <div>
                <div className="flex items-center mb-2">
                    <h2 className="text-2xl font-extrabold text-slate-800 mr-4">{title}</h2>
                    <div className="hidden sm:block w-32 h-px bg-gradient-to-r from-orange-300 to-transparent"></div>
                </div>
                {subtitle && <p className="text-sm text-slate-500 font-light">{subtitle}</p>}
            </div>
            <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 mt-2 md:mt-0 flex items-center group transition-colors">
                ดูทั้งหมด
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
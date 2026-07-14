"use client";
import React, { useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { books } from '../../data/books';

const parseReviews = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return 0;

  const normalized = String(value).trim().toLowerCase().replace(/,/g, '');
  if (normalized.endsWith('k')) {
    const num = Number(normalized.slice(0, -1));
    return Number.isNaN(num) ? 0 : num * 1000;
  }

  const num = Number(normalized);
  return Number.isNaN(num) ? 0 : num;
};

export default function RecommendedBooksPage() {
  const recommendedBooks = useMemo(() => {
    return [...books]
      .sort((a, b) => {
        const ratingDiff = Number(b.rating || 0) - Number(a.rating || 0);
        if (ratingDiff !== 0) return ratingDiff;
        return parseReviews(b.reviews) - parseReviews(a.reviews);
      })
      .slice(0, 12);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2EEE7] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] p-4 md:p-8 overflow-hidden relative selection:bg-[#C8861A] selection:text-white">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-tertiary rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Navbar />

        <section className="rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm p-6 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-[#C8861A] text-[11px] font-bold tracking-wider uppercase mb-3">
                Chapter Picks
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A] leading-tight">หนังสือแนะนำประจำสัปดาห์</h1>
              <p className="text-[#807d72] mt-2">คัดจากคะแนนรีวิวสูงและกระแสการอ่านล่าสุด รวม {recommendedBooks.length} เล่ม</p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              ไปหน้าร้านหนังสือ
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
          {recommendedBooks.map((book) => (
            <Link
              key={book.id}
              href={`/shop/${book.id}`}
              className="bg-white/70 backdrop-blur-sm border border-white/80 rounded-3xl p-5 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative h-64 mb-5 rounded-2xl overflow-hidden shadow-md">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-bold text-primary uppercase tracking-wider">
                  {book.category}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-[12px] text-[#807d72] font-medium">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#C8861A" stroke="#C8861A" className="mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <span className="text-[#1A1A1A] mr-1 font-bold">{book.rating}</span>
                  <span>({book.reviews})</span>
                </div>
                <h3 className="font-bold text-[18px] text-[#1A1A1A] leading-tight group-hover:text-[#C8861A] transition-colors line-clamp-2">{book.title}</h3>
                <p className="text-[#1A1A1A] text-[14px] font-medium line-clamp-1">{book.author}</p>
                <div className="pt-3 border-t border-[#e6e5e0] flex justify-between items-center">
                  <span className="text-xl font-bold text-[#C8861A]">฿{Number(book.price || 0).toFixed(2)}</span>
                  <span className="text-xs font-bold text-[#a09c92]">ดูรายละเอียด</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

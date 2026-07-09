"use client";
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { books } from '../../../data/books';
import Navbar from '../../../components/Navbar';

export default function BookDetailPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [activeTab, setActiveTab] = useState('synopsis');
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      const foundBook = books.find(b => b.id.toString() === id);
      setBook(foundBook);
      
      if (foundBook) {
        const similar = books.filter(b => b.category === foundBook.category && b.id !== foundBook.id).slice(0, 4);
        setSimilarBooks(similar);
      }
    }
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#f7f7f4] flex flex-col">
        <div className="max-w-7xl mx-auto w-full p-4 md:p-8"><Navbar /></div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-[#a09c92] font-bold">กำลังโหลดข้อมูลหนังสือ...</p>
        </div>
      </div>
    );
  }

  const isManga = book.category === 'การ์ตูน (Manga)';
  const isEbook = book.bookType === 'E-Book';

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#26251e] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#f54e00] selection:text-white p-4 md:p-8">
      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        <Navbar />

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm font-medium text-[#a09c92] mb-8 mt-4 ml-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">หน้าหลัก</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-orange-500 transition-colors">ร้านค้า</Link>
          <span>/</span>
          <span className="text-[#5a5852]">{book.category}</span>
          <span>/</span>
          <span className="text-[#26251e] truncate max-w-[200px]">{book.title}</span>
        </div>

        <main className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-sm overflow-hidden mb-12">
          
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row border-b border-white/50">
            {/* Image Column */}
            <div className="w-full lg:w-2/5 p-8 md:p-16 flex items-center justify-center bg-white/30 relative">
              <div className="relative z-10 w-full max-w-[300px] aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden group">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {isManga && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-md">
                    Manga
                  </div>
                )}
                {/* Favorite Button */}
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all z-20"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#f54e00" : "none"} stroke={isFavorite ? "#f54e00" : "#5a5852"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>
            </div>

            {/* Details Column */}
            <div className="w-full lg:w-3/5 p-8 md:p-16 flex flex-col justify-center bg-white/50">
              <div className="mb-2 flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                  {book.category}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                  {book.bookType}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#26251e] leading-tight mb-4">{book.title}</h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center text-lg text-[#5a5852] font-medium mb-8 gap-2 sm:gap-6">
                <p>เขียนโดย: <span className="text-[#26251e] font-bold">{book.author}</span></p>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#d0cdc5]"></div>
                <p>สำนักพิมพ์: <span className="text-[#26251e] font-bold">{book.publisher}</span></p>
              </div>
              
              <div className="flex items-center space-x-6 mb-10 p-6 bg-white/60 rounded-2xl border border-white/80">
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#a09c92] font-bold uppercase tracking-wider mb-1">ราคา</span>
                  <div className="text-[#f54e00] font-black text-3xl">${book.price.toFixed(2)}</div>
                </div>
                <div className="w-px h-12 bg-[#e6e5e0]"></div>
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#a09c92] font-bold uppercase tracking-wider mb-1">เรตติ้ง</span>
                  <div className="flex items-center text-[#26251e] font-bold text-xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#f54e00" stroke="#f54e00" className="mr-1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    {book.rating}
                  </div>
                </div>
                <div className="w-px h-12 bg-[#e6e5e0]"></div>
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#a09c92] font-bold uppercase tracking-wider mb-1">รีวิว</span>
                  <div className="text-[#26251e] font-bold text-xl">{book.reviews}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button className="flex-[2] bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-orange-500/40 transition-all hover:-translate-y-1 flex items-center justify-center text-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  เพิ่มลงตะกร้า
                </button>
                
                {isEbook && (
                  <button onClick={() => setShowSampleModal(true)} className="flex-1 bg-white border-2 border-[#e6e5e0] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 text-[#5a5852] font-bold py-4 px-6 rounded-2xl transition-all hover:-translate-y-1 flex items-center justify-center text-base shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    ทดลองอ่าน
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="flex border-b border-white/50 px-8 pt-4 overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveTab('synopsis')}
              className={`px-6 py-4 font-bold text-[15px] border-b-4 transition-colors whitespace-nowrap ${activeTab === 'synopsis' ? 'border-orange-500 text-orange-600' : 'border-transparent text-[#a09c92] hover:text-[#5a5852]'}`}
            >
              เนื้อหาย่อ
            </button>
            <button 
              onClick={() => setActiveTab('info')}
              className={`px-6 py-4 font-bold text-[15px] border-b-4 transition-colors whitespace-nowrap ${activeTab === 'info' ? 'border-orange-500 text-orange-600' : 'border-transparent text-[#a09c92] hover:text-[#5a5852]'}`}
            >
              ข้อมูลหนังสือ
            </button>
            {isManga && (
              <button 
                onClick={() => setActiveTab('chapters')}
                className={`px-6 py-4 font-bold text-[15px] border-b-4 transition-colors whitespace-nowrap ${activeTab === 'chapters' ? 'border-orange-500 text-orange-600' : 'border-transparent text-[#a09c92] hover:text-[#5a5852]'}`}
              >
                พรีวิวตอนทั้งหมด
              </button>
            )}
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 font-bold text-[15px] border-b-4 transition-colors whitespace-nowrap ${activeTab === 'reviews' ? 'border-orange-500 text-orange-600' : 'border-transparent text-[#a09c92] hover:text-[#5a5852]'}`}
            >
              รีวิว ({book.reviewsData?.length || 0})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8 md:p-12 min-h-[300px] bg-white/30">
            
            {activeTab === 'synopsis' && (
              <div className="max-w-3xl animate-fadeIn">
                <h3 className="text-2xl font-bold mb-6">เนื้อเรื่องย่อ</h3>
                <p className="text-[#5a5852] text-lg leading-relaxed">{book.desc}</p>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="max-w-3xl animate-fadeIn">
                <h3 className="text-2xl font-bold mb-6">ข้อมูลหนังสือ</h3>
                <div className="bg-white/60 rounded-2xl p-6 border border-white/80">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                    <div>
                      <dt className="text-[13px] text-[#a09c92] font-bold uppercase mb-1">สำนักพิมพ์</dt>
                      <dd className="text-[#26251e] font-semibold text-lg">{book.publisher}</dd>
                    </div>
                    <div>
                      <dt className="text-[13px] text-[#a09c92] font-bold uppercase mb-1">วันที่ตีพิมพ์</dt>
                      <dd className="text-[#26251e] font-semibold text-lg">{book.publishDate || 'ไม่ระบุ'}</dd>
                    </div>
                    <div>
                      <dt className="text-[13px] text-[#a09c92] font-bold uppercase mb-1">จำนวนหน้า</dt>
                      <dd className="text-[#26251e] font-semibold text-lg">{book.pages ? `${book.pages} หน้า` : 'ไม่ระบุ'}</dd>
                    </div>
                    <div>
                      <dt className="text-[13px] text-[#a09c92] font-bold uppercase mb-1">ISBN</dt>
                      <dd className="text-[#26251e] font-semibold text-lg">{book.isbn || 'ไม่ระบุ'}</dd>
                    </div>
                    <div>
                      <dt className="text-[13px] text-[#a09c92] font-bold uppercase mb-1">ขนาด</dt>
                      <dd className="text-[#26251e] font-semibold text-lg">{book.dimensions || 'ไม่ระบุ'}</dd>
                    </div>
                    <div>
                      <dt className="text-[13px] text-[#a09c92] font-bold uppercase mb-1">ประเภทสินค้า</dt>
                      <dd className="text-[#26251e] font-semibold text-lg">{book.bookType}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {activeTab === 'chapters' && isManga && (
              <div className="max-w-4xl animate-fadeIn">
                <h3 className="text-2xl font-bold mb-6 flex items-center justify-between">
                  พรีวิวตอนทั้งหมด
                  <span className="text-sm font-medium text-[#a09c92] bg-white px-3 py-1 rounded-full border border-[#e6e5e0]">
                    {book.chapters?.length || 0} ตอน
                  </span>
                </h3>
                
                {book.chapters && book.chapters.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {book.chapters.map((chapter, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/70 hover:bg-white rounded-xl border border-white/80 transition-colors shadow-sm group">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold mr-4 group-hover:scale-110 transition-transform">
                            {chapter.number}
                          </div>
                          <span className="font-bold text-[#26251e]">{chapter.title}</span>
                        </div>
                        {chapter.isFree ? (
                          <button onClick={() => setShowSampleModal(true)} className="text-[12px] font-bold text-white bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-full transition-colors">
                            อ่านฟรี
                          </button>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a09c92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#a09c92]">ไม่มีข้อมูลตอน</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl animate-fadeIn">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">รีวิวจากผู้อ่าน</h3>
                  <button onClick={() => setShowReviewModal(true)} className="font-bold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-5 py-2.5 rounded-full transition-colors text-sm">
                    เขียนรีวิว
                  </button>
                </div>

                {book.reviewsData && book.reviewsData.length > 0 ? (
                  <div className="space-y-6">
                    {book.reviewsData.map((review) => (
                      <div key={review.id} className="p-6 bg-white/70 rounded-2xl border border-white/80 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mr-3 flex items-center justify-center text-gray-500 font-bold">
                              {review.user.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-[#26251e]">{review.user}</div>
                              <div className="text-[12px] text-[#a09c92]">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex text-orange-500">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-[#5a5852] font-medium pl-13">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-[#d0cdc5]">
                    <p className="text-lg font-bold text-[#5a5852] mb-2">ยังไม่มีรีวิวสำหรับหนังสือเล่มนี้</p>
                    <p className="text-[#a09c92]">เป็นคนแรกที่รีวิวสิ!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Similar Books Section */}
        {similarBooks.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-[#26251e] mb-6 flex items-center">
              สินค้าที่คล้ายกัน
              <span className="ml-3 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[11px] font-bold uppercase">
                {book.category}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarBooks.map((simBook) => (
                <Link href={`/shop/${simBook.id}`} key={simBook.id} className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-3xl p-5 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
                  <div className="relative h-64 mb-5 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                    <img src={simBook.image} alt={simBook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-[16px] text-[#26251e] leading-tight mb-1 group-hover:text-[#f54e00] transition-colors line-clamp-2">{simBook.title}</h3>
                      <p className="text-[#5a5852] text-[13px] font-medium">{simBook.author}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#e6e5e0]">
                      <span className="text-lg font-bold text-[#f54e00]">${simBook.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Sample Modal */}
      {showSampleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSampleModal(false)}></div>
          <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[80vh] animate-fadeIn">
            <div className="flex items-center justify-between p-6 border-b border-[#e6e5e0]">
              <h3 className="text-xl font-bold text-[#26251e] flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                ทดลองอ่าน: {book.title}
              </h3>
              <button onClick={() => setShowSampleModal(false)} className="w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-[#5a5852] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 bg-[#f7f7f4] flex flex-col items-center">
              {/* Mock PDF/Content Page */}
              <div className="w-full max-w-xl aspect-[1/1.4] bg-white shadow-md mb-8 p-8 md:p-12 text-center flex flex-col">
                <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                <p className="text-[#a09c92] mb-12">{book.author}</p>
                <div className="text-left space-y-4 text-[#5a5852] flex-1">
                  <p>นี่คือเนื้อหาตัวอย่างสำหรับทดลองอ่าน (Mock Sample Content)...</p>
                  <p>เนื้อหาในส่วนนี้จะถูกดึงมาจากไฟล์ PDF หรือรูปภาพของหนังสือ</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <p className="text-[12px] text-[#a09c92] mt-auto">หน้า 1</p>
              </div>
            </div>
            <div className="p-4 border-t border-[#e6e5e0] bg-white flex justify-center space-x-4">
              <button className="px-6 py-2 bg-[#f7f7f4] hover:bg-[#e6e5e0] text-[#5a5852] font-bold rounded-xl transition-colors">หน้าก่อนหน้า</button>
              <button className="px-6 py-2 bg-[#f7f7f4] hover:bg-[#e6e5e0] text-[#5a5852] font-bold rounded-xl transition-colors">หน้าถัดไป</button>
            </div>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowReviewModal(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#26251e]">เขียนรีวิว</h3>
              <button onClick={() => setShowReviewModal(false)} className="w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-[#5a5852] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="mb-6 flex flex-col items-center">
              <p className="text-[#a09c92] font-medium mb-3">ให้คะแนนหนังสือเล่มนี้</p>
              <div className="flex space-x-2 text-[#d0cdc5] hover:text-orange-400 cursor-pointer">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-[#5a5852] mb-2">ความรู้สึกหลังจากอ่าน (Review)</label>
              <textarea 
                className="w-full bg-[#f7f7f4] border border-[#e6e5e0] rounded-2xl p-4 h-32 focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none font-medium text-[#26251e]"
                placeholder="แบ่งปันความคิดเห็นของคุณ..."
              ></textarea>
            </div>

            <button 
              onClick={() => setShowReviewModal(false)}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
            >
              ส่งรีวิว
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

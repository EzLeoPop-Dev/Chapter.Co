"use client";
import React, { useState, useEffect, use, useRef } from 'react';
import Link from 'next/link';
import { books } from '../../../data/books';
import Navbar from '../../../components/Navbar';

export default function BookDetailPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('เล่มพิมพ์');
  const [filterStar, setFilterStar] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [samplePageIndex, setSamplePageIndex] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

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

  useEffect(() => {
    if (!showSampleModal) {
      setSamplePageIndex(0);
    }
  }, [showSampleModal]);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
        <div className="max-w-7xl mx-auto w-full p-4 md:p-8"><Navbar /></div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-[#a09c92] font-bold">กำลังโหลดข้อมูลหนังสือ...</p>
        </div>
      </div>
    );
  }

  const isManga = book.category === 'การ์ตูน (Manga)';
  const isEbook = book.bookType === 'E-Book';
  const stock = Number(book.stock || 0);
  const stockLabel = stock <= 0 ? 'สินค้าหมด' : stock <= 5 ? `เหลือ ${stock} ชิ้น` : `พร้อมส่ง ${stock} ชิ้น`;
  const stockClass = stock <= 0 ? 'bg-red-100 text-red-600' : stock <= 5 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';

  const displayReviews = book.reviewsData?.length > 0 ? book.reviewsData : [
    { id: 1, user: 'กิตติพงษ์ ส.', date: '18 ม.ค. 2024', rating: 5, comment: 'อ่านแล้ววางไม่ลงเลยครับ ภาษาที่ใช้สวยงามมาก บรรยายภาพได้ชัดเจน แนะนำสำหรับคนที่ชอบแนวลึกลับซ่อนเงื่อนครับ', title: 'เนื้อเรื่องน่าติดตามมากครับ' },
    { id: 2, user: 'แพรวพรรณ ว.', date: '15 ม.ค. 2024', rating: 4, comment: 'ชอบการผูกปมเรื่องมากๆ ค่อยๆ เฉลยมาทีละนิด ทำให้ลุ้นตลอดเวลา ตัวละครมีมิติมากค่ะ', title: 'ประทับใจการดำเนินเรื่อง' },
    { id: 3, user: 'ชานน ม.', date: '10 ม.ค. 2024', rating: 5, comment: 'เป็นหนังสือที่ให้แง่คิดในการใช้ชีวิตได้ดีมาก เรื่องราวไม่ได้ซับซ้อนแต่ทรงพลัง ประทับใจมากครับ', title: 'คุ้มค่าแก่การอ่าน' },
    { id: 4, user: 'อลิสา ก.', date: '5 ม.ค. 2024', rating: 3, comment: 'สนุกดีค่ะ แต่อยากให้จบเคลียร์กว่านี้หน่อย ตอนกลางเรื่องเดินเรื่องช้าไปนิด', title: 'พอใช้ได้' }
  ];

  const filteredReviews = filterStar ? displayReviews.filter(r => Math.floor(r.rating) === filterStar) : displayReviews;

  const samplePages = book.bookType === 'E-Book'
    ? [
        {
          section: 'คำนำ',
          title: 'ยินดีต้อนรับสู่หนังสือเล่มนี้',
          paragraphs: [
            `${book.title} ถูกจัดทำขึ้นเพื่อช่วยให้ผู้อ่านเข้าถึงแนวคิดหลักของ ${book.category} ได้อย่างชัดเจนและเป็นระบบ`,
            `เนื้อหาในเล่มถูกเลือกมาเพื่อให้คุณได้สัมผัสกับความคิดสำคัญก่อน โดยเน้นให้ผู้อ่านรู้สึกถึงลำดับของเรื่องราวและความต่อเนื่องของคำสอน`,
            `จุดมุ่งหมายของหนังสือเล่มนี้คือการเปิดประตูให้คุณลองอ่านและเห็นว่าเนื้อหานี้เหมาะกับสไตล์การเรียนรู้ของคุณหรือไม่`,
          ],
          footer: `โดย ${book.author}`,
        },
        {
          section: 'คำนำ',
          title: 'ทำไมต้องอ่านเล่มนี้',
          paragraphs: [
            `ในทุกช่วงของการเรียนรู้ เราไม่เพียงต้องรู้ว่าอะไรคือคำตอบ แต่ยังต้องเข้าใจว่าทำไมคำตอบนั้นจึงสำคัญ`,
            `หนังสือเล่มนี้จึงนำเสนอแนวคิดอย่างเรียบง่ายและต่อเนื่อง เพื่อให้คุณพัฒนาความคิดและความเข้าใจได้อย่างไม่รู้สึกกดดัน`,
          ],
          footer: 'เริ่มจากพื้นฐาน แล้วลึกขึ้นเรื่อย ๆ',
        },
        {
          section: 'สารบัญ',
          title: 'สารบัญ',
          chapters: [
            { title: 'คำนำ', page: 3 },
            { title: 'ทำไมต้องอ่านเล่มนี้', page: 5 },
            { title: 'แนวคิดหลักของเล่ม', page: 7 },
            { title: 'บทที่ 1', page: 11 },
            { title: 'บทที่ 2', page: 15 },
            { title: 'บทที่ 3', page: 19 },
            { title: 'บทที่ 4', page: 23 },
            { title: 'บทที่ 5', page: 27 },
          ],
          footer: 'หน้า 3',
        },
        {
          section: 'สารบัญ',
          title: 'แนวคิดหลักของเล่ม',
          paragraphs: [
            `บทนี้จะช่วยให้คุณเห็นภาพรวมของ ${book.title} และรู้ว่าหนังสือเล่มนี้มุ่งสื่อสารอะไรให้คุณรับรู้`,
            `คำสำคัญของเล่มคือการเชื่อมโยงข้อมูลกับบริบทจริง เพื่อให้ผู้อ่านไม่เพียงจำความรู้ แต่สามารถนำไปใช้ได้จริง`,
          ],
          footer: 'หน้า 4',
        },
        {
          section: 'ตัวอย่างเนื้อหา',
          title: 'บทที่ 1',
          paragraphs: [
            `${book.title} เริ่มต้นด้วยการตั้งคำถามพื้นฐานว่าเหตุใดสิ่งต่าง ๆ จึงเกิดขึ้นและเหตุใดหลายสิ่งจึงสัมพันธ์กันอย่างลึกซึ้ง`,
            `เมื่อเราเข้าใจบริบทของคำถามเหล่านี้ เราจะเห็นว่าความรู้ส่วนใหญ่ไม่ได้ถูกสร้างขึ้นจากการจำ แต่จากการสังเกตและเชื่อมโยงข้อเท็จจริงให้เห็นภาพรวม`,
          ],
          footer: 'หน้า 5',
        },
        {
          section: 'ตัวอย่างเนื้อหา',
          title: 'บทที่ 1 (ต่อ)',
          paragraphs: [
            `หนึ่งในสิ่งที่น่าสนใจที่สุดของเล่มนี้คือการนำเสนอข้อมูลในลักษณะที่ไม่แปลกแยกจากชีวิตประจำวัน`,
            `ผู้เขียนเลือกใช้คำสั้น ๆ และเรียบง่ายเพื่อให้ผู้อ่านสามารถฟังหรือติดตามเนื้อหาได้โดยไม่ต้องพยายามตีความมากเกินจำเป็น`,
          ],
          footer: 'หน้า 6',
        },
        {
          section: 'ตัวอย่างเนื้อหา',
          title: 'บทที่ 1 (ต่อ)',
          paragraphs: [
            `เมื่อคุณอ่านต่อไป คุณจะเห็นว่าหนังสือเล่มนี้ไม่ได้เพียงแค่บอกคุณว่าอะไรคือสิ่งสำคัญ แต่ยังแสดงให้คุณเห็นว่าทำไมสิ่งสำคัญเหล่านั้นจึงควรได้รับความสนใจ`,
            `สิ่งนี้ทำให้ทุกบทมีความต่อเนื่องและช่วยให้คุณรู้สึกว่าเรื่องราวกำลังค่อย ๆ เปิดขึ้นมาอย่างเป็นธรรมชาติ`,
          ],
          footer: 'หน้า 7',
        },
        {
          section: 'ตัวอย่างเนื้อหา',
          title: 'บทที่ 1 (ต่อ)',
          paragraphs: [
            `ผู้เขียนยังชี้ให้เห็นว่า ความรู้ที่ดีไม่จำเป็นต้องซับซ้อนเสมอไป เพราะบางครั้งความเข้าใจที่ชัดเจนมากกว่าเดิมยิ่งก่อให้เกิดการเรียนรู้ที่ยั่งยืน`,
            `นี่คือเหตุผลที่หนังสือเล่มนี้สามารถเป็นทั้งแหล่งความรู้และแรงบันดาลใจสำหรับผู้ที่กำลังเริ่มต้น`,
          ],
          footer: 'หน้า 8',
        },
        {
          section: 'ตัวอย่างเนื้อหา',
          title: 'บทที่ 1 (ต่อ)',
          paragraphs: [
            `ท้ายที่สุดแล้ว ความสำเร็จของการอ่านหนังสือเล่มนี้ไม่ได้ขึ้นอยู่กับการจำคำทั้งหมด แต่ขึ้นอยู่กับการรับรู้ว่าเราได้เรียนรู้สิ่งใดจากเรื่องราวที่กำลังอ่าน`,
            `คุณจะพบว่าเนื้อหาจากเล่มนี้ช่วยให้คุณมีแนวทางคิดใหม่ ๆ ที่ทั้งเป็นประโยชน์และน่าสนใจ`,
          ],
          footer: 'หน้า 9',
        },
        {
          section: 'บทสรุป',
          title: 'บทที่ 1 สรุป',
          paragraphs: [
            `บทนี้สรุปแนวคิดหลักของ ${book.title} และชี้ให้เห็นว่าการเรียนรู้ที่แท้จริงเกิดขึ้นจากการเชื่อมโยงความรู้กับประสบการณ์จริง`,
            `คุณสามารถอ่านต่อไปได้เรื่อย ๆ เพื่อประเมินว่าเล่มนี้ตอบโจทย์ความต้องการของคุณหรือไม่`,
          ],
          footer: 'หน้า 10',
        },
      ]
    : [
        {
          section: 'ตัวอย่างเนื้อหา',
          title: 'ตัวอย่างจากหนังสือ',
          paragraphs: [
            `นี่คือส่วนตัวอย่างสำหรับ ${book.title} ที่ช่วยให้คุณสัมผัสบรรยากาศและสไตล์การเขียนของหนังสือเล่มนี้ก่อนตัดสินใจซื้อ`,
          ],
          footer: 'หน้า 10',
        },
      ];

  const currentSamplePage = samplePages[samplePageIndex] || samplePages[0];

  return (
    <div className="min-h-screen bg-[#F9F7F4] text-[#1A1A1A] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] relative selection:bg-[#C8861A] selection:text-white p-4 md:p-8">
      
      <div className="max-w-7xl mx-auto flex flex-col relative z-10 pb-20">
        <Navbar />

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-[12px] font-bold text-[#a09c92] mb-10 mt-4 px-2">
          <Link href="/" className="hover:text-primary transition-colors">หน้าหลัก</Link>
          <span>&gt;</span>
          <Link href="/shop" className="hover:text-primary transition-colors">{book.category}</Link>
          <span>&gt;</span>
          <span className="text-[#1A1A1A] truncate max-w-[200px]">{book.title}</span>
        </div>

        {/* Main Content Flow */}
        <div className="space-y-16 px-2">
          
          {/* Top Section: Hero (Image + Primary Details) */}
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left: Image Container */}
            <div className="w-full md:w-[360px] flex flex-col items-center flex-shrink-0">
              <div className="bg-[#F2EEE7] rounded-3xl p-10 w-full flex items-center justify-center relative mb-5">
                {/* ทดลองอ่าน Badge */}
                <div className="absolute top-4 left-4 bg-white text-[#C8861A] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  ทดลองอ่าน
                </div>
                
                <img src={book.image} alt={book.title} className="w-full max-w-[220px] aspect-[2/3] object-cover rounded-md shadow-2xl" />
              </div>
              
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center text-[13px] font-bold text-[#5a5852] hover:text-[#C8861A] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "#C8861A" : "none"} stroke={isFavorite ? "#C8861A" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                เพิ่มในรายการที่ชอบ
              </button>
            </div>

            {/* Right: Details & Purchase Actions */}
            <div className="flex-1 flex flex-col justify-start pt-2">
              <h1 className="text-[32px] md:text-[38px] font-extrabold text-[#1A1A1A] leading-tight mb-3">{book.title}</h1>
              
              <div className="flex items-center text-[14px] mb-4">
                <span className="text-[#807d72] mr-2">โดย</span>
                <span className="font-bold text-[#1A1A1A] mr-1.5">{book.author}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rounded-full bg-[#3b82f6]"><path d="M9 12l2 2 4-4"></path></svg>
              </div>

              <div className="flex items-center text-[13px] mb-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#C8861A" stroke="#C8861A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span className="font-bold text-[#C8861A] mr-2">{book.rating}</span>
                <span className="text-[#d0cdc5] mx-2">|</span>
                <span className="text-[#807d72] font-medium">{book.reviews} รีวิว</span>
              </div>

              <div className="text-[40px] font-black text-[#C8861A] mb-8 leading-none">
                ฿{book.price.toFixed(2)}
              </div>

              <div className={`inline-flex items-center px-3 py-1 rounded-lg text-[12px] font-bold mb-8 ${stockClass}`}>
                {stockLabel}
              </div>

              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#a09c92] mb-3 block">รูปแบบหนังสือ</span>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setSelectedFormat('เล่มพิมพ์')}
                    className={`px-8 py-2.5 rounded-full text-[13px] font-bold border transition-colors ${selectedFormat === 'เล่มพิมพ์' ? 'border-[#C8861A] text-[#C8861A] bg-white' : 'border-[#e6e5e0] text-[#5a5852] bg-transparent hover:border-[#C8861A]'}`}
                  >
                    เล่มพิมพ์
                  </button>
                  <button 
                    onClick={() => setSelectedFormat('E-book')}
                    className={`px-8 py-2.5 rounded-full text-[13px] font-bold border transition-colors ${selectedFormat === 'E-book' ? 'border-[#C8861A] text-[#C8861A] bg-white' : 'border-[#e6e5e0] text-[#5a5852] bg-transparent hover:border-[#C8861A]'}`}
                  >
                    E-book
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  disabled={stock <= 0}
                  className="bg-[#C8861A] hover:bg-[#a66d13] text-white font-bold py-3.5 px-8 rounded-full shadow-md transition-all flex items-center justify-center text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  {stock <= 0 ? 'สินค้าหมด' : 'เพิ่มลงตะกร้า'}
                </button>
                
                <button onClick={() => setShowSampleModal(true)} className="bg-white border border-[#e6e5e0] hover:border-[#1A1A1A] text-[#1A1A1A] font-bold py-3.5 px-8 rounded-full transition-all flex items-center justify-center text-[15px] shadow-sm">
                  อ่านตัวอย่าง
                </button>
              </div>
            </div>
          </div>

          {/* Middle Section: Synopsis & Metadata */}
          <div className="flex flex-col pt-16 gap-8">
            <h3 className="text-[24px] font-bold text-[#1A1A1A]">รายละเอียดหนังสือ</h3>
            <p className="text-[#5a5852] text-[16px] leading-relaxed max-w-4xl">
              {book.desc || 'เรื่องราวของหญิงสาวผู้ค้นพบความลับที่ถูกซ่อนไว้ใต้แสงจันทร์ การเดินทางข้ามเวลาที่นำพาเธอไปสู่ความรักและความจริงที่ไม่อาจหลีกเลี่ยงได้...'}
            </p>
            
            <div className="bg-[#F2EEE7] rounded-[1.5rem] p-8 grid grid-cols-2 md:grid-cols-4 gap-y-6 max-w-4xl">
              <div>
                <div className="text-[12px] font-medium text-[#a09c92] mb-1">ISBN</div>
                <div className="text-[14px] font-bold text-[#1A1A1A]">{book.isbn || '978-616-0000-00-0'}</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#a09c92] mb-1">จำนวนหน้า</div>
                <div className="text-[14px] font-bold text-[#1A1A1A]">{book.pages ? `${book.pages} หน้า` : '320 หน้า'}</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#a09c92] mb-1">ภาษา</div>
                <div className="text-[14px] font-bold text-[#1A1A1A]">ภาษาไทย</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#a09c92] mb-1">สำนักพิมพ์</div>
                <div className="text-[14px] font-bold text-[#1A1A1A]">{book.publisher || 'Chapter Press'}</div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="pt-16">
            <h3 className="text-[24px] font-bold text-[#1A1A1A] mb-8">รีวิวจากผู้อ่าน</h3>
            
            <div className="flex flex-col md:flex-row gap-12">
              
              {/* Review Summary */}
              <div className="w-full md:w-[280px] flex-shrink-0">
                <div className="bg-[#F2EEE7] rounded-[1.5rem] p-6 shadow-sm">
                  <div className="flex items-center mb-6 border-b border-[#e6e5e0] pb-6">
                    <div className="text-[48px] font-black text-[#C8861A] mr-4 leading-none">{book.rating}</div>
                    <div className="flex flex-col">
                      <div className="flex mb-1">
                         {[...Array(5)].map((_, i) => (
                            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(book.rating) ? "#C8861A" : "#e6e5e0"} stroke="none" className="mr-0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                         ))}
                      </div>
                      <div className="text-[10px] font-medium text-[#807d72]">จาก {book.reviews} รีวิว</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { star: 5, percent: 80 },
                      { star: 4, percent: 15 },
                      { star: 3, percent: 3 },
                      { star: 2, percent: 1 },
                      { star: 1, percent: 1 },
                    ].map((item) => (
                      <button 
                        key={item.star} 
                        onClick={() => setFilterStar(filterStar === item.star ? null : item.star)}
                        className={`flex items-center text-[10px] w-full hover:bg-black/5 p-1 rounded transition-colors ${filterStar === item.star ? 'bg-black/10' : ''}`}
                      >
                        <span className="w-2 font-bold text-[#5a5852] mr-2 text-right">{item.star}</span>
                        <div className="flex-1 h-1.5 bg-[#e6e5e0] rounded-full overflow-hidden mr-3 relative">
                          <div className="absolute left-0 top-0 bottom-0 bg-[#C8861A] rounded-full transition-all" style={{ width: `${item.percent}%` }}></div>
                        </div>
                        <span className="w-6 text-right font-medium text-[#807d72]">{item.percent}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Review List & Input */}
              <div className="flex-1 space-y-6">
                
                {/* Write Review Input */}
                <div className="bg-white border border-[#e6e5e0] rounded-2xl p-5 shadow-sm">
                  <h4 className="text-[14px] font-bold text-[#1A1A1A] mb-4">เขียนรีวิวของคุณ</h4>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C8861A] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      ยู
                    </div>
                    <div className="flex-1">
                      <textarea 
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="แบ่งปันความคิดเห็นของคุณเกี่ยวกับหนังสือเล่มนี้..." 
                        className="w-full bg-[#F9F7F4] border border-[#e6e5e0] rounded-xl p-4 text-[13px] h-24 resize-none focus:outline-none focus:border-[#C8861A] focus:ring-1 focus:ring-[#C8861A] transition-all"
                      ></textarea>
                      
                      {selectedImages.length > 0 && (
                        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                          {selectedImages.map((img, idx) => (
                            <div key={idx} className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-[#e6e5e0]">
                              <img src={img} alt={`upload-${idx}`} className="w-full h-full object-cover" />
                              <button onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex space-x-1 text-[#d0cdc5]">
                            {[1,2,3,4,5].map(s => (
                              <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="hover:text-[#C8861A] cursor-pointer transition-colors"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            ))}
                          </div>
                          
                          <div className="w-px h-5 bg-[#e6e5e0]"></div>
                          
                          <button onClick={() => fileInputRef.current?.click()} className="flex items-center text-[#807d72] hover:text-[#C8861A] transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            <span className="text-[12px] font-bold">เพิ่มรูปภาพ</span>
                          </button>
                          <input type="file" ref={fileInputRef} onChange={handleImageUpload} multiple accept="image/*" className="hidden" />
                        </div>
                        <button className="bg-[#1A1A1A] hover:bg-[#333] text-white text-[13px] font-bold py-2.5 px-6 rounded-full transition-colors">ส่งรีวิว</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter Header */}
                <div className="flex justify-between items-center pb-2 border-b border-[#e6e5e0]/60">
                   <h4 className="font-bold text-[#1A1A1A] text-[15px]">{filterStar ? `รีวิว ${filterStar} ดาว` : 'รีวิวทั้งหมด'}</h4>
                   {filterStar && (
                     <button onClick={() => setFilterStar(null)} className="text-[12px] text-blue-500 hover:underline font-bold">ดูรีวิวทั้งหมด</button>
                   )}
                </div>

                {filteredReviews.length > 0 ? filteredReviews.map((review, i) => (
                  <div key={review.id || i} className="pb-6 border-b border-[#e6e5e0]/60 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex space-x-0.5 text-[#C8861A]">
                         {[...Array(5)].map((_, idx) => (
                            <svg key={idx} width="12" height="12" viewBox="0 0 24 24" fill={idx < Math.floor(review.rating) ? "currentColor" : "#e6e5e0"} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                         ))}
                      </div>
                      <div className="text-[10px] font-medium text-[#807d72]">{review.date}</div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <span className="text-[13px] font-bold text-[#1A1A1A] mr-2">{review.user}</span>
                      <span className="flex items-center text-[9px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        ยืนยันการสั่งซื้อ
                      </span>
                    </div>
                    
                    <h4 className="text-[14px] font-bold text-[#1A1A1A] mb-1">{review.title || 'รีวิวหนังสือ'}</h4>
                    <p className="text-[13px] text-[#5a5852] mb-3 leading-relaxed">{review.comment}</p>
                    
                    <button className="flex items-center text-[10px] font-medium text-[#807d72] hover:text-[#C8861A] transition-colors">
                      รีวิวนี้มีประโยชน์หรือไม่? 
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 mr-1"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                      {Math.floor(Math.random() * 50) + 1}
                    </button>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <p className="text-[15px] font-bold text-[#1A1A1A] mb-2">ไม่พบรีวิวในระดับดาวที่คุณเลือก</p>
                    <button onClick={() => setFilterStar(null)} className="text-[13px] font-bold text-primary hover:underline">
                      ดูรีวิวทั้งหมด
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Books */}
          {similarBooks.length > 0 && (
            <div className="pt-16">
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-[20px] font-bold text-[#1A1A1A]">หนังสือที่เกี่ยวข้อง</h3>
                <Link href="/shop" className="text-[12px] font-bold text-[#C8861A] hover:underline flex items-center">
                  ดูทั้งหมด 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {similarBooks.map((simBook) => (
                  <Link href={`/shop/${simBook.id}`} key={simBook.id} className="group flex flex-col">
                    <div className="bg-[#F2EEE7] rounded-xl aspect-[3/4] mb-3 flex items-center justify-center p-3 overflow-hidden border border-[#e6e5e0]">
                      <img src={simBook.image} alt={simBook.title} className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex items-center text-[10px] text-[#C8861A] mb-1 font-bold">
                       <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="mr-0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                       {simBook.rating}
                    </div>
                    <h4 className="font-bold text-[13px] text-[#1A1A1A] line-clamp-1 leading-tight mb-1 group-hover:text-[#C8861A] transition-colors">{simBook.title}</h4>
                    <p className="text-[13px] font-bold text-[#C8861A]">฿{simBook.price.toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Sample Modal */}
      {showSampleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSampleModal(false)}></div>
           <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[80vh] animate-fadeIn">
              <div className="flex items-center justify-between p-6 border-b border-[#e6e5e0]">
               <h3 className="text-xl font-bold text-[#1A1A1A]">ทดลองอ่าน: {book.title}</h3>
               <button onClick={() => setShowSampleModal(false)} className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-[#1A1A1A]">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
             </div>
             <div className="flex-1 overflow-y-auto p-8 bg-[#F9F7F4] flex flex-col items-center">
               <div className="w-full max-w-xl min-h-[620px] bg-white shadow-md p-8 rounded-[1.5rem] flex flex-col">
                 <div className="flex items-center justify-between text-[12px] text-[#807d72] mb-6">
                   <span className="font-medium">{book.title}</span>
                   <span>หน้า {samplePageIndex + 1}/{samplePages.length}</span>
                 </div>

                 <div className="flex-1 border-y border-[#e6e5e0] py-6">
                   <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8861A] mb-3">{currentSamplePage.section}</p>
                   <h4 className="text-[22px] font-bold text-[#1A1A1A] mb-4">{currentSamplePage.title}</h4>

                   {currentSamplePage.chapters ? (
                     <div className="space-y-3 text-[14px] leading-7 text-[#1A1A1A]">
                       <div className="border-b border-[#e6e5e0] pb-3 mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-[#807d72]">
                         มี {currentSamplePage.chapters.length} บท
                       </div>
                       {currentSamplePage.chapters.map((chapter, index) => (
                         <div key={index} className="flex items-center justify-between border-b border-[#f1eee9] pb-2">
                           <span className="text-[#1A1A1A]">{chapter.title}</span>
                           <span className="text-[#807d72]">{chapter.page}</span>
                         </div>
                       ))}
                     </div>
                   ) : currentSamplePage.items ? (
                     <ul className="space-y-3 text-[14px] leading-7 text-[#1A1A1A]">
                       {currentSamplePage.items.map((item, index) => (
                         <li key={index} className="flex items-start">
                           <span className="mr-2 text-[#C8861A]">•</span>
                           <span>{item}</span>
                         </li>
                       ))}
                     </ul>
                   ) : (
                     <div className="space-y-4 text-[14px] leading-7 text-[#1A1A1A]">
                       {currentSamplePage.paragraphs.map((paragraph, index) => (
                         <p key={index}>{paragraph}</p>
                       ))}
                     </div>
                   )}
                 </div>

                 <div className="mt-6 flex items-center justify-between">
                   <button
                     onClick={() => setSamplePageIndex((prev) => Math.max(prev - 1, 0))}
                     className="text-[13px] font-bold text-[#5a5852] hover:text-[#C8861A] transition-colors"
                   >
                     ← ก่อนหน้า
                   </button>
                   <div className="text-[12px] text-[#807d72]">ตัวอย่าง E-Book</div>
                   <button
                     onClick={() => setSamplePageIndex((prev) => Math.min(prev + 1, samplePages.length - 1))}
                     className="text-[13px] font-bold text-[#5a5852] hover:text-[#C8861A] transition-colors"
                   >
                     ถัดไป →
                   </button>
                 </div>
               </div>
             </div>
           </div>
        </div>
      )}

    </div>
  );
}

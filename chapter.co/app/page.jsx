"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import HeroSection from './components/home/HeroSection';
import CategoryRow from './components/home/CategoryRow';
import PromotionBanner from './components/home/PromotionBanner';
import RecommendedWeekly from './components/home/RecommendedWeekly';
import BestSellers from './components/home/BestSellers';
import NewArrivals from './components/home/NewArrivals';
import Footer from './components/shared/Footer';

export default function ModernBookstorePage() {
  const bestSellers = [
    { id: 1, title: 'ATOMIC\nHABITS', author: 'JAMES CLEAR', price: '15.99', rating: '5.0', reviews: '15k', theme: 'from-amber-500 to-orange-700', textTheme: 'text-amber-200' },
    { id: 2, title: 'SAPIENS', author: 'YUVAL NOAH', price: '28.50', rating: '4.9', reviews: '12k', theme: 'from-stone-600 to-stone-900', textTheme: 'text-stone-300' },
    { id: 3, title: 'THINKING\nFAST', author: 'D. KAHNEMAN', price: '22.00', rating: '4.8', reviews: '8.9k', theme: 'from-cyan-700 to-blue-900', textTheme: 'text-cyan-200' },
    { id: 4, title: 'MONEY\nPSYCH', author: 'M. HOUSEL', price: '18.99', rating: '4.9', reviews: '10k', theme: 'from-emerald-600 to-green-900', textTheme: 'text-emerald-200' },
  ];

  const newArrivals = [
    { id: 1, title: 'AI\nFUTURE', author: 'TECH INSIDER', price: '29.99', rating: '4.5', reviews: '120', theme: 'from-purple-600 to-indigo-900', textTheme: 'text-purple-200' },
    { id: 2, title: 'MINIMAL\nLIFE', author: 'MARIE K.', price: '16.50', rating: '4.8', reviews: '55', theme: 'from-slate-400 to-slate-700', textTheme: 'text-slate-200' },
    { id: 3, title: 'SPACE\nGUIDE', author: 'ELON M.', price: '35.00', rating: '4.7', reviews: '89', theme: 'from-gray-800 to-black', textTheme: 'text-gray-300' },
    { id: 4, title: 'VEGAN\nRECIPES', author: 'CHEF GREEN', price: '20.00', rating: '4.6', reviews: '210', theme: 'from-lime-600 to-green-800', textTheme: 'text-lime-200' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#26251e] font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif] p-4 md:p-8 overflow-hidden relative selection:bg-[#f54e00] selection:text-white">

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <Navbar />

        <HeroSection />
        <CategoryRow />
        <PromotionBanner />
        <RecommendedWeekly />
        <BestSellers bestSellers={bestSellers} />
        <NewArrivals newArrivals={newArrivals} />
        <Footer />

      </div>
    </div>
  );
}
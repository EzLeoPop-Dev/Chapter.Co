"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function GlobalFooter() {
  const pathname = usePathname();
  
  // Do not show footer on staff pages or any other pages you want to exclude
  if (pathname && pathname.startsWith('/staff')) {
    return null;
  }

  return <Footer />;
}

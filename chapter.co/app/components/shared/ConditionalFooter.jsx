"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import GlobalFooter from './GlobalFooter';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // ซ่อน Footer ในหน้า Admin หรือ Staff
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/staff')) {
    return null;
  }
  
  return <GlobalFooter />;
}

// components/ClientLayout.jsx
'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import styles from '@/components/Layout.module.css'; // Sesuai path file kamu

export default function ClientLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {/* Navbar menangani Top Header & Bottom Navigation Bar di HP */}
      <Navbar 
        onToggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen} 
      />
      
      <div className={styles.mainWrapper}>
        {/* Sidebar akan slide-in saat di HP, dan menetap di samping saat di Desktop */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={closeSidebar} 
        />
        
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 4 Menu Utama + 1 Tombol "Lainnya" untuk Bottom Nav di HP
  const mainBottomNav = [
    { label: 'Beranda', path: '/', icon: '🏠' },
    { label: 'Penduduk', path: '/penduduk', icon: '👥' },
    { label: 'Layanan', path: '/persuratan', icon: '📄' },
    { label: 'Pengaduan', path: '/pengaduan', icon: '💬' },
  ];

  // Menu Tambahan yang ada di dalam Sidebar
  const extraSidebarMenu = [
    { label: 'Peta Tata Ruang', path: '/pemetaan', icon: '🗺️' },
    { label: 'Kas & Keuangan Desa', path: '/keuangan', icon: '💰' },
    { label: 'Pengumuman / Berita', path: '/berita', icon: '📢' },
    { label: 'Pengaturan Akun', path: '/pengaturan', icon: '⚙️' },
  ];

  return (
    <>
      {/* 1. Header Atas Ringkas (Mobile & Desktop) */}
      <header className={styles.topNavbar}>
        <div className={styles.brand}>
          <div className={styles.logo}>D</div>
          <span className={styles.title}>Desa Digital</span>
        </div>
        <div className={styles.avatar}>👤</div>
      </header>

      {/* 2. Bottom Navigation Bar (5 Menu di HP) */}
      <nav className={styles.bottomNav}>

        {/* Menu Ke-5: Pemicu Sidebar */}
        <button 
          className={styles.bottomNavItem} 
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className={styles.bottomNavIcon}>☰</span>
          <span>Lainnya</span>
        </button>

        {mainBottomNav.map((item, index) => (
          <Link key={index} href={item.path} className={styles.bottomNavItem}>
            <span className={styles.bottomNavIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}

      </nav>

      {/* 3. Overlay & Sidebar Drawer */}
      {isSidebarOpen && (
        <div 
          className={styles.sidebarOverlay} 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarHeaderTitle}>Menu Lainnya</span>
          <button 
            className={styles.closeBtn} 
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className={styles.sidebarContent}>
          <ul className={styles.menuList}>
            {extraSidebarMenu.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.path} 
                  className={styles.sidebarLink}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
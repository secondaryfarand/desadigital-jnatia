'use client';
import styles from './Navbar.module.css';
import Link from 'next/link';
import Button from '../Button/Button';

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  // 4 Menu Utama di Bottom Nav
  const mobileNavItems = [
    { label: 'Beranda', path: '/', icon: '🏠' },
    { label: 'Penduduk', path: '/penduduk', icon: '👥' },
    { label: 'Layanan', path: '/persuratan', icon: '📄' },
    { label: 'Aspirasi', path: '/pengaduan', icon: '💬' },
  ];

  return (
    <>
      {/* Top Header */}
      <header className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.brand}>
            <div className={styles.logo}>D</div>
            <span className={styles.title}>Desa Digital</span>
          </div>
          <div className={styles.avatar}>👤</div>
        </div>
      </header>

      {/* Bottom Navigation Bar (Hanya Muncul di Layar HP) */}
      <nav className={styles.bottomNav}>
        {mobileNavItems.map((item, index) => (
          <Link key={index} href={item.path} className={styles.bottomNavItem}>
            <span className={styles.bottomNavIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Tombol Ke-5: Membuka Sidebar Modal */}
        <button 
          className={`${styles.bottomNavItem} ${isSidebarOpen ? styles.active : ''}`} 
          onClick={onToggleSidebar}
        >
          <span className={styles.bottomNavIcon}>☰</span>
          <span>Lainnya</span>
        </button>
      </nav>
    </>
  );
}



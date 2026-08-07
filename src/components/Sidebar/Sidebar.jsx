import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { label: 'Beranda Dasbor', path: '/', icon: '📊' },
    { label: 'Data Kependudukan', path: '/penduduk', icon: '👥' },
    { label: 'Layanan Administrasi', path: '/surat', icon: '📄' },
    { label: 'Peta Tata Ruang', path: '/pemetaan', icon: '🗺️' },
    { label: 'Kas & Keuangan', path: '/keuangan', icon: '💰' },
  ];

  return (
    <>
      {/* Overlay Gelap di HP ketika Sidebar Terbuka */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.active : ''}`}>
        <div className={styles.menuSection}>
          <p className={styles.menuLabel}>Menu Utama</p>
          <ul className={styles.menuList}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.path} className={styles.navLink} onClick={onClose}>
                  <span className={styles.icon}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sidebarFooter}>
          <p>Sistem Desa v1.0<br/>© 2026</p>
        </div>
      </aside>
    </>
  );
}
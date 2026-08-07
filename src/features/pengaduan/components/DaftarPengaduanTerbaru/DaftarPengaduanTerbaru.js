'use client';

import styles from './DaftarPengaduanTerbaru.module.css';

const KATEGORI_LABEL = {
  infrastruktur: 'Infrastruktur & Fasilitas',
  kebersihan: 'Kebersihan & Lingkungan',
  pelayanan: 'Layanan Publik & Admin',
  keamanan: 'Keamanan & Ketertiban',
};

export default function DaftarPengaduanTerbaru({ daftarPengaduan = [] }) {
  const getStatusClass = (status) => {
    if (status === 'SELESAI') return styles.statusSelesai;
    if (status === 'DIPROSES') return styles.statusDiproses;
    return styles.statusPending;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>📌 5 Pengaduan Terakhir</h3>
        <span className={styles.subtitle}>Terupdate Realtime</span>
      </div>

      {daftarPengaduan.length === 0 ? (
        <div className={styles.emptyState}>
          Belum ada pengaduan yang masuk.
        </div>
      ) : (
        <div className={styles.cardList}>
          {daftarPengaduan.map((item) => (
            <div key={item._id} className={styles.cardItem}>
              {/* Row 1: Nomor Tiket & Status */}
              <div className={styles.cardTop}>
                <span className={styles.nomorTiket}>{item.nomor_tiket}</span>
                <span className={`${styles.statusBadge} ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
              </div>

              {/* Row 2: Kategori & Tanggal */}
              <div className={styles.cardMeta}>
                <span className={styles.kategori}>
                  📁 {KATEGORI_LABEL[item.kategori] || item.kategori}
                </span>
                <span className={styles.tanggal}>🗓️ {item.tanggal}</span>
              </div>

              {/* Row 3: Isi Aduan */}
              <p className={styles.isiAduan}>
                "{item.isi_aduan}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
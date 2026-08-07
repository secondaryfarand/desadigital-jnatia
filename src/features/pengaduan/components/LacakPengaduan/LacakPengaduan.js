'use client';

import { useState } from 'react';
import styles from './LacakPengaduan.module.css';

export default function LacakPengaduan({ onSearchAction }) {
  const [tiket, setTiket] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataAduan, setDataAduan] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!tiket.trim()) return;

    setLoading(true);
    setSearched(true);

    const res = await onSearchAction(tiket.trim());
    setDataAduan(res);
    setLoading(false);
  };

  const getStatusClass = (status) => {
    if (status === 'SELESAI') return styles.statusSelesai;
    if (status === 'DIPROSES') return styles.statusDiproses;
    return styles.statusPending;
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>🔍 Lacak Status Pengaduan</h3>
      <form onSubmit={handleSearch} className={styles.searchBox}>
        <input
          type="text"
          value={tiket}
          onChange={(e) => setTiket(e.target.value)}
          placeholder="Masukkan Nomor Tiket (cth: ADU-123456-7890)"
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.searchBtn}>
          {loading ? 'Cari...' : 'Lacak'}
        </button>
      </form>

      {searched && dataAduan && (
        <div className={styles.resultBox}>
          <div className={styles.statusRow}>
            <span className={styles.tiketBadge}>{dataAduan.nomor_tiket}</span>
            <span className={`${styles.statusBadge} ${getStatusClass(dataAduan.status)}`}>
              {dataAduan.status}
            </span>
          </div>
          <div className={styles.detailItem}>
            <strong>Pengirim:</strong> {dataAduan.nama_pengirim}
          </div>
          <div className={styles.detailItem}>
            <strong>Kategori:</strong> {dataAduan.kategori}
          </div>
          <div className={styles.detailItem}>
            <strong>Isi Aduan:</strong> {dataAduan.isi_aduan}
          </div>
          {dataAduan.saran && (
            <div className={styles.detailItem}>
              <strong>Saran:</strong> {dataAduan.saran}
            </div>
          )}
        </div>
      )}

      {searched && !dataAduan && !loading && (
        <div className={styles.notFound}>
          ❌ Nomor tiket pengaduan tidak ditemukan. Pastikan nomor tiket sudah benar.
        </div>
      )}
    </div>
  );
}
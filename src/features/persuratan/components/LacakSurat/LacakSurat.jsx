'use client';

import { useState, useTransition } from 'react';
import { lacakSuratAction } from '../../actions'; // ✅ Import Action, BUKAN queries.js
import styles from './LacakSurat.module.css';

export default function LacakSurat() {
  const [nomorTiket, setNomorTiket] = useState('');
  const [hasil, setHasil] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLacak = (e) => {
    e.preventDefault();
    if (!nomorTiket.trim()) return;

    startTransition(async () => {
      const res = await lacakSuratAction(nomorTiket.trim().toUpperCase());
      if (res.success) {
        setHasil(res.data);
      } else {
        setHasil(null);
      }
      setIsSearched(true);
    });
  };

  const getStatusBadge = (status) => {
    const badgeMap = {
      PENDING: { label: 'Menunggu Verifikasi', style: styles.badgePending },
      DIPROSES: { label: 'Sedang Diproses', style: styles.badgeDiproses },
      SIAP_DIAMBIL: { label: 'Siap Diambil', style: styles.badgeSiap },
      SELESAI: { label: 'Selesai', style: styles.badgeSelesai },
      DITOLAK: { label: 'Ditolak', style: styles.badgeDitolak },
    };

    const current = badgeMap[status] || { label: status, style: styles.badgePending };
    return <span className={`${styles.badge} ${current.style}`}>{current.label}</span>;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Lacak Status Surat</h2>
        <p className={styles.subtitle}>Masukkan nomor tiket permohonan Anda (Contoh: SRT-2026...)</p>
      </div>

      <form onSubmit={handleLacak} className={styles.searchForm}>
        <input
          type="text"
          value={nomorTiket}
          onChange={(e) => setNomorTiket(e.target.value)}
          placeholder="Nomor Tiket..."
          required
          className={styles.input}
        />
        <button type="submit" disabled={isPending} className={styles.submitBtn}>
          {isPending ? 'Mencari...' : 'Cari'}
        </button>
      </form>

      {isSearched && (
        <div className={styles.resultBox}>
          {hasil ? (
            <div className={styles.detailCard}>
              <div className={styles.detailHeader}>
                <div>
                  <span className={styles.label}>Jenis Surat</span>
                  <div className={styles.value}>{hasil.jenis_surat_id?.nama_surat || '-'}</div>
                </div>
                <div>{getStatusBadge(hasil.status)}</div>
              </div>

              <div className={styles.metaGrid}>
                <div>
                  <span className={styles.label}>Pemohon</span>
                  <div className={styles.value}>{hasil.nama_pengirim}</div>
                </div>
                <div>
                  <span className={styles.label}>Tanggal Pengajuan</span>
                  <div className={styles.value}>
                    {hasil.createdAt
                      ? new Date(hasil.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '-'}
                  </div>
                </div>
              </div>

              {hasil.catatan_admin && (
                <div className={styles.notes}>
                  <strong>Catatan Petugas:</strong> {hasil.catatan_admin}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.errorBox}>
              Nomor tiket tidak ditemukan. Mohon periksa kembali input Anda.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
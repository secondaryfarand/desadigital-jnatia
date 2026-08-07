'use client';

import { useState, useTransition } from 'react';
import { submitPengaduanAction } from '../../actions';
import styles from './FormPengaduan.module.css';

export default function FormPengaduan() {
  const [isPending, startTransition] = useTransition();

  const [namaPengirim, setNamaPengirim] = useState('');
  const [kategori, setKategori] = useState('');
  const [isiAduan, setIsiAduan] = useState('');
  const [saran, setSaran] = useState('');

  const [nomorTiketResult, setNomorTiketResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    startTransition(async () => {
      const formData = new FormData();
      formData.append('nama_pengirim', namaPengirim);
      formData.append('kategori', kategori);
      formData.append('isi_aduan', isiAduan);
      formData.append('saran', saran);

      const res = await submitPengaduanAction(null, formData);

      if (res?.success && res?.nomor_tiket) {
        setNomorTiketResult(res.nomor_tiket);
      } else {
        setErrorMessage(res?.message || 'Terjadi kesalahan saat mengirim aduan.');
      }
    });
  };

  if (nomorTiketResult) {
    return (
      <div className={styles.successCard}>
        <div className={styles.iconCheck}>✓</div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#065f46', margin: '0 0 0.5rem 0' }}>
          Laporan Aduan Terkirim!
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#047857', margin: 0 }}>
          Terima kasih telah berpartisipasi menjaga kenyamanan desa. Simpan Nomor Tiket Anda untuk tindak lanjut:
        </p>

        <div className={styles.ticketNumber}>{nomorTiketResult}</div>

        <div>
          <button
            onClick={() => {
              setNomorTiketResult(null);
              setNamaPengirim('');
              setKategori('');
              setIsiAduan('');
              setSaran('');
            }}
            className={styles.submitBtn}
            style={{ backgroundColor: '#059669', width: 'auto', padding: '0.625rem 1.5rem' }}
          >
            Kirim Aduan Lainnya
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Formulir Pengaduan Warga</h2>
        <p className={styles.subtitle}>
          Sampaikan keluhan atau masukan Anda secara langsung & transparan demi kemajuan desa.
        </p>
      </div>

      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      {/* Nama Pengirim (Opsional) */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Nama Pengirim <span className={styles.optionalTag}>(Opsional - Biarkan kosong jika ingin Anonim)</span>
        </label>
        <input
          type="text"
          value={namaPengirim}
          onChange={(e) => setNamaPengirim(e.target.value)}
          placeholder="Contoh: Budi (Akan diisi 'Anonim' jika kosong)"
          className={styles.input}
        />
      </div>

      {/* Kategori Aduan */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Kategori Aduan <span className={styles.required}>*</span>
        </label>
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          required
          className={styles.select}
        >
          <option value="">-- Pilih Kategori Aduan --</option>
          <option value="infrastruktur">Infrastruktur & Fasilitas Umum</option>
          <option value="kebersihan">Kebersihan & Kesehatan Lingkungan</option>
          <option value="pelayanan">Layanan Publik & Administrasi Desa</option>
          <option value="keamanan">Keamanan, Ketertiban & Konflik Sosial</option>
        </select>
      </div>

      {/* Isi Aduan */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Isi Aduan / Keluhan <span className={styles.required}>*</span>
        </label>
        <textarea
          rows={4}
          value={isiAduan}
          onChange={(e) => setIsiAduan(e.target.value)}
          placeholder="Tuliskan permasalahan atau keluhan yang Anda temukan di lapangan..."
          required
          className={styles.textarea}
        />
      </div>

      {/* Saran */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Saran / Solusi <span className={styles.optionalTag}>(Opsional)</span>
        </label>
        <textarea
          rows={3}
          value={saran}
          onChange={(e) => setSaran(e.target.value)}
          placeholder="Berikan usulan atau saran perbaikan untuk pihak desa..."
          className={styles.textarea}
        />
      </div>

      <button type="submit" disabled={isPending} className={styles.submitBtn}>
        {isPending ? 'Mengarahkan & Mengirim Aduan...' : 'Kirim Pengaduan'}
      </button>
    </form>
  );
}
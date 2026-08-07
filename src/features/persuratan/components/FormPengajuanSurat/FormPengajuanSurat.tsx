'use client';

import { useState, useTransition } from 'react';
import { submitPengajuanSuratAction } from '../../actions';
import styles from './FormPengajuanSurat.module.css';

export const dynamic = 'force-dynamic'; // 🔑 WAJIB: Memberitahu Next.js agar TIDAK mencoba pre-render halaman ini saat build time

// 1. Definisi Tipe Data JenisSurat
export interface JenisSurat {
  _id: string;
  nama_surat: string;
  slug: string;
  is_active?: boolean;
}

export interface FormPengajuanSuratProps {
  daftarJenisSurat?: JenisSurat[];
}

export default function FormPengajuanSurat({
  daftarJenisSurat = [],
}: FormPengajuanSuratProps) {
  console.log('CLIENT DAFTAR SURAT:', daftarJenisSurat);
  const [isPending, startTransition] = useTransition();

  const [selectedJenisId, setSelectedJenisId] = useState('');
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [keperluan, setKeperluan] = useState('');

  // Dynamic field (Hybrid)
  const [namaUsaha, setNamaUsaha] = useState('');
  const [alamatUsaha, setAlamatUsaha] = useState('');

  const [nomorTiketResult, setNomorTiketResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // 2. TypeScript sekarang tahu item bertipe JenisSurat
  const currentSelectedSurat = (daftarJenisSurat || []).find(
    (item: JenisSurat) => item._id === selectedJenisId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const isSKU = currentSelectedSurat?.slug === 'surat-keterangan-usaha-sku';
    
    // Type assertion atau object assertion sederhana untuk TypeScript
    const dataTambahan: Record<string, string> = isSKU
      ? {
          nama_usaha: namaUsaha,
          alamat_usaha: alamatUsaha,
        }
      : {};

    startTransition(async () => {
      const formData = new FormData();
      formData.append('jenis_surat_id', selectedJenisId);
      formData.append('nik_pengirim', nik);
      formData.append('nama_pengirim', nama);
      formData.append('no_hp_pengirim', noHp);
      formData.append('alamat_pengirim', alamat);
      formData.append('tempat_lahir', tempatLahir);
      formData.append('tanggal_lahir', tanggalLahir);
      formData.append('keperluan', keperluan);

      if (isSKU) {
        formData.append('nama_usaha', namaUsaha);
        formData.append('alamat_usaha', alamatUsaha);
      }

      const res = await submitPengajuanSuratAction(null, formData);

      if (res?.success && res?.nomor_tiket) {
        setNomorTiketResult(res.nomor_tiket);
      } else {
        setErrorMessage(res?.message || 'Terjadi kesalahan saat mengajukan surat.');
      }
    });
  };

  if (nomorTiketResult) {
    return (
      <div className={styles.successCard}>
        <div className={styles.iconCheck}>✓</div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#065f46', margin: '0 0 0.5rem 0' }}>
          Pengajuan Surat Berhasil!
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>
          Simpan Nomor Tiket ini untuk mengecek status pengajuan Anda:
        </p>

        <div className={styles.ticketNumber}>{nomorTiketResult}</div>

        <button
          onClick={() => {
            setNomorTiketResult(null);
            setSelectedJenisId('');
            setNik('');
            setNama('');
            setNoHp('');
            setAlamat('');
            setTempatLahir('');
            setTanggalLahir('');
            setKeperluan('');
            setNamaUsaha('');
            setAlamatUsaha('');
          }}
          className={styles.submitBtn}
          style={{ backgroundColor: '#059669' }}
        >
          Buat Pengajuan Baru
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Formulir Pengajuan Surat</h2>
        <p className={styles.subtitle}>Lengkapi data diri Anda sesuai dokumen KTP/KK.</p>
      </div>

      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Jenis Surat <span className={styles.required}>*</span>
        </label>
        <select
          value={selectedJenisId}
          onChange={(e) => setSelectedJenisId(e.target.value)}
          required
          className={styles.select}
        >
          <option value="">-- Pilih Jenis Surat --</option>
          {(daftarJenisSurat || []).map((surat: JenisSurat) => (
            <option key={surat._id} value={surat._id}>
              {surat.nama_surat}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            NIK (16 Digit) <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            maxLength={16}
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            placeholder="510101..."
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Nama Lengkap <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Sesuai KTP"
            required
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            No. WhatsApp <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
            placeholder="08123456789"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Tempat Lahir <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={tempatLahir}
            onChange={(e) => setTempatLahir(e.target.value)}
            placeholder="Kota/Kabupaten"
            required
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Tanggal Lahir <span className={styles.required}>*</span>
        </label>
        <input
          type="date"
          value={tanggalLahir}
          onChange={(e) => setTanggalLahir(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Alamat Lengkap <span className={styles.required}>*</span>
        </label>
        <textarea
          rows={2}
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          placeholder="Jl. Raya Desa No..., Banjar/RT/RW"
          required
          className={styles.textarea}
        />
      </div>

      {currentSelectedSurat?.slug === 'surat-keterangan-usaha-sku' && (
        <div className={styles.hybridBox}>
          <h3 className={styles.hybridTitle}>Data Khusus Usaha (SKU)</h3>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nama Usaha *</label>
            <input
              type="text"
              value={namaUsaha}
              onChange={(e) => setNamaUsaha(e.target.value)}
              placeholder="Contoh: Toko Sembako Barokah"
              required
              className={styles.input}
              style={{ backgroundColor: '#ffffff' }}
            />
          </div>
          <div className={styles.formGroup} style={{ marginBottom: 0 }}>
            <label className={styles.label}>Alamat/Lokasi Usaha *</label>
            <input
              type="text"
              value={alamatUsaha}
              onChange={(e) => setAlamatUsaha(e.target.value)}
              placeholder="Contoh: RT 02 Dusun..."
              required
              className={styles.input}
              style={{ backgroundColor: '#ffffff' }}
            />
          </div>
        </div>
      )}

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Keperluan Pengajuan <span className={styles.required}>*</span>
        </label>
        <textarea
          rows={3}
          value={keperluan}
          onChange={(e) => setKeperluan(e.target.value)}
          placeholder="Tuliskan alasan/keperluan permohonan surat ini..."
          required
          className={styles.textarea}
        />
      </div>

      <button type="submit" disabled={isPending} className={styles.submitBtn}>
        {isPending ? 'Mengirim Pengajuan...' : 'Kirim Pengajuan Surat'}
      </button>
    </form>
  );
}


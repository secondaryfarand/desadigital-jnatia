import { DAFTAR_JENIS_SURAT } from '@/features/persuratan/data/jenisSurat';
import FormPengajuanSurat from '@/features/persuratan/components/FormPengajuanSurat/FormPengajuanSurat';
import LacakSurat from '@/features/persuratan/components/LacakSurat/LacakSurat';

export default function PersuratanPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2.5rem 1rem 6rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto 2rem auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: '0 0 0.25rem 0' }}>
          Layanan Persuratan Online
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
          Ajukan permohonan surat keterangan desa & lacak statusnya dengan mudah.
        </p>
      </div>

      {/* Lacak Surat */}
      <LacakSurat />

      {/* Form Pengajuan Surat (Menggunakan Data Static) */}
      <FormPengajuanSurat daftarJenisSurat={DAFTAR_JENIS_SURAT} />
    </main>
  );
}
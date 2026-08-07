import FormPengaduan from '@/features/pengaduan/components/FormPengaduan/FormPengaduan';
import LacakPengaduan from '@/features/pengaduan/components/LacakPengaduan/LacakPengaduan';
import DaftarPengaduanTerbaru from '@/features/pengaduan/components/DaftarPengaduanTerbaru/DaftarPengaduanTerbaru'; // ✅ Import komponen baru
import { getPengaduanByTiketQuery, getRecentPengaduanQuery } from '@/features/pengaduan/queries'; // ✅ Import query baru

export const dynamic = 'force-dynamic';

export default async function PengaduanPage() {
  const recentPengaduan = await getRecentPengaduanQuery(5);

  // Handler pencarian tiket (Server Action sederhana)
  async function searchTiketAction(nomorTiket: string) {
    'use server';
    return await getPengaduanByTiketQuery(nomorTiket);
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2.5rem 1rem 6rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto 2rem auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: '0 0 0.25rem 0' }}>
          Layanan Pengaduan Warga
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
          Sampaikan aspirasi, laporan fasilitas umum, atau keluhan lingkungan secara langsung & aman.
        </p>
      </div>

      {/* 1. Lacak Pengaduan */}
      <LacakPengaduan onSearchAction={searchTiketAction} />

      {/* 2. Form Pengaduan */}
      <FormPengaduan />
      {/* 3. Card List 5 Pengaduan Terakhir */}
      <DaftarPengaduanTerbaru daftarPengaduan={recentPengaduan as any} />
    </main>
  );
}
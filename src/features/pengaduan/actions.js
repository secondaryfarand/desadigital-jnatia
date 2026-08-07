'use server';

import { createPengaduanService } from './services/pengaduanService';

export async function submitPengaduanAction(prevState, formData) {
  try {
    const nama_pengirim = formData.get('nama_pengirim');
    const kategori = formData.get('kategori');
    const isi_aduan = formData.get('isi_aduan');
    const saran = formData.get('saran');

    // Validasi Sederhana
    if (!kategori || !isi_aduan) {
      return {
        success: false,
        message: 'Kategori aduan dan isi aduan wajib diisi.',
      };
    }

    const result = await createPengaduanService({
      nama_pengirim,
      kategori,
      isi_aduan,
      saran,
    });

    return {
      success: true,
      nomor_tiket: result.nomor_tiket,
      message: 'Aduan Anda berhasil terkirim!',
    };
  } catch (error) {
    console.error('Error submitting pengaduan:', error);
    return {
      success: false,
      message: 'Terjadi kesalahan sistem. Gagal mengirim aduan.',
    };
  }
}
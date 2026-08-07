import 'server-only';
import * as persuratanRepository from '../repository/persuratanRepository';

export async function getAllJenisSuratService() {
  const rawJenis = await persuratanRepository.findAllJenisSurat();

  return rawJenis.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
}

export async function createPengajuanSuratService(payload) {
  // Logika Bisnis: Generate nomor tiket unik
  const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const nomorTiket = `SRT-${dateStr}-${randomCode}`;

  const suratPayload = {
    ...payload,
    nomor_tiket: nomorTiket,
    status: 'PENDING',
  };

  const newSurat = await persuratanRepository.insertSurat(suratPayload);

  return {
    ...newSurat,
    _id: newSurat._id.toString(),
  };
}

export async function getStatusSuratByTiketService(nomorTiket) {
  const result = await persuratanRepository.findSuratByTiket(nomorTiket);

  if (!result) return null;

  return {
    ...result,
    _id: result._id.toString(),
    jenis_surat_id: result.jenis_surat_id
      ? {
          ...result.jenis_surat_id,
          _id: result.jenis_surat_id._id.toString(),
        }
      : null,
    createdAt: result.createdAt ? result.createdAt.toISOString() : null,
    updatedAt: result.updatedAt ? result.updatedAt.toISOString() : null,
  };
}
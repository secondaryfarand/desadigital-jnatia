import { insertPengaduan } from '../repository/pengaduanRepository';

export async function createPengaduanService(data) {
  // 1. Cek & Handle nama pengirim jika kosong
  const namaPengirimFinal =
    data.nama_pengirim && data.nama_pengirim.trim() !== ''
      ? data.nama_pengirim.trim()
      : 'Anonim';

  // 2. Generate Nomor Tiket Pengaduan Unik (Contoh: ADU-849201-1234)
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const nomorTiket = `ADU-${Date.now().toString().slice(-6)}-${randomSuffix}`;

  // 3. Susun Payload
  const payload = {
    nomor_tiket: nomorTiket,
    nama_pengirim: namaPengirimFinal,
    kategori: data.kategori,
    isi_aduan: data.isi_aduan,
    saran: data.saran || '',
    status: 'PENDING',
  };

  // 4. Simpan ke Repository
  const result = await insertPengaduan(payload);

  return {
    _id: result._id.toString(),
    nomor_tiket: result.nomor_tiket,
    nama_pengirim: result.nama_pengirim,
  };
}
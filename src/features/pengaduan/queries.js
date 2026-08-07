import {connectDB} from '@/lib/db';
import Pengaduan from '@/features/pengaduan/models/Pengaduan';

export async function getPengaduanByTiketQuery(nomorTiket) {
  try {
    if (!nomorTiket) return null;

    await connectDB();

    const aduan = await Pengaduan.findOne({
      nomor_tiket: nomorTiket.trim(),
    }).lean();

    if (!aduan) return null;

    return {
      _id: aduan._id.toString(),
      nomor_tiket: aduan.nomor_tiket,
      nama_pengirim: aduan.nama_pengirim,
      kategori: aduan.kategori,
      isi_aduan: aduan.isi_aduan,
      saran: aduan.saran,
      status: aduan.status,
      createdAt: aduan.createdAt ? aduan.createdAt.toISOString() : null,
    };
  } catch (error) {
    console.error('Error fetching pengaduan by tiket:', error);
    return null;
  }
}

export async function getRecentPengaduanQuery(limit = 5) {
  try {
    await connectDB();

    // Ambil 5 aduan terbaru (diurutkan berdasarkan createdAt dari yang paling baru)
    const list = await Pengaduan.find({})
      .select('nomor_tiket kategori status createdAt isi_aduan')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return list.map((doc) => ({
      _id: doc._id.toString(),
      nomor_tiket: doc.nomor_tiket,
      kategori: doc.kategori,
      status: doc.status,
      isi_aduan: doc.isi_aduan,
      tanggal: doc.createdAt
        ? new Date(doc.createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : '-',
    }));
  } catch (error) {
    console.error('Error fetching recent pengaduan:', error);
    return [];
  }
}
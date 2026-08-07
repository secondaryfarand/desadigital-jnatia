import {connectDB} from '@/lib/db'; // Sesuaikan lokasi koneksi DB kamu
import JenisSurat from '@/features/persuratan/models/JenisSurat'; 
import Surat from '@/features/persuratan/models/Surat'; 

export async function getDaftarJenisSuratQuery() {
  try {
    await connectDB();

    // 1. Tambahkan .lean() agar return Mongoose Document berupa Plain Object
    const listSurat = await JenisSurat.find({ is_active: true }).lean();

    // 2. Map & ubah _id dari ObjectId ke string murni
    const serializedSurat = listSurat.map((doc) => ({
      ...doc,
      _id: doc._id.toString(), // 🔑 PENTING: Supaya Next.js Client Component bisa menerima datanya
    }));

    return serializedSurat;
  } catch (error) {
    console.error('Error fetching jenis surat:', error);
    return [];
  }
}

export async function getAntrianSuratQuery() {
  try {
    await connectDB();

    // Menggunakan model Surat
    const listAntrian = await Surat.find({
      status: { $in: ['PENDING', 'DIPROSES'] }
    })
      .select('nomor_tiket status createdAt')
      .sort({ createdAt: 1 })
      .lean();

    return listAntrian.map((doc, index) => ({
      _id: doc._id.toString(),
      nomor_tiket: doc.nomor_tiket,
      status: doc.status,
      urutan: index + 1,
      tanggal: doc.createdAt ? doc.createdAt.toISOString() : null,
    }));
  } catch (error) {
    console.error('Error fetching antrian surat:', error);
    return [];
  }
}
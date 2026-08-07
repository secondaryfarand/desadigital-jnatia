import {connectDB} from '@/lib/db'; // Sesuaikan lokasi koneksi DB kamu
import JenisSurat from '@/features/persuratan/models/JenisSurat'; 

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


// import 'server-only';
// import {
//   getAllJenisSuratService,
//   getStatusSuratByTiketService,
// } from './services/persuratanService';

// export async function getDaftarJenisSuratQuery() {
//   try {
//     return await getAllJenisSuratService();
//   } catch (error) {
//     console.error('Error in getDaftarJenisSuratQuery:', error);
//     return [];
//   }
// }

// export async function getStatusSuratQuery(nomorTiket) {
//   try {
//     if (!nomorTiket) return null;
//     return await getStatusSuratByTiketService(nomorTiket);
//   } catch (error) {
//     console.error('Error in getStatusSuratQuery:', error);
//     return null;
//   }
// }
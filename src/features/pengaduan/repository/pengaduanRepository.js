import {connectDB} from '@/lib/db';
import Pengaduan from '@/features/pengaduan/models/Pengaduan';

export async function insertPengaduan(pengaduanData) {
  await connectDB();
  const newPengaduan = new Pengaduan(pengaduanData);
  await newPengaduan.save();
  return newPengaduan.toObject();
}
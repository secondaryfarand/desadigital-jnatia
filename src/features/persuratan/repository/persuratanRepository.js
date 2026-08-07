import 'server-only';
import {connectDB} from '@/lib/db';
import Surat from '../models/Surat';
import JenisSurat from '../models/JenisSurat';

export async function findAllJenisSurat() {
  await connectDB();
  return await JenisSurat.find({ is_active: true }).lean();
}

export async function insertSurat(suratData) {
  await connectDB();
  const surat = new Surat(suratData);
  await surat.save();
  return surat.toObject();
}

export async function findSuratByTiket(nomorTiket) {
  await connectDB();
  return await Surat.findOne({ nomor_tiket: nomorTiket })
    .populate('jenis_surat_id', 'nama_surat slug')
    .lean();
}
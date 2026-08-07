// scripts/seedJenisSurat.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variable dari .env.local
dotenv.config({ path: '.env.local' });

const DB_URI = process.env.DB_URI;

const initialJenisSuratData = [
  { nama_surat: 'Surat Keterangan Domisili', slug: 'surat-keterangan-domisili' },
  { nama_surat: 'Surat Keterangan Usaha (SKU)', slug: 'surat-keterangan-usaha-sku' },
  { nama_surat: 'Surat Keterangan Tidak Mampu (SKTM)', slug: 'surat-keterangan-tidak-mampu-sktm' },
  { nama_surat: 'Surat Keterangan Kelakuan Baik', slug: 'surat-keterangan-kelakuan-baik' },
  { nama_surat: 'Surat Pengantar SKCK', slug: 'surat-pengantar-skck' },
  { nama_surat: 'Surat Pindah', slug: 'surat-pindah' },
  { nama_surat: 'Surat Keterangan Kematian', slug: 'surat-keterangan-kematian' },
  { nama_surat: 'Surat Keterangan Ahli Waris', slug: 'surat-keterangan-ahli-waris' },
  { nama_surat: 'Surat Keterangan Kelahiran', slug: 'surat-keterangan-kelahiran' },
];

async function seed() {
  if (!DB_URI) {
    console.error('❌ DB_URI tidak ditemukan di .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URI);
    console.log('🌱 Terhubung ke MongoDB...');

    // Skema Sederhana khusus untuk Seeder
    const JenisSurat = mongoose.models.JenisSurat || mongoose.model('JenisSurat', new mongoose.Schema({
      nama_surat: String,
      slug: String,
    }));

    // Gunakan bulkWrite / updateOne dengan upsert agar data tidak duplikat jika script dijalankan ulang
    for (const item of initialJenisSuratData) {
      await JenisSurat.updateOne(
        { slug: item.slug },
        { $setOnInsert: item },
        { upsert: true }
      );
    }

    console.log('✅ Seeding Jenis Surat Berhasil!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Gagal Seeding:', error);
    process.exit(1);
  }
}

seed();
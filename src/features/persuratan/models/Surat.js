import mongoose from 'mongoose';

const SuratSchema = new mongoose.Schema(
  {
    jenis_surat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JenisSurat',
      required: true,
    },

    // 1. Data Pemohon / Pengirim (Standar untuk Semua Surat)
    nik_pengirim: { type: String, required: true },
    nama_pengirim: { type: String, required: true },
    no_hp_pengirim: { type: String, required: true },
    alamat_pengirim: { type: String, required: true },
    tempat_lahir: { type: String, required: true },
    tanggal_lahir: { type: Date, required: true },

    // 2. Data Spesifik / Unik per Jenis Surat (Fleksibel dalam bentuk Key-Value Object)
    // Contoh isi untuk SKU: { nama_usaha: "Toko Sembako", alamat_usaha: "Jl. Merdeka No 5" }
    // Contoh isi untuk SKTM: { nama_orang_tua: "Budi", pekerjaan_ortu: "Petani" }
    data_tambahan: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    keperluan: { type: String, required: true },
    lampiran_url: [{ type: String }],
    nomor_tiket: { type: String, unique: true, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'DIPROSES', 'SIAP_DIAMBIL', 'SELESAI', 'DITOLAK'],
      default: 'PENDING',
    },
    catatan_admin: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Surat || mongoose.model('Surat', SuratSchema);
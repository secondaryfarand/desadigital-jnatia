import mongoose from 'mongoose';

const PengaduanSchema = new mongoose.Schema(
  {
    nomor_tiket: {
      type: String,
      required: true,
      unique: true,
    },
    nama_pengirim: {
      type: String,
      default: 'Anonim',
      trim: true,
    },
    kategori: {
      type: String,
      required: true,
      enum: ['infrastruktur', 'kebersihan', 'pelayanan', 'keamanan'],
    },
    isi_aduan: {
      type: String,
      required: true,
      trim: true,
    },
    saran: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'DIPROSES', 'SELESAI'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Pengaduan || mongoose.model('Pengaduan', PengaduanSchema);